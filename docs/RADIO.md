# In-car radio (10 Oct 2026)

**What it is:** when you drive, a dashboard chip appears with the station, previous and next buttons, power, mute and a volume slider. Keys: **R** on/off, **N** next station, **B** previous. The car has **eight stations**: four REAL Lagos stations streamed live (Cool FM 96.9, Wazobia FM 95.1, Nigeria Info 99.3, The Beat 99.9), then four invented ones made in your browser (Eko FM, Highlife 102, Grace Gospel, Night Owl) that act as the fallback.

## Real stations: how it works
- **One config file:** `client/src/radio-stations.js` (names, frequencies, stream URLs, the honesty notes). Change a station there only.
- **Plain audio element, straight from the station.** The browser fetches the HTTPS MP3 stream from the station's own host (`*.streamguys1.com`). Our server does not proxy, record or rebroadcast it, and no game ad is placed over or inside a stream. The page's content-security policy allows media only from our own origin and `https://*.streamguys1.com`.
- **Global off switch:** environment variable `NA_REAL_RADIO=0` on the server, or an admin call `POST /api/admin/radio {"enabled": false}` (runtime only, lost on restart; `GET /api/admin/radio` reads it). The client reads `realRadio` from `/api/config`; when false the car has only the four synthesised stations and never contacts a station.
- **Starts on entering a car**, once the page has had a first tap or key press (browsers refuse sound before that; the same first tap also primes the audio element and unlocks the synthesiser). Before any tap, or if the browser refuses `play()`, the chip says **"<Station>: Tap to play"** and the next tap starts it.
- **Fall-through chain:** if a stream errors, ends, or gives no sound within 12 seconds, the car moves to the next real station that has not failed in the last 5 minutes, and after all four real stations have failed it plays the first synthesised station (Eko FM). Tuning by hand to a failed station tries it again.
- **Off by default on mobile data:** if the browser reports Save-Data, a 2g link or a cellular connection, the radio does not start when you get in; the driver switches it on with R or the button. (Most browsers do not report the connection type, so on those it starts normally.) If the driver switches the radio off it stays off on later car trips.
- Leaving the car stops the stream and releases the connection (the element's `src` is removed).

## Be honest about the real stations
- **Nobody has listened to these streams in the game.** The four URLs were fetched with curl on 10 Oct 2026 and each returned HTTP 200 with `audio/mpeg` (128 kbps) (20_radio_streaming_research.md). Whether they play in a real browser inside the game, sound right, or stay up is NOT verified. Automated tests mock the audio element and never touch the network.
- **The Beat 99.9 is unconfirmed by ear.** Its URL (`beatfmlagos-atunwadigital.streamguys1.com/beatfmlagos`) was inferred from the sister stations' naming; the station's own page only embeds an Atunwa player. The mount exists (a made-up one returned 404), but it has not been checked by ear that it is The Beat's feed. The chip shows "(unverified)" on it.
- **No station has given written permission** for use in a game, and nothing has been sent to any of them (Sherif decided no letters). Broadcaster and music rights (for example COSON) may apply; that is a layperson's reading and needs a lawyer. Sherif approved the technical build anyway. The Beat's own terms forbid republishing or framing without written permission; the switch above exists so this can be turned off in one step.
- Nigeria Info is talk and news; it may not suit every player.
- Jet Radio was removed at Sherif's request.
- **The static demo** (`naija-area-demo.zip`) now has real radio **ON** too (Sherif, 10 Oct 2026; `demo-src/entry.js` sets `realRadio: true`). It opens from `file://`, where some browsers block or break live streams; then the car falls through to the synthesised stations as described above, and the chip's "Tap to play" covers a refused `play()`. Not verified by ear, not verified from `file://` in any real browser (only headless Chrome with aborted streams).
- **Status 10 Oct 2026:** real radio is ON by default on the server (`NA_REAL_RADIO` unset = on; `0` = off) and in the demo. Still **unverified by ear**, **no written permission from any station** (a flagged risk; Sherif approved proceeding without waiting).

## The synthesised stations (all invented; the fallback)

| Station | Mood | Tempo | Sound |
|---|---|---|---|
| Eko FM 98.5 | Afrobeats hits | 104 | kick/clap/hat groove, sub bass, plucks, soft chord pad |
| Highlife 102 | Highlife and fuji classics | 118 | bright plucked guitar-like lines, walking bass, shaker, woodblock |
| Grace Gospel 88.1 | Gospel and worship | 76 | warm organ-like pad chords, sine lead, clap |
| Night Owl 107.3 | Late-night slow jams | 68 | dark pad, deep bass, bell notes, rim click |
Each station has 4 or 5 invented track names (150 to 220 s) and a short **station ident** (a rising jingle of the station's chord, 8 s) before every second track. Switching stations plays a short tuning "static" burst (0.35 s).

## Rules that are built (and tested)
- **Audio starts only after a tap or key press** (browser rule), then starts by itself when you get in a car (see above).
- **Mute, volume, power**; the radio **stops when you leave the car** and the chip disappears; it resumes at the same station and volume when you drive again, unless you switched it off.
- The playlist clock: `nowPlaying(station, serverMs)` is a pure function, the same for everyone, wrapping at the station's cycle. Stations are out of step with each other.
- Not while flying or aboard a boat.

## Code
`client/src/radio.js` (stations, schedule, clock, `RadioState` rules; pure), `radio-music.js` (the note patterns for each 16th-note step; pure and deterministic), `radio-audio.js` (Web Audio voices and scheduling about 0.6 s ahead), `radio-client.js` (chip, keys, hooks into the driving mode). CSS `#radioChip` in `public/style.css`.

## Tests
`tests/radio-real.test.js` (11, mock audio element, no network): the station config (four stations, https, The Beat unconfirmed, no Jet Radio), the global off switch (client and server, env and admin), start on entering a car, station switching and wrap-around, the fall-through chain, retry of failed stations, stall timeout, "Tap to play", power/mute/volume/saveData, and the content-security rule. `tests/radio.test.js` (9: four stations and no real names, playlist clock, stations out of step, when sound is allowed, switching and wrap-around, leaving the car and resuming, low-data hint, music determinism and instrument mixes, music maths) and `scripts/radio-smoke.mjs` (real browser: no radio on foot, key R, AudioContext running, **measured loudness above silence**, N and B, mute, leaving the car, resuming).

## NOT done / NOT verified
- **How it sounds to a human.** The smoke proves sound is produced (a level above silence) and that the right notes are scheduled; whether it sounds good, is in tune with a musician's ear, or is loud enough on a phone speaker needs a person to listen. These are simple synthesised patterns, not produced songs. Producing real royalty-free or original tracks is the main cost the plan mentioned.
- No DJ voice or spoken words (only the jingle). No traffic, weather or news segments, no sponsor spots between tracks (the ad portal tie-in comes later), no artist slots, no listener counts on the server.
- No radio in shops, homes, venues, the phone or as a passenger in Oya Ride or a bus. **Player carpool:** a passenger in another player's owned car hears the **driver's** station (driver tunes; synth tracks stay in sync via the server clock). Real streams are the same URL for both (approximate sync).
- Still no radio as an Oya Ride / danfo passenger.
- No "battery saver" detection beyond Save-Data and 2g (browsers rarely expose battery saver).
- Only the four stations above are streamed; no other real station and no licensed music (rights in 14_radio_tv_plan.md and 20_radio_streaming_research.md). The streams' behaviour on Nigerian mobile networks (data cost, drop-outs) was not measured.
- Phone battery and CPU use of the synthesis was not measured.
