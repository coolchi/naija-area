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
