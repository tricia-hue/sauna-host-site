"""
Pinterest API review demo helper.

Use this while recording the Standard Access resubmission video. It makes a
small set of authenticated Pinterest API calls and prints reviewer-friendly
output without exposing access tokens, refresh tokens, or app secrets.

Recommended recording flow:
    python oauth_helper.py
    python api_review_demo.py --read-only
    python post_next.py --dry-run

If Pinterest specifically requires seeing pin creation from the API on camera
and the account/app is allowed to create pins in the target environment:
    python api_review_demo.py --create-test-pin --board-id <board_id>
"""

from __future__ import annotations

import argparse
import datetime
import os
from pathlib import Path

from dotenv import load_dotenv

from pinterest_client import API_BASE, PinterestAPIError, PinterestClient

HERE = Path(__file__).parent
ENV_PATH = HERE / ".env"

DEMO_IMAGE_URL = "https://thesaunahost.com/images/pinterest/pin-01.jpg"
DEMO_LINK = "https://thesaunahost.com/?utm_source=pinterest&utm_medium=api_review"


def mask(value: str | None, keep: int = 4) -> str:
    if not value:
        return "(not set)"
    if len(value) <= keep * 2:
        return "*" * len(value)
    return f"{value[:keep]}...{value[-keep:]}"


def print_env_summary() -> None:
    load_dotenv(ENV_PATH)
    print("Pinterest API demo configuration")
    print(f"- API base: {API_BASE}")
    print(f"- App ID: {os.getenv('PINTEREST_APP_ID', '(not set)')}")
    print(f"- Redirect URI: {os.getenv('PINTEREST_REDIRECT_URI', '(not set)')}")
    print(f"- Access token: {mask(os.getenv('PINTEREST_ACCESS_TOKEN'))}")
    print(f"- Refresh token: {mask(os.getenv('PINTEREST_REFRESH_TOKEN'))}")
    print()


def show_account_and_boards(client: PinterestClient) -> list[dict]:
    print("GET /user_account")
    account = client.get_user_account()
    username = account.get("username") or account.get("business_name") or "(unknown)"
    account_type = account.get("account_type") or "(unknown)"
    print(f"- Authenticated account: {username}")
    print(f"- Account type: {account_type}")
    print()

    print("GET /boards")
    boards = client.list_boards()
    print(f"- Boards returned: {len(boards)}")
    for board in boards[:12]:
        print(f"  - {board.get('name')} ({board.get('id')})")
    if len(boards) > 12:
        print(f"  - ...and {len(boards) - 12} more")
    print()
    return boards


def create_test_pin(client: PinterestClient, board_id: str) -> None:
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    title = f"API review test pin - {timestamp}"
    description = (
        "Test pin created during Pinterest Standard Access review. "
        "This uses The Sauna Host's own brand asset and links to our owned site."
    )
    print("POST /pins")
    print(f"- Board ID: {board_id}")
    print(f"- Image URL: {DEMO_IMAGE_URL}")
    print(f"- Link: {DEMO_LINK}")
    pin = client.create_pin(
        board_id=board_id,
        title=title,
        description=description,
        image_url=DEMO_IMAGE_URL,
        link=DEMO_LINK,
        alt_text="The Sauna Host branded course graphic used for API review.",
    )
    print(f"- Created pin ID: {pin.get('id')}")
    print()


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Run a reviewer-friendly Pinterest API demo."
    )
    parser.add_argument(
        "--read-only",
        action="store_true",
        help="Only show authenticated read calls. This is safest before Standard access.",
    )
    parser.add_argument(
        "--create-test-pin",
        action="store_true",
        help="Create one test pin. Use only while recording if Pinterest requires it.",
    )
    parser.add_argument(
        "--board-id",
        help="Board ID for --create-test-pin. Defaults to the first returned board.",
    )
    args = parser.parse_args()

    if args.read_only and args.create_test_pin:
        parser.error("Choose either --read-only or --create-test-pin, not both.")

    print_env_summary()
    client = PinterestClient()

    try:
        boards = show_account_and_boards(client)
        if args.create_test_pin:
            board_id = args.board_id or (boards[0]["id"] if boards else None)
            if not board_id:
                raise RuntimeError("No board ID available for test pin creation.")
            create_test_pin(client, board_id)
        else:
            print("Read-only demo complete.")
            print("Next recording step: run `python post_next.py --dry-run`.")
        return 0
    except PinterestAPIError as exc:
        print("Pinterest API call failed.")
        print(exc)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
