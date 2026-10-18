import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { enquirySchema, guideSignupSchema } from "./schemas";
import type { Env } from "./env";

const invalidBody = { ok: false, error: "Invalid request body" } as const;

export const api = new Hono<Env>()
  .get("/health", (c) => c.json({ ok: true }))

  // Free check-in guide sign-up (lead magnet).
  .post(
    "/guide-signups",
    zValidator("json", guideSignupSchema, (result, c) => {
      if (!result.success) return c.json(invalidBody, 400);
    }),
    (c) => {
      // Placeholder: forward c.req.valid("json") to the email provider (or persist in D1/KV) before launch.
      return c.json({ ok: true, stored: false });
    },
  )

  // Workshop interest, one-to-one session requests and introductory-conversation requests.
  .post(
    "/enquiries",
    zValidator("json", enquirySchema, (result, c) => {
      if (!result.success) return c.json(invalidBody, 400);
    }),
    (c) => {
      // Placeholder: forward c.req.valid("json") to the booking/CRM provider before launch.
      return c.json({ ok: true, stored: false, kind: c.req.valid("json").kind });
    },
  );
