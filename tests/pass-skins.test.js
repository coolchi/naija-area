// Skins shop and battle pass (Track G item 9). GAME MONEY ONLY: no real-money flow exists (see docs/PASS_SKINS.md). Every number is an ESTIMATE.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, DAY, HOUR } from './helpers.js';
import { checkInvariants, balanceOf, cashId, move, SYS } from '../server/core/ledger.js';
import { registeredNames } from '../server/core/account.js';
import { SKINS, skinById, SKIN_RULES } from '../server/config/skins.js';
import { PASS, rewardsOf } from '../server/config/pass.js';
import * as pass from '../server/core/pass.js';
import * as auth from '../server/core/auth.js';

const L = (iso) => Date.parse(iso + ':00Z') - 3600000; // Lagos (UTC+1) wall clock to a timestamp
const setNow = (s, iso) => { s.app.clock.now = () => L(iso); };
const IN = '2026-11-03T12:00'; // inside season s1
const rich = (s, cash = 400000) => mkUser(s, { cash });
const P = (s, u, path, body) => call(s, 'POST', path, { uid: u, body });
/** earn XP the real way: a paid shift posts a ledger transaction with reason job_wage */
const paidShift = (s, u, n = 1) => { for (let i = 0; i < n; i++) move(s.app, { from: SYS.FAUCET_JOBS, to: cashId(u), amount: 1800, reason: 'job_wage', ref: 'x', userId: u, idemKey: `t:${u}:${s.app.clock.now()}:${i}:${Math.random()}` }); };
const addXp = (s, u, xp) => { const se = pass.seasonAt(s.app); const row = s.db.prepare('SELECT 1 FROM pass_progress WHERE user_id=? AND season=?').get(u, se.id); if (!row) s.db.prepare('INSERT INTO pass_progress(user_id,season,xp,premium,cash_claimed) VALUES (?,?,0,0,0)').run(u, se.id); s.db.prepare('UPDATE pass_progress SET xp=? WHERE user_id=? AND season=?').run(xp, u, se.id); };

test('skins config: unique ids, three kinds, shop skins have prices, pass skins have none, looks are valid colours and ONLY looks (nothing that changes play)', () => {
  assert.equal(new Set(SKINS.map(s => s.id)).size, SKINS.length); const hex = /^#[0-9a-f]{6}$/i;
  const allowed = new Set(['id', 'kind', 'name', 'price', 'rarity', 'sell', 'color', 'glow', 'accent', 'wall', 'floor', 'body', 'gender']);
  for (const s of SKINS) {
    for (const k of Object.keys(s)) assert.ok(allowed.has(k), `${s.id} has a non-cosmetic field: ${k}`);
    assert.ok(['avatar', 'car', 'home'].includes(s.kind) && ['common', 'rare', 'epic'].includes(s.rarity) && ['shop', 'pass'].includes(s.sell), s.id);
    if (s.sell === 'shop') assert.ok(Number.isInteger(s.price) && s.price > 0, s.id); else assert.equal(s.price, undefined, s.id + ' pass skins are never priced');
    const colours = s.kind === 'home' ? [s.accent, s.wall, s.floor] : [s.color]; for (const c of colours) assert.match(c, hex, s.id); if (s.glow) assert.match(s.glow, hex);
    if (s.body) assert.ok(['hd', 'casual', 'casual_f'].includes(s.body), s.id + ' body upgrade is cosmetic mesh only');
    if (s.gender) assert.ok(['male', 'female'].includes(s.gender), s.id + ' gender gate');
  }
  assert.equal(skinById.av_hd_body?.name, 'Soldier Man'); assert.equal(skinById.av_hd_body?.price, 10_000_000_000); assert.equal(skinById.av_hd_body?.body, 'hd'); assert.equal(skinById.av_hd_body?.gender, 'male');
  assert.equal(skinById.av_casual_man?.price, 100_000_000); assert.equal(skinById.av_casual_man?.body, 'casual'); assert.equal(skinById.av_casual_man?.gender, 'male');
  assert.equal(skinById.av_casual_woman?.price, 50_000_000); assert.equal(skinById.av_casual_woman?.body, 'casual_f'); assert.equal(skinById.av_casual_woman?.gender, 'female');
  for (const kind of ['avatar', 'car', 'home']) { assert.ok(SKINS.filter(s => s.kind === kind && s.sell === 'shop').length >= 4, kind); assert.ok(SKINS.filter(s => s.kind === kind && s.sell === 'pass').length >= 2, kind); }
  const byRarity = (kind, r) => SKINS.filter(s => s.kind === kind && s.sell === 'shop' && s.rarity === r).map(s => s.price); for (const kind of ['avatar', 'car', 'home']) assert.ok(Math.max(...byRarity(kind, 'common')) < Math.min(...byRarity(kind, 'epic')), kind + ': epic costs more than common');
  assert.equal(SKIN_RULES.realMoney.enabled, false); assert.equal(PASS.realMoney.enabled, false);
});
test('pass config: every pass reward skin exists and is a pass-only skin, every pass-only skin is a reward exactly once, cash rewards stay under the season cap and premium costs more than it pays out', () => {
  const rewardSkins = [...rewardsOf('free'), ...rewardsOf('premium')].filter(r => r.skin).map(r => r.skin); assert.equal(new Set(rewardSkins).size, rewardSkins.length);
  for (const id of rewardSkins) { assert.ok(skinById[id], id); assert.equal(skinById[id].sell, 'pass', id); } for (const s of SKINS.filter(x => x.sell === 'pass')) assert.ok(rewardSkins.includes(s.id), s.id + ' is never given');
  const cash = (t) => rewardsOf(t).reduce((a, r) => a + r.cash, 0); assert.ok(cash('free') + cash('premium') <= PASS.seasonCashCap, 'sum of all cash rewards fits under the cap'); assert.ok(cash('premium') < PASS.premiumPrice, 'the premium track is a net money sink');
  assert.equal(rewardsOf('free').length, PASS.tiers); assert.ok(PASS.dailyXpCap * 7 < PASS.tiers * PASS.tierXp, 'a week of capped play cannot finish the pass'); assert.ok(PASS.seasons.every(x => x.from <= x.to));
  for (let i = 1; i < PASS.seasons.length; i++) assert.ok(Date.parse(PASS.seasons[i].from) - Date.parse(PASS.seasons[i - 1].to) > PASS.claimGraceDays * DAY, 'the next season starts after the last one\'s claim grace');
});

test('buying a skin: one balanced ledger transaction to the cosmetics sink, owned once, idempotent per key, refused when poor, owned, or pass-only; XP for dressing up', async () => {
  const s = makeServer(); setNow(s, IN); const u = rich(s); const sk = skinById.av_ankara_green; const before = balanceOf(s.db, cashId(u));
  const r = await ok(s, 'POST', '/api/skins/buy', { uid: u, body: { skin: sk.id, idem: 'k1' } }); assert.equal(r.charged, sk.price); assert.equal(balanceOf(s.db, cashId(u)), before - sk.price); assert.equal(balanceOf(s.db, SYS.SINK_COSMETICS), sk.price);
  assert.equal(s.db.prepare("SELECT reason FROM ledger_tx WHERE user_id=? AND ref=?").get(u, sk.id).reason, 'skin_buy');
  assert.equal((await P(s, u, '/api/skins/buy', { skin: sk.id, idem: 'k2' })).json.error, 'ALREADY_OWNED'); assert.equal(balanceOf(s.db, cashId(u)), before - sk.price, 'a second try is not charged');
  assert.equal((await P(s, u, '/api/skins/buy', { skin: 'av_pass_royal' })).json.error, 'NOT_FOR_SALE'); assert.equal((await P(s, u, '/api/skins/buy', { skin: 'nope' })).status, 404);
  const poor = mkUser(s, { cash: 100 }); assert.equal((await P(s, poor, '/api/skins/buy', { skin: sk.id })).json.error, 'NO_FUNDS'); assert.equal(balanceOf(s.db, cashId(poor)), 100);
  const bot = mkUser(s, { cash: 99999, bot: true }); assert.equal((await P(s, bot, '/api/skins/buy', { skin: sk.id })).status, 404);
  const v = await ok(s, 'GET', '/api/skins', { uid: u }); const it = v.items.find(x => x.id === sk.id); assert.equal(it.owned, true); assert.equal(it.how, 'shop'); assert.equal(v.items.find(x => x.id === 'av_pass_royal').price, null); assert.equal(v.realMoney.enabled, false);
  assert.equal(s.db.prepare('SELECT xp FROM pass_progress WHERE user_id=?').get(u).xp, PASS.sources.skin_buy.xp, 'dressing up earns pass XP'); assert.equal(checkInvariants(s.db).ok, true);
});
test('an idempotency key replayed after a retry cannot charge twice (the ledger replay is a no-op, ownership already exists)', async () => {
  const s = makeServer(); setNow(s, IN); const u = rich(s); const sk = skinById.car_lagoon_teal;
  s.db.transaction(() => { move(s.app, { from: cashId(u), to: SYS.SINK_COSMETICS, amount: sk.price, reason: 'skin_buy', ref: sk.id, userId: u, idemKey: `skin:${u}:${sk.id}:same` }); })();
  const before = balanceOf(s.db, cashId(u)); const r = await call(s, 'POST', '/api/skins/buy', { uid: u, body: { skin: sk.id, idem: 'same' } }); assert.equal(r.status, 200); assert.equal(balanceOf(s.db, cashId(u)), before, 'the replayed key paid nothing more');
  assert.equal(checkInvariants(s.db).ok, true);
});
test('equipping: you must own it, one skin per kind, a home skin needs a home, unequip works, and other players see avatar and car skins in the heartbeat', async () => {
  const s = makeServer(); setNow(s, IN); const u = rich(s), other = rich(s); const a = skinById.av_lagos_blue, a2 = skinById.av_suya_red, c = skinById.car_danfo_yellow, h = skinById.home_sky_blue;
  assert.equal((await P(s, u, '/api/skins/equip', { skin: a.id })).json.error, 'NOT_OWNED');
  for (const x of [a, a2, c, h]) await ok(s, 'POST', '/api/skins/buy', { uid: u, body: { skin: x.id } });
  assert.equal((await P(s, u, '/api/skins/equip', { skin: h.id })).json.error, 'NO_HOME');
  await ok(s, 'POST', '/api/skins/equip', { uid: u, body: { skin: a.id } }); await ok(s, 'POST', '/api/skins/equip', { uid: u, body: { skin: a2.id } }); await ok(s, 'POST', '/api/skins/equip', { uid: u, body: { skin: c.id } });
  const w = s.db.prepare('SELECT slot, skin_id FROM skins_equipped WHERE user_id=? ORDER BY slot').all(u); assert.deepEqual(w, [{ slot: 'avatar', skin_id: a2.id }, { slot: 'car', skin_id: c.id }], 'the second avatar skin replaced the first');
  at(s, u, 0, 0); at(s, other, 3, 3); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); const hb = await ok(s, 'POST', '/api/heartbeat', { uid: other, body: {} }); assert.deepEqual(hb.players.find(p => p.id === u).sk, { a: a2.id, c: c.id });
  await ok(s, 'POST', '/api/skins/unequip', { uid: u, body: { kind: 'avatar' } }); const hb2 = await ok(s, 'POST', '/api/heartbeat', { uid: other, body: {} }); assert.deepEqual(hb2.players.find(p => p.id === u).sk, { c: c.id }); assert.equal((await P(s, u, '/api/skins/unequip', { kind: 'hat' })).status, 400);
  const pub = await ok(s, 'GET', '/api/skins/catalogue'); assert.equal(pub.skins.length, SKINS.length); assert.equal(pub.skins.find(x => x.id === c.id).price, undefined, 'the public catalogue has looks, not prices'); assert.equal(checkInvariants(s.db).ok, true);
});
test('a home skin repaints the interior and shows an accent on the door while you own the home, and only then', async () => {
  const s = makeServer(); setNow(s, IN); const u = rich(s, 800000); const h = skinById.home_terracotta; const p = s.app.city.properties.filter(x => x.tier === 1)[0];
  at(s, u, p.door.x, p.door.z); await ok(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: p.id, mode: 'rent' } }); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); await ok(s, 'POST', '/api/property/enter', { uid: u });
  const before = await ok(s, 'GET', `/api/property/${p.id}/interior`, { uid: u }); assert.notEqual(before.wall.hex, h.wall);
  // Buying a skin now equips it when you can wear it (you already have a home here).
  await ok(s, 'POST', '/api/skins/buy', { uid: u, body: { skin: h.id } }); const dressed = await ok(s, 'GET', `/api/property/${p.id}/interior`, { uid: u }); assert.equal(dressed.wall.hex, h.wall); assert.equal(dressed.floor.hex, h.floor);
  const list = await ok(s, 'GET', '/api/properties', { uid: mkUser(s, { cash: 10 }) }); assert.equal(list.properties.find(x => x.id === p.id).homeSkin, h.accent, 'everybody sees the accent on the door');
  await ok(s, 'POST', '/api/skins/unequip', { uid: u, body: { kind: 'home' } }); const back = await ok(s, 'GET', `/api/property/${p.id}/interior`, { uid: u }); assert.equal(back.wall.hex, before.wall.hex);
  const list2 = await ok(s, 'GET', '/api/properties', { uid: u }); assert.equal(list2.properties.find(x => x.id === p.id).homeSkin, undefined);
});

test('seasons follow the calendar (UTC+1): s1 runs 1 Oct to 31 Dec, then a 7 day claim grace, and s2 starts only after the grace is over', () => {
  const s = makeServer(); const at_ = (iso) => { setNow(s, iso); return pass.seasonAt(s.app); };
  assert.equal(at_('2026-09-30T23:30'), null); assert.equal(pass.nextSeason(s.app).id, 's1'); assert.equal(at_('2026-10-01T00:00').id, 's1'); assert.equal(at_('2026-12-31T23:30').active, true);
  const g = at_('2027-01-01T00:30'); assert.equal(g.id, 's1'); assert.equal(g.active, false, 'ended, claims only'); assert.equal(at_('2027-01-07T12:00').id, 's1'); assert.equal(at_('2027-01-08T00:30').id, 's2'); assert.equal(at_('2027-01-08T00:30').active, true);
  assert.equal(at_('2027-04-10T12:00').id, 's2'); assert.equal(at_('2027-04-10T12:00').active, false, 'grace for s2'); assert.equal(at_('2027-04-16T12:00'), null, 'after the grace: no season'); setNow(s, '2026-12-31T23:00'); assert.ok(pass.seasonAt(s.app).endsInMs <= HOUR && pass.seasonAt(s.app).endsInMs > 0);
});
test('XP comes from real paid things only: the ledger hook awards it, with a per-source daily limit and a daily total cap; bots and replays earn nothing; no season, no XP', async () => {
  const s = makeServer(); const u = rich(s); setNow(s, '2026-09-20T12:00'); paidShift(s, u); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM pass_progress').get().n, 0, 'no season running: no XP');
  setNow(s, IN); paidShift(s, u); assert.equal((await ok(s, 'GET', '/api/pass', { uid: u })).xp, PASS.sources.job_wage.xp);
  for (let i = 0; i < 10; i++) paidShift(s, u); assert.equal((await ok(s, 'GET', '/api/pass', { uid: u })).xp, PASS.sources.job_wage.xp * PASS.sources.job_wage.perDay, 'five shifts a day count, the rest do not');
  // the daily cap across sources
  const v = rich(s); for (const [reason, S] of Object.entries(PASS.sources)) for (let i = 0; i < S.perDay + 1; i++) move(s.app, { from: SYS.FAUCET_EVENTS, to: cashId(v), amount: 10, reason, ref: 'x', userId: v, idemKey: `cap:${v}:${reason}:${i}` });
  assert.equal((await ok(s, 'GET', '/api/pass', { uid: v })).xp, PASS.dailyXpCap, 'never more than the daily cap');
  const day2 = s.app.clock.now() + DAY; s.app.clock.now = () => day2; paidShift(s, v); assert.equal((await ok(s, 'GET', '/api/pass', { uid: v })).xp, PASS.dailyXpCap + PASS.sources.job_wage.xp, 'a new day starts fresh');
  const w = rich(s); const key = `rep:${w}`; for (let i = 0; i < 3; i++) move(s.app, { from: SYS.FAUCET_JOBS, to: cashId(w), amount: 5, reason: 'job_wage', ref: 'r', userId: w, idemKey: key }); assert.equal((await ok(s, 'GET', '/api/pass', { uid: w })).xp, PASS.sources.job_wage.xp, 'a replayed idempotent payment earns XP once');
  const bot = mkUser(s, { cash: 10, bot: true }); move(s.app, { from: SYS.FAUCET_JOBS, to: cashId(bot), amount: 5, reason: 'job_wage', ref: 'b', userId: bot, idemKey: 'botx' }); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM pass_progress WHERE user_id=?').get(bot).n, 0);
  move(s.app, { from: SYS.FAUCET_JOBS, to: cashId(rich(s)), amount: 5, reason: 'rent', ref: 'q', userId: null, idemKey: null }); assert.equal(checkInvariants(s.db).ok, true);
});
test('the daily check-in: once a day, adds XP, respects the cap, closed outside a season', async () => {
  const s = makeServer(); const u = rich(s); setNow(s, '2026-09-20T12:00'); assert.equal((await P(s, u, '/api/pass/login')).json.error, 'NO_SEASON'); setNow(s, IN);
  const r = await ok(s, 'POST', '/api/pass/login', { uid: u }); assert.equal(r.gained, PASS.loginXp); assert.equal(r.canLogin, false); assert.equal((await P(s, u, '/api/pass/login')).json.error, 'ALREADY');
  const t2 = s.app.clock.now() + DAY; s.app.clock.now = () => t2; assert.equal((await ok(s, 'GET', '/api/pass', { uid: u })).canLogin, true); const r2 = await ok(s, 'POST', '/api/pass/login', { uid: u }); assert.equal(r2.gained, PASS.loginXp); assert.equal(r2.xp, 2 * PASS.loginXp);
});

test('claiming: tiers need XP, free cash comes from the pass faucet in one ledger transaction, a skin tier grants the skin, nothing is paid twice, supply stays balanced', async () => {
  const s = makeServer(); setNow(s, IN); const u = rich(s, 1000); addXp(s, u, PASS.tierXp * 5 + 10); const v0 = await ok(s, 'GET', '/api/pass', { uid: u }); assert.equal(v0.tier, 5); assert.equal(v0.season.id, 's1');
  assert.equal((await P(s, u, '/api/pass/claim', { tier: 6, track: 'free' })).json.error, 'NOT_REACHED'); assert.equal((await P(s, u, '/api/pass/claim', { tier: 0, track: 'free' })).json.error, 'BAD_TIER'); assert.equal((await P(s, u, '/api/pass/claim', { tier: 1, track: 'gold' })).json.error, 'BAD_TRACK');
  const before = balanceOf(s.db, cashId(u)); const r1 = await ok(s, 'POST', '/api/pass/claim', { uid: u, body: { tier: 1, track: 'free' } }); const want = PASS.free.cash(1); assert.equal(r1.paid, want); assert.equal(balanceOf(s.db, cashId(u)), before + want); assert.equal(balanceOf(s.db, SYS.FAUCET_PASS), -want);
  assert.equal((await P(s, u, '/api/pass/claim', { tier: 1, track: 'free' })).json.error, 'CLAIMED'); assert.equal(balanceOf(s.db, cashId(u)), before + want, 'a second claim pays nothing');
  const r5 = await ok(s, 'POST', '/api/pass/claim', { uid: u, body: { tier: 5, track: 'free' } }); assert.equal(r5.paid, 0); assert.equal(r5.skin.id, 'av_pass_sunrise'); assert.equal(s.db.prepare('SELECT how FROM skins_owned WHERE user_id=? AND skin_id=?').get(u, 'av_pass_sunrise').how, 'pass');
  assert.equal((await P(s, u, '/api/pass/claim', { tier: 2, track: 'premium' })).json.error, 'NOT_PREMIUM'); assert.equal(checkInvariants(s.db).ok, true);
  await ok(s, 'POST', '/api/skins/equip', { uid: u, body: { skin: 'av_pass_sunrise' } }); assert.equal(s.db.prepare("SELECT skin_id FROM skins_equipped WHERE user_id=? AND slot='avatar'").get(u).skin_id, 'av_pass_sunrise');
});
test('premium: costs game money to the cosmetics sink once, unlocks premium rewards for every tier already reached, and stays closed to the poor', async () => {
  const s = makeServer(); setNow(s, IN); const u = rich(s, 100000); addXp(s, u, PASS.tierXp * 9); const poor = mkUser(s, { cash: 500 }); addXp(s, poor, PASS.tierXp * 3);
  assert.equal((await P(s, poor, '/api/pass/premium')).json.error, 'NO_FUNDS'); const before = balanceOf(s.db, cashId(u)); const r = await ok(s, 'POST', '/api/pass/premium', { uid: u, body: { idem: 'a' } }); assert.equal(r.charged, PASS.premiumPrice); assert.equal(r.premium, true);
  assert.equal(balanceOf(s.db, cashId(u)), before - PASS.premiumPrice); assert.equal(balanceOf(s.db, SYS.SINK_COSMETICS), PASS.premiumPrice); assert.equal((await P(s, u, '/api/pass/premium', { idem: 'b' })).json.error, 'ALREADY');
  const t8 = await ok(s, 'POST', '/api/pass/claim', { uid: u, body: { tier: 8, track: 'premium' } }); assert.equal(t8.skin.id, 'av_pass_midnight'); const t2 = await ok(s, 'POST', '/api/pass/claim', { uid: u, body: { tier: 2, track: 'premium' } }); assert.equal(t2.paid, PASS.premium.cash(2));
  assert.equal((await P(s, u, '/api/pass/claim', { tier: 12, track: 'premium' })).json.error, 'NOT_REACHED'); assert.equal(checkInvariants(s.db).ok, true);
  const v = await ok(s, 'GET', '/api/pass', { uid: u }); assert.equal(v.premiumTrack.find(x => x.tier === 2).claimed, true); assert.equal(v.premiumTrack.find(x => x.tier === 3).locked, false); assert.equal(v.realMoney.enabled, false);
});
test('the whole pass paid out in full stays under the season cash cap, and the cap holds even if the rewards were raised', async () => {
  const s = makeServer(); setNow(s, IN); const u = rich(s, 100000); addXp(s, u, PASS.tierXp * PASS.tiers); await ok(s, 'POST', '/api/pass/premium', { uid: u, body: {} }); const before = balanceOf(s.db, cashId(u));
  for (let t = 1; t <= PASS.tiers; t++) for (const track of ['free', 'premium']) await ok(s, 'POST', '/api/pass/claim', { uid: u, body: { tier: t, track } });
  const earned = balanceOf(s.db, cashId(u)) - before; assert.ok(earned <= PASS.seasonCashCap && earned > 0, 'earned ' + earned); const v = await ok(s, 'GET', '/api/pass', { uid: u }); assert.equal(v.maxed, true); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM skins_owned WHERE user_id=? AND how=?').get(u, 'pass').n, SKINS.filter(x => x.sell === 'pass').length);
  const s2 = makeServer(); setNow(s2, IN); s2.app.balance.pass = { ...PASS, seasonCashCap: 300 }; const w = rich(s2, 100000); addXp(s2, w, PASS.tierXp * 4); const b2 = balanceOf(s2.db, cashId(w)); for (let t = 1; t <= 4; t++) await ok(s2, 'POST', '/api/pass/claim', { uid: w, body: { tier: t, track: 'free' } });
  assert.equal(balanceOf(s2.db, cashId(w)) - b2, 300, 'cut off at the cap'); assert.equal(checkInvariants(s2.db).ok, true);
});
test('after a season ends you can still claim for the grace period (but earn no more XP); after it, nothing; the next season starts from zero', async () => {
  const s = makeServer(); setNow(s, '2026-12-30T12:00'); const u = rich(s); addXp(s, u, PASS.tierXp * 2); setNow(s, '2027-01-03T12:00'); paidShift(s, u); const v = await ok(s, 'GET', '/api/pass', { uid: u }); assert.equal(v.season.id, 's1'); assert.equal(v.season.active, false); assert.equal(v.xp, PASS.tierXp * 2, 'no XP after the end');
  assert.equal((await P(s, u, '/api/pass/login')).json.error, 'NO_SEASON'); assert.equal((await P(s, u, '/api/pass/premium')).json.error, 'NO_SEASON'); await ok(s, 'POST', '/api/pass/claim', { uid: u, body: { tier: 2, track: 'free' } });
  setNow(s, '2027-01-07T12:00'); assert.equal((await ok(s, 'GET', '/api/pass', { uid: u })).season.id, 's1', 'still in the grace'); setNow(s, '2027-01-08T12:00'); assert.equal((await ok(s, 'GET', '/api/pass', { uid: u })).season.id, 's2'); assert.equal((await ok(s, 'GET', '/api/pass', { uid: u })).xp, 0, 'a new season starts from zero'); setNow(s, '2027-04-20T12:00');
  assert.equal((await P(s, u, '/api/pass/claim', { tier: 1, track: 'free' })).json.error, 'NO_SEASON'); assert.equal((await ok(s, 'GET', '/api/pass', { uid: u })).season, null);
});
test('guests and every route need a sign-in where it should; the catalogue is public', async () => {
  const s = makeServer(); for (const [m, p] of [['GET', '/api/skins'], ['GET', '/api/pass'], ['POST', '/api/skins/buy'], ['POST', '/api/pass/claim'], ['POST', '/api/pass/premium']]) assert.equal((await call(s, m, p, { body: {} })).status, 401, p);
  assert.equal((await call(s, 'GET', '/api/skins/catalogue')).status, 200);
});
test('body upgrades: Soldier/Casual Man need Man; Casual Woman needs Woman signup; Man cannot switch to Woman', async () => {
  const s = makeServer(); setNow(s, IN);
  const man = mkUser(s, { cash: 20_000_000_000 });
  assert.equal((await ok(s, 'GET', '/api/me', { uid: man })).user.gender, 'male');
  const manShop = await ok(s, 'GET', '/api/skins', { uid: man });
  assert.ok(!manShop.items.some(i => i.id === 'av_casual_woman'), 'Casual Woman is not listed for Man players');
  assert.ok(manShop.items.some(i => i.id === 'av_casual_man'));
  assert.equal((await P(s, man, '/api/skins/buy', { skin: 'av_casual_woman' })).json.error, 'WRONG_GENDER');
  const soldier = await ok(s, 'POST', '/api/skins/buy', { uid: man, body: { skin: 'av_hd_body', idem: 'sol' } });
  assert.equal(soldier.charged, 10_000_000_000); assert.equal(soldier.skin.name, 'Soldier Man');
  await ok(s, 'POST', '/api/skins/buy', { uid: man, body: { skin: 'av_casual_man', idem: 'cm' } });
  assert.equal((await P(s, man, '/api/avatar/gender', { gender: 'female' })).json.error, 'GENDER_LOCKED');

  const woman = await auth.signup(s.app, { username: 'skin_wom', password: 'secret-pass-1', age18: true, email: 'skin_wom@example.com', gender: 'female' }, 'ip');
  s.db.prepare('UPDATE users SET created_at=? WHERE id=?').run(s.app.clock.now() - 3 * HOUR, woman);
  move(s.app, { from: SYS.FAUCET_START, to: cashId(woman), amount: 100_000_000, reason: 'test', ref: 'tw', userId: woman, idemKey: 'fundw' + woman });
  assert.equal((await ok(s, 'GET', '/api/me', { uid: woman })).user.gender, 'female');
  const womanShop = await ok(s, 'GET', '/api/skins', { uid: woman });
  assert.ok(!womanShop.items.some(i => i.id === 'av_casual_man' || i.id === 'av_hd_body'), 'Man body skins are not listed for Woman players');
  assert.ok(womanShop.items.some(i => i.id === 'av_casual_woman'));
  assert.equal((await P(s, woman, '/api/skins/buy', { skin: 'av_casual_man' })).json.error, 'WRONG_GENDER');
  assert.equal((await P(s, woman, '/api/skins/buy', { skin: 'av_hd_body' })).json.error, 'WRONG_GENDER');
  const cw = await ok(s, 'POST', '/api/skins/buy', { uid: woman, body: { skin: 'av_casual_woman', idem: 'cw' } });
  assert.equal(cw.charged, 50_000_000);
  assert.equal(checkInvariants(s.db).ok, true);
});

test('account data: skins and pass rows are in the download and are erased with the account; the ledger stays whole', async () => {
  const s = makeServer(); setNow(s, IN); assert.ok(registeredNames().includes('skinsAndBattlePass'));
  const u = await auth.signup(s.app, { username: 'skin_ada', password: 'secret-pass-1', age18: true, email: 'skin_ada@example.com' }, 'ip'); s.db.prepare('UPDATE users SET created_at=? WHERE id=?').run(s.app.clock.now() - 3 * HOUR, u); move(s.app, { from: SYS.FAUCET_START, to: cashId(u), amount: 400000, reason: 'test', ref: 't', userId: u, idemKey: 'fund' + u });
  await ok(s, 'POST', '/api/skins/buy', { uid: u, body: { skin: 'car_pearl_white' } }); await ok(s, 'POST', '/api/skins/equip', { uid: u, body: { skin: 'car_pearl_white' } }); await ok(s, 'POST', '/api/pass/login', { uid: u }); addXp(s, u, PASS.tierXp * 2); await ok(s, 'POST', '/api/pass/claim', { uid: u, body: { tier: 1, track: 'free' } });
  const dl = await ok(s, 'GET', '/api/account/export', { uid: u }); const d = dl.skinsAndBattlePass; assert.equal(d.skinsOwned.length, 1); assert.equal(d.skinsWorn.length, 1); assert.equal(d.battlePass.length, 1); assert.equal(d.battlePassClaims.length, 1); assert.ok(d.battlePassXpLog.length >= 1);
  const r = await ok(s, 'POST', '/api/account/delete', { uid: u, body: { confirm: 'delete', password: 'secret-pass-1' } }); assert.ok(r.ok !== false);
  for (const t of ['skins_owned', 'skins_equipped', 'pass_progress', 'pass_claims', 'pass_xp_log']) assert.equal(s.db.prepare(`SELECT COUNT(*) n FROM ${t}`).get().n, 0, t); assert.equal(checkInvariants(s.db).ok, true);
});
