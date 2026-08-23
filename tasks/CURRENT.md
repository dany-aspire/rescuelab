# Current Task

## RescueLab Phase 1 — known-good baseline

Status: Complete

Build and verify a small React/Vite + Express + PostgreSQL application using Docker Compose. Establish the healthy reference state before introducing any training failures.

### Completion criteria

- Backend automated tests pass.
- Frontend production build succeeds.
- Compose configuration is valid.
- Full stack starts on the learner's CachyOS laptop.
- `/api/health` reports that PostgreSQL is connected.
- An incident can be created and then listed in the UI.

### Next learner action

Use this verified Phase 1 branch as the healthy reference state. Introduce training failures only in a later phase or separate branch.

### Verification

The backend tests, frontend production build, Compose validation, complete Docker stack, database-connected health endpoint, incident listing, and browser create/refresh persistence workflow all passed on 2026-08-23. See `docs/baseline-verification.md` for commands and evidence.
