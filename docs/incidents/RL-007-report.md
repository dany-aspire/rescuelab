# RL-007 Repair Report

## Result

`FIX_VERIFIED` on 2026-08-24. The repair is committed only to
`incident/rl-007`; it has not been merged.

## Repair

The split-origin Compose overlay's default `CORS_ORIGIN` was changed from
`http://localhost:5173` to the deployed frontend origin
`http://localhost:8080`.

This is the single configuration value proposed in the accepted diagnosis. The
backend still performs an exact-origin comparison: no wildcard was introduced,
browser security was not disabled, and application routes, ports, database
configuration, and credential handling were not changed.

## Verification

### Automated checks and builds

- `npm ci` completed with 172 packages installed and zero vulnerabilities.
- `npm run check` passed: all three backend tests passed and the frontend
  production build completed with 29 modules transformed.
- The three-file Compose configuration validated successfully.
- The resolved deployment uses frontend origin `http://localhost:8080`, API
  origin `http://localhost:3000`, frontend API base
  `http://localhost:3000/api`, and allowed CORS origin
  `http://localhost:8080`.
- API and web image builds completed successfully.

### Runtime and CORS checks

The stack was rebuilt and force-recreated with `compose.yaml`,
`compose.production.yaml`, and `compose.split-origin.yaml`. PostgreSQL and the
API became healthy, the API was published on port 3000, and the web service was
published on port 8080.

A direct API health request returned HTTP 200 JSON. GET requests from
`Origin: http://localhost:8080` returned HTTP 200 with:

```text
Access-Control-Allow-Origin: http://localhost:8080
Vary: Origin
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

The intended-origin OPTIONS preflight for a JSON POST returned HTTP 204 with
the same allow-origin, methods, and content-type authorization. Requests and
preflights from `https://disallowed.example` received no CORS authorization.
The obsolete `http://localhost:5173` origin also received no authorization,
confirming that the policy remains restrictive and exact.

### Browser and persistence checks

Headless Chrome loaded the frontend from `http://localhost:8080` and called the
API at `http://localhost:3000`. It reported **All systems operational**, loaded
all nine existing incidents, and created
`RL-007 repair verification 2026-08-24` without an alert. The new incident
remained visible after a cache-bypassing page reload, bringing the total to ten.
A final intended-origin API request returned the new record as ID 10 with the
correct CORS headers.

The existing `rescuelab` PostgreSQL named volume was reused throughout. Its
data directory was not deleted, reset, or reinitialized, and all nine prior
records remained present.

## Notes

The image build used Docker's classic builder fallback because Buildx was not
available. npm also reported that the `esbuild` install script was not
allowlisted. Neither warning prevented the tests, production build, image
builds, or runtime acceptance checks from passing. No secrets were displayed or
committed; the local `.env` remains ignored.
