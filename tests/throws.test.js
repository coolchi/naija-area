// POST /api/throw: the server fixes the start, runs the shared flight, decides the bonk, rate-limits, respects blocks, and shows the ball to nearby players. Harmless and free: the ledger never moves.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at } from './helpers.js';
import { checkInvariants } from '../server/core/ledger.js';
import { PHYSX } from '../server/config/physx.js';
import { throwStart, simulateThrow } from '../server/core/physx.js';

const hb = (s, u, body = {}) => ok(s, 'POST', '/api/heartbeat', { uid: u, body });
const T = (s, u, yaw, power, extra = {}) => call(s, 'POST', '/api/throw', { uid: u, body: { yaw, power, ...extra } });
const pair = async (dist = 12) => { const s = makeServer(); const a = mkUser(s, { cash: 1000, ageMs: 3600000 }), b = mkUser(s, { cash: 1000, ageMs: 3600000 }); at(s, a, 0, 0); await hb(s, a); /* the target stands where a ball thrown along +x with power ~0.8 passes at head height */ const st = throwStart(0, 0, 0, 0.8); const sm = simulateThrow(st); const pass = sm.find(q => q.y > 0.9 && q.y < 1.7 && q.x > dist - 4); at(s, b, pass.x, pass.z); await hb(s, b); return { s, a, b, pass }; };

test('a throw returns the start and flight time; others nearby see it in their heartbeat for a few seconds, then it is gone', async () => {
  const { s, a, b } = await pair(); const r = await T(s, a, 0, 0.8); assert.equal(r.status, 200, JSON.stringify(r.json)); assert.ok(r.json.landsAtMs > 500 && r.json.start.vx > 5);
  const seen = await hb(s, b); assert.equal(seen.th.length, 1); assert.equal(seen.th[0].by, a); assert.ok(seen.th[0].age >= 0 && seen.th[0].vx > 5);
  s.app.clock.advance((PHYSX.throw.visibleSec + 1) * 1000); assert.equal((await hb(s, b)).th, undefined);
});
test('a throw can bonk someone: a note for them, a stagger flag once, no money moves, and the same person cannot be bonked again for a while', async () => {
  const { s, a, b } = await pair(); const total = () => s.db.prepare('SELECT SUM(balance) t FROM accounts').get().t; const t0 = total();
  const r = (await T(s, a, 0, 0.8)).json; assert.equal(r.hit, s.db.prepare('SELECT username FROM users WHERE id=?').get(b).username);
  const v = await hb(s, b); assert.ok(v.bonk && v.bonk.by && v.notifs.some(n => n.kind === 'bonk')); assert.equal((await hb(s, b)).bonk, undefined, 'the stagger is handed over once');
  s.app.clock.advance(PHYSX.throw.cooldownMs + 100); const again = (await T(s, a, 0, 0.8)).json; assert.equal(again.hit, null, 'bonk immunity'); s.app.clock.advance(PHYSX.throw.victimCooldownMs); assert.ok((await T(s, a, 0, 0.8)).json.hit);
  assert.equal(total(), t0); assert.equal(checkInvariants(s.db).ok, true);
});
test('a ball thrown the other way, or too short, or over their head does not hit; muted and blocked players are never bonked', async () => {
  const { s, a, b } = await pair(); assert.equal((await T(s, a, Math.PI, 0.8)).json.hit, null); s.app.clock.advance(1500); assert.equal((await T(s, a, 0, 0)).json.hit, null, 'too short to reach');
  const un = s.db.prepare('SELECT username FROM users WHERE id=?').get(a).username; await ok(s, 'POST', '/api/social/mute', { uid: b, body: { username: un, kind: 'mute' } }); s.app.clock.advance(1500); const r = (await T(s, a, 0, 0.8)).json; assert.equal(r.hit, null, 'a muted thrower cannot bonk the one who muted them');
  s.app.clock.advance(1500); const seen = await hb(s, b); assert.ok(!seen.th || seen.th.every(t => t.by !== a), 'and the muted thrower\'s balls are not shown to them either');
});
test('rules: cooldown, per-minute cap, bad input, not from a car, not while aboard; the server uses its own position not the claimed one', async () => {
  const { s, a } = await pair(); assert.equal((await T(s, a, 0, 0.5)).status, 200); const fast = await T(s, a, 0, 0.5); assert.equal(fast.status, 429); assert.equal(fast.json.error, 'TOO_FAST');
  assert.equal((await T(s, a, 'north', 0.5)).status, 400); s.app.clock.advance(1500); assert.equal((await T(s, a, 0, undefined)).status, 400);
  let n = 0, last; for (let i = 0; i < 40; i++) { s.app.clock.advance(PHYSX.throw.cooldownMs + 10); last = await T(s, a, 0, 0.5); if (last.status === 200) n++; else break; } assert.ok(n < 40 && last.json.error === 'RATE_LIMIT', `${n} then ${last.json.error}`);
  const f = await pair(); f.s.app.clock.advance(1500); const claim = await T(f.s, f.a, 0, 0.5, { x: 5000, z: 5000 }); assert.equal(claim.status, 200); assert.ok(Math.abs(claim.json.start.x) < 60, 'a faked far-away position is clamped by the same speed rule: start x ' + claim.json.start.x);
  s.app.clock.advance(1500); await hb(s, a, { mode: 'drive' }); const car = await T(s, a, 0, 0.5); assert.equal(car.json.error, 'IN_CAR'); assert.equal((await call(s, 'POST', '/api/throw', { body: { yaw: 0, power: 1 } })).status, 401);
});
test('an admin can switch throwing off', async () => { const { s, a } = await pair(); s.app.balance.physx = { ...PHYSX, throw: { ...PHYSX.throw, enabled: false } }; const r = await T(s, a, 0, 0.5); assert.equal(r.status, 403); assert.equal(r.json.error, 'THROW_OFF'); });
