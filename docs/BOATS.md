# Call a boat (10 Oct 2026)

**What it is:** at a jetty you call a boat; it sails in (about 20 s), waits a minute, you board (the fare is charged then, through the ledger), cross the water with a chase camera, and arrive at the other jetty. Routes are data in the city JSON (`city.boat.stops` and `city.boat.routes`).

## Jetties and routes (all fares and times are ESTIMATE placeholders)
| Route | Fare | Time on the water |
|---|---|---|
| Lekki jetty to Tarkwa Bay jetty (and back) | 600 | 24 s |
| Lekki jetty to Lagos Island Marina jetty | 900 | 30 s |
| Lagos Island Marina jetty to Lekki jetty | 900 | 30 s |

**Tarkwa Bay is now a real place** you can walk on. Lekki's district grew south (bounds `maxZ` 170 to 290) past a 38 m wide channel (`lk_bay`) with no bridge and no gap in its colliders, so the island (beach, huts, palms, jetty) can only be reached by boat. A test checks the channel has no gaps.

## Rules (server, `server/core/boat.js`)
- You must stand within 14 m of a jetty, on foot, outside any venue, not in a table game, with the fare in cash. Calling is free; **boarding pays**. Cancelling is free. If you do not board within a minute of the boat's arrival, it leaves and nothing is charged. If you walk away you cannot board.
- Trip stored in table `boat_trips` (a disconnect never strands you: the heartbeat or the next request finishes the trip lazily). Cooldown 20 s after a trip.
- While aboard: no walking, driving, bus, ride, flights, road links (same guard as flying: `assertNotFlying` also refuses when aboard) and the heartbeat ignores movement.
- On arrival the server moves you to the other jetty; for a route into another district it uses `enterCity` and the client reloads, like road links.
- Routes to a jetty that is not loaded are not offered.

## Client
`boat-client.js` (chip "Call a boat" at a jetty, route sheet, "Board the boat" chip with a countdown, banner while crossing), `boat.js` (the boat: one merged mesh, one draw call), `boatpath.js` (pure motion maths, unit tested: the boat comes in from open water along the channel, slows to a stop at the berth, then sails straight to the other berth, or away out of sight for another district).

## Tests
`tests/boat.test.js` (6: data valid and the island is boat-only, call/board/cross through the ledger once, refusals, walk-away, the district ferry both ways, the trip survives a vanished player) and `tests/boatpath.test.js` (5). `scripts/boat-smoke.mjs` (browser: jetty, channel and island shots, route sheet, boat arriving, boarding charges 600, crossing with the chase camera, arrival on the island, ferry into Lagos Island). Screenshots `screenshots/boat-*.png`.

## NOT verified / NOT done
- Tarkwa Bay in real life is reached from Lekki by boat, but the real jetty names, fares, boat types and routes are NOT checked: names and numbers here are invented (Lekki jetty, Marina jetty, Tarkwa Bay jetty).
- Other players do not see your boat (only you do); no boat traffic or ambient boats; no wake or sound; no night lights on the boat.
- The boat sails straight (no curved path), and only one boat per player at a time.
- Phone frame rate on the channel scenes not measured; no short-hop routes between more places (VI, Ikoyi, Banana Island, Lagos Island east) yet.
