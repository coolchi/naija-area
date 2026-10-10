import test from 'node:test'; import assert from 'node:assert/strict';
import { AssetCache, ASSET_CFG } from '../client/src/assetcache.js';
const mk = (cfg = {}, t = { v: 0 }) => { const log = [], pend = new Map(), ev = []; const c = new AssetCache((k, ok, fail) => { log.push(k); pend.set(k, { ok, fail }); }, (k) => ev.push(k), { ...ASSET_CFG, ...cfg }, () => t.v); return { c, log, pend, ev, t }; };
test('nothing loads until it is requested and near; far requests wait', () => {
  const { c, log } = mk(); c.tick(); assert.deepEqual(log, []); c.request('a', 400); c.tick(); assert.deepEqual(log, [], 'beyond loadRadius'); c.request('a', 100); c.tick(); assert.deepEqual(log, ['a']);
});
test('nearest first, at most maxConcurrent at once, next starts when one finishes', () => {
  const { c, log, pend } = mk({ maxConcurrent: 2 }); c.request('far', 140); c.request('mid', 80); c.request('near', 10); c.request('x', 100); c.tick(); assert.deepEqual(log, ['near', 'mid']); pend.get('near').ok('IMG', 1000); c.tick(); assert.deepEqual(log, ['near', 'mid', 'x']); assert.equal(c.get('near'), 'IMG'); assert.equal(c.stats().loading, 2);
});
test('failures retry with back-off, then stop; coming back later resets them', () => {
  const { c, log, pend, t } = mk({ retryMs: [1000, 5000] }); c.request('a', 10); c.tick(); pend.get('a').fail(); assert.equal(c.state('a'), 'failed'); t.v = 500; c.tick(); assert.equal(log.length, 1, 'too early'); t.v = 1100; c.tick(); assert.equal(log.length, 2); pend.get('a').fail();
  t.v = 7000; c.tick(); assert.equal(log.length, 3); pend.get('a').fail(); t.v = 99999; c.tick(); assert.equal(log.length, 3, 'gave up'); c.forgetFailures(); c.request('a', 10); c.tick(); assert.equal(log.length, 4);
});
test('over budget: only far entries are evicted, farthest first, and the near one stays', () => {
  const { c, pend, ev } = mk({ budgetBytes: 2500, keepRadius: 200, maxConcurrent: 5 }); for (const k of ['n', 'f1', 'f2']) c.request(k, 10); c.tick(); for (const k of ['n', 'f1', 'f2']) pend.get(k).ok(k + '!', 1000); const dist = { n: 20, f1: 300, f2: 500 }; c.tick((k) => dist[k]);
  assert.deepEqual(ev, ['f2']); assert.equal(c.get('f2'), undefined); assert.equal(c.get('n'), 'n!'); assert.equal(c.get('f1'), 'f1!'); assert.ok(c.stats().bytes <= 2500);
  const dist2 = { n: 20, f1: 150 }; c.tick((k) => dist2[k]); assert.deepEqual(ev, ['f2'], 'under budget: nothing more evicted');
});
test('never evicts something inside keepRadius even when over budget', () => {
  const { c, pend, ev } = mk({ budgetBytes: 500, keepRadius: 200 }); c.request('a', 10); c.tick(); pend.get('a').ok('A', 1000); c.tick(() => 50); assert.deepEqual(ev, []); assert.equal(c.get('a'), 'A');
});
test('a load that finishes after its entry was evicted is released, not stored', () => {
  const { c, pend, ev } = mk({ budgetBytes: 1, keepRadius: 10, maxConcurrent: 3 }); c.request('a', 5); c.request('b', 6); c.tick(); pend.get('a').ok('A', 100); c.tick(() => 999); assert.deepEqual(ev, ['a']); pend.get('b').ok('B', 100); assert.equal(c.get('b'), 'B');
});
test('loader that throws counts as a failure and does not break the others', () => {
  const t = { v: 0 }; const c = new AssetCache((k, ok) => { if (k === 'bad') throw new Error('x'); ok('V', 1); }, () => {}, ASSET_CFG, () => t.v); c.request('bad', 1); c.request('good', 2); c.tick(); assert.equal(c.state('bad'), 'failed'); assert.equal(c.get('good'), 'V');
});
