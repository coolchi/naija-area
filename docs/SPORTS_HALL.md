# City Sports Hall: ping pong, tennis and a games lounge (10 Oct 2026, branch `track-d`)

GAME MONEY ONLY. 18+. Nothing here pays out real money, nothing can be cashed out.

## Decision: a separate venue, not an extension of the stadium
The City Stadium (docs/STADIUM.md) is a spectator venue (stands, ticket, live-scores TEST). It is left **untouched** (a test checks that). The new **City Sports Hall** is its own building in Lekki (`lk_b_sports`, 34 x 24 x 9 m, centre (222, -30), across Coastal Road, beside Beach Canteen) with the venue `lk_venue_sports` (room 28 x 20 m, hours 7:00 to 23:00). It is added by the idempotent tool `tools/add-sports-hall.mjs` (run it again after regenerating Lekki). The JSON is the source of truth.

## What is in the room (17 stations)
| Station | What it is |
|---|---|
| `pp1`, `pp2` Ping pong table 1 and 2 | PLAYABLE: vs a bot or vs another player |
| `tennis1` Tennis court | PLAYABLE: vs a bot or vs another player |
| `whot1`, `ludo1`, `domino1`, `draughts1`, `ayo1`, `football1` | the existing table games, unchanged (stakes, scoreboard, Practice Bot) |
| `chess1`, `wordduel1`, `property1`, `suwe1` | **coming soon** slots for the games track-c is adding (see below) |
| `board` Weekly scoreboard, `rules` House rules poster | scoreboard (now has Ping pong and Tennis tabs), rules text |

### Coming-soon slots light up by themselves
A slot is `{ type:'game', game:'chess', ... }`. The server resolves it with `sports.kindOf(st)`: the slot's `game` (or the first of its `alts`) that is registered in `server/core/games.js GAMES`. Until then `venueView` sets `soon: true`, `sit` and `sitVsBot` answer `COMING_SOON` (409) and the client draws a greyed table under a tarp, a dashed "coming soon" chip and a "Coming soon" panel. The moment another builder registers `chess`, `wordduel`, `suwe` or the property game (`property`; `alts` also accept `lagosproperty`, `propertygame`, `landlord`, `lagosland`), the slot becomes a normal playable table: no change here. The lounge model already has a small scene for each of those ten games. **Not built here: those games.**

## The two sports are turn-based timing-and-choice rallies
Our server is HTTP-heartbeat based, so there is no real-time physics. One **exchange** is ONE move by the player whose turn it is. A move bundles:
1. **Cover** (only when a ball is coming): the cell where you stand for the incoming ball: a column (left, middle, right) and a depth (short or deep). You see the **shot type** the opponent chose (a lob is high, a drop is short) but never where it is aimed or how well it was hit.
2. **Your shot**: shot type, an aim column and depth, and a **timing** value.

The server first resolves the incoming ball against your cover (`reachOf`: exact cell 1.0, one column away less, two columns away little, wrong depth costs extra; `returnProb` from pace, ball quality and reach), then your own shot (`errProb` from the shot's risk, your timing quality and how stretched you were: net or out, or it becomes the next incoming ball). Everything random comes from `rngFor(seed, exchange, part)`: **the same state and move always give the same result**, and a match replays exactly from its seed and move list.

**Timing meter.** `meterAt(serverTime)` is a triangle wave of SERVER time (2.8 s period, 0 empty, 1 the sweet spot). The page only animates it. When your move arrives the server reads **its own clock** (`sports-games.js prep`); a `timing` value sent by a client is ignored for people (a test proves it). So a laggy tap loses a little: a 150 ms delay moves the meter about 0.1. Bots supply their own timing from their skill.

**Hidden information.** `view()` never contains the aim, depth or quality of the ball in flight. Past aims and covers become public history (`hist`, drawn as orange heat on the court grid): reading the opponent is the game. The bot only reads that same public history.

**Rules.**
- Ping pong (`games/pingpong.js`): first to 11, win by 2 (safety stop at 20), best of 3 games. The server changes every 2 points, every point from 10-10. The player who received first in a game serves first in the next. A serve into the net or out is a point for the receiver (no second serve, no lets). Shots: push, drive, loop, lob, smash (only against a lob). Serves: short (always short), long, spin.
- Tennis (`games/tennis.js`): points 0, 15, 30, 40, deuce, advantage; after a 6-6 run the next point wins (golden point safety stop). A set is first to 4 games (2 clear); the match is ONE short set (`SETS_TO_WIN = 1`; the code supports best of 3 and a test plays it). The server changes every game. First serve fault gives a second serve; a second fault is a double fault. Shots: flat, topspin, slice, lob, drop (always short), smash (only against a lob). Serves: flat, slice, kick.
- A match is cut at 1500 exchanges and decided on the score (safety). The 90 s turn clock and forfeits are the shared table-game ones (a late turn forfeits; Resign gives the opponent the match and the pot).

**Bot** (`rally.js bot`): skill 0..1 (`rookie` 0.25, `club` 0.55, `pro` 0.85) sets how well it times the meter, how it weighs risk, and how well it reads your public history. Same rules as a person.

## Money (all through the existing ledger)
- **Two players**: the same table-game path as Whot and Ludo: stakes `0 / 100 / 500` (friendly or staked), the stake is **escrowed** when you sit and returned if nobody joins, the winner takes the pot, a forfeit loses it, audit rows in `ledger_tx`, guests may not stake, 5 staked games per pair per day, weekly scoreboard (win 3, draw 1) with `pingpong` and `tennis` tabs.
- **Against a bot** (`POST /api/sports/bot {venueId, stationId, level}`): always **friendly, no stake** (a person never stakes against a bot). Beating a bot over the full match pays a small prize (rookie 15, club 30, pro 60; all ESTIMATES in `balance.sports`), at most 3 prizes per game per day, never beyond the **shared daily casual cap** (`casual.dailyCap`), only for accounts older than `casual.minAccountAgeMs`, once per match (idempotent key `sportsprize:<matchId>`), paid from the casual faucet. Losing or forfeiting pays nothing. Bot matches stay **off the weekly scoreboard**. `GET /api/sports/levels` lists the levels and prizes.
- No new tables: it uses `game_matches`, `game_players`, `ledger_tx`, `casual_daily`. **No migration was needed**, SQLite and Postgres behave the same (`npm run test:pg`).

## Client (files)
- `client/src/sports-anim.js`: PURE maths (no three.js, no DOM): the frame, the geometry, `beatFor` (one server event -> one animation beat), `ballAt` (parabolic arcs), pose parameters, ambient rally for tables you only watch, `eventText`.
- `client/src/sports3d.js`: props (`pingPongTable` 2.74 m, `tennisCourt` with lines, net, umpire chair, ten `loungeTable` scenes), the athlete rig (`rigPose`: the shared human shape from `people.js` with a leaning, twisting upper body, a bendable stance and a racket), and `SportsStage`: ONE `Crowd` for every athlete in the room (7 draw calls), a ball with a shadow, rackets, name tags, the camera focus.
- `client/src/sports-ui.js`: the match panel (scoreboard, two-half court grid: tap the top half to AIM, tap your half to say where you will STAND; orange = the opponent's history; shot chips with pace and risk; the timing meter and a Hit button; a plain-words rally log), the "Practice against a bot" buttons on the sit panel, coming-soon tables.
- `client/src/venue.js` (small edits, merge heads-up): imports, two entries in `GAME_NAME` and the scoreboard tabs, `sportsModel` before `stationModel`, the stage created in `build()`, `people_refresh` skips sport stations and syncs the stage, `renderMatch` feeds the stage, the board dispatch falls back to `sportsBoardFor`, `leave()` disposes the stage, `loop()` camera target is `this.focus`, and `installSports(Venue)` at the end.
- Animation: each new server event (the log carries an increasing `i`) becomes a beat: a **swing** (wind up, hit at 45 to 60%, follow through; overhead for serves and smashes, lower for pushes and drops), a **flight** (ball arcs from the hitter's racket to the landing cell, bounces on the table or court, then to the receiver or past them), an **error** (into the net or out), a **cheer** (winner jumps, loser slumps). The receiver first slides to the cover cell they chose (a step back for a deep cover) and lunges by how far the ball was from it. The first sight of a match never replays old events, a backlog longer than 12 events skips ahead, and a table you only watch plays a made-up rally (visual only). While you play, the venue camera glides to your court, turns square on and the picture is shifted clear of the panel.

## Performance (interior budget `server/config/perf-budget.js`)
Measured in the smoke with software GL: the whole hall with no match: **102 draw calls, 11,298 triangles** (budget 160 and 40,000). Each prop is one cached merged geometry under the 3,500 triangle prop budget; all athletes share one Crowd; rackets, balls and shadows are tiny shared meshes.

## Tests
- `tests/sports.test.js` (20): scoring rules (11 win by 2, serve rotation, deuce, advantage, golden point, first and second serve, double fault, sets), determinism, hidden aim, move legality, bot plays full matches and stronger bots win more, the server clock decides the meter, the venue and its placement, coming-soon slots, two-player staked matches (escrow, pot, scoreboard, ledger invariants), bot matches (instant reply, prize once and capped, nothing for new accounts or losses).
- `tests/sports-view.test.js` (10): the client maths and 3D headless: mirrored columns, every event of full bot matches becomes a finite beat with the bounce on the right side in the aimed column, poses, ambient rally, event text, props within budget, the rig, the stage through a real match log, camera focus.
- `scripts/sports-smoke.mjs` (`npm run build && node scripts/sports-smoke.mjs`): in a real headless Chrome, enters the hall through the normal Enter flow, checks the room cost, checks a coming-soon table, then plays **a full ping pong match and a full tennis match against a bot through the UI**, then a full ping pong match between two browsers, then checks the ledger invariants, (random shot, aim and cover each turn; clicks Hit), asserts the match ends with a banner, the athletes leave the court afterwards and there are no page errors. Screenshots: `screenshots/sports-*.png`.

## NOT verified
- **Fun.** Nobody has played it. The choose-cover-then-aim-then-time loop is a design guess; a match is about 55 to 110 exchanges (the smoke matches took 52 to 107 turns), which may be too long for a break game.
- **Bot strength.** Rookie, club and pro are tuned by simulation only (stronger bots win more often, a test checks the ordering); whether pro is hard or rookie is easy for real people is unknown.
- **Feel on phones.** Layout checked only in a 1280 x 760 headless window; the panel on a small portrait phone, thumb reach for the 3 x 2 grids, the sticky Hit button, and the 3D frame rate with 6 athletes on a real phone are untested. The timing meter over real mobile latency is untested (a 150 ms delay costs about 0.1 on the meter).
- **Looks.** The athletes are the shared blocky human shape; the swing, lunge and cheer are approximate (the ball and racket do not line up perfectly). No sound. No camera cuts. Name tags and station labels are large when zoomed in.
- Two-player play: the UI smoke now plays one FRIENDLY ping pong match between two headless browsers (guests may not stake, so no stake in the UI path); staked two-player matches are covered only by the HTTP-route tests. Tennis between two browsers is not in the smoke. Nobody has played with a real second person.
- Real-money, cash-out and the prize sizes are not a concern here (game money, ESTIMATE numbers), but the prize and cap values are placeholders.
- No spectators' view of a real match (strangers see a made-up rally, not the real one). No leaderboard of aces or win streaks. Doubles, tournaments, second set options in the UI and a replay viewer are not built.

## Merge notes for the coordinator
Touched shared files (all small): `server/core/games.js` (registers the engines, `sports.kindOf`, `prep`, `botReplies` after `persist`), `server/core/venues.js` (`soon`), `server/core/routes.js` (two routes), `client/src/venue.js` (see above), `public/game.js` (REBUILD after merging: `npm run build`), `demo-static` (rebuild with `npm run build:demo`). The Lekki city JSON gets the new building and venue (`tools/add-sports-hall.mjs`). If `chess`, `wordduel`, `property` or `suwe` land first, the lounge slots become playable with no change here. `venue.js` `renderMatch` dispatch and `GAME_NAME` are the lines most likely to conflict with track-c; keep both sides.

### Merge rehearsal with track-c (done, nothing merged into master or track-d)
Branch `track-d-c-merge-rehearsal` (made in a scratch worktree from track-d) is `track-c` merged into `track-d` with the conflicts resolved: `client/src/venue.js` (imports: keep both; `GAME_NAME` and the scoreboard tabs: union of both; `renderMatch`: take track-c's version plus the one `sportsStage?.feed` call and `|| this.sportsBoardFor(v.kind)` in the board dispatch; file tail: keep both `Object.assign(Venue.prototype, boards2)` and `installSports(Venue)`), `server/core/games.js` (one `play` call that passes my `prep(...)` result AND track-c's `{ now, turnStart, bot }` options; the rally engines ignore the extra argument), `public/game.js` (rebuilt). After that merge the four lounge slots (`chess`, `wordduel`, `property` through the alias `landlord`, `suwe`) are registered games, so they stop being "coming soon" and become playable tables; the chess, landlord, suwe, word duel, tablegames, venues, casual and both sports test files passed together (101 tests). `tests/sports.test.js` no longer depends on which games are registered (it points the slot at an unregistered id).

