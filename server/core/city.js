// City config loader/indexer. A "city" is a JSON file (roads, buildings, billboards, shops, jobs, spawns, traffic loops).
export function indexCity(raw) {
  const c = JSON.parse(JSON.stringify(raw));
  c.propertyById = Object.fromEntries(c.properties.map(p => [p.id, p]));
  c.shopById = Object.fromEntries(c.shops.map(s => [s.id, s]));
  c.jobLoc = Object.fromEntries(c.jobs.map(j => [j.id, j]));
  c.billboardById = Object.fromEntries(c.billboards.map(b => [b.id, b]));
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
  c.placeById = Object.fromEntries(c.places.map(p => [p.id, p]));
  return c;
}
