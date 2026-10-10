// Stadium live scores, TEST version (10 Oct 2026).
// ONE server job (tickScores) asks a provider for today's fixtures, stores the answer in the database, and every viewer is served the stored copy.
// Players never cause a provider call, so the number of viewers does not change API usage.
// A call counter per UTC day lives in the database (a restart cannot reset it) and the job stops before the daily cap (API-Football free plan: 100 a day).
// Fallbacks, in this order: last good result (flagged stale) -> a fictional league that runs on the clock. The provider is "mock" until Sherif supplies a key.
// Rights: API-Football's terms give no licence to publish this data. TEST ONLY, no logos, names shown as plain text. See docs/STADIUM.md.
import { SAMPLE_FIXTURES } from '../config/scores-sample.js';

const DAY_MS = 86400000;
const envOf = () => (typeof process !== 'undefined' && process.env ? process.env : {}); // the in-browser demo has no process
export const dayKey = (ms) => new Date(ms).toISOString().slice(0, 10);
const endOfDay = (ms) => (Math.floor(ms / DAY_MS) + 1) * DAY_MS;

// ---- providers ----------------------------------------------------------------------------------------------------------------------------
/** raw API-Football-shaped response built from the recorded sample, with kick-off times relative to now */
export function mockResponse(now) {
  const response = SAMPLE_FIXTURES.map((f) => {
    const ts = Math.floor((now + f.startMin * 60000) / 1000); const el = f.status === 'live' ? Math.min(90, Math.max(1, -f.startMin)) : f.status === 'done' ? 90 : null;
    const short = f.status === 'live' ? (el > 45 && el <= 48 ? 'HT' : el > 48 ? '2H' : '1H') : f.status === 'done' ? 'FT' : 'NS';
    return { fixture: { id: f.id, timestamp: ts, date: new Date(ts * 1000).toISOString(), status: { short, long: short, elapsed: el } }, league: { name: f.league, country: f.country }, teams: { home: { name: f.home }, away: { name: f.away } }, goals: { home: f.goals[0], away: f.goals[1] } };
  });
  return { get: 'fixtures', errors: [], results: response.length, response };
}
export const mockProvider = { name: 'mock', needsKey: false, async fetchFixtures({ now }) { return { json: mockResponse(now), remaining: null }; } };
/** the real thing. Needs APIFOOTBALL_KEY (server secret, never sent to a client). Not exercised in tests: only the parser is. */
export const apiFootballProvider = {
  name: 'api-football', needsKey: true,
  async fetchFixtures({ now, key, fetchImpl = globalThis.fetch }) {
    const res = await fetchImpl(`https://v3.football.api-sports.io/fixtures?date=${dayKey(now)}`, { headers: { 'x-apisports-key': key }, signal: AbortSignal.timeout?.(8000) });
    if (!res.ok) throw Object.assign(new Error(`HTTP ${res.status}`), { code: 'api_error' });
    const rem = Number(res.headers?.get?.('x-ratelimit-requests-remaining')); const lim = Number(res.headers?.get?.('x-ratelimit-requests-limit'));
    return { json: await res.json(), remaining: Number.isFinite(rem) ? rem : null, limit: Number.isFinite(lim) ? lim : null };
  },
};
export const providerFor = (env = envOf()) => ((env.NA_SCORES_PROVIDER || '') === 'api-football' ? apiFootballProvider : mockProvider);

// ---- parsing ------------------------------------------------------------------------------------------------------------------------------
const LIVE = new Set(['1H', 'HT', '2H', 'ET', 'BT', 'P', 'LIVE', 'INT']); const DONE = new Set(['FT', 'AET', 'PEN']); const UPCOMING = new Set(['NS', 'TBD']);
const clip = (s, n) => String(s ?? '').replace(/[\u0000-\u001f<>]/g, '').slice(0, n);
/** turn a raw API-Football response into our small, safe fixture list. Throws {code} when the response says the plan or the key is the problem. */
export function normalize(json, { max = 10 } = {}) {
  const errs = json?.errors; const has = Array.isArray(errs) ? errs.length > 0 : errs && typeof errs === 'object' && Object.keys(errs).length > 0;
  if (has) { const keys = Array.isArray(errs) ? [] : Object.keys(errs); const msg = clip(Array.isArray(errs) ? errs.join(' ') : Object.values(errs).join(' '), 160); throw Object.assign(new Error(msg || 'API error'), { code: keys.includes('plan') ? 'plan_blocked' : keys.includes('token') || keys.includes('requests') ? 'key_or_quota' : 'api_error' }); }
  if (!Array.isArray(json?.response)) throw Object.assign(new Error('Unexpected response'), { code: 'api_error' });
  const out = [];
  for (const r of json.response) {
    const s = String(r?.fixture?.status?.short || ''); const state = LIVE.has(s) ? 'live' : DONE.has(s) ? 'finished' : UPCOMING.has(s) ? 'upcoming' : 'off';
    if (state === 'off' || !r?.teams?.home?.name || !r?.teams?.away?.name) continue;
    const g = (v) => (Number.isFinite(Number(v)) && v !== null ? Math.max(0, Math.min(99, Math.round(Number(v)))) : null);
    out.push({ id: String(r.fixture.id), league: clip(r.league?.name, 40), country: clip(r.league?.country, 30), home: clip(r.teams.home.name, 30), away: clip(r.teams.away.name, 30), homeGoals: state === 'upcoming' ? null : g(r.goals?.home), awayGoals: state === 'upcoming' ? null : g(r.goals?.away), state, status: s, minute: state === 'live' ? (Number.isFinite(r.fixture.status.elapsed) ? Math.round(r.fixture.status.elapsed) : null) : null, kickoff: Number(r.fixture.timestamp) * 1000 || null });
  }
  const rank = { live: 0, upcoming: 1, finished: 2 }; out.sort((a, b) => rank[a.state] - rank[b.state] || (a.state === 'finished' ? b.kickoff - a.kickoff : a.kickoff - b.kickoff));
  return out.slice(0, max);
}

// ---- fictional league (always available, runs on the clock, needs no network) ---------------------------------------------------------------
const TEAMS = ['Eko Lions', 'Ikeja Eagles', 'Surulere Stars', 'Badagry Bulls', 'Lekki Waves', 'Ajegunle Aces', 'Ikorodu United', 'Apapa Rovers', 'Yaba Falcons', 'Mushin Rangers', 'Epe Panthers', 'Oshodi City'];
const hash = (...a) => { let x = 2166136261; for (const c of a.join('|')) { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619) >>> 0; } return x >>> 0; };
/** goal minutes of one fictional match, fixed by its id */
const goalsOf = (id) => { const out = { h: [], a: [] }; const n = 1 + (hash(id, 'n') % 5); for (let i = 0; i < n; i++) (hash(id, 'side', i) % 2 ? out.a : out.h).push(2 + (hash(id, 'min', i) % 86)); return out; };
/** three matches every 3 hours (kick-offs on UTC hours 0, 3, 6, ...): the match lasts 105 minutes with an interval, so there is usually one live and one coming up. */
export function fictionalLeague(now, { max = 10 } = {}) {
  const out = []; const slot = 3 * 3600000; const base = Math.floor(now / slot) * slot;
  for (let k = -2; k <= 2; k++) {
    const start = base + k * slot; const id = `f${start / 60000}`; const t = TEAMS; const hi = hash(id, 'h') % t.length; let ai = hash(id, 'a') % t.length; if (ai === hi) ai = (ai + 1) % t.length;
    const el = (now - start) / 60000; const g = goalsOf(id); const playMin = el <= 45 ? el : el <= 60 ? 45 : el - 15; // 15 minute interval
    const state = el < 0 ? 'upcoming' : el >= 105 ? 'finished' : 'live'; const upto = Math.min(90, Math.floor(playMin));
    const hg = state === 'upcoming' ? null : g.h.filter((m) => state === 'finished' || m <= upto).length; const ag = state === 'upcoming' ? null : g.a.filter((m) => state === 'finished' || m <= upto).length;
    out.push({ id, league: 'Naija Area Test League', country: 'Fictional', home: t[hi], away: t[ai], homeGoals: hg, awayGoals: ag, state, status: state === 'live' ? (el > 45 && el <= 60 ? 'HT' : el <= 45 ? '1H' : '2H') : state === 'upcoming' ? 'NS' : 'FT', minute: state === 'live' ? Math.max(1, Math.min(90, Math.round(playMin))) : null, kickoff: start });
  }
  const rank = { live: 0, upcoming: 1, finished: 2 }; out.sort((a, b) => rank[a.state] - rank[b.state] || (a.state === 'finished' ? b.kickoff - a.kickoff : a.kickoff - b.kickoff));
  return out.slice(0, max);
}

// ---- state (one row) ---------------------------------------------------------------------------------------------------------------------
const row = (app) => app.db.prepare('SELECT * FROM scores_cache WHERE id=1').get();
function load(app, now) {
  let r = row(app); const day = dayKey(now);
  if (!r) { app.db.prepare('INSERT INTO scores_cache(id, day) VALUES (1, ?)').run(day); r = row(app); }
  if (r.day !== day) { app.db.prepare('UPDATE scores_cache SET day=?, calls=0 WHERE id=1').run(day); r = row(app); } // a new UTC day starts with a fresh count
  return r;
}
const cfg = (app) => app.balance.stadium.scores;
const callsLeft = (app, r) => Math.max(0, cfg(app).dailyCap - cfg(app).reserve - r.calls);

/** how long to wait after a try: the base interval, stretched so the calls that are left cover the rest of the UTC day, longer when no match is near */
export function nextDelay(app, now, r, fixtures) {
  const C = cfg(app); const left = callsLeft(app, r); if (left <= 0) return Math.max(1, endOfDay(now) - now);
  const spread = (endOfDay(now) - now) / left; let base = C.refreshMs;
  const near = (fixtures || []).some((f) => f.state === 'live' || (f.state === 'upcoming' && f.kickoff - now < 3600000)); if (!near) base = C.idleRefreshMs;
  return Math.max(base, spread);
}

/** The one job. Safe to call as often as you like: it only calls the provider when it is due and under the cap. Returns what happened (for tests and logs). */
export async function tickScores(app, { env = envOf() } = {}) {
  const C = cfg(app); if (!C.enabled) return { skipped: 'disabled' };
  const now = app.clock.now(); const r = load(app, now); const provider = app.scoresProvider || providerFor(env); const key = env.APIFOOTBALL_KEY;
  if (now < r.next_at) return { skipped: 'not_due' };
  if (provider.needsKey && !key) { app.db.prepare('UPDATE scores_cache SET tried_at=?, next_at=?, error=?, error_code=? WHERE id=1').run(now, now + C.blockedRetryMs, 'No API key set', 'no_key'); return { skipped: 'no_key' }; }
  if (callsLeft(app, r) <= 0) { app.db.prepare('UPDATE scores_cache SET tried_at=?, next_at=?, error=?, error_code=? WHERE id=1').run(now, endOfDay(now), 'Daily call cap reached', 'cap_reached'); return { skipped: 'cap_reached' }; }
  app.db.prepare('UPDATE scores_cache SET calls=calls+1, tried_at=? WHERE id=1').run(now); // count BEFORE the call: a crash or timeout still counts
  try {
    const res = await provider.fetchFixtures({ now, key }); const fixtures = normalize(res.json, { max: C.maxFixtures });
    if (Number.isFinite(res.remaining) && Number.isFinite(res.limit)) app.db.prepare('UPDATE scores_cache SET calls=MAX(calls, ?) WHERE id=1').run(res.limit - res.remaining); // trust the provider's own count if it is higher
    const after = row(app); app.db.prepare('UPDATE scores_cache SET payload=?, source=?, good_at=?, error=NULL, error_code=NULL, next_at=? WHERE id=1').run(JSON.stringify(fixtures), provider.name, now, now + nextDelay(app, now, after, fixtures));
    return { called: true, ok: true, fixtures: fixtures.length };
  } catch (e) {
    const code = e?.code || 'api_error'; const after = row(app); const wait = code === 'plan_blocked' || code === 'key_or_quota' ? C.blockedRetryMs : Math.min(1800000, Math.max(C.refreshMs, nextDelay(app, now, after, null)));
    app.db.prepare('UPDATE scores_cache SET error=?, error_code=?, next_at=? WHERE id=1').run(clip(e?.message, 160), code, now + wait);
    return { called: true, ok: false, code };
  }
}

/** what a viewer gets. Reads only: never calls a provider. */
export function scoresView(app) {
  const C = cfg(app); const now = app.clock.now(); const r = load(app, now); const left = callsLeft(app, r);
  const base = { checkedAt: now, apiCallsToday: r.calls, apiCallsCap: C.dailyCap, testOnly: true, note: 'TEST data. Names are plain text with no logos. Not for publishing.' };
  let good = null; try { good = r.payload ? JSON.parse(r.payload) : null; } catch { good = null; }
  const age = r.good_at ? now - r.good_at : Infinity;
  if (C.enabled && good && age <= C.staleMs) {
    const stale = age > Math.max(C.idleRefreshMs, 2 * C.refreshMs) || !!r.error_code;
    return { ...base, source: r.source, label: r.source === 'mock' ? 'Sample data (mock provider)' : 'Live (API-Football, test)', updatedAt: r.good_at, stale, fallbackReason: r.error_code || null, fixtures: advance(good, r.good_at, now) };
  }
  const reason = !C.enabled ? 'disabled' : r.error_code || (left <= 0 ? 'cap_reached' : good ? 'too_old' : 'no_data_yet');
  return { ...base, source: 'fictional', label: 'Fictional league (no live feed)', updatedAt: now, stale: false, fallbackReason: reason, fixtures: fictionalLeague(now, { max: C.maxFixtures }) };
}
/** between provider calls a live match's minute is moved on locally (display only; the score is only changed by a provider call) */
function advance(list, goodAt, now) {
  const add = Math.floor((now - goodAt) / 60000); return list.map((f) => (f.state === 'live' && Number.isFinite(f.minute) && f.status !== 'HT' ? { ...f, minute: Math.min(90, f.minute + add) } : f));
}
