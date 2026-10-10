// Airport and flights (10 Oct 2026). A player at an airport buys a ticket for the next scheduled departure to another city's airport.
// Server-authoritative: the fare goes through the ledger, the timetable is computed from server time, you must be at the airport when the plane leaves
// (otherwise you miss it: no refund, placeholder rule), the flight is stored in the database so a disconnect never strands you, and on arrival the server moves you into the other city.
import { bad } from './util.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { getState, notify } from './economy.js';
import { ensurePresence } from './world.js';
import { cityOf, cityIdOf, enterCity } from './cities.js';
import { myMatch } from './games.js';

const F = (app) => app.balance.flight;
export const fareFor = (cfg, fromCity, toCity) => Math.max(fromCity.state && toCity.state && fromCity.state === toCity.state ? cfg.fares.sameState : cfg.fares.otherState, cfg.routes?.[fromCity.id]?.fare || 0, cfg.routes?.[toCity.id]?.fare || 0);
/** how long the flight takes: the base time, stretched for long routes (the larger factor of the two cities) */
export const flightMsFor = (cfg, fromCity, toCity) => Math.round(cfg.flightMs * Math.max(1, cfg.routes?.[fromCity.id]?.flightFactor || 1, cfg.routes?.[toCity.id]?.flightFactor || 1));
/** the next n scheduled departures (epoch ms) that are at least minLeadMs away */
export function departureSlots(now, cfg, n = cfg.slotsShown) { const first = Math.ceil((now + cfg.minLeadMs) / cfg.departEveryMs) * cfg.departEveryMs; return Array.from({ length: n }, (_, i) => first + i * cfg.departEveryMs); }
export const airportOf = (city) => city.airport || null;
const row = (app, uid) => app.db.prepare('SELECT * FROM flights WHERE user_id=?').get(uid);
const atGate = (ap, p, cfg) => Math.hypot(p.x - ap.door.x, p.z - ap.door.z) <= cfg.gateRadiusM;
export const isFlying = (app, uid) => row(app, uid)?.state === 'flying';
export const assertNotFlying = (app, uid) => { if (isFlying(app, uid)) bad('FLYING', 'You are in the air. Enjoy the view.', 409); if (app.db.prepare("SELECT 1 FROM boat_trips WHERE user_id=? AND state='crossing'").get(uid)) bad('ABOARD', 'You are on the water. Enjoy the breeze.', 409); };

/** advance this player's ticket/flight to now (lazy; called from the heartbeat and from every flight endpoint) */
export function tick(app, uid) {
  const r = row(app, uid); if (!r) return null; const now = app.clock.now(); const from = app.cities[r.from_city], to = app.cities[r.to_city];
  if (r.state === 'ticketed' && now >= r.departs_at) {
    const p = ensurePresence(app, uid); const ap = airportOf(from);
    if (ap && p.city === r.from_city && atGate(ap, p, F(app)) && !p.venue && p.mode !== 'drive') { app.db.prepare("UPDATE flights SET state='flying', arrive_at=? WHERE user_id=?").run(r.arrive_at, uid); r.state = 'flying'; p.venue = null; p.mode = 'walk'; }
    else { app.db.prepare('DELETE FROM flights WHERE user_id=?').run(uid); notify(app, uid, 'flight', `You missed your flight to ${to?.cityName || r.to_city}. The ticket is not refunded.`); return null; }
  }
  if (r.state === 'flying' && now >= r.arrive_at) {
    app.db.prepare('DELETE FROM flights WHERE user_id=?').run(uid); app.db.prepare('UPDATE player_state SET last_flight_at=? WHERE user_id=?').run(now, uid);
    const at = airportOf(to)?.arrive; enterCity(app, uid, r.to_city, at ? { x: at.x, z: at.z, ry: at.ry || 0 } : 0); notify(app, uid, 'flight', `You have landed in ${to.cityName || to.name}. Welcome!`); return null;
  }
  return r;
}
export function view(app, uid) {
  const r = tick(app, uid); const cfg = F(app); const now = app.clock.now(); const here = cityOf(app, uid); const ap = airportOf(here); const p = ensurePresence(app, uid);
  const out = { enabled: !!cfg.enabled, estimate: true, now, airport: ap ? { id: ap.id, name: ap.name, x: ap.door.x, z: ap.door.z, radius: cfg.gateRadiusM, here: atGate(ap, p, cfg) } : null, ticket: null, destinations: [] };
  if (r) out.ticket = { state: r.state, to: r.to_city, toName: app.cities[r.to_city]?.cityName || r.to_city, fare: r.fare, departsAt: r.departs_at, arriveAt: r.arrive_at, flightMs: r.arrive_at - r.departs_at };
  if (ap) for (const c of Object.values(app.cities)) { if (c.id === here.id || !airportOf(c)) continue; out.destinations.push({ id: c.id, name: c.cityName || c.name, state: c.state || null, fare: fareFor(cfg, here, c), flightMs: flightMsFor(cfg, here, c), slots: departureSlots(now, cfg) }); }
  const st = getState(app, uid); out.cooldownUntil = (st.last_flight_at || 0) + cfg.cooldownMs; return out;
}
export function buy(app, uid, toCity, departAt, idemKey) {
  const cfg = F(app); if (!cfg.enabled) bad('OFF', 'Flights are switched off.', 409); tick(app, uid); const now = app.clock.now();
  const from = cityOf(app, uid), to = app.cities[toCity]; const ap = airportOf(from); if (!ap) bad('NO_AIRPORT', 'There is no airport here.', 404);
  if (!to || !airportOf(to) || to.id === from.id) bad('NO_ROUTE', 'No flight goes there.', 404);
  const p = ensurePresence(app, uid); if (!atGate(ap, p, cfg)) bad('NOT_AT_AIRPORT', 'Go to the airport terminal first.', 409, { x: ap.door.x, z: ap.door.z });
  if (p.mode === 'drive') bad('DRIVING', 'Park your car first.', 409); if (p.venue) bad('INSIDE', 'Step outside first.', 409);
  if (myMatch(app, uid, { onlyLive: true })) bad('IN_GAME', 'Finish your table game before you fly.', 409); if (row(app, uid)) bad('HAS_TICKET', 'You already have a flight.', 409);
  const st = getState(app, uid); if (now < (st.last_flight_at || 0) + cfg.cooldownMs) bad('COOLDOWN', 'Give it a few minutes before your next flight.', 429, { retryMs: (st.last_flight_at || 0) + cfg.cooldownMs - now });
  const slot = departureSlots(now, cfg).find(t => t === Number(departAt)); if (!slot) bad('BAD_SLOT', 'That departure is no longer available. Pick another.', 409);
  const fare = fareFor(cfg, from, to); if (balanceOf(app.db, cashId(uid)) < fare) bad('NO_FUNDS', `This ticket costs ₦${fare.toLocaleString('en-NG')}.`, 402, { fare });
  return app.db.transaction(() => {
    move(app, { from: cashId(uid), to: SYS.SINK_TRANSPORT, amount: fare, reason: 'flight_ticket', ref: `${from.id}>${to.id}`, userId: uid, idemKey: idemKey ? `flight:${uid}:${idemKey}` : undefined });
    app.db.prepare("INSERT INTO flights(user_id,from_city,to_city,state,fare,departs_at,arrive_at,created_at) VALUES (?,?,?,'ticketed',?,?,?,?)").run(uid, from.id, to.id, fare, slot, slot + flightMsFor(cfg, from, to), now);
    return { ok: true, text: `Ticket bought: ${to.cityName || to.name}. Be at the terminal when the plane leaves.`, flight: view(app, uid) };
  })();
}
export function cancel(app, uid) {
  const r = tick(app, uid); if (!r) bad('NO_TICKET', 'You have no ticket.', 404); if (r.state !== 'ticketed') bad('FLYING', 'Too late: the plane has left.', 409);
  const cfg = F(app); const refund = Math.floor(r.fare * cfg.cancelRefundPct / 100);
  return app.db.transaction(() => { if (refund > 0) move(app, { from: SYS.SINK_TRANSPORT, to: cashId(uid), amount: refund, reason: 'flight_refund', ref: `${r.from_city}>${r.to_city}`, userId: uid }); app.db.prepare('DELETE FROM flights WHERE user_id=?').run(uid); return { ok: true, refund, text: `Ticket cancelled. ₦${refund.toLocaleString('en-NG')} back.` }; })();
}
/** the ticket as the heartbeat sends it (no extra queries beyond one row read) */
export function mini(app, uid) { const r = row(app, uid); if (!r) return null; return { state: r.state, to: r.to_city, toName: app.cities[r.to_city]?.cityName || r.to_city, departsAt: r.departs_at, arriveAt: r.arrive_at, flightMs: r.arrive_at - r.departs_at, from: r.from_city }; }

// ---------------- planes other players can see (Track G item 7)
// A plane is one scheduled departure with at least one passenger aboard (rows of the `flights` table grouped by route and departure time). Nothing is stored for it. The client draws it from the same pure flight path
// the passenger sees (client/src/flightpath.js), so there is no plane position to sync: only "which planes exist and when did they leave". A ticket whose time has come is resolved first (boarded, or missed and removed),
// so a plane never shows for someone who missed it. Only people within `planes.viewRangeM` of the apron are told.
const resolveDue = (app, now) => {
  const P = F(app).planes || {}; const last = app._planesResolveAt || 0; if (now - last < (P.resolveEveryMs ?? 1000)) return; app._planesResolveAt = now;
  for (const r of app.db.prepare("SELECT user_id FROM flights WHERE state='ticketed' AND departs_at<=?").all(now)) tick(app, r.user_id);
};
/** planes in this city's sky for a viewer at (x, z): [{ id, kind: 'dep'|'arr', t0 (departure) or t1 (landing end), to/from (names) }] */
export function planesNear(app, cityId, x, z, now = app.clock.now()) {
  const cfg = F(app), P = cfg.planes; if (!cfg.enabled || !P?.enabled) return []; const city = app.cities[cityId]; const ap = airportOf(city); if (!ap) return [];
  if (Math.hypot(x - ap.apron.x, z - ap.apron.z) > P.viewRangeM) return []; resolveDue(app, now);
  const rows = app.db.prepare("SELECT from_city, to_city, departs_at, arrive_at, COUNT(*) n FROM flights WHERE state='flying' AND (from_city=? OR to_city=?) AND arrive_at>=? AND departs_at<=? GROUP BY from_city, to_city, departs_at, arrive_at ORDER BY departs_at").all(cityId, cityId, now - 1000, now + 1000);
  const out = []; for (const r of rows) {
    if (r.from_city === cityId && now - r.departs_at <= P.depVisibleS * 1000) out.push({ id: `d${r.departs_at}:${r.to_city}`, kind: 'dep', t0: r.departs_at, to: app.cities[r.to_city]?.cityName || r.to_city, n: r.n });
    if (r.to_city === cityId && r.arrive_at - now <= P.arrVisibleS * 1000) out.push({ id: `a${r.arrive_at}:${r.from_city}`, kind: 'arr', t1: r.arrive_at, from: app.cities[r.from_city]?.cityName || r.from_city, n: r.n });
  }
  return out.slice(0, P.maxShown);
}
