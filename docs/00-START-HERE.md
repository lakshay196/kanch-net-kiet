# Start here: one chronological route to the demo

This guide is for two beginners on separate computers. Builder A uses Cursor; Builder B uses Antigravity. Both work in the **same GitHub repository**. Read the [v2 PRD](PRD.md), [prototype baseline and source decision](PROTOTYPE-BASELINE.md), [architecture](ARCHITECTURE.md), [contract](CONTRACT.md), [ownership](TASK-OWNERSHIP.md), and [Git tutorial](GIT-WORKFLOW.md) before giving an agent a task.

## Starting source decision

The playbook is already pushed to `main` in `lakshay196/kanch-net-kiet`. The older root `PRD.md` remains local and historical; `docs/PRD.md` is v2. The human chose committed `lakshay196/kanch-net` `main@4fae0a6` as the code foundation and the [live redesign](https://redesign-kench-net.vercel.app/) as a visual reference. Its deployed source does not match that committed homepage, so visual continuity is an A-owned design task. **A and B build in `kanch-net-kiet` only.** B creates `develop` and imports the clean committed app snapshot on `feat/b-app-import` through a PR. A reviews the old routes and live visual cues. A1/B1 implementation begins only after the import merges and both humans approve `CONTRACT.md` v1.

## Sequence

| Step | Who | What to do | Tool or command | Wait? | Verification |
|---|---|---|---|---|---|
| 1 | B | Invite A to the existing GitHub repo and confirm access | GitHub Settings → Collaborators | A must accept | A sees `docs/PRD.md` |
| 2 | B | Create/push `develop` from current `main` | `git switch main; git pull --ff-only; git switch -c develop; git push -u origin develop` | No | GitHub shows `develop` |
| 3 | A | Clone the same repo on A's computer and track `develop` | `git clone https://github.com/lakshay196/kanch-net-kiet.git`, then `git switch --track origin/develop` | Yes for step 2 | A sees same remote/branch |
| 4 | A+B | Paste the [A prompt](BUILDER-A-PROMPT.md) into Cursor and [B prompt](BUILDER-B-PROMPT.md) into Antigravity | Agent chats in their own clones | No | Both agents report ownership and current state |
| 5 | B | Import committed `kanch-net/main` snapshot on `feat/b-app-import` | Antigravity B0, `git archive`; PR to `develop` | A reviews PR | Imported SHA, `npm ci`, lint, build, old routes |
| 6 | A+B | Review v2 and contract; record both approvals or a contract issue | GitHub issue/PR comments | Yes before A1/B1 | Explicit approval of contract v1 |
| 7 | A+B | Pull imported `develop` and confirm app shell | `git switch develop; git pull --ff-only; npm ci; npm run dev` | Yes for step 5 | App opens locally |
| 8 | B | Publish `lib/demo/types.ts` and seed on `feat/b-foundation` | Antigravity B1 PR | A can design in parallel | Types/fixture available |
| 9 | A | Build live-brand-inspired visual system and stage 1 UI on `feat/a-demo-shell` | Cursor A1 PR | No | Mobile/desktop screenshots against live reference |
| 10 | A+B | Continue one guide phase per agent session; each PR targets `develop` | Say “continue” after prior PR merges | Only on specific dependencies | Phase acceptance evidence |
| 11 | B | Integrate complete PRs and run T1–T20; A signs off browser UI | INTEGRATION.md and TESTING-STRATEGY.md | Yes before release | All release-blocking checks pass |
| 12 | B | Open `develop → main` release PR; A reviews; B merges/deploys | GitHub, Vercel | A approval | Live no-key demo works |

## Daily rhythm

Both builders begin with `git status`. If clean, `git switch develop && git pull --ff-only`, then create a new feature branch. Open the correct agent in that local repository, give it the current phase only, and ask for a plan. Review the plan against [ownership](TASK-OWNERSHIP.md); then let it implement. Run the phase checks yourself, review `git diff` and `git status`, commit, push, and open a PR to `develop`. The other human reviews; B controls merge order. After a merge, both pull `develop` before a **new** feature. Never switch or pull over uncommitted work; see [Git workflow](GIT-WORKFLOW.md).

## What to give the agents

Each builder pastes only the matching full kickoff prompt: [Builder A → Cursor](BUILDER-A-PROMPT.md), [Builder B → Antigravity](BUILDER-B-PROMPT.md). Those prompts direct the agents to read `AGENTS.md`, v2 PRD, contract, ownership, the individual guide, and other needed docs from the repository. Both agents stop after one phase and report changed files, commands, results, commit, push, and blockers. The human reviews the PR before B merges it. [AI-TOOLING](AI-TOOLING.md) has shorter prompts for specific follow-up tasks.

## Release gate

The release needs the [integration](INTEGRATION.md) checkpoints, [test strategy](TESTING-STRATEGY.md), A's actual rendered visual review, B's deterministic calculations, no-key fallback, and a clean `develop → main` PR. B owns deployment; A reviews the live page. The v2 PRD's definition of done is the final checklist.
