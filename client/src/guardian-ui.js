// Phone > Safety: chat, stakes, sending money, buying limit, daily play limit, quiet hours, break reminders and an optional PIN. The SERVER enforces all of it; this only shows and saves.
// Also: the play-time watcher (warnings, break reminders) and the full-screen "time is up" notice.
import { get, post, h, fmtN } from './api.js';

const CHAT = [['all', 'Everyone'], ['friends', 'Friends only'], ['off', 'Off']];
const hh = (n) => String(n).padStart(2, '0') + ':00';

export async function safetyBody(g, reopen) {
  const v = await get('/api/guardian'); if (!v.enabled) return [h('p', { class: 'mut' }, 'Safety settings are not available for this account.')];
  let pin = ''; const pinBox = h('input', { class: 'sheet-input', type: 'password', inputmode: 'numeric', maxlength: v.options.pin.maxLen, placeholder: 'Your safety PIN', 'data-gd-pin': 'current', oninput: (e) => { pin = e.target.value; } });
  const save = async (patch) => { try { await post('/api/guardian', { ...patch, ...(v.hasPin ? { pin } : {}) }); g.ui.toast('Saved', ''); g.audio?.play('ok'); } catch (e) { g.ui.toast(e.message, 'bad'); } reopen(); };
  const chips = (field, items, cur, fmt) => h('div', { class: 'quality-row' }, items.map(([val, label]) => h('button', { class: 'btn small ' + (cur === val ? '' : 'ghost'), 'data-gd': `${field}:${val}`, onclick: () => save({ [field]: val }) }, label)));
  const num = (arr, unit) => [[null, 'No limit'], ...arr.map(n => [n, unit(n)])];
  const eff = v.effective, S = v.saved; const lock = v.restricted ? h('p', { class: 'mut' }, '🔒 ' + v.note) : null;
  const cur = (f) => S[f]; const e = (f) => eff[f];
  const t = v.today; const played = t.counting ? `Today you have played ${t.playedMin} min${t.leftMin != null ? `; ${t.leftMin} min left` : ''}.` : 'No daily limit is set.';
  const cs = h('select', { class: 'sheet-input', 'data-gd-curfew': 'start' }, ...Array.from({ length: 24 }, (_, i) => h('option', { value: i, ...(i === (S.curfew?.start ?? 22) ? { selected: true } : {}) }, hh(i))));
  const ce = h('select', { class: 'sheet-input', 'data-gd-curfew': 'end' }, ...Array.from({ length: 24 }, (_, i) => h('option', { value: i, ...(i === (S.curfew?.end ?? 6) ? { selected: true } : {}) }, hh(i))));
  const pin1 = h('input', { class: 'sheet-input', type: 'password', inputmode: 'numeric', maxlength: v.options.pin.maxLen, placeholder: `New PIN (${v.options.pin.minLen} to ${v.options.pin.maxLen} digits)`, 'data-gd-pin': 'new' });
  const pinAct = async (action) => { try { await post('/api/guardian/pin', { action, pin: pin1.value, current: pin }); g.ui.toast(action === 'set' ? 'PIN saved' : 'PIN removed', ''); } catch (er) { g.ui.toast(er.message, 'bad'); } reopen(); };
  return [h('b', {}, '🛡 Safety settings'), h('p', { class: 'mut' }, 'Limits for you, or for whoever shares your phone. Naija Area is 18+; these settings help you stay in control. The server enforces them.'), lock,
    v.hasPin ? h('div', {}, h('p', { class: 'mut' }, '🔐 A PIN protects these settings. Enter it before you change anything.'), pinBox, v.pinLockedUntil ? h('p', { class: 'mut' }, 'Locked for a while after wrong tries.') : null) : null,
    h('p', { class: 'mut', 'data-gd-today': '1' }, played),
    h('b', {}, '💬 Who can chat with me'), chips('chat', CHAT, cur('chat')), eff.chat !== S.chat ? h('small', { class: 'mut' }, `In force: ${CHAT.find(c => c[0] === eff.chat)[1]}`) : null,
    h('b', {}, '🎲 Biggest stake I may play for'), chips('maxStake', [[null, 'No limit'], ...v.options.stakeOptions.map(n => [n, n === 0 ? 'No stakes' : fmtN(n)])], cur('maxStake')), e('maxStake') !== S.maxStake ? h('small', { class: 'mut' }, `In force: ${e('maxStake') === 0 ? 'no stakes' : fmtN(e('maxStake'))}`) : null,
    h('b', {}, '💸 Sending money to other players'), chips('transfersOff', [[false, 'Allowed'], [true, 'Blocked']], !!S.transfersOff),
    h('b', {}, '💳 My daily limit for buying ₦ with real money'), chips('topupDailyNgn', [[null, 'No limit of my own'], ...v.options.topupDailyOptionsNgn.map(n => [n, n === 0 ? 'Never' : fmtN(n)])], cur('topupDailyNgn')),
    h('b', {}, '⏱ Daily play limit'), chips('playLimitMin', num(v.options.playLimitOptions, (n) => `${n} min`), cur('playLimitMin')), h('small', { class: 'mut' }, 'When the time is up the game closes until midnight (Lagos time). Your own data and these settings stay available.'),
    h('b', {}, '🌙 Quiet hours (Lagos time)'), h('div', { class: 'row' }, cs, h('span', { class: 'mut' }, 'to'), ce, h('button', { class: 'btn small', 'data-gd': 'curfew:save', onclick: () => save({ curfew: { start: Number(cs.value), end: Number(ce.value) } }) }, 'Set'), h('button', { class: 'btn small ghost', 'data-gd': 'curfew:null', onclick: () => save({ curfew: null }) }, 'Off')),
    S.curfew ? h('small', { class: 'mut' }, `Closed from ${hh(S.curfew.start)} to ${hh(S.curfew.end)}.`) : null,
    h('b', {}, '☕ Remind me to take a break'), chips('breakEveryMin', num(v.options.breakOptions, (n) => `every ${n} min`), cur('breakEveryMin')),
    h('b', {}, '🔐 PIN'), h('p', { class: 'mut' }, v.hasPin ? 'A PIN is set. Forgot it? Contact support and it can be reset.' : 'Optional. A PIN stops anyone who does not know it from loosening these settings.'), pin1, h('div', { class: 'row' }, h('button', { class: 'btn small', 'data-gd': 'pin:set', onclick: () => pinAct('set') }, v.hasPin ? 'Change PIN' : 'Set PIN'), v.hasPin ? h('button', { class: 'btn small ghost', 'data-gd': 'pin:clear', onclick: () => pinAct('clear') }, 'Remove PIN') : null)].filter(Boolean);
}

/** the play-time watcher: warns before the limit, reminds you to take a break, and clears the "time is up" screen when the server lets the player back in */
export class GuardianWatch {
  constructor(g, now = () => Date.now()) { this.g = g; this.now = now; this.t0 = null; this.nextBreak = null; this.warned = new Set(); this.day = null; }
  onBeat(gd) {
    document.getElementById('breaktime')?.remove(); if (!gd) { this.t0 = null; return; }
    const t = this.now(); if (this.t0 === null) { this.t0 = t; this.nextBreak = gd.br ? gd.br * 60000 : null; } const say = (m) => { this.g.ui?.toast(m, 'bad'); this.g.audio?.play('notify'); };
    if (gd.left !== undefined) { for (const m of [10, 1]) { const k = 'left' + m; if (gd.left <= m && !this.warned.has(k)) { this.warned.add(k); say(m === 1 ? '⏱ About 1 minute of today\'s play time is left.' : `⏱ ${m} minutes of today's play time are left.`); } } if (gd.left > 10) { this.warned.delete('left10'); this.warned.delete('left1'); } }
    if (gd.curfewIn !== undefined && gd.curfewIn <= 10 && !this.warned.has('cur')) { this.warned.add('cur'); say(`🌙 Quiet hours start in ${Math.max(1, gd.curfewIn)} minute${gd.curfewIn <= 1 ? '' : 's'}.`); } if (gd.curfewIn === undefined || gd.curfewIn > 10) this.warned.delete('cur');
    if (gd.br && this.nextBreak !== null && t - this.t0 >= this.nextBreak) { const mins = Math.round((t - this.t0) / 60000); this.nextBreak += gd.br * 60000; this.g.ui?.toast(`☕ You have been playing for ${mins} minutes. Time for a short break?`, ''); }
  }
}
/** the full-screen notice when the server says the day's time is up (or quiet hours): why, until when, and the things that still work */
export function showBreak(g, data) {
  if (typeof document === 'undefined') return; let d = document.getElementById('breaktime'); const until = data.until ? new Date(data.until).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' }) : '';
  if (!d) { d = h('div', { id: 'breaktime' }); d.style.cssText = 'position:fixed;inset:0;z-index:998;background:#0f1b2cf2;color:#fff;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;font:700 16px Nunito,system-ui'; document.body.append(d); }
  const mk = (label, fn, cls = '') => h('button', { class: 'btn ' + cls, 'data-break': label, onclick: fn }, label);
  d.replaceChildren(h('div', { style: 'max-width:420px' }, h('div', { style: 'font-size:44px' }, data.why === 'curfew' ? '🌙' : '⏱'), h('p', { 'data-break-text': '1' }, data.message || 'Time for a break.'), until ? h('p', { class: 'mut' }, `Back in the game at about ${until} (Lagos time).`) : null,
    h('div', { class: 'row', style: 'justify-content:center;gap:8px;flex-wrap:wrap' }, mk('Change my safety settings', () => { d.remove(); g.ui.phone('safe'); }, 'alt'), mk('Download my data', () => { location.href = '/api/account/export'; }, 'ghost'), mk('Log out', async () => { await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {}); location.reload(); }, 'red'))));
}
