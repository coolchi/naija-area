# Demo ad catalogue seed

Loads the sample ad creatives (8 FICTIONAL brands x 5 ad surfaces, made in `/workspace/game_project/ad_creatives/`) onto a running game so billboards, shop signs, lagoon plots, the radio spot and the ride livery show real-looking ads. Test mode: **no payment is taken or recorded** (`payment_status = test_mode_no_payment`).

Script: `tools/seed-demo-ads.mjs` (logic: `seedDemoCatalog()` in `server/core/demo-ads.js`). Tests: `tests/demo-seed.test.js`.

## What it does (the real flow, not a shortcut into the tables)
1. One **demo advertiser per brand**: e-mail `<brand-id>@demo.naija-area.invalid` (a domain that cannot receive mail), brand name from `brands.json`.
2. Each image goes through `uploadCreative()`, the same size / type / dimension checks as the upload route.
3. `createCampaign()` with `placement` shared or exclusive: the same quote, aspect and design-count rules as the advertiser page, `testModeAck`, **`is_demo = 1`**.
4. The campaign runs the normal checks, then `decide('approve')` on the normal state machine as actor `admin` with the note **`demo seed approved by owner request`** (also written to `audit_log`). Scheduling, rotation, per-design moderation and impression counting then work exactly as for any campaign.

## Layout (edit the block marked THE LAYOUT in the script)
| Surface | Campaigns | Notes |
|---|---|---|
| Road billboard, Major | 1 **exclusive** (Jolly Pot, 4 designs rotating) + 4 shared (Yarn Mobile, PaddiPay, Kolo Save, Ile Ayo Homes) | the exclusive brand owns a whole board; the shared brands take turns on the other Major boards |
| Road billboard, Street | 3 shared (Zing Zobo, Adire Lane, Korope Rides) | |
| Shop sign | 8 shared (one per brand) | |
| Lagoon plot | 8 shared | |
| Radio spot | 8 shared | |
| Ride livery | 4 shared | the fleet has ONE livery board with 4 positions, so only 4 of the 8 livery images can run at once (the others stay in the folder) |

The exclusive board needs 4 designs of one brand, but the 40 files hold only one billboard per brand. The extra 3 designs are the same Jolly Pot billboard rendered in the other three layouts by `ad_creatives/tools/render.mjs` (`creatives_extra/jolly-pot/`). Without that folder the exclusive board still works with 1 design (the script prints a note).

## Run it
Inputs: a folder with `brands.json`, `creatives/manifest.json`, `creatives/<brand>/*.png` and optionally `creatives_extra/<brand>/*billboard*.png`.

```
node tools/seed-demo-ads.mjs --dir /path/to/ad_creatives --dry-run     # shows what it would do, changes nothing
node tools/seed-demo-ads.mjs --dir /path/to/ad_creatives               # does it   (options: --days 30, --exclusive jolly-pot, --json)
```
It uses the database the server uses (`NA_DATABASE_URL` or `NA_DB`). With Postgres the live server holds the single-writer lock, so the script opens the database as a short second client (it sets `NA_DB_SINGLE_INSTANCE=0` for its own process only). It only writes advertising tables and the audit log.

On the staging VPS the app container is read-only, so the seed runs in a one-off container of the same image, with the creatives mounted:
```
docker run --rm --network naija-net --env-file .env -v naija-data:/data -v /home/forge/naija-area/demo-ad-seed:/seed:ro naija-area:test node tools/seed-demo-ads.mjs --dir /seed
```

## Safe to re-run
- A demo campaign already in the pipeline (submitted ... live) for the same brand, surface and tier is **skipped**: re-running creates nothing and duplicates nothing.
- A demo campaign that has **ended** (completed or rejected) is renewed by the next run (a new 30-day campaign), so the demo can be kept alive with one command.
- An image an advertiser already uploaded (same bytes) is reused.
- It never edits or deletes a campaign it did not create. Real advertisers use real e-mail addresses and `is_demo = 0`; the admin queue shows the `demo` flag.

## Remove the demo ads
Take each down from the admin screen (decision `takedown`), or: `decide(app, id, 'takedown', 'admin', 'demo removed')` for every campaign with `is_demo = 1`. A takedown ends the campaign and frees its board.

## Limits
Campaigns last 30 days from the run, then the boards go back to house ads until the script runs again. The creatives are samples with invented brands: no real company is depicted.
