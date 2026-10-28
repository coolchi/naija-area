// Police patrol missions: take a duty Charger at the police station, chase SHARED suspects, arrest or take them down, ₦1M per completed mission.
// Server-authoritative: suspect positions are a function of server time along real roads; arrest/shot range is checked against the server's
// known player position (already speed-clamped by world.applyTrail); the first atomic UPDATE on a suspect wins the credit.
// Non-graphic: suspects are cuffed, or fall down and surrender when hit. Guns hit suspects only (never players).
import { PATROL as DEF } from '../config/patrol.js';
import { bad } from './util.js';
import { notify, profile, dist } from './economy.js';
import { ensurePresence } from './world.js';
import { stationOf, activeHold } from './police.js';
import { grantReward, dayKey } from './rewards.js';
import { equippedGun } from './guns.js';
import * as guardian from './guardian.js';
import { healthOf } from './crash.js';
import { rand01 } from './crash.js';

export const cfg = (app) => ({ ...DEF, ...(app.balance.patrol || {}) });
const cityObj = (app, id) => (app.cities && app.cities[id]) || app.city;
const roadPts = (r) => Array.isArray(r.pts) && r.pts.length > 1 ? r.pts.map(p => Array.isArray(p) ? p : [p.x, p.z]) : [[r.x1, r.z1], [r.x2, r.z2]];
const polyLen = (pts) => { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; };
function along(pts, s) { for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (s <= l || i === pts.length - 1) { const t = l ? Math.min(1, s / l) : 0; return { x: pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, z: pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t }; } s -= l; } return { x: pts[0][0], z: pts[0][1] }; }
const kindOf = (app, id) => cfg(app).kinds.find(k => k.id === id) || cfg(app).kinds[0];

/** where a suspect is right now: moving ones run back and forth along their road (ping-pong), robbers stay at the shop door */
export function suspectPos(app, s, now = app.clock.now()) {
  const r = (cityObj(app, s.city_id).roads || []).find(x => x.id === s.road_id); if (!r) return { x: 0, z: 0 };
  const pts = roadPts(r); const L = Math.max(1, polyLen(pts));
  let d = s.s0 + s.speed * Math.max(0, now - s.spawned_at) / 1000; d = d % (2 * L); if (d > L) d = 2 * L - d;
  const p = along(pts, d); return { x: +p.x.toFixed(2), z: +p.z.toFixed(2) };
}
function rnd(app) { return app.rng ? app.rng() : Math.random(); }
/** keep the city topped up with live shared suspects while someone patrols there */
export function ensureSuspects(app, cityId) {
  const C = cfg(app); const now = app.clock.now(); const city = cityObj(app, cityId); const roads = (city.roads || []).filter(r => polyLen(roadPts(r)) > 40); if (!roads.length) return;
  const live = app.db.prepare('SELECT COUNT(*) n FROM police_suspects WHERE city_id=? AND caught_by IS NULL AND expires_at>?').get(cityId, now).n;
  for (let i = live; i < C.suspectsPerCity; i++) {
    const k = C.kinds[Math.floor(rnd(app) * C.kinds.length)]; const r = roads[Math.floor(rnd(app) * roads.length)];
    let s0 = rnd(app) * polyLen(roadPts(r)); const armed = rnd(app) < C.armedShare ? 1 : 0;
    if (k.speed === 0 && city.shops?.length) { // a shop robbery: park on the road point nearest a real shop
      const sh = city.shops[Math.floor(rnd(app) * city.shops.length)]; let best = null;
      for (const rr of roads) { const pts = roadPts(rr); const L = polyLen(pts); for (let t = 0; t <= L; t += 5) { const p = along(pts, t); const dd = Math.hypot(p.x - sh.x, p.z - sh.z); if (!best || dd < best.d) best = { d: dd, r: rr, t }; } }
      if (best) { app.db.prepare('INSERT INTO police_suspects(city_id, kind, road_id, s0, speed, hp, armed, spawned_at, expires_at) VALUES (?,?,?,?,?,?,?,?,?)').run(cityId, k.id, best.r.id, best.t, 0, C.hitsToDown, armed, now, now + C.suspectLifeMs); continue; }
    }
    app.db.prepare('INSERT INTO police_suspects(city_id, kind, road_id, s0, speed, hp, armed, spawned_at, expires_at) VALUES (?,?,?,?,?,?,?,?,?)').run(cityId, k.id, r.id, s0, k.speed, C.hitsToDown, armed, now, now + C.suspectLifeMs);
  }
}
const roadName = (app, s) => (cityObj(app, s.city_id).roads || []).find(x => x.id === s.road_id)?.name || 'the road';
export function suspectView(app, s, from) {
  const k = kindOf(app, s.kind); const p = suspectPos(app, s);
  return { id: s.id, kind: s.kind, label: k.label, x: p.x, z: p.z, hits: s.hp, health: s.hp * cfg(app).policeGunDamage, armed: !!s.armed, moving: s.speed > 0, road: roadName(app, s), radio: k.msg.replace('{where}', roadName(app, s)), d: from ? Math.round(dist(p.x, p.z, from.x, from.z)) : undefined };
}
export const activePatrol = (app, uid) => app.db.prepare("SELECT * FROM police_patrols WHERE user_id=? AND status='active'").get(uid) || null;
/** guns allowed for this account? restricted accounts (an under-18 age-check result) and guests arrest only */
export function gunsAllowed(app, uid) {
  try { const u = app.db.prepare('SELECT is_guest FROM users WHERE id=?').get(uid); if (u?.is_guest) return false; return !guardian.effective(app, uid).restricted; } catch { return false; }
}
function weaponOf(app, uid) { const C = cfg(app); if (!gunsAllowed(app, uid)) return null; const g = equippedGun(app, uid); return g ? { id: g.id, name: g.name, own: true } : { ...C.serviceGun, own: false }; }

function endPatrol(app, row, status) {
  const now = app.clock.now();
  const r = app.db.prepare("UPDATE police_patrols SET status=?, ended_at=? WHERE id=? AND status='active'").run(status, now, row.id);
  const p = app.world?.players?.get(row.user_id); if (p) { p.patrol = null; if (p.mode === 'drive' && !app.db.prepare('SELECT 1 FROM player_cars WHERE user_id=? AND active=1').get(row.user_id)) p.mode = 'walk'; }
  return r.changes === 1;
}
/** lazily time out an expired mission (no pay) */
export function patrolTick(app, uid) {
  const row = activePatrol(app, uid); if (!row) return null;
  if (suspectFire(app, uid, row)) return null;
  if (row.expires_at <= app.clock.now()) { if (endPatrol(app, row, 'timeout')) notify(app, uid, 'police', 'Patrol time is up. The duty car is back at the station. No pay this time.'); return null; }
  const p = app.world?.players?.get(uid); if (p) p.patrol = row.id;
  return row;
}
/** armed suspects shoot back: server aim (range, fire rate, capped accuracy), evaluated since the last check. Returns true if you were downed. */
export function suspectFire(app, uid, row) {
  const C = cfg(app); if (!gunsAllowed(app, uid)) return false; // restricted accounts never face armed suspects
  const now = app.clock.now(); const mem = (app._patrolFire ||= new Map()); const since = mem.get(row.id) ?? row.started_at; mem.set(row.id, now);
  const p = ensurePresence(app, uid); const acc = Math.min(C.suspectAccuracy, C.suspectAccuracyCap); let dmg = 0, hits = 0;
  const armed = app.db.prepare('SELECT * FROM police_suspects WHERE city_id=? AND armed=1 AND caught_by IS NULL AND expires_at>?').all(row.city_id, now);
  for (const s of armed) {
    const from = Math.max(since, s.spawned_at); const n = Math.min(40, Math.floor((now - from) / C.suspectFireIntervalMs));
    for (let i = 1; i <= n; i++) {
      const t = from + i * C.suspectFireIntervalMs; const sp = suspectPos(app, s, t);
      if (dist(p.x, p.z, sp.x, sp.z) > C.suspectRange) continue; // your server position now (best known) against theirs at shot time
      if (rand01(row.id, uid, `${s.id}:${t}`, 'patrol') < acc) { dmg += C.suspectGunDamage; hits++; }
    }
  }
  if (!dmg) return false;
  const h = healthOf(app, uid).health; const nh = Math.max(0, h - dmg);
  app.db.prepare('UPDATE player_state SET health=?, health_at=? WHERE user_id=?').run(nh, now, uid);
  try { app.pushUser?.(uid, { type: 'patrol.hit', hits, damage: dmg, health: nh }); } catch { /* ignore */ }
  if (nh <= 0) { if (endPatrol(app, row, 'downed')) { const pp = app.world?.players?.get(uid); if (pp) pp.mode = 'walk'; notify(app, uid, 'police', 'You were knocked out on patrol. Mission failed, no pay. Get treated and rest up.'); } return true; }
  return false;
}
function limits(app, uid) {
  const C = cfg(app); const now = app.clock.now(); const day = dayKey(now);
  const done = app.db.prepare("SELECT COUNT(*) n FROM police_patrols WHERE user_id=? AND day=? AND status='done'").get(uid, day).n;
  const last = app.db.prepare("SELECT MAX(ended_at) m FROM police_patrols WHERE user_id=? AND status<>'active'").get(uid).m || 0;
  const readyAt = last ? last + C.cooldownMs : 0;
  return { doneToday: done, maxPerDay: C.maxPerDay, leftToday: Math.max(0, C.maxPerDay - done), readyAt: readyAt > now ? readyAt : null };
}
export function patrolView(app, uid) {
  const C = cfg(app); const row = patrolTick(app, uid); const p = ensurePresence(app, uid); const now = app.clock.now();
  const base = { pay: C.pay, needed: C.arrestsNeeded, timeLimitMs: C.timeLimitMs, limits: limits(app, uid), guns: gunsAllowed(app, uid), weapon: weaponOf(app, uid), note: C._note };
  if (!row) return { ...base, active: null };
  ensureSuspects(app, row.city_id);
  const sus = app.db.prepare('SELECT * FROM police_suspects WHERE city_id=? AND caught_by IS NULL AND expires_at>? ORDER BY id').all(row.city_id, now).filter(s => !s.armed || gunsAllowed(app, uid)).map(s => suspectView(app, s, p)).sort((a, b) => a.d - b.d);
  return { ...base, active: { id: row.id, arrests: row.arrests, needed: row.needed, left: row.needed - row.arrests, expiresAt: row.expires_at, leftMs: Math.max(0, row.expires_at - now), ammo: row.ammo, car: 'police' }, suspects: sus };
}
export function startPatrol(app, uid, { venueId } = {}) {
  const C = cfg(app); if (!C.enabled) bad('PATROL_OFF', 'Patrols are off right now.', 409);
  const u = app.db.prepare('SELECT is_guest, is_bot FROM users WHERE id=?').get(uid); if (u?.is_guest) bad('GUEST', 'Sign up to join a police patrol.', 403);
  const st = stationOf(app, uid); if (!st || (venueId && venueId !== st.id)) bad('NO_STATION', 'Go to the Police Station to pick up a patrol car.', 404);
  const p = ensurePresence(app, uid);
  if (p.venue !== st.id && dist(p.x, p.z, st.x, st.z) > C.stationRadius) bad('NOT_AT_STATION', 'Go to the Police Station duty desk first.', 409);
  if (activeHold(app, uid)) bad('DETAINED', 'You are in holding. You cannot go on patrol.', 409);
  if (patrolTick(app, uid)) bad('ON_PATROL', 'You are already on patrol.', 409);
  const L = limits(app, uid); const now = app.clock.now();
  if (L.leftToday <= 0) bad('PATROL_LIMIT', `You have done ${C.maxPerDay} patrols today. Come back tomorrow (Lagos time).`, 429, L);
  if (L.readyAt) bad('PATROL_COOLDOWN', `Rest small. Next patrol in ${Math.ceil((L.readyAt - now) / 60000)} min.`, 429, L);
  const ammo = gunsAllowed(app, uid) ? C.ammoPerMission : 0;
  app.db.prepare('INSERT INTO police_patrols(user_id, city_id, station_id, status, started_at, expires_at, needed, ammo, day) VALUES (?,?,?,?,?,?,?,?,?)')
    .run(uid, p.city, st.id, 'active', now, now + C.timeLimitMs, C.arrestsNeeded, ammo, dayKey(now));
  // the duty car: you leave the station in the Charger (not owned; returned at the end)
  p.venue = null; p.mode = 'drive'; p.patrol = activePatrol(app, uid).id;
  ensureSuspects(app, p.city);
  const v = patrolView(app, uid);
  return { ok: true, text: `Duty Charger issued. Dispatch: ${v.suspects?.[0]?.radio || 'suspects on the map'} Arrest ${C.arrestsNeeded} to earn ₦${C.pay.toLocaleString('en-NG')}.`, patrol: v, user: profile(app, uid) };
}
export function abandonPatrol(app, uid) {
  const row = activePatrol(app, uid); if (!row) bad('NO_PATROL', 'You are not on patrol.', 404);
  endPatrol(app, row, 'abandoned');
  return { ok: true, text: 'Patrol ended. Duty car returned. No pay for an unfinished patrol.', patrol: patrolView(app, uid), user: profile(app, uid) };
}
function credit(app, uid, row, s, how) {
  const C = cfg(app); const now = app.clock.now(); let paid = 0, done = false;
  app.db.transaction(() => {
    app.db.prepare("UPDATE police_patrols SET arrests=arrests+1 WHERE id=? AND status='active'").run(row.id);
    const r2 = activePatrol(app, uid);
    if (r2 && r2.arrests >= r2.needed) {
      if (endPatrol(app, r2, 'done')) {
        paid = grantReward(app, uid, { amount: C.pay, reason: 'police_patrol', ref: String(r2.id), idemKey: `patrol:${r2.id}`, countCaps: false });
        app.db.prepare('UPDATE police_patrols SET paid=? WHERE id=?').run(paid, r2.id); done = true;
      }
    }
  })();
  const who = app.db.prepare('SELECT username FROM users WHERE id=?').get(uid)?.username;
  // tell the other officers chasing this suspect
  for (const o of app.db.prepare("SELECT user_id FROM police_patrols WHERE status='active' AND city_id=? AND user_id<>?").all(s.city_id, uid)) {
    try { app.pushUser?.(o.user_id, { type: 'patrol.caught', suspectId: s.id, by: who }); } catch { /* ignore */ }
  }
  const k = kindOf(app, s.kind);
  return { ok: true, how, suspectId: s.id, done, paid,
    text: done ? `${k.label} ${how === 'takedown' ? 'down and cuffed' : 'cuffed'}. Patrol complete! ₦${paid.toLocaleString('en-NG')} paid.` : `${k.label} ${how === 'takedown' ? 'went down and is out of play' : 'cuffed'}.`,
    patrol: patrolView(app, uid), user: profile(app, uid) };
}
function liveSuspect(app, row, id) {
  const s = app.db.prepare('SELECT * FROM police_suspects WHERE id=?').get(Number(id)); if (!s || s.city_id !== row.city_id) bad('NO_SUSPECT', 'No such suspect.', 404);
  if (s.caught_by) { const n = app.db.prepare('SELECT username FROM users WHERE id=?').get(s.caught_by)?.username; bad('ALREADY_CAUGHT', `Suspect already caught by @${n}.`, 409, { by: n }); }
  if (s.expires_at <= app.clock.now()) bad('GOT_AWAY', 'The suspect got away.', 409);
  if (s.armed && !gunsAllowed(app, row.user_id)) bad('NO_SUSPECT', 'No such suspect.', 404);
  return s;
}
const lose = (app, s, uid) => { const n = app.db.prepare('SELECT username FROM users WHERE id=?').get(s.caught_by || 0)?.username; bad('ALREADY_CAUGHT', `Suspect already caught by @${n}.`, 409, { by: n }); };
/** cuff a suspect within arrestRange of the server's position for you. First UPDATE wins. */
export function arrest(app, uid, { suspectId } = {}) {
  const C = cfg(app); const row = patrolTick(app, uid); if (!row) bad('NO_PATROL', 'Pick up a patrol car at the Police Station first.', 409);
  const s = liveSuspect(app, row, suspectId); const p = ensurePresence(app, uid); const sp = suspectPos(app, s);
  const d = dist(p.x, p.z, sp.x, sp.z); if (d > C.arrestRange) bad('TOO_FAR', `Get closer: the suspect is ${Math.round(d)} m away.`, 409, { d: Math.round(d) });
  const r = app.db.prepare('UPDATE police_suspects SET caught_by=?, caught_at=?, caught_how=? WHERE id=? AND caught_by IS NULL').run(uid, app.clock.now(), 'arrest', s.id);
  if (r.changes !== 1) lose(app, app.db.prepare('SELECT * FROM police_suspects WHERE id=?').get(s.id), uid);
  return credit(app, uid, row, s, 'arrest');
}
/** a service-weapon shot at a suspect (never a player). Range + fire rate + ammo checked here. At 0 hp the suspect falls and surrenders: a takedown. */
export function shoot(app, uid, { suspectId } = {}) {
  const C = cfg(app); const row = patrolTick(app, uid); if (!row) bad('NO_PATROL', 'Your patrol is over.', 409);
  if (!gunsAllowed(app, uid)) bad('GUNS_RESTRICTED', 'Guns are not available on this account. Arrest suspects instead.', 403);
  const p = ensurePresence(app, uid); const now = app.clock.now();
  if (now - (p.lastShotAt || 0) < C.fireIntervalMs) bad('FIRE_RATE', 'Too fast. Steady your aim.', 429);
  if (row.ammo <= 0) bad('NO_AMMO', 'Out of rounds. Arrest them by hand.', 409);
  const s = liveSuspect(app, row, suspectId); const sp = suspectPos(app, s);
  p.lastShotAt = now; app.db.prepare('UPDATE police_patrols SET ammo=ammo-1 WHERE id=? AND ammo>0').run(row.id);
  const d = dist(p.x, p.z, sp.x, sp.z); if (d > C.gunRange) return { ok: true, hit: false, text: `Missed: out of range (${Math.round(d)} m).`, patrol: patrolView(app, uid) };
  const hr = app.db.prepare('UPDATE police_suspects SET hp=hp-1 WHERE id=? AND caught_by IS NULL AND hp>0').run(s.id);
  if (hr.changes !== 1) lose(app, app.db.prepare('SELECT * FROM police_suspects WHERE id=?').get(s.id), uid);
  const r = app.db.prepare('UPDATE police_suspects SET caught_by=?, caught_at=?, caught_how=? WHERE id=? AND caught_by IS NULL AND hp<=0').run(uid, now, 'takedown', s.id);
  if (r.changes !== 1) { const left = app.db.prepare('SELECT hp FROM police_suspects WHERE id=?').get(s.id).hp; return { ok: true, hit: true, damage: C.policeGunDamage, hitsLeft: left, text: `Hit! ${left} more to stop them.`, patrol: patrolView(app, uid) }; }
  return { ...credit(app, uid, row, s, 'takedown'), hit: true, damage: C.policeGunDamage, hitsLeft: 0 };
}
