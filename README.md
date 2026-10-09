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
npm test             # node:test suite (ledger invariants, auth, heartbeat, ads, economy, safety, games, cars, homes)
npm run build:demo   # rebuild demo-static/ (double-click demo-static/index.html: no server needed)
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

## Phase 2 features (how to try them)
- **Venues:** tap *Mama Put Canteen*, *Alhaji Joe's Viewing Centre*, *Corner Joint (Ludo and Whot)* or *Naija Auto Mart* or *Meco* (the mechanic: check your car, pay a placeholder fee for a service; yellow rings with signs) → walk to the door → **Go inside**. Tap stations (or the buttons along the bottom): food counter, TV (mood), Whot bench, two Ludo tables, weekly scoreboard, rules poster. 🎲 *Game money only.*
- **Whot / Ludo:** sit at a table and pick **Friendly** or a stake (₦100 / ₦500, ESTIMATES; guests and brand-new accounts are friendly only). Whot starts when a second player joins. **Ludo takes 2 to 4 players**: others join the same table and the host presses **Start** (a full table of 4 starts by itself). The server rolls the die; you tap a token to move it. Winner takes the whole pot (game money only). Alone? `@Practice_Bot` joins friendly tables (labelled, no money, no scoreboard).
- **Cars:** Naija Auto Mart sells four fictional models (prices are ESTIMATES). Phone → 🚗 Garage to switch or sell (resale falls with age). Your active car is the *My car* chip when you tap a place; the default *Borrowed car* costs more per trip, is slower and has no mood perk.
- **Homes:** owners get 🎨 Paint (wall + floor colours). Guests can ❤️ love the house (once a day), greet, hype, sit on the sofa, watch TV and chat in the room; hosts can ✕ ask a guest to leave.
- **Safety:** tap a chat line for Report / Mute / Block; **⋯** on a house card; **Report this ad** on a billboard card. Phone → More lists your muted/blocked players. Admin: `/admin` → *Player reports*.
- **Static demo:** open `demo-static/index.html` by double-click. It runs the real rules in your browser (see `demo-static/README.txt`).

## Where things are
`ARCHITECTURE.md` explains the design. `../10_build_log.md` is what was built and tested, `../11_next_steps.md` is what to do next. Placeholder numbers (prices, rates, decay) all live in `server/config/` and are marked ESTIMATE.
