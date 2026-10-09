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
city.venues = [
  { id: 'venue_mamaput', name: 'Mama Put Canteen', blurb: 'Eat, then challenge somebody to Whot or Ayo.', x: canteen.x, z: canteen.z, shopId: 'shop_canteen', hours: [6, 22], sign: '#c8553d', stations: [
    { id: 'counter', type: 'eat', label: 'Food counter', x: 0, z: -2.8, color: '#c8553d', shopId: 'shop_canteen' }, { id: 'whot1', type: 'game', game: 'whot', label: 'Whot bench', x: -2, z: 0.4, color: '#8a5a2b' }, { id: 'ayo1', type: 'game', game: 'ayo', label: 'Ayo board', x: 1.4, z: 1.8, color: '#6b4226' }, board(2.6, -1.2), poster] },
  { id: 'venue_viewing', name: "Alhaji Joe's Viewing Centre", blurb: 'Watch the match. Whot and Draughts at the back.', ...kd(kiosks[0]), hours: [10, 24], sign: '#2a5f9e', stations: [
    { id: 'tv', type: 'tv', label: 'Big TV (watch the match)', x: 0, z: -3, color: '#222', mood: 4 }, { id: 'whot1', type: 'game', game: 'whot', label: 'Whot bench 1', x: -2.2, z: 0.6, color: '#8a5a2b' }, { id: 'whot2', type: 'game', game: 'whot', label: 'Whot bench 2', x: 2.2, z: 0.6, color: '#8a5a2b' }, { id: 'draughts1', type: 'game', game: 'draughts', label: 'Draughts board', x: 0, z: 2.6, color: '#3b3b3b' }, board(3, -1.8), poster] },
  { id: 'venue_joint', name: 'Corner Joint (Ludo, Whot, Dominoes)', blurb: 'Ludo and Dominoes for up to four, plus a Whot bench. Table talk allowed (clean).', ...kd(kiosks[kiosks.length - 1]), hours: [12, 24], sign: '#7a4ea0', stations: [
    { id: 'ludo1', type: 'game', game: 'ludo', label: 'Ludo table 1', x: -2.2, z: -0.6, color: '#2e7dd1' }, { id: 'ludo2', type: 'game', game: 'ludo', label: 'Ludo table 2', x: 2.2, z: -0.6, color: '#d6402f' }, { id: 'whot1', type: 'game', game: 'whot', label: 'Whot bench', x: 0, z: 1.6, color: '#8a5a2b' }, { id: 'domino1', type: 'game', game: 'dominoes', label: 'Dominoes table', x: 2.9, z: 2.0, color: '#1f4e3d' }, board(0, -3), poster] },
  { id: 'venue_meco', name: 'Meco', blurb: 'Car repair and service. Fees are ESTIMATES.', ...kd(kiosks[1]), hours: [8, 18], sign: '#e07b00', stations: [
    { id: 'check', type: 'check', label: 'Check my car', x: -2.2, z: -1.6, color: '#3a7ca5' }, { id: 'service', type: 'service', label: 'Service (fee)', x: 2.2, z: -1.6, color: '#e07b00' },
    { id: 'poster', type: 'poster', label: 'Price board', x: 0, z: 2.6, color: '#f0c419', text: 'Meco: placeholder service fees are ESTIMATES. A service resets your car condition and gives a short perk (cheaper fuel per metre, a little extra mood on rides). Game money only.' }] },
  { id: 'venue_motors', name: 'Naija Auto Mart (placeholder showroom)', blurb: 'Look at the cars. Prices are ESTIMATES.', ...kd(kiosks[Math.floor(kiosks.length / 2)]), hours: [9, 19], sign: '#b8322a', stations: [
    { id: 'car_kekere', type: 'car', model: 'kekere', label: 'Kekere Hatch (used)', x: -2.4, z: -1.8, color: '#e9c46a' }, { id: 'car_oga', type: 'car', model: 'oga', label: 'Oga Sedan', x: 0.4, z: -2.2, color: '#457b9d' },
    { id: 'car_bigboy', type: 'car', model: 'bigboy', label: 'Big Boy SUV', x: 2.8, z: -1.4, color: '#2b2d42' }, { id: 'car_senator', type: 'car', model: 'senator', label: 'Senator Executive', x: 0.4, z: 0.6, color: '#d62828' }] }
];
fs.mkdirSync('server/config/cities', { recursive: true });
fs.writeFileSync('server/config/cities/lagos-mainland.json', JSON.stringify(city, null, 1));
console.log('buildings', city.buildings.length, 'props', city.properties.length, 'shops', city.shops.length, 'jobs', city.jobs.length, 'boards', city.billboards.length);
