# Git and GitHub workflow for two beginners

## Vocabulary

Git records local file history. GitHub hosts the shared remote. A clone is your own local copy. A branch isolates work. A commit is a named snapshot. Push sends commits to GitHub; fetch downloads remote branch information; pull downloads and integrates commits into your current branch. Merge combines branches. A pull request (PR) is a reviewable request to merge one branch into another. `origin` is the usual name for the GitHub remote.

## One repository and access

The existing remote is `https://github.com/lakshay196/kanch-net-kiet.git`. Use it; do not create another repository. The initial playbook was pushed to `main` at commit `efc067a`. The prompt files in this package are a final setup-documentation update before `develop` is created. **Do not repeat the initial commit commands below** if these files are already on GitHub. The older untracked root `PRD.md` is historical and stays unstaged.

```sh
git status
git log -1 --oneline
git remote -v
```

After `develop` exists, feature work uses PRs. B checks GitHub → repository → Settings → General for visibility; private is recommended while the team is building. B invites A via Settings → Collaborators → Add people. A accepts the emailed/GitHub invitation, then opens the repo in a browser. Personal repositories have owner and collaborator roles, so A receives collaborator write access, and the team enforces B's release authority by process. [GitHub's collaborator guide](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository) documents the current UI.

If starting a fresh project elsewhere, B would create **one** private GitHub repository with README and `.gitignore`, invite A, then both clone that same URL. That alternative is not needed here.

On each Mac, install Git and Node.js from official sources, sign in to GitHub in the browser, then:

```sh
git clone https://github.com/lakshay196/kanch-net-kiet.git
cd kanch-net-kiet
git remote -v
git status
```

Open that folder in Cursor (A) or Antigravity (B) using File → Open Folder. HTTPS GitHub authentication may prompt for a browser login or credential manager; use a supported token/credential flow, never a password in a command.

## Branches and protection

`main` is the stable release. `develop` is the integration line. Each phase has a short-lived branch from updated `develop`: `feat/a-demo-shell`, `feat/a-quality-ui`, `feat/b-foundation`, `feat/b-planner`, `feat/b-api`. Prefix identifies the owner. B merges reviewed feature PRs into `develop` in dependency order; B opens `develop → main` release PR after full tests. Neither works directly on `main` or `develop` after setup.

B creates `develop` once from a clean `main`:

```sh
git switch main
git pull --ff-only origin main
git switch -c develop
git push -u origin develop
```

A tracks the existing remote branch:

```sh
git fetch origin
git switch --track origin/develop
git branch --show-current
```

On GitHub Settings → Branches/Rulesets, require PRs and block force pushes/deletions for `main` and `develop` where the repository plan permits. Require one approving review when available, and status checks only after CI jobs exist and pass. Private-repo protection features vary by plan; if unavailable, use the same PR/review checklist manually. Do not configure a required check that does not exist. [GitHub branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) explains plan availability.

## Exact phase commands

Run only when `git status` is clean. Start a new phase:

```sh
git switch develop
git pull --ff-only origin develop
git switch -c feat/a-demo-shell
git branch --show-current
git status
```

B replaces the example branch with `feat/b-...`. During work, inspect changes with `git status` and `git diff`. After checks pass, stage **only owned files** and commit:

```sh
git add app/demo components/demo
git diff --cached --stat
git commit -m "feat(demo): build buyer confirmation UI"
git push -u origin feat/a-demo-shell
```

B uses specific B-owned paths rather than A's paths. Open GitHub → Pull requests → New pull request; choose **base `develop`**, compare your feature branch, fill the PR template with test output/screenshots, request the other builder's review. Reviewer checks files, contract, ownership, and evidence, then approves or requests changes. B merges after required checks; use GitHub's Squash and merge consistently. Delete the remote feature branch only after merged. PR author does not self-approve.

If `develop` changed while you are mid-phase: finish or safely commit current work first. Then fetch and merge **into your feature branch**:

```sh
git status
git fetch origin
git merge origin/develop
```

Resolve any conflicts only in files you own; ask the primary owner for a shared-file conflict. Re-run checks and `git push` your feature branch. Do not run an agent-driven blind `git pull` during uncommitted edits. On a clean feature branch, `git pull --ff-only` is fine only if you intend to update that same remote feature branch.

After B merges your PR:

```sh
git switch develop
git pull --ff-only origin develop
git branch -d feat/a-demo-shell
```

`git branch -d` safely refuses to delete an unmerged branch. Do not delete unfinished branches. To switch branches without losing work, first commit a meaningful work-in-progress on your feature branch or use `git stash push -u -m "reason"` and record it; later `git stash list` and `git stash pop` on the original branch. Prefer committing for beginners.

## Daily routines

**A:** Check status → clean `develop` pull → create `feat/a-*` → read A guide and contract → Cursor plan for one phase → implement A-owned files → browser QA at mobile/tablet/desktop → lint/build → review diff → commit/push → PR to `develop` → address review on same branch → after merge pull `develop`.

**B:** Check status → clean `develop` pull → create `feat/b-*` → read B guide and contract → Antigravity plan for one phase → implement B-owned files → domain/API tests → lint/build → review diff → commit/push → PR to `develop` → ask A to review → merge in dependency order → pull `develop` before next phase. B also runs integration and release checks.

Commit after a coherent passing phase, push at least at phase end and before handing work to the other builder. Open a PR when the phase is reviewable, not after several unrelated phases. Neither builder waits for the other if [TASK-DEPENDENCIES](TASK-DEPENDENCIES.md) permits mock or independent work.

## Conflict and error recovery

A conflict means Git cannot decide which edit to keep. Stop the agent, run `git status`, identify the file owner, and ask that owner to resolve. For your own file, open conflict markers `<<<<<<<`/`=======`/`>>>>>>>`, keep the intended combined content, remove markers, run tests, `git add <file>`, then `git commit`. Do not accept “ours” or “theirs” blindly. If a merge is too confusing and you have not committed conflict resolution, `git merge --abort` returns to the pre-merge state; ask the other builder.

If push is rejected, run `git status` and `git fetch origin`. On your own feature branch, `git merge origin/<your-feature-branch>` then retry; on `develop`/`main`, stop because direct pushes are not part of this workflow. To undo one accidental **unstaged** local edit, inspect `git diff -- path`, then `git restore -- path` only after confirming it is your own dispensable work. To undo a committed shared change, use a reviewed revert PR; never rewrite shared history.

Never force-push shared branches, blindly run `git reset --hard`, overwrite another builder's unfinished edits, delete unfinished branches, or commit secrets. If an agent changes non-owned files, stop, capture `git diff --stat`, ask the owner, and separate/revert only the agent's uncommitted changes after checking the diff.

GitHub Desktop can perform clone, branch creation, commit, push, PR, and branch switching through buttons, but use the same branch names, ownership map, and clean-worktree checks. It does not replace code review or tests.
