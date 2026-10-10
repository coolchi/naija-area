# Map navigation (10 Oct 2026, approved by Sherif)

What it does
- **My house** on the map: a big red 🏠 pin with a "My house" label at every zoom level, a 🏠 button in the map's top bar (centres on it and opens its card), and the search list finds "My house: <name>". No home yet: the button just says so. `user.home` is used today; the code also accepts a future `user.homes` list (several homes, one pin each).
- **Tap any place** (venue, shop, job, house, plot, landmark, billboard, road, district, My house) and the card shows the route length and walking/driving ETA, with: **🚶 Take me there** (the avatar walks the route by itself), **🚗 Drive me** (switches to the car, which drives itself), **🧭 I will drive** (car, route shown, you steer), **Open and travel (fare)** (the old paid travel sheet, unchanged) and **📍 Waypoint**.
- **In the 3D view:** a purple ribbon on the ground along the route, a chip at the top (name, metres left, ETA, auto/guide) with a **✋ Stop** button. The map shows the same route as a dashed purple line, with the live position, destination and remaining distance/ETA. Any key or joystick input takes the controls back and cancels the route. Going into a venue/house or taking a paid commute also cancels it. Getting stuck (no progress for about 2.6 s) cancels with a message, unless you are within 12 m of the end, which counts as arrived.

How it works
- `client/src/route.js` (pure, tested): a 2 m walkable grid built once from the city config (roads, curves and roundabouts through `roadAt`, building boxes grown by the body radius, water). A* with street preference: walking costs 0.75 on streets vs 1.0 off, driving 0.35 vs 1.6, so cars stay on roads and the player can still cut across open ground. Corners are cut by string-pulling where the straight line is clear (cars only along the same kind of ground). The route therefore uses curved roads and roundabouts without special cases, and any new city JSON works unchanged.
- `Auto` is the autopilot state machine: walking at 5.2 m/s; driving steers to the next point, slows for corners (up to 72 % less) and for the end of the route, top speed 11 m/s, never above the manual limit (20). The controller still applies the normal building collisions and the ambient traffic still yields to the player.
- `client/src/nav.js` ties it to the game (ribbon mesh, chip, cancel rules). The map (`map.js`) adds the pins, ETA card and route drawing. Everything runs on the client: the server only sees ordinary positions at ordinary speeds. **No fare, no ledger entry.** The paid travel options are unchanged.
- ETA = route length / speed (walk 5.2 m/s, drive 9 m/s average). The driving average is an ESTIMATE; actual time depends on corners and traffic yielding.

Measured on this box (software, not a phone): grid build about 0.5 s once, per route 30 to 80 ms. NOT measured on a real phone.

Not done / limits: routes do not know about one-way rules or lane sides (the car follows the street centre line); no turn-by-turn voice; no re-route when blocked (it stops and tells you); the destination card for a house uses the door position from the config.

Tests: `tests/route.test.js` (10), `scripts/nav-smoke.mjs` (headless: home button, My house search, ETA text, autopilot walk, key takes over, car autopilot, Stop, arrival with cash unchanged, venue card keeps the paid travel). Screenshots: `screenshots/nav-*.png`.
