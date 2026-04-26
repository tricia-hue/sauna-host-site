# Pinterest Content Plan — The Sauna Host

Strategy companion to `HANDOFF.md`. The HANDOFF covers the working code + Pinterest dev plumbing; this doc covers what to post, when, where, and why.

## Locked decisions

| Decision | Choice |
|---|---|
| Cadence | **2 pins/day** at **9:00 AM ET** + **3:00 PM ET** (cowork researched peak windows) |
| Rollout length | 20 days = 40 pins (20 designed + 20 lifestyle) |
| Day 1 | **Monday, April 27, 2026** |
| Image hosting | All assets deployed to `public/images/pinterest/` and served at `https://thesaunahost.com/images/pinterest/<filename>.jpg` |
| Posting model | URL-based via `pinterest_client.create_pin(image_url=...)` — no base64, no code changes |
| Brand voice | Per `revivery-brand` skill — sentence case, no exclamation points, terminology rules below |

## Asset inventory (deployed)

All 40 source files are committed under `sauna-host-site/public/images/pinterest/` and reachable at `https://thesaunahost.com/images/pinterest/<filename>` once deployed.

### Pool A — Designed pins (20)
`pin-01.jpg` through `pin-20.jpg` — branded, text-overlay, designed for Pinterest. The strongest CTA content.

### Pool B — Lifestyle photos (20, optimized to 1600px / ~400KB each)
**From the 260109 shoot:**
- `lifestyle-260109-015.jpg`, `-016`, `-064`, `-065`, `-066` *(Claude pick, 3-person sauna laughter)*, `-067`, `-068`

**From the 081525 shoot:**
- `lifestyle-081525-054.jpg`, `-056`, `-058`, `-061`, `-062` *(Claude pick, group rinse station)*, `-068`, `-082`, `-095`, `-105`, `-107` *(Claude pick, group cold plunge)*, `-108`, `-118`, `-124`

Curation criterion: people interacting + laughing in the sauna — group shots, conversation, joy. Matches Revivery's "social wellness studio" positioning.

## Boards (live on Pinterest, IDs from cowork session)

| # | Board name | Board ID |
|---|---|---|
| 1 | Sauna Host Tips | `1137370149584773409` |
| 2 | Cold Plunge Rituals | `1137370149584773412` |
| 3 | Contrast Therapy | `1137370149584773414` |
| 4 | Wellness Gatherings | `1137370149584773416` |
| 5 | Sauna Aesthetic | `1137370149584773420` |
| 6 | Thermal Wellness as Home | `1137370149584773421` |
| 7 | Women's Wellness Circle | `1137370149584773422` |
| 8 | Mindful Hosting | `1137370149584773424` |
| 9 | Host Your Own Sauna + Cold Plunge Gathering | `1137370149584767492` |

Board #9 is the most descriptive — it's the natural primary destination for the four themed-gathering pins (girls night, men's gathering, women's over 40, mother's day, bachelorette, moms night out, date night, book club).

## Pin Legend (Pool A — confirmed topics)

| File | Topic | Best primary board | Best destination URL |
|---|---|---|---|
| pin-01 | Intro to The Sauna Host | 1 — Sauna Host Tips | `/` |
| pin-02 | Girls Night | 9 — Host Your Own | `/#themes` |
| pin-03 | Book Club | 9 — Host Your Own | `/#themes` |
| pin-04 | Unique Men's Gathering | 9 — Host Your Own | `/#themes` |
| pin-05 | Women's Gathering Over 40 | 7 — Women's Circle | `/#themes` |
| pin-06 | The 4% That Changes Everything | 8 — Mindful Hosting | `/lesson-1` |
| pin-07 | 2 Breath Patterns | 3 — Contrast Therapy | `/lesson-1` |
| pin-08 | The 90 Seconds After a Cold Plunge | 2 — Cold Plunge Rituals | `/lesson-1` |
| pin-09 | 10 Questions | 4 — Wellness Gatherings | `/workbook` |
| pin-10 | The Workbook | 1 — Sauna Host Tips | `/workbook` |
| pin-11 | Mother's Day Gathering | 9 — Host Your Own | `/#themes` |
| pin-12 | Bachelorette Party Reinvented | 9 — Host Your Own | `/#themes` |
| pin-13 | New Year Ritual *(May caption: "ritual reset")* | 8 — Mindful Hosting | `/#themes` |
| pin-14 | Cold First Then Heat | 2 — Cold Plunge Rituals | `/lesson-1` |
| pin-15 | Moms Night Out | 7 — Women's Circle | `/#themes` |
| pin-16 | Date Night | 9 — Host Your Own | `/#themes` |
| pin-17 | A Mom Resting After a Stressful Year | 5 — Sauna Aesthetic | `/` |
| pin-18 | The Playlist | 8 — Mindful Hosting | `/workbook` |
| pin-19 | Sunday Morning Ritual | 6 — Thermal Wellness as Home | `/` |
| pin-20 | Who Teaches This *(funnel deepener → RIT)* | 1 — Sauna Host Tips | `/` |

Destination URLs all root at `https://thesaunahost.com` and should be UTM-tagged in the queue: `?utm_source=pinterest&utm_medium=organic&utm_campaign=launch&utm_content=pin-NN`.

## The 20-day rollout

Day 1 = **Mon Apr 27, 2026**. Day 14 = **Sun May 10, 2026 = Mother's Day** — pin-11 lands the day before so it surfaces in feeds for Mother's Day morning saving.

Order rationale: lead with high-saver/educational pins → roll into themed gathering pins → seasonal timing for Mother's Day → close with the funnel-deepener (pin-20).

| Day | Date | 9:00 AM — Pool A pin | 3:00 PM — Pool B photo | Primary board |
|---|---|---|---|---|
| 1 | Apr 27 | pin-09 — 10 Questions | lifestyle-260109-066 | 4 — Wellness Gatherings |
| 2 | Apr 28 | pin-06 — The 4% That Changes Everything | lifestyle-081525-054 | 8 — Mindful Hosting |
| 3 | Apr 29 | pin-08 — 90 Seconds After a Cold Plunge | lifestyle-081525-107 | 2 — Cold Plunge Rituals |
| 4 | Apr 30 | pin-14 — Cold First Then Heat | lifestyle-081525-118 | 2 — Cold Plunge Rituals |
| 5 | May 1 | pin-07 — 2 Breath Patterns | lifestyle-081525-082 | 3 — Contrast Therapy |
| 6 | May 2 | pin-19 — Sunday Morning Ritual | lifestyle-260109-015 | 6 — Thermal Wellness as Home |
| 7 | May 3 | pin-01 — Intro to The Sauna Host | lifestyle-260109-016 | 1 — Sauna Host Tips |
| 8 | May 4 | pin-10 — The Workbook | lifestyle-081525-095 | 1 — Sauna Host Tips |
| 9 | May 5 | pin-15 — Moms Night Out | lifestyle-081525-058 | 7 — Women's Circle |
| 10 | May 6 | pin-17 — Mom Resting After Stressful Year | lifestyle-260109-064 | 5 — Sauna Aesthetic |
| 11 | May 7 | pin-05 — Women's Gathering Over 40 | lifestyle-081525-056 | 7 — Women's Circle |
| 12 | May 8 | pin-02 — Girls Night | lifestyle-081525-061 | 9 — Host Your Own |
| 13 | May 9 | pin-11 — Mother's Day Gathering | lifestyle-260109-068 | 9 — Host Your Own |
| 14 | May 10 | pin-16 — Date Night | lifestyle-081525-068 | 9 — Host Your Own |
| 15 | May 11 | pin-12 — Bachelorette Party Reinvented | lifestyle-081525-062 | 9 — Host Your Own |
| 16 | May 12 | pin-04 — Unique Men's Gathering | lifestyle-081525-105 | 9 — Host Your Own |
| 17 | May 13 | pin-03 — Book Club | lifestyle-081525-108 | 9 — Host Your Own |
| 18 | May 14 | pin-18 — The Playlist | lifestyle-260109-065 | 8 — Mindful Hosting |
| 19 | May 15 | pin-13 — New Year Ritual *("ritual reset")* | lifestyle-260109-067 | 8 — Mindful Hosting |
| 20 | May 16 | pin-20 — Who Teaches This | lifestyle-081525-124 | 1 — Sauna Host Tips |

> Pool B photos paired with high-energy themed pins (Mother's Day, Girls Night, Bachelorette, Date Night, Moms Night) on days 9–17 — those are the days where group/laughter imagery reinforces the gathering theme most directly.

## Caption framework

All pin titles + descriptions follow `revivery-brand` skill rules. Apply before captions land in `pin_queue.csv`.

**Voice:**
- Warm, friendly, inclusive, elevated. Never cold, pushy, or preachy.
- Conversational yet sophisticated. Contractions OK. Direct.
- Confident in the product, never salesy.

**Mechanics:**
- Sentence case headlines ("Ancient made new" not "Ancient Made New")
- Oxford comma always
- No ellipses, ever
- Use "we" and "you"
- **No exclamation points** in prospect-facing content

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

**CTAs to use:**
- "Start the free 5-day course →" (drives to thesaunahost.com)
- "Discover the practice →"
- "See how to host →"
- "Try Revivery →" (for direct studio funnel)

**CTAs to avoid:**
- Anything with exclamation points
- "Sign up now," "Don't miss out," "Limited time"
- "Click here," "Learn more"

**Length target:** 200–500 chars for descriptions, ~100 chars for titles.

## After day 20

Two paths:

- **Loop the Pool A pins.** Reschedule pin-01–20 with new descriptions, different boards, different destination URLs. Continue Pool B sprinkle daily.
- **Generate next 20 designed pins** based on which topics saved best in the first 20 days' analytics. (`pull_analytics.py` from cowork already exports this.)

Either path keeps Pool B running daily as the always-on brand layer. Pin-13 ("New Year Ritual") is also flagged for a **December 26 repost** with its original New Year framing.

## Success metrics

Track weekly via `pull_analytics.py`:

| Metric | After 30 days | After 90 days |
|---|---|---|
| Monthly Pinterest impressions | 5,000 | 50,000 |
| Outbound clicks | 100 | 1,500 |
| CTR | 2%+ | 3%+ |
| Email signups attributed to Pinterest | 20 | 300 |
| RIT page views from Pinterest funnel | 5 | 75 |

Pinterest is a slow-burn channel — pins compound for months. Real signal shows up at week 6+.

## Open work

1. **Apply `revivery-brand` skill to caption drafts** for all 20 pins. (Drafts existed in earlier scratch notes; rewriting through the brand skill before they land in the CSV.)
2. **Build `pin_queue.csv`** — 40 rows mapping the table above to the schema in HANDOFF.md.
3. **Build `post_next.py`** — queue runner per HANDOFF rough sketch.
4. **Wire launchd plist** — 9am + 3pm daily fires, smoke test.
5. **Verify deploy** — confirm `https://thesaunahost.com/images/pinterest/pin-01.jpg` returns 200 after Vercel deploys the `public/images/pinterest/` folder.
