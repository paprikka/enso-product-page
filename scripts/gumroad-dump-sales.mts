#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const API = 'https://api.gumroad.com/v2'
const PERMALINK = 'enso' // from https://sonnet.gumroad.com/l/enso
const OUT = resolve(root, 'gumroad-sales-dump.json')

// --- env ---
function loadEnv() {
  const envPath = resolve(root, '.env.local')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^#=\s]+)\s*=\s*(.*)$/)
    if (m) process.env[m[1]] ??= m[2].trim()
  }
}

loadEnv()

const { values } = parseArgs({
  options: {
    token: { type: 'string' },
    help: { type: 'boolean', short: 'h', default: false },
  },
})

function usage() {
  console.log(`Dump all Gumroad sales for the "enso" product into gumroad-sales-dump.json.

Usage:
  node scripts/gumroad-dump-sales.mts --token <access_token>
  GUMROAD_ACCESS_TOKEN=... node scripts/gumroad-dump-sales.mts

Token comes from --token, GUMROAD_ACCESS_TOKEN env, or .env.local.
Create one at: Gumroad → Settings → Advanced → Applications → Generate access token`)
}

function resolveToken(): string {
  const token = values.token ?? process.env.GUMROAD_ACCESS_TOKEN
  if (!token) {
    console.error('No access token — pass --token or set GUMROAD_ACCESS_TOKEN in .env.local')
    process.exit(1)
  }
  return token
}

async function get(path: string, token: string, params: Record<string, string> = {}) {
  const url = new URL(`${API}${path}`)
  url.searchParams.set('access_token', token)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)

  const res = await fetch(url)
  const data = await res.json().catch(() => null)
  if (!res.ok || !data?.success) {
    console.error(`Gumroad API error (${res.status}) on ${path}:`, data?.message ?? data)
    process.exit(1)
  }
  return data
}

async function findProduct(token: string) {
  const { products } = await get('/products', token)
  const product = products?.find(
    (p: any) => p.short_url?.endsWith(`/l/${PERMALINK}`) || p.custom_permalink === PERMALINK,
  )
  if (!product) {
    console.error(`Product "${PERMALINK}" not found. Available:`)
    for (const p of products ?? []) console.error(`  ${p.id}\t${p.short_url}`)
    process.exit(1)
  }
  return product
}

async function fetchAllSales(token: string, productId: string) {
  const sales: any[] = []
  let pageKey: string | undefined

  for (;;) {
    const params: Record<string, string> = { product_id: productId }
    if (pageKey) params.page_key = pageKey

    const data = await get('/sales', token, params)
    sales.push(...(data.sales ?? []))
    console.error(`  fetched ${sales.length} sales...`)

    if (!data.next_page_key) break
    pageKey = data.next_page_key
  }

  return sales
}

async function main() {
  if (values.help) return usage()

  const token = resolveToken()

  console.error(`Finding "${PERMALINK}" product...`)
  const product = await findProduct(token)
  console.error(`  → ${product.name} (${product.id})`)

  console.error('Fetching sales...')
  const sales = await fetchAllSales(token, product.id)

  const dump = {
    fetchedAt: new Date().toISOString(),
    product: { id: product.id, name: product.name, short_url: product.short_url },
    count: sales.length,
    sales,
  }

  writeFileSync(OUT, JSON.stringify(dump, null, 2))
  console.error(`\nSaved ${sales.length} sales → ${OUT}`)

  const emails = [...new Set(sales.map((s: any) => s.email).filter(Boolean))]
  console.error(`Unique buyer emails: ${emails.length}`)
}

main()
