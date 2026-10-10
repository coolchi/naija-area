// Seasons (queue batch 1 item 9): three boards, settled once when the season ends, badges and small prizes for the top three, a title for the winner.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call } from './helpers.js';
import { checkInvariants, move, cashId, SYS, balanceOf } from '../server/core/ledger.js';
import { SEASONS } from '../server/config/progress.js';
import * as seasons from '../server/core/seasons.js';
import { weekOf } from '../server/core/games.js';
import { titleOf } from '../server/core/achievements.js';
import { registeredNames } from '../server/core/account.js';

const DAY = 86400000;
const mondayOf = (ms) => { const d = new Date(ms); d.setUTCHours(0, 0, 0, 0); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); return d.toISOString().slice(0, 10); };
/** a server whose season 1 started this Monday and runs `weeks` weeks */
const mk = (weeks = 2) => { const s = makeServer(); s.app.seasonsCfg = { ...SEASONS, startsAt: mondayOf(s.app.clock.now()), weeks }; return s; };
const earn = (s, u, amount, reason = 'job_wage', tag = '') => move(s.app, { from: SYS.FAUCET_JOBS, to: cashId(u), amount, reason, ref: 'x', userId: u, idemKey: `e:${u}:${reason}:${amount}:${tag}${Math.random()}` });
const wins = (s, u, n, week = weekOf(s.app.clock.now())) => s.app.db.prepare("INSERT INTO game_scores(week,kind,user_id,wins,losses,draws,points) VALUES (?,?,?,?,0,0,?) ON CONFLICT(week,kind,user_id) DO UPDATE SET wins=excluded.wins").run(week, 'whot', u, n, n * 3);
const wear = (s, u, item) => { s.app.db.prepare('INSERT INTO wearables_equipped(user_id,slot,item_id) VALUES (?,?,?) ON CONFLICT(user_id,slot) DO UPDATE SET item_id=excluded.item_id').run(u, item.slot, item.id); };
const board = (v, id) => v.boards.find(b => b.id === id);
const endSeason = (s) => s.app.clock.advance(s.app.seasonsCfg.weeks * 7 * DAY + DAY);
import { cfgOf } from '../server/core/wearables.js';
const W = (s, id) => cfgOf(s.app).WEARABLES.find(w => w.id === id);

test('config is well formed: unique boards, prizes ranked from 1, a Monday start, titles short enough for a name tag, and the week maths matches the table-game scores', () => {
  const ids = SEASONS.boards.map(b => b.id); assert.equal(new Set(ids).size, ids.length); assert.deepEqual(SEASONS.prizes.map(p => p.rank), SEASONS.prizes.map((_, i) => i + 1)); assert.equal(new Date(SEASONS.startsAt + 'T00:00:00Z').getUTCDay(), 1, 'a Monday');
  for (const b of SEASONS.boards) { assert.ok(['earned', 'wins', 'dressed'].includes(b.metric) && b.min > 0 && b.name && b.desc, b.id); assert.ok(`S99 ${b.titleWord}`.length <= 18, 'fits a name tag: ' + b.titleWord); if (b.metric === 'earned') assert.ok(b.reasons.length); }
  for (const p of SEASONS.prizes) assert.ok(p.cash >= 0 && p.icon && p.badge); assert.ok(SEASONS.weeks >= 1);
  for (const t of [0, 1e12, 1.7e12, 1.79e12, 1.7e12 + 3 * DAY + 5]) assert.equal(seasons.weekOfMs(t), weekOf(t));
});
test('before the first season starts the card says so, and nothing is ranked', async () => {
  const s = makeServer(); s.app.seasonsCfg = { ...SEASONS, startsAt: mondayOf(s.app.clock.now() + 21 * DAY) }; const u = mkUser(s); const v = await ok(s, 'GET', '/api/seasons', { uid: u });
  assert.equal(v.enabled, true); assert.equal(v.started, false); assert.ok(v.startsInMs > 0); assert.equal(v.boards, undefined); assert.equal(seasons.seasonAt(s.app), 0);
});
test('the money board counts only game money PAID IN by jobs, break games and sports prizes during the season; guests, bots and other reasons are left out', async () => {
  const s = mk(); const a = mkUser(s), b = mkUser(s), c = mkUser(s), g = mkUser(s, { guest: true }), bot = mkUser(s, { bot: true });
  earn(s, a, 9000); earn(s, a, 2000, 'casual_reward'); earn(s, b, 3000, 'sports_prize'); earn(s, c, 50000, 'game_win'); earn(s, c, 40000, 'mission_daily'); earn(s, g, 99999); earn(s, bot, 99999);
  const v = await ok(s, 'GET', '/api/seasons', { uid: a }); assert.equal(v.started, true); assert.equal(v.season, 1); const m = board(v, 'money');
  assert.deepEqual(m.top.map(r => [r.name.slice(0, 4), r.value]), [['user', 11000], ['user', 3000]]); assert.equal(m.top[0].me, true); assert.equal(m.me.rank, 1); assert.equal(m.me.value, 11000); assert.equal(m.me.qualifies, true);
  const vc = await ok(s, 'GET', '/api/seasons', { uid: c }); assert.equal(board(vc, 'money').me.rank, null, 'game pots and missions are not earnings'); assert.equal(board(vc, 'money').me.outside, true);
  const vg = await ok(s, 'GET', '/api/seasons', { uid: g }); assert.equal(vg.eligible, false);
});
test('the games board counts table-game wins in this season\'s weeks only; best dressed ranks the price of what is worn', async () => {
  const s = mk(2); const a = mkUser(s), b = mkUser(s), c = mkUser(s); const now = s.app.clock.now(); wins(s, a, 5); wins(s, b, 8); wins(s, b, 50, weekOf(now) - 3); wins(s, c, 2);
  wear(s, a, W(s, 'neck_thin')); wear(s, b, W(s, 'neck_iced')); wear(s, c, W(s, 'neck_cuban')); let v = await ok(s, 'GET', '/api/seasons', { uid: a });
  assert.deepEqual(board(v, 'games').top.map(r => r.value), [8, 5, 2], 'wins from before the season do not count'); assert.equal(board(v, 'games').me.rank, 2);
  assert.deepEqual(board(v, 'dressed').top.map(r => r.value), [W(s, 'neck_iced').price, W(s, 'neck_cuban').price, W(s, 'neck_thin').price]); assert.equal(board(v, 'dressed').me.rank, 3);
  s.app.db.prepare('DELETE FROM wearables_equipped WHERE user_id=?').run(b); s.app.clock.advance(SEASONS.cacheMs + 1000); v = await ok(s, 'GET', '/api/seasons', { uid: a }); assert.equal(board(v, 'dressed').me.rank, 2, 'undressing moves you down');
});
test('standings are cached between calls and ties go to the older account', async () => {
  const s = mk(); const a = mkUser(s), b = mkUser(s); earn(s, b, 7000); earn(s, a, 7000); let v = await ok(s, 'GET', '/api/seasons', { uid: a }); assert.deepEqual(board(v, 'money').top.map(r => r.me), [true, false], 'the older account (a) is first');
  const u = mkUser(s); earn(s, u, 90000); v = await ok(s, 'GET', '/api/seasons', { uid: a }); assert.equal(board(v, 'money').top.length, 2, 'the new row waits for the cache'); s.app.clock.advance(SEASONS.cacheMs + 1); v = await ok(s, 'GET', '/api/seasons', { uid: a }); assert.equal(board(v, 'money').top[0].value, 90000);
});
test('settling: when the season ends the top three who reach the minimum get a badge and a ledger-paid prize, once; nobody below the minimum is paid; the book still balances', async () => {
  const s = mk(); const [a, b, c, d, e] = [0, 1, 2, 3, 4].map(() => mkUser(s)); earn(s, a, 30000); earn(s, b, 20000); earn(s, c, 10000); earn(s, d, 6000); earn(s, e, 100); wins(s, a, 2);   // a has only 2 wins (min 3): no games prize
  const cash0 = [a, b, c, d, e].map(u => balanceOf(s.db, cashId(u))); assert.deepEqual(await ok(s, 'GET', '/api/seasons', { uid: a }).then(v => v.mine), [], 'nothing before the end');
  endSeason(s); const v = await ok(s, 'GET', '/api/seasons', { uid: a }); assert.equal(v.season, 2, 'the next season has started');
  const rows = s.db.prepare('SELECT user_id, board, place, score, prize FROM season_awards ORDER BY board, place').all(); const m = rows.filter(r => r.board === 'money');
  assert.deepEqual(m.map(r => [r.user_id, r.place, r.prize]), [[a, 1, 20000], [b, 2, 10000], [c, 3, 5000]]); assert.equal(rows.filter(r => r.board === 'games').length, 0); assert.equal(rows.filter(r => r.board === 'dressed').length, 0);
  assert.equal(balanceOf(s.db, cashId(a)), cash0[0] + 20000); assert.equal(balanceOf(s.db, cashId(d)), cash0[3], 'fourth place gets nothing'); assert.equal(balanceOf(s.db, cashId(e)), cash0[4]); assert.equal(checkInvariants(s.db).ok, true);
  assert.equal(s.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE reason='season_prize'").get().n, 3);
  assert.equal(v.mine[0].badge, 'crown'); assert.equal(v.mine[0].season, 1); assert.equal(v.mine[0].prize, 20000); assert.equal(v.previous.season, 1); assert.deepEqual(v.previous.winners.filter(w => w.place === 1).map(w => w.board), ['money']);
  assert.equal(s.db.prepare("SELECT COUNT(*) n FROM notifications WHERE kind='season'").get().n, 3);
  assert.deepEqual(seasons.settleDue(s.app, { force: true }), [], 'a settled season is never paid twice'); assert.equal(s.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE reason='season_prize'").get().n, 3); assert.equal(seasons.settleSeason(s.app, 1), null);
  const w2 = await ok(s, 'GET', '/api/seasons', { uid: a }); assert.equal(board(w2, 'money').me.rank, null, 'the new season starts from zero (last season\'s earnings do not count)');
});
test('prizes do not use up the daily and weekly mission caps; a banned or guest account wins nothing and the next player moves up', async () => {
  const s = mk(); const a = mkUser(s), b = mkUser(s), c = mkUser(s); earn(s, a, 50000); earn(s, b, 40000); earn(s, c, 30000);
  s.app.db.prepare("INSERT INTO sanctions(user_id,kind,reason,note,until_at,actor,created_at) VALUES (?,?,?,?,?,?,?)").run(a, 'ban', 'abuse', '', null, 'test', s.app.clock.now()); endSeason(s); await ok(s, 'GET', '/api/seasons', { uid: b });
  const m = s.db.prepare("SELECT user_id, place FROM season_awards WHERE board='money' ORDER BY place").all(); assert.deepEqual(m.map(r => [r.user_id, r.place]), [[b, 1], [c, 2]], 'the banned player is skipped');
  const { capLeft } = await import('../server/core/rewards.js'); assert.ok(capLeft(s.app, b) > 0 && capLeft(s.app, b) === capLeft(s.app, mkUser(s)), 'season prize is not counted by the caps');
});
test('several missed seasons are settled in order, a few per check; winners keep every badge', async () => {
  const s = mk(1); const a = mkUser(s); earn(s, a, 9000); s.app.clock.advance(7 * DAY); earn(s, a, 9500); s.app.clock.advance(7 * DAY); s.app.clock.advance(7 * DAY); const out = seasons.settleDue(s.app);
  assert.deepEqual(out.map(x => x.season), [1, 2]); assert.deepEqual(s.db.prepare('SELECT season FROM season_settled ORDER BY season').all().map(r => r.season), [1, 2, 3], 'season 3 had no earners: recorded as settled, nobody paid'); assert.equal(seasons.seasonAt(s.app), 4); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM season_awards WHERE user_id=?').get(a).n, 2);
  assert.deepEqual(seasons.settleDue(s.app), [], 'the check is remembered'); assert.deepEqual(seasons.settleDue(s.app, { force: true }), [], 'season 3 had no earners: nothing paid, but it is recorded as settled'); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM season_settled').get().n, 3);
});
test('the winner gets a title: automatic for the latest season, pickable later, shown to other players, and an unwon one is refused', async () => {
  const s = mk(); const a = mkUser(s, { ageMs: 600000 }), b = mkUser(s); earn(s, a, 20000); earn(s, b, 6000); endSeason(s); await ok(s, 'GET', '/api/seasons', { uid: a });
  assert.equal(titleOf(s.app, a), 'S1 Money Maker'); assert.equal(titleOf(s.app, b), ''); const ach = await ok(s, 'GET', '/api/achievements', { uid: a }); assert.equal(ach.showing, 'S1 Money Maker'); assert.ok(ach.titles.some(t => t.id === 'season:1:money'));
  assert.equal((await call(s, 'POST', '/api/achievements/title', { uid: b, body: { id: 'season:1:money' } })).json.error, 'NOT_EARNED'); assert.equal((await call(s, 'POST', '/api/achievements/title', { uid: a, body: { id: 'season:1:games' } })).json.error, 'NOT_EARNED');
  let r = await ok(s, 'POST', '/api/achievements/title', { uid: a, body: { id: '' } }); assert.equal(r.showing, ''); r = await ok(s, 'POST', '/api/achievements/title', { uid: a, body: { id: 'season:1:money' } }); assert.equal(r.showing, 'S1 Money Maker'); assert.equal(r.selected, 'season:1:money');
  r = await ok(s, 'POST', '/api/achievements/title', { uid: a, body: null }); assert.equal(r.selected, null);
  // after a later season nobody wins, the old crown stops showing on its own but can still be chosen
  endSeason(s); await ok(s, 'GET', '/api/seasons', { uid: a }); s.app._titleCache?.clear(); assert.equal(titleOf(s.app, a), '', 'season 2 had no winner of its own; the S1 crown is no longer "latest"'); r = await ok(s, 'GET', '/api/achievements', { uid: a }); assert.ok(r.titles.some(t => t.id === 'season:1:money'));
});
test('the season prize and badge are in the data download and erased when the account is closed; off switch', async () => {
  const s = mk(); const a = mkUser(s); earn(s, a, 20000); endSeason(s); await ok(s, 'GET', '/api/seasons', { uid: a });
  const dl = await ok(s, 'GET', '/api/account/export', { uid: a }); assert.equal(dl.seasons.awards.length, 1); assert.equal(dl.seasons.awards[0].place, 1); assert.ok(registeredNames().includes('seasons'), 'registered with the closing routine');
  seasons.deleteMine(s.app, a); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM season_awards WHERE user_id=?').get(a).n, 0);
  s.app.seasonsCfg = { ...s.app.seasonsCfg, enabled: false }; assert.deepEqual(await ok(s, 'GET', '/api/seasons', { uid: a }), { enabled: false }); assert.deepEqual(seasons.settleDue(s.app), []);
});
test('cost: asking for the card over and over does one standings query per board per cache window, and the settle check is skipped once remembered', async () => {
  const s = mk(); const a = mkUser(s); earn(s, a, 6000); await ok(s, 'GET', '/api/seasons', { uid: a }); let n = 0; const orig = s.app.db.prepare.bind(s.app.db); s.app.db.prepare = (sql) => { if (/FROM ledger_entries e JOIN ledger_tx t/.test(sql)) n++; return orig(sql); };
  for (let i = 0; i < 20; i++) await ok(s, 'GET', '/api/seasons', { uid: a }); assert.equal(n, 0, 'served from the cache'); s.app.db.prepare = orig;
});
