# Brand Manual Compliance Notes

**Audit date:** 2026-04-20
**Source of truth:** `/public/Revivery_Brand_Manual.pdf` (Oxford Creative Studio)

This document records how the website implements the Revivery Brand Manual, what it fixed in the April 2026 audit, and the one intentional digital adaptation from the manual's print-first rules.

---

## Audit fixes (2026-04-20)

Everything in this section was a violation of the manual, now corrected.

### 1. Pattern placement — ThemeCards
- **Violation:** Gold brand pattern was used on a teal-tinted section (`bg-teal/5`), with one instance rotated 180°.
- **Manual rule (§2):** "The Brand Pattern should only be used against the Blue Black Background from the brand." "The Brand Pattern may not be rotated to any angle within 90°."
- **Fix:** Section background changed to Blue Black. Reduced to a single pattern instance, vertical orientation, right-justified, bleeding off the right edge of the section.

### 2. Pattern placement — FinalCTA
- **Violation:** A custom 20-bar tick decoration was used on a teal-tinted section (`bg-teal/10`).
- **Manual rule (§2):** "Use of any stylized, animated, hand drawn or other versions of an official Icon or Pattern is not recommended."
- **Fix:** Tick decoration removed. Section background changed to Blue Black. Brand pattern added, vertical, left-justified, bleeding off the left edge.

### 3. Logo color — Nav and Footer
- **Preference violation:** Both used the white primary logo on Blue Black.
- **Manual preference (§1):** On Blue Black, Gold or Peach logos are the primary choice; white is only when full-color is unavailable.
- **Fix:** Swapped to the Peach primary logo (`/brand/logo-primary-peach.png`).

### 4. Color tokens — Tailwind config
- **Violation:** Config defined `blue-black.900`, `teal.900`, `gold.light`, `gold.dark`, and `peach.soft` — none are in the brand manual.
- **Manual rule (§4):** Four canonical colors only — Teal `#395B5E`, Blue Black `#2E393F`, Gold `#AD8D4C`, Peach `#F4DFC8`.
- **Fix:** Tailwind `colors` collapsed to the four canonical values. All components updated to use opacity modifiers (e.g. `text-gold/70`) instead of the removed variants.

---

## Intentional digital adaptation

### Nav and Footer logo justification

- **Manual rule (§1):** "The primary logo may be centered, or right justified. It should never be left justified."
- **Web UX convention:** Left-aligned logos in the top-left of the nav are the dominant pattern across the web. Users expect the brand mark in that position as the "home" affordance. Footer logos in the leftmost column follow the same convention.
- **Decision:** Preserve the left-justified logo in both Nav and Footer on this website. This is documented in the component files themselves:
  - `components/Nav.tsx` header JSDoc
  - `components/Footer.tsx` header JSDoc
- **Scope:** This adaptation applies to the website only. All print and PDF collateral (including the Sauna Host Workbook) follows the manual strictly — Primary Logo is center- or right-justified.

---

## Current on-brand implementation

### Canonical palette in use
| Color | Hex | Role |
|---|---|---|
| Teal | `#395B5E` | Primary logo color (on light bg); accent |
| Blue Black | `#2E393F` | Primary background across the site (body + dark sections) |
| Gold | `#AD8D4C` | Accents, eyebrow labels, buttons, pattern, hover states |
| Peach | `#F4DFC8` | Primary text color on Blue Black; Nav + Footer logo color |

Opacity modifiers (e.g. `/90`, `/70`, `/50`) are the accepted way to get softer shades while staying within the canonical palette.

### Typography
- Single brand face: **ABC Arizona Sans** (Regular + Bold), self-hosted from `/public/fonts/`
- Display / Heading 1: uppercase, Bold, `tracking-display` (0.25em) — matches manual's "kerning 250pt"
- Heading 2: uppercase, Bold, `tracking-heading` (0.1em) — matches manual's "kerning 100pt"
- Body: Regular, no caps, default tracking
- Italic reserved for pull quotes, taglines, and host scripts

### Pattern placement (three instances total across the site)
1. **ThemeCards** (Blue Black bg) — right edge, vertical, bleeding off
2. **FinalCTA** (Blue Black bg) — left edge, vertical, bleeding off
3. **Hero** — no pattern (photo only, with gradient overlay — matches manual's rack-card pattern of full-bleed photo with transparent dark overlay)

### Logo variants in use
| File | Variant | Used in |
|---|---|---|
| `/brand/logo-primary-peach.png` | Primary Logo, text only, Peach | Nav (on Blue Black) · Footer (on Blue Black) |
| `/brand/logo-mark-gold.png` | Logo Mark, circle-R, Gold | Favicon (32×32 and 180×180) |

Available but unused (kept in `/brand/` for future needs): `logo-primary-white.png`, `logo-primary-gold.png`, `logo-mark-white.png`.

---

## Missing assets — to request from Oxford Creative Studio

- **The 5 R's Brand Element** (manual §1, p.11) — a decorative icon distinct from the Logo Mark. Used on hats, packaging, and the back of collateral. Not currently in `/public/02 _ Logos/`. Required if the workbook or future collateral wants the decorative back-of-page element.

---

## How to stay compliant going forward

1. **Before using any color outside Teal / Blue Black / Gold / Peach — stop.** Use an opacity modifier on one of the four, not a new shade.
2. **Before placing the pattern anywhere — confirm the background is Blue Black, the pattern is vertical, and it bleeds off a left or right edge.**
3. **Before adding a new logo instance — confirm the variant matches the background** (Gold or Peach on Blue Black; Teal on light).
4. **Any new print or PDF collateral must use the WORKBOOK_BRIEF.md typography + pattern rules**, which follow the manual strictly. Web components can use the digital adaptation above.

**Contact:** learn@revivery.co
**Brand source:** Oxford Creative Studio · hello@oxfordcreativestudio.com
