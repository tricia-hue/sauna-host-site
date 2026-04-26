# Pinterest Standard Access — Video Demo Guide

**Goal:** record a 90-second screen recording showing the OAuth flow + the main Pinterest features the app uses, then upload it to the Pinterest Developer Portal.

## What Pinterest is asking for (paraphrased)

1. Show the OAuth authentication flow.
2. Show the main Pinterest features the app uses.
3. Optional voiceover.

## Strategy

We're going with the **production + code walkthrough** approach instead of trying to demo against Pinterest's sandbox. Reasons:
- OAuth, listing boards, and pulling analytics all work in production with Trial access — those are legit, recordable demos.
- Pin creation is blocked in production with Trial, but we don't need to actually post on camera. We narrate what `post_next.py` does and show the queue (`pin_queue.csv`) to demonstrate curated, brand-owned content (a strong "not spam" signal for the reviewer).
- This avoids spinning up sandbox boards just for a demo.

## Pre-recording setup (5 minutes)

1. **Close noisy apps** — quit Slack, Mail, anything that might post a notification on screen.
2. **Set up a clean Terminal window.** Increase font size (⌘+ a few times). Make the window large enough to be readable in a recording.
3. **Open these in your editor (VS Code or whatever you use)**, ready to switch to:
   - `pinterest_automation/oauth_helper.py`
   - `pinterest_automation/pinterest_client.py`
   - `pinterest_automation/post_next.py`
   - `pinterest_automation/pin_queue.csv`
4. **Open Chrome** with `https://developers.pinterest.com/apps/1565235/` in a tab — you may want to show the app overview briefly.
5. **Pre-stage these terminal commands** as Terminal history (run them once before recording so up-arrow recalls them):
   ```bash
   cd "/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation"
   source .venv/bin/activate
   python -c "from pinterest_client import PinterestClient; bs=PinterestClient().list_boards(); print(f'{len(bs)} boards on the Sauna Host account:'); [print(f'  {b[\"name\"]}') for b in bs]"
   python pull_analytics.py
   wc -l pin_queue.csv
   ```

## Recording tool

**Cmd+Shift+5** (built into macOS) — pick "Record Selected Portion" and drag a box around your Terminal + browser area. Click "Options" → set "Microphone" to your mic if you want a voiceover. Click Record.

Alternatively, **QuickTime Player → File → New Screen Recording** if you prefer.

Save as `.mov` or `.mp4`. Pinterest accepts both.

## The 90-second script

> Read the *italicized* lines as voiceover. Keep voice steady, no need for production polish — Pinterest just needs to understand the use case.

### 0:00–0:10 — Title + intro

Show your Terminal window, paused.

> *"This is the automated posting tool for The Sauna Host, our business Pinterest account at thesaunahost. The app posts curated wellness content from our own brand library to our own boards on a 9 AM and 3 PM schedule. I'll show you the OAuth flow, the boards it manages, and the analytics pull."*

### 0:10–0:45 — OAuth authentication

In Terminal, run:

```bash
python oauth_helper.py
```

> *"Running oauth_helper.py opens Pinterest's authorization page in the browser. The user — me, the account owner — sees the requested scopes: pins read and write, boards read and write, user accounts read for analytics."*

Browser opens. Show the Pinterest consent screen briefly (the scopes are listed there). Click **Allow**.

Browser shows "Authorized!" page. Cut back to Terminal.

> *"The local callback server captures the auth code, exchanges it for an access token and a refresh token, and saves them to a gitignored .env file. The user only does this once — the client auto-refreshes tokens going forward."*

### 0:45–1:10 — Listing boards (proves auth works against the real account)

In Terminal, run the pre-staged command:

```bash
python -c "from pinterest_client import PinterestClient; bs=PinterestClient().list_boards(); print(f'{len(bs)} boards on the Sauna Host account:'); [print(f'  {b[\"name\"]}') for b in bs]"
```

The output lists 9 boards (Sauna Host Tips, Cold Plunge Rituals, etc.).

> *"With the token, the app reads the 9 boards on the Sauna Host account. These are the destinations for our scheduled pins."*

### 1:10–1:25 — Show the content queue (signal of legitimate, curated content)

Switch to your editor showing `pin_queue.csv`. Scroll through 5–6 rows so the reviewer sees the brand-voiced titles and descriptions.

> *"This is our content queue — 40 pins, all brand-owned, paired with images we created or licensed for The Sauna Host. Two posts per day for 20 days. The runner script `post_next.py` reads this CSV, posts the next due row, and writes back the resulting pin ID for tracking."*

Briefly switch to `post_next.py` and scroll the `create_pin` call section.

> *"The post step calls the v5 `/pins` endpoint with board_id, title, description, image_url, link, and alt_text — standard pin creation."*

### 1:25–1:40 — Analytics pull (works in Trial, prove it's a real working app)

Back to Terminal:

```bash
python pull_analytics.py
```

Output shows user-level + per-pin analytics CSVs being written.

> *"Analytics is the secondary use case — pulling impressions, clicks, and saves into CSVs we can review weekly to inform what content to feature next."*

### 1:40–1:50 — Wrap

> *"That's the full app — OAuth-authenticated, scheduled posting from a curated content library, and analytics for measurement. We're requesting Standard access to enable the production posting step. The use case is automating our own brand content to our own Pinterest account on a sustainable schedule. Thank you for reviewing."*

Stop recording.

## What to write in the application form

Most Pinterest Standard-access forms also ask for a written description of your app and use case. Suggested copy:

> **App:** The Sauna Host - Auto Pin & Analytics
> **Use case:** Automated posting of brand-owned wellness content from our business Pinterest account, The Sauna Host (https://thesaunahost.com), associated with Revivery — a social wellness studio in Tampa, FL.
> **Posting volume:** 2 pins per day, scheduled by a CSV queue we maintain manually. All content is created or licensed by us; no third-party content, no scraping, no spam.
> **Audience:** Prospects researching contrast therapy, sauna hosting, and wellness gathering ideas. Each pin links back to thesaunahost.com.
> **Why automation:** consistent daily pinning is what Pinterest rewards. A small business team can't reliably hand-post twice a day; automation lets us maintain consistency while keeping content quality high.
> **Scopes used:** pins:read, pins:write, boards:read, boards:write, user_accounts:read.
> **Security:** OAuth tokens stored in a local gitignored .env file. No tokens in source control. Auto-refresh handles expiry.

## Tips

- **Speak slowly and clearly** — reviewers need to follow without rewinding.
- **Don't include sensitive screen content** — quit anything with personal info, hide bookmarks bar, close tabs.
- **Trim the start and end** in QuickTime if there's dead air. Pinterest doesn't want a 3-minute video — keep it 60–120 seconds.
- **File size** — should be under ~50 MB after compression. If too big, export at 720p instead of 1080p.

## After approval

Pinterest's typical turnaround for Trial → Standard is **1–5 business days**. Once approved, you'll get an email + the app status changes to "Standard" in the developer portal. At that point:

1. Re-run `python oauth_helper.py` once more (some scopes may need re-grant under the new tier — easier to re-auth than risk it).
2. Retry the pin-09 test post — should succeed against production now.
3. Install + load the launchd plist (instructions in `launchd/README.md`).
4. The schedule fires Apr 27 at 9 AM, autonomously, through May 16.

If the queue's first scheduled date passes while waiting for approval, just bump every `scheduled_date` forward by N days in `pin_queue.csv` (a one-line `sed` or open in a spreadsheet).
