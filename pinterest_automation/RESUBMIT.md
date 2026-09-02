# Pinterest Standard Access — Resubmission (do this)

Everything is prepped. The previous request was denied for one reason only: the demo video looked like a slide deck. Pinterest wants a plain screen recording of the real app. The recording now runs and narrates itself, so this is quick.

App: The Sauna Host - Auto Pin & Analytics (ID 1565235) · Redirect URI: http://localhost:8085/

## Your part — 3 steps (about 5 minutes)

1. **Record.** Press `Cmd + Shift + 5` → Record (Selected Portion is fine; include the Terminal + browser). First close Mail, Slack, and Messages so no private notifications show.
2. **Run the demo.** In Terminal:
   ```bash
   cd "/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation"
   bash recording_demo.sh
   ```
   It opens the app page, runs OAuth, runs the authenticated API calls, shows the queue, and runs the dry run — narrating each step on screen. The **only** thing you do is click **Allow** when Pinterest's consent screen opens.
3. **Stop recording** when you see "Demo complete," and save the file.

Then submit (next section). I can co-drive steps 1–2 live with you if you'd rather I start the recording and click Allow through the browser — just say so.

## Where to submit

Pinterest developer portal → app `1565235` → the access/upgrade request (Standard / Content Publishing). Attach the new recording and paste the message below. If the review is handled over email with the reviewer ("Jack"), reply to that thread with the video attached.

## Scopes to request

- `user_accounts:read` — read the authenticated business account
- `boards:read` — list our own boards (post destinations)
- `pins:read` — read our pins for analytics
- `pins:write` — **the one we need approved** — publish our own pins on a schedule

## Application answers (paste into the form fields)

- **What does your app do?** The Sauna Host - Auto Pin & Analytics publishes our own brand-owned pins to our own Pinterest business account on a light daily schedule, and reads our account, boards, and pin analytics. It does not scrape Pinterest, repost third-party content, or post on behalf of other users.
- **Who uses it?** Only us — the business that owns the account (The Sauna Host / Revivery, Tampa FL).
- **Posting volume?** About 2–3 pins per day from a hand-curated queue. No bulk posting.
- **Content source?** 100% owned or licensed by us; every pin links to thesaunahost.com.
- **Endpoints used?** GET /user_account, GET /boards, GET pin analytics, and POST /pins for scheduled publishing.

## Message to Pinterest

Subject: Standard Access resubmission — screen recording with OAuth flow

Hi Jack,

Thank you for the clarification. I misunderstood the video requirement last time and submitted a presentation-style demo. I've recorded a new plain screen recording that shows me using the app directly:

- the Pinterest Developer app (1565235),
- the OAuth authorization flow and the localhost redirect/callback,
- authenticated Pinterest API calls reading our user account and boards,
- our curated pin queue, and
- the scheduled posting workflow that calls the v5 pins endpoint (shown as a dry run).

The app is used only to publish The Sauna Host's own brand-owned content to our own Pinterest business account and to pull analytics for that content. We post about two to three pins per day from a manually curated queue, all linking to thesaunahost.com.

Thank you for reviewing the corrected submission,
Tricia

## Final checklist before you hit submit

- [ ] The video is a screen recording, not a slide deck.
- [ ] OAuth consent screen is visible, and the localhost success page is visible.
- [ ] Terminal shows the authenticated account + board list (tokens masked).
- [ ] No `.env`, app secret, or unmasked token is ever on screen.
- [ ] The queue shows real, curated, owned content.
- [ ] The written application says ~2–3 pins/day.
