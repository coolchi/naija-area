# Break games: Chop Am, Clear the Go-Slow, Table football (10 Oct 2026)

Three more games from `13_casual_break_games.md` and `12_venue_game_shortlist.md`. All are **game money only** (no cash value, no cash-out); every reward number is an ESTIMATE placeholder in `server/config/balance.js`.

## Chop Am (match-3), casual
- 8x8 board of five Nigerian snacks (puff-puff, chin chin, suya, zobo, plantain, drawn as emoji on plain tiles; no look-alike of any commercial match-3). Swap two neighbours; a swap is legal only if it makes a line of 3 or more. 20 moves. Lines of 3 score 30, 4 score 60, 5+ score 100 (+30 per extra tile); every cascade level multiplies (x1, x2, x3...). If no swap is left after a cascade the board is reshuffled.
- **Server-authoritative like Merge Am:** the server deals a seed, the page plays the shared engine (`server/core/casual/match3.js`, pure and deterministic, all randomness from one seeded generator), and submits the move log (`00r12d...`, cell + direction). The server **replays** the log from its own seed and decides the score; illegal moves, more than 20 moves, logs from another seed, too-fast play (under 700 ms per move) and a second submit are all refused.
- Reward = score / 60 naira, at most 50 per run, inside the shared daily casual cap (300). A very new account plays without a payout.
- Open it from the phone Games tab, or at the **Viewing Centre** (station "Chop Am").

## Clear the Go-Slow (traffic-jam puzzle), casual
- 6x6 junction of stuck vehicles (danfo, keke, cars, buses, lorries). Slide vehicles along their own lane (drag, tap-then-tap, or arrow keys) until the **yellow danfo** can drive out on the right. One slide of any distance = one move; fewest moves wins.
- **17 levels**, made by `tools/gen-danfo-levels.mjs` (deterministic). Every level is solved by **breadth-first search**, and its `par` is the exact fewest slides, so none can be unsolvable and par is true (a test re-solves every shipped level). Par runs from 3 to 20.
- The server picks the level, you submit the move list ("0:+2,3:-1"), the server replays it on its own copy of the level. Levels unlock in order (1 to one past your last clear); only the **first clear** of a level pays (8 + 2 x par, max 45, minus 2 per slide over par, minimum 4); replays pay nothing. Too-fast play (under 350 ms per move) is refused.
- Phone Games tab, or at **Mama Put** (station "Clear the Go-Slow").
- Note: the generator makes crowded boards (up to 13 vehicles), and level 1 (par 3) is crowded but easy; the difficulty curve is by par only and has NOT been play-tested by people.

## Table football, venue game (2 players)
- A station at the **Corner Joint** ("Table football"). Same table rules as Ludo, Dominoes, Draughts and Ayo: friendly or staked (game money held in escrow, winner takes the pot, draw refunds), 90 s turn timer, practice bot for friendly tables, weekly board, leave/forfeit.
- **It is NOT real-time.** Real-time physics and lag handling do not fit our server (turns, HTTP heartbeat), which is what `12_venue_game_shortlist.md` warned about. So it is a **turn-based duel**: each round one player attacks, the other defends. The defender slides three rods (keeper, defence, midfield, 5 positions each) where the attacker cannot see them; the attacker picks a lane, an angle and a power; the **server rolls the ball** along that line (side-wall bounces, figure deflections, power = reach) and returns the path, which the page draws. No dice: the same choices always give the same result. Roles swap every round; first to 3 goals, or the higher score after 10 rounds (equal = draw).
- Engine: `server/core/games/football.js`, same contract as the other engines. The rods stay hidden from the attacker in `view()` until the shot is taken (a test checks it).
- Balance: random choices score about 24% of the time; an attacker who could see the rods nearly always has a goal, so the game is about guessing. Those numbers are from a script, not from people playing.

## Tests and smoke
- `tests/breakgames.test.js` (11): match-3 engine (calm boards, runs, illegal swaps, cascades, replay equals live play over 30 seeds, reshuffle), match-3 routes (seed, replay, tamper, too-fast, ledger, no double pay), danfo levels (every level valid, solvable, par = BFS answer), engine (slides, strict replay), routes (unlock order, first clear pays by par, replays pay nothing), football engine (determinism, bounces, hidden rods, turn flow, 3 goals, 10 rounds, draw, forfeit, bot) and the stations. `tests/tablegames.test.js` now also plays a whole football match through the real HTTP routes. `tests/casual.test.js` and `tests/venues.test.js` were updated for the new games and stations.
- `scripts/breakgames-smoke.mjs`: in headless Chrome, plays a full Chop Am game (tap-tap first move, 20 swaps, the server agrees on the score and pays), clears Clear the Go-Slow level 1 at par and sees level 2 unlock, and plays a whole football match against the practice bot through the UI.

## NOT verified
- Nobody has played these. Feel, difficulty curve, snack emoji on real phones (the headless test font drew some of them as boxes), drag handling on touchscreens (only synthetic pointer events and clicks were tested), and whether Table football is fun as a guessing duel are all untested by people.
- Reward numbers are placeholders. No daily challenge, leaderboard, power-ups or special tiles in Chop Am; no hint button in the danfo puzzle; football has no spectators and no 2v2.
- The static demo includes all three (the server code runs in the browser); football there is played against the practice bot. I did not click through football in the demo bundle by hand; the demo smoke only checks the demo loads and its core flows.
