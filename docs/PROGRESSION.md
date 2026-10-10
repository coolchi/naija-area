# Progression: tutorial, missions, streak, achievements, titles, seasons

All numbers live in `server/config/progress.js` and are **ESTIMATES** nobody has balance-tested with real players.
Rewards are game money paid through the ledger from the `sys:faucet_missions` account (`server/core/rewards.js`), reasons start with `mission_`, and are capped per game day and per week (`CAPS`).

## 1. First-five-minutes tutorial (`server/core/tutorial.js`, `client/src/tutorial-ui.js`)
A card under the clock shows "2/7 Open the map"; tap it for the whole checklist. Seven steps: walk 25 m, open the map, start a shift, collect pay, buy food or a drink, open the phone, rent a place.
- The server CHECKS walk (distance from where you started), shift, pay (a `job_wage` ledger entry), purchase (a `shop_purchase` ledger entry) and home. "Open the map" and "open the phone" are reported by the app and only guide: they never gate the reward.
- When every server-checked step is done the reward (`TUTORIAL.reward`, ₦1,500 ESTIMATE) is paid once (idempotency key `tutorial:<uid>`). Skip any time; "More > Replay the tutorial" brings the card back (no second reward).
- It replaces the one-line hint chip while it runs; the six-card tour on first run is unchanged. Bots get no tutorial. Switch off with `TUTORIAL.enabled = false`.
- API: `GET /api/tutorial`, `POST /api/tutorial/ack {step}`, `/skip`, `/restart`. Data is in the player's download and erased when the account is closed.

## 4. Daily and weekly missions, login streak (`server/core/missions.js`, `progress-metrics.js`, `rewards.js`, `client/src/missions-ui.js`)
Phone > 🎯 Missions. Every player sees the same 3 daily missions (resets at midnight Lagos time) and 3 weekly ones (Monday start), picked by a seeded shuffle from the pools in `config/progress.js` (`MISSIONS`: 8 daily, 6 weekly). Progress is COUNTED BY THE SERVER from the player's own history: ledger entries by reason (`job_wage`, `shop_purchase`, `casual_reward`, `transport`...), ₦ moved, chat lines, days opened. The client never reports progress, so it cannot be faked from the app.
- **Collect** pays the reward through the ledger (`mission_daily` / `mission_weekly`, idempotency key per mission and period). One collect per mission per day/week; a new day or week starts at zero, yesterday's work does not count.
- **Caps** (`CAPS`): missions, streak and tutorial rewards together pay at most ₦2,500 a day and ₦12,000 a week per player (ESTIMATES). A claim that would go over is trimmed to what is left ("limit reached for now"); at zero it is refused (`CAP_REACHED`) and can be collected later. Season prizes are not counted.
- **Login streak**: opening the game records the Lagos day (`login_days`); consecutive days make the streak, a missed day starts again at 1, the best is remembered. Collect today's bonus once a day: ₦100, 100, 150, 150, 200, 250, 500, then the ladder repeats (`STREAK`).
- Bots get no missions. Missions can be switched off with `MISSIONS.enabled = false`. Data (`login_days`, `mission_claims`, `streak_claims`; SQLite later-schema chunk 6, Postgres `0006_missions.sql`) is in the player's download and erased when the account is closed.
- **Known limits (honest):** one person can run several accounts to repeat the (capped) rewards, as with jobs; "buy 2 things" can be done with the cheapest items, so the net gain from that mission is small but real; "Play a break game" counts only games that paid a reward.
