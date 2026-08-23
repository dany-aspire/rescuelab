# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 3
- State: READY_FOR_DIAGNOSIS
- Incident: RL-002
- Branch: incident/rl-002
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-23
- Control keyword: cfgh
- Base commit: 21a0fd5db10452c8a506a0cf91be978baa70f03c
- Scenario commit: 21e44cdd241b77597a956ead9cbd45bd49ebba13

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

Create or reuse the worktree specified by `tasks/CURRENT.md`. Read `AGENTS.md`, the current task, and the customer ticket. Reproduce RL-002 from the production-style Docker Compose stack without deleting the existing PostgreSQL volume.

Complete the diagnosis stage only. Do not change application or configuration files. Write the required diagnosis artifact, update this mailbox to `DIAGNOSIS_PROPOSED` with `Next actor: CHATGPT_WORK`, commit and push the documentation-only handoff, then stop.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-002.md`
- Diagnosis artifact: `docs/incidents/RL-002-diagnosis.md`
- Final report after approval: `docs/incidents/RL-002-report.md`
