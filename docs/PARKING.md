# Car parks (10 Oct 2026, approved by Sherif)

## What is built
- **Five lots** in the city JSON (`carParks`): Auto Mart (free for customers), Midnight Lounge, Sunset Rooftop, Corner Joint and a public lot. Each has tarmac, painted bays (14 to 24 bays), kerbs, a gate booth and barrier, a P sign and a **Car park board** ad slot (new ad surface `carpark_board`, ESTIMATE N20,000 a week). Sites were found by scanning for free ground (tests check no road, building, water or roundabout overlaps).
- **Parking:** drive your OWN car into a lot, tap "Park here" (small fee through the ledger, `balance.parking` and `carParks[].fee`, ESTIMATE), you step out and the car stays in its bay for everyone to see ("Your car" / "@name" tag). Walk back (within 9 m) and tap "Take my car" to drive off. One parked car per player.
- **While your active car is parked** the car button refuses ("Your car is parked at ..."), and the server ignores `drive` mode in the heartbeat, so you cannot cheat the lock. Selling the car clears the parking; a car left more than 3 days (ESTIMATE) goes back to the garage for free.
- **Ambient cars** fill about 40 to 70 % of the other bays (deterministic from the lot and the game hour in 2 hour slots, same for every player, never on a bay a real player holds). Each lot's ambient cars are one merged mesh; far lots (over 300 m) are hidden.
- **Map:** car parks are on the Landmarks layer (blue-grey rectangle and a 🅿️ icon), searchable.
- Server: `server/core/parking.js`, table `car_parking`, routes `GET /api/parking`, `POST /api/parking/park`, `POST /api/parking/take`. Layout and rules are pure in `server/core/carparks-layout.js` and shared with the client.

## Not built (listed so nothing is assumed)
- Parking for the borrowed (free) car; only owned cars park.
- Arriving by paid "car" travel does not place your car in a lot; parked cars are not solid (you can drive through them); no hourly fee (flat fee per visit); no airport or hotel lots yet (they come with those places).
- Tests: `tests/parking.test.js` (9), `scripts/parking-smoke.mjs`. Screenshots: `screenshots/carpark-*.png`.
