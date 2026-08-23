# Current Task

## RL-001 — Production frontend cannot use the API

Status: FIX_VERIFIED

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-001`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-001`
- Ticket: `tasks/incidents/RL-001.md`
- Final report: `docs/incidents/RL-001-report.md`

## Completed work

The production failure was reproduced from runtime behaviour without comparing
against `main` or inspecting the incident-creation diff. The frontend build used
an API prefix that did not match the Nginx proxy. After learner approval, the
frontend build argument was aligned with `/api`.

Verification completed on 2026-08-23:

- Backend tests passed.
- Frontend production build passed.
- Docker Compose configuration passed.
- The complete production-style stack became healthy without deleting volumes.
- The proxied health endpoint returned HTTP 200 JSON.
- The browser reported **All systems operational** and listed existing incidents.
- Browser incident creation returned HTTP 201.
- The created incident remained visible after refresh.

See `docs/incidents/RL-001-report.md` for diagnosis, repair, commands, and evidence.
The incident branch is ready for review and has not been merged into `main`.
