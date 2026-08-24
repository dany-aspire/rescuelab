# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 13
- State: FIX_VERIFIED
- Incident: RL-003
- Branch: incident/rl-003
- Written by: LOCAL_CODEX
- Next actor: CHATGPT_WORK
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 1937d57dc7b86402df245b7e1ca0bb3ed61db6cb
- Scenario commit: this branch root commit
- Approval: learner approved repair in ChatGPT Work

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

The approved production-overlay repair has been applied and every RL-003
acceptance check passed. Docker Compose service discovery now resolves the `db`
service without a fixed host override. No credential was committed, and the
existing PostgreSQL volume and all prior records were preserved.

Review `docs/incidents/RL-003-report.md` and the incident branch changes. The
repair has not been merged into `main`; merge only after explicit learner
approval.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-003.md`
- Diagnosis: `docs/incidents/RL-003-diagnosis.md`
- Final report: `docs/incidents/RL-003-report.md`
- Production overlay: `compose.production.yaml`
