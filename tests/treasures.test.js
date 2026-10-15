import test from 'node:test';
import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at } from './helpers.js';
import { TREASURES, treasureWorth } from '../server/core/treasures.js';
import { balanceOf, cashId, checkInvariants } from '../server/core/ledger.js';
import { enterCity } from '../server/core/cities.js';
import { buildModel } from '../client/src/map-model.js';

const MIN = 1_000_000_000, MAX = 10_000_000_000;

test('100 treasures across Abule, Ijebu-Ode, Lagos and Abuja, each ₦1bn to ₦10bn', async () => {
  assert.equal(TREASURES.length, 100);
  assert.equal(new Set(TREASURES.map(t => t.id)).size, 100);
  assert.equal(TREASURES.filter(t => t.city === 'ogun-abule').length, 12);
  assert.equal(TREASURES.filter(t => t.city === 'ogun-ijebu').length, 18);
  assert.equal(TREASURES.filter(t => t.city === 'abuja').length, 3);
  assert.equal(TREASURES.filter(t => t.city.startsWith('lagos-')).length, 67);
  const amounts = TREASURES.map(t => treasureWorth(t.id));
  for (const w of amounts) { assert.ok(w >= MIN && w <= MAX); assert.equal(w % 100_000_000, 0); }
  assert.ok(new Set(amounts).size >= 20);
  const s = makeServer();
  const city = await ok(s, 'GET', '/api/city');
  assert.equal(city.id, 'lagos-mainland');
  assert.equal(city.treasures.length, 43);
  assert.ok(city.treasures.every(t => t.taken === false && t.worth >= MIN && t.worth <= MAX));
  const model = buildModel(city);
  assert.equal(model.items.some(i => i.type === 'treasure' || /treasure/i.test(i.name || '')), false);
  assert.equal(model.catalogue.some(i => /treasure/i.test(i.name || '')), false);
  const behind = (b, x, z) => {
    const fx = b.face?.[0] || 0, fz = b.face?.[1] || 0;
    const wall = Math.abs(fx) > 0.5 ? (fx > 0 ? (b.x - b.w / 2) - x : x - (b.x + b.w / 2)) : (fz > 0 ? (b.z - b.d / 2) - z : z - (b.z + b.d / 2));
    return wall >= 2 && wall <= 16;
  };
  for (const [id, list] of Object.entries(TREASURES.reduce((m, t) => ((m[t.city] ||= []).push(t), m), {}))) {
    const buildings = s.app.cities[id].buildings;
    for (let i = 0; i < list.length; i++) {
      let best = null, bd = Infinity;
      for (const b of buildings) { const dx = Math.max(Math.abs(list[i].x - b.x) - b.w / 2, 0), dz = Math.max(Math.abs(list[i].z - b.z) - b.d / 2, 0), d = Math.hypot(dx, dz); if (d < bd) { bd = d; best = b; } }
      assert.equal(behind(best, list[i].x, list[i].z), true, list[i].id);
      for (let j = i + 1; j < list.length; j++) assert.ok(Math.hypot(list[i].x - list[j].x, list[i].z - list[j].z) >= 30, list[i].id);
    }
  }
});

test('only the first player can take a treasure, and they are paid once', async () => {
  const s = makeServer();
  const city = await ok(s, 'GET', '/api/city');
  const t = city.treasures[0];
  const other = city.treasures.find(x => Math.hypot(x.x - t.x, x.z - t.z) > 40);
  const uid = mkUser(s), uid2 = mkUser(s);
  const start = balanceOf(s.app.db, cashId(uid));
  at(s, uid, t.x, t.z);
  const r = await ok(s, 'POST', '/api/treasures/claim', { uid, body: { id: t.id, pos: { x: t.x, z: t.z, ry: 0 } } });
  assert.equal(r.amount, t.worth);
  assert.equal(r.duplicate, false);
  assert.equal(balanceOf(s.app.db, cashId(uid)), start + t.worth);
  const again = await ok(s, 'POST', '/api/treasures/claim', { uid, body: { id: t.id, pos: { x: t.x, z: t.z, ry: 0 } } });
  assert.equal(again.duplicate, true);
  assert.equal(balanceOf(s.app.db, cashId(uid)), start + t.worth);
  const start2 = balanceOf(s.app.db, cashId(uid2));
  at(s, uid2, t.x, t.z);
  const denied = await call(s, 'POST', '/api/treasures/claim', { uid: uid2, body: { id: t.id, pos: { x: t.x, z: t.z, ry: 0 } } });
  assert.equal(denied.status, 409);
  assert.equal(denied.json.error, 'TAKEN');
  assert.equal(balanceOf(s.app.db, cashId(uid2)), start2);
  const far = await call(s, 'POST', '/api/treasures/claim', { uid, body: { id: other.id, pos: { x: t.x, z: t.z, ry: 0 } } });
  assert.equal(far.status, 409);
  assert.equal(far.json.error, 'TOO_FAR');
  enterCity(s.app, uid, 'abuja');
  const wrong = await call(s, 'POST', '/api/treasures/claim', { uid, body: { id: other.id, pos: { x: other.x, z: other.z, ry: 0 } } });
  assert.equal(wrong.status, 409);
  assert.equal(wrong.json.error, 'WRONG_CITY');
  assert.equal(checkInvariants(s.app.db).ok, true);
});

test('admin treasures lists collectors and remaining chests', async () => {
  const s = makeServer();
  const city = await ok(s, 'GET', '/api/city');
  const t = city.treasures[0];
  const uid = mkUser(s);
  at(s, uid, t.x, t.z);
  await ok(s, 'POST', '/api/treasures/claim', { uid, body: { id: t.id, pos: { x: t.x, z: t.z, ry: 0 } } });
  assert.equal((await call(s, 'GET', '/api/admin/treasures', { uid })).status, 401);
  const d = await ok(s, 'GET', '/api/admin/treasures', { admin: true });
  assert.equal(d.summary.worldTotal, 100);
  assert.equal(d.summary.collected, 1);
  assert.equal(d.summary.remaining, 99);
  const taken = d.collected.find((r) => r.id === t.id);
  assert.ok(taken);
  assert.equal(taken.collector.id, uid);
  assert.ok(taken.claimedAt);
  assert.ok(d.remaining.every((r) => !r.taken));
  assert.ok(d.remaining.some((r) => r.cityId === t.city || r.id !== t.id));
  const ov = await ok(s, 'GET', '/api/admin/overview', { admin: true });
  assert.equal(ov.treasures.collected, 1);
  assert.equal(ov.treasures.remaining, 99);
  const filtered = await ok(s, 'GET', `/api/admin/treasures?city=${encodeURIComponent(city.id)}&q=${encodeURIComponent(taken.collector.username)}`, { admin: true });
  assert.equal(filtered.summary.collected, 1);
  assert.ok(filtered.collected.every((r) => r.id === t.id));
});