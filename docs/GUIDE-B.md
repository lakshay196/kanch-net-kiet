# Builder B — Antigravity domain, server, and integration guide

## Mission and boundaries

Build the complete deterministic core, seeded demo data, local fallback, and two optional OpenAI-backed route handlers. Own `data/demo-bangle-order.ts`, `lib/demo/**`, `app/api/parse-order/**`, `app/api/catalogue-draft/**`, existing relevant `lib/*` helpers, dependencies/config, and integration/release. Do not edit A-owned `app/demo/**` or `components/demo/**`; request changes through an issue. Read [PRD v2](PRD.md), [contract](CONTRACT.md), [ownership](TASK-OWNERSHIP.md), [Git](GIT-WORKFLOW.md), and [testing](TESTING-STRATEGY.md).

Required: Git, GitHub access, Antigravity, Node meeting the imported app and Vitest requirements (Vitest currently needs Node ≥22.12), npm, browser. OpenAI account/key is **optional**; the core demo works without it. Use `npm ci` after import. B owns `package.json` and lockfile; install `vitest` in a dedicated B-owned foundation PR if tests need it: `npm install -D vitest`, then add `"test:demo": "vitest run"` to scripts. No database setup, migration, authentication, authorization server, CORS policy, or payment integration for this demo. Roles are UI labels only. Do not fabricate those systems.

Module outcomes: parser produces an editable draft with missing facts; glossary suggests/asks confirmation; eligibility explains every inclusion/exclusion; planner fills or reports shortfall; inventory prevents double promise within one session; quality balances; settlement uses accepted pieces only; catalogue assistant preserves facts. B must test actual values, not just function existence. API routes follow [CONTRACT](CONTRACT.md), validate input and output, and fall back on missing key, timeout, refusal, or invalid model output. Log only source and error category, never request text or secrets. Existing helpers may be reused only if they match v2; otherwise wrap in `lib/demo` and preserve the old app.

## Phase B0: import the existing application

**Goal:** Put the actual Next.js app and playbook in one shared repository. **Responsible builder:** B. **Prerequisites:** Contract/ownership review, `develop` exists, clean repo. **Depends on:** A's review of import. **Can proceed independently:** B prepares import. **Tools:** Git, terminal, Antigravity, GitHub.

**Tasks:** 1. Inspect `/Users/lakshay/projects/kanch-net` and its tracked source; do not copy its `.git` or generated files. If B works on another computer, first obtain this existing app checkout from the team through its existing Git remote or a reviewed archive, then adjust the local path below. 2. On `feat/b-app-import`, copy only app source/directories and package/config files into this repository; preserve this repo's `docs`, `README.md`, `AGENTS.md`, and v2 rules. A safe starting command, run from this repository after branch creation, is:

```sh
rsync -a /Users/lakshay/projects/kanch-net/app /Users/lakshay/projects/kanch-net/components /Users/lakshay/projects/kanch-net/data /Users/lakshay/projects/kanch-net/lib /Users/lakshay/projects/kanch-net/public /Users/lakshay/projects/kanch-net/package.json /Users/lakshay/projects/kanch-net/package-lock.json /Users/lakshay/projects/kanch-net/next.config.ts /Users/lakshay/projects/kanch-net/postcss.config.mjs /Users/lakshay/projects/kanch-net/eslint.config.mjs /Users/lakshay/projects/kanch-net/tsconfig.json ./
```

3. Inspect every copied directory for legacy secrets or conflicting agent instructions. Keep original source files unchanged where possible. Commands: `git status`, `npm ci`, `npm run lint`, `npm run build`.

**Acceptance checks:** App boots; existing shell routes still load; build passes; no `node_modules`, `.next`, `.vercel`, key, or private file is staged; `git diff --cached --stat` is reviewed. **Git:** `feat/b-app-import`; commit `chore: import existing Next.js app`; push PR to `develop`; A reviews. **Integration:** B merges after A confirms both will use this one repo. **STOP HERE:** Report files, checks, commit, push, blockers, next prerequisite.

## Phase B1: types, seed, fixtures, test harness

**Goal:** Publish stable data shapes and sample records for parallel UI work. **Responsible builder:** B. **Prerequisites:** B0 merged, contract approved. **Depends on:** A's feedback on contract names, not A code. **Can proceed independently:** Entire phase. **Tools:** Antigravity, terminal, GitHub.

**Tasks:** 1. Create `lib/demo/types.ts` and `data/demo-bangle-order.ts` with B-101–B-105 and B-106 present but disabled by default, canonical-row resolution, fictional labels, rates, and quality defaults. 2. Add focused Vitest harness/script in B-owned config and test fixtures. 3. Publish sample draft/route envelopes matching contract in B-owned tests/docs. Commands: `npm install -D vitest` once, `npm run test:demo`, `npm run lint`, `npm run build`.

**Acceptance checks:** IDs unique by row, B-105 shares physical batch ID with B-101, no real personal data, test fixtures equal PRD quantities, A can import types. **Git:** `feat/b-foundation`; review B paths/package lock; commit `feat(demo): add types and seed fixtures`; push PR. **Integration:** B merges early and tells A to pull clean `develop`. **STOP HERE:** Report evidence and next prerequisite.

## Phase B2: local language functions and catalogue fallback

**Goal:** Make the main path work without a model key. **Responsible builder:** B. **Prerequisites:** B1 merged. **Depends on:** No A code. **Can proceed independently:** Entire phase. **Tools:** Antigravity, terminal.

**Tasks:** 1. Implement `lib/demo/parse-order.ts` for rehearsed Hindi/Hinglish/English examples, explicit nulls, 2026 demo year, and unknown-term clarification. 2. Implement `lib/demo/glossary.ts` with confirmed aliases only; ambiguous counting words require exact piece confirmation. 3. Implement `lib/demo/catalogue-draft.ts` local Hindi/English template that preserves confirmed facts. Commands: `npm run test:demo`, `npm run lint`, `npm run build`.

**Acceptance checks:** T1–T3, T16–T17 and invalid-text cases pass; unknown term is not guessed; no key needed; parser never invents colour/finish. **Git:** `feat/b-language-fallback`; commit `feat(demo): add local language fallbacks`; push PR. **Integration:** A may consume local functions after merge. **STOP HERE:** Report evidence and next prerequisite.

## Phase B3: eligibility, duplicate resolution, lot planning

**Goal:** Produce the exact compatible 1,000-piece plan. **Responsible builder:** B. **Prerequisites:** B1. **Depends on:** Contract's canonical-row decision. **Can proceed independently:** Entire phase. **Tools:** Antigravity, terminal.

**Tasks:** 1. Implement `lib/demo/eligibility.ts` using mandatory confirmed fields and human exclusion reasons; audit existing `lib/match.ts` first. 2. Implement duplicate detection/resolution: unresolved duplicate physical ID excludes all; seeded verified B-101 permits only ROW-101, excludes ROW-105. 3. Implement `lib/demo/plan-lot.ts` and `explain-plan.ts` with sort/take rules and shortfall lock. Commands: `npm run test:demo`, `npm run lint`, `npm run build`.

**Acceptance checks:** T4–T8: B-104 excluded for 2.6, B-105 never counted, 300+400+300=1,000, B-102 failure yields 400 short, B-103 outranks B-106 at equal 6 km. **Git:** `feat/b-planner`; commit `feat(demo): enforce eligibility and plan lot`; push PR. **Integration:** B merges before A's real plan binding. **STOP HERE:** Report evidence and next prerequisite.

## Phase B4: inventory, quality, simulated settlement

**Goal:** Preserve stock and calculate transparent amounts. **Responsible builder:** B. **Prerequisites:** B3. **Depends on:** No A code. **Can proceed independently:** Entire phase. **Tools:** Antigravity, terminal.

**Tasks:** 1. Implement `lib/demo/inventory.ts` pure reserve/release/collect/return/recheck transitions. 2. Implement `lib/demo/settlement.ts` and quality validation; audit existing `lib/settlement.ts`, `lib/score.ts`, and `lib/places.ts` before reuse. 3. Include rework and damaged unsaleable states and line-level fee rounding. Commands: `npm run test:demo`, `npm run lint`, `npm run build`.

**Acceptance checks:** T9–T15 pass, including 980 accepted/20 rejected, supplier net ₹7,448, buyer payable ₹9,800, unbalanced quality blocked, release before collection, return only after recheck, damaged unsaleable. **Git:** `feat/b-inventory-settlement`; commit `feat(demo): track stock and simulated settlement`; push PR. **Integration:** A binds UI only after merge. **STOP HERE:** Report evidence and next prerequisite.

## Phase B5: optional AI routes

**Goal:** Add validated model assistance without weakening fallback. **Responsible builder:** B. **Prerequisites:** B2 and contract; B3/B4 may still be in progress. **Depends on:** A's UI adapter only for final browser check. **Can proceed independently:** Route implementation and tests. **Tools:** Antigravity, terminal, GitHub, browser.

**Tasks:** 1. Implement both route handlers under `app/api` using server-side `fetch` to the OpenAI Responses API with strict structured outputs, `OPENAI_API_KEY` and `OPENAI_MODEL`; no SDK package is required. Default model recommendation is `gpt-5-mini` if available to the team's account; absence of key always uses local fallback. 2. Use fixed JSON schemas with `additionalProperties: false`, input size limit, short timeout, schema/post-validation, refusal and invalid-output fallback, minimal source/error-category logging. 3. Test HTTP 200/400/413 and model-failure fallback. Commands: `npm run test:demo`, `npm run lint`, `npm run build`, `npm run dev` and `curl` examples from [testing](TESTING-STRATEGY.md).

**Acceptance checks:** T1/T2/T16/T18 with no key and, if available, with a key; bad model JSON/fact changes do not mutate stock or listing facts; no secret appears in client bundle or logs. **Git:** `feat/b-ai-routes`; commit `feat(demo): add validated optional AI routes`; push PR. **Integration:** A binds the adapter only after this PR merges. **STOP HERE:** Report files, commands, tests, commit, push, blockers, and next prerequisite.

## Phase B6: integration and release preparation

**Goal:** Prove the complete app works before the release PR. **Responsible builder:** B. **Prerequisites:** B3–B5 and A1–A4 PRs complete. **Depends on:** A's UI binding and actual visual sign-off. **Can proceed independently:** B may run domain/API checks while A fixes UI. **Tools:** GitHub, terminal, browser, Vercel preview.

**Tasks:** 1. Merge completed PRs to `develop` in contract order. 2. Pull clean `develop` and run `npm ci`, `npm run test:demo`, `npm run lint`, `npm run build`. 3. Run every [integration](INTEGRATION.md) checkpoint and PRD T1–T20, including no-key path, with A reviewing rendered UI. 4. Record evidence in `docs/PROGRESS.md` and open release PR `develop → main` only when all gates pass.

**Acceptance checks:** T1–T20 pass; A signs off 390/768/1440/projector screenshots; no owned-file or contract violation; no secret in diff. **Git:** `develop` is updated only by reviewed PRs; B authors the release PR, A reviews; B merges to `main` after approval. **Integration:** B is sole integration owner; A fixes A-owned defects on separate PRs. **STOP HERE:** Report merged PRs, commands/results, release PR, blockers, and deployment prerequisite; do not deploy until release PR is approved.

Sources: [Vitest setup](https://vitest.dev/guide/), [OpenAI Responses structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [gpt-5-mini capabilities](https://developers.openai.com/api/docs/models/gpt-5-mini).
