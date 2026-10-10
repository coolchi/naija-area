// Pure (no DOM) model behind the full city map: everything is derived from the city JSON, so a new district or city file shows up with no code change.
// Used by map.js (drawing + input) and by tests/map.test.js.
export const KIND_COL = { house: '#8fb0c9', kiosk: '#9bc59d', market: '#e0a85c', office: '#9aa3b8', tower: '#6c7aa6', shop: '#f0c04a', airport: '#cfd8e3', hotel: '#d8b46a', landmark: '#c59be0', stadium: '#7fc08a' };
export const KIND_NAME = { house: 'House', kiosk: 'Kiosk', market: 'Market', office: 'Office block', tower: 'Tower block', shop: 'Shop', airport: 'Airport terminal', hotel: 'Hotel', landmark: 'Landmark', stadium: 'Stadium' };
export const MODEL_ICON = { mosque: '🕌', cathedral: '⛪', theatre: '🎭' };
export const KIND_ICON = { stadium: '🏟️', hotel: '🏨', club: '🎵', salon: '✂️', arts: '🎭' };
export const LM_ICON = { plaza: '⛲', clinic: '🏥', beach: '🏖️', jetty: '⛴️' };
export const VENUE_ICON = { venue_mamaput: '🍲', venue_viewing: '📺', venue_joint: '🎲', venue_meco: '🔧', venue_motors: '🚗' };
export const LAYERS = [['districts', 'Districts', '#d9c7a3'], ['roads', 'Roads and names', '#3d4046'], ['buildings', 'Buildings', '#8fb0c9'], ['venues', 'Venues and shops', '#ffc20e'], ['jobs', 'Jobs', '#4aa3ff'], ['homes', 'Homes for rent', '#e56b6f'],
  ['plots', 'Land plots', '#7fb069'], ['landmarks', 'Landmarks', '#b44cff'], ['billboards', 'Billboard spots', '#35c46b'], ['players', 'Players nearby', '#ffffff']];
export const DEFAULT_LAYERS = { districts: true, roads: true, buildings: true, venues: true, jobs: true, homes: true, plots: true, landmarks: true, billboards: false, players: true };

import { roadPts, isCurved, roadMid, nearestOnPoly } from './roadgeom.js';
const roadRect = (r) => { if (isCurved(r)) { const hw = r.width / 2; const xs = r.pts.map(p => p[0]), zs = r.pts.map(p => p[1]); return { x0: Math.min(...xs) - hw, x1: Math.max(...xs) + hw, z0: Math.min(...zs) - hw, z1: Math.max(...zs) + hw }; } const hw = r.width / 2; return { x0: Math.min(r.x1, r.x2) - (r.x1 === r.x2 ? hw : 0), x1: Math.max(r.x1, r.x2) + (r.x1 === r.x2 ? hw : 0), z0: Math.min(r.z1, r.z2) - (r.z1 === r.z2 ? hw : 0), z1: Math.max(r.z1, r.z2) + (r.z1 === r.z2 ? hw : 0) }; };
const fmt = (n) => `₦${Math.round(n).toLocaleString('en-NG')}`;

export function buildModel(city) {
  const placeOf = (id) => city.placeById?.[id] || (city.places || []).find(p => p.id === id);
  const items = []; // searchable + hittable point things
  for (const v of city.venues || []) items.push({ type: 'venue', id: v.id, name: v.name, x: v.x, z: v.z, icon: VENUE_ICON[v.id] || KIND_ICON[v.kind] || (v.shopId ? '🍲' : '🎲'), lines: [v.blurb || 'A place to hang out.', v.hours ? `Open ${v.hours[0]}:00 to ${v.hours[1]}:00` : ''], placeId: v.id, group: 'Venues' });
  for (const s of city.shops || []) if (!(city.venues || []).some(v => v.shopId === s.id)) items.push({ type: 'shop', id: s.id, name: s.name, x: s.x, z: s.z, icon: '🛒', lines: [s.desc || 'Shop'], placeId: s.id, group: 'Shops' });
  for (const j of city.jobs || []) items.push({ type: 'job', id: j.id, name: j.label, x: j.x, z: j.z, icon: '💼', lines: ['Job: start a shift here'], placeId: j.id, group: 'Jobs' });
  for (const l of city.landmarks || []) items.push({ type: 'landmark', id: l.id, name: l.name, x: l.x, z: l.z, icon: LM_ICON[l.kind] || '⛲', lines: [l.note || 'Landmark'], placeId: placeOf(l.id) ? l.id : null, group: 'Landmarks' });
  for (const s of city.boat?.stops || []) items.push({ type: 'landmark', id: s.id, name: s.name, x: s.x, z: s.z, icon: '⛵', lines: ['Boat jetty', 'Call a boat here. Fares are placeholders.'] });
  for (const l of city.carParks || []) items.push({ type: 'landmark', id: l.id, name: l.name, x: l.x, z: l.z, lot: { w: l.w, d: l.d }, icon: '🅿️', lines: ['Car park', l.fee ? `Fee ₦${l.fee} (ESTIMATE)` : 'Free parking', l.blurb || ''], placeId: null, group: 'Car parks' });
  for (const b of city.busStops || []) items.push({ type: 'landmark', id: b.id, name: b.name, x: b.x, z: b.z, icon: '🚏', lines: ['Bus stop: wait here and a danfo will stop for you.', 'Ride fares are the normal danfo fare.'], placeId: b.id, group: 'Bus stops' });
  for (const b of city.buildings) if (b.kind === 'airport') items.push({ type: 'landmark', id: b.id, name: b.label || 'Airport', x: b.x, z: b.z, icon: '✈️', lines: ['Landmark'], placeId: placeOf('airport') ? 'airport' : null, group: 'Landmarks' });
  for (const b of city.buildings) if (b.kind === 'landmark') items.push({ type: 'landmark', id: b.id, name: b.label, x: b.x, z: b.z, icon: MODEL_ICON[b.model] || '🏛️', lines: [b.sacred ? 'Landmark. A place of worship: please be respectful.' : 'Landmark'], placeId: null, group: 'Landmarks' });
  for (const l of city.links || []) items.push({ type: 'landmark', id: `link_${l.id}`, name: l.name, x: l.x, z: l.z, icon: '🌉', lines: [`Road to ${l.to}. Walk to the gate and tap Go.`, `Fare ₦${l.fare ?? 200} (ESTIMATE)`], placeId: null, group: 'Road links' });
  for (const br of city.bridges || []) items.push({ type: 'landmark', id: `bridge_${br.id}`, name: br.name, x: br.type === 'cable' ? (br.pylonX || 0) : (br.a + br.b) / 2, z: br.z, icon: '🌉', lines: [br.type === 'cable' ? 'Cable-stayed bridge with a single pylon' : 'Bridge'], placeId: null, group: 'Landmarks' });
  for (const p of city.plots || []) items.push({ type: 'plot', id: p.id, name: p.name, x: p.x, z: p.z, size: p.size, icon: '🌍', lines: [`${p.area} · ${p.sqm} sqm`, `Price ${fmt(p.price)} · growth ${(p.growthPerWeek * 100).toFixed(0)}%/week (ESTIMATE)`, `Omo-onile risk: ${p.risk}`], placeId: p.id, group: 'Land plots' });
  for (const p of city.properties || []) items.push({ type: 'house', id: p.id, name: p.name, x: p.door.x, z: p.door.z, icon: '🏠', lines: [`${p.tierLabel}`, p.price ? `Price ${fmt(p.price)}` : `Rent ${fmt(p.rent)}/week`, p.area || ''], placeId: p.id, buildingId: p.buildingId, group: 'Homes' });
  for (const b of city.billboards || []) if (b.surface !== 'lagoon_plot') items.push({ type: 'billboard', id: b.id, name: `Billboard spot ${b.id}`, x: b.x, z: b.z, icon: '🪧', lines: [`${b.tier} tier ad space (${b.w}x${b.h} m)`, 'Advertise from the ads page'], placeId: null, group: 'Billboard spots' });
  const roads = (city.roads || []).map(r => ({ ...r, pts: roadPts(r), curved: isCurved(r), rect: roadRect(r), vertical: !isCurved(r) && r.x1 === r.x2 }));
  const roundabouts = (city.roundabouts || []).map(o => ({ ...o }));
  const districts = (city.districts || []).map(d => ({ ...d }));
  const buildings = city.buildings.map(b => { const pr = (city.properties || []).find(p => p.id === b.propertyId); const kindName = KIND_NAME[b.kind] || b.kind;
    return { ...b, name: b.label || pr?.name || kindName, kindName, rect: { x0: b.x - b.w / 2, x1: b.x + b.w / 2, z0: b.z - b.d / 2, z1: b.z + b.d / 2 }, property: pr || null }; });
  const catalogue = [
    ...items.filter(i => i.type !== 'billboard'), ...roads.map(r => { const m = roadMid(r); return { type: 'road', id: r.id, name: r.name, x: m[0], z: m[1], group: 'Roads', lines: [r.curved ? 'Curved road' : `${r.vertical ? 'North-south' : 'East-west'} road`] }; }),
    ...roundabouts.map(o => ({ type: 'roundabout', id: o.id, name: o.name, x: o.x, z: o.z, group: 'Roads', lines: ['Roundabout (traffic circulates counter-clockwise on the map)'] })),
    ...districts.map(d => ({ type: 'district', id: d.id, name: d.name, x: (d.x0 + d.x1) / 2, z: (d.z0 + d.z1) / 2, group: 'Districts', lines: ['District'] }))];
  return { city, items, roads, roundabouts, districts, buildings, catalogue, bounds: city.bounds, water: city.water || null, zones: city.zones || [] };
}

/** simple ranked search over names (prefix > word start > substring) */
export function search(model, q, limit = 12) {
  const s = String(q || '').trim().toLowerCase(); if (!s) return model.catalogue.filter(i => ['venue', 'shop', 'landmark', 'district'].includes(i.type)).slice(0, limit);
  const out = []; for (const it of model.catalogue) { const n = it.name.toLowerCase(); let sc = -1; if (n.startsWith(s)) sc = 3; else if (n.split(/[\s(]+/).some(w => w.startsWith(s))) sc = 2; else if (n.includes(s) || (it.group || '').toLowerCase().startsWith(s)) sc = 1; if (sc > 0) out.push([sc, it]); }
  return out.sort((a, b) => b[0] - a[0] || a[1].name.localeCompare(b[1].name)).slice(0, limit).map(x => x[1]);
}

/** what is under world point (x, z)? k = pixels per world unit (bigger k = smaller tolerance in world units). Markers beat buildings beat plots beat roads beat districts. */
export function hitTest(model, x, z, k, layers = DEFAULT_LAYERS, extra = []) {
  const tol = 16 / k; const near = (it) => Math.hypot(it.x - x, it.z - z) <= tol;
  for (const p of extra) if (layers.players && near(p)) return { type: 'player', id: p.id, name: `@${p.name}`, x: p.x, z: p.z, lines: ['Another player nearby'] };
  const layerOf = { venue: 'venues', shop: 'venues', job: 'jobs', landmark: 'landmarks', house: 'homes', billboard: 'billboards', plot: 'plots' };
  let best = null, bd = Infinity;
  for (const it of model.items) { if (!layers[layerOf[it.type]]) continue; if (it.type === 'house' && k < 1.5) continue; if (it.type === 'plot') continue; const d = Math.hypot(it.x - x, it.z - z); if (d <= tol && d < bd) { best = it; bd = d; } }
  if (best) return best;
  if (layers.buildings) for (const b of model.buildings) if (x >= b.rect.x0 && x <= b.rect.x1 && z >= b.rect.z0 && z <= b.rect.z1) {
    const pr = b.property; return { type: 'building', id: b.id, name: b.name, x: b.x, z: b.z, rect: b.rect, icon: pr ? '🏠' : '🏢', placeId: pr?.id || null, lines: [b.kindName + (b.floors > 1 ? ` · ${b.floors} floors` : ''), pr ? `${pr.tierLabel} · rent ${fmt(pr.rent)}/week` : ''].filter(Boolean), group: 'Buildings' }; }
  if (layers.plots) for (const p of model.items) if (p.type === 'plot' && Math.abs(p.x - x) <= p.size / 2 && Math.abs(p.z - z) <= p.size / 2) return { ...p, rect: { x0: p.x - p.size / 2, x1: p.x + p.size / 2, z0: p.z - p.size / 2, z1: p.z + p.size / 2 } };
  if (layers.roads) for (const o of model.roundabouts) if (Math.hypot(x - o.x, z - o.z) <= o.outerR) return { type: 'roundabout', id: o.id, name: o.name, x: o.x, z: o.z, rect: { x0: o.x - o.outerR, x1: o.x + o.outerR, z0: o.z - o.outerR, z1: o.z + o.outerR }, lines: ['Roundabout'], group: 'Roads' };
  if (layers.roads) for (const r of model.roads) if (r.curved) { const n = nearestOnPoly(r.pts, x, z); if (n.d <= r.width / 2) return { type: 'road', id: r.id, name: r.name, x, z, rect: r.rect, lines: [`Curved road · ${r.width} m wide`], group: 'Roads' }; }
  if (layers.roads) for (const r of model.roads) if (!r.curved && x >= r.rect.x0 && x <= r.rect.x1 && z >= r.rect.z0 && z <= r.rect.z1) return { type: 'road', id: r.id, name: r.name, x, z, rect: r.rect, lines: [`${r.vertical ? 'North-south' : 'East-west'} road · ${r.width} m wide`], group: 'Roads' };
  if (layers.districts) for (const d of model.districts) if (x >= d.x0 && x < d.x1 && z >= d.z0 && z < d.z1) return { type: 'district', id: d.id, name: d.name, x, z, lines: ['District'], group: 'Districts' };
  if (model.water && z >= model.water.minZ && z <= model.water.maxZ && x >= model.water.minX && x <= model.water.maxX) return { type: 'water', id: 'water', name: 'Lagoon', x, z, lines: ['Water. No swimming!'] };
  return null;
}

/** label visibility by zoom level (k = px per world unit) */
export const labelRules = { district: (k) => k < 2.2, road: (k) => k >= 0.9, venue: (k) => k >= 1.2, shop: (k) => k >= 1.8, job: (k) => k >= 2.6, landmark: (k) => k >= 0.9, plot: (k) => k >= 1.4, house: (k) => k >= 3, building: (k) => k >= 3.6, billboard: (k) => k >= 3, player: (k) => k >= 1.5 };
