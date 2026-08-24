# RescueLab GitHub Handoff

- Protocol: 2
- Sequence: 66
- State: WORK_PROPOSED
- Incident: none
- Task: P2-006
- Branch: phase-2/p2-006
- Written by: CODEX_EXECUTOR
- Next actor: CHATGPT_WORK
- Execution surface: none
- Updated: 2026-08-24
- Control keyword: cfgh
- Control room: GitHub issue #9
- Active pull request: #17
- Last completed task: P2-005
- Last merge PR: #16
- Last merge commit: adc3c6f0aa7f15aa548042db9f0f796eab3fca3b
- Continuation: automatic after independent review
- Authorization: standing repair and merge authorization
- Executor preference: Codex cloud for all tasks until learner changes it
- Update preference: post regular progress updates in ChatGPT Work

## Result

Proposed the complete client-facing diagnosis-to-delivery playbook and reusable
delivery-report template in pull request #17.

The proposal:

- defines scope confirmation, safe reproduction, evidence collection, diagnosis,
  smallest-fix proposal, specific repair approval, implementation, verification,
  rollback decision, delivery, and closure stages;
- separates observation, inference, proposed change, completed change, and
  verified result;
- preserves least privilege, secret redaction, backup, rollback, data
  protection, scope control, and escalation boundaries;
- requires specific approval before every repair;
- distinguishes passed, failed, skipped, and unavailable verification checks;
  and
- does not change application code, README, or historical incident artifacts.

No commit, push, merge, deployment, or application change was performed.

## Instruction

Independently review the complete proposed contents for
`docs/delivery-playbook.md` and `templates/delivery-report.md` in pull request
#17.

Confirm that the proposal satisfies `tasks/phase-2/P2-006.md`, uses plain
client-facing language, preserves all approval and safety gates, contains no
unsupported claims or sensitive information, and stays within the authorized
documentation scope.

If the review passes, apply and merge the approved documentation through the
repository workflow, record completion, and prepare the next task under the
automatic-continuation rule. If the review does not pass, record the requested
corrections and route only those corrections for another proposal.

## Pointers

- Phase definition: `docs/PHASE-2.md`
- Task: `tasks/phase-2/P2-006.md`
- Current task: `tasks/CURRENT.md`
- Intake guide: `docs/client-intake.md`
- Proposed playbook: `docs/delivery-playbook.md`
- Proposed report template: `templates/delivery-report.md`
- Pull request: #17
- Control room: GitHub issue #9
