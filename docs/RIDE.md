# Oya Ride: in-game ride-hailing (10 Oct 2026, approved by Sherif)
"Oya Ride" is a generic placeholder service name (pidgin "come on"), not a real brand; the name is in `balance.ride.name`.
- **Phone app** "Oya Ride" on the home screen: search a place (venues, shops, landmarks, bus stops, your homes), see the distance, an estimated fare and the driver's arrival time, then "Request ride".
- **Driver:** an AI driver (name, car colour, plate such as `NA 482 KT`, all invented) drives to where you stood when you called, on a real route from the navigation pathfinder, timed to the server's arrival time, and pulls up about 4 m beside you. The car is drawn on your device only.
- **Money:** nothing is charged at request. Cancel is free while the driver is on the way, and costs N100 (ESTIMATE) once they have arrived (never more than your cash). When you tap "Get in" the locked fare is charged through the ledger and the trip uses the normal server travel flow (position move, commute animation, the driver's car carries you).
- **Server rules** (`server/core/ride.js`): one ride at a time, you must be walking and outside, destination at least 40 m away, enough cash for the quote, driver waits 2 minutes then the ride expires, you must be within 14 m of the pickup spot to get in, rate limited. `ride` is not a normal fare chip and cannot be used through `/api/travel`.
- **ESTIMATE numbers:** fare N300 + N1.6 per metre (x1.4 in rush hour), driver 140 to 300 m away at 11 m/s, trip speed 13 m/s.
- **Not built:** surge by demand, tipping, driver ratings, other players seeing your driver, becoming a driver as a player job (later idea), paying by card.
- Tests: `tests/ride.test.js` (6), `scripts/ride-smoke.mjs`. Screenshots `screenshots/ride-*.png`.
