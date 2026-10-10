// Full city map: canvas, zoom + pan (wheel / drag / pinch), labels by zoom level, hover/tap info card, search list, legend with layer toggles, live players.
// All geometry comes from the city JSON via map-model.js. The STATIC layer (ground, districts, roads, buildings, plots) is drawn once into an offscreen bitmap and
// blitted each frame; only labels, markers and players are redrawn live, so it stays light on phones.
import { offsetPoly, polyLen, pointAt } from './roadgeom.js';
import { h, $ } from './api.js';
import { homeMarkers, remaining, etaLabel, etaSeconds } from './route.js';
import { buildModel, search, hitTest, labelRules, KIND_COL, LAYERS, DEFAULT_LAYERS } from './map-model.js';

export class CityMap {
  constructor(game) { this.g = game; this.model = null; this.layers = { ...DEFAULT_LAYERS }; this.open_ = false; this.cache = null; this.sel = null; this.hover = null; this.pins = new Map(); }
  get isOpen() { return this.open_; }
  open(focusId) {
    if (this.open_) return; const g = this.g; this.model = this.model || buildModel(g.city); this.syncHomes(); this.open_ = true; this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas = h('canvas', { class: 'bm-canvas' }); this.ctx = this.canvas.getContext('2d');
    this.card = h('div', { class: 'bm-card hidden' }); this.list = h('div', { class: 'bm-list hidden' }); this.legend = h('div', { class: 'bm-legend hidden' });
    this.input = h('input', { class: 'bm-search', placeholder: 'Search places, roads, districts…', type: 'search', autocomplete: 'off' });
    this.input.addEventListener('input', () => this.showList()); this.input.addEventListener('focus', () => this.showList());
    const top = h('div', { class: 'bm-top' }, h('b', { class: 'bm-title' }, `🗺 ${g.city.name || 'Map'}`), this.input, h('button', { class: 'bm-btn', id: 'bmMe', title: 'Centre on me', onclick: () => this.centreMe() }, '◎'), h('button', { class: 'bm-btn', id: 'bmHome', title: 'My house', onclick: () => this.goHome() }, '🏠'), h('button', { class: 'bm-btn', id: 'bmLegend', title: 'Layers', onclick: () => this.legend.classList.toggle('hidden') }, '☰'), h('button', { class: 'bm-btn', id: 'bmClose', onclick: () => this.close() }, '✕'));
    const zoom = h('div', { class: 'bm-zoom' }, h('button', { class: 'bm-btn', id: 'bmIn', onclick: () => this.zoomBy(1.5) }, '+'), h('button', { class: 'bm-btn', id: 'bmOut', onclick: () => this.zoomBy(1 / 1.5) }, '−'));
    this.root = h('div', { id: 'bigmap' }, this.canvas, top, this.list, this.legend, zoom, this.card); document.body.appendChild(this.root); this.drawLegend();
    this.resize(); this.fit(); const me = g.ctrl; if (me) { this.v.cx = me.x; this.v.cz = me.z; this.v.k = Math.max(this.v.k, 1.6); }
    this.bind(); this.onKey = (e) => { if (e.key === 'Escape') { if (e.target === this.input) { this.input.blur(); this.list.classList.add('hidden'); } else this.close(); e.stopPropagation(); } }; document.addEventListener('keydown', this.onKey, true);
    this.onResize = () => this.resize(); addEventListener('resize', this.onResize); const loop = () => { if (!this.open_) return; this.draw(); this.raf = requestAnimationFrame(loop); }; this.raf = requestAnimationFrame(loop);
    if (focusId) this.focusOn(this.model.catalogue.find(i => i.id === focusId)); window.__bigmap = this;
  }
  close() { if (!this.open_) return; this.open_ = false; cancelAnimationFrame(this.raf); document.removeEventListener('keydown', this.onKey, true); removeEventListener('resize', this.onResize); this.root.remove(); this.cache = null; }
  /** the player's own homes: always on the map, in the search list, one tap to go there */
  homes() { return homeMarkers(this.g.user); }
  syncHomes() { const cat = this.model.catalogue; for (let i = cat.length - 1; i >= 0; i--) if (String(cat[i].id).startsWith('myhouse:')) cat.splice(i, 1); for (const hm of this.homes()) cat.unshift({ id: 'myhouse:' + hm.id, type: 'myhouse', name: `My house: ${hm.name}`, icon: '🏠', x: hm.x, z: hm.z, group: 'my home house', lines: [hm.tier, hm.area].filter(Boolean) }); }
  goHome() { const hs = this.homes(); if (!hs.length) { this.g.ui.toast('You have no home yet. Open a house on the map to rent or buy one.'); return; } const hm = hs[0]; const it = this.model.catalogue.find(i => i.id === 'myhouse:' + hm.id); this.v.cx = hm.x; this.v.cz = hm.z; this.v.k = Math.max(this.v.k, 3.2); this.select(it); }
  toggle() { this.open_ ? this.close() : this.open(); }
  resize() { const r = this.root.getBoundingClientRect(); this.W = Math.max(200, Math.round(r.width)); this.H = Math.max(200, Math.round(r.height)); this.canvas.width = this.W * this.dpr; this.canvas.height = this.H * this.dpr; this.canvas.style.width = this.W + 'px'; this.canvas.style.height = this.H + 'px'; }
  extent() { const B = this.model.bounds, w = this.model.water; return { x0: Math.min(B.minX, w?.minX ?? B.minX), x1: Math.max(B.maxX, w?.maxX ?? B.maxX), z0: B.minZ, z1: Math.max(B.maxZ, w?.maxZ ?? B.maxZ) }; }
  fit() { const B = this.model.bounds; this.kMin = Math.min(this.W / (B.maxX - B.minX + 40), this.H / (B.maxZ - B.minZ + 40)) * 0.9; this.kMax = 14; this.v = { cx: (B.minX + B.maxX) / 2, cz: (B.minZ + B.maxZ) / 2, k: this.kMin * 1.05 }; }
  // ---- transforms
  sx(x) { return (x - this.v.cx) * this.v.k + this.W / 2; } sz(z) { return (z - this.v.cz) * this.v.k + this.H / 2; }
  wx(px) { return (px - this.W / 2) / this.v.k + this.v.cx; } wz(py) { return (py - this.H / 2) / this.v.k + this.v.cz; }
  zoomAt(px, py, f) { const x = this.wx(px), z = this.wz(py); this.v.k = Math.min(this.kMax, Math.max(this.kMin, this.v.k * f)); this.v.cx = x - (px - this.W / 2) / this.v.k; this.v.cz = z - (py - this.H / 2) / this.v.k; }
  zoomBy(f) { this.zoomAt(this.W / 2, this.H / 2, f); }
  centreMe() { const c = this.g.ctrl; this.v.cx = c.x; this.v.cz = c.z; this.v.k = Math.max(this.v.k, 2.5); }
  focusOn(it) { if (!it) return; this.v.cx = it.x; this.v.cz = it.z; this.v.k = Math.max(this.v.k, it.type === 'district' ? this.kMin * 1.8 : it.type === 'road' ? 2 : 4.5); }
  // ---- static layer
  drawStatic(c, tx, tz, k, view) {
    const m = this.model, E = this.extent(), L = this.layers; c.fillStyle = '#2b6f8a'; c.fillRect(tx(E.x0 - 100), tz(E.z0 - 100), (E.x1 - E.x0 + 200) * k, (E.z1 - E.z0 + 200) * k);
    const B = m.bounds; c.fillStyle = '#d3cdb4'; c.fillRect(tx(B.minX), tz(B.minZ), (B.maxX - B.minX) * k, (B.maxZ - B.minZ) * k);
    if (m.water) { c.fillStyle = '#3d86a6'; c.fillRect(tx(m.water.minX), tz(m.water.minZ), (m.water.maxX - m.water.minX) * k, (m.water.maxZ - m.water.minZ) * k); c.strokeStyle = '#ffffff40'; c.lineWidth = Math.max(1, k * 0.4); for (let z = m.water.minZ + 14; z < m.water.maxZ; z += 22) { c.beginPath(); for (let x = m.water.minX; x < m.water.maxX; x += 30) { c.moveTo(tx(x), tz(z)); c.quadraticCurveTo(tx(x + 7), tz(z - 3), tx(x + 15), tz(z)); } c.stroke(); } }
    if (L.districts) for (const d of m.districts) { c.fillStyle = d.color + '88'; c.fillRect(tx(d.x0), tz(d.z0), (d.x1 - d.x0) * k, (d.z1 - d.z0) * k); }
    c.fillStyle = '#c3c8a6'; for (const z of m.zones) c.fillRect(tx(z.x0), tz(z.z0), (z.x1 - z.x0) * k, (z.z1 - z.z0) * k);
    if (L.districts) { c.setLineDash([6, 5]); c.strokeStyle = '#6b5b3e99'; c.lineWidth = 1.2; for (const d of m.districts) c.strokeRect(tx(d.x0), tz(d.z0), (d.x1 - d.x0) * k, (d.z1 - d.z0) * k); c.setLineDash([]); }
    if (L.landmarks) for (const p of m.items) if (p.lot) { const x = tx(p.x - p.lot.w / 2), z = tz(p.z - p.lot.d / 2); c.fillStyle = '#5d6772'; c.fillRect(x, z, p.lot.w * k, p.lot.d * k); c.strokeStyle = '#2a6fc4'; c.lineWidth = 1.5; c.strokeRect(x, z, p.lot.w * k, p.lot.d * k); }
    if (L.plots) for (const p of m.items) if (p.type === 'plot') { const x = tx(p.x - p.size / 2), z = tz(p.z - p.size / 2), s = p.size * k; c.fillStyle = '#9bc47a'; c.fillRect(x, z, s, s); c.strokeStyle = '#4f7a3a'; c.lineWidth = 1.5; c.setLineDash([5, 3]); c.strokeRect(x, z, s, s); c.setLineDash([]); c.beginPath(); for (let t = 0; t <= s; t += Math.max(6, s / 6)) { c.moveTo(x + t, z); c.lineTo(x, z + t); } c.strokeStyle = '#4f7a3a55'; c.stroke(); }
    if (L.roads) { const path = (pts) => { c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(tx(p[0]), tz(p[1])) : c.moveTo(tx(p[0]), tz(p[1]))); };
      c.lineJoin = 'round';
      for (const r of m.roads) { const w = r.width * k; c.lineCap = 'butt'; c.strokeStyle = '#b9b39a'; c.lineWidth = w + 6 * Math.min(1.5, k / 2); path(r.pts); c.stroke(); }
      for (const o of m.roundabouts) { c.fillStyle = '#b9b39a'; c.beginPath(); c.arc(tx(o.x), tz(o.z), o.outerR * k + 3 * Math.min(1.5, k / 2), 0, 7); c.fill(); }
      for (const r of m.roads) { const w = r.width * k; c.strokeStyle = '#3d4046'; c.lineWidth = w; path(r.pts); c.stroke(); }
      for (const o of m.roundabouts) { c.fillStyle = '#3d4046'; c.beginPath(); c.arc(tx(o.x), tz(o.z), o.outerR * k, 0, 7); c.fill(); c.fillStyle = '#b9b39a'; c.beginPath(); c.arc(tx(o.x), tz(o.z), (o.islandR + 0.6) * k, 0, 7); c.fill(); c.fillStyle = '#5a9a4e'; c.beginPath(); c.arc(tx(o.x), tz(o.z), o.islandR * k, 0, 7); c.fill();
        c.strokeStyle = '#f2d23c'; c.lineWidth = Math.max(1, k * 0.35); c.setLineDash([k * 2, k * 2]); c.beginPath(); c.arc(tx(o.x), tz(o.z), (o.outerR + o.islandR) / 2 * k, 0, 7); c.stroke(); c.setLineDash([]); }
      for (const r of m.roads) { c.strokeStyle = '#f2d23c'; c.lineWidth = Math.max(1, k * 0.35); c.setLineDash([k * 4, k * 3]); path(r.pts); c.stroke(); c.setLineDash([]);
        if (k >= 2.5) { c.strokeStyle = '#ffffffaa'; c.lineWidth = Math.max(1, k * 0.2); for (const o of [-r.width / 2 + 0.8, r.width / 2 - 0.8]) { path(offsetPoly(r.pts, o, false)); c.stroke(); } } } }
    if (L.buildings) for (const b of m.buildings) { const x = tx(b.rect.x0), z = tz(b.rect.z0), w = b.w * k, d = b.d * k; c.fillStyle = KIND_COL[b.kind] || '#999'; c.fillRect(x, z, w, d); c.fillStyle = '#00000022'; c.fillRect(x + w * 0.08, z + d * 0.08, w * 0.84, d * 0.84); c.fillStyle = KIND_COL[b.kind] || '#999'; c.fillRect(x + w * 0.12, z + d * 0.12, w * 0.76, d * 0.76); c.strokeStyle = '#33333388'; c.lineWidth = 1; c.strokeRect(x, z, w, d); }
    const pl = (m.city.landmarks || []).find(l => l.kind === 'plaza'); if (pl && L.landmarks) { c.fillStyle = '#e8dfc2'; c.beginPath(); c.arc(tx(pl.x), tz(pl.z), 11 * k, 0, 7); c.fill(); c.fillStyle = '#6fb7d6'; c.beginPath(); c.arc(tx(pl.x), tz(pl.z), 4 * k, 0, 7); c.fill(); }
    void view;
  }
  staticLayer() {
    const key = JSON.stringify([this.layers.districts, this.layers.roads, this.layers.buildings, this.layers.plots, this.layers.landmarks]); const E = this.extent(); const w = E.x1 - E.x0 + 200, d = E.z1 - E.z0 + 100;
    const ppu = Math.min(3, 3000 / Math.max(w, d)); if (this.cache && this.cache.key === key) return this.cache;
    const cv = document.createElement('canvas'); cv.width = Math.ceil(w * ppu); cv.height = Math.ceil(d * ppu); const c = cv.getContext('2d'); const ox = E.x0 - 100, oz = E.z0 - 50;
    this.drawStatic(c, (x) => (x - ox) * ppu, (z) => (z - oz) * ppu, ppu); this.cache = { key, cv, ppu, ox, oz }; return this.cache;
  }
  // ---- live drawing
  draw() {
    const c = this.ctx, k = this.v.k, dpr = this.dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, this.W, this.H);
    const sl = this.staticLayer();
    if (k <= sl.ppu * 1.2) { c.imageSmoothingEnabled = true; c.drawImage(sl.cv, this.sx(sl.ox), this.sz(sl.oz), sl.cv.width * k / sl.ppu, sl.cv.height * k / sl.ppu); } else this.drawStatic(c, (x) => this.sx(x), (z) => this.sz(z), k, true);
    this.drawLabels(c, k); this.drawDynamic(c, k);
  }
  text(c, t, x, y, o = {}) { c.font = `${o.w || 700} ${o.s || 12}px Nunito, system-ui, sans-serif`; c.textAlign = o.a || 'center'; c.textBaseline = 'middle'; c.lineWidth = 3.5; c.strokeStyle = o.stroke || '#fffdf3e6'; c.lineJoin = 'round'; c.strokeText(t, x, y); c.fillStyle = o.fill || '#2a2a2a'; c.fillText(t, x, y); }
  onScreen(x, y, pad = 40) { return x > -pad && y > -pad && x < this.W + pad && y < this.H + pad; }
  drawLabels(c, k) {
    const m = this.model, L = this.layers;
    if (L.districts && labelRules.district(k)) { const a = Math.min(1, (2.2 - k) / 0.8); c.globalAlpha = Math.max(0.35, a); for (const d of m.districts) this.text(c, d.name.toUpperCase(), this.sx((d.x0 + d.x1) / 2), this.sz((d.z0 + d.z1) / 2), { s: Math.max(13, Math.min(30, k * 12)), w: 800, fill: '#5b4a2a', stroke: '#ffffff99' }); c.globalAlpha = 1; }
    if (L.roads && labelRules.road(k)) { for (const r of m.roads) { const total = polyLen(r.pts); const n = Math.max(1, Math.floor(total / 170)); for (let i = 0; i < n; i++) { const q = pointAt(r.pts, total * (i + 0.5) / n); const px = this.sx(q[0]), py = this.sz(q[1]); if (!this.onScreen(px, py)) continue; c.save(); c.translate(px, py); let ang = q[2]; if (ang >= Math.PI / 2 - 1e-6) ang -= Math.PI; if (ang < -Math.PI / 2) ang += Math.PI; c.rotate(ang); this.text(c, r.name, 0, 0, { s: Math.max(10, Math.min(15, k * 4.2)), fill: '#fff', stroke: '#3d4046' }); c.restore(); } }
      for (const o of m.roundabouts) { const px = this.sx(o.x), py = this.sz(o.z + o.outerR + 4); if (this.onScreen(px, py)) this.text(c, o.name, px, py, { s: Math.max(10, Math.min(14, k * 3.6)), fill: '#2a2a2a' }); } }
    const lr = { venue: 'venues', shop: 'venues', job: 'jobs', landmark: 'landmarks', house: 'homes', billboard: 'billboards' };
    for (const it of m.items) {
      if (it.type === 'plot') { if (L.plots && labelRules.plot(k)) this.text(c, it.name, this.sx(it.x), this.sz(it.z), { s: 11, fill: '#2f5a1f' }); continue; }
      if (!L[lr[it.type]]) continue; if (it.type === 'house' && k < 1.5) continue; const px = this.sx(it.x), py = this.sz(it.z); if (!this.onScreen(px, py)) continue;
      const big = it.type === 'venue' || it.type === 'landmark'; const sz = big ? Math.max(18, Math.min(30, k * 9)) : it.type === 'billboard' ? 14 : Math.max(14, Math.min(22, k * 6));
      c.fillStyle = it.type === 'billboard' ? '#35c46b' : it.type === 'job' ? '#4aa3ff' : it.type === 'house' ? '#e56b6f' : '#ffc20e'; c.beginPath(); c.arc(px, py, sz * 0.62, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2; c.stroke(); c.font = `${sz * 0.78}px system-ui`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#000'; c.fillText(it.icon, px, py + 1);
      if (labelRules[it.type]?.(k) && (it.type !== 'billboard')) this.text(c, it.name, px, py + sz * 0.62 + 9, { s: it.type === 'venue' ? 12 : 11 });
    }
    if (L.buildings && labelRules.building(k)) for (const b of m.buildings) { const px = this.sx(b.x), py = this.sz(b.z); if (this.onScreen(px, py)) this.text(c, b.name, px, py, { s: 10, w: 600 }); }
  }
  playersNow() { const out = []; for (const gh of this.g.ghosts?.map?.values?.() || []) if (gh.root) out.push({ id: gh.id, name: gh.name, x: gh.root.position.x, z: gh.root.position.z, color: gh.color }); return out; }
  drawDynamic(c, k) {
    const L = this.layers; this.others = this.playersNow(); const t = performance.now();
    const hi = this.sel || this.hover; if (hi?.rect) { c.strokeStyle = '#ff3b30'; c.lineWidth = 3; c.setLineDash([]); c.strokeRect(this.sx(hi.rect.x0), this.sz(hi.rect.z0), (hi.rect.x1 - hi.rect.x0) * k, (hi.rect.z1 - hi.rect.z0) * k); }
    else if (hi && hi.x != null) { c.strokeStyle = '#ff3b30'; c.lineWidth = 3; c.beginPath(); c.arc(this.sx(hi.x), this.sz(hi.z), 20, 0, 7); c.stroke(); }
    const nv = this.g.nav?.active; if (nv) { const pts = nv.pts; c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = '#ffffffcc'; c.lineWidth = 7; c.beginPath(); pts.forEach((q, i) => i ? c.lineTo(this.sx(q[0]), this.sz(q[1])) : c.moveTo(this.sx(q[0]), this.sz(q[1]))); c.stroke(); c.strokeStyle = '#8e2de2'; c.lineWidth = 4; c.setLineDash([10, 6]); c.lineDashOffset = -t / 60; c.stroke(); c.setLineDash([]); c.lineDashOffset = 0;
      const e = pts[pts.length - 1], ex = this.sx(e[0]), ey = this.sz(e[1]); c.fillStyle = '#8e2de2'; c.beginPath(); c.arc(ex, ey, 9, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2.5; c.stroke(); const me0 = this.g.ctrl; const rem = remaining(pts, nv.i, me0.x, me0.z); this.text(c, `${nv.dest.name || 'Destination'} · ${Math.round(rem)} m · ${etaLabel(etaSeconds(rem, nv.mode))}`, ex, ey - 18, { s: 12, fill: '#5a189a' }); }
    for (const hm of this.homes()) { const px = this.sx(hm.x), py = this.sz(hm.z); if (!this.onScreen(px, py, 60)) continue; c.fillStyle = '#e63946'; c.beginPath(); c.arc(px, py, 14, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 3; c.stroke(); c.font = '16px system-ui'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#fff'; c.fillText('🏠', px, py + 1); this.text(c, 'My house', px, py + 25, { s: 12, w: 800, fill: '#b3261e' }); }
    const wp = this.g.waypoint; if (wp && !nv) { c.fillStyle = '#b44cff'; c.beginPath(); c.arc(this.sx(wp.x), this.sz(wp.z), 7, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2; c.stroke(); }
    if (L.players) for (const p of this.others) { const px = this.sx(p.x), py = this.sz(p.z); if (!this.onScreen(px, py)) continue; c.fillStyle = '#fff'; c.beginPath(); c.arc(px, py, 5, 0, 7); c.fill(); c.fillStyle = p.color || '#2a9d8f'; c.beginPath(); c.arc(px, py, 3.4, 0, 7); c.fill(); if (labelRules.player(k)) this.text(c, p.name, px, py - 12, { s: 10 }); }
    const me = this.g.ctrl; const mx = this.sx(me.x), my = this.sz(me.z); c.strokeStyle = `rgba(255,59,48,${0.5 - 0.4 * Math.abs(Math.sin(t / 500))})`; c.lineWidth = 3; c.beginPath(); c.arc(mx, my, 14 + 4 * Math.abs(Math.sin(t / 500)), 0, 7); c.stroke();
    c.save(); c.translate(mx, my); c.rotate(-me.ry + Math.PI / 2); c.fillStyle = '#ff3b30'; c.beginPath(); c.moveTo(0, -11); c.lineTo(8, 9); c.lineTo(0, 5); c.lineTo(-8, 9); c.closePath(); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2; c.stroke(); c.restore(); this.text(c, 'You', mx, my + 22, { s: 11, fill: '#b3261e' });
    // scale bar + compass
    const nice = [10, 20, 50, 100, 200].find(v => v * k >= 60) || 200; const bx = 14, by = this.H - 18; c.fillStyle = '#fffdf3cc'; c.fillRect(bx - 6, by - 14, nice * k + 12, 26); c.strokeStyle = '#333'; c.lineWidth = 2; c.beginPath(); c.moveTo(bx, by + 4); c.lineTo(bx, by + 8); c.lineTo(bx + nice * k, by + 8); c.lineTo(bx + nice * k, by + 4); c.stroke(); this.text(c, `${nice} m`, bx + nice * k / 2, by - 4, { s: 11, stroke: 'transparent' });
    this.text(c, 'N ▲', this.W - 34, this.H - 20, { s: 12, w: 800 });
  }
  // ---- interaction
  hitAt(px, py) { for (const hm of this.homes()) if (Math.hypot(this.sx(hm.x) - px, this.sz(hm.z) - py) < 20) return { id: 'myhouse:' + hm.id, type: 'myhouse', name: `My house: ${hm.name}`, icon: '🏠', x: hm.x, z: hm.z, lines: [hm.tier, hm.area].filter(Boolean) }; return hitTest(this.model, this.wx(px), this.wz(py), this.v.k, this.layers, this.others || this.playersNow()); }
  select(it) { this.sel = it; this.showCard(it, true); }
  showCard(it, pinned) {
    if (!it) { this.card.classList.add('hidden'); return; } const g = this.g; this.card.classList.remove('hidden'); this.card.classList.toggle('pinned', !!pinned);
    const kids = [h('div', { class: 'row sp' }, h('b', {}, `${it.icon ? it.icon + ' ' : ''}${it.name}`), pinned ? h('button', { class: 'bm-x', onclick: () => { this.sel = null; this.card.classList.add('hidden'); } }, '✕') : ''), ...((it.lines || []).filter(Boolean).map(l => h('div', { class: 'mut' }, l)))];
    if (pinned && it.x != null && it.type !== 'water' && it.type !== 'player') kids.push(...this.navRows(it));
    else if (pinned && it.type === 'player') kids.push(h('div', { class: 'row' }, h('button', { class: 'btn small ghost', onclick: () => { g.setWaypoint(it.x, it.z, it.name); this.close(); } }, '📍 Set waypoint here')));
    this.card.replaceChildren(...kids);
  }
  /** route estimate and the ways to get there: take me (autopilot on foot), drive me (autopilot by car), I'll drive (guide only), paid travel and a plain waypoint */
  navRows(it) {
    const g = this.g, dest = { x: it.x, z: it.z, name: it.name.replace(/^My house: /, '') || 'Destination' }; const eta = h('div', { class: 'mut', id: 'bmEta' }, 'Working out the route…');
    setTimeout(() => { if (!this.open_ || this.sel !== it) return; try { const e = g.nav.estimate(dest); eta.textContent = e.walk ? `Route about ${Math.round((e.drive || e.walk).length)} m · 🚶 ${e.walk.label} · 🚗 ${e.drive ? e.drive.label : 'no road route'} (estimates)` : 'No route found from here. Try the travel options.'; } catch (err) { eta.textContent = ''; } }, 30);
    const go = (opts) => () => { const r = g.nav.start(dest, opts); if (r) this.close(); };
    const rows = [eta, h('div', { class: 'bm-actions' },
      h('button', { class: 'btn small alt', id: 'bmWalk', onclick: go({ mode: 'walk', auto: true }) }, '🚶 Take me there'),
      h('button', { class: 'btn small alt', id: 'bmDriveMe', onclick: go({ mode: 'drive', auto: true }) }, '🚗 Drive me'),
      h('button', { class: 'btn small ghost', id: 'bmGuide', onclick: go({ mode: 'drive', auto: false }) }, '🧭 I will drive'))];
    const row2 = []; if (it.placeId) row2.push(h('button', { class: 'btn small ghost', id: 'bmOpen', onclick: () => { this.close(); g.ui.place(it.placeId); } }, 'Open and travel (fare)'));
    row2.push(h('button', { class: 'btn small ghost', onclick: () => { g.setWaypoint(it.x, it.z, it.name); g.ui.toast(`Waypoint set: ${it.name}.`); this.close(); } }, '📍 Waypoint')); rows.push(h('div', { class: 'bm-actions' }, ...row2)); return rows;
  }
  showList() {
    const res = search(this.model, this.input.value); this.list.classList.remove('hidden');
    this.list.replaceChildren(...(res.length ? res.map(it => h('button', { class: 'bm-item', 'data-id': it.id, onclick: () => { this.list.classList.add('hidden'); this.input.blur(); this.focusOn(it); this.select({ ...it, rect: it.type === 'plot' ? { x0: it.x - it.size / 2, x1: it.x + it.size / 2, z0: it.z - it.size / 2, z1: it.z + it.size / 2 } : undefined }); } }, h('span', {}, `${it.icon || (it.type === 'road' ? '🛣' : '📍')} ${it.name}`), h('small', { class: 'mut' }, it.group))) : [h('div', { class: 'mut', style: 'padding:10px' }, 'Nothing found.')]));
  }
  drawLegend() {
    const row = (l) => h('label', { class: 'bm-lg' }, h('input', { type: 'checkbox', 'data-layer': l[0], checked: this.layers[l[0]], onchange: (e) => { this.layers[l[0]] = e.target.checked; this.cache = null; } }), h('i', { style: `background:${l[2]}` }), l[1]);
    this.legend.replaceChildren(h('b', {}, 'Layers'), ...LAYERS.map(row), h('b', { style: 'margin-top:6px' }, 'Buildings'), h('div', { class: 'bm-kinds' }, Object.entries(KIND_COL).map(([k, col]) => h('span', {}, h('i', { style: `background:${col}` }), k))));
  }
  bind() {
    const cv = this.canvas, pts = new Map(); let drag = null, pinch = null, moved = 0;
    cv.addEventListener('wheel', (e) => { e.preventDefault(); const r = cv.getBoundingClientRect(); this.zoomAt(e.clientX - r.left, e.clientY - r.top, Math.exp(-e.deltaY * 0.0015)); }, { passive: false });
    cv.addEventListener('pointerdown', (e) => { cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); moved = 0; this.list.classList.add('hidden'); if (pts.size === 1) drag = { x: e.clientX, y: e.clientY }; else if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y) }; drag = null; } });
    cv.addEventListener('pointermove', (e) => {
      const r = cv.getBoundingClientRect(); if (!pts.has(e.pointerId)) { if (e.pointerType === 'mouse' && !this.sel) { const it = this.hitAt(e.clientX - r.left, e.clientY - r.top); this.hover = it; this.showCard(it, false); cv.style.cursor = it && it.type !== 'water' ? 'pointer' : 'grab'; } return; }
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 2 && pinch) { const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); this.zoomAt((a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top, d / pinch.d); pinch.d = d; moved = 99; }
      else if (drag) { const dx = e.clientX - drag.x, dy = e.clientY - drag.y; moved += Math.abs(dx) + Math.abs(dy); drag.x = e.clientX; drag.y = e.clientY; this.v.cx -= dx / this.v.k; this.v.cz -= dy / this.v.k; }
    });
    const up = (e) => { const r = cv.getBoundingClientRect(); const had = pts.has(e.pointerId); pts.delete(e.pointerId); if (pts.size < 2) pinch = null; if (!pts.size) { if (had && moved < 8 && e.type === 'pointerup') { const it = this.hitAt(e.clientX - r.left, e.clientY - r.top); this.select(it); } drag = null; } else if (pts.size === 1) { const [p] = [...pts.values()]; drag = { x: p.x, y: p.y }; } };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  }
}
