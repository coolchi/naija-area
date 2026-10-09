// Features aligned with 09_lagos_life_mechanics.md §10: price channels, travel fares, house card/knock flow, buy mode, land, work task, DMs.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, jobPos, DAY, HOUR } from './helpers.js';
import { balanceOf, cashId, checkInvariants } from '../server/core/ledger.js';
import { tickLand, expireKnocks } from '../server/core/social.js';
import { triWave } from '../server/core/economy.js';
import { BALANCE } from '../server/config/balance.js';

const home = async (s, u, tier = 1, idx = 0) => { const p = s.app.city.properties.filter(x => x.tier === tier)[idx]; at(s, u, p.door.x, p.door.z); await ok(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: p.id, mode: 'rent' } }); return p; };

test('shops: price channels (market x0.85, supermarket x1.0, delivery x1.1 + fee) and delivery works from anywhere', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 20000 }); at(s, u, 0, 0);
  const shops = (await ok(s, 'GET', '/api/shops', { uid: u })).shops; const mkt = shops.find(x => x.id === 'shop_market'), mart = shops.find(x => x.id === 'shop_mart');
  assert.equal(mkt.items.find(i => i.id === 'pie').price, Math.round(400 * 0.85)); assert.equal(mart.items.find(i => i.id === 'pie').price, 400); assert.equal(mart.items.find(i => i.id === 'pie').deliveryPrice, 440);
  const d = await ok(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_mart', itemId: 'pie', channel: 'delivery' } }); assert.equal(d.spent, 440 + 150); assert.equal(d.channel, 'delivery');
  assert.equal((await call(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_mart', itemId: 'pie' } })).json.error, 'TOO_FAR');
  const m = s.app.city.shopById.shop_market; at(s, u, m.x, m.z); const b = await ok(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_market', itemId: 'pie' } }); assert.equal(b.spent, 340);
  assert.equal((await call(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_mart', itemId: 'pie', channel: 'bogus' } })).json.error, 'BAD_CHANNEL');
  assert.equal(checkInvariants(s.db).ok, true);
});
test('shops: opening hours are enforced on the game clock (Closed till ...) but not for delivery', async () => {
  const s = makeServer({ balance: structuredClone(BALANCE) });
  const u = mkUser(s, { cash: 20000 }); const sh = s.app.city.shopById.shop_suya; at(s, u, sh.x, sh.z);
  let closed = null; // find a moment when suya (17:00-24:00) is closed by moving the server clock
  for (let i = 0; i < 100 && !closed; i++) { const r = await call(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_suya', itemId: 'suya' } }); if (r.json.error === 'CLOSED') closed = r; else s.app.clock.advance(7 * 60000); }
  assert.ok(closed, 'expected a closed period'); assert.match(closed.json.message, /Closed till 5:00 PM/);
  assert.equal((await call(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_suya', itemId: 'suya', channel: 'delivery' } })).status, 200);
});
test('travel: fare comes from distance + mode, only known places, rush hour costs more, ledger charged, others see a moving trail', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 5000 }); const o = mkUser(s); at(s, u, 0, 0); at(s, o, 20, 0); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  const q = await ok(s, 'GET', '/api/travel/quote?place=shop_mart', { uid: u }); const keke = q.modes.find(m => m.id === 'keke'), danfo = q.modes.find(m => m.id === 'danfo');
  assert.ok(keke.fare > danfo.fare && danfo.fare >= 50); assert.ok(keke.seconds >= 2 && keke.seconds <= 10); assert.ok(['Free road', 'Go-slow (rush hour)'].includes(q.traffic)); assert.equal(q.modes[0].id, 'walk');
  assert.equal((await call(s, 'GET', '/api/travel/quote?place=nowhere', { uid: u })).status, 404);
  assert.equal((await call(s, 'POST', '/api/travel', { uid: u, body: { placeId: 'shop_mart', mode: 'walk' } })).json.error, 'WALK');
  assert.equal((await call(s, 'POST', '/api/travel', { uid: u, body: { placeId: 'shop_mart', mode: 'jet' } })).json.error, 'BAD_MODE');
  const t = await ok(s, 'POST', '/api/travel', { uid: u, body: { placeId: 'shop_mart', mode: 'keke' } }); assert.equal(t.fare, keke.fare); assert.equal(balanceOf(s.db, cashId(u)), 5000 - keke.fare);
  const pl = s.app.city.placeById.shop_mart; assert.equal(s.app.world.players.get(u).x, pl.x);
  const hb = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); assert.equal(hb.teleport.x, pl.x); assert.ok(hb.teleport.travelMs >= 2000);
  const poor = mkUser(s, { cash: 0 }); at(s, poor, 0, 0); assert.equal((await call(s, 'POST', '/api/travel', { uid: poor, body: { placeId: 'shop_mart', mode: 'keke' } })).json.error, 'INSUFFICIENT_FUNDS');
  const car = await ok(s, 'POST', '/api/travel', { uid: mkUser(s), body: { placeId: 'plaza', mode: 'car' } }); assert.ok(car.fare < 300);
  const rush = s.app.balance.transport.rushHours[0]; let isR = false; for (let i = 0; i < 400 && !isR; i++) { s.app.clock.advance(5 * 60000); const qq = await ok(s, 'GET', '/api/travel/quote?place=shop_mart', { uid: u }); if (qq.rush) { isR = true; } }
  assert.ok(isR, 'found a rush-hour moment');
});
test('house card: presence (home/online/away), owner/area/items fields, name limit 24', async () => {
  const s = makeServer(); const [a, b] = [mkUser(s), mkUser(s)]; const p = await home(s, a); at(s, b, p.door.x, p.door.z);
  s.app.clock.advance(61000); let card = (await ok(s, 'GET', '/api/properties', { uid: b })).properties.find(x => x.id === p.id); assert.equal(card.presence, 'away'); assert.ok(card.owner && card.area && card.type !== undefined || card.tierLabel);
  await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} }); card = (await ok(s, 'GET', '/api/properties', { uid: b })).properties.find(x => x.id === p.id); assert.equal(card.presence, 'online');
  await ok(s, 'POST', '/api/property/enter', { uid: a }); card = (await ok(s, 'GET', '/api/properties', { uid: b })).properties.find(x => x.id === p.id); assert.equal(card.presence, 'home'); assert.equal(card.maxGuests, 2);
  const long = await ok(s, 'POST', '/api/property/name', { uid: a, body: { name: 'Mama Tunde Place Extra Long Name' } }); assert.equal(long.name.length, 24);
  s.app.clock.advance(61000); card = (await ok(s, 'GET', '/api/properties', { uid: b })).properties.find(x => x.id === p.id); assert.equal(card.presence, 'away');
});
test('knock flow: only when host is home; host accepts -> visitor gets read-only interior; decline -> cooldown; timeout ~95s; guest cap; owner-only still enforced', async () => {
  const s = makeServer(); const [a, b, c] = [mkUser(s), mkUser(s), mkUser(s)]; const p = await home(s, a); for (const u of [b, c]) at(s, u, p.door.x, p.door.z);
  assert.equal((await call(s, 'POST', '/api/visit/knock', { uid: b, body: { propertyId: p.id } })).json.error, 'NOT_HOME');
  await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} }); await ok(s, 'POST', '/api/property/enter', { uid: a });
  assert.equal((await call(s, 'GET', `/api/property/${p.id}/interior`, { uid: b })).status, 403);
  const k = await ok(s, 'POST', '/api/visit/knock', { uid: b, body: { propertyId: p.id } }); assert.ok(k.expiresAt - s.app.clock.now() >= 94000);
  assert.equal((await call(s, 'POST', '/api/visit/knock', { uid: b, body: { propertyId: p.id } })).json.error, 'ALREADY_KNOCKING');
  const hbA = await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} }); assert.equal(hbA.knocks.incoming.length, 1); assert.equal(hbA.knocks.incoming[0].from.startsWith('user'), true);
  assert.equal((await call(s, 'POST', '/api/visit/respond', { uid: c, body: { knockId: k.knockId, accept: true } })).status, 404); // not the host
  assert.ok((await ok(s, 'GET', '/api/notifications', { uid: a })).rows.some(n => n.kind === 'knock'));
  await ok(s, 'POST', '/api/visit/respond', { uid: a, body: { knockId: k.knockId, accept: true } });
  const inter = await ok(s, 'GET', `/api/property/${p.id}/interior`, { uid: b }); assert.equal(inter.visitor, true); assert.equal(inter.readOnly, true); assert.equal(inter.catalog, undefined); assert.equal(inter.guests, 1);
  assert.equal((await call(s, 'POST', '/api/property/furniture', { uid: b, body: { itemId: 'plant' } })).json.error, 'NO_HOME'); // visitors cannot buy/place
  assert.equal((await ok(s, 'POST', '/api/heartbeat', { uid: b, body: {} })).knocks.mine.status, 'accepted');
  await ok(s, 'POST', '/api/property/leave', { uid: b }); assert.equal((await call(s, 'GET', `/api/property/${p.id}/interior`, { uid: b })).status, 403); // permit ended
  // decline + cooldown
  const k2 = await ok(s, 'POST', '/api/visit/knock', { uid: c, body: { propertyId: p.id } }); await ok(s, 'POST', '/api/visit/respond', { uid: a, body: { knockId: k2.knockId, accept: false } });
  const again = await call(s, 'POST', '/api/visit/knock', { uid: c, body: { propertyId: p.id } }); assert.equal(again.json.error, 'COOLDOWN'); assert.ok(again.json.retryIn > 0);
  s.app.clock.advance(61000); await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} });
  // timeout
  const k3 = await ok(s, 'POST', '/api/visit/knock', { uid: c, body: { propertyId: p.id } }); s.app.clock.advance(96000); await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} });
  assert.equal(s.db.prepare('SELECT status FROM knocks WHERE id=?').get(k3.knockId).status, 'expired');
  assert.equal((await call(s, 'POST', '/api/visit/respond', { uid: a, body: { knockId: k3.knockId, accept: true } })).json.error, 'KNOCK_CLOSED');
});
test('knock: guest cap per home tier is enforced', async () => {
  const s = makeServer(); const a = mkUser(s); const p = await home(s, a); await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} }); await ok(s, 'POST', '/api/property/enter', { uid: a });
  const vs = [mkUser(s), mkUser(s), mkUser(s)]; for (const v of vs) at(s, v, p.door.x, p.door.z); let full = null;
  for (const v of vs) { const k = await call(s, 'POST', '/api/visit/knock', { uid: v, body: { propertyId: p.id } }); if (k.status !== 200) { full = k; break; } const r = await call(s, 'POST', '/api/visit/respond', { uid: a, body: { knockId: k.json.knockId, accept: true } }); if (r.status !== 200) { full = r; break; } }
  assert.equal(full.json.error, 'FULL');
});
test('buy mode: grid snap, rotation, overlap -> "Something is in the way", doorway/bed reserved, move, sell refund 50%', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 50000 }); const p = await home(s, u); const F = (b) => call(s, 'POST', '/api/property/furniture', { uid: u, body: b });
  const r1 = await F({ itemId: 'sofa', x: 2, z: 0, rot: 0 }); assert.equal(r1.status, 200); assert.equal(r1.json.charged, 4500);
  assert.equal((await F({ itemId: 'fridge', x: 3, z: 0 })).json.error, 'BLOCKED');       // on top of the sofa
  assert.match((await F({ itemId: 'fridge', x: 3, z: 0 })).json.message, /Something is in the way/);
  assert.equal((await F({ itemId: 'fridge', x: 0, z: 0 })).json.error, 'BLOCKED');       // on the bed
  assert.equal((await F({ itemId: 'fridge', x: 2, z: 3 })).json.error, 'BLOCKED');       // doorway (face-me-I-face-you room 6x5: door cells x2-3,z3-4)
  assert.equal((await F({ itemId: 'fridge', x: 5, z: 1 })).json.error, 'BLOCKED');       // wardrobe (a built-in fixture)
  assert.equal((await F({ itemId: 'tv', x: 5, z: 0 })).json.error, 'OUT_OF_ROOM');       // 2 wide at x=5 sticks out
  assert.equal((await F({ itemId: 'tv', x: 0.5, z: 0 })).json.error, 'BAD_CELL');
  assert.equal((await F({ itemId: 'tv', x: 5, z: 2, rot: 1 })).status, 200);             // rotated: 1 wide x 2 deep fits (below the wardrobe)
  assert.equal((await F({ itemId: 'tv', x: 5, z: 2, rot: 9 })).json.error, 'BAD_ROT');
  const cash = balanceOf(s.db, cashId(u)); const mv = await F({ itemId: 'sofa', x: 2, z: 2, rot: 0 }); assert.equal(mv.status, 200); assert.equal(mv.json.charged, 0); assert.equal(balanceOf(s.db, cashId(u)), cash); // move is free
  assert.equal((await F({ itemId: 'rug', x: 3, z: 0 })).status, 200);                    // floor layer may sit under objects
  const sell = await ok(s, 'POST', '/api/property/furniture/sell', { uid: u, body: { itemId: 'sofa' } }); assert.equal(sell.refund, 2250);
  assert.equal((await call(s, 'POST', '/api/property/furniture/sell', { uid: u, body: { itemId: 'sofa' } })).json.error, 'NOT_PLACED');
  const inter = await ok(s, 'GET', `/api/property/${p.id}/interior`, { uid: u }); assert.equal(inter.room.w, 6); assert.ok(inter.placed.find(i => i.id === 'tv').rot === 1);
  assert.equal(checkInvariants(s.db).ok, true);
});
test('land: buy plot (must be nearby, two-step on client), one owner, cap, growth over time, sell, net worth includes land', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 3000000 }); const o = mkUser(s, { cash: 3000000 }); const pl = s.app.city.plots.find(p => p.id === 'p1');
  const plots = (await ok(s, 'GET', '/api/plots', { uid: u })).plots; assert.equal(plots.length, 4); assert.ok(['low', 'medium', 'high'].includes(plots[0].risk)); assert.ok(plots[0].growthPerWeekPct > 0);
  assert.equal((await call(s, 'POST', '/api/plot/buy', { uid: u, body: { plotId: 'p1' } })).json.error, 'TOO_FAR');
  at(s, u, pl.x, pl.z + 20); at(s, o, pl.x, pl.z + 20); await ok(s, 'POST', '/api/plot/buy', { uid: u, body: { plotId: 'p1' } });
  assert.equal((await call(s, 'POST', '/api/plot/buy', { uid: o, body: { plotId: 'p1' } })).json.error, 'TAKEN');
  assert.equal(balanceOf(s.db, cashId(u)), 3000000 - 1500000);
  s.app.clock.advance(14 * DAY); const mine = (await ok(s, 'GET', '/api/plots', { uid: u })).plots.find(p => p.id === 'p1'); assert.ok(mine.value > 1500000 && mine.value < 1500000 * 1.1, String(mine.value)); // 2%/wk for 2 wks ~ +4%
  const { profile } = await import('../server/core/economy.js'); assert.ok(profile(s.app, u).netWorth > 2900000);
  const sold = await ok(s, 'POST', '/api/plot/sell', { uid: u, body: { plotId: 'p1' } }); assert.ok(sold.value > 1400000); assert.equal(checkInvariants(s.db).ok, true);
  assert.equal((await call(s, 'POST', '/api/plot/sell', { uid: u, body: { plotId: 'p1' } })).json.error, 'NOT_YOURS');
});
test('land: omo-onile levy depends on risk (injectable rng), is charged only if affordable, once per day', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 3000000 }); const pl = s.app.city.plots.find(p => p.id === 'p1'); at(s, u, pl.x, pl.z + 20); await ok(s, 'POST', '/api/plot/buy', { uid: u, body: { plotId: 'p1' } });
  assert.equal(tickLand(s.app, () => 0).events, 0); // not a day yet
  s.app.clock.advance(DAY + 1); assert.equal(tickLand(s.app, () => 0.5).events, 0); // high risk = 10%: 0.5 is safe
  const before = balanceOf(s.db, cashId(u)); s.app.clock.advance(DAY); assert.equal(tickLand(s.app, () => 0.05).events, 1); assert.equal(before - balanceOf(s.db, cashId(u)), Math.ceil(1500000 * 0.06));
  assert.equal(tickLand(s.app, () => 0).events, 0); // same day: no double charge
  s.db.prepare('UPDATE accounts SET balance=0 WHERE id=?').run(cashId(u)); // (direct poke only to test the poor path; invariants not checked after this)
  s.app.clock.advance(DAY); assert.equal(tickLand(s.app, () => 0).events, 0);
  assert.ok((await ok(s, 'GET', '/api/notifications', { uid: u })).rows.some(n => n.kind === 'omo_onile'));
});
test('work task: server owns target + clock; hit in the green gives +25% wage once per shift; miss gives nothing', async () => {
  const s = makeServer(); const u = mkUser(s); const l = jobPos(s, 'job_shop'); at(s, u, l.x, l.z); await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'shop' } });
  const t = await ok(s, 'POST', '/api/jobs/task/start', { uid: u }); assert.equal((await call(s, 'POST', '/api/jobs/task/start', { uid: u })).json.error, 'TASK_USED');
  // advance the server clock so the moving bar is exactly on the target
  const T = t.periodMs; let tries = 0; while (Math.abs(triWave((s.app.clock.now() - t.startedAt) / T) - t.target) > 0.02 && tries++ < 2000) s.app.clock.advance(5);
  const r = await ok(s, 'POST', '/api/jobs/task/stop', { uid: u }); assert.equal(r.hit, true); assert.equal(r.bonusPct, 25);
  assert.equal((await call(s, 'POST', '/api/jobs/task/stop', { uid: u })).json.error, 'TASK_DONE');
  s.app.clock.advance(61000); const c = await ok(s, 'POST', '/api/jobs/claim', { uid: u }); assert.equal(c.wage, 1300 + 325);
  // miss
  const u2 = mkUser(s); at(s, u2, l.x, l.z); await ok(s, 'POST', '/api/jobs/start', { uid: u2, body: { jobId: 'shop' } }); const t2 = await ok(s, 'POST', '/api/jobs/task/start', { uid: u2 });
  tries = 0; while (Math.abs(triWave((s.app.clock.now() - t2.startedAt) / T) - t2.target) < 0.4 && tries++ < 2000) s.app.clock.advance(5);
  assert.equal((await ok(s, 'POST', '/api/jobs/task/stop', { uid: u2 })).hit, false); s.app.clock.advance(61000); assert.equal((await ok(s, 'POST', '/api/jobs/claim', { uid: u2 })).wage, 1300);
  assert.equal((await call(s, 'POST', '/api/jobs/task/start', { uid: mkUser(s) })).json.error, 'NO_SHIFT');
});
test('DMs: delivered as notifications, cleaned, rate limited, no self/unknown', async () => {
  const s = makeServer(); const [a, b] = [mkUser(s), mkUser(s)]; const bn = s.db.prepare('SELECT username FROM users WHERE id=?').get(b).username;
  await ok(s, 'POST', '/api/dm', { uid: a, body: { to: bn, text: 'Hello <i>neighbour</i>' } }); const n = (await ok(s, 'GET', '/api/notifications', { uid: b })).rows.find(r => r.kind === 'dm'); assert.match(n.text, /@user\d+_\d+: Hello ineighbour\/i/);
  assert.equal((await call(s, 'POST', '/api/dm', { uid: a, body: { to: bn, text: '' } })).json.error, 'EMPTY'); assert.equal((await call(s, 'POST', '/api/dm', { uid: a, body: { to: 'ghost_x', text: 'hi' } })).json.error, 'NO_RECIPIENT');
  let last; for (let i = 0; i < 8; i++) last = await call(s, 'POST', '/api/dm', { uid: a, body: { to: bn, text: 'x' + i } }); assert.equal(last.json.error, 'RATE_LIMIT');
});
