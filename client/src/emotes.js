// Emotes: emoji bubbles and short dance/gesture animations. Pure pose maths here (tested without a browser); the sheet and the 3D hooks are at the bottom.
// The animation list, labels and durations come from the server (`/api/config` -> emotes, config in server/config/emotes.js), so the client never invents an emote id.
import * as THREE from 'three';
import { post, h } from './api.js';

const TAU = Math.PI * 2;
/** pose for an animation at time t (ms since it began). Returns offsets for the avatar body (merged mesh): y (m), rx/rz tilt (rad), ry spin (rad), sy squash. Every value is bounded; `done` after ms. */
export function emotePose(anim, t, ms = 6000) {
  const P = { y: 0, rx: 0, rz: 0, ry: 0, sy: 1 }; if (!anim || t < 0 || t > ms) return P; const s = t / 1000; const fade = Math.min(1, t / 250, (ms - t) / 250); // ease in and out
  switch (anim) {
    case 'wave': P.rz = Math.sin(s * 9) * 0.22 * fade; P.y = Math.abs(Math.sin(s * 4.5)) * 0.05 * fade; break;
    case 'clap': P.sy = 1 - Math.abs(Math.sin(s * 10)) * 0.06 * fade; P.y = Math.abs(Math.sin(s * 10)) * 0.03 * fade; break;
    case 'dance': P.y = Math.abs(Math.sin(s * 6)) * 0.14 * fade; P.rz = Math.sin(s * 3) * 0.28 * fade; P.rx = Math.sin(s * 6) * 0.08 * fade; P.ry = Math.sin(s * 1.5) * 0.5 * fade; break;
    case 'spin': P.ry = ((s * 0.8) % 1) * TAU; P.y = Math.abs(Math.sin(s * 0.8 * Math.PI)) * 0.08; break; // one turn every 1.25 s, so a duration that is a multiple of 1250 ms ends facing the front
    case 'jump': P.y = Math.abs(Math.sin(s * 5)) * 0.55 * fade; P.sy = 1 + Math.cos(s * 10) * 0.03 * fade; break;
    case 'bow': P.rx = Math.sin(Math.min(1, t / 700) * Math.PI) * 0.7 * (t < 1400 ? 1 : 0); break;
    default: break; // emoji emotes have a bubble and no body animation
  }
  return P;
}
/** how many ms the bubble/animation lasts: from the server's list, never longer than the cap the server also enforces */
export const durationOf = (list, id) => list.find(e => e.id === id)?.ms || 0;

/** apply a pose to a merged avatar mesh group (`obj.userData.body` is the mesh). Safe to call every frame; pass the zero pose to reset. */
export function applyPose(obj, pose, base = { y: 0, rx: 0, rz: 0 }) {
  const b = obj?.userData?.body; if (!b) return; b.position.y = base.y + pose.y; b.rotation.x = base.rx + pose.rx; b.rotation.z = base.rz + pose.rz; obj.rotation.y = pose.ry; b.scale.y = pose.sy;
}

/** the emote sheet: a grid of the server's list. Tapping plays it on you at once and tells the server so nearby players see it. */
export async function emoteSheet(g) {
  const list = g.cfg.emotes || []; if (!list.length) { g.ui.toast('Emotes are not available right now.', 'bad'); return; }
  const go = async (e) => { g.ui.closeSheet(); await g.emotes.play(e.id); };
  g.ui.openSheet('Emotes', [h('p', { class: 'mut' }, 'Tap one. Nearby players see it for a few seconds. Walking stops a dance.'),
    h('div', { class: 'emote-grid' }, list.map(e => h('button', { class: 'emote', 'data-emote': e.id, title: e.label, onclick: () => go(e) }, h('span', { class: 'eico' }, e.icon), h('small', {}, e.label))))]);
}

const ZERO = { y: 0, rx: 0, rz: 0, ry: 0, sy: 1 };
function bubbleTexture(icon) {
  const c = document.createElement('canvas'); c.width = 96; c.height = 96; const g = c.getContext('2d'); g.fillStyle = 'rgba(255,255,255,.94)'; g.beginPath(); g.roundRect(6, 4, 84, 72, 22); g.fill(); g.beginPath(); g.moveTo(40, 74); g.lineTo(48, 92); g.lineTo(58, 74); g.fill();
  g.font = '44px system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(icon, 48, 42); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
/** draws emotes on any avatar holder ({ root, obj }): an emoji bubble over the head and, for dances, the body pose. One instance serves your own avatar and every other player's. */
export class EmoteView {
  constructor(list, now = () => performance.now()) { this.list = new Map(list.map(e => [e.id, e])); this.now = now; this.cache = new Map(); }
  tex(icon) { let t = this.cache.get(icon); if (!t) { t = bubbleTexture(icon); this.cache.set(icon, t); } return t; }
  clear(holder) { const s = holder._em; if (s?.bubble) { holder.root.remove(s.bubble); s.bubble.material.dispose?.(); s.bubble = null; } if (s?.posed) { applyPose(holder.obj, ZERO, s.base || undefined); s.posed = false; } }
  /** call every frame. id: the emote that should be showing ('' for none). moving: a dance stops while walking. base: the body's resting values this frame. Returns true while something is showing. */
  step(holder, id, moving = false, base = undefined, bubbleY = 3.6) {
    const s = (holder._em ||= { id: '', t0: 0, bubble: null, posed: false, base: null }); const t = this.now();
    if (id !== s.id) { this.clear(holder); s.id = id; s.t0 = t; }
    const e = id ? this.list.get(id) : null; if (!e || t - s.t0 > e.ms) { if (s.bubble || s.posed) this.clear(holder); return false; }
    const icon = e.kind === 'dance' ? e.bubble : e.icon;
    if (s.bubble && s.bubble.parent !== holder.root) s.bubble = null; // the avatar was rebuilt (walk <-> car): the old bubble went with it
    if (icon && !s.bubble) { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.tex(icon), depthTest: false, transparent: true })); sp.scale.set(1.5, 1.5, 1); sp.renderOrder = 11; sp.position.set(0, bubbleY + 1.1, 0); holder.root.add(sp); s.bubble = sp; }
    if (s.bubble) { const k = Math.min(1, (t - s.t0) / 180); s.bubble.scale.setScalar(1.5 * (0.6 + 0.4 * k) * (1 + Math.sin((t - s.t0) / 220) * 0.04)); }
    if (e.kind === 'dance' && e.anim && !moving) { s.base = base || { y: 0, rx: 0, rz: 0 }; applyPose(holder.obj, emotePose(e.anim, t - s.t0, e.ms), s.base); s.posed = true; } else if (s.posed) { applyPose(holder.obj, ZERO, s.base || undefined); s.posed = false; }
    return true;
  }
}
/** the player's own emotes: play one (it shows on you at once and goes to the server for everyone else), cancel it when you start moving */
export class EmoteSystem {
  constructor(g) { this.g = g; this.mine = ''; this.t0 = 0; this.view = new EmoteView(g.cfg.emotes || []); this.holder = null; }
  async play(id) {
    const g = this.g; const e = (g.cfg.emotes || []).find(x => x.id === id); if (!e) return;
    try { await post('/api/emote', { id }); } catch (err) { g.ui.toast(err.message, 'bad'); return; }
    this.mine = id; this.until = performance.now() + e.ms; g.audio?.play('pop');
  }
  /** per frame from the render loop: draws your own emote on your avatar */
  frame() {
    const c = this.g.ctrl; if (!c?.root || !c.avatar) return; if (!this.holder || this.holder.root !== c.root || this.holder.obj !== c.avatar) this.holder = { root: c.root, obj: c.avatar }; // the avatar is rebuilt when a skin changes or on walk<->car: follow it if (this.mine && performance.now() > this.until) this.mine = '';
    const b = c.avatar.userData.body; const moving = c.moving || c.mode === 'drive'; if (moving && this.mine && (this.view.list.get(this.mine)?.kind === 'dance')) this.mine = ''; // walking away ends a dance
    this.view.step(this.holder, this.mine, moving, b ? { y: b.position.y, rx: b.rotation.x, rz: b.rotation.z } : undefined, c.mode === 'drive' ? 4.2 : 3.6);
  }
}
