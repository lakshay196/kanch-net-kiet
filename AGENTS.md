# Kanch-Net shared agent instructions

Read docs/PRD.md (v2), docs/ARCHITECTURE.md, docs/CONTRACT.md, docs/TASK-OWNERSHIP.md, and your phase guide before editing. The older root PRD.md and legacy app instructions are historical where they conflict with v2.

Use the imported Next.js/React/TypeScript/Tailwind app in this shared repository. No new project, database, auth, grade, QR, real payment, or government integration for this demo. The core path must work without an AI key. Model output is a draft; deterministic code controls eligibility, inventory, quality balance, and money. Never commit secrets or personal data.

Builder A (Cursor) edits only A-owned UI files. Builder B (Antigravity) edits B-owned data/domain/API/config and owns integration/release. Every shared file has one primary owner in docs/TASK-OWNERSHIP.md. Request changes from that owner; do not edit the file yourself. CONTRACT.md changes need both humans' approval first.

Work on a phase branch from clean develop, not main. Inspect existing code before edits. Implement one approved phase only, run its acceptance checks and build, review git diff/status, then stop and report changed files, commands/results, commit/push, blockers, and next prerequisite. Never force-push or run destructive Git reset. Update docs/PROGRESS.md through its owner.
