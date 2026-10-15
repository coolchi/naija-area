import * as THREE from 'three';
// Firefox (and a few older engines) used to miss CanvasRenderingContext2D.roundRect.
// Name tags and Motoka art call it during boot — polyfill before any of that runs.
(() => {
  const proto = typeof CanvasRenderingContext2D !== 'undefined' ? CanvasRenderingContext2D.prototype : null;
  if (!proto || typeof proto.roundRect === 'function') return;
  proto.roundRect = function roundRect(x, y, w, h, radii = 0) {
    const r = Array.isArray(radii) ? radii : [radii, radii, radii, radii];
    const [tl, tr, br, bl] = [r[0] || 0, (r[1] ?? r[0]) || 0, (r[2] ?? r[0]) || 0, (r[3] ?? r[1] ?? r[0]) || 0];
    this.moveTo(x + tl, y);
    this.lineTo(x + w - tr, y); this.quadraticCurveTo(x + w, y, x + w, y + tr);
    this.lineTo(x + w, y + h - br); this.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
    this.lineTo(x + bl, y + h); this.quadraticCurveTo(x, y + h, x, y + h - bl);
    this.lineTo(x, y + tl); this.quadraticCurveTo(x, y, x + tl, y);
    this.closePath();
  };
})();
const cv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
function rnd(seed) { let a = seed; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const tex = (c, rep = false) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; if (rep) t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; };

/** one wall cell (3.4 m): window + wall. Builder UVs are world-space so it tiles on every face. */
export function wallTextures() {
  const S = 128; const day = cv(S, S), night = cv(S, S); const g = day.getContext('2d'), n = night.getContext('2d');
  g.fillStyle = '#ffffff'; g.fillRect(0, 0, S, S); n.fillStyle = '#000'; n.fillRect(0, 0, S, S);
  const win = (ctx, fill) => { ctx.fillStyle = fill; ctx.fillRect(34, 30, 60, 56); };
  win(g, '#6f8796'); g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(34, 30, 60, 3); g.fillRect(34, 83, 60, 3); g.fillRect(62, 30, 4, 56);
  g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(0, 118, S, 10); // floor line
  win(n, '#ffd27a');
  return { map: tex(day, true), emissiveMap: tex(night, true) };
}
export function roadTexture() {
  const c = cv(64, 256), g = c.getContext('2d'); const r = rnd(3);
  g.fillStyle = '#34373c'; g.fillRect(0, 0, 64, 256);
  for (let i = 0; i < 500; i++) { const v = 40 + r() * 30; g.fillStyle = `rgb(${v},${v + 2},${v + 5})`; g.fillRect(r() * 64, r() * 256, 1 + r() * 2, 1 + r() * 2); }
  g.fillStyle = '#e8e6df'; g.fillRect(2, 0, 2, 256); g.fillRect(60, 0, 2, 256);          // edge lines
  g.fillStyle = '#f2c744'; for (let y = 0; y < 256; y += 64) g.fillRect(30, y + 8, 4, 36); // dashed centre line
  const t = tex(c, true); return t;
}
export function groundTexture() {
  const c = cv(128, 128), g = c.getContext('2d'); const r = rnd(8);
  g.fillStyle = '#b9b5a6'; g.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 700; i++) { const v = 150 + r() * 60; g.fillStyle = `rgba(${v},${v - 4},${v - 14},.5)`; g.fillRect(r() * 128, r() * 128, 1 + r() * 3, 1 + r() * 3); }
  g.strokeStyle = 'rgba(80,76,66,.35)'; g.lineWidth = 1; for (let i = 0; i <= 128; i += 32) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 128); g.moveTo(0, i); g.lineTo(128, i); g.stroke(); }
  return tex(c, true);
}
export function waterTexture() {
  const c = cv(256, 256), g = c.getContext('2d'); const r = rnd(12);
  g.fillStyle = '#2b6f8a'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 160; i++) { g.strokeStyle = `rgba(255,255,255,${0.05 + r() * 0.12})`; g.lineWidth = 1 + r() * 2; const x = r() * 256, y = r() * 256; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 14, y - 5, x + 30, y); g.stroke(); }
  return tex(c, true);
}
export function glowTexture() {
  const c = cv(64, 64), g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(0,0,0,.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return tex(c);
}
export function nameTag(text, color = '#ffffff') {
  const c = cv(512, 128), g = c.getContext('2d');
  g.textAlign = 'left'; g.textBaseline = 'middle';
  let size = 46;
  g.font = `600 ${size}px Nunito, system-ui, sans-serif`;
  for (; size > 26 && g.measureText(text).width > 400; size -= 2) g.font = `600 ${size}px Nunito, system-ui, sans-serif`;
  const tw = g.measureText(text).width, w = Math.min(468, tw + 64), x = 256 - w / 2, y = 34, h = 60;
  g.fillStyle = 'rgba(6,10,16,.78)'; g.beginPath(); g.roundRect(x, y, w, h, h / 2); g.fill();
  g.strokeStyle = 'rgba(255,255,255,.28)'; g.lineWidth = 2; g.stroke();
  g.fillStyle = color; g.beginPath(); g.roundRect(x + 14, y + 18, 4, 24, 2); g.fill();
  g.fillStyle = color; g.fillText(text, x + 30, y + h / 2 + 1);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
/** house ad shown when a board has no paying advertiser */
export function houseAd(w, h, label, sub = 'Advertise here: /advertise', tone = 0) {
  const c = cv(w, h), g = c.getContext('2d'); const tones = [['#0b6b3a', '#f6c744'], ['#1e3a8a', '#fb923c'], ['#7c2d12', '#fde68a'], ['#14532d', '#ffffff']]; const [bg, fg] = tones[tone % tones.length];
  const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, bg); gr.addColorStop(1, '#0a0a0a'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
  g.fillStyle = fg; g.globalAlpha = 0.12; for (let i = 0; i < 8; i++) { g.beginPath(); g.arc(w * (i / 7), h * 0.9, h * 0.35, 0, 7); g.fill(); } g.globalAlpha = 1;
  g.fillStyle = fg; g.textAlign = 'center'; g.font = `800 ${Math.round(h * 0.2)}px "Lilita One", Nunito, sans-serif`; g.fillText('YOUR AD HERE', w / 2, h * 0.42);
  g.fillStyle = '#fff'; g.font = `700 ${Math.round(h * 0.085)}px Nunito, sans-serif`; g.fillText(sub, w / 2, h * 0.58); g.font = `600 ${Math.round(h * 0.06)}px Nunito, sans-serif`; g.globalAlpha = 0.75; g.fillText(label, w / 2, h * 0.72); g.globalAlpha = 1;
  g.fillStyle = 'rgba(255,255,255,.85)'; g.font = `700 ${Math.round(h * 0.05)}px Nunito, sans-serif`; g.textAlign = 'right'; g.fillText('House ad', w - 14, h - 12);
  return tex(c);
}
/** draw a creative image onto a canvas texture with a "Sponsored" tag */
export function creativeTexture(img, w, h, brand) {
  const c = cv(w, h), g = c.getContext('2d'); g.fillStyle = '#111'; g.fillRect(0, 0, w, h); g.drawImage(img, 0, 0, w, h);
  g.fillStyle = 'rgba(0,0,0,.6)'; g.fillRect(w - 190, h - 36, 190, 36); g.fillStyle = '#fff'; g.font = '700 20px Nunito, sans-serif'; g.textAlign = 'right'; g.fillText('Sponsored · ' + String(brand || '').slice(0, 14), w - 10, h - 11);
  return tex(c);
}
export function tex2(c, rep) { return tex(c, rep); }
