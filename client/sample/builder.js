// Geometry builder: collects primitives (with vertex colours) and merges them into ONE BufferGeometry.
// Everything in the sample is procedural: no external model/texture files.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const _c = new THREE.Color();
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _p = new THREE.Vector3();
const _s = new THREE.Vector3();

export class Builder {
  constructor(seed = 1, jitter = 0.035) {
    this.parts = [];
    this.rnd = mulberry32(seed);
    this.jit = jitter;
    this.uvScale = 0.14;
  }
  _col(color, jit) {
    _c.set(color);
    const j = 1 + (this.rnd() * 2 - 1) * (jit ?? this.jit);
    return [_c.r * j, _c.g * j, _c.b * j];
  }
  _push(geo, x, y, z, color, o = {}) {
    if (geo.index) geo = geo.toNonIndexed();
    _e.set(o.rx || 0, o.ry || 0, o.rz || 0, 'YXZ');
    _q.setFromEuler(_e);
    _p.set(x, y, z);
    _s.set(o.sx ?? 1, o.sy ?? 1, o.sz ?? 1);
    _m.compose(_p, _q, _s);
    geo.applyMatrix4(_m);
    const pos = geo.attributes.position, nor = geo.attributes.normal;
    const n = pos.count;
    const col = new Float32Array(n * 3);
    const uv = geo.attributes.uv && o.keepUV ? null : new Float32Array(n * 2);
    const [r, g, b] = this._col(color, o.jit);
    for (let i = 0; i < n; i++) {
      let k = 1;
      // fake ambient occlusion: darken vertical faces toward the ground
      if (!o.noAO && Math.abs(nor.getY(i)) < 0.5) k = 0.80 + 0.20 * Math.min(1, Math.max(0, pos.getY(i) / 2.4));
      if (o.shade) k *= o.shade;
      col[i * 3] = r * k; col[i * 3 + 1] = g * k; col[i * 3 + 2] = b * k;
      if (uv) {
        const ax = Math.abs(nor.getX(i)), ay = Math.abs(nor.getY(i)), az = Math.abs(nor.getZ(i));
        const px = pos.getX(i), py = pos.getY(i), pz = pos.getZ(i);
        let u, v;
        if (ay >= ax && ay >= az) { u = px; v = pz; } else if (ax >= az) { u = pz; v = py; } else { u = px; v = py; }
        uv[i * 2] = u * this.uvScale; uv[i * 2 + 1] = v * this.uvScale;
      }
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    if (uv) geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    for (const k of Object.keys(geo.attributes)) if (!['position', 'normal', 'color', 'uv'].includes(k)) geo.deleteAttribute(k);
    this.parts.push(geo);
    return this;
  }
  // box: (x,y,z) = centre of the BOTTOM face
  box(w, h, d, x, y, z, color, o) {
    return this._push(new THREE.BoxGeometry(w, h, d), x, y + h / 2, z, color, o);
  }
  // cylinder / cone-frustum: (x,y,z) = centre of bottom
  cyl(rt, rb, h, seg, x, y, z, color, o) {
    return this._push(new THREE.CylinderGeometry(rt, rb, h, seg), x, y + h / 2, z, color, o);
  }
  // cylinder with axis rotated onto Z (wheels), centred at (x,y,z)
  wheel(r, w, x, y, z, color, o = {}) { return this._push(new THREE.CylinderGeometry(r, r, w, 10), x, y, z, color, { ...o, rx: Math.PI / 2, noAO: true }); }
  sphere(r, x, y, z, color, o = {}) {
    return this._push(new THREE.SphereGeometry(r, o.ws || 8, o.hs || 6), x, y, z, color, o);
  }
  ico(r, x, y, z, color, o = {}) {
    return this._push(new THREE.IcosahedronGeometry(r, o.detail || 0), x, y, z, color, o);
  }
  capsule(r, len, x, y, z, color, o = {}) {
    return this._push(new THREE.CapsuleGeometry(r, len, 3, 8), x, y + r + len / 2, z, color, o);
  }
  cone(r, h, seg, x, y, z, color, o) { return this.cyl(0.001, r, h, seg, x, y, z, color, o); }
  // flat plane facing +z by default; centre (x,y,z)
  plane(w, h, x, y, z, color, o) { return this._push(new THREE.PlaneGeometry(w, h), x, y, z, color, o); }
  // gable roof prism; ridge runs along local Z. (x,y,z)=bottom centre. overhang added by caller via w/d
  gable(w, d, h, x, y, z, color, o = {}) {
    const hw = w / 2, hd = d / 2;
    const P = [[-hw, 0, -hd], [hw, 0, -hd], [hw, 0, hd], [-hw, 0, hd], [0, h, -hd], [0, h, hd]];
    const idx = [[0, 3, 5, 0, 5, 4], [1, 4, 5, 1, 5, 2], [0, 4, 1], [3, 2, 5], [0, 1, 2, 0, 2, 3]];
    const pos = [];
    for (const f of idx) for (const i of f) pos.push(...P[i]);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return this._push(g, x, y, z, color, o);
  }
  // arbitrary triangle strip/quad from 4 points (counter-clockwise seen from the front)
  quad(a, b, c, d, color, o = {}) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute([...a, ...b, ...c, ...a, ...c, ...d], 3));
    g.computeVertexNormals();
    return this._push(g, 0, 0, 0, color, o);
  }
  // explicit-UV quad (for textured materials such as signs and corrugated zinc)
  uvQuad(a, b, c, d, uvs, color = 0xffffff, o = {}) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute([...a, ...b, ...c, ...a, ...c, ...d], 3));
    const [u0, v0, u1, v1, u2, v2, u3, v3] = uvs;
    g.setAttribute('uv', new THREE.Float32BufferAttribute([u0, v0, u1, v1, u2, v2, u0, v0, u2, v2, u3, v3], 2));
    g.computeVertexNormals();
    return this._push(g, 0, 0, 0, color, { ...o, keepUV: true, noAO: true });
  }
  // add an already-built geometry (e.g. a parked car) at a pose
  addGeo(geo, x, y, z, yaw = 0) {
    const g = geo.clone(); _e.set(0, yaw, 0); _q.setFromEuler(_e); _p.set(x, y, z); _s.set(1, 1, 1);
    g.applyMatrix4(_m.compose(_p, _q, _s)); this.parts.push(g); return this;
  }
  build() {
    if (!this.parts.length) return new THREE.BufferGeometry();
    const g = mergeGeometries(this.parts, false);
    this.parts.forEach(p => p.dispose());
    this.parts = [];
    g.computeBoundingSphere(); g.computeBoundingBox();
    return g;
  }
}
