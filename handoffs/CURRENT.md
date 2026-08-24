# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 38
- State: FIX_VERIFIED
- Incident: RL-007
- Branch: incident/rl-007
- Written by: LOCAL_CODEX
- Next actor: CHATGPT_WORK
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 81cd7cc02e1e4f9a162ca0073da836b57aa53513
- Scenario commit: this branch root commit
- Last completed incident: RL-006
- Continuation: automatic
- Authorization: standing repair and merge authorization

## Instruction

The approved one-value split-origin CORS repair is applied and verified. The
frontend at `http://localhost:8080` can read health and incidents and create an
incident through the API at `http://localhost:3000`; the new record persists
after reload. Disallowed and obsolete origins receive no CORS authorization, so
the exact-origin restriction remains intact.

All automated checks, Compose validation, image builds, header checks, runtime
health checks, and browser acceptance checks passed. The existing PostgreSQL
volume and all nine prior records were preserved. Review the repair and
`docs/incidents/RL-007-report.md` under the standing authorization. The incident
branch has not been merged.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-007.md`
- Diagnosis artifact: `docs/incidents/RL-007-diagnosis.md`
- Final report: `docs/incidents/RL-007-report.md`
