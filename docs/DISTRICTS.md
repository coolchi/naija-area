# Expanded Lagos (10 Oct 2026)

Five districts, each its own city config (see CITIES.md), joined by **road links**:

```
Lagos Mainland --Third Mainland Bridge road--> Lagos Island --Ikoyi Road--> Victoria Island and Ikoyi --bridge road--> Lekki-Ikoyi Bridge --road--> Lekki
```
- A **road link** is a gate on a road (a sign over the road and a chip: "Third Mainland Bridge road · to lagos island · ₦200"). Stand at it and tap the chip: the server checks you are at the gate, not inside a venue, not flying; charges the fare through the ledger (`district_link`, ESTIMATE ₦200, 6 a minute); moves you out of the *other* gate's range; the client reloads into the new district. API: `POST /api/cities/link {linkId}`.
- Presence, chat, ads, shops, jobs and venues are per district (CITIES.md). The airport (AIRPORT.md) still connects whole cities; these districts are all in the state of Lagos so a flight between them would use the same-state fare.

## What is where (fictional layout, real names approved by Sherif)
| District | Contents |
|---|---|
| Lagos Mainland (existing) | National Theatre (simplified wide drum under a flared cap roof, two wings) |
| Lagos Island | Balogun-style markets and kiosks, Tafawa Balewa Square (72 m paved square, flag, fountain), Lagos Island Central Mosque and Cathedral Church of Christ (both marked `sacred`: nothing commercial within 60 m, checked by a test), Marina road along the water, homes (rooms, flats), a canteen venue, clinic, Island Mart, POS kiosk |
| Victoria Island and Ikoyi | Hotels: Eko Hotel and Suites, Four Points by Sheraton, The Wheatbaker, Transcorp Hilton. Quilox (club, open 20:00 to 24:00), Terra Kulture (arts venue), Hard Rock Cafe (cafe with a stage), Falomo Bridge over a creek, Banana Island (top-tier mansions behind a channel, causeway), homes, clinic, VI Mart |
| Lekki-Ikoyi Bridge | see BRIDGE.md |
| Lekki | Lekki Phase 1 estates (duplex, mansion, flats, bungalows), Eleko Beach (sand, huts, palms, loungers), Tarkwa Bay (sand island across the water, jetty on the Lekki side; the boat is the next queued item), canteen, clinic |

Hotels are lobbies: reception notice board, restaurant counter (food through the ledger), lounge TV, a Word of the Day board (casual game). **Short stays, event halls, room service and spa are not built.** Nobody can stay overnight yet.
Venues copy only the *kind* of place (a club has a dance floor, DJ, bar, VIP, song board). Nothing about what the real places actually offer, their prices or their staff is copied; every blurb says so.

## How it is built
- `tools/gen-lagos-districts.mjs` + `tools/lib/districts.mjs` + `tools/lib/districtkit.mjs`: a deterministic generator (spec in, full city JSON out; seeded). `tools/check-city-layout.mjs` checks overlaps, buildings on roads, buildings in water or creeks (it passes on all five configs; it is also how the National Theatre spot on the mainland was found: that city has no free plot, so the theatre is a 56 x 22 m building squeezed beside the lagoon road).
- Traffic: one loop around each interior road cell, rounded corners, around roundabouts; plus out-and-back loops for bridges and curves.
- Per-district budget (a test): at most 120 buildings, 30 roads, 16 traffic loops, 24 billboards. Measured in the smoke run (software rendering): 29 to 51 draw calls and 12k to 29k triangles per district.
- New client pieces: `client/src/landmarks3d.js` (everything above), `client/src/link-client.js`, creek ground cut-outs in `world.js`, `bridges`, `creeks`, `links`, `landmarks` of kind `beach` and `jetty` in the city JSON, minimap/map creek and beach layers.

## NOT verified (needs a local contributor)
- Every position, street name (Broad Street, Balogun Street, Ahmadu Bello Way, Awolowo Road and so on are plausible names, not mapped), size and distance. Real Lagos is much larger; this is a compressed game version.
- **Transcorp Hilton:** the well-known Transcorp Hilton is in Abuja, not Lagos. It was on the approved list, so it is built in Victoria Island as a generic hotel with that name. Sherif to confirm the name or swap it.
- **Takwa:** the approved list says Takwa; I believe the real Lagos beach is **Tarkwa Bay** (built) and Takwa may be a spelling variant of it (or Takwa Bay in Lekki). Not built twice; Sherif to confirm.
- The mosque and cathedral are generic shapes, not the real buildings. The National Theatre is a simplified placeholder of the cap-roof idea.
- Hotel, club and cafe interiors are generic layouts.
- Sacred-place rules are only "no ads or venues within 60 m"; a local review of tone is still needed.
