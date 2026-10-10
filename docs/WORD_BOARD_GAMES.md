# Word and board games (Track C, 10 Oct 2026)

Chess, Word Duel, Find Am (word search), Landlord Lagos (working title) and Suwe. All **game money only**: stakes are pretend naira held in the games escrow account of the ledger, the winner takes the pot, a draw refunds, and nothing can be cashed out. Every reward number is an ESTIMATE placeholder in `server/config/balance.js`. All rules are decided by the **server** (seeded randomness, engines in `server/core/games/*.js` and `server/core/casual/*.js`); the pages only draw what the server sends and forward taps.

Table games use the same contract as Whot, Ludo, Dominoes, Draughts, Ayo and Table football: friendly (practice bot allowed) or staked, 90 s turn clock, forfeit on no-show, weekly board.

## Chess (2 players), Viewing Centre
- Standard rules: check, checkmate, stalemate, castling (not out of, through or into check), en passant, promotion (queen by default), draws by insufficient material, fifty moves, threefold repetition. A 300-ply cap ends a never-ending shuffle as a draw. No draw offers (resign instead). Colours are dealt at random.
- Move generation is checked against the standard **perft** counts (start position, "Kiwipete" and others) in `tests/chess.test.js`.
- Practice bot: legal but weak (takes a mate in one, captures when it is free, otherwise random).
- Page: 64-square board, pieces as unicode glyphs, legal targets highlighted, check highlighted, captured pieces, promotion choice.

## Word Duel (2 players), Mama Put
- 3 rounds. Both players get the **same 7 letters** (the shuffled letters of one common 7-letter word, so a 7-letter answer always exists). Each secretly plays one word of 3 to 7 letters; neither sees the other's until both have played. Score = letter values + a length bonus (3 letters +0, 4 +2, 5 +4, 6 +7, 7 +12). Highest total wins; equal = draw. A word the server rejects costs nothing, you can try another. You may pass a round.
- Word list: `server/config/duel-words.js` (about 51,000 words of 3 to 7 letters), **generated** by `tools/gen-duel-words.mjs` from the public-domain ENABLE list with a profanity and slur filter (the project filter plus an extra blocklist). The seed words (the 7-letter source words) are a smaller common-word set with extra sensitive words removed. The generator takes the source list from a local file; the full source list is not shipped.
- Game over: the final board with all three rounds stays visible under the result banner.

## Find Am (word search, single player), Mama Put and the phone Games tab
- One puzzle a day for everybody: 10 x 10 grid, 8 hidden Lagos words (food, roads, places, culture; `server/config/wordsearch-words.js`), in all 8 directions, built deterministically from the date.
- The server keeps the found words and checks each line you draw against the grid. Reward up to 30 per puzzle, inside the shared daily casual cap (300). Too-fast finds are refused (4 s per word minimum). A very new account plays without a payout.

## Landlord Lagos (2 to 4 players), Corner Joint. WORKING TITLE
**It is Monopoly-style, but it is NOT Monopoly.** Monopoly is Hasbro's trademark, so the decision is: do not use the name, and do not copy the board, colour groups, token names, card names or artwork.
What is different, on purpose:
- Own name; own 36-square board with invented Lagos plots grouped by real area names used generically (Mushin, Surulere, Yaba, Ikeja, Lekki, Victoria Island, Ikoyi, Banana Island); the colours and group sizes are not Monopoly's.
- Stations are Lagos transport (danfo, keke, boat, airport), utilities are power and water; the start square is "Collect salary"; jail is the **Go-Slow** (a traffic jam: pay a fine, use a pass, or roll a double).
- Own Luck deck (17 cards) with original Lagos-flavoured text; no "Chance" or "Community Chest" and no tokens with Monopoly names.
- Own numbers: rent multipliers, build costs and trade rules are our own and are placeholders.
What is the same is only the generic, unprotectable idea of the genre: roll, buy, pay rent, build, trade, go bankrupt. Even so, **a lawyer should look at it before a public launch**; nothing here is legal advice.
- Rules: start with ₦1,500,000 **play money (inside the match only, not the ledger)**, salary ₦200,000, buy unowned plots, rent doubles up with a full area set, build up to 5 levels, simple trades (2 offers a turn), liquidation and bankruptcy (assets go to the creditor), doubles roll again. A match ends when one player is left or after **20 rounds**, then the richest (cash + plot prices + buildings) wins; a tie is a draw.
- **Money design:** the ledger sees only the entry stake (escrow) and the prize at the end. No per-rent ledger rows, so no ledger flood. Dice and cards come from a seed kept in the match state, so a match can be replayed.
- Practice bot buys sensibly (buys when it can keep a cash buffer, builds on complete sets, pays fines when rich, accepts only trades it likes).

## Suwe (Yoruba hopscotch), Compound Yard (new venue) and the phone Games tab
- **Rules vary by area.** This is a "common version" for the game; local players will play it differently. The Yoruba wording in the game (the name, chant line, labels) is **PLACEHOLDER and must be reviewed by a Yoruba speaker** before launch.
- The ground: a long rectangle of 12 boxes in a U route, numbered 1 to 6 going away and 6 to 1 coming back, so every number appears on both sides.
- A **stage**: stop the marker on the timing bar to throw the stone into the stage's box, then tap in rhythm once per hop (hopping over the stone's box, or an opponent's house, is a longer hop), then the last tap picks up the stone. A tap too early or too late is a touched line: out for the turn (single player: lose a life). After the last stage of a lap you build a **house**: a blind over-the-shoulder throw; if the marker stops near the centre it lands on the same number on both sides and that number is your house (your own house is a rest box with a wider timing window; others hop around it).
- **Server-authoritative:** the seed gives the beat pattern and the stone's wobble; the page reports only *when* it tapped (relative times) and the server judges them with a small slack. A run that is faster than the plan allows is refused.
- Single player (casual, shared daily cap): 3 lives, reward 2 per stage cleared and 6 per house, at most 30 a run.
- 2-player table game: one turn = one stage or one house throw; a mistake keeps you on that stage for your next turn. The match ends at 4 houses taken or 40 turns; most houses wins, then stages cleared, then perfect hops; else a draw.
- Page: the grid drawn on the ground, the walker figure hops on one foot between boxes (`client/src/suwe-ui.js`).
- Placement: the new **Compound Yard** venue in Lagos mainland. Abule/Ogun were NOT given a yard in this batch.

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
