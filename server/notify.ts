import type { Context } from "hono";
import type { Env } from "./env";

type Notification = {
  subject: string;
  replyTo: string;
  lines: [label: string, value: string][];
};

/**
 * Emails a form submission to the site owner without delaying the response.
 *
 * Sending through the send_email binding takes several seconds, so it runs in
 * `waitUntil` after the response is returned. A failed send is logged (Workers
 * observability / `wrangler tail`) but no longer surfaces to the visitor.
 * Returns false when notifications are not configured (NOTIFY_FROM is empty).
 */
export function notifyOwner(c: Context<Env>, notification: Notification): boolean {
  const env = c.env;
  if (!env.NOTIFY_FROM) {
    console.warn("NOTIFY_FROM is not set; skipping email notification.");
    return false;
  }

  const lines = [...notification.lines, ["Received", new Date().toISOString()]];
  const sending = env.NOTIFY_EMAIL.send({
    from: { name: "Emotional Fitness website", email: env.NOTIFY_FROM },
    to: env.NOTIFY_TO,
    replyTo: notification.replyTo,
    subject: notification.subject,
    text: lines.map(([label, value]) => `${label}: ${value}`).join("\n"),
  });

  c.executionCtx.waitUntil(
    sending.catch((error: unknown) => {
      console.error(`Failed to send notification email: ${notification.subject}`, error);
    }),
  );
  return true;
}
