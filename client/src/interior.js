// Interior room: iso cut-away, owner Buy mode (grid snap, rotate, sell, "Something is in the way"), visitor read-only view.
import * as THREE from 'three';
import { get, post, fmtN, h, $ } from './api.js';
import { say } from './ui.js';
import { houseShell } from './rooms.js';
import { makeAvatar, addSkinGlow, poseAvatar } from './entities.js';
import { applyWear } from './wear-models.js';
import * as PR from './props.js';

const CELL = 1.4; const COLORS = { tv: 0x222831, sofa: 0xb5543a, fridge: 0xe8eef2, rug: 0xd9a441, plant: 0x2f9e5a, table: 0x9c6b3c, gen: 0xc0392b, solar: 0x1e3a5f, bed: 0x4a6fa5 };
const footprint = (def, rot) => (rot % 2 ? { w: def.d, d: def.w } : { w: def.w, d: def.d });
const overlap = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.z < b.z + b.d && b.z < a.z + a.d;

export class Interior {
  constructor(game) { this.g = game; this.el = $('#interior'); this.open = false; }
  async show(propertyId, asVisitor) {
    const g = this.g; const data = await get(`/api/property/${propertyId}/interior`).catch(e => { g.ui.error(e); return null; }); if (!data) return false;
    this.data = data; this.propertyId = propertyId; this.visitor = !!data.visitor; this.catalog = Object.fromEntries((data.catalog || g.cfg.furniture || []).map(f => [f.id, f])); this.placed = data.placed.map(p => ({ ...p })); this.buy = false; this.sel = null; this.rot = 0; this.keys = new Set(); this.look = 0; this.walkYaw = Math.PI; this.open = true; g.busy = true; g.ctrl.frozen = true;
    this.el.classList.remove('hidden'); this.el.replaceChildren(); this.build(); this.chrome(); this.loop(); return true;
  }
  build() {
    const d = this.data; const W = d.room.w, D = d.room.d; this.canvas = h('canvas'); this.el.append(this.canvas);
    this.r = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true }); this.r.setPixelRatio(Math.min(devicePixelRatio, 2)); this.scene = new THREE.Scene(); this.scene.background = new THREE.Color(0x1d2b25);
    this.cam = new THREE.PerspectiveCamera(48, 1, 0.1, 200); this.yaw = Math.PI / 4; this.pitch = 0.78; this.dist = Math.max(W, D) * CELL * 1.9; this.center = new THREE.Vector3(W * CELL / 2, 0, D * CELL / 2);
    this.hemi = new THREE.HemisphereLight(0xffffff, 0x887766, 1.0); this.sun = new THREE.DirectionalLight(0xfff0d0, 1.1); this.sun.position.set(6, 12, 4); this.scene.add(this.hemi, this.sun);
    const floor = new THREE.Mesh(new THREE.BoxGeometry(W * CELL, 0.2, D * CELL), this.floorMat = new THREE.MeshLambertMaterial({ color: d.floor?.hex || '#b98a56', map: (/wood|plank|parquet/i.test(d.floor?.id || '') ? PR.surfaces().planks : PR.surfaces().tile)(W * CELL / 1.6, D * CELL / 1.6) })); floor.position.set(W * CELL / 2, -0.1, D * CELL / 2); this.scene.add(floor);
    const grid = new THREE.GridHelper(Math.max(W, D) * CELL, Math.max(W, D), 0x8c7a55, 0xa89870); grid.scale.set(W / Math.max(W, D), 1, D / Math.max(W, D)); grid.position.set(W * CELL / 2, 0.01, D * CELL / 2); this.grid = grid; grid.visible = false; this.scene.add(grid);
    const wallM = this.wallMat = new THREE.MeshLambertMaterial({ color: d.wall?.hex || '#f1e7cf', map: PR.surfaces().stucco(W * CELL / 2.4, 1.4) }); const back = new THREE.Mesh(new THREE.BoxGeometry(W * CELL, 3.4, 0.2), wallM); back.position.set(W * CELL / 2, 1.7, -0.1); const left = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.4, D * CELL), wallM); left.position.set(-0.1, 1.7, D * CELL / 2); this.scene.add(back, left);
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(W * CELL, 0.5, 0.22), new THREE.MeshLambertMaterial({ color: 0x008751 })); stripe.position.set(W * CELL / 2, 0.25, -0.1); this.scene.add(stripe);
    this.anim = []; this.t0 = performance.now(); houseShell(this.scene, d.room, CELL, this.anim, d.wall?.hex);
    for (const r of d.room.reserved.filter(r => r.what === 'doorway')) { const m = new THREE.Mesh(new THREE.BoxGeometry(r.w * CELL - 0.1, r.what === 'bed' ? 0.7 : 0.02, r.d * CELL - 0.1), new THREE.MeshLambertMaterial({ color: r.what === 'bed' ? COLORS.bed : 0xe2d9bf, transparent: r.what !== 'bed', opacity: r.what === 'bed' ? 1 : 0.6 })); m.position.set((r.x + r.w / 2) * CELL, r.what === 'bed' ? 0.35 : 0.02, (r.z + r.d / 2) * CELL); this.scene.add(m); if (r.what === 'bed') { const pil = new THREE.Mesh(new THREE.BoxGeometry(r.w * CELL - 0.4, 0.2, 0.5), new THREE.MeshLambertMaterial({ color: 0xffffff })); pil.position.set((r.x + r.w / 2) * CELL, 0.8, (r.z + 0.4) * CELL); this.scene.add(pil); } }
    const door = d.room.reserved.find(r => r.what === 'doorway'); const dm = new THREE.Mesh(new THREE.BoxGeometry(door.w * CELL, 0.04, 0.12), new THREE.MeshBasicMaterial({ color: 0xffc20e })); dm.position.set((door.x + door.w / 2) * CELL, 0.05, D * CELL); this.scene.add(dm);
    this.items = new THREE.Group(); this.scene.add(this.items); this.ghost = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x35c46b, transparent: true, opacity: 0.55 })); this.ghost.visible = false; this.scene.add(this.ghost);
    this.px = (door.x + door.w / 2) * CELL; this.pz = (D - 0.65) * CELL; this.phase = 0;
    const ctrl = this.g.ctrl, user = this.g.user || {}, sk = ctrl?.skinLooks || {};
    const gender = ctrl?.gender === 'female' || user.gender === 'female' ? 'female' : 'male';
    const avatar = makeAvatar(sk.avatar?.color || ctrl?.color || user.color || '#2e9b5e', gender, { body: sk.avatar?.body || '' });
    if (sk.avatar?.glow) addSkinGlow(avatar, sk.avatar.glow, 1.1);
    if (!avatar.userData?.hd && this.g.wearCat) applyWear(avatar, (user.wear?.worn || []).map(x => x.id), this.g.wearCat);
    this.avatar = avatar; this.walker = new THREE.Group(); this.walker.add(avatar);
    this.walker.position.set(this.px, 0, this.pz); this.walker.rotation.y = Math.PI / 2; this.scene.add(this.walker);
    this.rebuildItems(); this.bindInput(); this.resize(); this.onResize = () => this.resize(); addEventListener('resize', this.onResize);
  }
  meshFor(id, rot) {
    // detailed props (client/src/props.js), built for the rot-0 footprint and turned; all shapes come from shared cached geometry
    const def = this.catalog[id]; const grp = new THREE.Group(); let p;
    if (!def) { const hgt = 1; p = new THREE.Mesh(new THREE.BoxGeometry(CELL * 0.8, hgt, CELL * 0.8), new THREE.MeshLambertMaterial({ color: COLORS[id] || 0x999999 })); p.position.y = hgt / 2; }
    else {
      const w = def.w * CELL - 0.15, d = def.d * CELL - 0.15;
      if (id === 'tv') p = PR.tvUnit(Math.min(w, 1.9)); else if (id === 'sofa') p = PR.sofa(w, Math.min(d, 1.0), { c: 0x1f6f7a, cushion: 0xf2b705 }); else if (id === 'fridge') p = PR.fridge(Math.min(w, 0.85), Math.min(d, 0.8), 1.95);
      else if (id === 'rug') p = PR.rug(w, d); else if (id === 'plant') p = PR.plant({ h: 1.15 }); else if (id === 'table') p = PR.diningSet(w, d); else if (id === 'gen') p = PR.generator(Math.min(w, 1.0), Math.min(d, 0.85));
      else if (id === 'solar') p = PR.solarInverter(Math.min(w, 0.95), Math.min(d, 0.7));
      else { const hgt = 1; p = new THREE.Mesh(new THREE.BoxGeometry(w, hgt, d), new THREE.MeshLambertMaterial({ color: COLORS[id] || 0x999999 })); p.position.y = hgt / 2; }
    }
    const c = new THREE.Group(); c.add(p); c.rotation.y = rot * Math.PI / 2; grp.add(c); return grp;
  }
  rebuildItems() { this.items.clear(); this.meshes = {}; for (const p of this.placed) { if (this.sel && this.sel.id === p.id && this.sel.fromPlaced) continue; this.addItem(p); } }
  addItem(p) {
    const def = this.catalog[p.id] || { w: 1, d: 1, layer: 'object' }; const f = footprint(def, p.rot || 0);
    const m = this.meshFor(p.id, p.rot || 0); m.position.set(((p.x ?? 0) + f.w / 2) * CELL, 0, ((p.z ?? 0) + f.d / 2) * CELL); m.userData = { id: p.id }; this.items.add(m); this.meshes[p.id] = m;
  }
  canPlace(id, x, z, rot) {
    const d = this.data, def = this.catalog[id], f = footprint(def, rot), r = { x, z, w: f.w, d: f.d };
    if (x < 0 || z < 0 || x + f.w > d.room.w || z + f.d > d.room.d) return false; for (const rs of d.room.reserved) if (overlap(r, rs)) return false;
    for (const o of this.placed) { if (o.id === id) continue; const od = this.catalog[o.id]; if ((od.layer === 'floor') === (def.layer === 'floor')) { const of = footprint(od, o.rot); if (overlap(r, { x: o.x, z: o.z, w: of.w, d: of.d })) return false; } } return true;
  }
  chrome() {
    const d = this.data; const ui = this.g.ui; this.guestsEl = h('div', { class: 'iguests' }); this.feed = h('div', { class: 'ifeed' }); this.lastEvent = 0; this.placedKey = JSON.stringify(this.placed);
    const head = h('div', { class: 'ihead' }, h('div', {}, h('h3', {}, this.visitor ? `@${d.owner}'s ${d.name}` : d.name), h('div', { style: 'font-size:13px' }, `${d.tierLabel} · ${d.area} · WASD to walk · ❤️ `, h('span', { id: 'loveCount' }, d.loves || 0)), this.guestsEl),
      h('div', { class: 'row' }, this.visitor ? '' : h('button', { class: 'btn small', id: 'paintBtn', onclick: () => this.paintPanel() }, '🎨 Paint'), this.visitor ? '' : h('button', { class: 'btn small alt', id: 'buyToggle', onclick: () => this.toggleBuy() }, '🛋 Buy mode'), h('button', { class: 'btn small red', id: 'interiorLeave', onclick: () => this.leave() }, 'Leave')));
    this.tool = h('div', { class: 'itool hidden' });
    this.powerEl = h('div', { class: 'ipower hidden' });
    const acts = h('div', { class: 'iacts' }, ...(this.visitor ? [['love', '😍 Love your house'], ['greet', '👋 Greet'], ['hype', '🔥 Hype'], ['sofa', '🛋 Sofa'], ['tv', '📺 TV']] : [['greet', '👋 Greet'], ['sofa', '🛋 Sofa'], ['tv', '📺 TV']]).map(([k, l]) => h('button', { class: 'btn small ghost', 'data-act': k, onclick: () => this.act(k) }, l)));
    const say = h('input', { class: 'sheet-input', id: 'roomSay', maxlength: 120, placeholder: 'Say something nice…', onkeydown: (e) => { if (e.key === 'Enter') this.say(say); e.stopPropagation(); } });
    this.bar = h('div', { class: 'ibar' }, this.feed, acts, h('div', { class: 'row' }, say, h('button', { class: 'btn small', onclick: () => this.say(say) }, 'Send')));
    this.paint = h('div', { class: 'ipaint hidden' }); this.el.append(head, this.powerEl, this.tool, this.paint, this.bar); void ui; this.applyPower(d.power); this.startPoll();
  }
  applyPower(power) {
    const dark = !!power?.dark; this.power = power || { dark: false };
    this.el.classList.toggle('nepa-dark', dark);
    if (this.hemi) this.hemi.intensity = dark ? 0.03 : 1.0;
    if (this.sun) { this.sun.intensity = dark ? 0.01 : 1.1; this.sun.color.setHex(dark ? 0x334455 : 0xfff0d0); }
    this.scene?.traverse(o => {
      if (o.isPointLight || o.isSpotLight || o.isDirectionalLight) {
        if (o === this.sun) return;
        if (o.userData.baseIntensity == null) o.userData.baseIntensity = o.intensity || 0.5;
        o.intensity = dark ? 0 : o.userData.baseIntensity;
      }
      if (o.isMesh && o.material && !o.userData._nepaMat) {
        // leave materials alone; darkness comes from lights + overlay
      }
    });
    this.scene.background = new THREE.Color(dark ? 0x020305 : 0x1d2b25);
    if (dark) {
      if (!this._nepaFog) this._nepaFog = new THREE.FogExp2(0x020305, 0.09);
      this.scene.fog = this._nepaFog;
    } else {
      this.scene.fog = null; this._nepaFog = null;
    }
    if (!this.powerEl) return;
    if (!dark) { this.powerEl.classList.add('hidden'); this.powerEl.replaceChildren(); return; }
    this.powerEl.classList.remove('hidden');
    const kids = [h('b', {}, '⚡ NEPA took the light'), h('span', { class: 'mut' }, 'Without a generator or solar, light can stay off for 1–3 hours')];
    if (power.canRestore && !this.visitor) kids.push(h('button', { class: 'btn small alt', onclick: () => this.restorePower() }, 'Restore with gen / solar'));
    else if (!power.hasBackup && !this.visitor) kids.push(h('span', {}, 'Buy a generator or solar inverter in Buy mode'));
    else kids.push(h('span', {}, 'Waiting for the host to restore power…'));
    this.powerEl.replaceChildren(...kids);
  }
  async restorePower() {
    const r = await this.g.ui.guard(() => post('/api/property/power/restore', { propertyId: this.propertyId })); if (!r) return;
    this.applyPower(r); this.g.ui.toast('Light back on 💡'); this.startPoll();
  }
  startPoll() { clearInterval(this.pt); const tick = async () => { if (!this.open) return; const r = await get(`/api/room?propertyId=${this.propertyId}&since=${this.lastEvent}`).catch(e => e); if (r instanceof Error) { if (r.status === 403 && this.visitor) { this.g.ui.toast('The host asked you to step out. No wahala.'); this.leave(); } return; } this.room = r; this.drawRoom(r); }; tick(); this.pt = setInterval(tick, 2500); }
  drawRoom(r) {
    $('#loveCount') && ($('#loveCount').textContent = r.loves); this.guestsEl.replaceChildren(h('small', {}, r.isOwner ? (r.guests.length ? 'Guests: ' : 'No guests right now') : `Host ${r.ownerHome ? '🟢 home' : '⚪ out'} · guests: `), ...r.guests.map(n => h('span', { class: 'gchip' }, '@' + n, r.isOwner ? h('button', { title: 'Ask to leave', onclick: () => this.kick(n) }, '✕') : h('button', { title: 'Mute or report', onclick: () => this.g.ui.playerMenu(n) }, '⋯'))));
    if (!r.isOwner) { const lb = this.el.querySelector('[data-act=love]'); if (lb) lb.disabled = r.lovedToday; } const sb = this.el.querySelector('[data-act=sofa]'), tb = this.el.querySelector('[data-act=tv]'); if (sb) sb.disabled = !r.can.sofa; if (tb) tb.disabled = !r.can.tv;
    if (r.wall.hex !== this.data.wall?.hex || r.floor.hex !== this.data.floor?.hex) { this.data.wall = r.wall; this.data.floor = r.floor; this.wallMat.color.set(r.wall.hex); this.floorMat.color.set(r.floor.hex); }
    if (r.power) this.applyPower(r.power);
    if (Array.isArray(r.placed)) { const key = JSON.stringify(r.placed); if (key !== this.placedKey) { this.placedKey = key; this.placed = r.placed.map(p => ({ ...p })); this.rebuildItems(); if (this.buy) this.drawTool(); } }
    for (const e of r.events) { if (e.id <= this.lastEvent) continue; this.lastEvent = e.id; const line = h('div', { class: `ev ${e.kind}`, onclick: () => e.kind === 'say' && e.u !== this.g.user.username && this.g.ui.playerMenu(e.u) }, e.kind === 'say' ? `${e.u}: ${e.t}` : e.t); this.feed.append(line); while (this.feed.children.length > 6) this.feed.firstChild.remove(); }
  }
  async act(k) {
    const ui = this.g.ui;
    if (k === 'love') { const r = await ui.guard(() => post('/api/visit/love', { propertyId: this.propertyId })); if (r) { ui.toast('You showed some love 😍'); this.g.refreshMe(); } }
    else {
      const r = await ui.guard(() => post('/api/visit/act', { propertyId: this.propertyId, action: k })); if (!r) return;
      if (k === 'greet') {
        const guests = this.room?.guests || [];
        ui.toast(guests.length || (!this.visitor && this.room?.owner && this.room.owner !== this.g.user?.username) ? 'You greeted everyone in the room 👋' : this.visitor ? `You greeted @${this.data.owner} 👋` : 'Nobody else here yet — guests will see your greet');
      }
      this.g.refreshMe();
    }
    this.startPoll();
  }
  async say(inp) { const t = inp.value.trim(); if (!t) return; const r = await this.g.ui.guard(() => post('/api/room/say', { propertyId: this.propertyId, text: t })); if (r) { inp.value = ''; this.startPoll(); } }
  async kick(name) { const r = await this.g.ui.guard(() => post('/api/visit/kick', { propertyId: this.propertyId, username: name })); if (r) { this.g.ui.toast(`@${name} was asked to leave.`); this.startPoll(); } }
  paintPanel() {
    const pal = this.data.palette; if (!pal) return; const box = this.paint; if (!box.classList.contains('hidden')) return box.classList.add('hidden'); let wall = this.data.wall?.id, floor = this.data.floor?.id;
    const draw = () => { const sw = (list, cur, set) => h('div', { class: 'swatches' }, list.map(c => h('button', { class: `sw ${c.id === cur ? 'on' : ''}`, title: c.name, 'data-colour': c.id, style: `background:${c.hex}`, onclick: () => { set(c.id); draw(); } })));
      box.replaceChildren(h('div', { class: 'row sp' }, h('b', {}, '🎨 Paint and floor'), h('button', { class: 'btn small ghost', onclick: () => box.classList.add('hidden') }, '✕')), h('small', {}, 'Walls'), sw(pal.walls, wall, (v) => { wall = v; this.preview(wall, floor); }), h('small', {}, 'Floor'), sw(pal.floors, floor, (v) => { floor = v; this.preview(wall, floor); }),
        h('button', { class: 'btn alt', id: 'paintApply', onclick: async () => { const r = await this.g.ui.guard(() => post('/api/property/decor', { propertyId: this.propertyId, wall, floor, idemKey: crypto.randomUUID?.() })); if (r) { this.data.wall = r.wall; this.data.floor = r.floor; this.preview(r.wall.id, r.floor.id); this.g.ui.toast(r.charged ? `Fresh look! −${fmtN(r.charged)}` : 'Already looks like that.', 'money'); this.g.refreshMe(); box.classList.add('hidden'); } } }, `Apply · ${fmtN(pal.price)}`));
    }; draw(); box.classList.remove('hidden');
  }
  preview(w, f) { const pal = this.data.palette; const wc = pal.walls.find(c => c.id === w), fc = pal.floors.find(c => c.id === f); if (wc) { this.wallMat.color.set(wc.hex); this.scene.traverse(o => { if (o.material?.userData?.houseWall) o.material.color.set(wc.hex); }); } if (fc) this.floorMat.color.set(fc.hex); }
  toggleBuy(on = !this.buy) {
    this.buy = on; this.sel = null; this.ghost.visible = false; this.rebuildItems();
    $('#buyToggle').textContent = on ? '✅ Done' : '🛋 Buy mode';
    this.tool.classList.toggle('hidden', !on);
    // hide greet/chat bar so it never covers the furniture catalogue
    this.bar?.classList.toggle('hidden', on);
    if (this.grid) this.grid.visible = on; if (on) this.drawTool();
  }
  drawTool() {
    const sel = this.sel; const items = Object.values(this.catalog); const owned = new Set(this.placed.map(p => p.id));
    const kids = [];
    if (sel) { const def = this.catalog[sel.id]; kids.push(h('div', { class: 'row sp' }, h('b', {}, `${def.icon || ''} ${def.name} (${def.w}×${def.d})`), h('span', { class: 'mut' }, 'Tap the floor to place · R to rotate')), h('div', { class: 'row' }, h('button', { class: 'btn small', onclick: () => { this.rot = (this.rot + 1) % 4; this.drawTool(); } }, '⟳ Rotate'), sel.fromPlaced ? h('button', { class: 'btn small red', onclick: () => this.sell(sel.id) }, `Sell +${fmtN(Math.floor(def.price * (this.data.sellFraction || 0.5)))}`) : h('span', { class: 'tag amber' }, `Costs ${fmtN(def.price)}`), h('button', { class: 'btn small ghost', onclick: () => { this.sel = null; this.ghost.visible = false; this.rebuildItems(); this.drawTool(); } }, 'Cancel'))); }
    kids.push(h('div', { class: 'cat' }, items.map(i => h('button', { class: `${sel?.id === i.id ? 'on' : ''} ${owned.has(i.id) ? 'own' : ''}`, onclick: () => { const pl = this.placed.find(p => p.id === i.id); this.sel = { id: i.id, fromPlaced: !!pl }; this.rot = pl ? pl.rot : 0; this.rebuildItems(); this.drawTool(); } },
      h('div', { class: 'caticon', 'aria-hidden': 'true' }, i.icon || '📦'), h('div', { class: 'catname' }, i.name), h('div', { class: 'mut' }, owned.has(i.id) ? 'placed · tap to move' : `${fmtN(i.price)} · ${i.w}×${i.d}`)))));
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
    cv.addEventListener('pointermove', (e) => { if (drag && drag.id === e.pointerId) { const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy); if (!this.sel || drag.moved > 14) { if (this.buy) { this.yaw = Math.max(Math.PI / 4 - 0.8, Math.min(Math.PI / 4 + 0.8, this.yaw - dx * 0.006)); this.pitch = Math.max(0.5, Math.min(1.2, this.pitch + dy * 0.004)); } else this.look = Math.max(-1.2, Math.min(1.2, this.look - dx * 0.006)); } } if (this.buy) this.updateGhost(e); });
    cv.addEventListener('pointerup', (e) => { if (drag && drag.moved < 8 && this.buy) { if (this.sel) { this.updateGhost(e); if (this.hover) this.place(this.hover.x, this.hover.z); } else { const c = this.cellAt(e); if (c) { const hit = this.placed.find(p => { const f = footprint(this.catalog[p.id], p.rot); return c.x >= p.x && c.x < p.x + f.w && c.z >= p.z && c.z < p.z + f.d; }); if (hit) { this.sel = { id: hit.id, fromPlaced: true }; this.rot = hit.rot; this.rebuildItems(); this.drawTool(); } } } } drag = null; });
    cv.addEventListener('wheel', (e) => { this.dist = Math.max(6, Math.min(40, this.dist + e.deltaY * 0.02)); e.preventDefault(); }, { passive: false });
    this.onKey = (e) => { if (!this.open) return; const typing = e.target?.closest?.('input,textarea'); const k = e.key.toLowerCase(); if (!typing && ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) { this.keys.add(k); e.preventDefault(); return; } if (typing) return; if (k === 'r' && this.sel) { this.rot = (this.rot + 1) % 4; this.drawTool(); } else if ((k === 'delete' || k === 'backspace') && this.sel?.fromPlaced) this.sell(this.sel.id); else if (k === 'escape') this.leave(); else if (k === 'b' && !this.visitor) this.toggleBuy(); };
    this.onKeyUp = (e) => { this.keys?.delete(e.key.toLowerCase()); };
    addEventListener('keydown', this.onKey); addEventListener('keyup', this.onKeyUp);
  }
  blocked(nx, nz) {
    const d = this.data, r = 0.34, W = d.room.w * CELL, D = d.room.d * CELL;
    if (nx < r || nz < r || nx > W - r || nz > D - 0.2) return true;
    const cx = nx / CELL, cz = nz / CELL, cr = r / CELL;
    for (const rs of d.room.reserved) {
      if (rs.what === 'doorway') continue;
      // walls are one cell thick for furniture, but walk through the door gap with a thin hit box
      const pad = rs.what === 'wall' ? Math.min(cr, 0.12) : cr;
      if (cx > rs.x - pad && cx < rs.x + rs.w + pad && cz > rs.z - pad && cz < rs.z + rs.d + pad) return true;
    }
    return false;
  }
  stepWalk(dt) {
    const k = this.keys; let ix = 0, iz = 0;
    if (k.has('w') || k.has('arrowup')) iz -= 1; if (k.has('s') || k.has('arrowdown')) iz += 1; if (k.has('a') || k.has('arrowleft')) ix -= 1; if (k.has('d') || k.has('arrowright')) ix += 1;
    let moving = false;
    if (ix || iz) {
      const len = Math.hypot(ix, iz), yaw = this.walkYaw + (this.look || 0);
      // strafe uses the camera's right, so the right arrow moves to the right of the screen
      const dx = (Math.sin(yaw) * -iz - Math.cos(yaw) * ix) / len, dz = (Math.cos(yaw) * -iz + Math.sin(yaw) * ix) / len, sp = 3.6 * dt;
      const nx = this.px + dx * sp, nz = this.pz + dz * sp;
      if (!this.blocked(nx, this.pz)) this.px = nx; if (!this.blocked(this.px, nz)) this.pz = nz;
      this.walker.rotation.y = Math.atan2(-dz, dx); moving = true;
    }
    this.phase = (this.phase || 0) + (moving ? dt * 2.4 : 0); poseAvatar(this.avatar, this.phase, moving ? 1.6 : 0, dt);
    this.walker.position.set(this.px, 0, this.pz);
    const yaw = this.walkYaw + (this.look || 0); let back = 12.8; const bx = -Math.sin(yaw), bz = -Math.cos(yaw);
    // only pull in for the outer shell — interior walls must not shove the camera into the character's face
    const W = this.data.room.w * CELL, D = this.data.room.d * CELL;
    for (let dist = 0.6; dist <= back; dist += 0.3) {
      const cx = this.px + bx * dist, cz = this.pz + bz * dist;
      if (cx < 0.2 || cz < 0.2 || cx > W - 0.2 || cz > D - 0.2) { back = Math.max(8.5, dist - 0.35); break; }
    }
    this.cam.position.set(this.px + bx * back, 4.2 + Math.min(1.6, back * 0.1), this.pz + bz * back); this.cam.lookAt(this.px, 1.05, this.pz);
  }
  resize() { const w = this.el.clientWidth, hh = this.el.clientHeight; this.r.setSize(w, hh, false); this.cam.aspect = w / hh; this.cam.updateProjectionMatrix(); }
  loop() { if (!this.open) return; const now = performance.now(); const dt = Math.min(0.05, (now - (this.last || now)) / 1000); this.last = now; if (this.buy) { const c = this.center; this.cam.position.set(c.x + Math.sin(this.yaw) * Math.cos(this.pitch) * this.dist, Math.sin(this.pitch) * this.dist, c.z + Math.cos(this.yaw) * Math.cos(this.pitch) * this.dist); this.cam.lookAt(c.x, 0.4, c.z); } else this.stepWalk(dt); { const tt = (now - this.t0) / 1000; for (const f of this.anim || []) f(tt); } this.r.render(this.scene, this.cam); this.raf = requestAnimationFrame(() => this.loop()); }
  async leave() {
    if (!this.open) return; this.open = false; clearInterval(this.pt); cancelAnimationFrame(this.raf); removeEventListener('keydown', this.onKey); removeEventListener('keyup', this.onKeyUp); removeEventListener('resize', this.onResize); this.r.dispose(); this.el.classList.add('hidden'); this.el.replaceChildren(); this.g.busy = false; this.g.ctrl.frozen = false;
    await post('/api/property/leave').catch(() => {}); this.g.net.nudge(); $('#game').focus();
  }
}
