// Daily treasures (Sherif, 28 Oct 2026): each Lagos day up to 100 cash chests (₦1M..₦10M) + ONE free Tesla Cybertruck.
// Placement is a pure function of the Lagos day + config + the reachable-spot pools (server/config/daily-treasure-spots.json, made by
// tools/gen-daily-treasure-spots.mjs), so restarts and every server agree, and a new set appears at Lagos midnight.
// Claims: one row per chest id (PRIMARY KEY), inserted inside the same transaction as the ledger payout, so the first player wins on
// SQLite and Postgres alike and nobody is paid twice. Range is checked against the server's known position (speed-clamped by world.js),
// plus a speed check between your own finds. Guests and bots cannot take them.
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import { DAILY_TREASURES as DEF } from '../config/daily-treasures.js';
import { bad, GameError } from './util.js';
import { move, cashId, SYS } from './ledger.js';
import { dayKey, dayLabel } from './rewards.js';
import { notify } from './economy.js';

export const SPOTS = JSON.parse(fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../config/daily-treasure-spots.json'), 'utf8')).cities;
export const dailyCfg = (app) => { const b = app.balance.dailyTreasures || {}; return { ...DEF, ...b, value: { ...DEF.value, ...(b.value || {}) }, cybertruck: { ...DEF.cybertruck, ...(b.cybertruck || {}) } }; };
const KINDS = ['interior', 'street', 'behind', 'open'];
const naira = (n) => n >= 1e6 ? '₦' + (n / 1e6).toFixed(n % 1e6 ? 1 : 0) + 'M' : '₦' + Math.round(n).toLocaleString('en-NG');

function hash32(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; }
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function shuffle(arr, r) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
/** largest-remainder split of n by weights {key: w}, never more than cap[key]; leftovers go to whoever still has room, biggest weight first */
export function apportion(n, weights, cap = {}) {
  const keys = Object.keys(weights).filter(k => weights[k] > 0); const W = keys.reduce((s, k) => s + weights[k], 0) || 1; const out = {};
  const raw = keys.map(k => ({ k, v: n * weights[k] / W })); for (const r of raw) out[r.k] = Math.min(Math.floor(r.v), cap[r.k] ?? Infinity);
  let left = n - keys.reduce((s, k) => s + out[k], 0);
  for (const r of raw.sort((a, b) => (b.v - Math.floor(b.v)) - (a.v - Math.floor(a.v)))) { if (left <= 0) break; if (out[r.k] < (cap[r.k] ?? Infinity)) { out[r.k]++; left--; } }
  for (const k of keys.sort((a, b) => weights[b] - weights[a])) while (left > 0 && out[k] < (cap[k] ?? Infinity)) { out[k]++; left--; }
  return out;
}
function worth(C, r) {
  const V = C.value; let lo = V.min, hi = V.max;
  if (V.distribution === 'bands' && V.bands?.length) { const tot = V.bands.reduce((s, b) => s + b.w, 0); let x = r() * tot; for (const b of V.bands) { if ((x -= b.w) < 0) { lo = b.min; hi = b.max; break; } } }
  lo = Math.max(V.min, lo); hi = Math.min(V.max, hi); const steps = Math.floor((hi - lo) / V.step);
  return lo + Math.floor(r() * (steps + 1)) * V.step;
}
/** the day's chests. Pure and cached per day. */
export function dailySet(app, day = dayKey(app.clock.now())) {
  const C = dailyCfg(app); const memo = (app._dailyT ||= new Map()); const key = `${day}`; if (memo.has(key)) return memo.get(key);
  const list = []; if (!C.enabled) { memo.set(key, list); return list; }
  const r = rng(hash32(`${C.seedSalt}|${day}`)); const n = Math.min(100, Math.max(0, C.perDay | 0));
  const byKind = apportion(n, C.split);
  const used = Object.fromEntries(Object.keys(C.cities).map(c => [c, []]));
  const pools = {}; for (const c of Object.keys(C.cities)) for (const k of KINDS) pools[`${c}|${k}`] = shuffle(SPOTS[c]?.[k] || [], r);
  const far = (c, s) => used[c].every(q => Math.hypot(q.x - s.x, q.z - s.z) >= C.minGapM);
  const take = (c, k) => { const pool = pools[`${c}|${k}`]; for (let i = 0; i < pool.length; i++) { const s = pool[i]; if (k === 'interior' || far(c, s)) { pool.splice(i, 1); if (k !== 'interior') used[c].push(s); return s; } } return null; };
  let seq = 0;
  for (const k of KINDS) {
    const cap = Object.fromEntries(Object.keys(C.cities).map(c => [c, (SPOTS[c]?.[k] || []).length]));
    const per = apportion(byKind[k] || 0, C.cities, cap);
    for (const [c, m] of Object.entries(per)) for (let i = 0; i < m; i++) {
      let s = take(c, k); let city = c;
      if (!s) for (const alt of Object.keys(C.cities)) { s = take(alt, k); if (s) { city = alt; break; } } // a district ran out of spaced spots: same kind elsewhere
      if (!s) continue;
      list.push({ id: `dt-${day}-${String(++seq).padStart(3, '0')}`, day, city, kind: k, prize: 'cash', worth: worth(C, r), x: s.x, z: s.z, ...(k === 'interior' ? { venueId: s.venueId, rx: s.rx, rz: s.rz } : {}) });
    }
  }
  if (C.cybertruck.enabled) { const s = take(C.cybertruck.city, C.cybertruck.kind) || take(C.cybertruck.city, 'street'); if (s) list.push({ id: `dt-${day}-cyber`, day, city: C.cybertruck.city, kind: C.cybertruck.kind, prize: 'car', model: C.cybertruck.model, worth: 0, x: s.x, z: s.z }); }
  if (memo.size > 4) memo.clear(); memo.set(key, list); return list;
}
const todayById = (app) => { const d = dayKey(app.clock.now()); const set = dailySet(app, d); return { d, byId: new Map(set.map(t => [t.id, t])) }; };
function takenToday(app) {
  const d = dayKey(app.clock.now()); const c = app._dailyTaken;
  if (c && c.day === d) return c.set;
  const set = new Set(app.db.prepare('SELECT treasure_id FROM daily_treasure_claims WHERE day=?').all(d).map(r => r.treasure_id)); app._dailyTaken = { day: d, set }; return set;
}
/** outdoor chests of today in this district, for /api/city (interiors are shown inside the venue) */
export function publicDaily(app, cityId) {
  const taken = takenToday(app);
  return dailySet(app).filter(t => t.city === cityId && t.kind !== 'interior' && !taken.has(t.id)).map(t => ({ id: t.id, x: t.x, z: t.z, worth: t.worth, taken: false, daily: true, prize: t.prize, ...(t.prize === 'car' ? { label: 'FREE Cybertruck' } : {}) }));
}
export function takenDailyInCity(app, cityId) { const taken = takenToday(app); return dailySet(app).filter(t => t.city === cityId && taken.has(t.id)).map(t => t.id); }
/** treasure chests inside a venue today, drawn as stations in the room */
export function venueDailyStations(app, venueId) {
  const taken = takenToday(app);
  return dailySet(app).filter(t => t.kind === 'interior' && t.venueId === venueId && !taken.has(t.id)).map(t => ({ id: t.id, type: 'treasure', label: `Hidden treasure ${naira(t.worth)}`, x: t.rx, z: t.rz, color: '#ffc20e', worth: t.worth }));
}

export function claimDaily(app, uid, id, { venueId } = {}) {
  const C = dailyCfg(app); if (!C.enabled) bad('TREASURE_OFF', 'Daily treasures are off right now.', 409);
  const { d, byId } = todayById(app); const t = byId.get(id);
  if (!t) bad('GONE', 'That treasure has gone. A new set appears every day at Lagos midnight.', 410);
  const u = app.db.prepare('SELECT is_guest, is_bot FROM users WHERE id=?').get(uid);
  if (!C.guests && (u?.is_guest || u?.is_bot)) bad('GUEST', 'Sign up to collect daily treasures.', 403);
  const p = app.world.players.get(uid); if (!p) bad('NOT_IN_WORLD', 'Join the world first.', 409);
  if (p.city !== t.city) bad('WRONG_CITY', 'That treasure is in another place.', 409);
  if (t.kind === 'interior') { if (p.venue !== t.venueId || (venueId && venueId !== t.venueId)) bad('NOT_INSIDE', 'That treasure is hidden inside a building. Go in first.', 409); }
  else { if (p.venue) bad('INSIDE', 'Step outside first.', 409); if (Math.hypot(p.x - t.x, p.z - t.z) > C.reachM) bad('TOO_FAR', 'Walk up to the treasure first.', 409); }
  const now = app.clock.now();
  // speed check: between your last daily find in this district and this one you cannot have moved faster than a car
  const last = app.db.prepare('SELECT x, z, claimed_at FROM daily_treasure_claims WHERE user_id=? AND city_id=? ORDER BY claimed_at DESC LIMIT 1').get(uid, t.city);
  if (last) { const dt = Math.max(0.001, (now - Number(last.claimed_at)) / 1000); if (Math.hypot(t.x - last.x, t.z - last.z) - 2 * C.reachM > C.maxSpeedMps * dt) bad('TOO_FAST', 'Easy! You got here impossibly fast.', 429); }
  if (t.prize === 'cash' && C.maxPerPlayerPerDay > 0) { const n = app.db.prepare("SELECT COUNT(*) n FROM daily_treasure_claims WHERE user_id=? AND day=? AND prize='cash'").get(uid, d).n; if (Number(n) >= C.maxPerPlayerPerDay) bad('DAILY_LIMIT', `You have found ${C.maxPerPlayerPerDay} treasures today. Leave some for others!`, 409); }
  let result;
  try {
    result = app.db.transaction(() => {
      const ex = app.db.prepare('SELECT user_id, amount FROM daily_treasure_claims WHERE treasure_id=?').get(t.id);
      if (ex) { if (ex.user_id === uid) return { ok: true, duplicate: true, id: t.id, amount: ex.amount, prize: t.prize, text: 'You already took this treasure.' }; bad('TAKEN', 'Someone already took this treasure.', 409); }
      let carId = null;
      if (t.prize === 'car') {
        const have = app.db.prepare('SELECT COUNT(*) n FROM player_cars WHERE user_id=?').get(uid).n; const slots = app.balance.cars.garageSlots;
        if (Number(have) >= slots) bad('GARAGE_FULL', `Your garage holds ${slots} cars. Sell one, then come back. The Cybertruck stays here for whoever gets it first.`, 409);
        app.db.prepare('INSERT INTO daily_treasure_claims(treasure_id, day, user_id, kind, prize, amount, car_id, city_id, x, z, claimed_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').run(t.id, d, uid, t.kind, 'car', 0, null, t.city, t.x, t.z, now);
        const r = app.db.prepare('INSERT INTO player_cars(user_id,model,paid,bought_at,active) VALUES (?,?,?,?,?)').run(uid, t.model, 0, now, Number(have) ? 0 : 1); carId = Number(r.lastInsertRowid);
        app.db.prepare('UPDATE daily_treasure_claims SET car_id=? WHERE treasure_id=?').run(carId, t.id);
        return { ok: true, duplicate: false, id: t.id, prize: 'car', amount: 0, carId, text: 'You found today\'s FREE Tesla Cybertruck! It is parked in your garage.' };
      }
      app.db.prepare('INSERT INTO daily_treasure_claims(treasure_id, day, user_id, kind, prize, amount, car_id, city_id, x, z, claimed_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').run(t.id, d, uid, t.kind, 'cash', t.worth, null, t.city, t.x, t.z, now);
      move(app, { from: SYS.FAUCET_DAILY_TREASURE, to: cashId(uid), amount: t.worth, reason: 'daily_treasure', ref: t.id, userId: uid, idemKey: `dtreasure:${t.id}` });
      return { ok: true, duplicate: false, id: t.id, prize: 'cash', amount: t.worth, text: `You found a treasure worth ${naira(t.worth)}.` };
    })();
  } catch (e) {
    if (e instanceof GameError) throw e;
    if (/CONSTRAINT|UNIQUE|23505/i.test(String(e.code || '') + (e.message || ''))) bad('TAKEN', 'Someone already took this treasure.', 409);
    throw e;
  }
  if (!result.duplicate) { takenToday(app).add(t.id); if (result.prize === 'car') try { notify(app, uid, 'car', result.text); } catch { /* ignore */ } }
  return result;
}

/** admin: today's chests with who took them */
export function adminDaily(app, { day } = {}) {
  const d = Number.isFinite(Number(day)) && day !== '' && day != null ? Number(day) : dayKey(app.clock.now());
  const claims = new Map(app.db.prepare('SELECT c.*, u.username FROM daily_treasure_claims c JOIN users u ON u.id=c.user_id WHERE c.day=?').all(d).map(r => [r.treasure_id, r]));
  const rows = dailySet(app, d).map(t => { const c = claims.get(t.id); return { ...t, taken: !!c, collector: c ? { id: c.user_id, username: c.username } : null, claimedAt: c?.claimed_at || null, carId: c?.car_id || null }; });
  const cash = rows.filter(r => r.prize === 'cash');
  const count = (f) => rows.reduce((m, r) => (f(r) && (m[r.kind] = (m[r.kind] || 0) + 1), m), {});
  return { day: d, date: dayLabel(d), summary: { cashChests: cash.length, taken: cash.filter(r => r.taken).length, remaining: cash.filter(r => !r.taken).length, paidOut: cash.filter(r => r.taken).reduce((s, r) => s + r.worth, 0), onOffer: cash.reduce((s, r) => s + r.worth, 0), cybertruck: rows.find(r => r.prize === 'car') || null, byKind: count(() => true), byCity: rows.reduce((m, r) => ((m[r.city] = (m[r.city] || 0) + 1), m), {}) }, rows };
}
