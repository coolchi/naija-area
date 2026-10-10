# Your data: download and account closing (10 Oct 2026)

Closes the "data-subject rights gap" in `docs/LAUNCH.md` §8 (NDPA 2023 access and erasure). **Engineering view, not legal advice**: a lawyer must confirm what we may keep and for how long.

## Download (More > Your data > Download my data)
`GET /api/account/export` (logged in, 5 a day-hour limit) returns one JSON file: account, wallet accounts and every ledger entry, position and needs, sign-up choices, office applications and ideas, worn and owned items, home and furniture, land, cars, shifts, notifications, chat you sent, friends, blocks, phone settings and messages you sent, game scores, casual runs, travel, payments, the age-check result, reports you filed, ad counts. Not included: the password (stored only as a one-way hash), your network address (stored only as a one-way hash), other people's messages to you.

## Close the account (More > Your data > Close my account)
`POST /api/account/delete {password, confirm: "DELETE"}` (guests need no password). Refused while flying, on a boat, inside a venue or in an unfinished game. In one database transaction:
- **Erased:** notifications, chat, house events, loves, knocks, friends, blocks, phone settings and read marks, voice notes (files deleted), phone message text (blanked), land, furniture, cars and parking, crash records, worn and owned items, shifts, scores, casual runs, flights, boat trips, stadium tickets, ad impression and tap rows, age-session rows, sign-up choices, applications, ideas, position. A home is released first (normal sell-back rules).
- **Forfeited:** money left in cash and savings goes to a system sink (`account_closed` ledger entry). In-game money has no cash value. Real-money purchases are NOT refunded automatically: that is a support and refund-policy decision (see PAYMENTS.md).
- **Anonymised, kept:** the `users` row becomes `deleted_<id>` with no password, no IP hash, no last seen (the double-entry ledger needs the accounts to stay). The username becomes free again.
- **Kept on purpose (needs lawyer confirmation of periods):** anonymous ledger entries, real-money payment records (email blanked), the age-check outcome, abuse reports you filed or that name you, finished game matches, the audit log. Listed back to the player in the response and stored in `account_deletions.kept`.
- The old session cookie stops working immediately (checked on every request).

## For other builders (new games and tables)
Anything holding per-player data must call `registerPlayerData(name, exportFn, eraseFn, keepNote)` from `server/core/account.js` (see the test `modules can register their own player data`). **Track branches (chess, word games, property game, Suwe, sports hall) have their own tables: after merging, register them, or players' closed accounts will leave rows behind.** Nobody has done that yet.

## NOT verified
- No lawyer has confirmed what must be kept or the retention periods; whether blanking the phone message text but keeping the thread shell is enough.
- Tables added by the merged tracks are not yet registered (above). Backups still contain the data until they rotate (retention of backups is not defined).
- A WebSocket or open page of the closed account may keep running until its next request.
- Not tried on Postgres by hand beyond the automated parity run; not tried by a human on a phone.
