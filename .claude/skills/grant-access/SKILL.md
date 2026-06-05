---
description: Grant Enso download access to a user by email — generates an encrypted access link and (optionally) emails the receipt via Resend, wrapping scripts/grant-access.mts. Use when asked to grant/add Enso access, send an access or receipt email, or generate a download link for someone.
---

Grant download access to an Enso user. Wraps `scripts/grant-access.mts`, which mints an encrypted token, builds a `${PUBLIC_SITE_URL}/thank-you?...` link, and can email the `enso-receipt` template via Resend.

## Modes

| Mode       | What it does                                              | Confirm before? |
| ---------- | -------------------------------------------------------- | --------------- |
| send       | Generate the link **and** email it (`--send-email`)       | **Yes**         |
| bulk       | Same, for every address in a file (`--bulk <file>`)       | **Yes**         |
| link-only  | Generate + print the link, send nothing                   | No (no side effect) |

## Arguments

- An email address (single send), **or** `--bulk <file>` (one email per line; `#` comments allowed).
  - If neither is given, use the `ask` skill to request the address.
- `--link-only` (also: `link`, `dry`): print the link(s) only, no email, no confirmation.

## Steps

1. **Resolve recipients.**
   - Single: the email argument. If missing and no `--bulk`, use the `ask` skill to ask for it.
   - Bulk: read the file, one email per line, skipping blanks and `#` comments — the same parsing the script does.

2. **Link-only path** (if `--link-only`). Run without `--send-email`, print the link(s), stop — no confirmation needed:
   - Single: `node scripts/grant-access.mts <email>`
   - Bulk: `node scripts/grant-access.mts --bulk <file>`

3. **Confirm (send path).** Present recipient(s) and count, then use the `ask` skill:
   - Single — Question: `Send Enso access email to <email>?` Options: `Yes, send` / `No, abort`.
   - Bulk — show the count and the first few addresses (so a wrong file is caught), then: `Send Enso access email to <N> recipients?`
   - On anything but an explicit yes: abort without sending.

4. **Send.** After confirmation:
   - Single: `node scripts/grant-access.mts --send-email <email>`
   - Bulk: `node scripts/grant-access.mts --bulk <file> --send-email`
   - The script prints the link to stdout and `[sent] <email>` / `[fail] <email>` to stderr per recipient.

5. **Report.** Confirm which addresses were sent (and any `[fail]`). The emailed link points to `PUBLIC_SITE_URL` (the canonical prod origin), so it's a real, shareable URL.

## Prerequisites

`.env.local` must define: `PUBLIC_SITE_URL` (public origin, non-localhost), `DOWNLOAD_TOKEN_SECRET`, and — for sending — `RESEND_API_KEY`, `RECEIPT_FROM_EMAIL`, `RECEIPT_REPLY_TO`. The script fails fast with a clear message if `PUBLIC_SITE_URL` or `.env.local` is missing.

## Safety

- **Real outbound email.** Always confirm before a send (single or bulk). Link-only is the safe dry-run.
- **Idempotency.** The script uses a fixed key (`gumroad-legacy:<email>`) per address, so re-sending to the same address will **not** deliver a second email — Resend dedupes it. To test delivery, send to your own address or a `+tag` alias (e.g. `you+test1@gmail.com`).
- **Network.** Sending reaches `api.resend.com`. If a send fails with a network/`ENOTFOUND` error, the sandbox is blocking it — retry with the sandbox disabled. (`api.resend.com` is in the sandbox allowlist for new sessions.)
- The link always uses `PUBLIC_SITE_URL`, never `SITE_URL` (which is localhost in dev).
