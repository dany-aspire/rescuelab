# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 12
- State: REPAIR_APPROVED
- Incident: RL-003
- Branch: incident/rl-003
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 1937d57dc7b86402df245b7e1ca0bb3ed61db6cb
- Scenario commit: this branch root commit
- Approval: learner approved repair in ChatGPT Work

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

Repair is approved for the diagnosis documented in `docs/incidents/RL-003-diagnosis.md`. Apply the smallest justified production-overlay repair. Do not expose or commit credentials, do not use a fixed container IP, and do not delete or reset the PostgreSQL volume.

Run all ticket acceptance checks using the combined Compose files, write `docs/incidents/RL-003-report.md`, and update repository status accurately. Then update this mailbox to `FIX_VERIFIED` with `Next actor: CHATGPT_WORK`, commit and push only `incident/rl-003`, and stop. Do not merge.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-003.md`
- Diagnosis: `docs/incidents/RL-003-diagnosis.md`
- Final report: `docs/incidents/RL-003-report.md`
- Production overlay: `compose.production.yaml`
