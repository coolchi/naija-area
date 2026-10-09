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
npm test             # 64 node:test tests (ledger invariants, auth, heartbeat, ads, economy, features)
npm run smoke        # headless Chrome end-to-end run; screenshots land in ./screenshots (needs Chrome: set CHROME=/path)
```

Environment: `PORT`, `HOST` (default 127.0.0.1: put a TLS proxy in front before exposing), `NA_DB` (SQLite file, default `data/naija-area.db`), `ADMIN_PASSWORD` (admin at `/admin`; a dev-only default is used with a warning if unset), `NA_DEV=1` (enables `/api/dev/*` teleport/cash helpers, never in production), `NA_LAND_DAY_MS` (shorten the land "day" to watch growth), `BOTS`.

## How to play
- **Move:** WASD / arrows (Shift = run), drag to orbit the camera, wheel to zoom, **C** car, **T** chat, **P** phone. On phones: on-screen joystick and tap.
- **Tap a place** (building, shop sign, door, or ground near one): a bottom sheet shows name, area, open/closed, and travel chips (walk, keke, danfo, your car) with fares and a big **Go · ₦fare** button. Go plays a short commute and puts you at the door.
- **Shops:** three price channels: market ×0.85 (walk to the stall), supermarket ×1.0, delivery ×1.1 + ₦150 from anywhere. Hours are enforced on the game clock.
- **Work:** start a shift at a job point, then play the optional 🎯 timing task for +25% pay.
- **Homes:** tap a house for its card (`@owner's {name}`, type, area, presence dot, items). Rent/Buy uses Review → Pay. Owners rename (24 chars, filtered) and go inside; **Buy mode** (key B) places furniture on a grid with rotate/sell and "Something is in the way". Visitors **Knock**: the host sees a prompt and accepts or declines (95 s timeout), and accepted guests get a read-only view.
- **Land:** four plots with area, size, price, growth and an "omo-onile risk" chip. Value grows with time; high-risk plots may be hit by a levy.
- **Ads:** boards rotate creatives; tap a board for the advertiser card. Advertisers register at `/advertise`, upload an image, get a quote, submit, and track valid impressions at `/advertiser`. Moderators use `/admin`. `/methodology` explains exactly what counts as an impression.

## Where things are
`ARCHITECTURE.md` explains the design. `../10_build_log.md` is what was built and tested, `../11_next_steps.md` is what to do next. Placeholder numbers (prices, rates, decay) all live in `server/config/` and are marked ESTIMATE.
