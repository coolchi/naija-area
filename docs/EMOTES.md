# Emotes and photo mode (batch 1 item 8)

All numbers are in `server/config/emotes.js` and are **ESTIMATES**. Nothing here touches money, missions or the ledger.

## Emotes (`server/core/emotes.js`, `client/src/emotes.js`)
- The 😀 button in the HUD opens a sheet of 14 emotes: 8 emoji bubbles (laugh, love, thumbs up, fire, thank you, cool, sad, party) and 6 body animations (wave, clap, dance, spin, jump for joy, bow).
- The player asks the server (`POST /api/emote {id}`); the server checks the id, the cooldown (1.5 s), the rate (20 a minute) and keeps the emote **in memory only** for its length. Nothing is stored in the database and nothing needs erasing when an account closes.
- Other players near you get it on the normal heartbeat (field `e` on the presence line) and draw a bubble over the head and the dance on the avatar. You see your own at once (the client does not wait for the heartbeat).
- Emotes are a way of talking, so a moderator chat pause, or chat set to OFF in the safety settings (item 7), also stops them. They cannot be used while flying or on a boat; the body animations cannot be used in a car. Walking away ends your own dance.
- The pose maths (`emotePose`) is a pure function of time so it is unit tested without a browser.

## Photo mode (`client/src/photo.js`)
- The 📷 button hides the HUD and shows a photo bar: five looks (Natural, Warm, Noir, Vivid, Sunset), a frame on or off (location, date and your name in a band along the bottom), a 3 second timer, and the shutter.
- The picture is made **in the browser only**: the game canvas is copied, the look is applied to the pixels, the frame is drawn, and the result is shown in a preview with Save (downloads a PNG), Share (the phone's share sheet when it has one, otherwise it falls back to Save) and Retake. **Nothing is uploaded**, so there is nothing to moderate or store, and "share image" means the file goes wherever the player sends it.
- Other players' name tags are hidden while the shutter fires and come back after.

## Tests
`tests/emotes.test.js` (rules, config, pose maths, filters) and `scripts/emotes-smoke.mjs` (headless Chrome with two players: the sheet, the dance reaching the other player, cooldown, photo bar, Noir look, frame, a real PNG download, a stubbed share sheet, the timer, and a 390 px wide phone layout).

## Not verified / limits
- The dance poses are simple joint swings on blocky avatars; nobody has judged how they look. The headless test only checks that the avatar moves.
- The real phone share sheet and the file name on iOS were not tried (the test stubs `navigator.share`).
- A frame-rate cost of the bubbles with many dancers on screen was not measured.
- Emote ids are fixed in config; there is no player-made content.
