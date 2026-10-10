// Admin backend tabs for the Naija Area office: applications, ideas, sign-up choices. Loaded after admin.js; shows data once the admin is logged in.
(() => {
const $ = (s) => document.querySelector(s); const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const j = async (p, o) => { const r = await fetch(p, o); const d = await r.json().catch(() => ({})); if (!r.ok) throw Object.assign(new Error(d.message || 'Error'), { status: r.status }); return d; };
const post = (p, b) => j(p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) });
const when = (ms) => new Date(ms).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' });
const box = 'box-shadow:none;border:2px solid #e3dcc2';
async function apps() {
  const d = await j('/api/admin/applications?status=' + encodeURIComponent($('#ast').value));
  $('#aq').innerHTML = d.rows.length ? d.rows.map(a => `<div class="card" style="${box}"><div class="row"><b>#${a.id} @${esc(a.username)}</b><span class="tag">${esc(a.roleLabel)}</span><span class="tag ${a.status === 'accepted' ? '' : 'wait'}">${esc(a.status)}</span><span class="mut">${when(a.createdAt)}</span></div>${a.skills ? `<p class="mut">Skills: ${esc(a.skills)}</p>` : ''}<p style="white-space:pre-wrap">${esc(a.message)}</p>${a.contact ? `<p class="mut">Contact (player agreed): ${esc(a.contact)}</p>` : ''}${a.note ? `<p class="mut">Note: ${esc(a.note)}</p>` : ''}<div class="row">${['review', 'shortlisted', 'accepted', 'declined'].filter(x => x !== a.status).map(x => `<button class="${x === 'declined' ? 'red' : x === 'accepted' ? '' : 'ghost'}" data-a="${x}" data-id="${a.id}">${x[0].toUpperCase() + x.slice(1)}</button>`).join('')}</div></div>`).join('') : '<p class="mut">Nothing here.</p>';
}
async function ideas() {
  const d = await j('/api/admin/ideas?status=' + encodeURIComponent($('#ist').value));
  $('#iq').innerHTML = (d.rows.length ? d.rows.map(i => `<div class="card" style="${box}"><div class="row"><b>#${i.id} ${esc(i.title)}</b><span class="tag">${esc(i.category)}</span><span class="tag">${esc(i.status)}</span><span class="mut">@${esc(i.username)} (${esc(i.role)}) · priority ${i.priority} · ${when(i.createdAt)}${i.exportedAt ? ' · exported' : ''}</span></div><p style="white-space:pre-wrap">${esc(i.description)}</p>${i.why ? `<p class="mut">Why: ${esc(i.why)}</p>` : ''}${i.note ? `<p class="mut">Note: ${esc(i.note)}</p>` : ''}<div class="row">${['merged', 'parked', 'built', 'rejected'].filter(x => x !== i.status).map(x => `<button class="${x === 'rejected' ? 'red' : 'ghost'}" data-i="${x}" data-id="${i.id}">${x[0].toUpperCase() + x.slice(1)}</button>`).join('')}</div></div>`).join('') : '<p class="mut">Nothing here.</p>') + '<div class="row"><button class="ghost" id="iexp">Download not-yet-exported ideas for the idea pipeline (JSON)</button></div>';
  $('#iexp').onclick = async () => { const x = await j('/api/admin/ideas/export'); const url = URL.createObjectURL(new Blob([JSON.stringify(x.rows, null, 2)], { type: 'application/json' })); const a = document.createElement('a'); a.href = url; a.download = 'office-ideas.json'; a.click(); if (x.rows.length && confirm(`Mark these ${x.rows.length} ideas as exported?`)) { await post('/api/admin/ideas/exported', { ids: x.rows.map(r => r.gameId) }); ideas(); } };
}
async function signups() {
  const d = await j('/api/admin/signups'); const list = (t, rows) => `<p><b>${t}</b></p>${rows.length ? `<table>${rows.map(r => `<tr><td>${esc(r.label)}</td><td>${r.n}</td></tr>`).join('')}</table>` : '<p class="mut">None yet.</p>'}`;
  $('#su').innerHTML = `<p class="mut">${d.total} players made choices (${d.done} finished, ${d.skipped} skipped).</p>${list('Home city', d.homeCities)}${list('City of interest', d.interestCities)}${list('Interests', d.interests)}`;
}
document.addEventListener('click', async (e) => {
  const a = e.target.closest('button[data-a]'); const i = e.target.closest('button[data-i]'); if (!a && !i) return; const b = a || i; const note = ['declined', 'rejected'].includes(b.dataset.a || b.dataset.i) ? (prompt('Note (optional, kept in the backend):') ?? '') : '';
  try { await post(`/api/admin/${a ? 'applications' : 'ideas'}/${b.dataset.id}/status`, { status: b.dataset.a || b.dataset.i, note }); await (a ? apps() : ideas()); } catch (er) { alert(er.message); }
});
const all = () => Promise.all([apps(), ideas(), signups()]).catch(() => {});
$('#ast').onchange = apps; $('#ist').onchange = ideas; $('#areload').onclick = apps; $('#ireload').onclick = ideas;
const t = setInterval(() => { if ($('#out')?.style.display === 'block') { clearInterval(t); all(); } }, 400);
$('#go')?.addEventListener('click', () => setTimeout(all, 1200));
})();
