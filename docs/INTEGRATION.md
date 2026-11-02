# Integration checkpoints — Builder B owns all merges

Only completed, reviewed phase PRs enter `develop`. Builder B checks `git status` is clean, merges in dependency order through GitHub, pulls `develop` with `git pull --ff-only origin develop`, runs checks, and records results in [PROGRESS](PROGRESS.md). A reviews B PRs and signs off visual behaviour; B never directly edits A-owned files. A fixes UI defects on A branches; B fixes domain/API defects on B branches. A PR always targets `develop`. The final release PR targets `main`.

| Checkpoint | A ready | B ready | Branch/PR order and pull | Required proof |
|---|---|---|---|---|
| I0 initial setup | Can access repo; reviews app shell | `develop` created; `feat/b-app-import` complete | Merge B import PR; both pull clean `develop` | `npm ci`, `npm run lint`, `npm run build`, old shell opens |
| I1 design and foundation | A1 visual shell PR | B1 types/seed/test PR | Merge B1 first, then A1; both pull | A imports types; no shared-file overlap; 390/1440px screenshots |
| I2 first API integration | A2 adapter and typed mocks | B2 fallback and B5 route contract | Merge B2; B5 route PR; A replaces mock in A-owned adapter PR | `curl` 200/400, browser no-key T1–T3/T16–T18 |
| I3 authentication checkpoint | Role-labelled stage UI only | No auth service | No auth PR; document checkpoint as not applicable | No login gate, token, or false role permission claim |
| I4 core feature integration | A3/A4 stages complete | B3 planner and B4 inventory/settlement complete | Merge B3 then B4, then A3/A4 or their binding PRs; both pull | T4–T15, no duplicate, shortfall lock, balance, exact money |
| I5 complete demo | Actual browser screenshots and bilingual review | Full test and type/build check | B merges remaining complete PRs to `develop` | T1–T20, refresh reset, no-key/offline core path |
| I6 pre-deployment | A signs off mobile, tablet, projector and keyboard | B reviews secrets, diff, logs, PR | B opens `develop → main`; A approves; B merges | Release checklist in TESTING; no secret/legacy scope |
| I7 live verification | A checks live visual states | B checks deployment logs and full sample | Production `main` only | Live `/demo`, no-key fallback, disclaimer, totals |

At each checkpoint, B runs from the merged branch:

```sh
git status
git switch develop
git pull --ff-only origin develop
npm ci
npm run test:demo
npm run lint
npm run build
```

`npm run test:demo` exists after B1; before that checkpoint run the remaining commands. Browser verification is mandatory after source builds. B records command output and screenshot/issue links in the integration PR or `docs/PROGRESS.md`.

## Replacing mocks safely

B's API/domain PR merges first. A confirms clean worktree, pulls `develop`, updates only the A-owned adapter and UI imports, and removes unused mock **calls** while keeping a deliberate local fallback path for offline demo. A checks source labels and failure states in browser. B compares actual response with `CONTRACT.md` and merges A's binding PR only after both verify. Do not alter the contract by changing only one side.

## Contract changes and conflicts

The non-owner opens an issue with exact mismatch and proposed response/type. B authors a contract-only PR; both approve; B updates domain/API; A updates mocks/UI after the contract merges. If a merge conflict touches an A-owned file, A resolves it on A's branch. If it touches a B-owned file, B resolves it. B pauses integration until the correct owner supplies a reviewed fix. Never merge unfinished work to “unblock” the other builder.

## Release and rollback

B opens a release PR from `develop` to `main` with test evidence, A's visual sign-off, and known limitations. After merge, B checks live Vercel. If broken, B uses Vercel's prior successful deployment rollback or a reviewed revert PR; A handles any A-owned hotfix. See [DEPLOYMENT](DEPLOYMENT.md).
