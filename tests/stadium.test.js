// Stadium (10 Oct 2026): the visitable venue, tickets through the ledger, and the live-scores TEST (mock provider, cached, daily cap, fallbacks).
import test from 'node:test'; import assert from 'node:assert/strict';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
import { makeServer, mkUser, ok, call, at, HOUR, DAY } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { enterCity } from '../server/core/cities.js';
import { tickScores, scoresView, normalize, fictionalLeague, mockResponse, mockProvider, apiFootballProvider, nextDelay, dayKey } from '../server/core/scores.js';
import { buildServer } from '../server/createServer.js';
import { BALANCE } from '../server/config/balance.js';

const counting = (impl = mockProvider) => { const p = { name: impl.name, needsKey: false, calls: 0, async fetchFixtures(a) { p.calls++; return impl.fetchFixtures(a); } }; return p; };
const failing = (code = 'api_error') => { const p = { name: 'api-football', needsKey: false, calls: 0, async fetchFixtures() { p.calls++; throw Object.assign(new Error('boom'), { code }); } }; return p; };
const adult = (s, cash = 20000) => mkUser(s, { cash, ageMs: 10 * 60000 });
const hb = (s, u) => ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
async function inStadium(s, cash, ageMs = 10 * 60000) { const u = mkUser(s, { cash, ageMs }); enterCity(s.app, u, 'lagos-lekki'); const v = s.app.cities['lagos-lekki'].venueById.lk_venue_stadium; at(s, u, v.x, v.z); await hb(s, u); const view = await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: v.id } }); return { u, v, view }; }

test('the stadium is a real building and venue in Lekki, with ticket, snacks, seat, score board and a brand board spot', () => {
  const s = makeServer(); const c = s.app.cities['lagos-lekki']; const v = c.venueById.lk_venue_stadium; assert.ok(v); assert.equal(v.kind, 'stadium');
  const b = c.buildingById[v.buildingId]; assert.equal(b.kind, 'stadium'); assert.ok(b.w >= 70 && b.d >= 56, 'big enough to read as a stadium');
  assert.deepEqual([...new Set(v.stations.map(x => x.type))].sort(), ['eat', 'poster', 'scores', 'seat', 'ticket']); assert.ok(v.shopId && s.app.all.shopById[v.shopId]);
  assert.ok(c.carParks.some(p => p.venueId === v.id), 'a car park serves the stadium'); assert.ok(!c.buildings.some(o => o.id !== b.id && Math.abs(o.x - b.x) < (o.w + b.w) / 2 && Math.abs(o.z - b.z) < (o.d + b.d) / 2), 'nothing overlaps the stadium');
  assert.ok(!JSON.stringify(c).match(/Lagos Lions|Arsenal|Barcelona|Super Eagles/i), 'no real clubs');
});
test('ticket: paid through the ledger, once a day, and you must be inside', async () => {
  const s = makeServer(); const { u, v } = await inStadium(s); const before = balanceOf(s.db, cashId(u));
  const st = await call(s, 'POST', '/api/stadium/ticket', { uid: adult(s), body: {} }); assert.equal(st.status, 409, 'outside the stadium');
  const r = await ok(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: v.id, stationId: 'ticket', idem: 'a' } }); assert.equal(r.charged, s.app.balance.stadium.ticketFee); assert.equal(balanceOf(s.db, cashId(u)), before - r.charged);
  const again = await call(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: v.id, stationId: 'ticket', idem: 'b' } }); assert.equal(again.status, 409); assert.equal(again.json.error, 'HAVE_TICKET'); checkInvariants(s.db);
});
test('ticket needs the cash; seat needs a ticket and has a cooldown; the next UTC day needs a new ticket', async () => {
  const s = makeServer(); const poor = await inStadium(s, 100); const r = await call(s, 'POST', '/api/venue/act', { uid: poor.u, body: { venueId: poor.v.id, stationId: 'ticket' } }); assert.equal(r.status, 402);
  const { u, v } = await inStadium(s); const noTicket = await call(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: v.id, stationId: 'seat' } }); assert.equal(noTicket.json.error, 'NO_TICKET');
  await ok(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: v.id, stationId: 'ticket' } }); const seat = await ok(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: v.id, stationId: 'seat' } }); assert.ok(seat.mood !== undefined && seat.text);
  const cd = await call(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: v.id, stationId: 'seat' } }); assert.equal(cd.status, 429);
  s.app.clock.advance(DAY + HOUR); await hb(s, u); const old = await call(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: v.id, stationId: 'seat' } }); assert.equal(old.json.error, 'NO_TICKET', 'yesterday’s ticket is spent');
});

// ---- live scores test ---------------------------------------------------------------------------------------------------------------------
test('normalize: the API-Football shape becomes a small, safe list (live first), and plan errors are named', () => {
  const list = normalize(mockResponse(Date.now())); assert.equal(list.length, 4); assert.equal(list[0].state, 'live'); assert.ok(Number.isFinite(list[0].minute) && list[0].minute >= 1 && list[0].minute <= 90);
  assert.deepEqual(list.map(f => f.state), ['live', 'upcoming', 'upcoming', 'finished']); for (const f of list) { assert.ok(f.home && f.away && f.league && f.id); if (f.state === 'upcoming') assert.equal(f.homeGoals, null); }
  assert.throws(() => normalize({ errors: { plan: 'Free plans do not have access to this season, try from 2021 to 2023.' }, response: [] }), (e) => e.code === 'plan_blocked');
  assert.throws(() => normalize({ errors: { token: 'Error/Missing application key.' }, response: [] }), (e) => e.code === 'key_or_quota');
  assert.throws(() => normalize({ response: 'nope' }), (e) => e.code === 'api_error');
  const evil = normalize({ errors: [], response: [{ fixture: { id: 1, timestamp: 1, status: { short: '1H', elapsed: 12 } }, league: { name: '<img src=x onerror=1>' + 'L'.repeat(80), country: 'X' }, teams: { home: { name: 'A\u0000<b>' }, away: { name: 'B' } }, goals: { home: 3, away: 0 } }] }); assert.ok(!/[<>\u0000]/.test(JSON.stringify(evil)) && evil[0].league.length <= 40);
});
test('one job calls the provider; any number of viewers read the saved copy and never cause a call', async () => {
  const s = makeServer(); const p = s.app.scoresProvider = counting(); const r = await tickScores(s.app, { env: {} }); assert.equal(r.ok, true); assert.equal(p.calls, 1);
  const users = []; for (let i = 0; i < 40; i++) { const x = await inStadium(s, 5000, 0); users.push(x); } for (const x of users) { const v = await ok(s, 'GET', '/api/stadium/scores', { uid: x.u }); assert.equal(v.source, 'mock'); assert.equal(v.fixtures.length, 4); }
  assert.equal(p.calls, 1, '40 viewers, still one call'); await tickScores(s.app, { env: {} }); assert.equal(p.calls, 1, 'not due yet: no second call');
  const v = scoresView(s.app); assert.equal(v.apiCallsToday, 1); assert.equal(v.testOnly, true); assert.ok(v.updatedAt);
});
test('a viewer who has never had a job run still gets the fictional league, and the scores route needs you to be inside', async () => {
  const s = makeServer(); const p = s.app.scoresProvider = counting(); const { u } = await inStadium(s); const v = await ok(s, 'GET', '/api/stadium/scores', { uid: u }); assert.equal(v.source, 'fictional'); assert.equal(v.fallbackReason, 'no_data_yet'); assert.equal(p.calls, 0);
  const out = adult(s); const r = await call(s, 'GET', '/api/stadium/scores', { uid: out }); assert.equal(r.status, 409);
});
test('daily cap: over a whole day the job never goes past dailyCap minus the reserve, spreads the calls, and a new UTC day starts fresh', async () => {
  const s = makeServer(); const p = s.app.scoresProvider = counting(); const C = s.app.balance.stadium.scores; assert.equal(C.dailyCap, 100);
  const start = Math.ceil(s.app.clock.now() / DAY) * DAY + 1000; s.app.clock.advance(start - s.app.clock.now()); const day1 = dayKey(s.app.clock.now());
  for (let t = 0; t < DAY - 60000; t += 30000) { await tickScores(s.app, { env: {} }); s.app.clock.advance(30000); } assert.equal(dayKey(s.app.clock.now()), day1);
  assert.ok(p.calls <= C.dailyCap - C.reserve, `calls ${p.calls}`); assert.ok(p.calls >= 20, `uses the day, not just the start: ${p.calls}`); const used = p.calls;
  s.app.clock.advance(200000); await tickScores(s.app, { env: {} }); assert.equal(dayKey(s.app.clock.now()) !== day1, true); assert.equal(scoresView(s.app).apiCallsToday <= 1, true, 'counter reset for the new day'); assert.ok(p.calls >= used);
});
test('daily cap is a hard stop: with a tiny cap and no waiting, calls stop exactly at the cap and the board falls back', async () => {
  const s = makeServer(); const p = s.app.scoresProvider = counting(); const C = s.app.balance.stadium.scores; C.dailyCap = 4; C.reserve = 1; C.refreshMs = 1; C.idleRefreshMs = 1;
  for (let i = 0; i < 60; i++) { s.db.prepare('UPDATE scores_cache SET next_at=0 WHERE id=1').run(); const r = await tickScores(s.app, { env: {} }); if (i >= 3) assert.equal(r.skipped, 'cap_reached'); s.app.clock.advance(1000); } assert.equal(p.calls, 3, 'cap 4 minus reserve 1');
  assert.equal(nextDelay(s.app, s.app.clock.now(), { calls: 2 }, []) > HOUR, true, 'one call left: stretched over the rest of the day');
  C.staleMs = 10; s.app.clock.advance(60000); const v = scoresView(s.app); assert.equal(v.source, 'fictional'); assert.ok(['cap_reached', 'too_old'].includes(v.fallbackReason));
});
test('failure: no data yet -> fictional league with the reason; after a good result a failure keeps the last good copy flagged stale; much later it falls back', async () => {
  const s = makeServer(); const bad = s.app.scoresProvider = failing(); let r = await tickScores(s.app, { env: {} }); assert.equal(r.ok, false); let v = scoresView(s.app); assert.equal(v.source, 'fictional'); assert.equal(v.fallbackReason, 'api_error');
  s.app.scoresProvider = counting(); s.app.clock.advance(HOUR); r = await tickScores(s.app, { env: {} }); assert.equal(r.ok, true); v = scoresView(s.app); assert.equal(v.source, 'mock'); assert.equal(v.stale, false);
  s.app.scoresProvider = failing(); s.app.clock.advance(HOUR); r = await tickScores(s.app, { env: {} }); assert.equal(r.ok, false); v = scoresView(s.app); assert.equal(v.source, 'mock'); assert.equal(v.stale, true); assert.equal(v.fallbackReason, 'api_error'); assert.ok(v.updatedAt < s.app.clock.now());
  s.app.clock.advance(3 * HOUR); v = scoresView(s.app); assert.equal(v.source, 'fictional'); assert.equal(v.fallbackReason, 'api_error'); void bad;
});
test('free plan blocks the season: fallback, and the job backs off for hours instead of hammering', async () => {
  const s = makeServer(); const p = s.app.scoresProvider = { name: 'api-football', needsKey: false, calls: 0, async fetchFixtures() { p.calls++; return { json: { errors: { plan: 'Free plans do not have access to this season' }, response: [] } }; } };
  let r = await tickScores(s.app, { env: {} }); assert.equal(r.code, 'plan_blocked'); for (let i = 0; i < 20; i++) { s.app.clock.advance(10 * 60000); await tickScores(s.app, { env: {} }); } assert.equal(p.calls, 1 + 0 + Math.floor(200 / 360) , 'one call in the first 200 minutes');
  assert.equal(scoresView(s.app).fallbackReason, 'plan_blocked'); assert.equal(scoresView(s.app).source, 'fictional');
});
test('the real provider without a key makes no call and the board shows the fictional league', async () => {
  const s = makeServer(); let net = 0; s.app.scoresProvider = { ...apiFootballProvider, fetchFixtures: async (a) => { net++; return apiFootballProvider.fetchFixtures({ ...a, fetchImpl: async () => { throw new Error('network must not be used'); } }); } };
  const r = await tickScores(s.app, { env: {} }); assert.equal(r.skipped, 'no_key'); assert.equal(net, 0); const v = scoresView(s.app); assert.equal(v.source, 'fictional'); assert.equal(v.fallbackReason, 'no_key'); assert.equal(v.apiCallsToday, 0);
});
test('the real provider parser: sends the key as a header only, and trusts the provider’s own remaining-calls count', async () => {
  const s = makeServer(); const seen = []; const fetchImpl = async (url, o) => { seen.push({ url, h: o.headers }); return { ok: true, headers: { get: (k) => ({ 'x-ratelimit-requests-remaining': '40', 'x-ratelimit-requests-limit': '100' })[k] }, json: async () => mockResponse(Date.now()) }; };
  s.app.scoresProvider = { ...apiFootballProvider, fetchFixtures: (a) => apiFootballProvider.fetchFixtures({ ...a, fetchImpl }) }; const r = await tickScores(s.app, { env: { APIFOOTBALL_KEY: 'SECRET-KEY-123' } }); assert.equal(r.ok, true);
  assert.match(seen[0].url, /^https:\/\/v3\.football\.api-sports\.io\/fixtures\?date=\d{4}-\d\d-\d\d$/); assert.equal(seen[0].h['x-apisports-key'], 'SECRET-KEY-123'); assert.ok(!seen[0].url.includes('SECRET'));
  const v = scoresView(s.app); assert.equal(v.apiCallsToday, 60, 'provider says 60 of 100 used'); assert.ok(!JSON.stringify(v).includes('SECRET-KEY'), 'the key never reaches a viewer'); assert.equal(v.source, 'api-football');
});
test('the daily counter survives a restart (same database file)', async () => {
  const f = path.join(os.tmpdir(), `na-scores-${process.pid}-${Date.now()}.db`); const mk = () => { const balance = structuredClone(BALANCE); return buildServer({ dbPath: f, quiet: true, adminPassword: 'x', dev: true, balance }); };
  try { let s = mk(); const p = s.app.scoresProvider = counting(); await tickScores(s.app, { env: {} }); assert.equal(p.calls, 1); const used = scoresView(s.app).apiCallsToday; await s.close?.(); s = mk(); const q = s.app.scoresProvider = counting(); const v = scoresView(s.app); assert.equal(v.apiCallsToday, used); assert.equal(v.source, 'mock', 'last good copy is still there'); const r = await tickScores(s.app, { env: {} }); assert.equal(r.skipped, 'not_due'); assert.equal(q.calls, 0); await s.close?.(); }
  finally { for (const x of ['', '-wal', '-shm']) fs.rmSync(f + x, { force: true }); }
});
test('fictional league: deterministic, valid, and a match only ever gains goals', () => {
  const t0 = Date.UTC(2026, 9, 10, 12, 0, 0); const a = fictionalLeague(t0), b = fictionalLeague(t0); assert.deepEqual(a, b); assert.ok(a.length >= 4 && a.length <= 10);
  for (const f of a) { assert.notEqual(f.home, f.away); assert.ok(['live', 'upcoming', 'finished'].includes(f.state)); if (f.state === 'live') assert.ok(f.minute >= 1 && f.minute <= 90); if (f.state === 'upcoming') assert.equal(f.homeGoals, null); }
  const seen = new Map(); let lives = 0; for (let m = 0; m < 8 * 60; m += 5) for (const f of fictionalLeague(t0 + m * 60000)) { if (f.state === 'live') lives++; const prev = seen.get(f.id); if (prev && f.homeGoals !== null && prev.h !== null) { assert.ok(f.homeGoals >= prev.h && f.awayGoals >= prev.a, `${f.id} score went down`); } seen.set(f.id, { h: f.homeGoals, a: f.awayGoals }); }
  assert.ok(lives > 20, 'there is almost always a live match');
});
