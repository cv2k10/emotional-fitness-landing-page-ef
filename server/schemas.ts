import { z } from "zod";

const contact = z.object({
  firstName: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  consent: z.literal(true),
});

export const guideSignupSchema = contact;

export const enquirySchema = contact.extend({
  kind: z.enum(["workshop", "session", "intro"]),
});
