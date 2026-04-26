# Pinterest Automation — The Sauna Host

Automate publishing pins and pulling analytics for The Sauna Host Pinterest account.

## Setup

```bash
cd pinterest_automation
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# then fill in the values in .env
```

## Files

- `oauth_helper.py` — one-time browser-based OAuth flow → saves refresh + access tokens to .env
- `pinterest_client.py` — thin wrapper around api.pinterest.com/v5/* with auto token refresh
- `post_pin.py` — example: post a pin to a board
- `pull_analytics.py` — example: pull pin/board analytics → analytics_YYYY-MM-DD.csv

## Workflow

1. While trial pending: use `PINTEREST_TRIAL_TOKEN` (set in .env) for analytics work
2. When trial approved: copy `PINTEREST_APP_SECRET` from developer portal into .env
3. Run `python oauth_helper.py` once → opens browser → grants permission → tokens saved
4. From then on, `pinterest_client.py` auto-refreshes the access token as needed
