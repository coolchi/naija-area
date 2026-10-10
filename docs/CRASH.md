# Crash rules, health and the clinic (10 Oct 2026, approved by Sherif)

All numbers are placeholder ESTIMATES in ONE block, `balance.crash` (`server/config/balance.js`). Switch everything off with `crash.enabled = false`.

## Rules
- **Hit chance:** about 5 % of the encounters where an ambient vehicle (car, danfo, keke, okada) is about to yield to the local player. **The server decides**, with a seeded RNG (`sha256(secret seed | player | counter)`, secret per server run or `NA_CRASH_SEED`), so the client cannot see or predict it and tests are repeatable.
- **Two steps, so it is fair:** (1) `POST /api/crash/roll` when a vehicle is within 13 m and moving at least 3 m/s: the server answers hit/no hit (+ a one-use token valid 8 s). If no hit the car yields exactly as before. (2) If hit, that one car does not brake for the player; only when it really reaches the player does the client send `POST /api/crash/impact`; the server then applies the damage. If you step aside in time, the token expires and nothing happens.
- **No hit when:** inside a venue or house; within 3 minutes of account creation (grace); less than 2 minutes after the last hit (cooldown); less than 5 s since the last roll (rate limit); vehicle slower than 3 m/s; or in a **safe zone**: junctions/crossings (road half-width + 7 m), roundabouts, the plaza, within 11 m of any venue/shop/job/house door, spawn points, around the clinic. About 29 % of the road area is safe.
- **Player health** (new): 0 to 100, bar with a heart next to energy, hunger and mood. Natural recovery 3 per minute (ESTIMATE). Hit on foot: -12 to -22; hit while driving: -4 to -9.
- **Zero health:** you are carried to the **Yaba Community Clinic** (new building in the city, also on the map), health set to 35, a small fee of ₦800 (only what you can pay: with no cash it is free), mood -15. No account loss, nothing deleted.
- **Clinic treatment:** at the door, restores full health for ₦20 per missing point (minimum ₦200), through the ledger.
- **Car health:** a real player's own ACTIVE car in drive mode loses 10 to 24 car health per hit (damage points; 100 minus damage = health, also lowers the car's condition label). The owner pays a **crash cost of ₦300 per point** (never more than their cash; the rest is waived) via the ledger (`crash_damage`, to `sys:sink_cars`). **Walking, borrowed cars and ambient traffic are never charged**: ambient cars have no account.
- **Meco repair:** a new "Repair crash damage" button in Meco's Service sheet: ₦600 per damage point (ledger reason `car_repair`), restores car health to 100.

## Limits (honest)
- Ambient traffic is drawn on each player's device from the shared timeline, so the server cannot see the cars. A modified client could skip the roll or never confirm an impact and so avoid being hit (it cannot raise its own damage or avoid fees for a hit it confirmed, and it gains nothing else). Hits are not shown to other players. Other players' ghosts are never hit and never charged.
- A hit by another real player's car is not simulated (no player-versus-player collisions exist).
- No insurance, no police, no hospital beds beyond the single clinic; no health effect on speed or jobs yet.

## Files
`server/core/crash.js` (roll, impact, treat, repair, safe zones, health), `client/src/crash.js` (client side, hurt flash, knock-back), `client/src/yield.js` (`decide` can return `hit` only when the server allowed it), `tests/crash.test.js` (10), `tests/crash-client.test.js` (4), `scripts/crash-smoke.mjs`. Screenshots: `screenshots/crash-*.png`.
