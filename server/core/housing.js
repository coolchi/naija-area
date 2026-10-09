// Per-type house interiors: every property has a style (city JSON `style`, or a default for its tier) and the style decides grid size, built-in fixtures, doors, windows,
// default decor and guest cap. All data lives in balance.housing.types (ESTIMATE placeholders); the client draws the fixtures from primitives.
export function typeOf(app, p) { const T = app.balance.housing.types; const id = (p.style && T[p.style]) ? p.style : app.balance.housing.defaultTypeByTier[p.tier]; return { id, ...T[id] }; }
export const gridOf = (app, p) => typeOf(app, p).grid;
export const maxGuestsOf = (app, p) => typeOf(app, p).maxGuests;
/** cells that furniture may never cover: blocking fixtures (bed, wardrobe, stairs, kitchen...) + the doorway in front of the door */
export function reservedRects(app, p) {
  const t = typeOf(app, p); const [w, d] = t.grid; const out = t.fixtures.filter(f => f.blocks).map(f => ({ x: f.x, z: f.z, w: f.w, d: f.d, what: f.what || f.kind }));
  out.push({ x: t.door.x, z: d - 2, w: t.door.w, d: 2, what: 'doorway' }); void w; return out;
}
/** everything the client needs to build the room (no money, no secrets) */
export function layoutOf(app, p) { const t = typeOf(app, p); return { type: t.id, label: t.label, w: t.grid[0], d: t.grid[1], reserved: reservedRects(app, p), fixtures: t.fixtures, door: t.door, windows: t.windows, corridor: t.corridor || null, veranda: !!t.veranda, defaults: { wall: t.wall, floor: t.floor } }; }
export function plotStage(app, boughtAt, now) { const days = Math.max(0, (now - boughtAt) / (app.balance.land?.dayMs || 86400000)); const S = app.balance.housing.plotStages; let cur = S[0]; for (const s of S) if (days >= s.afterDays) cur = s; return { ...cur, index: S.indexOf(cur), of: S.length }; }
