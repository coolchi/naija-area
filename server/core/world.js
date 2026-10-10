// Presence + heartbeat. Plain-HTTP polling: client posts its movement trail + ad-view evidence, server answers with nearby
// players' trails, state, world time, notifications and the recommended next interval (load adaptive).
import { tick as flightTick, mini as flightMini } from './flight.js';
import { tick as boatTick, mini as boatMini } from './boat.js';
import { bad, clamp, cleanText } from './util.js';
import { screen } from './filter.js';
import { hiddenFrom, chatMuted } from './safety.js';
import { dist, getState, refreshNeeds, notify, gameTime, profile, activeShift, jobsFor } from './economy.js';
import { processEvidence, adsSnapshot } from './ads.js';
import { knockState } from './social.js';
import { myMatchView } from './games.js';
import { venueTick } from './venues.js';
import { parkedActive } from './parking.js';
import { wearIds } from './wearables.js';
import { titleOf } from './achievements.js';
import * as guardian from './guardian.js';

export function createWorld() { return { players: new Map(), chatSeq: 0 }; }

export function recommendedInterval(app, ccu) {
  for (const s of app.balance.heartbeat.ladder) if (ccu <= s.maxCcu) return s.ms;
  return 45000;
}
export function ccuNow(app) {
  const cut = app.clock.now() - app.balance.heartbeat.activeWindowMs; let n = 0;
  for (const p of app.world.players.values()) if (p.lastSeen >= cut) n++; return n;
}
function inBounds(city, x, z) { const b = city.bounds; return x >= b.minX && x <= b.maxX && z >= b.minZ && z <= b.maxZ; }

export function ensurePresence(app, uid) {
  let p = app.world.players.get(uid);
  if (!p) { const u = app.db.prepare('SELECT username,color,is_bot,is_guest FROM users WHERE id=?').get(uid); const st = getState(app, uid);
    p = { id: uid, city: app.cities[st.city_id] ? st.city_id : app.defaultCityId, name: u.username, color: u.color, isBot: !!u.is_bot, isGuest: !!u.is_guest, x: st.x, z: st.z, ry: st.ry, mode: st.mode, trail: [], lastSeen: app.clock.now(), lastPersist: 0, headless: false, chatSince: app.world.chatSeq }; app.world.players.set(uid, p); }
  return p;
}
/** actions carry the client's current position; it goes through the same speed clamp as the trail */
export function syncPos(app, uid, pos) {
  if (!pos || !Number.isFinite(pos.x) || !Number.isFinite(pos.z)) return;
  const p = ensurePresence(app, uid); applyTrail(app, p, [{ a: 0, x: pos.x, z: pos.z, ry: Number.isFinite(pos.ry) ? pos.ry : p.ry }], app.clock.now());
}
/** DEV/TEST ONLY: authoritative teleport (used by tests, bots, and the e2e smoke test; route enabled only with NA_DEV=1) */
export function teleport(app, uid, x, z) {
  const p = ensurePresence(app, uid); p.x = x; p.z = z; p.trail = [{ t: app.clock.now(), x, z, ry: p.ry }]; p.force = { x, z };
  app.db.prepare('UPDATE player_state SET x=?,z=? WHERE user_id=?').run(x, z, uid);
}
/** apply client movement trail with server-side sanity: speed clamp, bounds clamp */
function applyTrail(app, p, trail, now) {
  const mv = app.balance.movement; const out = [];
  let last = p.trail.length ? p.trail[p.trail.length - 1] : { t: now - 1000, x: p.x, z: p.z, ry: p.ry };
  const sorted = (Array.isArray(trail) ? trail : []).slice(-80).filter(s => s && Number.isFinite(s.a) && Number.isFinite(s.x) && Number.isFinite(s.z)).map(s => ({ t: now - clamp(s.a, 0, 120000), x: s.x, z: s.z, ry: Number.isFinite(s.ry) ? s.ry : 0 })).sort((a, b) => a.t - b.t);
  let clampedCount = 0;
  for (const s of sorted) {
    if (s.t <= last.t) continue;
    const dt = Math.max(0.05, (s.t - last.t) / 1000); const maxSpeed = (p.mode === 'drive' ? mv.maxDriveSpeed : mv.maxWalkSpeed) * mv.slack;
    let { x, z } = s; const d = dist(x, z, last.x, last.z);
    if (d > maxSpeed * dt) { const k = (maxSpeed * dt) / d; x = last.x + (x - last.x) * k; z = last.z + (z - last.z) * k; clampedCount++; }
    const b = (app.cities[p.city] || app.city).bounds; x = clamp(x, b.minX, b.maxX); z = clamp(z, b.minZ, b.maxZ);
    const ns = { t: s.t, x: +x.toFixed(2), z: +z.toFixed(2), ry: +s.ry.toFixed(3) }; out.push(ns); last = ns;
  }
  if (out.length) { p.trail.push(...out); const keep = 120; if (p.trail.length > keep) p.trail.splice(0, p.trail.length - keep); const l = out[out.length - 1]; p.x = l.x; p.z = l.z; p.ry = l.ry; }
  p.suspicious = (p.suspicious || 0) + clampedCount; return clampedCount;
}

export function heartbeat(app, uid, body, meta = {}) {
  const now = app.clock.now(); const w = app.world;
  const userRow = app.db.prepare('SELECT username,color,is_bot,is_guest FROM users WHERE id=?').get(uid);
  if (!userRow) bad('NO_PLAYER', 'Unknown player', 401);
  const p = ensurePresence(app, uid);
  p.lastSeen = now; p.headless = !!meta.headless; guardian.tickPlay(app, uid);
  if (body.mode === 'walk' || body.mode === 'drive') { if (body.mode === 'drive' && p.mode !== 'drive' && parkedActive(app, uid)) { /* your car is parked: it cannot be driven from elsewhere */ } else p.mode = body.mode; }
  if (typeof body.activity === 'string') p.activity = cleanText(body.activity, 24);
  const fl = flightTick(app, uid); const bt = boatTick(app, uid); const flying = fl?.state === 'flying' || bt?.state === 'crossing';
  const stale = typeof body.city === 'string' && body.city !== p.city; // the client is still in the old city (it reloads on this response): its trail and evidence do not count here
  if (!stale && !flying) applyTrail(app, p, body.trail, now); venueTick(app, p);
  if (now - p.lastPersist > 30000) { app.db.prepare('UPDATE player_state SET x=?,z=?,ry=?,mode=?,updated_at=? WHERE user_id=?').run(p.x, p.z, p.ry, p.mode, now, uid); app.db.prepare('UPDATE users SET last_seen=? WHERE id=?').run(now, uid); p.lastPersist = now; }
  // ad evidence (validated server-side; client sends evidence, never counts)
  let adResult = null;
  if (!stale && !flying && Array.isArray(body.evidence) && body.evidence.length) adResult = processEvidence(app, p, body.evidence.slice(0, 40), now);
  // other players near me
  const hb = app.balance.heartbeat; const since = Number.isFinite(body.since) ? body.since : 0; const cutoff = now - hb.activeWindowMs;
  const cand = [];
  const hidden = hiddenFrom(app, uid);
  for (const o of w.players.values()) { if (o.id === uid || o.city !== p.city || o.lastSeen < cutoff || hidden.has(o.id)) continue; const d = dist(o.x, o.z, p.x, p.z); if (d <= hb.nearbyRadius) cand.push([d, o]); }
  cand.sort((a, b) => a[0] - b[0]);
  const players = cand.slice(0, hb.maxNearby).map(([, o]) => {
    // downsample trail to ~1 sample/2s newer than `since`
    const s = []; let lastT = 0; for (const t of o.trail) { if (t.t > since - 2000 && t.t - lastT >= 1800) { s.push([Math.round(t.t - now), t.x, t.z, t.ry]); lastT = t.t; } }
    if (!s.length) s.push([0, o.x, o.z, o.ry]);
    const w = wearIds(app, o); const tt = o.isBot ? '' : titleOf(app, o.id); return { id: o.id, n: o.name, c: o.color, m: o.mode === 'drive' ? 1 : 0, act: o.activity || '', ...(w.length ? { w } : {}), ...(tt ? { t: tt } : {}), s };
  });
  const ccu = ccuNow(app); const interval = recommendedInterval(app, ccu);
  // notifications since last id
  const nSince = Number.isFinite(body.notifSince) ? body.notifSince : 0;
  const notifs = app.db.prepare('SELECT id,kind,text,created_at FROM notifications WHERE user_id=? AND id>? ORDER BY id LIMIT 20').all(uid, nSince);
  // nearby chat
  const chatSince = Number.isFinite(body.chatSince) ? body.chatSince : p.chatSince;
  const seeChat = guardian.chatFeedFilter(app, uid);   // safety settings: friends only / chat off hide other players' lines
  const chat = app.db.prepare('SELECT id,user_id,username,x,z,text,created_at,city_id FROM chat_messages WHERE id>? ORDER BY id LIMIT 60').all(chatSince)
    .filter(m => m.city_id === p.city && dist(m.x, m.z, p.x, p.z) <= app.balance.chat.radius && !hidden.has(m.user_id) && (!seeChat || seeChat(m.user_id))).map(m => { const tt = titleOf(app, m.user_id); return { id: m.id, u: m.username, t: m.text, at: m.created_at, ...(tt ? { tt } : {}) }; });
  const chatMax = app.db.prepare('SELECT COALESCE(MAX(id),0) m FROM chat_messages').get().m;
  const me = profile(app, uid);
  const resp = { now, interval, ccu, city: p.city, flight: flightMini(app, uid), boat: boatMini(app, uid), shed: interval >= 20000, world: gameTime(app, now), me, players, notifs, chat, chatCursor: chatMax,
    knocks: knockState(app, uid), game: myMatchView(app, uid), venue: p.venue || null, gd: guardian.heartbeatInfo(app, uid), teleport: p.force || undefined, adsVersion: app.adsVersion, ads: body.adsVersion === app.adsVersion ? undefined : adsSnapshot(app, now, p.city), adResult };
  p.force = undefined;
  return resp;
}

export function sendChat(app, uid, text) {
  const p = app.world.players.get(uid); if (!p) bad('NOT_IN_WORLD', 'Join the world first.', 409);
  const t = cleanText(text, app.balance.chat.maxLen); if (!t) bad('EMPTY', 'Say something.');
  const now = app.clock.now(); if (p.lastChat && now - p.lastChat < app.balance.chat.minIntervalMs) bad('SLOW_DOWN', 'Slow down a little.', 429);
  const sc = screen(t); if (!sc.ok) bad(sc.code, sc.message);
  if (chatMuted(app, uid)) bad('CHAT_PAUSED', 'Chat is paused for your account for a little while.', 403);
  guardian.chatCheck(app, uid, 'public');
  const S = app.balance.safety; if (!app.limiter.hit(`chat:${uid}`, S.chatPerMin, 60000, now)) bad('RATE_LIMIT', 'Too many messages. Take a breather.', 429);
  if (p.lastText === t.toLowerCase() && now - (p.lastTextAt || 0) < S.dupWindowMs) bad('SPAM', 'You just said that.', 429);
  p.lastText = t.toLowerCase(); p.lastTextAt = now;
  p.lastChat = now;
  app.db.prepare('INSERT INTO chat_messages(user_id,username,x,z,text,created_at,city_id) VALUES (?,?,?,?,?,?,?)').run(uid, p.name, p.x, p.z, t, now, p.city);
  app.db.prepare('DELETE FROM chat_messages WHERE id < (SELECT MAX(id) FROM chat_messages) - ?').run(app.balance.chat.keep);
  return { ok: true };
}
export function leaveWorld(app, uid) {
  const p = app.world.players.get(uid); if (!p) return;
  app.db.prepare('UPDATE player_state SET x=?,z=?,ry=?,mode=?,updated_at=? WHERE user_id=?').run(p.x, p.z, p.ry, p.mode, app.clock.now(), uid);
  app.world.players.delete(uid);
}
export function pruneWorld(app) {
  const cut = app.clock.now() - 5 * 60000;
  for (const [id, p] of app.world.players) if (p.lastSeen < cut) leaveWorld(app, id);
}
