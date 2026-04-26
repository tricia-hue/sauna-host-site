"""
Thin wrapper around the Pinterest v5 API.

Handles:
- Loading credentials from .env
- Auto-refreshing the access token when it expires
- Returning parsed JSON from each endpoint

Usage:
    from pinterest_client import PinterestClient
    pc = PinterestClient()
    boards = pc.list_boards()
    pin = pc.create_pin(board_id="...", title="...", description="...", image_url="...")
    analytics = pc.get_pin_analytics(pin_id="...", start_date="2026-04-01", end_date="2026-04-26")
"""

from __future__ import annotations

import os
import base64
from pathlib import Path
from typing import Any, Optional

import requests
from dotenv import load_dotenv, set_key

API_BASE = "https://api.pinterest.com/v5"
TOKEN_URL = "https://api.pinterest.com/v5/oauth/token"
ENV_PATH = Path(__file__).parent / ".env"


class PinterestAPIError(Exception):
    """Raised when the Pinterest API returns a non-2xx response."""


class PinterestClient:
    def __init__(self, env_path: Path = ENV_PATH, prefer_trial_token: bool = False):
        load_dotenv(env_path)
        self.env_path = env_path
        self.app_id = os.getenv("PINTEREST_APP_ID")
        self.app_secret = os.getenv("PINTEREST_APP_SECRET")
        self.refresh_token = os.getenv("PINTEREST_REFRESH_TOKEN")
        self.trial_token = os.getenv("PINTEREST_TRIAL_TOKEN")
        self.access_token = os.getenv("PINTEREST_ACCESS_TOKEN")

        # Use trial token explicitly for read-only work before full OAuth.
        if prefer_trial_token and self.trial_token:
            self.access_token = self.trial_token

        if not self.access_token:
            raise RuntimeError(
                "No access token available. Either set PINTEREST_TRIAL_TOKEN "
                "(for read-only work) or run oauth_helper.py to do the full "
                "OAuth flow."
            )

    # --- token management -------------------------------------------------
    def _refresh_access_token(self) -> None:
        if not (self.app_id and self.app_secret and self.refresh_token):
            raise RuntimeError(
                "Cannot refresh — need PINTEREST_APP_ID, PINTEREST_APP_SECRET, "
                "and PINTEREST_REFRESH_TOKEN in .env (run oauth_helper.py first)."
            )
        basic = base64.b64encode(
            f"{self.app_id}:{self.app_secret}".encode()
        ).decode()
        resp = requests.post(
            TOKEN_URL,
            headers={
                "Authorization": f"Basic {basic}",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data={
                "grant_type": "refresh_token",
                "refresh_token": self.refresh_token,
            },
            timeout=30,
        )
        if resp.status_code != 200:
            raise PinterestAPIError(
                f"Token refresh failed: {resp.status_code} {resp.text}"
            )
        data = resp.json()
        self.access_token = data["access_token"]
        set_key(str(self.env_path), "PINTEREST_ACCESS_TOKEN", self.access_token)
        if "refresh_token" in data:
            self.refresh_token = data["refresh_token"]
            set_key(str(self.env_path), "PINTEREST_REFRESH_TOKEN", self.refresh_token)

    # --- core HTTP helper -------------------------------------------------
    def _request(
        self,
        method: str,
        path: str,
        params: Optional[dict] = None,
        json_body: Optional[dict] = None,
        _retry: bool = True,
    ) -> Any:
        url = f"{API_BASE}{path}"
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json",
        }
        resp = requests.request(
            method, url, headers=headers, params=params, json=json_body, timeout=30
        )
        if resp.status_code == 401 and _retry and self.refresh_token:
            self._refresh_access_token()
            return self._request(method, path, params, json_body, _retry=False)
        if not (200 <= resp.status_code < 300):
            raise PinterestAPIError(
                f"{method} {path} -> {resp.status_code}: {resp.text}"
            )
        if resp.status_code == 204 or not resp.content:
            return None
        return resp.json()

    # --- convenience methods ----------------------------------------------
    def get_user_account(self) -> dict:
        return self._request("GET", "/user_account")

    def list_boards(self, page_size: int = 25) -> list[dict]:
        boards = []
        bookmark = None
        while True:
            params = {"page_size": page_size}
            if bookmark:
                params["bookmark"] = bookmark
            data = self._request("GET", "/boards", params=params)
            boards.extend(data.get("items", []))
            bookmark = data.get("bookmark")
            if not bookmark:
                break
        return boards

    def create_pin(
        self,
        board_id: str,
        title: str,
        description: str,
        image_url: str,
        link: Optional[str] = None,
        alt_text: Optional[str] = None,
    ) -> dict:
        body = {
            "board_id": board_id,
            "title": title,
            "description": description,
            "media_source": {"source_type": "image_url", "url": image_url},
        }
        if link:
            body["link"] = link
        if alt_text:
            body["alt_text"] = alt_text
        return self._request("POST", "/pins", json_body=body)

    def get_user_analytics(
        self, start_date: str, end_date: str, metric_types: list[str] = None
    ) -> dict:
        if metric_types is None:
            metric_types = ["IMPRESSION", "PIN_CLICK", "OUTBOUND_CLICK", "SAVE"]
        return self._request(
            "GET",
            "/user_account/analytics",
            params={
                "start_date": start_date,
                "end_date": end_date,
                "metric_types": ",".join(metric_types),
            },
        )

    def get_pin_analytics(
        self, pin_id: str, start_date: str, end_date: str, metric_types: list[str] = None
    ) -> dict:
        if metric_types is None:
            metric_types = ["IMPRESSION", "PIN_CLICK", "OUTBOUND_CLICK", "SAVE"]
        return self._request(
            "GET",
            f"/pins/{pin_id}/analytics",
            params={
                "start_date": start_date,
                "end_date": end_date,
                "metric_types": ",".join(metric_types),
            },
        )
