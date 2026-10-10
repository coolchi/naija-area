# Stadium and live scores TEST (10 Oct 2026)

## The venue
- **Naija Area City Stadium**, Lekki (`lagos-lekki`), centre (130, 45), 80 x 66 m block between Palm Avenue and Coastal Road. Fictional name; **no real club names, logos, kits or footage**. The Beach Canteen that stood there moved to the east block.
- Outside (client, `landmarks3d.js: drawStadium`): outer wall, four stepped tiers (rings, each higher than the one inside), roofs on the long sides, floodlight masts, pitch with stripes, lines and goals, gate canopy, signs, brand-board panels along the touchline, 520 spectators as ONE instanced mesh. Cost: about 70 merged boxes + 1 instanced mesh. Measured in the smoke (software rendering, whole district in view): 67 draw calls, 43k triangles. Not yet "load only on approach" (see NOT done).
- Inside (venue room 22 x 16 m): pitch strip, three-tier stands with a crowd, brand boards, **ticket booth** (500 for a match-day ticket, ESTIMATE, through the ledger, lasts to the end of the real UTC day), two **snack stalls** (shop with suya, chin chin, zobo), **seat** in the stands (needs a ticket, mood, 2 min cooldown), **score board**, a brand board spot, house rules.
- Tied in: a free **car park** across Coastal Road (`lk_cp_stadium`), two street billboards on Link Road (real ad inventory), the map shows a stadium icon.

## Live scores (a TEST, not a launch decision)
Code: `server/core/scores.js`. Config: `balance.stadium.scores`.
- **One job** (`tickScores`, every 30 s, only calls the provider when due) fetches today's fixtures, stores the answer in table `scores_cache` and every viewer is served that copy. **Viewers never cause a call**: 40 viewers = 1 call (test). `GET /api/stadium/scores` needs you to be inside the stadium.
- **Daily cap guard:** calls are counted per UTC day **in the database** (a restart cannot reset it), counted *before* the call, and the job stops at `dailyCap - reserve` = 95 (cap 100, reserve 5). The delay after each call is stretched so the calls left cover the rest of the day. Simulated full days (tests and `/tmp` simulation): **94 calls** when a match is always live (about 16 minutes apart), **48 calls** when nothing is near (30 minutes apart). If the provider reports its own remaining-calls header and it is higher than our count, we trust the provider.
- **Fallbacks (in order):** last good copy (flagged "may be out of date", with "updated N min ago") for up to 2 h; then a **fictional league** that runs on the clock (deterministic, always a live match, plain invented team names). The board says why: no API key yet, daily limit reached, free plan does not cover this, feed problem, switched off.
- **Providers:** `mock` (default; recorded-shape sample in `config/scores-sample.js`, invented team and league names, always 1 live, 2 upcoming, 1 finished) and `api-football`. To switch: `NA_SCORES_PROVIDER=api-football` and `APIFOOTBALL_KEY=...` (a server secret; never sent to a client, never in a URL; tested). The real provider asks `fixtures?date=<UTC day>` once per cycle.
- **Free plan problem (unconfirmed):** API-Football's free plan may not allow the current season. If the response says so (`errors.plan`), the job backs off for 6 h and the board shows the fictional league with the reason. Not tested against the real API (no key yet).
- **Rights:** API-Football's terms give no licence to publish this data. Test only, names as plain text, no logos, banner "TEST" on the board.

## Tests
`tests/stadium.test.js` (14: venue shape, ticket and seat rules, normalizer, one job many viewers, whole-day cap, hard stop, failures and stale, plan block back-off, no key, real parser with a fake fetch and header count, counter survives restart, fictional league), `tests/scores-view.test.js` (5: board text, source line, tiers and crowd geometry). `scripts/stadium-smoke.mjs` (browser: outside shots, enter, ticket, seat, score board, 5 reloads = still one feed call). Screenshots `screenshots/stadium-*.png`.

## NOT verified / NOT done
- The real API-Football response (no key): only its documented shape is parsed. Season availability on the free plan unconfirmed.
- Real match data in the game at all: legal position unresolved (see 19_live_scores_research.md).
- Phone frame rate with the stadium in view; the stadium is built always, **not loaded on approach**; no instancing of the stands boxes beyond the crowd.
- No match simulation in the stands (the crowd does not react to goals), no commentary or TV channel yet, no match-day events, no real stadium inventory sales beyond the two street billboards (inside brand boards are placeholders).
- Stadium hours 8 to 23 game time (not enforced in tests); ticket price and mood numbers are ESTIMATE.
- The outside shape is generic (not a copy of any real stadium).
