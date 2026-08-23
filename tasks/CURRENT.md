# Current Task

## RL-002 — API exits during production startup

Status: REPAIR_APPROVED

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-002`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-002`
- Ticket: `tasks/incidents/RL-002.md`
- Diagnosis artifact: `docs/incidents/RL-002-diagnosis.md`
- Final report: `docs/incidents/RL-002-report.md`

## Required stage now

The learner approved the RL-002 repair after ChatGPT Work reviewed the diagnosis.

Follow `AGENTS.md` and `handoffs/CURRENT.md`. Apply the smallest repair justified in `docs/incidents/RL-002-diagnosis.md`: explicitly supply the API's required `DATABASE_URL` through Compose using the repository's documented environment workflow, with a clear failure when the required value is missing.

Do not commit secrets or delete/reset the PostgreSQL volume. Run every acceptance check in `tasks/incidents/RL-002.md`, including backend tests, frontend build, Compose validation, full-stack health, existing-data loading, and browser creation/refresh persistence.

Write `docs/incidents/RL-002-report.md`, update repository status accurately, then update the mailbox to `FIX_VERIFIED` with `Next actor: CHATGPT_WORK`. Commit and push only `incident/rl-002`, then stop.
