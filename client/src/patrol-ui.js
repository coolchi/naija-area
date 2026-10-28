// Police patrol: duty desk sheet, mission HUD (suspects left, timer, distance), 3D/minimap suspect markers, arrest + shoot buttons, end screen.
// The server decides everything (positions, range, hits, credit, pay). Non-graphic: a downed suspect just falls over and fades out.
import * as THREE from 'three';
import { get, post, fmtN, h } from './api.js';
import { makeNameSprite } from './entities.js';

const idem = () => crypto.randomUUID?.() || String(Date.now() + Math.random());
const mmss = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

export async function patrolSheet(g, venueId) {
  const ui = g.ui; const d = await ui.guard(() => get('/api/patrol')); if (!d) return;
  const L = d.limits; const kids = [
    h('p', {}, `Take a duty Charger, answer dispatch calls and stop ${d.needed} robbers or offenders before time runs out (${Math.round(d.timeLimitMs / 60000)} min).`),
    h('p', {}, h('b', {}, `Pay: ${fmtN(d.pay)} per completed patrol.`), ` ${L.leftToday} of ${L.maxPerDay} patrols left today.`),
    h('p', { class: 'mut' }, d.guns ? `Weapon: ${d.weapon?.name}. Some suspects are armed and shoot back. If you get knocked out the patrol fails.` : 'Arrest-only patrol: drive up close and cuff them.'),
    h('p', { class: 'mut' }, 'Suspects are shared: if another officer catches one first, it is theirs. Game money only (ESTIMATE).')
  ];
  if (d.active) kids.push(h('button', { class: 'btn', onclick: async () => { const r = await ui.guard(() => post('/api/patrol/abandon', {})); if (r) { ui.toast(r.text); g.patrol?.set(null); ui.closeSheet(); g.net?.nudge(); } } }, 'End patrol (no pay)'));
  else kids.push(h('button', { class: 'btn alt', disabled: !!L.readyAt || L.leftToday <= 0, onclick: async () => {
    const r = await ui.guard(() => post('/api/patrol/start', { venueId })); if (!r) return;
    ui.closeSheet(); await g.venue?.leave?.(); if (r.user) g.update(r.user);
    g.ctrl.mode = 'drive'; g.ctrl.applyMode(); g.ctrl.camYaw = g.ctrl.ry; ui.toast(`🚓 ${r.text}`); ui.sfx?.('horn'); g.patrol?.set(r.patrol); g.net?.nudge();
  } }, L.readyAt ? `Next patrol in ${Math.ceil((L.readyAt - Date.now()) / 60000)} min` : L.leftToday <= 0 ? 'Done for today' : 'Go on patrol'));
  ui.openSheet('Duty desk', kids);
}

export class PatrolClient {
  constructor(g) {
    this.g = g; this.view = null; this.marks = new Map(); this.radioSeen = new Set();
    this.el = h('div', { id: 'patrolHud', style: 'position:fixed;top:64px;left:50%;transform:translateX(-50%);z-index:30;background:rgba(10,20,40,.88);color:#fff;padding:8px 12px;border-radius:12px;font:14px system-ui;display:none;min-width:260px;text-align:center;border:2px solid #c0392b' });
    document.body.appendChild(this.el);
  }
  set(v) {
    const was = this.view?.active; this.view = v?.active ? v : null; if (!this.view) { this.clear(); this.el.style.display = 'none'; if (was) this.g.refreshMe?.(); return; }
    for (const s of v.suspects || []) if (!this.radioSeen.has(s.id)) { this.radioSeen.add(s.id); this.g.ui.toast(`📻 Dispatch: ${s.radio}`); }
    this.sync(); this.draw();
  }
  onHeartbeat(p) { if (p) this.set(p); else if (this.view) { this.set(null); } }
  onPush(m) {
    if (m.type === 'patrol.caught' && this.view) { this.g.ui.toast(`Suspect already caught by @${m.by}.`); this.fall(m.suspectId); }
    if (m.type === 'patrol.hit') this.g.ui.toast(`💥 You took fire! Health ${Math.round(m.health)}.`, 'bad');
  }
  clear() { for (const k of [...this.marks.keys()]) this.drop(k); }
  drop(id) { const m = this.marks.get(id); if (m) { this.g.scene.remove(m); this.marks.delete(id); } }
  fall(id) { const m = this.marks.get(id); if (!m) return; m.userData.fall = performance.now(); this.marks.delete(id); const t0 = m.userData.fall; const step = () => { const k = Math.min(1, (performance.now() - t0) / 700); m.rotation.z = k * Math.PI / 2; m.position.y = -k; if (k < 1) requestAnimationFrame(step); else this.g.scene.remove(m); }; step(); }
  sync() {
    const live = new Set((this.view.suspects || []).map(s => s.id));
    for (const id of [...this.marks.keys()]) if (!live.has(id)) this.fall(id);
    for (const s of this.view.suspects || []) {
      let m = this.marks.get(s.id);
      if (!m) {
        m = new THREE.Group(); const col = s.armed ? 0xc0392b : 0xf39c12;
        const ring = new THREE.Mesh(new THREE.RingGeometry(1.6, 2.2, 24).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide })); ring.position.y = 0.3; m.add(ring);
        const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 1.0, 4, 8), new THREE.MeshLambertMaterial({ color: s.armed ? 0x222222 : 0x6b4f2a })); body.position.y = 1; m.add(body);
        const tag = makeNameSprite(`${s.armed ? '🔫 ' : ''}${s.label}`, s.armed ? '#c0392b' : '#b9770e'); tag.scale.set(5, 1.25, 1); tag.position.y = 3.2; m.add(tag);
        this.g.scene.add(m); this.marks.set(s.id, m);
      }
      m.position.set(s.x, 0, s.z);
    }
  }
  nearest() { const c = this.g.ctrl; let best = null; for (const s of this.view?.suspects || []) { const d = Math.hypot(s.x - c.x, s.z - c.z); if (!best || d < best.d) best = { ...s, d }; } return best; }
  draw() {
    const v = this.view; if (!v) return; const a = v.active; const n = this.nearest();
    if (n) this.g.setWaypoint?.(n.x, n.z, n.label);
    this.el.style.display = 'block'; this.el.replaceChildren(
      h('div', {}, h('b', {}, '🚓 PATROL '), `${a.arrests}/${a.needed} stopped · ⏱ ${mmss(a.expiresAt - this.g.serverNow())}${v.guns ? ` · 🔫 ${a.ammo}` : ''}`),
      n ? h('div', { style: 'margin:4px 0' }, `${n.armed ? '⚠️ Armed ' : ''}${n.label} · ${Math.round(n.d)} m · ${'●'.repeat(n.hits)}`) : h('div', {}, 'Waiting on dispatch…'),
      h('div', { style: 'display:flex;gap:6px;justify-content:center' },
        n ? h('button', { class: 'btn small', onclick: () => this.act('arrest', n) }, '🔗 Arrest') : '',
        n && v.guns ? h('button', { class: 'btn small alt', onclick: () => this.act('shoot', n) }, '🔫 Shoot') : '',
        h('button', { class: 'btn small', onclick: async () => { const r = await this.g.ui.guard(() => post('/api/patrol/abandon', {})); if (r) { this.g.ui.toast(r.text); this.set(null); } } }, 'End'))
    );
  }
  async act(kind, n) {
    const r = await this.g.ui.guard(() => post(`/api/patrol/${kind}`, { suspectId: n.id, idem: idem() })); if (!r) { this.g.net?.nudge(); return; }
    if (r.text) this.g.ui.toast(r.text, r.paid ? 'money' : undefined);
    if (r.suspectId) this.fall(r.suspectId);
    if (r.done) this.end(r); else this.set(r.patrol);
    if (r.user) this.g.update(r.user);
  }
  end(r) { this.set(null); this.g.ui.openSheet('Patrol complete', [h('p', {}, h('b', {}, `You earned ${fmtN(r.paid)}.`)), h('p', { class: 'mut' }, 'The duty Charger is back at the station. Rest small before your next patrol.')]); }
  /** minimap dots: called by ui.minimap with its own transform */
  mm(c, X, Z) { for (const s of this.view?.suspects || []) { c.fillStyle = s.armed ? '#e74c3c' : '#f39c12'; c.beginPath(); c.arc(X(s.x), Z(s.z), 5, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 1.5; c.stroke(); } }
}
