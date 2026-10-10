// Emotes: a player picks one from the server's list; the server remembers it for its length (in memory only, nothing is stored) and the heartbeat shows it to nearby players.
// Emotes are a way of talking to others, so a chat pause (moderators) or chat set to OFF in the player's safety settings also stops them. They cannot be used while flying or crossing by boat.
import { bad } from './util.js';
import { EMOTES } from '../config/emotes.js';
import { chatMuted } from './safety.js';
import { effective } from './guardian.js';
import { mini as flightMini } from './flight.js';
import { mini as boatMini } from './boat.js';

export const byId = (id) => EMOTES.list.find(e => e.id === id);
export const publicList = () => EMOTES.enabled ? EMOTES.list.map(({ id, kind, anim, icon, label, ms, bubble }) => ({ id, kind, ...(anim ? { anim } : {}), icon, label, ms, ...(bubble !== undefined ? { bubble } : {}) })) : [];
export function play(app, uid, id) {
  if (!EMOTES.enabled) bad('OFF', 'Emotes are off right now.', 409); const e = byId(String(id || '')); if (!e) bad('BAD_EMOTE', 'Unknown emote.');
  const u = app.db.prepare('SELECT is_bot FROM users WHERE id=?').get(uid); if (!u) bad('NO_PLAYER', 'Unknown player.', 404);
  const p = app.world.players.get(uid); if (!p) bad('NOT_IN_WORLD', 'Join the world first.', 409); const now = app.clock.now();
  if (chatMuted(app, uid)) bad('CHAT_PAUSED', 'Chat is paused for your account for a little while, and that includes emotes.', 403);
  if (effective(app, uid).s.chat === 'off') bad('CHAT_OFF', 'Chat is switched off in your safety settings, and that includes emotes.', 403);
  if (flightMini(app, uid)?.state === 'flying' || boatMini(app, uid)?.state === 'crossing') bad('BUSY', 'Not now.', 409);
  if (p.emoteAt && now - p.emoteAt < EMOTES.cooldownMs) bad('SLOW_DOWN', 'Slow down a little.', 429);
  if (!app.limiter.hit(`emote:${uid}`, EMOTES.perMinute, 60000, now)) bad('RATE_LIMIT', 'Easy: too many emotes this minute.', 429);
  if (e.kind === 'dance' && p.mode === 'drive') bad('IN_CAR', 'Get out of the car to do that one.', 409);
  p.emoteAt = now; p.emote = { id: e.id, until: now + e.ms }; return { ok: true, id: e.id, ms: e.ms };
}
/** the short code the heartbeat carries for other players: the emote id while it lasts */
export const activeOf = (p, now) => (p.emote && p.emote.until > now ? p.emote.id : undefined);
