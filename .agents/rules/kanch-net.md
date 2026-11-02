# Kanch-Net workspace rule for Antigravity

Read AGENTS.md, docs/PRD.md, docs/CONTRACT.md, docs/TASK-OWNERSHIP.md, and docs/GUIDE-B.md before editing.

Builder B owns the app import, data, domain logic, optional AI routes, shared config, integration, and release. Do not edit Builder A's app/demo/**, components/demo/**, or public/demo/** files. Request changes from A in a GitHub issue or PR comment. Follow the frozen contract; both builders must approve any change to it.

Work only on the current B phase on a clean feature branch from develop. Inspect existing code, run the phase's real checks, review the diff, and stop with a report of files, commands/results, commit/push, blockers, and next prerequisite. Never force-push, reset --hard, commit secrets, or let AI decide eligibility, inventory, quality, or settlement.
