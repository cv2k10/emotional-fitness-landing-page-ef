import type { Env } from "./env";

type Notification = {
  subject: string;
  replyTo: string;
  lines: [label: string, value: string][];
};

/**
 * Emails a form submission to the site owner.
 * Returns false when notifications are not configured (NOTIFY_FROM is empty); throws if sending fails.
 */
export async function notifyOwner(env: Env["Bindings"], notification: Notification): Promise<boolean> {
  if (!env.NOTIFY_FROM) {
    console.warn("NOTIFY_FROM is not set; skipping email notification.");
    return false;
  }

  const lines = [...notification.lines, ["Received", new Date().toISOString()]];
  await env.NOTIFY_EMAIL.send({
    from: { name: "Emotional Fitness website", email: env.NOTIFY_FROM },
    to: env.NOTIFY_TO,
    replyTo: notification.replyTo,
    subject: notification.subject,
    text: lines.map(([label, value]) => `${label}: ${value}`).join("\n"),
  });
  return true;
}
