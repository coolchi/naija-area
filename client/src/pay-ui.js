// Wallet "Buy ₦" card (payments, TEST MODE). The server decides prices and credits; this only shows the VAT line, collects an email for the receipt,
// starts the payment and, with the stand-in (mock) gateway, plays the customer paying. With a real Monipay TEST key it sends you to their hosted checkout.
import { get, post, fmtN, h } from './api.js';
import { ageSheet } from './age-ui.js';

export function buyCard(ui) {
  const g = ui.g; const cfg = g.cfg.payments; if (!cfg || !cfg.enabled) return null;
  const email = h('input', { class: 'sheet-input', type: 'email', placeholder: 'Email for your receipt', autocomplete: 'email' }); const out = h('div', { class: 'mut' });
  const start = async (pk) => {
    if (g.user?.isGuest) { ui.toast('Make a free account first. Guests cannot buy ₦.', 'bad'); return; }
    if (g.cfg.ageCheck?.required) { const a = await get('/api/age/status').catch(() => null); if (a && a.status !== 'pass') { ageSheet(ui, () => ui.toast('Age verified. You can buy now.', 'money')); return; } }
    const r = await ui.guard(() => post('/api/payments/topup', { pack: pk.id, email: email.value.trim(), idem: crypto.randomUUID?.() || String(Math.random()) })); if (!r) return;
    const pay = r.payment; out.textContent = `Payment ${pay.ref.slice(-8)}: ${pay.status}`;
    if (cfg.provider === 'mock') { // stand-in gateway: no card, no money
      const done = await ui.guard(() => post('/api/payments/mock/pay', { ref: pay.ref })); if (done) { g.update(done.user); ui.toast(`+${fmtN(pk.credit)} (TEST payment, no real money)`, 'money'); out.textContent = 'Paid (test).'; }
    } else if (pay.authorizationUrl) { location.href = pay.authorizationUrl; }
  };
  return h('div', { class: 'card', style: 'box-shadow:none;border:2px dashed #cfc8ac;padding:12px;margin:10px 0' },
    h('b', {}, 'Buy ₦ (TEST MODE)'), h('div', { class: 'mut' }, 'No real money moves in test mode. Bought ₦ stays in the game: it cannot be cashed out, and accounts that buy ₦ cannot send money to other players.'),
    email, h('div', { class: 'chips' }, cfg.packs.map(pk => h('button', { class: 'chip', onclick: () => start(pk) }, `${fmtN(pk.credit)} for ₦${pk.total.toLocaleString('en-NG')}`, h('small', { class: 'mut' }, ` (incl. VAT ₦${pk.vat.toLocaleString('en-NG')})`)))), out);
}
/** After the hosted checkout sends the player back with ?pay=<ref>, ask the server what happened (it asks the gateway; the URL is never trusted). */
export async function checkReturn(ui) {
  const ref = new URLSearchParams(location.search).get('pay'); if (!ref) return;
  history.replaceState(null, '', location.pathname);
  const r = await ui.guard(() => get(`/api/payments/status?ref=${encodeURIComponent(ref)}`)); if (!r) return;
  if (r.user) ui.g.update(r.user);
  ui.toast(r.payment.status === 'paid' ? `Payment received: +${fmtN(r.payment.credit)}` : `Payment is ${r.payment.status}.`, r.payment.status === 'paid' ? 'money' : '');
}
