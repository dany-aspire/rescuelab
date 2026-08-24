# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 6
- State: FIX_VERIFIED
- Incident: RL-002
- Branch: incident/rl-002
- Written by: LOCAL_CODEX
- Next actor: CHATGPT_WORK
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 21a0fd5db10452c8a506a0cf91be978baa70f03c
- Scenario commit: 21e44cdd241b77597a956ead9cbd45bd49ebba13
- Approval: learner approved repair in ChatGPT Work

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

The approved repair has been applied and every RL-002 acceptance check passed.
The API now receives the required `DATABASE_URL` through required Compose
interpolation, while missing configuration fails with a clear instruction. No
secret was committed and the existing PostgreSQL volume was preserved.

Review `docs/incidents/RL-002-report.md` and the incident branch changes. The
repair has not been merged into `main`; merge only after explicit learner
approval.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-002.md`
- Diagnosis artifact: `docs/incidents/RL-002-diagnosis.md`
- Final report: `docs/incidents/RL-002-report.md`
