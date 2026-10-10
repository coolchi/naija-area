# Progression: tutorial, missions, streak, achievements, titles, seasons

All numbers live in `server/config/progress.js` and are **ESTIMATES** nobody has balance-tested with real players.
Rewards are game money paid through the ledger from the `sys:faucet_missions` account (`server/core/rewards.js`), reasons start with `mission_`, and are capped per game day and per week (`CAPS`).

## 1. First-five-minutes tutorial (`server/core/tutorial.js`, `client/src/tutorial-ui.js`)
A card under the clock shows "2/7 Open the map"; tap it for the whole checklist. Seven steps: walk 25 m, open the map, start a shift, collect pay, buy food or a drink, open the phone, rent a place.
- The server CHECKS walk (distance from where you started), shift, pay (a `job_wage` ledger entry), purchase (a `shop_purchase` ledger entry) and home. "Open the map" and "open the phone" are reported by the app and only guide: they never gate the reward.
- When every server-checked step is done the reward (`TUTORIAL.reward`, ₦1,500 ESTIMATE) is paid once (idempotency key `tutorial:<uid>`). Skip any time; "More > Replay the tutorial" brings the card back (no second reward).
- It replaces the one-line hint chip while it runs; the six-card tour on first run is unchanged. Bots get no tutorial. Switch off with `TUTORIAL.enabled = false`.
- API: `GET /api/tutorial`, `POST /api/tutorial/ack {step}`, `/skip`, `/restart`. Data is in the player's download and erased when the account is closed.
