# Road data format v2: curved roads, roundabouts, curve-following cars

Estimate given before starting (ESTIMATE): about 1 day of focused work for one developer: road data and geometry module, 3D ribbons and roundabouts, traffic paths, map drawing, tests, smoke. Built in one builder session.

## Data (city JSON, `roadFormat: 2`)
- Straight road (unchanged): `{ id, name, x1, z1, x2, z2, width }`.
- Curved road: `{ id, name, kind: 'curve', width, pts: [[x,z],...] }`, a sampled polyline (about 2 m spacing). It has no x1/z1. Always read roads through `roadPts(r)` / `isCurved(r)` in `client/src/roadgeom.js`.
- `city.roundabouts: [{ id, name, x, z, outerR, islandR }]`, sitting on a junction of two straight roads.
- `city.trafficLoops[].pts` are dense lane paths (`dense: true`, already follow the bends, no extra rounding). Right-hand traffic: loops drive on the right; roundabouts circulate counter-clockwise on the map.
- `tools/add-curves.mjs` adds the curves, roundabouts and loops to a city (idempotent; `gen-city.mjs` keeps working). Mix in Lagos Mainland: 3 curved roads of 9 (Yaba Crescent, Unity Crescent, Ikeja Bend), 4 roundabouts; by length the city is still mostly straight (tested). Curves avoid buildings (tested), so no house was moved. Real-world layouts (for example Lekki-Ikoyi Bridge approach) are NOT modelled; these shapes are fictional.

## Who uses it
3D world (`world.js`: road ribbons with kerbs, roundabout rings with island, palm and dashed lane circle, no zebra box at roundabouts, island collider), traffic (`path.js`: `makePath` with `dense` and `slow`), minimap and full map (`map.js`, `map-model.js`: polylines, circles, labels along the curve, search, hit test), road name under the player, bots (straight roads only). Yielding, the future crash rule, street lights and bus stops should use `roadAt()` / `roadPts()`.

## Cars
Cars follow the loop polyline. Bends slow them: `bendFactor(radius)` goes from 1 (radius 40 m or more) down to 0.55 (radius 7 m or less) (ESTIMATE). Time along the path is deterministic from server time, so every client sees the same cars. Mobile cost: curve ribbons are about 50 to 100 vertices each, roundabouts 48 segments; no per-frame work added.
