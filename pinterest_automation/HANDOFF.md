# Pinterest Automation — Handoff Document

**Project:** Auto-post pins + pull analytics for The Sauna Host Pinterest account
**Status as of 2026-04-26:** Foundation complete and tested end-to-end. Content queue + scheduler still to build.
**Folder:** `/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation/`

---

## TL;DR

The Pinterest API is wired up, OAuth is done, analytics is tested. What's left is purely content + scheduling work — no more Pinterest dev portal stuff needed. Pick this up in your IDE and you can finish in one sitting.

**What works right now:**
```bash
cd "/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation"
source .venv/bin/activate
python pull_analytics.py            # writes two CSVs of last 30 days
python post_pin.py --board-id <id> --title "..." --image-url "..." --description "..."
```

---

## What's done

### 1. Pinterest Developer App
- App name: `The Sauna Host - Auto Pin & Analytics`
- App ID (Client ID): `1565235`
- Trial access: **approved** (got the App Secret Key)
- Redirect URI: `http://localhost:8085/` (registered + saved)
- App secret + tokens are in `.env` (gitignored — never commit)
- Manage page: https://developers.pinterest.com/apps/1565235/

### 2. Project scaffolding
| File | Purpose |
|---|---|
| `requirements.txt` | requests, python-dotenv |
| `.env.example` | template (committed) |
| `.env` | real credentials (gitignored) |
| `.gitignore` | venv, .env, tokens, generated CSVs |
| `README.md` | basic usage |
| `pinterest_client.py` | API wrapper with auto-refresh on 401 |
| `oauth_helper.py` | one-time OAuth flow (already run successfully) |
| `post_pin.py` | post one pin (CLI) or batch (CSV) |
| `pull_analytics.py` | pull user-level + per-pin analytics → CSV |
| `pinterest_app_icon.png` | 512×512 brand icon (uploaded to Pinterest already) |

### 3. OAuth completed
- `PINTEREST_ACCESS_TOKEN` and `PINTEREST_REFRESH_TOKEN` are in `.env`
- Scopes granted: `pins:read`, `pins:write`, `boards:read`, `user_accounts:read`
- Auto-refresh logic in `pinterest_client._refresh_access_token()` works (writes the new token back to `.env`)

### 4. Smoke test passed
- Pulled 31 days of user-level analytics → `analytics_user_<date>.csv`
- Found 9 boards, 2 existing pins
- Per-pin analytics CSV → `analytics_pins_<date>.csv`

---

## Boards (account already has 9 set up)

| Board ID | Name | Pins |
|---|---|---|
| `1137370149584773412` | Cold Plunge Rituals | 0 |
| `1137370149584773414` | Contrast Therapy | 0 |
| `1137370149584767492` | Host Your Own Sauna + Cold Plunge Gathering | 1 |
| `1137370149584773424` | Mindful Hosting | 0 |
| `1137370149584773420` | Sauna Aesthetic | 0 |
| `1137370149584773409` | Sauna Host Tips | 0 |
| `1137370149584773421` | Thermal Wellness as Home | 0 |
| `1137370149584773416` | Wellness Gatherings | 1 |
| `1137370149584773422` | Women's Wellness Circle | 0 |

These map cleanly to The Sauna Host content. Suggested pin distribution:

- **Lesson 1 → "Host Your Own Sauna + Cold Plunge Gathering" + "Wellness Gatherings"**
- **Lesson 2 → "Sauna Host Tips" + "Mindful Hosting"** (the first 90 seconds, holding space)
- **Lesson 3 → "Contrast Therapy"** (breathwork)
- **Lesson 4 → "Cold Plunge Rituals"** (the 60 seconds after the plunge)
- **Lesson 5 → "Women's Wellness Circle" + "Wellness Gatherings"** (theme picking)
- **Always-on / evergreen → "Sauna Aesthetic" + "Thermal Wellness as Home"** (b-roll, mood content)

---

## What's left

### Step A — Build the content queue (`pin_queue.csv`)

**Goal:** 14 days of pins at 2/day = **28 pins** for the first batch.

**Schema:**
```csv
scheduled_date,scheduled_time,board_id,title,description,image_url,link,alt_text,posted_at,pin_id
```

- `scheduled_date` — `YYYY-MM-DD`, today + 0..13
- `scheduled_time` — `09:00` or `15:00` (Pinterest engagement sweet spots, EDT)
- `board_id` — from table above
- `title` — sentence case, max ~100 chars; on-brand
- `description` — 200–500 chars; brand voice; ends with soft CTA
- `image_url` — must be a publicly reachable HTTPS URL. Use existing assets at `https://thesaunahost.com/images/<filename>.jpg` (the Next.js site already serves these). Inventory them with: `ls public/images/`
- `link` — usually `https://thesaunahost.com/` or `https://thesaunahost.com/lesson-N`
- `alt_text` — accessibility text (helps Pinterest's algorithm too)
- `posted_at` — initially blank; queue runner fills with timestamp on success
- `pin_id` — initially blank; queue runner fills with the returned pin ID

**Available image assets** (already public-facing, no upload needed):
- `hero-sauna-group.jpg`
- `sauna-meditation-group.jpg`
- `cold-plunge-entry.jpg`
- `cohort-briefing.jpg`
- `couples.jpg`
- `community-joy.jpg`
- `plunge-joy.jpg`
- `plunge-action.jpg`
- `plunge-meditation.jpg`
- `plunge-pool-interior.jpg`
- `sauna-stones.jpg`
- `sauna-detail.jpg`
- `events-connection.jpg`
- `rain-shower-group.jpg`
- `studio-towel.jpg`
- `storefront.jpg`
- duluth-broll/* (group-highfive, sauna-session-leading, annette-one-on-one, annette-facilitation, classroom-wide, group-celebration, community-plunge-joy, sauna-interior-warm, annette-teaching-group, annette-teaching-classroom)

### Step B — Build the queue runner (`post_next.py`)

Wrapper script that:
1. Loads `pin_queue.csv`
2. Filters for rows where `posted_at` is empty AND (`scheduled_date` is today OR earlier)
3. Sorts by `scheduled_date, scheduled_time`
4. Picks the next N rows (default: 1; pass `--limit 2` for catching up)
5. Posts each via `PinterestClient.create_pin()`
6. On success, writes `posted_at` (ISO timestamp) and `pin_id` back to the CSV
7. Logs results to `post_log.txt`

**Rough sketch:**
```python
import csv, datetime, sys
from pathlib import Path
from pinterest_client import PinterestClient, PinterestAPIError

QUEUE = Path("pin_queue.csv")
LOG = Path("post_log.txt")

def main(limit=1):
    rows = list(csv.DictReader(QUEUE.open()))
    fieldnames = list(rows[0].keys()) if rows else []
    today = datetime.date.today().isoformat()
    due = [r for r in rows if not r.get("posted_at") and r.get("scheduled_date","") <= today]
    due.sort(key=lambda r: (r["scheduled_date"], r["scheduled_time"]))
    pc = PinterestClient()
    for r in due[:limit]:
        try:
            pin = pc.create_pin(
                board_id=r["board_id"], title=r["title"],
                description=r["description"], image_url=r["image_url"],
                link=r.get("link") or None, alt_text=r.get("alt_text") or None,
            )
            r["posted_at"] = datetime.datetime.now().isoformat(timespec="seconds")
            r["pin_id"] = pin["id"]
            with LOG.open("a") as f:
                f.write(f"{r['posted_at']} OK pin={pin['id']} board={r['board_id']} title={r['title'][:60]}\n")
        except PinterestAPIError as e:
            with LOG.open("a") as f:
                f.write(f"{datetime.datetime.now().isoformat()} FAIL {e}\n")
    # Rewrite CSV with updated posted_at/pin_id columns
    with QUEUE.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(rows)

if __name__ == "__main__":
    main(int(sys.argv[1]) if len(sys.argv) > 1 else 1)
```

### Step C — Schedule with macOS launchd (2×/day)

Create `~/Library/LaunchAgents/com.thesaunahost.pinterest-post.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.thesaunahost.pinterest-post</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation/.venv/bin/python</string>
        <string>/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation/post_next.py</string>
    </array>
    <key>WorkingDirectory</key>
    <string>/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation</string>
    <key>StartCalendarInterval</key>
    <array>
        <dict><key>Hour</key><integer>9</integer><key>Minute</key><integer>0</integer></dict>
        <dict><key>Hour</key><integer>15</integer><key>Minute</key><integer>0</integer></dict>
    </array>
    <key>StandardOutPath</key>
    <string>/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation/launchd.out.log</string>
    <key>StandardErrorPath</key>
    <string>/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation/launchd.err.log</string>
</dict>
</plist>
```

Load it:
```bash
launchctl load ~/Library/LaunchAgents/com.thesaunahost.pinterest-post.plist
launchctl list | grep thesaunahost   # confirm it's loaded
```

Test immediately without waiting:
```bash
launchctl start com.thesaunahost.pinterest-post
```

Unload (turn off):
```bash
launchctl unload ~/Library/LaunchAgents/com.thesaunahost.pinterest-post.plist
```

**Caveat:** launchd only fires while the Mac is awake. If the Mac is asleep at 9am or 3pm, the job is missed (won't catch up later by default). If reliability matters, run on a small VPS or use GitHub Actions on a cron schedule with the `.env` values stored as repo secrets.

### Step D — Optional: weekly analytics job

Same pattern, second plist at `com.thesaunahost.pinterest-analytics.plist`, runs `pull_analytics.py` once a week (e.g., Monday 8am).

---

## Brand voice cheat sheet (for writing pin titles + descriptions)

From `revivery-brand` skill — apply to all pin copy:

**Voice:**
- Warm, friendly, inclusive, elevated. Never cold, pushy, or preachy.
- Conversational yet sophisticated. Use contractions. Direct and to the point.
- Confident in the product, never salesy.

**Mechanics:**
- Sentence case headlines ("Ancient made new" not "Ancient Made New")
- Oxford comma always
- No ellipses, ever
- Use "we" and "you"
- No exclamation points in prospect-facing content (Pinterest = prospects)

**Terminology (non-negotiable):**
- members (not clients)
- leads (not instructors)
- sessions (not classes)
- Revivery (not "the Revivery")

**Identity phrases to weave in:**
- "This is a practice, not an event."
- "Strong medicine in a supported container."
- "Capacity builds over time."
- "The sauna and cold are the capsule. Connection is the medicine."
- "You're not doing this alone."

**CTAs to use** (Pinterest is prospect-facing):
- "Start the free 5-day course →" (drives to thesaunahost.com)
- "Discover the practice →"
- "See how to host →"
- "Try Revivery →" (for direct studio funnel)

**CTAs to avoid:**
- Anything with exclamation points
- "Sign up now," "Don't miss out," "Limited time"
- "Click here," "Learn more"

---

## Example pin (template for the queue)

```
scheduled_date: 2026-04-27
scheduled_time: 09:00
board_id: 1137370149584767492   (Host Your Own Sauna + Cold Plunge Gathering)
title: How to host a sauna circle that actually lands
description: A practice, not an event. The sauna and cold are the capsule — connection is the medicine. Five lessons from Revivery on hosting your own gathering with intention. Start the free 5-day course →
image_url: https://thesaunahost.com/images/sauna-meditation-group.jpg
link: https://thesaunahost.com/
alt_text: A small group sitting in a warmly-lit sauna, eyes closed in meditation
posted_at: (blank — runner fills this)
pin_id: (blank — runner fills this)
```

---

## File map

```
sauna-host-site/pinterest_automation/
├── .env                      # credentials (gitignored)
├── .env.example
├── .gitignore
├── .venv/                    # python virtualenv (gitignored)
├── HANDOFF.md                # ← you are here
├── README.md
├── pinterest_app_icon.png    # 512x512 brand icon
├── pinterest_client.py       # ← core API wrapper, don't break this
├── oauth_helper.py           # one-time, already run
├── post_pin.py               # CLI for ad-hoc single posts
├── pull_analytics.py         # CSV export of analytics
├── requirements.txt
├── analytics_user_*.csv      # generated, gitignored
├── analytics_pins_*.csv      # generated, gitignored
│
│   --- still to build ---
├── pin_queue.csv             # 28-row content queue
├── post_next.py              # queue runner script
└── launchd/
    ├── com.thesaunahost.pinterest-post.plist
    └── com.thesaunahost.pinterest-analytics.plist
```

---

## Recommended order of work in code

1. **Look at `public/images/`** in the sauna-host-site root to inventory available image assets. Note which are already deployed at `thesaunahost.com/images/<filename>` (verify by hitting one in a browser).
2. **Draft `pin_queue.csv`** — 28 rows. Use the brand voice cheat sheet. Mix boards based on the lesson mapping above. Spread across 14 days.
3. **Build `post_next.py`** — start from the rough sketch above.
4. **Test locally:** put one row in `pin_queue.csv` with `scheduled_date = today`, run `python post_next.py` once, confirm the pin appears on Pinterest, confirm the CSV got `posted_at` + `pin_id` filled in.
5. **Make the first real post** — run `python post_next.py 1` (or run `post_pin.py` directly with explicit args).
6. **Verify on Pinterest** — open the relevant board in the Pinterest UI and confirm the pin is there with the right image, title, description, link.
7. **Set up the launchd plist** — load it, run `launchctl start` once to verify it runs end-to-end without waiting for 9am.
8. **Add the second plist** for weekly analytics if desired.

---

## Things to watch out for

- **Image URLs must be publicly reachable.** The `https://thesaunahost.com/images/*.jpg` path works because the Next.js site serves it. If you reference a local file path, the API will reject it.
- **Trial access pin limits.** Pinterest trial caps you at a low pin volume per day. Should be fine for 2/day, but if you hit a limit, the API returns a clear error and the queue runner won't crash — it just logs the failure.
- **Don't commit `.env`.** It's already gitignored. The App Secret + access tokens give full posting access to your Pinterest — treat them like a password.
- **Token rotation.** `pinterest_client.py` automatically refreshes the access token when it expires (1 hour) and writes the new value back to `.env`. The refresh token is long-lived. If both are ever lost, re-run `oauth_helper.py`.
- **Date format for analytics.** Pinterest wants `YYYY-MM-DD`. Window is capped at 90 days.
- **launchd won't run if Mac is asleep.** For reliability move to a VPS or GitHub Actions.

---

## Quick commands reference

```bash
# Activate environment
cd "/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation"
source .venv/bin/activate

# Pull analytics (last 30 days → CSVs)
python pull_analytics.py

# Pull custom range
python pull_analytics.py --start 2026-01-01 --end 2026-04-26

# Post one pin manually
python post_pin.py \
  --board-id 1137370149584767492 \
  --title "How to host a sauna circle that actually lands" \
  --description "A practice, not an event. Five lessons from Revivery on hosting your own gathering. Start the free 5-day course →" \
  --image-url https://thesaunahost.com/images/sauna-meditation-group.jpg \
  --link https://thesaunahost.com/ \
  --alt-text "Small group meditating in a warm sauna"

# Batch post (once you build pin_queue.csv + post_next.py)
python post_next.py            # post 1 (oldest due)
python post_next.py 2          # catch up by posting next 2

# Inspect what's in the queue
python -c "import csv; rows=list(csv.DictReader(open('pin_queue.csv'))); print(f'{len(rows)} total, {sum(1 for r in rows if not r[\"posted_at\"])} unposted')"

# Refresh OAuth (only needed if tokens are lost)
python oauth_helper.py
```

---

**Created:** 2026-04-26
**Pick up here:** Step A above — build `pin_queue.csv`.
