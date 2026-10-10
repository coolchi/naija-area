# Seasons (batch 1 item 9)

Server: `server/core/seasons.js`. Numbers: `SEASONS` in `server/config/progress.js` (all **ESTIMATES**). Client: the season card at the top of Phone > 🏅 Me (`client/src/me-ui.js`). API: `GET /api/seasons`.

## How it works
- A season is whole weeks (default **4**) starting on a Monday 00:00 UTC (the same week boundary the table-game scores use). Season 1 starts on `startsAt` (**12 Oct 2026**); the next one follows straight after, for ever. Before the start the card says "Season 1 is coming".
- Three boards, always worked out by the server from its own records:
  - 💰 **Money Maker**: game money PAID IN during the season by jobs, break-game rewards and sports prizes (`reasons` in config). Table-game pots, missions, rent, interest, resale, transfers and top-ups are NOT counted, so trading money back and forth does nothing.
  - 🏆 **Table Champ**: table games won against other players in the season's weeks (practice games with a bot do not count).
  - 💎 **Best Dressed**: the shop price of the jewelry and caps the player is wearing. It is a live number during the season and a snapshot when the season is settled.
- Bots, guests and players with an active ban are left out of every board. Ties go to the older account. The top 10 are shown, plus your own rank (up to 500 deep).
- **Settling**: when a season has ended the server settles it ONCE (a timer every 30 s checks cheaply, and opening the card also checks). The top three of each board who reach the board's minimum (`min`: ₦5,000 earned, 3 wins, any worn piece) get a badge (👑 🥈 🥉) and game money through the ledger (reason `season_prize`, from the missions faucet: ₦20,000, ₦10,000, ₦5,000 per board, ESTIMATES), with a notification. An empty or below-minimum board pays nobody. A season is recorded as settled even when nobody won. If the server was off for several seasons, up to 6 are settled per check, oldest first.
- Season prizes are NOT counted by the daily and weekly mission caps. Each payment has its own idempotency key, so a repeat can never pay twice.
- The **winner (rank 1) of a board gets a title** like "S1 Money Maker" after their name (chat, over the head, profile). It shows automatically for the most recent settled season (a player with several crowns shows the first board in the config order), and any crown can be picked later in Me > titles. Older seasons' badges stay on the Me card.
- Each new season starts from zero. Last season's winners are listed on the card.

## Data
`season_awards` and `season_settled` (later-schema chunk 10, Postgres `0010_seasons.sql`). The awards are in the player's data download and erased when the account is closed (the prize money already paid stays in the ledger history). Nothing is stored for players who did not win a place.

## Tests
`tests/seasons.test.js` (11) and `scripts/seasons-smoke.mjs` (headless Chrome with two players: ranks on the card, the server settling the season, the badge, the title on the other player's name tag, a 390 px phone).

## Not verified / limits (honest)
- Nobody has played a full 4-week season. The season length, minimums and prize sizes are guesses. Money prizes are new game money (inflation): 3 boards x ₦35,000 = ₦105,000 a season at most.
- One person with several accounts can still try to win several places (guests are excluded, and the minimums help, but nothing stops a second real account).
- Best Dressed rewards the richest look, not the best taste. It is a snapshot taken whenever the server settles (normally within a minute of the end; after a long outage it uses what players wear then).
- The week boundary is Monday 00:00 UTC (01:00 Lagos), not Lagos midnight, to match the table-game scores.
- Money Maker uses the first 500 earners only for "your rank"; below that the card says "not in the top 500".
- Not built: a "crown" model on the avatar (the crown is a badge and a title), team or club seasons, a season pass.

## Decisions for Sherif
1. Season length (4 weeks?) and the first start date (12 Oct 2026, a Monday).
2. Prize sizes (new game money) and whether a rank-1 title should last one season or stay.
3. Is "best dressed by price" what you want, or a vote by other players? (A vote needs anti-abuse work.)
4. Whether to keep or drop the minimums that stop empty boards paying out.
