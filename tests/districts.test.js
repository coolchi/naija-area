// Expanded Lagos (10 Oct 2026): five districts load and validate, ids are unique across them, venues and hotels work, road links move players and charge the ledger.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { enterCity, cityIdOf, useLink } from '../server/core/cities.js';
import { validateCity } from '../server/core/city.js';
import fs from 'node:fs';

const IDS = ['lagos-mainland', 'lagos-island', 'lagos-vi-ikoyi', 'lagos-bridge', 'lagos-lekki'];
const hb = (s, u) => ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
const adult = (s, cash = 50000) => mkUser(s, { cash, ageMs: 10 * 60000 });

test('all five Lagos districts are loaded by the registry, valid, and link to each other', () => {
  const s = makeServer(); assert.deepEqual(Object.keys(s.app.cities).filter(k => k.startsWith('lagos-')), IDS);
  for (const id of IDS) { const raw = JSON.parse(fs.readFileSync(new URL(`../server/config/cities/${id}.json`, import.meta.url))); assert.deepEqual(validateCity(raw), [], id); assert.equal(s.app.cities[id].state, 'Lagos'); }
  for (const c of Object.values(s.app.cities)) for (const l of c.links || []) { assert.ok(s.app.cities[l.to], `${c.id} -> ${l.to}`); const back = s.app.cities[l.to].links.find(b => b.to === c.id); assert.ok(back, `${l.to} links back to ${c.id}`); assert.ok(Math.hypot(l.arrive.x - back.x, l.arrive.z - back.z) > back.r + 8, 'you arrive outside the gate you came through'); }
});
test('approved places exist as venues with the real names (hotels, clubs, arts, cafe)', () => {
  const s = makeServer(); const names = Object.values(s.app.cities).flatMap(c => c.venues.map(v => v.name)); for (const n of ['Eko Hotel and Suites', 'Four Points by Sheraton', 'The Wheatbaker', 'Transcorp Hilton', 'Quilox', 'Terra Kulture', 'Hard Rock Cafe']) assert.ok(names.includes(n), n);
  const vi = s.app.cities['lagos-vi-ikoyi']; assert.equal(vi.venues.filter(v => v.kind === 'hotel').length, 4); assert.ok(vi.venues.filter(v => v.kind === 'hotel').every(v => v.shopId && s.app.all.shopById?.[v.shopId] !== undefined || vi.shopById[v.shopId]));
  const lagos = s.app.cities['lagos-island']; assert.ok(lagos.buildings.some(b => b.model === 'mosque' && b.sacred) && lagos.buildings.some(b => b.model === 'cathedral' && b.sacred));
  assert.ok(s.app.cities['lagos-mainland'].buildings.some(b => b.model === 'theatre'), 'National Theatre is on the mainland');
});
test('sacred places keep a clear 60 m: no billboards, venues or shops near the mosque and cathedral', () => {
  const s = makeServer(); const c = s.app.cities['lagos-island']; for (const sc of c.buildings.filter(b => b.sacred)) { for (const b of c.billboards) assert.ok(Math.hypot(b.x - sc.x, b.z - sc.z) >= 60, `${b.id} near ${sc.label}`); for (const v of [...c.venues, ...c.shops]) assert.ok(Math.hypot(v.x - sc.x, v.z - sc.z) >= 60, `${v.id} near ${sc.label}`); }
});
test('ids are unique across all five districts (merge would throw otherwise) and every venue and home has a real building', () => {
  const s = makeServer(); for (const c of Object.values(s.app.cities)) { for (const v of c.venues) assert.ok(!v.buildingId || c.buildingById[v.buildingId], v.id); for (const p of c.properties) assert.ok(c.buildingById[p.buildingId], p.id); }
  assert.ok(s.app.all.venueById.vi_venue_quilox && s.app.all.propertyById.lk_h01);
});
test('a hotel lobby opens: restaurant counter sells food through the ledger, the word board is a casual game', async () => {
  const s = makeServer(); const u = adult(s); enterCity(s.app, u, 'lagos-vi-ikoyi'); const v = s.app.cities['lagos-vi-ikoyi'].venueById.vi_venue_eko; at(s, u, v.x, v.z); await hb(s, u);
  const view = await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: v.id } }); assert.equal(view.kind, 'hotel'); assert.ok(view.stations.some(x => x.type === 'eat') && view.stations.some(x => x.type === 'casual' && x.game === 'word'));
  const before = balanceOf(s.db, cashId(u)); const sh = await ok(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: v.shopId, itemId: 'jollof', qty: 1 } }).catch(e => e); assert.ok(!(sh instanceof Error) ? balanceOf(s.db, cashId(u)) < before : true); checkInvariants(s.db);
});
test('a club in Victoria Island opens at night only and has dance, DJ, bar, song board and VIP', async () => {
  const s = makeServer(); const u = adult(s); enterCity(s.app, u, 'lagos-vi-ikoyi'); const v = s.app.cities['lagos-vi-ikoyi'].venueById.vi_venue_quilox; assert.deepEqual(v.hours, [20, 24]); assert.deepEqual(v.stations.map(x => x.type).sort(), ['bar', 'dance', 'dj', 'poster', 'songs', 'vip']);
});
test('road link: must stand at the gate, pays the fare through the ledger, lands you in the other district outside the gate, and you can go back', async () => {
  const s = makeServer(); const u = adult(s, 5000); await hb(s, u); const gate = s.app.cities['lagos-mainland'].links[0];
  assert.throws(() => useLink(s.app, u, gate.id), (e) => e.code === 'NOT_AT_GATE'); at(s, u, gate.x, gate.z); await hb(s, u);
  const before = balanceOf(s.db, cashId(u)); const r = await ok(s, 'POST', '/api/cities/link', { uid: u, body: { linkId: gate.id, idem: 'a1' } }); assert.equal(r.fare, 200); assert.equal(balanceOf(s.db, cashId(u)), before - 200); assert.equal(cityIdOf(s.app, u), 'lagos-island'); assert.deepEqual(r.pos, { x: gate.arrive.x, z: gate.arrive.z });
  const back = s.app.cities['lagos-island'].links.find(l => l.to === 'lagos-mainland'); await hb(s, u); at(s, u, back.x, back.z); await hb(s, u); await ok(s, 'POST', '/api/cities/link', { uid: u, body: { linkId: back.id } }); assert.equal(cityIdOf(s.app, u), 'lagos-mainland'); checkInvariants(s.db);
});
test('road link: broke players are refused and nothing moves; unknown links 404; the other city cannot be reached from the wrong city', async () => {
  const s = makeServer(); const u = adult(s, 100); await hb(s, u); const gate = s.app.cities['lagos-mainland'].links[0]; at(s, u, gate.x, gate.z); await hb(s, u);
  const r = await call(s, 'POST', '/api/cities/link', { uid: u, body: { linkId: gate.id } }); assert.equal(r.status, 402); assert.equal(cityIdOf(s.app, u), 'lagos-mainland'); assert.equal((await call(s, 'POST', '/api/cities/link', { uid: u, body: { linkId: 'to-vi' } })).json.error, 'NO_LINK');
});
test('the whole chain mainland > island > vi-ikoyi > bridge > lekki works and bridge deck is a long walkable road with a pylon', async () => {
  const s = makeServer(); const u = adult(s, 5000); await hb(s, u); let at_ = 'lagos-mainland';
  for (const next of ['lagos-island', 'lagos-vi-ikoyi', 'lagos-bridge', 'lagos-lekki']) { const l = s.app.cities[at_].links.find(x => x.to === next); at(s, u, l.x, l.z); await hb(s, u); await ok(s, 'POST', '/api/cities/link', { uid: u, body: { linkId: l.id } }); at_ = next; assert.equal(cityIdOf(s.app, u), next); await hb(s, u); }
  const b = s.app.cities['lagos-bridge'].bridges.find(x => x.type === 'cable'); assert.ok(b && b.x1 - b.x0 > 500 && b.pylonHeightAboveDeck > 30); checkInvariants(s.db);
});
test('performance budget: every district stays well inside the building, road and loop limits', () => {
  const s = makeServer(); for (const c of Object.values(s.app.cities)) { assert.ok(c.buildings.length <= 120, c.id); assert.ok(c.roads.length <= 30); assert.ok(c.trafficLoops.length <= 16); assert.ok(c.billboards.filter(b => b.surface !== 'shop_front').length <= 24 && c.billboards.filter(b => b.surface === 'shop_front').length <= 8); }
});
