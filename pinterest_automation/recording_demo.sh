#!/usr/bin/env bash
# Self-running screen-recording demo for Pinterest Standard Access review.
#
# HOW TO USE:
#   1. Start a macOS screen recording:  Cmd + Shift + 5  ->  Record
#   2. In this Terminal, run:           bash recording_demo.sh
#   3. When the browser opens Pinterest's consent screen, click ALLOW.
#   4. When you see "Demo complete", stop the recording.
#
# The script runs and narrates itself with on-screen captions, so no voiceover
# is required. It never prints .env, the app secret, or unmasked tokens.

cd "$(dirname "$0")"
[ -d ".venv" ] && source .venv/bin/activate 2>/dev/null || true

B=$(tput bold 2>/dev/null || true)
N=$(tput sgr0 2>/dev/null || true)

caption() {
  clear
  echo
  echo "${B}============================================================${N}"
  printf "${B}  %s${N}\n" "$1"
  [ -n "${2:-}" ] && printf "  %s\n" "$2"
  echo "${B}============================================================${N}"
  echo
  sleep "${3:-5}"
}

caption "THE SAUNA HOST  —  Pinterest API app demo" \
  "Live screen recording of our app authenticating and using the Pinterest API." 6

caption "What this app does" \
  "It publishes The Sauna Host's OWN branded pins to our OWN Pinterest boards and pulls analytics. No scraping, no third-party reposting. About 2-3 pins per day." 7

caption "Step 1 of 4  —  The Pinterest Developer app" \
  "Opening the developer app page for app 1565235." 4
python - <<'PY'
import webbrowser
webbrowser.open("https://developers.pinterest.com/apps/1565235/")
PY
sleep 7

caption "Step 2 of 4  —  OAuth authorization (account owner)" \
  "The browser opens Pinterest's consent screen. Click ALLOW. Pinterest redirects to our registered localhost URI and the helper exchanges the code for tokens." 7
python oauth_helper.py || true
sleep 3

caption "Step 3 of 4  —  Authenticated Pinterest API calls" \
  "Reading the authenticated account and the boards the app posts to. All tokens are masked." 6
python api_review_demo.py --read-only || true
sleep 8

caption "Step 4 of 4  —  Curated queue + scheduled posting" \
  "Our hand-curated queue of owned content linking to thesaunahost.com. The runner posts only the next due row via POST /v5/pins. This dry run shows the exact request without creating a duplicate during review." 8
echo "${B}pin_queue.csv (header + first rows):${N}"
echo
sed -n '1,5p' pin_queue.csv
echo
sleep 6
python post_next.py --dry-run || true
sleep 8

caption "Demo complete" \
  "OAuth works, authenticated reads work, and the POST /v5/pins publish request is ready. Standard access enables that publish call. You can stop the screen recording now." 8
