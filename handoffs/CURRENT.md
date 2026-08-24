# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 35
- State: READY_FOR_DIAGNOSIS
- Incident: RL-007
- Branch: incident/rl-007
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 81cd7cc02e1e4f9a162ca0073da836b57aa53513
- Scenario commit: this branch root commit
- Last completed incident: RL-006
- Continuation: automatic
- Authorization: standing repair and merge authorization

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

RL-007 is ready for evidence-based diagnosis on `incident/rl-007`. Reproduce
the customer-visible split-origin browser failure using the ticket and the
three-file Compose stack. Diagnose from runtime, browser, network, header, and
configuration evidence before changing application or configuration files.

Write the diagnosis artifact, advance this mailbox to `DIAGNOSIS_PROPOSED`
with `Next actor: CHATGPT_WORK`, commit and push the documentation-only
handoff, then stop.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-007.md`
- Diagnosis artifact: `docs/incidents/RL-007-diagnosis.md`
- Final report after approval: `docs/incidents/RL-007-report.md`
