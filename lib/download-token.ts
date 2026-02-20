import crypto from 'crypto'

const ALG = 'aes-256-gcm'
const KEY = Buffer.from(process.env.DOWNLOAD_TOKEN_SECRET!, 'hex') // 32-byte hex

export function encryptToken(payload: { email: string; sessionId: string }): string {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv(ALG, KEY, iv)
  const data = cipher.update(JSON.stringify(payload), 'utf8')
  const encrypted = Buffer.concat([data, cipher.final()])
  const tag = cipher.getAuthTag()
  return Buffer.concat([iv, tag, encrypted]).toString('base64url')
}

export function decryptToken(token: string): { email: string; sessionId: string } | null {
  try {
    const buf = Buffer.from(token, 'base64url')
    const iv = buf.subarray(0, 12)
    const tag = buf.subarray(12, 28)
    const encrypted = buf.subarray(28)
    const decipher = crypto.createDecipheriv(ALG, KEY, iv)
    decipher.setAuthTag(tag)
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
    return JSON.parse(decrypted.toString('utf8'))
  } catch {
    return null
  }
}
