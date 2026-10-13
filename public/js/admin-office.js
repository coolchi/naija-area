// Admin pages for the Naija Area office: applications, ideas, sign-up choices. Loaded after admin.js.
(() => {
const $ = (s) => document.querySelector(s); const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const j = async (p, o) => { const r = await fetch(p, o); const d = await r.json().catch(() => ({})); if (!r.ok) throw Object.assign(new Error(d.message || 'Error'), { status: r.status }); return d; };
const post = (p, b) => j(p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) });
const when = (ms) => new Date(ms).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' });
const box = 'box-shadow:none;border:2px solid #e3dcc2';
const chips = (obj) => Object.entries(obj || {}).map(([k, v]) => `<span class="tag">${esc(k)}: <b>${v}</b></span>`).join(' ') || '<span class="mut">None yet.</span>';
let ideaRows = [];

async function apps() {
  const d = await j('/api/admin/applications?status=' + encodeURIComponent($('#ast').value));
  $('#appSum').innerHTML = chips(d.summary?.applications);
  $('#aq').innerHTML = d.rows.length ? d.rows.map(a => `<div class="card" style="${box}"><div class="row"><b>#${a.id} @${esc(a.username)}</b><span class="tag">#${a.userId}</span><span class="tag">${esc(a.roleLabel)}</span><span class="tag ${a.status === 'accepted' ? 'live' : a.status === 'declined' ? 'bad' : 'wait'}">${esc(a.status)}</span><span class="mut">${when(a.createdAt)}</span></div>
<p class="mut">${esc(a.statusText || '')}${a.cityId ? ' · city ' + esc(a.cityId) : ''} · joined ${when(a.joinedAt)}${a.reviewedAt ? ' · reviewed ' + when(a.reviewedAt) : ''}</p>
${a.skills ? `<p class="mut">Skills: ${esc(a.skills)}</p>` : ''}<p style="white-space:pre-wrap">${esc(a.message)}</p>${a.contact ? `<p class="mut">Contact (player agreed): ${esc(a.contact)}</p>` : '<p class="mut">No contact email. Reach them in the game.</p>'}${a.note ? `<p class="mut">Note: ${esc(a.note)}</p>` : ''}<div class="row">${['review', 'shortlisted', 'accepted', 'declined'].filter(x => x !== a.status).map(x => `<button class="${x === 'declined' ? 'red' : x === 'accepted' ? '' : 'ghost'}" data-a="${x}" data-id="${a.id}">${x[0].toUpperCase() + x.slice(1)}</button>`).join('')}</div></div>`).join('') : '<p class="mut">Nothing here.</p>';
}
function drawIdeas() {
  const q = ($('#iFind').value || '').trim().toLowerCase();
  const rows = ideaRows.filter(i => !q || `${i.title} ${i.username} ${i.category} ${i.description}`.toLowerCase().includes(q));
  $('#iq').innerHTML = (rows.length ? rows.map(i => `<div class="card" style="${box}"><div class="row"><b>#${i.id} ${esc(i.title)}</b><span class="tag">${esc(i.category)}</span><span class="tag">${esc(i.status)}</span><span class="tag">priority ${i.priority}/5</span><span class="mut">@${esc(i.username)} #${i.userId} · ${esc(i.role)} · ${when(i.createdAt)}${i.exportedAt ? ' · exported ' + when(i.exportedAt) : ' · not exported'}</span></div><p style="white-space:pre-wrap">${esc(i.description)}</p>${i.why ? `<p class="mut">Why it matters: ${esc(i.why)}</p>` : ''}${i.note ? `<p class="mut">Note: ${esc(i.note)}</p>` : ''}<div class="row">${['merged', 'parked', 'built', 'rejected'].filter(x => x !== i.status).map(x => `<button class="${x === 'rejected' ? 'red' : 'ghost'}" data-i="${x}" data-id="${i.id}">${x[0].toUpperCase() + x.slice(1)}</button>`).join('')}</div></div>`).join('') : '<p class="mut">Nothing here.</p>') + '<div class="row"><button class="ghost" id="iexp">Download not-yet-exported ideas for the idea pipeline (JSON)</button></div>';
  $('#iexp').onclick = async () => { const x = await j('/api/admin/ideas/export'); const url = URL.createObjectURL(new Blob([JSON.stringify(x.rows, null, 2)], { type: 'application/json' })); const a = document.createElement('a'); a.href = url; a.download = 'office-ideas.json'; a.click(); if (x.rows.length && confirm(`Mark these ${x.rows.length} ideas as exported?`)) { await post('/api/admin/ideas/exported', { ids: x.rows.map(r => r.gameId) }); ideas(); } };
}
async function ideas() {
  const d = await j('/api/admin/ideas?status=' + encodeURIComponent($('#ist').value));
  ideaRows = d.rows; $('#ideaSum').innerHTML = chips(d.summary?.ideas); drawIdeas();
}
function bars(title, rows, total) {
  const max = Math.max(1, ...rows.map(r => r.n), 1);
  return `<h3>${title}</h3>${rows.length ? rows.map(r => `<div class="bar"><span>${esc(r.label)}</span><span class="mut">${r.n}${total ? ' · ' + Math.round(100 * r.n / total) + '%' : ''}</span><i style="width:${Math.round(100 * r.n / max)}%"></i></div>`).join('') : '<p class="mut">None yet.</p>'}`;
}
async function signups() {
  const d = await j('/api/admin/signups');
  const recent = (d.recent || []).map(r => `<tr><td>@${esc(r.username)} <span class="mut">#${r.id}</span></td><td>${r.skipped ? '<span class="tag">skipped</span>' : esc(r.home || '—')}</td><td>${esc(r.interest || '—')}</td><td>${r.interests.map(esc).join(', ') || '—'}</td><td>${when(r.at)}</td></tr>`).join('');
  $('#su').innerHTML = `<div class="tiles"><div class="tile"><span class="mut">Made a choice</span><b>${d.total}</b></div><div class="tile"><span class="mut">Finished</span><b>${d.done}</b></div><div class="tile"><span class="mut">Skipped</span><b>${d.skipped}</b></div></div><p class="mut">${d.total} player${d.total === 1 ? '' : 's'} made choices (${d.done} finished, ${d.skipped} skipped).</p>${bars('Home city', d.homeCities, d.done)}${bars('City of interest', d.interestCities, d.done)}${bars('Interests', d.interests, d.done)}<h3>Recent choices</h3>${recent ? `<div class="scroll"><table><tr><th>Player</th><th>Home</th><th>City of interest</th><th>Interests</th><th>When</th></tr>${recent}</table></div>` : '<p class="mut">None yet.</p>'}`;
}
document.addEventListener('click', async (e) => {
  const a = e.target.closest('button[data-a]'); const i = e.target.closest('button[data-i]'); if (!a && !i) return; const b = a || i; const note = ['declined', 'rejected'].includes(b.dataset.a || b.dataset.i) ? (prompt('Note (optional, kept in the backend):') ?? '') : '';
  try { await post(`/api/admin/${a ? 'applications' : 'ideas'}/${b.dataset.id}/status`, { status: b.dataset.a || b.dataset.i, note }); await (a ? apps() : ideas()); } catch (er) { alert(er.message); }
});
const all = () => Promise.all([apps(), ideas(), signups()]).catch(() => {});
$('#ast').onchange = apps; $('#ist').onchange = ideas; $('#areload').onclick = apps; $('#ireload').onclick = ideas;
$('#iFind').addEventListener('input', () => { if (ideaRows.length) drawIdeas(); });
let booted = false;
window.adminHooks.push(() => { if (!booted) { booted = true; all(); } });
})();
