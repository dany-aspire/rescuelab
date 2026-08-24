# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 44
- State: FIX_VERIFIED
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

The approved one-line API listen-host repair is applied and verified. The API
now listens on `0.0.0.0:3000`; its loopback health check remains healthy, the
web container reaches `api:3000`, and Nginx returns HTTP 200 JSON for health and
incident listing. No API host port was published and Nginx was not bypassed.

All automated checks, Compose validation, image builds, socket and network
checks, runtime health checks, and browser acceptance checks passed. The
existing PostgreSQL volume and all ten prior records were preserved, and the
browser-created eleventh record persisted after reload. Review the repair and
`docs/incidents/RL-008-report.md` under the standing authorization. The incident
branch has not been merged.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-008.md`
- Diagnosis artifact: `docs/incidents/RL-008-diagnosis.md`
- Final report: `docs/incidents/RL-008-report.md`
