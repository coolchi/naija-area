import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, DAY } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { profile } from '../server/core/economy.js';

async function setup() {
  const s = makeServer(); const owner = mkUser(s, { cash: 100000 }), guest = mkUser(s, { cash: 1000 }); const p = s.app.city.properties.filter(x => x.tier === 1)[0];
  at(s, owner, p.door.x, p.door.z); await ok(s, 'POST', '/api/property/acquire', { uid: owner, body: { propertyId: p.id, mode: 'rent' } }); await ok(s, 'POST', '/api/heartbeat', { uid: owner, body: {} }); await ok(s, 'POST', '/api/property/enter', { uid: owner });
  return { s, owner, guest, p };
}
async function letIn({ s, guest, p }) { at(s, guest, p.door.x, p.door.z); await ok(s, 'POST', '/api/heartbeat', { uid: guest, body: {} }); const k = await ok(s, 'POST', '/api/visit/knock', { uid: guest, body: { propertyId: p.id } }); await ok(s, 'POST', '/api/visit/respond', { uid: s.owner, body: { knockId: k.knockId, accept: true } }); }

test('decor: owner picks wall + floor colours, pays once per change, visitors see them, bad colours refused, ledger ok', async () => {
  const { s, owner, guest, p } = await setup(); const price = s.app.balance.decor.price; s.owner = owner;
  assert.equal((await call(s, 'POST', '/api/property/decor', { uid: guest, body: { propertyId: p.id, wall: 'sky' } })).json.error, 'NOT_OWNER'); assert.equal((await call(s, 'POST', '/api/property/decor', { uid: owner, body: { propertyId: p.id, wall: 'neon' } })).json.error, 'BAD_COLOUR');
  const before = balanceOf(s.db, cashId(owner)); const r = await ok(s, 'POST', '/api/property/decor', { uid: owner, body: { propertyId: p.id, wall: 'sky', floor: 'tile' } }); assert.equal(r.charged, price); assert.equal(balanceOf(s.db, cashId(owner)), before - price); assert.equal(r.wall.id, 'sky');
  const same = await ok(s, 'POST', '/api/property/decor', { uid: owner, body: { propertyId: p.id, wall: 'sky', floor: 'tile' } }); assert.equal(same.charged, 0);
  const inner = await ok(s, 'GET', `/api/property/${p.id}/interior`, { uid: owner }); assert.equal(inner.wall.id, 'sky'); assert.equal(inner.floor.id, 'tile'); assert.ok(inner.palette.walls.length >= 6 && inner.palette.floors.length >= 5);
  await letIn({ s, guest, p, owner }); const vin = await ok(s, 'GET', `/api/property/${p.id}/interior`, { uid: guest }); assert.equal(vin.wall.hex, s.app.balance.decor.walls.sky[1]); assert.equal(vin.palette, undefined);
  const prop = (await ok(s, 'GET', '/api/properties', { uid: guest })).properties.find(x => x.id === p.id); assert.equal(prop.floor.id, 'tile'); assert.equal(checkInvariants(s.db).ok, true);
});
test('love: guests (not strangers, not the owner) can love a house once a day; counts, mood, notification', async () => {
  const { s, owner, guest, p } = await setup(); s.owner = owner; const stranger = mkUser(s);
  assert.equal((await call(s, 'POST', '/api/visit/love', { uid: stranger, body: { propertyId: p.id } })).json.error, 'FORBIDDEN'); assert.equal((await call(s, 'POST', '/api/visit/love', { uid: owner, body: { propertyId: p.id } })).json.error, 'YOURS');
  await letIn({ s, guest, p }); const m0 = profile(s.app, guest).mood; const r = await ok(s, 'POST', '/api/visit/love', { uid: guest, body: { propertyId: p.id } }); assert.equal(r.loves, 1); assert.ok(profile(s.app, guest).mood > m0);
  assert.equal((await call(s, 'POST', '/api/visit/love', { uid: guest, body: { propertyId: p.id } })).json.error, 'ALREADY_LOVED'); assert.ok((await ok(s, 'GET', '/api/notifications', { uid: owner })).rows.some(n => n.kind === 'love'));
  assert.equal((await ok(s, 'GET', '/api/properties', { uid: guest })).properties.find(x => x.id === p.id).loves, 1);
  s.app.clock.advance(DAY); await ok(s, 'POST', '/api/heartbeat', { uid: owner, body: {} }); at(s, owner, p.door.x, p.door.z); await ok(s, 'POST', '/api/property/enter', { uid: owner }); await letIn({ s, guest, p, owner }); assert.equal((await ok(s, 'POST', '/api/visit/love', { uid: guest, body: { propertyId: p.id } })).loves, 2);
});
test('guest social actions: greet/hype/sofa/tv need the right access and furniture, have cooldowns, show in the room feed; room chat is filtered; kick removes the guest', async () => {
  const { s, owner, guest, p } = await setup(); s.owner = owner; await letIn({ s, guest, p });
  const oname = s.db.prepare('SELECT username FROM users WHERE id=?').get(owner).username;
  await ok(s, 'POST', '/api/visit/act', { uid: guest, body: { propertyId: p.id, action: 'greet' } }); assert.equal((await call(s, 'POST', '/api/visit/act', { uid: guest, body: { propertyId: p.id, action: 'greet' } })).json.error, 'COOLDOWN');
  let room0 = await ok(s, 'GET', `/api/room?propertyId=${p.id}`, { uid: owner }); assert.ok(room0.events.some(e => e.kind === 'act' && e.t.includes('@' + oname) && e.t.includes('How far')), 'greet names people in the room');
  assert.ok((await ok(s, 'GET', '/api/notifications', { uid: owner })).rows.some(n => /greets you/.test(n.text)));
  assert.equal((await call(s, 'POST', '/api/visit/act', { uid: guest, body: { propertyId: p.id, action: 'sofa' } })).json.error, 'NO_ITEM'); await ok(s, 'POST', '/api/property/furniture', { uid: owner, body: { propertyId: p.id, itemId: 'sofa', x: 2, z: 1, rot: 0 } });
  const m0 = profile(s.app, guest).mood; await ok(s, 'POST', '/api/visit/act', { uid: guest, body: { propertyId: p.id, action: 'sofa' } }); assert.ok(profile(s.app, guest).mood > m0); assert.equal((await call(s, 'POST', '/api/visit/act', { uid: guest, body: { propertyId: p.id, action: 'fly' } })).json.error, 'BAD_ACTION');
  assert.equal((await call(s, 'POST', '/api/room/say', { uid: guest, body: { propertyId: p.id, text: 'sh1t house' } })).json.error, 'CLEAN_IT_UP'); await ok(s, 'POST', '/api/room/say', { uid: guest, body: { propertyId: p.id, text: 'Nice place!' } });
  let r = await ok(s, 'GET', `/api/room?propertyId=${p.id}`, { uid: owner }); assert.ok(r.events.some(e => e.t === 'Nice place!')); assert.ok(r.events.some(e => e.kind === 'act')); assert.deepEqual(r.guests.length, 1); assert.equal(r.can.sofa, true); assert.equal(r.ownerHome, true);
  const gname = s.db.prepare('SELECT username FROM users WHERE id=?').get(guest).username; await ok(s, 'POST', '/api/social/mute', { uid: owner, body: { username: gname, kind: 'mute' } }); r = await ok(s, 'GET', `/api/room?propertyId=${p.id}`, { uid: owner }); assert.ok(!r.events.some(e => e.u === gname), 'muted guest hidden from owner'); await ok(s, 'POST', '/api/social/mute', { uid: owner, body: { username: gname, kind: null } });
  assert.equal((await call(s, 'POST', '/api/visit/kick', { uid: guest, body: { propertyId: p.id, username: gname } })).json.error, 'NOT_OWNER'); await ok(s, 'POST', '/api/visit/kick', { uid: owner, body: { propertyId: p.id, username: gname } });
  assert.equal((await call(s, 'GET', `/api/room?propertyId=${p.id}`, { uid: guest })).status, 403); assert.equal((await call(s, 'POST', '/api/room/say', { uid: guest, body: { propertyId: p.id, text: 'hello?' } })).status, 403);
});
test('NEPA blackout needs a generator or solar inverter to restore light; placed items are listed in room state', async () => {
  const { s, owner, guest, p } = await setup(); s.owner = owner;
  s.db.prepare('UPDATE property_owner SET power_dark_until=?, power_check_bucket=? WHERE property_id=?').run(s.app.clock.now() + 10 * 60000, 999999, p.id);
  let room = await ok(s, 'GET', `/api/room?propertyId=${p.id}`, { uid: owner });
  assert.equal(room.power.dark, true); assert.equal(room.power.canRestore, false);
  assert.equal((await call(s, 'POST', '/api/property/power/restore', { uid: owner, body: { propertyId: p.id } })).json.error, 'NO_BACKUP');
  await ok(s, 'POST', '/api/property/furniture', { uid: owner, body: { itemId: 'gen' } });
  room = await ok(s, 'GET', `/api/room?propertyId=${p.id}`, { uid: owner });
  assert.equal(room.power.canRestore, true); assert.ok(room.placed.some(i => i.id === 'gen'));
  const restored = await ok(s, 'POST', '/api/property/power/restore', { uid: owner, body: { propertyId: p.id } });
  assert.equal(restored.dark, false);
  assert.equal((await call(s, 'POST', '/api/property/power/restore', { uid: guest, body: { propertyId: p.id } })).json.error, 'FORBIDDEN');
  const inner = await ok(s, 'GET', `/api/property/${p.id}/interior`, { uid: owner });
  assert.ok(inner.catalog.some(i => i.id === 'solar')); assert.ok(inner.placed.some(i => i.id === 'gen'));
});
test('buying a house writes the owner name on it, and outside paint is a colour other players can see', async () => {
  const { s, owner, guest, p } = await setup(); const who = s.db.prepare('SELECT username FROM users WHERE id=?').get(owner).username;
  const seen = (await ok(s, 'GET', '/api/properties', { uid: guest })).properties.find(x => x.id === p.id);
  assert.equal(seen.name, who); assert.equal(seen.owner, who); assert.equal(seen.facade, null);
  assert.equal((await call(s, 'POST', '/api/property/facade', { uid: guest, body: { propertyId: p.id, color: 'sky' } })).json.error, 'NOT_OWNER');
  assert.equal((await call(s, 'POST', '/api/property/facade', { uid: owner, body: { propertyId: p.id, color: 'neon' } })).json.error, 'BAD_COLOUR');
  const before = balanceOf(s.db, cashId(owner)); const price = s.app.balance.decor.price;
  const r = await ok(s, 'POST', '/api/property/facade', { uid: owner, body: { propertyId: p.id, color: 'sky', idemKey: 'paint1' } });
  assert.equal(r.facade, s.app.balance.decor.walls.sky[1]); assert.equal(r.charged, price); assert.equal(balanceOf(s.db, cashId(owner)), before - price);
  const again = await ok(s, 'POST', '/api/property/facade', { uid: owner, body: { propertyId: p.id, color: 'sky', idemKey: 'paint2' } }); assert.equal(again.charged, 0);
  const pub = (await ok(s, 'GET', '/api/properties', { uid: guest })).properties.find(x => x.id === p.id); assert.equal(pub.facade, r.facade);
  assert.equal(checkInvariants(s.db).ok, true);
});
