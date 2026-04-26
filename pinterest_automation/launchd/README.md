# launchd setup — daily Pinterest posting

## What this does

Schedules `post_next.py` to fire **at 9:00 AM and 3:00 PM** every day. Each fire posts one due pin from `pin_queue.csv`.

The runner is time-aware: the 9:00 AM fire only posts the AM pin (scheduled for 09:00), and the 3:00 PM fire only posts the PM pin (scheduled for 15:00). They can't double-fire the same row.

## One-time install

Symlink the plist into `~/Library/LaunchAgents/` so launchd picks it up:

```bash
ln -sf "/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation/launchd/com.thesaunahost.pinterest-post.plist" \
  ~/Library/LaunchAgents/com.thesaunahost.pinterest-post.plist
```

A symlink (not a copy) means you can edit the plist in the repo and re-load — your changes take effect without re-copying.

Load it:

```bash
launchctl load ~/Library/LaunchAgents/com.thesaunahost.pinterest-post.plist
launchctl list | grep thesaunahost     # should show the job, last run column will be "-" until first fire
```

## Smoke test (run now, don't wait for 9am)

```bash
launchctl start com.thesaunahost.pinterest-post
```

This forces an immediate fire. Check what it did:

```bash
tail -20 "/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation/post_log.txt"
tail -20 "/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation/launchd.out.log"
```

Today (Apr 26, 2026) the queue starts Apr 27, so a smoke-test fire today will log `INFO no pins due` — **that's correct, not a bug**. To smoke test against an actual post, either:

1. Wait until Apr 27 at 9am for the first scheduled run, OR
2. Edit one row in `pin_queue.csv` to set `scheduled_date` to today and `scheduled_time` to `00:00`, then `launchctl start` it. (Restore the date afterward.)

## Reload after editing the plist

```bash
launchctl unload ~/Library/LaunchAgents/com.thesaunahost.pinterest-post.plist
launchctl load ~/Library/LaunchAgents/com.thesaunahost.pinterest-post.plist
```

## Pause / disable

```bash
launchctl unload ~/Library/LaunchAgents/com.thesaunahost.pinterest-post.plist
```

To re-enable later, run the `load` command again.

## Permanent removal

```bash
launchctl unload ~/Library/LaunchAgents/com.thesaunahost.pinterest-post.plist
rm ~/Library/LaunchAgents/com.thesaunahost.pinterest-post.plist
```

## Troubleshooting

**Nothing happens at 9am or 3pm.**
- Was the Mac asleep? launchd doesn't fire while asleep and won't catch up by default. If reliability matters, move to a small VPS or GitHub Actions cron.
- Check `launchd.err.log` in the project folder.
- Check `launchctl list | grep thesaunahost` — second column is the last exit code (0 = success).

**Job runs but nothing posts.**
- Look at `post_log.txt` — runner logs every decision (no pins due, posted, failed).
- `INFO no pins due` is normal if no row is yet at its scheduled date+time.
- `FAIL ... 401` means the access token died — `pinterest_client.py` should auto-refresh, but if the refresh token is also dead, re-run `oauth_helper.py`.

**Permission errors reading `.env`.**
- Grant Terminal (or your shell) Full Disk Access in System Settings → Privacy & Security → Full Disk Access. launchd inherits permissions from the loading user.

**Sanity check the queue any time:**
```bash
cd "/Users/Patricia1/Documents/Revivery AI Operations (Tricia)/RIT/Sampling Course Bundle/sauna-host-site/pinterest_automation"
source .venv/bin/activate
python post_next.py --dry-run        # what's due right now (if anything)
python -c "import csv; rows=list(csv.DictReader(open('pin_queue.csv'))); print(f'{len(rows)} total, {sum(1 for r in rows if not r[\"posted_at\"])} unposted')"
```

## Why a symlink, not a copy?

`~/Library/LaunchAgents/` is where launchd looks. The repo is the source of truth. A symlink keeps both happy: the repo can be edited, committed, and pulled on another machine, and one re-`load` picks up changes — no manual file copies to drift out of sync.
