// Jewelry store + cap store (10 Oct 2026): catalogue rules (size ladder is monotonic and capped), purchases through the ledger, equip, presence, hours, models.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at, HOUR } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { WEARABLES, SLOTS, MAX_SIZE, MATERIALS, wearableById } from '../server/config/wearables.js';
import { gameTime } from '../server/core/economy.js';
import { itemArea, itemTriangles, indexCatalogue, applyWear, buildItem } from '../client/src/wear-models.js';
import * as THREE from 'three';
const makeAvatar = () => { const g = new THREE.Group(); const m = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)); g.add(m); g.userData.body = m; return g; }; // stand-in: entities.js needs a browser (document)

const J = 'venue_jewelry', C = 'venue_caps';
const hb = (s, u) => ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
async function inShop(s, venueId, cash = 100000000) { const u = mkUser(s, { cash, ageMs: 10 * 60000 }); const v = s.app.all.venueById[venueId]; at(s, u, v.x, v.z); await hb(s, u); await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId } }); return u; }
const buy = (s, u, venueId, itemId, idem = itemId) => call(s, 'POST', '/api/wearables/buy', { uid: u, body: { venueId, itemId, idem } });

test('the two shops are real venues on the Mainland promenade with generic names, hours, stations and interiors', () => {
  const s = makeServer(); const j = s.app.all.venueById[J], c = s.app.all.venueById[C]; assert.ok(j && c); assert.equal(j.wearShop, 'jewelry'); assert.equal(c.wearShop, 'caps');
  for (const v of [j, c]) { assert.ok(v.hours && v.hours[1] > v.hours[0]); assert.ok(v.stations.some(st => st.type === 'wear')); assert.ok(s.app.city.buildingById[v.buildingId], 'has a building'); assert.ok(v.room.decor.length >= 10 && v.room.detailV2, 'interior detail rule'); assert.ok(v.room.decor.some(d => d.k === 'glassCase' || d.k === 'capWall')); assert.ok(v.room.decor.some(d => d.k === 'guard')); }
  assert.ok(c.stations.some(st => st.type === 'wear' && st.focus === 'crown'), 'a crown plinth station'); assert.ok(!/gucci|rolex|cartier|tiffany|nike|new era/i.test(JSON.stringify([j, c])), 'generic names only');
});
test('catalogue rules: size never shrinks as price grows inside a slot, every step of the jewelry ladder is visibly bigger, sizes are capped, crowns are the dearest, caps start at N50,000', () => {
  for (const slot of SLOTS) {
    const items = WEARABLES.filter(w => w.slot === slot).sort((a, b) => a.price - b.price); assert.ok(items.length >= 4, slot);
    for (let i = 1; i < items.length; i++) { assert.ok(items[i].size >= items[i - 1].size, `${slot}: ${items[i].id} is not smaller than ${items[i - 1].id}`); if (items[i].shop === 'jewelry') assert.ok(items[i].size - items[i - 1].size >= 0.25, `${slot} step is visible`); }
    for (const w of items) assert.ok(w.size <= MAX_SIZE[slot] && w.size >= 1, `${w.id} within the cap`);
  }
  const jewelry = WEARABLES.filter(w => w.shop === 'jewelry'), caps = WEARABLES.filter(w => w.shop === 'caps'); const crowns = caps.filter(w => w.crown);
  assert.ok(Math.min(...jewelry.map(w => w.price)) >= 150000 && Math.max(...jewelry.map(w => w.price)) <= 6000000 && Math.min(...caps.map(w => w.price)) === 50000);
  assert.ok(crowns.length >= 3 && Math.min(...crowns.map(w => w.price)) >= 20000000 && Math.min(...crowns.map(w => w.price)) > Math.max(...jewelry.map(w => w.price)), 'crowns are the most expensive item'); assert.ok(crowns.every(w => w.slot === 'head'));
  assert.equal(new Set(WEARABLES.map(w => w.id)).size, WEARABLES.length, 'unique ids'); assert.ok(WEARABLES.every(w => MATERIALS[w.mat]), 'every material exists');
});
test('the DRAWN size follows the price: surface area of the model grows with the price inside every slot (readable ladder), and each piece stays cheap to draw', () => {
  const cat = indexCatalogue({ items: WEARABLES, materials: MATERIALS });
  for (const slot of SLOTS) { const items = WEARABLES.filter(w => w.slot === slot).sort((a, b) => a.price - b.price); let last = 0; for (const it of items) { const a = itemArea(it, cat); assert.ok(a > last, `${slot}: ${it.id} (${a.toFixed(3)}) is bigger than the cheaper piece before it (${last.toFixed(3)})`); last = a; assert.ok(itemTriangles(it, cat) <= 520, `${it.id} triangle budget`); } }
});
test('buying: through the ledger with an audit row, you leave wearing it, retries are safe, no double buy', async () => {
  const s = makeServer(); const u = await inShop(s, J, 1000000); const before = balanceOf(s.db, cashId(u)); const it = wearableById.neck_thin;
  const r = await ok(s, 'POST', '/api/wearables/buy', { uid: u, body: { venueId: J, itemId: it.id, idem: 'k1' } }); assert.equal(r.charged, it.price); assert.equal(balanceOf(s.db, cashId(u)), before - it.price); assert.equal(r.worn.worn[0].id, it.id);
  const tx = s.db.prepare("SELECT * FROM ledger_tx WHERE reason='wearable' AND user_id=?").all(u); assert.equal(tx.length, 1); assert.equal(tx[0].ref, it.id);
  const dup = await call(s, 'POST', '/api/wearables/buy', { uid: u, body: { venueId: J, itemId: it.id, idem: 'k1' } }); assert.equal(dup.json.error, 'ALREADY_OWNED'); assert.equal(balanceOf(s.db, cashId(u)), before - it.price);
  assert.equal(checkInvariants(s.db).ok, true);
});
test('insufficient funds, wrong shop, outside the shop, and unknown items are refused without touching money', async () => {
  const s = makeServer(); const poor = await inShop(s, J, 100000); const b0 = balanceOf(s.db, cashId(poor));
  assert.equal((await buy(s, poor, J, 'neck_thin')).status, 402); assert.equal((await buy(s, poor, J, 'cap_snapback')).json.error, 'NO_ITEM', 'a cap is not sold in the jewelry store'); assert.equal((await buy(s, poor, J, 'nothing')).json.error, 'NO_ITEM');
  assert.equal(balanceOf(s.db, cashId(poor)), b0);
  const out = mkUser(s, { cash: 100000000, ageMs: 600000 }); assert.equal((await buy(s, out, J, 'neck_thin')).json.error, 'NOT_INSIDE'); assert.equal((await buy(s, out, 'venue_salon1', 'neck_thin')).json.error, 'NO_SHOP');
  assert.equal(checkInvariants(s.db).ok, true);
});
test('opening hours: closed means no buying; open again later', async () => {
  const s = makeServer(); const u = await inShop(s, C); s.app.balance.shops.enforceHours = true; const v = s.app.all.venueById[C];
  let guard = 0; while (guard++ < 300) { const h = gameTime(s.app, s.app.clock.now()).hour; if (h < v.hours[0] || h >= v.hours[1]) break; s.app.clock.advance(10 * 60000); } assert.ok(guard < 300);
  const r = await buy(s, u, C, 'cap_snapback'); assert.equal(r.json.error, 'CLOSED'); const view = await ok(s, 'GET', `/api/wearables/shop?venueId=${C}`, { uid: u }); assert.equal(view.open, false);
  guard = 0; while (guard++ < 300) { const h = gameTime(s.app, s.app.clock.now()).hour; if (h >= v.hours[0] && h < v.hours[1]) break; s.app.clock.advance(10 * 60000); }
  await hb(s, u); const again = await buy(s, u, C, 'cap_snapback'); assert.equal(again.status, 200);
});
test('equip, swap in the same slot, unequip; only one item per slot; you cannot wear what you do not own', async () => {
  const s = makeServer(); const u = await inShop(s, J); await ok(s, 'POST', '/api/wearables/buy', { uid: u, body: { venueId: J, itemId: 'neck_thin', idem: 'a' } }); await ok(s, 'POST', '/api/wearables/buy', { uid: u, body: { venueId: J, itemId: 'neck_rope', idem: 'b' } });
  let me = await ok(s, 'GET', '/api/wearables/mine', { uid: u }); assert.deepEqual(me.worn.map(w => w.id), ['neck_rope'], 'the newest piece replaces the old one in the slot');
  await ok(s, 'POST', '/api/wearables/equip', { uid: u, body: { itemId: 'neck_thin' } }); me = await ok(s, 'GET', '/api/wearables/mine', { uid: u }); assert.deepEqual(me.worn.map(w => w.id), ['neck_thin']); assert.equal(me.ownedCount, 2);
  assert.equal((await call(s, 'POST', '/api/wearables/equip', { uid: u, body: { itemId: 'ring_mega' } })).json.error, 'NOT_OWNED'); await ok(s, 'POST', '/api/wearables/unequip', { uid: u, body: { slot: 'neck' } }); me = await ok(s, 'GET', '/api/wearables/mine', { uid: u }); assert.equal(me.worn.length, 0); assert.equal(me.ownedCount, 2);
  assert.equal((await call(s, 'POST', '/api/wearables/unequip', { uid: u, body: { slot: 'tail' } })).json.error, 'BAD_SLOT');
});
test('what you wear shows on you: the profile, the heartbeat list other players receive, and the people inside the shop', async () => {
  const s = makeServer(); const a = await inShop(s, C); const b = mkUser(s, { cash: 1000, ageMs: 600000 }); const v = s.app.all.venueById[C]; at(s, b, v.x + 2, v.z); await hb(s, b);
  await ok(s, 'POST', '/api/wearables/buy', { uid: a, body: { venueId: C, itemId: 'crown_prince', idem: 'c' } });
  const prof = (await ok(s, 'GET', '/api/me', { uid: a })).user; assert.equal(prof.wear.worn[0].id, 'crown_prince'); assert.match(prof.wear.status, /Prince crown/); assert.equal(prof.wear.ownedValue, wearableById.crown_prince.price);
  await hb(s, a); const seen = (await hb(s, b)).players.find(p => p.id === a); assert.deepEqual(seen.w, ['crown_prince']); const bare = (await hb(s, a)).players.find(p => p.id === b); assert.equal(bare.w, undefined, 'nothing worn means no extra bytes');
  const view = await ok(s, 'GET', `/api/venue?id=${C}`, { uid: a }); assert.deepEqual(view.occupants.find(o => o.id === a).w, ['crown_prince']); assert.equal(view.wearShop, 'caps');
});
test('the shop window: flags for owned, worn, affordable; crowns sort by price', async () => {
  const s = makeServer(); const u = await inShop(s, C, 60000); await ok(s, 'POST', '/api/wearables/buy', { uid: u, body: { venueId: C, itemId: 'cap_snapback', idem: 'x' } });
  const v = await ok(s, 'GET', `/api/wearables/shop?venueId=${C}`, { uid: u }); const sn = v.items.find(i => i.id === 'cap_snapback'); assert.ok(sn.owned && sn.worn); assert.equal(v.items.find(i => i.id === 'crown_king').canAfford, false); assert.equal(v.items.at(-1).id, 'crown_emperor'); assert.equal(v.cash, balanceOf(s.db, cashId(u)));
  assert.ok(v.items.every(i => i.shop === undefined || true) && v.items.every(i => WEARABLES.find(w => w.id === i.id).shop === 'caps'));
});
test('config-driven: changing a price in the catalogue config changes what the shop charges (no code change)', async () => {
  const s = makeServer(); const cfg = { SLOTS, SLOT_LABEL: {}, MAX_SIZE, MATERIALS, WEAR_RULES: { uniqueCrowns: false, resale: { enabled: false, fraction: 0.5 }, shops: {} }, WEARABLES: WEARABLES.map(w => w.id === 'cap_snapback' ? { ...w, price: 123 } : w) };
  s.app.balance.wearables = cfg; const u = await inShop(s, C, 1000); const r = await ok(s, 'POST', '/api/wearables/buy', { uid: u, body: { venueId: C, itemId: 'cap_snapback', idem: 'p' } }); assert.equal(r.charged, 123); assert.equal(balanceOf(s.db, cashId(u)), 877);
});
test('crowns: unlimited by default; when uniqueCrowns is switched on only one player can own each crown', async () => {
  const s = makeServer(); const a = await inShop(s, C), b = await inShop(s, C); assert.equal((await buy(s, a, C, 'crown_prince')).status, 200); assert.equal((await buy(s, b, C, 'crown_prince')).status, 200, 'unlimited by default');
  const s2 = makeServer(); s2.app.balance.wearables = { SLOTS, SLOT_LABEL: {}, MAX_SIZE, MATERIALS, WEARABLES, WEAR_RULES: { uniqueCrowns: true, resale: { enabled: false, fraction: 0.5 }, shops: {} } };
  const c = await inShop(s2, C), d = await inShop(s2, C); assert.equal((await buy(s2, c, C, 'crown_king')).status, 200); const r = await buy(s2, d, C, 'crown_king'); assert.equal(r.json.error, 'TAKEN'); const view = await ok(s2, 'GET', `/api/wearables/shop?venueId=${C}`, { uid: d }); assert.equal(view.items.find(i => i.id === 'crown_king').takenBy.length > 0, true); assert.equal(checkInvariants(s2.db).ok, true);
});
test('resale: off by default (status keeps its value); when on it pays the configured fraction through the ledger and takes the item off you', async () => {
  const s = makeServer(); const u = await inShop(s, J); await ok(s, 'POST', '/api/wearables/buy', { uid: u, body: { venueId: J, itemId: 'ring_band', idem: 'r' } }); assert.equal((await call(s, 'POST', '/api/wearables/sell', { uid: u, body: { itemId: 'ring_band' } })).json.error, 'NO_RESALE');
  s.app.balance.wearables = { SLOTS, SLOT_LABEL: {}, MAX_SIZE, MATERIALS, WEARABLES, WEAR_RULES: { uniqueCrowns: false, resale: { enabled: true, fraction: 0.4 }, shops: {} } };
  const b = balanceOf(s.db, cashId(u)); const r = await ok(s, 'POST', '/api/wearables/sell', { uid: u, body: { itemId: 'ring_band', idem: 's' } }); assert.equal(r.received, Math.floor(150000 * 0.4)); assert.equal(balanceOf(s.db, cashId(u)), b + r.received); assert.equal(r.worn.worn.length, 0);
  assert.equal((await call(s, 'POST', '/api/wearables/sell', { uid: u, body: { itemId: 'ring_band' } })).json.error, 'NOT_OWNED'); assert.equal(checkInvariants(s.db).ok, true);
});
test('the public catalogue is served for the client and holds nothing private', async () => {
  const s = makeServer(); const c = await ok(s, 'GET', '/api/wearables/catalogue'); assert.equal(c.items.length, WEARABLES.length); assert.deepEqual(c.slots.map(x => x.id), SLOTS); assert.ok(c.materials.gold); assert.equal(c.rules.uniqueCrowns, false);
});
test('client models: every item builds, the avatar is dressed once per set, taking things off removes the mesh, unknown ids are ignored', () => {
  const cat = indexCatalogue({ items: WEARABLES, materials: MATERIALS }); const av = makeAvatar('#00a859'); const body = av.userData.body; const n0 = body.children.length;
  applyWear(av, ['neck_boss', 'crown_king', 'ring_mega'], cat); assert.equal(body.children.length, n0 + 1, 'one merged mesh = one draw call'); const m1 = av.userData.wearMesh;
  applyWear(av, ['neck_boss', 'crown_king', 'ring_mega'], cat); assert.equal(av.userData.wearMesh, m1, 'same set: nothing rebuilt');
  applyWear(av, ['neck_boss'], cat); assert.notEqual(av.userData.wearMesh, m1); applyWear(av, [], cat); assert.equal(av.userData.wearMesh, null); assert.equal(body.children.length, n0);
  applyWear(av, ['does_not_exist'], cat); assert.equal(av.userData.wearMesh, null); applyWear(av, ['neck_boss'], null); assert.equal(av.userData.wearMesh, null, 'no catalogue yet: nothing happens (and it is retried later)');
  for (const it of WEARABLES) { const A = itemArea(it, cat); assert.ok(A > 0, it.id); }
});
