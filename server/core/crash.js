// Crash rules, player health and the clinic (10 Oct 2026). All numbers live in balance.crash and are placeholder ESTIMATES.
// How it works: traffic is drawn on each player's own device, so the CLIENT reports "a car is about to yield to me" (roll). The SERVER decides, with a seeded
// RNG that the client cannot see, whether this encounter is a hit (about 5 %), after safe-zone, cooldown, grace and rate checks. A hit returns a one-use token;
// only when the car really reaches the player does the client confirm (impact) and the server applies health loss, car damage and any charge through the ledger.
// Ambient cars are never charged. Only a real player's own active car is damaged and charged. At zero health you wake up at the clinic: no account loss.
import { cityOf } from './cities.js';
import { createHash, randomBytes } from 'node:crypto';
import { bad } from './util.js';
import { getState, refreshNeeds, notify, addMood } from './economy.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { ensurePresence, teleport } from './world.js';
import { applyBodyDamage, mekoRepair, carStateOf } from './meko.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
/** deterministic number in [0,1) from the secret seed, the player and a counter */
export function rand01(seed, uid, seq, salt = '') { const h = createHash('sha256').update(`${seed}|${uid}|${seq}|${salt}`).digest(); return (h.readUIntBE(0, 6)) / 2 ** 48; }
const seedOf = (app) => app.balance.crash.seed || (app.crashSeed ||= randomBytes(16).toString('hex'));
const between = (r, lo, hi) => lo + Math.round((hi - lo) * r);

/** circles where nobody is ever hit: junctions and roundabouts (crossings), the plaza, doorways of venues/shops/homes, spawn points, the clinic */
export function safeZones(app, city = app.city) {
  if (city._safe) return city._safe; const c = city, S = app.balance.crash.safe, out = []; const roads = c.roads || [];
  const pts = (r) => r.pts || [[r.x1, r.z1], [r.x2, r.z2]];
  const seg = (a, b, c2, d) => { const r = [b[0] - a[0], b[1] - a[1]], s = [d[0] - c2[0], d[1] - c2[1]]; const den = r[0] * s[1] - r[1] * s[0]; if (Math.abs(den) < 1e-9) return null; const q = [c2[0] - a[0], c2[1] - a[1]]; const t = (q[0] * s[1] - q[1] * s[0]) / den, u = (q[0] * r[1] - q[1] * r[0]) / den; return t < 0 || t > 1 || u < 0 || u > 1 ? null : [a[0] + r[0] * t, a[1] + r[1] * t]; };
  for (let i = 0; i < roads.length; i++) for (let j = i + 1; j < roads.length; j++) { const A = pts(roads[i]), B = pts(roads[j]); for (let a = 1; a < A.length; a++) for (let b = 1; b < B.length; b++) { const x = seg(A[a - 1], A[a], B[b - 1], B[b]); if (x) out.push({ x: x[0], z: x[1], r: Math.max(roads[i].width, roads[j].width) / 2 + S.junctionExtra, why: 'crossing' }); } }
  for (const o of c.roundabouts || []) out.push({ x: o.x, z: o.z, r: o.outerR + S.junctionExtra, why: 'roundabout' });
  for (const l of c.landmarks || []) if (l.kind === 'plaza') out.push({ x: l.x, z: l.z, r: 14 + S.plazaExtra, why: 'plaza' });
  for (const pl of c.places || []) out.push({ x: pl.x, z: pl.z, r: S.doorRadius, why: 'doorway' });
  for (const pr of c.properties || []) if (pr.door) out.push({ x: pr.door.x, z: pr.door.z, r: S.doorRadius, why: 'doorway' });
  for (const sp of c.spawns || []) out.push({ x: sp.x, z: sp.z, r: S.spawnRadius, why: 'spawn' });
  const cl = clinicPlace(app, city); if (cl) out.push({ x: cl.x, z: cl.z, r: S.clinicRadius, why: 'clinic' });
  return (city._safe = out);
}
export const safeReason = (app, x, z, city = app.city) => { for (const s of safeZones(app, city)) if (Math.hypot(x - s.x, z - s.z) < s.r) return s.why; return null; };
export const clinicPlace = (app, city = app.city) => (city.places || []).find(p => p.id === 'clinic') || null;

/** player health with natural recovery (lazy, like needs) */
export function healthOf(app, uid) {
  const C = app.balance.crash, s = getState(app, uid); const now = app.clock.now(); const at = s.health_at || now; const mins = Math.max(0, (now - at) / 60000);
  const h = clamp((s.health ?? C.maxHealth) + mins * C.regenPerMin, 0, C.maxHealth); return { health: h, at: now, cooldownUntil: s.crash_cd_until || 0, st: s };
}
const setHealth = (app, uid, h) => app.db.prepare('UPDATE player_state SET health=?, health_at=? WHERE user_id=?').run(clamp(h, 0, app.balance.crash.maxHealth), app.clock.now(), uid);
export const healthView = (app, uid) => { const { health, cooldownUntil } = healthOf(app, uid); return { health: Math.round(health * 10) / 10, max: app.balance.crash.maxHealth, hurt: health < 40, cooldownUntil }; };
const activeCar = (app, uid) => app.db.prepare('SELECT * FROM player_cars WHERE user_id=? AND active=1').get(uid);
const log = (app, row) => app.db.prepare('INSERT INTO crash_events(user_id,at,token,state,hit,reason,roll,vtype,mode,x,z,expires_at) VALUES (@user_id,@at,@token,@state,@hit,@reason,@roll,@vtype,@mode,@x,@z,@expires_at)').run(Object.fromEntries(Object.entries({ token: null, hit: 0, reason: null, roll: null, vtype: null, mode: null, x: null, z: null, expires_at: null, ...row }).map(([k, v]) => [k, v === undefined ? null : typeof v === 'object' && v !== null ? String(v) : v]))); // one demo run (sql.js) once failed with an unbound object here and could not be reproduced: values are coerced to plain types

/** step 1: the client says a vehicle is about to yield to the player. Returns whether this encounter is a hit (token) and why not otherwise. */
export function roll(app, uid, body = {}) {
  const C = app.balance.crash; if (!C.enabled) return { hit: false, reason: 'off' }; const now = app.clock.now();
  const st = getState(app, uid); const p = ensurePresence(app, uid); const hv = healthOf(app, uid);
  if (now - (st.crash_roll_at || 0) < C.rollMinMs) return { hit: false, reason: 'wait' };
  app.db.prepare('UPDATE player_state SET crash_roll_at=? WHERE user_id=?').run(now, uid);
  const seq = app.db.prepare('SELECT COUNT(*) n FROM crash_events WHERE user_id=?').get(uid).n; const r = rand01(seedOf(app), uid, seq);
  const vtype = ['car', 'danfo', 'keke', 'okada'].includes(body.vtype) ? body.vtype : 'car'; const speed = Number(body.speed) || 0; const mode = st.mode === 'drive' ? 'drive' : 'walk';
  const row = { user_id: uid, at: now, roll: r, vtype, mode, x: st.x, z: st.z };
  const no = (reason) => { log(app, { ...row, state: reason }); return { hit: false, reason }; };
  const u = app.db.prepare('SELECT created_at FROM users WHERE id=?').get(uid);
  if (p.venue) return no('inside');
  if (now - (u?.created_at || 0) < C.graceMs) return no('grace'); if (hv.health <= 0) return no('down'); if (now < (st.crash_cd_until || 0)) return no('cooldown');
  if (speed < C.minSpeed) return no('slow'); const sz = safeReason(app, st.x, st.z, cityOf(app, uid)); if (sz) return no('safe:' + sz);
  if (r >= C.hitChance) return no('miss');
  const token = randomBytes(9).toString('hex'); log(app, { ...row, state: 'pending', hit: 1, token, expires_at: now + C.tokenMs }); return { hit: true, token, ttlMs: C.tokenMs };
}

/** step 2: the car really reached the player. Applies health loss, car damage and the crash cost (real player's own car only), cooldown, and the clinic rule at zero health. */
export function impact(app, uid, body = {}) {
  const C = app.balance.crash; const now = app.clock.now(); const ev = app.db.prepare("SELECT * FROM crash_events WHERE user_id=? AND token=? AND state='pending'").get(uid, String(body.token || ''));
  if (!ev) bad('NO_CRASH', 'No crash to confirm.', 404); if (now > ev.expires_at) { app.db.prepare("UPDATE crash_events SET state='expired' WHERE id=?").run(ev.id); bad('CRASH_EXPIRED', 'Too late to confirm that one.', 409); }
  return app.db.transaction(() => {
    const st = getState(app, uid); const drive = st.mode === 'drive'; const own = drive ? activeCar(app, uid) : null; const seq = ev.id;
    const dmg = drive ? between(rand01(seedOf(app), uid, seq, 'dmg'), C.driving.min, C.driving.max) : between(rand01(seedOf(app), uid, seq, 'dmg'), C.onFoot.min, C.onFoot.max);
    let carDamage = 0, fee = 0, waived = 0, carHealth = null, smoke = false, wrecked = false;
    if (own) {
      const raw = between(rand01(seedOf(app), uid, seq, 'car'), C.car.min, C.car.max);
      const br = applyBodyDamage(app, uid, own, raw, st.x, st.z, st.ry);
      carDamage = br.damage; carHealth = br.carHealth; smoke = br.smoke; wrecked = br.wrecked;
      const due = carDamage * C.feePerCarPoint, cash = balanceOf(app.db, cashId(uid)); fee = Math.min(due, cash); waived = due - fee; if (fee > 0) move(app, { from: cashId(uid), to: SYS.SINK_CARS, amount: fee, reason: 'crash_damage', ref: String(ev.id), userId: uid, idemKey: `crash:${ev.id}` });
    }
    const hv = healthOf(app, uid); let health = clamp(hv.health - dmg, 0, C.maxHealth); let ko = false, pos = null, clinicFee = 0;
    if (health <= 0) { ko = true; health = C.clinic.koHealth; const cl = clinicPlace(app, cityOf(app, uid)); if (cl) { teleport(app, uid, cl.x, cl.z); pos = { x: cl.x, z: cl.z }; }
      const cash = balanceOf(app.db, cashId(uid)); clinicFee = Math.min(C.clinic.koFee, cash); if (clinicFee > 0) move(app, { from: cashId(uid), to: SYS.SINK_FEES, amount: clinicFee, reason: 'clinic_fee', ref: `ko:${ev.id}`, userId: uid, idemKey: `ko:${ev.id}` }); addMood(app, uid, -C.clinic.koMood); }
    setHealth(app, uid, health); app.db.prepare('UPDATE player_state SET crash_cd_until=? WHERE user_id=?').run(now + C.cooldownMs, uid);
    app.db.prepare("UPDATE crash_events SET state=?, damage=?, car_id=?, car_damage=?, fee=? WHERE id=?").run(ko ? 'ko' : 'confirmed', dmg, own?.id ?? null, carDamage, fee + clinicFee, ev.id);
    const text = ko ? 'You collapsed. Good people carried you to the Community Clinic. You are okay, but rest small.'
      : wrecked ? `A ${ev.vtype} wrecked your car. Call a tow to Motoka Meko.`
      : own ? `A ${ev.vtype} bumped your car. Health -${dmg}${carDamage ? `, car -${carDamage}` : ''}${smoke ? ' · smoking' : ''}.`
      : `A ${ev.vtype} knocked you! Health -${dmg}. Watch the road.`;
    return { ok: true, hit: true, ko, damage: dmg, health, maxHealth: C.maxHealth, carDamage, carHealth, smoke, wrecked, fee, waived, clinicFee, cash: balanceOf(app.db, cashId(uid)), pos, cooldownUntil: now + C.cooldownMs, text };
  })();
}

/** Community Clinic: treatment restores full health for a small fee (per missing point) */
export function treat(app, uid, idemKey) {
  const C = app.balance.crash; const cl = clinicPlace(app, cityOf(app, uid)); if (!cl) bad('NO_CLINIC', 'There is no clinic here.', 404);
  const st = getState(app, uid); if (Math.hypot(st.x - cl.x, st.z - cl.z) > C.clinic.radius) bad('TOO_FAR', 'Go to the Community Clinic first.', 409);
  const hv = healthOf(app, uid); const missing = Math.ceil(C.maxHealth - hv.health); if (missing < 2) bad('FINE', 'The nurse says you are fine. No need to pay.', 409);
  return app.db.transaction(() => { const fee = Math.max(C.clinic.minFee, missing * C.clinic.feePerPoint); const cash = balanceOf(app.db, cashId(uid)); if (cash < fee) bad('NO_FUNDS', `Treatment costs about ₦${fee}. You can also rest: health comes back slowly by itself.`, 402, { fee });
    move(app, { from: cashId(uid), to: SYS.SINK_FEES, amount: fee, reason: 'clinic_treatment', ref: 'clinic', userId: uid, idemKey: idemKey ? `clinic:${uid}:${idemKey}` : null }); setHealth(app, uid, C.maxHealth); const mood = addMood(app, uid, 2);
    return { ok: true, fee, health: C.maxHealth, mood, cash: balanceOf(app.db, cashId(uid)), text: 'Nurse don treat you. You dey strong again.' }; })();
}
export const clinicInfo = (app, uid) => { const C = app.balance.crash; const cl = clinicPlace(app, cityOf(app, uid)); const hv = healthView(app, uid); const missing = Math.ceil(C.maxHealth - hv.health); return { name: cl?.name || 'Community Clinic', health: hv.health, max: hv.max, fee: missing < 2 ? 0 : Math.max(C.clinic.minFee, missing * C.clinic.feePerPoint), estimate: true, regenPerMin: C.regenPerMin }; };
/** Motoka Meko (or classic Meco) repair of crash damage */
export function repair(app, uid, idemKey) { return mekoRepair(app, uid, idemKey); }

/** Client reports a hard bump while driving an owned car. Builds toward smoke → wreck. */
export function collide(app, uid, body = {}) {
  const C = app.balance.crash; if (!C.enabled) return { ok: true, damage: 0, reason: 'off' };
  const now = app.clock.now(); const p = ensurePresence(app, uid);
  if (p.mode !== 'drive') bad('NOT_DRIVING', 'You are not driving.', 409);
  if (p.venue) bad('INSIDE', 'Not on the road.', 409);
  const own = activeCar(app, uid); if (!own) return { ok: true, damage: 0, reason: 'borrowed' };
  if (own.wrecked || (own.damage || 0) >= (C.wreckAt ?? 100)) bad('WRECKED', 'Your car is wrecked. Call a tow to Motoka Meko.', 409);
  const impact = Number(body.impact) || 0; const Col = C.collide || {};
  if (impact < (Col.minImpact ?? 5)) return { ok: true, damage: 0, reason: 'soft' };
  if (!app.limiter.hit(`collide:${uid}`, Col.perMin ?? 36, 60000, now)) return { ok: true, damage: 0, reason: 'rate' };
  const last = p.collideAt || 0; if (now - last < (Col.minMs ?? 450)) return { ok: true, damage: 0, reason: 'wait' };
  p.collideAt = now;
  const pts = Math.min(Col.maxPerHit ?? 14, Math.max(1, Math.round(impact * (Col.pointsPerMs ?? 0.55))));
  const r = applyBodyDamage(app, uid, own, pts, p.x, p.z, p.ry);
  const st = carStateOf(app, { ...own, damage: (own.damage || 0) + r.damage, wrecked: r.wrecked ? 1 : 0 });
  const wasSmoke = (own.damage || 0) >= (C.smokeAt ?? 55);
  const text = r.justWrecked ? '💥 Car don wreck! Call a tow truck to Motoka Meko.' : (!wasSmoke && r.smoke) ? `💨 Engine dey smoke. Car health ${st.health}.` : r.damage ? `💥 Bump — car health ${st.health}.` : null;
  return { ok: true, ...r, health: st.health, smoke: st.smoke, repairFee: st.repairFee, text };
}

void refreshNeeds;
