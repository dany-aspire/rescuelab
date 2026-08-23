# GitHub-Native RescueLab Handoff

GitHub is the only persistent communication bridge between ChatGPT Work and local Codex. Uploading, downloading, or copying a `HANDOFF.md` file is not part of the workflow.

## Canonical files

- `handoffs/CURRENT.md`: compact mailbox containing sequence, state, branch, next actor, and pointers.
- `tasks/CURRENT.md`: the active assignment and stage requirements.
- `tasks/incidents/RL-NNN.md`: customer-visible ticket without the hidden root cause.
- `docs/incidents/RL-NNN-diagnosis.md`: Codex's pre-repair evidence and proposed fix.
- `docs/incidents/RL-NNN-report.md`: final repair and verification evidence.
- `reviews/RL-NNN.md`: ChatGPT Work's independent review.
- `STATUS.md`: portfolio progress.
- `tasks/BACKLOG.md`: ordered exercises.

## Actors

- `CHATGPT_WORK`: designs incidents, reviews diagnosis/results, records approvals, and prepares merge decisions.
- `LOCAL_CODEX`: reproduces, diagnoses, documents, repairs only after approval, verifies, commits, and pushes.
- `LEARNER`: supervises reasoning and gives explicit repair and merge approval in ChatGPT Work.

An agent acts only when named by `Next actor`.

## State machine

`IDLE`
→ `READY_FOR_DIAGNOSIS`
→ `DIAGNOSIS_PROPOSED`
→ `REPAIR_APPROVED`
→ `FIX_VERIFIED`
→ `REVIEWED`
→ `MERGED`
→ `IDLE`

Every handoff update increments `Sequence`, names the writer and next actor, and points to durable evidence. Detailed evidence belongs in diagnosis, report, or review files rather than bloating the mailbox.

## Operating loop

1. Work creates the incident branch, ticket, task, and mailbox entry; next actor becomes Codex.
2. The learner tells Codex: `Check and follow the GitHub handoff.`
3. Codex diagnoses, writes and pushes the diagnosis, hands control to Work, and stops.
4. The learner tells Work: `Check the GitHub handoff.`
5. Work reviews the diagnosis and asks the learner for repair approval.
6. After approval, Work records `REPAIR_APPROVED` in GitHub and hands control to Codex.
7. Codex repairs, verifies, writes the report, pushes, hands control to Work, and stops.
8. Work reviews the branch, writes its review, and asks the learner for merge approval.
9. Work merges only after explicit approval, records `MERGED`, then returns the mailbox to `IDLE`.

No transcript synchronization is required.
