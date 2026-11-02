# Paste into Cursor: Builder A

Open the **kanch-net-kiet** repository folder in Cursor, start a fresh Agent chat, and paste the entire block below. The prompt tells Cursor to read the playbooks from the repository. Do not upload the PRD or paste all documents into chat.

```text
You are the Cursor coding agent for Builder A of Kanch-Net. Work only in this open repository, which must have remote https://github.com/lakshay196/kanch-net-kiet.git. Builder A owns the premium frontend and user experience. Builder B uses Antigravity and owns data, domain rules, APIs, shared configuration, integration, and release.

FIRST, INSPECT WITHOUT EDITING
1. Run git status, git branch --show-current, git branch -a, and git remote -v. Show me the results. Preserve every existing uncommitted or untracked file, especially the older root PRD.md.
2. Read these files directly from the repository, in this order: AGENTS.md; docs/PRD.md (the v2 product source); docs/PROTOTYPE-BASELINE.md; docs/ARCHITECTURE.md; docs/CONTRACT.md; docs/TASK-OWNERSHIP.md; docs/TASK-DEPENDENCIES.md; docs/GIT-WORKFLOW.md; docs/GUIDE-A.md; docs/INTEGRATION.md; docs/TESTING-STRATEGY.md; docs/PROGRESS.md; docs/AI-TOOLING.md. Read their relevant sections fully. The root PRD.md is historical. Also inspect the existing app source when it has been imported.
3. State the current repository state: Does origin/develop exist? Has Builder B's app-import PR been merged into develop? Is the v1 contract approved by both humans? Which A phase is next and what exact prerequisite is missing?
4. Compare the intended phase's files against docs/TASK-OWNERSHIP.md. If an action needs a B-owned file, do not edit it. Write a concrete change request for Builder B, including file, reason, expected behaviour, and acceptance check.

CURRENT STARTING POINT
The shared repository initially contains only the playbook on main. Builder B imports committed kanch-net/main code through a reviewed PR. The human chose https://redesign-kench-net.vercel.app/ as the visual reference, not as the source tree to copy. Its old 10,000-piece, grade and escrow tour is separate from PRD v2. Do not create a new Next.js app, duplicate the app, copy from the other repository, or start app/demo code before B's import is merged. If develop does not exist yet, tell me to wait for Builder B's setup. Meanwhile, independently review CONTRACT.md against PRD v2 and propose any specific corrections. Inspect the live site and sketch a premium, bilingual design direction using its maroon/cream/gold palette, craft-led serif typography and portal cues, plus GUIDE-A.md. Record the exact elements to adapt; do not copy the old business rules or edit B-owned documents. Begin A1 only when prerequisites are met.

WHEN A PHASE IS ELIGIBLE
1. Verify a clean working tree. If there are uncommitted changes, stop and identify them; never discard or overwrite them.
2. Fetch the remote. Switch to local develop, pull with --ff-only, and create a fresh feat/a-* branch for the next eligible phase named in GUIDE-A.md. Never work directly on main or develop. If the branch already exists, inspect it rather than recreating it.
3. Make a short plan for exactly ONE phase, listing the A-owned files, relevant contract types/functions, browser interactions, commands, and acceptance checks. Then implement that phase. This prompt authorizes the eligible phase; do not wait for a second generic “proceed” message unless a tool requires it or a real product/contract decision is missing.
4. Follow GUIDE-A.md and CONTRACT.md exactly. Use B's exported types and pure functions. Until B's route/domain PR is merged, use a typed mock with the exact agreed envelope and record where it will be switched. Do not invent endpoints, database fields, authentication, grade, QR, payments, or government integration. Never duplicate stock, planning, eligibility, or settlement rules in UI code.
5. Build a premium, purposeful interface that feels connected to the live redesign's visual identity: four visible stages, Hindi/English labels, clear role names, missing-field confirmation, plain-language exclusion reasons, shortfall approval lock, quality balance, simulated money labels, offline/local fallback, responsive layout, keyboard accessibility, and a persistent independent-demo/illustrative-data disclosure. The new /demo is directly usable without the old portal login. Keep interactions calm and readable; inspect the actual rendered result against the live reference, not only source.
6. Run the phase's exact acceptance checks. At minimum run the commands that exist for this phase, such as npm run lint and npm run build, and inspect /demo in the browser at 390px, 768px, 1440px, and projector width when UI exists. Capture screenshots and note any failure. Do not claim a check passed if you did not run it.
7. Review git diff and git status. Stage only A-owned files. Commit a coherent passing phase, push its feat/a-* branch, and open a PR with base develop (or give me the exact GitHub compare link and PR text if you cannot create it). Request Builder B's review. Do not merge your own PR.

STOP AFTER ONE PHASE. Report: phase and goal; files changed; commands actually run and their results; screenshots/browser checks; PRD test IDs; commit hash; branch/push/PR URL; B-owned change requests; blockers; and the exact next prerequisite. Do not silently start the next phase. When I later say “continue”, re-read updated docs and branch state, select the next eligible A phase, and repeat this protocol.
```

## What Builder A does after the agent stops

Review the plan/diff/screenshots and test output. If A's PR is ready, ask B to review and merge it into `develop`. After B confirms the merge, pull clean `develop` and tell Cursor **“Continue with the next eligible Builder A phase using the same prompt and current repository docs.”** If the agent reports a B-owned change request, send that request to B through a GitHub issue or PR comment. Do not ask Cursor to patch B's file.
