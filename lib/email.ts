/**
 * Email subscription module.
 * Default implementation: Brevo (formerly Sendinblue).
 * Swap ESPs by replacing this file — the API contract is tiny (see subscribeToEmailList below).
 *
 * Required env vars (set in Vercel → Project → Settings → Environment Variables):
 *   BREVO_API_KEY   — starts with "xkeysib-..." (create under Brevo → SMTP & API → API Keys)
 *   BREVO_LIST_ID   — numeric ID of the Sauna Host list (Brevo → Contacts → Lists)
 *
 * Optional:
 *   BREVO_SOURCE_TAG — default "sauna-host-course" (stored on the contact as SOURCE attribute)
 *
 * If these aren't set (e.g. during preview deploys), the function will log to the
 * server console and return success so the UX still works while wiring is being set up.
 *
 * Brevo API reference: https://developers.brevo.com/reference/createcontact
 */

type SubscribeInput = {
  email: string;
  firstName?: string;
  theme?: string;
  source?: string;
};

type SubscribeResult = {
  ok: boolean;
  message?: string;
};

export async function subscribeToEmailList(
  input: SubscribeInput,
): Promise<SubscribeResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const listIdRaw = process.env.BREVO_LIST_ID;
  const defaultSourceTag = process.env.BREVO_SOURCE_TAG || "sauna-host-course";

  if (!apiKey || !listIdRaw) {
    console.warn(
      "[email] Brevo env vars not set. Logging subscription and returning success.",
      input,
    );
    return { ok: true, message: "subscribed (dev mode)" };
  }

  const listId = Number(listIdRaw);
  if (!Number.isFinite(listId)) {
    console.error(
      "[email] BREVO_LIST_ID is not a number:",
      listIdRaw,
    );
    return { ok: false, message: "Email list misconfigured" };
  }

  // Build attributes. Brevo attribute names are conventionally UPPERCASE.
  // FIRSTNAME exists by default; THEME + SOURCE you may need to create once
  // under Brevo → Contacts → Settings → Contact attributes (as text type).
  const attributes: Record<string, string> = {
    SOURCE: input.source || defaultSourceTag,
  };
  if (input.firstName) attributes.FIRSTNAME = input.firstName;
  if (input.theme) attributes.THEME = input.theme;

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: input.email,
        attributes,
        listIds: [listId],
        // updateEnabled: true means re-submitting an existing email merges
        // attributes and ensures they're on the list — no "duplicate_parameter" error.
        // This is our equivalent of the Mailchimp "Member Exists" happy path.
        updateEnabled: true,
      }),
    });

    // 201 Created (new contact) or 204 No Content (updated existing) are both success.
    if (res.ok) {
      return { ok: true };
    }

    const body = (await res.json().catch(() => ({}))) as {
      code?: string;
      message?: string;
    };

    console.error("[email] Brevo error:", res.status, body);
    return { ok: false, message: body.message || "Subscription failed" };
  } catch (err) {
    console.error("[email] Brevo network error:", err);
    return { ok: false, message: "Network error" };
  }
}
