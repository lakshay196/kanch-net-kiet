# Kanch-Net engineering playbook

Start with [docs/00-START-HERE.md](docs/00-START-HERE.md). The authoritative product specification is [docs/PRD.md](docs/PRD.md), copied unchanged from the supplied v2 PRD. An older local root `PRD.md` is historical and is not part of this repository.

Ready-to-paste agent kickoff prompts: [Builder A in Cursor](docs/BUILDER-A-PROMPT.md) and [Builder B in Antigravity](docs/BUILDER-B-PROMPT.md). Open the same shared repository on separate computers; each agent reads the referenced playbooks directly from that checkout.

This repository currently contains documentation. The user chose committed [`kanch-net/main`](https://github.com/lakshay196/kanch-net) as the app code foundation and [the live redesign prototype](https://redesign-kench-net.vercel.app/) as the visual reference. The deployed redesign's exact source is unknown, and the committed homepage differs. Builder B imports a clean committed source snapshot into this shared repository through a reviewed pull request; Builder A carries the live site's visual identity into the new `/demo`. See the [prototype baseline and source decision](docs/PROTOTYPE-BASELINE.md). Do not create a second Next.js project.

Builder A uses Cursor for the interface. Builder B uses Antigravity for data, rules, optional server routes, integration, and release. Every shared file has one primary owner in [TASK-OWNERSHIP.md](docs/TASK-OWNERSHIP.md).

Read the [prototype baseline](docs/PROTOTYPE-BASELINE.md), [architecture](docs/ARCHITECTURE.md), [contract](docs/CONTRACT.md), [Git workflow](docs/GIT-WORKFLOW.md), [AI tooling](docs/AI-TOOLING.md), then your [A guide](docs/GUIDE-A.md) or [B guide](docs/GUIDE-B.md). Use [integration](docs/INTEGRATION.md), [testing](docs/TESTING-STRATEGY.md), and [deployment](docs/DEPLOYMENT.md) at each checkpoint.
