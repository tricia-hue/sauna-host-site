#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if [ -d ".venv" ]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

clear
echo "Pinterest Standard Access resubmission demo"
echo "============================================"
echo
echo "This visible Terminal window is what Pinterest should see."
echo "Do not show .env or any secret values."
echo
echo "Step 1: Open the Pinterest Developer app page."
echo "When Chrome opens, keep recording for 5 seconds, then come back to this Terminal."
read -r -p "Press Enter to open the app page..."
python - <<'PY'
import webbrowser
webbrowser.open("https://developers.pinterest.com/apps/1565235/")
PY

echo
read -r -p "After the app page is visible in the recording, press Enter to start OAuth..."
echo
echo "Step 2: OAuth authentication flow"
echo "A Pinterest authorization page will open."
echo "Click Allow in Chrome, then return to this Terminal."
python oauth_helper.py

echo
echo "Step 3: Authenticated Pinterest API calls"
python api_review_demo.py --read-only

echo
echo "Step 4: Scheduled posting workflow dry run"
python post_next.py --dry-run

echo
echo "DEMO COMPLETE"
echo "Stop the screen recording now."
