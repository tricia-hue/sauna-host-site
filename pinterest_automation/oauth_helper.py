"""
One-time OAuth helper for Pinterest.

Run this script ONCE after putting your APP_ID and APP_SECRET in .env:

    python oauth_helper.py

It will:
1. Open your browser to Pinterest's authorization page
2. After you click Allow, Pinterest redirects to http://localhost:8085/?code=...
3. A tiny local web server captures that code
4. Exchanges the code for a refresh_token + access_token
5. Saves both tokens to .env so pinterest_client.py can use them

After this, you never need to log in again — the client auto-refreshes.
"""

from __future__ import annotations

import os
import sys
import base64
import secrets
import threading
import urllib.parse
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

import requests
from dotenv import load_dotenv, set_key

ENV_PATH = Path(__file__).parent / ".env"
AUTHORIZE_URL = "https://www.pinterest.com/oauth/"
TOKEN_URL = "https://api.pinterest.com/v5/oauth/token"

# Scopes we need:
#   pins:read + pins:write   - reading and creating pins
#   boards:read              - finding boards
#   boards:write             - REQUIRED for create_pin (Pinterest treats
#                              creating-a-pin-on-a-board as a board write)
#   user_accounts:read       - analytics
SCOPES = [
    "pins:read",
    "pins:write",
    "boards:read",
    "boards:write",
    "user_accounts:read",
]


_received_code: dict = {}


class _OAuthCallbackHandler(BaseHTTPRequestHandler):
    """Captures the ?code=... query string from Pinterest's redirect."""

    def do_GET(self):  # noqa: N802
        parsed = urllib.parse.urlparse(self.path)
        params = urllib.parse.parse_qs(parsed.query)
        if "code" in params:
            _received_code["code"] = params["code"][0]
            _received_code["state"] = params.get("state", [None])[0]
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(
                b"<html><body style='font-family:sans-serif;padding:40px'>"
                b"<h2>Authorized!</h2>"
                b"<p>You can close this tab and return to your terminal.</p>"
                b"</body></html>"
            )
        else:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Missing ?code=")

    def log_message(self, *_):  # silence default access log
        return


def main():
    load_dotenv(ENV_PATH)
    app_id = os.getenv("PINTEREST_APP_ID")
    app_secret = os.getenv("PINTEREST_APP_SECRET")
    redirect_uri = os.getenv("PINTEREST_REDIRECT_URI", "http://localhost:8085/")

    if not (app_id and app_secret):
        print("ERROR: PINTEREST_APP_ID and PINTEREST_APP_SECRET must be set in .env")
        sys.exit(1)

    # Start the local callback server in a background thread
    server = HTTPServer(("localhost", 8085), _OAuthCallbackHandler)
    threading.Thread(target=server.serve_forever, daemon=True).start()

    # Build the authorization URL
    state = secrets.token_urlsafe(16)
    auth_url = AUTHORIZE_URL + "?" + urllib.parse.urlencode({
        "client_id": app_id,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": ",".join(SCOPES),
        "state": state,
    })

    print("Opening browser for Pinterest authorization...")
    print(f"  {auth_url}\n")
    webbrowser.open(auth_url)

    # Wait for the callback handler to populate _received_code
    print("Waiting for redirect (after you click Allow in the browser)...")
    while "code" not in _received_code:
        pass
    server.shutdown()

    if _received_code.get("state") != state:
        print("ERROR: state mismatch — possible CSRF. Aborting.")
        sys.exit(1)

    code = _received_code["code"]
    print("Got authorization code — exchanging for tokens...")

    # Exchange code for tokens
    basic = base64.b64encode(f"{app_id}:{app_secret}".encode()).decode()
    resp = requests.post(
        TOKEN_URL,
        headers={
            "Authorization": f"Basic {basic}",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": redirect_uri,
        },
        timeout=30,
    )
    if resp.status_code != 200:
        print(f"ERROR: token exchange failed: {resp.status_code}")
        print(resp.text)
        sys.exit(1)

    data = resp.json()
    set_key(str(ENV_PATH), "PINTEREST_ACCESS_TOKEN", data["access_token"])
    if "refresh_token" in data:
        set_key(str(ENV_PATH), "PINTEREST_REFRESH_TOKEN", data["refresh_token"])
        print("Saved access_token + refresh_token to .env")
    else:
        print("Saved access_token to .env (no refresh_token returned)")

    print("\nDone. You can now use pinterest_client.PinterestClient() in your scripts.")


if __name__ == "__main__":
    main()
