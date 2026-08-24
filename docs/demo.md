# RescueLab Reproducible Demonstration

This procedure verifies the healthy training application from a clean checkout. It runs the repository tests and build, validates and starts the Compose topology, exercises the public Nginx endpoint, and confirms that a created incident remains in PostgreSQL after the containers are stopped and recreated. It does not test a production service or provide continuous monitoring.

## Requirements

- Git
- Node.js 22 and npm
- Docker with the Compose plugin
- `curl`
- port `8080` available

No browser automation or screenshots are committed. The HTTP demonstration covers the same API path used by the interface, but visual rendering and browser interaction remain an explicitly unverified evidence gap.

## Clean-checkout demonstration

Run the following from the directory in which you want the checkout. Replace the example repository URL if your remote uses a different address.

```bash
git clone https://github.com/OWNER/rescuelab.git
cd rescuelab
cp .env.example .env
npm ci
npm run check
docker compose config --quiet
docker compose up --build --detach --wait --wait-timeout 120
mkdir -p artifacts
scripts/smoke-test.sh | tee artifacts/initial-smoke.ndjson
INCIDENT_ID="$(node -e 'const fs=require("node:fs"); const lines=fs.readFileSync(process.argv[1], "utf8").trim().split("\n"); process.stdout.write(JSON.parse(lines.at(-1)).value)' artifacts/initial-smoke.ndjson)"
docker compose down
docker compose up --detach --wait --wait-timeout 120
scripts/smoke-test.sh "$INCIDENT_ID" | tee artifacts/persistence-smoke.ndjson
docker compose down
```

The first smoke invocation checks health and listing, creates a uniquely named incident, reloads the list through `http://localhost:8080`, and emits the created ID in its final NDJSON record. The second invocation checks that ID after `docker compose down` and `up`, demonstrating persistence through the named volume. Both shutdown commands deliberately omit `--volumes`/`-v`.

If any command fails, inspect `docker compose ps` and `docker compose logs --no-color`, then run `docker compose down` to clean up without deleting the PostgreSQL volume. The committed `.env.example` contains development-only placeholders; do not reuse them for a shared deployment.

To target another public endpoint, set `RESCUELAB_BASE_URL` when invoking the script:

```bash
RESCUELAB_BASE_URL=http://localhost:8080 scripts/smoke-test.sh
```

## Durable CI evidence

`.github/workflows/demo.yml` repeats the lockfile install, repository checks, Compose validation, build/start, HTTP smoke checks, container recreation, and persistence check on pull requests and manual dispatch. Its `always()` cleanup preserves the volume while removing containers, and its uploaded NDJSON files provide machine-readable evidence for each run. The workflow result—not this document—is the durable evidence that Docker-backed checks passed for a particular revision.
