// Homes: paint + floor colour, "love your house", guest social actions, room chat, kicking guests. Visible to the owner and to guests who were let in.
import { typeOf } from './housing.js';
import { homeSkinOf } from './skins.js';
import { bad, cleanText, dayKey } from './util.js';
import { screen } from './filter.js';
import { notify, addMood, propDef } from './economy.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { hiddenFrom, chatMuted } from './safety.js';
import * as guardian from './guardian.js';

const ownerRow = (app, pid) => app.db.prepare('SELECT po.*, u.username FROM property_owner po JOIN users u ON u.id=po.user_id WHERE property_id=?').get(pid);
function access(app, uid, pid) { // -> { o, isOwner } or throws
  if (!propDef(app, pid)) bad('NO_PROPERTY', 'Unknown property.', 404); const o = ownerRow(app, pid); if (!o) bad('NO_OWNER', 'Nobody lives here.', 404);
  const isOwner = o.user_id === uid; if (!isOwner && !app.hasVisitPermit?.(uid, pid)) bad('FORBIDDEN', 'Only the owner and guests they let in can do that.', 403); return { o, isOwner };
}
export const palette = (app) => ({ price: app.balance.decor.price, walls: Object.entries(app.balance.decor.walls).map(([id, [name, hex]]) => ({ id, name, hex })), floors: Object.entries(app.balance.decor.floors).map(([id, [name, hex]]) => ({ id, name, hex })) });
export function decorOf(app, o) {
  const D = app.balance.decor; const pd = o.property_id ? app.all.propertyById?.[o.property_id] : null; const t = pd ? typeOf(app, pd) : null; const dw = D.walls[t?.wall] ? t.wall : 'cream', df = D.floors[t?.floor] ? t.floor : 'oak'; // each house type has its own default paint and floor
  const wid = D.walls[o.wall_color] ? o.wall_color : dw, fid = D.floors[o.floor_color] ? o.floor_color : df; const out = { wall: { id: wid, hex: D.walls[wid][1] }, floor: { id: fid, hex: D.floors[fid][1] } };
  const sk = homeSkinOf(app, o.user_id); if (sk) { out.wall = { id: 'skin:' + sk.id, hex: sk.wall }; out.floor = { id: 'skin:' + sk.id, hex: sk.floor }; out.skin = { id: sk.id, name: sk.name, accent: sk.accent }; } // a home skin (item 9) repaints the whole home while it is on: cosmetic only
  return out;
}
export const lovesOf = (app, pid) => app.db.prepare('SELECT COUNT(*) n FROM house_loves WHERE property_id=?').get(pid).n;

export function setDecor(app, uid, pid, wall, floor, idemKey) {
  const o = ownerRow(app, pid); if (!o || o.user_id !== uid) bad('NOT_OWNER', 'Only the owner can redecorate.', 403); const D = app.balance.decor;
  if (wall !== undefined && !D.walls[wall]) bad('BAD_COLOUR', 'Unknown wall colour.'); if (floor !== undefined && !D.floors[floor]) bad('BAD_COLOUR', 'Unknown floor.');
  const nw = wall ?? o.wall_color, nf = floor ?? o.floor_color; if (nw === o.wall_color && nf === o.floor_color) return { ok: true, charged: 0, ...decorOf(app, o) };
  return app.db.transaction(() => {
    move(app, { from: cashId(uid), to: SYS.SINK_DECOR, amount: D.price, reason: 'decor', ref: pid, userId: uid, idemKey: idemKey ? `decor:${uid}:${idemKey}` : null });
    app.db.prepare('UPDATE property_owner SET wall_color=?, floor_color=? WHERE property_id=?').run(nw, nf, pid); addMood(app, uid, 2);
    return { ok: true, charged: D.price, cash: balanceOf(app.db, cashId(uid)), ...decorOf(app, { wall_color: nw, floor_color: nf, property_id: pid, user_id: uid }) };
  })();
}
/** Outside paint. The colour is a facade slab every player sees on the building. Same price as interior paint. */
export function setFacade(app, uid, pid, color, idemKey) {
  const o = ownerRow(app, pid); if (!o || o.user_id !== uid) bad('NOT_OWNER', 'Only the owner can repaint the outside.', 403);
  const swatch = app.balance.decor.walls[color]; if (!swatch) bad('BAD_COLOUR', 'Unknown paint colour.');
  const hex = swatch[1]; if (o.facade === hex) return { ok: true, charged: 0, facade: hex, cash: balanceOf(app.db, cashId(uid)) };
  return app.db.transaction(() => {
    move(app, { from: cashId(uid), to: SYS.SINK_DECOR, amount: app.balance.decor.price, reason: 'facade', ref: pid, userId: uid, idemKey: idemKey ? `facade:${uid}:${idemKey}` : null });
    app.db.prepare('UPDATE property_owner SET facade=? WHERE property_id=?').run(hex, pid);
    return { ok: true, charged: app.balance.decor.price, facade: hex, cash: balanceOf(app.db, cashId(uid)) };
  })();
}
const event = (app, pid, uid, kind, text) => { const u = app.db.prepare('SELECT username FROM users WHERE id=?').get(uid); app.db.prepare('INSERT INTO room_events(property_id,user_id,username,kind,text,created_at) VALUES (?,?,?,?,?,?)').run(pid, uid, u.username, kind, text, app.clock.now()); app.db.prepare('DELETE FROM room_events WHERE property_id=? AND id<(SELECT MAX(id)-80 FROM room_events WHERE property_id=?)').run(pid, pid); };

export function love(app, uid, pid) {
  const { o, isOwner } = access(app, uid, pid); if (isOwner) bad('YOURS', 'You cannot love your own house (but we know you do).'); const day = dayKey(app.clock.now()); const M = app.balance.mood;
  return app.db.transaction(() => {
    const r = app.db.prepare('INSERT OR IGNORE INTO house_loves(property_id,user_id,day,created_at) VALUES (?,?,?,?)').run(pid, uid, day, app.clock.now()); if (r.changes !== 1) bad('ALREADY_LOVED', 'You already showed love to this house today.', 409);
    addMood(app, uid, M.love); addMood(app, o.user_id, M.lovedOwner); const who = app.db.prepare('SELECT username FROM users WHERE id=?').get(uid).username;
    notify(app, o.user_id, 'love', `@${who} loves your house! ❤️`); event(app, pid, uid, 'love', `${who} loves this house ❤️`); return { ok: true, loves: lovesOf(app, pid) };
  })();
}
const ACTIONS = {
  greet: { mood: 'greet', cd: 10000 }, hype: { text: (n) => `${n}: This house is fire o! 🔥`, mood: 'hype', cd: 15000 },
  sofa: { need: 'sofa', text: (n) => `${n} relaxes on the sofa 🛋️`, mood: 'sofa', cd: 60000 }, tv: { need: 'tv', text: (n) => `${n} is watching TV 📺`, mood: 'tv', cd: 60000 }
};
const guestRows = (app, pid, now) => app.db.prepare("SELECT u.id, u.username FROM knocks k JOIN users u ON u.id=k.visitor_id WHERE k.property_id=? AND k.status='accepted' AND k.decided_at>?").all(pid, now - app.balance.housing.visitPermitMs);
export function act(app, uid, pid, action) {
  const { o, isOwner } = access(app, uid, pid); const a = ACTIONS[action]; if (!a) bad('BAD_ACTION', 'Pick greet, hype, sofa or tv.');
  if (a.need && !app.db.prepare('SELECT 1 FROM property_items WHERE property_id=? AND item_id=?').get(pid, a.need)) bad('NO_ITEM', `There is no ${a.need} in this house.`, 409);
  if (!app.limiter.hit(`hact:${uid}:${action}`, 1, a.cd, app.clock.now())) bad('COOLDOWN', 'Relax small, try again in a moment.', 429);
  const n = app.db.prepare('SELECT username FROM users WHERE id=?').get(uid).username; const mood = addMood(app, uid, app.balance.mood[a.mood]);
  let text = a.text?.(n);
  if (action === 'greet') {
    const now = app.clock.now(); const guests = guestRows(app, pid, now);
    const others = isOwner ? guests.map(g => g.username) : [o.username, ...guests.filter(g => g.id !== uid).map(g => g.username)];
    if (!others.length) text = `${n} waves hello — nobody else is in the room yet 👋`;
    else {
      text = `${n} greets ${others.map(u => '@' + u).join(', ')}: How far! 👋`;
      const targets = isOwner ? guests : [{ id: o.user_id, username: o.username }, ...guests.filter(g => g.id !== uid)];
      for (const t of targets) if (t.id !== uid) notify(app, t.id, 'visit', `@${n} greets you: How far! 👋`);
    }
  }
  event(app, pid, uid, 'act', text); return { ok: true, mood };
}
/** NEPA blackout: roll on a time bucket; restore needs a placed generator or solar inverter. */
export function powerOf(app, pid) {
  const o = ownerRow(app, pid); if (!o) return { dark: false, canRestore: false, hasBackup: false, darkUntil: null };
  const cfg = app.balance.housing.nepa || { checkEveryMs: 10 * 60000, cutChancePct: 28, outageMsMin: 60 * 60000, outageMsMax: 180 * 60000 };
  const now = app.clock.now(); let darkUntil = o.power_dark_until || 0;
  if (darkUntil && darkUntil <= now) { app.db.prepare('UPDATE property_owner SET power_dark_until=NULL WHERE property_id=?').run(pid); darkUntil = 0; }
  const bucket = Math.floor(now / cfg.checkEveryMs);
  if ((o.power_check_bucket || 0) < bucket && !darkUntil) {
    app.db.prepare('UPDATE property_owner SET power_check_bucket=? WHERE property_id=?').run(bucket, pid);
    // deterministic-ish roll so the same house/bucket is stable across pollers
    let h = (bucket * 2654435761) >>> 0; for (let i = 0; i < String(pid).length; i++) h = (h + String(pid).charCodeAt(i) * (i + 17)) >>> 0;
    if ((h % 100) < cfg.cutChancePct) {
      darkUntil = now + cfg.outageMsMin + (h % Math.max(1, cfg.outageMsMax - cfg.outageMsMin));
      app.db.prepare('UPDATE property_owner SET power_dark_until=? WHERE property_id=?').run(darkUntil, pid);
      event(app, pid, o.user_id, 'power', 'NEPA took the light ⚡ — fire a generator or solar inverter to bring it back');
      notify(app, o.user_id, 'home', 'NEPA took your light. Use a generator or solar inverter to restore it.');
    }
  }
  const items = app.db.prepare('SELECT item_id FROM property_items WHERE property_id=?').all(pid).map(i => i.item_id);
  const hasBackup = items.includes('gen') || items.includes('solar');
  const dark = !!(darkUntil && darkUntil > now);
  return { dark, darkUntil: dark ? darkUntil : null, canRestore: dark && hasBackup, hasBackup };
}
export function restorePower(app, uid, pid) {
  const { o, isOwner } = access(app, uid, pid); if (!isOwner) bad('NOT_OWNER', 'Only the owner can restore the light.', 403);
  const now = app.clock.now(); if (!(o.power_dark_until > now)) bad('LIGHTS_ON', 'Lights are already on.', 409);
  const items = app.db.prepare('SELECT item_id FROM property_items WHERE property_id=?').all(pid).map(i => i.item_id);
  const via = items.includes('solar') ? 'solar inverter' : items.includes('gen') ? 'generator' : null;
  if (!via) bad('NO_BACKUP', 'Place a generator or solar inverter first.', 409);
  app.db.prepare('UPDATE property_owner SET power_dark_until=NULL WHERE property_id=?').run(pid);
  const n = app.db.prepare('SELECT username FROM users WHERE id=?').get(uid).username;
  event(app, pid, uid, 'power', `${n} restored the light with the ${via} 💡`);
  return { ok: true, ...powerOf(app, pid) };
}
export function say(app, uid, pid, text) {
  access(app, uid, pid); const t = cleanText(text, 120); if (!t) bad('EMPTY', 'Say something.'); const sc = screen(t); if (!sc.ok) bad(sc.code, sc.message);
  if (chatMuted(app, uid)) bad('CHAT_PAUSED', 'Chat is paused for your account for a little while.', 403);
  guardian.chatCheck(app, uid, 'room');
  if (!app.limiter.hit(`say:${uid}`, app.balance.safety.chatPerMin, 60000, app.clock.now())) bad('RATE_LIMIT', 'Too many messages. Take a breather.', 429);
  event(app, pid, uid, 'say', t); return { ok: true };
}
export function room(app, uid, pid, since = 0) {
  const { o, isOwner } = access(app, uid, pid); const hide = hiddenFrom(app, uid); const now = app.clock.now();
  const events = app.db.prepare('SELECT id,user_id,username,kind,text,created_at FROM room_events WHERE property_id=? AND id>? ORDER BY id DESC LIMIT 40').all(pid, Number(since) || 0).reverse().filter(e => !hide.has(e.user_id)).map(e => ({ id: e.id, u: e.username, kind: e.kind, t: e.text, at: e.created_at }));
  const guests = guestRows(app, pid, now).map(g => g.username);
  const items = app.db.prepare('SELECT item_id FROM property_items WHERE property_id=?').all(pid).map(i => i.item_id);
  const placed = app.db.prepare('SELECT item_id id, x, z, rot FROM property_items WHERE property_id=?').all(pid);
  const power = powerOf(app, pid);
  return { events, guests, owner: o.username, ownerHome: app.presenceOf(o.user_id, pid) === 'home', isOwner, loves: lovesOf(app, pid), lovedToday: !!app.db.prepare('SELECT 1 FROM house_loves WHERE property_id=? AND user_id=? AND day=?').get(pid, uid, dayKey(now)), can: { sofa: items.includes('sofa'), tv: items.includes('tv'), restore: power.canRestore }, placed, power, ...decorOf(app, o) };
}
export function kick(app, uid, pid, username) {
  const o = ownerRow(app, pid); if (!o || o.user_id !== uid) bad('NOT_OWNER', 'Only the owner can ask guests to leave.', 403);
  const t = app.db.prepare('SELECT id FROM users WHERE username=?').get(String(username || '')); if (!t) bad('NO_PLAYER', 'No such player.', 404);
  const r = app.db.prepare("UPDATE knocks SET status='ended', decided_at=? WHERE property_id=? AND visitor_id=? AND status='accepted'").run(app.clock.now(), pid, t.id); if (!r.changes) bad('NOT_A_GUEST', 'That player is not a guest here.', 404);
  event(app, pid, uid, 'kick', `${username} was asked to leave`); notify(app, t.id, 'visit', 'The host asked you to step out. No wahala.'); return { ok: true };
}
