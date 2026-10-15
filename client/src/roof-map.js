// Coarse building-height lookup so flying planes stay above rooftops (no clipping).

/** @param {Array<{x:number,z:number,w:number,d:number,h:number}>} buildings */
export function makeRoofMap(buildings, cell = 48) {
  const cells = new Map();
  for (const b of buildings || []) {
    const h = Number(b.h) || 0; if (h <= 0) continue;
    const pad = 4;
    const x0 = Math.floor((b.x - b.w / 2 - pad) / cell);
    const x1 = Math.floor((b.x + b.w / 2 + pad) / cell);
    const z0 = Math.floor((b.z - b.d / 2 - pad) / cell);
    const z1 = Math.floor((b.z + b.d / 2 + pad) / cell);
    for (let ix = x0; ix <= x1; ix++) for (let iz = z0; iz <= z1; iz++) {
      const k = ix + ':' + iz;
      const arr = cells.get(k); if (arr) arr.push(b); else cells.set(k, [b]);
    }
  }
  return { cell, cells };
}

/** Tallest roof under / near (x,z). `pad` covers wingspan so the fuselage is not inside a nearby block. */
export function roofAt(map, x, z, pad = 22) {
  if (!map?.cells) return 0;
  const ix = Math.floor(x / map.cell), iz = Math.floor(z / map.cell);
  let maxH = 0;
  for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) {
    const arr = map.cells.get((ix + dx) + ':' + (iz + dz));
    if (!arr) continue;
    for (const b of arr) {
      if (Math.abs(x - b.x) <= b.w / 2 + pad && Math.abs(z - b.z) <= b.d / 2 + pad) maxH = Math.max(maxH, b.h || 0);
    }
  }
  return maxH;
}

/** Keep airborne altitude above the local roof (+ clearance). Ground poses (y < 2) are unchanged. */
export function clearAir(map, x, y, z, clearance = 20) {
  if (!(y > 2)) return y;
  return Math.max(y, roofAt(map, x, z) + clearance);
}
