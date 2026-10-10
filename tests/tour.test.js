import test from 'node:test'; import assert from 'node:assert/strict';
import { STEPS, stepText, nextHint, seenTour, markTour, TOUR_KEY } from '../client/src/tour.js';
const U = (o = {}) => ({ shift: null, totalShifts: 3, hunger: 80, energy: 80, health: { health: 100 }, home: { id: 'h1' }, guest: false, cash: 1000, ...o });
test('tour: six short steps, each with an icon, a title, and separate phone and desktop text that mention the right controls', () => {
  assert.equal(STEPS.length, 6); for (const s of STEPS) { assert.ok(s.icon && s.title.length < 28); assert.ok(stepText(s, true).length > 20 && stepText(s, true).length < 220); assert.ok(stepText(s, false).length < 220); }
  assert.match(stepText(STEPS[0], true), /Drag/); assert.match(stepText(STEPS[0], false), /W A S D/); assert.ok(STEPS.every(s => !/₦\d|real money you|USD/.test(stepText(s, true))), 'no price claims'); assert.ok(STEPS.some(s => /Game money only/.test(s.touch)));
});
test('hints: first match wins, in a sensible order, and healthy established players get none', () => {
  assert.equal(nextHint(null), null); assert.equal(nextHint(U({ shift: { id: 1 } })).id, 'shift'); assert.equal(nextHint(U({ totalShifts: 0 })).id, 'first_job'); assert.equal(nextHint(U({ hunger: 20, energy: 10 })).id, 'hungry'); assert.equal(nextHint(U({ energy: 10 })).id, 'tired');
  assert.equal(nextHint(U({ health: { health: 20 } })).id, 'hurt'); assert.equal(nextHint(U({ home: null })).id, 'home'); assert.equal(nextHint(U({ guest: true })).id, 'account'); assert.equal(nextHint(U({ cash: 50000 })).id, 'spend'); assert.equal(nextHint(U()), null);
  assert.equal(nextHint(U({ totalShifts: 0, hunger: 5, shift: { id: 2 } })).id, 'shift', 'running shift first');
});
test('seen/mark use the key and survive a broken store', () => {
  const m = new Map(); const st = { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v) }; assert.equal(seenTour(st), false); markTour(st); assert.equal(seenTour(st), true); assert.ok(m.has(TOUR_KEY));
  const bad = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); } }; assert.equal(seenTour(bad), true); markTour(bad);
});
