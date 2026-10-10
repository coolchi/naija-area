import { bad } from '../util.js';
import * as age from './index.js';

export function ageRoutes(route) {
  route('GET', '/api/age/status', { auth: 'user' }, async (c) => { if (c.query.ref && c.app.age) await age.completeCheck(c.app, c.query.ref, { uid: c.uid }); return age.publicStatus(c.app, c.uid); });
  route('POST', '/api/age/start', { auth: 'user' }, async (c) => ({ ok: true, ...await age.startCheck(c.app, c.uid, { consent: c.body.consent }) }));
  route('POST', '/api/age/complete', { auth: 'user' }, async (c) => ({ ok: true, ...await age.completeCheck(c.app, c.body.ref, { uid: c.uid }) }));
  route('POST', '/api/age/webhook', async (c) => {
    if (!c.app.limiter.hit(`awh:${c.ip}`, c.app.age?.cfg.webhookPerMinPerIp ?? 120, 60000, c.app.clock.now())) bad('RATE_LIMIT', 'Too many webhook calls.', 429);
    return age.handleWebhook(c.app, c.raw, c.headers);
  });
  // stand-in only: plays the vendor's screen (no real ID, no real face). 404 for any real provider.
  route('POST', '/api/age/mock/decide', { auth: 'user' }, async (c) => {
    const pr = c.app.age?.provider; if (!pr || pr.id !== 'mock') bad('NOT_FOUND', 'Not found', 404);
    const s = c.app.db.prepare('SELECT * FROM age_sessions WHERE session_ref=?').get(String(c.body.ref || '')); if (!s || s.user_id !== c.uid) bad('NO_SESSION', 'No such check.', 404);
    pr.decide(s.session_ref, ['over18', 'under18', 'unreadable'].includes(c.body.outcome) ? c.body.outcome : bad('BAD_OUTCOME', 'over18 | under18 | unreadable'));
    return { ok: true, ...await age.completeCheck(c.app, s.session_ref, { uid: c.uid }) };
  });
  route('GET', '/api/admin/age', { auth: 'admin' }, (c) => age.adminSummary(c.app));
  route('POST', '/api/admin/age/:username/erase', { auth: 'admin' }, (c) => { const u = c.app.db.prepare('SELECT id FROM users WHERE username=?').get(c.params.username); if (!u) bad('NO_USER', 'No such user', 404); return { ok: true, ...age.erase(c.app, u.id) }; });
  route('POST', '/api/admin/age/:username/reopen', { auth: 'admin' }, (c) => { const u = c.app.db.prepare('SELECT id FROM users WHERE username=?').get(c.params.username); if (!u) bad('NO_USER', 'No such user', 404); return { ok: true, ...age.reopen(c.app, u.id) }; });
}
