# Moderator dashboard (queue batch 1, item 6)

Back end: `server/core/moderation.js`, config `server/config/moderation.js`, table `sanctions` (SQLite later-schema chunk 8, Postgres `0008_sanctions.sql`). Front end: the **Moderation** card in `/admin` (`public/js/admin-mod.js`). It sits next to the existing **Player reports** queue (open / resolved filter; dismiss, delete message, delete + pause chat 1 h) which now has an **Open player** button on every report.

## What a moderator can do
- **Look a player up** (username or id): joined date, guest or not, online now, active ban or chat pause, **strikes in the last 90 days** (a warning, mute or ban each counts), reports against them, how many reports they filed (and how many were dismissed: a sign of report abuse), their last 25 chat lines, and the whole sanction history. At 3 strikes in 90 days the card says "consider a ban"; **nothing is automatic**.
- **Warn**: the player gets an alert with your note. A record only (cannot be lifted).
- **Mute chat** for 1 to 720 hours (default 24): uses the existing chat pause (`users.chat_muted_until`), so chat, messages and house chat all honour it. Lifting early restores any other mute still running.
- **Ban account**, for a number of hours (up to 3650 days) or permanent: every request is refused with 403 `BANNED` and the reason, except logging out and **downloading or deleting their own data** (NDPA). The game shows a full-screen message with those two buttons. The player is taken off the map at once. A ban can be lifted any time and works immediately (a 20-second cache is cleared).
- **Lift** a mute or ban with a note. **Active mutes and bans** are listed on the card.
- **Audit log**: every sanction, lift and report action writes a line; the viewer filters by action, actor and text and pages back in time. Report-driven mutes (delete + pause chat, and the automatic pause after several reports) are now recorded in the sanction history too.
- Bots cannot be sanctioned.

## Assumptions to confirm (all easy to change)
1. There is still **one admin login** (password, plus 2FA/IP list when configured). The audit log records the actor as `admin`, so with several moderators you could not tell who did what. **Decision needed:** named moderator accounts with roles (moderator: reports and mutes; admin: bans and money). Not built.
2. Bans are **per account**. A banned person can make a new guest account (no device or network ban, by design: those hit innocent people on shared phones and networks).
3. Sanction history is **kept when an account is closed** (to stop repeat abuse) and listed in the player's data download; a lawyer must confirm that, as with the other kept records (`docs/ACCOUNT_DATA.md`).
4. Reason list (`MOD.reasons`), limits and the 90-day strike window are ESTIMATES.

**NOT verified:** nobody has moderated anything with it; staffing, response times and the reporting policy are decisions for Sherif (`docs/LAUNCH.md` has the staffing note). Appeals are not built (a banned player cannot reach a form; they would use the contact page).
