// Moderation dashboard (queue batch 1 item 6): player lookup, warn / mute / ban, lift, audit log. Loaded after admin.js; works once the admin is logged in.
(() => {
const $ = (s) => document.querySelector(s); const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const j = async (p, o) => { const r = await fetch(p, o); const d = await r.json().catch(() => ({})); if (!r.ok) throw Object.assign(new Error(d.message || 'Error'), { status: r.status }); return d; };
const post = (p, b) => j(p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) });
const when = (ms) => ms ? new Date(ms).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' }) : '';
const box = 'box-shadow:none;border:2px solid #e3dcc2'; let opts = null, ref = null, oldest = 0;
const left = (ms) => { const m = Math.round((ms - Date.now()) / 60000); return m > 2880 ? Math.round(m / 1440) + ' days' : m > 120 ? Math.round(m / 60) + ' h' : m + ' min'; };
async function overview() { const o = await j('/api/admin/mod/overview'); $('#modOv').innerHTML = [['Open reports', o.openReports], ['Oldest open (h)', Math.round(o.oldestOpenMs / 3600000)], ['Actioned 24h', o.actionedToday], ['Active mutes', o.activeMutes], ['Active bans', o.activeBans], ['Warnings 7d', o.warnings7d]].map(([k, v]) => `<span class="tag ${k === 'Open reports' && v ? 'wait' : ''}">${k}: <b>${v}</b></span>`).join(' '); }
const sRow = (s, lift) => `<tr><td>${s.id}</td><td>@${esc(s.username)}</td><td>${s.kind}</td><td>${esc(s.reason.replace(/_/g, ' '))}${s.note ? ' · ' + esc(s.note) : ''}</td><td>${s.until ? (s.lifted ? 'lifted' : 'until ' + when(s.until)) : (s.kind === 'warn' ? '' : s.lifted ? 'lifted' : 'permanent')}</td><td>${when(s.at)} · ${esc(s.actor)}</td><td>${lift && !s.lifted && s.kind !== 'warn' ? `<button class="ghost" data-lift="${s.id}">Lift</button>` : s.lifted ? 'by ' + esc(s.liftedBy || '') : ''}</td></tr>`;
async function active() { const d = await j('/api/admin/mod/sanctions'); $('#modActive').innerHTML = d.rows.length ? `<table><tr><th>#</th><th>Player</th><th>Kind</th><th>Reason</th><th>Ends</th><th>By</th><th></th></tr>${d.rows.map(r => sRow(r, true)).join('')}</table>` : '<p class="mut">None right now.</p>'; }
async function player(q) {
  if (!opts) opts = await j('/api/admin/mod/options'); const d = await j('/api/admin/mod/player?q=' + encodeURIComponent(q)); const u = d.user;
  $('#modPlayer').innerHTML = `<div class="card" style="${box}"><div class="row"><b>@${esc(u.username)}</b><span class="tag">#${u.id}</span>${u.guest ? '<span class="tag">guest</span>' : ''}${u.online ? '<span class="tag ok">online</span>' : ''}${u.deleted ? '<span class="tag bad">closed account</span>' : ''}${d.ban ? `<span class="tag bad">BANNED${d.ban.until ? ' until ' + when(d.ban.until) : ' (permanent)'}</span>` : ''}${u.chatMutedUntil ? `<span class="tag wait">chat paused for ${left(u.chatMutedUntil)}</span>` : ''}<span class="tag ${d.suggestBan ? 'bad' : ''}">${d.strikes} strike${d.strikes === 1 ? '' : 's'} in 90 days</span></div>
${d.suggestBan ? '<p class="mut"><b>Three or more strikes in 90 days: consider a ban.</b> Nothing happens automatically.</p>' : ''}
<p class="mut">Joined ${when(u.createdAt)} · filed ${d.reportsFiled.total} reports (${d.reportsFiled.dismissed} dismissed)</p>
<div class="row"><select id="sKind" style="width:auto"><option value="warn">Warn</option><option value="mute">Mute chat</option><option value="ban">Ban account</option></select><input id="sHours" placeholder="hours (mute ${opts.defaultMuteHours}, ban empty = permanent)" style="flex:1;min-width:160px"><select id="sReason" style="width:auto">${opts.reasons.map(r => `<option value="${r}">${r.replace(/_/g, ' ')}</option>`).join('')}</select></div>
<div class="row"><input id="sNote" placeholder="Note (shown to the player for warnings, kept in the log)" maxlength="300" style="flex:1"><button class="red" id="sGo" data-who="${esc(u.username)}">Apply</button></div>${ref ? `<p class="mut">From report ${esc(ref)}</p>` : ''}<p id="sMsg" class="mut"></p>
<h3>History</h3>${d.history.length ? `<table><tr><th>#</th><th>Player</th><th>Kind</th><th>Reason</th><th>Ends</th><th>By</th><th></th></tr>${d.history.map(r => sRow(r, true)).join('')}</table>` : '<p class="mut">No sanctions yet.</p>'}
<h3>Reports against this player</h3>${d.reportsAgainst.length ? d.reportsAgainst.map(r => `<p class="mut">#${r.id} ${esc(r.kind)} ${esc(r.target_ref)} · ${esc(r.reason)} · ${esc(r.status)} · by @${esc(r.reporter)} · ${when(r.created_at)}</p>`).join('') : '<p class="mut">None.</p>'}
<h3>Recent chat</h3>${d.recentChat.length ? d.recentChat.map(c => `<p class="mut">${when(c.created_at)} · ${esc(c.text)}</p>`).join('') : '<p class="mut">None.</p>'}</div>`;
}
async function audit(more) {
  if (!more) oldest = 0; const qs = new URLSearchParams({ action: $('#auAction').value, actor: $('#auActor').value, q: $('#auQ').value, ...(oldest ? { before: oldest } : {}) }); const d = await j('/api/admin/mod/audit?' + qs);
  const fill = (sel, items) => { const cur = sel.value; if (sel.options.length <= 1) sel.insertAdjacentHTML('beforeend', items.map(a => `<option>${esc(a)}</option>`).join('')); sel.value = cur; }; fill($('#auAction'), d.actions); fill($('#auActor'), d.actors);
  const html = d.rows.map(r => `<tr><td>${r.id}</td><td>${when(r.at)}</td><td>${esc(r.actor)}</td><td>${esc(r.action)}</td><td>${esc(r.detail)}</td></tr>`).join(''); if (!more) $('#auRows').innerHTML = `<table><tr><th>#</th><th>When</th><th>Who</th><th>Action</th><th>Detail</th></tr><tbody>${html}</tbody></table>`; else $('#auRows').querySelector('tbody').insertAdjacentHTML('beforeend', html);
  if (d.rows.length) oldest = d.rows[d.rows.length - 1].id; $('#auMore').style.display = d.rows.length >= 100 ? '' : 'none';
}
async function all() { try { await Promise.all([overview(), active(), audit(false)]); } catch (e) { /* not logged in yet */ } }
document.addEventListener('click', async (e) => {
  const t = e.target; const lk = t.closest('button[data-lookup]'); if (lk) { ref = lk.dataset.ref || null; $('#modQ').value = lk.dataset.lookup; try { await player(lk.dataset.lookup); $('#modCard').scrollIntoView(); } catch (er) { alert(er.message); } return; }
  if (t.id === 'modGo') { ref = null; try { await player($('#modQ').value.trim()); } catch (er) { $('#modPlayer').innerHTML = `<p class="mut">${esc(er.message)}</p>`; } return; }
  if (t.id === 'sGo') { const kind = $('#sKind').value; if (kind === 'ban' && !confirm('Ban this account? They will be locked out until you lift it.')) return; try { const r = await post('/api/admin/mod/sanction', { who: t.dataset.who, kind, hours: $('#sHours').value.trim(), reason: $('#sReason').value, note: $('#sNote').value, reportRef: ref }); $('#sMsg').textContent = `Done (#${r.id}).`; await player(t.dataset.who); all(); } catch (er) { $('#sMsg').textContent = er.message; } return; }
  const lf = t.closest('button[data-lift]'); if (lf) { const note = prompt('Note for the audit log (optional):'); if (note === null) return; try { await post('/api/admin/mod/lift', { id: Number(lf.dataset.lift), note }); const q = $('#modPlayer').querySelector('#sGo')?.dataset.who; if (q) await player(q); all(); } catch (er) { alert(er.message); } return; }
  if (t.id === 'auGo') audit(false); if (t.id === 'auMore') audit(true);
});
$('#modQ').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('#modGo').click(); });
const watch = setInterval(() => { if ($('#out')?.style.display === 'block') { clearInterval(watch); all(); } }, 400);
})();
