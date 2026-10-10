# Street lights and car headlamps (10 Oct 2026, approved by Sherif)

The game already had a day/night cycle (the sky, sun, fog and lit building windows follow the server game clock). This item adds lamps that follow it.

## Street lights (`client/src/lamps.js`, `world.js`)
- Placement is computed from the city JSON (`lampPositions(city)`, pure and tested): beside straight roads (on the block edges, every 38 m), along curved roads (every 30 m, alternating sides), and four corner spots per roundabout. Never on a road, in the water or inside a building, never closer than 12 m to another lamp. About 158 lamps in the Lagos mainland district. New cities reuse it unchanged.
- Poles and arms are part of the static merged geometry; the glowing heads and the light pools on the road are **two instanced meshes** (no real lights). Brightness per lamp is set from the game clock: off in daylight, fading on from dusk (night level 0.28 to 0.6), full at night.
- **Lagos flavour:** about 1 in 12 lamps flickers (random dips, bursts), about 1 in 14 is broken and stays dark. Deterministic per lamp (hash of its id).
- Cost: 2 extra draw calls; colours are only updated when the level changes or, at night, about 11 times a second.

## Headlamps (`client/src/headlamps.js`)
- Every ambient vehicle (car, danfo, keke, okada) gets two glowing lamps (one for keke and okada) and a soft beam on the road, drawn as **one instanced beam mesh and one instanced glow mesh** for all vehicles (2 draw calls), hidden entirely in daylight. About 1 in 12 two-lamp vehicles has one dead lamp and a weaker beam.
- The player's own car (drive mode) gets two glows, a longer beam and **one real spot light** (intensity 0 by day), so the road ahead is brighter when driving at night. Cars use the same night level as the street lights.
- Optional ideas not built: a fare or mood penalty for a dead headlamp, Meco fixing lamps.

## Limits
Only checked in headless software rendering on this box, not on a real phone: the single spot light adds some shading cost; if a phone struggles, set `HEAD.spotIntensity = 0` (beams and glows remain). The first time the car appears (drive mode) the shader for the extra light compiles once.

Tests: `tests/lamps.test.js` (4), `tests/headlamps.test.js` (3), `scripts/night-smoke.mjs` (lamps on at night, flicker visible, broken dark, ambient and player headlamps, everything off by day). Screenshots: `screenshots/lamps-*.png`, `headlamps-*.png`.
