# Safety and family controls (queue batch 1, item 7)

Phone > **🛡 Safety**. Built 10 Oct 2026 on branch `track-f`. The server enforces every setting; the client only shows and saves them.

## What it is (and is not)
Naija Area is **18+ only** (age tick box, and the optional real age check in `docs/AGE.md`). So "parental controls" here does **not** let a child in. It gives (a) an adult who wants limits on themselves, or on a shared phone or household, a set of controls, and (b) an **automatic restricted mode** for any account whose age check came back **under 18**. If Sherif later wants to allow 13 to 17 year olds with a parent's consent, that is a separate, lawyer-led product decision (see "Decisions" below); nothing here assumes it.

## The settings (per account; guests too)
| Setting | Options (all in `server/config/guardian.js`, ESTIMATES) | What the server does |
|---|---|---|
| Who can chat with me | everyone / friends only / off | `friends`: no public chat or house chat sent; DMs, phone texts, voice notes and calls only to friends; lines from non-friends are hidden from the player's chat feed. `off`: nothing sent, public feed hidden. The OTHER side is protected too: a DM from a stranger to a "friends" player is quietly not delivered (as with a block), and phone texts, voice notes and calls to a "chat off" player are refused. |
| Biggest stake | no limit / no stakes / ₦100 / ₦500 (the game's own stake list) | `games.sit` refuses a bigger stake (also when joining someone else's staked table), before any money moves. |
| Sending money | allowed / blocked | `transfer` refused. Receiving is unaffected. |
| My daily limit for buying ₦ | none of my own / never / ₦1k / 2k / 5k / 10k | `startTopup` counts what was already bought in 24 h (VAT included) and refuses before opening a payment. The shop's own daily limit still applies on top. |
| Daily play limit | none / 30, 60, 90, 120, 180, 240 min | Heartbeats are counted by the server (a gap longer than 60 s counts as 60 s, so a closed tab does not burn time). At the limit every game call returns `403 BREAK_TIME`; `/api/me`, `/api/config`, `/api/guardian*`, `/api/account/*` (download, close), `/api/age/*` and logout still work. Resets at midnight Lagos time. Only players who set a limit are counted, so everyone else costs nothing. |
| Quiet hours | start and end hour, Lagos time, wraps past midnight, at most 16 h | Same `BREAK_TIME` guard. The heartbeat tells the client how many minutes until quiet hours start. |
| Break reminder | none / every 20, 30, 45, 60 min | Client toast, counted from when the page opened (a session, not the day). |
| PIN (optional, 4 to 6 digits) | set / change / remove | While a PIN is set, **every change needs it** (also changing or removing the PIN). Stored hashed (bcrypt). 5 wrong tries lock it for 15 minutes (an audit-log line each). A forgotten PIN: an admin calls `POST /api/admin/guardian/reset-pin {who}`, which clears only the PIN (the limits stay) and writes the audit log. There is no admin screen for it yet. |

## Restricted mode (age check came back UNDER 18)
Applied by the server on top of whatever the player saved, and the player cannot loosen it: chat friends-only, no stakes, no transfers, no real-money buying (the age check already refused buying; this is a second wall), and **clubs** (venue `kind: club`) are closed to them. The Safety sheet says so. An admin reopening the age check (`/api/admin/age/:username/reopen`) lifts it. Everything in `GUARDIAN.restricted` is config.

## Optional age rule (off)
`GUARDIAN.stakeNeedsAgePassFrom` (default `null`): when set, stakes at or above that value need a **recorded** age pass (only meaningful once a vendor exists). Tested with a temporary override.

## Data
Tables `guardian_settings` and `guardian_play` (SQLite `later-schema.js` chunk 9, Postgres `0009_guardian.sql`). In "Download my data" as `guardian` (PIN only as `pinSet: true`), erased when the account is closed. Nothing about who the "guardian" is: there is no second account; the PIN is the only link.

## Limits and honest gaps
- **One account, one phone**: a PIN protects against someone else changing settings, not against them creating a new guest account without limits. Per-device or per-network limits were not built.
- "Friends only" also blocks **house chat** (even with friends in the room).
- The play counter is heartbeat time, not "minutes the tab was visible"; a tab left open and active counts.
- Time limits and quiet hours do not stop a stake already running (a started game finishes by timeout); calls and flights in progress are not cut.
- Support reset of a forgotten PIN is a manual admin call, with nothing to verify who is asking: a real support process is needed.

## Decisions for Sherif
1. Do you want a **minimum age below 18** at all (13 to 17 with a parent's consent)? That needs a lawyer (NDPA children's data) and a real parental-consent flow; this build does not do it.
2. Who answers "I forgot my PIN" and how do they check it is really the owner?
3. Should a **time limit** be something a player sets on themselves only (as built), or may we also nudge everyone with a default break reminder?
4. Is clubs-as-restricted the right nightlife line (clubs serve soft drinks only here)?

## Files
`server/config/guardian.js`, `server/core/guardian.js` (hooks in `world.js`, `social.js`, `homes.js`, `phone/phone.js`, `games.js`, `economy.js`, `payments/index.js`, `venues.js`, `routes.js`), `client/src/guardian-ui.js`, `tests/guardian.test.js`, `scripts/guardian-smoke.mjs`.
