// City config loader/indexer. A "city" is a JSON file (roads, buildings, billboards, shops, jobs, spawns, traffic loops).
export function indexCity(raw) {
  const c = JSON.parse(JSON.stringify(raw));
  c.propertyById = Object.fromEntries(c.properties.map(p => [p.id, p]));
  c.shopById = Object.fromEntries(c.shops.map(s => [s.id, s]));
  c.jobLoc = Object.fromEntries(c.jobs.map(j => [j.id, j]));
  c.billboardById = Object.fromEntries(c.billboards.map(b => [b.id, b])); c.venueById = Object.fromEntries((c.venues || []).map(v => [v.id, v])); c.busStopById = Object.fromEntries((c.busStops || []).map(v => [v.id, v])); c.carParkById = Object.fromEntries((c.carParks || []).map(v => [v.id, v]));
  c.buildingById = Object.fromEntries(c.buildings.map(b => [b.id, b]));
  const legacyArea = (x, z) => (z > 125 ? 'Lagoon Front' : x < 0 && z < 0 ? 'Yaba' : x >= 0 && z < 0 ? 'Ikeja' : x < 0 ? 'Surulere' : 'Lekki Phase 1');
  const area = (x, z) => (c.districts?.length ? (c.districts.find(d => x >= d.x0 && x < d.x1 && z >= d.z0 && z < d.z1)?.name || legacyArea(x, z)) : legacyArea(x, z)); // districts are data (city JSON); the old rule is only a fallback
  c.area = area;
  for (const p of c.properties) p.area = area(p.door.x, p.door.z);
  c.plotById = Object.fromEntries((c.plots || []).map(p => [p.id, p]));
  // 'places' = things you can tap on the map and travel to (the server only accepts these destinations)
  c.places = [];
  for (const s of c.shops) c.places.push({ id: s.id, type: 'shop', name: s.name, x: s.x, z: s.z, area: area(s.x, s.z), hours: null });
  for (const j of c.jobs) c.places.push({ id: j.id, type: 'job', name: j.label, x: j.x, z: j.z, area: area(j.x, j.z) });
  for (const p of c.properties) c.places.push({ id: p.id, type: 'house', name: p.name, x: p.door.x, z: p.door.z, area: p.area });
  for (const p of c.plots || []) c.places.push({ id: p.id, type: 'plot', name: p.name, x: p.x, z: p.z + p.size / 2 + 3, area: p.area });
  const ap = c.buildings.find(b => b.kind === 'airport'); if (ap) c.places.push({ id: 'airport', type: 'landmark', name: 'Airport Terminal (placeholder)', x: ap.x, z: ap.z + ap.d / 2 + 6, area: 'Ikeja' });
  const pl = (c.landmarks || []).find(l => l.id === 'plaza'); if (pl) c.places.push({ id: 'plaza', type: 'landmark', name: pl.name, x: pl.x, z: pl.z + 14, area: 'Yaba' });
  for (const b of c.busStops || []) c.places.push({ id: b.id, type: 'busstop', name: b.name, x: b.x, z: b.z, area: area(b.x, b.z) });
  const cl = (c.landmarks || []).find(l => l.kind === 'clinic'); if (cl) c.places.push({ id: 'clinic', type: 'landmark', name: cl.name, x: cl.door.x, z: cl.door.z, area: area(cl.x, cl.z) });
  for (const v of c.venues || []) c.places.push({ id: v.id, type: 'venue', name: v.name, x: v.x, z: v.z, area: area(v.x, v.z), hours: v.hours });
  for (const p of c.places) p.city = c.id; c.placeById = Object.fromEntries(c.places.map(p => [p.id, p]));
  return c;
}

/** Check a raw city config before it is allowed into the game (the city template checklist, enforced). Returns a list of problems (empty = ok). */
export const CITY_LIMITS = { maxBuildings: 400, maxRoads: 120, maxBillboards: 60, maxTrafficLoops: 20, maxVenues: 30 }; // performance-rule budgets (ESTIMATE, tune from phone tests)
export function validateCity(raw, limits = CITY_LIMITS) {
  const err = []; const need = (k, arr = true) => { if (raw[k] === undefined || (arr && !Array.isArray(raw[k]))) err.push(`missing ${arr ? 'list' : 'field'} "${k}"`); };
  for (const k of ['id', 'name', 'cityName']) need(k, false); need('bounds', false);
  for (const k of ['roads', 'buildings', 'properties', 'shops', 'jobs', 'billboards', 'spawns', 'trafficLoops', 'venues', 'zones', 'districts']) need(k);
  if (err.length) return err;
  const b = raw.bounds; const inB = (x, z) => x >= b.minX && x <= b.maxX && z >= b.minZ && z <= b.maxZ;
  if (!raw.spawns.length) err.push('needs at least one spawn');
  for (const s of raw.spawns) if (!inB(s.x, s.z)) err.push('spawn outside bounds');
  const seen = new Set(); const uniq = (kind, list) => { for (const e of list) { if (!e.id) { err.push(`${kind} without id`); continue; } if (seen.has(e.id)) err.push(`duplicate id ${e.id}`); seen.add(e.id); } };
  uniq('building', raw.buildings); uniq('property', raw.properties); uniq('shop', raw.shops); uniq('billboard', raw.billboards); uniq('venue', raw.venues); uniq('plot', raw.plots || []); uniq('road', raw.roads); uniq('busstop', raw.busStops || []); uniq('carpark', raw.carParks || []);
  const bld = new Set(raw.buildings.map(x => x.id)); for (const p of raw.properties) { if (!bld.has(p.buildingId)) err.push(`property ${p.id} has no building ${p.buildingId}`); if (!p.door || !inB(p.door.x, p.door.z)) err.push(`property ${p.id} door outside bounds`); }
  for (const s of raw.shops) if (!inB(s.x, s.z)) err.push(`shop ${s.id} outside bounds`);
  for (const v of raw.venues) { if (!inB(v.x, v.z)) err.push(`venue ${v.id} outside bounds`); if (!Array.isArray(v.stations)) err.push(`venue ${v.id} has no stations list`); }
  if (raw.buildings.length > limits.maxBuildings) err.push(`too many buildings (${raw.buildings.length} > ${limits.maxBuildings})`); if (raw.roads.length > limits.maxRoads) err.push('too many roads'); if (raw.billboards.length > limits.maxBillboards) err.push('too many billboards'); if (raw.trafficLoops.length > limits.maxTrafficLoops) err.push('too many traffic loops'); if (raw.venues.length > limits.maxVenues) err.push('too many venues');
  return err;
}
/** Lookups that need no player (by-id): merged over all cities. Ids must be unique across cities (job-location ids are per city and are not merged). */
export function mergeCities(cities) {
  const all = { propertyById: {}, shopById: {}, billboardById: {}, venueById: {}, busStopById: {}, carParkById: {}, plotById: {}, buildingById: {} }; // placeById and jobLoc are per city on purpose ('clinic', 'plaza' and job ids repeat in every city)
  for (const c of cities) for (const k of Object.keys(all)) for (const [id, v] of Object.entries(c[k] || {})) { if (all[k][id] && all[k][id] !== v) throw new Error(`city id clash: ${k} "${id}" exists in more than one city`); all[k][id] = v; }
  return all;
}
