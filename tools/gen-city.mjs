// Generates server/config/cities/lagos-mainland.json (deterministic). The JSON is the source of truth at runtime;
// re-run this only if you want to regenerate the starter district. Hand-edit the JSON freely.
import fs from 'node:fs';
let seed = 20261009; const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
const pick = (a) => a[Math.floor(rnd() * a.length)];
const ROAD_W = 14;
const roadX = [-120, 0, 120], roadZ = [-120, 0, 120];
const LAND_MIN_Z = -240, LAND_MAX_Z = 165, MIN_X = -240, MAX_X = 240;
const city = {
  id: 'lagos-mainland', name: 'Mainland District', country: 'NG', cityName: 'Lagos',
  _note: 'Data-driven city config. More districts/cities (Abuja, Port Harcourt...) = more files like this one. Fictional layout inspired by Lagos mainland.',
  bounds: { minX: MIN_X, maxX: MAX_X, minZ: -240, maxZ: LAND_MAX_Z },
  water: { minZ: LAND_MAX_Z, maxZ: 260, minX: -300, maxX: 300 },
  roads: [], buildings: [], properties: [], shops: [], jobs: [], billboards: [], spawns: [], trafficLoops: [], landmarks: [], zones: []
};
const roadNames = { x: { '-120': 'Okada Road', '0': 'Unity Avenue', '120': 'Bridge Street' }, z: { '-120': 'Danfo Drive', '0': 'Market Road', '120': 'Lagoon Drive' } };
for (const x of roadX) city.roads.push({ id: `rx${x}`, name: roadNames.x[x], x1: x, z1: LAND_MIN_Z, x2: x, z2: LAND_MAX_Z, width: ROAD_W });
for (const z of roadZ) city.roads.push({ id: `rz${z}`, name: roadNames.z[z], x1: MIN_X, z1: z, x2: MAX_X, z2: z, width: ROAD_W });

// block grid
const xs = [[-240, -120], [-120, 0], [0, 120], [120, 240]];
const zs = [[-240, -120], [-120, 0], [0, 120], [120, 165]];
const half = ROAD_W / 2;
const palette = ['#e8d5b0', '#cfa77a', '#b9c7d4', '#d9bfc0', '#a8c3a0', '#e3c870', '#c9b9d9', '#f0e6d2', '#9fb7b9', '#d8a28c'];
const towerPal = ['#7e98b3', '#8fa7a0', '#a3a3b8', '#b0a090'];
let bid = 0, hid = 0;
const props = [];
// house tiers
const TIERS = {
  1: { label: 'Face-me-I-face-you room', rent: 1500, price: 0, w: 22, d: 18, h: 6, floors: 2 },
  2: { label: 'Mini-flat', rent: 4000, price: 150000, w: 24, d: 22, h: 9, floors: 3 },
  3: { label: 'Duplex', rent: 9000, price: 450000, w: 28, d: 26, h: 10, floors: 3 }
};
const houseNames = ['Yaba Corner', 'Surulere Lodge', 'Mushin Court', 'Bariga Rooms', 'Ikeja View', 'Maryland Flats', 'Ojuelegba Place', 'Gbagada Heights', 'Lekki Phase', 'Ajegunle Rooms', 'Festac Duplex', 'Ilupeju House', 'Oshodi Block', 'Apapa Terrace', 'Ketu Rooms', 'Ojota Villa', 'Akoka Flats', 'Anthony Close', 'Isale Eko House', 'Palmgrove Court', 'Obalende Rooms', 'Ebute Metta Lodge'];
function addBuilding(b) { b.id = `b${String(++bid).padStart(3, '0')}`; city.buildings.push(b); return b; }
function faceFor(cx, cz, bx0, bx1, bz0, bz1) { // nearest block edge => front faces that road
  const d = { n: cz - bz0, s: bz1 - cz, w: cx - bx0, e: bx1 - cx };
  const k = Object.keys(d).sort((a, b) => d[a] - d[b])[0];
  return { n: [0, -1], s: [0, 1], w: [-1, 0], e: [1, 0] }[k];
}
const plan = { // block (i,j) -> 4 plot kinds [nw, ne, sw, se]
  '0,0': ['house1', 'house1', 'house2', 'empty'], '1,0': ['house2', 'house1', 'house1', 'house3'], '2,0': ['tower', 'house2', 'house1', 'house2'], '3,0': ['airport', 'airport', 'empty', 'empty'],
  '0,1': ['house1', 'house2', 'house1', 'house1'], '1,1': ['plaza', 'plaza', 'market', 'market'], '2,1': ['tower', 'shop_mart', 'shop_canteen', 'tower'], '3,1': ['house3', 'house2', 'house1', 'house3'],
  '0,2': ['house2', 'house1', 'house3', 'house2'], '1,2': ['house1', 'house3', 'house1', 'busstop'], '2,2': ['shop_suya', 'tower', 'dispatch', 'house2'], '3,2': ['house1', 'house2', 'house1', 'pos'],
  '0,3': ['prom', 'prom', 'prom', 'prom'], '1,3': ['prom', 'prom', 'prom', 'prom'], '2,3': ['prom', 'prom', 'prom', 'prom'], '3,3': ['prom', 'prom', 'prom', 'prom']
};
const shopDefs = {
  shop_mart: { id: 'shop_mart', name: 'Corner Mart', desc: 'Provisions, drinks and snacks.', sign: '#2c6fbb', items: [
    { id: 'water', name: 'Sachet water (pure water)', price: 150, hunger: 3, energy: 4 },
    { id: 'pie', name: 'Meat pie', price: 400, hunger: 20, energy: 0 },
    { id: 'energy_drink', name: 'Energy drink', price: 600, hunger: 0, energy: 28 } ] },
  shop_canteen: { id: 'shop_canteen', name: 'Mama Put Canteen', desc: 'Jollof, rice and stew. Proper food.', sign: '#c8553d', items: [
    { id: 'jollof', name: 'Jollof rice + chicken', price: 1500, hunger: 55, energy: 8 },
    { id: 'amala', name: 'Amala + ewedu', price: 1100, hunger: 45, energy: 6 },
    { id: 'zobo', name: 'Zobo drink', price: 300, hunger: 5, energy: 6 } ] },
  shop_suya: { id: 'shop_suya', name: 'Suya Spot', desc: 'Hot suya off the grill, late.', sign: '#8a3b12', items: [
    { id: 'suya', name: 'Suya (pepper, no onions)', price: 900, hunger: 32, energy: 3 },
    { id: 'bread', name: 'Agege bread', price: 350, hunger: 18, energy: 0 } ] }
};
const jobLoc = {}; 
const addProp = (b, tier, cx, cz, face) => {
  const t = TIERS[tier]; hid++;
  const id = `h${String(hid).padStart(2, '0')}`;
  const name = houseNames[(hid - 1) % houseNames.length];
  const door = [+(cx + face[0] * (b.d > 0 ? ((face[0] ? b.w : b.d) / 2 + 3) : 3)).toFixed(1), +(cz + face[1] * ((face[0] ? b.w : b.d) / 2 + 3)).toFixed(1)];
  // note: w is x-size, d is z-size
  const dx = face[0] ? b.w / 2 : b.d / 2; // overwritten below for clarity
  const doorX = +(cx + face[0] * (b.w / 2 + 3)).toFixed(1), doorZ = +(cz + face[1] * (b.d / 2 + 3)).toFixed(1);
  city.properties.push({ id, buildingId: b.id, name, tier, tierLabel: t.label, rent: t.rent, price: t.price, door: { x: doorX, z: doorZ }, rooms: tier === 1 ? 1 : tier === 2 ? 2 : 4 });
  b.propertyId = id;
};
for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
  const [x0, x1] = xs[i], [z0, z1] = zs[j];
  const bx0 = x0 + (x0 === MIN_X ? 4 : half + 3), bx1 = x1 - (x1 === MAX_X ? 4 : half + 3);
  const bz0 = z0 + (z0 === -240 ? 4 : half + 3), bz1 = z1 - (z1 === LAND_MAX_Z ? 2 : half + 3);
  const kinds = plan[`${i},${j}`]; const mx = (bx0 + bx1) / 2, mz = (bz0 + bz1) / 2;
  const plots = [[bx0, mx, bz0, mz], [mx, bx1, bz0, mz], [bx0, mx, mz, bz1], [mx, bx1, mz, bz1]];
  city.zones.push({ id: `blk${i}${j}`, x0: bx0, x1: bx1, z0: bz0, z1: bz1 });
  kinds.forEach((kind, k) => {
    const [px0, px1, pz0, pz1] = plots[k]; const pcx = (px0 + px1) / 2, pcz = (pz0 + pz1) / 2;
    const pw = px1 - px0, pd = pz1 - pz0; const face = faceFor(pcx, pcz, bx0, bx1, bz0, bz1);
    // keep every building away from block edges by >= 9 m so billboards (placed 3m off the block edge) never clip
    const maxW = pw - 18, maxD = pd - 18;
    if (kind === 'empty') return;
    if (kind.startsWith('house')) {
      const tier = +kind.slice(5); const t = TIERS[tier];
      const w = Math.min(t.w + Math.round(rnd() * 4), maxW), d = Math.min(t.d + Math.round(rnd() * 4), maxD);
      const b = addBuilding({ kind: 'house', tier, x: +pcx.toFixed(1), z: +pcz.toFixed(1), w, d, h: t.h, floors: t.floors, color: pick(palette), roof: pick(['#8b3a2f', '#555a63', '#6b4a3a', '#3d5a4a']), face });
      addProp(b, tier, pcx, pcz, face);
    } else if (kind === 'tower') {
      addBuilding({ kind: 'tower', x: +pcx.toFixed(1), z: +pcz.toFixed(1), w: Math.min(34, maxW), d: Math.min(30, maxD), h: 38 + Math.round(rnd() * 26), floors: 12, color: pick(towerPal), face });
    } else if (kind.startsWith('shop_')) {
      const def = shopDefs[kind];
      const b = addBuilding({ kind: 'shop', x: +pcx.toFixed(1), z: +pcz.toFixed(1), w: Math.min(30, maxW), d: Math.min(24, maxD), h: 7, floors: 1, color: '#efe3c8', sign: def.sign, label: def.name, face, shopId: def.id });
      const w = b.w, d = b.d;
      city.shops.push({ id: def.id, name: def.name, desc: def.desc, buildingId: b.id, x: +(pcx + face[0] * (w / 2 + 3)).toFixed(1), z: +(pcz + face[1] * (d / 2 + 3)).toFixed(1), items: def.items });
    } else if (kind === 'market') {
      addBuilding({ kind: 'market', x: +pcx.toFixed(1), z: +pcz.toFixed(1), w: Math.min(40, maxW + 6), d: Math.min(36, maxD + 6), h: 4.5, floors: 1, color: '#d9a441', label: 'Balogun-style Market', face, noCollide: false });
      jobLoc.job_market = { x: +(pcx + face[0] * 24).toFixed(1), z: +(pcz + face[1] * 22).toFixed(1) };
    } else if (kind === 'plaza') {
      if (k === 0) city.landmarks.push({ id: 'plaza', kind: 'plaza', x: +(bx1).toFixed(1), z: +(bz1).toFixed(1), name: 'Unity Plaza' });
    } else if (kind === 'dispatch') {
      const b = addBuilding({ kind: 'office', x: +pcx.toFixed(1), z: +pcz.toFixed(1), w: Math.min(28, maxW), d: Math.min(22, maxD), h: 8, floors: 2, color: '#e07b39', label: 'Rider Dispatch Hub', face });
      jobLoc.job_rider = { x: +(pcx + face[0] * (b.w / 2 + 3)).toFixed(1), z: +(pcz + face[1] * (b.d / 2 + 3)).toFixed(1) };
    } else if (kind === 'pos') {
      const b = addBuilding({ kind: 'office', x: +pcx.toFixed(1), z: +pcz.toFixed(1), w: Math.min(16, maxW), d: Math.min(14, maxD), h: 5, floors: 1, color: '#f2c744', label: 'POS & Airtime', face });
      jobLoc.job_pos = { x: +(pcx + face[0] * (b.w / 2 + 3)).toFixed(1), z: +(pcz + face[1] * (b.d / 2 + 3)).toFixed(1) };
    } else if (kind === 'busstop') {
      addBuilding({ kind: 'office', x: +pcx.toFixed(1), z: +pcz.toFixed(1), w: Math.min(26, maxW), d: Math.min(18, maxD), h: 5, floors: 1, color: '#6aa0d0', label: 'Bus Park', face });
      jobLoc.job_bus = { x: +(pcx + face[0] * 20).toFixed(1), z: +(pcz + face[1] * 18).toFixed(1) };
    } else if (kind === 'airport') {
      if (k === 0) addBuilding({ kind: 'airport', x: +((bx0 + bx1) / 2).toFixed(1), z: +(bz0 + 38).toFixed(1), w: 100, d: 50, h: 14, floors: 3, color: '#dfe6ee', label: 'Airport Terminal (placeholder)', face: [0, 1] });
    } else if (kind === 'prom') {
      if (k >= 2) { // thin promenade row: put a low kiosk occasionally
        if (rnd() < 0.5) addBuilding({ kind: 'kiosk', x: +pcx.toFixed(1), z: +(pcz + 4).toFixed(1), w: 10, d: 8, h: 4, floors: 1, color: pick(palette), face: [0, 1] });
      }
    }
  });
}
// jobs (fall back to sensible default if a location is missing)
const jobMeta = {
  job_shop: { x: city.shops.find(s => s.id === 'shop_mart').x - 8, z: city.shops.find(s => s.id === 'shop_mart').z, label: 'Corner Mart (staff entrance)' },
  job_rider: { ...jobLoc.job_rider, label: 'Rider Dispatch Hub' },
  job_pos: { ...jobLoc.job_pos, label: 'POS kiosk' },
  job_bus: { ...jobLoc.job_bus, label: 'Bus Park' },
  job_market: { ...jobLoc.job_market, label: 'Market stall' }
};
// market stall shop (cheapest price channel) at the market job point
city.shops.push({ id: 'shop_market', name: 'Balogun-style Market Stall', desc: 'Cheapest prices in the district. Haggle not included.', buildingId: null, x: jobLoc.job_market.x - 10, z: jobLoc.job_market.z, channel: 'market', items: [
  { id: 'water', name: 'Sachet water (pure water)', price: 150, hunger: 3, energy: 4 }, { id: 'bread', name: 'Agege bread', price: 350, hunger: 18, energy: 0 },
  { id: 'rice', name: 'Rice and stew (small)', price: 900, hunger: 38, energy: 5 }, { id: 'zobo', name: 'Zobo drink', price: 300, hunger: 5, energy: 6 }, { id: 'pie', name: 'Meat pie', price: 400, hunger: 20, energy: 0 } ] });
for (const sh of city.shops) if (!sh.channel) sh.channel = 'supermarket';
city.jobs = Object.entries(jobMeta).map(([id, v]) => ({ id, x: +v.x.toFixed(1), z: +v.z.toFixed(1), label: v.label }));
const bb = (id, surface, tier, x, z, nx, nz, w, h, y = 9) => city.billboards.push({ id, surface, tier, x, z, nx, nz, w, h, y });
bb('bb01', 'road_billboard', 'street', -60, -110, 0, -1, 12, 6);
bb('bb02', 'road_billboard', 'street', 60, -110, 0, -1, 12, 6);
bb('bb03', 'road_billboard', 'street', -110, 60, -1, 0, 12, 6);
bb('bb04', 'road_billboard', 'major', 110, -60, 1, 0, 12, 6);
bb('bb05', 'road_billboard', 'major', -60, 10, 0, -1, 12, 6);
bb('bb06', 'road_billboard', 'major', 60, -10, 0, 1, 12, 6);
bb('bb07', 'road_billboard', 'mega', -100, 112, 0, 1, 16, 8, 11);
bb('bb08', 'road_billboard', 'mega', 100, 110, 0, -1, 16, 8, 11);
bb('ap01', 'airport_board', 'standard', 160, -170, 0, 1, 12, 6);
bb('ap02', 'airport_board', 'standard', 205, -170, 0, 1, 12, 6);
for (const [i, x] of [-150, -50, 50, 150].entries()) bb(`lg0${i + 1}`, 'lagoon_plot', 'plot6x6', x, 205, 0, -1, 24, 24, 13);
city.spawns = [{ x: -12, z: -12 }, { x: 12, z: -12 }, { x: -12, z: 12 }, { x: 12, z: 12 }, { x: 0, z: 22 }, { x: -24, z: 0 }].map(s => ({ x: s.x, z: s.z, ry: 0 }));
// traffic loops (clockwise, right-hand traffic) offset 3.5 m into the lane
const L = 3.5; const ring = (x0, z0, x1, z1) => [[x0 + L, z0 + L], [x1 - L, z0 + L], [x1 - L, z1 - L], [x0 + L, z1 - L]];
city.trafficLoops = [
  { id: 'big', pts: ring(-120, -120, 120, 120), npcs: ['danfo', 'car', 'keke'] },
  { id: 'nw', pts: ring(-120, -120, 0, 0), npcs: ['car', 'okada'] }, { id: 'ne', pts: ring(0, -120, 120, 0), npcs: ['danfo', 'car'] },
  { id: 'se', pts: ring(0, 0, 120, 120), npcs: ['keke', 'car', 'okada'] }, { id: 'sw', pts: ring(-120, 0, 0, 120), npcs: ['danfo', 'keke'] }
];
// land plots (empty lots): ESTIMATE prices; growth/week and omo-onile risk are placeholders
const plotDefs = [['Ikorodu Gardens', 'Ikorodu', 600, 1500000, 0.02, 'high'], ['Epe Green Estate', 'Epe', 600, 2500000, 0.03, 'medium'], ['Ibeju Corridor Lot', 'Ibeju-Lekki', 600, 4000000, 0.04, 'high'], ['Lekki Phase 2 (C of O)', 'Lekki Phase 2', 600, 15000000, 0.025, 'low']];
city.plots = []; const lots = city.zones.filter(z => z.id === 'blk00' || z.id === 'blk30');
const lotCenters = [[-156, -156], [156, -152], [209, -152], [-30, 141]]; // hand-placed in empty lots
plotDefs.forEach((d, i) => city.plots.push({ id: `p${i + 1}`, name: d[0], area: d[1], sqm: d[2], price: d[3], growthPerWeek: d[4], risk: d[5], x: lotCenters[i][0], z: lotCenters[i][1], size: i === 3 ? 16 : 26 }));
// venues: enterable rooms with stations (data-driven). Room coordinates are metres from the room centre (door on the +z wall).
const kiosks = city.buildings.filter(b => b.kind === 'kiosk').sort((a, b) => a.x - b.x); const kd = (b) => ({ buildingId: b.id, x: +b.x.toFixed(1), z: +(b.z - b.d / 2 - 3).toFixed(1) });
const canteen = city.shops.find(x => x.id === 'shop_canteen');
const poster = { id: 'poster', type: 'poster', label: 'Rules poster', x: -3.4, z: 2.2, color: '#f0c419', text: 'GAME MONEY ONLY. Stakes are pretend naira with no cash value and no cash-out. 18+. Be respectful: you can be reported, muted or blocked.' };
const board = (x, z) => ({ id: 'board', type: 'board', label: 'Weekly scoreboard', x, z, color: '#1f6f4a' });
// named districts (data-driven: the server's area() lookup and the full map both read these; first match wins, so list small/special areas first)
// housing styles (interior type per property). Prices/rents of the new types are ESTIMATE placeholders.
{ const seq = { 1: ['faceyou', 'faceyou', 'selfcon'], 2: ['flat2', 'bungalow'], 3: ['duplex', 'mansion', 'duplex', 'mansion', 'duplex'] }; const n = { 1: 0, 2: 0, 3: 0 };
  for (const p of city.properties) { const st = seq[p.tier][n[p.tier]++ % seq[p.tier].length]; p.style = st;
    if (st === 'selfcon') { p.tierLabel = 'Self-contain studio'; p.rent = 2200; } if (st === 'bungalow') { p.tierLabel = 'Bungalow'; p.rooms = 3; p.rent = 5200; p.price = 220000; }
    if (st === 'mansion') { p.tierLabel = 'Mansion'; p.rooms = 6; p.rent = 16000; p.price = 900000; } if (st === 'flat2') p.tierLabel = '2-bedroom flat'; } }
city.districts = [
  { id: 'd_lagoon', name: 'Lagoon Front', x0: -240, x1: 240, z0: 125, z1: 165, color: '#9ec9d8' },
  { id: 'd_yaba', name: 'Yaba', x0: -240, x1: 0, z0: -240, z1: 0, color: '#d9c7a3' },
  { id: 'd_ikeja', name: 'Ikeja', x0: 0, x1: 240, z0: -240, z1: 0, color: '#c9d4a8' },
  { id: 'd_surulere', name: 'Surulere', x0: -240, x1: 0, z0: 0, z1: 125, color: '#d8b9a5' },
  { id: 'd_lekki', name: 'Lekki Phase 1', x0: 0, x1: 240, z0: 0, z1: 125, color: '#cdbfd9' }
];
city.venues = [
  { id: 'venue_mamaput', name: 'Mama Put Canteen', blurb: 'Eat, then challenge somebody to Whot or Ayo.', x: canteen.x, z: canteen.z, shopId: 'shop_canteen', hours: [6, 22], sign: '#c8553d', stations: [
    { id: 'counter', type: 'eat', label: 'Food counter', x: 0, z: -2.8, color: '#c8553d', shopId: 'shop_canteen' }, { id: 'whot1', type: 'game', game: 'whot', label: 'Whot bench', x: -2, z: 0.4, color: '#8a5a2b' }, { id: 'ayo1', type: 'game', game: 'ayo', label: 'Ayo board', x: 1.4, z: 1.8, color: '#6b4226' }, { id: 'word1', type: 'casual', game: 'word', label: 'Word of the Day board', x: -3.2, z: -0.9, color: '#c8a23d' }, board(2.6, -1.2), poster] },
  { id: 'venue_viewing', name: "Alhaji Joe's Viewing Centre", blurb: 'Watch the match. Whot and Draughts at the back.', ...kd(kiosks[0]), hours: [10, 24], sign: '#2a5f9e', stations: [
    { id: 'tv', type: 'tv', label: 'Big TV (watch the match)', x: 0, z: -3, color: '#222', mood: 4 }, { id: 'whot1', type: 'game', game: 'whot', label: 'Whot bench 1', x: -2.2, z: 0.6, color: '#8a5a2b' }, { id: 'whot2', type: 'game', game: 'whot', label: 'Whot bench 2', x: 2.2, z: 0.6, color: '#8a5a2b' }, { id: 'draughts1', type: 'game', game: 'draughts', label: 'Draughts board', x: 0, z: 2.6, color: '#3b3b3b' }, { id: 'merge1', type: 'casual', game: 'merge', label: 'Merge Am (tile puzzle)', x: -3.4, z: -1.5, color: '#2a9d8f' }, board(3, -1.8), poster] },
  { id: 'venue_joint', name: 'Corner Joint (Ludo, Whot, Dominoes)', blurb: 'Ludo and Dominoes for up to four, plus a Whot bench. Table talk allowed (clean).', ...kd(kiosks[kiosks.length - 1]), hours: [12, 24], sign: '#7a4ea0', stations: [
    { id: 'ludo1', type: 'game', game: 'ludo', label: 'Ludo table 1', x: -2.2, z: -0.6, color: '#2e7dd1' }, { id: 'ludo2', type: 'game', game: 'ludo', label: 'Ludo table 2', x: 2.2, z: -0.6, color: '#d6402f' }, { id: 'whot1', type: 'game', game: 'whot', label: 'Whot bench', x: 0, z: 1.6, color: '#8a5a2b' }, { id: 'domino1', type: 'game', game: 'dominoes', label: 'Dominoes table', x: 2.9, z: 2.0, color: '#1f4e3d' }, { id: 'memory1', type: 'casual', game: 'memory', label: 'Pair Am (memory cards)', x: -3.4, z: 0.9, color: '#e76f51' }, board(0, -3), poster] },
  { id: 'venue_meco', name: 'Meco', blurb: 'Car repair and service. Fees are ESTIMATES.', ...kd(kiosks[1]), hours: [8, 18], sign: '#e07b00', stations: [
    { id: 'check', type: 'check', label: 'Check my car', x: -2.2, z: -1.6, color: '#3a7ca5' }, { id: 'service', type: 'service', label: 'Service (fee)', x: 2.2, z: -1.6, color: '#e07b00' },
    { id: 'poster', type: 'poster', label: 'Price board', x: 0, z: 2.6, color: '#f0c419', text: 'Meco: placeholder service fees are ESTIMATES. A service resets your car condition and gives a short perk (cheaper fuel per metre, a little extra mood on rides). Game money only.' }] },
  { id: 'venue_motors', name: 'Naija Auto Mart (placeholder showroom)', blurb: 'Look at the cars. Prices are ESTIMATES.', ...kd(kiosks[Math.floor(kiosks.length / 2)]), hours: [9, 19], sign: '#b8322a', stations: [
    { id: 'car_kekere', type: 'car', model: 'kekere', label: 'Kekere Hatch (used)', x: -2.4, z: -1.8, color: '#e9c46a' }, { id: 'car_oga', type: 'car', model: 'oga', label: 'Oga Sedan', x: 0.4, z: -2.2, color: '#457b9d' },
    { id: 'car_bigboy', type: 'car', model: 'bigboy', label: 'Big Boy SUV', x: 2.8, z: -1.4, color: '#2b2d42' }, { id: 'car_senator', type: 'car', model: 'senator', label: 'Senator Executive', x: 0.4, z: 0.6, color: '#d62828' }] }
];
// ---- new venues: two clubs and two salons (GENERIC names, no real brands) on four new kiosk doors along the south promenade
for (const [x, tag] of [[40, 'club1'], [150, 'club2'], [-195, 'salon1'], [-60, 'salon2']]) {
  const clash = city.buildings.some(b => Math.abs(b.x - x) < (b.w + 12) / 2 + 2 && Math.abs(b.z - 158.8) < (b.d + 9) / 2 + 2); if (clash) throw new Error('kiosk clash for ' + tag);
  city.buildings.push({ kind: 'kiosk', x, z: 158.8, w: 12, d: 9, h: 4, floors: 1, color: tag.startsWith('club') ? '#6a4c93' : '#e5989b', face: [0, 1], id: `b${String(city.buildings.length + 1).padStart(3, '0')}`, tag });
}
const nk = (tag) => kd(city.buildings.find(b => b.tag === tag));
city.venues.push(
  { id: 'venue_club1', name: 'Midnight Lounge (club)', blurb: 'Dance floor, DJ booth, bar and a VIP corner. Game money only. 18+.', ...nk('club1'), hours: [20, 24], sign: '#6a4c93', kind: 'club', stations: [
    { id: 'dance', type: 'dance', label: 'Dance floor', x: 0, z: 0.8, color: '#7b2cbf' }, { id: 'dj', type: 'dj', label: 'DJ booth', x: 0, z: -3.9, color: '#222222' }, { id: 'bar', type: 'bar', label: 'Bar (soft drinks)', x: -4.3, z: -0.4, color: '#8a5a2b', fee: 300 },
    { id: 'songs', type: 'songs', label: 'Song slot board', x: 4.6, z: -2.4, color: '#1d3557' }, { id: 'vip', type: 'vip', label: 'VIP corner', x: 4.0, z: 2.6, color: '#9d0208', fee: 1000 }, { id: 'poster', type: 'poster', label: 'House rules', x: -4.4, z: 3.2, color: '#f0c419', text: 'Game money only. 18+. Soft drinks only in this version (no alcohol is simulated). Be respectful: you can be reported, muted or blocked. Fees are ESTIMATE placeholders.' }] },
  { id: 'venue_club2', name: 'Sunset Rooftop Club', blurb: 'A chilled rooftop vibe: lounge, bar and dancing under the lights.', ...nk('club2'), hours: [18, 24], sign: '#f77f00', kind: 'club', stations: [
    { id: 'dance', type: 'dance', label: 'Dance floor', x: 0, z: 0.8, color: '#f77f00' }, { id: 'dj', type: 'dj', label: 'DJ booth', x: 0, z: -3.9, color: '#222222' }, { id: 'bar', type: 'bar', label: 'Bar (soft drinks)', x: -4.3, z: -0.4, color: '#6b4226', fee: 300 },
    { id: 'songs', type: 'songs', label: 'Song slot board', x: 4.6, z: -2.4, color: '#1d3557' }, { id: 'vip', type: 'vip', label: 'VIP corner', x: 4.0, z: 2.6, color: '#9d0208', fee: 1000 }] },
  { id: 'venue_salon1', name: 'Fresh Cut Barbers', blurb: 'A clean cut and a mirror. Placeholder fees (ESTIMATE).', ...nk('salon1'), hours: [9, 19], sign: '#0077b6', kind: 'salon', stations: [
    { id: 'chair1', type: 'style', label: 'Barber chair 1', x: -2.4, z: -2.6, color: '#c1121f' }, { id: 'chair2', type: 'style', label: 'Barber chair 2', x: 0.4, z: -2.6, color: '#c1121f' }, { id: 'basin', type: 'basin', label: 'Wash basin', x: 3.2, z: -2.6, color: '#e9ecef' },
    { id: 'poster', type: 'poster', label: 'Price board', x: -3.6, z: 2.0, color: '#f0c419', text: 'Cuts and styles: placeholder fees (ESTIMATE). A style gives a small mood boost and a "fresh" look for a while. Game money only.' }] },
  { id: 'venue_salon2', name: 'Glow Beauty Salon', blurb: 'Braids, twists and gele. Placeholder fees (ESTIMATE).', ...nk('salon2'), hours: [9, 19], sign: '#e5989b', kind: 'salon', stations: [
    { id: 'chair1', type: 'style', label: 'Styling chair 1', x: -2.4, z: -2.6, color: '#d63384' }, { id: 'chair2', type: 'style', label: 'Styling chair 2', x: 0.4, z: -2.6, color: '#d63384' }, { id: 'basin', type: 'basin', label: 'Wash basin', x: 3.2, z: -2.6, color: '#e9ecef' },
    { id: 'poster', type: 'poster', label: 'Price board', x: -3.6, z: 2.0, color: '#f0c419', text: 'Braids, twists, gele: placeholder fees (ESTIMATE). Game money only.' }] }
);
// ---- interior room specs per venue (metres from the room centre; door on the +z wall). Every venue has its own look; all from primitives on the client.
const ck = (a, b) => ({ style: 'checker', a, b }), pl = (a, b) => ({ style: 'planks', a, b }), pn = (a) => ({ style: 'plain', a });
const ROOMS = {
  venue_mamaput: { w: 9, d: 9, wall: '#f6e3b8', trim: '#c8553d', floor: ck('#eadcb8', '#d9c394'), windows: [{ wall: 'back', at: -2.6, w: 1.6 }, { wall: 'back', at: 2.6, w: 1.6 }, { wall: 'left', at: 1, w: 1.6 }], mood: 'warm',
    decor: [{ k: 'shelf', x: -3.6, z: -4.2, c: '#8a5a2b', pots: true }, { k: 'shelf', x: 3.6, z: -4.2, c: '#8a5a2b', pots: true }, { k: 'fridge', x: 4.0, z: -3.0 }, { k: 'stool', x: -3.2, z: -0.9, c: '#e63946' }, { k: 'stool', x: -0.9, z: -0.1, c: '#e63946' }, { k: 'stool', x: -2.3, z: 1.6, c: '#e63946' }, { k: 'table', x: 3.4, z: 3.2, c: '#fff' }, { k: 'stool', x: 2.6, z: 3.2, c: '#457b9d' }, { k: 'stool', x: 4.2, z: 3.2, c: '#457b9d' }, { k: 'lanterns', z: -1.6, c: ['#ffd166', '#ef476f', '#06d6a0'] }, { k: 'fan', x: 0, z: 0 }, { k: 'plant', x: 4.1, z: 0.8 }, { k: 'menu', x: 0, z: -4.4, text: 'MAMA PUT' }] },
  venue_viewing: { w: 9, d: 9, wall: '#2b3a5a', trim: '#2a5f9e', floor: pn('#4a4036'), windows: [{ wall: 'left', at: -1.5, w: 1.4, blind: true }, { wall: 'left', at: 2, w: 1.4, blind: true }], mood: 'dim',
    decor: [{ k: 'bench', x: -1.4, z: -1.3, w: 2.4 }, { k: 'bench', x: 1.4, z: -1.3, w: 2.4 }, { k: 'bench', x: 0, z: -0.3, w: 3.2 }, { k: 'speaker', x: -2.4, z: -4.0 }, { k: 'speaker', x: 2.4, z: -4.0 }, { k: 'pennants', z: -2.2, c: ['#008751', '#ffffff', '#008751', '#ffd166'] }, { k: 'fridge', x: 4.0, z: 3.0 }, { k: 'plant', x: -4.0, z: -4.0 }, { k: 'menu', x: -3.6, z: -4.4, text: 'MATCH DAY' }] },
  venue_joint: { w: 9, d: 9, wall: '#4b2e6f', trim: '#7a4ea0', floor: pl('#6b4a2e', '#5a3d27'), windows: [], mood: 'neon',
    decor: [{ k: 'neon', x: 0, z: -4.35, text: 'CORNER JOINT', c: '#ff4fd8' }, { k: 'lamp', x: -2.2, z: -0.6, c: '#2e7dd1' }, { k: 'lamp', x: 2.2, z: -0.6, c: '#d6402f' }, { k: 'lamp', x: 0, z: 1.6, c: '#e0a020' }, { k: 'lamp', x: 2.9, z: 2.0, c: '#2e9b5e' }, { k: 'rug', x: 0, z: 0.4, w: 6, d: 3, c: '#3a1f55' }, { k: 'plant', x: -4.0, z: -3.8 }, { k: 'plant', x: 4.0, z: -3.8 }, { k: 'speaker', x: 4.1, z: 0.6 }, { k: 'stool', x: -0.9, z: 2.4, c: '#ff9f1c' }, { k: 'stool', x: 0.9, z: 2.4, c: '#ff9f1c' }] },
  venue_meco: { w: 9, d: 9, wall: '#d4d4cc', trim: '#e07b00', floor: ck('#9a9a96', '#8a8a86'), windows: [{ wall: 'left', at: -2, w: 1.4 }, { wall: 'left', at: 2, w: 1.4 }], mood: 'work',
    decor: [{ k: 'lift', x: 0, z: -3.0 }, { k: 'toolwall', x: -3.0, z: -4.4 }, { k: 'toolwall', x: 3.2, z: -4.4 }, { k: 'tyres', x: -4.0, z: 2.8 }, { k: 'tyres', x: 4.0, z: 2.8 }, { k: 'drum', x: 4.1, z: -2.4 }, { k: 'drum', x: 3.5, z: -2.8 }, { k: 'hazard', x: 0, z: 0.6, w: 6, d: 0.8 }, { k: 'bench2', x: -4.0, z: -0.4 }, { k: 'menu', x: 0, z: -4.4, text: 'MECO' }] },
  venue_motors: { w: 9, d: 9, wall: '#eef3f7', trim: '#b8322a', floor: ck('#f4f4f4', '#cfd8dc'), windows: [{ wall: 'back', at: -2.8, w: 2.6, big: true }, { wall: 'back', at: 2.8, w: 2.6, big: true }, { wall: 'left', at: 0, w: 4, big: true }], mood: 'bright',
    decor: [{ k: 'turntable', x: -2.4, z: -1.8 }, { k: 'turntable', x: 0.4, z: -2.2 }, { k: 'turntable', x: 2.8, z: -1.4 }, { k: 'turntable', x: 0.4, z: 0.6 }, { k: 'spot', x: -2.4, z: -1.8, c: '#fff6c8' }, { k: 'spot', x: 0.4, z: -2.2, c: '#fff6c8' }, { k: 'spot', x: 2.8, z: -1.4, c: '#fff6c8' }, { k: 'spot', x: 0.4, z: 0.6, c: '#fff6c8' }, { k: 'desk', x: -3.4, z: 3.2 }, { k: 'plant', x: -4.1, z: -4.0 }, { k: 'plant', x: 4.1, z: 3.4 }, { k: 'menu', x: 0, z: -4.4, text: 'AUTO MART' }] },
  venue_club1: { w: 11, d: 10, wall: '#14101f', trim: '#7b2cbf', floor: { style: 'dance', a: '#1b1530', b: '#2a1f4a' }, windows: [], mood: 'club', door: 'Enter',
    decor: [{ k: 'stage', x: 0, z: -4.2, w: 6, d: 1.8 }, { k: 'speaker', x: -3.4, z: -4.2, tall: true }, { k: 'speaker', x: 3.4, z: -4.2, tall: true }, { k: 'rig' }, { k: 'discoball', x: 0, z: 0.8 }, { k: 'bar', x: -4.9, z: -0.4, len: 4 }, { k: 'barstool', x: -4.0, z: -1.6 }, { k: 'barstool', x: -4.0, z: -0.4 }, { k: 'barstool', x: -4.0, z: 0.8 }, { k: 'sofa', x: 4.4, z: 3.8, c: '#9d0208', rot: 0 }, { k: 'sofa', x: 3.2, z: 2.4, c: '#9d0208', rot: 1 }, { k: 'rope', x: 4.0, z: 1.1, w: 2.4 }, { k: 'ledstrip', c: '#7b2cbf' }] },
  venue_club2: { w: 11, d: 10, wall: '#2d1b0e', trim: '#f77f00', floor: pl('#4a3524', '#3c2a1c'), windows: [{ wall: 'back', at: -3.6, w: 2, big: true }, { wall: 'back', at: 3.6, w: 2, big: true }], mood: 'sunset',
    decor: [{ k: 'stage', x: 0, z: -4.2, w: 5, d: 1.6 }, { k: 'speaker', x: -3.0, z: -4.2, tall: true }, { k: 'speaker', x: 3.0, z: -4.2, tall: true }, { k: 'rig', warm: true }, { k: 'lanterns', z: 1.5, c: ['#f77f00', '#fcbf49', '#eae2b7'] }, { k: 'bar', x: -4.9, z: -0.4, len: 4, c: '#6b4226' }, { k: 'barstool', x: -4.0, z: -1.6 }, { k: 'barstool', x: -4.0, z: -0.4 }, { k: 'sofa', x: 4.4, z: 3.8, c: '#bc4749', rot: 0 }, { k: 'sofa', x: 3.2, z: 2.4, c: '#bc4749', rot: 1 }, { k: 'rope', x: 4.0, z: 1.1, w: 2.4 }, { k: 'plant', x: 5.0, z: -4.4 }, { k: 'plant', x: -5.0, z: 4.2 }, { k: 'ledstrip', c: '#f77f00' }] },
  venue_salon1: { w: 9, d: 8, wall: '#e8f1f8', trim: '#0077b6', floor: ck('#ffffff', '#cde7f5'), windows: [{ wall: 'left', at: 0, w: 2.4, big: true }], mood: 'bright',
    decor: [{ k: 'mirror', x: -2.4, z: -3.9 }, { k: 'mirror', x: 0.4, z: -3.9 }, { k: 'poleSign', x: 3.9, z: 2.8 }, { k: 'dryer', x: 4.0, z: 0.4 }, { k: 'dryer', x: 4.0, z: 1.4 }, { k: 'desk', x: 1.8, z: 3.0 }, { k: 'plant', x: -4.0, z: -3.4 }, { k: 'plant', x: 4.0, z: -3.6 }, { k: 'shelf', x: 3.2, z: -3.6, c: '#adb5bd', bottles: true }, { k: 'menu', x: -3.6, z: -3.9, text: 'FRESH CUT' }] },
  venue_salon2: { w: 9, d: 8, wall: '#fde2e4', trim: '#e5989b', floor: ck('#fff1f2', '#fad2e1'), windows: [{ wall: 'left', at: 0, w: 2.4, big: true }], mood: 'bright',
    decor: [{ k: 'mirror', x: -2.4, z: -3.9, oval: true }, { k: 'mirror', x: 0.4, z: -3.9, oval: true }, { k: 'dryer', x: 4.0, z: 0.4 }, { k: 'dryer', x: 4.0, z: 1.4 }, { k: 'dryer', x: 4.0, z: 2.4 }, { k: 'desk', x: 1.8, z: 3.0 }, { k: 'plant', x: -4.0, z: -3.4 }, { k: 'plant', x: 4.0, z: -3.6 }, { k: 'shelf', x: 3.2, z: -3.6, c: '#ffcad4', bottles: true }, { k: 'menu', x: -3.6, z: -3.9, text: 'GLOW BEAUTY' }] }
};
for (const v of city.venues) v.room = ROOMS[v.id] || { w: 9, d: 9 };
fs.mkdirSync('server/config/cities', { recursive: true });
fs.writeFileSync('server/config/cities/lagos-mainland.json', JSON.stringify(city, null, 1));
console.log('buildings', city.buildings.length, 'props', city.properties.length, 'shops', city.shops.length, 'jobs', city.jobs.length, 'boards', city.billboards.length);
