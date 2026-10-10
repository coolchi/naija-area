// In-game events: night-only events now (Night Market with limited stock, Street Owambe), calendar festivals with limited items later (item 6). GAME MONEY ONLY.
// Config: server/config/events.js (ESTIMATES). Everything is computed from the clock; the only stored rows are stock sold, per-player purchase counts and once-per-event claims.
import { bad } from './util.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { gameTime, refreshNeeds, addMood, notify } from './economy.js';
import { dayKey } from './util.js';
import { EVENTS } from '../config/events.js';
import { cfgOf as wearCfg } from './wearables.js';

export const cfg = (app) => app.balance.events || EVENTS;
const money = (n) => '₦' + Math.round(n).toLocaleString('en-NG');
const GMPM = (app) => app.balance.worldClock.gameMinutesPerRealMinute;
const defOf = (app, id) => cfg(app).events.find(e => e.id === id);
/** stock of a shop item: per night (night events) or per festival run (limited festival items) */
const stockOf = (it) => it.stockPerRun ?? it.stockPerNight;
/** a claim is once per event, or once per player per day (perDay: festivals) */
const claimKey = (app, ev, st, now = app.clock.now()) => (ev.claim?.perDay ? `${st.key}:d${localDate(now)}` : st.key);
const hourIn = (h, [a, b]) => (a <= b ? h >= a && h < b : h >= a || h < b);

/** is the event on right now, what is its key (one per night or per festival run) and how long is left */
export function status(app, ev, now = app.clock.now()) {
  const C = cfg(app); if (!C.enabled) return { active: false };
  const forced = (C.forced || []).includes(ev.id); const w = ev.window;
  if (w.type === 'night') {
    const gt = gameTime(app, now); const inHours = hourIn(gt.hour, [w.from, w.to]); const nightDay = gt.hour < w.to && w.from > w.to ? gt.day - 1 : gt.day; // the night belongs to the day it STARTED on
    const dayOk = !w.everyNthDay || (((nightDay - (w.dayOffset || 0)) % w.everyNthDay) + w.everyNthDay) % w.everyNthDay === 0; const active = forced || (inHours && dayOk);
    const endMin = w.to * 60; const leftMin = (endMin - gt.minutesOfDay + 1440) % 1440 || 1440; return { active, key: `${ev.id}:n${nightDay}`, endsInMs: active ? Math.round(leftMin / GMPM(app) * 60000) : null };
  }
  if (w.type === 'dates') return datesStatus(app, ev, now, forced);
  if (w.type === 'spans') return spansStatus(app, ev, now, forced);
  return { active: forced, key: `${ev.id}:x` };
}
// festivals by real calendar date (month/day in UTC+1): [fromMonth, fromDay, toMonth, toDay], a window may wrap the new year. (used by item 6)
function datesStatus(app, ev, now, forced) {
  const d = new Date(now + 3600000); const y = d.getUTCFullYear(); const m = d.getUTCMonth() + 1, day = d.getUTCDate(); const [fm, fd, tm, td] = ev.window.range; const wraps = fm > tm || (fm === tm && fd > td);
  const cur = m * 100 + day, from = fm * 100 + fd, to = tm * 100 + td; const inside = wraps ? cur >= from || cur <= to : cur >= from && cur <= to; const startYear = wraps && cur <= to ? y - 1 : y;
  const endY = wraps && cur >= from ? y + 1 : y; const end = Date.UTC(endY, tm - 1, td + 1) - 3600000; return { active: forced || inside, key: `${ev.id}:y${startYear}`, endsInMs: inside ? Math.max(0, end - now) : null };
}
// festivals that move each year (Eid): explicit [from, to] dates (UTC+1, inclusive). The key carries the span's start so a new year restocks.
const localDate = (ms) => new Date(ms + 3600000).toISOString().slice(0, 10);
function spansStatus(app, ev, now, forced) {
  const today = localDate(now); const sp = ev.window.spans.find(([a, b]) => today >= a && today <= b);
  if (!sp) return { active: forced, key: `${ev.id}:x` };
  const end = Date.parse(sp[1] + 'T00:00:00Z') + 86400000 - 3600000; return { active: true, key: `${ev.id}:${sp[0]}`, endsInMs: Math.max(0, end - now) };
}
/** when does an inactive calendar festival next start (ms from now), or null (no date known) */
export function startsInMs(app, ev, now = app.clock.now()) {
  const w = ev.window; let t = null;
  if (w.type === 'spans') { const today = localDate(now); const nx = w.spans.map(s => s[0]).filter(a => a > today).sort()[0]; if (nx) t = Date.parse(nx + 'T00:00:00Z') - 3600000; }
  else if (w.type === 'dates') { const y = new Date(now + 3600000).getUTCFullYear(); const [fm, fd] = w.range; const c = [y, y + 1].map(yy => Date.UTC(yy, fm - 1, fd) - 3600000).filter(x => x > now).sort((a, b) => a - b); t = c[0] ?? null; }
  return t == null ? null : Math.max(0, t - now);
}
const windowText = (ev) => { const w = ev.window; const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (w.type === 'night') return `${w.from}:00 to ${w.to}:00 game time${w.everyNthDay ? `, every ${w.everyNthDay}rd night` : ''}`;
  if (w.type === 'dates') return `${w.range[1]} ${mon[w.range[0] - 1]} to ${w.range[3]} ${mon[w.range[2] - 1]}, every year`;
  if (w.type === 'spans') return 'Next dates: ' + w.spans.slice(0, 2).map(([a, b]) => `${a} to ${b}`).join('; ') + ' (estimated: the moon decides)'; return 'by date'; };
const stockRow = (app, key, id) => app.db.prepare('SELECT sold FROM event_stock WHERE event_key=? AND item_id=?').get(key, id)?.sold || 0;
const boughtBy = (app, uid, key, id) => app.db.prepare('SELECT qty FROM event_buys WHERE user_id=? AND event_key=? AND item_id=?').get(uid, key, id)?.qty || 0;
const claimedToday = (app, uid) => app.db.prepare('SELECT COALESCE(SUM(amount),0) s FROM event_claims WHERE user_id=? AND claimed_at>=?').get(uid, Date.parse(dayKey(app.clock.now()) + 'T00:00:00Z')).s;

export function view(app, uid) {
  const now = app.clock.now(); const C = cfg(app); const list = [];
  for (const ev of C.events) {
    const st = status(app, ev, now); const out = { id: ev.id, name: ev.name, icon: ev.icon, blurb: ev.blurb, kind: ev.kind, active: st.active, endsInMs: st.endsInMs ?? null, window: windowText(ev), startsInMs: !st.active && ev.kind === 'festival' ? startsInMs(app, ev, now) : null };
    if (st.active) {
      if (ev.shop) out.shop = ev.shop.map(it => { const sold = stockRow(app, st.key, it.id), stock = stockOf(it); return { id: it.id, name: it.name, price: it.price, left: Math.max(0, stock - sold), stock, limited: !!it.limited, limit: it.limitPerPlayer, bought: boughtBy(app, uid, st.key, it.id), hunger: it.hunger, mood: it.mood, wear: it.wear || null }; });
      if (ev.claim) { const c = app.db.prepare('SELECT amount FROM event_claims WHERE user_id=? AND event_key=?').get(uid, claimKey(app, ev, st, now)); out.claim = { label: ev.claim.label, mood: ev.claim.mood, cash: ev.claim.cash, claimed: !!c, perDay: !!ev.claim.perDay }; }
    }
    list.push(out);
  }
  return { events: list, cash: balanceOf(app.db, cashId(uid)), dailyCap: C.claimDailyCap, claimedToday: claimedToday(app, uid), note: 'Prices, stock and rewards are placeholders (ESTIMATE). Game money only.' };
}
export function buy(app, uid, eventId, itemId, idem) {
  const ev = defOf(app, eventId); if (!ev || !ev.shop) bad('NO_EVENT', 'No such event shop.', 404); const st = status(app, ev); if (!st.active) bad('NOT_ON', `${ev.name} is not on right now.`, 409);
  const it = ev.shop.find(x => x.id === itemId); if (!it) bad('NO_ITEM', 'They do not sell that.', 404);
  return app.db.transaction(() => {
    if (it.wear && app.db.prepare('SELECT 1 FROM wearables_owned WHERE user_id=? AND item_id=?').get(uid, it.wear)) bad('OWNED', 'You already own that one. It is yours for good.', 409);
    if (boughtBy(app, uid, st.key, it.id) >= it.limitPerPlayer) bad('LIMIT', `You can buy at most ${it.limitPerPlayer} of those${it.limited ? '' : ' tonight'}.`, 409);
    if (stockRow(app, st.key, it.id) >= stockOf(it)) bad('SOLD_OUT', 'Sold out for this event.', 409); if (balanceOf(app.db, cashId(uid)) < it.price) bad('NO_FUNDS', `It costs ${money(it.price)}.`, 402, { need: it.price });
    const upd = app.db.prepare('UPDATE event_stock SET sold=sold+1 WHERE event_key=? AND item_id=? AND sold<?').run(st.key, it.id, stockOf(it));
    if (upd.changes === 0) { app.db.prepare('INSERT INTO event_stock(event_key,item_id,sold) VALUES (?,?,1)').run(st.key, it.id); }
    const b = app.db.prepare('UPDATE event_buys SET qty=qty+1 WHERE user_id=? AND event_key=? AND item_id=?').run(uid, st.key, it.id); if (b.changes === 0) app.db.prepare('INSERT INTO event_buys(user_id,event_key,item_id,qty) VALUES (?,?,?,1)').run(uid, st.key, it.id);
    move(app, { from: cashId(uid), to: SYS.SINK_SHOPS, amount: it.price, reason: 'event_buy', ref: `${st.key}:${it.id}`, userId: uid, idemKey: idem ? `evbuy:${uid}:${st.key}:${it.id}:${idem}` : null });
    if (it.hunger) { const s = refreshNeeds(app, uid); app.db.prepare('UPDATE player_state SET hunger=? WHERE user_id=?').run(Math.min(100, s.hunger + it.hunger), uid); }
    if (it.wear) giveWear(app, uid, it.wear, it.price); const mood = it.mood ? addMood(app, uid, it.mood) : null;
    return { ok: true, charged: it.price, mood, text: `${it.name} for ${money(it.price)}. Enjoy!`, ...view(app, uid) };
  })();
}
/** a limited festival item is a normal wearable (see wearables config); owning it uses the existing tables */
function giveWear(app, uid, itemId, price = 0) { const w = wearCfg(app).WEARABLES.find(x => x.id === itemId); if (!w) return; if (!app.db.prepare('SELECT 1 FROM wearables_owned WHERE user_id=? AND item_id=?').get(uid, itemId)) { app.db.prepare('INSERT INTO wearables_owned(user_id,item_id,price_paid,bought_at) VALUES (?,?,?,?)').run(uid, itemId, price, app.clock.now()); app.db.prepare('DELETE FROM wearables_equipped WHERE user_id=? AND slot=?').run(uid, w.slot); app.db.prepare('INSERT INTO wearables_equipped(user_id,slot,item_id) VALUES (?,?,?)').run(uid, w.slot, itemId); } const p = app.world.players.get(uid); if (p) p.wear = undefined; }
export function claim(app, uid, eventId, idem) {
  const ev = defOf(app, eventId); if (!ev || !ev.claim) bad('NO_EVENT', 'Nothing to claim there.', 404); const st = status(app, ev); if (!st.active) bad('NOT_ON', `${ev.name} is not on right now.`, 409);
  return app.db.transaction(() => {
    const ck = claimKey(app, ev, st); if (app.db.prepare('SELECT 1 FROM event_claims WHERE user_id=? AND event_key=?').get(uid, ck)) bad('CLAIMED', ev.claim.perDay ? 'You already collected today. Come back tomorrow.' : 'You already joined this one.', 409);
    const C = cfg(app); const room = Math.max(0, C.claimDailyCap - claimedToday(app, uid)); const pay = Math.min(ev.claim.cash || 0, room);
    app.db.prepare('INSERT INTO event_claims(user_id,event_key,claimed_at,amount) VALUES (?,?,?,?)').run(uid, ck, app.clock.now(), pay);
    if (pay > 0) move(app, { from: SYS.FAUCET_EVENTS, to: cashId(uid), amount: pay, reason: 'event_claim', ref: ck, userId: uid, idemKey: idem ? `evclaim:${uid}:${ck}:${idem}` : `evclaim:${uid}:${ck}` });
    const mood = ev.claim.mood ? addMood(app, uid, ev.claim.mood) : null; notify(app, uid, 'event', `${ev.name}: ${pay > 0 ? money(pay) + ' and a mood lift' : 'a mood lift (daily event cap reached)'}.`);
    return { ok: true, paid: pay, mood, text: pay > 0 ? `${ev.claim.label}! You got ${money(pay)} and your mood is up.` : `${ev.claim.label}! Your mood is up (the daily event cash cap is reached).`, ...view(app, uid) };
  })();
}

/** festivals on right now: small list for the heartbeat (the client shows a badge) */
export function activeFestivals(app, now = app.clock.now()) { const c = app._fest; if (c && now - c.t < 30000 && now >= c.t) return c.v; const v = computeFestivals(app, now); app._fest = { t: now, v }; return v; }
function computeFestivals(app, now) { const C = cfg(app); if (!C.enabled) return []; return C.events.filter(e => e.kind === 'festival' && status(app, e, now).active).map(e => ({ id: e.id, icon: e.icon, name: e.name })); }
