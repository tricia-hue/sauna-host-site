# Infrastructure & Integrations

Setup reference for `thesaunahost.com` — DNS, hosting, and email-capture wiring.
Last updated: 2026-04-23.

> **ESP change 2026-04-23:** Migrating from Mailchimp → Brevo. The code has
> been swapped (`lib/email.ts` now calls Brevo's v3 Contacts API). Vercel
> env vars still need to be updated (see "Vercel environment variables" below).

---

## Hosting & Domains

**Site:** Next.js 14 app, deployed on Vercel.

- Vercel project: `revivery/sauna-host-site`
- GitHub repo: `tricia-hue/sauna-host-site` (main branch auto-deploys to production)
- Production URL: `https://thesaunahost.com`
- Vercel URL: `https://sauna-host-site.vercel.app` → **308 Permanent Redirect** → `https://thesaunahost.com/`

### DNS (managed at GoDaddy)

thesaunahost.com is registered at GoDaddy. DNS records that matter:

| Type  | Name | Value                | Notes                                       |
|-------|------|----------------------|---------------------------------------------|
| A     | @    | `216.198.79.1`       | Vercel apex IP                              |
| CNAME | www  | `cname.vercel-dns.com.` | Vercel's www handler                     |
| NS    | @    | `ns29.domaincontrol.com.` / `ns30.domaincontrol.com.` | Leave untouched |
| CNAME | _domainconnect | `_domainconnect.gd.domaincontrol.com.` | GoDaddy service record, leave |

The old GoDaddy Website Builder A record (pointing the apex to "Website Builder Site") was replaced — that was the "Launching Soon" parking page. No GoDaddy Domain Forwarding is set up, and should stay off.

### Vercel domain configuration

- `thesaunahost.com` — **Valid Configuration**, Production (primary)
- `sauna-host-site.vercel.app` — **Valid Configuration**, redirects 308 → `thesaunahost.com`

To change this: Vercel → Project `sauna-host-site` → Settings → Domains → Edit.

---

## Email capture (Brevo)

The site captures emails via the custom `OptInForm` component on the landing page. Submissions POST to a Next.js API route, which calls Brevo's v3 Contacts API.

### Integration points in the codebase

| File | Role |
|------|------|
| `components/OptInForm.tsx` | Branded React form (email + optional first name). POSTs to `/api/subscribe`. |
| `app/api/subscribe/route.ts` | Serverless API route. Validates email, calls the Brevo client, sets the unlock cookie for lessons 2–5, returns `{ ok: true }`. |
| `lib/email.ts` | Brevo client. Reads env vars and POSTs to `https://api.brevo.com/v3/contacts` with `updateEnabled: true`. |

**Dev-mode fallback:** If any of the Brevo env vars are missing, `lib/email.ts` logs to the server console and returns success anyway, so the form still looks like it works. Watch for this — if emails stop flowing into Brevo but the form "works", it's usually because an env var got unset.

### Brevo account

- Account: *(to be created — login will be tricia@revivery.co)*
- List: "The Sauna Host" *(to be created)*
- List ID: *(numeric, assigned by Brevo on list creation)*
- Default tag: stored on each contact as the `SOURCE` attribute, value `sauna-host-course`

One-time setup before going live:

1. Create the Brevo account (free plan is fine to start — 300 emails/day, unlimited contacts).
2. **Contacts → Lists → Create list** → name it "The Sauna Host". Note the numeric list ID.
3. **Contacts → Settings → Contact attributes** → confirm `FIRSTNAME` exists (it ships by default) and add two new text attributes: `THEME` and `SOURCE`.
4. **SMTP & API → API Keys → Generate a new API key** → name it "Sauna Host site" → copy the `xkeysib-...` value.
5. **Senders, Domains & Dedicated IPs → Domains → Add a domain** for `revivery.co` (or `thesaunahost.com`) and complete DKIM/SPF verification before activating the automation.

### Vercel environment variables

All set on the `sauna-host-site` project, scoped to Production + Preview, marked Sensitive:

| Variable | Value | Notes |
|----------|-------|-------|
| `BREVO_API_KEY` | *(stored in Vercel, not here)* | Starts with `xkeysib-...`. Pasted directly into Vercel; never commit to repo. |
| `BREVO_LIST_ID` | *(numeric)* | The "The Sauna Host" list ID from Brevo → Contacts → Lists. |
| `BREVO_SOURCE_TAG` | *(not set — code defaults to `sauna-host-course`)* | Written to the `SOURCE` contact attribute. Override here if you want a different value. |

The old `MAILCHIMP_*` vars can be deleted from Vercel once Brevo is verified working.

To change these: Vercel → Project Settings → Environment Variables. **A redeploy is required after any env var change** for it to take effect.

### Last verified end-to-end 2026-04-21 (against Mailchimp — re-verify against Brevo)

The pre-swap Mailchimp integration was verified working: POST to `https://thesaunahost.com/api/subscribe` returned `{"ok":true}` and the test contact `tricia@southtampacrossfit.com` (first name "Tricia") landed in the Mailchimp audience. **After the Brevo env vars are set and the site redeploys, re-run the same test and confirm the contact appears in the Brevo list.**

### What happens on a successful signup

1. Email + first name go into the Brevo "The Sauna Host" list. Each contact gets `SOURCE=sauna-host-course` (and `THEME=<theme>` if a themed opt-in was used).
2. The API route sets an HTTP-only cookie that unlocks Lessons 2–5 and the workbook page on the site.
3. The client redirects to `/welcome`.

---

## Known next steps

These are tracked here so they don't get lost:

1. **Delete the Mailchimp test contact** `tricia@southtampacrossfit.com` — in the old Mailchimp audience. Low priority; it's isolated to the abandoned ESP.
2. **Create the Brevo account, list, attributes, and API key** (see "One-time setup" above).
3. **Add the three `BREVO_*` env vars to Vercel** (Production + Preview, marked Sensitive) and redeploy.
4. **Re-run the end-to-end signup test** against Brevo to confirm the new wiring.
5. **Build the 5-day drip automation in Brevo** (Automations → Create an automation → From scratch). Trigger: contact added to the "The Sauna Host" list. Content for each lesson lives in `content/` and in the rendered `/lesson-N` pages.
6. **Verify a sending domain in Brevo** (`revivery.co` or `thesaunahost.com`) with DKIM + SPF for deliverability.
7. **Delete the old `MAILCHIMP_*` env vars from Vercel** once Brevo is working end-to-end.

---

## Troubleshooting

**Form "works" but nothing shows up in Brevo.**
The dev-mode fallback in `lib/email.ts` is probably kicking in because an env var isn't set (or got scoped to the wrong environment). Check Vercel → Environment Variables and make sure both `BREVO_API_KEY` and `BREVO_LIST_ID` are present for Production.

**"Invalid Configuration" warning on `thesaunahost.com` in Vercel.**
DNS has drifted — most likely someone re-enabled GoDaddy Website Builder or Domain Forwarding. Go to GoDaddy DNS and confirm the A record for `@` still points to `216.198.79.1`.

**Site shows GoDaddy "Launching Soon" page.**
Either: (a) DNS was reverted at GoDaddy, or (b) local browser/OS DNS cache is stale. Try an incognito window first; if it still shows the parking page, check DNS with `dig +short @1.1.1.1 thesaunahost.com` (should return `216.198.79.1`).

**Sauna-host-site.vercel.app stops redirecting.**
Vercel → Domains → Edit on the vercel.app row. It should be set to "Redirect to Another Domain" → `thesaunahost.com`, 308 Permanent Redirect.
