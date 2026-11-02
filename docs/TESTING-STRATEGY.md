# Testing and quality gates

B owns pure domain/API tests and the full release test run. A owns demo component/browser/visual/accessibility checks. Both review each other's evidence. The source app currently has no test script; B1 adds Vitest and `npm run test:demo` before tests are expected to run. Use `npm ci`, `npm run test:demo`, `npm run lint`, `npm run build` after B1. Before B1, run lint/build. Record a failure in a GitHub issue with test ID, input, expected/actual result, screenshot or terminal output, and primary file owner.

| Layer | Owner | When | Acceptance |
|---|---|---|---|
| Pure parser/glossary/eligibility/planner/inventory/settlement unit tests | B | Each B PR | T2–T15/T17; exact numbers and transitions |
| Route tests with model stub | B | B5 and release | 200/400/413, timeout/refusal/invalid JSON/fact-changing output uses local fallback; no secret leak |
| Component/state tests where useful | A | Each A PR | Missing-field gate, edit reset, shortfall approval lock, quality balance message |
| Browser end-to-end manual checklist | A runs, B witnesses release | Each integration and release | T1–T20 in real rendered page |
| Responsive and accessibility | A | Every A PR/release | 390/768/1440/projector widths, no clipped controls, keyboard focus/order, labels, contrast, reduced motion |
| Security/privacy | B; A checks UI | B5/release | No key in client/Git/logs, no personal address/phone/Aadhaar, no model control of stock/price/money |
| Performance/reliability | B server, A UI | Release | No-key sample path works offline; model timeout falls back promptly; no long blocking spinner |
| Database/auth tests | None | N/A | No database or auth in v2 prototype |

## PRD acceptance run

| IDs | Test action and expected proof | Primary owner |
|---|---|---|
| T1–T3 | Remove local model key; open `/demo`, run sample, see 2026 parsed date and missing colour/finish; confirmation blocked until supplied | B parser; A UI |
| T4–T6 | Confirm red/plain glossy; B-104 size 2.6 excluded; B-105 duplicate excluded; verified B-101 + B-102 + B-103 fills 1,000 | B logic; A UI |
| T7–T8 | Toggle B-102 failure → 600 filled/400 short/no approval; enable B-106 North 6 km/rate 61 → B-103 90 ranks first | B logic; A UI |
| T9–T12 | Enter default quality → 980 accepted/20 rejected; simulated supplier net ₹7,448, buyer ₹9,800; unbalanced input blocks settlement | B arithmetic; A UI |
| T13–T15 | Cancel pre-collection reservation → available; returned usable stock available only after re-check; damaged stock never saleable | B transitions; A UI |
| T16–T18 | Catalogue draft preserves facts; unknown term asks; bad model output/invented stock rejected and local fallback labelled | B route/fallback; A UI |
| T19–T20 | Refresh resets seed; mobile and projector controls/tables do not clip; keyboard use works | A UI |

For route checks after `npm run dev`, B can use:

```sh
curl -i -X POST http://localhost:3000/api/parse-order -H 'Content-Type: application/json' --data '{"text":"1,000 glass bangles, size 2.4, by 15 Nov","demoYear":2026}'
curl -i -X POST http://localhost:3000/api/parse-order -H 'Content-Type: application/json' --data '{"text":"","demoYear":2026}'
```

The first response must be 200 with null colour/finish and `source`; the second 400 `INVALID_INPUT`. Add equivalent catalogue requests from `CONTRACT.md`. Stub the model client in unit tests so tests do not incur cost or depend on network. Run one real model smoke test only if a key/account is available; record that it was optional. Do not make deployment depend on it.

## Release blockers

Any failed PRD T1–T20, mismatched contract shape, duplicate counted twice, approval on shortfall, unbalanced settlement, wrong ₹ totals, model fact injection, leaked secret/personally identifying data, broken no-key path, build failure, or inaccessible mobile control blocks release. Cosmetic polish can be deferred only if A still judges the page premium and readable; record any minor issue before release. “Agent says tests pass” is insufficient without command output and rendered browser check.
