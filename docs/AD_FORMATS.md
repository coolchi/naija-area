# Ad formats beyond billboards (Track G, item 8, 10 Oct 2026)

Three new things advertisers can buy in the SAME portal (`/advertise`), through the SAME moderation (auto-reject of prohibited words, city rules, then a person approves) and the SAME scheduler. Prices and numbers are ESTIMATES in `server/config/ratecard.js` (`RATE_CARD.surfaces`, `AD_FORMATS`). Test mode: nothing is charged.

| Surface | What the player sees | Image | Weekly (ESTIMATE) | Who counts it |
|---|---|---|---|---|
| `shop_front` | A sponsor sign hung on the front of a shop or venue, beside the shop's own name sign | 1024x512 (2:1) | ₦25,000 | The player's browser measures it (on screen, how long); the server checks distance, window, rate (same rules as a billboard) |
| `radio_spot` | While driving, tuned to one of the four in-game (synthesised) stations: a card with the brand, headline and image under the radio chip and a chime, for one 10 s window every 3 minutes | 768x768 (square) | ₦40,000 | Browser reports how long the card was up; the server checks the spot window, that the player is in a car, 5 s minimum listen, one spot per player per window |
| `ride_car` | The Oya Ride driver's car wears the sponsor's decal on both sides; the sponsor's brand shows on the ride chip | 1024x512 (2:1) | ₦60,000 | The SERVER alone: one valid impression when the passenger boards. Client evidence for this surface is refused (`server_counted_surface`) |

## How it fits
* `server/core/adslots.js`: derives the shop-front boards from each city's shops and venues (one per building, at most `AD_FORMATS.shopFront.maxPerCity` = 8, beside the name sign, ids `sf_<shop id>`), and the virtual slots `radio:<city>:<station>` and `ride:<city>`. No city file was changed.
* A building too narrow for a sign next to the name sign (needs about 26 m of frontage) gets none.
* Real radio stations are never interrupted: only the four synthesised stations (`eko`, `highlife`, `gospel`, `night`) carry spots.
* Sponsors sharing a station take turns spot by spot (`rotIndex`; a plain `window % n` would always pick the same sponsor, because every spot window is a multiple of 18).
* Ride sponsor: chosen when the ride is ordered (rotates by ride number), shown on the car and in the ride card. Ordered = a gross claim; boarded = valid; cancelled or expired = gross only with the reason `ride_not_taken`. Bots and headless browsers are filtered as for billboards.
* The reports (`campaignStats`, advertiser and admin views) work unchanged: gross, valid, filtered with reasons.

## Not done / decisions
* No tap-through (click-out) for the radio card, the car or the shop sign: only impressions. Billboards keep their tap.
* The shop sign for restricted categories follows the city rules like every ad (Kano rejects restricted ads).
* A real sponsored jingle (audio) is not built: the spot is a chime plus a card.
* Looks are not judged: the sign placement, the decal on the car and the card position are estimates; nobody has looked at them on a phone.
* Pricing and the idea of selling the livery to one sponsor at a time per ride are Sherif's call.

## Tests
`tests/ad-formats.test.js` (rate card, derived signs, moderation, evidence rules, turn-taking, ride counting, snapshot) and `npm run smoke:adformats` (real browser: sign shows the sponsor and is counted, the card shows in a car and is counted once, the livery loads and boarding is counted).
