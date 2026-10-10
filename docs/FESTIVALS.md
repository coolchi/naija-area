# Festivals and in-game events (Track G item 6, 10 Oct 2026)
**GAME MONEY ONLY. Every number and date is an ESTIMATE** (`server/config/events.js`, `server/config/wearables.js`). Nobody has played these. Builds on the night events of item 4 (`docs/WEATHER.md`) and the same code (`server/core/events.js`).

## What exists
| Festival | When | Shop (game money) | Daily gift | Limited item |
|---|---|---|---|---|
| Detty December | 10 Dec to 5 Jan every year | small chops N1,500, chapman N700 | N600 + mood | Detty December hat (N120,000), Detty wristband (N80,000), 500 each |
| Christmas | 20 to 27 Dec every year | jollof and chicken N2,000 | N700 + mood | Christmas cap (N100,000), 500 |
| Eid al-Fitr (Sallah) | 3 days, dates per year: 2027-03-09, 2028-02-26, 2029-02-14, 2030-02-04 | rice and stew N1,800 | N700 + mood | Sallah agbada cap (N100,000), 500 |
| Eid al-Adha (Ileya) | 3 days: 2027-05-16, 2028-05-05, 2029-04-24, 2030-04-13 | ram stew and pounded yam N2,200 | N700 + mood | Ileya cap (N100,000), 500 |
Detty December and Christmas overlap from 20 to 27 Dec (both are on).
* **Windows are real calendar dates in Lagos time (UTC+1)**, a pure function of the clock, no scheduler, nothing stored but stock and claims. Fixed festivals use `window.type 'dates'` (repeat yearly, may wrap the new year); moving festivals (Eid) use `window.type 'spans'` with explicit dates per year. **After 2030 there are no Eid dates: someone must add them** (the Events tab then shows no start time).
* **Eid dates are estimates** from the tabulated Islamic calendar. Nigeria announces the day after the moon is sighted, so the real day can be a day off. Change the dates in the config, or switch a festival on with `balance.events.forced = ['eid_al_fitr']`.
* **Limited items** are wearables with `shop: 'event'` (`limited: true`): sold only by the festival shop while it runs, never by the jewelry or cap shops. Stock is per festival run (`stockPerRun`, shared by all players, restocks next year), one per player (`limitPerPlayer`), bought through the ledger (`event_buy` into the shops sink), worn at once, **kept for good** after the festival ends. A second-year purchase of an item you already own is refused (not charged). They sit outside the status price ladder on purpose (size 1.0 to 1.1): they say "I was there", not "I am rich". They can be sold to other players on the marketplace like any wearable (decision below).
* **Daily gift:** one claim per player per day while the festival runs (`claim.perDay`), paid from the events faucet inside the shared daily event cap (N3,000 per player per UTC day, so Detty plus Christmas daily is N1,300).
* **Heartbeat** field `fest` lists festivals on (cached 30 s). The client shows a red badge by the clock and one toast per festival per page load. The phone's Events tab lists each festival (ON with time left, or "starts in N days"), the limited items marked with a star, and the gift button.
* Tables: none new. `event_stock`, `event_buys`, `event_claims` (already in account download and closing). The limited item is in `wearables_owned`.

## Not built
No 3D decorations (no lights, bunting, stalls or crowds; only the badge, the toast and the Events tab). No festival-only music, sound or mini-games. No admin screen for dates (edit config). No Independence Day, New Year or Ramadan.

## Tests
`tests/festivals.test.js` (9: calendar windows including the new-year wrap, Eid spans and next-start, config sanity, off-season refusals, limited item lifecycle, per-run stock and restock, food, daily gift and cap, account download), `scripts/festival-smoke.mjs` (headless Chrome with Christmas forced on: badge, listing, buy, gift once, cap worn). `npm run smoke:festival`.

## NOT verified
Looks and feel; whether prices, stock of 500 and gifts are sensible for the real player count; Eid dates; the badge position on a phone screen. Nobody tested a real date rollover on a running server (tested with a fake clock).
