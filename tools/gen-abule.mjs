// Generates Abule (10 Oct 2026): a fictional generic village in Ogun State (Sherif: use the name as-is). Deterministic.
// Usage: node tools/gen-abule.mjs     Also adds the road link Ijebu Ode to Abule to the Ijebu config (idempotent).
// Village feel: huts and low houses, a market square, a village hall, a well, a stream with a footbridge, a farm with a farm-hand job, a goat pen,
// a small chapel (shown respectfully, sacred buffer), a palm-lined dirt road, cheap housing. NOT a real place; every position and price is invented.
import fs from 'node:fs';
import { district, SHOP, MARKET_SHOP, MAMAPUT, link, spawnsAround, write, clone, r1, curveRoad } from './lib/districts.mjs';

const fq = (b) => [r1(b.x + b.face[0] * ((b.face[0] ? b.w : b.d) / 2 + 3)), r1(b.z + b.face[1] * ((b.face[1] ? b.d : b.w) / 2 + 3))];
const RULES = 'Game money only. 18+. Be respectful: you can be reported, muted or blocked. Prices are ESTIMATE placeholders.';
const B = { minX: -150, maxX: 150, minZ: -120, maxZ: 110 };
const STREAM = { id: 'al_stream', name: 'Abule stream', x0: 60, x1: 68, z0: -120, z1: 110, gaps: [[-5, 5]], y: -1.6 };
const BRIDGES = [{ id: 'al_foot', type: 'beam', name: 'Village footbridge', axis: 'x', a: 52, b: 76, z: 0, width: 10, piers: 2, y: 0 }];

const api = district({ id: 'ogun-abule', pre: 'al', name: 'Abule', bounds: B, seed: 701, water: null, creeks: [STREAM], bridges: BRIDGES, marketLabel: 'Village market',
  V: [{ x: -50, name: 'Well Road', width: 10 }], H: [{ z: 0, name: 'Market Road', width: 10 }],
  homeNames: ['Ile Baba Rooms', 'Oja House', 'Oke Odo Flats', 'Ibode Rooms', 'Ago Court', 'Isale Rooms', 'Egbe House', 'Agbado Rooms', 'Ita Rooms', 'Alagbado Court'], maxHomes: 12,
  curves: [curveRoad('al_cv1', 'Farm Lane', [-50, 15], [-72, 60], [-50, 100], 8)],
  districts: [{ id: 'd_farms', name: 'Farm side', x0: -150, x1: -50, z0: 0, z1: 110, color: '#c9d9a0' }, { id: 'd_square', name: 'Market square', x0: -50, x1: 60, z0: 0, z1: 110, color: '#e8d9b0' }, { id: 'd_oldabule', name: 'Old Abule', x0: -150, x1: 60, z0: -120, z1: 0, color: '#e3d2ae' }, { id: 'd_across', name: 'Across the stream', x0: 68, x1: 150, z0: -120, z1: 110, color: '#d8e0b8' }],
  spawns: spawnsAround([[-100, -5], [10, 12], [110, 10]]),
  links: [link('to-ijebu', 'Ijebu Ode Road', 'ogun-ijebu', -144, 0, 150, 65, 0, 300)],
  fill: (i, j) => ({ '0,0': ['houses', ['bungalow', 'selfcon'], 0.4, 2], '1,0': ['houses', ['bungalow', 'selfcon'], 0.4, 2], '0,1': ['houses', ['selfcon', 'bungalow'], 0.4, 1], '1,1': ['houses', ['bungalow', 'selfcon'], 0.4, 1] }[`${i},${j}`]),
  billboards: 3, build(a) {
    const c = a.city;
    for (const [x, z, nz, tier] of [[-100, 14, -1, 'street'], [-30, -14, 1, 'major'], [-130, -14, 1, 'street']]) { a.billboard('road_billboard', tier, x, z, 0, nz, 8.4, 4.2, 4.2); a.reserved.push({ x0: x - 7, x1: x + 7, z0: z - 3, z1: z + 3 }); }
    // market square, stalls and the market stall shop
    c.landmarks.push({ id: 'plaza', kind: 'plaza', name: 'Market Square', x: 5, z: 48, cx: 5, cz: 48, size: 50 }); a.reserved.push({ x0: -22, x1: 32, z0: 22, z1: 74 });
    for (const [x, z, f] of [[-12, 17, [0, 1]], [8, 17, [0, 1]], [28, 17, [0, 1]], [-30, 40, [1, 0]], [-30, 58, [1, 0]]]) a.add({ kind: 'kiosk', x, z, w: 10, d: 8, h: 4, floors: 1, color: ['#a8c3a0', '#d8a28c', '#e3c870', '#9fb7b9'][Math.abs(x + z) % 4], face: f });
    const s = clone(MARKET_SHOP); Object.assign(s, { id: 'al_shop_market', name: 'Village Market Stall', x: 5, z: 40, buildingId: null }); c.shops.push(s); a.job('job_market', 5, 28, 'Market stall');
    // shop, health post, hall, kitchen
    const m = a.shop('shop_mart', 'al_shop_mart', -5, 92, [0, -1], 'Abule Provisions'); a.job('job_shop', m.s.x - 8, m.s.z, 'Abule Provisions (staff entrance)');
    const cl = a.add({ kind: 'office', x: 112, z: 40, w: 24, d: 18, h: 5, floors: 1, color: '#d9efe6', face: [-1, 0], label: 'Health Post' }); const cd = fq(cl); c.landmarks.push({ id: 'clinic', kind: 'clinic', x: cl.x, z: cl.z, name: 'Abule Health Post', door: { x: cd[0], z: cd[1] } });
    const hall = a.venueBuilding('office', 'Village Hall', 33, 88, 24, 16, 6, [0, -1], '#b98d5a');
    a.venue('al_venue_hall', hall, { name: 'Village Hall', blurb: 'The meeting ground: a notice board, and benches for Whot, Ayo and the word board.', hours: [7, 22], sign: '#7a5a34', kind: 'culture',
      stations: [...clone(MAMAPUT.stations).filter(x => x.type !== 'eat' && x.type !== 'poster'), { id: 'notice', type: 'poster', label: 'Notice board', x: 0, z: -3.2, color: '#7a5a34', text: 'Market day, farm work and news are posted here. (Game version: placeholder text; a village life contributor should write the real notices.)' }, { id: 'rules', type: 'poster', label: 'House rules', x: 3.4, z: 1.4, color: '#f0c419', text: RULES }],
      room: clone(MAMAPUT.room) });
    const kb = a.venueBuilding('office', "Mama's Kitchen", 112, 88, 26, 18, 6, [0, -1], '#c8553d'); const d = fq(kb); const ks = clone(SHOP.shop_canteen.s); Object.assign(ks, { id: 'al_shop_kitchen', name: "Mama's Kitchen", x: d[0], z: d[1], desc: 'Pounded yam, egusi, moin moin and zobo (game prices, ESTIMATE).' }); delete ks.buildingId; c.shops.push(ks);
    a.venue('al_venue_kitchen', kb, { name: "Mama's Kitchen", blurb: 'Eat, then challenge somebody to Whot or Ayo.', hours: [6, 22], sign: '#c8553d', shopId: ks.id, stations: clone(MAMAPUT.stations).map(x => (x.shopId ? { ...x, shopId: ks.id } : x)), room: clone(MAMAPUT.room) });
    // the chapel (generic, respectful) with a sacred buffer so no billboard or noisy thing is placed near it
    a.add({ kind: 'landmark', model: 'chapel', sacred: true, x: 118, z: -40, w: 16, d: 22, h: 8, floors: 1, color: '#e9e2d0', face: [-1, 0], label: 'Village chapel' }); a.sacredRect(118, -40, 45); a.reserved.push({ x0: 105, x1: 131, z0: -53, z1: -27 });
    // huts (decor, solid) in the old part and across the stream
    let hn = 0; for (const [x0, x1, z0, z1] of [[78, 140, -108, -62], [78, 140, -18, 18], [78, 140, 60, 76]]) for (let z = z0; z <= z1; z += 17) for (let x = x0; x <= x1; x += 15) { const r = { x0: x - 4, x1: x + 4, z0: z - 4, z1: z + 4 }; if (hn < 14 && a.free(r, 5) && !(Math.abs(x + 50) < 14)) { a.add({ kind: 'hut', x, z, w: 7, d: 7, h: 3.2, floors: 1, color: ['#c8a47a', '#b8946a', '#d1b48a'][hn % 3], face: [0, 1] }); hn++; } }
    // farm, goat pen, well, palm-lined road
    c.landmarks.push({ id: 'farm', kind: 'farm', name: 'Abule farm', x: -108, z: 55, cx: -108, cz: 55, w: 60, d: 52, rows: 8 }); a.reserved.push({ x0: -140, x1: -76, z0: 27, z1: 83 }); a.job('job_farm', -108, 24, 'Farm work');
    c.landmarks.push({ id: 'pen', kind: 'pen', name: 'Goat pen', x: -108, z: 98, cx: -108, cz: 98, w: 30, d: 14, n: 6 }); a.reserved.push({ x0: -125, x1: -91, z0: 89, z1: 107 });
    c.landmarks.push({ id: 'well', kind: 'well', name: 'Village well', x: -32, z: 22, cx: -32, cz: 22 });
    c.landmarks.push({ id: 'palms', kind: 'palmline', name: 'Palm-lined road', x: 0, z: 0, x0: -146, x1: 146, z: 0, off: 8.5, step: 11, skip: [[48, 80], [-58, -42]] });
  }, extraLoops: [] });
const c = api.city; c.cityName = 'Abule'; c.state = 'Ogun'; c.kind = 'city'; c.palmRowZ = false; c.skyline = 'hills'; c._note = 'Generated by tools/gen-abule.mjs. FICTIONAL generic village; unverified. See docs/ABULE.md.';
write(c);
// ---- Ijebu Ode: road link to Abule (idempotent) ------------------------------------------------------------------------
if (!process.env.NO_PARENT) {
  const f = new URL('../server/config/cities/ogun-ijebu.json', import.meta.url); const j = JSON.parse(fs.readFileSync(f)); j.links = (j.links || []).filter(l => l.id !== 'to-abule');
  j.links.push({ id: 'to-abule', name: 'Abule Road', to: 'ogun-abule', x: 194, z: 65, r: 16, fare: 300, arrive: { x: -100, z: 0, ry: 0 } });
  fs.writeFileSync(f, JSON.stringify(j, null, 1)); console.log('ijebu: link to Abule added');
}
