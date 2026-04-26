"""
Queue runner for pin_queue.csv.

Picks the next due pin(s), posts them, and writes posted_at + pin_id back.
Designed to be called twice a day by launchd (9am + 3pm ET) — but safe to
run manually any time.

Usage:
    python post_next.py                    # post 1 due pin
    python post_next.py --limit 2          # catch up by posting next 2
    python post_next.py --dry-run          # show what WOULD post, don't post

A row is "due" when:
    posted_at is empty AND scheduled_date+scheduled_time <= now

This means a 15:00 pin is NOT due at the 09:00 launchd fire — only at 15:00 or
later, which prevents the morning fire from accidentally posting both pins
of the day.
"""

from __future__ import annotations

import argparse
import csv
import datetime
import os
import sys
import tempfile
from pathlib import Path

from pinterest_client import PinterestClient, PinterestAPIError

HERE = Path(__file__).parent
QUEUE = HERE / "pin_queue.csv"
LOG = HERE / "post_log.txt"


def log(msg: str) -> None:
    ts = datetime.datetime.now().isoformat(timespec="seconds")
    line = f"{ts} {msg}\n"
    with LOG.open("a") as f:
        f.write(line)
    print(line, end="")


def is_due(row: dict, now: datetime.datetime) -> bool:
    if row.get("posted_at"):
        return False
    sched_date = row.get("scheduled_date", "")
    sched_time = row.get("scheduled_time", "00:00")
    if not sched_date:
        return False
    try:
        sched_dt = datetime.datetime.strptime(
            f"{sched_date} {sched_time}", "%Y-%m-%d %H:%M"
        )
    except ValueError:
        return False
    return sched_dt <= now


def write_csv_atomic(rows: list[dict], fieldnames: list[str], path: Path) -> None:
    """Write via tmp file + os.replace so a crash mid-write can't corrupt the queue."""
    fd, tmp = tempfile.mkstemp(prefix=".pin_queue.", suffix=".csv", dir=path.parent)
    os.close(fd)
    try:
        with open(tmp, "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=fieldnames)
            w.writeheader()
            w.writerows(rows)
        os.replace(tmp, path)
    except Exception:
        if os.path.exists(tmp):
            os.unlink(tmp)
        raise


def main(limit: int, dry_run: bool) -> int:
    if not QUEUE.exists():
        log(f"FAIL queue not found: {QUEUE}")
        return 1

    with QUEUE.open() as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        fieldnames = list(reader.fieldnames or [])

    if not rows:
        log("INFO queue is empty")
        return 0

    now = datetime.datetime.now()
    due = [r for r in rows if is_due(r, now)]
    due.sort(key=lambda r: (r["scheduled_date"], r["scheduled_time"]))

    if not due:
        log(f"INFO no pins due (now={now.isoformat(timespec='seconds')})")
        return 0

    log(f"INFO {len(due)} due, posting up to {limit}")

    if dry_run:
        for r in due[:limit]:
            log(
                f"DRY  {r['scheduled_date']} {r['scheduled_time']} "
                f"board={r['board_id']} title={r['title'][:60]}"
            )
        return 0

    client = PinterestClient()
    posted = 0
    for r in due[:limit]:
        try:
            pin = client.create_pin(
                board_id=r["board_id"],
                title=r["title"],
                description=r.get("description", ""),
                image_url=r["image_url"],
                link=r.get("link") or None,
                alt_text=r.get("alt_text") or None,
            )
            r["posted_at"] = datetime.datetime.now().isoformat(timespec="seconds")
            r["pin_id"] = pin["id"]
            log(
                f"OK   pin={pin['id']} board={r['board_id']} "
                f"title={r['title'][:60]}"
            )
            posted += 1
        except PinterestAPIError as e:
            log(
                f"FAIL {r['scheduled_date']} {r['scheduled_time']} "
                f"title={r['title'][:60]} :: {e}"
            )
            # leave posted_at empty — next run will retry

    if posted > 0:
        write_csv_atomic(rows, fieldnames, QUEUE)
        log(f"INFO posted {posted}, queue updated")
    else:
        log("INFO posted 0 (all attempts failed)")

    return 0 if posted > 0 else 1


def parse_args() -> argparse.Namespace:
    ap = argparse.ArgumentParser(
        description="Post the next due pin(s) from pin_queue.csv"
    )
    ap.add_argument("--limit", type=int, default=1, help="max pins to post (default 1)")
    ap.add_argument("--dry-run", action="store_true", help="preview without posting")
    # back-compat: accept positional N as in HANDOFF examples
    ap.add_argument("n", nargs="?", type=int, help="alias for --limit")
    args = ap.parse_args()
    if args.n is not None:
        args.limit = args.n
    return args


if __name__ == "__main__":
    args = parse_args()
    sys.exit(main(limit=args.limit, dry_run=args.dry_run))
