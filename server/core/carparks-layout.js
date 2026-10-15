// Car park layout: PURE functions shared by the server (which bay is free, is the player inside) and the client (where to draw lines and cars). No THREE here.
// A lot is data in the city JSON: { id, name, x, z, w, d, gate: 'w'|'e', fee, kind, venueId? } (centre x,z, size w along x and d along z). All numbers are ESTIMATE placeholders.
export const BAY = { w: 2.9, d: 5.4, aisle: 6.2, edge: 1.2, gateRoom: 5 };
const hash = (n) => { let x = Math.imul(n ^ 0x51ed270b, 0x85ebca6b); x ^= x >>> 13; x = Math.imul(x, 0xc2b2ae35); x ^= x >>> 16; return (x >>> 0) / 4294967296; };
export const hashStr = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };
/** bays of a lot, two rows facing a central aisle (one row when the lot is shallow). Each bay: { i, row, x, z, ry } where ry is the heading of a car parked nose-in
 *  (forward = (cos ry, -sin ry), same as the game's vehicles). The gate end (w or e) is kept clear for the barrier and booth. */
export function bays(lot) {
  const rows = lot.d >= BAY.d * 2 + BAY.aisle - 0.5 ? 2 : 1; const x0 = lot.x - lot.w / 2 + (lot.gate === 'w' ? BAY.gateRoom : BAY.edge), x1 = lot.x + lot.w / 2 - (lot.gate === 'e' ? BAY.gateRoom : BAY.edge);
  const n = Math.max(0, Math.floor((x1 - x0) / BAY.w)); const out = []; const off = (x1 - x0 - n * BAY.w) / 2;
  const rowZ = rows === 2 ? [lot.z - (BAY.aisle / 2 + BAY.d / 2), lot.z + (BAY.aisle / 2 + BAY.d / 2)] : [lot.z + lot.d / 2 - BAY.d / 2 - 0.6];
  const ry = rows === 2 ? [-Math.PI / 2, Math.PI / 2] : [Math.PI / 2]; // top row faces +z (south), bottom row faces -z
  for (let r = 0; r < rows; r++) for (let k = 0; k < n; k++) out.push({ i: out.length, row: r, x: x0 + off + BAY.w * (k + 0.5), z: rowZ[r], ry: ry[r] });
  return out;
}
export const inLot = (lot, x, z, pad = 0) => Math.abs(x - lot.x) <= lot.w / 2 + pad && Math.abs(z - lot.z) <= lot.d / 2 + pad;
export const lotAt = (lots, x, z, pad = 0) => (lots || []).find(l => inLot(l, x, z, pad)) || null;
export const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
/** barrier arm and booth positions at the gate end */
export function gatePos(lot) { const sx = lot.gate === 'w' ? -1 : 1; return { x: lot.x + sx * (lot.w / 2 - 1.2), z: lot.z + (lot.gate === 'w' ? 1 : -1) * 2.2, sx }; }
/** share of bays taken by ambient cars at a time slot: a calm market-day rhythm (busier by day and evenings), all placeholder numbers */
export function occupancy(lot, hour) { const base = lot.kind === 'venue' ? 0.5 : 0.4; const day = 0.2 * Math.max(0, Math.sin(((hour - 6) / 16) * Math.PI)); return Math.min(0.85, base + day); }
export const SLOT_HOURS = 2;
/** which bays hold an ambient car at this game hour (deterministic, same for every player): returns a Set of bay indexes; `taken` bays (real players' cars) are never listed */
export function ambientBays(lot, hour, taken = []) {
  const slot = Math.floor(hour / SLOT_HOURS), occ = occupancy(lot, hour), set = new Set(); const t = new Set(taken); const base = hashStr(lot.id);
  for (const b of bays(lot)) if (!t.has(b.i) && hash(base + b.i * 977 + slot * 13) < occ) set.add(b.i); return set;
}
/** appearance of the ambient car in a bay (type and colour index), stable per bay and slot */
export function ambientLook(lot, bay, hour) { const r = hash(hashStr(lot.id) * 3 + bay * 131 + Math.floor(hour / SLOT_HOURS) * 7); return { type: ['sedan', 'suv', 'hatch'][Math.floor(r * 3)], color: Math.floor(hash(r * 1e6) * 8) }; }
/** nearest free bay to a point; `blocked` is a Set/array of bay indexes that are not available */
export function nearestFree(lot, x, z, blocked = []) { const bl = new Set(blocked); let best = null; for (const b of bays(lot)) { if (bl.has(b.i)) continue; const d = Math.hypot(b.x - x, b.z - z); if (!best || d < best.d) best = { ...b, d }; } return best; }
/** what the parking chip should offer right now (pure, tested): st = { mode, x, z, lots, mine (parked car or null), ownedCar, takeRange, carBody? } */
export function parkingChip(st) {
  const lot = lotAt(st.lots, st.x, st.z, 1);
  if (st.mine) { if (st.mode === 'walk' && Math.hypot(st.mine.x - st.x, st.mine.z - st.z) <= st.takeRange) return { kind: 'take', label: '🚗 Take my car' }; return null; }
  // Motoka Meko garage: drive in to fix crash damage (not a normal park bay)
  if (lot && (lot.id === 'cp_meko' || lot.kind === 'service') && st.mode === 'drive' && st.ownedCar) {
    const dmg = st.carBody?.damage || 0;
    if (dmg > 0 || st.carBody?.wrecked) {
      const fee = st.carBody?.repairFee;
      return { kind: 'fix', lot, label: fee != null ? `🔧 Fix car · ₦${fee}` : '🔧 Fix car at Motoka Meko' };
    }
    return { kind: 'hint', lot, label: '🔧 Motoka Meko Garage — your car is fine' };
  }
  if (lot && st.mode === 'drive') return st.ownedCar ? { kind: 'park', lot, label: lot.fee ? `🅿️ Park here · ₦${lot.fee}` : '🅿️ Park here · free' } : { kind: 'hint', lot, label: '🅿️ Park your own car here (buy one at Motoka AutoMart Showroom)' };
  return null;
}
