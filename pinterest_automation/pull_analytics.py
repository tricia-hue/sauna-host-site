"""
Pull Pinterest analytics into a CSV for The Sauna Host reporting.

Usage:
    python pull_analytics.py                          # last 30 days
    python pull_analytics.py --start 2026-04-01 --end 2026-04-26
    python pull_analytics.py --trial                  # use trial token

Outputs:
    analytics_user_<end_date>.csv     — daily account-level metrics
    analytics_pins_<end_date>.csv     — per-pin metrics for the window
"""

from __future__ import annotations

import argparse
import csv
import json
from datetime import date, timedelta
from pathlib import Path

from pinterest_client import PinterestClient, PinterestAPIError

METRICS = ["IMPRESSION", "PIN_CLICK", "OUTBOUND_CLICK", "SAVE"]


def daterange(days: int = 30) -> tuple[str, str]:
    end = date.today()
    start = end - timedelta(days=days)
    return start.isoformat(), end.isoformat()


def write_user_analytics(client: PinterestClient, start: str, end: str, out_dir: Path):
    print(f"Pulling user-level analytics for {start} -> {end}...")
    data = client.get_user_analytics(start, end, METRICS)

    # Pinterest response shape:
    # { "all": { "summary_metrics": {...},
    #           "daily_metrics": [{"date": "YYYY-MM-DD",
    #                              "metrics": {"IMPRESSION": n, ...}}, ...] },
    #   "your_pins": {...}, "other_pins": {...} }
    # We use the "all" channel for the headline numbers.
    channel = data.get("all") or next(iter(data.values()), {})
    daily = channel.get("daily_metrics", []) if isinstance(channel, dict) else []

    out = out_dir / f"analytics_user_{end}.csv"
    fieldnames = ["date"] + METRICS
    with out.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for day in sorted(daily, key=lambda d: d.get("date", "")):
            row = {"date": day.get("date", "")}
            metrics = day.get("metrics", {}) or {}
            for m in METRICS:
                row[m] = metrics.get(m)
            writer.writerow(row)
    print(f"  -> {out} ({len(daily)} days)")


def write_pin_analytics(client: PinterestClient, start: str, end: str, out_dir: Path):
    print("Fetching boards...")
    try:
        boards = client.list_boards()
    except PinterestAPIError as e:
        print(f"  Could not list boards: {e}")
        return

    print(f"  Found {len(boards)} board(s). Listing pins per board...")
    pin_records = []
    for board in boards:
        bid = board["id"]
        bname = board.get("name", "")
        try:
            data = client._request("GET", f"/boards/{bid}/pins", params={"page_size": 100})
        except PinterestAPIError as e:
            print(f"    Skipping board {bname}: {e}")
            continue
        for pin in data.get("items", []):
            pin_records.append({
                "pin_id": pin["id"],
                "board_id": bid,
                "board_name": bname,
                "title": pin.get("title", ""),
                "created_at": pin.get("created_at", ""),
            })

    print(f"  Pulling analytics for {len(pin_records)} pin(s)...")
    out = out_dir / f"analytics_pins_{end}.csv"
    fieldnames = ["pin_id", "board_id", "board_name", "title", "created_at"] + METRICS
    with out.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for rec in pin_records:
            try:
                a = client.get_pin_analytics(rec["pin_id"], start, end, METRICS)
                # Per-pin response: same nested shape, sum the daily metrics.
                channel = a.get("all") or next(iter(a.values()), {}) if isinstance(a, dict) else {}
                summary = channel.get("summary_metrics", {}) if isinstance(channel, dict) else {}
                daily = channel.get("daily_metrics", []) if isinstance(channel, dict) else []
                for m in METRICS:
                    if m in summary:
                        rec[m] = summary[m]
                    else:
                        rec[m] = sum(
                            (d.get("metrics", {}) or {}).get(m) or 0 for d in daily
                        )
            except PinterestAPIError as e:
                print(f"    skip pin {rec['pin_id']}: {e}")
            writer.writerow(rec)
    print(f"  -> {out}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--start", help="YYYY-MM-DD (default: 30 days ago)")
    ap.add_argument("--end", help="YYYY-MM-DD (default: today)")
    ap.add_argument("--trial", action="store_true",
                    help="Use the trial token (read-only) instead of OAuth tokens")
    ap.add_argument("--out", default=".", help="Output directory")
    ap.add_argument("--debug", action="store_true",
                    help="Print the raw API response shape for inspection")
    args = ap.parse_args()

    if args.start and args.end:
        start, end = args.start, args.end
    else:
        start, end = daterange(30)

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    client = PinterestClient(prefer_trial_token=args.trial)

    if args.debug:
        raw = client.get_user_analytics(start, end, METRICS)
        print("--- RAW USER ANALYTICS RESPONSE ---")
        print(json.dumps(raw, indent=2)[:2000])
        print("--- END RAW ---\n")

    write_user_analytics(client, start, end, out_dir)
    write_pin_analytics(client, start, end, out_dir)
    print("\nDone.")


if __name__ == "__main__":
    main()
