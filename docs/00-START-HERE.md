# Start here: one chronological route to the demo

This guide is for two beginners on separate computers. Builder A uses Cursor; Builder B uses Antigravity. Both work in the **same GitHub repository**. Read the [v2 PRD](PRD.md), [architecture](ARCHITECTURE.md), [contract](CONTRACT.md), [ownership](TASK-OWNERSHIP.md), and [Git tutorial](GIT-WORKFLOW.md) before giving an agent a task.

## First resolve the repository mismatch

The current repository `lakshay196/kanch-net-kiet` contains this playbook and an older root PRD. The Next.js source named by v2 exists in a different local checkout (`/Users/lakshay/projects/kanch-net`). **Do not have A and B build against different repositories.** B first commits/pushes this initial playbook package to `main` as the one-time setup baseline, staging only the files listed in [Git workflow](GIT-WORKFLOW.md), not the older untracked root `PRD.md`. B then imports the tracked app source on `feat/b-app-import` through a PR to `develop`. A reviews that the old app still starts and that v2's no-grade/no-QR scope is not overwritten by old instructions. No coding phase begins until this PR is merged and both builders use the same resulting repository.

## Sequence

| Step | Who | What to do | Tool or command | Wait? | Verification |
|---|---|---|---|---|---|
| 1 | B | Review and push this initial playbook to existing `main` as setup baseline | Targeted `git add`/commit/push in Git workflow | Yes | GitHub shows docs and agent rules; old root PRD unstaged |
| 2 | B | Make repo private if needed; invite A as collaborator | GitHub Settings → Collaborators | Yes | A accepts and can see repo |
| 3 | A+B | Read v2, architecture, contract, ownership; approve or raise contract issue | GitHub files/issues | Yes, before coding | Both explicitly approve contract v1 |
| 4 | B | Create and push `develop` from `main` | `git switch main; git pull --ff-only; git switch -c develop; git push -u origin develop` | Yes | GitHub shows `develop` |
| 5 | A+B | Use local checkout/clone separately, install Git/Node and agent apps | `git clone https://github.com/lakshay196/kanch-net-kiet.git` for A | Yes | Both have same remote |
| 6 | B | Import existing tracked Next.js app on `feat/b-app-import`, excluding generated/secret files | Git, Antigravity; PR to `develop` | Yes | A reviews; `npm ci && npm run build` passes |
| 7 | A+B | Pull `develop` and confirm app shell | `git switch develop; git pull --ff-only; npm ci; npm run dev` | Yes | App opens locally |
| 8 | B | Publish `lib/demo/types.ts`, seed, and fixture contract on `feat/b-foundation` | Antigravity; PR | A can design in parallel | A can import types and use fixture |
| 9 | A | Build visual system and stage 1 UI on `feat/a-demo-shell` | Cursor; PR | No | Mobile/desktop screenshots and stage gate |
| 10 | B | Build pure rules, parser fallback, inventory, settlement, optional routes | Antigravity; narrow B PRs | No | T1–T19 domain/API checks |
| 11 | A | Bind UI to B contract; keep mock adapter until B PRs merge | Cursor; A PRs | Wait only for contract changes | No invented API or B-owned edit |
| 12 | B | Merge PRs to `develop` in dependency order; run integration checks | GitHub; `npm ci && npm run lint && npm run build` | Yes for release | A signs off actual browser UI |
| 13 | A+B | Run PRD T1–T20, capture failures in issues and fix by owner | Browser, terminal, GitHub | Yes | All release-blocking checks pass |
| 14 | B | Open release PR `develop → main`, request A review, merge and deploy | GitHub, Vercel | Yes | Live `/demo` works without key |
| 15 | B | Verify deployment and record release; A checks visual layout | Browser, Vercel logs | Yes | Sample demo and fallback work |

## Daily rhythm

Both builders begin with `git status`. If clean, `git switch develop && git pull --ff-only`, then create a new feature branch. Open the correct agent in that local repository, give it the current phase only, and ask for a plan. Review the plan against [ownership](TASK-OWNERSHIP.md); then let it implement. Run the phase checks yourself, review `git diff` and `git status`, commit, push, and open a PR to `develop`. The other human reviews; B controls merge order. After a merge, both pull `develop` before a **new** feature. Never switch or pull over uncommitted work; see [Git workflow](GIT-WORKFLOW.md).

## What to give the agents

Both: `AGENTS.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/CONTRACT.md`, `docs/TASK-OWNERSHIP.md`. Cursor A additionally reads [GUIDE-A](GUIDE-A.md); Antigravity B reads [GUIDE-B](GUIDE-B.md). Ask each agent to stop after one phase and report changed files, commands, results, commit, push, and blockers. [AI-TOOLING](AI-TOOLING.md) has copy-paste prompts.

## Release gate

The release needs the [integration](INTEGRATION.md) checkpoints, [test strategy](TESTING-STRATEGY.md), A's actual rendered visual review, B's deterministic calculations, no-key fallback, and a clean `develop → main` PR. B owns deployment; A reviews the live page. The v2 PRD's definition of done is the final checklist.
