import { Hono } from "hono";

export const healthRoute = new Hono();

healthRoute.get("/health", (c) =>
  c.json({
    service: "ai-service",
    status: "ok",
    timestamp: new Date().toISOString(),
  }),
);
