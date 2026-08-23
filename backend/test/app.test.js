import assert from "node:assert/strict";
import test from "node:test";
import { createApp } from "../src/app.js";

function fakeRepository() {
  const incidents = [];
  return {
    async checkConnection() {},
    async listIncidents() { return incidents; },
    async createIncident(title) {
      const incident = { id: incidents.length + 1, title, status: "open", created_at: new Date().toISOString() };
      incidents.push(incident);
      return incident;
    }
  };
}

async function withServer(run) {
  const server = createApp(fakeRepository()).listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  try {
    await run(`http://127.0.0.1:${server.address().port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test("health reports a connected database", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok", database: "connected" });
  });
});

test("creates and lists an incident", async () => {
  await withServer(async (baseUrl) => {
    const created = await fetch(`${baseUrl}/api/incidents`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "API cannot reach PostgreSQL" })
    });
    assert.equal(created.status, 201);

    const listed = await fetch(`${baseUrl}/api/incidents`);
    const body = await listed.json();
    assert.equal(body.incidents.length, 1);
    assert.equal(body.incidents[0].title, "API cannot reach PostgreSQL");
  });
});

test("rejects an empty incident title", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/incidents`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "   " })
    });
    assert.equal(response.status, 400);
  });
});
