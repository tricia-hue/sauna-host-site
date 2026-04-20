# The Sauna Host — revivery.co/host

A Next.js 14 (App Router) + TypeScript + Tailwind app that hosts Revivery's free 5-day mini course. Built to be dropped into Vercel.

**What it is:** a gated mini course with a premium editorial feel, designed to match the Revivery brand (Blue Black, Gold, Peach, Teal; ABC Arizona Sans; elevated and confident).

**What it does:**
- Landing page with curriculum, themes, FAQ, and email opt-in
- Lesson 1 is open (the tripwire)
- Lessons 2–5 and the workbook page are gated behind email capture
- `/api/subscribe` POSTs the email to Mailchimp and sets a cookie that unlocks the rest
- `/api/unlock` restores access for existing subscribers on new devices

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

1. Push this repo to GitHub (or upload it directly via the Vercel dashboard)
2. In Vercel, import the project
3. In **Settings → Environment Variables**, add:
   - `MAILCHIMP_API_KEY`
   - `MAILCHIMP_SERVER_PREFIX` (e.g. `us21`)
   - `MAILCHIMP_AUDIENCE_ID`
   - `MAILCHIMP_TAG` (default: `sauna-host-course`)
4. Deploy. Vercel auto-detects Next.js and handles the build.
5. Point `revivery.co/host` at the deployment:
   - Add `revivery.co` as a domain in Vercel
   - In your DNS provider, add a rewrite or proxy from `revivery.co/host` to this Vercel app
   - If `revivery.co/host` needs to be a subpath of the existing Revivery site, use Vercel's [path-based routing](https://vercel.com/docs/rewrites) in the parent site's config

---

## Project structure

```
sauna-host-site/
├── app/                           # Next.js 14 App Router
│   ├── layout.tsx                 # Root layout with Nav + Footer
│   ├── page.tsx                   # Landing page
│   ├── globals.css                # Tailwind + custom prose styles
│   ├── lesson-1/                  # Open lesson (the tripwire)
│   ├── lesson-2/ … lesson-5/      # Gated lessons
│   ├── workbook/                  # Gated workbook download page
│   ├── welcome/                   # Post-opt-in thank you
│   ├── about/                     # About Revivery
│   └── api/
│       ├── subscribe/route.ts     # POST: email → Mailchimp → set cookie
│       └── unlock/route.ts        # GET: restore access (cookie set)
├── components/                    # Reusable UI
├── content/lessons.ts             # Full lesson text as structured data
├── lib/
│   ├── config.ts                  # Site + brand config (single source)
│   ├── auth.ts                    # Cookie-based gating
│   └── email.ts                   # Mailchimp integration (swap to change ESP)
├── public/                        # Add workbook.pdf + og-image.jpg + fonts here
├── tailwind.config.ts             # Revivery brand tokens
└── next.config.js
```

---

## Brand compliance

Brand tokens live in two places and agree with each other:
- `tailwind.config.ts` — all colors, fonts, letter-spacing scales
- `app/globals.css` — editorial prose styles for lesson body

Colors (from the Revivery brand manual):
- **Blue Black** `#2e393f` — background, primary dark
- **Gold** `#ad8d4c` — accents, CTAs, display highlights
- **Peach** `#f4dfc8` — body text, soft surfaces
- **Teal** `#395b5e` — supporting (used sparingly)

Typography (brand manual):
- **ABC Arizona Sans** — primary face. Display headlines are uppercase with +250 tracking.
- Inter / system sans-serif is the fallback chain.

Voice (from the revivery-brand skill):
- Warm, confident, understated. Contractions. Oxford comma. Sentence-case headlines.
- No ellipses, no exclamation points in prospect-facing copy.
- Revivery terminology: members / leads / sessions / contrast therapy.

---

## Content editing

All lesson copy lives in `content/lessons.ts`. To edit a lesson, update the object there — changes appear everywhere the lesson is referenced (landing page outline, lesson page, workbook index).

Site-wide copy (FAQ, themes, CTAs, tagline) lives in `lib/config.ts`.

---

## Gating

The gating model is a **tripwire**:
- Lesson 1: always open
- Lessons 2–5 + workbook: require email

Gating is enforced by an HTTP-only cookie (`sh_unlocked`) set by `/api/subscribe`. See `lib/auth.ts`. This is deliberate friction, not security — the right bar for a free course.

If you ever want to change the gating model:
- Open everything: remove the `isUnlocked()` check from each gated page
- Gate everything: add the check to `/app/lesson-1/page.tsx` too

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

To use Klaviyo or ConvertKit, replace the body of that function with the equivalent API call and update the env-var names accordingly.

---

## Still to-do before go-live

- [ ] Design and drop in `public/workbook.pdf`
- [ ] Design and drop in `public/og-image.jpg` (1200 × 630)
- [ ] License ABC Arizona Sans and add woff2 files to `public/fonts/`
- [ ] QA the full flow end-to-end on mobile and desktop
- [ ] Set up a real Mailchimp audience (or Klaviyo list) and wire the env vars
- [ ] Load the 8-email drip from `04_Email_Course_Sequence.md` into the ESP
- [ ] Add Vercel Analytics or Plausible for conversion tracking
- [ ] Add a privacy and terms page (stubbed links in Footer)

---

## Related strategy docs

This app is the web layer of a larger campaign. Strategy, email sequence, social content, and launch plan live in the parent folder:

- `../00_README_Start_Here.md`
- `../01_Strategy_Brief.md`
- `../02_Mini_Course_Curriculum.md` — source of truth for lesson content
- `../03_Companion_Workbook.md` — design spec for `workbook.pdf`
- `../04_Email_Course_Sequence.md` — 8 emails for the ESP
- `../05_Social_Media_Content.md`
- `../06_Landing_Page_Copy.md` — source of landing copy
- `../07_SMS_Partner_Assets.md`
- `../08_Launch_Plan_Timeline.md`
