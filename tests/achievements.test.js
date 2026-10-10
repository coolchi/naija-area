// Achievements and titles (queue batch 1 item 5): lifetime counters, one-time unlock, title choice, titles shown with the name (presence, chat).
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at } from './helpers.js';
import { checkInvariants, move, cashId, SYS } from '../server/core/ledger.js';
import { ACHIEVEMENTS } from '../server/config/progress.js';
import { METRIC_KINDS } from '../server/core/progress-metrics.js';
import { evaluate, titleOf } from '../server/core/achievements.js';

const wage = (s, u, n = 1, tag = '') => { for (let i = 0; i < n; i++) move(s.app, { from: SYS.FAUCET_JOBS, to: cashId(u), amount: 10, reason: 'job_wage', ref: 'x', userId: u, idemKey: `w:${u}:${tag}${i}` }); };
const hb = (s, u) => ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
const ach = (v, id) => v.achievements.find(a => a.id === id);

test('the list is well formed: unique ids and titles, known metric kinds, positive targets, plain titles', () => {
  const ids = ACHIEVEMENTS.list.map(a => a.id); assert.equal(new Set(ids).size, ids.length); const titles = ACHIEVEMENTS.list.filter(a => a.title).map(a => a.title); assert.equal(new Set(titles).size, titles.length);
  for (const a of ACHIEVEMENTS.list) { assert.ok(METRIC_KINDS.includes(a.metric.k), a.id); assert.ok(a.target > 0 && a.name && a.desc && a.icon, a.id); if (a.title) assert.ok(a.title.length <= 18, 'short enough for a name tag: ' + a.title); }
  assert.ok(ACHIEVEMENTS.list.length >= 15);
});
test('earning: the counter is lifetime, an achievement unlocks once with an alert, progress is shown, the book is untouched', async () => {
  const s = makeServer(); const u = mkUser(s); let v = await ok(s, 'GET', '/api/achievements', { uid: u }); assert.equal(v.earnedCount, 0); assert.equal(ach(v, 'hustler').progress, 0);
  wage(s, u, 1); v = await ok(s, 'GET', '/api/achievements', { uid: u }); assert.equal(ach(v, 'first_pay').earned, true); assert.equal(ach(v, 'hustler').earned, false); assert.equal(ach(v, 'hustler').progress, 1);
  wage(s, u, 9, 'b'); v = await ok(s, 'GET', '/api/achievements', { uid: u }); assert.equal(ach(v, 'hustler').earned, true); const at1 = ach(v, 'hustler').earnedAt; s.app.clock.advance(60000); v = await ok(s, 'GET', '/api/achievements', { uid: u }); assert.equal(ach(v, 'hustler').earnedAt, at1, 'recorded once');
  assert.equal(s.app.db.prepare("SELECT COUNT(*) n FROM notifications WHERE user_id=? AND kind='achievement'").get(u).n, 2); assert.equal(checkInvariants(s.app.db).ok, true); assert.equal(await ok(s, 'GET', '/api/me', { uid: u }).then(r => !!r.user), true);
});
test('evaluation from /api/me is throttled so a busy player does not run the counters every call', async () => {
  const s = makeServer(); const u = mkUser(s); await ok(s, 'GET', '/api/me', { uid: u }); wage(s, u, 1); assert.deepEqual(evaluate(s.app, u), []); await ok(s, 'GET', '/api/me', { uid: u }); assert.equal(s.app.db.prepare('SELECT COUNT(*) n FROM achievements WHERE user_id=?').get(u).n, 0, 'inside the window nothing is checked');
  s.app.clock.advance(ACHIEVEMENTS.evalEveryMs + 1000); await ok(s, 'GET', '/api/me', { uid: u }); assert.equal(s.app.db.prepare('SELECT COUNT(*) n FROM achievements WHERE user_id=?').get(u).n, 1);
});
test('titles: none at first, the highest ranked earned one shows by default, the player can pick another, none, or go back to automatic; unearned ones are refused', async () => {
  const s = makeServer(); const u = mkUser(s); assert.equal(titleOf(s.app, u), ''); wage(s, u, 10); let v = await ok(s, 'GET', '/api/achievements', { uid: u }); assert.equal(v.showing, 'Hustler'); assert.deepEqual(v.titles.map(t => t.id), ['hustler']);
  wage(s, u, 40, 'c'); v = await ok(s, 'GET', '/api/achievements', { uid: u }); assert.equal(v.showing, 'Workhorse', 'higher rank wins by default');
  assert.equal((await call(s, 'POST', '/api/achievements/title', { uid: u, body: { id: 'chairman' } })).json.error, 'NOT_EARNED'); assert.equal((await call(s, 'POST', '/api/achievements/title', { uid: u, body: { id: 'first_pay' } })).json.error, 'NO_TITLE'); assert.equal((await call(s, 'POST', '/api/achievements/title', { uid: u, body: { id: 'nope' } })).json.error, 'NO_TITLE');
  v = await ok(s, 'POST', '/api/achievements/title', { uid: u, body: { id: 'hustler' } }); assert.equal(v.showing, 'Hustler'); assert.equal(v.selected, 'hustler'); v = await ok(s, 'POST', '/api/achievements/title', { uid: u, body: { id: '' } }); assert.equal(v.showing, ''); v = await ok(s, 'POST', '/api/achievements/title', { uid: u, body: { id: null } }); assert.equal(v.showing, 'Workhorse');
});
test('the title travels with the name: other players see it in the presence list and on chat lines; bots and untitled players add nothing', async () => {
  const s = makeServer(); const a = mkUser(s, { ageMs: 600000 }), b = mkUser(s, { ageMs: 600000 }); at(s, a, 5, 5); at(s, b, 6, 5); wage(s, a, 10); await ok(s, 'GET', '/api/achievements', { uid: a }); await hb(s, a); await hb(s, b);
  const seen = (await hb(s, b)).players.find(p => p.id === a); assert.equal(seen.t, 'Hustler'); assert.equal((await hb(s, a)).players.find(p => p.id === b).t, undefined, 'no title, no extra bytes');
  await ok(s, 'POST', '/api/chat', { uid: a, body: { text: 'good morning' } }); const r = await hb(s, b); const line = r.chat.find(c => c.t === 'good morning'); assert.equal(line.tt, 'Hustler');
  await ok(s, 'POST', '/api/achievements/title', { uid: a, body: { id: '' } }); assert.equal((await hb(s, b)).players.find(p => p.id === a).t, undefined, 'hiding the title takes effect');
});
test('other kinds: wealth, a home, wearables, crowns, login streaks and table-game wins feed achievements', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 100 }); move(s.app, { from: SYS.FAUCET_TESTTOPUP, to: cashId(u), amount: 1000000, reason: 'test_topup', userId: u, idemKey: 'big' }); let v = await ok(s, 'GET', '/api/achievements', { uid: u }); assert.equal(ach(v, 'bigfish').earned, true); assert.equal(ach(v, 'chairman').earned, false);
  s.app.db.prepare("INSERT INTO wearables_owned(user_id,item_id,price_paid,bought_at) VALUES (?,?,?,?)").run(u, 'crown_prince', 1, 1); v = await ok(s, 'GET', '/api/achievements', { uid: u }); assert.equal(ach(v, 'crowned').earned, true); assert.equal(ach(v, 'stylish').progress, 1);
  s.app.db.prepare("INSERT INTO game_scores(week,kind,user_id,wins,losses,draws,points) VALUES (1,'whot',?,10,0,0,30)").run(u); v = await ok(s, 'GET', '/api/achievements', { uid: u }); assert.equal(ach(v, 'champion').earned, true);
  for (let d = 0; d < 7; d++) { await ok(s, 'GET', '/api/me', { uid: u }); s.app.clock.advance(86400000); } v = await ok(s, 'GET', '/api/achievements', { uid: u }); assert.equal(ach(v, 'faithful').earned, true);
});
test('bots get none; off switch; download and erase', async () => {
  const s = makeServer(); const bot = mkUser(s, { bot: true }); assert.equal((await ok(s, 'GET', '/api/achievements', { uid: bot })).enabled, false); const u = mkUser(s); wage(s, u, 10); await ok(s, 'GET', '/api/achievements', { uid: u });
  const { exportData } = await import('../server/core/account.js'); assert.ok(exportData(s.app, u).achievements.earned.length >= 2); const m = await import('../server/core/achievements.js'); m.deleteMine(s.app, u); assert.equal(s.app.db.prepare('SELECT COUNT(*) n FROM achievements WHERE user_id=?').get(u).n, 0);
  ACHIEVEMENTS.enabled = false; try { assert.equal((await ok(s, 'GET', '/api/achievements', { uid: u })).enabled, false); } finally { ACHIEVEMENTS.enabled = true; }
});
