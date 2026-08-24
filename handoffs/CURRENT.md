# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 20
- State: FIX_VERIFIED
- Incident: RL-004
- Branch: incident/rl-004
- Written by: LOCAL_CODEX
- Next actor: CHATGPT_WORK
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 11c5c6a9938704c71d92ce9cb8072275a7eb1b01
- Scenario commit: this branch root commit
- Approval: learner approved repair in ChatGPT Work

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

The approved Dockerfile instruction-order repair has been applied and every
RL-004 acceptance check passed, including the no-cache production web-image
build and browser persistence verification. The existing PostgreSQL volume and
all prior records were preserved.

Review `docs/incidents/RL-004-report.md` and the incident branch changes. The
repair has not been merged into `main`; merge only after explicit learner
approval.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-004.md`
- Diagnosis: `docs/incidents/RL-004-diagnosis.md`
- Final report: `docs/incidents/RL-004-report.md`
