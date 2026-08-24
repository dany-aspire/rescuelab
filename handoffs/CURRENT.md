# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 41
- State: READY_FOR_DIAGNOSIS
- Incident: RL-008
- Branch: incident/rl-008
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 13931780f227651558cca862b36edeef3f1e9c1f
- Scenario commit: this branch root commit
- Last completed incident: RL-007
- Continuation: automatic
- Authorization: standing repair and merge authorization

## Instruction

RL-008 is ready for evidence-based diagnosis on `incident/rl-008`. Reproduce
the customer-visible production gateway failure using the ticket and
production-style Compose stack. Diagnose from runtime, socket, network, HTTP,
log, and configuration evidence before changing application or configuration
files.

Write the diagnosis artifact, advance this mailbox to `DIAGNOSIS_PROPOSED`
with `Next actor: CHATGPT_WORK`, commit and push the documentation-only
handoff, then stop.

End the local response with: “Next step: send `cfgh` to ChatGPT Work.”

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-008.md`
- Diagnosis artifact: `docs/incidents/RL-008-diagnosis.md`
- Final report after approval: `docs/incidents/RL-008-report.md`
