# Dependencies and waiting decisions

| Milestone | A can do | B can do | Must wait for | Integration owner |
|---|---|---|---|---|
| R0 repository import | Review existing visual shell and v2 flows | Import app source, reconcile instructions, build | B's import PR merged before coding | B |
| C0 contract freeze | Review field names, UI stages, fixture needs | Finalize types, seed, responses | Both humans approve contract | B |
| F1 foundation | Create visual direction and static shell after R0 | Publish types, seed, local parser | A needs agreed types before real binding | B |
| F2 parallel build | Build stages with typed mocks, responsive states | Build rules, inventory, settlement, routes | Neither waits for the other's implementation | B |
| I1 first integration | Replace mock adapter, fix A-owned UI | Merge B API/domain then A UI PR, test | Contract and B fixture merged | B |
| I2 release | Browser visual sign-off and A fixes | Full checks, release PR, deploy | All T1–T20 pass | B |

## Decision procedure

1. Is the contract frozen and the required type/fixture present? If no, A designs static UI; B completes contract/foundation. Do not invent fields.
2. Is a B function or route unfinished but its contract fixed? A uses a typed mock with exactly the contract's shape and records the replacement point. Do not block.
3. Does the work require a changed shared type or behaviour? Open a contract issue. Continue an unrelated owned phase. Wait only on the dependent task.
4. Is a shared file needed? Non-owner requests a change; owner edits it. Neither agent writes the other's file.
5. Is release or integration being attempted? Wait for complete PRs and passing checks; no unfinished branch enters `develop`.

## Seven common situations

| Situation | Wait? | Next action |
|---|---|---|
| A's UI is ready before B | No | Use contract-typed mock and sample fixture; record adapter switch, inspect responsive states |
| B's logic is ready before A | No | Test T1–T19, invalid input, duplicate resolution, fallback, security; document API examples |
| A needs unfinished API | No if contract fixed | Mock 200/400/413 cases; switch to route only after B PR merges; if contract missing, work another screen |
| B needs a UI decision | Usually no | Issue tagged A with options and deadline; continue pure logic that does not depend on choice |
| Both need one file | Yes for non-owner | Owner makes change request PR; requester reviews; no simultaneous edits |
| One finishes early | No | Review the other's PR, reproduce acceptance cases, improve own tests/docs or prepare owned release checks |
| One is blocked | Only on affected task | Record exact blocker and attempted check in issue; pick next independent task; alert owner if shared contract/file |

## Mock-to-real switch

A keeps all route access behind one UI adapter. The mock returns the exact `CONTRACT.md` envelope, including `source` and errors. After B's PR merges, A pulls clean `develop`, changes the adapter to same-origin `fetch`, preserves the local fallback if offline, and runs T1/T2/T16/T18 in the browser. B checks the API contract and A checks actual UI states. B merges A's adapter PR only after both pass. See [INTEGRATION](INTEGRATION.md).
