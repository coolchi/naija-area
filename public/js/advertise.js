import { checkFile, checkDims, parseSize, fmtBytes, ratioText } from '/js/creative-check.js';
const $ = (s) => document.querySelector(s); const fmt = (n) => '₦' + Math.round(n).toLocaleString('en-NG'); let RC, creative = null; const designs = []; let cur = 0; /* designs = uploaded creatives in rotation order; cur = the slot the drop zone is editing (designs.length = a new one) */
const key = () => localStorage.getItem('na_adv_key');
async function api(path, opt = {}) { const r = await fetch(path, { ...opt, headers: { 'x-advertiser-key': key() || '', ...(opt.headers || {}) } }); const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.message || 'Request failed'); return d; }
function opts(sel, list) { sel.replaceChildren(...list.map(([v, l]) => Object.assign(document.createElement('option'), { value: v, textContent: l }))); }
async function init() {
  RC = await (await fetch('/api/ads/ratecard')).json(); $('#prohibited').textContent = RC.policy.prohibited.join(', '); $('#restricted').textContent = RC.policy.restricted.join(', ');
  opts($('#surface'), Object.entries(RC.surfaces).map(([k, v]) => [k, `${v.label} · ${v.size}`])); opts($('#days'), RC.durationsDays.map(d => [d, `${d} day${d > 1 ? 's' : ''}`])); fillTiers(); showKey(); frameRatio(); hints(); mock();
  $('#surface').onchange = () => { fillTiers(); frameRatio(); hints(); recheckShape(); }; for (const id of ['tier', 'units', 'days']) $('#' + id).onchange = () => { cards(); quote(); }; for (const r of document.querySelectorAll('input[name=placement]')) r.onchange = placementChanged;
}
function fillTiers() { const s = RC.surfaces[$('#surface').value]; opts($('#tier'), Object.entries(s.tiers).map(([k, v]) => [k, `${v.label} · ${fmt(v.weekly)}/week`])); opts($('#units'), Array.from({ length: s.maxBoardsPerOrder }, (_, i) => [i + 1, `${i + 1} board${i ? 's' : ''}`])); specText(); cards(); renderDesigns(); quote(); }
const placement = () => document.querySelector('input[name=placement]:checked')?.value || 'shared';
const maxDesigns = () => { const o = RC.placements.options[placement()]; return o.maxDesigns[$('#surface').value] ?? 1; };
const weeklyOf = (pl) => { const sp = spec(), t = sp.tiers[$('#tier').value]; return pl === 'exclusive' ? Math.round(t.weekly * (sp.exclusiveMultiplier || 1)) : t.weekly; };
/** the two placement cards: price per board per week for the chosen tier, share of screen time, how many designs */
function cards() { const sp = spec(), per = sp.positionsPerBoard || 4, u = Number($('#units').value) || 1;
  $('#ppShared').textContent = `${fmt(weeklyOf('shared'))} per board per week`; $('#pmShared').textContent = `1 of ${per} positions · about ${Math.round(100 / per)}% of the screen time · up to ${RC.placements.options.shared.maxDesigns[$('#surface').value]} designs`;
  $('#ppExclusive').textContent = `${fmt(weeklyOf('exclusive'))} per board per week`; $('#pmExclusive').textContent = `All ${per} positions · 100% of the screen time, alone on the board · about ${sp.exclusiveMultiplier || 1}x the shared price (ESTIMATE) · up to ${RC.placements.options.exclusive.maxDesigns[$('#surface').value]} designs`;
  for (const [id, pl] of [['#pcShared', 'shared'], ['#pcExclusive', 'exclusive']]) $(id).classList.toggle('on', placement() === pl); void u; }
function specText() { const s = spec(); $('#spec').textContent = `Image size ${s.size}, PNG/JPEG/WebP, under ${(RC.maxImageBytes / 1e6).toFixed(0)} MB. ${placement() === 'exclusive' ? 'Exclusive' : 'Shared'}: up to ${maxDesigns()} design${maxDesigns() > 1 ? 's' : ''}, they rotate on the board.`; }
function placementChanged() { cards(); specText(); renderDesigns(); quote(); }
async function quote() { try { const r = await api('/api/ads/quote', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ surface: $('#surface').value, tier: $('#tier').value, units: Number($('#units').value), days: Number($('#days').value), placement: placement() }) }); const q = r.quote; $('#quote').innerHTML = `<table><tr><td>${q.lines[0].description.replace(/[<>&]/g, '')}</td><td>${fmt(q.weekly)}/week per board</td></tr><tr><td>Net</td><td>${fmt(q.net)}</td></tr><tr><td>VAT 7.5% (estimate)</td><td>${fmt(q.vat)}</td></tr><tr><th>Total (TEST: not charged)</th><th>${fmt(q.total)}</th></tr></table>`; } catch (e) { $('#quote').innerHTML = `<span class="err">${e.message}</span>`; } }
function showKey() { const k = key(); const b = $('#keybox'); if (k) { b.style.display = 'block'; b.innerHTML = `<p class="ok">You are registered. Your access key (keep it safe, it is your dashboard login):</p><div class="bigkey">${k}</div>`; } }
$('#reg').onclick = async () => { $('#e1').textContent = ''; try { const r = await api('/api/advertiser/register', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ brand: $('#brand').value, email: $('#email').value }) }); localStorage.setItem('na_adv_key', r.key); showKey(); if (curFile && !creative) upload(); } catch (e) { $('#e1').textContent = e.message; } };
// ---- step 3: the image. Drop zone, instant local preview, local checks, then the (unchanged) upload; the server stays the authority.
let objUrl = null, curFile = null, curDims = null, uploading = false;
const hide = (el, on) => el.classList.toggle('hidden', !!on); const limits = () => ({ maxBytes: RC.maxImageBytes, minPx: RC.minImagePx, maxPx: RC.maxImagePx }); const spec = () => RC.surfaces[$('#surface').value];
function setMsgs({ err = '', warn = [], notes = [] } = {}) { $('#e3').textContent = err; $('#w3').textContent = warn.join(' '); $('#n3').textContent = notes.join(' '); }
function frameRatio() { const a = spec()?.aspect || 2; for (const id of ['#drop', '#mockBoard']) $(id).style.setProperty('--ar', a); $('#drop').style.setProperty('--w', Math.round(Math.min(560, Math.max(240, a * 260))) + 'px'); $('#mock').style.setProperty('--w', Math.round(Math.min(560, Math.max(240, a * 260))) + 'px'); }
function hints() { const s = spec(), sz = parseSize(s.size); $('#dropHint').replaceChildren(...[sz ? `${sz.w}x${sz.h}` : s.size, sz ? ratioText(sz.w, sz.h) : '', 'PNG · JPEG · WebP', `under ${fmtBytes(RC.maxImageBytes)}`].filter(Boolean).map(t => Object.assign(document.createElement('span'), { className: 'chip', textContent: t }))); }
function setState(txt, cls) { const t = $('#fmState'); t.textContent = txt; t.className = 'tag ' + (cls || ''); }
function clearUrl() { if (objUrl) { URL.revokeObjectURL(objUrl); objUrl = null; } }
function resetCreative() { clearUrl(); curFile = null; curDims = null; creative = null; uploading = false; $('#file').value = ''; for (const id of ['#dropImg', '#mockImg']) { $(id).removeAttribute('src'); hide($(id), true); } hide($('#dropEmpty'), false); hide($('#mockEmpty'), false); hide($('#fileMeta'), true); hide($('#dropBusy'), true); $('#drop').classList.remove('has'); setMsgs(); }
// ---- several designs: each uploaded image is one design; the drop zone edits one at a time, the strip below shows them all in rotation order
const mediaUrl = (id) => `/media/creative/${id}?key=${encodeURIComponent(key() || '')}`;
function renderDesigns() { const max = maxDesigns(), n = designs.length; hide($('#designs'), !n); $('#designCount').textContent = n ? `(${n} of ${max} design${max > 1 ? 's' : ''})` : `(up to ${max} design${max > 1 ? 's' : ''})`;
  $('#designsTitle').textContent = n > 1 ? 'Your designs, in rotation order' : 'Your design'; const over = n - max; $('#designsHint').textContent = over > 0 ? `${placement() === 'shared' ? 'Shared' : 'Exclusive'} allows up to ${max}. Remove ${over} to submit, or switch placement.` : '';
  $('#designsHint').className = over > 0 ? 'err' : 'mut'; $('#addDesign').disabled = n >= max; $('#addDesign').textContent = n >= max ? `Maximum of ${max} reached` : 'Add another design';
  $('#designList').replaceChildren(...designs.map((d, i) => { const li = document.createElement('li'); li.className = 'ditem' + (i === cur ? ' cur' : ''); li.tabIndex = 0; li.setAttribute('role', 'button'); li.setAttribute('aria-label', `Design ${i + 1}: ${d.name}. Select to preview or replace.`);
    const im = document.createElement('img'); im.alt = `Design ${i + 1}`; im.src = mediaUrl(d.creative.creativeId ?? d.creative.id); im.style.setProperty('--ar', spec().aspect || 2);
    const num = Object.assign(document.createElement('span'), { className: 'dnum', textContent: String(i + 1) }); const nm = Object.assign(document.createElement('div'), { className: 'dname', textContent: d.name });
    const del = Object.assign(document.createElement('button'), { type: 'button', className: 'red ddel', textContent: '×', title: 'Remove this design' }); del.setAttribute('aria-label', `Remove design ${i + 1}`);
    del.onclick = (e) => { e.stopPropagation(); removeDesign(i); }; li.onclick = () => selectDesign(i); li.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectDesign(i); } };
    li.append(im, num, nm, del); return li; }));
  $('#rotNote').textContent = n > 1 ? `Rotation: ${designs.map((_, i) => 'design ' + (i + 1)).join(' → ')} → back to design 1. Each shows for 10 seconds${placement() === 'shared' ? ' in your turn on the board (you hold 1 of the board\'s positions)' : ', and the board is only yours'}. Each design is reviewed on its own.` : ''; }
function removeDesign(i) { designs.splice(i, 1); const was = cur === i; if (cur > i) cur--; if (was) { resetCreative(); cur = designs.length; } renderDesigns(); }
function selectDesign(i) { const d = designs[i]; if (!d) return; resetCreative(); cur = i; creative = d.creative; showPreview(mediaUrl(creative.creativeId ?? creative.id)); $('#fmName').textContent = d.name; $('#fmInfo').textContent = d.info || ''; hide($('#fileMeta'), false); setState('Uploaded ✓', 'live'); renderDesigns(); }
$('#addDesign').onclick = () => { if (designs.length >= maxDesigns()) return; resetCreative(); cur = designs.length; renderDesigns(); open(); };
function showPreview(url) { for (const id of ['#dropImg', '#mockImg']) { $(id).src = url; hide($(id), false); } hide($('#dropEmpty'), true); hide($('#mockEmpty'), true); $('#drop').classList.add('has'); }
function mock() { const b = ($('#brand').value || '').trim() || 'Your brand', h = ($('#headline').value || '').trim(), l = ($('#link').value || '').trim(); let host = 'yourbrand.com'; try { if (l) host = new URL(/^https?:\/\//i.test(l) ? l : 'https://' + l).host || host; } catch { /* keep the placeholder */ }
  $('#mockBadge').textContent = 'Sponsored · ' + b.slice(0, 14); $('#mcBrand').textContent = b; $('#mcHead').textContent = h || 'Your headline shows here'; $('#mcHead').classList.toggle('ph', !h); $('#mcLink').textContent = host;
  const n = ($('#headline').value || '').length; const c = $('#hcount'); c.textContent = `${n}/60`; c.className = 'counter' + (n >= 60 ? ' max' : n >= 50 ? ' near' : ''); }
function recheckShape() { if (!curDims) return; const r = checkDims(curDims.w, curDims.h, spec(), limits()); setMsgs({ warn: r.warnings, notes: r.notes }); }
async function upload() {
  if (!curFile) return; if (!key()) { setState('Not uploaded yet', 'wait'); $('#e3').textContent = 'Register first (step 1). Your picture will upload as soon as you have your access key.'; return; }
  uploading = true; hide($('#dropBusy'), false); setState('Uploading…', 'wait'); const f = curFile;
  try { const r = await api('/api/ads/upload', { method: 'POST', headers: { 'content-type': f.type }, body: f }); if (f !== curFile) return; creative = r; designs[cur] = { creative: r, name: f.name, info: $('#fmInfo').textContent }; renderDesigns(); setState('Uploaded ✓', 'live'); $('#e3').textContent = ''; }
  catch (e) { if (f !== curFile) return; creative = null; setState('Not accepted', 'bad'); $('#e3').textContent = e.message; }
  finally { if (f === curFile) { uploading = false; hide($('#dropBusy'), true); } }
}
async function pick(f, extra) {
  if (designs[cur]) designs.splice(cur, 1); /* Replace: the old design leaves the list; the new one takes its place once uploaded */ resetCreative(); renderDesigns(); if (!f) return;
  if (designs.length >= maxDesigns()) { setMsgs({ err: `You can add up to ${maxDesigns()} design${maxDesigns() > 1 ? 's' : ''} for ${placement() === 'exclusive' ? 'an exclusive' : 'a shared'} placement. Remove one first.` }); return; } const fc = checkFile(f, limits()); curFile = f; $('#fmName').textContent = f.name; $('#fmInfo').textContent = ` · ${fmtBytes(f.size)}`; hide($('#fileMeta'), false);
  if (!fc.ok) { curFile = null; setState('Not used', 'bad'); setMsgs({ err: fc.message }); return; }
  clearUrl(); objUrl = URL.createObjectURL(f); const url = objUrl; showPreview(url); setState('Checking…', 'wait');
  const dims = await new Promise((res) => { const im = new Image(); im.onload = () => res({ w: im.naturalWidth, h: im.naturalHeight }); im.onerror = () => res({ w: 0, h: 0 }); im.src = url; }); if (f !== curFile) return;
  curDims = dims; const r = checkDims(dims.w, dims.h, spec(), limits()); $('#fmInfo').textContent = ` · ${dims.w || '?'}x${dims.h || '?'} · ${fmtBytes(f.size)}`;
  if (r.blocking) { curFile = null; curDims = null; setState('Not used', 'bad'); setMsgs({ err: r.errors.join(' ') }); if (!dims.w) { clearUrl(); for (const id of ['#dropImg', '#mockImg']) { $(id).removeAttribute('src'); hide($(id), true); } hide($('#dropEmpty'), false); hide($('#mockEmpty'), false); $('#drop').classList.remove('has'); } return; }
  setMsgs({ warn: r.warnings, notes: [...(extra ? [extra] : []), ...r.notes] }); await upload();
}
const open = () => { if (!uploading) $('#file').click(); };
$('#file').onchange = () => pick($('#file').files[0]);
$('#drop').onclick = (e) => { if (e.target.closest('button')) return; open(); }; $('#replaceBtn').onclick = open; $('#removeBtn').onclick = () => { if (designs[cur]) designs.splice(cur, 1); resetCreative(); cur = designs.length; renderDesigns(); };
$('#drop').onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } };
for (const ev of ['dragenter', 'dragover']) $('#drop').addEventListener(ev, (e) => { e.preventDefault(); $('#drop').classList.add('over'); });
for (const ev of ['dragleave', 'dragend']) $('#drop').addEventListener(ev, () => $('#drop').classList.remove('over'));
$('#drop').addEventListener('drop', (e) => { e.preventDefault(); $('#drop').classList.remove('over'); const fl = e.dataTransfer?.files; if (fl && fl.length) pick(fl[0], fl.length > 1 ? 'You dropped several files: only the first one is used.' : ''); });
addEventListener('dragover', (e) => { if (!e.target.closest?.('#drop')) e.preventDefault(); }); addEventListener('drop', (e) => { if (!e.target.closest?.('#drop')) e.preventDefault(); }); // a miss must not navigate away to the file
for (const id of ['#headline', '#link', '#brand']) $(id).addEventListener('input', mock);
addEventListener('pagehide', clearUrl);
$('#submit').onclick = async () => { $('#e4').textContent = ''; $('#done').textContent = ''; if (!key()) return $('#e4').textContent = 'Register first (step 1).'; if (uploading) return $('#e4').textContent = 'Your image is still uploading. Wait a moment.'; if (!designs.length) return $('#e4').textContent = 'Add your image (step 3) and wait for "Uploaded".'; if (designs.length > maxDesigns()) return $('#e4').textContent = `${placement() === 'exclusive' ? 'Exclusive' : 'Shared'} allows up to ${maxDesigns()} designs: remove ${designs.length - maxDesigns()} (step 3).`;
  try { const r = await api('/api/ads/campaigns', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ surface: $('#surface').value, tier: $('#tier').value, units: Number($('#units').value), days: Number($('#days').value), placement: placement(), creativeIds: designs.map(d => d.creative.creativeId ?? d.creative.id), creativeId: designs[0].creative.creativeId ?? designs[0].creative.id, headline: $('#headline').value, linkUrl: $('#link').value, testModeAck: $('#ack').checked }) }); $('#done').innerHTML = `Campaign #${r.campaign.id} submitted: ${r.campaign.placementLabel}, ${r.campaign.designs.length} design${r.campaign.designs.length > 1 ? 's' : ''}, status <b>${r.campaign.status}</b>. <a href="/advertiser">Track it on your dashboard</a>.`; } catch (e) { $('#e4').textContent = e.message; } };
init();
