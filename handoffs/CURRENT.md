# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 17
- State: READY_FOR_DIAGNOSIS
- Incident: RL-004
- Branch: incident/rl-004
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 11c5c6a9938704c71d92ce9cb8072275a7eb1b01
- Scenario commit: this branch root commit

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

Create or reuse the worktree specified by `tasks/CURRENT.md`. Read `AGENTS.md`, the current task, and the customer ticket. Reproduce RL-004 as a clean production web-image build.

Complete the diagnosis stage only. Do not change application or configuration files and do not delete or reset the PostgreSQL volume. Write the required diagnosis artifact, update this mailbox to `DIAGNOSIS_PROPOSED` with `Next actor: CHATGPT_WORK`, commit and push the documentation-only handoff, then stop.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-004.md`
- Diagnosis artifact: `docs/incidents/RL-004-diagnosis.md`
- Final report after approval: `docs/incidents/RL-004-report.md`
