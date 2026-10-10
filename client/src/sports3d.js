// Sports hall 3D (client): the table tennis table, the tennis court, the lounge tables for the other games, and the stage that animates the athletes and the ball.
// Visual only. The server decides every score; this draws the rally log it sends (see sports-anim.js for the maths, docs/SPORTS_HALL.md for the design).
// Budget: props are merged geometry from props.js (cached, a few hundred triangles each); ALL athletes in the hall share ONE Crowd (7 draw calls); rackets and balls are tiny shared meshes.
import * as THREE from 'three';
import * as PR from './props.js';
import { Crowd, PEOPLE } from './people.js';
import { GEOM, beatFor, ballAt, strokePose, lungePose, cheerPose, slumpPose, idlePose, mixPose, READY, standAt, strike, yawOf, sideSign, ambientEvents, ease, lerp, clamp01 } from './sports-anim.js';

const W = 0xf4f4f0, STEEL = 0xb8bcc2, DARK = 0x4a2f1c;
// ---------------------------------------------------------------- props
export const pingPongTable = () => PR.build('pptable', 2.74, 1.53, {}, (b) => {
  b.box(2.74, 0.04, 1.53, 0, 0.72, 0, 0x1f5fa8, { noAO: true }); b.box(2.5, 0.04, 1.3, 0, 0.68, 0, 0x16457a, { noAO: true });
  for (const s of [-1, 1]) { b.box(2.74, 0.004, 0.02, 0, 0.76, s * 0.755, W, { jit: 0, noAO: true }); b.box(0.02, 0.004, 1.53, s * 1.36, 0.76, 0, W, { jit: 0, noAO: true }); }
  b.box(2.74, 0.004, 0.01, 0, 0.76, 0, W, { jit: 0, noAO: true });
  b.box(0.012, 0.13, 1.7, 0, 0.77, 0, 0x2a2d33, { noAO: true }); b.box(0.016, 0.014, 1.7, 0, 0.896, 0, W, { jit: 0, noAO: true }); for (const s of [-1, 1]) b.box(0.03, 0.16, 0.03, 0, 0.76, s * 0.86, STEEL, { noAO: true });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(0.07, 0.72, 0.07, sx * 1.2, 0, sz * 0.62, 0x2a2d33);
  b.box(2.3, 0.05, 0.05, 0, 0.35, 0, 0x2a2d33);
});
export const tennisCourt = () => PR.build('tcourt', 11.8, 7.0, {}, (b) => {
  b.box(11.8, 0.03, 7.0, 0, 0, 0, 0x2f6b4c, { noAO: true, jit: 0.01 }); b.box(10.4, 0.021, 5.4, 0, 0.03, 0, 0x3f8f6c, { noAO: true, jit: 0.01 });
  const L = (w, d, x, z) => b.box(w, 0.004, d, x, 0.051, z, W, { jit: 0, noAO: true });
  for (const s of [-1, 1]) { L(0.07, 5.07, s * 5.0, 0); L(10.07, 0.07, 0, s * 2.5); L(0.06, 5.0, s * 2.6, 0); } L(5.2, 0.06, 0, 0);
  b.box(0.02, 0.84, 5.4, 0, 0.054, 0, 0x2b2f36, { noAO: true }); b.box(0.04, 0.07, 5.4, 0, 0.9, 0, W, { jit: 0, noAO: true }); for (const s of [-1, 1]) b.cyl(0.04, 0.04, 1.0, 6, 0, 0.054, s * 2.8, STEEL, { noAO: true });
  b.box(0.5, 0.06, 0.5, 0, 1.15, 3.35, 0xd8d8d0); for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(0.05, 1.15, 0.05, sx * 0.2, 0, 3.35 + sz * 0.2, STEEL); b.box(0.5, 0.35, 0.04, 0, 1.2, 3.58, 0xd8d8d0);
});
const TOP = { whot: 0x8a5a2b, ludo: 0x7a4ea0, dominoes: 0x2a5f9e, draughts: 0x6b4226, ayo: 0x6b4226, football: 0x2e7d32, chess: 0x3a3a40, wordduel: 0xc8a23d, property: 0xb8322a, suwe: 0xe0a020 };
/** a lounge table: round table + two stools + a little scene on top that says which game it is. `soon` greys it out under a tarp. */
export const loungeTable = (game, soon) => {
  const g = new THREE.Group(); g.add(PR.gameTable(0.95, { c: soon ? 0x6b6f75 : (TOP[game] || 0x2e7d4a) }));
  for (const sx of [-1.25, 1.25]) { const s = PR.stool({ c: 0x8a3f28 }); s.position.set(sx, 0, 0); g.add(s); }
  g.add(PR.build('lounge', 1.9, 1.9, { game: soon ? 'soon' : game }, (b) => {
    const y = 0.86, c = (k) => b.box(0.34, 0.02, 0.24, -0.5 + k * 0.25, y + k * 0.004, 0.1, k % 2 ? 0xd6402f : W, { ry: 0.12 * k - 0.24, jit: 0, noAO: true });
    if (soon) { b.box(1.7, 0.05, 1.7, 0, y, 0, 0x8a8f96, { noAO: true }); for (const s of [-1, 1]) b.box(1.7, 0.02, 0.06, 0, y + 0.05, s * 0.5, 0xe0a020, { noAO: true }); return; }
    if (game === 'whot') for (let k = 0; k < 5; k++) c(k);
    else if (game === 'ludo') { b.box(1.4, 0.05, 1.4, 0, y, 0, 0xfaf5e6, { noAO: true }); [0xd6402f, 0x2e9b5e, 0xe0a020, 0x2e7dd1].forEach((col, k) => b.box(0.55, 0.02, 0.55, (k % 2 ? 1 : -1) * 0.42, y + 0.05, (k < 2 ? -1 : 1) * 0.42, col, { noAO: true })); }
    else if (game === 'dominoes') for (let k = 0; k < 4; k++) { b.box(0.34, 0.04, 0.17, -0.5 + k * 0.34, y, 0.05 * k - 0.1, 0x2b2b30, { ry: 0.3 * k, noAO: true }); b.box(0.02, 0.006, 0.15, -0.5 + k * 0.34, y + 0.04, 0.05 * k - 0.1, W, { ry: 0.3 * k, jit: 0, noAO: true }); }
    else if (game === 'draughts' || game === 'chess') { for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) b.box(0.3, 0.03, 0.3, -0.45 + i * 0.3, y, -0.45 + j * 0.3, (i + j) % 2 ? 0x2a2a2e : 0xe8dcc0, { noAO: true, jit: 0 }); for (let k = 0; k < 3; k++) b.cyl(0.08, 0.1, game === 'chess' ? 0.28 : 0.05, 8, -0.3 + k * 0.3, y + 0.03, -0.15 + (k % 2) * 0.3, k % 2 ? 0x1a1a1e : W, { noAO: true }); }
    else if (game === 'ayo') { b.box(1.5, 0.08, 0.6, 0, y, 0, 0x5a3418, { noAO: true }); for (let i = 0; i < 6; i++) for (const s of [-1, 1]) b.cyl(0.08, 0.06, 0.02, 8, -0.62 + i * 0.25, y + 0.08, s * 0.14, 0x2b180a, { noAO: true }); }
    else if (game === 'football') { b.box(1.6, 0.06, 1.0, 0, y, 0, 0x2e7d32, { noAO: true }); for (const x of [-0.5, 0, 0.5]) { b.box(0.03, 0.03, 1.2, x, y + 0.08, 0, STEEL, { noAO: true }); for (const z of [-0.25, 0.25]) b.box(0.09, 0.1, 0.09, x, y + 0.06, z, x < 0 ? 0xd6402f : 0x2e7dd1, { noAO: true }); } }
    else if (game === 'wordduel') for (let k = 0; k < 5; k++) { b.box(0.22, 0.05, 0.22, -0.55 + k * 0.27, y, 0, 0xf1e3b5, { noAO: true }); b.box(0.08, 0.008, 0.12, -0.55 + k * 0.27, y + 0.05, 0, 0x3a2a10, { jit: 0, noAO: true }); }
    else if (game === 'property') { b.box(1.5, 0.04, 1.5, 0, y, 0, 0xe9f0d8, { noAO: true }); for (const [sx, sz, col] of [[0, -1, 0xb8322a], [0, 1, 0x2e7dd1], [-1, 0, 0xe0a020], [1, 0, 0x2e9b5e]]) b.box(sx ? 0.2 : 1.5, 0.02, sz ? 0.2 : 1.5, sx * 0.65, y + 0.04, sz * 0.65, col, { noAO: true }); b.box(0.4, 0.05, 0.4, 0, y + 0.04, 0, 0xd8d0b0, { noAO: true }); }
    else if (game === 'suwe') { b.box(0.9, 0.012, 1.6, 0, y - 0.01, 0, 0xc8a56a, { noAO: true }); for (let k = 0; k < 6; k++) b.box(0.8, 0.008, 0.02, 0, y + 0.004, -0.7 + k * 0.28, W, { jit: 0, noAO: true }); b.box(0.02, 0.008, 1.6, -0.4, y + 0.004, 0, W, { jit: 0, noAO: true }); b.box(0.02, 0.008, 1.6, 0.4, y + 0.004, 0, W, { jit: 0, noAO: true }); }
  }));
  return g;
};
/** 3D model of a Sports Hall station; true when handled (so venue.js skips its own table). */
export function sportsModel(st, grp) {
  if (st.sport === 'pingpong') { grp.add(pingPongTable()); return true; }
  if (st.sport === 'tennis') { grp.add(tennisCourt()); return true; }
  if (st.type === 'game' && st.compact) { grp.add(loungeTable(st.game, !!st.soon)); return true; }
  return false;
}

// ---------------------------------------------------------------- athlete rig (the shared human shape with a poseable upper body)
const _U = new THREE.Matrix4(), _T = new THREE.Matrix4(), _R = new THREE.Matrix4(), _m = new THREE.Matrix4();
/** pose person i; P = pose parameters (see strokePose), walk = stride phase, run = how hard the legs swing 0..1. Writes the racket's matrix (in the crowd's frame) into rm. */
export function rigPose(cr, i, x, y, z, yaw, P, walk, run, rm) {
  const L = cr.look[i], PA = cr.parts, b = cr._base, S = L.scale;
  cr._q.setFromAxisAngle(cr._up, yaw); cr._p.set(x, y + (P.hop || 0), z); cr._s.set(S, S, S * L.wide); b.compose(cr._p, cr._q, cr._s);
  const leg = PEOPLE.legLen, hip = Math.max(0.5, leg - (P.crouch || 0)), sy = hip / leg, sw = (P.stride || 0) + Math.sin(walk) * 0.6 * run;
  const put = (im, mat) => { mat.premultiply(b); im.setMatrixAt(i, mat); };
  for (const [im, oz, s] of [[PA.legL, -0.11, sw], [PA.legR, 0.11, -sw]]) { _m.makeTranslation(0, hip, oz); _R.makeRotationZ(s); _m.multiply(_R); _R.makeScale(1, sy, 1); _m.multiply(_R); put(im, _m); }
  _U.makeTranslation(0, hip, 0); _R.makeRotationZ(P.lean || 0); _U.multiply(_R); _R.makeRotationY(P.twist || 0); _U.multiply(_R);
  const at = (im, ox, oy, oz, rz) => { _m.copy(_U); _T.makeTranslation(ox, oy, oz); _m.multiply(_T); if (rz) { _R.makeRotationZ(rz); _m.multiply(_R); } put(im, _m); };
  at(PA.torso, 0, 0, 0, 0); at(PA.armL, 0, 0.58, -0.36, P.armL ?? READY.armL); at(PA.armR, 0, 0.58, 0.36, P.armR ?? READY.armR); at(PA.head, 0.01, 0.62, 0, 0); at(PA.hair, L.capOn ? 0.06 : -0.01, 0.62 + 0.27, 0, 0);
  if (rm) { rm.copy(_U); _T.makeTranslation(0, 0.58, 0.36); rm.multiply(_T); _R.makeRotationZ(P.armR ?? READY.armR); rm.multiply(_R); _T.makeTranslation(0, -0.58, 0.02); rm.multiply(_T); _R.makeRotationZ(0.3); rm.multiply(_R); rm.premultiply(b); }
}

const shared = {};
const sharedGeo = () => shared.geo ||= {
  ball: new THREE.SphereGeometry(1, 10, 8), shadow: new THREE.CircleGeometry(1, 10).rotateX(-Math.PI / 2),
  handle: new THREE.BoxGeometry(0.03, 0.34, 0.03).translate(0, -0.17, 0), padHandle: new THREE.BoxGeometry(0.025, 0.1, 0.018).translate(0, -0.05, 0),
  pad: new THREE.CylinderGeometry(0.09, 0.09, 0.014, 14).rotateZ(Math.PI / 2).translate(0, -0.19, 0), ring: new THREE.RingGeometry(0.115, 0.15, 14).rotateY(Math.PI / 2).scale(1, 1.25, 1).translate(0, -0.52, 0), strings: new THREE.CircleGeometry(0.12, 14).rotateY(Math.PI / 2).scale(1, 1.25, 1).translate(0, -0.52, 0) };
const mats = {};
const mat = (k, f) => mats[k] ||= f();

/** the animated players, rackets, balls and name tags of every sport station in the open venue room. One Crowd for all athletes. */
export class SportsStage {
  constructor(scene, nameSprite, venue) {
    this.scene = scene; this.nameSprite = nameSprite; this.v = venue; this.fk = 0; if (venue) { venue.focus = null; venue.dist0 = null; venue.yaw0 = null; } /* a fresh room starts with a fresh camera */ this.root = new THREE.Group(); scene.add(this.root); this.slots = new Map(); this.SC = 0.9; this.last = null; this.cg = new THREE.Group(); this.cg.scale.setScalar(this.SC); this.root.add(this.cg); this.crowd = null; this.n = 0; this.t = 0;
  }
  /** call after the stations exist (and again when the venue data refreshes): `stations` = venue view stations */
  sync(stations) {
    const sp = stations.filter(s => s.sport && GEOM[s.sport]);
    if (!this.crowd && sp.length) { this.crowd = new Crowd(this.cg, sp.length * 2, 17); this.cg.children.forEach(c => { c.frustumCulled = false; }); }
    sp.forEach((st, k) => {
      let s = this.slots.get(st.id); const g = GEOM[st.sport];
      if (!s) { s = { id: st.id, sport: st.sport, g, ox: st.x, oz: st.z, ci: k * 2, queue: [], cur: null, lastI: -1, matchId: null, mine: false, names: [], tags: [null, null], ath: [0, 1].map(seat => { const p = standAt(g, seat); return { x: p.x, z: p.z, tx: p.x, tz: p.z, walk: 0, run: 0, pose: { ...READY }, show: false }; }), ball: this.makeBall(g), rackets: [this.makeRacket(g), this.makeRacket(g)], idleAt: 0 }; this.slots.set(st.id, s); }
      const m = st.match; const names = m ? m.players.slice(0, 2) : []; s.status = m ? m.status : null; s.you = !!m?.you;
      if (names.join('|') !== s.names.join('|')) { s.names = names; this.retag(s, m); }
      if (!m) { if (s.mine && (s.cur || s.queue.length)) s.endAfter = true; else this.clearSlot(s); }
      else { s.endAfter = false; s.ath.forEach((a, i) => { a.show = !!names[i] || (i === 0 && !!names[0]); }); if (m.status === 'waiting') s.ath[1].show = false; }
      s.watch = !!m && m.status === 'active' && !m.you;
    });
  }
  clearSlot(s) { s.queue.length = 0; s.cur = null; s.matchId = null; s.mine = false; s.endAfter = false; s.ath.forEach((a, i) => { a.show = false; const p = standAt(s.g, i); a.x = a.tx = p.x; a.z = a.tz = p.z; }); }
  makeBall(g) { const geo = sharedGeo(); const m = new THREE.Mesh(geo.ball, mat('ball' + g.id, () => new THREE.MeshBasicMaterial({ color: g.id === 'tennis' ? 0xd8f03a : 0xfff4e0 }))); m.scale.setScalar(g.ballR); m.visible = false; m.renderOrder = 5; const sh = new THREE.Mesh(geo.shadow, mat('sh', () => new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3, depthWrite: false }))); sh.visible = false; this.root.add(m, sh); return { m, sh }; }
  makeRacket(g) {
    const geo = sharedGeo(), r = new THREE.Group(), tt = g.id === 'tennis'; r.matrixAutoUpdate = false; r.visible = false;
    if (tt) { r.add(new THREE.Mesh(geo.handle, mat('rh', () => new THREE.MeshLambertMaterial({ color: 0x222226 }))), new THREE.Mesh(geo.ring, mat('rr', () => new THREE.MeshLambertMaterial({ color: 0xcf2f2f, side: THREE.DoubleSide }))), new THREE.Mesh(geo.strings, mat('rs', () => new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false })))); }
    else r.add(new THREE.Mesh(geo.padHandle, mat('ph', () => new THREE.MeshLambertMaterial({ color: 0x8a5a2b }))), new THREE.Mesh(geo.pad, mat('pp', () => new THREE.MeshLambertMaterial({ color: 0xc0392b }))));
    this.cg.add(r); return r;
  }
  retag(s, m) {
    s.tags.forEach((t, i) => { if (t) { this.root.remove(t); t.material.map?.dispose(); t.material.dispose(); s.tags[i] = null; } });
    s.names.forEach((n, i) => { const t = this.nameSprite('@' + n, '#ffffff'); t.scale.set(1.6, 0.4, 1); t.visible = false; this.root.add(t); s.tags[i] = t; });
  }
  /** my live match: feed the server's rally log. New events become beats; the first sight of a match never replays old events. */
  feed(stationId, v) {
    const s = this.slots.get(stationId); if (!s || !v?.board?.log) return; const log = v.board.log; const top = log.length ? log[log.length - 1].i : 0;
    if (s.matchId !== v.id) { s.matchId = v.id; s.lastI = top; s.mine = true; s.queue.length = 0; return; }
    s.mine = true; const fresh = log.filter(e => e.i > s.lastI); if (fresh.length) { s.lastI = top; s.queue.push(...fresh); if (s.queue.length > 12) s.queue.splice(0, s.queue.length - 8); } // a long backlog (a very fast clicker, a tab that slept) skips ahead
    s.paceOf = (shot) => (v.board.shots?.find(x => x.id === shot) || v.board.serves?.find(x => x.id === shot))?.pace ?? 0.5;
  }
  paceFn(s) { return (shot, serve) => { const f = s.paceOf?.(shot); return f ?? ({ push: 0.25, drive: 0.55, loop: 0.78, lob: 0.3, smash: 0.95, flat: 0.72, topspin: 0.6, slice: 0.4, drop: 0.2, kick: 0.42, short: 0.2, long: 0.5, spin: 0.68 }[shot] ?? 0.5); }; }
  startBeat(s, now) {
    let ev = s.queue.shift(); if (!ev) return false;
    const stands = s.ath.map(a => ({ x: a.tx, z: a.tz })); const b = beatFor(ev, { sport: s.sport, stands, pace: this.paceFn(s) });
    if (s.queue.length > 6) b.dur = Math.round(b.dur * 0.45); b.t0 = now; s.cur = b;
    if (b.type === 'flight') { const r = s.ath[b.receiver]; r.tx = b.coverStand.x; r.tz = b.coverStand.z; }
    if (b.type === 'cheer') s.ath.forEach((a, i) => { const p = standAt(s.g, i); a.tx = p.x; a.tz = p.z; });
    return true;
  }
  tick(tSec) {
    const dt = this.last == null ? 0.016 : Math.min(0.1, Math.max(0, tSec - this.last)); this.last = tSec; this.t = tSec; if (!this.crowd) return; const now = tSec * 1000; const cr = this.crowd;
    for (const s of this.slots.values()) {
      const g = s.g;
      // 1. beat bookkeeping
      if (s.cur && now >= s.cur.t0 + s.cur.dur) { const b = s.cur; if (b.type === 'flight') { const r = s.ath[b.receiver]; if (b.returned) { r.tx = b.goalStand.x; r.tz = b.goalStand.z; } } s.cur = null; s.idleAt = now; }
      if (!s.cur && s.queue.length) this.startBeat(s, now);
      if (s.endAfter && !s.cur && !s.queue.length) { this.clearSlot(s); }
      if (!s.cur && s.watch && !s.queue.length && now > s.idleAt + 900) { const n = 2 + ((Math.random() * 5) | 0); s.queue.push(...ambientEvents(s.sport, n, Math.random, Math.random() < 0.5 ? 0 : 1)); }
      if (!s.watch && !s.mine && s.queue.length) s.queue.length = 0;
      const b = s.cur, u = b ? clamp01((now - b.t0) / b.dur) : 0;
      // 2. athlete targets and poses
      s.ath.forEach((a, i) => {
        let pose = idlePose(tSec, i * 1.7 + s.ci), slide = 7;
        if (b?.type === 'swing' && b.seat === i) pose = strokePose(s.sport, b.shot, b.serve, u);
        else if (b?.type === 'error' && b.seat === i) pose = strokePose(s.sport, b.serve ? 'flat' : 'drive', b.serve, Math.min(1, u / 0.45));
        else if (b?.type === 'flight' && b.receiver === i) { const k = ease((u - 0.3) / 0.6); if (u > 0.3 && b.returned) { a.tx = b.goalStand.x; a.tz = b.goalStand.z; } else if (u > 0.3) { a.tx = lerp(b.coverStand.x, b.goalStand.x, 0.55); a.tz = lerp(b.coverStand.z, b.goalStand.z, 0.55); } pose = mixPose(idlePose(tSec, i), lungePose(b.stretch, s.sport), k); slide = 9; }
        else if (b?.type === 'flight' && b.hitter === i) pose = mixPose(strokePose(s.sport, b.shot, b.serve, 1), idlePose(tSec, i), ease(u / 0.5));
        else if (b?.type === 'cheer') { pose = b.winner === i ? cheerPose(u) : slumpPose(); slide = 2.5; }
        const k1 = 1 - Math.exp(-dt * slide); const px = a.x, pz = a.z; a.x += (a.tx - a.x) * k1; a.z += (a.tz - a.z) * k1; const sp = Math.hypot(a.x - px, a.z - pz) / Math.max(dt, 1e-3);
        a.run += (Math.min(1, sp / 2.2) - a.run) * Math.min(1, dt * 10); a.walk += dt * (6 + sp * 2.5); a.pose = pose;
      });
      // 3. draw athletes, rackets, tags
      const fy = s.g.id === 'tennis' ? g.floor : 0; const SC = this.SC;
      s.ath.forEach((a, i) => {
        const idx = s.ci + i, rk = s.rackets[i], tg = s.tags[i];
        if (!a.show) { cr.pose(idx, 0, -60, 0, 0, 0, 0); rk.visible = false; if (tg) tg.visible = false; return; }
        rigPose(cr, idx, (s.ox + a.x) / SC, fy / SC, (s.oz + a.z) / SC, yawOf(i), a.pose, a.walk, a.run, rk.matrix); rk.matrixWorldNeedsUpdate = true; rk.visible = true; if (tg) { tg.visible = true; tg.position.set(s.ox + a.x, 2.05, s.oz + a.z); }
      });
      // 4. the ball
      let p = null; const held = (seat) => { const a = s.ath[seat]; const st = strike(g, seat, { x: a.x, z: a.z }); return { x: st.x, y: st.y, z: st.z }; };
      if (b?.type === 'swing') { if (b.serve) { if (u < 0.55) { const h = held(b.seat); p = { x: h.x, y: h.y + 0.5 * Math.sin(Math.min(1, u / 0.45) * Math.PI * 0.5) + 0.1, z: h.z - (b.seat === 0 ? 0.15 : -0.15) }; } } else if (u < 0.5) p = held(b.seat); }
      else if (b?.type === 'flight' || b?.type === 'error') { const uu = b.type === 'error' ? clamp01((u - 0.35) / 0.65) : u; if (b.type === 'error' && u < 0.35) p = held(b.seat); else p = ballAt(b.path, uu); }
      const bl = s.ball; if (p) { bl.m.visible = true; bl.m.position.set(s.ox + p.x, p.y, s.oz + p.z); bl.sh.visible = true; bl.sh.position.set(s.ox + p.x, g.floor + 0.01, s.oz + p.z); const hh = Math.max(0.1, 1 - (p.y - g.floor) * 0.35); bl.sh.scale.setScalar(g.ballR * 1.6 * hh); } else { bl.m.visible = false; bl.sh.visible = false; }
    }
    cr.commit(); this.frame(dt);
  }
  /** while you play, glide the venue camera to your court and slide the picture clear of the match panel (left on a wide screen, bottom on a phone) */
  frame(dt) {
    const v = this.v; if (!v?.cam || !v.el) return; const mine = [...this.slots.values()].find(s => s.mine && s.ath.some(a => a.show)); const k1 = 1 - Math.exp(-dt * 3.5);
    const home = { x: 0, y: 0.6, z: 0.3 }; if (mine && v.dist0 == null) { v.dist0 = v.dist; v.yaw0 = v.yaw; } const want = mine ? { x: mine.ox, y: 0.5, z: mine.oz, d: mine.sport === 'tennis' ? 18 : 10.5 } : { ...home, d: v.dist0 ?? v.dist };
    const f = v.focus ||= { ...home }; f.x += (want.x - f.x) * k1; f.y += (want.y - f.y) * k1; f.z += (want.z - f.z) * k1; v.dist += (want.d - v.dist) * k1; v.yaw += ((mine ? 0.1 : (v.yaw0 ?? v.yaw)) - v.yaw) * k1; if (!mine && v.dist0 != null && Math.abs(v.dist - v.dist0) < 0.05) { v.dist = v.dist0; v.dist0 = null; v.yaw = v.yaw0 ?? v.yaw; }
    this.fk += ((mine ? 1 : 0) - this.fk) * k1; const W = v.el.clientWidth || 1, H = v.el.clientHeight || 1;
    if (this.fk < 0.01) { if (v.cam.view?.enabled) { v.cam.clearViewOffset(); v.cam.updateProjectionMatrix(); } return; }
    const wide = W >= 640; const x = wide ? -244 * this.fk : 0; const y = wide ? 0 : Math.max(0, H / 2 - Math.max(120, (H - (0.58 * H + 84))) / 2 - 20) * this.fk; v.cam.setViewOffset(W, H, x, y, W, H);
  }
  dispose() { this.scene.remove(this.root); this.slots.clear(); }
}
