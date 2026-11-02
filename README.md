# Kanch-Net engineering playbook

Start with [docs/00-START-HERE.md](docs/00-START-HERE.md). The authoritative product specification is [docs/PRD.md](docs/PRD.md), copied unchanged from the supplied v2 PRD. The older root [PRD.md](PRD.md) is historical.

This repository currently contains documentation, while the existing Next.js app is in a separate local repository. Builder B owns importing the app's tracked source into this shared repository through a reviewed pull request before implementation. Do not create a new Next.js project or silently work in two repositories.

Builder A uses Cursor for the interface. Builder B uses Antigravity for data, rules, optional server routes, integration, and release. Every shared file has one primary owner in [TASK-OWNERSHIP.md](docs/TASK-OWNERSHIP.md).

Read [architecture](docs/ARCHITECTURE.md), [contract](docs/CONTRACT.md), [Git workflow](docs/GIT-WORKFLOW.md), [AI tooling](docs/AI-TOOLING.md), then your [A guide](docs/GUIDE-A.md) or [B guide](docs/GUIDE-B.md). Use [integration](docs/INTEGRATION.md), [testing](docs/TESTING-STRATEGY.md), and [deployment](docs/DEPLOYMENT.md) at each checkpoint.
