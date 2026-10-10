// The Naija Area office: apply to join the contributor team, and share ideas (same fields and limits as the idea pipeline in ../ideas, so they can be exported into it).
// Applicants and idea authors need a registered account (guests cannot be found again). Everything here is private to the player and the admin backend.
import { bad, cleanText } from './util.js';
import { screen } from './filter.js';
import { notify } from './economy.js';
import { APPLY_ROLES, APPLY_RULES, APPLY_STATUS_TEXT, IDEA_CATEGORIES, IDEA_ROLES, IDEA_STATUSES, IDEA_RULES } from '../config/signup.js';
import { cityIdOf } from './cities.js';

const needAccount = (app, uid) => { const u = app.db.prepare('SELECT username,is_guest,is_bot FROM users WHERE id=?').get(uid); if (!u) bad('NO_PLAYER', 'Unknown player.', 401); if (u.is_guest || u.is_bot) bad('NEED_ACCOUNT', 'Create an account first (Sign up on the start screen) so we can find you again.', 403); return u; };
const multi = (s, max) => String(s ?? '').replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F<>]/g, '').trim().slice(0, max + 1);
const appView = (r) => r && ({ id: r.id, role: r.role, roleLabel: APPLY_ROLES.find(x => x.id === r.role)?.label || r.role, skills: r.skills, message: r.message, contact: r.contact, status: r.status, statusText: APPLY_STATUS_TEXT[r.status] || r.status, createdAt: r.created_at, reviewedAt: r.reviewed_at });
const myLatest = (app, uid) => app.db.prepare('SELECT * FROM applications WHERE user_id=? ORDER BY id DESC LIMIT 1').get(uid);
const ideaView = (r) => ({ id: r.id, category: r.category, title: r.title, description: r.description, why: r.why, priority: r.priority, status: r.status, createdAt: r.created_at });

export function info(app, uid) {
  const u = app.db.prepare('SELECT is_guest FROM users WHERE id=?').get(uid); const now = app.clock.now(); const day0 = now - 86400000;
  const mine = myLatest(app, uid); const ideas = app.db.prepare('SELECT * FROM office_ideas WHERE user_id=? ORDER BY id DESC LIMIT 10').all(uid); const today = app.db.prepare('SELECT COUNT(*) n FROM office_ideas WHERE user_id=? AND created_at>?').get(uid, day0).n;
  const canApply = !!u && !u.is_guest && (!mine || !APPLY_RULES.open.includes(mine.status) && mine.status !== 'accepted' && (mine.status !== 'declined' || now - (mine.reviewed_at || mine.created_at) >= APPLY_RULES.reapplyAfterDays * 86400000));
  return { account: !!u && !u.is_guest, roles: APPLY_ROLES, categories: IDEA_CATEGORIES, rules: { apply: { skills: APPLY_RULES.skills, message: APPLY_RULES.message, contact: APPLY_RULES.contact }, idea: IDEA_RULES }, application: appView(mine), canApply, ideas: ideas.map(ideaView), ideasToday: today, ideasLeftToday: Math.max(0, IDEA_RULES.perDay - today) };
}
export function apply(app, uid, body = {}) {
  const u = needAccount(app, uid); const now = app.clock.now(); const role = String(body.role || ''); if (!APPLY_ROLES.some(r => r.id === role)) bad('BAD_ROLE', 'Pick a role from the list.');
  const skills = cleanText(body.skills || '', APPLY_RULES.skills + 1); if (skills.length > APPLY_RULES.skills) bad('SKILLS_TOO_LONG', `Skills: at most ${APPLY_RULES.skills} characters.`);
  const message = multi(body.message, APPLY_RULES.message.max); if (message.length < APPLY_RULES.message.min) bad('MESSAGE_SHORT', `Tell us a little more (at least ${APPLY_RULES.message.min} characters).`); if (message.length > APPLY_RULES.message.max) bad('MESSAGE_LONG', `Keep it under ${APPLY_RULES.message.max} characters.`);
  for (const t of [skills, message]) { if (!t) continue; const sc = screen(t); if (!sc.ok) bad(sc.code, sc.message); }
  const contact = cleanText(body.contact || '', APPLY_RULES.contact + 1); if (contact.length > APPLY_RULES.contact) bad('CONTACT_TOO_LONG', 'Contact is too long.');
  if (contact && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact)) bad('BAD_CONTACT', 'Contact must be an email address (or leave it empty: we can reach you in the game).'); if (contact && body.contactOk !== true) bad('CONSENT_NEEDED', 'Tick the box to let us use that email to contact you about this application.');
  if (!app.limiter.hit(`apply:${uid}`, APPLY_RULES.perDayLimit, 86400000, now)) bad('RATE_LIMIT', 'You have applied a lot today. Try again tomorrow.', 429);
  return app.db.transaction(() => {
    const prev = myLatest(app, uid);
    if (prev) { if (APPLY_RULES.open.includes(prev.status)) bad('ALREADY_APPLIED', 'You already have an application with us. You can withdraw it and apply again.', 409); if (prev.status === 'accepted') bad('ALREADY_MEMBER', 'You are already on the team. Thank you!', 409); if (prev.status === 'declined' && now - (prev.reviewed_at || prev.created_at) < APPLY_RULES.reapplyAfterDays * 86400000) bad('TOO_SOON', `You can apply again ${APPLY_RULES.reapplyAfterDays} days after the last answer.`, 409); }
    const r = app.db.prepare('INSERT INTO applications(user_id,role,skills,message,contact,contact_ok,city_id,status,note,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)').run(uid, role, skills, message, contact || null, contact ? 1 : 0, cityIdOf(app, uid), 'new', '', now);
    notify(app, uid, 'office', 'We received your application to join the Naija Area team. Thank you, @' + u.username + '!');
    return { ok: true, application: appView(app.db.prepare('SELECT * FROM applications WHERE id=?').get(Number(r.lastInsertRowid))), text: 'Application sent. Thank you!' };
  })();
}
export function withdraw(app, uid) {
  needAccount(app, uid); const prev = myLatest(app, uid); if (!prev || !APPLY_RULES.open.includes(prev.status)) bad('NOTHING_TO_WITHDRAW', 'You have no open application.', 409);
  app.db.prepare("UPDATE applications SET status='withdrawn', reviewed_at=? WHERE id=?").run(app.clock.now(), prev.id); return { ok: true, application: appView(myLatest(app, uid)) };
}
export function shareIdea(app, uid, body = {}) {
  const u = needAccount(app, uid); const now = app.clock.now(); const category = String(body.category || ''); if (!IDEA_CATEGORIES.includes(category)) bad('BAD_CATEGORY', 'Pick a category from the list.');
  const title = cleanText(body.title || '', IDEA_RULES.title.max + 1), description = multi(body.description, IDEA_RULES.description.max), why = multi(body.why, IDEA_RULES.why.max); const pr = Number(body.priority);
  if (title.length < IDEA_RULES.title.min) bad('TITLE_SHORT', `Title needs at least ${IDEA_RULES.title.min} characters.`); if (title.length > IDEA_RULES.title.max) bad('TITLE_LONG', `Title: at most ${IDEA_RULES.title.max} characters.`);
  if (description.length < IDEA_RULES.description.min) bad('DESCRIPTION_SHORT', `Describe it a little more (at least ${IDEA_RULES.description.min} characters).`); if (description.length > IDEA_RULES.description.max) bad('DESCRIPTION_LONG', `Description: at most ${IDEA_RULES.description.max} characters.`); if (why.length > IDEA_RULES.why.max) bad('WHY_LONG', `Why it matters: at most ${IDEA_RULES.why.max} characters.`);
  if (!Number.isInteger(pr) || pr < 1 || pr > 5) bad('BAD_PRIORITY', 'Priority is a whole number from 1 to 5.');
  for (const t of [title, description, why]) { if (!t) continue; const sc = screen(t, { links: true }); if (!sc.ok) bad(sc.code, sc.message); }
  const today = app.db.prepare('SELECT COUNT(*) n FROM office_ideas WHERE user_id=? AND created_at>?').get(uid, now - 86400000).n; if (today >= IDEA_RULES.perDay) bad('IDEA_LIMIT', `That is ${IDEA_RULES.perDay} ideas in a day. Come back tomorrow with more!`, 429);
  if (app.db.prepare('SELECT 1 FROM office_ideas WHERE user_id=? AND lower(title)=lower(?)').get(uid, title)) bad('DUPLICATE_IDEA', 'You already shared an idea with that title.', 409);
  const mine = myLatest(app, uid); const role = mine?.status === 'accepted' ? ({ designer: 'designer', developer: 'dev', artist: 'designer', brand: 'brand' }[mine.role] || 'other') : 'player';
  const r = app.db.prepare('INSERT INTO office_ideas(user_id,role,category,title,description,why,priority,status,note,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)').run(uid, role, category, title, description, why, pr, 'new', '', now);
  notify(app, uid, 'office', `Thanks @${u.username}! Your idea "${title.slice(0, 40)}" is in the idea box.`); return { ok: true, id: Number(r.lastInsertRowid), text: 'Idea received. Thank you!', ideasLeftToday: Math.max(0, IDEA_RULES.perDay - today - 1) };
}

// ---- admin backend
export function adminApplications(app, statuses) {
  const st = (statuses && statuses.length ? statuses : APPLY_RULES.statuses).filter(s => APPLY_RULES.statuses.includes(s)); if (!st.length) return [];
  return app.db.prepare(`SELECT a.*, u.username, u.created_at AS joined FROM applications a JOIN users u ON u.id=a.user_id WHERE a.status IN (${st.map(() => '?').join(',')}) ORDER BY a.id DESC LIMIT 300`).all(...st)
    .map(r => ({ ...appView(r), username: r.username, userId: r.user_id, cityId: r.city_id, note: r.note, contactOk: !!r.contact_ok, joinedAt: r.joined, contact: r.contact_ok ? r.contact : null }));
}
export function adminSetApplication(app, id, status, note) {
  if (!APPLY_RULES.statuses.includes(status) || status === 'withdrawn') bad('BAD_STATUS', `Status: ${APPLY_RULES.statuses.filter(s => s !== 'withdrawn').join(', ')}.`); const a = app.db.prepare('SELECT * FROM applications WHERE id=?').get(id); if (!a) bad('NOT_FOUND', 'No such application.', 404);
  const n = multi(note || '', IDEA_RULES.note).slice(0, IDEA_RULES.note); const now = app.clock.now(); app.db.prepare('UPDATE applications SET status=?, note=?, reviewed_at=? WHERE id=?').run(status, n, now, id);
  if (status !== a.status && ['review', 'shortlisted', 'accepted', 'declined'].includes(status)) notify(app, a.user_id, 'office', `About your application to the Naija Area team: ${APPLY_STATUS_TEXT[status]}`);
  return { ok: true, id, status };
}
export function adminIdeas(app, statuses) {
  const st = (statuses && statuses.length ? statuses : IDEA_STATUSES).filter(s => IDEA_STATUSES.includes(s)); if (!st.length) return [];
  return app.db.prepare(`SELECT i.*, u.username FROM office_ideas i JOIN users u ON u.id=i.user_id WHERE i.status IN (${st.map(() => '?').join(',')}) ORDER BY i.id DESC LIMIT 300`).all(...st).map(r => ({ ...ideaView(r), username: r.username, userId: r.user_id, role: r.role, note: r.note, exportedAt: r.exported_at }));
}
export function adminSetIdea(app, id, status, note) {
  if (!IDEA_STATUSES.includes(status)) bad('BAD_STATUS', `Status: ${IDEA_STATUSES.join(', ')}.`); if (!app.db.prepare('SELECT 1 FROM office_ideas WHERE id=?').get(id)) bad('NOT_FOUND', 'No such idea.', 404);
  app.db.prepare('UPDATE office_ideas SET status=?, note=? WHERE id=?').run(status, multi(note || '', IDEA_RULES.note).slice(0, IDEA_RULES.note), id); return { ok: true, id, status };
}
/** ideas not yet exported, in the idea pipeline's record shape (ideas/lib/store.js). Accepted contributors get a contributor id (full weight); everyone else is anonymous (half weight). */
export function pipelineExport(app) {
  const rows = app.db.prepare("SELECT i.*, u.username, (SELECT status FROM applications a WHERE a.user_id=i.user_id ORDER BY a.id DESC LIMIT 1) AS astatus FROM office_ideas i JOIN users u ON u.id=i.user_id WHERE i.exported_at IS NULL AND i.status IN ('new','merged') ORDER BY i.id").all();
  return rows.map(r => { const member = r.astatus === 'accepted'; return { gameId: r.id, createdAt: new Date(r.created_at).toISOString(), name: member ? r.username : '', role: r.role, category: r.category, title: r.title, description: r.description, why: r.why, priority: r.priority, contributorId: member ? `G${r.user_id}` : null, contributorLabel: member ? r.username : null, source: 'game-office' }; });
}
export function markExported(app, ids) { const now = app.clock.now(); const up = app.db.prepare('UPDATE office_ideas SET exported_at=? WHERE id=? AND exported_at IS NULL'); let n = 0; for (const id of (Array.isArray(ids) ? ids : []).slice(0, 500)) if (Number.isInteger(id)) n += up.run(now, id).changes; return { ok: true, marked: n }; }
// ---- the player's own data (account deletion and download use these)
export function exportMine(app, uid) { return { applications: app.db.prepare('SELECT id,role,skills,message,contact,contact_ok,status,created_at,reviewed_at FROM applications WHERE user_id=? ORDER BY id').all(uid), ideas: app.db.prepare('SELECT id,role,category,title,description,why,priority,status,created_at FROM office_ideas WHERE user_id=? ORDER BY id').all(uid) }; }
export function deleteMine(app, uid) { app.db.prepare('DELETE FROM applications WHERE user_id=?').run(uid); app.db.prepare('DELETE FROM office_ideas WHERE user_id=?').run(uid); }
export const officeSummary = (app) => ({ applications: Object.fromEntries(app.db.prepare('SELECT status, COUNT(*) n FROM applications GROUP BY status').all().map(r => [r.status, r.n])), ideas: Object.fromEntries(app.db.prepare('SELECT status, COUNT(*) n FROM office_ideas GROUP BY status').all().map(r => [r.status, r.n])) });
