---
description: Deploy this project to Vercel by pushing the target branch (prod = main, preview = feat/v2) and monitor via vercel logs. Use when the user wants to deploy, ship, publish, or release this app, or tail deployment logs.
---

Deploy the Ensō product page to Vercel. Deploys are triggered by pushing a branch to `origin`:

- **production** → push `main`
- **preview** → push `feat/v2`

Monitoring uses the Vercel CLI (`vercel logs`). The project is already linked via `.vercel/project.json`.

## Targets

| Target          | Branch    | Aliases                          |
| --------------- | --------- | -------------------------------- |
| production      | `main`    | `prod`, `production`, `main`     |
| preview         | `feat/v2` | `preview`, `feat/v2`, `staging`  |

## Arguments

- Target: `prod` / `preview` (required). If missing, use the `ask` skill to ask which target.
- `--dry-run` (also: `dry`, `confirm`): guarded mode — show the plan and **confirm before pushing** using the `ask` skill.
- `--logs`: after a successful push, tail deployment logs.

## Steps

1. **Resolve target** → map the arg to its branch via the table. If no target given, use the `ask` skill to choose between production and preview.

2. **Build the plan.** Without switching branches, gather what would ship:
   - `git fetch origin <branch>`
   - `git log --oneline origin/<branch>..<branch>` — the commits that would be pushed
   - If the local branch is missing commits from origin (behind), warn that a force/rebase may be needed and stop.
   - If there's nothing to push (already up to date), say so and stop.

3. **Confirm (dry-run mode only).** Present the plan — target, branch, and the commit list — then use the `ask` skill to confirm:
   - Question: e.g. `Deploy <N> commit(s) to <target> (origin/<branch>)?`
   - Options: `Yes, push` / `No, abort`.
   - On "No" (or anything other than an explicit yes): abort without pushing.

   In normal (non-dry-run) mode, push directly without the `ask` prompt — but still print the plan first.

4. **Push.** `git push origin <branch>`. Push the *local* branch of the target to origin; do not switch the user's working branch. If the local target branch doesn't exist, stop and report (don't create it).

5. **Report.** Confirm the push succeeded and that Vercel will pick it up. Production deploys live; preview deploys to the preview URL.

6. **Logs (if `--logs`, or offer it).** Tail with `vercel logs`. `vercel logs` needs a deployment URL or the linked project context. Useful forms:
   - `vercel logs` — runtime logs for the latest deployment of the linked project
   - `vercel inspect --logs <deployment-url>` — build logs for a specific deployment
   - `vercel ls` — list recent deployments to grab a URL

## Safety

- Never force-push unless the user explicitly asks.
- Never push a branch other than the resolved target.
- If the user is mid-work on another branch, the deploy pushes the *target* branch's local state, not the current branch — call this out if they differ.
