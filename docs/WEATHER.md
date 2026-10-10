# Weather, rain, flooding, day and night, night events (Track G item 4, 10 Oct 2026)

**ALL numbers are ESTIMATES** (`server/config/weather.js`, `server/config/events.js`). The odds are shaped loosely like Lagos seasons (rains April to October, dry hazy harmattan December to February) but they are NOT climate data. Flood-prone streets are INVENTED rectangles placed over streets of this game's own maps. Feel and looks were never checked by a person.

## Weather
- **A pure function of the real clock** (`server/core/weather.js`): 12-real-minute blocks (3 game hours), a "front" lasts 2 blocks; each front draws clear / cloudy / rain / storm from the odds of the real calendar month with a seeded RNG. No database row, so every server and every player agree and tests can pin it. Pin it with `balance.weather.forced`, or `POST /api/admin/weather {state: 'storm' | 'auto'}`. Tests pin `clear` in `tests/helpers.js`.
- **Flooding:** a storm floods the zones of the city at once (level 2); steady rain (two rainy blocks running) floods them (level 1); the water drains for one block after. Zones are per city (Mainland: Lagoon Drive low end, Danfo Drive underpass, Okada Road dip; Island, Lekki and VI-Ikoyi have two or three each). Level 1: drive 60%, walk 85% of top speed; level 2: drive 40%, walk 70%. The server sends the scale (`GET /api/weather`) and which zones are flooded (heartbeat field `wx`); the client applies it in `player.js` (`envScale`, a cap on top of the roundabout cap) and draws water sheets over the flooded streets. The server's own speed check is generous (slack 1.6) so it does not need to know.
- **Other effects:** Oya Ride and travel fares +15% in rain, +30% in a storm; business demand (a car wash drops to 30% in rain, a Mama Put rises 15%); the Events tab shows the weather, a 3-block forecast and the flooded streets.
- **Client look** (`client/src/weather.js`): up to 700 rain streaks around the camera, greyer sky and nearer fog, dimmer lights, lightning flashes in storms (a light flash only), blue water sheets 6 to 10 cm above the road. No rain sound, no wet roads, no splashes, no windscreen wipers.

## Day and night
Phases follow the existing game clock (15 game minutes per real minute): dawn 5 to 7, day 7 to 18, dusk 18 to 20, night otherwise (`GET /api/weather` has `phase` and `night`). The look (lamps, sky, dark windows) was already there; this adds the server's view of it so events and businesses can use it.

## Night-only events (`server/core/events.js`, shared with festivals in item 6)
- **Night Market** (21:00 to 04:00 game time): suya, zobo and roasted corn with a stock per night and a limit per player, bought through the ledger (`event_buy`, to the shop sink); they feed you and lift your mood. A new night restocks.
- **Street Owambe** (22:00 to 03:00, every third game night): once a night "join the dance" for ₦500 from a faucet account (`event_claim`) and a mood lift, inside a daily event cap of ₦3,000 per player per UTC day.
- A night that starts on one game day and ends the next keeps one key, so stock and claims do not reset at midnight.
- Tables: `event_stock`, `event_buys`, `event_claims`.

## Not verified
Nobody has watched the rain or driven through the water; whether 40% speed in a flood is annoying or fun is unknown. The weather odds, fare surge and event prices are guesses. Night events have no physical place in the 3D city yet (they live in the phone's Events tab).
