import test from 'node:test'; import assert from 'node:assert/strict';
import { stateLabel, scoreText, kickoffText, ago, sourceLine, groupByLeague } from '../client/src/scores-view.js';
import { stadiumTiers, stadiumCrowd, STADIUM } from '../client/src/landmarks3d.js';

test('score board text: live minute, half time, full time, upcoming kick-off in Lagos time', () => {
  assert.equal(stateLabel({ state: 'live', status: '2H', minute: 63 }), "63'"); assert.equal(stateLabel({ state: 'live', status: 'HT', minute: 45 }), 'Half time'); assert.equal(stateLabel({ state: 'finished' }), 'Full time'); assert.equal(stateLabel({ state: 'upcoming' }), 'Not started');
  assert.equal(scoreText({ state: 'live', homeGoals: 2, awayGoals: 1 }), '2 - 1'); assert.equal(scoreText({ state: 'upcoming', homeGoals: null }), 'vs'); assert.equal(kickoffText({ kickoff: Date.UTC(2026, 9, 10, 14, 5) }), '15:05');
  assert.equal(ago(20000), 'just now'); assert.equal(ago(5 * 60000), '5 min ago'); assert.equal(ago(3 * 3600000), '3 h ago');
});
test('source line tells the truth: sample, live, stale, or the reason for the fictional fallback', () => {
  const now = 1e12; assert.match(sourceLine({ label: 'Sample data (mock provider)', updatedAt: now - 60000, source: 'mock' }, now), /updated 1 min ago/);
  assert.match(sourceLine({ label: 'Live', updatedAt: now - 1, source: 'api-football', stale: true }, now), /may be out of date/);
  assert.match(sourceLine({ label: 'Fictional league (no live feed)', updatedAt: now, source: 'fictional', fallbackReason: 'cap_reached' }, now), /daily call limit reached/); assert.match(sourceLine({ label: 'F', source: 'fictional', fallbackReason: 'no_key' }, now), /no API key yet/);
});
test('fixtures are grouped by league in order', () => { const g = groupByLeague([{ league: 'A', country: 'Nigeria' }, { league: 'B', country: 'Fictional' }, { league: 'A', country: 'Nigeria' }]); assert.deepEqual(g.map(x => [x.league, x.fixtures.length]), [['A · Nigeria', 2], ['B', 1]]); });
test('stadium tiers: each ring is higher than the one inside it, and the outermost fits inside the building with room for the wall', () => {
  const b = { w: 80, d: 66 }; const T = stadiumTiers(b); assert.equal(T.length, STADIUM.tiers); for (let i = 1; i < T.length; i++) { assert.ok(T[i].h > T[i - 1].h); assert.equal(T[i].hx0, T[i - 1].hx1); assert.equal(T[i].hz0, T[i - 1].hz1); }
  const last = T[T.length - 1]; assert.ok(last.hx1 <= b.w / 2 - 1, `x ${last.hx1}`); assert.ok(last.hz1 <= b.d / 2 - 1, `z ${last.hz1}`);
});
test('stadium crowd: every spectator stands on a tier (never on the pitch or the track) and inside the building', () => {
  let s = 3; const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; const b = { w: 80, d: 66 }; const pts = stadiumCrowd(b, 600, rnd); assert.equal(pts.length, 600); const S = STADIUM;
  for (const p of pts) { assert.ok(Math.abs(p.x) <= b.w / 2 && Math.abs(p.z) <= b.d / 2); const onPitchOrTrack = Math.abs(p.x) < S.pitchHx + S.track && Math.abs(p.z) < S.pitchHz + S.track; assert.ok(!onPitchOrTrack, `${p.x},${p.z}`); assert.ok(p.y >= 2 && p.y <= 6); }
});
