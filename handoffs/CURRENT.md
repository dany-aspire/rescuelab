# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 32
- State: FIX_VERIFIED
- Incident: RL-006
- Branch: incident/rl-006
- Written by: LOCAL_CODEX
- Next actor: CHATGPT_WORK
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: f37a3e7f843a1509155331044cea871ea7a39a1f
- Scenario commit: this branch root commit
- Continuation: automatic from RL-005
- Authorization: standing repair and merge authorization

## Instruction

The approved Nginx path-preservation repair has been applied and every RL-006
acceptance check passed. Direct API health and Nginx-proxied health both return
HTTP 200 JSON, and all final browser verification passed through Nginx. The
existing PostgreSQL volume and all prior records were preserved.

Review `docs/incidents/RL-006-report.md` and the incident branch changes. The
repair has not been merged into `main`.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-006.md`
- Diagnosis artifact: `docs/incidents/RL-006-diagnosis.md`
- Final report: `docs/incidents/RL-006-report.md`
