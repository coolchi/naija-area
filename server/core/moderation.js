// Moderator tools for the admin back end: look a player up, warn / mute / ban with a reason and a length, lift a sanction, and read the audit log.
// A MUTE stops chat (it uses the existing users.chat_muted_until, so every chat path already honours it). A BAN stops every request except logging out, downloading or deleting your own data.
// Every action writes the audit log. Sanction history is KEPT when an account is closed (to stop repeat abuse); a lawyer must confirm that (docs/MODERATION.md).
import { bad, cleanText } from './util.js';
import { notify } from './economy.js';
import { balanceOf, cashId, savId } from './ledger.js';
import { MOD } from '../config/moderation.js';
import { registerPlayerData } from './account.js';

const HOUR = 3600000, DAY = 86400000;
const audit = (app, actor, action, detail) => app.db.prepare('INSERT INTO audit_log(actor,action,detail,created_at) VALUES (?,?,?,?)').run(actor, action, detail, app.clock.now());
const userRow = (app, who) => { const n = Number(who); const u = Number.isInteger(n) && n > 0 && String(n) === String(who).trim() ? app.db.prepare('SELECT * FROM users WHERE id=?').get(n) : app.db.prepare('SELECT * FROM users WHERE username=?').get(String(who || '').replace(/^@/, '').trim()); if (!u) bad('NO_PLAYER', 'No such player.', 404); return u; };
const banCache = (app) => (app._bans ||= new Map());
export const forgetBans = (app, uid) => banCache(app).delete(uid);

/** the active ban of a player, or null. Cached for 20 s so every request is cheap. */
export function activeBan(app, uid) {
  const c = banCache(app), now = app.clock.now(), hit = c.get(uid); if (hit && now - hit.at < 20000) return hit.ban;
  const r = app.db.prepare("SELECT id, reason, until_at FROM sanctions WHERE user_id=? AND kind='ban' AND lifted_at IS NULL AND (until_at IS NULL OR until_at>?) ORDER BY id DESC LIMIT 1").get(uid, now);
  const ban = r ? { id: r.id, reason: r.reason, until: r.until_at } : null; c.set(uid, { at: now, ban }); return ban;
}
export const banMessage = (b) => `Your account is suspended${b.until ? ` until ${new Date(b.until).toISOString().slice(0, 16).replace('T', ' ')} UTC` : ''}. Reason: ${b.reason}. You can still download or delete your data from your account.`;

export function sanction(app, { who, kind, hours = null, reason, note = '', actor = 'admin', reportRef = null }) {
  if (!['warn', 'mute', 'ban'].includes(kind)) bad('BAD_KIND', 'kind must be warn, mute or ban.'); if (!MOD.reasons.includes(reason)) bad('BAD_REASON', `reason must be one of ${MOD.reasons.join(', ')}.`);
  const u = userRow(app, who); if (u.is_bot) bad('BOT', 'That is a bot account.'); const now = app.clock.now(); let until = null;
  if (kind === 'mute') { const h = hours == null ? MOD.defaultMuteHours : Number(hours); if (!(h > 0) || h > MOD.maxMuteHours) bad('BAD_LENGTH', `A mute is 1 to ${MOD.maxMuteHours} hours.`); until = now + h * HOUR; }
  if (kind === 'ban' && hours != null) { const h = Number(hours); if (!(h > 0) || h > MOD.maxBanDays * 24) bad('BAD_LENGTH', `A ban is up to ${MOD.maxBanDays} days, or leave the length empty for permanent.`); until = now + h * HOUR; }
  const clean = cleanText(note, 300); const id = app.db.prepare('INSERT INTO sanctions(user_id,kind,reason,note,until_at,actor,report_ref,created_at) VALUES (?,?,?,?,?,?,?,?)').run(u.id, kind, reason, clean, until, actor, reportRef, now).lastInsertRowid;
  if (kind === 'mute') app.db.prepare('UPDATE users SET chat_muted_until=? WHERE id=?').run(Math.max(until, u.chat_muted_until || 0), u.id);
  if (kind === 'ban') { forgetBans(app, u.id); app.world?.players?.delete(u.id); }
  if (kind === 'warn' && MOD.notifyOnWarn) notify(app, u.id, 'safety', `Warning from the moderators (${reason.replace(/_/g, ' ')}): ${clean || 'please follow the community rules.'}`);
  if (kind === 'mute') notify(app, u.id, 'safety', `Your chat is paused for ${hours ?? MOD.defaultMuteHours} hour(s) (${reason.replace(/_/g, ' ')}).`);
  audit(app, actor, `sanction_${kind}`, `user ${u.id} @${u.username}: ${reason}${until ? ` until ${new Date(until).toISOString()}` : ' (no end)'}${clean ? ` · ${clean}` : ''}${reportRef ? ` · from report ${reportRef}` : ''}`);
  return { ok: true, id: Number(id), user: { id: u.id, username: u.username }, kind, until };
}
export function lift(app, id, { actor = 'admin', note = '' } = {}) {
  const s = app.db.prepare('SELECT * FROM sanctions WHERE id=?').get(Number(id)); if (!s) bad('NO_SANCTION', 'No such sanction.', 404); if (s.lifted_at) bad('ALREADY_LIFTED', 'That one was already lifted.', 409); if (s.kind === 'warn') bad('NOT_LIFTABLE', 'A warning cannot be lifted, it is only a record.');
  const now = app.clock.now(); app.db.prepare('UPDATE sanctions SET lifted_at=?, lifted_by=? WHERE id=?').run(now, actor, s.id);
  if (s.kind === 'mute') { const left = app.db.prepare("SELECT MAX(until_at) m FROM sanctions WHERE user_id=? AND kind='mute' AND lifted_at IS NULL AND until_at>?").get(s.user_id, now).m || 0; app.db.prepare('UPDATE users SET chat_muted_until=? WHERE id=?').run(left, s.user_id); notify(app, s.user_id, 'safety', 'Your chat is back on.'); }
  if (s.kind === 'ban') forgetBans(app, s.user_id);
  audit(app, actor, `lift_${s.kind}`, `user ${s.user_id}: sanction ${s.id}${note ? ` · ${cleanText(note, 200)}` : ''}`); return { ok: true };
}
const san = (r) => ({ id: r.id, userId: r.user_id, username: r.username, kind: r.kind, reason: r.reason, note: r.note, until: r.until_at, actor: r.actor, reportRef: r.report_ref, at: r.created_at, lifted: !!r.lifted_at, liftedAt: r.lifted_at, liftedBy: r.lifted_by });
export function listSanctions(app, { active = true, kind = null, limit = 100 } = {}) {
  const now = app.clock.now(); const w = [], a = []; if (active) { w.push("s.kind IN ('mute','ban') AND s.lifted_at IS NULL AND (s.until_at IS NULL OR s.until_at>?)"); a.push(now); } if (kind) { w.push('s.kind=?'); a.push(kind); }
  return app.db.prepare(`SELECT s.*, u.username FROM sanctions s JOIN users u ON u.id=s.user_id ${w.length ? 'WHERE ' + w.join(' AND ') : ''} ORDER BY s.id DESC LIMIT ?`).all(...a, Math.min(300, limit)).map(san);
}
/** everything a moderator needs about one player on one screen */
export function lookup(app, who) {
  const u = userRow(app, who), now = app.clock.now(); const hist = app.db.prepare('SELECT s.*, u.username FROM sanctions s JOIN users u ON u.id=s.user_id WHERE s.user_id=? ORDER BY s.id DESC LIMIT 50').all(u.id).map(san);
  const strikes = app.db.prepare("SELECT COUNT(*) n FROM sanctions WHERE user_id=? AND created_at>? AND kind IN ('warn','mute','ban')").get(u.id, now - MOD.strikeWindowDays * DAY).n;
  const against = app.db.prepare('SELECT r.id, r.kind, r.target_ref, r.reason, r.status, r.created_at, ru.username reporter FROM reports r JOIN users ru ON ru.id=r.reporter_id WHERE r.target_user_id=? ORDER BY r.id DESC LIMIT ?').all(u.id, MOD.recentReports);
  const filed = app.db.prepare('SELECT COUNT(*) n, SUM(CASE WHEN status=\'dismissed\' THEN 1 ELSE 0 END) d FROM reports WHERE reporter_id=?').get(u.id);
  const chat = app.db.prepare('SELECT id, text, created_at FROM chat_messages WHERE user_id=? ORDER BY id DESC LIMIT ?').all(u.id, MOD.recentChatLines);
  const ban = activeBan(app, u.id);
  const st = app.db.prepare('SELECT city_id, mode, x, z FROM player_state WHERE user_id=?').get(u.id);
  const city = app.cities?.[st?.city_id];
  const cityName = city ? (city.cityName && city.name && city.cityName !== city.name ? `${city.cityName} · ${city.name}` : (city.cityName || city.name)) : (st?.city_id || '');
  return { user: { id: u.id, username: u.username, guest: !!u.is_guest, createdAt: u.created_at, lastSeen: u.last_seen, city: cityName, mode: st?.mode || null, x: st ? Math.round(st.x) : null, z: st ? Math.round(st.z) : null, cash: balanceOf(app.db, cashId(u.id)), savings: balanceOf(app.db, savId(u.id)), chatMutedUntil: u.chat_muted_until > now ? u.chat_muted_until : null, online: !!app.world?.players?.has(u.id), deleted: /^deleted_/.test(u.username) },
    ban, strikes, suggestBan: strikes >= MOD.strikesBeforeSuggestBan && !ban, history: hist, reportsAgainst: against, reportsFiled: { total: filed.n, dismissed: filed.d || 0 }, recentChat: chat };
}
export function overview(app) {
  const now = app.clock.now(); const q = (sql, ...a) => app.db.prepare(sql).get(...a).n;
  return { openReports: q("SELECT COUNT(DISTINCT kind || ':' || target_ref) n FROM reports WHERE status='open'"), actionedToday: q("SELECT COUNT(*) n FROM reports WHERE status='actioned' AND resolved_at>?", now - DAY),
    activeMutes: q("SELECT COUNT(*) n FROM sanctions WHERE kind='mute' AND lifted_at IS NULL AND until_at>?", now), activeBans: q("SELECT COUNT(*) n FROM sanctions WHERE kind='ban' AND lifted_at IS NULL AND (until_at IS NULL OR until_at>?)", now), warnings7d: q("SELECT COUNT(*) n FROM sanctions WHERE kind='warn' AND created_at>?", now - 7 * DAY),
    oldestOpenMs: (() => { const r = app.db.prepare("SELECT MIN(created_at) m FROM reports WHERE status='open'").get().m; return r ? now - r : 0; })() };
}
/** audit log viewer: filter by actor, action prefix or text, newest first */
export function auditLog(app, { actor = '', action = '', q = '', before = 0, limit = MOD.auditPageSize } = {}) {
  const w = [], a = []; if (actor) { w.push('actor=?'); a.push(String(actor)); } if (action) { w.push('action LIKE ?'); a.push(String(action).replace(/[%_]/g, '') + '%'); } if (q) { w.push('detail LIKE ?'); a.push('%' + String(q).replace(/[%_]/g, '') + '%'); } if (before) { w.push('id<?'); a.push(Number(before)); }
  const rows = app.db.prepare(`SELECT id, actor, action, detail, created_at FROM audit_log ${w.length ? 'WHERE ' + w.join(' AND ') : ''} ORDER BY id DESC LIMIT ?`).all(...a, Math.min(300, Number(limit) || MOD.auditPageSize));
  return { rows: rows.map(r => ({ id: r.id, actor: r.actor, action: r.action, detail: r.detail, at: r.created_at })), actions: app.db.prepare('SELECT DISTINCT action FROM audit_log ORDER BY action').all().map(r => r.action), actors: app.db.prepare('SELECT DISTINCT actor FROM audit_log ORDER BY actor').all().map(r => r.actor), counts: app.db.prepare('SELECT action, COUNT(*) n FROM audit_log GROUP BY action ORDER BY n DESC').all() };
}
/** what a player may see about sanctions against them (in the data download) */
export const exportMine = (app, uid) => app.db.prepare('SELECT id, kind, reason, note, until_at, created_at, lifted_at FROM sanctions WHERE user_id=? ORDER BY id').all(uid);
registerPlayerData('moderation', exportMine, () => { /* kept on purpose */ }, 'moderator warnings, mutes and bans (kept to stop repeat abuse)');
