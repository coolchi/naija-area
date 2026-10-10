// More > Your data: download everything we hold about you, or close your account (erases and anonymises; money in the wallet is forfeited).
import { get, post, h } from './api.js';

export async function downloadData(g) {
  const d = await g.ui.guard(() => get('/api/account/export')); if (!d) return;
  const url = URL.createObjectURL(new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' })); const a = h('a', { href: url, download: `naija-area-${d.account.username}-${new Date().toISOString().slice(0, 10)}.json` });
  document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000); g.ui.toast('Your data was downloaded.');
}
export function closeAccountSheet(g) {
  const guest = !!g.user?.guest; const pw = h('input', { class: 'sheet-input', type: 'password', 'data-f': 'password', autocomplete: 'current-password', placeholder: 'Your password' }); const cf = h('input', { class: 'sheet-input', 'data-f': 'confirm', placeholder: 'Type DELETE', autocomplete: 'off' }); const err = h('div', { class: 'err' });
  g.ui.openSheet('Close my account', [
    h('p', {}, 'This cannot be undone. We erase your chat, messages, voice notes, friends, house, land, cars, worn items, choices, applications and ideas, and rename you to a deleted player. Money in your wallet is forfeited (it is game money).'),
    h('p', { class: 'mut' }, 'We keep what the law or the money book needs: anonymous ledger entries, real-money payment records, the age-check result and abuse reports. Download your data first if you want a copy.'),
    guest ? null : h('label', { class: 'field' }, h('span', {}, 'Password'), pw), h('label', { class: 'field' }, h('span', {}, 'Type DELETE to confirm'), cf), err,
    h('div', { class: 'row' }, h('button', { class: 'btn ghost', 'data-act': 'download', onclick: () => downloadData(g) }, 'Download my data first'), h('button', { class: 'btn red', 'data-act': 'close-account', onclick: async (e) => { err.textContent = ''; e.target.disabled = true; try { await post('/api/account/delete', { password: pw.value, confirm: cf.value }); g.ui.closeSheet(); location.reload(); } catch (er) { err.textContent = er.message; e.target.disabled = false; } } }, 'Close my account for good'))
  ]);
}
