const $ = (s) => document.querySelector(s); const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const j = async (p, o) => { const r = await fetch(p, o); const d = await r.json().catch(() => ({})); if (!r.ok) throw Object.assign(new Error(d.message || 'Error'), { status: r.status }); return d; };
const naira = (n) => '₦' + Math.round(Number(n) || 0).toLocaleString('en-NG');
const when = (ms) => ms ? new Date(ms).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' }) : '—';
window.adminHooks = [];
const PAGES = ['overview', 'ads', 'players', 'reports', 'moderation', 'audit', 'applications', 'ideas', 'signups', 'payments', 'economy', 'world'];
const TITLES = { overview: 'Overview', ads: 'Adverts', players: 'Players', reports: 'Reports', moderation: 'Moderation', audit: 'Audit log', applications: 'Applications', ideas: 'Ideas', signups: 'Sign-up choices', payments: 'Payments', economy: 'Economy', world: 'World' };
const SYS = { 'sys:faucet_start': 'Starting cash given out', 'sys:faucet_jobs': 'Job wages', 'sys:faucet_interest': 'Savings interest', 'sys:faucet_test_topup': 'Test top-ups', 'sys:faucet_casual': 'Casual game prizes', 'sys:faucet_land': 'Land income', 'sys:faucet_missions': 'Mission rewards', 'sys:faucet_business': 'Business income', 'sys:faucet_events': 'Event prizes', 'sys:faucet_pass': 'Pass rewards', 'sys:faucet_car_resale': 'Car resale', 'sys:sink_rent': 'Rent collected', 'sys:sink_shops': 'Shop sales', 'sys:sink_property': 'Property sales', 'sys:sink_furniture': 'Furniture sales', 'sys:sink_fees': 'Fees', 'sys:sink_transport': 'Transport fares', 'sys:sink_delivery': 'Delivery fees', 'sys:sink_cars': 'Car sales', 'sys:sink_decor': 'Decor sales', 'sys:sink_business': 'Business costs', 'sys:sink_market': 'Market fees', 'sys:sink_cosmetics': 'Cosmetic sales', 'sys:sink_clubs': 'Club fees', 'sys:sink_ads_extra': 'Ad extras', 'sys:ads_revenue_test': 'Test ad revenue', 'sys:escrow_games': 'Game escrow' };
let overviewCache = null;

function go(p) {
  const name = PAGES.includes(p) ? p : 'overview';
  document.querySelectorAll('.apage').forEach(s => { s.hidden = s.dataset.page !== name; });
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.page === name));
  $('#crumb').textContent = 'Admin · ' + TITLES[name];
  if (location.hash.slice(1) !== name) history.replaceState(null, '', '#' + name);
  const load = { ads: queue, players: players, reports: reports, payments: payments, economy: economy, world: world }[name];
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
  $('#ov').innerHTML = `<div class="tiles"><div class="tile"><span class="mut">Players</span><b>${ov.users}</b></div><div class="tile"><span class="mut">Online now</span><b>${ov.online}</b></div><div class="tile"><span class="mut">Money supply</span><b>${naira(ov.moneySupply)}</b></div><div class="tile"><span class="mut">Heartbeat</span><b>${ov.interval} ms</b></div></div>
<p>${ov.ledger.ok ? '<span class="ok">Ledger is balanced</span>' : '<span class="err">Ledger is broken: ' + esc(JSON.stringify(ov.ledger)) + '</span>'}</p>
<p class="mut">Campaigns</p><div class="row">${camps}</div>
<p class="mut" style="margin-top:12px">Open a page above for adverts, who is online, reports, the audit log, office ideas, and the test-mode books.</p>`;
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

async function queue() {
  const d = await j('/api/admin/queue?status=' + encodeURIComponent($('#st').value));
  const rows = d.rows || [];
  const tot = rows.reduce((a, c) => { const s = c.stats || {}; a.valid += s.validImpressions || 0; a.gross += s.grossImpressions || 0; a.filtered += s.filteredOut || 0; a.taps += s.tapsValid || 0; return a; }, { valid: 0, gross: 0, filtered: 0, taps: 0 });
  const ctr = tot.valid ? Math.round((tot.taps / tot.valid) * 10000) / 100 : 0;
  $('#adStats').innerHTML = [['Campaigns', rows.length], ['Valid impressions', tot.valid.toLocaleString('en-NG')], ['Filtered out', tot.filtered.toLocaleString('en-NG')], ['Taps', tot.taps.toLocaleString('en-NG')], ['Click rate', ctr + '%']].map(([k, v]) => `<div class="tile"><span class="mut">${k}</span><b>${v}</b></div>`).join('');
  $('#q').innerHTML = rows.length ? `<table class="adtable"><tr><th></th><th>Campaign</th><th>Impressions</th><th>Taps</th><th>Where</th><th></th></tr>${rows.map(c => {
    const s = c.stats || {};
    const reasons = (s.filterReasons || []).map(r => `${esc(r.reason)} ×${r.n}`).join(', ');
    const thumbs = (c.designs || []).map((dsg, i) => `<figure class="dfig"><img class="prev" src="/media/creative/${dsg.creativeId}" alt="design ${i + 1}"><figcaption><span class="tag">${esc(dsg.status)}</span> ${dsg.validImpressions}/${dsg.grossImpressions}${dsg.rejectReason ? `<br><span class="err">${esc(dsg.rejectReason)}</span>` : ''}${['rejected', 'completed'].includes(c.status) ? '' : `<br><button class="${dsg.status === 'rejected' ? '' : 'red'} small" data-design="${dsg.status === 'rejected' ? 'approve' : 'reject'}" data-id="${c.id}" data-cid="${dsg.creativeId}">${dsg.status === 'rejected' ? 'Allow' : 'Reject'}</button>`}</figcaption></figure>`).join('') || '<span class="mut">No designs</span>';
    return `<tr><td>${thumbs}</td><td><b>#${c.id} ${esc(c.brand)}</b> <span class="tag">${esc(c.status)}</span> <span class="tag ${c.placement === 'exclusive' ? 'amber' : ''}">${esc(c.placementLabel)}</span>${c.demo ? ' <span class="tag">demo</span>' : ''}<br>${esc(c.headline || '(no headline)')}<br><span class="mut">${esc(c.email)}</span>${c.flags.length ? `<br><span class="err">Flags: ${c.flags.map(esc).join(', ')}</span>` : ''}${c.rejectReason ? `<br><span class="err">${esc(c.rejectReason)}</span>` : ''}</td><td><b>${(s.validImpressions || 0).toLocaleString('en-NG')}</b> valid<br><span class="mut">${(s.grossImpressions || 0).toLocaleString('en-NG')} gross · ${s.filteredOut || 0} filtered · ${s.uniquePlayers || 0} players</span>${reasons ? `<br><span class="mut">${reasons}</span>` : ''}</td><td><b>${s.tapsValid || 0}</b> <span class="mut">/ ${s.tapsGross || 0}</span><br><span class="mut">${s.ctrPct || 0}%</span></td><td>${esc(c.cityName || c.cityId || '—')}<br><span class="mut">${esc(c.surface)} ${esc(c.tier)} ×${c.units} · ${c.days}d</span><br><b>${naira(c.priceTotal)}</b> <span class="mut">${esc(c.payment || '')}</span><br><span class="mut">${c.startAt ? when(c.startAt) + ' → ' + when(c.endAt) : 'not scheduled'}</span></td><td><div class="row"><button class="small" data-d="approve" data-id="${c.id}">Approve</button><button class="red small" data-d="reject" data-id="${c.id}">Reject</button>${c.status === 'live' || c.status === 'scheduled' ? `<button class="alt small" data-d="takedown" data-id="${c.id}">Take down</button>` : ''}</div></td></tr>`;
  }).join('')}</table>` : '<p class="mut">Nothing here.</p>';
}
document.addEventListener('click', async (e) => {
  const dg = e.target.closest('button[data-design]'); if (dg) { let reason = ''; if (dg.dataset.design === 'reject') { reason = prompt('Reason for rejecting this design (shown to the advertiser):') || ''; if (!reason) return; } try { await j(`/api/admin/campaigns/${dg.dataset.id}/designs/${dg.dataset.cid}/decision`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ decision: dg.dataset.design, reason }) }); await queue(); } catch (er) { alert(er.message); } return; }
  const b = e.target.closest('button[data-d]'); if (!b) return; let reason = ''; if (b.dataset.d !== 'approve') { reason = prompt('Reason (shown to the advertiser):') || ''; if (!reason) return; } try { await j(`/api/admin/campaigns/${b.dataset.id}/decision`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ decision: b.dataset.d, reason }) }); await queue(); } catch (er) { alert(er.message); }
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
  $('#eco').innerHTML = `<div class="tiles"><div class="tile"><span class="mut">Money in player hands</span><b>${naira(ov.moneySupply)}</b></div><div class="tile"><span class="mut">Ledger</span><b>${ov.ledger.ok ? 'OK' : 'Broken'}</b></div></div><div class="scroll"><table><tr><th>Account</th><th>Id</th><th>Balance</th></tr>${rows}</table></div>`;
  return Promise.resolve();
}

async function world() {
  const radio = await j('/api/admin/radio');
  $('#radioOn').textContent = radio.realRadio ? 'Radio is on — click to turn off' : 'Radio is off — click to turn on';
  $('#radioOn').dataset.on = radio.realRadio ? '1' : '0';
}

$('#go').onclick = async () => { $('#err').textContent = ''; try { await j('/api/admin/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password: $('#pw').value, code: $('#code').value }) }); await show(); } catch (e) { $('#err').textContent = e.message; } };
$('#logout').onclick = async () => { await j('/api/admin/logout', { method: 'POST' }).catch(() => {}); location.href = '/admin'; };
$('#nav').onclick = (e) => { const a = e.target.closest('a[data-page]'); if (!a) return; e.preventDefault(); go(a.dataset.page); };
$('#st').onchange = queue; $('#reload').onclick = queue; $('#rst').onchange = reports; $('#rreload').onclick = reports;
$('#plScope').onchange = players; $('#plGo').onclick = players; $('#plQ').addEventListener('keydown', (e) => { if (e.key === 'Enter') players(); });
$('#paySt').onchange = payments; $('#payGo').onclick = payments; $('#recGo').onclick = () => reconcile().catch(e => alert(e.message));
$('#radioOn').onclick = async () => { try { const on = $('#radioOn').dataset.on !== '1'; const r = await j('/api/admin/radio', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ enabled: on }) }); $('#worldMsg').textContent = r.realRadio ? 'Radio is on.' : 'Radio is off.'; await world(); } catch (e) { $('#worldMsg').textContent = e.message; } };
$('#wxGo').onclick = async () => { try { const r = await j('/api/admin/weather', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ state: $('#wx').value }) }); $('#worldMsg').textContent = r.forced ? 'Weather forced to ' + r.forced + '.' : 'Weather is automatic again.'; } catch (e) { $('#worldMsg').textContent = e.message; } };
$('#tickGo').onclick = async () => { try { const r = await j('/api/admin/tick', { method: 'POST' }); $('#worldMsg').textContent = 'Ran jobs. Ads ' + JSON.stringify(r.ads) + '.'; } catch (e) { $('#worldMsg').textContent = e.message; } };
window.adminStart = show;
