import { checkFile, checkDims, parseSize, fmtBytes, ratioText } from '/js/creative-check.js';
const $ = (s) => document.querySelector(s); const fmt = (n) => '₦' + Math.round(n).toLocaleString('en-NG'); let RC, creative = null;
const key = () => localStorage.getItem('na_adv_key');
async function api(path, opt = {}) { const r = await fetch(path, { ...opt, headers: { 'x-advertiser-key': key() || '', ...(opt.headers || {}) } }); const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.message || 'Request failed'); return d; }
function opts(sel, list) { sel.replaceChildren(...list.map(([v, l]) => Object.assign(document.createElement('option'), { value: v, textContent: l }))); }
async function init() {
  RC = await (await fetch('/api/ads/ratecard')).json(); $('#prohibited').textContent = RC.policy.prohibited.join(', '); $('#restricted').textContent = RC.policy.restricted.join(', ');
  opts($('#surface'), Object.entries(RC.surfaces).map(([k, v]) => [k, `${v.label} · ${v.size}`])); opts($('#days'), RC.durationsDays.map(d => [d, `${d} day${d > 1 ? 's' : ''}`])); fillTiers(); showKey(); frameRatio(); hints(); mock();
  $('#surface').onchange = () => { fillTiers(); frameRatio(); hints(); recheckShape(); }; for (const id of ['tier', 'units', 'days']) $('#' + id).onchange = quote;
}
function fillTiers() { const s = RC.surfaces[$('#surface').value]; opts($('#tier'), Object.entries(s.tiers).map(([k, v]) => [k, `${v.label} · ${fmt(v.weekly)}/week`])); opts($('#units'), Array.from({ length: s.maxBoardsPerOrder }, (_, i) => [i + 1, `${i + 1} board${i ? 's' : ''}`])); $('#spec').textContent = `Image size ${s.size}, PNG/JPEG/WebP, under ${(RC.maxImageBytes / 1e6).toFixed(0)} MB.`; quote(); }
async function quote() { try { const r = await api('/api/ads/quote', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ surface: $('#surface').value, tier: $('#tier').value, units: Number($('#units').value), days: Number($('#days').value) }) }); const q = r.quote; $('#quote').innerHTML = `<table><tr><td>Net</td><td>${fmt(q.net)}</td></tr><tr><td>VAT 7.5% (estimate)</td><td>${fmt(q.vat)}</td></tr><tr><th>Total (TEST: not charged)</th><th>${fmt(q.total)}</th></tr></table>`; } catch (e) { $('#quote').innerHTML = `<span class="err">${e.message}</span>`; } }
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
function showPreview(url) { for (const id of ['#dropImg', '#mockImg']) { $(id).src = url; hide($(id), false); } hide($('#dropEmpty'), true); hide($('#mockEmpty'), true); $('#drop').classList.add('has'); }
function mock() { const b = ($('#brand').value || '').trim() || 'Your brand', h = ($('#headline').value || '').trim(), l = ($('#link').value || '').trim(); let host = 'yourbrand.com'; try { if (l) host = new URL(/^https?:\/\//i.test(l) ? l : 'https://' + l).host || host; } catch { /* keep the placeholder */ }
  $('#mockBadge').textContent = 'Sponsored · ' + b.slice(0, 14); $('#mcBrand').textContent = b; $('#mcHead').textContent = h || 'Your headline shows here'; $('#mcHead').classList.toggle('ph', !h); $('#mcLink').textContent = host;
  const n = ($('#headline').value || '').length; const c = $('#hcount'); c.textContent = `${n}/60`; c.className = 'counter' + (n >= 60 ? ' max' : n >= 50 ? ' near' : ''); }
function recheckShape() { if (!curDims) return; const r = checkDims(curDims.w, curDims.h, spec(), limits()); setMsgs({ warn: r.warnings, notes: r.notes }); }
async function upload() {
  if (!curFile) return; if (!key()) { setState('Not uploaded yet', 'wait'); $('#e3').textContent = 'Register first (step 1). Your picture will upload as soon as you have your access key.'; return; }
  uploading = true; hide($('#dropBusy'), false); setState('Uploading…', 'wait'); const f = curFile;
  try { const r = await api('/api/ads/upload', { method: 'POST', headers: { 'content-type': f.type }, body: f }); if (f !== curFile) return; creative = r; setState('Uploaded ✓', 'live'); $('#e3').textContent = ''; }
  catch (e) { if (f !== curFile) return; creative = null; setState('Not accepted', 'bad'); $('#e3').textContent = e.message; }
  finally { if (f === curFile) { uploading = false; hide($('#dropBusy'), true); } }
}
async function pick(f, extra) {
  resetCreative(); if (!f) return; const fc = checkFile(f, limits()); curFile = f; $('#fmName').textContent = f.name; $('#fmInfo').textContent = ` · ${fmtBytes(f.size)}`; hide($('#fileMeta'), false);
  if (!fc.ok) { curFile = null; setState('Not used', 'bad'); setMsgs({ err: fc.message }); return; }
  clearUrl(); objUrl = URL.createObjectURL(f); const url = objUrl; showPreview(url); setState('Checking…', 'wait');
  const dims = await new Promise((res) => { const im = new Image(); im.onload = () => res({ w: im.naturalWidth, h: im.naturalHeight }); im.onerror = () => res({ w: 0, h: 0 }); im.src = url; }); if (f !== curFile) return;
  curDims = dims; const r = checkDims(dims.w, dims.h, spec(), limits()); $('#fmInfo').textContent = ` · ${dims.w || '?'}x${dims.h || '?'} · ${fmtBytes(f.size)}`;
  if (r.blocking) { curFile = null; curDims = null; setState('Not used', 'bad'); setMsgs({ err: r.errors.join(' ') }); if (!dims.w) { clearUrl(); for (const id of ['#dropImg', '#mockImg']) { $(id).removeAttribute('src'); hide($(id), true); } hide($('#dropEmpty'), false); hide($('#mockEmpty'), false); $('#drop').classList.remove('has'); } return; }
  setMsgs({ warn: r.warnings, notes: [...(extra ? [extra] : []), ...r.notes] }); await upload();
}
const open = () => { if (!uploading) $('#file').click(); };
$('#file').onchange = () => pick($('#file').files[0]);
$('#drop').onclick = (e) => { if (e.target.closest('button')) return; open(); }; $('#replaceBtn').onclick = open; $('#removeBtn').onclick = resetCreative;
$('#drop').onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } };
for (const ev of ['dragenter', 'dragover']) $('#drop').addEventListener(ev, (e) => { e.preventDefault(); $('#drop').classList.add('over'); });
for (const ev of ['dragleave', 'dragend']) $('#drop').addEventListener(ev, () => $('#drop').classList.remove('over'));
$('#drop').addEventListener('drop', (e) => { e.preventDefault(); $('#drop').classList.remove('over'); const fl = e.dataTransfer?.files; if (fl && fl.length) pick(fl[0], fl.length > 1 ? 'You dropped several files: only the first one is used.' : ''); });
addEventListener('dragover', (e) => { if (!e.target.closest?.('#drop')) e.preventDefault(); }); addEventListener('drop', (e) => { if (!e.target.closest?.('#drop')) e.preventDefault(); }); // a miss must not navigate away to the file
for (const id of ['#headline', '#link', '#brand']) $(id).addEventListener('input', mock);
addEventListener('pagehide', clearUrl);
$('#submit').onclick = async () => { $('#e4').textContent = ''; $('#done').textContent = ''; if (!key()) return $('#e4').textContent = 'Register first (step 1).'; if (uploading) return $('#e4').textContent = 'Your image is still uploading. Wait a moment.'; if (!creative) return $('#e4').textContent = 'Add your image (step 3) and wait for "Uploaded".';
  try { const r = await api('/api/ads/campaigns', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ surface: $('#surface').value, tier: $('#tier').value, units: Number($('#units').value), days: Number($('#days').value), creativeId: creative.id ?? creative.creativeId, headline: $('#headline').value, linkUrl: $('#link').value, testModeAck: $('#ack').checked }) }); $('#done').innerHTML = `Campaign #${r.campaign.id} submitted: status <b>${r.campaign.status}</b>. <a href="/advertiser">Track it on your dashboard</a>.`; } catch (e) { $('#e4').textContent = e.message; } };
init();
