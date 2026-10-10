// Throwing a ball: hold G (or the ⚽ button) to charge, let go to throw. The SERVER fixes the start, rules and bonks; everyone draws the same flight from the same pure function (server/core/physx.js).
import * as THREE from 'three';
import { post, $, h } from './api.js';
import { PHYSX } from '../../server/config/physx.js';
import { throwStart, simulateThrow, sampleAt } from '../../server/core/physx.js';

export const CHARGE = { fullSec: 0.9, minPower: 0.3 }; // ESTIMATE: hold about a second for a full-power throw
export const powerFor = (heldSec) => Math.max(0, Math.min(1, CHARGE.minPower + (1 - CHARGE.minPower) * Math.min(1, heldSec / CHARGE.fullSec)));

export class ThrowClient {
  constructor(game) {
    this.g = game; this.balls = new Map(); this.since = 0; this.busy = false; this.geo = new THREE.SphereGeometry(PHYSX.throw.ballR, 10, 8); this.mat = new THREE.MeshLambertMaterial({ color: 0xffd23f });
    this.bar = h('div', { id: 'throwbar', class: 'pill hidden' }, h('i', {})); document.getElementById('hud')?.appendChild(this.bar); this.bind();
  }
  bind() {
    const down = () => { if (this.since || this.busy || !this.g.playing) return; this.since = performance.now(); this.bar.classList.remove('hidden'); };
    const up = () => { if (!this.since) return; const held = (performance.now() - this.since) / 1000; this.since = 0; this.bar.classList.add('hidden'); this.fire(powerFor(held)); };
    addEventListener('keydown', (e) => { if (e.repeat || e.target.closest?.('input,textarea,select') || e.key.toLowerCase() !== 'g') return; down(); });
    addEventListener('keyup', (e) => { if (e.key.toLowerCase() === 'g') up(); });
    addEventListener('blur', () => { this.since = 0; this.bar.classList.add('hidden'); });
    const b = document.getElementById('throwBtn'); if (b) { b.addEventListener('pointerdown', (e) => { down(); e.preventDefault(); }); b.addEventListener('pointerup', up); b.addEventListener('pointercancel', () => { this.since = 0; this.bar.classList.add('hidden'); }); }
  }
  async fire(power) {
    const g = this.g, c = g.ctrl; if (!g.playing || this.busy) return; if (c.mode === 'drive') return g.ui.toast?.('Park up first: no throwing from a car.'); if (c.frozen) return;
    this.busy = true; try { const r = await post('/api/throw', { x: c.x, z: c.z, yaw: c.ry, power }); this.add({ id: r.id, ...r.start }, 0); g.ui.toast?.(r.text); g.ui.sfx?.('step', 0.6); } catch (e) { g.ui.toast?.(e.message || 'Cannot throw now.'); } this.busy = false;
  }
  add(t, ageMs) { if (this.balls.has(t.id)) return; const start = { x: t.x, y: t.y, z: t.z, vx: t.vx, vy: t.vy, vz: t.vz }; const mesh = new THREE.Mesh(this.geo, this.mat); mesh.position.set(t.x, t.y, t.z); this.g.scene.add(mesh); this.balls.set(t.id, { mesh, samples: simulateThrow(start, PHYSX.throw, 0.05), t0: performance.now() - ageMs }); }
  /** heartbeat field th: the other players' balls in the air near you */
  ingest(list) { for (const t of list || []) this.add(t, t.age || 0); }
  update() {
    const now = performance.now(); const life = PHYSX.throw.visibleSec * 1000;
    for (const [id, b] of this.balls) { const age = now - b.t0; if (age > life) { this.g.scene.remove(b.mesh); this.balls.delete(id); continue; } const p = sampleAt(b.samples, age / 1000); b.mesh.position.set(p.x, p.y, p.z); }
    if (this.since) { const k = powerFor((now - this.since) / 1000); this.bar.firstChild.style.width = Math.round(k * 100) + '%'; }
  }
  /** heartbeat field bonk: someone's ball hit you. Harmless: a stagger and a note. */
  onBonk(b) { const c = this.g.ctrl; c.stun = Math.max(c.stun || 0, PHYSX.throw.bonkStaggerSec); c.shake = Math.max(c.shake, 0.25); this.g.ui.toast?.(`@${b.by} bonked you with a ball.`); }
}
