// City config loader/indexer. A "city" is a JSON file (roads, buildings, billboards, shops, jobs, spawns, traffic loops).
export function indexCity(raw) {
  const c = JSON.parse(JSON.stringify(raw));
  c.propertyById = Object.fromEntries(c.properties.map(p => [p.id, p]));
  c.shopById = Object.fromEntries(c.shops.map(s => [s.id, s]));
  c.jobLoc = Object.fromEntries(c.jobs.map(j => [j.id, j]));
  c.billboardById = Object.fromEntries(c.billboards.map(b => [b.id, b]));
  c.buildingById = Object.fromEntries(c.buildings.map(b => [b.id, b]));
  return c;
}
