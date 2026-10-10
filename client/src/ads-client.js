// Renders scheduled creatives on the 3D boards (rotating every rotationMs) and collects *measurement evidence*
// (on-screen %, continuous visible ms) for the server to validate. The client never sends counts.
import * as THREE from 'three';
import { houseAd, creativeTexture } from './textures.js';
import { rotIndex } from '../../server/core/adslots.js';
import { AssetCache, ASSET_CFG } from './assetcache.js';

const V = new THREE.Vector3();
export class AdsClient {
  constructor(world, city, serverNowMs) {
    this.world = world; this.city = city; this.now = serverNowMs; this.rot = 10000; this.slots = {}; this.cache = new AssetCache((id, ok, fail) => this.fetchImg(id, ok, fail), (id, rec) => this.release(id, rec)); this.lastSched = 0; this.users = new Map(); this.evidence = []; this.houseTex = new Map();
    this.state = {}; this.lastKey = {}; this.maxDist = 90; this.radioEvery = undefined;
  }
  setSnapshot(ads) {
    if (!ads) return; this.slots = ads.slots || {}; this.rot = ads.rotationMs || 10000; this.users = new Map(); // creative id -> board ids that show it (images load on demand: see assetcache.js)
    for (const [bid, list] of Object.entries(this.slots)) for (const a of list) { if (!this.users.has(a.i)) this.users.set(a.i, new Set()); this.users.get(a.i).add(bid); }
  }
  fetchImg(id, ok, fail) { const img = new Image(); img.onload = () => { this.lastKey = {}; ok({ img, tex: {} }, (img.naturalWidth || 1024) * (img.naturalHeight || 512) * 4 + ASSET_CFG.textureBytes); }; img.onerror = fail; img.src = window.__naMedia ? window.__naMedia(id) : `/media/creative/${id}`; }
  /** free a creative that fell out of the cache; boards showing it go back to the house ad until it is needed again */
  release(id, rec) { try { rec.tex.t?.dispose?.(); rec.img.onload = rec.img.onerror = null; rec.img.src = ''; } catch { /* ignore */ } for (const bid of this.users.get(id) || []) { const b = this.world.boards[bid]; if (b && b.shownKey) { b.mat.map = this.house(bid, b.def.w, b.def.h); b.mat.needsUpdate = true; b.shownKey = null; this.lastKey[bid] = undefined; } } }
  /** which creatives are worth having now: those on boards near the player, current and next rotation window */
  schedule(player, win) {
    const near = new Map(); const dmin = (id) => { let d = Infinity; for (const bid of this.users.get(id) || []) { const b = this.world.boards[bid]; if (b) d = Math.min(d, Math.hypot(b.def.x - player.x, b.def.z - player.z)); } return d; };
    for (const [bid, list] of Object.entries(this.slots)) { const b = this.world.boards[bid]; if (!b || !list.length) continue; const d = Math.hypot(b.def.x - player.x, b.def.z - player.z); if (d > ASSET_CFG.loadRadius) continue; for (const a of [list[win % list.length], list[(win + 1) % list.length]]) near.set(a.i, Math.min(near.get(a.i) ?? Infinity, d)); }
    for (const [id, d] of near) this.cache.request(id, d); this.cache.tick(dmin);
  }
  house(id, w, h) { let t = this.houseTex.get(id); if (!t) { const d = this.world.boards[id].def; t = houseAd(w >= h * 1.5 ? 1024 : 768, w >= h * 1.5 ? 512 : 768, d.surface === 'lagoon_plot' ? 'Lagoon plot' : d.surface === 'airport_board' ? 'Airport board' : d.surface === 'shop_front' ? 'Shop sign' : 'Road billboard', 'Rent this board at /advertise', id.charCodeAt(id.length - 1)); this.houseTex.set(id, t); } return t; }
  /** which ad is on this board right now (deterministic from server time, same rule the server uses to validate) */
  currentFor(id, win) { const list = this.slots[id]; if (!list || !list.length) return null; return list[rotIndex(id, win, this.rot, this.radioEvery) % list.length]; }
  update(cam, size, player, dtMs) {
    const t = this.now(); const win = Math.floor(t / this.rot); if (performance.now() - this.lastSched > 400) { this.lastSched = performance.now(); this.schedule(player, win); }
    for (const [id, b] of Object.entries(this.world.boards)) {
      const d = b.def; const dx = d.x - player.x, dz = d.z - player.z; const dist = Math.hypot(dx, dz);
      const cur = this.currentFor(id, win); const key = cur ? `c${cur.c}` : 'house';
      if (b.shownKey !== key || this.lastKey[id] !== key) {
        const rec = cur && this.cache.get(cur.i);
        if (cur && rec) { const tx = rec.tex[win % 1] || (rec.tex.t = rec.tex.t || creativeTexture(rec.img, d.surface === 'lagoon_plot' ? 768 : 1024, d.surface === 'lagoon_plot' ? 768 : 512, cur.b)); b.mat.map = tx; b.mat.color.set(0xffffff); b.mat.needsUpdate = true; b.shownKey = key; this.lastKey[id] = key; }
        else if (!cur) { b.mat.map = this.house(id, d.w, d.h); b.mat.needsUpdate = true; b.shownKey = key; this.lastKey[id] = key; }
        else if (!b.mat.map) { b.mat.map = this.house(id, d.w, d.h); b.mat.needsUpdate = true; }
      }
      // ---- evidence (only boards near the player showing a paid creative)
      const st = (this.state[id] ||= { win, camp: null, cont: 0, best: 0, pctSum: 0, pctN: 0 });
      if (st.win !== win) { this.flush(id, st); st.win = win; st.camp = cur ? cur.c : null; st.cont = 0; st.best = 0; st.pctSum = 0; st.pctN = 0; }
      st.camp = cur ? cur.c : null;
      if (!cur || !this.cache.get(cur.i) || dist > this.maxDist + 30 || document.hidden) { st.cont = 0; continue; } // an ad counts as viewable only once its image is actually loaded
      const pct = this.visiblePct(cam, size, b);
      if (pct >= 50) { st.cont += dtMs; st.best = Math.max(st.best, st.cont); st.pctSum += pct; st.pctN++; } else st.cont = 0;
    }
  }
  flush(id, st) {
    if (!st.camp || st.best < 300) return;
    if (this.evidence.length < 120) this.evidence.push({ slot: id, win: st.win, c: st.camp, pct: Math.round(st.pctSum / Math.max(1, st.pctN)), ms: Math.round(Math.min(st.best, this.rot)), vis: true });
  }
  take() { const e = this.evidence; this.evidence = []; return e; }
  visiblePct(cam, size, b) {
    const d = b.def; const cx = d.x, cy = d.y, cz = d.z; const toCam = cam.position;
    if ((toCam.x - cx) * d.nx + (toCam.z - cz) * d.nz <= 0) return 0;                     // back of the board
    // occlusion by buildings (2D segment vs AABB, with height check)
    for (const c of this.world.colliders) {
      if (c.h < 2) continue; if (cx >= c.x0 && cx <= c.x1 && cz >= c.z0 && cz <= c.z1) continue; /* the building the sign hangs on (its padded box contains the sign) never hides its own sign: the back-of-board test above covers viewing from behind */ const tt = segBox(toCam.x, toCam.z, cx, cz, c); if (tt === null) continue; const y = toCam.y + (cy - toCam.y) * tt; if (y < c.h) return 0;
    }
    const rx = d.nz, rz = -d.nx; let minX = 9, maxX = -9, minY = 9, maxY = -9;
    for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      V.set(cx + rx * sx * d.w / 2, cy + sy * d.h / 2, cz + rz * sx * d.w / 2); const cs = V.clone().applyMatrix4(cam.matrixWorldInverse); if (cs.z > -0.1) return 0;
      V.project(cam); minX = Math.min(minX, V.x); maxX = Math.max(maxX, V.x); minY = Math.min(minY, V.y); maxY = Math.max(maxY, V.y);
    }
    const hPx = ((maxY - minY) / 2) * size.h; if (hPx < 22) return 0;                    // too small to read
    const full = (maxX - minX) * (maxY - minY); const vx = Math.max(0, Math.min(1, maxX) - Math.max(-1, minX)), vy = Math.max(0, Math.min(1, maxY) - Math.max(-1, minY));
    return full > 0 ? (100 * vx * vy) / full : 0;
  }
  nearest(px, pz, max = 40) { let best = null, bd = max; for (const [id, b] of Object.entries(this.world.boards)) { const dd = Math.hypot(b.def.x - px, b.def.z - pz); if (dd < bd) { bd = dd; best = id; } } return best; }
}
function segBox(x0, z0, x1, z1, c) { // Liang-Barsky; returns entry t in [0,1] or null
  let t0 = 0, t1 = 1; const dx = x1 - x0, dz = z1 - z0;
  for (const [p, q] of [[-dx, x0 - c.x0], [dx, c.x1 - x0], [-dz, z0 - c.z0], [dz, c.z1 - z0]]) {
    if (p === 0) { if (q < 0) return null; } else { const r = q / p; if (p < 0) { if (r > t1) return null; if (r > t0) t0 = r; } else { if (r < t0) return null; if (r < t1) t1 = r; } }
  }
  return t0 > 0.02 && t0 < 0.98 ? t0 : null;
}
