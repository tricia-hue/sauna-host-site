# The Sauna Host — thesaunahost.com

A Next.js 14 (App Router) + TypeScript + Tailwind app that hosts Revivery's free 5-day mini course. Deployed on Vercel.

**Live URLs:**
- Primary (once DNS is pointed): `https://thesaunahost.com`
- Vercel preview: `https://sauna-host-site.vercel.app`

**What it is:** a gated mini course with a premium editorial feel, matching the Revivery brand (Blue Black, Gold, Peach, Teal; ABC Arizona Sans). Reconciled with the Revivery Brand Manual (see `BRAND_NOTES.md`).

**What it does:**
- Landing page with curriculum, 5 themes, FAQ, and email opt-in
- Lesson 1 is open (the tripwire)
- Lessons 2–5 and the workbook download are gated behind email capture
- `/api/subscribe` POSTs the email to Mailchimp and sets a cookie that unlocks the rest
- `/api/unlock` restores access for existing subscribers on new devices
- Downloadable 26-page PDF workbook at `/sauna-host-workbook.pdf`

---

## Quick start

```bash
# from this directory
npm install
cp .env.example .env.local
# ... fill in your Mailchimp credentials in .env.local
npm run dev
```

Open http://localhost:3000

---

## Deploy to Vercel

Already deployed and connected to GitHub at `tricia-hue/sauna-host-site`. Every push to `main` triggers an automatic Vercel build and deploy.

### Environment variables (set in Vercel → Settings → Environment Variables)

- `MAILCHIMP_API_KEY`
- `MAILCHIMP_SERVER_PREFIX` (e.g. `us21`)
- `MAILCHIMP_AUDIENCE_ID`
- `MAILCHIMP_TAG` (default: `sauna-host-course`)

Without these, signups are silently logged and no emails go out. See `lib/email.ts:35`.

### Custom domain

`thesaunahost.com` is pointed at the Vercel project via DNS A and CNAME records. SSL is auto-issued by Vercel. Both the apex and `www` are registered; `www` redirects to apex.

---

## Project structure

```
sauna-host-site/
├── app/                           # Next.js 14 App Router
│   ├── layout.tsx                 # Root layout with Nav + Footer, metadata, JSON-LD
│   ├── page.tsx                   # Landing page
│   ├── globals.css                # Tailwind + editorial prose styles
│   ├── lesson-1/                  # Open lesson (the tripwire)
│   ├── lesson-2/ … lesson-5/      # Gated lessons
│   ├── workbook/                  # Gated page with PDF download link
│   ├── welcome/                   # Post-opt-in thank you page
│   ├── about/                     # About Revivery page
│   ├── privacy/ + terms/          # Legal pages
│   └── api/
│       ├── subscribe/route.ts     # POST: email → Mailchimp → set unlock cookie
│       └── unlock/route.ts        # GET: restore access (cookie set via query param)
├── components/                    # Reusable UI (Nav, Hero, ThemeCards, etc.)
├── content/lessons.ts             # Full lesson text as structured data
├── lib/
│   ├── config.ts                  # Site + brand config (single source of truth)
│   ├── auth.ts                    # Cookie-based gating
│   └── email.ts                   # Mailchimp integration (swap to change ESP)
├── public/
│   ├── sauna-host-workbook.pdf    # The 26-page workbook (gated download)
│   ├── og-image.jpg               # Open Graph share image (1200 × 630)
│   ├── favicon.ico / favicon-32.png / apple-touch-icon.png  # Revivery circle-R mark
│   ├── fonts/                     # ABC Arizona Sans (Regular + Bold)
│   ├── brand/                     # Web-ready logos + pattern
│   └── images/                    # Photography (people in sauna + plunge)
├── tailwind.config.ts             # Revivery brand tokens (4 canonical colors)
├── WORKBOOK_BRIEF.md              # Design brief used to create the workbook PDF
├── BRAND_NOTES.md                 # Audit notes + brand-manual compliance log
└── next.config.js
```

---

## Brand compliance

See `BRAND_NOTES.md` for the full audit log and ongoing compliance rules.

Brand tokens live in two places and agree with each other:
- `tailwind.config.ts` — the four canonical colors, typography, tracking
- `app/globals.css` — editorial prose styles for lesson body

**Canonical palette** (from the Revivery brand manual — strict four-color system):
- **Teal** `#395B5E` — primary logo color on light bg, accent
- **Blue Black** `#2E393F` — primary background across the site
- **Gold** `#AD8D4C` — accents, CTAs, hover states, brand pattern
- **Peach** `#F4DFC8` — primary text on Blue Black; Nav + Footer logo color

Use opacity modifiers (`text-gold/70`) for softer shades — never add new named variants.

**Typography** (brand manual):
- **ABC Arizona Sans** — the single brand face. Display headlines are uppercase with +250 kerning (`tracking-display` = 0.25em). Headings use +100 kerning (`tracking-heading` = 0.1em).
- Inter / system sans-serif fallback chain if the font files ever fail to load.

**Pattern** (Revivery gold pattern):
- Only on Blue Black backgrounds. Vertical only. Left- or right-justified, bleeding off the edge.
- Currently used on ThemeCards (right edge) and FinalCTA (left edge).

**Intentional digital adaptation:**
Nav and Footer logos are left-justified on the website, which deviates from the brand manual's "center or right only" rule. This is documented in both component files and in `BRAND_NOTES.md` — it preserves web UX convention (users expect the brand mark at top-left as the "home" affordance). All print and PDF collateral (including the workbook) follows the manual strictly.

---

## Content editing

All lesson copy lives in `content/lessons.ts`. Changes appear everywhere the lesson is referenced (landing page outline, lesson pages, workbook index).

Site-wide copy (FAQ, themes, CTAs, tagline) lives in `lib/config.ts`.

---

## Gating

The gating model is a **tripwire**:
- Lesson 1: always open
- Lessons 2–5 + workbook PDF: require email

Gating is enforced by a cookie (`sh_unlocked`) set server-side by `/api/subscribe`. See `lib/auth.ts`. This is deliberate friction, not security — the right bar for a free lead magnet.

**Note:** the workbook PDF URL (`/sauna-host-workbook.pdf`) is technically publicly accessible to anyone who knows the direct URL. For a free lead magnet, this is fine — link-sharing helps spread. If stricter cookie-gated download is ever needed, add a `/api/workbook` route that checks the cookie server-side before streaming the PDF.

---

## Swapping ESPs

The Mailchimp implementation is in `lib/email.ts`. The public API is a single async function:

```ts
subscribeToEmailList({
  email,
  firstName?,
  theme?,
  source?,
}): Promise<{ ok: boolean; message?: string }>
```

To use Klaviyo or ConvertKit, replace the body of that function and update env-var names.

---

## Status

### ✅ Complete
- Landing page, 5 lessons, 5 themes, workbook page, welcome page, about, privacy, terms
- Gating via `sh_unlocked` cookie
- ABC Arizona Sans self-hosted from `/public/fonts/`
- Revivery circle-R favicon (32×32 + 180×180)
- OG share image at `/og-image.jpg`
- 26-page workbook PDF shipped at `/sauna-host-workbook.pdf`
- Brand-manual audit complete (see `BRAND_NOTES.md`)
- Photography swapped to on-brand people-in-sauna/plunge shots
- Five themes — Women's Circle, Men's Gathering, Milestone, Book Club, Couples Night

### 🟡 Still to do before scaling traffic
- [ ] Verify Vercel Mailchimp env vars are set in production
- [ ] Build the 5-email Mailchimp drip automation (content already written in `content/lessons.ts`)
- [ ] Build the Day-6 RIT pitch email
- [ ] End-to-end test: real signup → Day 1 arrives → lessons 2–5 arrive on schedule → workbook downloads cleanly
- [ ] Add Vercel Analytics or Plausible for conversion tracking
- [ ] Point `thesaunahost.com` DNS at Vercel (if not done); update canonical URLs in `app/layout.tsx` and `lib/config.ts` once primary domain is confirmed

---

## Related strategy docs

This app is the web layer of a larger campaign. Strategy, email sequence, social content, and launch plan live in the parent folder:

- `../00_README_Start_Here.md`
- `../01_Strategy_Brief.md`
- `../02_Mini_Course_Curriculum.md` — source of truth for lesson content
- `../03_Companion_Workbook.md` — original workbook spec (now superseded by `WORKBOOK_BRIEF.md`)
- `../04_Email_Course_Sequence.md` — 8 emails for the ESP
- `../05_Social_Media_Content.md`
- `../06_Landing_Page_Copy.md` — source of landing copy
- `../07_SMS_Partner_Assets.md`
- `../08_Launch_Plan_Timeline.md`
