# Current Task

## RL-003 — PostgreSQL connection mismatch inside Docker Compose

Status: REPAIR_APPROVED

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-003`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-003`
- Ticket: `tasks/incidents/RL-003.md`
- Diagnosis artifact: `docs/incidents/RL-003-diagnosis.md`
- Final report: `docs/incidents/RL-003-report.md`
- Production overlay: `compose.production.yaml`

## Required stage now

The learner approved the RL-003 repair after ChatGPT Work reviewed the diagnosis.

Follow `AGENTS.md` and `handoffs/CURRENT.md`. Apply the smallest repair justified in `docs/incidents/RL-003-diagnosis.md`: remove only the production overlay host override that breaks Docker Compose service discovery. Keep the overlay valid; do not replace the service name with a fixed container IP.

Do not expose or commit credentials and do not delete/reset the PostgreSQL volume. Run every acceptance check in `tasks/incidents/RL-003.md`, using the combined base and production Compose files.

Write `docs/incidents/RL-003-report.md`, update repository status accurately, then update the branch mailbox to `FIX_VERIFIED` with `Next actor: CHATGPT_WORK`. Commit and push only `incident/rl-003`, then stop.
