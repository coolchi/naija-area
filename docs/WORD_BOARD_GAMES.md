# Word and board games (Track C, 10 Oct 2026)

Chess, Word Duel, Find Am (word search), Landlord Lagos (working title) and Suwe. All **game money only**: stakes are pretend naira held in the games escrow account of the ledger, the winner takes the pot, a draw refunds, and nothing can be cashed out. Every reward number is an ESTIMATE placeholder in `server/config/balance.js`. All rules are decided by the **server** (seeded randomness, engines in `server/core/games/*.js` and `server/core/casual/*.js`); the pages only draw what the server sends and forward taps.

Table games use the same contract as Whot, Ludo, Dominoes, Draughts, Ayo and Table football: friendly (practice bot allowed) or staked, 90 s turn clock, forfeit on no-show, weekly board.

## Chess (2 players), Viewing Centre
- Standard rules: check, checkmate, stalemate, castling (not out of, through or into check), en passant, promotion (queen by default), draws by insufficient material, fifty moves, threefold repetition. A 300-ply cap ends a never-ending shuffle as a draw. No draw offers (resign instead). Colours are dealt at random.
- Move generation is checked against the standard **perft** counts (start position, "Kiwipete" and others) in `tests/chess.test.js`.
- Practice bot: always legal, but weak. It looks two plies ahead on **material only** (its move, your best reply), plays a mate in one when it sees it, avoids stalemating you, likes promoting to a queen, and adds a large random wobble (about +/-180 points on a pawn-is-100 scale) so it often misses a free capture or a threat.
- Page: 64-square board, pieces as unicode glyphs, legal targets highlighted, check highlighted, captured pieces, promotion choice.

## Word Duel (2 players), Mama Put
- 3 rounds. Both players get the **same 7 letters** (the shuffled letters of one common 7-letter word, so a 7-letter answer always exists). Each secretly plays one word of 3 to 7 letters; neither sees the other's until both have played. Score = letter values + a length bonus (3 letters +0, 4 +2, 5 +4, 6 +7, 7 +12). Highest total wins; equal = draw. A word the server rejects costs nothing, you can try another. You may pass a round.
- Word list: `server/config/duel-words.js` (about 51,000 words of 3 to 7 letters), **generated** by `tools/gen-duel-words.mjs` from the public-domain ENABLE list with a profanity and slur filter (the project filter plus an extra blocklist). The seed words (the 7-letter source words) are a smaller common-word set with extra sensitive words removed. The generator takes the source list from a local file; the full source list is not shipped.
- Game over: the final board with all three rounds stays visible under the result banner.

## Find Am (word search, single player), Mama Put and the phone Games tab
- One puzzle a day for everybody: 10 x 10 grid, 8 hidden Lagos words (food, roads, places, culture; `server/config/wordsearch-words.js`), in all 8 directions, built deterministically from the date.
- The server keeps the found words and checks each line you draw against the grid. Finishing all 8 words pays a flat 30, inside the shared daily casual cap (300); a partly found puzzle pays nothing. Finishing faster than 4 s per word in total is refused. A very new account plays without a payout.

## Landlord Lagos (2 to 4 players), Corner Joint. WORKING TITLE
**It is Monopoly-style, but it is NOT Monopoly.** Monopoly is Hasbro's trademark, so the decision is: do not use the name, and do not copy the board, colour groups, token names, card names or artwork.
What is different, on purpose:
- Own name; own 36-square board with invented Lagos plots grouped by real area names used generically (Mushin, Surulere, Yaba, Ikeja, Lekki, Victoria Island, Ikoyi, Banana Island); the colours and group sizes are not Monopoly's.
- Stations are Lagos transport (danfo, keke, boat, airport), utilities are power and water; the start square is "Collect salary"; jail is the **Go-Slow** (a traffic jam: pay a fine, use a pass, or roll a double).
- Own Luck deck (17 cards) with original Lagos-flavoured text; no "Chance" or "Community Chest" and no tokens with Monopoly names.
- Own numbers: rent multipliers, build costs and trade rules are our own and are placeholders.
What is the same is only the generic, unprotectable idea of the genre: roll, buy, pay rent, build, trade, go bankrupt. Even so, **a lawyer should look at it before a public launch**; nothing here is legal advice.
- Rules: start with ₦1,500,000 **play money (inside the match only, not the ledger)**, salary ₦200,000, buy unowned plots, rent (see the table below), build up to 5 levels, simple trades (2 offers a turn), liquidation and bankruptcy (assets go to the creditor), doubles roll again (three in a row = Go-Slow). A match ends when one player is left or after **20 rounds**, then the richest (cash + plot prices + buildings) wins; a tie is a draw.
- **Money design:** the ledger sees only the entry stake (escrow) and the prize at the end. No per-rent ledger rows, so no ledger flood. Dice and cards come from a seed kept in the match state, so a match can be replayed.
- Practice bot: see the verification section below.

## Suwe (Yoruba hopscotch), Compound Yard (new venue) and the phone Games tab
- **Rules vary by area.** This is a "common version" for the game; local players will play it differently. The Yoruba wording in the game (the name, chant line, labels) is **PLACEHOLDER and must be reviewed by a Yoruba speaker** before launch.
- The ground: a long rectangle of 12 boxes in a U route, numbered 1 to 6 going away and 6 to 1 coming back, so every number appears on both sides.
- A **stage**: stop the marker on the timing bar to throw the stone into the stage's box, then tap in rhythm once per hop (hopping over the stone's box, or an opponent's house, is a longer hop), then the last tap picks up the stone. A tap too early or too late is a touched line: out for the turn (single player: lose a life). After the last stage of a lap you build a **house**: a blind over-the-shoulder throw; if the marker stops near the centre it lands on the same number on both sides and that number is your house (your own house is a rest box with a wider timing window; others hop around it).
- **Server-authoritative:** the seed gives the beat pattern and the stone's wobble; the page reports only *when* it tapped (relative times) and the server judges them with a small slack. A run that is faster than the plan allows is refused.
- Single player (casual, shared daily cap): up to 12 stages, 3 lives (a failed stage costs a life and you retry the same stage; run over at 0 lives), then one house throw. Reward 2 per stage cleared plus 6 for a house, at most 30 a run.
- 2-player table game: one turn = one stage or one house throw; a mistake keeps you on that stage for your next turn. The match ends at 4 houses taken or 40 turns; most houses wins, then stages cleared, then perfect hops; else a draw.
- Page: the grid drawn on the ground, the walker figure hops on one foot between boxes (`client/src/suwe-ui.js`).
- Placement: the new **Compound Yard** venue in Lagos mainland. Abule/Ogun were NOT given a yard in this batch.

## Verification against the code (10 Oct 2026 pass)
Parts of this page were first written from memory; this section was checked line by line against the code and the text above was corrected where it was wrong (chess bot description, word search reward, Landlord rent rule, Suwe lives).
**Chess bot** (`server/core/games/chess.js`, `bot`): 2-ply material search (every legal move, then the opponent's best reply, scored by piece values), mate in one = top score, stalemating = penalty, +200 for a queen promotion, plus a random term of about +/-180. So: legal, weak, sometimes sensible, never deep.
**Landlord Lagos** (`server/config/landlord-board.js`, `server/core/games/landlord.js`):
- 36 squares, 8 areas (Mushin, Surulere, Yaba, Ikeja, Lekki, Victoria Island, Ikoyi, Banana Island), 4 stations (Danfo Terminal, Keke Park, Ferry Jetty, Airport), 2 utilities (Power Company, Water Board), Pay Day, Go-Slow, Police Checkpoint (sends you to Go-Slow), Council Levy, Lagoon Rest, 5 Luck squares, 17 Luck cards.
- Start cash 1,500,000; Pay Day 200,000; levy 100,000; Go-Slow fine 50,000; 20 rounds; 5 building levels. Plot prices 60,000 to 400,000; base rent is 5% of the price.
- Rent: base rent x [1, 5, 15, 45, 80, 125] by buildings (0 to 5). **A full area set with no buildings pays double rent.** Stations 30,000 / 60,000 / 120,000 / 240,000 for 1 to 4 owned. Utilities: dice total x 5,000 (one owned) or x 12,000 (both). Building cost per level by area: 50,000 (Mushin, Surulere), 100,000 (Yaba, Ikeja), 150,000 (Lekki, Victoria Island), 200,000 (Ikoyi, Banana Island); you must own the whole area and build evenly. Selling a building or a plot to the bank pays half.
- Go-Slow: leave by rolling a double (no extra roll), paying the fine, or using a free pass card; after three failed tries you pay the fine. Three doubles in a row also sends you there.
- End: last player left, or after round 20 the highest net worth (cash + plot prices + buildings at build cost); equal net worth and equal plot count = draw.
- **Bot:** buys when it keeps a cash cushion of 150,000 plus 4,000 per round, or when the plot completes its area set, or it is a station (never leaving under 40,000); builds on complete sets while keeping that cushion; in Go-Slow uses a pass first, otherwise pays the fine only if it has over 600,000 and is not in the last two rounds; accepts a trade only if what it receives is worth at least 115% of what it gives (set-completing plots weighted 2.2x). **It does not propose trades or sell on its own.**
**Suwe** (`server/core/casual/suwe.js`, `server/core/games/suwe.js`, `casual.js`):
- Beat 640 ms at stage 1, 18 ms faster per stage (floor 420 ms); timing window +/-175 ms at stage 1, 7 ms tighter per stage (floor 95 ms); a "perfect" tap is within 35% of the window, "good" within the window, anything beyond is a miss. Resting in your own house gets a 1.5x wider window. Four-beat count-in. The stone-throw timing bar (period 1,400 ms) must stop within a tolerance of the centre (24% at stage 1, down to 12%). The house throw claims a house if the bar stops within 17% of the centre; the number it lands on is picked by the seed from the free numbers, you do not choose it.
- Single player: 12 stages, 3 lives, up to 30 reward (2 per stage + 6 per house), rate limit 8 starts a minute, a run that finishes faster than the plan allows (minus 600 ms slack) is refused as TOO_FAST.
- Table game: 4 stages per lap, then a house throw; the match ends at 4 houses taken or 40 turns in total; tiebreak houses, stages cleared, perfect hops, else draw.
- Stakes for all table games are 0, 100 or 500 (`balance.js` `games.stakes`); turn clock 90,000 ms.

## Mini crossword
**Not built** (it was optional, "if time allows").

## Tests and smoke
- `tests/chess.test.js`, `wordduel.test.js`, `wordsearch.test.js`, `landlord.test.js`, `suwe.test.js`; `tablegames.test.js`, `casual.test.js`, `venues.test.js`, `interiors.test.js` updated. They cover rules and scoring, determinism from a seed, bots finishing whole matches, turn limits, forfeits, tampering and cheating (too-fast, wrong turn, bad input), hidden information (Word Duel words, chess view), stake escrow, prize and refund conservation through the real HTTP routes, and the daily cap.
- No new database tables: single-player runs use the existing `casual_runs`, matches the existing table-game tables. No new migration was needed.
- `scripts/wordboard-smoke.mjs` (`npm run smoke:wordboard`): in headless Chrome plays four chess moves, a whole Word Duel, a whole Find Am puzzle (reward paid), a Suwe single-player stage, a Suwe table turn, and a whole 20-round Landlord Lagos match, each against the practice bot or through the real routes.

## NOT verified
- Nobody has played any of these. Fun, difficulty, bot strength, Suwe timing windows (tuned with a script and a headless browser, not with a finger on a phone, and not for lag), touchscreen feel and small-screen layout are all untested by people.
- Suwe rules and Yoruba text need local review. Landlord Lagos needs a trademark look before launch.
- Reward and stake numbers are placeholders.
