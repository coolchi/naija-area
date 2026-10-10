// Kano (10 Oct 2026): second air hub, northern city, content care (no alcohol, betting or clubs), scenery helpers.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { makeServer, mkUser, ok, call, at, newAdvertiser, submitAd, HOUR } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { validateCity } from '../server/core/city.js';
import { wallSegments, dyePitSpots } from '../client/src/landmarks3d.js';
import * as flight from '../server/core/flight.js';

const raw = JSON.parse(fs.readFileSync(new URL('../server/config/cities/kano.json', import.meta.url)));
const hb = (s, u) => ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });

test('Kano is registered, valid, in Kano State, with its own airport shaped like Lagos', () => {
  const s = makeServer(); const k = s.app.cities.kano; assert.ok(k); assert.deepEqual(validateCity(raw), []); assert.equal(k.state, 'Kano'); assert.equal(k.cityName, 'Kano'); assert.equal(k.kind, 'city');
  const A = k.airport; assert.ok(A && A.runway && A.apron && A.arrive && A.door); assert.ok(k.buildings.some(b => b.kind === 'airport')); assert.ok(A.arrive.x >= k.bounds.minX && A.arrive.x <= k.bounds.maxX && A.arrive.z >= k.bounds.minZ && A.arrive.z <= k.bounds.maxZ);
  for (const b of k.buildings) assert.ok(b.x - b.w / 2 >= k.bounds.minX && b.x + b.w / 2 <= k.bounds.maxX && b.z - b.d / 2 >= k.bounds.minZ && b.z + b.d / 2 <= k.bounds.maxZ, b.id);
  assert.ok(k.buildings.length <= 120 && k.roads.length <= 30 && k.trafficLoops.length <= 16 && k.billboards.length <= 24 && k.billboards.length >= 6, 'inside the budget, with ad inventory');
  assert.ok(k.venues.length >= 2 && k.shops.length >= 3 && k.properties.length >= 10 && k.jobs.length >= 3 && k.spawns.length >= 3);
});
test('flights: Lagos to Kano is on the departure board at the cross-state fare, you fly and land at the Kano airport, and back', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 40000, ageMs: 10 * 60000 }); const L = s.app.cities['lagos-mainland'].airport; at(s, u, L.door.x, L.door.z + 3); await hb(s, u);
  const v = await ok(s, 'GET', '/api/flights', { uid: u }); const d = v.destinations.find(x => x.id === 'kano'); assert.ok(d); assert.equal(d.fare, s.app.balance.flight.fares.otherState); assert.equal(d.state, 'Kano');
  const c0 = balanceOf(s.db, cashId(u)); await ok(s, 'POST', '/api/flights/buy', { uid: u, body: { to: 'kano', departAt: d.slots[0], idem: 'k1' } }); assert.equal(balanceOf(s.db, cashId(u)), c0 - d.fare);
  s.app.clock.advance(d.slots[0] - s.app.clock.now() + 1000); flight.tick(s.app, u); assert.equal(flight.isFlying(s.app, u), true); s.app.clock.advance(s.app.balance.flight.flightMs + 1000); flight.tick(s.app, u);
  const p = s.app.world.players.get(u); assert.equal(p.city, 'kano'); const A = s.app.cities.kano.airport; assert.ok(Math.hypot(p.x - A.arrive.x, p.z - A.arrive.z) < 1); checkInvariants(s.db);
  s.app.clock.advance(s.app.balance.flight.cooldownMs + 1000); const back = await ok(s, 'GET', '/api/flights', { uid: u }); assert.equal(back.airport.id, 'ap_kano'); assert.ok(back.airport.here); assert.ok(back.destinations.some(x => x.id === 'lagos-mainland'));
});
test('content care: no clubs, bars, dancing, VIP or betting anywhere in Kano; no alcohol or gambling words in names or menus', () => {
  const s = makeServer(); const k = s.app.cities.kano; assert.equal(k.contentRules.noAlcohol && k.contentRules.noBetting && k.contentRules.noClubs, true);
  for (const v of k.venues) { assert.notEqual(v.kind, 'club'); for (const st of v.stations) assert.ok(!['dance', 'dj', 'bar', 'songs', 'vip'].includes(st.type), `${v.id} ${st.type}`); }
  const text = JSON.stringify({ n: k.name, v: k.venues.map(v => [v.name, v.blurb, v.stations.map(x => [x.label, x.text])]), s: k.shops.map(x => [x.name, x.desc, (x.items || []).map(i => i.name)]), l: k.landmarks.map(l => l.name), b: k.buildings.map(b => b.label), p: k.properties.map(p => p.name) }).toLowerCase();
  for (const w of ['beer', 'wine', 'whisky', 'vodka', 'palm wine', 'gin ', 'lager', 'casino', 'betting', 'lottery', 'nightclub', 'club', 'bar ', 'liquor']) assert.ok(!text.includes(w), `found "${w}"`);
});
test('Hausa text is only a placeholder greeting and says so (a Kano contributor must review it)', () => {
  const s = makeServer(); const k = s.app.cities.kano; const strings = []; for (const v of k.venues) strings.push(v.blurb, ...v.stations.map(x => x.text || '')); const hausa = strings.filter(t => /sannu|barka|nagode|ina kwana/i.test(t)); assert.ok(hausa.length >= 1 && hausa.length <= 3, 'a few greetings at most'); for (const t of hausa) assert.match(t, /placeholder/i);
  assert.ok(fs.readFileSync(new URL('../docs/KANO.md', import.meta.url), 'utf8').includes('review'), 'docs ask for local review');
});
test('ads in restricted categories are rejected automatically for Kano, but only flagged for human review elsewhere', async () => {
  const s = makeServer(); const key = await newAdvertiser(s);
  const k = await submitAd(s, key, { headline: 'Casino night this weekend', cityId: 'kano' }); assert.equal(k.status, 200, JSON.stringify(k.json)); assert.equal(k.json.campaign.status, 'rejected'); assert.match(k.json.campaign.rejectReason, /does not allow/);
  const l = await submitAd(s, key, { headline: 'Casino night this weekend', cityId: 'lagos-mainland' }); assert.equal(l.status, 200); assert.notEqual(l.json.campaign.status, 'rejected'); assert.ok(JSON.stringify(l.json.campaign.flags).includes('restricted_category'));
  const ok2 = await submitAd(s, key, { headline: 'Fresh suya every day', cityId: 'kano' }); assert.notEqual(ok2.json.campaign.status, 'rejected');
});
test('the northern canteen sells northern food through the normal shop flow', async () => {
  const s = makeServer(); const k = s.app.cities.kano; const v = k.venueById.kn_venue_canteen; const shop = s.app.all.shopById[v.shopId]; assert.ok(shop.items.some(i => i.id === 'tuwo') && shop.items.some(i => i.id === 'kunu'));
  const u = mkUser(s, { cash: 5000, ageMs: 10 * 60000 }); const { enterCity } = await import('../server/core/cities.js'); enterCity(s.app, u, 'kano'); at(s, u, shop.x, shop.z); await hb(s, u); const c0 = balanceOf(s.db, cashId(u));
  await ok(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: shop.id, itemId: 'tuwo', qty: 1 } }); assert.ok(balanceOf(s.db, cashId(u)) < c0); checkInvariants(s.db);
});
test('old city wall: solid stretches leave every gate open; dye pits sit inside their yard', () => {
  const w = raw.landmarks.find(l => l.id === 'oldwall_s'); const segs = wallSegments(w); for (const g of w.gates) assert.ok(!segs.some(s => s.a < g + 8 && s.b > g - 8), `gate ${g} is open`); assert.ok(segs.length >= 3 && segs[0].a === w.x0 && segs.at(-1).b === w.x1);
  const wz = raw.landmarks.find(l => l.id === 'oldwall_w'); assert.ok(wallSegments(wz).every(s => s.b > s.a));
  const d = raw.landmarks.find(l => l.kind === 'dyepits'); const spots = dyePitSpots(d); assert.equal(spots.length, d.n); for (const p of spots) { assert.ok(Math.abs(p.x - d.cx) <= d.w / 2 && Math.abs(p.z - d.cz) <= d.d / 2); assert.ok(p.r > 0.5); }
  for (let i = 0; i < spots.length; i++) for (let j = i + 1; j < spots.length; j++) assert.ok(Math.hypot(spots[i].x - spots[j].x, spots[i].z - spots[j].z) > spots[i].r + spots[j].r, 'pits do not overlap');
  const hill = raw.landmarks.find(l => l.kind === 'hill'); assert.ok(hill.cz + hill.r < raw.bounds.minZ - 10 || hill.cz - hill.r > raw.bounds.maxZ, 'Dala Hill is scenery beyond the walkable edge');
});
void HOUR; void call;
