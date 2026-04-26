"""
Post one or many pins to Pinterest.

Two ways to use this:

1) Single pin from the command line:
       python post_pin.py \
           --board-id 123456789 \
           --title "Sauna circle" \
           --description "How to host a women's sauna gathering" \
           --image-url https://thesaunahost.com/images/sauna-meditation-group.jpg \
           --link https://thesaunahost.com/lesson-1

2) Batch from a CSV (recommended for scheduled posting):
       python post_pin.py --csv pins_to_post.csv

   CSV columns:
       board_id, title, description, image_url, link, alt_text

The script will skip rows where image_url is missing and print a summary.
"""

from __future__ import annotations

import argparse
import csv
import sys
from pathlib import Path

from pinterest_client import PinterestClient, PinterestAPIError


def post_one(client: PinterestClient, row: dict) -> dict | None:
    if not row.get("image_url"):
        print(f"  SKIP — missing image_url: {row}")
        return None
    try:
        pin = client.create_pin(
            board_id=row["board_id"],
            title=row["title"],
            description=row.get("description", ""),
            image_url=row["image_url"],
            link=row.get("link") or None,
            alt_text=row.get("alt_text") or None,
        )
        print(f"  OK -> pin {pin.get('id')} ({row['title'][:50]})")
        return pin
    except PinterestAPIError as e:
        print(f"  FAIL — {e}")
        return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", help="CSV file of pins to post in batch")
    ap.add_argument("--board-id")
    ap.add_argument("--title")
    ap.add_argument("--description", default="")
    ap.add_argument("--image-url")
    ap.add_argument("--link")
    ap.add_argument("--alt-text")
    args = ap.parse_args()

    client = PinterestClient()  # uses .env

    if args.csv:
        path = Path(args.csv)
        if not path.exists():
            print(f"CSV not found: {path}")
            sys.exit(1)
        with path.open() as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        print(f"Posting {len(rows)} pin(s) from {path.name}...")
        ok = 0
        for row in rows:
            if post_one(client, row):
                ok += 1
        print(f"\nDone: {ok}/{len(rows)} succeeded.")
    else:
        if not (args.board_id and args.title and args.image_url):
            ap.error("--board-id, --title, --image-url are required when not using --csv")
        post_one(client, {
            "board_id": args.board_id,
            "title": args.title,
            "description": args.description,
            "image_url": args.image_url,
            "link": args.link,
            "alt_text": args.alt_text,
        })


if __name__ == "__main__":
    main()
