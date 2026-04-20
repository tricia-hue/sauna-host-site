# The Sauna Host — Workbook v1.0

**Status:** ✅ **Shipped.** The final 26-page print PDF is live at `/public/sauna-host-workbook.pdf` and served as a download from the gated `/workbook` page. This brief is retained as the historical spec the design was built against — useful for future revisions, v2 updates, or handoffs when the workbook is redesigned.

**Design brief originally authored for Claude Design.**
**v1.1 — reconciled with Revivery Brand Manual (Oxford Creative Studio).**

This is a 26-page printable PDF companion to the free 5-day mini-course at thesaunahost.com. It's the "keep this forever" asset the reader receives after opting in with email. It is the single most important conversion lever in the funnel — every lesson refers to specific workbook pages, and the perceived value of the workbook is what justifies the email.

---

## ⚠️ Source of truth

The **Revivery Brand Manual** (included at `/public/Revivery_Brand_Manual.pdf`) is the ultimate source of truth for all brand decisions. Anything in this brief that contradicts the manual is a mistake — follow the manual. Notable rules from the manual that constrain design choices in this workbook:

1. **The brand pattern may ONLY appear on Blue Black backgrounds.** Not on Peach, Teal, or white. (Affects pages 1, 23, back cover — none of them get the pattern.)
2. **The brand pattern must remain vertical** — may not be rotated within 90° of vertical.
3. **The brand pattern must be left- or right-justified** on the page, bleeding off the edge — never centered, never contained.
4. **The Primary Logo and Logo Mark must be center- or right-justified** — never left.
5. **The 5 R's Brand Element must always be left-justified** — never center or right.
6. **Kerning values: Heading 1 = 0.25em, Heading 2 = 0.1em.** (Adobe convention "250" and "100" respectively.)
7. **The brand palette is 4 colors only:** Teal `#395B5E`, Blue Black `#2E393F`, Gold `#AD8D4C`, Peach `#F4DFC8`. The website's extended shades (gold-light, blue-black-900, peach-soft, etc.) are for digital UI only and are NOT part of the canonical brand.
8. **Logo clear space = `logo height ÷ 2`** on all sides; minimum 0.25" from other content.
9. **Never** use stylized, animated, hand-drawn, or recolored versions of any brand mark.

---

---

## 1. Deliverable specs

| Spec | Value |
|---|---|
| **Format** | PDF, 8.5" × 11" (US Letter), portrait |
| **Page count** | 24 pages + front/back cover (26 total surfaces) |
| **Color** | Full color; must also look good when printed black-and-white |
| **Fillable** | Yes — all writing-lines and checkboxes must be fillable form fields in the PDF |
| **Print bleed** | 0.125" (0.0625" on all sides if bleed images are used) |
| **Safe margins** | 0.75" minimum from trim on three sides; 1" on the binding edge (for future print-on-demand) |
| **Fonts embedded** | Yes — ABC Arizona Sans at Regular and Bold. Fallback to Inter if licensing prohibits |
| **Resolution for images** | 300 DPI minimum |
| **Final delivered files** | (1) `workbook.pdf` — flat print version, (2) `workbook-fillable.pdf` — fillable form version, (3) editable source (Figma or InDesign) |

---

## 2. Brand system

### 2.1 Color palette

The Revivery brand manual defines a **strict four-color palette**. Exact hex values below, sourced from the manual (Section 4).

| Token | Hex | CMYK | Pantone | Role per manual |
|---|---|---|---|---|
| **Teal** | `#395B5E` | 76 44 48 37 | 5473 U / 5473 C | Primary logo color (on white). Sparingly as a background. Typography + graphics. |
| **Blue Black** | `#2E393F` | 78 60 52 57 | 5395 U / 432 C | **Primary background color**. Pairs with Gold or Peach. Sparingly as a logo color. |
| **Gold** | `#AD8D4C` | 28 37 74 17 | 7556 U / 465 C | Logo mark + brand pattern color. Primarily on Blue Black. Sparingly as a background. |
| **Peach** | `#F4DFC8` | 5 14 24 0 | 2309 U / 2309 C | **Accent color** — use against Blue Black and Teal. Good for typography and graphics. |

**Speciality printing technique** (from manual, optional for print): **warm gold foil** (not bright, not matte) on Blue Black blocks — reserved for the primary logo, logo mark, and brand pattern. Never a digital color; only true gold foil printing.

**Approved color pairings (from the manual's "Color Story"):**
- Peach on Blue Black
- Blue Black on Peach
- Gold on Blue Black
- Peach on Gold
- Peach on Teal
- Teal on Peach

**Note on extended tokens:** The website's Tailwind config includes `blue-black 900`, `teal 900`, `gold light`, `gold dark`, and `peach soft` (`#F9ECDA`) — these are **working shades used in digital UI only** and are NOT part of the canonical brand palette. For the workbook, stick to the four canonical brand colors above unless you have a strong need for a soft callout panel, in which case `peach soft #F9ECDA` is acceptable as a subtle variant.

### 2.2 Typography

**The single brand typeface: ABC Arizona Sans** (files provided in `/public/fonts/`)
- Regular: `ABCArizonaSans_Regular-s.p.04x3_c.65ql0s.otf`
- Bold: `ABCArizonaSans-Bold.otf`

Per the brand manual (Section 3): *"ABC Arizona Sans is the branding typography used for headings, taglines, titles, and bold graphics."* It is the only brand typeface — both primary and secondary fonts in the manual are ABC Arizona Sans.

**If ABC Arizona Sans cannot be licensed for print:** use **Inter** as the only fallback. Do not substitute a different serif or any other sans-serif.

**Type system (kerning values follow the brand manual):**

| Level | Weight | Size | Kerning | Case | Use |
|---|---|---|---|---|---|
| **Heading 1 / Display** | Regular | 48–72pt | **+250 (0.25em)** | UPPERCASE | Cover title, section openers |
| **Heading 2** | Bold | 24–32pt | **+100 (0.1em)** | UPPERCASE | Page headers (e.g. "SETTING THE CONTAINER") |
| **Sub-heading** | Regular Italic | 16–20pt | 0 | Sentence case | Pull quotes, taglines |
| **Body** | Regular | 10–12pt | 0 | Sentence case | Paragraphs, teaching copy |
| **Body bold** | Bold | 10–12pt | 0 | Sentence case | Emphasis within body copy |
| **Eyebrow label** | Bold | 9–10pt | **+100 (0.1em)** | UPPERCASE | Small labels above headlines (e.g. "DAY 01 · LESSON 1") |
| **Caption / page number** | Regular | 8–9pt | +50 (0.05em) | Sentence or UPPERCASE | Footnotes, safety notes, page numbers |

**Kerning notation:** In Adobe InDesign / Illustrator, kerning is measured in 1/1000 em units, so the manual's "250pt kerning" = `0.25em` CSS letter-spacing, and "100pt" = `0.1em`. The website's `tailwind.config.ts` already reflects these values (`tracking-display: 0.25em`, `tracking-heading: 0.1em`).

**Leading:** 1.6 for body copy, 1.0–1.2 for display headings. Body columns max 68 characters wide.

**Italic usage:** reserved for sub-headings, pull quotes, and scripts the host reads aloud. Do not italicize body copy for emphasis — use bold instead.

### 2.3 The Revivery brand pattern

The abstract gold-line composition (curved D-shape, diagonal mark, vertical stroke) at `/public/03 _ Pattern 2/Rivivery_Pattern_Gold.png` — also available as `.ai`, `.eps`, `.pdf`, `.jpg`.

**Pattern usage rules (strict, from Section 2 of the brand manual):**

- **Color: Gold only.** Never any other color. Exception: in print, may be rendered as gold foil on Blue Black.
- **Background: Blue Black only.** The pattern must never appear on Peach, Teal, or white backgrounds.
- **Orientation: vertical only.** May not be rotated at any angle within 90° of vertical. Must remain upright as shown in the source file. (Horizontal flip / 180° mirror are not explicitly addressed — treat as non-standard and avoid unless approved.)
- **Justification: left or right.** Never center-justified on a page.
- **Placement: always extending off the page or image edge** — used as a background texture, never as a floating element contained within a page.
- **Scale: never zoomed in so far it becomes indistinguishable** as the Revivery pattern. Must be recognizable as the composition.
- **Frequency: use sparingly** — not on every page. The manual explicitly states: "Showing up as a subtle complement to the otherwise clean and simple branding."
- **Clear space: `height of pattern ÷ 2` on all sides.** No logos, graphics, or text may overlap the pattern itself. Place logos/copy on a solid color block, not in front of the pattern.
- **Never tile, repeat, stretch, recolor, add effects, or distort.**
- It is a *single composition*, not a tile — always use as a whole artwork.

**What this means for the workbook specifically:** the pattern will only appear on the cover, the blue-black "Breathwork Cheat Sheet" (page 19), and the blue-black "About Revivery" spread (page 22). It is **not** used on peach/teal/light pages, and **not** on the teal theme pages (5–9). See updated page specs in Section 4.

### 2.4 Logos

All logo files are in `/public/02 _ Logos/`. Formats available: `.ai`, `.eps`, `.pdf`, `.png`, `.jpg`. The brand manual defines three distinct marks: **Primary Logo**, **Logo Mark**, and the **5 R's Brand Element**.

| Variant | When to use |
|---|---|
| **Primary Logo — Text only — Teal** | On Peach or white backgrounds (the default per brand manual) |
| **Primary Logo — Text only — Gold** | On Blue Black backgrounds |
| **Primary Logo — Text only — Peach** | On Blue Black or Teal backgrounds |
| **Primary Logo — Text only — White/Black** | Only when full color can't be used (vendor constraints) |
| **Primary Logo — With Tagline** | Allowed alongside the logo; tagline must be right-justified under the logo, fixed spacing, never rescaled independently |
| **Logo Mark (circle R) — Gold** | On Blue Black backgrounds — primary use |
| **Logo Mark (circle R) — Peach** | On Teal backgrounds |
| **Logo Mark (circle R) — Teal** | On Peach or white backgrounds |
| **5 R's Brand Element** | Decorative accent used alongside the primary logo or logo mark; can be used on any brand color (see "⚠️ Missing asset" note below) |

**Justification rules (from Section 1 of the brand manual):**

- **Primary Logo:** must be **center-justified or right-justified**. Never left-justified. May be used to the edge of an image/border.
- **Logo Mark:** must be **center-justified or right-justified**. Never left-justified.
- **5 R's Brand Element:** must **always be left-justified**. Never right-justified or center-justified.

**Clear space:** `height of logo ÷ 2` on all four sides. No graphic element may invade this zone — the only exception is the tagline, which has a fixed relationship to the primary logo.

**Minimum distance from other content:** 0.25 inches (per the manual).

**Never modify:** the weight of the text, the spacing between lines, or the spacing between text and icon. No stylized, animated, or hand-drawn versions.

**⚠️ Missing asset — the 5 R's Brand Element:** The brand manual (page 11) describes a decorative "5 R's" icon that is distinct from the circle-R logo mark — used on hats, packaging, and the back of collateral as a brand element. This asset is NOT in the `/public/02 _ Logos/` folder. If you want the 5 R's on the workbook (recommended for the back cover and a decorative page-number zone), you need to request it from Oxford Creative Studio (the brand creator) before handoff. Otherwise, the workbook will use only the Primary Logo and Logo Mark.

---

## 3. Design principles

**The workbook should feel like:** a quiet, premium editorial piece — the offspring of a Kinfolk spread, a high-end retreat program, and a practical field notebook. Not a corporate PDF. Not a Canva template. Not a gym log.

**Guiding words:** quiet, generous, intentional, grounded, warm, spacious.

**Layout principles:**
- White space (peach space) is the primary design tool. Never fill a page just to fill it.
- One idea per page. If two ideas compete, use a spread (left page / right page).
- Body copy lives in a single column, 4.25" wide maximum, centered-ish or left-aligned. Never justified.
- Lines for writing are hairline (0.25pt) in gold or teal, never gray.
- Checkboxes are open squares, 12pt × 12pt, hairline stroke in gold.
- All fillable form fields: transparent background, the stroke under them is the visual. Inside form fields use Arizona Sans Regular.

**Tone of copy:** Tricia's voice. Warm, direct, precise. Short sentences. No emoji. No jargon. Second person ("you," "your guests"). The workbook copy must not contradict or deviate from the site copy.

---

## 4. The 24-page outline with full content

The full content for each page is below. Items in plain prose are teaching copy (should be set in body size). Items marked **[PROMPT]** are space for the reader to write. Items marked **[CHECKLIST]** are checkboxes. Items marked **[SCRIPT]** are scripts the host reads aloud at the gathering — set these in italic or in an offset script-card treatment.

Page dimensions assume reader-right pagination (odd-numbered pages on the right, even on the left).

---

### Cover (outside front)

- Background: Blue Black `#2E393F`, full bleed
- Revivery Primary Logo (text only, Gold) — **center-justified** at top (per brand manual: logo must be center or right, never left). Size: clear-space of `logo height ÷ 2` on all sides.
- Brand pattern — Gold, vertical orientation, **right-justified**, bleeding off the right edge. Pattern must not overlap the logo — respect clear space. Opacity 100% (or gold foil if printing).
- Title, centered, mid-page:
  - Eyebrow (Peach): "A FREE COMPANION TO THE MINI COURSE" — letterspaced +100 / 0.1em
  - Heading 1 (Peach): "THE SAUNA / HOST." — 2 lines stacked, centered, letterspaced +250 / 0.25em
  - Sub-heading italic (Peach at 70%): "Workbook v1.0"
- Bottom: thin Gold rule, then small caption (Peach, caption size, letterspaced +100): "REVIVERY · TAMPA, FL · HEAT · ICE · REPEAT"

### Inside front cover (page i)

- Background: Peach `#F4DFC8` full bleed
- Left-aligned, top margin:
  - Eyebrow (Gold): "HOW TO USE THIS"
  - Heading 2 (Blue Black): "THIS WORKBOOK IS FOR THE HOST YOU'RE BECOMING"
- Body (Blue Black, 11pt):
  - "The five lessons of The Sauna Host give you the method. This workbook gives you the paper — the place where the method becomes your plan, in your words, for your people, in your space."
  - "Everywhere you see a line, that's for you to write. Everywhere you see a script, that's for you to read aloud at the gathering. Everywhere you see a box, that's a thing to check off the night of."
  - "The workbook works whether you print it or fill it on your screen. The fillable PDF lets you type directly into each line."
  - "One page per day. Five gathering plans to choose from. A small collection of reference cards you can tear out and bring with you to the sauna."
- No pattern on this page (pattern is Blue Black only).
- Thin Gold rule across the page bottom, above the page number.

### Page 1 — Your Gathering Starts With People (Day 1)

- Eyebrow: "DAY 01 · LESSON 1"
- Display M: "YOUR GATHERING STARTS WITH PEOPLE"
- Pull quote (Body large, italic, gold): *"Heat forces presence. Cold forces honesty. The gathering is just the container."*
- Body (condensed from Lesson 1, ~120 words):
  - "The people who experience the deepest change from contrast therapy aren't the ones with the best protocols. They're the ones who do it with other people. The sauna and the cold are the capsule. Connection is the medicine."
  - "Your first job isn't to design a gathering. It's to name your people."
- **[PROMPT]** "The 4–8 people you've been meaning to see. Write their names." — 8 writing lines
- **[PROMPT]** "Of those names, who would you text today?" — 2 writing lines
- Footer hint (gold italic, small): "Day 1 practice: text one of them today. A soft commitment. No date yet."

### Page 2 — Setting the Container (Day 2)

- Eyebrow: "DAY 02 · LESSON 2"
- Display M: "SETTING THE CONTAINER"
- Body intro (~80 words): "The first 90 seconds of a gathering decide whether the room relaxes or performs. A trained lead does three things: names what's about to happen, names the shape of the time, and names the agreement. Write yours below."
- **[SCRIPT BOX — treat as a card with gold hairline border, peach-soft fill, centered on page]**
  - H2 (gold): "YOUR ARRIVAL SCRIPT"
  - Template with blanks for the reader to fill:
    > "I'm so glad you're here. Tonight we're going to ______________. It'll take about ______________. While we're in here, let's agree that ______________."
  - Below the script, caption: "Read this out loud. See how it lands in your body before you read it to the room."
- **[PROMPT]** "What shape of time does your gathering have? (Arrival, rounds, close.)" — 3 writing lines
- **[PROMPT]** "What's the one agreement you want in the room?" — 2 writing lines

### Page 3 — Two Breathwork Patterns (Day 3)

- Eyebrow: "DAY 03 · LESSON 3"
- Display M: "TWO BREATHWORK PATTERNS"
- Body intro (~60 words): "When a group breathes in the same pattern, their nervous systems synchronize. You don't need to be a breathwork instructor to lead this. You just need to pick a pattern, count it out loud twice, and then go silent while everyone does it with you."
- **[TWO REFERENCE CARDS side-by-side — each a bordered box with gold hairline, peach background]**
  - **Card A: Box Breathing**
    - H2 (gold): "BOX BREATHING · THE CALM ONE"
    - Numbered steps (large, spaced):
      - "1. Breathe in for 4"
      - "2. Hold for 4"
      - "3. Breathe out for 4"
      - "4. Hold for 4"
    - Caption: "For book clubs, milestones, when the energy should stay grounded. Lead 3 rounds aloud. Then say 'We'll do this on our own for two minutes.' Then go silent."
  - **Card B: 4-7-8 Breathing**
    - H2 (gold): "4–7–8 · THE SETTLING ONE"
    - Numbered steps:
      - "1. In through the nose for 4"
      - "2. Hold for 7"
      - "3. Out through the mouth for 8"
    - Caption: "For women's circles, men's gatherings, anywhere you want people to drop below the surface fast. 4–6 cycles."
- **[SAFETY NOTE at bottom]** Small italic caption in teal: "Extended breath holds aren't for everyone. If you're pregnant, have a seizure disorder, or have low blood pressure, skip the holds and just breathe gently."

### Page 4 — The 90 Seconds After the Plunge (Day 4)

- Eyebrow: "DAY 04 · LESSON 4"
- Display M: "THE 90 SECONDS AFTER THE PLUNGE"
- Body intro: "The cold plunge gets all the attention. The plunge is not the point. The point is the 60 seconds after. Here is the three-step integration, memorized."
- **[THREE NUMBERED CARDS stacked vertically, each with a large gold numeral, H2 label, and a script]**
  - **01 · The breath land (30 sec)**
    - H2 (gold): "THE BREATH LAND"
    - Script (italic): *"Let's take a minute together to let our breath come back."*
    - Caption: "Everyone stands or sits still, towels around shoulders. You do not talk. You do not fill."
  - **02 · The body scan (30 sec)**
    - H2 (gold): "THE BODY SCAN"
    - Script (italic): *"Notice what's happening in your hands. Notice your chest. Notice what your face is doing."*
    - Caption: "Most people will close their eyes without being asked."
  - **03 · The anchor question (one answer each)**
    - H2 (gold): "THE ANCHOR QUESTION"
    - Pick one, rotate by gathering:
      - *"What's one word for what you just felt?"*
      - *"What's one thing you're noticing right now?"*
      - *"What's one thing you're grateful your body can do?"*
- **[SAFETY NOTE at bottom]**: "Cold plunging isn't for everyone. If you have heart conditions, uncontrolled blood pressure, or are pregnant, please check with your doctor first."

---

### Pages 5–9 — Your Five Themes (the core of the workbook)

Each theme page follows the **exact same layout** so the reader can flip between them. Think: flashcards, one per theme.

**Consistent layout for each theme page:**

- Background: Teal `#395B5E`, full bleed
- Text: Peach `#F4DFC8`
- Accents: Gold `#AD8D4C`
- Eyebrow (top-left, gold letterspaced): "THEME 0X"
- Display L (peach): [THEME NAME]
- Tagline (italic, gold, below title): [THEME TAGLINE]
- Then a **4-panel grid** covering the rest of the page:

| Panel | Contents |
|---|---|
| **Invitation** (top-left) | H2: "THE INVITATION" · text script for the host to copy-paste into their text message, italic |
| **Flow** (top-right) | H2: "YOUR 90-MIN FLOW" · a 6-step flow with times |
| **10 Prompts** (bottom-left) | H2: "10 CONVERSATION PROMPTS" · numbered list of 10 questions specific to this theme |
| **Playlist + Post-text** (bottom-right) | H2a: "PLAYLIST SEED" · 3–5 song/mood descriptors · H2b: "POST-GATHERING TEXT" · script for the group thread the morning after |

Below the grid, a single thin gold hairline and the page number with the logomark.

The five theme pages, with content filled in:

---

### Page 5 — Women's Circle

- Eyebrow: "THEME 01"
- Display L: "WOMEN'S CIRCLE"
- Tagline: *"The girls' night you've been meaning to host."*

- **THE INVITATION** (italic script)
  > *"[Name] — I'm putting together a small women's circle in a few weeks. Sauna, cold plunge, real conversation, home by 10. Six of us. I want you there. Are you in?"*

- **YOUR 90-MIN FLOW**
  - 00:00 — Arrival & container (10 min)
  - 00:10 — Sauna round 1 + 4-7-8 breath (20 min)
  - 00:30 — Plunge + integration (5 min)
  - 00:35 — Sauna round 2 + prompts 1–3 (25 min)
  - 01:00 — Plunge + integration (5 min)
  - 01:05 — Close / landing (15 min)

- **10 CONVERSATION PROMPTS**
  1. What's something you've been carrying alone that you'd like to put down tonight?
  2. Who was the woman who taught you to be the woman you are?
  3. What are you tired of being polite about?
  4. What have you said yes to this year that you wish you'd said no to?
  5. What's the next version of you asking for?
  6. What does rest actually feel like for you?
  7. What's a boundary you're still figuring out?
  8. Who in this room do you want to know better?
  9. What's the thing you're celebrating that nobody else knows yet?
  10. What would you like to leave behind before we walk out?

- **PLAYLIST SEED**: Nils Frahm · Olafur Arnalds · Bon Iver (quieter tracks) · Agnes Obel · slow & spacious only
- **POST-GATHERING TEXT** (italic)
  > *"Last night meant something to me. Thank you for showing up. One thing I'm taking with me from each of you: [name — word/phrase]. Let's do this again."*

---

### Page 6 — Men's Gathering

- Eyebrow: "THEME 02"
- Display L: "MEN'S GATHERING"
- Tagline: *"Depth without the workshop."*

- **THE INVITATION**
  > *"[Name] — I'm hosting something different in a couple weeks. A few of us, sauna, cold plunge, real conversation — no agenda, home by 10. You're one of the 5 guys I want there. In?"*

- **YOUR 90-MIN FLOW** (same structure as Women's Circle)
  - 00:00 — Arrival & container (10 min)
  - 00:10 — Sauna round 1 + Box breath (20 min)
  - 00:30 — Plunge + integration (5 min)
  - 00:35 — Sauna round 2 + prompts 1–3 (25 min)
  - 01:00 — Plunge + integration (5 min)
  - 01:05 — Close / landing (15 min)

- **10 CONVERSATION PROMPTS**
  1. What's something you've been grinding on that you haven't told anyone about?
  2. Who taught you what it means to be a man, and what did they get right or wrong?
  3. What's an identity you're ready to let go of?
  4. What's a risk you know you should take but keep postponing?
  5. Who's asking something of you right now that you haven't answered?
  6. What's a version of strength you're trying to grow into?
  7. What's the thing you're proudest of that you rarely mention?
  8. Where are you performing for people who aren't in this room?
  9. What does your future self want you to hear tonight?
  10. What does brotherhood actually look like for you?

- **PLAYLIST SEED**: Emancipator · Tycho · Bonobo (ambient cuts) · RY X · nothing with lyrics during breath rounds
- **POST-GATHERING TEXT**
  > *"Thanks for last night, gentlemen. Seriously. One thing I heard from each of you I'm still thinking about: [name — phrase]. Next one in 4 weeks. I'll send a date."*

---

### Page 7 — Milestone Celebration

- Eyebrow: "THEME 03"
- Display L: "MILESTONE CELEBRATION"
- Tagline: *"Birthdays and thresholds done differently."*

- **THE INVITATION**
  > *"[Name] — I'm turning [age] / crossing [threshold] and instead of a dinner I'm doing something that'll actually feel like something. Sauna, cold plunge, 8 of us, 90 minutes. Would you be one of them?"*

- **YOUR 90-MIN FLOW**
  - 00:00 — Arrival & container (10 min)
  - 00:10 — Sauna round 1 + Box breath + toast (25 min)
  - 00:35 — Plunge + integration (5 min)
  - 00:40 — Sauna round 2 + prompts 1–4 (25 min)
  - 01:05 — Plunge + integration (5 min)
  - 01:10 — Close / blessing (10 min)

- **10 CONVERSATION PROMPTS**
  1. What's one thing you're grateful this person did for you?
  2. What do you know about them that you want them to remember tonight?
  3. What's a thing you want to witness them releasing?
  4. What's your wish for the next chapter of their life?
  5. What's a quality of theirs you'd like to borrow?
  6. When did you first know this person mattered to you?
  7. What have they taught you without meaning to?
  8. What have they survived that they don't give themselves credit for?
  9. What's one word for who they are becoming?
  10. What's your one-sentence blessing for them?

- **PLAYLIST SEED**: Hermanos Gutiérrez · Khruangbin (mellow) · Daniel Caesar · one celebratory track saved for the close
- **POST-GATHERING TEXT**
  > *"To the person of honor — you're loved. To everyone else — thank you for showing up for them. What I heard last night was a gift. Here's to the next chapter."*

---

### Page 8 — Book Club

- Eyebrow: "THEME 04"
- Display L: "BOOK CLUB"
- Tagline: *"Where the book becomes the excuse."*

- **THE INVITATION**
  > *"[Name] — We're doing [BOOK TITLE] for book club, but at the sauna this time. Six of us, 90 min, we'll actually get past plot summary. Read by [date]? You in?"*

- **YOUR 90-MIN FLOW**
  - 00:00 — Arrival & container (10 min)
  - 00:10 — Sauna round 1 + Box breath + prompts 1–2 (25 min)
  - 00:35 — Plunge + integration (5 min)
  - 00:40 — Sauna round 2 + prompts 3–6 (30 min)
  - 01:10 — Plunge + integration (5 min)
  - 01:15 — Close (15 min)

- **10 CONVERSATION PROMPTS**
  1. What's the line from the book you've been thinking about since you closed it?
  2. Which character felt most like someone you know?
  3. What did the book get right that other books get wrong?
  4. What did you resist agreeing with?
  5. What did the book change about how you see a current part of your life?
  6. What's a question the book left unanswered for you?
  7. If you could write an alternate ending, what would it be?
  8. Who else in your life needs to read this?
  9. What would you ask the author if you could?
  10. What's the thing from this book you want to carry into next month?

- **PLAYLIST SEED**: Keep it ambient and low — Max Richter · Sufjan Stevens (quiet works) · rain recordings — the book is the star
- **POST-GATHERING TEXT**
  > *"Last night was the best this book club has ever been. One line from each of you I wrote down: [name — line]. Next book, next gathering. I'll send a date."*

---

### Page 9 — Couples Night

- Eyebrow: "THEME 05"
- Display L: "COUPLES NIGHT"
- Tagline: *"Date night, reimagined."*

- **THE INVITATION**
  > *"[Couple] — [Partner] and I are putting together a small couples' gathering. Sauna, cold plunge, real conversation, you and us and maybe one more couple. 90 minutes, home by 10. Would you come?"*

- **YOUR 90-MIN FLOW**
  - 00:00 — Arrival & container (10 min)
  - 00:10 — Sauna round 1 + 4-7-8 breath + prompts 1–3 (25 min)
  - 00:35 — Plunge (partners help each other in) + integration (5 min)
  - 00:40 — Sauna round 2 + prompts 4–7 (25 min)
  - 01:05 — Plunge + integration (5 min)
  - 01:10 — Close (10 min)

- **10 CONVERSATION PROMPTS**
  1. What was the last thing your partner did that surprised you?
  2. What's a quality of your partner's you fell in love with that you still love today?
  3. What's something you want to try together that you haven't said out loud?
  4. What's one thing you want more of in the next six months of this relationship?
  5. Where does your partner make you braver?
  6. What's a ritual you want to start together?
  7. When has your partner held you that you haven't properly thanked them for?
  8. What's a hard thing you've navigated together that you're proud of?
  9. What do you want to say to your partner that you usually save for anniversaries?
  10. What's one thing you want to remember about tonight?

- **PLAYLIST SEED**: Khruangbin · Men I Trust · Nick Drake · Beach House — warm, intimate, slow
- **POST-GATHERING TEXT**
  > *"Thank you for the hours last night. [Partner] and I are still talking about it. Let's not wait to do that again."*

---

### Page 10 — The Close

- Eyebrow: "THE LAST MOVE"
- Display M: "THE CLOSE · LANDING"
- Body intro: "Every Revivery gathering ends the same way. Not a summary. Not a debrief. A moment where everyone in the room has the chance to say one thing — if they want to. This is called landing."
- **[SCRIPT BOX]**
  - H2 (gold): "YOUR CLOSING SCRIPT"
  - Script (italic):
    > *"Before we head back into the world, let's take a minute to close together. I'd love to go around and hear one thing from each of you — anything you're taking with you from tonight. One word, one sentence, one thought. If you'd rather pass, just say 'pass.' I'll go first."*
  - Caption: "You go first. You model what a short, honest answer sounds like. Then the next person. Then the next. You do not respond. You hold the space."
- **[PROMPT]** "What's your first-go answer? (Practice it before the night.)" — 3 lines

### Page 11 — Your Flow

- Eyebrow: "PLAN IT"
- Display M: "YOUR 90-MINUTE FLOW"
- Body: "Each theme page gives you a suggested flow. This page is for you to write your own — the version that fits your space, your sauna, your people."
- **[FILLABLE TIMELINE TABLE]** — 8 rows, two columns: "TIME" and "WHAT HAPPENS"
- **[PROMPT]** Below table: "Where in the flow are you nervous? What will you do about it?" — 4 lines

### Page 12 — Your Playlist

- Eyebrow: "PLAN IT"
- Display M: "YOUR PLAYLIST"
- Body: "Music is the second host in the room. Slow, warm, instrumental-first. Save anything with lyrics for after the last plunge."
- **[FILLABLE TRACK LIST]** — 10 rows, three columns: "TIME CUE" · "TRACK" · "MOOD"
- **[PROMPT]** "What's the one song you want to play when people are drying off at the end?" — 1 line

### Page 13 — Your Invitation

- Eyebrow: "PLAN IT"
- Display M: "YOUR INVITATION"
- Body: "Draft your actual invitation text. Keep it 4 sentences max. Name what, when, how many, a soft ask. Read it out loud. Then send it."
- **[LARGE WRITING AREA — one full card, gold hairline, peach bg]** "Draft your invitation:" 10 lines
- **[CHECKLIST]**
  - [ ] Names the theme (circle, gathering, milestone, book club, couples night)
  - [ ] Names the time — roughly when, roughly how long
  - [ ] Names the size of the group
  - [ ] Contains one line that tells the reader why you want them specifically
  - [ ] Ends with a soft ask, not a "let me know if you can make it"
  - [ ] Feels like you wrote it, not ChatGPT

### Page 14 — The Night Before

- Eyebrow: "PREPARE"
- Display M: "THE NIGHT BEFORE"
- **[CHECKLIST, two columns]**
  - [ ] Space is clean, phones-in-basket bowl is ready
  - [ ] Sauna is pre-heated or plan for heat-up
  - [ ] Plunge is filled, stocked, towels staged
  - [ ] Towels + extra robes laid out
  - [ ] Water pitcher + glasses out
  - [ ] Playlist queued, tested through whatever speaker you're using
  - [ ] Lighting is warm and low
  - [ ] You have read your arrival script aloud
  - [ ] You have chosen your 3–4 prompts for tonight
  - [ ] You have your first-go close answer ready
  - [ ] You've eaten light — not heavy — two hours before
  - [ ] You have a "what if someone's late" plan
  - [ ] You have a "what if someone's intensely uncomfortable" plan

### Page 15 — The Morning After

- Eyebrow: "AFTER"
- Display M: "THE MORNING AFTER"
- Body intro: "The morning after is when the gathering becomes a thing people keep. One text from the host reinforces everything."
- **[TEMPLATE SCRIPT BOX]**
  - H2 (gold): "GROUP TEXT TEMPLATE"
  - Script (italic, blanks for them to fill):
    > *"Last night meant something to me. One thing I'm taking from each of you: [name — word or phrase] × 6. Thank you for showing up. Let's do it again soon — I'll send a date this week."*
- **[PROMPT]** "What will you send your people? Draft it now." — 6 writing lines

### Page 16 — Reflection

- Eyebrow: "AFTER"
- Display M: "WHAT WENT WELL · WHAT TO CHANGE"
- **[TWO-COLUMN LAYOUT]**
  - Left column: "WHAT WENT WELL" — 5 writing lines
  - Right column: "WHAT TO CHANGE" — 5 writing lines
- **[PROMPT BELOW]** "What did someone say that you want to remember?" — 4 writing lines

### Page 17 — Your Next Gathering

- Eyebrow: "DO IT AGAIN"
- Display M: "YOUR NEXT GATHERING"
- Body: "The best hosts don't host once. They host a practice. What's the next one?"
- **[PROMPT]** "Theme:" — 1 line
- **[PROMPT]** "Date (roughly):" — 1 line
- **[PROMPT]** "People I want there:" — 6 writing lines
- **[PROMPT]** "One thing I'll do differently:" — 2 writing lines

### Page 18 — Quick Reference: The Five Themes

- Eyebrow: "REFERENCE"
- Display M: "AT-A-GLANCE"
- **[5-ROW TABLE]** with columns: "THEME" · "WHO IT'S FOR" · "KEY BREATH" · "ENERGY"
  - Women's Circle · 4–6 women · 4-7-8 · intimate, settled
  - Men's Gathering · 4–6 men · Box breath · grounded, direct
  - Milestone · 4–8 people · Box breath · celebratory, witnessing
  - Book Club · 4–6 readers · Box breath · curious, cerebral
  - Couples Night · 2–3 couples · 4-7-8 · tender, present
- Tear-line hint (a dashed gold rule at the edge with scissors icon): this page designed to be detachable as a reference card

### Page 19 — Breathwork Cheat Sheet (tear-out)

- Full-page reference card — Blue Black bg full bleed, Peach text, Gold accents
- Title (Heading 1, Peach): "BREATHWORK · LEAD THE ROOM"
- **Box Breathing**: 4–4–4–4 · "The calm one" · Lead 3 rounds aloud, then silent
- **4–7–8 Breathing**: 4–7–8 · "The settling one" · 4–6 cycles, nose in / mouth out
- Revivery brand pattern — Gold, vertical, **right-justified**, extending off the right edge. Full opacity — this is one of only three pattern placements in the entire workbook.
- Safety note at bottom in Peach at 70%
- Dashed tear-line on the binding edge (left edge) in Gold hairline

### Page 20 — Cold Plunge Safety

- Eyebrow: "SAFETY"
- Display M: "THE COLD · CONTRAINDICATIONS"
- Body:
  - "Cold plunging is powerful. It's also not for everyone. Before your gathering, make sure every guest knows:"
- **[BULLETED LIST]** (teal bullets)
  - If you have a heart condition, uncontrolled blood pressure, or vascular disease — check with your doctor.
  - If you are pregnant — check with your doctor.
  - If you have a seizure disorder — check with your doctor.
  - If you are on blood thinners — check with your doctor.
  - Never plunge alone.
  - Never hold your breath underwater.
  - 2–3 minutes is the maximum for most people. First-timers: 30 seconds.
  - Get out if you feel faint, dizzy, or numb beyond your fingers/toes.
- Body:
  - "The point of the plunge is not to suffer. It's to meet something hard with company. Your job as host is to make the experience voluntary, well-understood, and fully optional."
- Italic caption (gold, bottom): *"When in doubt, don't. The gathering is bigger than the plunge."*

### Page 21 — FAQ for Your Guests

- Eyebrow: "FOR YOUR GUESTS"
- Display M: "QUESTIONS THEY'LL ASK"
- **[Q&A list, with Q in gold uppercase small caps and A in body]**
  - **Q: What do I wear?** — A: Whatever you wear to a pool or gym — swimsuit or shorts. A robe between rounds if you have one.
  - **Q: Do I have to do the cold?** — A: No. The plunge is always optional. A cold shower, or sitting it out, works fine.
  - **Q: What do I bring?** — A: A towel. Water is on us.
  - **Q: How long is this?** — A: About 90 minutes. You can leave earlier if you need to.
  - **Q: Is this a workout?** — A: No. It's a gathering. The sauna and plunge are the container, not the point.
  - **Q: I've never done breathwork.** — A: Perfect. You don't need to have. Your host will lead it.
  - **Q: Can I drink alcohol before/after?** — A: Before — no. After — light, if you want, once you've rehydrated.
  - **Q: Will there be phones?** — A: No. Phones stay in a basket at the door.

### Page 22 — About Revivery + The Next Step

- Background: Blue Black full bleed, Peach text
- Revivery Logo Mark (Gold) at top — center-justified (per brand rule: center or right only)
- Revivery brand pattern — Gold, vertical, **right-justified**, extending off the right edge at low-to-medium opacity (60%). This is the third and final pattern placement in the workbook. Pattern must not overlap the logo mark or any copy — place logo and body text on left half of the page to respect pattern clear-space.
- Eyebrow (Gold): "WHAT'S NEXT"
- Heading 2 (Peach): "YOU JUST LEARNED FIVE PERCENT OF WHAT THE INSTRUCTORS KNOW."
- Body (Peach):
  - "The method in this workbook is distilled from Revivery Instructor Training — an eight-week certification for people who want to lead contrast therapy gatherings professionally, at studios, or in their own practice."
  - "If you loved hosting your first gathering and you want to go much deeper — into the science, the facilitation skills, the trauma-aware framework — that's what RIT is for."
  - "The next cohort starts soon. The link is in the email. You don't need to be a wellness professional to apply."
- Large Gold call-out: "REVIVERY.CO/INSTRUCTOR-TRAINING" — centered within the left content block
- CTA button-styled box (Gold fill, Blue Black text): "APPLY TO RIT →"
- Small caption below in Peach at 70%: "Questions? learn@revivery.co"

### Page 23 — Notes

- Background: Peach full bleed
- Eyebrow (Gold): "FOR YOU"
- Heading 2 (Blue Black): "NOTES"
- Full page of hairline Gold ruled lines (~22 lines)
- No pattern on this page (pattern is Blue Black only)

### Back cover (outside back)

- Background: Peach `#F4DFC8` full bleed
- Centered:
  - Revivery Primary Logo (text only, Teal) with the Tagline variant — center-justified (per brand rule, with the tagline right-justified under the logo, fixed spacing)
  - Small Teal rule
  - Italic sub-heading (Blue Black): *"Heat. Ice. Repeat. — Tampa, FL"*
- No pattern on this page (pattern is Blue Black only)
- Tiny caption, bottom (Blue Black, caption size): "© Revivery. The Sauna Host Workbook v1.0. · revivery.co/host"

---

## 5. Assets

All listed paths are relative to the `sauna-host-site` repo root.

| Asset | Path |
|---|---|
| Primary logo (white, text only) | `/public/02 _ Logos/Primary Logo/Text Only/White/Rivivery_PrimaryLogo_White.png` (+ `.ai`, `.eps`, `.pdf`) |
| Primary logo (black, text only) | `/public/02 _ Logos/Primary Logo/Text Only/Black/` |
| Primary logo (white, with tagline) | `/public/02 _ Logos/Primary Logo/With Tagline/White/` |
| Logomark (circle R, gold) | `/public/02 _ Logos/Logo Mark/Color/Gold/Rivivery_Logo_Mark_Gold.png` |
| Logomark (circle R, white) | `/public/02 _ Logos/Logo Mark/White/` |
| Gold pattern | `/public/03 _ Pattern 2/Rivivery_Pattern_Gold.png` (+ `.ai`, `.eps`, `.pdf`) |
| ABC Arizona Sans Regular | `/public/fonts/ABCArizonaSans_Regular-s.p.04x3_c.65ql0s.otf` |
| ABC Arizona Sans Bold | `/public/fonts/ABCArizonaSans-Bold.otf` |
| Photography (people in sauna/plunge) | `/public/album-d448711124-downloads/` and `/public/album-d469655919-downloads-pt1/` (240 images) |

**Photography rules for the workbook:** use photographs sparingly. Only on the cover, page 22 (About Revivery), and optionally as small atmospheric edge images on pages 1 and 18. Avoid placing text over photos — use the dark-overlay pattern from the website if a photo must be a background.

---

## 6. Voice and copy guardrails

- Second person throughout ("you," "your gathering," "your people")
- Contractions are fine ("you're," "it's")
- Never "facilitator" — always "host" or "lead"
- Never "session" — always "gathering," "circle," or "night"
- No emoji, ever
- No exclamation marks in body copy (one is acceptable on the cover or a CTA)
- Teaching copy is short sentences. Scripts are exactly as written — do not rephrase the scripts, they have been tested.
- Italics are reserved for (a) scripts the host reads aloud, (b) pull quotes, (c) the tagline lines under theme names
- Small caps are fine for eyebrow labels if the typeface supports them

---

## 7. Final-file checklist before handoff back

- [ ] All fonts embedded (not subsetted in a way that strips unused glyphs needed in fillable fields)
- [ ] All form fields fillable in Acrobat Reader, Preview.app, and Chrome PDF viewer
- [ ] All bleeds at 0.125"
- [ ] All safety margins respected
- [ ] File size under 25MB
- [ ] Accessibility: tagged PDF with correct reading order and alt text on all non-decorative images
- [ ] Pattern and logos used at approved sizes/opacities
- [ ] Page numbers present on every spread except cover, inside-front, and back cover
- [ ] Proofed against this brief — no page skipped, no content altered
- [ ] Also deliver the editable source file (Figma, InDesign, or Adobe Illustrator) plus a PNG preview of every page

---

**Contact:** learn@revivery.co — Tricia
**Site:** https://sauna-host-site.vercel.app
**RIT:** https://revivery.co/instructor-training
