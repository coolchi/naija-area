// Car parks: draws the lots from the city JSON (tarmac, bay lines, kerbs, gate booth and barrier, P sign), fills the free bays with ambient parked cars (merged into ONE mesh
// per lot, rebuilt only when the 2-hour game slot changes) and shows real players' parked cars. Layout and rules are pure and live in server/core/carparks-layout.js.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Builder } from '../sample/builder.js';
import { carGeo } from '../sample/vehicles.js';
import { bays, ambientBays, ambientLook, gatePos, SLOT_HOURS, BAY } from '../../server/core/carparks-layout.js';
import { makeNameSprite, blobShadow } from './entities.js';

const vcMat = new THREE.MeshLambertMaterial({ vertexColors: true });
const COLORS = [0xf5f5f5, 0xb0b5ba, 0x1f2328, 0xb71c1c, 0x1e4f8c, 0x2e6b3a, 0xd6c9a8, 0x7a5c3e];
const TOP = 0.2; // sidewalk slabs end at 0.18
const geoCache = new Map(); const carG = (type, hex) => { const k = type + hex; if (!geoCache.has(k)) geoCache.set(k, carGeo(type, hex)); return geoCache.get(k); };
const signTex = (name) => { const c = document.createElement('canvas'); c.width = 256; c.height = 128; const g = c.getContext('2d'); g.fillStyle = '#1565c0'; g.fillRect(0, 0, 256, 128); g.strokeStyle = '#fff'; g.lineWidth = 6; g.strokeRect(6, 6, 244, 116); g.fillStyle = '#fff'; g.font = '900 64px system-ui,sans-serif'; g.textAlign = 'center'; g.fillText('P', 128, 68); g.font = '700 17px system-ui,sans-serif'; g.fillText(name.slice(0, 26), 128, 108); const t = new THREE.CanvasTexture(c); t.anisotropy = 4; return t; };
export const PARK_VIEW = { cullDist: 300 };

export class CarParks {
  constructor(world, city) {
    this.root = new THREE.Group(); this.city = city; this.lots = city.carParks || []; this.amb = new Map(); this.slot = new Map(); this.real = new THREE.Group(); this.root.add(this.real); this.cars = [];
    const b = new Builder(77, 0.01);
    for (const l of this.lots) { const x0 = l.x - l.w / 2, x1 = l.x + l.w / 2, z0 = l.z - l.d / 2, z1 = l.z + l.d / 2;
      b.box(l.w, 0.06, l.d, l.x, TOP - 0.04, l.z, 0x3a3e44, { noAO: true, jit: 0 });
      for (const z of [z0, z1]) b.box(l.w, 0.18, 0.4, l.x, TOP - 0.04, z, 0xcfcab8, { noAO: true, jit: 0 }); // long kerbs
      const gx = l.gate === 'w' ? x0 : x1, farX = l.gate === 'w' ? x1 : x0; b.box(0.4, 0.18, l.d, farX, TOP - 0.04, l.z, 0xcfcab8, { noAO: true, jit: 0 });
      for (const z of [z0 + 2.2, z1 - 2.2]) b.box(0.4, 0.18, 4.4, gx, TOP - 0.04, z, 0xcfcab8, { noAO: true, jit: 0 }); // gate end kerb with the entrance gap in the middle
      const list = bays(l); const rows = new Set(list.map(a => a.row)); for (const r of rows) { const rb = list.filter(a => a.row === r); const zc = rb[0].z; const dir = rb[0].ry < 0 ? -1 : 1; // line colour: first and last bold
        for (let k = 0; k <= rb.length; k++) { const x = (k < rb.length ? rb[k].x - BAY.w / 2 : rb[k - 1].x + BAY.w / 2); b.box(0.12, 0.02, BAY.d - 0.2, x, TOP + 0.015, zc - dir * 0.1, 0xf2f2ee, { noAO: true, jit: 0 }); }
        b.box(rb.length * BAY.w, 0.02, 0.12, rb[0].x - BAY.w / 2 + rb.length * BAY.w / 2, TOP + 0.015, zc - dir * (BAY.d / 2), 0xf2f2ee, { noAO: true, jit: 0 }); }
      const gp = gatePos(l); b.box(2, 2.4, 2.2, gp.x, TOP, gp.z, 0xe8e2d0, { noAO: false }); b.box(2.5, 0.25, 2.7, gp.x, TOP + 2.4, gp.z, 0x1565c0, { noAO: true, jit: 0 }); b.box(0.04, 0.9, 1.4, gp.x - gp.sx * 1.01, TOP + 1.1, gp.z, 0x28485f, { noAO: true, jit: 0 });
      const ax = gp.x, az = l.z + (l.gate === 'w' ? -1 : 1) * 0.4; b.box(0.3, 1.1, 0.3, ax, TOP, az - 1.2 * (gp.z > l.z ? 1 : -1), 0x444444, { noAO: true, jit: 0 }); // barrier post, arm raised (open)
      for (let k = 0; k < 4; k++) b.box(0.2, 0.12, 0.8, ax, TOP + 1.5 + k * 0.85, az - 1.2 * (gp.z > l.z ? 1 : -1), k % 2 ? 0xffffff : 0xd32f2f, { noAO: true, jit: 0 }); // arm standing up (raised barrier)
      for (const px of [x0 + 1.2, x1 - 1.2]) b.box(0.25, 0.8, 0.25, px, TOP, z1 - 1, 0x777777, { noAO: true, jit: 0 }); // two stubby bollards
      // P sign on a pole beside the entrance
      b.box(0.18, 3.6, 0.18, gx + (l.gate === 'w' ? -1.6 : 1.6), TOP, z1 + 0.6, 0x555555, { noAO: true, jit: 0 });
    }
    this.root.add(new THREE.Mesh(b.build(), vcMat));
    for (const l of this.lots) { const s = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.3), new THREE.MeshBasicMaterial({ map: signTex(l.name), side: THREE.DoubleSide })); const gx = l.gate === 'w' ? l.x - l.w / 2 : l.x + l.w / 2; s.position.set(gx + (l.gate === 'w' ? -1.6 : 1.6), 4.1, l.z + l.d / 2 + 0.6); s.rotation.y = 0; this.root.add(s); const t = s.clone(); t.rotation.y = Math.PI; this.root.add(t); }
    world.scene.add(this.root);
  }
  /** ambient cars fill the bays no player holds; rebuild a lot only when its slot (or its taken bays) changed */
  setHour(hour, parkedList = this.parked || []) {
    for (const l of this.lots) { const taken = parkedList.filter(p => p.lot === l.id).map(p => p.bay); const key = Math.floor(hour / SLOT_HOURS) + ':' + taken.join(','); if (this.slot.get(l.id) === key) continue; this.slot.set(l.id, key);
      const old = this.amb.get(l.id); if (old) { this.root.remove(old); old.geometry.dispose(); }
      const set = ambientBays(l, hour, taken); const bl = bays(l); const parts = []; for (const i of set) { const k = ambientLook(l, i, hour); const g = carG(k.type, COLORS[k.color]).clone(); g.rotateY(bl[i].ry); g.translate(bl[i].x, TOP + 0.1, bl[i].z); parts.push(g); }
      if (!parts.length) { this.amb.delete(l.id); continue; } const m = new THREE.Mesh(mergeGeometries(parts), vcMat); m.userData.lot = l.id; this.root.add(m); this.amb.set(l.id, m); for (const g of parts) g.dispose(); }
  }
  /** real players' parked cars: [{ lot, bay, x, z, ry, color, who? , mine? }] */
  setParked(list, myName) {
    this.parked = list; for (const c of this.cars) { this.real.remove(c); if (c.userData.tag) c.userData.tag.material.map?.dispose(); } this.cars = [];
    for (const p of list) { const g = new THREE.Group(); const m = new THREE.Mesh(carG('hatch', new THREE.Color(p.color).getHex()), vcMat); m.position.y = 0.1; g.add(m); g.add(blobShadow(5.2, 2.8)); g.position.set(p.x, TOP, p.z); g.rotation.y = p.ry; const tag = makeNameSprite(p.mine ? 'Your car' : '@' + p.who, p.mine ? '#ffc20e' : '#ffffff'); tag.position.set(0, 3.2, 0); tag.scale.multiplyScalar(0.6); g.userData.tag = tag; g.add(tag); this.real.add(g); this.cars.push(g); }
    void myName;
  }
  /** hide far lots completely (nothing drawn beyond cullDist) */
  cull(x, z) { for (const l of this.lots) { const near = Math.hypot(l.x - x, l.z - z) < PARK_VIEW.cullDist; const m = this.amb.get(l.id); if (m) m.visible = near; } }
}
