// Abule (10 Oct 2026): a fictional generic village in Ogun State: huts, market square, well, stream with footbridge, farm work, goat pen, chapel, cheap homes.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { makeServer, mkUser, ok, call, at } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { cityIdOf, enterCity } from '../server/core/cities.js';
import { validateCity } from '../server/core/city.js';
import { cropRows, palmSpots } from '../client/src/landmarks3d.js';

const raw = JSON.parse(fs.readFileSync(new URL('../server/config/cities/ogun-abule.json', import.meta.url))); const hb = (s, u) => ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
const avg = (c) => c.properties.reduce((a, p) => a + p.rent, 0) / c.properties.length;

test('Abule is registered, valid, in Ogun State, light (few buildings, no airport) and has the village pieces', () => {
  const s = makeServer(); const c = s.app.cities['ogun-abule']; assert.ok(c); assert.deepEqual(validateCity(raw), []); assert.equal(c.state, 'Ogun'); assert.equal(c.airport, undefined);
  assert.ok(c.buildings.length <= 60 && c.roads.length <= 8 && c.trafficLoops.length <= 4, 'a village is lighter than a town'); assert.ok(c.buildings.filter(b => b.kind === 'hut').length >= 8, 'huts'); assert.ok(c.properties.length >= 6 && c.shops.length >= 3 && c.venues.length >= 2 && c.billboards.length >= 3 && c.spawns.length >= 3);
  const kinds = new Set(c.landmarks.map(l => l.kind)); for (const k of ['plaza', 'farm', 'pen', 'well', 'palmline', 'clinic']) assert.ok(kinds.has(k), k);
  const ch = c.buildings.find(b => b.model === 'chapel'); assert.ok(ch && ch.sacred, 'a chapel with a sacred buffer'); assert.ok(c.billboards.every(b => Math.hypot(b.x - ch.x, b.z - ch.z) > 45), 'no billboard near the chapel');
});
test('the stream cannot be waded: only the road gap and the footbridge cross it, and they match', () => {
  const k = raw.creeks[0]; assert.equal(k.gaps.length, 1); const road = raw.roads.find(r => r.z1 === 0 && r.z2 === 0); assert.ok(k.gaps[0][1] - k.gaps[0][0] >= road.width - 0.5 && k.gaps[0][1] - k.gaps[0][0] <= road.width + 1.5, 'gap as wide as the road');
  const br = raw.bridges[0]; assert.ok(br.a < k.x0 && br.b > k.x1 && br.z === 0 && br.width === road.width, 'footbridge spans the stream on the road');
  for (const b of raw.buildings) assert.ok(b.x + b.w / 2 < k.x0 - 1 || b.x - b.w / 2 > k.x1 + 1, `${b.id} is not in the stream`);
});
test('housing is the cheapest in the game and farm work is real work paid through the ledger', async () => {
  const s = makeServer(); const ab = avg(s.app.cities['ogun-abule']); for (const id of ['ogun-ijebu', 'ogun-shagamu', 'ogun-abeokuta', 'lagos-mainland']) assert.ok(ab < avg(s.app.cities[id]), `cheaper than ${id}`);
  const job = s.app.balance.jobs.find(j => j.id === 'farm'); assert.ok(job && job.location === 'job_farm'); const jp = s.app.cities['ogun-abule'].jobs.find(j => j.id === 'job_farm'); assert.ok(jp);
  const u = mkUser(s, { cash: 100, ageMs: 10 * 60000 }); enterCity(s.app, u, 'ogun-abule'); at(s, u, jp.x, jp.z); await hb(s, u); const c0 = balanceOf(s.db, cashId(u));
  await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'farm' } }); s.app.clock.advance(job.durationSec * 1000 + 1000); const r = await ok(s, 'POST', '/api/jobs/claim', { uid: u }); assert.ok(r.wage >= job.wage); assert.ok(balanceOf(s.db, cashId(u)) >= c0 + job.wage); checkInvariants(s.db);
  const lagosJobs = (await ok(s, 'GET', '/api/jobs', { uid: u })).jobs.map(j => j.id); assert.ok(lagosJobs.includes('farm'), 'farm work is offered in Abule');
});
test('the road from Ijebu Ode: a fare through the ledger, you arrive outside the gate, and you can drive back', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 2000, ageMs: 10 * 60000 }); enterCity(s.app, u, 'ogun-ijebu'); const gate = s.app.cities['ogun-ijebu'].links.find(l => l.to === 'ogun-abule'); assert.ok(gate); at(s, u, gate.x, gate.z); await hb(s, u);
  const c0 = balanceOf(s.db, cashId(u)); await ok(s, 'POST', '/api/cities/link', { uid: u, body: { linkId: gate.id, idem: 'ab1' } }); assert.equal(cityIdOf(s.app, u), 'ogun-abule'); assert.equal(balanceOf(s.db, cashId(u)), c0 - gate.fare); await hb(s, u);
  const back = s.app.cities['ogun-abule'].links[0]; assert.equal(back.to, 'ogun-ijebu'); at(s, u, back.x, back.z); await hb(s, u); await ok(s, 'POST', '/api/cities/link', { uid: u, body: { linkId: back.id } }); assert.equal(cityIdOf(s.app, u), 'ogun-ijebu'); checkInvariants(s.db);
  assert.equal((await call(s, 'POST', '/api/cities/link', { uid: u, body: { linkId: 'to-nowhere' } })).status === 200, false);
});
test('scenery helpers: crops stay inside the farm, palms line the road and leave the stream and the well road clear', () => {
  const f = raw.landmarks.find(l => l.kind === 'farm'); const crops = cropRows(f); assert.ok(crops.length >= 100); for (const p of crops) assert.ok(Math.abs(p.x - f.cx) <= f.w / 2 && Math.abs(p.z - f.cz) <= f.d / 2);
  const pl = raw.landmarks.find(l => l.kind === 'palmline'); const ps = palmSpots(pl); assert.ok(ps.length >= 30); for (const p of ps) { assert.ok(!(p.x > 48 && p.x < 80), 'not in the stream'); assert.equal(Math.abs(p.z - pl.z), pl.off); }
  for (const b of raw.buildings) for (const p of ps) assert.ok(!(Math.abs(p.x - b.x) < b.w / 2 && Math.abs(p.z - b.z) < b.d / 2), `a palm stands inside ${b.id}`);
});
