// Hunger faint rescues: call a cab (Oya Ride) or a friend to get to a canteen / restaurant after collapsing from empty food.
import { cityOf } from './cities.js';
import { bad } from './util.js';
import { notify, refreshNeeds } from './economy.js';
import { ensurePresence } from './world.js';
import { areFriends } from './phone/phone.js';
import * as ride from './ride.js';

const rescues = (app) => (app.world.foodRescues ||= new Map());
const nameOf = (app, id) => app.db.prepare('SELECT username FROM users WHERE id=?').get(id)?.username;
const userByName = (app, name) => app.db.prepare('SELECT id, username FROM users WHERE username=?').get(String(name || '').replace(/^@/, ''));
const push = (app, uid, msg) => { try { app.pushUser?.(uid, msg); } catch { /* ignore */ } };

/** Shops / venues that sell food (hunger > 0). */
export function foodPlaces(app, uid) {
  const city = cityOf(app, uid); const out = [];
  for (const s of city.shops || []) {
    if (!(s.items || []).some((i) => (i.hunger || 0) > 0)) continue;
    const pl = city.placeById[s.id] || { id: s.id, name: s.name, x: s.x, z: s.z, type: 'shop' };
    // Prefer real canteens over market stalls (score × metres in nearestFood)
    const score = /canteen|mama\s*put|restaurant|buka|eatery/i.test(s.name) ? 0 : /suya|mart|market/i.test(s.name) ? 3 : 4;
    out.push({ placeId: pl.id, shopId: s.id, name: s.name, x: s.x, z: s.z, score });
  }
  for (const v of city.venues || []) {
    if (!v.shopId) continue; const shop = city.shopById[v.shopId]; if (!shop) continue;
    if (!(shop.items || []).some((i) => (i.hunger || 0) > 0)) continue;
    if (out.some((o) => o.shopId === v.shopId)) continue;
    const score = /canteen|mama\s*put|restaurant|buka|eatery/i.test(v.name) ? 0 : 3;
    out.push({ placeId: v.id, shopId: v.shopId, name: v.name, x: v.x, z: v.z, score });
  }
  return out;
}

export function nearestFood(app, uid) {
  const p = ensurePresence(app, uid); const list = foodPlaces(app, uid);
  if (!list.length) return null;
  list.sort((a, b) => (Math.hypot(a.x - p.x, a.z - p.z) + a.score * 40) - (Math.hypot(b.x - p.x, b.z - p.z) + b.score * 40));
  return list[0];
}

export function isFainted(app, uid) {
  const st = refreshNeeds(app, uid);
  return !!(st.fainted || st.hunger <= (app.balance.needs.faintAt ?? 1));
}

/** After arriving at food: small sip so you can stand and buy a meal. */
export function sipAtFood(app, uid) {
  const N = app.balance.needs; const st = refreshNeeds(app, uid);
  if (!st.fainted && st.hunger > (N.faintAt ?? 1) + 5) return { ok: true, sipped: false, hunger: st.hunger, energy: st.energy };
  const hunger = Math.min(100, Math.max(st.hunger, N.sipHunger ?? 15));
  const energy = Math.min(100, st.energy + (N.sipEnergy ?? 8));
  app.db.prepare('UPDATE player_state SET hunger=?, energy=?, needs_at=?, fainted=0 WHERE user_id=?').run(hunger, energy, app.clock.now(), uid);
  const p = app.world?.players?.get(uid); if (p) p.fainted = false;
  const food = nearestFood(app, uid);
  return { ok: true, sipped: true, hunger, energy, food, text: 'You made it. Buy food at the canteen to regain your strength.' };
}

export function faintStatus(app, uid) {
  const st = refreshNeeds(app, uid); const food = nearestFood(app, uid);
  const pending = [...rescues(app).values()].filter((r) => r.to === uid && r.expiresAt > app.clock.now());
  return {
    fainted: !!st.fainted, hunger: Math.round(st.hunger * 10) / 10, energy: Math.round(st.energy * 10) / 10,
    food: food && { placeId: food.placeId, shopId: food.shopId, name: food.name, x: food.x, z: food.z },
    rescues: pending.map((r) => ({ id: r.id, from: nameOf(app, r.from), expiresAt: r.expiresAt })),
  };
}

/** Call Oya Ride to the nearest canteen / food spot. */
export function rescueCab(app, uid) {
  if (!isFainted(app, uid)) bad('NOT_FAINTED', 'You are not fainted. Eat before you get that hungry.', 409);
  const food = nearestFood(app, uid); if (!food) bad('NO_FOOD', 'No canteen or restaurant in this district.', 404);
  const p = ensurePresence(app, uid); p.mode = 'walk'; p.fainted = true;
  app.db.prepare("UPDATE player_state SET mode='walk' WHERE user_id=?").run(uid);
  const r = ride.request(app, uid, food.placeId, { faintRescue: true });
  return { ...r, food: { placeId: food.placeId, shopId: food.shopId, name: food.name }, text: r.text || `Cab to ${food.name} is on the way.` };
}

/** Ask a friend to help you get to food. */
export function rescueFriendAsk(app, uid, toName) {
  if (!isFainted(app, uid)) bad('NOT_FAINTED', 'You are not fainted.', 409);
  const to = userByName(app, toName); if (!to) bad('NO_PLAYER', 'No player with that username.', 404);
  if (!areFriends(app, uid, to.id)) bad('NOT_FRIENDS', 'You can only call friends.', 403);
  if (to.id === uid) bad('SELF', 'Call someone else.', 400);
  const food = nearestFood(app, uid); if (!food) bad('NO_FOOD', 'No canteen here.', 404);
  const now = app.clock.now(); const N = app.balance.needs;
  if (!app.limiter.hit(`faintask:${uid}`, 6, 60000, now)) bad('RATE_LIMIT', 'Easy — wait a bit before calling again.', 429);
  const id = `${uid}:${to.id}:${now}`;
  const mePos = ensurePresence(app, uid);
  const row = { id, from: uid, to: to.id, food, expiresAt: now + (N.friendRescueMs || 90000) };
  rescues(app).set(id, row);
  const me = nameOf(app, uid);
  notify(app, to.id, 'needs', `@${me} fainted from hunger. Help them get to ${food.name}.`);
  push(app, to.id, { type: 'needs.food_rescue', id, from: me, food: { name: food.name, placeId: food.placeId }, x: mePos.x, z: mePos.z, expiresAt: row.expiresAt });
  return { ok: true, to: to.username, food: { name: food.name, placeId: food.placeId }, expiresAt: row.expiresAt, text: `Asked @${to.username} to help. They can send a cab for you.` };
}

/** Friend accepts: arrange a cab for the fainted player to the food place. */
export function rescueFriendAccept(app, uid, rescueId) {
  const row = rescues(app).get(String(rescueId || ''));
  if (!row || row.to !== uid) bad('NO_RESCUE', 'That help request is gone.', 404);
  if (row.expiresAt <= app.clock.now()) { rescues(app).delete(row.id); bad('EXPIRED', 'Too late — they may have found another way.', 409); }
  if (!isFainted(app, row.from)) { rescues(app).delete(row.id); bad('ALREADY_UP', 'They already ate.', 409); }
  rescues(app).delete(row.id);
  const p = ensurePresence(app, row.from); p.mode = 'walk';
  app.db.prepare("UPDATE player_state SET mode='walk' WHERE user_id=?").run(row.from);
  let rideRes = null;
  try { rideRes = ride.request(app, row.from, row.food.placeId, { faintRescue: true }); } catch { /* may already have a ride */ }
  const helper = nameOf(app, uid); const needy = nameOf(app, row.from);
  notify(app, row.from, 'needs', `@${helper} is sending a cab to take you to ${row.food.name}.`);
  push(app, row.from, { type: 'needs.food_rescue.accepted', by: helper, food: row.food, ride: rideRes?.ride || null });
  return { ok: true, text: `You sent a cab for @${needy} to ${row.food.name}.`, food: row.food, ride: rideRes?.ride || null, waypoint: { x: p.x, z: p.z, label: `@${needy} (fainted)` } };
}

export function rescueFriendDecline(app, uid, rescueId) {
  const row = rescues(app).get(String(rescueId || ''));
  if (!row || row.to !== uid) return { ok: true };
  rescues(app).delete(row.id);
  notify(app, row.from, 'needs', `@${nameOf(app, uid)} could not help right now. Call a cab or another friend.`);
  return { ok: true, text: 'Declined.' };
}
