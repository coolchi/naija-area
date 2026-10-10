// Weather, rain and flooding, plus the day/night phase. Server-authoritative AND stateless: the weather is a pure function of the real clock (and a seed), so every player and every
// server instance agrees without a database row, and tests can pin it (`balance.weather.forced`, or the admin route). Numbers: server/config/weather.js (ESTIMATES, not climate data).
// Effects: a flooded street slows you (the client applies the scale, the server sends it), rain raises Oya Ride/travel fares a little, and it changes how busy your businesses are.
import { gameTime } from './economy.js';
import { cityIdOf } from './cities.js';
import { demandHooks } from './business.js';
import { mulberry32 } from './casual/merge.js';
import { WEATHER } from '../config/weather.js';

export const cfg = (app) => app.balance.weather || WEATHER;
export const STATES = ['clear', 'cloudy', 'rain', 'storm'];
const LABEL = { clear: 'Clear skies', cloudy: 'Cloudy', rain: 'Raining', storm: 'Thunderstorm' };
const hashStr = (s) => { let x = 2166136261; for (const c of String(s)) x = Math.imul(x ^ c.charCodeAt(0), 16777619) >>> 0; return x >>> 0; };
const forcedOf = (app) => { const rt = app.runtime || {}; const f = rt.weatherForce !== undefined ? rt.weatherForce : cfg(app).forced; return STATES.includes(f) ? f : null; };

/** the weather state of one block of real time (deterministic) */
export function stateOfBlock(app, block) {
  const C = cfg(app); const front = Math.floor(block / C.frontBlocks); const startMs = app.balance.worldClock.startRealMs + front * C.frontBlocks * C.blockMinutes * 60000;
  const month = new Date(startMs + 3600000).getUTCMonth(); const w = C.monthOdds[month]; const rng = mulberry32(hashStr(`${C.seed}:${front}`)); let r = rng() * w.reduce((a, b) => a + b, 0);
  for (let i = 0; i < 4; i++) { r -= w[i]; if (r < 0) return STATES[i]; } return 'clear';
}
const blockOf = (app, now) => Math.floor((now - app.balance.worldClock.startRealMs) / (cfg(app).blockMinutes * 60000));
export function stateAt(app, now = app.clock.now()) {
  const C = cfg(app); if (!C.enabled) return 'clear'; const f = forcedOf(app); if (f) return f; return stateOfBlock(app, blockOf(app, now));
}
const rainy = (s) => s === 'rain' || s === 'storm';
/** 0 dry, 1 street water (slow), 2 flooded (very slow). A storm floods at once; steady rain floods; water drains for a block after. */
export function floodLevel(app, now = app.clock.now()) {
  const C = cfg(app); if (!C.enabled) return 0; const f = forcedOf(app); if (f) return f === 'storm' ? 2 : f === 'rain' ? 1 : 0;
  const b = blockOf(app, now); const s0 = stateOfBlock(app, b), s1 = stateOfBlock(app, b - 1), s2 = stateOfBlock(app, b - 2);
  if (s0 === 'storm') return 2; if (s0 === 'rain' && rainy(s1)) return 1; if (!rainy(s0) && s1 === 'storm') return 1; if (!rainy(s0) && rainy(s1) && rainy(s2)) return 1; return 0;
}
/** when the current block ends, and what the next few blocks hold */
export function forecast(app, now = app.clock.now(), n = 3) {
  const C = cfg(app); const bm = C.blockMinutes * 60000; const b = blockOf(app, now); const out = []; const f = forcedOf(app);
  for (let i = 1; i <= n; i++) out.push({ inMs: app.balance.worldClock.startRealMs + (b + i) * bm - now, state: f || (C.enabled ? stateOfBlock(app, b + i) : 'clear') });
  return out;
}
export function phaseOf(app, now = app.clock.now()) {
  const C = cfg(app); const h = gameTime(app, now).hour; const [d0, d1] = C.phases.dawn; const [y0, y1] = C.phases.day; const [u0, u1] = C.phases.dusk;
  const phase = h >= d0 && h < d1 ? 'dawn' : h >= y0 && h < y1 ? 'day' : h >= u0 && h < u1 ? 'dusk' : 'night'; return { phase, night: phase === 'night', hour: h };
}
export const zonesOf = (app, cityId) => cfg(app).zones[cityId] || [];
/** flood level at a point of a city (0 when not in a flood-prone zone) */
export function floodAt(app, cityId, x, z, now = app.clock.now()) {
  const lvl = floodLevel(app, now); if (!lvl) return 0; for (const q of zonesOf(app, cityId)) if (x >= q.x1 && x <= q.x2 && z >= q.z1 && z <= q.z2) return lvl; return 0;
}
export function fareMult(app, now = app.clock.now()) { const s = stateAt(app, now); return cfg(app).fareSurge[s] || 1; }
export function view(app, uid) {
  const now = app.clock.now(); const C = cfg(app); const cityId = cityIdOf(app, uid); const s = stateAt(app, now); const lvl = floodLevel(app, now); const ph = phaseOf(app, now);
  return { state: s, label: LABEL[s], flood: lvl, forced: forcedOf(app), phase: ph.phase, night: ph.night, hour: ph.hour, forecast: forecast(app, now).map(f => ({ ...f, label: LABEL[f.state] })), fareMult: fareMult(app, now), speedScale: C.speed[lvl], speedByLevel: C.speed,
    zones: zonesOf(app, cityId).map(q => ({ ...q, active: lvl > 0 })), city: cityId, note: 'Weather odds and flood-prone streets are invented placeholders (ESTIMATE), not weather records.' };
}
/** the compact piece of the heartbeat: state index, flood level, and the id of every flooded zone of this city */
export function mini(app, cityId, now = app.clock.now()) { const lvl = floodLevel(app, now); return { s: STATES.indexOf(stateAt(app, now)), f: lvl, z: lvl ? zonesOf(app, cityId).map(q => q.id) : [] }; }
export function force(app, state) { (app.runtime ||= {}).weatherForce = state === null || state === undefined || state === '' || state === 'auto' ? undefined : STATES.includes(state) ? state : undefined; return { forced: forcedOf(app) }; }

// businesses: weather changes how busy they are (server/config/business.js: types[x].weather = { rain, storm })
import { BUSINESS } from '../config/business.js';
demandHooks.push((app, type, t) => {
  const W = ((app.balance.business || BUSINESS).types[type] || {}).weather; if (!W) return 1; const s = stateAt(app, t);
  return s === 'storm' ? (W.storm ?? 1) : s === 'rain' ? (W.rain ?? 1) : 1;
});
