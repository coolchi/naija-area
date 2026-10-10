// Multi-city foundation (10 Oct 2026): which city a player is in, and moving a player between cities.
// Every city is a JSON config indexed by city.js; `app.city` is the default city, `app.cities` has them all, `app.all` has by-id lookups merged over all cities.
// A player lives in exactly one city at a time (player_state.city_id). Presence, chat, ads, places, shops, venues, jobs, car parks and bus stops are scoped to it.
import { bad } from './util.js';
import { move, cashId, SYS } from './ledger.js';

export const cityIdOf = (app, uid) => {
  const p = app.world.players.get(uid); if (p?.city && app.cities[p.city]) return p.city;
  const r = app.db.prepare('SELECT city_id FROM player_state WHERE user_id=?').get(uid); return r && app.cities[r.city_id] ? r.city_id : app.defaultCityId;
};
export const cityOf = (app, uid) => app.cities[cityIdOf(app, uid)];
/** what the client may download about a city (no server-side index tables) */
export const publicCity = (c) => { const { adSlots, adSlotById, propertyById, shopById, jobLoc, billboardById, buildingById, plotById, placeById, venueById, busStopById, carParkById, area, ...rest } = c; return rest; };
/** short list for the phone/map: id, name, state, whether you can go there now */
export const cityList = (app, uid) => Object.values(app.cities).map(c => ({ id: c.id, name: c.cityName || c.name, district: c.name, kind: c.kind || 'city', state: c.state || null, here: c.id === cityIdOf(app, uid), enabled: c.enabled !== false }));
/** Move a player into another city at one of its spawn points. Used by the airport and by tests. Server-authoritative; the client reloads its world on the next heartbeat. */
export function enterCity(app, uid, cityId, spawnIdx = 0) {
  const c = app.cities[cityId]; if (!c || c.enabled === false) bad('NO_CITY', 'That place is not open yet.', 404);
  const sp = typeof spawnIdx === 'object' && spawnIdx ? spawnIdx : c.spawns[((spawnIdx % c.spawns.length) + c.spawns.length) % c.spawns.length]; const now = app.clock.now(); // spawnIdx may also be an explicit {x,z,ry} (the airport arrival point)
  const p = app.world.players.get(uid);
  if (p) { p.city = cityId; p.x = sp.x; p.z = sp.z; p.ry = sp.ry || 0; p.mode = 'walk'; p.venue = null; p.trail = [{ t: now, x: sp.x, z: sp.z, ry: p.ry }]; p.force = { x: sp.x, z: sp.z }; }
  app.db.prepare("UPDATE player_state SET city_id=?, x=?, z=?, ry=?, mode='walk', updated_at=? WHERE user_id=?").run(cityId, sp.x, sp.z, sp.ry || 0, now, uid);
  return { cityId, name: c.cityName || c.name, pos: { x: sp.x, z: sp.z } };
}
/** online players per city (distinct, within the active window) */
export function onlineByCity(app) { const cut = app.clock.now() - app.balance.heartbeat.activeWindowMs; const out = Object.fromEntries(Object.keys(app.cities).map(k => [k, 0])); for (const p of app.world.players.values()) if (p.lastSeen >= cut) out[p.city || app.defaultCityId]++; return out; }

/** Road links: a gate in one district that leads to a gate in another (bridges, roads). Server-checked: you must stand at the gate, on foot or in a car, not flying, not inside a venue. */
export const linksOf = (city) => (city.links || []);
export function useLink(app, uid, linkId, idemKey) {
  const L = app.balance.link; if (!L.enabled) bad('OFF', 'Road links are switched off.', 409); const here = cityOf(app, uid); const link = linksOf(here).find(l => l.id === linkId); if (!link) bad('NO_LINK', 'No road leads there from here.', 404);
  const to = app.cities[link.to]; if (!to) bad('NO_CITY', 'That place is not open yet.', 404); const p = app.world.players.get(uid); if (!p) bad('NOT_IN_WORLD', 'Join the world first.', 409);
  if (p.venue) bad('INSIDE', 'Step outside first.', 409); if (Math.hypot(p.x - link.x, p.z - link.z) > (link.r || L.gateRadiusM)) bad('NOT_AT_GATE', `Walk to ${link.name} first.`, 409, { x: link.x, z: link.z });
  const now = app.clock.now(); if (!app.limiter.hit(`link:${uid}`, L.perMin, 60000, now)) bad('RATE_LIMIT', 'Easy. One road at a time.', 429);
  const fare = link.fare ?? L.fare; return app.db.transaction(() => {
    if (fare > 0) move(app, { from: cashId(uid), to: SYS.SINK_TRANSPORT, amount: fare, reason: 'district_link', ref: `${here.id}>${to.id}`, userId: uid, idemKey: idemKey ? `link:${uid}:${idemKey}` : undefined });
    const r = enterCity(app, uid, to.id, { x: link.arrive.x, z: link.arrive.z, ry: link.arrive.ry || 0 }); return { ok: true, fare, ...r, text: `You are in ${to.cityName === here.cityName ? to.name : to.cityName + ' · ' + to.name}.` };
  })();
}
