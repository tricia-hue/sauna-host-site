# Infrastructure & Integrations

Setup reference for `thesaunahost.com` — DNS, hosting, and email-capture wiring.
Last updated: 2026-04-21.

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

## Email capture (Mailchimp)

The site captures emails via the custom `OptInForm` component on the landing page. Submissions POST to a Next.js API route, which calls Mailchimp's REST API.

### Integration points in the codebase

| File | Role |
|------|------|
| `components/OptInForm.tsx` | Branded React form (email + optional first name). POSTs to `/api/subscribe`. |
| `app/api/subscribe/route.ts` | Serverless API route. Validates email, calls the Mailchimp client, sets the unlock cookie for lessons 2–5, returns `{ ok: true }`. |
| `lib/email.ts` | Mailchimp client. Reads env vars and POSTs to `https://{prefix}.api.mailchimp.com/3.0/lists/{audience}/members`. |

**Dev-mode fallback:** If any of the Mailchimp env vars are missing, `lib/email.ts` logs to the server console and returns success anyway, so the form still looks like it works. Watch for this — if emails stop flowing into Mailchimp but the form "works", it's usually because an env var got unset.

### Mailchimp account

- Account: The Sauna Host (login as tricia@revivery.co)
- Data center / server prefix: **`us1`**
- Audience: "The Sauna Host"
- Audience ID: **`86c22fbc26`**
- Default tag applied to all subscribers: **`sauna-host-course`**

### Vercel environment variables

All set on the `sauna-host-site` project, scoped to Production + Preview, marked Sensitive:

| Variable | Value | Notes |
|----------|-------|-------|
| `MAILCHIMP_API_KEY` | *(stored in Vercel, not here)* | Pasted directly into Vercel. Never commit to repo. |
| `MAILCHIMP_SERVER_PREFIX` | `us1` | Must match the suffix after the dash in the API key |
| `MAILCHIMP_AUDIENCE_ID` | `86c22fbc26` | The Sauna Host audience |
| `MAILCHIMP_TAG` | *(not set — code defaults to `sauna-host-course`)* | Override here if you want a different tag |

To change these: Vercel → Project Settings → Environment Variables. **A redeploy is required after any env var change** for it to take effect.

### Verified end-to-end 2026-04-21

- POST to `https://thesaunahost.com/api/subscribe` with a test payload returned `{"ok":true}` (HTTP 200, no "dev mode" message → real Mailchimp branch).
- Test contact `tricia@southtampacrossfit.com` (first name "Tricia") landed in The Sauna Host audience in Mailchimp.

### What happens on a successful signup

1. Email + first name go into Mailchimp's "The Sauna Host" audience, tagged `sauna-host-course`.
2. The API route sets an HTTP-only cookie that unlocks Lessons 2–5 and the workbook page on the site.
3. The client redirects to `/welcome`.

---

## Known next steps

These are tracked here so they don't get lost:

1. **Delete the test contact** `tricia@southtampacrossfit.com` from the Mailchimp audience if you don't want it counted as a real subscriber.
2. **Build the 5-day drip automation in Mailchimp.** The form captures emails now, but no emails go out to subscribers yet. Content for each lesson lives in `content/` and in the rendered `/lesson-N` pages.
3. **Verify a sending domain in Mailchimp** (e.g. `revivery.co` or `thesaunahost.com`) for deliverability and to remove "via mailchimpapp.com" in Gmail's sender line.
4. **Swap ESPs?** The `lib/email.ts` contract is intentionally tiny — replace that file to plug in Klaviyo/ConvertKit/etc. without touching the API route or the form.

---

## Troubleshooting

**Form "works" but nothing shows up in Mailchimp.**
The dev-mode fallback in `lib/email.ts` is probably kicking in because an env var isn't set (or got scoped to the wrong environment). Check Vercel → Environment Variables and make sure all three Mailchimp vars are present for Production.

**"Invalid Configuration" warning on `thesaunahost.com` in Vercel.**
DNS has drifted — most likely someone re-enabled GoDaddy Website Builder or Domain Forwarding. Go to GoDaddy DNS and confirm the A record for `@` still points to `216.198.79.1`.

**Site shows GoDaddy "Launching Soon" page.**
Either: (a) DNS was reverted at GoDaddy, or (b) local browser/OS DNS cache is stale. Try an incognito window first; if it still shows the parking page, check DNS with `dig +short @1.1.1.1 thesaunahost.com` (should return `216.198.79.1`).

**Sauna-host-site.vercel.app stops redirecting.**
Vercel → Domains → Edit on the vercel.app row. It should be set to "Redirect to Another Domain" → `thesaunahost.com`, 308 Permanent Redirect.
