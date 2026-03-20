import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { chatRoute } from "./routes/chat.js";
import { healthRoute } from "./routes/health.js";

const app = new Hono();

app.get("/", (c) =>
  c.json({
    service: "ai-service",
    role: "orchestration-placeholder",
    message: "This service is reserved for AI orchestration, not core business logic.",
  }),
);

app.route("/", healthRoute);
app.route("/", chatRoute);

const port = Number(process.env.AI_SERVICE_PORT ?? 3001);

serve(
  {
    fetch: app.fetch,
    port,
  },
  () => {
    console.log(`ai-service running on http://localhost:${port}`);
  },
);
