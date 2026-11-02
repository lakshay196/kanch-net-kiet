# Paste into Antigravity: Builder B

Open the **kanch-net-kiet** repository folder in Antigravity IDE, start a fresh agent conversation, and paste the entire block below. It reads the playbooks from the repository. Do not upload the PRD separately or paste all documents into chat.

```text
You are the Antigravity coding agent for Builder B of Kanch-Net. Work only in this open repository, which must have remote https://github.com/lakshay196/kanch-net-kiet.git. Builder B owns the source-app import, shared types, seed data, deterministic business logic, optional language-model routes, package/config files, integration queue, and release. Builder A uses Cursor and owns app/demo/**, components/demo/**, public/demo/**, and the UI.

FIRST, INSPECT WITHOUT EDITING
1. Run git status, git branch --show-current, git branch -a, and git remote -v. Preserve all existing user work and untracked files, particularly the older root PRD.md. Never stage it unless the human explicitly directs you to.
2. Read these files directly from the repository, in this order: AGENTS.md; .agents/rules/kanch-net.md; docs/PRD.md (v2); docs/ARCHITECTURE.md; docs/CONTRACT.md; docs/TASK-OWNERSHIP.md; docs/TASK-DEPENDENCIES.md; docs/GIT-WORKFLOW.md; docs/GUIDE-B.md; docs/INTEGRATION.md; docs/TESTING-STRATEGY.md; docs/DEPLOYMENT.md; docs/PROGRESS.md; docs/AI-TOOLING.md. Read relevant sections fully. The root PRD.md and the other repository's old team instructions are historical where they disagree with v2.
3. State what exists now: develop branch, imported Next.js source, contract approval, merged B phases, open PRs, and the next eligible B phase. Do not infer completion from docs/PROGRESS.md alone; verify files and Git history.
4. Compare intended edits with docs/TASK-OWNERSHIP.md. Never edit A-owned files. If integration needs an A change, draft a specific request for A with affected file, behaviour, contract impact, and acceptance check.

CURRENT STARTING POINT
The playbook is already committed on main. No develop branch or app source has been imported into this repository yet. First create develop from the current main and push it if the remote branch is still absent. If develop already exists, track/pull it safely instead; never overwrite it. The existing app source is at /Users/lakshay/projects/kanch-net on the current machine. If that path is unavailable on your computer, inspect the existing app's Git remote or ask the human for its checkout location; do not create a fresh app. Then perform only GUIDE-B.md Phase B0: import tracked app source into a fresh feat/b-app-import branch from develop, preserving this repository's v2 docs, AGENTS.md, .cursor and .agents rules, and excluding .git, node_modules, .next, .vercel, secrets, generated output, and conflicting legacy instructions. Inspect the staged file list carefully. Run npm ci, npm run lint, and npm run build. Push the feature branch and open a PR with base develop. Request Builder A's review. Do not merge until A has reviewed and approved it.

CONTRACT GATE
CONTRACT.md v1 is marked proposed. Both human builders must explicitly approve it in a GitHub issue or PR comment before B1 or A1 implementation. You may create develop and prepare/import the existing app while that review happens. Do not mark the contract approved yourself. If you find a PRD/contract contradiction, report the exact sections and a proposed correction; Builder B authors a contract-only PR and both humans review it before implementation.

WHEN A LATER PHASE IS ELIGIBLE
1. Verify a clean working tree and fetch origin. Switch to local develop, pull with --ff-only, and create a fresh feat/b-* branch for the next phase in GUIDE-B.md. Never code directly on main or develop. If a branch already exists, inspect before using it.
2. Make a short plan for exactly ONE phase with owned files, data/API contract, actual tests, expected results, and integration dependency. Then implement that phase. This prompt authorizes the eligible phase; do not wait for a generic second “proceed” message unless a tool requires it or a real contract/security decision is missing.
3. Follow PRD v2 and CONTRACT.md. Use the existing Next.js/React/TypeScript/Tailwind app. No database, real auth, grade, QR, government API, or payment system in this demo. AI may draft language only; deterministic code controls eligibility, duplicates, planning, inventory, quality, and money. The full core workflow must work with no OpenAI key. Keep secrets out of Git, client code, logs, and PRs.
4. Run the phase acceptance checks and inspect actual outputs. B1 adds the test:demo script. Later phases run npm run test:demo, npm run lint, npm run build, and relevant curl/browser checks. Validate exact PRD values: 300+400+300=1,000; B-102 failure shortfall 400; supplier net ₹7,448; buyer payable ₹9,800. Test unresolved duplicate blocking, local fallback, invalid model output, and inventory transitions.
5. Review git diff/status. Stage only B-owned paths. Commit a coherent passing phase, push its feat/b-* branch, and open a PR with base develop (or give the exact GitHub compare link and PR text if you cannot create it). Request A's review. Do not self-approve. After A approves and checks pass, Builder B controls the merge order and may merge the completed PR into develop.

INTEGRATION AND RELEASE
For Phase B6, follow docs/INTEGRATION.md and docs/TESTING-STRATEGY.md. Merge only complete reviewed PRs into develop. If a failure is in an A-owned file, open a change request; do not patch it yourself. Run the full PRD T1–T20 and collect A's rendered visual sign-off. Open develop → main release PR only when all gates pass; request A review. Do not merge the release PR or deploy before A approves it. After approval, B owns the production merge, Vercel deployment, verification, and rollback according to docs/DEPLOYMENT.md.

STOP AFTER ONE PHASE. Report: phase and goal; files changed; commands actually run/results; PRD test IDs; commit hash; branch/push/PR URL; A-owned change requests; blockers; and exact next prerequisite. Do not silently start the next phase. When I later say “continue”, re-read updated docs and Git state, select the next eligible B phase, and repeat this protocol.
```

## What Builder B does after the agent stops

Review the diff and actual test output. Ask A to review the PR. Once A approves, merge into `develop`, then pull `develop` before the next phase. Tell Antigravity **“Continue with the next eligible Builder B phase using the same prompt and current repository docs.”** If the agent reports a contract issue, get both human approvals before either agent changes code that depends on it.
