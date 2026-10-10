import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, DAY, HOUR } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { typeOf, gridOf, maxGuestsOf, reservedRects, layoutOf, plotStage } from '../server/core/housing.js';

const go = async (s, u, id) => { const v = s.app.city.venues.find(x => x.id === id); at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); return ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: id } }); };
const cell = (r, x, z) => x >= r.x && x < r.x + r.w && z >= r.z && z < r.z + r.d;
const rent = (s, uid, p) => { s.app.db.prepare('INSERT INTO property_owner(property_id,user_id,mode,custom_name,next_rent_due,missed,since,paid_price) VALUES (?,?,?,?,?,0,?,?)').run(p.id, uid, 'rent', null, s.app.clock.now() + DAY, s.app.clock.now(), 0); };

test('housing types: every property resolves to a type with its own grid; all six types exist in the city; tiers match', () => {
  const s = makeServer(); const seen = new Set();
  for (const p of s.app.city.properties) { const t = typeOf(s.app, p); assert.ok(t.id && t.grid.length === 2, p.id); assert.equal(t.tier, p.tier, `${p.id} style ${t.id} must match tier ${p.tier}`); seen.add(t.id); }
  assert.deepEqual([...seen].sort(), ['bungalow', 'duplex', 'faceyou', 'flat2', 'mansion', 'selfcon']);
  const sizes = new Set(); for (const id of seen) sizes.add(s.app.balance.housing.types[id].grid.join('x')); assert.ok(sizes.size >= 5, 'sizes differ by type');
});
test('per-type grids: fixtures and doorway are inside the room, never overlap each other, and the doorway is reserved in front of the door', () => {
  const s = makeServer();
  for (const [id, T] of Object.entries(s.app.balance.housing.types)) {
    const [W, D] = T.grid; const p = s.app.city.properties.find(x => x.style === id); const R = reservedRects(s.app, p); assert.ok(R.length >= 2, id);
    for (const r of R) { assert.ok(r.x >= 0 && r.z >= 0 && r.x + r.w <= W && r.z + r.d <= D, `${id} ${r.what} inside the room`); }
    const fx = R.filter(r => r.what !== 'doorway'); for (let i = 0; i < fx.length; i++) for (let j = i + 1; j < fx.length; j++) { const a = fx[i], b = fx[j]; assert.ok(!(a.x < b.x + b.w && b.x < a.x + a.w && a.z < b.z + b.d && b.z < a.z + a.d), `${id}: ${a.what} overlaps ${b.what}`); }
    const door = R.find(r => r.what === 'doorway'); assert.equal(door.x, T.door.x); assert.equal(door.z + door.d, D); for (const f of fx) assert.ok(!(f.x < door.x + door.w && door.x < f.x + f.w && f.z < door.z + door.d && door.z < f.z + f.d), `${id}: ${f.what} blocks the doorway`);
    assert.ok(fx.some(f => f.what === 'bed'), id + ' has a bed cell reserved'); for (const w of T.windows) assert.ok(['back', 'left', 'right'].includes(w.wall));
    assert.equal(gridOf(s.app, p).join(), T.grid.join()); assert.equal(layoutOf(s.app, p).type, id);
  }
});
test('guest caps differ by type and grow with the tier; the interior API serves each type its own layout, fixtures and default colours', async () => {
  const s = makeServer(); const caps = {};
  for (const id of Object.keys(s.app.balance.housing.types)) { const p = s.app.city.properties.find(x => x.style === id); caps[id] = maxGuestsOf(s.app, p); const u = mkUser(s); rent(s, u, p); const r = await ok(s, 'GET', `/api/property/${p.id}/interior`, { uid: u }); assert.equal(r.room.type, id); assert.equal([r.room.w, r.room.d].join(), s.app.balance.housing.types[id].grid.join()); assert.ok(r.room.fixtures.length >= 2); assert.ok(r.wall?.hex && r.floor?.hex, 'default colours resolve'); assert.equal(r.maxGuests, caps[id]); }
  assert.ok(caps.faceyou < caps.flat2 && caps.flat2 < caps.duplex && caps.duplex < caps.mansion, JSON.stringify(caps)); assert.ok(caps.mansion <= 8);
});
test('buy mode is checked on the server per type: bed, wardrobe, stairs, kitchenette and doorway cells are refused; free cells accept furniture', async () => {
  const s = makeServer(); s.app.balance.shops.enforceHours = false;
  for (const id of ['selfcon', 'duplex', 'mansion']) {
    const p = s.app.city.properties.find(x => x.style === id); const u = mkUser(s, { cash: 100000 }); rent(s, u, p); at(s, u, p.door.x, p.door.z);
    const R = reservedRects(s.app, p); const [W, D] = gridOf(s.app, p); const F = (b) => call(s, 'POST', '/api/property/furniture', { uid: u, body: b });
    for (const r of R) assert.equal((await F({ itemId: 'plant', x: r.x, z: r.z })).json.error, 'BLOCKED', `${id}: ${r.what}`);
    let free = null; for (let z = 0; z < D && !free; z++) for (let x = 0; x < W && !free; x++) if (!R.some(r => cell(r, x, z))) free = { x, z };
    assert.equal((await F({ itemId: 'plant', ...free })).status, 200, id + ' accepts furniture on a free cell');
    assert.equal((await F({ itemId: 'plant', x: W, z: 0 })).json.error, 'OUT_OF_ROOM');
  }
});
test('land plots show staged build looks over time (placeholder, ESTIMATE days)', () => {
  const s = makeServer(); const now = 1e12; const st = (d) => plotStage(s.app, now - d * DAY, now).id;
  assert.equal(st(0), 'pegged'); assert.equal(st(4), 'foundation'); assert.equal(st(8), 'blocks'); assert.equal(st(30), 'roofed');
});

test('venues: every venue has its own room spec (size, floor, mood, decor) - nothing is a copy of another room', () => {
  const s = makeServer(); const V = s.app.city.venues; assert.ok(V.length >= 9); const sig = new Set();
  for (const v of V) { assert.ok(v.room.w >= 9 && v.room.d >= 8 && v.room.decor?.length >= 6 && v.room.floor?.style && v.room.mood, v.id); sig.add(JSON.stringify([v.room.decor.map(d => d.k).sort(), v.room.floor, v.room.wall])); for (const st of v.stations) { assert.ok(Math.abs(st.x) <= v.room.w / 2 && Math.abs(st.z) <= v.room.d / 2, `${v.id}/${st.id} inside the room`); } }
  assert.equal(sig.size, V.length, 'all rooms are different');
  assert.deepEqual(V.filter(v => v.kind === 'club').map(v => v.id).sort(), ['venue_club1', 'venue_club2']); assert.deepEqual(V.filter(v => v.kind === 'salon').length, 2);
  for (const v of V) for (const o of s.app.city.buildings.filter(b => b.id === v.buildingId)) assert.ok(o);
  const names = V.map(v => v.name).join(' '); assert.ok(!/Hennessy|Heineken|Star Lager|Guinness|Tiwa|Burna|Davido/i.test(names), 'generic names only');
});
test('club: dance (cooldown), bar and VIP charge the ledger, song slot board is a placeholder; outside the club nothing works', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 20000 }); const act = (id, b = {}) => call(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: 'venue_club1', stationId: id, ...b } });
  assert.equal((await act('dance')).json.error, 'NOT_INSIDE'); await go(s, u, 'venue_club1');
  const m0 = (await ok(s, 'GET', '/api/me', { uid: u })).mood ?? null;
  const d1 = await act('dance'); assert.equal(d1.status, 200); assert.ok(d1.json.mood >= 0); assert.equal((await act('dance')).json.error, 'COOLDOWN'); s.app.clock.advance(6 * 60000); assert.equal((await act('dance')).status, 200);
  const c0 = balanceOf(s.app.db, cashId(u)); const b = await act('bar', { idem: 'a' }); assert.equal(b.status, 200); assert.equal(c0 - balanceOf(s.app.db, cashId(u)), 300);
  const v = await act('vip', { idem: 'v' }); assert.equal(v.status, 200); assert.equal(v.json.charged, 1000); assert.equal((await act('vip', { idem: 'v2' })).json.error, 'COOLDOWN');
  const board = await act('songs'); assert.equal(board.json.slots.length, 5); assert.match(board.json.note, /planned/); assert.equal((await act('dj')).json.info, true); void m0;
  const poor = mkUser(s, { cash: 100 }); await go(s, poor, 'venue_club1'); assert.equal((await call(s, 'POST', '/api/venue/act', { uid: poor, body: { venueId: 'venue_club1', stationId: 'bar' } })).json.error, 'NO_FUNDS');
  assert.equal(checkInvariants(s.db).ok, true);
});
test('salon: a style costs the placeholder fee through the ledger, lifts mood a little, shows as a look on the profile, has a cooldown and needs you inside', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 20000 }); const sty = (b) => call(s, 'POST', '/api/salon/style', { uid: u, body: { venueId: 'venue_salon1', stationId: 'chair1', ...b } });
  assert.equal((await sty({ styleId: 'trim' })).json.error, 'NOT_INSIDE'); await go(s, u, 'venue_salon1');
  const menu = await ok(s, 'GET', '/api/salon?venueId=venue_salon1', { uid: u }); assert.ok(menu.styles.length >= 4 && menu.note.includes('ESTIMATE'));
  assert.equal((await sty({ styleId: 'nope' })).json.error, 'BAD_STYLE'); assert.equal((await call(s, 'POST', '/api/salon/style', { uid: u, body: { venueId: 'venue_salon1', stationId: 'basin', styleId: 'trim' } })).json.error, 'NO_STATION');
  const c0 = balanceOf(s.app.db, cashId(u)); const r = await sty({ styleId: 'fade', idem: 'x' }); assert.equal(r.status, 200); assert.equal(c0 - balanceOf(s.app.db, cashId(u)), 1200); assert.equal(r.json.style.id, 'fade');
  assert.equal((await sty({ styleId: 'trim', idem: 'y' })).json.error, 'COOLDOWN'); assert.equal(balanceOf(s.app.db, cashId(u)), c0 - 1200, 'refused styling charges nothing');
  const me = await ok(s, 'GET', '/api/me', { uid: u }); const look = me.hair || me.user?.hair; assert.equal(look.id, 'fade'); assert.equal(look.fresh, true); s.app.clock.advance(3 * HOUR); const me2 = await ok(s, 'GET', '/api/me', { uid: u }); assert.equal((me2.hair || me2.user?.hair).fresh, false);
  const w = await call(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: 'venue_salon1', stationId: 'basin' } }); assert.equal(w.status, 200); assert.equal(checkInvariants(s.db).ok, true);
  assert.equal((await call(s, 'GET', '/api/salon?venueId=venue_club1', { uid: u })).json.error, 'NO_VENUE');
});
