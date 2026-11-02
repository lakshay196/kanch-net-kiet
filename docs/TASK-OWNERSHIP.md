# Task and file ownership

## Separate workstreams

| Task | Primary owner | Other builder | Dependency |
|---|---|---|---|
| App import, dependency lockfile, integration, release | B | A reviews import and UI shell | Before implementation |
| Contract, types, seed, parser, glossary, catalogue fallback | B | A consumes and requests changes | Contract approval |
| Eligibility, duplicates, planner, inventory, settlement | B | A consumes and verifies display | Contract approval |
| Optional model routes and API tests | B | A uses mocks then API | Contract approval |
| Design direction, demo page/components/styles, responsive and accessibility QA | A | B reviews usability | App import |
| Browser demo state and API adapter | A | B checks rule reuse | B's types; mock first |
| Full integration and release test run | B | A fixes A-owned defects and signs off | Both feature PRs |

Review and acceptance do not transfer implementation ownership. No task is assigned to both builders.

## Primary file owner map

| Path or glob | Owner |
|---|---|
| `app/demo/**`, `components/demo/**`, `public/demo/**`, demo UI tests | A |
| `app/layout.tsx`, `app/globals.css`, existing UI files if a change is essential | A |
| `data/demo-bangle-order.ts`, `lib/demo/**`, domain tests | B |
| `app/api/parse-order/**`, `app/api/catalogue-draft/**`, API tests | B |
| Existing `lib/match.ts`, `lib/score.ts`, `lib/settlement.ts`, `lib/places.ts` | B |
| `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, ESLint/PostCSS config | B |
| `.env.example`, `.gitignore`, `.github/**`, Vercel config, `AGENTS.md`, `.cursor/rules/**`, Antigravity workspace rules if later created | B |
| `docs/GUIDE-A.md` and design reference/token notes | A |
| All other playbook docs and unallocated source files | B |
| `docs/PRD.md` | B is primary custodian; source stays frozen and any revision uses a separate team-approved PR |

The owner map applies even when a file is read by both agents. A shared file is **not** jointly editable.

The initial generated playbook is a one-time baseline committed by B to `main` before A starts; A reviews the contract and A guide after receiving access. From that point onward, the primary file owners above apply to every change.

## Change request for any shared file

The non-owner opens a GitHub issue titled `Change request: <file> — <reason>` or comments on the owner's open PR. Include desired behaviour, affected screen/API, acceptance check, and urgency. The owner replies with contract impact, makes the edit on the owner's feature branch, and opens a PR. Requester reviews it. For `CONTRACT.md`, B authors and both humans approve **before** agents implement the change. For a package request by A, B edits `package.json` and `package-lock.json` together, then A pulls the merged result. If the owner is unavailable, both humans explicitly reassign that one file and issue in this document before another agent edits it.

## Integration owner

Builder **B** alone owns the `develop` integration queue, merge order, contract compatibility check, full test run, release PR `develop → main`, deployment, and rollback. Builder A reviews, performs visual QA, and fixes A-owned files on A's branch. B does not patch A's UI during integration; B requests the fix from A. A does not patch B's domain/API code. A can keep working with mocks while B finishes an endpoint.
