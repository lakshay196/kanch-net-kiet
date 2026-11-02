# Shared resources register

“Available” means the file is merged into `develop`. The primary owner makes edits; the other builder proposes changes through an issue/PR comment under [ownership](TASK-OWNERSHIP.md). “Both approve” means human approval before a contract or scope change; ordinary owner-file edits need the other builder's PR review.

| Resource and purpose | Location | Owner | Users | Available | Approval |
|---|---|---|---|---|---|
| Authoritative requirements | `docs/PRD.md` | Frozen team source; B manages PR | Both | Now | Both for revision |
| Live prototype and source decision | `docs/PROTOTYPE-BASELINE.md` | B | Both | Now; choice recorded | Both for a future foundation change |
| Architecture and system boundary | `docs/ARCHITECTURE.md` | B | Both | Now | Both for major change |
| Data record specification and API contract | `docs/CONTRACT.md` | B | Both agents/builders | Before coding | Both |
| Shared types and enums | `lib/demo/types.ts` | B | Both | Foundation PR | Both if public contract changes |
| Seed/sample data | `data/demo-bangle-order.ts` | B | Both | Foundation PR | Review |
| Naming and validation rules | `docs/CONTRACT.md`, `lib/demo/*` | B | Both | Contract/foundation | Both for contract change |
| UI tokens and component rules | `app/demo/demo.css`, `docs/GUIDE-A.md` | A | A, B reviewer | A shell PR | Review |
| Environment template | `.env.example` | B | Both | Now | Both for new variable |
| Mock route envelopes | `docs/CONTRACT.md`, A's UI adapter | B contract; A adapter | Both | Contract/A shell | Both for shape change |
| Sample test data and acceptance cases | `docs/PRD.md` ``5,18; `data/demo-bangle-order.ts` | B | Both | Now/foundation | Review |
| API testing examples | `docs/TESTING-STRATEGY.md` | B | Both | Now | Review |
| Cursor project rules | `.cursor/rules/*.mdc` | B | A | Now | Review |
| Antigravity workspace rule | `.agents/rules/kanch-net.md` plus `AGENTS.md` | B | B | Now | Review |
| Optional agent skills | None required | B if later proposed | Relevant builder | N/A | Both before adding |
| Integration instructions | `docs/INTEGRATION.md` | B | Both | Now | Review |
| Testing instructions | `docs/TESTING-STRATEGY.md` | B | Both | Now | Review |
| Deployment configuration | `docs/DEPLOYMENT.md`, Vercel project settings | B | B; A verifies | Release | Review |
| Third-party model docs/config | `docs/AI-TOOLING.md` and OpenAI's official docs | B | B | Before enabling model | Both for provider change |
| Progress and blockers | `docs/PROGRESS.md` plus GitHub issues/PRs | B | Both | Now | Review |

No database schema file, migration collection, or authenticated API collection is created because this demo has no database or account system. A pilot must define those in a new approved scope. Do not share real `.env.local`, tokens, or Vercel secrets through GitHub or chat. Share variable **names** only.
