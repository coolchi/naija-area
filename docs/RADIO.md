# In-car radio (10 Oct 2026)

**What it is:** when you drive, a dashboard chip appears at the top of the screen with the station and song, previous and next buttons, a power button, mute and a volume slider. Keys: **R** on/off, **N** next station, **B** previous. Four fictional stations. The music is **synthesised in your browser** (no files, no streaming, nothing downloaded), and every player hears the same song at the same moment because the song schedule is computed from the server clock.

## The stations (all invented)
| Station | Mood | Tempo | Sound |
|---|---|---|---|
| Eko FM 98.5 | Afrobeats hits | 104 | kick/clap/hat groove, sub bass, plucks, soft chord pad |
| Highlife 102 | Highlife and fuji classics | 118 | bright plucked guitar-like lines, walking bass, shaker, woodblock |
| Grace Gospel 88.1 | Gospel and worship | 76 | warm organ-like pad chords, sine lead, clap |
| Night Owl 107.3 | Late-night slow jams | 68 | dark pad, deep bass, bell notes, rim click |
Each station has 4 or 5 invented track names (150 to 220 s) and a short **station ident** (a rising jingle of the station's chord, 8 s) before every second track. Switching stations plays a short tuning "static" burst (0.35 s).

## Rules that are built (and tested)
- **Audio starts only after a tap or key press** (the AudioContext is created then; a browser smoke checks there is none before).
- **Mute, volume, power**; the radio **stops when you leave the car** and the chip disappears; it resumes at the same station and volume when you drive again, unless you switched it off.
- **Low-data hint:** if the browser reports Save-Data or a 2g connection, the radio never starts by itself (it did not anyway), and the driver can still switch it on.
- The playlist clock: `nowPlaying(station, serverMs)` is a pure function, the same for everyone, wrapping at the station's cycle. Stations are out of step with each other.
- Not while flying or aboard a boat.

## Code
`client/src/radio.js` (stations, schedule, clock, `RadioState` rules; pure), `radio-music.js` (the note patterns for each 16th-note step; pure and deterministic), `radio-audio.js` (Web Audio voices and scheduling about 0.6 s ahead), `radio-client.js` (chip, keys, hooks into the driving mode). CSS `#radioChip` in `public/style.css`.

## Tests
`tests/radio.test.js` (9: four stations and no real names, playlist clock, stations out of step, when sound is allowed, switching and wrap-around, leaving the car and resuming, low-data hint, music determinism and instrument mixes, music maths) and `scripts/radio-smoke.mjs` (real browser: no radio on foot, key R, AudioContext running, **measured loudness above silence**, N and B, mute, leaving the car, resuming).

## NOT done / NOT verified
- **How it sounds to a human.** The smoke proves sound is produced (a level above silence) and that the right notes are scheduled; whether it sounds good, is in tune with a musician's ear, or is loud enough on a phone speaker needs a person to listen. These are simple synthesised patterns, not produced songs. Producing real royalty-free or original tracks is the main cost the plan mentioned.
- No DJ voice or spoken words (only the jingle). No traffic, weather or news segments, no sponsor spots between tracks (the ad portal tie-in comes later), no artist slots, no listener counts on the server.
- No radio in shops, homes, venues, the phone or as a passenger in Oya Ride or a bus (car driving only, as the plan's first piece said).
- No "battery saver" detection beyond Save-Data and 2g (browsers rarely expose battery saver).
- Real streaming of real stations and licensed music is a later phase and NOT started (rights and licensing in 14_radio_tv_plan.md and 20_radio_streaming_research.md).
- Phone battery and CPU use of the synthesis was not measured.
