# Bus stops with pick-up (10 Oct 2026, approved by Sherif)

## What is built
- **Ten bus stops** in the city JSON (`busStops`), placed by `tools/add-busstops.mjs` beside the traffic loops that carry danfos and keke (kerb side of the road, on free ground; tests check they are clear of roads, buildings, water). Each has a shelter, bench, pole and a name sign. They are travel places (`type: busstop`) so they appear on the map (🚏) and can be a destination in the normal fare flow.
- **Ambient vehicles serve the stops** (client side, like yielding): all danfos and about 40 % of keke brake smoothly (5.2 m/s²), stand at the stop 3 to 5.5 s (ESTIMATE, `STOP_CFG` in `client/src/busstops.js`), then pull away. Cars queue behind a standing danfo and do not "give up" and drive through it (they only give up on cars that are not standing at a stop). Cars and okada do not stop. It never touches server state or money.
- **NPC passengers:** two human-shaped passengers wait at each stop; when a vehicle stands there one walks to it and boards, and comes back about 22 s later.
- **You call a danfo:** walk to a stop, tap "Wait for a danfo". The server sets the wait (10 to 24 s, 1.5 times in rush hour, ESTIMATE, `balance.bus`) and checks you are at the stop. A dedicated danfo appears about 85 m up the road, drives in and stands at the stop; tap "Board the danfo" (server checks the call and time). You are then asked to pick your destination on the map and the ride is the **normal server travel flow** (mode danfo, game money through the ledger, same fares as before). If you walk away the call is cancelled; it expires after 90 s.
- Server: `server/core/bus.js`, routes `POST /api/bus/call|board|cancel`. Client: `client/src/bus-client.js`, `client/src/busstops.js` (pure), `Traffic.dispatch` in `entities.js`.

## Limits
- Ambient timing is local to each device (other players will see a danfo at a slightly different place). The player's own danfo is also only drawn on your device; other players do not see it.
- Boarding hides your avatar and opens the map; the existing commute animation does the trip. No seat or passenger view inside the danfo. No stop timetable; no fare discount for using a stop.
- Shared loops: a stop only serves vehicles of its own loop.
- Tests: `tests/busstops.test.js` (7), `scripts/bus-smoke.mjs`. Screenshots: `screenshots/busstop-*.png`.
