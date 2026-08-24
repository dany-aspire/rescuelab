# RL-008 Diagnosis

## Status

`DIAGNOSIS_PROPOSED` on 2026-08-24. No application or configuration repair has
been applied. This diagnosis requires ChatGPT Work review before the standing
repair authorization can advance the incident.

## Customer symptom reproduced

The production-style stack starts successfully. Docker reports PostgreSQL and
the API as healthy, and Nginx serves the frontend on
<http://localhost:8080>. Despite that healthy API status, Nginx returns HTTP
502 for both `/api/health` and `/api/incidents`.

Headless Chrome reproduces the customer-visible result: both API responses are
HTTP 502 HTML, the UI displays **Service degraded** and
`Could not load incidents`, and the incident queue is empty.

## Reproduction procedure

An ignored local `.env` was copied from `.env.example` without displaying or
committing its values. The existing Compose project and PostgreSQL volume were
reused with:

```bash
docker compose -p rescuelab \
  -f compose.yaml \
  -f compose.production.yaml \
  config --quiet

docker compose -p rescuelab \
  -f compose.yaml \
  -f compose.production.yaml \
  up --build --detach --force-recreate
```

No volume was deleted, reset, or reinitialized.

## Proposed root cause

The API server explicitly binds port 3000 only to `127.0.0.1`. That loopback
address is reachable from processes in the API container, including its health
check, but it is not the API container's Compose-network interface. Nginx
correctly resolves the `api` service to the container address and connects to
that address, where no process is listening, so the kernel refuses the
connection and Nginx returns HTTP 502.

The health check is therefore a false positive for inter-container
reachability: it proves that the application and database respond over the API
container's loopback interface, not that the application accepts connections
from peer containers.

This is an API bind-address failure, not a PostgreSQL, application-route,
Compose DNS, Nginx proxy target, port-number, image-startup, or data-loss
failure.

## Supporting evidence

### Healthy containers and failed gateway

After recreation, service state was:

```text
rescuelab-db-1    Up (healthy), 5432/tcp
rescuelab-api-1   Up (healthy), 3000/tcp
rescuelab-web-1   Up, published on localhost:8080
```

Requests through Nginx returned:

```text
GET http://localhost:8080/api/health     -> HTTP 502
GET http://localhost:8080/api/incidents  -> HTTP 502
```

Chrome independently recorded both same-origin `/api/` responses as HTTP 502
with `text/html` content and rendered `Service degraded`, zero incidents, and
the `Could not load incidents` alert.

### Loopback succeeds while the service network fails

Inside the API container, the same health route succeeds over loopback:

```text
http://127.0.0.1:3000/api/health -> HTTP 200
{"status":"ok","database":"connected"}
```

Compose DNS inside the web container resolves `api` correctly to
`172.18.0.3`. Both a request from the web container to
`http://api:3000/api/health` and a request from the API container to its own
`172.18.0.3:3000` interface fail with `Connection refused`.

That contrast rules out name resolution and network routing: the expected
address is found and reached, but no listener accepts the connection on that
interface.

### Process and socket evidence

The API container runs the expected process chain:

```text
npm start
node src/server.js
```

Its startup log reports that the API is listening on port 3000. The kernel TCP
table identifies the actual listening socket as:

```text
0100007F:0BB8 ... 0A
```

This decodes to listening state `0A` on `127.0.0.1:3000`; there is no listener
on `0.0.0.0:3000` or the container's `172.18.0.3:3000` interface. The current
server startup configuration matches that observation by passing
`"127.0.0.1"` as the host to `app.listen`.

### Gateway log evidence

Nginx targets the correctly resolved upstream and records:

```text
connect() failed (111: Connection refused) while connecting to upstream
upstream: "http://172.18.0.3:3000/api/health"
upstream: "http://172.18.0.3:3000/api/incidents"
```

This explains the customer-facing 502 responses without requiring an Nginx or
Compose service-name change.

### Preserved data

PostgreSQL reports that its existing database directory was found and
initialization was skipped. The API can still list all ten pre-existing
incidents through loopback, including the RL-007 verification record as ID 10.
No creation attempt was made during diagnosis, and the named volume remained in
place.

## Smallest safe repair proposed

Change only the API server's listen host from `127.0.0.1` to `0.0.0.0`:

```js
const server = app.listen(port, "0.0.0.0", () => {
```

This makes the existing port reachable on the container's IPv4 interfaces,
including the Compose network, while preserving the configured port, routes,
health check, Nginx proxy, database access, and container topology. It does not
publish a new host port or bypass Nginx. Host exposure remains governed by
Compose; in this production stack only the web service publishes a port.

## Verification plan after approval

1. Change only the API listen host to `0.0.0.0`.
2. Run backend tests and the frontend production build.
3. Validate the two-file Compose configuration and build both application
   images.
4. Recreate the production stack without deleting or resetting the PostgreSQL
   volume.
5. Confirm PostgreSQL and the API remain healthy and the API listens on the
   intended container interfaces at port 3000.
6. Confirm the web container reaches `api:3000/api/health` with HTTP 200 JSON.
7. Confirm Nginx-proxied health and incident listing return HTTP 200 JSON.
8. Verify in a browser that health, incident loading, creation, and refresh
   persistence work through the gateway.
9. Confirm all ten existing incidents remain and document the results in
   `docs/incidents/RL-008-report.md`.

## Diagnostic integrity

The diagnosis used only current configuration and application files, Compose
validation and runtime state, process and socket state, service DNS and network
requests, direct HTTP responses, container logs, Chrome network/UI evidence,
and the preserved API data. It did not compare the incident branch with
`main`, inspect the scenario-creation diff, or change application or
configuration files.
