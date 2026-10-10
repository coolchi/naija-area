// Rain must stay light and see-through (bug of 10 Oct 2026: the fog base was re-read every heartbeat, so rain shrank the fog until the screen was one flat colour). Numbers: client/src/weather-config.js.
import test from 'node:test'; import assert from 'node:assert/strict'; import * as THREE from 'three';
import { Weather } from '../client/src/weather.js';
import { LOOK, WEATHER_VIEW as V, fogDistances, lightScale, visibleShare } from '../client/src/weather-config.js';

const mkScene = () => { const sc = new THREE.Scene(); sc.fog = new THREE.Fog(new THREE.Color('#9fd3ee'), 140, 520); sc.background = new THREE.Color('#8fd0f5'); const sun = new THREE.DirectionalLight(0xffffff, 1.55), hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1); sc.add(sun, hemi); return { sc, sun, hemi }; };
/** what main.js does on every heartbeat: world.setTime resets the colours and light intensities (NOT the fog distances), then weather.apply + afterTime */
function beat(w, sc, sun, hemi, wx) { sc.background = new THREE.Color('#8fd0f5'); sc.fog.color.set('#8fd0f5'); sun.intensity = 1.55; hemi.intensity = 1; w.apply(wx); w.afterTime(); }

for (const [state, s] of [['rain', 2], ['storm', 3]]) {
  test(`${state}: after hundreds of heartbeats and frames the fog never drops below the floors, and players within ${V.visibleM} m stay clearly visible`, () => {
    const { sc, sun, hemi } = mkScene(); const w = new Weather(sc, { night: 0 }); const cam = { position: new THREE.Vector3(0, 8, 0) }; let minNear = 1e9, minFar = 1e9;
    for (let beatN = 0; beatN < 300; beatN++) { beat(w, sc, sun, hemi, { s }); for (let f = 0; f < 5; f++) { w.update(0.6, cam); minNear = Math.min(minNear, sc.fog.near); minFar = Math.min(minFar, sc.fog.far); } }
    assert.ok(minNear >= V.minNear - 1e-9, `near ${minNear}`); assert.ok(minFar >= V.minFar - 1e-9, `far ${minFar}`);
    assert.ok(visibleShare(V.visibleM, sc.fog.near, sc.fog.far) >= V.minVisiblePct, 'a player 40 m away keeps their colour');
    assert.ok(sc.fog.near >= V.visibleM, 'fog has not even started at 40 m'); assert.ok(sc.fog.far <= 520 && sc.fog.near <= 140, 'never further than clear weather');
    assert.ok(sun.intensity >= 1.55 * LOOK[state].dim - 1e-9 && sun.intensity <= 1.55 * (1 + V.flashMax) + 1e-9, 'light neither blown out nor black: ' + sun.intensity);
  });
}
test('the fog base is read once: repeated afterTime calls give the same distances every time (the original bug compounded them)', () => {
  const { sc, sun, hemi } = mkScene(); const w = new Weather(sc, { night: 0 }); const cam = { position: new THREE.Vector3() }; const seen = [];
  for (let i = 0; i < 40; i++) { beat(w, sc, sun, hemi, { s: 3 }); for (let f = 0; f < 200; f++) w.update(0.1, cam); seen.push([+sc.fog.near.toFixed(3), +sc.fog.far.toFixed(3)]); }
  assert.deepEqual(seen[39], seen[10]); assert.deepEqual(seen[39], [140 * LOOK.storm.fog, 520 * (V.farBase + V.farSlope * LOOK.storm.fog)].map(x => +x.toFixed(3)));
  assert.equal(w.fog0.near, 140); assert.equal(w.fog0.far, 520);
  // and it comes back to the clear distances when the rain stops
  for (let i = 0; i < 6; i++) { beat(w, sc, sun, hemi, { s: 0 }); for (let f = 0; f < 200; f++) w.update(0.1, cam); } assert.ok(Math.abs(sc.fog.near - 140) < 1 && Math.abs(sc.fog.far - 520) < 1);
});
test('night rain: the base is the same, the sky grey is dark but the fog still starts beyond the visibility distance', () => {
  const { sc, sun, hemi } = mkScene(); const w = new Weather(sc, { night: 1 }); const cam = { position: new THREE.Vector3() };
  for (let i = 0; i < 50; i++) { beat(w, sc, sun, hemi, { s: 3 }); for (let f = 0; f < 20; f++) w.update(0.5, cam); } assert.ok(sc.fog.near >= V.visibleM && sc.fog.far >= V.minFar);
});
test('clamps: fogDistances, lightScale and the flash cap hold for any input; every state is lighter than the pre-fix numbers', () => {
  for (const base of [[140, 520], [10, 50], [0, 1], [300, 900]]) for (const k of [0, 0.01, 0.4, 0.7, 1, 2]) { const d = fogDistances(base[0], base[1], k); assert.ok(d.near >= V.minNear && d.far >= V.minFar && d.near <= d.far, JSON.stringify([base, k, d])); }
  assert.equal(lightScale(1, 0), 1); assert.ok(Math.abs(lightScale(1, 1) - (1 + V.flashMax)) < 1e-12); assert.ok(lightScale(1, 99) <= 1 + V.flashMax + 1e-12); assert.equal(lightScale(0.7, -5), 0.7);
  assert.ok(V.flashMax <= 0.5 && V.rainOpacity <= 0.35 && V.visibleM >= 40);
  assert.ok(LOOK.rain.fog >= 0.85 && LOOK.storm.fog >= 0.7 && LOOK.storm.dim >= 0.7 && LOOK.rain.dim >= 0.8 && LOOK.storm.grey <= 0.6);
  for (const st of Object.values(LOOK)) { const d = fogDistances(140, 520, st.fog); assert.ok(visibleShare(V.visibleM, d.near, d.far) >= V.minVisiblePct); }
});
