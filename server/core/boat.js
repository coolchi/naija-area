// Call a boat (10 Oct 2026). At a jetty you call a boat; it arrives after a short wait; you board (the fare goes through the ledger) and cross the water.
// Server-authoritative like flights: the trip is stored in the database so a disconnect never strands you, you cannot walk, drive or travel while aboard,
// and on arrival the server puts you at the other jetty (in another district if the route says so). Fares, waits and times are ESTIMATE placeholders.
import { bad } from './util.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { notify } from './economy.js';
import { ensurePresence, teleport } from './world.js';
import { cityOf, enterCity } from './cities.js';
import { myMatch } from './games.js';

const B = (app) => app.balance.boat;
const row = (app, uid) => app.db.prepare('SELECT * FROM boat_trips WHERE user_id=?').get(uid);
export const stopsOf = (city) => (city.boat?.stops || []);
export const isAboard = (app, uid) => row(app, uid)?.state === 'crossing';
export const assertNotAboard = (app, uid) => { if (isAboard(app, uid)) bad('ABOARD', 'You are on the water. Enjoy the breeze.', 409); };
/** the stop the player stands at (within the radius), or null */
export function stopAt(app, uid) { const p = ensurePresence(app, uid); const city = cityOf(app, uid); const R = B(app).stopRadiusM; let best = null; for (const s of stopsOf(city)) { const d = Math.hypot(p.x - s.x, p.z - s.z); if (d <= (s.r || R) && (!best || d < best.d)) best = { s, d }; } return best ? app.boatStops[best.s.id] : null; }
const routesFrom = (app, stop) => (app.cities[stop.city]?.boat?.routes || []).filter(r => r.from === stop.id && app.boatStops[r.to]);
const describe = (app, stop) => routesFrom(app, stop).map(r => { const t = app.boatStops[r.to]; const c = app.cities[t.city]; return { to: t.id, toName: t.name, city: t.city, cityName: c.cityName || c.name, district: c.name, sameCity: t.city === stop.city, fare: r.fare, crossMs: r.crossMs }; });

/** advance this player's trip to now (lazy; called from the heartbeat and from every boat endpoint) */
export function tick(app, uid) {
  const r = row(app, uid); if (!r) return null; const now = app.clock.now();
  if (r.state === 'called' && now > r.expires_at) { app.db.prepare('DELETE FROM boat_trips WHERE user_id=?').run(uid); notify(app, uid, 'boat', 'The boat waited and left. No charge.'); return null; }
  if (r.state === 'crossing' && now >= r.arrive_at) {
    const to = app.boatStops[r.to_stop]; app.db.prepare('DELETE FROM boat_trips WHERE user_id=?').run(uid); app.db.prepare('UPDATE player_state SET last_boat_at=? WHERE user_id=?').run(now, uid);
    if (to) { const a = to.arrive || { x: to.x, z: to.z, ry: 0 }; if (to.city === (ensurePresence(app, uid).city)) { teleport(app, uid, a.x, a.z); } else enterCity(app, uid, to.city, { x: a.x, z: a.z, ry: a.ry || 0 }); notify(app, uid, 'boat', `You have arrived at ${to.name}.`); }
    return null;
  }
  return r;
}
export function view(app, uid) {
  const r = tick(app, uid); const cfg = B(app); const now = app.clock.now(); const stop = stopAt(app, uid);
  const out = { enabled: !!cfg.enabled, estimate: true, now, stop: stop ? { id: stop.id, name: stop.name, x: stop.x, z: stop.z, routes: describe(app, stop) } : null, trip: r ? mini(app, uid) : null };
  const here = cityOf(app, uid); out.stops = stopsOf(here).map(s => ({ id: s.id, name: s.name, x: s.x, z: s.z, berth: s.berth || null }));
  return out;
}
export function call(app, uid, toId, idemKey) {
  const cfg = B(app); if (!cfg.enabled) bad('OFF', 'Boats are switched off.', 409); tick(app, uid); const now = app.clock.now();
  const stop = stopAt(app, uid); if (!stop) bad('NOT_AT_JETTY', 'Walk to a jetty first.', 409); const route = routesFrom(app, stop).find(r => r.to === toId); if (!route) bad('NO_ROUTE', 'No boat goes there from this jetty.', 404);
  const p = ensurePresence(app, uid); if (p.mode === 'drive') bad('DRIVING', 'Park your car first.', 409); if (p.venue) bad('INSIDE', 'Step outside first.', 409);
  if (myMatch(app, uid, { onlyLive: true })) bad('IN_GAME', 'Finish your table game first.', 409); if (row(app, uid)) bad('HAS_TRIP', 'You already called a boat.', 409);
  const st = app.db.prepare('SELECT last_boat_at FROM player_state WHERE user_id=?').get(uid) || {}; if (now < (st.last_boat_at || 0) + cfg.cooldownMs) bad('COOLDOWN', 'The boats are busy. Try again in a moment.', 429, { retryMs: (st.last_boat_at || 0) + cfg.cooldownMs - now });
  if (balanceOf(app.db, cashId(uid)) < route.fare) bad('NO_FUNDS', `This trip costs ₦${route.fare.toLocaleString('en-NG')}.`, 402, { fare: route.fare });
  app.db.prepare("INSERT INTO boat_trips(user_id,from_stop,to_stop,state,fare,cross_ms,called_at,boat_at,expires_at,arrive_at) VALUES (?,?,?,'called',?,?,?,?,?,0)").run(uid, stop.id, toId, route.fare, route.crossMs, now, now + cfg.waitMs, now + cfg.waitMs + cfg.boardWindowMs);
  void idemKey; return { ok: true, text: `Boat called to ${stop.name}. It arrives in about ${Math.round(cfg.waitMs / 1000)} s.`, trip: mini(app, uid) };
}
export function board(app, uid, idemKey) {
  const r = tick(app, uid); if (!r) bad('NO_TRIP', 'You have not called a boat.', 404); if (r.state !== 'called') bad('ABOARD', 'You are already aboard.', 409); const now = app.clock.now();
  if (now < r.boat_at) bad('NOT_YET', 'The boat has not arrived yet.', 409, { waitMs: r.boat_at - now });
  const from = app.boatStops[r.from_stop], p = ensurePresence(app, uid); if (!from || p.city !== from.city || Math.hypot(p.x - from.x, p.z - from.z) > (from.r || B(app).stopRadiusM) + 4) bad('NOT_AT_JETTY', 'Stay at the jetty to board.', 409);
  if (p.mode === 'drive') bad('DRIVING', 'Park your car first.', 409); if (p.venue) bad('INSIDE', 'Step outside first.', 409);
  return app.db.transaction(() => {
    move(app, { from: cashId(uid), to: SYS.SINK_TRANSPORT, amount: r.fare, reason: 'boat_fare', ref: `${r.from_stop}>${r.to_stop}`, userId: uid, idemKey: idemKey ? `boat:${uid}:${idemKey}` : undefined });
    app.db.prepare("UPDATE boat_trips SET state='crossing', arrive_at=? WHERE user_id=?").run(now + r.cross_ms, uid); p.activity = 'boat';
    return { ok: true, text: `Aboard! Crossing to ${app.boatStops[r.to_stop]?.name || 'the other jetty'}.`, trip: mini(app, uid) };
  })();
}
export function cancel(app, uid) {
  const r = tick(app, uid); if (!r) bad('NO_TRIP', 'You have not called a boat.', 404); if (r.state !== 'called') bad('ABOARD', 'Too late: you are on the water.', 409);
  app.db.prepare('DELETE FROM boat_trips WHERE user_id=?').run(uid); return { ok: true, text: 'Boat call cancelled. No charge.' };
}
/** the trip as the heartbeat sends it (one row read) */
export function mini(app, uid) {
  const r = row(app, uid); if (!r) return null; const from = app.boatStops[r.from_stop], to = app.boatStops[r.to_stop];
  return { state: r.state, from: r.from_stop, to: r.to_stop, toName: to?.name || r.to_stop, toCity: to?.city || null, sameCity: from?.city === to?.city, fare: r.fare, crossMs: r.cross_ms, calledAt: r.called_at, boatAt: r.boat_at, expiresAt: r.expires_at, arriveAt: r.arrive_at, berth: from?.berth || null, destBerth: to?.berth || null };
}
