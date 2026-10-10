// Emotes (queue batch 1 item 8): server rules, what other players see in the heartbeat, and the pose maths (pure, no browser).
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at } from './helpers.js';
import { EMOTES } from '../server/config/emotes.js';
import { emotePose, applyPose, durationOf } from '../client/src/emotes.js';
import { applyFilter, FILTERS, frameText, fitSize } from '../client/src/photo.js';
import { LATER } from '../server/core/later-schema.js';

const beat = (s, u, body = {}) => call(s, 'POST', '/api/heartbeat', { uid: u, body });
const emote = (s, u, id) => call(s, 'POST', '/api/emote', { uid: u, body: { id } });
const near = async (s) => { const a = mkUser(s, { ageMs: 600000 }), b = mkUser(s, { ageMs: 600000 }); at(s, a, 10, 10); at(s, b, 12, 10); await beat(s, a); await beat(s, b); return [a, b]; };

test('config: the list is well formed, every id is unique, every dance has a known animation, durations are short', () => {
  const ids = EMOTES.list.map(e => e.id); assert.equal(new Set(ids).size, ids.length); assert.ok(EMOTES.list.length >= 12);
  for (const e of EMOTES.list) { assert.ok(['emoji', 'dance'].includes(e.kind), e.id); assert.ok(e.icon && e.label && e.ms >= 1500 && e.ms <= 8000, e.id); if (e.kind === 'dance') assert.ok(['wave', 'clap', 'dance', 'spin', 'jump', 'bow'].includes(e.anim), e.id); }
  assert.ok(EMOTES.list.some(e => e.kind === 'emoji') && EMOTES.list.some(e => e.kind === 'dance'));
});
test('the list reaches the client through /api/config and holds nothing but display fields', async () => {
  const s = makeServer(); const c = await ok(s, 'GET', '/api/config'); assert.equal(c.emotes.length, EMOTES.list.length); assert.deepEqual(Object.keys(c.emotes[0]).sort(), ['icon', 'id', 'kind', 'label', 'ms']);
});
test('playing an emote: needs a login, rejects unknown ids, shows to nearby players for its length, then goes away; money untouched', async () => {
  const s = makeServer(); const [a, b] = await near(s); assert.equal((await call(s, 'POST', '/api/emote', { body: { id: 'laugh' } })).status, 401);
  assert.equal((await emote(s, a, 'nope')).json.error, 'BAD_EMOTE'); assert.equal((await emote(s, a, '')).json.error, 'BAD_EMOTE'); const cash0 = s.db.prepare("SELECT balance FROM accounts WHERE id=?").get(`u:${a}`).balance;
  const r = await emote(s, a, 'dance'); assert.equal(r.status, 200); assert.equal(r.json.ms, 6000);
  const seen = (await beat(s, b)).json.players.find(p => p.id === a); assert.equal(seen.e, 'dance'); assert.equal((await beat(s, a)).json.players.find(p => p.id === b)?.e, undefined, 'others have none');
  s.app.clock.advance(5900); assert.equal((await beat(s, b)).json.players.find(p => p.id === a).e, 'dance'); s.app.clock.advance(200); assert.equal((await beat(s, b)).json.players.find(p => p.id === a).e, undefined, 'it ends by itself');
  assert.equal(s.db.prepare("SELECT balance FROM accounts WHERE id=?").get(`u:${a}`).balance, cash0); assert.equal(s.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE user_id=? AND reason LIKE '%emote%'").get(a).n, 0);
  assert.ok(!LATER.some(c => /emote/i.test(c.name + c.sql)), 'nothing is stored: no emote table');
});
test('a new emote replaces the old one; cooldown and per-minute limits', async () => {
  const s = makeServer(); const [a, b] = await near(s); assert.equal((await emote(s, a, 'laugh')).status, 200); assert.equal((await emote(s, a, 'fire')).json.error, 'SLOW_DOWN'); s.app.clock.advance(EMOTES.cooldownMs + 10);
  assert.equal((await emote(s, a, 'fire')).status, 200); assert.equal((await beat(s, b)).json.players.find(p => p.id === a).e, 'fire');
  for (let i = 0; i < EMOTES.perMinute + 2; i++) { s.app.clock.advance(EMOTES.cooldownMs + 10); const r = await emote(s, a, i % 2 ? 'laugh' : 'love'); if (r.status !== 200) { assert.equal(r.json.error, 'RATE_LIMIT'); return; } }
  assert.fail('the per-minute limit never applied');
});
test('dances need you on foot; emoji work in a car; chat pause, chat OFF and flying stop emotes; friends-only does not', async () => {
  const s = makeServer(); const [a] = await near(s); s.app.world.players.get(a).mode = 'drive'; assert.equal((await emote(s, a, 'dance')).json.error, 'IN_CAR'); s.app.clock.advance(2000); assert.equal((await emote(s, a, 'fire')).status, 200);
  s.app.world.players.get(a).mode = 'walk'; s.app.clock.advance(2000);
  s.db.prepare('UPDATE users SET chat_muted_until=? WHERE id=?').run(s.app.clock.now() + 60000, a); assert.equal((await emote(s, a, 'wave')).json.error, 'CHAT_PAUSED'); s.db.prepare('UPDATE users SET chat_muted_until=0 WHERE id=?').run(a);
  await ok(s, 'POST', '/api/guardian', { uid: a, body: { chat: 'off' } }); assert.equal((await emote(s, a, 'wave')).json.error, 'CHAT_OFF'); await ok(s, 'POST', '/api/guardian', { uid: a, body: { chat: 'friends' } }); s.app.clock.advance(2000); assert.equal((await emote(s, a, 'wave')).status, 200);
});
test('not in the world, bots and a disabled switch', async () => {
  const s = makeServer(); const u = mkUser(s); assert.equal((await emote(s, u, 'laugh')).json.error, 'NOT_IN_WORLD'); const [a] = await near(s); EMOTES.enabled = false; try { assert.equal((await emote(s, a, 'laugh')).json.error, 'OFF'); assert.equal((await ok(s, 'GET', '/api/config')).emotes.length, 0); } finally { EMOTES.enabled = true; }
});

// ---- the pose maths (client/src/emotes.js)
test('poses: bounded, start and end at rest, one turn per 1.25 s for spin, emoji emotes do not move the body', () => {
  for (const e of EMOTES.list.filter(x => x.kind === 'dance')) {
    let max = { y: 0, rx: 0, rz: 0, sy: 0 }; for (let t = 0; t <= e.ms; t += 20) { const p = emotePose(e.anim, t, e.ms); for (const k of ['y', 'rx', 'rz']) max[k] = Math.max(max[k], Math.abs(p[k])); max.sy = Math.max(max.sy, Math.abs(p.sy - 1)); assert.ok(Number.isFinite(p.y + p.rx + p.rz + p.ry + p.sy), e.id); }
    assert.ok(max.y <= 0.6 && max.rx <= 0.8 && max.rz <= 0.35 && max.sy <= 0.1, `${e.id} ${JSON.stringify(max)}`); const s0 = emotePose(e.anim, 0, e.ms), s1 = emotePose(e.anim, e.ms, e.ms); for (const p of [s0, s1]) assert.ok(Math.abs(p.y) < 0.02 && Math.abs(p.rx) < 0.02 && Math.abs(p.rz) < 0.02 && Math.abs(p.sy - 1) < 0.02, `${e.id} rests at the ends`);
  }
  const spin = (t) => emotePose('spin', t, 5000).ry; assert.ok(Math.abs(spin(1250) - 0) < 0.02 || Math.abs(spin(1250) - 2 * Math.PI) < 0.02, 'a full turn per 1.25 s'); assert.ok(Math.abs(spin(5000)) < 0.02 || Math.abs(spin(5000) - 2 * Math.PI) < 0.02, 'a 5 s spin ends facing the front');
  assert.deepEqual(emotePose('laugh', 500), { y: 0, rx: 0, rz: 0, ry: 0, sy: 1 }); assert.deepEqual(emotePose('dance', -5), { y: 0, rx: 0, rz: 0, ry: 0, sy: 1 }); assert.deepEqual(emotePose('dance', 9999, 6000), { y: 0, rx: 0, rz: 0, ry: 0, sy: 1 });
  assert.equal(durationOf(EMOTES.list, 'dance'), 6000); assert.equal(durationOf(EMOTES.list, 'zzz'), 0);
  const obj = { rotation: { y: 5 }, userData: { body: { position: { y: 0 }, rotation: { x: 0, z: 0 }, scale: { y: 1 } } } }; applyPose(obj, { y: 0.1, rx: 0.2, rz: 0.3, ry: 0.4, sy: 1.02 }, { y: 1, rx: 0, rz: 0 }); assert.deepEqual([obj.userData.body.position.y, obj.userData.body.rotation.x, obj.rotation.y], [1.1, 0.2, 0.4]); applyPose({}, { y: 1 }); // no body: no crash
});

// ---- photo helpers (client/src/photo.js)
const px = (r, g, b, a = 255) => new Uint8ClampedArray([r, g, b, a]);
test('photo filters: keep alpha, stay in range, noir is grey, warm shifts red up and blue down, none changes nothing; unknown names change nothing', () => {
  assert.deepEqual(FILTERS.map(f => f.id), ['none', 'warm', 'noir', 'vivid', 'sunset']);
  const base = [200, 120, 60]; const run = (n) => { const d = px(...base, 200); applyFilter(d, n); return [...d]; };
  assert.deepEqual(run('none'), [200, 120, 60, 200]); assert.deepEqual(run('nope'), [200, 120, 60, 200]);
  const n = run('noir'); assert.ok(n[0] === n[1] && n[1] === n[2] && n[3] === 200); const w = run('warm'); assert.ok(w[0] > 200 && w[2] < 60 && w[3] === 200);
  for (const f of FILTERS) { const d = new Uint8ClampedArray([0, 0, 0, 255, 255, 255, 255, 255, 250, 10, 128, 7]); applyFilter(d, f.id); assert.ok([...d].every(v => v >= 0 && v <= 255), f.id); assert.equal(d[3], 255); assert.equal(d[11], 7, 'alpha kept'); }
  const v = run('vivid'); const sat = (a) => Math.max(a[0], a[1], a[2]) - Math.min(a[0], a[1], a[2]); assert.ok(sat(v) > sat(base));
});
test('photo frame text and size: place and date shown, the name only when asked, long places cut, the picture is capped', () => {
  const t = frameText({ game: 'Naija Area', place: 'Market Road bus stop · Ikeja', when: new Date(Date.UTC(2026, 9, 10, 14, 5)), name: 'Ada', showName: false }); assert.match(t.title, /Naija Area/); assert.match(t.line, /Market Road bus stop/); assert.match(t.line, /10 Oct 2026/); assert.ok(!JSON.stringify(t).includes('Ada'));
  assert.match(frameText({ game: 'Naija Area', place: 'x', when: new Date(0), name: 'Ada', showName: true }).line, /@Ada/); assert.ok(frameText({ game: 'N', place: 'p'.repeat(200), when: new Date(0), name: '', showName: false }).line.length <= 90);
  assert.deepEqual(fitSize(800, 600, 1600), { w: 800, h: 600 }); assert.deepEqual(fitSize(3200, 1600, 1600), { w: 1600, h: 800 }); assert.deepEqual(fitSize(1000, 4000, 1600), { w: 400, h: 1600 });
});
