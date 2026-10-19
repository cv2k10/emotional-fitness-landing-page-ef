import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { enquiryLabels, enquirySchema, guideSignupSchema } from "./schemas";
import { notifyOwner } from "./notify";
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
      const { firstName, email } = c.req.valid("json");
      const notified = notifyOwner(c, {
        subject: `New guide sign-up: ${firstName}`,
        replyTo: email,
        lines: [
          ["Form", "Free check-in guide"],
          ["First name", firstName],
          ["Email", email],
          ["Consent", "Agreed to receive the guide and occasional notes"],
        ],
      });
      return c.json({ ok: true, notified });
    },
  )

  // Workshop interest, one-to-one session requests and introductory-conversation requests.
  .post(
    "/enquiries",
    zValidator("json", enquirySchema, (result, c) => {
      if (!result.success) return c.json(invalidBody, 400);
    }),
    (c) => {
      const { firstName, email, kind } = c.req.valid("json");
      const notified = notifyOwner(c, {
        subject: `${enquiryLabels[kind]}: ${firstName}`,
        replyTo: email,
        lines: [
          ["Form", enquiryLabels[kind]],
          ["First name", firstName],
          ["Email", email],
          ["Consent", "Agreed to be contacted about this request"],
        ],
      });
      return c.json({ ok: true, notified, kind });
    },
  );
