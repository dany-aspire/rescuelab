# GitHub-Native RescueLab Handoff

GitHub is the only persistent communication bridge between ChatGPT Work and local Codex. Uploading, downloading, or copying a `HANDOFF.md` file is not part of the workflow.

## Control keyword

The learner sends the standalone keyword `cfgh` to either ChatGPT Work or local Codex. It expands to “check and follow the GitHub handoff.”

The receiving agent reads the canonical mailbox and acts only when named by `Next actor`. Otherwise it reports the state and next actor and stops. The keyword never overrides the diagnosis or independent review gates.

## Canonical router

The `main` copy of `handoffs/CURRENT.md` is the canonical router. When an incident is active, it names the incident branch, state, sequence, and next actor. Detailed stage instructions live in the matching mailbox on the incident branch.

ChatGPT Work may update only this router on `main` during an incident. Local Codex never modifies `main`.

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

- `CHATGPT_WORK`: designs incidents, reviews diagnoses and repairs, records gate decisions, merges repairs that pass independent review, and immediately prepares the next backlog incident.
- `LOCAL_CODEX`: reproduces, diagnoses, documents, repairs only after GitHub records `REPAIR_APPROVED`, verifies, commits, and pushes.
- `LEARNER`: supervises the workflow and has granted standing authorization for routine repair and merge decisions that pass the gates. The learner may pause or override the workflow at any time.

An agent acts only when named by `Next actor`.

## State machine

`IDLE`
→ `READY_FOR_DIAGNOSIS`
→ `DIAGNOSIS_PROPOSED`
→ `REPAIR_APPROVED`
→ `FIX_VERIFIED`
→ `REVIEWED`
→ `MERGED`
→ next incident's `READY_FOR_DIAGNOSIS`

`IDLE` is used only when the backlog has no next incident or continuation is intentionally paused.

Every handoff update increments `Sequence`, names the writer and next actor, and points to durable evidence. Detailed evidence belongs in diagnosis, report, or review files rather than bloating the mailbox.

## Operating loop

1. Work creates the incident branch, ticket, task, and mailbox entry; next actor becomes Codex.
2. The learner sends `cfgh` to Codex.
3. Codex diagnoses, writes and pushes the diagnosis, hands control to Work, and stops.
4. The learner sends `cfgh` to Work.
5. Work reviews the diagnosis. If accepted, Work automatically records `REPAIR_APPROVED` under standing authorization and hands control to Codex. If rejected or uncertain, Work stops and reports the blocker.
6. The learner sends `cfgh` to Codex; Codex repairs, verifies, writes the report, pushes, hands control to Work, and stops.
7. The learner sends `cfgh` to Work; Work independently reviews the branch. If the review passes, Work automatically records the review and merges under standing authorization. If the review fails or is uncertain, Work stops and reports the blocker.
8. Work records completion, immediately prepares the next unchecked backlog incident, and routes the canonical mailbox to it. No separate “start next incident” message is needed.

No transcript synchronization or routine repair/merge approval prompt is required.
