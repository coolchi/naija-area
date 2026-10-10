# Naija Area (v0, test build)

A free-to-play, browser-based multiplayer city-life sim set in a Lagos-style district. Walk or drive around, work shifts, shop, rent or buy a home (and name it), furnish it, buy land, visit neighbours, and see billboards that real advertisers rent through a self-serve portal.

**TEST MODE.** All ₦ is pretend money with no cash value. No real payments exist in this build. 18+ self-declaration only. See `/terms` (draft) and `../07_legal_compliance.md` before any public launch.

## Run it

```bash
npm install          # needs Node 20+ (better-sqlite3 has prebuilt binaries for common platforms)
npm run build        # bundles client/src -> public/game.js (also committed, so this is optional)
npm run seed         # optional: demo residents, homes, a land plot, 3 live demo ad campaigns
npm start            # http://127.0.0.1:3000
BOTS=8 npm run bots  # same server + simulated residents walking, working, shopping, chatting
npm test             # node:test suite (ledger invariants, auth, heartbeat, ads, economy, safety, games, cars, homes, interiors, roads, crash, parking, buses, rides, phone, onboarding)
npm run build:demo   # rebuild demo-static/ (double-click demo-static/index.html: no server needed)
npm run smoke        # headless Chrome end-to-end run; screenshots land in ./screenshots (needs Chrome: set CHROME=/path)
node scripts/<name>-smoke.mjs   # more headless smokes: interiors, roads, nav, crash, night, parking, bus, ride, onboarding, phone, demo (each prints PASSED/FAILED)
node scripts/loadtest.mjs 50,200,500 40   # measured bot load test (real HTTP heartbeats, separate server process); see docs/LOADTEST.md
```

Environment: `PORT`, `HOST` (default 127.0.0.1: put a TLS proxy in front before exposing), `NA_DB` (SQLite file, default `data/naija-area.db`), `NA_DATABASE_URL` (use PostgreSQL instead; see `docs/POSTGRES.md`), `ADMIN_PASSWORD` (admin at `/admin`; a dev-only default is used with a warning if unset), `NA_DEV=1` (enables `/api/dev/*` teleport/cash helpers, never in production), `NA_LAND_DAY_MS` (shorten the land "day" to watch growth), `BOTS`.

## Expanded Lagos (10 Oct 2026)
- Five Lagos districts joined by road links (Mainland, Lagos Island, Victoria Island and Ikoyi, the Lekki-Ikoyi Bridge, Lekki): hotels, clubs, an arts venue, a cafe, mosque, cathedral, National Theatre, Falomo Bridge, Banana Island, Eleko Beach, Tarkwa Bay jetty, and a cable-stayed Lekki-Ikoyi Bridge you can walk or drive across. See `docs/DISTRICTS.md` and `docs/BRIDGE.md`.
- Regenerate with `node tools/gen-lagos-districts.mjs`; check layouts with `node tools/check-city-layout.mjs`; smoke: `node scripts/districts-smoke.mjs` (screenshots `screenshots/district-*.png`).

## Stadium and live scores test (10 Oct 2026)
A fictional City Stadium in Lekki: buy a ticket, take a seat, snacks, a score board. Scores come from ONE server job that saves a copy (mock provider by default; API-Football free plan when `NA_SCORES_PROVIDER=api-football` and `APIFOOTBALL_KEY` are set), with a daily call guard (100 a day, stops at 95) and a fictional-league fallback. Viewers never trigger a call. See `docs/STADIUM.md`; test only, not a launch decision.

## Break games: Chop Am, Clear the Go-Slow, Table football (10 Oct 2026)
Chop Am is match-3 with Nigerian snacks (20 moves, cascades); Clear the Go-Slow is a sliding-vehicle traffic-jam puzzle with 17 levels whose par is the exact BFS-solved minimum; both pay small game money through the server, which replays your moves. Table football is a 2-player venue game at the Corner Joint, a turn-based duel (not real-time) where the server rolls the ball. Nobody has playtested them. See docs/BREAK_GAMES.md.

## In-car radio (10 Oct 2026)
Drive a car and a dashboard chip appears with eight stations: four real Lagos stations streamed live straight from the station (Cool FM, Wazobia FM, Nigeria Info, The Beat) and four invented ones synthesised in your browser (Eko FM, Highlife 102, Grace Gospel, Night Owl) that take over if a stream fails. It starts when you get in a car (after your first tap or key press, or shows "Tap to play"), is off by default on mobile data, and has a global off switch (`NA_REAL_RADIO=0` or `POST /api/admin/radio`). Keys R / N / B. The real streams have NOT been listened to in the game, The Beat's URL is unconfirmed by ear, and no station has given permission: read docs/RADIO.md. The static demo has real radio off.

## Kano, Ogun towns and Abule (10 Oct 2026)
Kano is the second air hub (fly from the Lagos terminal) with its own content rules: no clubs, bars, betting or alcohol, and restricted-category ads are auto-rejected there. Shagamu, Abeokuta and Ijebu Ode are reached by road from Lagos (Lagos to Shagamu, then on); Abule is a light village off the Ijebu Ode road with a farm job and the cheapest homes. All fictional layouts with real names, to be reviewed by locals. See `docs/KANO.md`, `docs/OGUN.md`, `docs/ABULE.md`. Generators: `tools/gen-kano.mjs`, `gen-ogun.mjs`, `gen-abule.mjs`.

## Call a boat (10 Oct 2026)
Jetties in Lekki and on Lagos Island: call a boat, board (fare through the ledger), cross with a chase camera. Tarkwa Bay island is now a place you can only reach by boat; a ferry links Lagos Island and Lekki. See `docs/BOATS.md`.

## Cities and the airport (10 Oct 2026)
- More than one city is supported: `server/config/cities/index.json` lists them, `tools/new-city.mjs` makes a valid skeleton, and everything per player (presence, chat, ads, shops, jobs, venues) follows the player's city. See `docs/CITIES.md`. Only Lagos is enabled; start with `NA_PREVIEW_CITIES=1` to also load a fictional preview town.
- The Lagos airport has a departure board, tickets through the ledger, a visible plane that takes off and circles, and landing in the other city. See `docs/AIRPORT.md`. Smokes: `node scripts/cities-smoke.mjs`, `node scripts/airport-smoke.mjs`.

## How to play (also shown by the in-game "?" tour)
- **Move:** WASD / arrows (Shift = run), drag to orbit the camera, wheel to zoom, **C** car, **T** chat, **P** phone, **M** map. On phones: on-screen joystick and tap. First-run tour (6 cards), a **?** button to reopen it, and a one-line "what to do next" hint.
- **Tap a place** (building, sign, door, ground near one): bottom sheet with name, hours and travel chips (walk, keke, danfo, your car, **Oya Ride** from the phone) with fares and a big **Go** button. The big **map** (minimap tap / phone) is detailed and searchable, shows your house, and can auto-navigate you (walk or drive yourself) with ETA.
- **Money (game money only):** shifts and shops, bank savings, land with omo-onile risk, rent or buy homes; all money moves through a double-entry ledger on the server.
- **Homes:** six housing types (face-me-I-face-you room, self-contain, 2-bedroom flat, bungalow, duplex, mansion), each with its own interior, grid and furniture; Buy mode (B), rename, paint; visitors knock and are let in. Clubs, salons, eateries, viewing centre, Corner Joint, Auto Mart, Meco and your **garage** have their own interiors.
- **Games at venues (stake game money, escrow, weekly board):** Whot, Ludo, Dominoes, Draughts, Ayo; friendly tables with the labelled practice bot. **Casual breaks:** Merge Am (tile merge), Pair Am (memory), Word of the day, with small capped rewards.
- **Cars and roads:** four fictional models, 3-slot garage, curved roads and roundabouts, traffic that yields and queues, **crash rules** (about 5% hit chance, seeded server RNG, health bar, Community Clinic, car health, repair at Meco; ambient cars are never charged), street lights and car headlamps at night, **car parks**, **bus stops** with danfo pick-up, **Oya Ride** ride-hailing.
- **Phone (PHONE_V2, on by default):** home screen with apps (wallet, jobs, garage, houses, games, map, Oya Ride, friends, messages with voice notes, calls). Real two-peer audio is NOT verified in the sandbox; see `docs/PHONE.md`.
- **Ads:** boards rotate creatives; advertisers register at `/advertise`, moderators use `/admin`. Impressions are validated server-side from evidence.
- **Safety:** tap a chat line for Report / Mute / Block; word filter; 18+ self-declaration (real age checks are a later item).
- **Static demo:** open `demo-static/index.html` by double-click. It runs the real rules in your browser (see `demo-static/README.txt`). Phone voice notes and live calls are limited or mocked there.

## Docs
`ARCHITECTURE.md` (design and module map), `docs/` (one note per feature: INTERIORS, NAVIGATION, ROADS, CRASH, LIGHTS, PARKING, BUSSTOPS, RIDE, PHONE, LOADTEST), `../10_build_log.md` (what was built and tested), `../16_build_progress.md` (running progress with test counts), `../18_build_queue_next.md` (queue and statuses), `../11_next_steps.md`. Placeholder numbers (prices, rates, decay, crash chance) all live in `server/config/` and are marked ESTIMATE.

## Status honesty
Tested here: unit/API tests and headless-Chrome smokes on one Linux box. Not tested: real phones, real mobile networks, real two-person voice calls, public hosting, real payments (none exist), real age checks. See `docs/LOADTEST.md` for what the measured load numbers do and do not mean.
