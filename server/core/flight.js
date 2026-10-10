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
export const fareFor = (cfg, fromCity, toCity) => (fromCity.state && toCity.state && fromCity.state === toCity.state ? cfg.fares.sameState : cfg.fares.otherState);
/** the next n scheduled departures (epoch ms) that are at least minLeadMs away */
export function departureSlots(now, cfg, n = cfg.slotsShown) { const first = Math.ceil((now + cfg.minLeadMs) / cfg.departEveryMs) * cfg.departEveryMs; return Array.from({ length: n }, (_, i) => first + i * cfg.departEveryMs); }
export const airportOf = (city) => city.airport || null;
const row = (app, uid) => app.db.prepare('SELECT * FROM flights WHERE user_id=?').get(uid);
const atGate = (ap, p, cfg) => Math.hypot(p.x - ap.door.x, p.z - ap.door.z) <= cfg.gateRadiusM;
export const isFlying = (app, uid) => row(app, uid)?.state === 'flying';
export const assertNotFlying = (app, uid) => { if (isFlying(app, uid)) bad('FLYING', 'You are in the air. Enjoy the view.', 409); };

/** advance this player's ticket/flight to now (lazy; called from the heartbeat and from every flight endpoint) */
export function tick(app, uid) {
  const r = row(app, uid); if (!r) return null; const now = app.clock.now(); const from = app.cities[r.from_city], to = app.cities[r.to_city];
  if (r.state === 'ticketed' && now >= r.departs_at) {
    const p = ensurePresence(app, uid); const ap = airportOf(from);
    if (ap && p.city === r.from_city && atGate(ap, p, F(app)) && !p.venue && p.mode !== 'drive') { app.db.prepare("UPDATE flights SET state='flying', arrive_at=? WHERE user_id=?").run(r.departs_at + F(app).flightMs, uid); r.state = 'flying'; r.arrive_at = r.departs_at + F(app).flightMs; p.venue = null; p.mode = 'walk'; }
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
  if (r) out.ticket = { state: r.state, to: r.to_city, toName: app.cities[r.to_city]?.cityName || r.to_city, fare: r.fare, departsAt: r.departs_at, arriveAt: r.arrive_at, flightMs: cfg.flightMs };
  if (ap) for (const c of Object.values(app.cities)) { if (c.id === here.id || !airportOf(c)) continue; out.destinations.push({ id: c.id, name: c.cityName || c.name, state: c.state || null, fare: fareFor(cfg, here, c), flightMs: cfg.flightMs, slots: departureSlots(now, cfg) }); }
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
    app.db.prepare("INSERT INTO flights(user_id,from_city,to_city,state,fare,departs_at,arrive_at,created_at) VALUES (?,?,?,'ticketed',?,?,?,?)").run(uid, from.id, to.id, fare, slot, slot + cfg.flightMs, now);
    return { ok: true, text: `Ticket bought: ${to.cityName || to.name}. Be at the terminal when the plane leaves.`, flight: view(app, uid) };
  })();
}
export function cancel(app, uid) {
  const r = tick(app, uid); if (!r) bad('NO_TICKET', 'You have no ticket.', 404); if (r.state !== 'ticketed') bad('FLYING', 'Too late: the plane has left.', 409);
  const cfg = F(app); const refund = Math.floor(r.fare * cfg.cancelRefundPct / 100);
  return app.db.transaction(() => { if (refund > 0) move(app, { from: SYS.SINK_TRANSPORT, to: cashId(uid), amount: refund, reason: 'flight_refund', ref: `${r.from_city}>${r.to_city}`, userId: uid }); app.db.prepare('DELETE FROM flights WHERE user_id=?').run(uid); return { ok: true, refund, text: `Ticket cancelled. ₦${refund.toLocaleString('en-NG')} back.` }; })();
}
/** the ticket as the heartbeat sends it (no extra queries beyond one row read) */
export function mini(app, uid) { const r = row(app, uid); if (!r) return null; return { state: r.state, to: r.to_city, toName: app.cities[r.to_city]?.cityName || r.to_city, departsAt: r.departs_at, arriveAt: r.arrive_at, flightMs: F(app).flightMs, from: r.from_city }; }
