/**
 * Email subscription module.
 * Default implementation: Mailchimp. Swap in Klaviyo/ConvertKit by replacing this file.
 *
 * Required env vars (set in Vercel → Project → Settings → Environment Variables):
 *   MAILCHIMP_API_KEY        — e.g. "abc123-us21"
 *   MAILCHIMP_SERVER_PREFIX  — e.g. "us21" (the bit after the dash in your API key)
 *   MAILCHIMP_AUDIENCE_ID    — the list ID for The Sauna Host course
 *   MAILCHIMP_TAG            — optional, e.g. "sauna-host-course"
 *
 * If these aren't set (e.g. during preview deploys), the function will log to the
 * server console and return success so the UX still works while wiring is being set up.
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
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const tag = process.env.MAILCHIMP_TAG || "sauna-host-course";

  if (!apiKey || !serverPrefix || !audienceId) {
    console.warn(
      "[email] Mailchimp env vars not set. Logging subscription and returning success.",
      input,
    );
    return { ok: true, message: "subscribed (dev mode)" };
  }

  const endpoint = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `apikey ${apiKey}`,
      },
      body: JSON.stringify({
        email_address: input.email,
        status: "subscribed",
        merge_fields: input.firstName
          ? { FNAME: input.firstName }
          : undefined,
        tags: [tag, ...(input.theme ? [`theme:${input.theme}`] : [])],
      }),
    });

    if (res.ok) {
      return { ok: true };
    }

    const body = (await res.json().catch(() => ({}))) as {
      title?: string;
      detail?: string;
    };

    // "Member Exists" is a happy path — they're already subscribed
    if (body.title === "Member Exists") {
      return { ok: true, message: "already subscribed" };
    }

    console.error("[email] Mailchimp error:", body);
    return { ok: false, message: body.detail || "Subscription failed" };
  } catch (err) {
    console.error("[email] Mailchimp network error:", err);
    return { ok: false, message: "Network error" };
  }
}
