# Pinterest Standard Access — Resubmission Video

Pinterest denied the previous request because the video looked like a presentation. The resubmission should be a plain screen recording of the actual OAuth and API workflow.

Do not submit the Remotion/demo-video presentation. Record your real screen.

## What the new video must show

1. The Pinterest Developer app page for `The Sauna Host - Auto Pin & Analytics`.
2. The OAuth flow launched from `python oauth_helper.py`.
3. The Pinterest authorization/consent screen and the redirect back to `localhost:8085`.
4. Authenticated API calls in Terminal:
   - `GET /user_account`
   - `GET /boards`
5. The scheduled pin workflow:
   - `pin_queue.csv` with curated rows
   - `post_next.py --dry-run` showing the next pin the app will post
6. If allowed by the current Pinterest access tier, one live `POST /pins` test pin.

The safest video is 2-3 minutes. It should feel like Jack is watching you use the tool, not like he is watching a sales deck.

## Before recording

Close Mail, Slack, Messages, and anything with private notifications.

Open these windows:

- Browser tab: `https://developers.pinterest.com/apps/1565235/`
- Terminal in this folder:
  ```bash
  cd "/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation"
  source .venv/bin/activate
  ```
- Editor tabs:
  - `oauth_helper.py`
  - `api_review_demo.py`
  - `post_next.py`
  - `pin_queue.csv`

Increase Terminal font size so the reviewer can read the commands.

## Important privacy note

The OAuth helper prints the authorization URL. That is okay. Do not open or show `.env` because it contains the app secret and tokens.

The helper script `api_review_demo.py` masks token values automatically, so it is safe to record.

## Recording commands

Use macOS screen recording:

`Cmd+Shift+5` → Record Selected Portion → select Browser + Terminal/editor area → Record.

### 1. Show the app page

Show the Pinterest Developer app page for 5-10 seconds.

Say:

> This is the Pinterest Developer app for The Sauna Host. It is used by our business to post our own branded pin content to our own Pinterest boards and pull analytics.

### 2. Run OAuth on camera

In Terminal:

```bash
python oauth_helper.py
```

When the browser opens, show the Pinterest authorization page. Click **Allow**. Show the local success page:

`Authorized! You can close this tab and return to your terminal.`

Say:

> This is the OAuth authentication flow. I am the account owner granting the app permission. Pinterest redirects back to the registered local redirect URI, and the helper exchanges the authorization code for access and refresh tokens.

### 3. Show authenticated API calls

In Terminal:

```bash
python api_review_demo.py --read-only
```

The output should show:

- API base
- App ID
- masked tokens
- authenticated account
- board list

Say:

> This confirms the OAuth token is working against the Pinterest API. The app reads the authenticated user account and lists the boards it manages for scheduled posting.

### 4. Show the curated queue and posting workflow

Switch to `pin_queue.csv` and scroll a few rows. The reviewer should see real titles, descriptions, image URLs, links, alt text, blank `posted_at`, and blank `pin_id`.

Say:

> This is our manually curated posting queue. All content is owned or licensed by us and links to thesaunahost.com. We schedule two pins per day, not bulk spam.

Switch to `post_next.py`, showing the `client.create_pin(...)` call.

Then run:

```bash
python post_next.py --dry-run
```

Say:

> The scheduled runner reads the CSV, finds the next due row, and calls the Pinterest v5 pins endpoint with the board ID, title, description, image URL, link, and alt text. This dry run shows what will post without creating a duplicate during review.

### 5. Optional, only if the API allows it: create one test pin

If Pinterest requires a live pin creation call and your current access tier allows it, run this while recording:

```bash
python api_review_demo.py --create-test-pin --board-id 1137370149584773409
```

Say:

> This is a live `POST /pins` call using our own image and our own destination URL. The returned pin ID confirms pin creation through the API.

If it fails because Standard access has not been approved yet, keep the failure visible and say:

> Pin creation is the production permission we are requesting Standard access for. The app is OAuth-authenticated and ready; the read calls work, and this shows the exact API request that will be enabled after approval.

Do not make the whole video about a failed pin creation. The main required proof is OAuth plus API usage.

## Voiceover script

Use this if you want a clean version to read:

> Hi, this is Tricia from Revivery. This screen recording shows our Pinterest API app for The Sauna Host. The app is used only to publish our own brand-owned pin content to our own Pinterest account and pull analytics.
>
> First I am running our OAuth helper. It opens Pinterest's authorization page, where I grant the requested permissions as the account owner. Pinterest redirects back to our registered local redirect URI, and the helper exchanges the authorization code for access and refresh tokens.
>
> Next I am running authenticated Pinterest API calls. The app reads the user account and lists the boards available on The Sauna Host account. These boards are the destinations for our scheduled pins.
>
> This CSV is our curated content queue. It includes the scheduled date and time, board ID, title, description, image URL, destination link, and alt text. The runner posts only the next due pin and writes back the resulting pin ID for tracking.
>
> The use case is consistent daily publishing of our own wellness content to our own business Pinterest account, plus weekly analytics review. We do not scrape, repost third-party content, or bulk-spam boards.

## Message to send back to Pinterest

Subject: Standard Access resubmission — screen recording with OAuth flow

Hi Jack,

Thank you for the clarification. I misunderstood the video requirement and previously submitted a presentation-style demo.

I have recorded a new screen recording that shows me using the app directly, including:

- the Pinterest Developer app,
- the OAuth authorization flow,
- the localhost redirect/callback,
- authenticated Pinterest API calls to read the user account and boards,
- the curated pin queue,
- and the scheduled posting workflow that calls the Pinterest v5 pins endpoint.

The app is used only to publish The Sauna Host's own brand-owned content to our own Pinterest business account and to pull analytics for that content.

Thank you for reviewing the corrected submission,
Tricia

## Final checklist before submitting

- The video is a screen recording, not a slide deck or rendered presentation.
- OAuth authorization screen is visible.
- The localhost callback success screen is visible.
- Terminal shows authenticated API output.
- No `.env`, app secret, access token, or refresh token is visible.
- The queue shows legitimate, curated business content.
- The written application says posting volume is 2 pins/day.
