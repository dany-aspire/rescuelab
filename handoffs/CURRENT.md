# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 5
- State: REPAIR_APPROVED
- Incident: RL-002
- Branch: incident/rl-002
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-23
- Control keyword: cfgh
- Base commit: 21a0fd5db10452c8a506a0cf91be978baa70f03c
- Scenario commit: 21e44cdd241b77597a956ead9cbd45bd49ebba13
- Approval: learner approved repair in ChatGPT Work

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

Repair is approved for the diagnosis documented in `docs/incidents/RL-002-diagnosis.md`. Apply the smallest justified configuration repair. Do not commit secrets and do not delete or reset the PostgreSQL volume.

Run all ticket acceptance checks, write `docs/incidents/RL-002-report.md`, and update repository status accurately. Then update this mailbox to `FIX_VERIFIED` with `Next actor: CHATGPT_WORK`, commit and push only `incident/rl-002`, and stop. Do not merge.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-002.md`
- Diagnosis artifact: `docs/incidents/RL-002-diagnosis.md`
- Final report: `docs/incidents/RL-002-report.md`
