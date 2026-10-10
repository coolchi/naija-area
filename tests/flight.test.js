// Airport and flights: timetable, ticket rules, ledger, missed flight, arrival in the other city, cooldown, cancel, guards.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
process.env.NA_BCRYPT_COST = '4';
import { buildServer } from '../server/createServer.js'; import { dispatch } from '../server/core/routes.js'; import * as auth from '../server/core/auth.js'; import { teleport, heartbeat } from '../server/core/world.js';
import { cityIdOf } from '../server/core/cities.js'; import { departureSlots, fareFor } from '../server/core/flight.js'; import { BALANCE } from '../server/config/balance.js'; import { balanceOf, cashId, checkInvariants } from '../server/core/ledger.js';
const lagos = JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-mainland.json', import.meta.url))), prev = JSON.parse(fs.readFileSync(new URL('../server/config/cities/preview-town.json', import.meta.url)));
const mk = () => { const balance = structuredClone(BALANCE); balance.shops.enforceHours = false; return buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'x', dev: true, balance, cityJson: lagos, extraCities: [prev] }); };
let n = 0; const user = (s, cash = 50000) => auth.newPlayer(s.app, { username: `fl${++n}_${Math.floor(Math.random() * 1e5)}`, isGuest: false, isBot: false, ageConfirmed: true, cash });
const call = (s, m, p, o = {}) => dispatch(s.app, { method: m, path: p, query: {}, body: o.body, headers: {}, ip: '10.0.0.1', uid: o.uid });
const AP = lagos.airport; const hb = (s, u) => heartbeat(s.app, u, { trail: [], mode: 'walk', city: undefined });
const ready = (s) => { s.app.clock.advance(5 * 60000); const u = user(s); hb(s, u); teleport(s.app, u, AP.door.x, AP.door.z + 5); return u; };
const buy = async (s, u, to = 'preview-town', k = 0) => { const v = await call(s, 'GET', '/api/flights', { uid: u }); return call(s, 'POST', '/api/flights/buy', { uid: u, body: { to, departAt: v.json.destinations.find(d => d.id === to).slots[k], idem: 'i' + Math.random() } }); };

test('timetable: slots are in the future, regular, and respect the lead time; fares depend on state', () => {
  const cfg = BALANCE.flight; const now = 1_000_000_123; const sl = departureSlots(now, cfg); assert.equal(sl.length, cfg.slotsShown); assert.ok(sl[0] >= now + cfg.minLeadMs); assert.ok(sl[0] - now < cfg.minLeadMs + cfg.departEveryMs); assert.equal(sl[1] - sl[0], cfg.departEveryMs); assert.equal(sl[0] % cfg.departEveryMs, 0);
  assert.equal(fareFor(cfg, { state: 'Lagos' }, { state: 'Lagos' }), cfg.fares.sameState); assert.equal(fareFor(cfg, { state: 'Lagos' }, { state: 'Kano' }), cfg.fares.otherState); assert.equal(fareFor(cfg, {}, {}), cfg.fares.otherState, 'unknown state is the dearer fare');
});
test('the Lagos airport and the preview city are valid and have flight data', () => { assert.ok(AP && AP.runway && AP.apron && AP.arrive); assert.ok(prev.airport && prev.state && prev.state !== lagos.state); });
test('departure board lists only other cities with an airport, with fare and slots, and says whether you are at the gate', async () => {
  const s = mk(); const u = ready(s); const v = (await call(s, 'GET', '/api/flights', { uid: u })).json; assert.equal(v.airport.id, 'ap_lagos'); assert.ok(v.airport.here); assert.deepEqual(v.destinations.map(d => d.id), ['preview-town']); assert.equal(v.destinations[0].fare, BALANCE.flight.fares.otherState); assert.equal(v.destinations[0].slots.length, 3); assert.equal(v.ticket, null);
  teleport(s.app, u, 0, 0); assert.equal((await call(s, 'GET', '/api/flights', { uid: u })).json.airport.here, false);
});
test('buying: charged through the ledger, one ticket at a time, needs the gate, cash, a valid slot, a real route; not while driving or inside', async () => {
  const s = mk(); const u = ready(s); const c0 = balanceOf(s.app.db, cashId(u)); const r = await buy(s, u); assert.equal(r.status, 200, JSON.stringify(r.json)); assert.equal(balanceOf(s.app.db, cashId(u)), c0 - BALANCE.flight.fares.otherState); assert.equal(r.json.flight.ticket.state, 'ticketed');
  assert.equal((await buy(s, u)).json.error, 'HAS_TICKET'); assert.ok(checkInvariants(s.app.db));
  const t = mk(); const a = ready(t); teleport(t.app, a, 0, 0); assert.equal((await buy(t, a)).json.error, 'NOT_AT_AIRPORT');
  const p = mk(); const b = user(p, 100); p.app.clock.advance(5 * 60000); hb(p, b); teleport(p.app, b, AP.door.x, AP.door.z); assert.equal((await buy(p, b)).json.error, 'NO_FUNDS');
  const q = mk(); const d = ready(q); assert.equal((await call(q, 'POST', '/api/flights/buy', { uid: d, body: { to: 'preview-town', departAt: 12345 } })).json.error, 'BAD_SLOT'); assert.equal((await call(q, 'POST', '/api/flights/buy', { uid: d, body: { to: 'lagos-mainland', departAt: 1 } })).json.error, 'NO_ROUTE'); assert.equal((await call(q, 'POST', '/api/flights/buy', { uid: d, body: { to: 'nowhere', departAt: 1 } })).json.error, 'NO_ROUTE');
  const w = mk(); const e = ready(w); w.app.world.players.get(e).mode = 'drive'; assert.equal((await buy(w, e)).json.error, 'DRIVING');
});
test('the plane leaves at the departure time with you at the gate, then you land in the other city at its airport after the flight time', async () => {
  const s = mk(); const u = ready(s); const r = await buy(s, u); const dep = r.json.flight.ticket.departsAt; s.app.clock.advance(dep - s.app.clock.now() + 200); const h1 = hb(s, u); assert.equal(h1.flight.state, 'flying'); assert.equal(h1.city, 'lagos-mainland');
  assert.equal((await call(s, 'POST', '/api/flights/cancel', { uid: u })).json.error, 'FLYING'); assert.equal((await call(s, 'POST', '/api/travel', { uid: u, body: { placeId: 'plaza', mode: 'walk' } })).json.error, 'FLYING', 'no travel while in the air');
  s.app.clock.advance(BALANCE.flight.flightMs + 100); const h2 = hb(s, u); assert.equal(h2.flight, null); assert.equal(h2.city, 'preview-town'); assert.equal(cityIdOf(s.app, u), 'preview-town'); const me = s.app.world.players.get(u); assert.deepEqual([me.x, me.z], [prev.airport.arrive.x, prev.airport.arrive.z]);
  assert.ok(s.app.db.prepare("SELECT 1 FROM notifications WHERE user_id=? AND kind='flight'").get(u)); assert.equal((await buy(s, u, 'lagos-mainland')).json.error, 'COOLDOWN'); s.app.clock.advance(BALANCE.flight.cooldownMs + 10); assert.equal((await buy(s, u, 'lagos-mainland')).status, 200, 'return flight works');
});
test('a disconnect does not strand you: the next heartbeat after landing time completes the flight', async () => {
  const s = mk(); const u = ready(s); const r = await buy(s, u); s.app.clock.advance(r.json.flight.ticket.departsAt - s.app.clock.now() + 100); hb(s, u); s.app.world.players.delete(u); s.app.clock.advance(BALANCE.flight.flightMs + 5000); hb(s, u); assert.equal(cityIdOf(s.app, u), 'preview-town');
});
test('missing the plane (not at the gate when it leaves) forfeits the ticket; stepping away is the same', async () => {
  const s = mk(); const u = ready(s); const c0 = balanceOf(s.app.db, cashId(u)); const r = await buy(s, u); teleport(s.app, u, 0, 0); s.app.clock.advance(r.json.flight.ticket.departsAt - s.app.clock.now() + 100); const h = hb(s, u); assert.equal(h.flight, null); assert.equal(cityIdOf(s.app, u), 'lagos-mainland'); assert.equal(balanceOf(s.app.db, cashId(u)), c0 - BALANCE.flight.fares.otherState);
  assert.ok(s.app.db.prepare("SELECT text FROM notifications WHERE user_id=? AND kind='flight'").get(u).text.includes('missed'));
});
test('cancel before departure refunds most of the fare; ledger stays balanced', async () => {
  const s = mk(); const u = ready(s); const c0 = balanceOf(s.app.db, cashId(u)); await buy(s, u); const x = (await call(s, 'POST', '/api/flights/cancel', { uid: u })).json; assert.equal(x.refund, Math.floor(BALANCE.flight.fares.otherState * 0.8)); assert.equal(balanceOf(s.app.db, cashId(u)), c0 - (BALANCE.flight.fares.otherState - x.refund)); assert.equal((await call(s, 'POST', '/api/flights/cancel', { uid: u })).json.error, 'NO_TICKET'); assert.ok(checkInvariants(s.app.db));
});
test('a heartbeat while flying ignores movement and ad evidence', async () => {
  const s = mk(); const u = ready(s); const r = await buy(s, u); s.app.clock.advance(r.json.flight.ticket.departsAt - s.app.clock.now() + 100); hb(s, u); const p = s.app.world.players.get(u); const x0 = p.x; heartbeat(s.app, u, { trail: [{ a: 0, x: x0 + 3, z: p.z, ry: 0 }], mode: 'walk' }); assert.equal(p.x, x0);
});
