export type ContactPayload = {
  firstName: string;
  email: string;
  consent: boolean;
};

/** Posts a contact form to the Hono API. Resolves on success; throws with a user-facing message otherwise. */
export async function submitContact(
  endpoint: string,
  payload: ContactPayload & Record<string, unknown>,
): Promise<void> {
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("We couldn't reach the server. Please check your connection and try again.");
  }

  if (!response.ok) {
    throw new Error(
      response.status === 400
        ? "Please check your name and email address and try again."
        : "Something went wrong. Please try again in a moment.",
    );
  }
}

export function readContactForm(form: HTMLFormElement, consentField: string): ContactPayload {
  const data = new FormData(form);
  return {
    firstName: String(data.get("firstName") ?? ""),
    email: String(data.get("email") ?? ""),
    consent: data.get(consentField) === "on",
  };
}
