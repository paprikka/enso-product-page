#!/usr/bin/env node
import crypto from 'node:crypto'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// --- env ---
function loadEnv() {
  const envPath = resolve(root, '.env.local')
  if (!existsSync(envPath)) {
    console.error('.env.local not found — copy .env.example and fill in DOWNLOAD_TOKEN_SECRET + SITE_URL')
    process.exit(1)
  }
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^#=\s]+)\s*=\s*(.*)$/)
    if (m) process.env[m[1]] ??= m[2].trim()
  }
}

loadEnv()

// --- token (inlined from lib/download-token.ts to avoid import issues) ---
const KEY = Buffer.from(process.env.DOWNLOAD_TOKEN_SECRET!, 'hex')

function encryptToken(payload: { email: string; sessionId: string }): string {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv)
  const data = cipher.update(JSON.stringify(payload), 'utf8')
  const encrypted = Buffer.concat([data, cipher.final()])
  const tag = cipher.getAuthTag()
  return Buffer.concat([iv, tag, encrypted]).toString('base64url')
}

// --- cli ---
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    'send-email': { type: 'boolean', default: false },
    bulk: { type: 'string' },
    help: { type: 'boolean', short: 'h', default: false },
  },
})

const siteUrl = process.env.SITE_URL ?? 'https://enso.sonnet.io'

function grantAccess(email: string): string {
  const ref = encryptToken({ email, sessionId: `gumroad-legacy:${email}` })
  return `${siteUrl}/thank-you?email=${encodeURIComponent(email)}&ref=${ref}`
}

async function sendEmail(email: string, thankYouUrl: string): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Idempotency-Key': `gumroad-legacy:${email}`,
    },
    body: JSON.stringify({
      from: process.env.RECEIPT_FROM_EMAIL,
      reply_to: process.env.RECEIPT_REPLY_TO,
      to: email,
      template: { id: 'enso-receipt', variables: { thankYouUrl } },
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => null)
    console.error(`  [fail] email to ${email}:`, data)
    return false
  }
  console.error(`  [sent] ${email}`)
  return true
}

function usage() {
  console.log(`Grant download access to legacy Gumroad users.

Usage:
  node scripts/grant-access.ts <email>
  node scripts/grant-access.ts --bulk emails.csv
  node scripts/grant-access.ts --send-email <email>

Options:
  --send-email   Also send the receipt email via Resend
  --bulk <file>  Process emails from a file (one per line)
  -h, --help     Show this help`)
}

async function main() {
  if (values.help) return usage()

  if (values.bulk) {
    const emails = readFileSync(resolve(root, values.bulk), 'utf8')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#'))

    for (const email of emails) {
      const url = grantAccess(email)
      console.log(`${email}\t${url}`)
      if (values['send-email']) await sendEmail(email, url)
    }
    return
  }

  const email = positionals[0]
  if (!email) return usage()

  const url = grantAccess(email)
  console.log(url)
  if (values['send-email']) await sendEmail(email, url)
}

main()
