// Battle pass (Track G item 9): a calendar season with 30 tiers, a free track and a premium track. GAME MONEY ONLY. Numbers: server/config/pass.js (ESTIMATES).
// XP comes from things that really happened (a paid shift, a won game ...): the ledger posts them and `onLedger` below adds the XP, under a per-source daily limit and a daily total cap.
// Rewards: cash comes from the pass faucet (sys:faucet_pass) in ONE balanced ledger transaction (idempotent per tier and track); skins are granted as owned. Premium costs game money
// (cash -> sys:sink_cosmetics). Nothing is sold for real money: see docs/PASS_SKINS.md.
import { bad } from './util.js';
import { move, cashId, balanceOf, SYS, postHooks } from './ledger.js';
import { PASS, rewardsOf } from '../config/pass.js';
import { grant } from './skins.js';
import { skinById } from '../config/skins.js';

export const cfgOf = (app) => app.balance.pass || PASS;
const money = (n) => '₦' + Math.round(n).toLocaleString('en-NG');
const localDate = (ms) => new Date(ms + 3600000).toISOString().slice(0, 10);
const dayOf = (ms) => localDate(ms);
const endMs = (to) => Date.parse(to + 'T00:00:00Z') + 86400000 - 3600000; // the end of the last day, UTC+1

/** the season running now, or the one that ended within the grace period (claims only), or null */
export function seasonAt(app, now = app.clock.now()) {
  const C = cfgOf(app); if (!C.enabled) return null; const today = localDate(now);
  const live = C.seasons.find(s => today >= s.from && today <= s.to); if (live) return { ...live, active: true, endsInMs: Math.max(0, endMs(live.to) - now), claimUntil: endMs(live.to) + C.claimGraceDays * 86400000 };
  const past = C.seasons.filter(s => today > s.to).sort((a, b) => b.to.localeCompare(a.to))[0]; if (past && now <= endMs(past.to) + C.claimGraceDays * 86400000) return { ...past, active: false, endsInMs: 0, claimUntil: endMs(past.to) + C.claimGraceDays * 86400000 };
  return null;
}
export const nextSeason = (app, now = app.clock.now()) => { const today = localDate(now); const s = cfgOf(app).seasons.filter(x => x.from > today).sort((a, b) => a.from.localeCompare(b.from))[0]; return s ? { id: s.id, name: s.name, from: s.from, startsInMs: Math.max(0, Date.parse(s.from + 'T00:00:00Z') - 3600000 - now) } : null; };

const progressRow = (app, uid, season) => app.db.prepare('SELECT * FROM pass_progress WHERE user_id=? AND season=?').get(uid, season);
function ensureRow(app, uid, season) { let r = progressRow(app, uid, season); if (!r) { app.db.prepare('INSERT INTO pass_progress(user_id,season,xp,premium,cash_claimed) VALUES (?,?,0,0,0)').run(uid, season); r = progressRow(app, uid, season); } return r; }
export const tierOf = (app, xp) => Math.min(cfgOf(app).tiers, Math.floor(xp / cfgOf(app).tierXp));
const xpToday = (app, uid, day) => app.db.prepare('SELECT COALESCE(SUM(xp),0) s FROM pass_xp_log WHERE user_id=? AND day=?').get(uid, day).s;

/** add XP for something that happened. Returns the XP actually added (0 when no season, a bot, over the source limit or the daily cap). */
export function award(app, uid, source, now = app.clock.now()) {
  const C = cfgOf(app); const S = C.sources[source]; if (!S) return 0; const se = seasonAt(app, now); if (!se || !se.active) return 0;
  const u = app.db.prepare('SELECT is_bot FROM users WHERE id=?').get(uid); if (!u || u.is_bot) return 0;
  const day = dayOf(now); const log = app.db.prepare('SELECT n, xp FROM pass_xp_log WHERE user_id=? AND day=? AND source=?').get(uid, day, source); if ((log?.n || 0) >= S.perDay) return 0;
  const room = C.dailyXpCap - xpToday(app, uid, day); const add = Math.min(S.xp, room); if (add <= 0) return 0;
  const row = ensureRow(app, uid, se.id); const cap = C.tiers * C.tierXp; const give = Math.min(add, Math.max(0, cap - row.xp)); if (give <= 0) return 0;
  app.db.prepare('UPDATE pass_progress SET xp=xp+? WHERE user_id=? AND season=?').run(give, uid, se.id);
  if (log) app.db.prepare('UPDATE pass_xp_log SET n=n+1, xp=xp+? WHERE user_id=? AND day=? AND source=?').run(give, uid, day, source); else app.db.prepare('INSERT INTO pass_xp_log(user_id,day,source,n,xp) VALUES (?,?,?,?,?)').run(uid, day, source, 1, give);
  return give;
}
// ledger hook: every posted transaction whose reason is an XP source earns XP for its user (once: a repeated idempotent post does not).
postHooks.push((app, { reason, userId }, res) => { if (!userId || res.duplicate) return; if (cfgOf(app).sources[reason]) { try { award(app, userId, reason); } catch { /* XP must never break a payment */ } } });

/** the once-a-day check-in */
export function login(app, uid) {
  const C = cfgOf(app); const se = seasonAt(app); if (!se || !se.active) bad('NO_SEASON', 'No season is running right now.', 409);
  return app.db.transaction(() => {
    const row = ensureRow(app, uid, se.id); const today = dayOf(app.clock.now()); if (row.login_day === today) bad('ALREADY', 'You already checked in today. Come back tomorrow.', 409);
    const room = C.dailyXpCap - xpToday(app, uid, today); const add = Math.max(0, Math.min(C.loginXp, room, C.tiers * C.tierXp - row.xp));
    app.db.prepare('UPDATE pass_progress SET login_day=?, xp=xp+? WHERE user_id=? AND season=?').run(today, add, uid, se.id);
    if (add > 0) { const log = app.db.prepare("SELECT 1 FROM pass_xp_log WHERE user_id=? AND day=? AND source='login'").get(uid, today); if (log) app.db.prepare("UPDATE pass_xp_log SET n=n+1, xp=xp+? WHERE user_id=? AND day=? AND source='login'").run(add, uid, today); else app.db.prepare("INSERT INTO pass_xp_log(user_id,day,source,n,xp) VALUES (?,?,'login',1,?)").run(uid, today, add); }
    return { ok: true, gained: add, text: add > 0 ? `Checked in: +${add} pass XP.` : 'Checked in. You hit today\'s XP cap, so no XP this time.', ...view(app, uid) };
  })();
}

const rewardView = (app, r, uid, claimed, premium, tier) => ({ tier: r.tier, track: r.track, cash: r.cash || null, skin: r.skin ? { id: r.skin, name: skinById[r.skin]?.name || r.skin, kind: skinById[r.skin]?.kind, rarity: skinById[r.skin]?.rarity } : null, reached: r.tier <= tier, claimed: claimed.has(`${r.tier}:${r.track}`), locked: r.track === 'premium' && !premium });
export function view(app, uid) {
  const C = cfgOf(app); const se = seasonAt(app); const base = { enabled: C.enabled, cash: balanceOf(app.db, cashId(uid)), tierXp: C.tierXp, tiers: C.tiers, dailyXpCap: C.dailyXpCap, premiumPrice: C.premiumPrice, realMoney: C.realMoney, next: nextSeason(app),
    sources: Object.entries(C.sources).map(([reason, s]) => ({ reason, label: s.label, xp: s.xp, perDay: s.perDay })), note: 'The battle pass uses game money only. Prices, XP and rewards are placeholders (ESTIMATE).' };
  if (!se) return { ...base, season: null };
  const row = progressRow(app, uid, se.id) || { xp: 0, premium: 0, cash_claimed: 0, login_day: null }; const tier = tierOf(app, row.xp); const claimed = new Set(app.db.prepare('SELECT tier, track FROM pass_claims WHERE user_id=? AND season=?').all(uid, se.id).map(c => `${c.tier}:${c.track}`));
  const today = dayOf(app.clock.now()); const used = xpToday(app, uid, today); const premium = !!row.premium;
  const free = rewardsOf('free', C).map(r => rewardView(app, r, uid, claimed, premium, tier)), prem = rewardsOf('premium', C).map(r => rewardView(app, r, uid, claimed, premium, tier));
  return { ...base, season: { id: se.id, name: se.name, from: se.from, to: se.to, active: se.active, endsInMs: se.endsInMs, claimUntil: se.claimUntil }, xp: row.xp, tier, intoTier: tier >= C.tiers ? C.tierXp : row.xp - tier * C.tierXp, maxed: tier >= C.tiers, premium, xpToday: used, canLogin: se.active && row.login_day !== today, free, premiumTrack: prem, cashClaimed: row.cash_claimed, seasonCashCap: C.seasonCashCap };
}
export function buyPremium(app, uid, idem) {
  const C = cfgOf(app); const se = seasonAt(app); if (!se || !se.active) bad('NO_SEASON', 'No season is running right now.', 409);
  const u = app.db.prepare('SELECT is_bot FROM users WHERE id=?').get(uid); if (!u || u.is_bot) bad('NO_PLAYER', 'Unknown player.', 404);
  return app.db.transaction(() => {
    const row = ensureRow(app, uid, se.id); if (row.premium) bad('ALREADY', 'You already have the premium track this season.', 409);
    if (balanceOf(app.db, cashId(uid)) < C.premiumPrice) bad('NO_FUNDS', `The premium track costs ${money(C.premiumPrice)}. You do not have enough cash.`, 402, { need: C.premiumPrice });
    move(app, { from: cashId(uid), to: SYS.SINK_COSMETICS, amount: C.premiumPrice, reason: 'pass_premium', ref: se.id, userId: uid, idemKey: idem ? `passprem:${uid}:${se.id}:${idem}` : null });
    app.db.prepare('UPDATE pass_progress SET premium=1, premium_at=? WHERE user_id=? AND season=?').run(app.clock.now(), uid, se.id);
    return { ok: true, charged: C.premiumPrice, text: 'Premium track unlocked. Collect every reward you have reached!', ...view(app, uid) };
  })();
}
export function claim(app, uid, tierIn, trackIn, idem) {
  const C = cfgOf(app); const se = seasonAt(app); if (!se) bad('NO_SEASON', 'No season to claim from.', 409); const tier = Math.floor(Number(tierIn)); const track = String(trackIn || '');
  if (!Number.isInteger(tier) || tier < 1 || tier > C.tiers) bad('BAD_TIER', 'Unknown tier.'); if (track !== 'free' && track !== 'premium') bad('BAD_TRACK', 'Pick the free or the premium track.');
  const r = rewardsOf(track, C)[tier - 1];
  return app.db.transaction(() => {
    const row = progressRow(app, uid, se.id); if (!row || tierOf(app, row.xp) < tier) bad('NOT_REACHED', 'You have not reached that tier yet.', 409); if (track === 'premium' && !row.premium) bad('NOT_PREMIUM', 'Unlock the premium track first.', 409);
    if (app.db.prepare('SELECT 1 FROM pass_claims WHERE user_id=? AND season=? AND tier=? AND track=?').get(uid, se.id, tier, track)) bad('CLAIMED', 'You already collected that one.', 409);
    let paid = 0; let skin = null;
    if (r.cash > 0) { paid = Math.min(r.cash, Math.max(0, C.seasonCashCap - row.cash_claimed)); }
    app.db.prepare('INSERT INTO pass_claims(user_id,season,tier,track,claimed_at) VALUES (?,?,?,?,?)').run(uid, se.id, tier, track, app.clock.now());
    if (paid > 0) { move(app, { from: SYS.FAUCET_PASS, to: cashId(uid), amount: paid, reason: 'pass_reward', ref: `${se.id}:${tier}:${track}`, userId: uid, idemKey: `passreward:${uid}:${se.id}:${tier}:${track}` }); app.db.prepare('UPDATE pass_progress SET cash_claimed=cash_claimed+? WHERE user_id=? AND season=?').run(paid, uid, se.id); }
    if (r.skin) { grant(app, uid, r.skin, 'pass'); skin = skinById[r.skin]; }
    return { ok: true, paid, skin: skin ? { id: skin.id, name: skin.name, kind: skin.kind } : null, text: skin ? `You won the ${skin.name} skin!` : paid > 0 ? `${money(paid)} collected.` : 'Collected (the season cash cap is reached).', ...view(app, uid) };
  })();
}
