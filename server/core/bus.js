// Bus stops: a player at a stop can call a danfo. The server sets the wait (ESTIMATE, longer in rush hour), the client draws the danfo driving in, and after the wait the player
// can board; the ride and fare are the normal server travel flow (mode danfo, game money through the ledger). No money moves in call or board.
import { bad } from './util.js';
import { ensurePresence } from './world.js';
import { isRush } from './social.js';

const calls = (app) => (app.world.busCalls ||= new Map());
const hash = (n) => { let x = Math.imul(n ^ 0x2f1b5d3b, 0x85ebca6b); x ^= x >>> 13; x = Math.imul(x, 0xc2b2ae35); x ^= x >>> 16; return (x >>> 0) / 4294967296; };
const stopOf = (app, id) => (app.city.busStops || []).find(b => b.id === id) || null;
export function call(app, uid, stopId) {
  const B = app.balance.bus; if (!B.enabled) bad('OFF', 'Bus calls are switched off.', 409); const b = stopOf(app, stopId); if (!b) bad('NO_STOP', 'No such bus stop.', 404);
  const p = ensurePresence(app, uid); if (p.mode === 'drive') bad('DRIVING', 'Park your car first, then wait at the stop.', 409);
  if (Math.hypot(p.x - b.x, p.z - b.z) > B.rangeM) bad('TOO_FAR', 'Walk to the bus stop first.', 409, { x: b.x, z: b.z });
  const now = app.clock.now(); if (!app.limiter.hit(`buscall:${uid}`, B.callsPerMin, 60000, now)) bad('RATE_LIMIT', 'Easy: one danfo at a time.', 429);
  const rush = isRush(app, now); const n = (app.world.busSeq = (app.world.busSeq || 0) + 1); const waitMs = Math.round((B.waitMinMs + hash(uid * 31 + n) * (B.waitMaxMs - B.waitMinMs)) * (rush ? B.rushMult : 1));
  calls(app).set(uid, { stopId, readyAt: now + waitMs, expiresAt: now + waitMs + B.callExpireMs }); return { ok: true, stopId, waitMs, readyAt: now + waitMs, rush, loop: b.loop, estimate: true, text: rush ? 'Rush hour: the danfo go take small time.' : 'Danfo dey come.' };
}
export function board(app, uid, stopId) {
  const B = app.balance.bus; const c = calls(app).get(uid); const now = app.clock.now(); if (!c || c.stopId !== stopId || now > c.expiresAt) { calls(app).delete(uid); bad('NO_CALL', 'Call a danfo at the stop first.', 409); }
  if (now < c.readyAt - 500) bad('NOT_YET', 'Your danfo never reach yet.', 409, { waitMs: c.readyAt - now });
  const b = stopOf(app, stopId); const p = ensurePresence(app, uid); if (Math.hypot(p.x - b.x, p.z - b.z) > B.rangeM + 4) bad('TOO_FAR', 'Stay near the stop to board.', 409);
  calls(app).delete(uid); return { ok: true, stopId, text: 'You are on the danfo. Pick where you dey go.' };
}
export function cancel(app, uid) { calls(app).delete(uid); return { ok: true }; }
