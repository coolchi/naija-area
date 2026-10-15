// Per-type house interiors: every property has a style (city JSON `style`, or a default for its tier) and the style decides grid size, built-in fixtures, doors, windows,
// default decor and guest cap. All data lives in balance.housing.types (ESTIMATE placeholders); the client draws the fixtures from primitives.
export function typeOf(app, p) { const T = app.balance.housing.types; const id = (p.style && T[p.style]) ? p.style : app.balance.housing.defaultTypeByTier[p.tier]; return { id, ...T[id] }; }
export const gridOf = (app, p) => typeOf(app, p).grid;
export const maxGuestsOf = (app, p) => typeOf(app, p).maxGuests;
/** A dividing wall minus its door openings. Openings are not reserved, so you can walk through them. */
export function wallPieces(w) {
  const base = { what: 'wall' };
  const doors = (w.doors || (w.door ? [w.door] : [])).filter(Boolean);
  if (!doors.length) return [{ x: w.x, z: w.z, w: w.w, d: w.d, ...base }];
  const x0 = w.x, x1 = w.x + w.w, z0 = w.z, z1 = w.z + w.d;
  const alongX = w.w >= w.d;
  if (alongX) {
    const cuts = doors.map(d => [Math.max(x0, d.x), Math.min(x1, d.x + d.w)]).filter(([a, b]) => b > a + 0.01).sort((a, b) => a[0] - b[0]);
    const out = []; let cur = x0;
    for (const [a, b] of cuts) { if (a > cur + 0.01) out.push({ x: cur, z: z0, w: a - cur, d: w.d, ...base }); cur = Math.max(cur, b); }
    if (x1 > cur + 0.01) out.push({ x: cur, z: z0, w: x1 - cur, d: w.d, ...base });
    return out.length ? out : [{ x: w.x, z: w.z, w: w.w, d: w.d, ...base }];
  }
  const cuts = doors.map(d => [Math.max(z0, d.z), Math.min(z1, d.z + d.d)]).filter(([a, b]) => b > a + 0.01).sort((a, b) => a[0] - b[0]);
  const out = []; let cur = z0;
  for (const [a, b] of cuts) { if (a > cur + 0.01) out.push({ x: x0, z: cur, w: w.w, d: a - cur, ...base }); cur = Math.max(cur, b); }
  if (z1 > cur + 0.01) out.push({ x: x0, z: cur, w: w.w, d: z1 - cur, ...base });
  return out.length ? out : [{ x: w.x, z: w.z, w: w.w, d: w.d, ...base }];
}
/** cells that furniture may never cover: blocking fixtures, room walls, and the doorway in front of the door */
export function reservedRects(app, p) {
  const t = typeOf(app, p); const [w, d] = t.grid; const out = t.fixtures.filter(f => f.blocks).map(f => ({ x: f.x, z: f.z, w: f.w, d: f.d, what: f.what || f.kind }));
  for (const wall of t.walls || []) out.push(...wallPieces(wall));
  out.push({ x: t.door.x, z: d - 2, w: t.door.w, d: 2, what: 'doorway' }); void w; return out;
}
/** everything the client needs to build the room (no money, no secrets) */
export function layoutOf(app, p) { const t = typeOf(app, p); return { type: t.id, label: t.label, w: t.grid[0], d: t.grid[1], reserved: reservedRects(app, p), fixtures: t.fixtures, zones: t.zones || [], walls: t.walls || [], door: t.door, windows: t.windows, corridor: t.corridor || null, veranda: !!t.veranda, defaults: { wall: t.wall, floor: t.floor } }; }
export function plotStage(app, boughtAt, now) { const days = Math.max(0, (now - boughtAt) / (app.balance.land?.dayMs || 86400000)); const S = app.balance.housing.plotStages; let cur = S[0]; for (const s of S) if (days >= s.afterDays) cur = s; return { ...cur, index: S.indexOf(cur), of: S.length }; }
