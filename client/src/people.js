// Shared human shape for every NON-player person (street walkers, queues, club dancers, passengers...). One InstancedMesh per body part,
// shared low-poly geometry, per-instance colours, limbs swing through instance matrices. Cheap for phones: 7 draw calls for any number of people.
// Local frame: forward is +x, up is +y, shoulders along z (same as the player avatar).
import * as THREE from 'three';
export const PEOPLE = { shirts: [0x008751, 0xffc20e, 0xffffff, 0xd84315, 0x1e88e5, 0xad1457, 0x6a1b9a, 0x37474f, 0xf9a825, 0x2e7d32, 0xe0e0e0], trousers: [0x2c3e66, 0x1f2328, 0x4a3b2a, 0x5b6770, 0x3a4a2f, 0x6b4a3a, 0x222a44], skins: [0x8d5524, 0xc68642, 0x6b4226, 0x4a2c17, 0xa0693a, 0x7a4a2a], hair: [0x111111, 0x1a1208, 0x2a1a10, 0x3a2a18, 0x111111, 0xc0a060], caps: [0xd84315, 0x1e88e5, 0x2e7d32, 0xffc20e, 0xffffff],
  // geometry (metres, before the per-person height scale). Hip height 0.85.
  legLen: 0.82, swing: 0.55, armSwing: 0.5 };
const part = (w, h, d, ox, oy, oz) => new THREE.BoxGeometry(w, h, d).translate(ox, oy, oz);
export class Crowd {
  /** count people; opts.lowDetailDist: beyond this many metres from `viewer` limbs stop swinging (saves matrix maths) */
  constructor(scene, count, seed = 5) {
    this.count = count; this.scene = scene;
    // pivots at the top of each limb so a rotation about z swings it from the hip / shoulder
    const geo = {
      legL: part(0.2, PEOPLE.legLen, 0.2, 0, -PEOPLE.legLen / 2, 0), legR: part(0.2, PEOPLE.legLen, 0.2, 0, -PEOPLE.legLen / 2, 0),
      torso: part(0.3, 0.62, 0.56, 0, 0.31, 0), armL: part(0.15, 0.6, 0.15, 0, -0.3, 0), armR: part(0.15, 0.6, 0.15, 0, -0.3, 0),
      head: new THREE.SphereGeometry(0.2, 7, 5).translate(0, 0.2, 0), hair: part(0.4, 0.14, 0.4, 0, 0.0, 0)
    };
    this.parts = {}; for (const k of Object.keys(geo)) { const im = new THREE.InstancedMesh(geo[k], new THREE.MeshLambertMaterial(), count); im.frustumCulled = false; im.instanceMatrix.setUsage(THREE.DynamicDrawUsage); scene.add(im); this.parts[k] = im; }
    const rnd = (() => { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; })();
    const pick = (a) => a[(rnd() * a.length) | 0]; const col = new THREE.Color(); this.look = [];
    for (let i = 0; i < count; i++) {
      const shirt = pick(PEOPLE.shirts), trouser = pick(PEOPLE.trousers), skin = pick(PEOPLE.skins), capOn = rnd() < 0.22; const hair = capOn ? pick(PEOPLE.caps) : pick(PEOPLE.hair);
      this.look.push({ scale: 0.9 + rnd() * 0.22, wide: 0.92 + rnd() * 0.2, capOn });
      this.parts.legL.setColorAt(i, col.setHex(trouser)); this.parts.legR.setColorAt(i, col.setHex(trouser)); this.parts.torso.setColorAt(i, col.setHex(shirt)); this.parts.armL.setColorAt(i, col.setHex(rnd() < 0.5 ? shirt : skin)); this.parts.armR.setColorAt(i, col.setHex(rnd() < 0.5 ? shirt : skin));
      this.parts.head.setColorAt(i, col.setHex(skin)); this.parts.hair.setColorAt(i, col.setHex(hair));
    }
    for (const k in this.parts) if (this.parts[k].instanceColor) this.parts[k].instanceColor.needsUpdate = true;
    this._base = new THREE.Matrix4(); this._m = new THREE.Matrix4(); this._r = new THREE.Matrix4(); this._q = new THREE.Quaternion(); this._p = new THREE.Vector3(); this._s = new THREE.Vector3(); this._up = new THREE.Vector3(0, 1, 0);
  }
  /** pose person i at (x, y, z) facing yaw; walk = phase (radians) of the stride, amp 0..1 how strongly they swing (0 = standing) */
  pose(i, x, y, z, yaw, walk = 0, amp = 1, far = false) {
    const L = this.look[i], P = this.parts, b = this._base, m = this._m, r = this._r, S = L.scale;
    this._q.setFromAxisAngle(this._up, yaw); this._p.set(x, y, z); this._s.set(S, S, S * L.wide); b.compose(this._p, this._q, this._s);
    const sw = far ? 0 : Math.sin(walk) * PEOPLE.swing * amp, aw = far ? 0 : Math.sin(walk) * PEOPLE.armSwing * amp, hip = PEOPLE.legLen, bob = far ? 0 : Math.abs(Math.sin(walk)) * 0.04 * amp;
    const put = (im, ox, oy, oz, rotZ) => { m.makeTranslation(ox, oy + bob, oz); if (rotZ) { r.makeRotationZ(rotZ); m.multiply(r); } m.premultiply(b); im.setMatrixAt(i, m); };
    put(P.legL, 0, hip, -0.11, sw); put(P.legR, 0, hip, 0.11, -sw); put(P.torso, 0, hip, 0, 0);
    put(P.armL, 0, hip + 0.58, -0.36, -aw); put(P.armR, 0, hip + 0.58, 0.36, aw);
    put(P.head, 0.01, hip + 0.62, 0, 0); put(P.hair, L.capOn ? 0.06 : -0.01, hip + 0.62 + 0.27, 0, 0);
  }
  commit() { for (const k in this.parts) this.parts[k].instanceMatrix.needsUpdate = true; }
}
