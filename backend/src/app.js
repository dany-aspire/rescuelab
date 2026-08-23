import express from "express";

export function createApp(repository) {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json());

  app.get("/api/health", async (_request, response, next) => {
    try {
      await repository.checkConnection();
      response.json({ status: "ok", database: "connected" });
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/incidents", async (_request, response, next) => {
    try {
      response.json({ incidents: await repository.listIncidents() });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/incidents", async (request, response, next) => {
    const title = request.body?.title?.trim();
    if (!title || title.length > 120) {
      return response.status(400).json({ error: "Title must contain 1-120 characters." });
    }

    try {
      const incident = await repository.createIncident(title);
      return response.status(201).json({ incident });
    } catch (error) {
      return next(error);
    }
  });

  app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(503).json({ error: "Service temporarily unavailable." });
  });

  return app;
}
