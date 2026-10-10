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

---
## Track G item 7 (10 Oct 2026): flights to Abuja and Port Harcourt, and planes other players can see
**Game money only. Every number is an ESTIMATE** (`balance.flight.routes`, `balance.flight.planes`). Nobody has played this; the plane looks have not been judged by a person.

### Abuja and Port Harcourt
* Two new districts, `abuja` (state FCT) and `port-harcourt` (Rivers), registered in `config/cities/index.json`. They are **small fictional starter layouts made with `tools/new-city.mjs --airport`** (a crossroads, four homes, a shop, a canteen, two billboards and an airport). Street names (Ahmadu Bello Way, Herbert Macaulay Way; Aba Road, Trans-Amadi Road) and the airport names (Nnamdi Azikiwe International, Port Harcourt International, both marked "placeholder layout") are real; the map is not. **They are arrival towns, not finished cities**: no landmarks, no clubs, no real districts. They need real content and a local reviewer.
* They are in `START_CLOSED` (`config/signup.js`): a new player cannot start there (Sherif's open start list is unchanged); you get there by plane. Remove them from that list to let people start in them.
* Fares and times (`balance.flight.routes`, keyed by city): a flight to or from Abuja costs at least N24,000 and takes 1.4 times the base flight time (59 s with the 42 s smoke setting; 63 s at the shipped 45 s); Port Harcourt N21,000 and 1.3 times. When both ends have an entry the larger wins (so Abuja to Port Harcourt is N24,000 for 63 s, the same both ways). Kano and the same-state flights are unchanged (N9,000 or N4,500, base time). `flightMsFor` and `fareFor` in `server/core/flight.js`; the ticket and heartbeat now carry the real flight length (`arrive_at - departs_at`).
* The departure board lists every other city that has an airport, so from Lagos you see Kano, Abuja and Port Harcourt, and from Abuja you see Lagos, Kano and Port Harcourt.

### Other players see planes
* **What is sent:** the heartbeat field `pl`: `[{ id, kind: 'dep' | 'arr', t0 | t1, to | from, n }]`, only to a player within `planes.viewRangeM` (700 m) of the airport apron, at most `maxShown` (3). Nothing is stored: a plane is one scheduled departure with at least one passenger aboard (rows of the `flights` table grouped by route and time). Due tickets are resolved first (boarded, or missed and removed, `resolveEveryMs` 1 s), so a plane never shows for someone who missed it.
* **What is drawn:** a plane is a pure function of time (`client/src/flightpath.js`): `departPose` is the passenger's take-off and circuit for 12 s, then it straightens out and climbs away for 10 s and vanishes (about 43 s in all; `depVisibleS` 45); `landingPose` is the take-off backwards (comes in over the far end of the runway, touches down, rolls out, taxis to the apron and swings round to park nose out, 21 s; `arrVisibleS` 24). Nobody has to sync a position. The parked plane is hidden while another plane uses the apron. The passenger's own plane is the chase-camera one and is not drawn twice.
* Tests: `tests/flight-routes.test.js` (7: both cities and their airports, board and fares and times, the whole Lagos to Abuja to Port Harcourt trip through the ledger, who sees what and when including a far-away viewer and a missed flight, the two pure paths for four airports with continuity and speed and turn-rate limits, window lengths against the client constants). `scripts/planes-smoke.mjs` (headless Chrome, three players: one flies, one near the Lagos airport sees the plane take off and leave, one in Abuja sees it land). `npm run smoke:planes`.

### Not built / not verified
* No landing scene for the passenger (the page reloads into the new city), no cabin, sound or announcements, no seat or luggage, no plane-spotting spot or ad on planes, no more than one plane visible at a time per departure.
* **The smoke test checks that the planes exist in the right places at the right times; its screenshots do not frame the plane, so how they look was not reviewed.** The landing swing and the exit climb are guesses. Real frame rate on phones with three planes in view is untested.
* Abuja and Port Harcourt content and fares need Sherif and a local reviewer; fares and times are placeholders.
