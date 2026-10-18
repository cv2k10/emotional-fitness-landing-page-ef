import { z } from "zod";

const contact = z.object({
  // Single line only: the name is used in the notification email's subject.
  firstName: z.string().trim().min(1).max(100).regex(/^[^\r\n]*$/),
  email: z.email().max(254),
  consent: z.literal(true),
});

export const guideSignupSchema = contact;

export const enquirySchema = contact.extend({
  kind: z.enum(["workshop", "session", "intro"]),
});

export const enquiryLabels: Record<z.infer<typeof enquirySchema>["kind"], string> = {
  workshop: "Workshop interest",
  session: "One-to-one session request",
  intro: "Introductory conversation request",
};
