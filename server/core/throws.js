// Throwing a ball (Track G item 5). The thrower says where they face and how hard; the SERVER fixes the start (from its own record of where the player is), runs the same pure flight the clients draw
// (server/core/physx.js), decides whether it bonks someone, and keeps the throw for a few seconds so nearby players' heartbeats show it. A bonk is harmless: no money, no damage, a stagger and a note.
// Nothing here touches the ledger and nothing is stored in the database (live throws are in memory; they are gone after a restart, which is fine).
import { bad } from './util.js';
import { ensurePresence, syncPos } from './world.js';
import { hiddenFrom } from './safety.js';
import { notify } from './economy.js';
import { assertNotFlying } from './flight.js';
import { assertNotAboard } from './boat.js';
import { cfgOf, throwStart, simulateThrow, findHit } from './physx.js';

const state = (app) => (app.throws ||= { seq: 0, live: [], lastBy: new Map(), perMin: new Map(), victimAt: new Map() });
const dist = (ax, az, bx, bz) => Math.hypot(ax - bx, az - bz);

export function throwBall(app, uid, body) {
  const X = cfgOf(app); const C = X.throw; if (!C.enabled) bad('THROW_OFF', 'Throwing is switched off right now.', 403);
  const now = app.clock.now(); const S = state(app);
  if (body && Number.isFinite(body.x) && Number.isFinite(body.z)) syncPos(app, uid, body); // your position goes through the same speed clamp as everything else
  assertNotFlying(app, uid); assertNotAboard(app, uid);
  const p = ensurePresence(app, uid); if (p.mode === 'drive') bad('IN_CAR', 'You cannot throw from a car.'); if (p.venue) bad('INSIDE', 'Not in here. Take it outside.');
  const yaw = Number(body?.yaw), power = Number(body?.power); if (!Number.isFinite(yaw) || !Number.isFinite(power)) bad('BAD_THROW', 'A throw needs a direction (yaw) and power 0..1.');
  const last = S.lastBy.get(uid) || 0; if (now - last < C.cooldownMs) bad('TOO_FAST', 'Easy. Wait a second before the next throw.', 429);
  const win = (S.perMin.get(uid) || []).filter(t => now - t < 60000); if (win.length >= C.perMinute) bad('RATE_LIMIT', 'That is a lot of throwing. Give it a minute.', 429);
  win.push(now); S.perMin.set(uid, win); S.lastBy.set(uid, now);
  const start = throwStart(p.x, p.z, yaw, Math.max(0, Math.min(1, power)), C); const flight = simulateThrow(start, C, 0.05);
  // who could it hit: players in this city near the start, not hidden either way, not bonked recently
  const hideT = hiddenFrom(app, uid); const targets = []; const cutoff = now - app.balance.heartbeat.activeWindowMs;
  for (const o of app.world.players.values()) { if (o.id === uid || o.city !== p.city || o.lastSeen < cutoff || o.mode === 'drive' || o.venue) continue; if (dist(o.x, o.z, p.x, p.z) > C.maxSpeed * C.maxFlightSec) continue; if (hideT.has(o.id) || hiddenFrom(app, o.id).has(uid)) continue; if (now - (S.victimAt.get(o.id) || 0) < C.victimCooldownMs) continue; targets.push({ id: o.id, x: o.x, z: o.z }); }
  const hit = findHit(flight, targets, C);
  const t = { id: ++S.seq, by: uid, name: p.name, city: p.city, at: now, ...start }; delete t.speed; if (hit) t.hit = hit.id; S.live.push(t); while (S.live.length > C.maxLive * 8) S.live.shift();
  let hitName = null;
  if (hit) { const v = app.world.players.get(hit.id); S.victimAt.set(hit.id, now); hitName = v.name; v.bonk = { by: p.name, at: now, dx: Math.cos(yaw), dz: -Math.sin(yaw) }; notify(app, hit.id, 'bonk', `@${p.name} bonked you with a ball. No harm done.`); }
  return { ok: true, id: t.id, start: { x: start.x, y: start.y, z: start.z, vx: start.vx, vy: start.vy, vz: start.vz }, hit: hitName, landsAtMs: Math.round(flight[flight.length - 1].t * 1000), text: hitName ? `You bonked @${hitName}!` : 'Nice throw.' };
}

/** live throws a player near (x,z) in `city` should draw: compact rows, and old ones are dropped */
export function throwsNear(app, city, x, z, hidden) {
  const S = app.throws; if (!S) return undefined; const C = cfgOf(app).throw; const now = app.clock.now(); S.live = S.live.filter(t => now - t.at < C.visibleSec * 1000); const out = [];
  for (const t of S.live) { if (t.city !== city || hidden?.has(t.by) || dist(t.x, t.z, x, z) > C.nearRadius + 40) continue; out.push({ id: t.id, by: t.by, n: t.name, age: now - t.at, x: +t.x.toFixed(2), y: +t.y.toFixed(2), z: +t.z.toFixed(2), vx: +t.vx.toFixed(3), vy: +t.vy.toFixed(3), vz: +t.vz.toFixed(3) }); }
  return out.length ? out.slice(-C.maxLive) : undefined;
}
/** a pending bonk for this player, handed over once with the heartbeat */
export function takeBonk(app, uid) { const p = app.world.players.get(uid); if (!p?.bonk) return undefined; const b = p.bonk; p.bonk = undefined; return { by: b.by, dx: b.dx, dz: b.dz }; }
