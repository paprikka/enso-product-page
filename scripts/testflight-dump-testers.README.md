# Dump all TestFlight testers via App Store Connect API

Goal: produce `testflight-testers-dump.json` listing every beta tester (email,
name, state, beta groups) for an app — mirroring the Gumroad dump pattern.

## 1. Create an App Store Connect API key (one-time)

App Store Connect → Users and Access → Integrations → App Store Connect API → Keys
- Click "+", give it a name, role: **App Manager** (or Admin) — Developer role
  can read TestFlight too.
- Download the **.p8** private key (downloadable ONCE). Save it somewhere safe.
- Note the **Key ID** (next to the key) and the **Issuer ID** (top of the page).

## 2. Add creds to `.env.local`

```
ASC_ISSUER_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
ASC_KEY_ID=XXXXXXXXXX
ASC_PRIVATE_KEY_PATH=./AuthKey_XXXXXXXXXX.p8
# optional: limit to one app (numeric App Store id). Omit to dump all apps.
ASC_APP_ID=
```

(Add `AuthKey_*.p8` and `*-testers-dump.json` to `.gitignore`.)

## 3. Install JWT dep

```
pnpm add -D jsonwebtoken
```

## 4. Script: `scripts/testflight-dump-testers.mts`

```ts
#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import jwt from 'jsonwebtoken'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const OUT = resolve(root, 'testflight-testers-dump.json')
const API = 'https://api.appstoreconnect.apple.com/v1'

// --- env ---
function loadEnv() {
  const p = resolve(root, '.env.local')
  if (!existsSync(p)) return
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^([^#=\s]+)\s*=\s*(.*)$/)
    if (m) process.env[m[1]] ??= m[2].trim()
  }
}
loadEnv()

const ISSUER = process.env.ASC_ISSUER_ID
const KEY_ID = process.env.ASC_KEY_ID
const KEY_PATH = process.env.ASC_PRIVATE_KEY_PATH
const APP_ID = process.env.ASC_APP_ID || ''
if (!ISSUER || !KEY_ID || !KEY_PATH) {
  console.error('Missing ASC_ISSUER_ID / ASC_KEY_ID / ASC_PRIVATE_KEY_PATH in .env.local')
  process.exit(1)
}

// --- sign a short-lived ES256 JWT (max 20 min) ---
function token() {
  const key = readFileSync(resolve(root, KEY_PATH), 'utf8')
  return jwt.sign({}, key, {
    algorithm: 'ES256',
    expiresIn: '19m',
    issuer: ISSUER,
    audience: 'appstoreconnect-v1',
    header: { alg: 'ES256', kid: KEY_ID, typ: 'JWT' },
  })
}

async function getAll(path: string) {
  const jwtToken = token()
  let url: string | null = `${API}${path}`
  const out: any[] = []
  const included: any[] = []
  while (url) {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${jwtToken}` } })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`)
    const json: any = await res.json()
    out.push(...(json.data ?? []))
    if (json.included) included.push(...json.included)
    url = json.links?.next ?? null
  }
  return { data: out, included }
}

async function main() {
  // betaTesters, including each tester's beta groups. 200/page is the max.
  const qApp = APP_ID ? `&filter[apps]=${APP_ID}` : ''
  const { data, included } = await getAll(
    `/betaTesters?include=betaGroups&limit=200${qApp}`
  )

  const groupName = new Map<string, string>()
  for (const inc of included)
    if (inc.type === 'betaGroups') groupName.set(inc.id, inc.attributes?.name)

  const testers = data.map((t: any) => ({
    id: t.id,
    email: t.attributes?.email ?? null,
    firstName: t.attributes?.firstName ?? null,
    lastName: t.attributes?.lastName ?? null,
    inviteType: t.attributes?.inviteType ?? null, // EMAIL | PUBLIC_LINK
    state: t.attributes?.state ?? null,
    betaGroups: (t.relationships?.betaGroups?.data ?? [])
      .map((g: any) => groupName.get(g.id) ?? g.id),
  }))

  const dump = {
    count: testers.length,
    fetchedAt: new Date().toISOString(),
    appId: APP_ID || null,
    testers,
  }
  writeFileSync(OUT, JSON.stringify(dump, null, 2))
  console.log(`Wrote ${testers.length} testers -> ${OUT}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
```

## 5. Run

```
node scripts/testflight-dump-testers.mts
```

## Notes / gotchas
- `inviteType: PUBLIC_LINK` testers who installed via a public link may have a
  null/empty email — Apple only exposes details for testers you invited by email
  or imported. Email-invited & individually-added testers have full details.
- `state` values: INVITED, ACCEPTED, INSTALLED, etc.
- JWT is ES256-signed, audience `appstoreconnect-v1`, max lifetime 20 min.
- Rate limit ~3500 req/hr; pagination handles large tester lists automatically.
- To also pull which BUILDS a tester has access to, add `betaTesterApps` or query
  `/builds` per app — not needed just for the roster.
- Reference: developer.apple.com/documentation/appstoreconnectapi → "List Beta Testers".
