# RescueLab Phase 2 — Portfolio and Client Readiness

## Goal

Turn the completed RescueLab incident series into a clear, credible public
portfolio project that supports a narrow paid service:

> Diagnose, repair, verify, and document deployment failures in small
> AI-generated React/Node applications.

Phase 2 packages existing evidence. It does not invent results, claim unsupported
expertise, or expand the service into security audits, payment systems, or
critical production infrastructure.

## Audience

- Prospective Fiverr and Upwork clients with an AI-generated application that
  works partially or works locally but will not deploy reliably.
- Reviewers who want evidence that the learner can supervise an AI coding agent,
  diagnose from runtime evidence, validate repairs, and communicate clearly.
- The learner, who needs a repeatable intake and delivery workflow.

## Workstream

1. **P2-001 — Portfolio evidence audit**
   Inventory the repository, verify every public claim against committed
   artifacts, identify gaps, and recommend the smallest improvements.
2. **P2-002 — Incident case-study index**
   Create a concise navigable index for RL-001 through RL-008 covering symptom,
   diagnosis evidence, repair, and verification.
3. **P2-003 — Client-facing README**
   Rework the repository entrance so a non-specialist understands the problem,
   architecture, workflow, evidence, and limitations within two minutes.
4. **P2-004 — Reproducible demonstration**
   Validate the healthy baseline from a clean checkout and define a practical
   demonstration path, including screenshots or a live deployment only when
   justified.
5. **P2-005 — Intake and triage kit**
   Create a client questionnaire, required-access checklist, reproduction
   checklist, and red-flag/escalation rules.
6. **P2-006 — Delivery playbook**
   Define the diagnosis, approval, repair, regression, reporting, and handoff
   steps for a real small-client engagement.
7. **P2-007 — Portfolio release**
   Perform final public-content QA, confirm no secrets or private research are
   present, and prepare the first portfolio release.

## Operating model

- ChatGPT Work owns planning, independent review, merge, and phase progression.
- `CODEX_EXECUTOR` performs assigned implementation work.
- `CODEX_CLOUD` is the default execution surface.
- `LOCAL_CODEX` is used only when the task requires the learner's exact
  machine or a local-only runtime.
- GitHub issue #9 is the cloud trigger and reporting control room.
- `handoffs/CURRENT.md` remains the canonical router.

## Quality gates

Every Phase 2 deliverable must:

- be supported by repository evidence;
- distinguish observed results from plans or recommendations;
- avoid exposing private Upwork research, credentials, or personal data;
- use plain language suitable for prospective clients;
- preserve the verified `main` baseline;
- pass independent ChatGPT Work review before merge.

## Exit criteria

Phase 2 is complete when:

- all seven tasks are reviewed and merged;
- the public repository clearly demonstrates the eight completed rescues;
- a clean-checkout verification path is documented and tested;
- client intake and delivery procedures are reusable;
- limitations and excluded work are explicit;
- the repository is ready for a tagged portfolio release;
- a factual handoff package is ready for the private freelance-ops repository,
  where marketplace-specific offer copy will be produced.

## Boundary with freelance-ops

RescueLab remains public and contains only portfolio-safe technical material.
Marketplace research, pricing experiments, job intelligence, and proposal
strategy remain in the private `dany-aspire/freelance-ops` repository.
