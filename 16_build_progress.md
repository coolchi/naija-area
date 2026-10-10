
## Progress: real radio ON in the demo and server (10 Oct 2026)
- `demo-src/entry.js` now sets `realRadio: true`; the demo car plays the four real streams and still falls through to the synthesised stations, with "Tap to play" if `play()` is refused. Demo README and `docs/RADIO.md` updated: real radio ON, unverified by ear, no written station permission (flagged risk, Sherif approved proceeding).
- Server default confirmed: `NA_REAL_RADIO` unset = on. Dev server on port 3000 restarted with the latest build: `/api/config` returns `realRadio: true`.
- New test `tests/demo-defaults.test.js` (2 tests: demo default and README honesty; server default, env off switch, admin override).
- Tests: `npm test` 452 total, 444 pass, 0 fail, 8 skipped; `npm run test:pg` 452/452 pass. Radio smoke and demo smoke pass.
- NOT verified: that any stream plays from `file://` in a real browser (some block it), by ear, or that The Beat's feed is The Beat; no station permission.
