// Ad inventory beyond the billboards listed in a city's JSON (Track G item 8). Derived from the city's own data, so no city file changes:
//  * shop_front boards: a real board on the front of each shop and venue that has a building (client draws it like a billboard; same evidence rules)
//  * radio_spot slots: one per in-game station per city (no position: counted from the player being in a car in a spot window)
//  * ride_car slot: one per city (counted by the server per boarded ride)
import { AD_FORMATS } from '../config/ratecard.js';

const r1 = (n) => Math.round(n * 100) / 100;
/** a board on the building face nearest to each shop / venue door, facing outward (axis aligned). Deterministic, at most `maxPerCity`. */
export function storefrontBoards(c) {
  const F = AD_FORMATS.shopFront; const out = []; const seen = new Set(); const byId = Object.fromEntries((c.buildings || []).map(b => [b.id, b]));
  const doors = [...(c.shops || []).map(s => ({ kind: 'shop', id: s.id, name: s.name, x: s.x, z: s.z, buildingId: s.buildingId })), ...(c.venues || []).map(v => ({ kind: 'venue', id: v.id, name: v.name, x: v.x, z: v.z, buildingId: v.buildingId }))];
  for (const d of doors) {
    if (out.length >= F.maxPerCity) break; const b = d.buildingId && byId[d.buildingId]; if (!b || seen.has(b.id)) continue; seen.add(b.id);
    const hw = (b.w || 20) / 2, hd = (b.d || 20) / 2, dx = d.x - b.x, dz = d.z - b.z; const alongX = Math.abs(dx) / hw > Math.abs(dz) / hd; // the door is nearer an east/west face than a north/south one
    // the shop's own name sign hangs centred on the face (client/src/world.js: up to 16 m wide), so the sponsor sign goes beside it, never over it; a building too narrow for both gets no sponsor sign
    const half = alongX ? hd : hw, off = F.nameSignHalf + 0.6 + F.w / 2; if (off + F.w / 2 + 0.3 > half) continue; const side = (parseInt(String(b.id).replace(/\D/g, ''), 10) || 0) % 2 ? -1 : 1;
    const x = alongX ? b.x + Math.sign(dx || 1) * (hw + F.standOff) : b.x + side * off, z = alongX ? b.z + side * off : b.z + Math.sign(dz || 1) * (hd + F.standOff);
    const y = Math.max(2.4, Math.min(F.y, (b.h || 7) - 1.3));
    out.push({ id: `sf_${d.id}`, surface: 'shop_front', tier: 'shop', x: r1(x), z: r1(z), y: r1(y), nx: alongX ? Math.sign(dx || 1) : 0, nz: alongX ? 0 : Math.sign(dz || 1), w: F.w, h: F.h, label: d.name, forId: d.id, forKind: d.kind });
  }
  return out;
}
/** slots without a place on the map */
export function virtualSlots(c) {
  const out = []; for (const st of AD_FORMATS.radio.stations) out.push({ id: `radio:${c.id}:${st}`, surface: 'radio_spot', tier: 'station', station: st, city: c.id });
  out.push({ id: `ride:${c.id}`, surface: 'ride_car', tier: 'fleet', city: c.id }); return out;
}
/** radio spot windows: the rotation window numbers that are spots (the same for every station: one timeline) */
export const isSpotWindow = (win, rotationMs, everyMs = AD_FORMATS.radio.everyMs) => (win * rotationMs) % everyMs === 0;
export const rideSlotId = (cityId) => `ride:${cityId}`;
/** which entry of a slot's list is on in window `win`: boards rotate every window; radio spots rotate every SPOT (spot windows are all multiples of the same number, so `win % n` would always give the same sponsor). Same rule on the client. */
export const rotIndex = (slotId, win, rotationMs, everyMs = AD_FORMATS.radio.everyMs) => (String(slotId).startsWith('radio:') ? Math.floor(win / Math.max(1, Math.round(everyMs / rotationMs))) : win);
/** Which campaign and which design is on at rotation index `k` (k = rotIndex(slot, window)). `list` = [{ c: campaign id, d: [design ids] }] in board order (the client's snapshot has `i` for a single design and `d` for several).
 *  Campaigns take turns (k % n); inside a campaign its designs take turns each time it comes round (floor(k / n) % designs). One campaign alone (an exclusive board) therefore shows each of its designs for one window in turn.
 *  The server (ads.js) and the client (ads-client.js) both use THIS function, so what the player sees is what the server validates. */
export function pickFrame(list, k) {
  const n = list?.length || 0; if (!n) return null; const e = list[k % n]; const ds = e.d && e.d.length ? e.d : [e.i]; return { c: e.c, i: ds[Math.floor(k / n) % ds.length], entry: e };
}
