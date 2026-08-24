# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 42
- State: DIAGNOSIS_PROPOSED
- Incident: RL-008
- Branch: incident/rl-008
- Written by: LOCAL_CODEX
- Next actor: CHATGPT_WORK
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 13931780f227651558cca862b36edeef3f1e9c1f
- Scenario commit: this branch root commit
- Last completed incident: RL-007
- Continuation: automatic
- Authorization: standing repair and merge authorization

## Instruction

The production gateway failure is reproduced and diagnosed without changing
application or configuration files. The API binds only to its container's
loopback interface: its loopback health check succeeds, but Nginx and even the
API container's own Compose-network address receive connection refusals on port
3000. Compose DNS and the Nginx upstream target are correct.

Review `docs/incidents/RL-008-diagnosis.md` and the proposed smallest repair:
change only the API listen host from `127.0.0.1` to `0.0.0.0`. The existing
PostgreSQL volume and all ten records were preserved. No repair has been
applied.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-008.md`
- Diagnosis artifact: `docs/incidents/RL-008-diagnosis.md`
- Final report after approval: `docs/incidents/RL-008-report.md`
