// Presence + heartbeat. Plain-HTTP polling: client posts its movement trail + ad-view evidence, server answers with nearby
// players' trails, state, world time, notifications and the recommended next interval (load adaptive).
// Live movement is separate: the browser sends its position on the websocket about 8 times a second, and the server
// pushes nearby players' latest positions back on the same socket. The heartbeat stays the full state sync.
import { tick as flightTick, mini as flightMini, isFlying } from './flight.js';
import { tick as boatTick, mini as boatMini, isAboard } from './boat.js';
import { bad, clamp, cleanText } from './util.js';
import { screen } from './filter.js';
import { hiddenFrom, chatMuted } from './safety.js';
import { dist, getState, refreshNeeds, notify, gameTime, profile, activeShift, jobsFor } from './economy.js';
import { processEvidence, adsSnapshot } from './ads.js';
import { knockState } from './social.js';
import { expireCarpool, syncPassenger, rideView, noteRadio } from './carpool.js';
import { wreckedActive, carStateOf, towStatus } from './meko.js';
import { myMatchView } from './games.js';
import { venueTick } from './venues.js';
import { policeTick } from './police.js';
import { parkedActive } from './parking.js';
import { wearIds } from './wearables.js';
import { wornIds as skinsOf } from './skins.js';
import { skinById } from '../config/skins.js';
import { clubTagOf } from './clubs.js';
import { mini as weatherMini } from './weather.js';
import { throwsNear, takeBonk } from './throws.js';
import { activeFestivals } from './events.js';
import { planesNear } from './flight.js';
import { titleOf } from './achievements.js';
import * as guardian from './guardian.js';
import { activeOf as emoteOf } from './emotes.js';
import { takenInCity } from './treasures.js';

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
    p = { id: uid, city: app.cities[st.city_id] ? st.city_id : app.defaultCityId, name: u.username, color: u.color, isBot: !!u.is_bot, isGuest: !!u.is_guest, gender: st.gender === 'female' ? 'female' : 'male', x: st.x, z: st.z, ry: st.ry, mode: st.mode, fainted: !!st.fainted, trail: [], lastSeen: app.clock.now(), lastPersist: 0, headless: false, chatSince: app.world.chatSeq }; app.world.players.set(uid, p); }
  return p;
}
/** Gender is chosen at signup. Woman is only for accounts that signed up as Woman; everyone else stays Man. */
export function setGender(app, uid, gender) {
  const g = gender === 'female' || gender === 'male' ? gender : '';
  if (!g) bad('BAD_GENDER', 'Choose male or female.');
  const st = getState(app, uid);
  const cur = st.gender === 'female' ? 'female' : 'male';
  if (g === cur) return { gender: g, text: g === 'female' ? 'Female body.' : 'Male body.' };
  if (g === 'female') bad('GENDER_LOCKED', 'Woman is only available when you sign up as Woman.', 409);
  // Switching Woman → Man is allowed (rare); Man → Woman is not.
  app.db.prepare('UPDATE player_state SET gender=? WHERE user_id=?').run(g, uid);
  const worn = app.db.prepare("SELECT skin_id FROM skins_equipped WHERE user_id=? AND slot='avatar'").get(uid);
  const d = worn && skinById[worn.skin_id];
  if (d?.gender && d.gender !== g) app.db.prepare("DELETE FROM skins_equipped WHERE user_id=? AND slot='avatar'").run(uid);
  const p = app.world?.players?.get(uid); if (p) { p.gender = g; p.skins = undefined; }
  return { gender: g, text: g === 'female' ? 'Female body.' : 'Male body.' };
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

/** one live position from the websocket. Same speed and bounds clamp as the heartbeat trail. Returns false when dropped. */
export function livePos(app, uid, body) {
  const p = app.world.players.get(uid); if (!p || !body) return false;
  const now = app.clock.now(); if (now - (p.liveAt || 0) < 100) return false;
  if (isFlying(app, uid) || isAboard(app, uid)) return false;
  if (p.carpoolDriver) { syncPassenger(app, p); p.liveAt = now; p.liveSeq = (p.liveSeq || 0) + 1; p.lastSeen = now; return true; }
  // hunger faint: stay put until a cab/friend gets you to a canteen
  if (p.fainted) { p.mode = 'walk'; p.liveAt = now; p.liveSeq = (p.liveSeq || 0) + 1; p.lastSeen = now; return true; }
  const x = Number(body.x), z = Number(body.z); if (!Number.isFinite(x) || !Number.isFinite(z)) return false;
  if (body.m === 0 || body.m === 1) { const mode = body.m === 1 ? 'drive' : 'walk'; if (!(mode === 'drive' && p.mode !== 'drive' && parkedActive(app, uid))) p.mode = mode; }
  applyTrail(app, p, [{ a: 0, x, z, ry: Number.isFinite(Number(body.ry)) ? Number(body.ry) : p.ry }], now);
  if (p.carpoolPassenger) { const pass = app.world.players.get(p.carpoolPassenger); if (pass) syncPassenger(app, pass); }
  p.liveAt = now; p.liveSeq = (p.liveSeq || 0) + 1; p.lastSeen = now; return true;
}

/** nearby players whose live position this viewer has not been sent yet. At most maxNearby, closest first. */
export function snapshotMoves(app, uid) {
  const p = app.world.players.get(uid); if (!p) return null;
  const now = app.clock.now(); const hb = app.balance.heartbeat; const cutoff = now - hb.activeWindowMs;
  if (!p.hideCache || now - p.hideCache.at > 2000) p.hideCache = { at: now, set: hiddenFrom(app, uid) };
  const hidden = p.hideCache.set; const seen = p.sentLive || (p.sentLive = new Map()); const cand = [];
  for (const o of app.world.players.values()) {
    if (o.id === uid || o.city !== p.city || o.lastSeen < cutoff || hidden.has(o.id) || !o.liveSeq || seen.get(o.id) === o.liveSeq) continue;
    const d = dist(o.x, o.z, p.x, p.z); if (d <= hb.nearbyRadius) cand.push([d, o]);
  }
  if (!cand.length) return null;
  cand.sort((a, b) => a[0] - b[0]); const out = [];
  for (const [, o] of cand.slice(0, hb.maxNearby)) { seen.set(o.id, o.liveSeq); out.push({ id: o.id, x: o.x, z: o.z, ry: o.ry, m: o.mode === 'drive' ? 1 : 0, n: o.name, c: o.color }); }
  return out;
}

function carBody(app, o, now) {
  if (o.carBody && now - (o.carBodyAt || 0) < 8000) return o.carBody;
  const row = app.db.prepare('SELECT model FROM player_cars WHERE user_id=? AND active=1').get(o.id);
  o.carBody = app.balance.cars.models[row?.model]?.body || 'hatch'; o.carBodyAt = now; return o.carBody;
}
export function heartbeat(app, uid, body, meta = {}) {
  const now = app.clock.now(); const w = app.world;
  const userRow = app.db.prepare('SELECT username,color,is_bot,is_guest FROM users WHERE id=?').get(uid);
  if (!userRow) bad('NO_PLAYER', 'Unknown player', 401);
  const p = ensurePresence(app, uid);
  p.lastSeen = now; p.headless = !!meta.headless; guardian.tickPlay(app, uid);
  refreshNeeds(app, uid); // decay hunger; may mark fainted before we accept movement
  const modeBefore = p.mode;
  if (body.mode === 'walk' || body.mode === 'drive') {
    if (body.mode === 'drive' && wreckedActive(app, uid)) { /* wrecked: only a tow truck moves the car */ }
    else if (body.mode === 'drive' && p.mode !== 'drive' && parkedActive(app, uid)) { /* your car is parked: it cannot be driven from elsewhere */ }
    else if (!p.carpoolDriver) p.mode = body.mode;
  }
  if (p.mode === 'drive') p.driveAt = now; // when the player was last in a car (the ad checks for radio spots, item 8)
  if (typeof body.activity === 'string') p.activity = cleanText(body.activity, 24);
  if (p.mode === 'drive') noteRadio(app, uid, body.radio);
  expireCarpool(app);
  const fl = flightTick(app, uid); const bt = boatTick(app, uid); const flying = fl?.state === 'flying' || bt?.state === 'crossing';
  const stale = typeof body.city === 'string' && body.city !== p.city; // the client is still in the old city (it reloads on this response): its trail and evidence do not count here
  if (!stale && !flying && !p.carpoolDriver && !p.fainted) applyTrail(app, p, body.trail, now);
  if (p.fainted) p.mode = 'walk';
  if (p.carpoolDriver) syncPassenger(app, p);
  venueTick(app, p);
  policeTick(app, p);
  // Persist as soon as mode changes so a reload keeps you in the car; otherwise every 30s as before.
  if (p.mode !== modeBefore || now - p.lastPersist > 30000) {
    app.db.prepare('UPDATE player_state SET x=?,z=?,ry=?,mode=?,updated_at=? WHERE user_id=?').run(p.x, p.z, p.ry, p.mode, now, uid);
    app.db.prepare('UPDATE users SET last_seen=? WHERE id=?').run(now, uid); p.lastPersist = now;
  }
  // ad evidence (validated server-side; client sends evidence, never counts)
  let adResult = null;
  if (!stale && !flying && Array.isArray(body.evidence) && body.evidence.length) adResult = processEvidence(app, p, body.evidence.slice(0, 40), now);
  // other players near me
  const hb = app.balance.heartbeat; const cutoff = now - hb.activeWindowMs;
  const cand = [];
  const hidden = hiddenFrom(app, uid);
  for (const o of w.players.values()) { if (o.id === uid || o.city !== p.city || o.lastSeen < cutoff || hidden.has(o.id)) continue; const d = dist(o.x, o.z, p.x, p.z); if (d <= hb.nearbyRadius) cand.push([d, o]); }
  cand.sort((a, b) => a[0] - b[0]);
  const players = cand.slice(0, hb.maxNearby).map(([, o]) => {
    const s = [[0, o.x, o.z, o.ry]]; // current spot only: walking is the live websocket, this poll is chat, ads and money
    const w = wearIds(app, o); const ct = clubTagOf(app, o); const sk = skinsOf(app, o); const tt = o.isBot ? '' : titleOf(app, o.id); const em = emoteOf(o, now); const bd = o.mode === 'drive' ? carBody(app, o, now) : ''; const ride = o.carpoolDriver || null; return { id: o.id, n: o.name, c: o.color, m: o.mode === 'drive' ? 1 : 0, act: o.activity || '', ...(w.length ? { w } : {}), ...(sk ? { sk } : {}), ...(ct ? { ct } : {}), ...(tt ? { t: tt } : {}), ...(em ? { e: em } : {}), ...(bd ? { bd } : {}), ...(ride ? { ride } : {}), ...(o.gender === 'female' ? { sx: 'f' } : {}), s };
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
  const resp = { now, interval, ccu, city: p.city, flight: flightMini(app, uid), boat: boatMini(app, uid), shed: interval >= 20000, world: gameTime(app, now), wx: weatherMini(app, p.city, now), fest: activeFestivals(app, now), pl: planesNear(app, p.city, p.x, p.z, now), th: throwsNear(app, p.city, p.x, p.z, hidden), bonk: takeBonk(app, uid), me, players, notifs, chat, chatCursor: chatMax,
    knocks: knockState(app, uid), carpool: rideView(app, p), tow: towStatus(app, uid).tow, game: myMatchView(app, uid), venue: p.venue || null, gd: guardian.heartbeatInfo(app, uid), teleport: p.force || undefined, adsVersion: app.adsVersion, ads: body.adsVersion === app.adsVersion ? undefined : adsSnapshot(app, now, p.city), adResult, tr: takenInCity(app, p.city) };
  const ac = app.db.prepare('SELECT * FROM player_cars WHERE user_id=? AND active=1').get(uid);
  if (ac) resp.carBody = carStateOf(app, ac);
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
  const id = Number(app.db.prepare('INSERT INTO chat_messages(user_id,username,x,z,text,created_at,city_id) VALUES (?,?,?,?,?,?,?)').run(uid, p.name, p.x, p.z, t, now, p.city).lastInsertRowid);
  app.db.prepare('DELETE FROM chat_messages WHERE id < (SELECT MAX(id) FROM chat_messages) - ?').run(app.balance.chat.keep);
  const tt = titleOf(app, uid); const msg = { type: 'chat', id, u: p.name, t, ...(tt ? { tt } : {}) };
  for (const o of app.world.players.values()) {
    if (o.city !== p.city || dist(o.x, o.z, p.x, p.z) > app.balance.chat.radius) continue;
    if (o.id !== uid && hiddenFrom(app, o.id).has(uid)) continue;
    const see = guardian.chatFeedFilter(app, o.id); if (see && !see(uid)) continue;
    app.pushUser?.(o.id, msg);
  }
  return { ok: true, id };
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
