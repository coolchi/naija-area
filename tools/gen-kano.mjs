// Generates Kano (10 Oct 2026): a compact northern city with the second air hub. Deterministic. Usage: node tools/gen-kano.mjs
// FICTIONAL LAYOUT. The place names (Kurmi market, Sabon Gari, Dala Hill, the old city wall, dye pits, palace square) come from 17_cities_and_airport_plan.md and are NOT verified.
// CONTENT CARE (see docs/KANO.md): no clubs, bars, betting or alcohol anywhere in this city; Hausa text is kept to a few greetings and is a PLACEHOLDER for review by a Hausa speaker from Kano.
import { district, SHOP, MARKET_SHOP, MAMAPUT, spawnsAround, write, clone, r1, curveRoad } from './lib/districts.mjs';

const fq = (b) => [r1(b.x + b.face[0] * ((b.face[0] ? b.w : b.d) / 2 + 3)), r1(b.z + b.face[1] * ((b.face[1] ? b.d : b.w) / 2 + 3))];
const FOOD = [{ id: 'tuwo', name: 'Tuwo shinkafa + miyan taushe', price: 1300, hunger: 52, energy: 7 }, { id: 'suya', name: 'Suya', price: 1200, hunger: 40, energy: 6 }, { id: 'kunu', name: 'Kunu drink', price: 300, hunger: 6, energy: 6 }, { id: 'masa', name: 'Masa (rice cakes)', price: 600, hunger: 25, energy: 5 }];
const eatery = (api, pre, label, b) => { const d = fq(b); const s = clone(SHOP.shop_canteen.s); Object.assign(s, { id: `${pre}_shop_${api.city.shops.length + 1}`, name: label, x: d[0], z: d[1], desc: 'Tuwo, suya, masa and kunu (game prices, ESTIMATE).', items: clone(FOOD) }); delete s.buildingId; api.city.shops.push(s); return s; };
const clinic = (api, x, z, face) => { const b = api.add({ kind: 'office', x, z, w: 24, d: 18, h: 6, floors: 1, color: '#d9efe6', face, label: 'Community Clinic' }); const d = fq(b); api.city.landmarks.push({ id: 'clinic', kind: 'clinic', x: b.x, z: b.z, name: `${api.city.name} Community Clinic`, door: { x: d[0], z: d[1] } }); return b; };
const RULES = 'Game money only. 18+. Be respectful: you can be reported, muted or blocked. Prices are ESTIMATE placeholders.';
const B = { minX: -240, maxX: 240, minZ: -240, maxZ: 165 };

const api = district({ id: 'kano', pre: 'kn', name: 'Kano', bounds: B, seed: 505, water: null, marketLabel: 'Kurmi-style market',
  V: [{ x: -150, name: 'Kurmi Road' }, { x: -40, name: 'Palace Road' }, { x: 70, name: 'Sabon Gari Road' }], H: [{ z: -120, name: 'Airport Link Road' }, { z: -10, name: 'Market Road' }, { z: 80, name: 'Dala Road' }],
  homeNames: ['Kofar Compound', 'Sabon Gari Flats', 'Dala View Rooms', 'Fagge Court', 'Nassarawa Flats', 'Tarauni Rooms', 'Gwale Court', 'Bompai Flats', 'Kurmi Rooms', 'Hausawa Close'], maxHomes: 12,
  curves: [curveRoad('kn_cv1', 'Old City Ring', [-150, 85], [-95, 150], [-40, 85], 10)],
  districts: [{ id: 'd_oldcity', name: 'Old City and Kurmi-style market', x0: -240, x1: -40, z0: -120, z1: 80, color: '#e8c785' }, { id: 'd_palace', name: 'Palace square area', x0: -40, x1: 70, z0: -10, z1: 80, color: '#d9e3b8' }, { id: 'd_sabon', name: 'Sabon Gari', x0: 70, x1: 240, z0: -10, z1: 165, color: '#c8d9b8' }, { id: 'd_airport', name: 'Airport', x0: 70, x1: 240, z0: -240, z1: -10, color: '#cfd8e3' }, { id: 'd_north', name: 'Northern quarters', x0: -240, x1: 70, z0: -240, z1: -120, color: '#d8d2c2' }, { id: 'd_south', name: 'Dala side', x0: -240, x1: 70, z0: 80, z1: 165, color: '#e3e6c8' }],
  spawns: spawnsAround([[-95, -60], [15, 30], [150, 40]]),
  fill: (i, j) => ({ '0,0': ['houses', ['bungalow', 'selfcon', 'flat2'], 0.8, 2], '1,0': ['houses', ['bungalow', 'flat2'], 0.8, 2], '2,0': ['houses', ['selfcon', 'bungalow'], 0.85, 2], '0,1': 'mixed', '1,1': 'market', '2,1': 'market', '3,1': 'mixed', '0,2': ['houses', ['bungalow', 'selfcon'], 0.8, 2], '1,2': 'mixed', '3,2': ['houses', ['flat2', 'bungalow'], 0.95, 2], '0,3': ['houses', ['bungalow'], 0.8, 1], '3,3': ['houses', ['bungalow', 'selfcon'], 0.85, 1] }[`${i},${j}`]),
  billboards: 7, build(a) {
    const ap = a.add({ kind: 'airport', x: 183, z: -198, w: 100, d: 50, h: 14, floors: 3, color: '#dfe6ee', label: 'Kano Airport Terminal (placeholder)', face: [0, 1] });
    a.city.airport = { id: 'ap_kano', name: 'Kano Airport (placeholder)', door: { x: 183, z: -169 }, apron: { x: 262, z: -200 }, runway: { x0: 300, z0: -130, x1: 300, z1: -470, width: 26 }, arrive: { x: 183, z: -165, ry: 0 } }; void ap;
    const m = a.shop('shop_mart', 'kn_shop_mart', 110, 30, [0, -1], 'Kano Mart'); a.job('job_shop', m.s.x - 8, m.s.z, 'Kano Mart (staff entrance)'); a.job('job_market', -95, -60, 'Market stall');
    const s = clone(MARKET_SHOP); Object.assign(s, { id: 'kn_shop_market', name: 'Kurmi-style Market Stall', x: -85, z: -42, buildingId: null }); a.city.shops.push(s);
    clinic(a, 190, 100, [-1, 0]); const pos = a.add({ kind: 'kiosk', x: 150, z: 60, w: 10, d: 8, h: 4, floors: 1, color: '#4aa3ff', face: [0, -1] }); a.job('job_pos', pos.x, pos.z - 7, 'POS kiosk'); a.add({ kind: 'kiosk', x: 30, z: -60, w: 10, d: 8, h: 4, floors: 1, color: '#e9c46a', face: [0, 1] });
    for (const [x, z, nz, tier] of [[-95, -132, 1, 'major'], [30, -132, 1, 'street'], [-60, 92, -1, 'street'], [120, 92, -1, 'street'], [-190, 92, -1, 'street']]) { a.billboard('road_billboard', tier, x, z, 0, nz, 8.4, 4.2, 4.2); a.reserved.push({ x0: x - 7, x1: x + 7, z0: z - 3, z1: z + 3 }); }
    // the canteen: northern dishes, same Whot / Ayo / word-board stations as every canteen
    const cb = a.venueBuilding('office', 'Kano Canteen', 150, 130, 26, 18, 6, [0, -1], '#8a5a2b'); const ms = eatery(a, 'kn', 'Kano Canteen', cb);
    a.venue('kn_venue_canteen', cb, { name: 'Kano Canteen', blurb: 'Sannu da zuwa (welcome, placeholder for review). Tuwo, suya and kunu, then a game of Whot or Ayo.', hours: [6, 22], sign: '#8a5a2b', shopId: ms.id, stations: clone(MAMAPUT.stations).map(x => (x.shopId ? { ...x, shopId: ms.id } : x)), room: clone(MAMAPUT.room) });
    // landmarks (generic shapes; none is a copy of a real building). Dala Hill and the wall are scenery beyond the walkable edge.
    a.city.landmarks.push({ id: 'plaza', kind: 'plaza', name: 'Palace Square (generic square, not the palace)', x: 15, z: 30, cx: 15, cz: 35, size: 60 }); a.reserved.push({ x0: -15, x1: 45, z0: 5, z1: 65 });
    a.city.landmarks.push({ id: 'dala', kind: 'hill', name: 'Dala Hill', x: -120, z: -360, cx: -120, cz: -360, r: 90, h: 34 });
    a.city.landmarks.push({ id: 'oldwall_s', kind: 'wall', name: 'Old City wall (generic)', x: 0, x0: -244, x1: 244, z: 168, t: 5, h: 7, gates: [-150, -40, 70] });
    a.city.landmarks.push({ id: 'oldwall_w', kind: 'wall', name: 'Old City wall (generic)', axis: 'z', x: -244, z: -38, z0: -244, z1: 168, t: 5, h: 7, gates: [-120, -10, 80] });
    a.city.landmarks.push({ id: 'dyepits', kind: 'dyepits', name: 'Dye pits (generic)', x: -95, z: 38, cx: -95, cz: 38, w: 44, d: 30, n: 14 }); a.reserved.push({ x0: -120, x1: -70, z0: 20, z1: 58 });
    const db = a.venueBuilding('office', 'Dye pit works', -95, 6, 16, 10, 5, [0, 1], '#2e4a8a');
    a.venue('kn_venue_dye', db, { name: 'Dye pit works', blurb: 'A yard of round dye pits. Cloth dyeing is a traditional trade in Kano. (Game version: invented, to be reviewed by a Kano contributor.)', hours: [8, 18], sign: '#2e4a8a', kind: 'culture',
      stations: [{ id: 'about', type: 'poster', label: 'About the dye pits', x: 0, z: -3.2, color: '#2e4a8a', text: 'Cloth is dipped in deep pits of indigo and other dyes, then dried in the sun. Placeholder text: a local contributor must review and replace it.' }, { id: 'word', type: 'casual', game: 'word', label: 'Word of the Day board', x: -3.2, z: -1, color: '#c8a23d' }, { id: 'rules', type: 'poster', label: 'House rules', x: 3.2, z: 1.4, color: '#f0c419', text: RULES }],
      room: { w: 10, d: 9, wall: '#e9dcc3', trim: '#2e4a8a', floor: { style: 'planks', a: '#c9a97a', b: '#b99a6c' }, windows: [{ wall: 'back', at: -2.4, w: 1.6 }, { wall: 'left', at: 0, w: 1.6 }], mood: 'warm', door: 'Enter', decor: [{ k: 'plant', x: -4.2, z: -3.6, h: 1.4 }, { k: 'shelf', x: 3.6, z: -3.8, c: '#8a5a2b', pots: true }, { k: 'bench', x: 0, z: 2.4, w: 2.4 }], detailV2: true } });
  }, extraLoops: [] });
const c = api.city; c.skyline = 'lowrise'; c.cityName = 'Kano'; c.state = 'Kano'; c.kind = 'city'; c.name = 'Kano'; c._note = 'Generated by tools/gen-kano.mjs. FICTIONAL layout; place names unverified; Hausa text is placeholder. See docs/KANO.md.';
c.contentRules = { noAlcohol: true, noBetting: true, noClubs: true, rejectRestrictedAds: true, note: 'Kano State rules differ from Lagos on alcohol and gambling (17_cities_and_airport_plan.md section 3). Ads in the restricted categories are rejected automatically here. A local contributor must review all art and text.' };
write(c);
