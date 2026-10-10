// Interior room: iso cut-away, owner Buy mode (grid snap, rotate, sell, "Something is in the way"), visitor read-only view.
import * as THREE from 'three';
import { get, post, fmtN, h, $ } from './api.js';
import { say } from './ui.js';
import { houseShell } from './rooms.js';

const CELL = 1.4; const COLORS = { tv: 0x222831, sofa: 0xb5543a, fridge: 0xe8eef2, rug: 0xd9a441, plant: 0x2f9e5a, table: 0x9c6b3c, gen: 0xc0392b, bed: 0x4a6fa5 };
const footprint = (def, rot) => (rot % 2 ? { w: def.d, d: def.w } : { w: def.w, d: def.d });
const overlap = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.z < b.z + b.d && b.z < a.z + a.d;

export class Interior {
  constructor(game) { this.g = game; this.el = $('#interior'); this.open = false; }
  async show(propertyId, asVisitor) {
    const g = this.g; const data = await get(`/api/property/${propertyId}/interior`).catch(e => { g.ui.error(e); return null; }); if (!data) return false;
    this.data = data; this.propertyId = propertyId; this.visitor = !!data.visitor; this.catalog = Object.fromEntries((data.catalog || g.cfg.furniture || []).map(f => [f.id, f])); this.placed = data.placed.map(p => ({ ...p })); this.buy = false; this.sel = null; this.rot = 0; this.open = true; g.busy = true; g.ctrl.frozen = true;
    this.el.classList.remove('hidden'); this.el.replaceChildren(); this.build(); this.chrome(); this.loop(); return true;
  }
  build() {
    const d = this.data; const W = d.room.w, D = d.room.d; this.canvas = h('canvas'); this.el.append(this.canvas);
    this.r = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true }); this.r.setPixelRatio(Math.min(devicePixelRatio, 2)); this.scene = new THREE.Scene(); this.scene.background = new THREE.Color(0x1d2b25);
    this.cam = new THREE.PerspectiveCamera(42, 1, 0.1, 200); this.yaw = Math.PI / 4; this.pitch = 0.78; this.dist = Math.max(W, D) * CELL * 1.7; this.center = new THREE.Vector3(W * CELL / 2, 0, D * CELL / 2);
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x887766, 1.0)); const sun = new THREE.DirectionalLight(0xfff0d0, 1.1); sun.position.set(6, 12, 4); this.scene.add(sun);
    const floor = new THREE.Mesh(new THREE.BoxGeometry(W * CELL, 0.2, D * CELL), this.floorMat = new THREE.MeshLambertMaterial({ color: d.floor?.hex || '#b98a56' })); floor.position.set(W * CELL / 2, -0.1, D * CELL / 2); this.scene.add(floor);
    const grid = new THREE.GridHelper(Math.max(W, D) * CELL, Math.max(W, D), 0x8c7a55, 0xa89870); grid.scale.set(W / Math.max(W, D), 1, D / Math.max(W, D)); grid.position.set(W * CELL / 2, 0.01, D * CELL / 2); this.grid = grid; this.scene.add(grid);
    const wallM = this.wallMat = new THREE.MeshLambertMaterial({ color: d.wall?.hex || '#f1e7cf' }); const back = new THREE.Mesh(new THREE.BoxGeometry(W * CELL, 3.4, 0.2), wallM); back.position.set(W * CELL / 2, 1.7, -0.1); const left = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.4, D * CELL), wallM); left.position.set(-0.1, 1.7, D * CELL / 2); this.scene.add(back, left);
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(W * CELL, 0.5, 0.22), new THREE.MeshLambertMaterial({ color: 0x008751 })); stripe.position.set(W * CELL / 2, 0.25, -0.1); this.scene.add(stripe);
    this.anim = []; this.t0 = performance.now(); houseShell(this.scene, d.room, CELL, this.anim);
    for (const r of d.room.reserved.filter(r => r.what === 'doorway')) { const m = new THREE.Mesh(new THREE.BoxGeometry(r.w * CELL - 0.1, r.what === 'bed' ? 0.7 : 0.02, r.d * CELL - 0.1), new THREE.MeshLambertMaterial({ color: r.what === 'bed' ? COLORS.bed : 0xe2d9bf, transparent: r.what !== 'bed', opacity: r.what === 'bed' ? 1 : 0.6 })); m.position.set((r.x + r.w / 2) * CELL, r.what === 'bed' ? 0.35 : 0.02, (r.z + r.d / 2) * CELL); this.scene.add(m); if (r.what === 'bed') { const pil = new THREE.Mesh(new THREE.BoxGeometry(r.w * CELL - 0.4, 0.2, 0.5), new THREE.MeshLambertMaterial({ color: 0xffffff })); pil.position.set((r.x + r.w / 2) * CELL, 0.8, (r.z + 0.4) * CELL); this.scene.add(pil); } }
    const door = d.room.reserved.find(r => r.what === 'doorway'); const dm = new THREE.Mesh(new THREE.BoxGeometry(door.w * CELL, 0.04, 0.12), new THREE.MeshBasicMaterial({ color: 0xffc20e })); dm.position.set((door.x + door.w / 2) * CELL, 0.05, D * CELL); this.scene.add(dm);
    this.items = new THREE.Group(); this.scene.add(this.items); this.ghost = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x35c46b, transparent: true, opacity: 0.55 })); this.ghost.visible = false; this.scene.add(this.ghost);
    this.rebuildItems(); this.bindInput(); this.resize(); this.onResize = () => this.resize(); addEventListener('resize', this.onResize);
  }
  meshFor(id, rot) {
    const def = this.catalog[id]; const f = footprint(def, rot); const hgt = { tv: 1.1, sofa: 0.9, fridge: 2.0, rug: 0.04, plant: 1.2, table: 0.8, gen: 0.8 }[id] || 1; const grp = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(f.w * CELL - 0.12, hgt, f.d * CELL - 0.12), new THREE.MeshLambertMaterial({ color: COLORS[id] || 0x999999 })); base.position.y = hgt / 2; grp.add(base);
    if (id === 'sofa') { const bk = new THREE.Mesh(new THREE.BoxGeometry(rot % 2 ? 0.3 : f.w * CELL - 0.12, 0.7, rot % 2 ? f.d * CELL - 0.12 : 0.3), new THREE.MeshLambertMaterial({ color: 0x8e3d27 })); bk.position.set(rot === 1 ? -(f.w * CELL / 2 - 0.2) : rot === 3 ? (f.w * CELL / 2 - 0.2) : 0, 1.0, rot === 0 ? -(f.d * CELL / 2 - 0.2) : rot === 2 ? (f.d * CELL / 2 - 0.2) : 0); grp.add(bk); }
    if (id === 'tv') { const sc = new THREE.Mesh(new THREE.BoxGeometry(f.w * CELL - 0.3, hgt - 0.3, f.d * CELL - 0.3), new THREE.MeshBasicMaterial({ color: 0x356cbd })); sc.position.y = hgt / 2 + 0.05; sc.scale.multiplyScalar(0.98); grp.add(sc); base.scale.set(1, 0.9, 1); }
    if (id === 'plant') { const l = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), new THREE.MeshLambertMaterial({ color: 0x35c46b })); l.position.y = 1.45; grp.add(l); base.scale.set(0.5, 0.6, 0.5); base.position.y = 0.3; }
    grp.position.set(0, 0, 0); return grp;
  }
  rebuildItems() { this.items.clear(); this.meshes = {}; for (const p of this.placed) { if (this.sel && this.sel.id === p.id && this.sel.fromPlaced) continue; this.addItem(p); } }
  addItem(p) { const f = footprint(this.catalog[p.id], p.rot); const m = this.meshFor(p.id, p.rot); m.position.set((p.x + f.w / 2) * CELL, 0, (p.z + f.d / 2) * CELL); m.userData = { id: p.id }; this.items.add(m); this.meshes[p.id] = m; }
  canPlace(id, x, z, rot) {
    const d = this.data, def = this.catalog[id], f = footprint(def, rot), r = { x, z, w: f.w, d: f.d };
    if (x < 0 || z < 0 || x + f.w > d.room.w || z + f.d > d.room.d) return false; for (const rs of d.room.reserved) if (overlap(r, rs)) return false;
    for (const o of this.placed) { if (o.id === id) continue; const od = this.catalog[o.id]; if ((od.layer === 'floor') === (def.layer === 'floor')) { const of = footprint(od, o.rot); if (overlap(r, { x: o.x, z: o.z, w: of.w, d: of.d })) return false; } } return true;
  }
  chrome() {
    const d = this.data; const ui = this.g.ui; this.guestsEl = h('div', { class: 'iguests' }); this.feed = h('div', { class: 'ifeed' }); this.lastEvent = 0;
    const head = h('div', { class: 'ihead' }, h('div', {}, h('h3', {}, this.visitor ? `@${d.owner}'s ${d.name}` : d.name), h('div', { style: 'font-size:13px' }, `${d.tierLabel} · ${d.area} · ❤️ `, h('span', { id: 'loveCount' }, d.loves || 0)), this.guestsEl),
      h('div', { class: 'row' }, this.visitor ? '' : h('button', { class: 'btn small', id: 'paintBtn', onclick: () => this.paintPanel() }, '🎨 Paint'), this.visitor ? '' : h('button', { class: 'btn small alt', id: 'buyToggle', onclick: () => this.toggleBuy() }, '🛋 Buy mode'), h('button', { class: 'btn small red', id: 'interiorLeave', onclick: () => this.leave() }, 'Leave')));
    this.tool = h('div', { class: 'itool hidden' });
    const acts = h('div', { class: 'iacts' }, ...(this.visitor ? [['love', '😍 Love your house'], ['greet', '👋 Greet'], ['hype', '🔥 Hype'], ['sofa', '🛋 Sofa'], ['tv', '📺 TV']] : [['greet', '👋 Greet'], ['sofa', '🛋 Sofa'], ['tv', '📺 TV']]).map(([k, l]) => h('button', { class: 'btn small ghost', 'data-act': k, onclick: () => this.act(k) }, l)));
    const say = h('input', { class: 'sheet-input', id: 'roomSay', maxlength: 120, placeholder: 'Say something nice…', onkeydown: (e) => { if (e.key === 'Enter') this.say(say); e.stopPropagation(); } }); const bar = h('div', { class: 'ibar' }, this.feed, acts, h('div', { class: 'row' }, say, h('button', { class: 'btn small', onclick: () => this.say(say) }, 'Send')));
    this.paint = h('div', { class: 'ipaint hidden' }); this.el.append(head, this.tool, this.paint, bar); void ui; this.startPoll();
  }
  startPoll() { clearInterval(this.pt); const tick = async () => { if (!this.open) return; const r = await get(`/api/room?propertyId=${this.propertyId}&since=${this.lastEvent}`).catch(e => e); if (r instanceof Error) { if (r.status === 403 && this.visitor) { this.g.ui.toast('The host asked you to step out. No wahala.'); this.leave(); } return; } this.room = r; this.drawRoom(r); }; tick(); this.pt = setInterval(tick, 2500); }
  drawRoom(r) {
    $('#loveCount') && ($('#loveCount').textContent = r.loves); this.guestsEl.replaceChildren(h('small', {}, r.isOwner ? (r.guests.length ? 'Guests: ' : 'No guests right now') : `Host ${r.ownerHome ? '🟢 home' : '⚪ out'} · guests: `), ...r.guests.map(n => h('span', { class: 'gchip' }, '@' + n, r.isOwner ? h('button', { title: 'Ask to leave', onclick: () => this.kick(n) }, '✕') : h('button', { title: 'Mute or report', onclick: () => this.g.ui.playerMenu(n) }, '⋯'))));
    if (!r.isOwner) { const lb = this.el.querySelector('[data-act=love]'); if (lb) lb.disabled = r.lovedToday; } const sb = this.el.querySelector('[data-act=sofa]'), tb = this.el.querySelector('[data-act=tv]'); if (sb) sb.disabled = !r.can.sofa; if (tb) tb.disabled = !r.can.tv;
    if (r.wall.hex !== this.data.wall?.hex || r.floor.hex !== this.data.floor?.hex) { this.data.wall = r.wall; this.data.floor = r.floor; this.wallMat.color.set(r.wall.hex); this.floorMat.color.set(r.floor.hex); }
    for (const e of r.events) { if (e.id <= this.lastEvent) continue; this.lastEvent = e.id; const line = h('div', { class: `ev ${e.kind}`, onclick: () => e.kind === 'say' && e.u !== this.g.user.username && this.g.ui.playerMenu(e.u) }, e.kind === 'say' ? `${e.u}: ${e.t}` : e.t); this.feed.append(line); while (this.feed.children.length > 6) this.feed.firstChild.remove(); }
  }
  async act(k) { const ui = this.g.ui; if (k === 'love') { const r = await ui.guard(() => post('/api/visit/love', { propertyId: this.propertyId })); if (r) { ui.toast('You showed some love 😍'); this.g.refreshMe(); } } else { const r = await ui.guard(() => post('/api/visit/act', { propertyId: this.propertyId, action: k })); if (r) this.g.refreshMe(); } this.startPoll(); }
  async say(inp) { const t = inp.value.trim(); if (!t) return; const r = await this.g.ui.guard(() => post('/api/room/say', { propertyId: this.propertyId, text: t })); if (r) { inp.value = ''; this.startPoll(); } }
  async kick(name) { const r = await this.g.ui.guard(() => post('/api/visit/kick', { propertyId: this.propertyId, username: name })); if (r) { this.g.ui.toast(`@${name} was asked to leave.`); this.startPoll(); } }
  paintPanel() {
    const pal = this.data.palette; if (!pal) return; const box = this.paint; if (!box.classList.contains('hidden')) return box.classList.add('hidden'); let wall = this.data.wall?.id, floor = this.data.floor?.id;
    const draw = () => { const sw = (list, cur, set) => h('div', { class: 'swatches' }, list.map(c => h('button', { class: `sw ${c.id === cur ? 'on' : ''}`, title: c.name, 'data-colour': c.id, style: `background:${c.hex}`, onclick: () => { set(c.id); draw(); } })));
      box.replaceChildren(h('div', { class: 'row sp' }, h('b', {}, '🎨 Paint and floor'), h('button', { class: 'btn small ghost', onclick: () => box.classList.add('hidden') }, '✕')), h('small', {}, 'Walls'), sw(pal.walls, wall, (v) => { wall = v; this.preview(wall, floor); }), h('small', {}, 'Floor'), sw(pal.floors, floor, (v) => { floor = v; this.preview(wall, floor); }),
        h('button', { class: 'btn alt', id: 'paintApply', onclick: async () => { const r = await this.g.ui.guard(() => post('/api/property/decor', { propertyId: this.propertyId, wall, floor, idemKey: crypto.randomUUID?.() })); if (r) { this.data.wall = r.wall; this.data.floor = r.floor; this.preview(r.wall.id, r.floor.id); this.g.ui.toast(r.charged ? `Fresh look! −${fmtN(r.charged)}` : 'Already looks like that.', 'money'); this.g.refreshMe(); box.classList.add('hidden'); } } }, `Apply · ${fmtN(pal.price)}`));
    }; draw(); box.classList.remove('hidden');
  }
  preview(w, f) { const pal = this.data.palette; const wc = pal.walls.find(c => c.id === w), fc = pal.floors.find(c => c.id === f); if (wc) this.wallMat.color.set(wc.hex); if (fc) this.floorMat.color.set(fc.hex); }
  toggleBuy(on = !this.buy) { this.buy = on; this.sel = null; this.ghost.visible = false; this.rebuildItems(); $('#buyToggle').textContent = on ? '✅ Done' : '🛋 Buy mode'; this.tool.classList.toggle('hidden', !on); if (on) this.drawTool(); }
  drawTool() {
    const sel = this.sel; const items = Object.values(this.catalog); const owned = new Set(this.placed.map(p => p.id));
    const kids = [];
    if (sel) { const def = this.catalog[sel.id]; kids.push(h('div', { class: 'row sp' }, h('b', {}, `${def.name} (${def.w}×${def.d})`), h('span', { class: 'mut' }, 'Tap the floor to place · R to rotate')), h('div', { class: 'row' }, h('button', { class: 'btn small', onclick: () => { this.rot = (this.rot + 1) % 4; this.drawTool(); } }, '⟳ Rotate'), sel.fromPlaced ? h('button', { class: 'btn small red', onclick: () => this.sell(sel.id) }, `Sell +${fmtN(Math.floor(def.price * (this.data.sellFraction || 0.5)))}`) : h('span', { class: 'tag amber' }, `Costs ${fmtN(def.price)}`), h('button', { class: 'btn small ghost', onclick: () => { this.sel = null; this.ghost.visible = false; this.rebuildItems(); this.drawTool(); } }, 'Cancel'))); }
    kids.push(h('div', { class: 'cat' }, items.map(i => h('button', { class: `${sel?.id === i.id ? 'on' : ''} ${owned.has(i.id) ? 'own' : ''}`, onclick: () => { const pl = this.placed.find(p => p.id === i.id); this.sel = { id: i.id, fromPlaced: !!pl }; this.rot = pl ? pl.rot : 0; this.rebuildItems(); this.drawTool(); } }, `${i.name}`, h('div', { class: 'mut' }, owned.has(i.id) ? 'placed · tap to move' : `${fmtN(i.price)} · ${i.w}×${i.d}`)))));
    this.tool.replaceChildren(...kids);
  }
  async place(x, z) {
    const s = this.sel; if (!s) return; if (!this.canPlace(s.id, x, z, this.rot)) { this.g.ui.toast(say('blocked'), 'bad'); return; }
    const r = await this.g.ui.guard(() => post('/api/property/furniture', { itemId: s.id, x, z, rot: this.rot, idem: crypto.randomUUID?.() || String(Math.random()) })); if (!r) return;
    this.g.update(r.user); this.placed = r.interior.placed; this.data = { ...this.data, ...r.interior, visitor: false }; this.g.ui.sfx('thunk'); this.g.ui.haptic(20); if (r.charged) this.g.ui.toast(say('bought', r.charged), 'money'); this.sel = null; this.ghost.visible = false; this.rebuildItems(); this.drawTool();
  }
  async sell(id) { const r = await this.g.ui.guard(() => post('/api/property/furniture/sell', { itemId: id })); if (!r) return; this.g.update(r.user); this.placed = r.interior.placed; this.sel = null; this.ghost.visible = false; this.rebuildItems(); this.g.ui.toast(say('sold', r.refund), 'money'); this.drawTool(); }
  cellAt(ev) {
    const rc = this.canvas.getBoundingClientRect(); const v = new THREE.Vector2(((ev.clientX - rc.left) / rc.width) * 2 - 1, -((ev.clientY - rc.top) / rc.height) * 2 + 1); const ray = new THREE.Raycaster(); ray.setFromCamera(v, this.cam);
    const t = -ray.ray.origin.y / ray.ray.direction.y; if (!(t > 0)) return null; const p = ray.ray.origin.clone().addScaledVector(ray.ray.direction, t); return { x: p.x / CELL, z: p.z / CELL };
  }
  updateGhost(ev) {
    if (!this.sel) return; const c = this.cellAt(ev); if (!c) return; const f = footprint(this.catalog[this.sel.id], this.rot); const x = Math.round(c.x - f.w / 2), z = Math.round(c.z - f.d / 2); this.hover = { x, z };
    const ok = this.canPlace(this.sel.id, x, z, this.rot); this.ghost.visible = true; this.ghost.scale.set(f.w * CELL - 0.1, 0.9, f.d * CELL - 0.1); this.ghost.position.set((x + f.w / 2) * CELL, 0.45, (z + f.d / 2) * CELL); this.ghost.material.color.setHex(ok ? 0x35c46b : 0xe0412f);
  }
  bindInput() {
    let drag = null; const cv = this.canvas;
    cv.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, y: e.clientY, moved: 0, id: e.pointerId }; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointermove', (e) => { if (drag && drag.id === e.pointerId) { const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy); if (!this.sel || drag.moved > 14) { this.yaw = Math.max(Math.PI / 4 - 0.8, Math.min(Math.PI / 4 + 0.8, this.yaw - dx * 0.006)); this.pitch = Math.max(0.5, Math.min(1.2, this.pitch + dy * 0.004)); } } if (this.buy) this.updateGhost(e); });
    cv.addEventListener('pointerup', (e) => { if (drag && drag.moved < 8 && this.buy) { if (this.sel) { this.updateGhost(e); if (this.hover) this.place(this.hover.x, this.hover.z); } else { const c = this.cellAt(e); if (c) { const hit = this.placed.find(p => { const f = footprint(this.catalog[p.id], p.rot); return c.x >= p.x && c.x < p.x + f.w && c.z >= p.z && c.z < p.z + f.d; }); if (hit) { this.sel = { id: hit.id, fromPlaced: true }; this.rot = hit.rot; this.rebuildItems(); this.drawTool(); } } } } drag = null; });
    cv.addEventListener('wheel', (e) => { this.dist = Math.max(6, Math.min(40, this.dist + e.deltaY * 0.02)); e.preventDefault(); }, { passive: false });
    this.onKey = (e) => { if (!this.open) return; const k = e.key.toLowerCase(); if (k === 'r' && this.sel) { this.rot = (this.rot + 1) % 4; this.drawTool(); } else if ((k === 'delete' || k === 'backspace') && this.sel?.fromPlaced) this.sell(this.sel.id); else if (k === 'escape') this.leave(); else if (k === 'b' && !this.visitor) this.toggleBuy(); };
    addEventListener('keydown', this.onKey);
  }
  resize() { const w = this.el.clientWidth, hh = this.el.clientHeight; this.r.setSize(w, hh, false); this.cam.aspect = w / hh; this.cam.updateProjectionMatrix(); }
  loop() { if (!this.open) return; const c = this.center; this.cam.position.set(c.x + Math.sin(this.yaw) * Math.cos(this.pitch) * this.dist, Math.sin(this.pitch) * this.dist, c.z + Math.cos(this.yaw) * Math.cos(this.pitch) * this.dist); this.cam.lookAt(c.x, 0.4, c.z); { const tt = (performance.now() - this.t0) / 1000; for (const f of this.anim || []) f(tt); } this.r.render(this.scene, this.cam); this.raf = requestAnimationFrame(() => this.loop()); }
  async leave() {
    if (!this.open) return; this.open = false; clearInterval(this.pt); cancelAnimationFrame(this.raf); removeEventListener('keydown', this.onKey); removeEventListener('resize', this.onResize); this.r.dispose(); this.el.classList.add('hidden'); this.el.replaceChildren(); this.g.busy = false; this.g.ctrl.frozen = false;
    await post('/api/property/leave').catch(() => {}); this.g.net.nudge(); $('#game').focus();
  }
}
