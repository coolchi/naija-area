# Ad placement: exclusive vs shared (11 Oct 2026)

Built from `../21_ad_exclusive_vs_shared_plan.md`, approved by Sherif. **All prices and limits are ESTIMATES in `server/config/ratecard.js` and can be changed there. Test mode: nothing is charged.**

## What an advertiser can buy
| | Shared rotating (default) | Exclusive |
|---|---|---|
| Positions on the board | 1 of `positionsPerBoard` (4) | all 4: the ad is alone on the board |
| Share of screen time | about 25% (before empty positions are filled by others) | 100% |
| Price | today's weekly rate for the tier (unchanged) | shared rate x `exclusiveMultiplier` (3, ESTIMATE; per surface) |
| Designs that rotate | up to `maxCreativesShared` (2) | up to `maxCreativesExclusive` (4) |
| Example, major road board, 1 board, 7 days | net ₦80,000 (+7.5% VAT = ₦86,000) | net ₦240,000 (+VAT = ₦258,000) |

All tiers of all surfaces can be bought either way. Config: `RATE_CARD.surfaces.<surface>.exclusiveMultiplier`, `RATE_CARD.maxCreativesShared`, `RATE_CARD.maxCreativesExclusive` (a surface can override both limits with the same key names).

## Rules
* **Availability.** Shared needs a free position on a board that no exclusive campaign owns. Exclusive needs WHOLE boards: every position free for the whole period. The check is per period (`availability()` in `ads.js`): a campaign still waiting for its board counts conservatively as one board per unit. A shared campaign that ends before an exclusive one starts does not block it.
* **Scheduling.** `scheduleCampaign` now judges what already sits on a board during the new campaign's own period (before, any assignment counted). An exclusive campaign takes position 0 and counts as 4 positions, so nothing else is placed on its board while it runs.
* **No house ad** is shown on a board while an exclusive campaign runs on it; house ads show only on empty boards.
* **Rotation.** Boards rotate every 10 s window. Campaigns take turns (`k % n`); inside a campaign its approved designs take turns each time it comes round (`floor(k / n) % designs`). So an exclusive board shows design 1, 2, 3, 4 in 10 s steps; a shared campaign with 2 designs alternates them on its own turns. One function, `pickFrame()` in `server/core/adslots.js`, is used by the server and the client, so what a player sees is what the server validates. Radio spots rotate per spot; Oya Ride cars rotate per ride.
* **Moderation per design** (table `ad_campaign_creatives`, status `pending | approved | rejected`). Admin can reject or re-allow one design (`POST /api/admin/campaigns/:id/designs/:creativeId/decision`), or approve the campaign while rejecting some designs (`rejectDesigns` on the decision). A rejected design leaves the rotation at once and its picture is no longer public; the advertiser still sees it with the reason. Rejecting the last design that is not rejected rejects the campaign (before it runs: a paid ad is refunded as for any rejection) or takes it down (once it runs). Player reports may name one design (`<campaign>:<design>`): removing it removes only that design.
* **Reporting per design.** `grossImpressions` and `validImpressions` per design (columns `gross` and `valid` on the link table); per-campaign totals and filter reasons are unchanged. The client sends `i` (the design on screen) in the evidence; a wrong design is filtered as `design_not_scheduled_in_window`; an older client that sends none is credited with the scheduled design. NOT done per design: daily split, filter reasons, taps (taps stay per campaign).
* **Quote and invoice.** `quote.placement`, `placementLabel` ("Shared (1 of 4 positions)" / "Exclusive (whole board)"), `sharePct`, `maxDesigns`, `lines[]`. Campaign views carry the same label and `invoiceLines[]`; the advertiser dashboard shows it on the payment line.

## Pages
* `/advertise` step 2: two cards (Shared preselected) with the weekly price per board for the chosen tier, the share of screen time and the design limit. Step 3: the existing drop zone and preview, now one design at a time with a numbered strip of previews (click one to preview or replace it, x removes it, "Add another design" until the limit), and a rotation note. Switching to Shared with too many designs shows what to remove and blocks the submit.
* `/advertiser` dashboard: the placement tag, every design with its own status and impressions.
* `/admin` review: placement tag, all designs, per-design Reject / Allow buttons.

## Database
SQLite: `migrate()` adds `ad_campaigns.placement` (default `shared`) and creates `ad_campaign_creatives` (chunk 16 in `later-schema.js`); campaigns that existed before get one design row each (`AD_PLACEMENT_BACKFILL`), idempotent. Postgres: `server/migrations/pg/0016_ad_placement.sql` (ALTER with `IF NOT EXISTS`, `CREATE TABLE IF NOT EXISTS`, backfill with `ON CONFLICT DO NOTHING`). `ad_campaigns.creative_id` stays: it is the first design.

## Demo creatives
`server/core/demo-ads.js` (`seedPlacementDemo`) and `npm run seed:adplacement` (`scripts/seed-ad-placement-demo.mjs`) build one exclusive board (one brand, up to 4 designs: every 2:1 image of that brand in `../ad_creatives/creatives/manifest.json`) and one shared board (the other brands, one campaign each) on `road_billboard:mega` (2 boards). The exclusive campaign owns the first free board and the scheduler keeps everything else off it, so the shared brands land together on the other board. All demo brands are fictional.

## Tests
`tests/ad-placement.test.js` (rate card, quotes, limits, availability and scheduling, rotation, per-design impressions and moderation, reports, migration on SQLite and Postgres, page markup, demo set) and `npm run smoke:adplacement` (real Chrome: advertiser page, admin review, dashboard, and the in-game board rotating through the approved designs).

## Not done / decisions
* Tap-through (click-out) is per campaign; the board sheet's Visit button opens the campaign link, not a per-design link.
* Real payment (Monipay) still waits for test keys; nothing here charges money.
* The 3x multiplier and 2 / 4 design limits are Sherif's approved ESTIMATES, not market-tested prices.
