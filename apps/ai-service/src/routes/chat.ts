import { Hono } from "hono";

export const chatRoute = new Hono();

chatRoute.post("/chat", async (c) => {
  const body = await c.req.json().catch(() => ({}));

  return c.json({
    service: "ai-service",
    status: "placeholder",
    message:
      "Chat orchestration is intentionally deferred. This endpoint only reserves the contract surface.",
    input: body,
  });
});
