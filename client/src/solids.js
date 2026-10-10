// Street props and pedestrians as solid circles (Track G item 5). Pure (no THREE) so it is unit-tested: a grid index over lamp posts and palm trunks, and a way to ask "what is within range of me, minus what I am jumping over".
import { PHYSX } from '../../server/config/physx.js';
import { clearsSolid } from '../../server/core/physx.js';

export class SolidIndex {
  constructor(list = [], cell = 24) { this.cell = cell; this.map = new Map(); this.n = 0; for (const o of list) this.add(o); }
  key(cx, cz) { return cx * 73856093 ^ cz * 19349663; }
  add(o) { const k = this.key(Math.floor(o.x / this.cell), Math.floor(o.z / this.cell)); let a = this.map.get(k); if (!a) this.map.set(k, a = []); a.push(o); this.n++; }
  /** pushes every solid within `range` of (x, z) into `out` that a walker at height y cannot step or hop over */
  near(x, z, range, out, y = 0) {
    const c0 = Math.floor((x - range) / this.cell), c1 = Math.floor((x + range) / this.cell), d0 = Math.floor((z - range) / this.cell), d1 = Math.floor((z + range) / this.cell);
    for (let cx = c0; cx <= c1; cx++) for (let cz = d0; cz <= d1; cz++) { const a = this.map.get(this.key(cx, cz)); if (!a) continue; for (const o of a) if (Math.abs(o.x - x) <= range && Math.abs(o.z - z) <= range && !clearsSolid(y, o.h)) out.push(o); }
    return out;
  }
}
/** lamp posts (from lamps.js lampPositions) and palm trunks ({x, z, r}) as one index */
export function propIndex(lamps, palms, S = PHYSX.solids) {
  const l = []; for (const m of lamps || []) l.push({ x: m.x, z: m.z, r: S.lamp.r, h: S.lamp.h, kind: 'lamp' }); for (const p of palms || []) l.push({ x: p.x, z: p.z, r: p.r ?? S.palm.r, h: S.palm.h, kind: 'palm' });
  return new SolidIndex(l);
}
