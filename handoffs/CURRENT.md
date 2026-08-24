# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 27
- State: REVIEWED
- Incident: RL-005
- Branch: incident/rl-005
- Written by: CHATGPT_WORK
- Next actor: LEARNER
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: a259a6650b001278fde18025d3df2607237d1dfc
- Scenario commit: this branch root commit
- Repair approval: learner approved
- Review decision: approved for merge
- Continuation: automatic to RL-006 after merge

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

ChatGPT Work reviewed the repair, verification report, and branch scope. The repair is approved for merge. Read `reviews/RL-005.md` for the independent review.

No agent may merge until the learner explicitly approves the RL-005 merge through ChatGPT Work. After approval, ChatGPT Work will merge through GitHub, record completion, and automatically prepare RL-006.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-005.md`
- Diagnosis: `docs/incidents/RL-005-diagnosis.md`
- Final report: `docs/incidents/RL-005-report.md`
- Independent review: `reviews/RL-005.md`
- Production overlay: `compose.production.yaml`
