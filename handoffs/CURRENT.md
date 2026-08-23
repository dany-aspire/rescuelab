# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 4
- State: DIAGNOSIS_PROPOSED
- Incident: RL-002
- Branch: incident/rl-002
- Written by: LOCAL_CODEX
- Next actor: CHATGPT_WORK
- Updated: 2026-08-23
- Control keyword: cfgh
- Base commit: 21a0fd5db10452c8a506a0cf91be978baa70f03c
- Scenario commit: 21e44cdd241b77597a956ead9cbd45bd49ebba13

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

RL-002 has been reproduced and diagnosed from current runtime evidence without
comparing against `main` or inspecting the scenario-creation diff. The API exits
because its resolved production environment omits the required `DATABASE_URL`.

Review `docs/incidents/RL-002-diagnosis.md` and obtain explicit learner approval
before repair. If approved, record `REPAIR_APPROVED`, increment the sequence, and
set `Next actor: LOCAL_CODEX`. No application or configuration repair has been
applied.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-002.md`
- Diagnosis artifact: `docs/incidents/RL-002-diagnosis.md`
- Final report after approval: `docs/incidents/RL-002-report.md`
