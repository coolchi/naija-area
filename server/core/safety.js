// Trust & safety: reports (house names, chat, ad creatives) with an admin review queue, mute/block, chat mutes, auto-escalation.
import { bad, cleanText } from './util.js';
import { notify } from './economy.js';
import { decide, decideDesign } from './ads.js';
import { removeVoice } from './phone/phone.js';

export const REPORT_KINDS = ['house_name', 'chat', 'ad_creative', 'voice_note', 'phone_message'];
export const REASONS = ['abusive', 'sexual', 'hate', 'scam_spam', 'personal_info', 'misleading', 'other'];

/** is there a block (either direction) or, for viewer-centric hiding, a mute? */
export const isBlocked = (app, a, b) => !!app.db.prepare("SELECT 1 FROM user_blocks WHERE kind='block' AND ((blocker_id=? AND blocked_id=?) OR (blocker_id=? AND blocked_id=?))").get(a, b, b, a);
export const hiddenFrom = (app, viewer) => { // ids whose chat/ghosts the viewer should not see
  const rows = app.db.prepare("SELECT blocked_id id FROM user_blocks WHERE blocker_id=? UNION SELECT blocker_id FROM user_blocks WHERE blocked_id=? AND kind='block'").all(viewer, viewer); return new Set(rows.map(r => r.id));
};
export function setBlock(app, uid, username, kind) { // kind: 'mute' | 'block' | null (remove)
  const t = app.db.prepare('SELECT id, is_bot FROM users WHERE username=?').get(String(username || '').replace(/^@/, '')); if (!t) bad('NO_PLAYER', 'No player with that username.', 404); if (t.id === uid) bad('SELF', 'You cannot do that to yourself.');
  if (kind === null) { app.db.prepare('DELETE FROM user_blocks WHERE blocker_id=? AND blocked_id=?').run(uid, t.id); return { ok: true, kind: null }; }
  if (!['mute', 'block'].includes(kind)) bad('BAD_KIND', 'kind must be mute, block or null.');
  const n = app.db.prepare('SELECT COUNT(*) n FROM user_blocks WHERE blocker_id=?').get(uid).n; if (n >= app.balance.safety.maxBlocks && !app.db.prepare('SELECT 1 FROM user_blocks WHERE blocker_id=? AND blocked_id=?').get(uid, t.id)) bad('LIST_FULL', 'Your block list is full.', 409);
  app.db.prepare('INSERT INTO user_blocks(blocker_id,blocked_id,kind,created_at) VALUES (?,?,?,?) ON CONFLICT(blocker_id,blocked_id) DO UPDATE SET kind=excluded.kind').run(uid, t.id, kind, app.clock.now());
  return { ok: true, kind };
}
export const listBlocks = (app, uid) => app.db.prepare('SELECT u.username, b.kind, b.created_at FROM user_blocks b JOIN users u ON u.id=b.blocked_id WHERE b.blocker_id=? ORDER BY b.created_at DESC').all(uid);
/** record an automatic or report-driven chat pause in the sanction history so the moderator dashboard shows it */
const recordMute = (app, uid, until, reason, actor, ref) => app.db.prepare('INSERT INTO sanctions(user_id,kind,reason,note,until_at,actor,report_ref,created_at) VALUES (?,?,?,?,?,?,?,?)').run(uid, 'mute', reason, '', until, actor, ref, app.clock.now());
export const chatMuted = (app, uid) => app.db.prepare('SELECT chat_muted_until m FROM users WHERE id=?').get(uid)?.m > app.clock.now();

export function createReport(app, uid, { kind, target, reason, detail }) {
  if (!REPORT_KINDS.includes(kind)) bad('BAD_KIND', `kind must be one of ${REPORT_KINDS.join(', ')}.`);
  if (!REASONS.includes(reason)) bad('BAD_REASON', `reason must be one of ${REASONS.join(', ')}.`);
  const now = app.clock.now(); const S = app.balance.safety;
  if (!app.limiter.hit(`report:${uid}`, S.reportsPerHour, 3600000, now)) bad('RATE_LIMIT', 'You have sent a lot of reports. Please wait a bit.', 429);
  const ref = String(target ?? '').slice(0, 40); let targetUser = null, snapshot = '';
  if (kind === 'chat') { const m = app.db.prepare('SELECT id,user_id,username,text FROM chat_messages WHERE id=?').get(Number(ref)); if (!m) bad('NO_TARGET', 'That message is no longer available.', 404); if (m.user_id === uid) bad('SELF', 'You cannot report yourself.'); targetUser = m.user_id; snapshot = `@${m.username}: ${m.text}`; }
  else if (kind === 'voice_note') { const v = app.db.prepare('SELECT v.id, v.owner_id, v.status, t.user_a, t.user_b FROM voice_notes v JOIN phone_threads t ON t.id=v.thread_id WHERE v.id=?').get(Number(ref)); if (!v || v.status !== 'ready' || (v.user_a !== uid && v.user_b !== uid)) bad('NO_TARGET', 'That voice note is not available.', 404); if (v.owner_id === uid) bad('SELF', 'You cannot report yourself.'); targetUser = v.owner_id; snapshot = `voice note #${v.id} (audio is not shown to reviewers by default)`; }
  else if (kind === 'phone_message') { const m = app.db.prepare('SELECT m.id, m.sender_id, m.body, m.kind, t.user_a, t.user_b FROM phone_messages m JOIN phone_threads t ON t.id=m.thread_id WHERE m.id=?').get(Number(ref)); if (!m || m.kind !== 'text' || (m.user_a !== uid && m.user_b !== uid)) bad('NO_TARGET', 'That message is not available.', 404); if (m.sender_id === uid) bad('SELF', 'You cannot report yourself.'); targetUser = m.sender_id; snapshot = `@${app.db.prepare('SELECT username FROM users WHERE id=?').get(m.sender_id).username}: ${m.body}`; }
  else if (kind === 'house_name') { const o = app.db.prepare('SELECT po.user_id, po.custom_name, u.username FROM property_owner po JOIN users u ON u.id=po.user_id WHERE property_id=?').get(ref); if (!o || !o.custom_name) bad('NO_TARGET', 'That house has no custom name.', 404); if (o.user_id === uid) bad('SELF', 'That is your own house.'); targetUser = o.user_id; snapshot = `@${o.username}'s "${o.custom_name}"`; }
  else { const pr = parseAdRef(ref); const c = pr && app.db.prepare("SELECT c.id, c.status, c.headline, a.brand_name FROM ad_campaigns c JOIN advertisers a ON a.id=c.advertiser_id WHERE c.id=?").get(pr.campaign); if (!c || !['live', 'scheduled'].includes(c.status)) bad('NO_TARGET', 'That ad is not running.', 404);
    if (pr.design !== null && !app.db.prepare("SELECT 1 FROM ad_campaign_creatives WHERE campaign_id=? AND creative_id=? AND status='approved'").get(pr.campaign, pr.design)) bad('NO_TARGET', 'That design is not running.', 404); snapshot = `${c.brand_name}: ${c.headline || '(creative only)'}${pr.design !== null ? ` (design #${pr.design})` : ''}`; }
  try {
    app.db.prepare('INSERT INTO reports(reporter_id,kind,target_ref,target_user_id,reason,detail,snapshot,created_at) VALUES (?,?,?,?,?,?,?,?)').run(uid, kind, ref, targetUser, reason, cleanText(detail || '', 200), snapshot, now);
  } catch (e) { if (String(e.message).includes('UNIQUE')) bad('ALREADY_REPORTED', 'You already reported this. Thanks, we are on it.', 409); throw e; }
  autoEscalate(app, kind, ref, targetUser, now);
  return { ok: true, message: 'Thanks for telling us. A reviewer will look at it.' };
}
function autoEscalate(app, kind, ref, targetUser, now) {
  const S = app.balance.safety; const n = app.db.prepare("SELECT COUNT(DISTINCT reporter_id) n FROM reports WHERE kind=? AND target_ref=? AND status='open'").get(kind, ref).n;
  if (kind === 'house_name' && n >= S.autoHideAfter) { const r = app.db.prepare('UPDATE property_owner SET name_hidden=1 WHERE property_id=? AND name_hidden=0').run(ref); if (r.changes && targetUser) notify(app, targetUser, 'safety', 'Your house name was hidden while we review reports about it.'); }
  if (kind === 'chat' && targetUser) { const m = app.db.prepare("SELECT COUNT(DISTINCT reporter_id) n FROM reports WHERE kind='chat' AND target_user_id=? AND status='open' AND created_at>?").get(targetUser, now - 3600000).n; if (m >= S.autoMuteAfter) { app.db.prepare('UPDATE users SET chat_muted_until=MAX(chat_muted_until,?) WHERE id=?').run(now + S.autoMuteMs, targetUser); recordMute(app, targetUser, now + S.autoMuteMs, 'abusive', 'auto', `${kind}:${ref}`); notify(app, targetUser, 'safety', 'Chat is paused for you for a few minutes after several reports.'); } }
}
/** an ad report target: "<campaign>" (the whole campaign, as before) or "<campaign>:<design>" (one design). null if it is neither. */
export function parseAdRef(ref) { const m = /^(\d+)(?::(\d+))?$/.exec(String(ref)); return m ? { campaign: Number(m[1]), design: m[2] === undefined ? null : Number(m[2]) } : null; }
export function adminReports(app, statuses = ['open']) {
  const rows = app.db.prepare(`SELECT r.*, ru.username reporter, tu.username target_user FROM reports r JOIN users ru ON ru.id=r.reporter_id LEFT JOIN users tu ON tu.id=r.target_user_id WHERE r.status IN (${statuses.map(() => '?').join(',')}) ORDER BY r.id DESC LIMIT 300`).all(...statuses);
  const groups = new Map(); for (const r of rows) { const k = `${r.kind}:${r.target_ref}`; let g = groups.get(k); if (!g) { g = { id: r.id, kind: r.kind, target: r.target_ref, targetUser: r.target_user, snapshot: r.snapshot, status: r.status, reasons: {}, reporters: [], firstAt: r.created_at, lastAt: r.created_at, resolution: r.resolution, resolvedBy: r.resolved_by }; groups.set(k, g); } g.reasons[r.reason] = (g.reasons[r.reason] || 0) + 1; g.reporters.push(r.reporter); g.firstAt = Math.min(g.firstAt, r.created_at); g.lastAt = Math.max(g.lastAt, r.created_at); g.id = Math.max(g.id, r.id); }
  return [...groups.values()].map(g => ({ ...g, count: g.reporters.length, details: app.db.prepare('SELECT detail FROM reports WHERE kind=? AND target_ref=? AND detail!=\'\' LIMIT 5').all(g.kind, g.target).map(d => d.detail) })).sort((a, b) => b.count - a.count || b.lastAt - a.lastAt);
}
/** actions: dismiss | remove | remove_and_mute. Applies to every open report on the same target. */
export function resolve(app, kind, target, action, note, actor = 'admin') {
  if (!['dismiss', 'remove', 'remove_and_mute'].includes(action)) bad('BAD_ACTION', 'dismiss | remove | remove_and_mute');
  const open = app.db.prepare("SELECT * FROM reports WHERE kind=? AND target_ref=? AND status='open'").all(kind, String(target)); if (!open.length) bad('NO_REPORT', 'No open reports for that target.', 404);
  const now = app.clock.now(); const tu = open.find(r => r.target_user_id)?.target_user_id; let effect = 'none';
  app.db.transaction(() => {
    if (action !== 'dismiss') {
      if (kind === 'house_name') { app.db.prepare('UPDATE property_owner SET custom_name=NULL, name_hidden=0 WHERE property_id=?').run(String(target)); if (tu) notify(app, tu, 'safety', 'A reviewer removed your house name. Please pick a different one.'); effect = 'name_reset'; }
      else if (kind === 'voice_note') { removeVoice(app, Number(target), 'reported'); effect = 'voice_note_removed'; if (tu) notify(app, tu, 'safety', 'A reviewer removed one of your voice notes.'); }
      else if (kind === 'phone_message') { app.db.prepare('UPDATE phone_messages SET deleted_at=? WHERE id=?').run(now, Number(target)); effect = 'message_deleted'; if (tu) notify(app, tu, 'safety', 'A reviewer removed one of your messages.'); }
      else if (kind === 'chat') { app.db.prepare('DELETE FROM chat_messages WHERE id=?').run(Number(target)); effect = 'message_deleted'; if (action === 'remove_and_mute' && tu) { app.db.prepare('UPDATE users SET chat_muted_until=MAX(chat_muted_until,?) WHERE id=?').run(now + app.balance.safety.adminMuteMs, tu); recordMute(app, tu, now + app.balance.safety.adminMuteMs, 'abusive', actor, `${kind}:${target}`); notify(app, tu, 'safety', 'Chat is paused for your account after a review.'); effect += '+user_muted'; } }
      else { const pr = parseAdRef(String(target)); const c = pr && app.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(pr.campaign);
        if (pr && pr.design !== null && c && ['live', 'scheduled'].includes(c.status)) { decideDesign(app, pr.campaign, pr.design, 'reject', actor, note || 'reported design removed'); effect = 'design_removed'; } // a report on ONE design removes that design; the campaign's other designs keep running
        else { if (c && ['live', 'scheduled'].includes(c.status)) decide(app, pr.campaign, 'takedown', actor, note || 'reported creative removed'); else if (c && c.status === 'approved') app.db.prepare("UPDATE ad_campaigns SET reject_reason=? WHERE id=?").run(cleanText(note || 'removed after report', 200), pr.campaign); effect = 'campaign_taken_down'; } }
    } else if (kind === 'house_name') app.db.prepare('UPDATE property_owner SET name_hidden=0 WHERE property_id=?').run(String(target));
    app.db.prepare("UPDATE reports SET status=?, resolved_at=?, resolved_by=?, resolution=? WHERE kind=? AND target_ref=? AND status='open'").run(action === 'dismiss' ? 'dismissed' : 'actioned', now, actor, cleanText(`${action}${note ? ': ' + note : ''}`, 200), kind, String(target));
    app.db.prepare('INSERT INTO audit_log(actor,action,detail,created_at) VALUES (?,?,?,?)').run(actor, `report_${action}`, `${kind} ${target}: ${note || ''}`, now);
  })();
  return { ok: true, effect, reports: open.length };
}
