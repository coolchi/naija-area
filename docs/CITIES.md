# Multi-city foundation (10 Oct 2026)
**What it is.** The game can now hold more than one city. A player lives in exactly one city at a time; the client builds the world for that city only (so a phone never loads every city), and everything the player sees on the server side is scoped to it.

## How it works
- **Registry:** `server/config/cities/index.json` lists city files and the default city. Adding a city = a JSON file plus one registry line (`enabled:true`). Only Lagos (Mainland District) is enabled today. `tests/fixtures/test-town.json` is a generated sample used by tests and the smoke.
- **Template:** `node tools/new-city.mjs --id abule --name Abule --city Abule --kind village --prefix ab --out server/config/cities/abule.json` writes a small valid city (cross of roads, 4 homes, a shop with a job point, an eatery venue with the same stations as Mama Put, 2 billboards, spawns, a traffic loop) with every id prefixed, validates it and prints the performance checklist.
- **Validation (`validateCity`, run at start-up):** required lists, spawns and doors inside bounds, unique ids, properties point at real buildings, venues have stations, and performance budgets (max 400 buildings, 120 roads, 60 billboards, 20 traffic loops, 30 venues; ESTIMATES to tune on phones). A bad city stops the server with a clear message.
- **Player city:** `player_state.city_id` (profile has `cityId`). `server/core/cities.js`: `cityOf`, `enterCity(app, uid, cityId, spawn)` (server-authoritative move used by the airport later and by tests), `onlineByCity`.
- **Scoped per city:** presence and nearby players, chat (rooms), the ad snapshot and ad inventory (`ad_campaigns.city_id`, quotes and availability take a `cityId`), shops, venues, properties, land plots, places and travel destinations, jobs (a city only offers jobs whose job point it has), car parks, crash safe zones and clinic, ride destinations. By-id lookups that have no player (a house id, a venue id, a bus stop id) use a merged index, so ids must be unique across cities (job-point ids and the generic place ids like `clinic` and `plaza` are per city).
- **Scoreboards:** table-game boards are per venue, and venue ids are unique, so they are per city already.
- **Client:** `/api/city` returns the player's city. When the server moves the player (heartbeat answers with a different `city`), or login finds the player in another city, the page shows "Arriving in a new city…" and reloads into it. A stale heartbeat from the old city is ignored by the server so old coordinates never move the player in the new one.
- **Homes:** a player can own homes in several cities (the roughly 10 home total cap from the plan is NOT implemented yet: there is no second playable city to need it).

## Tests and measurements
`tests/cities.test.js` (12 tests: validation, registry, id clashes, per-city presence, chat, shops, venues, properties, jobs, ads, crash zones, renting a home in the second city, ledger invariants). `scripts/cities-smoke.mjs` moves a player from Lagos to Test Town and back in a real browser: reload into the second city took about 5.7 s in software rendering (a sandbox figure, not a phone figure).

## Not built / not verified
- A real second city (that is the airport, Kano, Ogun towns and Abule items), travel UI between cities (airport item), per-city weather or day length, per-city leaderboards across venues, the 10-home cap, per-city admin filters, streaming a city while playing (today it is a page reload).
- Phone memory and load times for a big city on real devices.
- The demo bundle still contains only Lagos.
