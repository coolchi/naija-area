// Photo mode: hide the HUD, pick a look, take a picture of the game, add a small frame, then save it or share it. EVERYTHING HAPPENS ON THE PLAYER'S PHONE: the picture is never uploaded
// (no storage, nothing to moderate on our side, nothing to delete when an account closes). The pure helpers at the top are tested without a browser.
import { h, $ } from './api.js';

export const FILTERS = [{ id: 'none', label: 'Natural' }, { id: 'warm', label: 'Warm' }, { id: 'noir', label: 'Noir' }, { id: 'vivid', label: 'Vivid' }, { id: 'sunset', label: 'Sunset' }];
const clamp8 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);
/** apply a look to RGBA pixel data in place (per pixel maths, so it works on every phone: Safari's canvas `filter` does not). Alpha is never touched. */
export function applyFilter(d, name) {
  if (!FILTERS.some(f => f.id === name) || name === 'none') return d;
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i], g = d[i + 1], b = d[i + 2]; const l = 0.299 * r + 0.587 * g + 0.114 * b;
    if (name === 'warm') { r = r * 1.08 + 8; g = g * 1.02 + 2; b = b * 0.88; }
    else if (name === 'noir') { const c = (l - 128) * 1.15 + 128; r = g = b = c; }
    else if (name === 'vivid') { r = l + (r - l) * 1.45; g = l + (g - l) * 1.45; b = l + (b - l) * 1.45; r = (r - 128) * 1.06 + 128; g = (g - 128) * 1.06 + 128; b = (b - 128) * 1.06 + 128; }
    else if (name === 'sunset') { r = r * 1.12 + 14; g = g * 0.95 + 4; b = b * 0.82 + 10; const m = (l - 128) * 0.08; r += m; g += m * 0.5; }
    d[i] = clamp8(r); d[i + 1] = clamp8(g); d[i + 2] = clamp8(b);
  }
  return d;
}
/** the words on the frame: a title and one line with the place and the date (and @name only when the player asked for it) */
export function frameText({ game, place, when, name, showName }) {
  const date = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Africa/Lagos' }).format(when);
  let line = `${String(place || '').trim() || 'Somewhere in town'} · ${date}${showName && name ? ` · @${name}` : ''}`; if (line.length > 90) line = line.slice(0, 87) + '…';
  return { title: `${game || 'Naija Area'} 📷`, line };
}
/** scale a size down (never up) so its long edge is at most `max` */
export function fitSize(w, hgt, max) { const k = Math.min(1, max / Math.max(w, hgt)); return { w: Math.round(w * k), h: Math.round(hgt * k) }; }

const MAX_EDGE = 1600;
/** draw the game canvas into a new canvas with the look and frame applied */
export function compose(src, { filter, frame, text }) {
  const { w, h: hg } = fitSize(src.width, src.height, MAX_EDGE); const c = document.createElement('canvas'); c.width = w; c.height = hg; const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(src, 0, 0, w, hg);
  if (filter && filter !== 'none') { const im = x.getImageData(0, 0, w, hg); applyFilter(im.data, filter); x.putImageData(im, 0, 0); }
  if (frame) { const bar = Math.round(Math.max(48, hg * 0.075)); x.fillStyle = 'rgba(10,20,14,.62)'; x.fillRect(0, hg - bar, w, bar); const f = Math.round(bar * 0.36); x.fillStyle = '#ffd34d'; x.font = `800 ${f}px Nunito, system-ui, sans-serif`; x.textBaseline = 'middle'; x.fillText(text.title, Math.round(bar * 0.3), hg - bar * 0.66); x.fillStyle = '#ffffff'; x.font = `700 ${Math.round(f * 0.78)}px Nunito, system-ui, sans-serif`; x.fillText(text.line, Math.round(bar * 0.3), hg - bar * 0.28);
    x.strokeStyle = '#ffffff'; x.lineWidth = Math.max(4, Math.round(w * 0.006)); x.strokeRect(x.lineWidth / 2, x.lineWidth / 2, w - x.lineWidth, hg - x.lineWidth); }
  return c;
}
const blobOf = (c) => new Promise((res) => c.toBlob((b) => res(b), 'image/png'));
const stamp = (d = new Date()) => d.toISOString().replace(/[-:T]/g, '').slice(0, 14);

export class PhotoMode {
  constructor(g) { this.g = g; this.on = false; this.opts = { filter: 'none', frame: true, hideNames: true, showName: false, timer: 0 }; this.busy = false; }
  open() {
    if (this.on) return; const g = this.g; if (g.ui.sheetOpen) g.ui.closeSheet(); this.on = true; document.body.classList.add('photo'); g.audio?.play('click'); this.draw();
  }
  close() { if (!this.on) return; this.on = false; document.body.classList.remove('photo'); this.bar?.remove(); this.bar = null; this.preview?.remove(); this.preview = null; this.setNames(true); }
  setNames(show) { for (const gh of this.g.ghosts?.map?.values?.() || []) if (gh.tag) gh.tag.visible = show; }
  draw() {
    const g = this.g, o = this.opts; this.bar?.remove(); const chip = (label, on, fn, key) => h('button', { class: 'btn small ' + (on ? '' : 'ghost'), 'data-photo': key, onclick: () => { fn(); this.draw(); } }, label);
    const emotes = (g.cfg.emotes || []).slice(0, 14).map(e => h('button', { class: 'btn small ghost', 'data-photo-emote': e.id, title: e.label, onclick: () => g.emotes?.play(e.id) }, e.icon));
    const zoom = h('input', { type: 'range', min: 5, max: 26, value: Math.round(g.ctrl.cam), 'data-photo': 'zoom', oninput: (ev) => { g.ctrl.cam = Number(ev.target.value); } });
    const tilt = h('input', { type: 'range', min: 15, max: 110, value: Math.round(g.ctrl.camPitch * 100), 'data-photo': 'tilt', oninput: (ev) => { g.ctrl.camPitch = Number(ev.target.value) / 100; } });
    this.bar = h('div', { id: 'photoBar' }, h('div', { class: 'prow' }, FILTERS.map(f => chip(f.label, o.filter === f.id, () => { o.filter = f.id; }, 'filter:' + f.id))),
      h('div', { class: 'prow' }, chip(o.frame ? 'Frame on' : 'Frame off', o.frame, () => { o.frame = !o.frame; }, 'frame'), chip(o.hideNames ? 'Names hidden' : 'Names shown', o.hideNames, () => { o.hideNames = !o.hideNames; }, 'names'), chip(o.showName ? 'My @name on' : 'My @name off', o.showName, () => { o.showName = !o.showName; }, 'myname'), chip(o.timer ? `Timer ${o.timer}s` : 'No timer', !!o.timer, () => { o.timer = o.timer === 0 ? 3 : o.timer === 3 ? 5 : 0; }, 'timer')),
      h('div', { class: 'prow' }, h('label', { class: 'mut' }, 'Zoom ', zoom), h('label', { class: 'mut' }, 'Angle ', tilt)), h('div', { class: 'prow scroll' }, emotes),
      h('div', { class: 'prow' }, h('button', { class: 'btn', 'data-photo': 'shoot', onclick: () => this.shoot() }, '📸 Take photo'), h('button', { class: 'btn ghost', 'data-photo': 'close', onclick: () => this.close() }, 'Close')));
    document.body.append(this.bar);
  }
  async shoot() {
    if (this.busy) return; this.busy = true; const g = this.g, o = this.opts;
    try {
      if (o.timer) { this.bar.style.display = 'none'; for (let n = o.timer; n > 0; n--) { this.count(String(n)); g.audio?.play('click'); await new Promise(r => setTimeout(r, 1000)); } this.count(''); this.bar.style.display = ''; }
      this.setNames(!o.hideNames); this.bar.style.visibility = 'hidden';
      g.renderer.render(g.scene, g.camera); const place = $('#loc')?.textContent || ''; // drawn in the same task as the render, so the canvas still holds the frame
      const c = compose(g.renderer.domElement, { filter: o.filter, frame: o.frame, text: frameText({ game: g.cfg.name, place, when: new Date(), name: g.user?.username, showName: o.showName }) });
      this.bar.style.visibility = ''; this.setNames(true); const blob = await blobOf(c); if (!blob) throw new Error('The picture could not be made.'); g.audio?.play('shutter'); this.last = { blob, url: URL.createObjectURL(blob), w: c.width, h: c.height, c }; this.showPreview();
    } catch (e) { g.ui.toast(e.message || 'Could not take the photo.', 'bad'); if (this.bar) { this.bar.style.display = ''; this.bar.style.visibility = ''; } } finally { this.busy = false; }
  }
  count(t) { let el = $('#photoCount'); if (!t) { el?.remove(); return; } if (!el) { el = h('div', { id: 'photoCount' }); document.body.append(el); } el.textContent = t; }
  showPreview() {
    const g = this.g, L = this.last; this.preview?.remove(); const name = `naija-area-${stamp()}.png`;
    const save = () => { const a = h('a', { href: L.url, download: name }); document.body.append(a); a.click(); a.remove(); g.ui.toast('Saved to your downloads.', ''); };
    const share = async () => { const file = new File([L.blob], name, { type: 'image/png' }); try { if (navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], title: g.cfg.name, text: `A photo from ${g.cfg.name}` }); return; } } catch (e) { if (e?.name === 'AbortError') return; } save(); g.ui.toast('Your phone cannot share from here, so it was saved. Share it from your gallery.', ''); };
    this.preview = h('div', { id: 'photoPreview' }, h('img', { src: L.url, alt: 'Your photo', 'data-photo': 'img' }), h('div', { class: 'prow' }, h('button', { class: 'btn', 'data-photo': 'save', onclick: save }, '⬇ Save'), h('button', { class: 'btn alt', 'data-photo': 'share', onclick: share }, '↗ Share'), h('button', { class: 'btn ghost', 'data-photo': 'retake', onclick: () => { this.preview?.remove(); this.preview = null; URL.revokeObjectURL(L.url); } }, 'Take another')));
    document.body.append(this.preview);
  }
}
