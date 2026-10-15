// Street wear: some roads get potholes, some get speed bumps, some stay smooth.
// Pure (no DOM / THREE) so the planner is unit-tested. Placement is deterministic from road ids.
import { roadPts, polyLen, pointAt } from './roadgeom.js';

const hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

/** 'pothole' | 'bump' | null — short roads stay clean; most stay smooth; bumps are rare. */
export function roadTreatment(r) {
  const L = polyLen(roadPts(r));
  if (L < 48) return null;
  const t = hash(String(r.id || r.name || '')) % 8;
  if (t === 0) return 'pothole';
  if (t === 1) return 'bump';
  return null;
}

/** Place hazards along treated roads. Skips roundabout junctions. */
export function planRoadHazards(city) {
  const hazards = [];
  for (const r of city.roads || []) {
    const kind = roadTreatment(r);
    if (!kind) continue;
    const pts = roadPts(r);
    const L = polyLen(pts);
    // Fewer, farther apart — speed bumps used to look like black planks across the lane
    const step = kind === 'bump' ? 280 : 90; // bumps: half as many as the old 140 m spacing
    const margin = kind === 'bump' ? 48 : 28;
    let i = 0;
    for (let s = margin; s < L - margin; s += step + (hash(r.id + ':' + i) % 17)) {
      const [x, z, yaw] = pointAt(pts, s);
      if ((city.roundabouts || []).some(o => Math.hypot(x - o.x, z - o.z) < o.outerR + 5)) { i++; continue; }
      // potholes sit off-centre in a lane; bumps sit across the carriageway
      const side = kind === 'pothole' ? (((hash(r.id + '#side' + i) % 3) - 1) * r.width * 0.2) : 0;
      const px = x + Math.cos(yaw + Math.PI / 2) * side;
      const pz = z + Math.sin(yaw + Math.PI / 2) * side;
      hazards.push({
        id: `${r.id}-${kind}-${i}`,
        kind,
        x: px,
        z: pz,
        yaw,
        roadId: r.id,
        roadW: r.width,
        r: kind === 'bump' ? Math.max(2.4, r.width * 0.38) : 1.4
      });
      i++;
    }
  }
  return hazards;
}

/** nearest hazard under a world point, or null */
export function hazardAt(hazards, x, z) {
  let best = null, bd = Infinity;
  for (const h of hazards) {
    const d = Math.hypot(x - h.x, z - h.z);
    if (d < h.r && d < bd) { bd = d; best = h; }
  }
  return best;
}
