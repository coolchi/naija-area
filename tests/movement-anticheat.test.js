// Movement anti-cheat (Sherif, 28 Oct 2026): idle-then-jump is rejected, normal walking/driving passes, server-side teleports still work.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at } from './helpers.js';
import { livePos, ensurePresence, syncPos } from '../server/core/world.js';
import { enterCity } from '../server/core/cities.js';

const setup = () => { const s = makeServer(); const u = mkUser(s); enterCity(s.app, u, 'lagos-mainland'); at(s, u, 0, 0); return { s, u, p: ensurePresence(s.app, u) }; };
test('idle for 2 minutes, then one far step (~590 m) is rejected and snapped back', () => {
  const { s, u, p } = setup(); s.app.clock.advance(120000);
  livePos(s.app, u, { x: 590, z: 0, m: 0 }); assert.equal(p.x, 0); assert.equal(p.force?.reason, 'speed');
  s.app.clock.advance(1000); livePos(s.app, u, { x: 300, z: 0, m: 1 }); assert.equal(p.x, 0, 'even in a car, 300 m inside the 3 s credit is too fast');
});
test('heartbeat trail with backdated samples cannot buy distance either', async () => {
  const { s, u, p } = setup(); s.app.clock.advance(120000);
  const trail = Array.from({ length: 40 }, (_, i) => ({ a: 120000 - i * 3000, x: (i + 1) * 15, z: 0, ry: 0 }));
  await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { trail, mode: 'walk' } }); assert.ok(p.x <= 7 * 1.6 * 12 + 15, `moved ${p.x}`);
});
test('normal walking and driving pass', () => {
  const { s, u, p } = setup();
  for (let i = 1; i <= 20; i++) { s.app.clock.advance(200); livePos(s.app, u, { x: i * 1, z: 0, m: 0 }); } assert.equal(p.x, 20); assert.notEqual(p.force?.reason, 'speed');
  for (let i = 1; i <= 20; i++) { s.app.clock.advance(200); livePos(s.app, u, { x: 20 + i * 7, z: 0, m: 1 }); } assert.equal(p.x, 160, '35 m/s by car is fine');
});
test('legitimate server-side teleports still work: city change, test/admin teleport, taxi travel', async () => {
  const { s, u, p } = setup(); enterCity(s.app, u, 'lagos-lekki'); const sx = p.x, sz = p.z; s.app.clock.advance(300); livePos(s.app, u, { x: sx + 1, z: sz, m: 0 }); assert.equal(p.x, sx + 1);
  enterCity(s.app, u, 'lagos-mainland'); at(s, u, 300, -300); s.app.clock.advance(300); livePos(s.app, u, { x: 301, z: -300, m: 0 }); assert.equal(p.x, 301);
  // a server move that only sets p.x/p.z (police hold style) is the new anchor
  p.x = -100; p.z = -100; s.app.clock.advance(300); syncPos(s.app, u, { x: -99, z: -100 }); assert.equal(p.x, -99);
});
test('a fresh player with an empty history (first join / after a restart) walks normally and moves', async () => {
  const s = makeServer(); const u = mkUser(s); const p = ensurePresence(s.app, u); p.trail = []; const x0 = p.x, z0 = p.z;
  for (let i = 1; i <= 10; i++) { s.app.clock.advance(1000); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { mode: 'walk', trail: [{ a: 0, x: x0 + i * 6, z: z0, ry: 0 }] } }); }
  assert.equal(p.x, x0 + 60, 'server position follows normal walking'); assert.notEqual(p.force?.reason, 'speed');
  const q = ensurePresence(s.app, mkUser(s)); q.trail = []; const qx = q.x; s.app.clock.advance(500); livePos(s.app, q.id, { x: qx + 3, z: q.z, m: 0 }); assert.equal(q.x, qx + 3, 'a fresh live position step also moves');
});
test('after that fresh player has moved, a teleport is still rejected and snapped back', async () => {
  const s = makeServer(); const u = mkUser(s); const p = ensurePresence(s.app, u); p.trail = []; const x0 = p.x, z0 = p.z;
  for (let i = 1; i <= 5; i++) { s.app.clock.advance(1000); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { mode: 'walk', trail: [{ a: 0, x: x0 + i * 6, z: z0, ry: 0 }] } }); }
  assert.equal(p.x, x0 + 30);
  s.app.clock.advance(30000); const hb = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { mode: 'walk', trail: [{ a: 0, x: x0 + 330, z: z0, ry: 0 }] } });
  assert.equal(p.x, x0 + 30, 'idle then a 300 m jump is rejected'); assert.ok(JSON.stringify(hb).includes('"speed"'), 'the client is told to snap back');
  const q = ensurePresence(s.app, mkUser(s)); q.trail = []; const qx = q.x; s.app.clock.advance(1000); livePos(s.app, q.id, { x: qx + 300, z: q.z, m: 0 }); assert.equal(q.x, qx, 'an empty history does not allow a teleport either');
});
