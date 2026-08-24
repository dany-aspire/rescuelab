# Current Task

## RL-004 — Production web-image build failure

Status: REPAIR_APPROVED

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-004`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-004`
- Ticket: `tasks/incidents/RL-004.md`
- Diagnosis artifact: `docs/incidents/RL-004-diagnosis.md`
- Final report: `docs/incidents/RL-004-report.md`

## Required stage now

The learner approved the RL-004 repair after ChatGPT Work reviewed the diagnosis.

Follow `AGENTS.md` and `handoffs/CURRENT.md`. Apply the smallest repair justified in `docs/incidents/RL-004-diagnosis.md`: move the existing frontend source-copy instruction after dependency installation but before the production build command. Preserve sensible dependency-layer caching.

Do not weaken or skip the build and do not delete/reset the PostgreSQL volume. Run every acceptance check in `tasks/incidents/RL-004.md`, including a clean web-image build and complete-stack browser persistence verification.

Write `docs/incidents/RL-004-report.md`, update repository status accurately, then update the incident mailbox to `FIX_VERIFIED` with `Next actor: CHATGPT_WORK`. Commit and push only `incident/rl-004`, then stop.
