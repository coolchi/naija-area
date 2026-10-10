// Age check screens. The server decides; this only collects consent and shows the result. We keep ONLY pass/fail and the date (see docs/AGE.md).
import { get, post, h } from './api.js';

const NOTICE = 'We check that you are 18 or over. We keep only whether you passed and the date. We do not keep your date of birth, name, ID number or photos. The check is done by a separate age-check service. Under-18s cannot buy ₦ or (when switched on) play.';

/** Body of the age check: status line + consent + start. `done()` is called once the player has passed. */
export function ageBody(ui, st, done) {
  const out = h('div', { class: 'mut' }); const box = h('input', { type: 'checkbox', id: 'ageConsent' });
  const refresh = async (ref) => { const r = await ui.guard(() => get('/api/age/status' + (ref ? `?ref=${encodeURIComponent(ref)}` : ''))); if (r) show(r); };
  const decide = (ref, outcome) => async () => { const r = await ui.guard(() => post('/api/age/mock/decide', { ref, outcome })); if (r) show(r); };
  const show = (r) => {
    if (r.status === 'pass') { out.textContent = 'Age verified. Thank you.'; done?.(r); return; }
    if (r.status === 'fail') { out.textContent = r.lockedOut ? 'This account did not pass the age check. Please contact support.' : 'This account did not pass the age check yet.'; return; }
    out.textContent = r.status === 'pending' ? 'Check started. Finish it, then come back here.' : 'Not verified yet.';
  };
  const go = async () => {
    const r = await ui.guard(() => post('/api/age/start', { consent: box.checked })); if (!r) return;
    if (st.provider === 'mock') { out.textContent = 'TEST: pretend to be the age-check service:'; out.append(h('div', { class: 'row' }, h('button', { class: 'btn', onclick: decide(r.sessionRef, 'over18') }, "I'm 18 or over"), h('button', { class: 'btn ghost', onclick: decide(r.sessionRef, 'under18') }, 'Under 18'), h('button', { class: 'btn ghost', onclick: decide(r.sessionRef, 'unreadable') }, "Couldn't read my ID"))); }
    else if (r.url) { location.href = r.url; } else refresh(r.sessionRef);
  };
  show(st);
  return h('div', {}, h('p', {}, NOTICE), h('label', { class: 'row' }, box, h('span', {}, ' I agree to the age check.')), h('div', { class: 'row' }, h('button', { class: 'btn', onclick: go }, 'Check my age')), out);
}
export async function ageSheet(ui, after) {
  const st = await ui.guard(() => get('/api/age/status')); if (!st || !st.enabled) return;
  ui.openSheet('Age check (18+)', [ageBody(ui, st, () => { after?.(); })]);
}
/** mode "play": nobody enters the world until the server records a pass. Resolves true once passed, false if blocked. */
export async function gate(game) {
  const cfg = game.cfg.ageCheck; if (!cfg || !cfg.enabled || cfg.mode !== 'play') return true;
  const st = await get('/api/age/status').catch(() => null); if (!st || st.status === 'pass') return true;
  return new Promise((resolve) => {
    const body = ageBody(game.ui, st, () => { setTimeout(() => { wrap.remove(); resolve(true); }, 800); });
    const wrap = h('div', { style: 'position:fixed;inset:0;z-index:50;background:#fffaf0;display:flex;align-items:center;justify-content:center;padding:20px' }, h('div', { class: 'card', style: 'max-width:420px;width:100%' }, h('h2', {}, 'Age check (18+)'), body));
    document.body.append(wrap);
    const ref = new URLSearchParams(location.search).get('age') && st.pendingRef; if (ref) get(`/api/age/status?ref=${encodeURIComponent(ref)}`).then((r) => { if (r.status === 'pass') { wrap.remove(); resolve(true); } }).catch(() => {});
  });
}
