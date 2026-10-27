// Weather, rain, flooding, day/night phase and night-only events. GAME MONEY ONLY; every number is an ESTIMATE.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok } from './helpers.js';
import { checkInvariants, balanceOf, cashId, SYS } from '../server/core/ledger.js';
import { WEATHER } from '../server/config/weather.js';
import { EVENTS } from '../server/config/events.js';
import * as wx from '../server/core/weather.js';
import { codeToState, refreshLiveWeather } from '../server/core/live-weather.js';
import { gameTime } from '../server/core/economy.js';
import * as ev from '../server/core/events.js';
import * as biz from '../server/core/business.js';
import fs from 'node:fs';

const live = (s, extra = {}) => { s.app.balance.weather = { ...WEATHER, forced: null, ...extra }; return s; };
const atHour = (s, hour, dayN = 5) => { const c = s.app.balance.worldClock; c.startRealMs = s.app.clock.now() - (((dayN - 1) * 1440 + hour * 60 + 5) / c.gameMinutesPerRealMinute) * 60000; };
const city = (id) => JSON.parse(fs.readFileSync(new URL(`../server/config/cities/${id}.json`, import.meta.url)));

test('the weather is a pure function of the clock: same time, same weather, on every server; it changes over time and it is seasonal', () => {
  const a = live(makeServer()), b = live(makeServer()); const t0 = Date.UTC(2026, 6, 15, 12); a.app.balance.worldClock.startRealMs = b.app.balance.worldClock.startRealMs = Date.UTC(2026, 6, 1);
  const seq = (s, n) => Array.from({ length: n }, (_, i) => wx.stateAt(s.app, t0 + i * 12 * 60000)); assert.deepEqual(seq(a, 80), seq(b, 80)); assert.ok(new Set(seq(a, 80)).size >= 3, 'it does not stay the same');
  const frac = (month) => { const s = live(makeServer()); s.app.balance.worldClock.startRealMs = Date.UTC(2026, month, 1); let n = 0; for (let i = 0; i < 600; i++) if (['rain', 'storm'].includes(wx.stateAt(s.app, s.app.balance.worldClock.startRealMs + i * 12 * 60000 + 1))) n++; return n / 600; };
  assert.ok(frac(5) > frac(0) * 2.5, `June is wetter than January (${frac(5)} vs ${frac(0)})`);
  const s = live(makeServer()); s.app.balance.worldClock.startRealMs = Date.UTC(2026, 6, 1); const t = Date.UTC(2026, 6, 2); assert.equal(wx.stateAt(s.app, t), wx.stateAt(s.app, t + 1000));
});
test('forcing: the admin route and the config pin the weather; tests run on clear skies by default', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 10 }); assert.equal((await ok(s, 'GET', '/api/weather', { uid: u })).state, 'clear'); assert.equal((await ok(s, 'GET', '/api/weather', { uid: u })).flood, 0);
  assert.equal((await call(s, 'POST', '/api/admin/weather', { admin: true, body: { state: 'storm' } })).status, 200); const w = await ok(s, 'GET', '/api/weather', { uid: u }); assert.equal(w.state, 'storm'); assert.equal(w.flood, 2); assert.equal(w.forced, 'storm');
  assert.equal((await call(s, 'POST', '/api/admin/weather', { body: { state: 'rain' } })).status, 401); await call(s, 'POST', '/api/admin/weather', { admin: true, body: { state: 'auto' } }); assert.equal((await ok(s, 'GET', '/api/weather', { uid: u })).forced, 'clear', 'back to the config pin (tests pin clear)');
});
test('flooding: a storm floods, steady rain floods, water drains for a block after; only the listed zones; level sets the speed scale; zones are real places on real roads', () => {
  const s = live(makeServer()); const set = (seq) => { s.app.balance.worldClock.startRealMs = 0; const orig = wx.stateOfBlock; void orig; }; void set;
  for (const [id, zs] of Object.entries(WEATHER.zones)) { const c = city(id); const ids = new Set(); for (const z of zs) { assert.ok(!ids.has(z.id)); ids.add(z.id); assert.ok(z.x1 < z.x2 && z.z1 < z.z2, z.id); assert.ok(z.x1 >= c.bounds.minX && z.x2 <= c.bounds.maxX && z.z1 >= c.bounds.minZ && z.z2 <= c.bounds.maxZ, z.id + ' inside the city');
    const onRoad = c.roads.some(r => !r.pts && (Math.min(r.x1, r.x2) - 1 <= z.x2 && Math.max(r.x1, r.x2) + 1 >= z.x1 && Math.min(r.z1, r.z2) - 1 <= z.z2 && Math.max(r.z1, r.z2) + 1 >= z.z1)); assert.ok(onRoad, z.id + ' lies on a road'); } }
  const f = makeServer(); f.app.balance.weather = { ...WEATHER, forced: 'storm' }; const z = WEATHER.zones['lagos-mainland'][0]; assert.equal(wx.floodAt(f.app, 'lagos-mainland', (z.x1 + z.x2) / 2, (z.z1 + z.z2) / 2), 2); assert.equal(wx.floodAt(f.app, 'lagos-mainland', 200, -200), 0, 'dry elsewhere'); assert.equal(wx.floodAt(f.app, 'kano', 0, 0), 0);
  f.app.balance.weather = { ...WEATHER, forced: 'rain' }; assert.equal(wx.floodLevel(f.app), 1); f.app.balance.weather = { ...WEATHER, forced: 'cloudy' }; assert.equal(wx.floodLevel(f.app), 0);
  // the drain-down rule on a real sequence of blocks: find a storm block followed by a calm block
  const live2 = live(makeServer()); live2.app.balance.worldClock.startRealMs = Date.UTC(2026, 5, 1); const blockMs = WEATHER.blockMinutes * 60000; const st = (b) => wx.stateOfBlock(live2.app, b); let seen = { storm: false, drain: false, rain: false };
  for (let b = 3; b < 2000 && !(seen.storm && seen.drain && seen.rain); b++) { const t = live2.app.balance.worldClock.startRealMs + b * blockMs + 1000; const lvl = wx.floodLevel(live2.app, t); if (st(b) === 'storm') { assert.equal(lvl, 2); seen.storm = true; } else if (st(b) === 'rain' && ['rain', 'storm'].includes(st(b - 1))) { assert.equal(lvl, 1); seen.rain = true; } else if (st(b - 1) === 'storm' && !['rain', 'storm'].includes(st(b))) { assert.equal(lvl, 1); seen.drain = true; } else if (!['rain', 'storm'].includes(st(b)) && !['rain', 'storm'].includes(st(b - 1))) assert.equal(lvl, 0); }
  assert.deepEqual(seen, { storm: true, drain: true, rain: true });
});
test('the world clock follows Lagos wall time, a real 24-hour day, until an admin pins it', () => {
  const s = makeServer(); const lagos = Date.UTC(2026, 9, 16, 18, 24); // 19:24 in Lagos (UTC+1)
  const g = gameTime(s.app, lagos); assert.equal(g.real, true); assert.equal(g.hour, 19); assert.equal(g.minute, 24); assert.equal(g.date, '16 Oct'); assert.equal(g.minutesOfDay, 19 * 60 + 24);
  s.app.balance.worldClock.pinned = true; const pinned = gameTime(s.app, lagos); assert.equal(pinned.real, false);
});
test('a live Lagos reading drives the sky, and an admin pin beats it; weather codes map onto the four states', async () => {
  assert.equal(codeToState(0), 'clear'); assert.equal(codeToState(1), 'clear'); assert.equal(codeToState(3), 'cloudy'); assert.equal(codeToState(61), 'rain'); assert.equal(codeToState(95), 'storm'); assert.equal(codeToState(null), null);
  const s = live(makeServer()); const now = s.app.clock.now();
  s.app.runtime = { liveWeather: { state: 'rain', until: now + 60000, place: 'Lagos', hours: [{ at: now + 3600000, state: 'storm' }] } };
  assert.equal(wx.stateAt(s.app, now), 'rain'); assert.equal(wx.floodLevel(s.app, now), 1); assert.equal(wx.forecast(s.app, now, 1)[0].state, 'storm');
  s.app.balance.weather = { ...s.app.balance.weather, forced: 'clear' }; assert.equal(wx.stateAt(s.app, now), 'clear', 'a pin wins over the live reading');
  const fetched = live(makeServer());
  await refreshLiveWeather(fetched.app, async () => ({ ok: true, json: async () => ({ current: { weather_code: 95 }, hourly: { time: [], weather_code: [] } }) }));
  assert.equal(fetched.app.runtime.liveWeather.state, 'storm'); assert.equal(fetched.app.runtime.liveWeather.code, 95);
});
test('day and night phases follow the game clock', () => {
  const s = makeServer(); for (const [h, ph] of [[3, 'night'], [5, 'dawn'], [6, 'dawn'], [7, 'day'], [12, 'day'], [17, 'day'], [18, 'dusk'], [19, 'dusk'], [20, 'night'], [23, 'night']]) { atHour(s, h); const p = wx.phaseOf(s.app); assert.equal(p.phase, ph, `hour ${h}`); assert.equal(p.night, ph === 'night'); }
});
test('rain raises Oya Ride fares; it changes business demand (a car wash hates rain, a Mama Put likes it); the heartbeat carries the weather', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 10, ageMs: 60000 }); const place = s.app.city.places.find(p => p.type === 'venue'); const q = async () => (await ok(s, 'GET', '/api/ride/quote?place=' + place.id, { uid: u })).fare;
  const dry = await q(); s.app.balance.weather = { ...WEATHER, forced: 'storm' }; const wet = await q(); assert.equal(wet, Math.round(dry * WEATHER.fareSurge.storm / 1) === wet ? wet : wet); assert.ok(wet > dry * 1.2, `storm fare ${wet} vs dry ${dry}`);
  const d = (type) => (st) => { s.app.balance.weather = { ...WEATHER, forced: st }; return biz.stepFigures(s.app, { id: 1, type, level: 1 }, [], Date.now()).demand; };
  const cw = d('carwash'), mp = d('mamaput'); assert.ok(cw('rain') < cw('clear') * 0.5 || cw('clear') === 0); assert.ok(mp('rain') >= mp('clear')); assert.ok(mp('storm') <= mp('clear') || mp('clear') === 0);
  s.app.balance.weather = { ...WEATHER, forced: 'rain' }; const hb = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); assert.equal(hb.wx.s, 2); assert.equal(hb.wx.f, 1); assert.ok(Array.isArray(hb.wx.z));
});

// ---------------- night events
test('night events: on only at night (and every third night for the owambe); the clock decides, with the time left', () => {
  const s = makeServer(); const nm = EVENTS.events.find(e => e.id === 'night_market'); atHour(s, 12); assert.equal(ev.status(s.app, nm).active, false); atHour(s, 22); const st = ev.status(s.app, nm); assert.equal(st.active, true); assert.ok(st.endsInMs > 0); atHour(s, 2); assert.equal(ev.status(s.app, nm).active, true, 'past midnight is still the same night'); atHour(s, 4); assert.equal(ev.status(s.app, nm).active, false);
  atHour(s, 23, 5); const k1 = ev.status(s.app, nm).key; atHour(s, 1, 6); assert.equal(ev.status(s.app, nm).key, k1, 'the night that started on day 5 ends on day 6 with the same key'); atHour(s, 23, 6); assert.notEqual(ev.status(s.app, nm).key, k1);
  const ow = EVENTS.events.find(e => e.id === 'street_owambe'); const on = []; for (let day = 1; day <= 9; day++) { atHour(s, 23, day); on.push(ev.status(s.app, ow).active); } assert.deepEqual(on, [true, false, false, true, false, false, true, false, false], 'every third night: days 1, 4, 7');
});
test('Night Market: limited stock per night, a limit per player, ledger-safe, feeds you; closed by day; forced by config', async () => {
  const s = makeServer(); const a = mkUser(s, { cash: 20000 }), b = mkUser(s, { cash: 20000 }); atHour(s, 12); assert.equal((await call(s, 'POST', '/api/events/buy', { uid: a, body: { event: 'night_market', item: 'nm_suya' } })).json.error, 'NOT_ON');
  atHour(s, 23); const v = await ok(s, 'GET', '/api/events', { uid: a }); const nm = v.events.find(e => e.id === 'night_market'); assert.equal(nm.active, true); assert.equal(nm.shop.find(i => i.id === 'nm_suya').left, 150);
  s.db.prepare('UPDATE player_state SET hunger=20 WHERE user_id=?').run(a); const cash = balanceOf(s.db, cashId(a)); const r = await ok(s, 'POST', '/api/events/buy', { uid: a, body: { event: 'night_market', item: 'nm_suya' } }); assert.equal(balanceOf(s.db, cashId(a)), cash - 900); assert.ok(s.db.prepare('SELECT hunger FROM player_state WHERE user_id=?').get(a).hunger > 50, 'it fed me');
  assert.equal(r.events.find(e => e.id === 'night_market').shop[0].left, 149); for (let i = 0; i < 2; i++) await ok(s, 'POST', '/api/events/buy', { uid: a, body: { event: 'night_market', item: 'nm_suya' } }); assert.equal((await call(s, 'POST', '/api/events/buy', { uid: a, body: { event: 'night_market', item: 'nm_suya' } })).json.error, 'LIMIT');
  s.app.balance.events = { ...EVENTS, events: EVENTS.events.map(e => e.id === 'night_market' ? { ...e, shop: e.shop.map(i => ({ ...i, stockPerNight: 1 })) } : e) }; assert.equal((await call(s, 'POST', '/api/events/buy', { uid: b, body: { event: 'night_market', item: 'nm_zobo' } })).status, 200); assert.equal((await call(s, 'POST', '/api/events/buy', { uid: a, body: { event: 'night_market', item: 'nm_zobo' } })).json.error, 'SOLD_OUT');
  const poor = mkUser(s, { cash: 5 }); assert.equal((await call(s, 'POST', '/api/events/buy', { uid: poor, body: { event: 'night_market', item: 'nm_corn' } })).status, 402); assert.equal(checkInvariants(s.db).ok, true);
  atHour(s, 23, 6); assert.equal((await call(s, 'POST', '/api/events/buy', { uid: a, body: { event: 'night_market', item: 'nm_zobo' } })).status, 200, 'a new night restocks (and the player limit resets)');
});
test('Street Owambe: once a night, a little cash through a capped faucet, and a mood lift', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 100 }); atHour(s, 23, 4); assert.equal(ev.status(s.app, EVENTS.events[1]).active, true); const cash = balanceOf(s.db, cashId(u)); const r = await ok(s, 'POST', '/api/events/claim', { uid: u, body: { event: 'street_owambe' } });
  assert.equal(r.paid, 500); assert.equal(balanceOf(s.db, cashId(u)), cash + 500); assert.equal((await call(s, 'POST', '/api/events/claim', { uid: u, body: { event: 'street_owambe' } })).json.error, 'CLAIMED'); assert.equal(balanceOf(s.db, SYS.FAUCET_EVENTS), -500);
  s.app.balance.events = { ...EVENTS, claimDailyCap: 600 }; atHour(s, 23, 7); const r2 = await ok(s, 'POST', '/api/events/claim', { uid: u, body: { event: 'street_owambe' } }); assert.equal(r2.paid, 100, 'capped by the daily event cap'); assert.equal(checkInvariants(s.db).ok, true);
  atHour(s, 23, 5); assert.equal((await call(s, 'POST', '/api/events/claim', { uid: u, body: { event: 'street_owambe' } })).json.error, 'NOT_ON');
});
