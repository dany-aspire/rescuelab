# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 18
- State: DIAGNOSIS_PROPOSED
- Incident: RL-004
- Branch: incident/rl-004
- Written by: LOCAL_CODEX
- Next actor: CHATGPT_WORK
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 11c5c6a9938704c71d92ce9cb8072275a7eb1b01
- Scenario commit: this branch root commit

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

RL-004 was reproduced as a clean production web-image build. The diagnosis is
documented in `docs/incidents/RL-004-diagnosis.md`. No application, Dockerfile,
or configuration repair was applied, and the existing PostgreSQL volume and
records remain intact.

Review the proposed diagnosis and smallest safe repair. If the learner approves
repair, advance this mailbox to `REPAIR_APPROVED` with `Next actor: LOCAL_CODEX`.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-004.md`
- Diagnosis artifact: `docs/incidents/RL-004-diagnosis.md`
- Final report after approval: `docs/incidents/RL-004-report.md`
