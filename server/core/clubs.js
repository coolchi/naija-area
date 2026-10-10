// Clubs and crews: found one, join one, a shared clubhouse in Lagos Mainland (venue_crewhq), roles, requests and invites, and members-only chat.
// GAME MONEY ONLY: the only money is the one-off founding fee (a sink). Numbers: server/config/clubs.js (ESTIMATES). Names, mottos and chat are filtered; chat is rate limited and can be muted by leaders.
import { bad, cleanText } from './util.js';
import { screen } from './filter.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { notify, addMood } from './economy.js';
import { hiddenFrom } from './safety.js';
import { CLUBS } from '../config/clubs.js';

export const cfg = (app) => app.balance.clubs || CLUBS;
const qa = (app, sql, ...a) => app.db.prepare(sql).all(...a);
const q1 = (app, sql, ...a) => app.db.prepare(sql).get(...a);
const run = (app, sql, ...a) => app.db.prepare(sql).run(...a);
const nameOf = (app, id) => q1(app, 'SELECT username FROM users WHERE id=?', id)?.username || 'someone';
const memberOf = (app, uid) => q1(app, 'SELECT * FROM club_members WHERE user_id=?', uid) || null;
const clubOf = (app, id) => q1(app, 'SELECT * FROM clubs WHERE id=?', Number(id)) || null;
const countOf = (app, id) => q1(app, 'SELECT COUNT(*) n FROM club_members WHERE club_id=?', id).n;
const invalidate = (app, uid) => { const p = app.world.players.get(uid); if (p) p.clubTag = undefined; };
/** the short tag shown beside a player's name (cached on the presence record; null when in no club) */
export function clubTagOf(app, p) { if (p.clubTag === undefined) p.clubTag = q1(app, 'SELECT c.tag FROM club_members m JOIN clubs c ON c.id=m.club_id WHERE m.user_id=?', p.id)?.tag || null; return p.clubTag; }

function gate(app, uid) {
  const C = cfg(app); const u = q1(app, 'SELECT is_guest, is_bot, created_at FROM users WHERE id=?', uid); if (!u || u.is_bot) bad('NO_PLAYER', 'Unknown player.', 404);
  if (u.is_guest && !C.guestsMay) bad('GUEST', 'Create an account first: guests cannot found or join clubs.', 403);
  if (app.clock.now() - u.created_at < C.minAccountAgeMs) bad('TOO_NEW', 'Your account is too new for clubs. Come back in a little while.', 403);
}
const cooling = (app, uid) => { const r = q1(app, 'SELECT until_ms FROM club_cooldowns WHERE user_id=?', uid); if (r && r.until_ms > app.clock.now()) bad('COOLDOWN', `You left a club a moment ago. Wait ${Math.ceil((r.until_ms - app.clock.now()) / 60000)} more minutes.`, 429); };
const startCooldown = (app, uid) => { const until = app.clock.now() + cfg(app).leaveCooldownMs; run(app, 'DELETE FROM club_cooldowns WHERE user_id=?', uid); run(app, 'INSERT INTO club_cooldowns(user_id,until_ms) VALUES (?,?)', uid, until); };
const cleanClean = (s, max, min, what) => { const t = cleanText(s, max); if (t.length < min) bad('BAD_' + what.toUpperCase(), `${what} must be at least ${min} characters.`); const sc = screen(t); if (!sc.ok) bad(sc.code, sc.message); return t; };
const canManage = (m) => m && (m.role === 'leader' || m.role === 'officer');
const mustMember = (app, uid) => { const m = memberOf(app, uid); if (!m) bad('NOT_IN_CLUB', 'You are not in a club.', 409); return m; };

function summary(app, c) { return { id: c.id, name: c.name, tag: c.tag, kind: c.kind, motto: c.motto, color: c.color, open: !!c.is_open, members: countOf(app, c.id), max: cfg(app).maxMembers, leader: nameOf(app, c.leader_id), createdAt: c.created_at }; }
const presentNow = (app, clubId) => { const ids = new Set(qa(app, 'SELECT user_id FROM club_members WHERE club_id=?', clubId).map(r => r.user_id)); const v = cfg(app).hangout.venueId; const out = []; for (const p of app.world.players.values()) if (ids.has(p.id) && p.venue === v && app.clock.now() - p.lastSeen < 30000) out.push(p.name); return out; };

/** my club (or the invites and requests waiting for me), and what I can do */
export function mine(app, uid) {
  const C = cfg(app); const m = memberOf(app, uid); const invites = qa(app, "SELECT r.club_id, r.created_at, r.invited_by FROM club_requests r WHERE r.user_id=? AND r.kind='invite' ORDER BY r.created_at DESC", uid).map(r => { const c = clubOf(app, r.club_id); return c ? { club: summary(app, c), by: nameOf(app, r.invited_by), at: r.created_at } : null; }).filter(Boolean);
  const pending = qa(app, "SELECT club_id FROM club_requests WHERE user_id=? AND kind='request'", uid).map(r => r.club_id);
  if (!m) return { club: null, invites, pendingRequests: pending, rules: rulesView(C), cash: balanceOf(app.db, cashId(uid)), hint: 'Found a club at the Clubhouse desk or from this app, or join an open one.' };
  const c = clubOf(app, m.club_id); const members = qa(app, 'SELECT m.user_id, m.role, m.joined_at, m.muted_until, u.username FROM club_members m JOIN users u ON u.id=m.user_id WHERE m.club_id=? ORDER BY CASE m.role WHEN \'leader\' THEN 0 WHEN \'officer\' THEN 1 ELSE 2 END, m.joined_at', c.id);
  const reqs = canManage(m) ? qa(app, 'SELECT r.user_id, r.kind, r.created_at, u.username FROM club_requests r JOIN users u ON u.id=r.user_id WHERE r.club_id=? ORDER BY r.created_at', c.id).map(r => ({ userId: r.user_id, username: r.username, kind: r.kind, at: r.created_at })) : [];
  const now = app.clock.now(); const here = presentNow(app, c.id);
  return { club: summary(app, c), role: m.role, members: members.map(x => ({ userId: x.user_id, username: x.username, role: x.role, joinedAt: x.joined_at, muted: x.muted_until > now, you: x.user_id === uid })), requests: reqs, invites, clubhouse: { venueId: C.hangout.venueId, here, canHangout: here.length >= C.hangout.minMembers && m.hangout_at + C.hangout.cooldownMs <= now, hangoutIn: Math.max(0, m.hangout_at + C.hangout.cooldownMs - now) }, rules: rulesView(C), cash: balanceOf(app.db, cashId(uid)) };
}
const rulesView = (C) => ({ createFee: C.createFee, maxMembers: C.maxMembers, maxOfficers: C.maxOfficers, chatMax: C.chat.max, kinds: C.kinds, colors: C.colors });

export function directory(app, uid, { q, page } = {}) {
  const C = cfg(app); const term = cleanText(String(q || ''), 20).toLowerCase(); const rows = qa(app, `SELECT c.*, (SELECT COUNT(*) FROM club_members m WHERE m.club_id=c.id) n FROM clubs c ${term ? 'WHERE c.name_key LIKE ?' : ''} ORDER BY n DESC, c.id LIMIT ? OFFSET ?`, ...(term ? ['%' + term.replace(/[%_]/g, '') + '%'] : []), C.directoryPage, Math.max(0, Number(page) || 0) * C.directoryPage);
  return { clubs: rows.map(c => ({ ...summary(app, c), full: c.n >= C.maxMembers })), mine: memberOf(app, uid)?.club_id || null };
}
export function create(app, uid, { name, tag, kind, motto, color, open }, idem) {
  gate(app, uid); cooling(app, uid); const C = cfg(app); if (memberOf(app, uid)) bad('IN_CLUB', 'You are already in a club. Leave it first.', 409);
  const nm = cleanClean(name, C.nameMax, C.nameMin, 'Name'); const tg = String(tag || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, C.tagMax); if (tg.length < C.tagMin) bad('BAD_TAG', `The tag is ${C.tagMin} to ${C.tagMax} letters or numbers.`); { const sc = screen(tg); if (!sc.ok) bad(sc.code, sc.message); }
  const mt = motto ? cleanClean(motto, C.mottoMax, 0, 'Motto') : ''; const kd = C.kinds.includes(kind) ? kind : 'club'; const col = C.colors.includes(color) ? color : C.colors[0];
  return app.db.transaction(() => {
    if (q1(app, 'SELECT 1 FROM clubs WHERE name_key=?', nm.toLowerCase())) bad('NAME_TAKEN', 'A club with that name already exists.', 409);
    move(app, { from: cashId(uid), to: SYS.SINK_CLUBS, amount: C.createFee, reason: 'club_found', ref: nm.toLowerCase(), userId: uid, idemKey: idem ? `clubfound:${uid}:${idem}` : null });
    const id = Number(run(app, 'INSERT INTO clubs(name,name_key,tag,kind,motto,color,is_open,leader_id,created_at) VALUES (?,?,?,?,?,?,?,?,?)', nm, nm.toLowerCase(), tg, kd, mt, col, open === false ? 0 : 1, uid, app.clock.now()).lastInsertRowid);
    run(app, "INSERT INTO club_members(user_id,club_id,role,joined_at) VALUES (?,?,'leader',?)", uid, id, app.clock.now()); invalidate(app, uid);
    return { ok: true, text: `${nm} [${tg}] is founded. Invite your friends!`, ...mine(app, uid) };
  })();
}
function addMember(app, uid, c) {
  if (countOf(app, c.id) >= cfg(app).maxMembers) bad('CLUB_FULL', 'That club is full.', 409); if (memberOf(app, uid)) bad('IN_CLUB', 'Already in a club.', 409);
  run(app, "INSERT INTO club_members(user_id,club_id,role,joined_at) VALUES (?,?,'member',?)", uid, c.id, app.clock.now()); run(app, 'DELETE FROM club_requests WHERE user_id=?', uid); invalidate(app, uid);
  notify(app, c.leader_id, 'club', `@${nameOf(app, uid)} joined ${c.name}.`);
}
export function join(app, uid, clubId) {
  gate(app, uid); cooling(app, uid); const c = clubOf(app, clubId); if (!c) bad('NO_CLUB', 'No such club.', 404);
  return app.db.transaction(() => {
    if (memberOf(app, uid)) bad('IN_CLUB', 'You are already in a club. Leave it first.', 409);
    if (c.is_open) { addMember(app, uid, c); return { ok: true, text: `Welcome to ${c.name}!`, ...mine(app, uid) }; }
    if (q1(app, "SELECT 1 FROM club_requests WHERE club_id=? AND user_id=? AND kind='invite'", c.id, uid)) { addMember(app, uid, c); return { ok: true, text: `Welcome to ${c.name}!`, ...mine(app, uid) }; }
    if (q1(app, 'SELECT COUNT(*) n FROM club_requests WHERE club_id=?', c.id).n >= cfg(app).requestsMax) bad('TOO_MANY', 'That club has too many waiting requests.', 409);
    run(app, 'DELETE FROM club_requests WHERE club_id=? AND user_id=?', c.id, uid); run(app, "INSERT INTO club_requests(club_id,user_id,kind,created_at) VALUES (?,?,'request',?)", c.id, uid, app.clock.now());
    notify(app, c.leader_id, 'club', `@${nameOf(app, uid)} asked to join ${c.name}.`); return { ok: true, requested: true, text: 'Request sent. The leaders will see it.', ...mine(app, uid) };
  })();
}
/** leaders and officers: accept or decline a request */
export function decide(app, uid, userId, accept) {
  return app.db.transaction(() => {
    const m = mustMember(app, uid); if (!canManage(m)) bad('FORBIDDEN', 'Only leaders and officers can do that.', 403); const c = clubOf(app, m.club_id);
    const r = q1(app, "SELECT * FROM club_requests WHERE club_id=? AND user_id=? AND kind='request'", c.id, Number(userId)); if (!r) bad('NO_REQUEST', 'That request is gone.', 404);
    run(app, 'DELETE FROM club_requests WHERE club_id=? AND user_id=?', c.id, r.user_id);
    if (accept) { if (memberOf(app, r.user_id)) bad('IN_CLUB', 'They have joined another club.', 409); addMember(app, r.user_id, c); notify(app, r.user_id, 'club', `You are in ${c.name}!`); } else notify(app, r.user_id, 'club', `${c.name} did not accept your request.`);
    return { ok: true, ...mine(app, uid) };
  })();
}
export function invite(app, uid, username) {
  const m = mustMember(app, uid); if (!canManage(m)) bad('FORBIDDEN', 'Only leaders and officers can invite.', 403); const c = clubOf(app, m.club_id);
  const t = q1(app, 'SELECT id, is_guest, is_bot FROM users WHERE username=?', String(username || '').replace(/^@/, '')); if (!t || t.is_bot) bad('NO_USER', 'No such player.', 404); if (t.is_guest) bad('GUEST', 'Guests cannot join clubs.', 409); if (memberOf(app, t.id)) bad('IN_CLUB', 'They are already in a club.', 409);
  if (countOf(app, c.id) >= cfg(app).maxMembers) bad('CLUB_FULL', 'Your club is full.', 409);
  if (q1(app, 'SELECT COUNT(*) n FROM club_requests WHERE club_id=?', c.id).n >= cfg(app).requestsMax) bad('TOO_MANY', 'Too many waiting invites and requests.', 409);
  run(app, 'DELETE FROM club_requests WHERE club_id=? AND user_id=?', c.id, t.id); run(app, "INSERT INTO club_requests(club_id,user_id,kind,created_at,invited_by) VALUES (?,?,'invite',?,?)", c.id, t.id, app.clock.now(), uid);
  notify(app, t.id, 'club', `@${nameOf(app, uid)} invited you to ${c.name}. Open Phone > City life > Clubs.`); return { ok: true, text: `Invite sent to @${nameOf(app, t.id)}.`, ...mine(app, uid) };
}
export function declineInvite(app, uid, clubId) { run(app, "DELETE FROM club_requests WHERE club_id=? AND user_id=? AND kind='invite'", Number(clubId), uid); return { ok: true, ...mine(app, uid) }; }
function removeMember(app, userId, c, why) {
  run(app, 'DELETE FROM club_members WHERE user_id=?', userId); invalidate(app, userId); startCooldown(app, userId);
  if (c.leader_id === userId) { // pass the club on: officer first (oldest), then oldest member; disband if nobody is left
    const next = q1(app, "SELECT user_id FROM club_members WHERE club_id=? ORDER BY CASE role WHEN 'officer' THEN 0 ELSE 1 END, joined_at, user_id LIMIT 1", c.id);
    if (next) { run(app, "UPDATE club_members SET role='leader' WHERE user_id=?", next.user_id); run(app, 'UPDATE clubs SET leader_id=? WHERE id=?', next.user_id, c.id); notify(app, next.user_id, 'club', `You now lead ${c.name}.`); }
    else disband(app, c);
  }
  void why;
}
function disband(app, c) { for (const t of ['club_members', 'club_requests', 'club_chat']) run(app, `DELETE FROM ${t} WHERE club_id=?`, c.id); run(app, 'DELETE FROM clubs WHERE id=?', c.id); }
export function leave(app, uid) { return app.db.transaction(() => { const m = mustMember(app, uid); const c = clubOf(app, m.club_id); removeMember(app, uid, c, 'left'); return { ok: true, text: `You left ${c.name}.`, ...mine(app, uid) }; })(); }
const rank = { leader: 3, officer: 2, member: 1 };
export function kick(app, uid, userId) {
  return app.db.transaction(() => {
    const m = mustMember(app, uid); if (!canManage(m)) bad('FORBIDDEN', 'Only leaders and officers can remove members.', 403); const t = memberOf(app, Number(userId)); if (!t || t.club_id !== m.club_id) bad('NO_MEMBER', 'They are not in your club.', 404);
    if (rank[t.role] >= rank[m.role]) bad('FORBIDDEN', 'You can only remove people below your rank.', 403); const c = clubOf(app, m.club_id); removeMember(app, t.user_id, c, 'kicked'); notify(app, t.user_id, 'club', `You were removed from ${c.name}.`); return { ok: true, ...mine(app, uid) };
  })();
}
export function setRole(app, uid, userId, role) {
  return app.db.transaction(() => {
    const m = mustMember(app, uid); if (m.role !== 'leader') bad('FORBIDDEN', 'Only the leader can change roles.', 403); const t = memberOf(app, Number(userId)); if (!t || t.club_id !== m.club_id || t.user_id === uid) bad('NO_MEMBER', 'Pick another member of your club.', 404);
    const c = clubOf(app, m.club_id);
    if (role === 'leader') { run(app, "UPDATE club_members SET role='officer' WHERE user_id=?", uid); run(app, "UPDATE club_members SET role='leader' WHERE user_id=?", t.user_id); run(app, 'UPDATE clubs SET leader_id=? WHERE id=?', t.user_id, c.id); notify(app, t.user_id, 'club', `You now lead ${c.name}.`); }
    else if (role === 'officer') { if (t.role !== 'officer' && q1(app, "SELECT COUNT(*) n FROM club_members WHERE club_id=? AND role='officer'", c.id).n >= cfg(app).maxOfficers) bad('TOO_MANY', `A club can have ${cfg(app).maxOfficers} officers.`, 409); run(app, "UPDATE club_members SET role='officer' WHERE user_id=?", t.user_id); }
    else if (role === 'member') run(app, "UPDATE club_members SET role='member' WHERE user_id=?", t.user_id); else bad('BAD_ROLE', 'Unknown role.');
    return { ok: true, ...mine(app, uid) };
  })();
}
export function settings(app, uid, { motto, open, color }) {
  const m = mustMember(app, uid); if (m.role !== 'leader') bad('FORBIDDEN', 'Only the leader can change the club.', 403); const C = cfg(app);
  if (motto !== undefined) run(app, 'UPDATE clubs SET motto=? WHERE id=?', motto ? cleanClean(motto, C.mottoMax, 0, 'Motto') : '', m.club_id); if (open !== undefined) run(app, 'UPDATE clubs SET is_open=? WHERE id=?', open ? 1 : 0, m.club_id); if (color !== undefined && C.colors.includes(color)) run(app, 'UPDATE clubs SET color=? WHERE id=?', color, m.club_id);
  return { ok: true, ...mine(app, uid) };
}
export function disbandClub(app, uid) { return app.db.transaction(() => { const m = mustMember(app, uid); if (m.role !== 'leader') bad('FORBIDDEN', 'Only the leader can close the club.', 403); const c = clubOf(app, m.club_id); for (const r of qa(app, 'SELECT user_id FROM club_members WHERE club_id=?', c.id)) { invalidate(app, r.user_id); startCooldown(app, r.user_id); if (r.user_id !== uid) notify(app, r.user_id, 'club', `${c.name} was closed by its leader.`); } disband(app, c); return { ok: true, text: `${c.name} is closed.`, ...mine(app, uid) }; })(); }
export function mute(app, uid, userId, minutes) {
  const m = mustMember(app, uid); if (!canManage(m)) bad('FORBIDDEN', 'Only leaders and officers can mute.', 403); const t = memberOf(app, Number(userId)); if (!t || t.club_id !== m.club_id) bad('NO_MEMBER', 'They are not in your club.', 404); if (rank[t.role] >= rank[m.role]) bad('FORBIDDEN', 'You can only mute people below your rank.', 403);
  const mins = cfg(app).muteMinutes.includes(Number(minutes)) ? Number(minutes) : cfg(app).muteMinutes[0]; run(app, 'UPDATE club_members SET muted_until=? WHERE user_id=?', app.clock.now() + mins * 60000, t.user_id); return { ok: true, text: `Muted for ${mins} minutes.`, ...mine(app, uid) };
}
/** members-only chat */
export function say(app, uid, text) {
  const m = mustMember(app, uid); const C = cfg(app); const now = app.clock.now(); if (m.muted_until > now) bad('MUTED', 'You are muted in this club for a while.', 403);
  const t = cleanText(text, C.chat.max); if (!t) bad('EMPTY', 'Write something.'); const sc = screen(t); if (!sc.ok) bad(sc.code, sc.message);
  const last = q1(app, 'SELECT created_at FROM club_chat WHERE club_id=? AND user_id=? ORDER BY id DESC LIMIT 1', m.club_id, uid); if (last && now - last.created_at < C.chat.minGapMs) bad('SLOW_DOWN', 'Slow down a little.', 429);
  const id = Number(run(app, 'INSERT INTO club_chat(club_id,user_id,username,text,created_at) VALUES (?,?,?,?,?)', m.club_id, uid, nameOf(app, uid), t, now).lastInsertRowid);
  const old = q1(app, 'SELECT id FROM club_chat WHERE club_id=? ORDER BY id DESC LIMIT 1 OFFSET ?', m.club_id, C.chat.keep); if (old) run(app, 'DELETE FROM club_chat WHERE club_id=? AND id<=?', m.club_id, old.id);
  return { ok: true, id };
}
export function chat(app, uid, since) {
  const m = mustMember(app, uid); const C = cfg(app); const rows = qa(app, 'SELECT id, user_id, username, text, created_at FROM club_chat WHERE club_id=? AND id>? ORDER BY id DESC LIMIT ?', m.club_id, Math.max(0, Number(since) || 0), C.chat.pageSize).reverse();
  const hidden = hiddenFrom(app, uid);
  return { messages: rows.filter(r => !hidden.has(r.user_id)).map(r => ({ id: r.id, user: r.username, text: r.text, at: r.created_at, you: r.user_id === uid })), last: rows.length ? rows[rows.length - 1].id : Math.max(0, Number(since) || 0) };
}
/** two or more members of the same club in the clubhouse together: a small, rare mood lift */
export function hangout(app, uid) {
  const m = mustMember(app, uid); const C = cfg(app).hangout; const now = app.clock.now(); const p = app.world.players.get(uid); if (!p || p.venue !== C.venueId) bad('NOT_HERE', 'Go to the Clubhouse first.', 409);
  if (m.hangout_at + C.cooldownMs > now) bad('COOLDOWN', 'You hung out a little while ago.', 429); const here = presentNow(app, m.club_id); if (here.length < C.minMembers) bad('ALONE', `You need ${C.minMembers} of your club in the Clubhouse together.`, 409);
  run(app, 'UPDATE club_members SET hangout_at=? WHERE user_id=?', now, uid); const mood = addMood(app, uid, C.mood); return { ok: true, mood, text: `Good gist with ${here.length - 1} other club member${here.length > 2 ? 's' : ''}. Mood up.`, ...mine(app, uid) };
}
