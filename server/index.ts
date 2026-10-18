import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { api } from "./api";
import type { Env } from "./env";

const app = new Hono<Env>();

app.use("/api/*", secureHeaders());
app.route("/api", api);
app.notFound((c) =>
  c.req.path.startsWith("/api/")
    ? c.json({ ok: false, error: "Not found" }, 404)
    : c.env.ASSETS.fetch(c.req.raw),
);
app.onError((error, c) => {
  console.error(error);
  return c.json({ ok: false, error: "Internal server error" }, 500);
});

export default app;
