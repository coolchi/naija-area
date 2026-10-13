const $ = (s) => document.querySelector(s); const fmt = (n) => '₦' + Math.round(n).toLocaleString('en-NG'); const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const NICE = { auto_checks: 'Automatic checks', human_review: 'Waiting for human review', approved: 'Approved', scheduled: 'Scheduled', live: 'LIVE', completed: 'Completed', rejected: 'Rejected', takedown: 'Taken down', draft: 'Draft', pending_payment: 'Pending payment' };
async function load() {
  const key = $('#key').value.trim() || localStorage.getItem('na_adv_key'); if (!key) return; $('#err').textContent = '';
  const r = await fetch('/api/advertiser/campaigns', { headers: { 'x-advertiser-key': key } }); const d = await r.json().catch(() => ({})); if (!r.ok) { $('#err').textContent = d.message || 'Could not load'; return; }
  localStorage.setItem('na_adv_key', key); $('#login').style.display = 'none';
  $('#out').innerHTML = `<p class="ok">${esc(d.brand)}</p>` + (d.campaigns.length ? d.campaigns.map(c => card(c, key)).join('') : '<div class="card">No campaigns yet. <a href="/advertise">Book one</a>.</div>') + '<p><button class="ghost" id="logout">Forget my key on this device</button></p>';
  $('#logout')?.addEventListener('click', () => { localStorage.removeItem('na_adv_key'); location.reload(); });
}
const DST = { pending: ['Waiting for review', 'wait'], approved: ['Approved', 'live'], rejected: ['Rejected', 'bad'] };
/** one tile per design: its picture, its own review status and its own impressions (a rejected design can leave while the others keep running) */
function designs(c, key) { return `<div class="dgal">${c.designs.map((d, i) => { const st = DST[d.status] || [d.status, 'wait']; return `<figure class="dfig"><img class="prev" src="/media/creative/${d.creativeId}?key=${encodeURIComponent(key)}" alt="design ${i + 1}"><figcaption><b>Design ${i + 1}</b> <span class="tag ${st[1]}">${st[0]}</span><br><span class="mut">${d.validImpressions.toLocaleString()} valid of ${d.grossImpressions.toLocaleString()} gross</span>${d.rejectReason ? `<br><span class="err">${esc(d.rejectReason)}</span>` : ''}</figcaption></figure>`; }).join('')}</div>`; }
function card(c, key) {
  const s = c.stats; const cls = c.status === 'live' ? 'live' : ['rejected', 'takedown'].includes(c.status) ? 'bad' : 'wait';
  return `<div class="card"><div class="row"><b>#${c.id} · ${esc(c.headline || '(no headline)')}</b><span class="tag ${cls}">${NICE[c.status] || c.status}</span><span class="tag ${c.placement === 'exclusive' ? 'amber' : ''}">${esc(c.placementLabel)}</span><span class="mut">${c.surface.replace('_', ' ')} · ${c.units} board(s) · ${c.days} days</span></div>
  <div class="grid" style="margin-top:8px"><div>${designs(c, key)}</div>
  <div><table><tr><td>Valid impressions</td><th>${s.validImpressions.toLocaleString()}</th></tr><tr><td>Unique players</td><td>${s.uniquePlayers.toLocaleString()}</td></tr><tr><td>Filtered out (invalid)</td><td>${s.filteredOut.toLocaleString()} of ${s.grossImpressions.toLocaleString()} gross</td></tr><tr><td>Valid taps / CTR</td><td>${s.tapsValid} / ${s.ctrPct}%</td></tr><tr><td>Placement</td><td>${esc(c.placementLabel)}</td></tr><tr><td>Price (test)</td><td>${fmt(c.priceTotal)} incl. VAT</td></tr><tr><td>Boards</td><td>${c.slots.join(', ') || 'not assigned yet'}</td></tr></table></div></div>
  ${c.payment === 'awaiting_payment' ? `<p><b>Payment due: ${fmt(c.priceTotal)}</b> <span class="mut">(${esc(c.invoiceLines[0].description)}: ${fmt(c.priceNet)} + VAT ${fmt(c.priceVat)}). TEST MODE: no real money.</span> <button class="paybtn" data-id="${c.id}">Pay now (test)</button></p>` : c.payment === 'paid' ? `<p class="ok">Paid (test mode): ${fmt(c.priceTotal)} incl. VAT ${fmt(c.priceVat)}</p>` : c.payment === 'refunded' ? '<p class="mut">Refunded</p>' : ''}
  ${c.rejectReason ? `<p class="err">Reason: ${esc(c.rejectReason)}</p>` : ''}${c.flags.length ? `<p class="mut">Flags: ${c.flags.map(esc).join(', ')}</p>` : ''}
  ${s.filterReasons.length ? `<details><summary>Why impressions were filtered</summary><table>${s.filterReasons.map(r => `<tr><td>${esc(r.reason)}</td><td>${r.n}</td></tr>`).join('')}</table></details>` : ''}
  <details><summary>History</summary><table>${c.transitions.map(t => `<tr><td>${new Date(t.created_at).toLocaleString('en-NG')}</td><td>${esc(t.from_status || '')} → ${esc(t.to_status)}</td><td>${esc(t.actor)}${t.note ? ': ' + esc(t.note) : ''}</td></tr>`).join('')}</table></details></div>`;
}
document.addEventListener('click', async (e) => {
  const b = e.target.closest?.('.paybtn'); if (!b) return; const key = localStorage.getItem('na_adv_key'); b.disabled = true;
  const r = await fetch(`/api/advertiser/campaigns/${b.dataset.id}/pay`, { method: 'POST', headers: { 'x-advertiser-key': key, 'content-type': 'application/json' }, body: '{}' }); const d = await r.json().catch(() => ({}));
  if (!r.ok) { $('#err').textContent = d.message || 'Could not start the payment'; b.disabled = false; return; }
  if (d.payment.authorizationUrl && !d.payment.authorizationUrl.startsWith('/pay/mock')) { location.href = d.payment.authorizationUrl; return; }
  await fetch('/api/payments/mock/pay', { method: 'POST', headers: { 'x-advertiser-key': key, 'content-type': 'application/json' }, body: JSON.stringify({ ref: d.payment.ref }) }); load();
});
$('#go').onclick = load; load();
