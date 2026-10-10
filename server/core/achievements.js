// Achievements and titles. An achievement is a lifetime counter (progress-metrics.js) reaching a target (config/progress.js ACHIEVEMENTS). Earning one is recorded once;
// some carry a TITLE. The player shows one title after their name (chat, over their head, profile); with no choice made, the highest-ranked earned title shows.
import { bad } from './util.js';
import { notify } from './economy.js';
import { ACHIEVEMENTS } from '../config/progress.js';
import { measure } from './progress-metrics.js';
import { crownTitles } from './seasons.js';

const list = () => ACHIEVEMENTS.list; const byId = (id) => list().find(a => a.id === id);
const eligible = (app, uid) => { const u = app.db.prepare('SELECT is_bot FROM users WHERE id=?').get(uid); return !!u && !u.is_bot && ACHIEVEMENTS.enabled; };
const earnedRows = (app, uid) => app.db.prepare('SELECT id, earned_at FROM achievements WHERE user_id=?').all(uid);
const cache = (app) => (app._titleCache ||= new Map());
export const invalidate = (app, uid) => { cache(app).delete(uid); const p = app.world?.players?.get(uid); if (p) p.title = undefined; };

/** check every achievement not yet earned; record and announce new ones. Throttled per player (ACHIEVEMENTS.evalEveryMs) unless force. Returns the newly earned list. */
export function evaluate(app, uid, { force = false } = {}) {
  if (!eligible(app, uid)) return []; const now = app.clock.now(); const at = (app._achAt ||= new Map()); if (!force && now - (at.get(uid) || -1e12) < ACHIEVEMENTS.evalEveryMs) return []; at.set(uid, now);
  const have = new Set(earnedRows(app, uid).map(r => r.id)); const fresh = [];
  for (const a of list()) { if (have.has(a.id)) continue; if (measure(app, uid, a.metric) >= a.target) { app.db.prepare('INSERT INTO achievements(user_id,id,earned_at) VALUES (?,?,?)').run(uid, a.id, now); fresh.push(a); } }
  for (const a of fresh) notify(app, uid, 'achievement', `Achievement unlocked: ${a.icon} ${a.name}${a.title ? ` (title: ${a.title})` : ''}`);
  if (fresh.length) invalidate(app, uid); return fresh;
}
/** the title text to show after this player's name, or '' */
export function titleOf(app, uid) {
  const c = cache(app), hit = c.get(uid), now = app.clock.now(); if (hit && now - hit.at < 60000) return hit.text;
  const sel = app.db.prepare('SELECT title_id FROM player_titles WHERE user_id=?').get(uid); const have = new Map(earnedRows(app, uid).map(r => [r.id, r.earned_at])); let text = '';
  const crowns = crownTitles(app, uid);   // season winners: "S1 Money Maker"
  if (sel) { if (sel.title_id.startsWith('season:')) text = crowns.find(c => c.id === sel.title_id)?.text || ''; else { const a = byId(sel.title_id); if (a?.title && have.has(a.id)) text = a.title; } }
  else { for (const a of list()) if (a.title && have.has(a.id)) text = a.title; const win = crowns.find(c => c.latest); if (win) text = win.text; }   // the latest season's crown outranks the rest
  c.set(uid, { text, at: now }); return text;
}
export function view(app, uid) {
  if (!eligible(app, uid)) return { enabled: false }; evaluate(app, uid, { force: true }); const have = new Map(earnedRows(app, uid).map(r => [r.id, r.earned_at])); const sel = app.db.prepare('SELECT title_id FROM player_titles WHERE user_id=?').get(uid);
  const rows = list().map(a => { const raw = have.has(a.id) ? a.target : measure(app, uid, a.metric); return { id: a.id, icon: a.icon, name: a.name, desc: a.desc, target: a.target, progress: Math.min(a.target, raw), earned: have.has(a.id), earnedAt: have.get(a.id) || null, title: a.title || null }; });
  return { enabled: true, achievements: rows, earnedCount: rows.filter(r => r.earned).length, total: rows.length, titles: [...rows.filter(r => r.earned && r.title).map(r => ({ id: r.id, text: r.title })), ...crownTitles(app, uid).map(c => ({ id: c.id, text: c.text }))], selected: sel ? sel.title_id : null, showing: titleOf(app, uid) };
}
/** choose the title to show: an earned achievement id, or '' for none, or null to go back to automatic */
export function selectTitle(app, uid, id) {
  if (!eligible(app, uid)) bad('OFF', 'Titles are off.', 409); const now = app.clock.now();
  if (id === null || id === 'auto') app.db.prepare('DELETE FROM player_titles WHERE user_id=?').run(uid);
  else { if (typeof id === 'string' && id.startsWith('season:')) { if (!crownTitles(app, uid).some(c => c.id === id)) bad('NOT_EARNED', 'You have not won that title.', 409); } else if (id !== '') { const a = byId(id); if (!a?.title) bad('NO_TITLE', 'That achievement has no title.'); if (!earnedRows(app, uid).some(r => r.id === id)) bad('NOT_EARNED', 'You have not earned that yet.', 409); }
    const had = app.db.prepare('SELECT 1 FROM player_titles WHERE user_id=?').get(uid); if (had) app.db.prepare('UPDATE player_titles SET title_id=?, updated_at=? WHERE user_id=?').run(id, now, uid); else app.db.prepare('INSERT INTO player_titles(user_id,title_id,updated_at) VALUES (?,?,?)').run(uid, id, now); }
  invalidate(app, uid); return view(app, uid);
}
export const exportMine = (app, uid) => ({ earned: earnedRows(app, uid), chosenTitle: app.db.prepare('SELECT title_id FROM player_titles WHERE user_id=?').get(uid)?.title_id ?? null });
export const deleteMine = (app, uid) => { app.db.prepare('DELETE FROM achievements WHERE user_id=?').run(uid); app.db.prepare('DELETE FROM player_titles WHERE user_id=?').run(uid); invalidate(app, uid); };
