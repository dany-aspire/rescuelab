# Current Task

## RL-006 — Nginx reverse-proxy path failure

Status: REPAIR_APPROVED

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-006`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-006`
- Ticket: `tasks/incidents/RL-006.md`
- Diagnosis artifact: `docs/incidents/RL-006-diagnosis.md`
- Final report: `docs/incidents/RL-006-report.md`

## Required stage now

ChatGPT Work accepted the evidence-based diagnosis. The Nginx `proxy_pass`
trailing slash strips the `/api/` prefix, forwarding `/api/health` to
`/health` and causing the observed 404.

Repair is approved under the learner's standing authorization.

Local Codex must:

1. Make the smallest justified repair: change `proxy_pass http://api:3000/;`
   to `proxy_pass http://api:3000;` in `frontend/nginx.conf`.
2. Preserve the existing PostgreSQL volume and data.
3. Run the ticket acceptance checks and relevant regression tests.
4. Write `docs/incidents/RL-006-report.md` with repair and verification evidence.
5. Update this task to `FIX_VERIFIED`.
6. Advance `handoffs/CURRENT.md` to `FIX_VERIFIED` with
   `Next actor: CHATGPT_WORK`.
7. Commit and push only `incident/rl-006`, then stop. Do not merge.
