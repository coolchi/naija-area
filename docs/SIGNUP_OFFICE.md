# Sign-up choices, apply-to-join and the Naija Area office (queue item 35, built 10 Oct 2026)

## What a player sees
1. **Set-up after sign-up: three separate screens** (`client/src/setup-ui.js`): (1) *Choose your city* (where you start and live), (2) *Which other city interests you?* (its own screen, own city not offered, "Not sure yet" allowed), (3) *What are you into?* (1 to 5 interests). It is skippable ("Skip for now") and shows once for every registered (non-guest) account that has not done or skipped it. Reopen it any time from **More > Your choices > Change my choices**.
2. **Choosing a city other than Lagos moves you there** (the server runs the normal city-entry move; the page reloads into that city). Afterwards your city is **locked** in the set-up (travel by plane, boat or road); the city of interest and the interests stay editable.
3. **The Naija Area Office** (Lagos Mainland, west of the clinic, between the clinic and the bus park; 8:00 to 20:00): green-white awning, flagpole with the green-white-green flag, two floors, sign. Inside: *Reception* (apply to join), *Idea box* (share an idea), a notice board, an idea wall, sofa, water dispenser, two visitors. The same two sheets open from **More > Apply to join the team / Share an idea**.
4. Applicants see the status of their application with a kind sentence and get an in-game notification when the team answers.

## ASSUMPTIONS (all in `server/config/signup.js`, easy to change; none confirmed by Sherif yet)
- **"Choose your city"** = the city you START in and live in: Lagos (starts on the Mainland), Kano, Shagamu, Abeokuta, Ijebu Ode, Abule. Lagos is one city with five districts. One entry per city; preview/disabled cities are never offered.
- **"City of interest"** = ANOTHER city you want to visit or follow. Not binding. It cannot be your own city. It is stored and counted in the backend; nothing in the game changes because of it yet.
- **Interests** = 1 to 5 of 12 topics (music, football, cars, food, fashion, property, games, travel, business, village life, meeting people, building). Stored and counted for the backend; nothing changes in the game because of them yet. The list is a draft: edit `INTEREST_OPTIONS`.
- **"Apply to join"** = apply to join the **contributor team** (testers, designers, developers, artists, local knowledge, community helpers, brand contacts), NOT a waiting list for the game. Needs a registered account. Roles in `APPLY_ROLES`. One open application at a time; withdraw and reapply; after a decline wait 7 days; accepted is final; 3 submissions a day.
- **Contact** is optional, must be an email, and only stored/shown to admins when the player ticks the consent box. It is deleted with the account.
- **Ideas** at the office use the idea pipeline's own categories, roles and limits (`app/ideas/lib/constants.js` equivalent, in `IDEA_*`), 5 a day per player. Ideas from **accepted contributors** export with a contributor id (full weight, as the pipeline weights contributors); ideas from other players export anonymous (half weight).
- Guests skip set-up and cannot apply or share ideas (they cannot be found again).

## Admin backend (all admin-only routes)
- `GET /api/admin/applications?status=new,review` and `POST /api/admin/applications/:id/status {status, note}` (new, review, shortlisted, accepted, declined). The applicant is notified in game.
- `GET /api/admin/ideas`, `POST /api/admin/ideas/:id/status`, `GET /api/admin/ideas/export` (records in the idea pipeline's shape, `source: "game-office"`), `POST /api/admin/ideas/exported {ids}`.
- `GET /api/admin/signups`: counts by city, city of interest and interest, plus how many skipped.
- The admin web page gets an "Applications and ideas" tab (see `public/admin.html`).

## Data
Tables `signup_profiles`, `applications`, `office_ideas` (SQLite in `server/core/later-schema.js` chunk 3; Postgres `server/migrations/pg/0003_signup_office.sql`; parity test `tests/later-schema.test.js`; the whole new suite passes on real Postgres). Part of the player data export and account deletion (see `docs/ACCOUNT_DATA.md`).

## NOT verified
- Whether Sherif means these things by "apply to join", "city of interest" and the interest list (assumptions above).
- No human has used the three screens or the office sheets on a real phone (only headless Chrome with software rendering).
- The export into the real `app/ideas` store is only checked for record shape, not imported into that tool.
- No moderation staffing exists for incoming applications and ideas; the profanity filter is the basic one in `server/core/filter.js`.


## Update 10 Oct 2026 (track-e): the city is the START city (confirmed by Sherif)
- **What was there:** a new account was created in Lagos, and the set-up screen then moved the player to the chosen city (its first spawn point) BEFORE the heartbeat starts, so they never played in Lagos first; but only built cities were offered, the screen called it "your city", and a skipped or closed choice had no rule.
- **Now:** the first screen is "Which city do you want to start playing from?" and says "Open now: Lagos, Kano, Shagamu, Abeokuta, Ijebu Ode, Abule". Every city card carries a badge, **Open now** or **Not open yet**. Choosing an open city puts you on that city's first spawn point (tested for all six). Choosing a city that is not open yet shows "X is not open yet. You will start in Lagos, and we will note that you want X"; you start in Lagos and nobody is moved. The wish is stored as your home city and counted in the admin "Sign-up choices" card, so it shows where people want us to go next. A wish does not lock you in: you can later pick an open city and you are moved there. **City of interest stays a separate stored choice** (it may be a not-yet-open city, never your start city).
- **Change it in `server/config/signup.js`:** `START_CLOSED` (built cities held back from new players), `WISHLIST_CITIES` (cities shown as not open: Abuja, Port Harcourt, Ibadan, Enugu, Benin City, Kaduna, Calabar, Jos; invented list, edit freely), `FALLBACK_CITY`.
- **Files:** `server/core/signup.js` (`startOptions`, fallback rule), `server/config/signup.js`, `client/src/setup-ui.js`, `public/style.css`, tests `tests/signup-start.test.js` (8), `scripts/signup-smoke.mjs`. No schema change (no migration).
- **NOT verified:** the Lagos world is still built behind the set-up screen before the page reloads into another city (a short extra load, not a visible stay in Lagos); when a wished city opens later nobody is moved automatically; the wishlist is a guess; looks on a real phone.
