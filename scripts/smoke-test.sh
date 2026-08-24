#!/usr/bin/env bash
set -euo pipefail

base_url="${RESCUELAB_BASE_URL:-http://localhost:8080}"
expected_id="${1:-}"

tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

request() {
  local method="$1"
  local path="$2"
  local output="$3"
  shift 3
  curl --fail --silent --show-error \
    --retry 20 --retry-all-errors --retry-delay 2 \
    --request "$method" --output "$output" \
    "$@" "${base_url}${path}"
}

assert_json() {
  local file="$1"
  local expression="$2"
  local message="$3"
  node -e '
    const fs = require("node:fs");
    const [file, expression, message] = process.argv.slice(1);
    const value = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!Function("value", `return (${expression})`)(value)) {
      console.error(message);
      process.exit(1);
    }
  ' "$file" "$expression" "$message"
}

emit() {
  node -e 'console.log(JSON.stringify({ check: process.argv[1], status: "passed", value: process.argv[2] }))' "$1" "${2:-}"
}

request GET /api/health "$tmp_dir/health.json"
assert_json "$tmp_dir/health.json" 'value.status === "ok" && value.database === "connected"' \
  "Health response did not report an available database."
emit health connected

request GET /api/incidents "$tmp_dir/list-before.json"
assert_json "$tmp_dir/list-before.json" 'Array.isArray(value.incidents)' \
  "Incident listing response did not contain an incidents array."
emit list available

if [[ -n "$expected_id" ]]; then
  EXPECTED_ID="$expected_id" node -e '
    const fs = require("node:fs");
    const value = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
    if (!value.incidents.some((incident) => String(incident.id) === process.env.EXPECTED_ID)) {
      console.error(`Persisted incident ${process.env.EXPECTED_ID} was not returned.`);
      process.exit(1);
    }
  ' "$tmp_dir/list-before.json"
  emit persistence "$expected_id"
  exit 0
fi

title="RescueLab smoke $(date -u +%Y%m%dT%H%M%SZ)-$$"
TITLE="$title" node -e '
  const fs = require("node:fs");
  fs.writeFileSync(process.argv[1], JSON.stringify({ title: process.env.TITLE }));
' "$tmp_dir/create-request.json"
request POST /api/incidents "$tmp_dir/create.json" \
  --header 'Content-Type: application/json' --data-binary "@$tmp_dir/create-request.json"
TITLE="$title" assert_json "$tmp_dir/create.json" 'value.incident && value.incident.title === process.env.TITLE' \
  "Create response did not contain the requested incident."
created_id="$(node -e 'const v=require(process.argv[1]); process.stdout.write(String(v.incident.id))' "$tmp_dir/create.json")"
emit create "$created_id"

request GET /api/incidents "$tmp_dir/list-after.json"
EXPECTED_ID="$created_id" node -e '
  const fs = require("node:fs");
  const value = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
  if (!value.incidents.some((incident) => String(incident.id) === process.env.EXPECTED_ID)) {
    console.error(`New incident ${process.env.EXPECTED_ID} was not returned after reload.`);
    process.exit(1);
  }
' "$tmp_dir/list-after.json"
emit reload "$created_id"

emit result "$created_id"
