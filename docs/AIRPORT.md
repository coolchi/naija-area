# Airport and plane (10 Oct 2026)
**Built:** a Lagos airport with a runway, an apron with a parked plane and a windsock, a departure board, tickets through the ledger, a visible take-off and flight, and landing in the other city's airport. **Not built yet:** a real second city to fly to (Kano is the next item). To see a flight today start the server with `NA_PREVIEW_CITIES=1`: that loads `preview-town.json`, a generated fictional town with its own small airport. Without the flag Lagos is the only city and the board says no other city is open yet.

## Player flow
1. Walk to the terminal (the "✈ Departures" chip appears within 70 m of the terminal door).
2. The board lists each other city that has an airport, with the fare and the next three scheduled departures ("Leaves in 0:21").
3. Tap a departure: the fare is charged through the ledger. A ticket chip counts down. Cancel before departure gives 80% back.
4. Be at the terminal when the plane leaves, on foot and not inside a venue, or you miss it (no refund, a notification says so).
5. The plane taxis to the runway, rolls, takes off and circles over the district with a chase camera while the HUD shows "Flying to X · m:ss". Your avatar is hidden and you cannot move.
6. When the flight time is over the server moves you into the other city at its airport arrival point; the page reloads into that city ("Arriving in a new city…").

## Server rules (`server/core/flight.js`, balance.flight, all ESTIMATES)
- Departures every 90 s of real time, minimum lead 20 s, flight 45 s, cooldown 120 s between flights, fare 4,500 within a state and 9,000 across states.
- One ticket at a time; must be at the gate; not driving; not inside a venue; not in a live table game; enough cash; the chosen departure must be one of the offered slots.
- The ticket and flight live in the `flights` table, advanced lazily from the heartbeat, so a disconnect never strands anyone: the next heartbeat after the landing time completes the flight.
- While flying, the heartbeat ignores the player's movement and ad evidence, and travel, Oya Ride, bus calls, parking and starting a shift are refused.
- Endpoints: `GET /api/flights`, `POST /api/flights/buy`, `POST /api/flights/cancel`; the heartbeat carries `flight`.

## Data and code
- City config: `state` and an `airport` block (`door`, `apron`, `runway`, `arrive`). `validateCity` checks it. `tools/add-airport.mjs` added Lagos's block; `node tools/new-city.mjs ... --airport` gives a new city one.
- Client: `client/src/flightpath.js` (the flight as a pure function of time, unit-tested), `plane.js` (airliner and airfield from primitives, about 2 draw calls), `airport-client.js` (chip, board, flight scene).
- The runway lies beyond the district edge on open ground; the layout is fictional.

## Tests and measurements
`tests/flight.test.js` (9: timetable and fares, board, buying rules, take-off and landing in the other city, disconnect, missed plane, cancel and refund, movement ignored in the air), `tests/flightpath.test.js` (8: continuity, heading smoothness, climb, circle radius, camera). `scripts/airport-smoke.mjs` runs the whole flow in a real browser (altitudes measured during the flight 0, 0, about 21, about 71 m). Screenshots: `screenshots/airport-*.png`.

## Not built / not verified
- Other players seeing your plane or you boarding (no one else sees the flight), a landing scene at the destination, in-flight screens or sounds beyond the horn, luggage, plane ad boards (the terminal has two airport boards already), more than one runway.
- Phone frame rate during the flight; the plane model is simple and has not been reviewed by an artist.
- Fares and times are placeholders. Real Lagos and Kano air hubs, Abuja and Port Harcourt come with their city items.
