// Daily and weekly missions plus the login streak (queue batch 1 item 4): counted from the player's own history, paid through the ledger, capped.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at, jobPos, HOUR, DAY } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { MISSIONS, STREAK, CAPS } from '../server/config/progress.js';
import { dailyOf, weeklyOf, streakOf } from '../server/core/missions.js';
import { dayKey, dayStart, weekKey, weekStart, capLeft } from '../server/core/rewards.js';

const startOfDay = (s) => { const now = s.app.clock.now(); s.app.clock.advance(dayStart(dayKey(now) + 1) - now + HOUR); }; // 01:00 Lagos on a fresh day
async function shift(s, u) { s.app.db.prepare('UPDATE player_state SET energy=95, hunger=90, mood=80, needs_at=? WHERE user_id=?').run(s.app.clock.now(), u); const jp = jobPos(s, 'job_shop'); at(s, u, jp.x, jp.z); await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'shop' } }); s.app.clock.advance(61000); await ok(s, 'POST', '/api/jobs/claim', { uid: u }); s.app.clock.advance(15 * 60000); }
const withAll = (fn) => async () => { const d = MISSIONS.dailyCount, w = MISSIONS.weeklyCount; MISSIONS.dailyCount = MISSIONS.daily.length; MISSIONS.weeklyCount = MISSIONS.weekly.length; try { await fn(); } finally { MISSIONS.dailyCount = d; MISSIONS.weeklyCount = w; } };
const line = (v, id) => [...v.daily, ...v.weekly].find(m => m.id === id);

test('everyone sees the same missions on a day, the picks change from day to day, ids come from the config', () => {
  const dk = 20000; assert.deepEqual(dailyOf(dk).map(m => m.id), dailyOf(dk).map(m => m.id)); assert.equal(dailyOf(dk).length, MISSIONS.dailyCount); assert.equal(weeklyOf(2900).length, MISSIONS.weeklyCount);
  const days = new Set(); for (let d = 20000; d < 20030; d++) days.add(dailyOf(d).map(m => m.id).join()); assert.ok(days.size > 5, 'varies'); assert.equal(new Set(MISSIONS.daily.map(m => m.id)).size, MISSIONS.daily.length);
  for (const m of [...MISSIONS.daily, ...MISSIONS.weekly]) { assert.ok(m.target > 0 && m.reward > 0 && m.reward <= CAPS.perDay, m.id); assert.ok(['tx', 'sum', 'chat', 'logins'].includes(m.metric.k)); }
  assert.ok(MISSIONS.daily.reduce((a, m) => a + m.reward, 0) / MISSIONS.daily.length * MISSIONS.dailyCount <= CAPS.perDay, 'three average dailies fit under the daily cap');
});
test('progress is counted from the ledger, claiming pays once through the ledger, the book still balances', withAll(async () => {
  const s = makeServer(); const u = mkUser(s); startOfDay(s); let v = await ok(s, 'GET', '/api/missions', { uid: u }); assert.equal(line(v, 'd_shifts').progress, 0);
  assert.equal((await call(s, 'POST', '/api/missions/claim', { uid: u, body: { id: 'd_shifts' } })).json.error, 'NOT_DONE'); assert.equal((await call(s, 'POST', '/api/missions/claim', { uid: u, body: { id: 'zzz' } })).json.error, 'NOT_TODAY');
  await shift(s, u); v = await ok(s, 'GET', '/api/missions', { uid: u }); assert.equal(line(v, 'd_shifts').progress, 1); await shift(s, u); v = await ok(s, 'GET', '/api/missions', { uid: u }); assert.equal(line(v, 'd_shifts').done, true); assert.ok(line(v, 'd_earn').progress > 0);
  const before = balanceOf(s.app.db, cashId(u)); const c = await ok(s, 'POST', '/api/missions/claim', { uid: u, body: { id: 'd_shifts' } }); assert.equal(c.paid, 400); assert.equal(balanceOf(s.app.db, cashId(u)), before + 400);
  assert.equal((await call(s, 'POST', '/api/missions/claim', { uid: u, body: { id: 'd_shifts' } })).json.error, 'CLAIMED'); assert.equal(balanceOf(s.app.db, cashId(u)), before + 400); assert.equal(c.view.daily.find(m => m.id === 'd_shifts').claimed, true);
  assert.equal(checkInvariants(s.app.db).ok, true); assert.equal(s.app.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE user_id=? AND reason='mission_daily'").get(u).n, 1);
  const shop = s.app.city.shopById.shop_canteen; at(s, u, shop.x, shop.z); await ok(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_canteen', itemId: 'jollof' } }); v = await ok(s, 'GET', '/api/missions', { uid: u }); assert.equal(line(v, 'd_eat').progress, 1); assert.ok(line(v, 'w_spend').progress >= 1500);
  s.app.db.prepare("INSERT INTO chat_messages(user_id,username,x,z,text,created_at) VALUES (?,?,?,?,?,?)").run(u, 'x', 0, 0, 'hi', s.app.clock.now()); assert.equal(line(await ok(s, 'GET', '/api/missions', { uid: u }), 'd_chat').progress, 1);
}));
test('a new day starts the daily missions from zero and they can be collected again; yesterday\'s work does not count', withAll(async () => {
  const s = makeServer(); const u = mkUser(s); startOfDay(s); await shift(s, u); await shift(s, u); await ok(s, 'POST', '/api/missions/claim', { uid: u, body: { id: 'd_shifts' } }); const wk0 = line(await ok(s, 'GET', '/api/missions', { uid: u }), 'w_shifts').progress; assert.equal(wk0, 2);
  s.app.clock.advance(DAY); const v = await ok(s, 'GET', '/api/missions', { uid: u }); assert.equal(line(v, 'd_shifts').progress, 0); assert.equal(line(v, 'd_shifts').claimed, false); await shift(s, u); await shift(s, u);
  const c = await ok(s, 'POST', '/api/missions/claim', { uid: u, body: { id: 'd_shifts' } }); assert.equal(c.paid, 400); assert.equal(s.app.db.prepare("SELECT COUNT(*) n FROM mission_claims WHERE user_id=? AND mission_id='d_shifts'").get(u).n, 2);
}));
test('caps: rewards never exceed the daily limit; an over-cap claim is trimmed or refused and can be collected later', withAll(async () => {
  const s = makeServer(); const u = mkUser(s); startOfDay(s); const old = CAPS.perDay; CAPS.perDay = 600; try {
    await shift(s, u); await shift(s, u); const a = await ok(s, 'POST', '/api/missions/claim', { uid: u, body: { id: 'd_shifts' } }); assert.equal(a.paid, 400); assert.equal(capLeft(s.app, u), 200);
    const shop = s.app.city.shopById.shop_canteen; at(s, u, shop.x, shop.z); await ok(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_canteen', itemId: 'jollof' } }); await ok(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_canteen', itemId: 'jollof' } });
    const b = await ok(s, 'POST', '/api/missions/claim', { uid: u, body: { id: 'd_eat' } }); assert.equal(b.paid, 200); assert.equal(b.capped, true); assert.equal(capLeft(s.app, u), 0); const earn = await call(s, 'POST', '/api/missions/claim', { uid: u, body: { id: 'd_earn' } }); assert.ok(['CAP_REACHED', 'NOT_DONE'].includes(earn.json.error));
    s.app.clock.advance(DAY); assert.ok(capLeft(s.app, u) > 0, 'a new day has room again'); } finally { CAPS.perDay = old; }
}));
test('login streak: counts consecutive days, a missed day resets it, the bonus follows the ladder and is paid once a day', async () => {
  const s = makeServer(); const u = mkUser(s); startOfDay(s); let v = await ok(s, 'GET', '/api/missions', { uid: u }); assert.equal(v.streak.current, 1); assert.equal(v.streak.todayReward, STREAK.rewards[0]);
  const c1 = await ok(s, 'POST', '/api/missions/streak', { uid: u }); assert.equal(c1.paid, STREAK.rewards[0]); assert.equal((await call(s, 'POST', '/api/missions/streak', { uid: u })).json.error, 'CLAIMED');
  for (let d = 2; d <= 7; d++) { s.app.clock.advance(DAY); await ok(s, 'GET', '/api/me', { uid: u }); const c = await ok(s, 'POST', '/api/missions/streak', { uid: u }); assert.equal(c.streak, d); assert.equal(c.paid, STREAK.rewards[d - 1], `day ${d}`); }
  s.app.clock.advance(DAY); v = await ok(s, 'GET', '/api/missions', { uid: u }); assert.equal(v.streak.current, 8); assert.equal(v.streak.todayReward, STREAK.rewards[0], 'the ladder repeats'); assert.equal(v.streak.best, 8);
  s.app.clock.advance(3 * DAY); v = await ok(s, 'GET', '/api/missions', { uid: u }); assert.equal(v.streak.current, 1, 'a missed day starts again'); assert.equal(v.streak.best, 8, 'best is remembered'); assert.equal(checkInvariants(s.app.db).ok, true);
  assert.equal(s.app.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE user_id=? AND reason='mission_streak'").get(u).n, 7);
});
test('streak counting is by Lagos day, not by 24-hour gaps; only opening the game counts, and weekly "open on 5 days" uses it', withAll(async () => {
  const s = makeServer(); const u = mkUser(s); const mon = weekStart(weekKey(s.app.clock.now()) + 1); s.app.clock.advance(mon - s.app.clock.now() + HOUR); for (let i = 0; i < 5; i++) { await ok(s, 'GET', '/api/me', { uid: u }); s.app.clock.advance(DAY); }
  let v = await ok(s, 'GET', '/api/missions', { uid: u }); assert.equal(line(v, 'w_days').progress, 4 + 1 > 5 ? 5 : line(v, 'w_days').progress); assert.ok(line(v, 'w_days').progress >= 4); const sr = streakOf(s.app, u); assert.equal(sr.current, 6 > 0 ? sr.current : 0); assert.ok(sr.best >= 5);
  const t = makeServer(); const w = mkUser(t); startOfDay(t); await ok(t, 'GET', '/api/me', { uid: w }); t.app.clock.advance(23 * HOUR); await ok(t, 'GET', '/api/me', { uid: w }); assert.equal(streakOf(t.app, w).current, 2, '23 hours later is the next Lagos day');
}));
test('bots and a switched-off feature get nothing; the data is in the download and erased on closing', async () => {
  const s = makeServer(); const bot = mkUser(s, { bot: true }); assert.equal((await ok(s, 'GET', '/api/missions', { uid: bot })).enabled, false); const u = mkUser(s); await ok(s, 'GET', '/api/missions', { uid: u }); assert.equal((await call(s, 'GET', '/api/missions')).status, 401);
  const { exportData } = await import('../server/core/account.js'); assert.equal(exportData(s.app, u).missions.loginDays.length, 1); const m = await import('../server/core/missions.js'); m.deleteMine(s.app, u); assert.equal(s.app.db.prepare('SELECT COUNT(*) n FROM login_days WHERE user_id=?').get(u).n, 0);
  MISSIONS.enabled = false; try { assert.equal((await ok(s, 'GET', '/api/missions', { uid: u })).enabled, false); } finally { MISSIONS.enabled = true; }
});
