export const challenges = [
  "You carry responsibility for others long after the working day ends.",
  "Switching off feels harder than getting things done.",
  "Decisions and conversations keep replaying in your mind.",
  "You hold a professional face, even when things feel heavy.",
  "The next achievement arrives, but fulfilment does not always follow.",
  "Under pressure, you want to respond with intention, not react on instinct.",
];

export type PillarIconName = "awareness" | "resilience" | "leadership";

export const benefits: {
  number: string;
  title: string;
  description: string;
  icon: PillarIconName;
}[] = [
  {
    number: "01",
    title: "Self-awareness",
    description:
      "Recognise emotional patterns and better understand what is driving your reactions.",
    icon: "awareness",
  },
  {
    number: "02",
    title: "Emotional resilience",
    description:
      "Meet pressure, uncertainty, and setbacks with more room to think and choose.",
    icon: "resilience",
  },
  {
    number: "03",
    title: "Intentional leadership",
    description:
      "Communicate more thoughtfully, make considered decisions, and build healthier relationships.",
    icon: "leadership",
  },
];

export const faqs = [
  {
    question: "What is emotional fitness?",
    answer:
      "Emotional fitness is the capacity to notice what is happening within you, understand your patterns, and choose how you want to respond. It is a practical skill to develop over time, not a measure of whether you are doing well or badly.",
  },
  {
    question: "Who is the workshop designed for?",
    answer:
      "It is intended for entrepreneurs, business owners, executives, and professionals who carry responsibility and want a more intentional relationship with pressure, decisions, and the people around them. Final workshop details will be confirmed before registration opens.",
  },
  {
    question: "Do I need previous experience?",
    answer:
      "No previous experience with coaching or reflective practices is needed. The workshop is being shaped as an accessible introduction; confirmed format and content will be shared when registration opens.",
  },
  {
    question: "What happens during a one-to-one session?",
    answer:
      "A session offers confidential space to bring a current challenge, explore the patterns around it, and consider practical next steps. The length, fee, and booking arrangements are placeholders until confirmed.",
  },
  {
    question: "Is emotional fitness support the same as therapy?",
    answer:
      "No. Emotional fitness support is intended as developmental, educational support for reflection and skill-building. It is not psychotherapy, diagnosis, or mental health treatment, and it is not a replacement for care from a qualified clinician.",
  },
  {
    question: "How much time should I set aside to practise?",
    answer:
      "There is no fixed amount. Small, regular moments of reflection can fit around a busy working day. The right rhythm depends on your circumstances and the approach you choose to practise.",
  },
  {
    question: "What happens after I register for the workshop?",
    answer:
      "Registration is not open in this preview. Once dates, delivery, and pricing are confirmed, the registration process and what to expect next should be added here.",
  },
];

export type DialogKind = "workshop" | "session" | "intro";

export const dialogContent: Record<
  DialogKind,
  { eyebrow: string; title: string; description: string; submit: string }
> = {
  workshop: {
    eyebrow: "INTRODUCTORY WORKSHOP",
    title: "Be first to hear when registration opens.",
    description:
      "The workshop date, format, and price are still being confirmed. Register your interest and the finished details can be shared when they are ready.",
    submit: "Register my interest",
  },
  session: {
    eyebrow: "ONE-TO-ONE SUPPORT",
    title: "Start a conversation about support.",
    description:
      "Session availability and the booking calendar are not connected yet. Share your details to request a conversation once those arrangements are confirmed.",
    submit: "Request a conversation",
  },
  intro: {
    eyebrow: "INTRODUCTORY CONVERSATION",
    title: "See whether the approach feels right for you.",
    description:
      "An optional introductory conversation can help you ask questions and understand the next step. Availability is to be confirmed.",
    submit: "Ask about an introduction",
  },
};
