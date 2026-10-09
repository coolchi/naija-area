import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at } from './helpers.js';
import { ccuNow, recommendedInterval } from '../server/core/world.js';

test('heartbeat: returns me, world time, interval, nearby players with trail samples', async () => {
  const s = makeServer(); const a = mkUser(s), b = mkUser(s); at(s, a, 0, 0); at(s, b, 20, 10);
  await ok(s, 'POST', '/api/heartbeat', { uid: b, body: { trail: [{ a: 2000, x: 18, z: 10, ry: 1 }, { a: 0, x: 20, z: 10, ry: 1 }] } });
  const r = await ok(s, 'POST', '/api/heartbeat', { uid: a, body: { trail: [{ a: 0, x: 0, z: 0, ry: 0 }], since: 0 } });
  assert.equal(r.me.username.startsWith('user'), true); assert.ok(r.world.hour >= 0 && r.world.hour < 24); assert.ok(r.interval >= 5000 && r.interval <= 45000);
  assert.equal(r.players.length, 1); assert.equal(r.players[0].id, b); assert.ok(r.players[0].s.length >= 1); assert.equal(r.shed, false);
  assert.ok(r.now > 0); assert.equal(typeof r.adsVersion, 'number'); assert.ok(r.ads); // first poll includes ad snapshot
  const r2 = await ok(s, 'POST', '/api/heartbeat', { uid: a, body: { adsVersion: r.adsVersion } }); assert.equal(r2.ads, undefined); // unchanged -> omitted
});
test('heartbeat: far players are not sent (interest management)', async () => {
  const s = makeServer(); const a = mkUser(s), b = mkUser(s); at(s, a, -200, -200); at(s, b, 200, 100);
  await ok(s, 'POST', '/api/heartbeat', { uid: b, body: {} });
  assert.equal((await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} })).players.length, 0);
});
test('heartbeat: server clamps teleport/speed-hack trails and world bounds', async () => {
  const s = makeServer(); const a = mkUser(s); at(s, a, 0, 0);
  await ok(s, 'POST', '/api/heartbeat', { uid: a, body: { trail: [{ a: 1000, x: 0, z: 0 }, { a: 0, x: 200, z: 0 }] } }); // 200m in 1s while walking
  const p = s.app.world.players.get(a); assert.ok(p.x < 15, `x was ${p.x}`);
  await ok(s, 'POST', '/api/heartbeat', { uid: a, body: { mode: 'drive', trail: [{ a: 0, x: 99999, z: -99999 }] } });
  assert.ok(Math.abs(p.x) <= 240 && p.z >= -240);
});
test('heartbeat: actions that need position use the clamped position (cannot teleport to a shop)', async () => {
  const s = makeServer(); const a = mkUser(s); at(s, a, 0, 0); const shop = s.app.city.shopById.shop_mart;
  const r = await call(s, 'POST', '/api/shop/buy', { uid: a, body: { shopId: 'shop_mart', itemId: 'pie', pos: { x: shop.x, z: shop.z } } });
  assert.equal(r.json.error, 'TOO_FAR');
});
test('heartbeat: interval ladder grows with concurrent users (tells clients to slow down)', async () => {
  const s = makeServer(); assert.equal(recommendedInterval(s.app, 10), 5000); assert.equal(recommendedInterval(s.app, 500), 12000); assert.equal(recommendedInterval(s.app, 5000), 20000);
  assert.equal(recommendedInterval(s.app, 20000), 30000); assert.equal(recommendedInterval(s.app, 200000), 45000);
  for (let i = 0; i < 60; i++) { const u = mkUser(s, { bot: true }); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); }
  assert.equal(ccuNow(s.app), 60); const r = await ok(s, 'POST', '/api/heartbeat', { uid: mkUser(s), body: {} }); assert.equal(r.interval, 12000);
  s.app.clock.advance(61000); assert.equal(ccuNow(s.app), 0); // idle players drop out of CCU
});
test('heartbeat: notifications are delivered once via cursor; chat is nearby-only and rate limited', async () => {
  const s = makeServer(); const a = mkUser(s), b = mkUser(s), c = mkUser(s); at(s, a, 0, 0); at(s, b, 10, 0); at(s, c, 200, 100);
  for (const u of [a, b, c]) await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  const h1 = await ok(s, 'POST', '/api/heartbeat', { uid: a, body: { notifSince: 0 } }); assert.ok(h1.notifs.length >= 1);
  const h2 = await ok(s, 'POST', '/api/heartbeat', { uid: a, body: { notifSince: h1.notifs.at(-1).id } }); assert.equal(h2.notifs.length, 0);
  await ok(s, 'POST', '/api/chat', { uid: a, body: { text: 'Hello neighbour <b>x</b>' } });
  assert.equal((await call(s, 'POST', '/api/chat', { uid: a, body: { text: 'again' } })).json.error, 'SLOW_DOWN');
  const hb = await ok(s, 'POST', '/api/heartbeat', { uid: b, body: { chatSince: 0 } }); assert.equal(hb.chat.length, 1); assert.ok(!hb.chat[0].t.includes('<'));
  const hc = await ok(s, 'POST', '/api/heartbeat', { uid: c, body: { chatSince: 0 } }); assert.equal(hc.chat.length, 0);
});
test('heartbeat: dev teleport is delivered once to the client', async () => {
  const s = makeServer(); const a = mkUser(s);
  await ok(s, 'POST', '/api/dev/teleport', { uid: a, body: { x: 50, z: 50 } });
  const r = await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} }); assert.deepEqual(r.teleport, { x: 50, z: 50 });
  assert.equal((await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} })).teleport, undefined);
});
