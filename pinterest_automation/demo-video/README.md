# Pinterest Demo Video — Remotion project

A 90-second animated explainer for Pinterest's Standard access application, rendered programmatically with [Remotion](https://www.remotion.dev/). Brand-themed (Teal / Blue Black / Gold / Peach), shows what the auto-pin app does, what scopes it requests, and how the OAuth flow works.

**Honest framing:** this is an animated explainer — not a screen recording. It illustrates the app's flow with stylized mockups (consent screen, terminal output, queue table) instead of capturing a real authentication. Pinterest reviewers may accept it, may ask for a real screen capture instead. If they ask for the latter, see `../DEMO_VIDEO.md` for the screen-recording fallback.

## What's in the 90 seconds

| Frames | Time | Section | What it shows |
|---|---|---|---|
| 0–149 | 0:00–0:05 | Title | Brand-pattern title card: "The Sauna Host — Pinterest API · Auto Pin & Analytics" |
| 150–389 | 0:05–0:13 | Overview | The flow: pin_queue.csv → post_next.py → Pinterest API |
| 390–1109 | 0:13–0:37 | OAuth | Code snippet of requested scopes → animated Pinterest consent screen → terminal showing tokens saved |
| 1110–1829 | 0:37–1:01 | Pin creation | pin_queue.csv preview (5 brand-voiced rows) → `create_pin` source → terminal showing successful POST /v5/pins |
| 1830–2369 | 1:01–1:19 | Analytics | Terminal running `pull_analytics.py` → stat cards |
| 2370–2699 | 1:19–1:30 | Closing | Use-case summary, brand mark |

Total: 2700 frames @ 30 fps = 90 seconds.

## Setup (one-time)

You need Node 18+ and npm.

```bash
cd "/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation/demo-video"
npm install
```

The install pulls Remotion, React, and Google Fonts (Inter + JetBrains Mono). About 250 MB total. Takes 1–2 minutes on a modern Mac.

## Preview interactively (recommended before rendering)

```bash
npm start
```

Opens Remotion Studio in your browser at `http://localhost:3000`. You can scrub the timeline, see exactly how each section looks, and tweak components hot-reloaded. Quit with Ctrl+C.

## Render to MP4

```bash
npm run render
```

Renders to `out/pinterest-demo.mp4`. Takes 2–5 minutes on an Apple Silicon Mac (slower on Intel). Output is 1920×1080 H.264, ~25–40 MB.

If you want WebM (smaller file, some review forms prefer it):

```bash
npm run render:webm
```

## Adding voiceover (optional)

The rendered MP4 is silent. Three paths to add voice:

### A. macOS `say` command (fastest, robotic)

```bash
say -v Samantha -r 175 -o voiceover.aiff "$(cat ../voiceover.txt)"
```

Then drop `voiceover.aiff` into `public/voiceover.aiff` (create the `public/` folder), edit `src/Demo.tsx` to add an `<Audio src={staticFile('voiceover.aiff')} />`, and re-render.

### B. ElevenLabs / OpenAI TTS (better voice, requires API key)

Generate an MP3 with their API, save to `public/voiceover.mp3`, same `<Audio>` injection.

### C. Record yourself (best-sounding)

QuickTime Player → File → New Audio Recording → read the script aloud → export. Save to `public/voiceover.m4a`, inject as above.

Suggested voiceover script (~85 seconds at natural pace):

> "This is the automated posting tool for The Sauna Host, our business Pinterest account. The app posts curated wellness content from our brand library to our own boards on a 9 a.m. and 3 p.m. schedule.
>
> Step one — OAuth authentication. The script opens Pinterest's authorization page, the account owner sees the requested scopes and clicks Allow, and the local callback captures the auth code and exchanges it for tokens. The user does this once. Tokens auto-refresh from then on.
>
> Step two — curated content and posting. The pin queue holds 40 brand-owned pins across 20 days, two per day, with on-brand titles, descriptions, and links. The runner picks the next due row and calls the v-five pins endpoint. Each post returns a pin ID that's written back to the queue.
>
> Step three — analytics. A separate script pulls user-level and per-pin analytics into CSVs we review weekly to inform what content to feature next.
>
> We're requesting Standard access to enable production posting. The use case is automating our own brand content to our own Pinterest account on a sustainable schedule. Thank you for reviewing."

## Tweaking the video

Most edits live in two places:

- **Brand colors / typography** — `src/brand.ts`. Change once, propagates everywhere.
- **Section content** — each section is its own file under `src/sections/`. Edit text, code snippets, queue rows, etc. directly in the JSX.

Section durations are defined in `src/Demo.tsx` (`T.title`, `T.overview`, …). If you change one, the total updates automatically.

## File map

```
demo-video/
├── package.json
├── tsconfig.json
├── remotion.config.ts
├── README.md
└── src/
    ├── index.ts            # entry — registers Root with Remotion
    ├── Root.tsx            # composition definition
    ├── Demo.tsx            # assembles all 6 sections via Sequence
    ├── brand.ts            # colors, fonts, spacing constants
    ├── sections/
    │   ├── Title.tsx
    │   ├── Overview.tsx
    │   ├── OAuth.tsx
    │   ├── PinCreation.tsx
    │   ├── Analytics.tsx
    │   └── Closing.tsx
    └── components/
        ├── BrandPattern.tsx   # gold-dot column, off-page edges
        ├── CodeBlock.tsx      # styled code panel with traffic-light header
        └── Terminal.tsx       # animated typing-effect terminal
```

## Common issues

**`npm install` fails on Apple Silicon with native build errors.**
Make sure Xcode Command Line Tools are installed: `xcode-select --install`.

**Render produces a blank video.**
Check the Studio preview first (`npm start`) — if it looks right there, the headless render should match. If Studio is also blank, check the Demo.tsx imports.

**Render is slow (>10 min).**
Pass `--concurrency=4` (or higher) on the render command if your Mac has the cores. Watch CPU usage in Activity Monitor.

**File too big to upload to Pinterest.**
Re-render at 720p: edit `src/Root.tsx` `width={1280} height={720}`, re-run `npm run render`. Cuts file size ~60%.
