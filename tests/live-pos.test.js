import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok } from './helpers.js';
import { livePos, snapshotMoves } from '../server/core/world.js';
import { teleport } from '../server/core/world.js';

const join = async (s, uid, x, z) => { teleport(s.app, uid, x, z); await ok(s, 'POST', '/api/heartbeat', { uid, body: { trail: [{ a: 0, x, z, ry: 0 }] } }); };

test('live position: nearby watcher receives the move, a far player does not, and a teleport is clamped', async () => {
  const s = makeServer(); const a = mkUser(s), b = mkUser(s), c = mkUser(s);
  await join(s, a, 0, 0); await join(s, b, 20, 0); await join(s, c, -220, -200);
  s.app.clock.advance(400);
  assert.equal(livePos(s.app, b, { x: 22, z: 0, ry: 0.4, m: 0 }), true);
  const pack = snapshotMoves(s.app, a);
  assert.equal(pack.length, 1); assert.equal(pack[0].id, b); assert.ok(Math.abs(pack[0].x - 22) < 0.05, pack[0].x); assert.equal(pack[0].m, 0);
  assert.equal(snapshotMoves(s.app, a), null); // nothing new
  s.app.clock.advance(150);
  assert.equal(livePos(s.app, b, { x: 400, z: 0, ry: 0, m: 0 }), true); // 1s would be needed; 150ms walk cannot cross the city
  const p = s.app.world.players.get(b); assert.ok(p.x < 40, `clamped x ${p.x}`);
  assert.equal(snapshotMoves(s.app, c), null); // c is far from b
});

test('live position: a second update inside the same tenth of a second is dropped', async () => {
  const s = makeServer(); const a = mkUser(s); await join(s, a, 0, 0);
  s.app.clock.advance(150);
  assert.equal(livePos(s.app, a, { x: 1, z: 0, ry: 0, m: 0 }), true);
  assert.equal(livePos(s.app, a, { x: 2, z: 0, ry: 0, m: 0 }), false);
  assert.ok(s.app.world.players.get(a).x < 1.5);
});

test('live position: 200 nearby players, one snapshot stays quick', async () => {
  const s = makeServer(); const ids = [];
  for (let i = 0; i < 200; i++) ids.push(mkUser(s, { bot: true }));
  for (let i = 0; i < 200; i++) await join(s, ids[i], (i % 20) * 3, Math.floor(i / 20) * 3);
  s.app.clock.advance(200);
  for (let i = 1; i < 200; i++) { s.app.clock.advance(1); livePos(s.app, ids[i], { x: (i % 20) * 3 + 0.2, z: Math.floor(i / 20) * 3, ry: 0, m: 0 }); }
  const t0 = performance.now(); const pack = snapshotMoves(s.app, ids[0]); const ms = performance.now() - t0;
  assert.ok(pack && pack.length === 60, `got ${pack && pack.length}`); // closest 60 of the crowd
  assert.ok(ms < 40, `snapshot took ${ms.toFixed(1)} ms`);
});
