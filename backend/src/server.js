import pg from "pg";
import { createApp } from "./app.js";
import { createRepository } from "./repository.js";

const port = Number(process.env.PORT ?? 3000);
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString });
const app = createApp(createRepository(pool));
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`RescueLab API listening on port ${port}`);
});

async function shutdown(signal) {
  console.log(`${signal} received; shutting down.`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
