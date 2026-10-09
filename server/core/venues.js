// Venue rooms: enter a place (Mama Put, viewing centre, games joint, showroom), see its stations, sit at a game table, watch the TV, read the weekly board.
import { bad } from './util.js';
import { ensurePresence, syncPos } from './world.js';
import { dist, gameTime, addMood } from './economy.js';
import * as games from './games.js';

export const venueDef = (app, id) => (app.city.venues || []).find(v => v.id === id);
const hourNow = (app) => gameTime(app, app.clock.now()).hour;
export function isOpen(app, v) { if (!v.hours) return true; if (!app.balance.shops.enforceHours) return true; const h = hourNow(app); return h >= v.hours[0] && h < v.hours[1]; }
export const occupants = (app, venueId) => { const cut = app.clock.now() - app.balance.heartbeat.activeWindowMs; return [...app.world.players.values()].filter(p => p.venue === venueId && p.lastSeen >= cut).map(p => ({ id: p.id, username: p.name, color: p.color, bot: p.isBot })); };

export function venuesList(app) {
  return (app.city.venues || []).map(v => ({ id: v.id, name: v.name, blurb: v.blurb, x: v.x, z: v.z, hours: v.hours, open: isOpen(app, v), inside: occupants(app, v.id).length }));
}
export function venueView(app, uid, venueId) {
  const v = venueDef(app, venueId); if (!v) bad('NO_VENUE', 'Unknown place.', 404);
  const stations = v.stations.map(st => {
    const o = { ...st };
    if (st.type === 'game') o.match = games.stationMatch(app, uid, venueId, st.id);
    return o;
  });
  return { id: v.id, name: v.name, blurb: v.blurb, hours: v.hours, open: isOpen(app, v), shopId: v.shopId || null, sign: v.sign, room: { w: 9, d: 9 }, stations, occupants: occupants(app, venueId), stakes: app.balance.games.stakes, week: games.weekInfo(app) };
}
export function enterVenue(app, uid, venueId, pos) {
  const v = venueDef(app, venueId); if (!v) bad('NO_VENUE', 'Unknown place.', 404);
  const p = ensurePresence(app, uid); if (pos) syncPos(app, uid, pos);
  if (dist(p.x, p.z, v.x, v.z) > app.balance.games.enterRadius) bad('TOO_FAR', `Walk to the door of ${v.name} first.`);
  if (!isOpen(app, v)) bad('CLOSED', `${v.name} is closed. Opens ${v.hours[0]}:00 to ${v.hours[1]}:00.`, 409, { hours: v.hours });
  p.venue = venueId; p.inside = null; return venueView(app, uid, venueId);
}
export function leaveVenue(app, uid) {
  const p = ensurePresence(app, uid); if (!p.venue) return { ok: true };
  const m = games.myMatch(app, uid, { onlyLive: true }); if (m && m.status === 'active') bad('IN_GAME', 'Finish or resign your game before you leave.', 409);
  if (m && m.status === 'waiting') games.cancel(app, uid, m.id);
  p.venue = null; return { ok: true };
}
/** called from heartbeat: clear the venue if the player has walked away (or travelled) */
export function venueTick(app, p) {
  if (!p.venue) return; const v = venueDef(app, p.venue); if (!v || dist(p.x, p.z, v.x, v.z) > app.balance.games.leaveRadius) { const m = games.myMatch(app, p.id, { onlyLive: true }); if (m && m.status === 'waiting') games.cancel(app, p.id, m.id); p.venue = null; }
}
export function act(app, uid, venueId, stationId) {
  const v = venueDef(app, venueId); const st = v?.stations.find(s => s.id === stationId); if (!st) bad('NO_STATION', 'Nothing like that here.', 404);
  const p = ensurePresence(app, uid); if (p.venue !== venueId) bad('NOT_INSIDE', 'Step inside first.', 409);
  if (st.type !== 'tv') bad('NOT_AN_ACTION', 'Nothing to do with that.');
  const now = app.clock.now(); p.lastTv ||= 0; if (now - p.lastTv < 60000) bad('COOLDOWN', 'The match is still on: relax small.', 429, { waitMs: 60000 - (now - p.lastTv) });
  p.lastTv = now; const mood = addMood(app, uid, st.mood || app.balance.mood.tv); return { ok: true, mood, text: 'Wetin dey happen for the match! 🙌' };
}
