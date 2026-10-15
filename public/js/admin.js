const $ = (s) => document.querySelector(s); const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const j = async (p, o) => { const r = await fetch(p, o); const d = await r.json().catch(() => ({})); if (!r.ok) throw Object.assign(new Error(d.message || 'Error'), { status: r.status }); return d; };
const naira = (n) => '₦' + Math.round(Number(n) || 0).toLocaleString('en-NG');
const when = (ms) => ms ? new Date(ms).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' }) : '—';
const toast = (msg, bad = false) => {
  const host = $('#toasts'); if (!host || !msg) return;
  const el = document.createElement('div');
  el.className = 'toast' + (bad ? ' bad' : '');
  el.textContent = String(msg);
  host.appendChild(el);
  setTimeout(() => el.remove(), 3800);
};
window.adminToast = toast;
window.adminHooks = [];
const PAGES = ['overview', 'ads', 'players', 'reports', 'moderation', 'audit', 'applications', 'ideas', 'signups', 'payments', 'economy', 'treasures', 'world'];
const TITLES = { overview: 'Overview', ads: 'Adverts', players: 'Players', reports: 'Reports', moderation: 'Moderation', audit: 'Audit log', applications: 'Applications', ideas: 'Ideas', signups: 'Sign-up choices', payments: 'Payments', economy: 'Economy', treasures: 'Treasures', world: 'World' };
const SYS = { 'sys:faucet_start': 'Starting cash given out', 'sys:faucet_jobs': 'Job wages', 'sys:faucet_interest': 'Savings interest', 'sys:faucet_test_topup': 'Test top-ups', 'sys:faucet_casual': 'Casual game prizes', 'sys:faucet_land': 'Land income', 'sys:faucet_missions': 'Mission rewards', 'sys:faucet_business': 'Business income', 'sys:faucet_events': 'Event prizes', 'sys:faucet_pass': 'Pass rewards', 'sys:faucet_car_resale': 'Car resale', 'sys:faucet_treasure': 'Treasure finds', 'sys:faucet_referral': 'Referral bonuses', 'sys:sink_rent': 'Rent collected', 'sys:sink_shops': 'Shop sales', 'sys:sink_property': 'Property sales', 'sys:sink_furniture': 'Furniture sales', 'sys:sink_fees': 'Fees', 'sys:sink_transport': 'Transport fares', 'sys:sink_delivery': 'Delivery fees', 'sys:sink_cars': 'Car sales', 'sys:sink_decor': 'Decor sales', 'sys:sink_business': 'Business costs', 'sys:sink_market': 'Market fees', 'sys:sink_cosmetics': 'Cosmetic sales', 'sys:sink_clubs': 'Club fees', 'sys:sink_ads_extra': 'Ad extras', 'sys:ads_revenue_test': 'Test ad revenue', 'sys:escrow_games': 'Game escrow' };
let overviewCache = null;

function go(p) {
  const name = PAGES.includes(p) ? p : 'overview';
  document.querySelectorAll('.apage').forEach(s => { s.hidden = s.dataset.page !== name; });
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.page === name));
  $('#crumb').textContent = 'Admin · ' + TITLES[name];
  if (location.hash.slice(1) !== name) history.replaceState(null, '', '#' + name);
  const load = { ads: queue, players: players, reports: reports, payments: payments, economy: economy, treasures: treasures, world: world }[name];
  if (load) load().catch(e => console.error(e));
  window.adminHooks.forEach(fn => { try { fn(name); } catch (e) { console.error(e); } });
}
window.adminGo = go;

async function show() {
  try {
    overviewCache = await j('/api/admin/overview');
    $('#login').style.display = 'none'; $('#out').style.display = 'block'; $('#logout').style.display = '';
    renderOverview(overviewCache); go(location.hash.slice(1));
  } catch (e) { if (e.status !== 401) $('#err').textContent = e.message; }
}
function renderOverview(ov) {
  const camps = (ov.campaignsByStatus || []).map(c => `<span class="tag">${esc(c.status)}: <b>${c.n}</b></span>`).join(' ') || '<span class="mut">none</span>';
  const tr = ov.treasures || {};
  $('#ov').innerHTML = `<div class="tiles"><div class="tile"><span class="mut">Players</span><b>${ov.users}</b></div><div class="tile"><span class="mut">Online now</span><b>${ov.online}</b></div><div class="tile wide"><span class="mut">Money supply</span><b>${naira(ov.moneySupply)}</b></div><div class="tile"><span class="mut">Heartbeat</span><b>${ov.interval} ms</b></div>
<div class="tile"><span class="mut">Treasures left</span><b>${tr.remaining ?? '—'}</b></div><div class="tile"><span class="mut">Treasures taken</span><b>${tr.collected ?? '—'}</b></div></div>
<p>${ov.ledger.ok ? '<span class="ok">Ledger is balanced</span>' : '<span class="err">Ledger is broken: ' + esc(JSON.stringify(ov.ledger)) + '</span>'}</p>
<p class="mut">Campaigns</p><div class="row">${camps}</div>
<p class="mut" style="margin-top:12px">Open a page above for adverts, who is online, treasures, reports, the audit log, office ideas, and the test-mode books.</p>`;
}

const KIND = { house_name: 'House name', chat: 'Chat message', ad_creative: 'Ad creative', voice_note: 'Voice note', phone_message: 'Phone message' };
const actLabel = (k, action) => action === 'remove' ? (k === 'ad_creative' ? 'Take ad down' : k === 'chat' || k === 'phone_message' ? 'Delete message' : k === 'voice_note' ? 'Remove voice note' : 'Reset name') : action;
async function reports() {
  const d = await j('/api/admin/reports?status=' + encodeURIComponent($('#rst').value));
  $('#rq').innerHTML = d.rows.length ? d.rows.map(r => `<div class="card" style="box-shadow:none;border:2px solid #e3dcc2"><div class="row"><b>${KIND[r.kind] || esc(r.kind)} · ${esc(r.target)}</b><span class="tag ${r.count >= 3 ? 'bad' : 'wait'}">${r.count} report${r.count > 1 ? 's' : ''}</span><span class="tag">${esc(r.status)}</span>${r.targetUser ? `<span class="mut">by @${esc(r.targetUser)}</span><button class="ghost" data-lookup="${esc(r.targetUser)}" data-ref="${esc(r.kind + ':' + r.target)}">Open player</button>` : ''}</div>
<p>${esc(r.snapshot)}</p>
<p class="mut">First ${when(r.firstAt)} · last ${when(r.lastAt)}</p>
<p class="mut">Reasons: ${Object.entries(r.reasons).map(([k, n]) => esc(k) + ' ×' + n).join(', ')} · reporters: ${r.reporters.map(esc).join(', ')}</p>
${r.details.length ? `<p class="mut">Notes: ${r.details.map(esc).join(' | ')}</p>` : ''}
${r.status === 'open' ? `<div class="row"><button class="ghost" data-r="dismiss" data-k="${r.kind}" data-t="${esc(r.target)}">Dismiss</button><button class="red" data-r="remove" data-k="${r.kind}" data-t="${esc(r.target)}">${actLabel(r.kind, 'remove')}</button>${r.kind === 'chat' ? `<button class="red" data-r="remove_and_mute" data-k="${r.kind}" data-t="${esc(r.target)}">Delete + pause chat 1h</button>` : ''}</div>` : `<p class="mut">${esc(r.resolution || '')} (${esc(r.resolvedBy || '')})</p>`}</div>`).join('') : '<p class="mut">No reports.</p>';
}
document.addEventListener('click', async (e) => {
  const b = e.target.closest('button[data-r]'); if (!b) return;
  const note = b.dataset.r === 'dismiss' ? '' : (prompt('Note for the audit log (optional):') ?? null); if (note === null) return;
  try { await j('/api/admin/reports/resolve', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: b.dataset.k, target: b.dataset.t, action: b.dataset.r, note }) }); await reports(); } catch (er) { alert(er.message); }
});

let adRows = [];
let adView = null;
let adTicket = 0;
function paintAd() {
  const box = $('#adModal');
  if (!adView) { box.hidden = true; return; }
  const c = adRows.find(r => r.id === adView.id);
  if (!c) { adView = null; box.hidden = true; return; }
  const designs = c.designs || [];
  const n = designs.length;
  const i = n ? ((adView.index % n) + n) % n : 0;
  adView.index = i;
  const dsg = designs[i];
  box.hidden = false;
  $('#adModalTitle').textContent = `#${c.id} ${c.brand}` + (n > 1 ? ` · design ${i + 1} of ${n}` : '');
  const img = $('#adModalImg');
  if (dsg) { img.hidden = false; img.src = '/media/creative/' + dsg.creativeId; img.alt = `${c.brand} design ${i + 1}`; }
  else { img.hidden = true; img.removeAttribute('src'); img.alt = 'No design'; }
  $('#adPrev').hidden = n < 2;
  $('#adNext').hidden = n < 2;
  const s = c.stats || {};
  const reasons = (s.filterReasons || []).map(r => `${esc(r.reason)} ×${r.n}`).join(', ');
  $('#adModalMeta').innerHTML = `<p><b>${esc(c.headline || '(no headline)')}</b> <span class="tag">${esc(c.status)}</span> <span class="tag ${c.placement === 'exclusive' ? 'amber' : ''}">${esc(c.placementLabel)}</span>${c.demo ? ' <span class="tag">demo</span>' : ''}</p>
<p class="mut">${esc(c.cityName || c.cityId || '—')} · ${esc(c.surface)} ${esc(c.tier)} ×${c.units} · ${c.days} days · ${naira(c.priceTotal)} · ${esc(c.email || '')}</p>
${dsg ? `<p>Design ${i + 1}${n ? '/' + n : ''} <span class="tag">${esc(dsg.status)}</span> <span class="mut">${dsg.validImpressions} valid / ${dsg.grossImpressions} gross${dsg.filteredOut ? ' · ' + dsg.filteredOut + ' filtered' : ''}</span>${dsg.rejectReason ? `<br><span class="err">${esc(dsg.rejectReason)}</span>` : ''}</p>` : '<p class="mut">No designs on this board.</p>'}
<p class="mut">Whole campaign: ${s.validImpressions || 0} valid / ${s.grossImpressions || 0} gross · ${s.tapsValid || 0} taps · click rate ${s.ctrPct || 0}%</p>
${reasons ? `<p class="mut">Filtered because: ${reasons}</p>` : ''}${c.flags?.length ? `<p class="err">Flags: ${c.flags.map(esc).join(', ')}</p>` : ''}${c.rejectReason ? `<p class="err">${esc(c.rejectReason)}</p>` : ''}`;
  const locked = ['rejected', 'completed'].includes(c.status);
  const designBtn = !dsg || locked ? '' : `<button class="${dsg.status === 'rejected' ? '' : 'red'}" data-design="${dsg.status === 'rejected' ? 'approve' : 'reject'}" data-id="${c.id}" data-cid="${dsg.creativeId}">${dsg.status === 'rejected' ? 'Allow this design' : 'Reject this design'}</button>`;
  const take = c.status === 'live' || c.status === 'scheduled' ? `<button class="alt" data-d="takedown" data-id="${c.id}">Take down</button>` : '';
  $('#adModalActs').innerHTML = `${designBtn}<button data-d="approve" data-id="${c.id}">Approve</button><button class="red" data-d="reject" data-id="${c.id}">Reject</button>${take}`;
}
function openAd(id, index) { adView = { id: Number(id), index: Number(index) || 0 }; paintAd(); }
function closeAd() { adView = null; const box = $('#adModal'); if (box) box.hidden = true; }

async function queue() {
  const status = $('#st').value;
  const ticket = ++adTicket;
  $('#q').innerHTML = '<p class="mut">Loading…</p>';
  let d;
  try { d = await j('/api/admin/queue?status=' + encodeURIComponent(status)); }
  catch (e) { if (ticket === adTicket) $('#q').innerHTML = `<p class="err">${esc(e.message)}</p>`; return; }
  if (ticket !== adTicket || $('#st').value !== status) return;
  const rows = d.rows || [];
  adRows = rows;
  const tot = rows.reduce((a, c) => { const s = c.stats || {}; a.valid += s.validImpressions || 0; a.gross += s.grossImpressions || 0; a.filtered += s.filteredOut || 0; a.taps += s.tapsValid || 0; return a; }, { valid: 0, gross: 0, filtered: 0, taps: 0 });
  const ctr = tot.valid ? Math.round((tot.taps / tot.valid) * 10000) / 100 : 0;
  $('#adStats').innerHTML = [['Campaigns', rows.length], ['Valid impressions', tot.valid.toLocaleString('en-NG')], ['Filtered out', tot.filtered.toLocaleString('en-NG')], ['Taps', tot.taps.toLocaleString('en-NG')], ['Click rate', ctr + '%']].map(([k, v]) => `<div class="tile"><span class="mut">${k}</span><b>${v}</b></div>`).join('');
  $('#q').innerHTML = rows.length ? `<table class="adtable"><tr><th></th><th>Campaign</th><th>Impressions</th><th>Taps</th><th>Where</th></tr>${rows.map(c => {
    const s = c.stats || {};
    const designs = c.designs || [];
    const first = designs[0];
    const thumb = first ? `<button type="button" class="adthumb" data-adopen="${c.id}" data-adi="0" aria-label="${designs.length > 1 ? 'Preview ' + designs.length + ' designs' : 'Preview this design'}"><img class="prev" src="/media/creative/${first.creativeId}" alt="">${designs.length > 1 ? `<span class="adcount" aria-hidden="true">${designs.length}</span>` : ''}</button>` : `<button type="button" class="adthumb" data-adopen="${c.id}" data-adi="0">No design</button>`;
    return `<tr><td>${thumb}</td><td><b>#${c.id} ${esc(c.brand)}</b> <span class="tag">${esc(c.status)}</span> <span class="tag ${c.placement === 'exclusive' ? 'amber' : ''}">${esc(c.placementLabel)}</span>${c.demo ? ' <span class="tag">demo</span>' : ''}${designs.length > 1 ? ` <span class="mut">${designs.length} designs</span>` : ''}<br>${esc(c.headline || '(no headline)')}<br><span class="mut">${esc(c.email)}</span></td><td><b>${(s.validImpressions || 0).toLocaleString('en-NG')}</b> valid<br><span class="mut">${(s.grossImpressions || 0).toLocaleString('en-NG')} gross · ${s.filteredOut || 0} filtered</span></td><td><b>${s.tapsValid || 0}</b><br><span class="mut">${s.ctrPct || 0}%</span></td><td>${esc(c.cityName || c.cityId || '—')}<br><span class="mut">${esc(c.surface)} ${esc(c.tier)} ×${c.units} · ${c.days}d</span><br><b>${naira(c.priceTotal)}</b></td></tr>`;
  }).join('')}</table>` : '<p class="mut">Nothing here.</p>';
  if (adView) paintAd();
}
document.addEventListener('click', async (e) => {
  if (e.target.id === 'adModal' || e.target.closest('#adModalClose')) { closeAd(); return; }
  const step = e.target.closest('[data-adstep]'); if (step && adView) { adView.index += Number(step.dataset.adstep); paintAd(); return; }
  const open = e.target.closest('[data-adopen]'); if (open) { openAd(open.dataset.adopen, open.dataset.adi); return; }
  const dg = e.target.closest('button[data-design]'); if (dg) { let reason = ''; if (dg.dataset.design === 'reject') { reason = prompt('Reason for rejecting this design (shown to the advertiser):') || ''; if (!reason) return; } try { await j(`/api/admin/campaigns/${dg.dataset.id}/designs/${dg.dataset.cid}/decision`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ decision: dg.dataset.design, reason }) }); await queue(); } catch (er) { alert(er.message); } return; }
  const b = e.target.closest('button[data-d]'); if (!b) return; let reason = ''; if (b.dataset.d !== 'approve') { reason = prompt('Reason (shown to the advertiser):') || ''; if (!reason) return; } try { await j(`/api/admin/campaigns/${b.dataset.id}/decision`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ decision: b.dataset.d, reason }) }); await queue(); } catch (er) { alert(er.message); }
});
document.addEventListener('keydown', (e) => {
  if (!adView) return;
  if (e.key === 'Escape') closeAd();
  else if (e.key === 'ArrowLeft') { adView.index -= 1; paintAd(); }
  else if (e.key === 'ArrowRight') { adView.index += 1; paintAd(); }
});

async function players() {
  const d = await j('/api/admin/players?scope=' + encodeURIComponent($('#plScope').value) + '&q=' + encodeURIComponent($('#plQ').value.trim()));
  const c = d.counts;
  $('#plCounts').innerHTML = [['Players', c.players], ['Online now', c.online], ['Active 24h', c.active], ['Guests', c.guests], ['Bots', c.bots]].map(([k, v]) => `<div class="tile"><span class="mut">${k}</span><b>${v}</b></div>`).join('');
  $('#plRows').innerHTML = d.rows.length ? `<table><tr><th>Player</th><th>Where</th><th>Cash</th><th>Savings</th><th>Homes</th><th>Last seen</th><th>Joined</th><th></th></tr>${d.rows.map(r => `<tr><td><b>@${esc(r.username)}</b> <span class="mut">#${r.id}</span>${r.online ? ' <span class="tag live">online</span>' : ''}${r.guest ? ' <span class="tag">guest</span>' : ''}${r.banned ? ' <span class="tag bad">banned</span>' : ''}${r.deleted ? ' <span class="tag bad">closed</span>' : ''}${r.homeChoice ? `<br><span class="mut">home ${esc(r.homeChoice)}${r.interestChoice ? ' · interest ' + esc(r.interestChoice) : ''}${r.signupSkipped ? ' · skipped set-up' : ''}</span>` : ''}</td><td>${esc(r.city || '—')}${r.mode ? `<br><span class="mut">${esc(r.mode)} ${r.x},${r.z}</span>` : ''}</td><td>${naira(r.cash)}</td><td>${naira(r.savings)}</td><td>${r.homes}</td><td>${when(r.lastSeen)}</td><td>${when(r.createdAt)}</td><td><button class="ghost" data-lookup="${esc(r.username)}">Open</button></td></tr>`).join('')}</table>` : '<p class="mut">Nobody matches.</p>';
}

async function payments() {
  const st = $('#paySt').value; const d = await j('/api/admin/payments' + (st ? '?status=' + encodeURIComponent(st) : ''));
  $('#payRows').innerHTML = d.rows.length ? `<table><tr><th>When</th><th>Ref</th><th>What</th><th>Status</th><th>Total</th><th>Credit</th><th>Who</th><th>Note</th></tr>${d.rows.map(r => `<tr><td>${when(r.createdAt)}</td><td><code>${esc(r.ref)}</code></td><td>${esc(r.purpose)}${r.campaignId ? ' · campaign ' + r.campaignId : ''}</td><td><span class="tag ${r.status === 'paid' ? 'live' : r.status === 'failed' || r.status === 'review' ? 'bad' : 'wait'}">${esc(r.status)}</span></td><td>${naira(r.total)}<br><span class="mut">net ${naira(r.net)} + VAT ${naira(r.vat)}</span></td><td>${r.credit ? naira(r.credit) : '—'}${r.refunded ? '<br><span class="mut">refunded ' + naira(r.refunded) + '</span>' : ''}</td><td>${r.userId ? '#' + r.userId : '—'}</td><td class="mut">${esc(r.note || '')}${r.paidAt ? '<br>paid ' + when(r.paidAt) : ''}</td></tr>`).join('')}</table>` : '<p class="mut">No payments.</p>';
}
async function reconcile() {
  const d = await j('/api/admin/payments/reconcile'); const t = d.totals || {};
  const kobo = (n) => naira((n || 0) / 100);
  $('#recOut').innerHTML = `<p>${d.ok ? '<span class="ok">Books match.</span>' : '<span class="err">Something needs a person.</span>'} <span class="mut">${d.testMode ? 'Test mode.' : ''} ${t.count || 0} payments, ${t.paid || 0} paid. Gross ${kobo(t.grossKobo)}, VAT ${kobo(t.vatKobo)}, refunded ${kobo(t.refundedKobo)}. Game money sold ${naira(d.gameMoneySold)}.</span></p>${(d.issues || []).length ? `<table><tr><th>Ref</th><th>Kind</th><th>Detail</th></tr>${d.issues.map(i => `<tr><td>${esc(i.ref || '')}</td><td>${esc(i.kind)}</td><td>${esc(i.detail)}</td></tr>`).join('')}</table>` : ''}`;
}

function economy() {
  const ov = overviewCache; if (!ov) return Promise.resolve();
  const rows = (ov.systemAccounts || []).map(a => `<tr><td>${esc(SYS[a.id] || a.id)}</td><td><code>${esc(a.id)}</code></td><td>${naira(a.balance)}</td></tr>`).join('');
  $('#eco').innerHTML = `<div class="tiles"><div class="tile wide"><span class="mut">Money in player hands</span><b>${naira(ov.moneySupply)}</b></div><div class="tile"><span class="mut">Ledger</span><b>${ov.ledger.ok ? 'OK' : 'Broken'}</b></div></div><div class="scroll"><table><tr><th>Account</th><th>Id</th><th>Balance</th></tr>${rows}</table></div>`;
  return Promise.resolve();
}

async function treasures() {
  const city = $('#trCity').value; const view = $('#trView').value; const q = $('#trQ').value.trim();
  const d = await j('/api/admin/treasures?city=' + encodeURIComponent(city) + '&q=' + encodeURIComponent(q));
  const s = d.summary || {};
  const citySel = $('#trCity'); const cur = citySel.value;
  if (citySel.options.length <= 1) {
    for (const c of d.cities || []) {
      const o = document.createElement('option'); o.value = c.id; o.textContent = c.name; citySel.appendChild(o);
    }
  }
  citySel.value = cur || city;
  $('#trTiles').innerHTML = [['Total', s.total], ['Remaining', s.remaining], ['Collected', s.collected], ['Paid out', naira(s.paidOut)]].map(([k, v]) => `<div class="tile"><span class="mut">${k}</span><b>${v}</b></div>`).join('');
  let rows = d.rows || [];
  if (view === 'remaining') rows = d.remaining || rows.filter((r) => !r.taken);
  else if (view === 'collected') rows = d.collected || rows.filter((r) => r.taken);
  $('#trRows').innerHTML = rows.length ? `<table><tr><th>Status</th><th>Treasure</th><th>City</th><th>Where</th><th>Worth</th><th>Collected by</th><th>When</th></tr>${rows.map((r) => `<tr>
<td>${r.taken ? '<span class="tag">collected</span>' : '<span class="tag live">remaining</span>'}</td>
<td><code>${esc(r.id)}</code></td>
<td>${esc(r.city)}</td>
<td><span class="mut">${Number(r.x).toFixed(1)}, ${Number(r.z).toFixed(1)}</span></td>
<td><b>${naira(r.worth)}</b></td>
<td>${r.collector ? `<b>@${esc(r.collector.username)}</b> <span class="mut">#${r.collector.id}</span> <button class="ghost" data-lookup="${esc(r.collector.username)}">Open</button>` : '<span class="mut">—</span>'}</td>
<td>${when(r.claimedAt)}</td>
</tr>`).join('')}</table>` : '<p class="mut">No treasures match.</p>';
}

const fmtWorld = (w) => {
  if (!w) return '—';
  const h12 = ((w.hour + 11) % 12) + 1;
  return `${h12}:${String(w.minute).padStart(2, '0')} ${w.hour >= 12 ? 'PM' : 'AM'} · Day ${w.day}`;
};
async function world() {
  const radio = await j('/api/admin/radio');
  try {
    const t = await j('/api/admin/time');
    $('#timeNow').textContent = 'Now: ' + fmtWorld(t.world);
    if (t.world) { $('#timeH').value = t.world.hour; $('#timeM').value = t.world.minute; }
  } catch { $('#timeNow').textContent = '—'; }
  $('#radioOn').textContent = radio.realRadio ? 'Radio is on — click to turn off' : 'Radio is off — click to turn on';
  $('#radioOn').dataset.on = radio.realRadio ? '1' : '0';
}

$('#go').onclick = async () => { $('#err').textContent = ''; try { await j('/api/admin/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password: $('#pw').value, code: $('#code').value }) }); await show(); } catch (e) { $('#err').textContent = e.message; } };
$('#logout').onclick = async () => { await j('/api/admin/logout', { method: 'POST' }).catch(() => {}); location.href = '/admin'; };
$('#nav').onclick = (e) => { const a = e.target.closest('a[data-page]'); if (!a) return; e.preventDefault(); go(a.dataset.page); };
$('#st').onchange = queue; $('#reload').onclick = queue; $('#rst').onchange = reports; $('#rreload').onclick = reports;
$('#plScope').onchange = players; $('#plGo').onclick = players; $('#plQ').addEventListener('keydown', (e) => { if (e.key === 'Enter') players(); });
$('#paySt').onchange = payments; $('#payGo').onclick = payments; $('#recGo').onclick = () => reconcile().catch(e => alert(e.message));
$('#trCity').onchange = treasures; $('#trView').onchange = treasures; $('#trGo').onclick = treasures; $('#trQ').addEventListener('keydown', (e) => { if (e.key === 'Enter') treasures(); });
$('#radioOn').onclick = async () => { try { const on = $('#radioOn').dataset.on !== '1'; const r = await j('/api/admin/radio', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ enabled: on }) }); toast(r.realRadio ? 'Radio is on.' : 'Radio is off.'); await world(); } catch (e) { toast(e.message, true); } };
$('#wxGo').onclick = async () => { try { const r = await j('/api/admin/weather', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ state: $('#wx').value }) }); toast(r.forced ? 'Weather set to ' + r.forced + '.' : 'Weather is automatic again.'); } catch (e) { toast(e.message, true); } };
const setGameTime = async (hour, minute) => {
  const r = await j('/api/admin/time', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ hour, minute }) });
  $('#timeNow').textContent = 'Now: ' + fmtWorld(r.world);
  toast('Game time set to ' + fmtWorld(r.world) + '.');
};
$('#timeGo').onclick = async () => { try { await setGameTime(Number($('#timeH').value), Number($('#timeM').value)); } catch (e) { toast(e.message, true); } };
$('#timeNoon').onclick = async () => { try { $('#timeH').value = 12; $('#timeM').value = 0; await setGameTime(12, 0); } catch (e) { toast(e.message, true); } };
$('#tickGo').onclick = async () => { try { await j('/api/admin/tick', { method: 'POST' }); toast('Ran rent, interest, land and ads.'); } catch (e) { toast(e.message, true); } };
window.adminStart = show;
