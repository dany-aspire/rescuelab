# RL-008 Repair Report

## Result

`FIX_VERIFIED` on 2026-08-24. The repair is committed only to
`incident/rl-008`; it has not been merged.

## Repair

The API server's listen host was changed from `127.0.0.1` to `0.0.0.0` in
`backend/src/server.js`.

This is the single bind-address change proposed in the accepted diagnosis. The
port, routes, health check, Nginx proxy, Compose topology, database settings,
and credential handling were not changed. No API host port was published, and
the browser continues to access the API through Nginx on port 8080.

## Verification

### Automated checks and builds

- `npm ci` installed 172 packages and reported zero vulnerabilities.
- `npm run check` passed: all three backend tests passed and the frontend
  production build completed with 29 modules transformed.
- The two-file production Compose configuration validated successfully.
- API and web image builds completed successfully.

### Runtime and network checks

The stack was recreated with `compose.yaml` and `compose.production.yaml` while
reusing the existing `rescuelab` PostgreSQL named volume. PostgreSQL and the API
became healthy, and only the web service published a host port at 8080.

The API kernel socket table now contains a listening socket at:

```text
00000000:0BB8 ... 0A
```

This decodes to listening state on `0.0.0.0:3000`, covering the API container's
Compose-network interface while retaining its loopback health-check path.

From the web container, `http://api:3000/api/health` returned HTTP 200 with:

```json
{"status":"ok","database":"connected"}
```

Through Nginx, both `GET /api/health` and `GET /api/incidents` returned HTTP 200
JSON instead of the pre-repair 502 responses. Nginx logs also recorded the
successful proxied health, listing, and creation requests.

### Browser and persistence checks

Headless Chrome loaded <http://localhost:8080>, reported **All systems
operational**, and displayed all ten existing incidents. It created
`RL-008 repair verification 2026-08-24` through Nginx without an alert. The new
incident remained visible after a cache-bypassing reload, bringing the total to
eleven. A final gateway request returned the persisted record as ID 11.

PostgreSQL reported that its existing database directory was found and skipped
initialization. All ten prior records remained present; the volume was not
deleted, reset, or reinitialized.

## Notes

The image build used Docker's classic builder fallback because Buildx was not
available. npm also reported that the `esbuild` install script was not
allowlisted. Neither warning prevented the tests, production build, image
builds, or runtime acceptance checks from passing. No secrets were displayed or
committed; the local `.env` remains ignored.
