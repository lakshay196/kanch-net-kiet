# Troubleshooting without losing work

Start every recovery with `git status`, current branch `git branch --show-current`, and a copy of the exact error in a GitHub issue. Do not run `git reset --hard` or force-push. The file owner in [TASK-OWNERSHIP](TASK-OWNERSHIP.md) makes the fix; contact that owner when the problem touches shared or other-owned files.

| Symptom / meaning | Identify and safe resolution | Avoid / contact |
|---|---|---|
| Cannot see repository or clone returns 404 | A checks invitation acceptance and browser access; B checks Settings → Collaborators. Retry `git clone https://github.com/lakshay196/kanch-net-kiet.git`. | Do not make repo public to fix access; contact B. |
| Clone authentication fails | Confirm GitHub login/credential helper, use browser-based HTTPS authentication or an approved token. `git remote -v` confirms URL. | Never paste password/token into repo or chat; contact B for repo access. |
| Wrong branch | `git status` first. If clean, `git switch develop` or your feature branch. If dirty, commit on current feature or safely stash before switching. | Do not switch blindly; contact B if edits landed on main/develop. |
| Push rejected | `git fetch origin`. On your own feature branch merge `origin/<your-branch>`, resolve owned conflicts, test, push again. | Never force-push; contact B for shared branch rejection. |
| Pull says local changes would be overwritten | `git status` and `git diff`; commit a WIP on your feature branch or `git stash push -u -m "reason"`, then pull clean branch. Restore stash on original branch. | Never discard unfinished changes; contact owner of affected file. |
| Merge conflict | `git status` lists files. Owner resolves markers, tests, stages, commits. If confused before resolution, `git merge --abort` and ask. | Do not accept one side blindly; contact primary file owner. |
| Agent edited unexpected files | Stop agent; `git diff --stat` and `git diff -- <path>`. Preserve legitimate user edits, ask owner, separate/revert only agent changes after review. | Do not bulk restore; contact owner. |
| `npm ci` missing/failed package | Confirm Node version with `node --version` and that B imported `package-lock.json`. Retry `npm ci` from repo root. | Do not run `npm install` to alter lockfile on A branch; contact B. |
| Lint/build/test fails | Copy command and first meaningful error, locate owner with map, fix only owned file, rerun exact failing check and build. | Do not ignore failures; contact other owner if path not yours. |
| API 404 or wrong response | Check `npm run dev`, path `/api/parse-order` or `/api/catalogue-draft`, request JSON shape from contract; B checks route file. | Do not invent a new endpoint; contact B. |
| CORS error | Same-origin browser call should use `/api/...`, not another host. A checks adapter URL; B checks route. | Do not add `Access-Control-Allow-Origin: *`; coordinate A/B. |
| “Unauthorized” or login problem | Demo has no auth. Check whether legacy shell is being opened instead of `/demo`. | Do not add auth/token to demo; contact B if route unexpectedly rejects. |
| Database connection error | No database should be used. Search imported legacy code path and ensure demo uses seed module. | Do not create DB credentials; contact B. |
| Missing `OPENAI_API_KEY` | Expected: local fallback. If model path needed, B sets untracked `.env.local` or Vercel setting and restarts dev/deploy. | Never put key in `NEXT_PUBLIC_` or Git; contact B. |
| Model returns invalid JSON/changes facts | B checks strict schema/post-validation and fallback; A checks source label. Re-run T18. | Do not trust model output; contact B. |
| Vercel deployment fails | B reads build logs, checks repo link, production branch `main`, Node/build settings, and env names; reproduces `npm run build` locally. | Do not deploy sibling repo or expose secret in logs; contact B. |
| Live demo differs from local | B confirms deployed commit SHA and environment; A checks browser cache and UI; rerun T1/T19. | Do not edit production directly; use owner PR. |

For a single accidental unstaged edit of **your own** file, inspect `git diff -- path`, then use `git restore -- path` only if you knowingly want to discard it. For a shared committed mistake, open a reviewed revert PR. B coordinates recovery and release order.
