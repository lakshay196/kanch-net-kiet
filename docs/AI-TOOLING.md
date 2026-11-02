# Cursor A and Antigravity B setup

## Tools and setup

Both builders clone the same repository, run `npm ci` after B's app import, and use their own feature branches. A opens the folder in Cursor and pastes [Builder A's full prompt](BUILDER-A-PROMPT.md); B opens it in Antigravity IDE and pastes [Builder B's full prompt](BUILDER-B-PROMPT.md). The prompts make each agent inspect the repository and read the docs directly. Pasting the prompt authorizes one eligible phase. Review the agent's plan and diff as it works, then verify actual test output yourself before the PR merges. The agent stops at the phase boundary; a later “continue” starts the next eligible phase.

Cursor project rules are versioned in `.cursor/rules/*.mdc`; Cursor's official [rules guide](https://docs.cursor.com/context/rules-for-ai) documents that format. The shared `AGENTS.md` is a concise cross-agent instruction source. Google's official [Antigravity IDE guide](https://codelabs.developers.google.com/getting-started-agy-ide) places workspace rules in `.agents/rules/`; this repository includes `.agents/rules/kanch-net.md` for B. After import, B opens Antigravity Customizations → Rules and verifies the workspace rule is visible, then starts a fresh session and asks it to summarize ownership. Do not paste Cursor `.mdc` frontmatter into Antigravity or import legacy rules that say grade/QR or a different owner split.

Cursor A: use its planning mode or Ask/read-only mode to inspect first, then Agent mode for the approved phase. Antigravity B: use `/plan` or its implementation plan artifact, review it, then let it implement; review the diff and walkthrough evidence. In both tools, turn on manual approval for destructive Git commands and secret access, and refuse unowned-file edits. Agent “done” claims are not evidence; run commands and inspect the browser yourself.

## Library, registry, skill, rule, MCP

An **npm package** adds runtime/build code to `package.json`. A **component registry** copies component source into the repo. A **rule** is persistent instruction text. A **skill** is an on-demand instruction package. An **MCP server** connects an agent to an external tool/service. A **plugin** bundles agent capabilities. These are different installations.

| Option | Type and use | Decision and exact setup | Owner |
|---|---|---|---|
| Existing Tailwind | npm dependency already in app; layout/tokens | Reuse; `npm ci` after import | B lockfile, A styling |
| shadcn/ui | Component registry/CLI for accessible primitives | Optional if A needs a specific dialog/form. Request B to configure existing project with `npx shadcn@latest init` and add only named component, e.g. `npx shadcn@latest add dialog`. Review generated shared CSS/config before merging. Do not scaffold a new app. [Official setup](https://ui.shadcn.com/docs/installation/next) | B setup, A component use |
| Lucide React | npm icon package | Optional; B runs `npm install lucide-react` after A names icons. Use sparingly, with text labels. [Official guide](https://lucide.dev/guide/react/) | B install, A use |
| Motion | npm animation package | Optional; B runs `npm install motion` only if A demonstrates one useful transition; A imports from `motion/react`. Respect reduced motion. [Official guide](https://motion.dev/docs/react-installation) | B install, A use |
| Aceternity UI, Magic UI, 21st.dev | Component examples/registries, some paid | Discovery only; no default install. Avoid visual effects that compete with task clarity or duplicate shadcn primitives. A must identify exact component and license before B changes shared config. | A evaluates, B config |
| Vitest | npm test package | B runs `npm install -D vitest` and adds `test:demo` script; test pure rules and routes. [Official guide](https://vitest.dev/guide/) | B |
| OpenAI Responses API | Optional external hosted model service | B creates a project API key **outside Git**, puts it in local `.env.local` and Vercel only if model demo is enabled. Use strict structured outputs and post-validation. `OPENAI_MODEL=gpt-5-mini` is recommended if accessible; fallback if not. [Official docs](https://developers.openai.com/api/docs/guides/structured-outputs) | B |
| GitHub integration in agents | MCP/plugin | Optional; browser GitHub PR workflow is sufficient. Do not grant agents merge/release authority. | B evaluates |
| Browser/Playwright MCP | MCP | Optional; manual browser screenshots and PRD checklist are mandatory regardless. No MCP required. | A evaluates |
| Supabase/Figma MCP | MCP | Not needed: no database or Figma source in this build. | None |
| Custom skills | Agent instruction package | No skill is mandatory. Add one only after a repeated failure proves a need; keep it in the agent's documented workspace format and review like code. | B proposes; both approve |

## Environment variables

`.env.example` lists `OPENAI_API_KEY` (secret, optional) and `OPENAI_MODEL` (non-secret model ID, default recommendation `gpt-5-mini`). No database URL, auth secret, Vercel token, or `NEXT_PUBLIC_` model key. Copy the example to `.env.local` only on B's machine if enabling model calls; do not commit it. Without a key, server routes and UI use local fallback. On Vercel, B adds the key only to appropriate Preview/Production environments through project Settings → Environment Variables. The app never logs it. A needs no key.

## Copy-paste prompts

Replace `<phase>` and `<branch>` with the exact guide phase and current branch.

1. **Inspect:** “Read AGENTS.md, docs/PRD.md, docs/CONTRACT.md, docs/TASK-OWNERSHIP.md, and my guide. Report current branch, relevant files, missing prerequisites, and any ownership conflict. Do not edit.”
2. **Plan:** “Plan only phase <phase> on <branch>. List owned files, commands, tests, contract dependencies, and stop point. Do not edit until I review the plan.”
3. **Implement:** “Implement only phase <phase> in my owned files. Follow CONTRACT.md. Run its checks, show actual output, inspect git diff, and stop with the phase report.”
4. **Next phase:** “First verify previous PR merged and develop pulled cleanly. Plan the next guide phase only; do not reuse a dirty branch.”
5. **Debug:** “Reproduce this exact failure, identify root cause, change only my owned files, rerun the failing check and relevant build, then report evidence.”
6. **API binding (A):** “Replace only the demo API adapter's typed mock with CONTRACT.md same-origin routes. Keep offline fallback, test 200/400/timeout, and do not edit B files.”
7. **Data validation (B):** “Validate seed IDs, physical batch duplicates, quantities, dates, and status transitions against PRD v2. Add focused tests and report actual results.”
8. **Review PR:** “Review this diff against PRD v2, CONTRACT.md, ownership, security, and acceptance checks. Give file/line findings only; do not edit or merge.”
9. **Visual review (A):** “Run /demo and inspect actual 390/768/1440px views, keyboard focus, Hindi text, overflow, stages, errors, and screenshots. Fix A-owned issues, then show before/after evidence.”
10. **Integration (B):** “On clean develop, verify merged PRs and contract version, run the full checklist in INTEGRATION.md, report failing case IDs and owning builder. Do not edit A files.”
11. **Final verify:** “Run lint, build, demo tests, PRD T1–T20 in browser, and no-key fallback. Report commands and evidence; do not declare done on assertion alone.”
12. **Progress:** “Update docs/PROGRESS.md with completed phase, PR, test evidence, blockers, and next dependency; stop.”

Neither agent may start another phase automatically. If a prompt asks for a file owned by the other builder, the agent stops that edit and drafts a change request instead.
