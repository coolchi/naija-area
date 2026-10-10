# Battle pass and skins shop (Track G, item 9, 10 Oct 2026)

**GAME MONEY ONLY. Every price, XP number, reward and date is an ESTIMATE** (`server/config/pass.js`, `server/config/skins.js`). Nobody has played this.

## Real money: NOT built, on purpose
Nothing in the pass or the skins shop can be bought with real money (Monipay or anything else). Selling virtual items for real money, and doing so to players who may be minors, needs a lawyer's view first, and the Monipay LIVE keys are not in yet. The code only has a switch that says it is off: `PASS.realMoney.enabled` and `SKIN_RULES.realMoney.enabled` are both `false`, and the phone screens show that note. When the lawyer and Monipay are cleared, a real-money premium or skin would be a separate payment flow on top of `payments/` (not a change to these ledger paths). Until then, players pay in game money and the pass never sells XP or tiers.

## Phone > City life > Skins and Pass
Two new tabs in the City life app (🎨 Skins, 🎟 Pass).

### Skins (avatar, car, home)
* Catalogue: `server/config/skins.js`. 23 skins: avatar (shirt colour, optional glow ring under the feet), car (paint, optional underglow ring), home (door-side lantern pole for everyone to see, and wall and floor colours inside while it is on). Rarity common, rare, epic. `sell: 'shop'` skins have a price (₦12,000 to ₦300,000). `sell: 'pass'` skins have no price and are only won on the pass.
* **Cosmetic only.** A test (`tests/pass-skins.test.js`) fails if a skin gets any field other than looks. Skins never change speed, health, fares, rewards or any other number.
* Buying: `POST /api/skins/buy`: one balanced ledger transaction (cash to `sys:sink_cosmetics`, reason `skin_buy`) plus the ownership row, in one database transaction; the same `idem` key replays to nothing; owning it already, not enough cash, a pass-only skin and bots are refused.
* Wearing: one skin per kind at a time (`skins_equipped`: avatar, car, home). The avatar and car skins ride on the heartbeat (`sk`) to nearby players and are drawn in the skin colour with the glow ring. A home skin needs a home; if you sell the home the skin stops showing (and comes back if you buy a home again).
* Skins cannot be sold on the marketplace, gifted or traded (the marketplace only lists cars and wearables).
* A home skin replaces the wall and floor colours the owner paid for with the decor feature while it is on; taking it off brings the paint back.

### Battle pass
* A season is a calendar window in UTC+1 (`PASS.seasons`): `s1` Detty Season 1 Oct to 31 Dec 2026, `s2` Harmattan Season 8 Jan to 7 Apr 2027. A season ends, then there is a 7 day grace in which you can still claim what you reached (no new XP); the next season starts only after the grace, so two seasons are never claimed over each other (a test checks it). **No season is configured after April 2027: add one to the config.**
* 30 tiers of 120 XP. XP comes only from things that really happened and were paid through the ledger: the ledger posts a transaction, a hook (`postHooks` in `ledger.js`, used by `pass.js`) adds XP if its reason is a listed source (a paid shift, a break-game win, a ride or trip, a staked table-game win, a sports prize, business income, an event gift, buying a skin). Each source has a per-day count limit and the whole day is capped at 250 XP, so the pass cannot be finished faster than 15 days even by someone who plays all day. Replaying the same idempotent payment earns nothing; bots earn nothing; with no season running there is no XP. There is also a once-a-day check-in (+40 XP).
* Free track (everyone): cash on every tier (₦110 growing to ₦400) and the Sunrise Kaftan, Sunset Drive and Midnight Loft skins at tiers 5, 15 and 25. Premium track: cash on every tier (₦165 growing to ₦600) and the Midnight Senator, Emerald Express, Royal Palace and Royal Purple Lace skins at tiers 8, 12, 18 and 24. Of the 23 skins, 16 are sold in the shop and 7 only come from the pass (a test checks every pass-only skin is given exactly once).
* Premium costs ₦25,000 game money once per season (cash to `sys:sink_cosmetics`, reason `pass_premium`) and unlocks the premium reward of every tier already reached. It pays out about ₦10,000 in cash, so premium is a net money sink.
* Rewards: cash comes from `sys:faucet_pass` in ONE balanced ledger transaction per tier and track, with an idempotency key per user, season, tier and track; the claim row has a primary key on the same, so a double click or a race cannot pay twice. A skin tier grants the skin as owned. A per-player season cash cap (`seasonCashCap`, ₦20,000) holds even if the rewards are raised later (the claim is then cut off, not refused).
* Tables (migration `0020_pass_skins`): `skins_owned`, `skins_equipped`, `pass_progress`, `pass_claims`, `pass_xp_log`. The account download lists them all and closing the account erases them (see `playerdata-g.js`); ledger entries stay, anonymised.
* Routes: `GET /api/skins/catalogue` (public, looks only), `GET /api/skins`, `POST /api/skins/buy|equip|unequip`, `GET /api/pass`, `POST /api/pass/login|premium|claim`.

## Name clash to know about
Track F (player experience) also built "seasons" with leaderboards (4-week seasons, boards, badges, crown). That is a different thing from this battle-pass season; the two are independent (different tables and config). When the branches merge, decide whether to line the dates up and whether to feed leaderboard badges into the pass.

## Not built / not verified
* How the skins LOOK on a real phone (colour pick, glow ring size, the door lantern) was not judged by a person; the smoke test checks they are drawn, not that they are nice.
* Frame rate with many glowing players in view (each glow ring is one small mesh) is untested.
* The XP and reward numbers (a 15 day minimum, the cash amounts, the premium price) are arithmetic, not experience. Whether players feel the pass is fair or too slow is unknown.
* Skins are not shown on other people inside venues, or in the garage and showroom cards (only in the open world and on your own avatar and car).
* The pass has no push notification or HUD badge when a tier is reached; you see it on the Pass tab.
* **Migration numbering:** this branch's later-schema chunks are numbered 5 to 8 and 20; Track F's branch also uses 5 to 9. They need renumbering when merged (the migrations test fails on a duplicate).
