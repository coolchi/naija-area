// House presence, the visitor knock flow, DMs, travel (fare + timed commute) and land plots.
import { bad, cleanText, hasBadWord } from './util.js';
import { dist, notify, homeOf, gameTime, getState } from './economy.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { ensurePresence, syncPos } from './world.js';

const ACTIVE = 60000;
export function installSocial(app) {
  // presence of a house owner: home (inside own interior), online (heartbeat but elsewhere), away
  app.presenceOf = (ownerId, propertyId) => {
    const p = app.world.players.get(ownerId); if (!p || p.lastSeen < app.clock.now() - ACTIVE) return 'away';
    return p.inside === propertyId ? 'home' : 'online';
  };
  app.guestCount = (propertyId) => { expireKnocks(app); return app.db.prepare("SELECT COUNT(*) n FROM knocks WHERE property_id=? AND status='accepted' AND decided_at>?").get(propertyId, app.clock.now() - app.balance.housing.visitPermitMs).n; };
  app.plotValue = (uid) => plotValueTotal(app, uid);
  app.hasVisitPermit = (uid, propertyId) => !!app.db.prepare("SELECT 1 FROM knocks WHERE property_id=? AND visitor_id=? AND status='accepted' AND decided_at>?").get(propertyId, uid, app.clock.now() - app.balance.housing.visitPermitMs);
}
export function expireKnocks(app) { app.db.prepare("UPDATE knocks SET status='expired', decided_at=? WHERE status='pending' AND expires_at<=?").run(app.clock.now(), app.clock.now()); }

export function enterHome(app, uid) { const h = homeOf(app, uid); if (!h) bad('NO_HOME', 'You have no home.', 404); ensurePresence(app, uid).inside = h.property_id; return { ok: true }; }
export function leaveHome(app, uid) { const p = app.world.players.get(uid); if (p) p.inside = null; app.db.prepare("UPDATE knocks SET status='ended' WHERE visitor_id=? AND status='accepted'").run(uid); return { ok: true }; }

export function knock(app, uid, propertyId) {
  expireKnocks(app); const now = app.clock.now(); const H = app.balance.housing;
  const o = app.db.prepare('SELECT po.*, u.username FROM property_owner po JOIN users u ON u.id=po.user_id WHERE property_id=?').get(propertyId);
  if (!o) bad('NO_OWNER', 'Nobody lives here.', 404); if (o.user_id === uid) bad('YOURS', 'That is your own place.');
  const p = app.city.propertyById[propertyId]; const st = getState(app, uid);
  if (dist(st.x, st.z, p.door.x, p.door.z) > app.balance.interact.houseRadius + 10) bad('TOO_FAR', 'Walk up to the door to knock.');
  if (app.presenceOf(o.user_id, propertyId) !== 'home') bad('NOT_HOME', "You can only drop by when they're home.", 409);
  if (app.db.prepare("SELECT 1 FROM knocks WHERE visitor_id=? AND status='pending'").get(uid)) bad('ALREADY_KNOCKING', 'You are already knocking somewhere.', 409);
  const dec = app.db.prepare("SELECT decided_at FROM knocks WHERE visitor_id=? AND property_id=? AND status='declined' ORDER BY id DESC LIMIT 1").get(uid, propertyId);
  if (dec && now - dec.decided_at < H.knockDeclineCooldownMs) bad('COOLDOWN', `They are not receiving visitors right now. Knock again in ${Math.ceil((H.knockDeclineCooldownMs - (now - dec.decided_at)) / 1000)}s.`, 429, { retryIn: Math.ceil((H.knockDeclineCooldownMs - (now - dec.decided_at)) / 1000) });
  if (app.guestCount(propertyId) >= H.guestsByTier[p.tier]) bad('FULL', 'The house is full right now.', 409);
  if (app.db.prepare("SELECT COUNT(*) n FROM knocks WHERE owner_id=? AND status='pending'").get(o.user_id).n >= 3) bad('BUSY', 'Too many people at the door.', 409);
  const r = app.db.prepare("INSERT INTO knocks(property_id,visitor_id,owner_id,status,created_at,expires_at) VALUES (?,?,?,'pending',?,?)").run(propertyId, uid, o.user_id, now, now + H.knockTimeoutMs);
  const me = app.db.prepare('SELECT username FROM users WHERE id=?').get(uid).username;
  notify(app, o.user_id, 'knock', `Knock knock! @${me} is at your door. Open the Home tab to let them in.`);
  return { knockId: Number(r.lastInsertRowid), expiresAt: now + H.knockTimeoutMs, owner: o.username, name: o.custom_name || p.name };
}
export function respondKnock(app, uid, knockId, accept) {
  expireKnocks(app); const k = app.db.prepare('SELECT * FROM knocks WHERE id=?').get(knockId);
  if (!k || k.owner_id !== uid) bad('NO_KNOCK', 'No such knock.', 404); if (k.status !== 'pending') bad('KNOCK_CLOSED', `That knock is ${k.status}.`, 409);
  const now = app.clock.now(); const p = app.city.propertyById[k.property_id];
  if (accept && app.guestCount(k.property_id) >= app.balance.housing.guestsByTier[p.tier]) bad('FULL', 'Your house is at its guest limit.', 409);
  app.db.prepare('UPDATE knocks SET status=?, decided_at=? WHERE id=? AND status=\'pending\'').run(accept ? 'accepted' : 'declined', now, knockId);
  const me = app.db.prepare('SELECT username FROM users WHERE id=?').get(uid).username;
  notify(app, k.visitor_id, accept ? 'knock_in' : 'knock_no', accept ? `@${me} opened the door. Come in!` : `@${me} isn't receiving visitors right now.`);
  return { ok: true, status: accept ? 'accepted' : 'declined' };
}
export function cancelKnock(app, uid) { app.db.prepare("UPDATE knocks SET status='cancelled', decided_at=? WHERE visitor_id=? AND status='pending'").run(app.clock.now(), uid); return { ok: true }; }
export function knockState(app, uid) {
  expireKnocks(app); const now = app.clock.now();
  const incoming = app.db.prepare("SELECT k.id, k.expires_at, u.username `from`, k.property_id FROM knocks k JOIN users u ON u.id=k.visitor_id WHERE k.owner_id=? AND k.status='pending' ORDER BY k.id").all(uid).map(r => ({ id: r.id, from: r.from, expiresAt: r.expires_at, propertyId: r.property_id }));
  const m = app.db.prepare("SELECT k.id, k.status, k.property_id, k.expires_at, k.decided_at, u.username owner FROM knocks k JOIN users u ON u.id=k.owner_id WHERE k.visitor_id=? ORDER BY k.id DESC LIMIT 1").get(uid);
  let mine = null; if (m && ((m.status === 'pending') || (m.status === 'accepted' && m.decided_at > now - app.balance.housing.visitPermitMs) || (['declined', 'expired'].includes(m.status) && (m.decided_at || m.expires_at) > now - 30000))) mine = { id: m.id, status: m.status, propertyId: m.property_id, owner: m.owner, expiresAt: m.expires_at };
  return { incoming, mine };
}

export function sendDm(app, uid, toUsername, text) {
  const t = cleanText(text, 140); if (!t) bad('EMPTY', 'Type a message.'); if (hasBadWord(t)) bad('CLEAN_IT_UP', 'Keep it clean, please.');
  const me = app.db.prepare('SELECT username, is_guest FROM users WHERE id=?').get(uid); const to = app.db.prepare('SELECT id FROM users WHERE username=?').get(String(toUsername || ''));
  if (!to) bad('NO_RECIPIENT', 'No player with that username.', 404); if (to.id === uid) bad('SELF', 'You cannot message yourself.');
  const now = app.clock.now(); if (!app.limiter.hit(`dm:${uid}`, 6, 60000, now)) bad('RATE_LIMIT', 'Too many messages, slow down.', 429);
  notify(app, to.id, 'dm', `@${me.username}: ${t}`); return { ok: true };
}

// ---- travel: tap a place -> pick fare chip -> Go. Server charges the fare, moves the player, and writes the route into the trail so others see a car move.
export function isRush(app, now = app.clock.now()) { const h = gameTime(app, now).hour; return app.balance.transport.rushHours.some(([a, b]) => h >= a && h < b); }
export function travelQuote(app, uid, placeId) {
  const pl = app.city.placeById[placeId]; if (!pl) bad('NO_PLACE', 'Unknown place.', 404); const st = getState(app, uid); const d = dist(st.x, st.z, pl.x, pl.z); const T = app.balance.transport; const rush = isRush(app);
  const modes = Object.entries(T.modes).map(([id, m]) => { const fare = Math.round((m.base + m.perM * d) * (rush ? T.rushMult : 1)); const sec = Math.max(T.minSec, Math.min(T.maxSec, Math.round(d / m.speed))); return { id, label: m.label, fare, seconds: sec }; });
  return { place: { id: pl.id, name: pl.name, type: pl.type, area: pl.area }, distance: Math.round(d), traffic: rush ? 'Go-slow (rush hour)' : 'Free road', rush, modes: [{ id: 'walk', label: 'Walk', fare: 0, seconds: Math.round(d / 5.2) }, ...modes] };
}
export function travel(app, uid, placeId, mode, idemKey) {
  if (mode === 'walk') bad('WALK', 'Walking needs no ticket: just set a waypoint and go.');
  const q = travelQuote(app, uid, placeId); const m = q.modes.find(x => x.id === mode); if (!m) bad('BAD_MODE', 'Pick keke, danfo or car.');
  if (app.db.prepare("SELECT 1 FROM shifts WHERE user_id=? AND status='active' AND 0").get(uid)) bad('BUSY', 'Busy.');
  const pl = app.city.placeById[placeId]; const now = app.clock.now();
  return app.db.transaction(() => {
    if (m.fare > 0) move(app, { from: cashId(uid), to: SYS.SINK_TRANSPORT, amount: m.fare, reason: 'transport', ref: `${mode}:${placeId}`, userId: uid, idemKey: idemKey ? `trip:${uid}:${idemKey}` : null });
    const p = ensurePresence(app, uid); const from = { x: p.x, z: p.z };
    p.mode = mode === 'car' ? 'drive' : 'walk'; const ry = Math.atan2(-(pl.z - from.z), pl.x - from.x);
    p.trail.push({ t: now, x: from.x, z: from.z, ry }, { t: now + m.seconds * 1000, x: pl.x, z: pl.z, ry }); p.x = pl.x; p.z = pl.z; p.ry = ry;
    app.db.prepare('UPDATE player_state SET x=?,z=?,mode=? WHERE user_id=?').run(pl.x, pl.z, p.mode, uid);
    p.force = { x: pl.x, z: pl.z, travelMs: m.seconds * 1000, from };
    return { ok: true, fare: m.fare, seconds: m.seconds, traffic: q.traffic, mode, to: { x: pl.x, z: pl.z }, from, cash: balanceOf(app.db, cashId(uid)) };
  })();
}

// ---- land plots: buy, growth (value compounds with time), omo-onile levy risk, sell
const growthFactor = (app, plot, boughtAt, now) => Math.pow(1 + plot.growthPerWeek / 7, Math.max(0, (now - boughtAt) / app.balance.land.dayMs));
export function plotsView(app, uid) {
  const now = app.clock.now(); const rows = app.db.prepare('SELECT lp.*, u.username FROM land_plots lp JOIN users u ON u.id=lp.user_id').all(); const by = Object.fromEntries(rows.map(r => [r.plot_id, r]));
  return (app.city.plots || []).map(p => { const o = by[p.id]; const value = o ? Math.floor(o.paid_price * growthFactor(app, p, o.bought_at, now)) : null;
    return { id: p.id, name: p.name, area: p.area, sqm: p.sqm, price: p.price, growthPerWeekPct: Math.round(p.growthPerWeek * 1000) / 10, risk: p.risk, status: o ? (o.user_id === uid ? 'yours' : 'taken') : 'available', owner: o?.username || null, value: o?.user_id === uid ? value : null, sellValue: o?.user_id === uid ? Math.floor(value * app.balance.land.sellFraction) : null, x: p.x, z: p.z, size: p.size }; });
}
export function buyPlot(app, uid, plotId, idemKey) {
  const p = app.city.plotById?.[plotId]; if (!p) bad('NO_PLOT', 'Unknown plot.', 404); const st = getState(app, uid);
  return app.db.transaction(() => {
    if (app.db.prepare('SELECT 1 FROM land_plots WHERE plot_id=?').get(plotId)) bad('TAKEN', 'Someone already owns this plot.', 409);
    if (app.db.prepare('SELECT COUNT(*) n FROM land_plots WHERE user_id=?').get(uid).n >= app.balance.land.maxPlots) bad('PLOT_LIMIT', `You can hold ${app.balance.land.maxPlots} plots.`, 409);
    if (dist(st.x, st.z, p.x, p.z) > p.size / 2 + 25) bad('TOO_FAR', 'Go and see the land first. Walk up to the plot.');
    const now = app.clock.now(); move(app, { from: cashId(uid), to: SYS.SINK_PROPERTY, amount: p.price, reason: 'land_purchase', ref: plotId, userId: uid, idemKey: idemKey ? `plot:${uid}:${idemKey}` : null });
    app.db.prepare('INSERT INTO land_plots(plot_id,user_id,paid_price,bought_at,last_check_at) VALUES (?,?,?,?,?)').run(plotId, uid, p.price, now, now);
    notify(app, uid, 'land', `Congrats, ${p.name} (${p.area}) is yours! Watch out for omo-onile.`); return { ok: true, cash: balanceOf(app.db, cashId(uid)) };
  })();
}
export function sellPlot(app, uid, plotId) {
  const o = app.db.prepare('SELECT * FROM land_plots WHERE plot_id=? AND user_id=?').get(plotId, uid); if (!o) bad('NOT_YOURS', 'You do not own that plot.', 404); const p = app.city.plotById[plotId]; const now = app.clock.now();
  const value = Math.floor(Math.floor(o.paid_price * growthFactor(app, p, o.bought_at, now)) * app.balance.land.sellFraction);
  return app.db.transaction(() => { app.db.prepare('DELETE FROM land_plots WHERE plot_id=?').run(plotId); const profit = value - o.paid_price;
    // sale proceeds come from the property sink first; any growth above what the sink holds is a faucet ("land appreciation")
    move(app, { from: SYS.FAUCET_LAND, to: cashId(uid), amount: value, reason: 'land_sale', ref: plotId, userId: uid, idemKey: `plotsell:${plotId}:${o.bought_at}` }); return { ok: true, value, profit, cash: balanceOf(app.db, cashId(uid)) }; })();
}
/** daily omo-onile check per plot: with a risk-based probability a "levy" is demanded (charged if the owner can pay). rng injectable for tests. */
export function tickLand(app, rng = Math.random) {
  const now = app.clock.now(); const L = app.balance.land; let events = 0;
  for (const o of app.db.prepare('SELECT * FROM land_plots WHERE last_check_at + ? <= ?').all(L.dayMs, now)) {
    const p = app.city.plotById[o.plot_id]; const days = Math.min(5, Math.floor((now - o.last_check_at) / L.dayMs));
    for (let i = 0; i < days; i++) {
      if (rng() < L.risk[p.risk]) { const levy = Math.ceil(o.paid_price * L.levyFraction);
        try { app.db.transaction(() => { move(app, { from: cashId(o.user_id), to: SYS.SINK_PROPERTY, amount: levy, reason: 'omo_onile_levy', ref: o.plot_id, userId: o.user_id, idemKey: `levy:${o.plot_id}:${o.last_check_at}:${i}` }); app.db.prepare('UPDATE land_plots SET levies_paid=levies_paid+1 WHERE plot_id=?').run(o.plot_id); })(); notify(app, o.user_id, 'omo_onile', `Omo-onile showed up at ${p.name} and you paid ₦${levy.toLocaleString('en-NG')} "to avoid wahala".`); events++; }
        catch (e) { if (e.code !== 'INSUFFICIENT_FUNDS') throw e; notify(app, o.user_id, 'omo_onile', `Omo-onile came to ${p.name} demanding ₦${levy.toLocaleString('en-NG')} but you had no cash. Lucky this time.`); }
      }
    }
    app.db.prepare('UPDATE land_plots SET last_check_at=last_check_at+? WHERE plot_id=?').run(Math.max(1, days) * L.dayMs, o.plot_id);
  }
  return { events };
}
export const plotValueTotal = (app, uid) => { const now = app.clock.now(); return app.db.prepare('SELECT * FROM land_plots WHERE user_id=?').all(uid).reduce((s, o) => s + Math.floor(Math.floor(o.paid_price * growthFactor(app, app.city.plotById[o.plot_id], o.bought_at, now)) * app.balance.land.sellFraction), 0); };
