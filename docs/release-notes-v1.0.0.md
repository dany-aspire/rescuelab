# RescueLab v1.0.0

RescueLab v1.0.0 is the first intentionally packaged public release of this training portfolio for diagnosing, repairing, verifying, and documenting deployment failures in a small React/Node/PostgreSQL application.

## Included

- A working React/Vite frontend, Express API, PostgreSQL database, Docker Compose topology, and Nginx reverse proxy.
- Eight deliberately introduced deployment-recovery training exercises with tickets, evidence-backed diagnoses, repair reports, and project workflow reviews.
- A navigable incident case-study index and claim-by-claim portfolio evidence audit.
- A clean-checkout demonstration guide, executable HTTP smoke test, and GitHub Actions workflow covering tests, build, Compose startup, public API checks, container recreation, and persistence.
- A client intake and triage guide with a reusable intake template.
- A diagnosis-to-delivery playbook with a reusable delivery-report template.
- Final public-content QA, improved README navigation, and removal of two private operational notes from the current public tree.

## Evidence and limitations

This release documents training exercises, not client engagements or live-production incidents. It does not establish paid-client experience, production operations, security-audit or payment-system expertise, service-level commitments, revenue outcomes, or guaranteed results.

Browser rendering and visual interaction remain unautomated. Historical incident verification is recorded in committed reports and reviews; durable raw logs or browser artifacts do not exist for every exercise. Historical evidence retains some old local filesystem paths and workflow terminology.

## Verification gate

The release PR must pass the full Reproducible demonstration workflow: dependency installation, backend tests, frontend production build, Compose validation, full stack startup, public Nginx/API smoke checks, container recreation, PostgreSQL persistence, evidence upload, and cleanup.
