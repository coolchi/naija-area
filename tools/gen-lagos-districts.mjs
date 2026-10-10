// Generates the expanded-Lagos districts (10 Oct 2026): Lagos Island, Victoria Island and Ikoyi, the Lekki-Ikoyi Bridge, Lekki. Deterministic.
// Usage: node tools/gen-lagos-districts.mjs     Also adds the National Theatre and the road link to Lagos Island to the mainland config (idempotent).
// FICTIONAL LAYOUT with REAL NAMES (approved by Sherif). Every position, size, street name and "what a place offers" is a game invention to verify with a local contributor.
import fs from 'node:fs';
import { district, SHOP, MARKET_SHOP, JOBS, MAMAPUT, CLUB, link, spawnsAround, write, clone, r1, curveRoad } from './lib/districts.mjs';

const WATER = (b) => ({ minX: b.minX - 60, maxX: b.maxX + 60, minZ: b.maxZ, maxZ: b.maxZ + 100 });
const fq = (b) => [r1(b.x + b.face[0] * ((b.face[0] ? b.w : b.d) / 2 + 3)), r1(b.z + b.face[1] * ((b.face[1] ? b.d : b.w) / 2 + 3))];
const eatery = (api, pre, label, b, hours) => { const d = fq(b); const s = clone(SHOP.shop_canteen.s); Object.assign(s, { id: `${pre}_shop_${api.city.shops.length + 1}`, name: label, buildingId: undefined, x: d[0], z: d[1], desc: 'Jollof, rice and stew (game prices, ESTIMATE).' }); delete s.buildingId; api.city.shops.push(s); return s; };
const POSTER = (text) => ({ type: 'poster', label: 'House rules', color: '#f0c419', text });
const RULES = 'Game money only. 18+. No alcohol is simulated in this version. Be respectful: you can be reported, muted or blocked. Prices are ESTIMATE placeholders.';

// ---- venue specs -------------------------------------------------------------------------------------------------

// ---- stadium (10 Oct 2026): the visitable stadium venue. Fictional name, no logos or kits. Live scores are served by core/scores.js.
function stadiumVenue(api, pre, b) {
  const shop = eatery(api, pre, 'Stadium Snacks', b); shop.desc = 'Suya, chin chin and cold zobo at stadium prices (game money, ESTIMATE).'; shop.items = [{ id: 'suya', name: 'Suya stick', price: 1200, hunger: 40, energy: 6 }, { id: 'chinchin', name: 'Chin chin', price: 500, hunger: 20, energy: 4 }, { id: 'zobo', name: 'Zobo drink', price: 300, hunger: 5, energy: 6 }];
  return api.venue(`${pre}_venue_stadium`, b, { name: 'Naija Area City Stadium', blurb: 'A football ground: buy a ticket, take a seat, watch the score board and grab snacks. Fictional club and league names.', hours: [8, 23], sign: '#1b6e3a', kind: 'stadium', shopId: shop.id,
    stations: [
      { id: 'ticket', type: 'ticket', label: 'Ticket booth', x: -8.6, z: 5.4, color: '#1b6e3a' },
      { id: 'snack1', type: 'eat', label: 'Snack stall', x: -8.6, z: 1.6, color: '#c8553d', shopId: shop.id },
      { id: 'snack2', type: 'eat', label: 'Drinks stall', x: -8.6, z: -2, color: '#2a9d8f', shopId: shop.id },
      { id: 'scores', type: 'scores', label: 'Score board', x: -8.6, z: -5.6, color: '#10131a' },
      { id: 'seat', type: 'seat', label: 'Take a seat (ticket)', x: 2.5, z: -3.0, color: '#d6402f' },
      { id: 'brand', type: 'poster', label: 'Brand board spot', x: 6.5, z: 5.7, color: '#e0a020', text: 'Brand board spot (placeholder). Ad slots around the ground are planned; the real ad system is on the Advertise page.' },
      { id: 'rules', ...POSTER(RULES), x: 9.6, z: 5.7 }],
    room: { w: 22, d: 16, wall: '#d7d9db', trim: '#1b6e3a', floor: { style: 'checker', a: '#b9bcc0', b: '#aeb1b5' }, windows: [], mood: 'warm', door: 'Enter',
      decor: [{ k: 'pitch', x: 2.5, z: 0.8, w: 14, d: 7.2 }, { k: 'stands', x: 2.5, z: -5.7, w: 16, d: 4.6, tiers: 3 }, { k: 'adboards', x: 2.5, z: 4.8, w: 14 }, { k: 'crowd', x: -6.6, z: 3.4, n: 3, r: 1.0, seed: 5 }, { k: 'plant', x: -10.2, z: 7, h: 1.5 }], detailV2: true } });
}
function hotelVenue(api, pre, name, b, o) {
  const shop = eatery(api, pre, `${name} Restaurant`, b); const v = api.venue(`${pre}_venue_${o.key}`, b, { name, blurb: o.blurb, hours: [6, 24], sign: o.sign, kind: 'hotel', shopId: shop.id,
    stations: [{ id: 'desk', type: 'poster', label: 'Reception', x: 0, z: -4.2, color: o.sign, text: `${o.blurb} Short stays and event bookings are coming (placeholder).` }, { id: 'restaurant', type: 'eat', label: 'Restaurant counter', x: 4.4, z: -3, color: '#8a5a2b', shopId: shop.id }, { id: 'lounge', type: 'tv', label: 'Lounge TV', x: -4.6, z: -3, color: '#222', mood: 3 }, { id: 'word', type: 'casual', game: 'word', label: 'Word of the Day board', x: -4.6, z: 2.2, color: '#c8a23d' }, { id: 'rules', ...POSTER(RULES), x: 4.6, z: 2.6 }],
    room: { w: 14, d: 11, wall: '#ece4d2', trim: o.trim, floor: { style: 'checker', a: '#efe7d6', b: '#cfc3a8' }, windows: [{ wall: 'back', at: -4.5, w: 1.8 }, { wall: 'back', at: 4.5, w: 1.8 }, { wall: 'left', at: 0, w: 2 }, { wall: 'right', at: 0, w: 2 }], mood: 'warm', door: 'Enter',
      decor: [{ k: 'desk', x: 0, z: -4.4 }, { k: 'art', x: 0, z: -5.45, w: 1.8, h: 1.1, kind: 'bars' }, { k: 'rug', x: 0, z: 0.8, w: 5, d: 3, c: o.rug }, { k: 'sofa', x: -2.4, z: 1.9, c: o.sofa, rot: 0 }, { k: 'sofa', x: 2.4, z: 1.9, c: o.sofa, rot: 0 }, { k: 'coffeeTable', x: 0, z: 1.6 }, { k: 'plant', x: -6.3, z: -4.8, h: 1.6 }, { k: 'plant', x: 6.3, z: -4.8, h: 1.6 }, { k: 'floorLamp', x: -6, z: 3.2 }, { k: 'floorLamp', x: 6, z: 3.2 }, { k: 'foodCounter', x: 4.4, z: -4.3, w: 3 }, { k: 'tv', x: -4.6, z: -4.6, w: 1.8 }, { k: 'crowd', x: 0, z: 0.4, n: 4, r: 2.4, seed: o.seed }], detailV2: true } });
  return v;
}
const clubRoom = (trim, floorA, floorB) => ({ w: 11, d: 10, wall: '#14101f', trim, floor: { style: 'dance', a: floorA, b: floorB }, windows: [], mood: 'club', door: 'Enter', decor: clone(CLUB.room.decor).map(d => (d.k === 'ledstrip' ? { ...d, c: trim } : d)), detailV2: true });
function clubVenue(api, pre, name, b, key, sign, trim, seed) {
  const st = clone(CLUB.stations).filter(s => s.type !== 'poster').map(s => ({ ...s })); st.push({ id: 'rules', ...POSTER(RULES), x: -4.4, z: 3.2 });
  return api.venue(`${pre}_venue_${key}`, b, { name, blurb: 'Dance floor, DJ booth, bar and a VIP corner. Game money only. 18+. (Game version: what the real place offers is not copied.)', hours: [20, 24], sign, kind: 'club', stations: st, room: clubRoom(trim, '#1b1530', '#2a1f4a') });
}
function artsVenue(api, pre, name, b) {
  return api.venue(`${pre}_venue_arts`, b, { name, blurb: 'A stage, a small gallery wall and a bookshelf. Game version: what the real place offers is not copied and has not been verified.', hours: [10, 22], sign: '#8a3b12', kind: 'arts',
    stations: [{ id: 'stage', type: 'tv', label: 'Stage screen (watch the show)', x: 0, z: -3.6, color: '#2b2540', mood: 4 }, { id: 'songs', type: 'songs', label: 'Event and song slot board', x: 4.2, z: -2.8, color: '#1d3557' }, { id: 'word', type: 'casual', game: 'word', label: 'Word of the Day board', x: -4.2, z: -2.8, color: '#c8a23d' }, { id: 'rules', ...POSTER(RULES), x: -4.2, z: 3 }],
    room: { w: 12, d: 10, wall: '#f1e4cf', trim: '#8a3b12', floor: { style: 'planks', a: '#b98a5a', b: '#a97a4c' }, windows: [{ wall: 'left', at: 0, w: 2 }, { wall: 'right', at: 0, w: 2 }], mood: 'warm', door: 'Enter', decor: [{ k: 'stage', x: 0, z: -4.1, w: 6, d: 1.8 }, { k: 'speaker', x: -3.6, z: -4.2, tall: true }, { k: 'speaker', x: 3.6, z: -4.2, tall: true }, { k: 'art', x: -5.8, z: 0, w: 1.4, h: 1, kind: 'bars' }, { k: 'art', x: 5.8, z: 0, w: 1.4, h: 1, kind: 'bars' }, { k: 'shelf', x: 4.6, z: 3.8, c: '#8a5a2b' }, { k: 'shelf', x: 3.2, z: 3.8, c: '#8a5a2b' }, { k: 'bench', x: -2.4, z: 1.4, w: 2.4 }, { k: 'bench', x: 2.4, z: 1.4, w: 2.4 }, { k: 'plant', x: -5.5, z: -4.4, h: 1.4 }, { k: 'crowd', x: 0, z: 0.3, n: 5, r: 2.2, seed: 8 }], detailV2: true } });
}
function cafeVenue(api, pre, name, b) {
  const shop = eatery(api, pre, `${name} Kitchen`, b);
  return api.venue(`${pre}_venue_cafe`, b, { name, blurb: 'Food, a stage and music posters. Game version: what the real place offers is not copied and has not been verified.', hours: [10, 24], sign: '#b3261e', shopId: shop.id, stations: [{ id: 'counter', type: 'eat', label: 'Food counter', x: 0, z: -3.6, color: '#b3261e', shopId: shop.id }, { id: 'songs', type: 'songs', label: 'Song slot board', x: 4.4, z: -2.6, color: '#1d3557' }, { id: 'tv', type: 'tv', label: 'Music screen', x: -4.4, z: -2.8, color: '#222', mood: 4 }, { id: 'rules', ...POSTER(RULES), x: -4.4, z: 3 }],
    room: { w: 12, d: 10, wall: '#2a1d1a', trim: '#b3261e', floor: { style: 'planks', a: '#6b4a32', b: '#5c3f2a' }, windows: [{ wall: 'left', at: 0, w: 2 }], mood: 'warm', door: 'Enter', decor: [{ k: 'stage', x: 4.6, z: 3.8, w: 3, d: 1.5 }, { k: 'speaker', x: 3.2, z: 4.0 }, { k: 'bar', x: -1.2, z: -4.4, len: 4 }, { k: 'barstool', x: -2.4, z: -3.4 }, { k: 'barstool', x: -1.2, z: -3.4 }, { k: 'barstool', x: 0, z: -3.4 }, { k: 'table', x: -3, z: 1.2, c: '#fff' }, { k: 'stool', x: -3.9, z: 1.2, c: '#b3261e' }, { k: 'stool', x: -2.1, z: 1.2, c: '#b3261e' }, { k: 'table', x: 0.6, z: 2.4, c: '#fff' }, { k: 'stool', x: -0.3, z: 2.4, c: '#b3261e' }, { k: 'art', x: 0, z: -5.45, w: 2.2, h: 0.8, kind: 'bars' }, { k: 'ledstrip', c: '#b3261e' }, { k: 'crowd', x: -1, z: 0.4, n: 4, r: 2, seed: 5 }], detailV2: true } });
}
function clinic(api, pre, x, z, face) { const b = api.add({ kind: 'office', x, z, w: 24, d: 18, h: 6, floors: 1, color: '#d9efe6', face, label: 'Community Clinic' }); const d = fq(b); api.city.landmarks.push({ id: 'clinic', kind: 'clinic', x: b.x, z: b.z, name: `${api.city.name} Community Clinic`, door: { x: d[0], z: d[1] } }); return b; }
const jobsAt = (api, list) => { for (const [jid, x, z, label] of list) api.job(jid, x, z, label); };
const marketStall = (api, pre, x, z, nm) => { const s = clone(MARKET_SHOP); Object.assign(s, { id: `${pre}_shop_market`, name: nm, x, z, buildingId: null }); api.city.shops.push(s); };

// ======================= LAGOS ISLAND ==========================================================================
{
  const B = { minX: -240, maxX: 240, minZ: -200, maxZ: 170 };
  const api = district({ id: 'lagos-island', pre: 'isl', name: 'Lagos Island', bounds: B, seed: 101, water: WATER(B), marketLabel: 'Balogun-style market',
    V: [{ x: -160, name: 'Church Street' }, { x: -50, name: 'Broad Street' }, { x: 60, name: 'Balogun Street' }, { x: 170, name: 'Island Road' }], H: [{ z: -120, name: 'Western Road' }, { z: -10, name: 'Market Street' }, { z: 80, name: 'Customs Road' }, { z: 150, name: 'Marina', width: 18 }],
    homeNames: ['Idumota Rooms', 'Broad Street Flats', 'Marina View Rooms', 'Island Court', 'Campos Flats', 'Tinubu Court', 'Adeniji Rooms', 'Docemo Flats', 'Sandgrouse Court', 'Isale Eko Rooms'], maxHomes: 12,
    curves: [curveRoad('isl_cv1', 'Isale Crescent', [-160, -150], [-100, -190], [-50, -150], 10)],
    districts: [{ id: 'd_balogun', name: 'Balogun market area', x0: -160, x1: 60, z0: -120, z1: -10, color: '#e8c785' }, { id: 'd_tbs', name: 'Tafawa Balewa Square', x0: 60, x1: 170, z0: -10, z1: 80, color: '#d9e3b8' }, { id: 'd_marina', name: 'Marina', x0: -240, x1: 240, z0: 80, z1: 170, color: '#b9d6e0' }, { id: 'd_isleft', name: 'Western Island', x0: -240, x1: -160, z0: -200, z1: 80, color: '#cdd2b8' }, { id: 'd_iseast', name: 'Eastern Island', x0: 170, x1: 240, z0: -200, z1: 80, color: '#c9cfd8' }, { id: 'd_isnorth', name: 'Northern Island', x0: -160, x1: 170, z0: -200, z1: -120, color: '#d8d2c2' }],
    spawns: spawnsAround([[115, 40], [-100, 60], [10, 60]]),
    links: [link('to-mainland', 'Third Mainland Bridge road', 'lagos-mainland', -226, -10, 120, 96, 0), link('to-vi', 'Ikoyi Road', 'lagos-vi-ikoyi', 226, -10, -215, -10, 0)],
    fill: (i, j) => ({ '0,0': ['houses', ['faceyou', 'selfcon', 'flat2'], 0.9, 2], '1,0': ['houses', ['faceyou', 'flat2', 'selfcon'], 0.95, 1], '2,0': ['houses', ['flat2', 'bungalow'], 1, 2], '3,0': ['houses', ['flat2', 'faceyou'], 1, 2], '4,0': ['houses', ['faceyou', 'selfcon', 'flat2'], 0.9, 2], '1,1': 'market', '2,1': 'market', '3,1': 'mixed', '4,1': 'towers', '0,2': ['houses', ['faceyou', 'selfcon'], 0.9, 2], '1,2': 'mixed', '2,2': 'mixed', '4,2': 'towers', '2,3': 'towers', '3,3': 'towers', '4,3': 'mixed' }[`${i},${j}`]),
    billboards: 8, build(a) {
      const [c0, c1] = [a.cell(0, 1), a.cell(1, 3)]; void c1;
      const mosque = a.add({ kind: 'landmark', model: 'mosque', sacred: true, x: -198, z: -65, w: 44, d: 34, h: 16, floors: 1, color: '#efe9db', face: [1, 0], label: 'Lagos Island Central Mosque' }); a.sacredRect(mosque.x, mosque.z, 60); void c0;
      const cath = a.add({ kind: 'landmark', model: 'cathedral', sacred: true, x: -105, z: 118, w: 44, d: 30, h: 15, floors: 1, color: '#d8cfc0', face: [0, 1], label: 'Cathedral Church of Christ' }); a.sacredRect(cath.x, cath.z, 60);
      a.city.landmarks.push({ id: 'plaza', kind: 'plaza', name: 'Tafawa Balewa Square', x: 115, z: 31, cx: 115, cz: 35, size: 72 });
      const m = a.shop('shop_mart', 'isl_shop_mart', 205, 30, [-1, 0], 'Island Mart'); void m; clinic(a, 'isl', -200, 45, [1, 0]);
      const pos = a.add({ kind: 'kiosk', x: 120, z: 112, w: 10, d: 8, h: 4, floors: 1, color: '#4aa3ff', face: [0, 1] }); a.job('job_pos', pos.x, pos.z - 7, 'POS kiosk'); a.job('job_shop', m.s.x - 8, m.s.z, 'Island Mart (staff entrance)'); a.job('job_market', -85, -80, 'Market stall');
      marketStall(a, 'isl', -75, -62, 'Balogun-style Market Stall'); a.add({ kind: 'kiosk', x: 20, z: -85, w: 10, d: 8, h: 4, floors: 1, color: '#e9c46a', face: [0, 1] });
      const cb = a.venueBuilding('office', 'Marina Canteen', 100, -100, 26, 18, 6, [0, 1], '#c8553d'); const ms = eatery(a, 'isl', 'Marina Canteen', cb); const v = a.venue('isl_venue_canteen', cb, { name: 'Marina Canteen', blurb: 'Eat, then challenge somebody to Whot or Ayo.', hours: [6, 22], sign: '#c8553d', shopId: ms.id, stations: clone(MAMAPUT.stations).map(s => (s.shopId ? { ...s, shopId: ms.id } : s)), room: clone(MAMAPUT.room) }); void v;
    },
    extraLoops: [] });
  // boat jetty (10 Oct 2026): Marina jetty with a ferry to the Lekki jetty. Fares and times are ESTIMATE placeholders.
  api.city.landmarks.push({ id: 'isl_jetty', kind: 'jetty', name: 'Marina jetty', x: 100, z: 160, z2: 186 });
  api.city.boat = { stops: [{ id: 'isl_marina', name: 'Marina jetty', x: 100, z: 163, r: 14, berth: { x: 100, z: 192 }, out: [1, 0], arrive: { x: 100, z: 163, ry: 0 } }], routes: [{ from: 'isl_marina', to: 'lk_jetty', fare: 900, crossMs: 30000 }] };
  write(api.city);
}

// ======================= VICTORIA ISLAND AND IKOYI =============================================================
{
  const B = { minX: -260, maxX: 260, minZ: -200, maxZ: 170 };
  const creeks = [{ id: 'vi_creek', name: 'Five Cowrie-style creek', x0: 84, x1: 106, z0: -200, z1: 170, gaps: [[-18, -2]] }, { id: 'vi_moat', name: 'Banana Island channel', x0: 166, x1: 178, z0: -200, z1: -10, gaps: [[-128, -112]] }];
  const bridges = [{ id: 'falomo', type: 'beam', name: 'Falomo Bridge', axis: 'x', a: 70, b: 120, z: -10, width: 14, piers: 5, y: 0 }, { id: 'banana', type: 'beam', name: 'Banana Island causeway', axis: 'x', a: 158, b: 186, z: -120, width: 14, piers: 3, y: 0 }];
  const api = district({ id: 'lagos-vi-ikoyi', pre: 'vi', name: 'Victoria Island and Ikoyi', bounds: B, seed: 202, water: WATER(B), creeks, bridges, marketLabel: 'Market',
    V: [{ x: -170, name: 'Ahmadu Bello Way' }, { x: -60, name: 'Adetokunbo Ademola Street' }, { x: 40, name: 'Akin Adesola Street' }, { x: 150, name: 'Bourdillon Road' }], H: [{ z: -120, name: 'Glover Road' }, { z: -10, name: 'Awolowo Road' }, { z: 80, name: 'Adeola Odeku Street' }, { z: 150, name: 'Bar Beach Road', width: 16 }],
    homeNames: ['Ikoyi Court', 'Bourdillon Flats', 'Glover Close', 'Gerrard Flats', 'Kingsway Court', 'Cooper Road Rooms', 'Alexander Flats', 'Queens Drive Court', 'Probyn Close', 'Osborne Flats'], maxHomes: 14,
    curves: [curveRoad('vi_cv1', 'Ikoyi Crescent', [-60, -85], [-110, -40], [-60, -10], 10)], vEnd: {},
    districts: [{ id: 'd_vi', name: 'Victoria Island', x0: -260, x1: 40, z0: -10, z1: 170, color: '#cfd6c0' }, { id: 'd_vioff', name: 'VI business district', x0: -260, x1: 40, z0: -200, z1: -10, color: '#d4d0c4' }, { id: 'd_creek', name: 'Falomo creek', x0: 40, x1: 150, z0: -200, z1: 170, color: '#b9d6e0' }, { id: 'd_ikoyi', name: 'Ikoyi', x0: 150, x1: 260, z0: -10, z1: 170, color: '#c8d9b8' }, { id: 'd_banana', name: 'Banana Island', x0: 166, x1: 260, z0: -200, z1: -10, color: '#e0d6a8' }],
    spawns: spawnsAround([[-10, 60], [-120, 60], [200, 40]]),
    links: [link('to-island', 'Island road', 'lagos-island', -246, -10, 190, -10, 0), link('to-bridge', 'Lekki-Ikoyi Bridge road', 'lagos-bridge', 246, -10, -268, 0, 0)],
    fill: (i, j) => ({ '0,0': ['houses', ['flat2', 'duplex'], 1.8, 2], '1,0': ['houses', ['flat2', 'duplex', 'bungalow'], 1.8, 2], '2,0': ['houses', ['duplex', 'mansion'], 1.9, 2], '4,0': ['houses', ['mansion'], 4.2, 2], '4,1': ['houses', ['mansion'], 4.2, 2], '0,1': 'towers', '1,1': 'towers', '2,1': 'mixed', '3,0': 'none', '3,1': 'none', '1,2': 'mixed', '2,2': 'none', '3,2': 'none', '4,3': 'none', '1,3': 'none', '2,3': 'none', '0,3': 'none', '0,2': 'none', '4,2': 'none' }[`${i},${j}`]),
    billboards: 8, build(a) {
      const hotel = (key, label, x, z, face, o) => { const b = a.venueBuilding('hotel', label, x, z, 40, 30, 34, face, o.color); hotelVenue(a, 'vi', label, b, { key, blurb: o.blurb, sign: o.sign, trim: o.trim, rug: o.rug, sofa: o.sofa, seed: o.seed }); return b; };
      hotel('eko', 'Eko Hotel and Suites', -115, 113, [0, 1], { color: '#d9d2c3', sign: '#124d8a', trim: '#124d8a', rug: '#274c77', sofa: '#6c757d', seed: 3, blurb: 'A big hotel lobby with a restaurant counter and a lounge.' });
      hotel('fourpoints', 'Four Points by Sheraton', -5, 113, [0, 1], { color: '#cfd8e3', sign: '#2f6b4f', trim: '#2f6b4f', rug: '#2f6b4f', sofa: '#8a8f98', seed: 4, blurb: 'A city hotel lobby with a restaurant counter and a lounge.' });
      hotel('wheatbaker', 'The Wheatbaker', 205, 38, [-1, 0], { color: '#efe6d2', sign: '#5a3b2e', trim: '#5a3b2e', rug: '#8c6d4f', sofa: '#6b4a32', seed: 5, blurb: 'A quiet boutique-style hotel lobby with a restaurant counter and a lounge.' });
      hotel('hilton', 'Transcorp Hilton', 205, 112, [0, 1], { color: '#e3dccd', sign: '#1b3a6b', trim: '#1b3a6b', rug: '#1b3a6b', sofa: '#7a7f87', seed: 6, blurb: 'A large hotel lobby with a restaurant counter and a lounge.' });
      clubVenue(a, 'vi', 'Quilox', a.venueBuilding('office', 'Quilox', -215, 118, 24, 20, 8, [0, 1], '#4a2f6b'), 'quilox', '#4a2f6b', '#c77dff', 6);
      artsVenue(a, 'vi', 'Terra Kulture', a.venueBuilding('office', 'Terra Kulture', -215, 36, 24, 20, 8, [1, 0], '#c4713b'));
      cafeVenue(a, 'vi', 'Hard Rock Cafe', a.venueBuilding('office', 'Hard Rock Cafe', -10, 36, 26, 20, 8, [0, -1], '#7a1f1a'));
      a.city.landmarks.push({ id: 'plaza', kind: 'plaza', name: 'Falomo Gardens', x: -110, z: -85, cx: -110, cz: -85, size: 40 });
      const m = a.shop('shop_mart', 'vi_shop_mart', 5, -85, [0, 1], 'VI Mart'); a.job('job_shop', m.s.x - 8, m.s.z, 'VI Mart (staff entrance)'); const pos = a.add({ kind: 'kiosk', x: -40, z: 40, w: 10, d: 8, h: 4, floors: 1, color: '#4aa3ff', face: [0, -1] }); a.job('job_pos', pos.x, pos.z + 7, 'POS kiosk'); a.job('job_rider', -90, 55, 'Rider Dispatch Hub');
      clinic(a, 'vi', -215, -85, [1, 0]); a.add({ kind: 'kiosk', x: -140, z: 40, w: 10, d: 8, h: 4, floors: 1, color: '#e9c46a', face: [0, -1] });
    },
    extraLoops: [{ id: 'vi_falomo_loop', pts: (() => { const p = []; for (let x = 62; x <= 128; x += 6) p.push([x, -12.6]); for (let x = 128; x >= 62; x -= 6) p.push([x, -7.4]); return p; })(), npcs: ['car', 'danfo', 'keke'], dense: true }, { id: 'vi_banana_loop', pts: (() => { const p = []; for (let x = 152; x <= 214; x += 6) p.push([x, -122.6]); for (let x = 214; x >= 152; x -= 6) p.push([x, -117.4]); return p; })(), npcs: ['car'], dense: false }] });
  write(api.city);
}

// ======================= LEKKI-IKOYI BRIDGE (corridor district) ================================================
{
  const B = { minX: -320, maxX: 320, minZ: -90, maxZ: 90 };
  const sc = 0.4; // real metres to game metres. Sources and the numbers used are listed in app/docs/BRIDGE.md
  const bridges = [{ id: 'lekki-ikoyi', type: 'cable', name: 'Lekki-Ikoyi Link Bridge', scale: sc, z: 0, x0: -272, x1: 272, mainHalf: 127, pylonHeightAboveDeck: 32.8, deckWidth: 8.6, walkway: 0.8, pylonX: 0, creek: { x0: -200, x1: 200 } }];
  const creeks = [{ id: 'br_creek', name: 'Five Cowrie Creek', x0: -200, x1: 200, z0: -90, z1: 90, gaps: [[-4.6, 4.6]], axis: 'z', y: -3.6 }];
  const api = district({ id: 'lagos-bridge', pre: 'br', name: 'Lekki-Ikoyi Bridge', bounds: B, seed: 303, creeks, bridges, V: [], H: [], homeNames: ['x'], fill: () => null,
    districts: [{ id: 'd_br_w', name: 'Ikoyi shore', x0: -320, x1: -200, z0: -90, z1: 90, color: '#c8d9b8' }, { id: 'd_br_c', name: 'Five Cowrie Creek', x0: -200, x1: 200, z0: -90, z1: 90, color: '#b9d6e0' }, { id: 'd_br_e', name: 'Lekki shore', x0: 200, x1: 320, z0: -90, z1: 90, color: '#d4d8b8' }],
    spawns: spawnsAround([[-290, 0], [290, 0], [-250, 20]]), billboards: 0,
    links: [link('to-vi', 'Road to Ikoyi', 'lagos-vi-ikoyi', -306, 0, 215, -10, 0), link('to-lekki', 'Road to Lekki', 'lagos-lekki', 306, 0, -195, 0, 0)],
    build(a) { a.city.roads.push({ id: 'br_link', name: 'Lekki-Ikoyi Link Bridge', x1: -320, z1: 0, x2: 320, z2: 0, width: 8.6 }); a.city.roundabouts.push({ id: 'br_ra1', name: 'Ikoyi Roundabout', x: -300, z: 0, outerR: 15, islandR: 6 }, { id: 'br_ra2', name: 'Lekki Roundabout', x: 300, z: 0, outerR: 15, islandR: 6 }); a.city.roads.push({ id: 'br_side1', name: 'Shore Road', x1: -300, z1: -90, x2: -300, z2: 90, width: 10 }, { id: 'br_side2', name: 'Estate Road', x1: 300, z1: -90, x2: 300, z2: 90, width: 10 });
      for (const [x, z, f] of [[-255, 45, [0, -1]], [-255, -45, [0, 1]], [255, 45, [0, -1]], [255, -45, [0, 1]]]) a.add({ kind: 'office', x, z, w: 24, d: 18, h: 8, floors: 2, color: '#c4b8a2', face: f }); },
    extraLoops: [{ id: 'br_loop', pts: (() => { const p = []; for (let x = -292; x <= 292; x += 8) p.push([x, -2.4]); for (let x = 292; x >= -292; x -= 8) p.push([x, 2.4]); return p; })(), npcs: ['car', 'danfo', 'keke'], dense: true }] });
  api.city.zones = [{ id: 'br_zw', x0: -316, x1: -214, z0: -84, z1: 84 }, { id: 'br_ze', x0: 214, x1: 316, z0: -84, z1: 84 }]; write(api.city);
}

// ======================= LEKKI =================================================================================
{
  const B = { minX: -240, maxX: 260, minZ: -200, maxZ: 170 };
  const api = district({ id: 'lagos-lekki', pre: 'lk', name: 'Lekki', bounds: B, seed: 404, water: WATER(B), marketLabel: 'Market',
    V: [{ x: -160, name: 'Admiralty Way' }, { x: -40, name: 'Lekki Phase 1 Road' }, { x: 80, name: 'Palm Avenue' }, { x: 180, name: 'Coastal Road' }], H: [{ z: -110, name: 'Estate Road' }, { z: 0, name: 'Link Road' }, { z: 90, name: 'Beach Road' }],
    homeNames: ['Phase 1 Court', 'Palm Estate Flat', 'Admiralty Flats', 'Lekki Gardens Rooms', 'Estate Duplex', 'Ocean Close', 'Coral Court', 'Lagoon View Flats', 'Pearl Estate', 'Sunrise Close', 'Marina Estate', 'Orchid Court'], maxHomes: 16,
    curves: [curveRoad('lk_cv1', 'Palm Crescent', [80, -105], [130, -60], [180, -105], 10)],
    districts: [{ id: 'd_lk1', name: 'Lekki Phase 1', x0: -240, x1: 80, z0: -200, z1: 90, color: '#d4d8b8' }, { id: 'd_lkest', name: 'Lekki estates', x0: 80, x1: 260, z0: -200, z1: 90, color: '#c8d9b8' }, { id: 'd_lkbeach', name: 'Eleko Beach', x0: 80, x1: 260, z0: 90, z1: 170, color: '#f1e2b0' }, { id: 'd_lkjetty', name: 'Tarkwa Bay jetty', x0: -240, x1: 80, z0: 90, z1: 170, color: '#e3e6c8' }],
    spawns: spawnsAround([[-120, 45], [20, 45], [200, 58]]),
    links: [link('to-bridge', 'Lekki-Ikoyi Bridge road', 'lagos-bridge', -226, 0, 268, 0, 3.14)],
    fill: (i, j) => ({ '0,0': ['houses', ['duplex', 'flat2', 'mansion'], 1.6, 2], '1,0': ['houses', ['duplex', 'mansion', 'flat2'], 1.7, 2], '2,0': ['houses', ['mansion', 'duplex'], 1.9, 2], '3,0': ['houses', ['duplex', 'mansion'], 1.8, 2], '4,0': ['houses', ['bungalow', 'duplex'], 1.6, 2], '0,1': ['houses', ['flat2', 'bungalow'], 1.4, 2], '1,1': ['houses', ['duplex', 'flat2'], 1.5, 2], '3,1': ['houses', ['duplex', 'mansion'], 1.7, 2], '4,1': ['houses', ['bungalow', 'flat2'], 1.4, 2], '0,2': 'none', '1,2': 'none' }[`${i},${j}`]),
    billboards: 7, build(a) {
      const m = a.shop('shop_mart', 'lk_shop_mart', 20, 30, [0, -1], 'Lekki Mart'); a.job('job_shop', m.s.x - 8, m.s.z, 'Lekki Mart (staff entrance)'); a.job('job_rider', -100, 40, 'Rider Dispatch Hub');
      const cb = a.venueBuilding('office', 'Beach Canteen', 222, 38, 26, 18, 6, [0, -1], '#c8553d'); const ms = eatery(a, 'lk', 'Beach Canteen', cb); a.venue('lk_venue_canteen', cb, { name: 'Beach Canteen', blurb: 'Eat, then challenge somebody to Whot or Ayo.', hours: [6, 22], sign: '#c8553d', shopId: ms.id, stations: clone(MAMAPUT.stations).map(s => (s.shopId ? { ...s, shopId: ms.id } : s)), room: clone(MAMAPUT.room) });
      const sb = a.venueBuilding('stadium', 'City Stadium', 130, 45, 80, 66, 16, [0, -1], '#d7d4cc', { model: 'stadium', nocollideCheck: false }); stadiumVenue(a, 'lk', sb);
      a.city.carParks.push({ id: 'lk_cp_stadium', name: 'Stadium Car Park', x: 222, z: 70, w: 32, d: 18, gate: 'w', fee: 0, kind: 'venue', venueId: 'lk_venue_stadium', blurb: 'Free for match-goers (ESTIMATE rule: fee 0).' });
      a.billboard('road_billboard', 'major', 100, -12, 0, 1, 12, 6, 9); a.billboard('road_billboard', 'major', 160, -12, 0, 1, 12, 6, 9); // stadium-side ad inventory
      clinic(a, 'lk', -200, 40, [1, 0]); const pos = a.add({ kind: 'kiosk', x: -60, z: 40, w: 10, d: 8, h: 4, floors: 1, color: '#4aa3ff', face: [0, -1] }); a.job('job_pos', pos.x, pos.z + 7, 'POS kiosk');
      a.city.landmarks.push({ id: 'plaza', kind: 'plaza', name: 'Lekki Phase 1 Roundabout Garden', x: 20, z: -58, cx: 20, cz: -55, size: 44 });
      a.city.landmarks.push({ id: 'eleko', kind: 'beach', name: 'Eleko Beach', x: 170, z: 135, cx: 170, cz: 135, w: 150, d: 66, huts: 6 });
      a.city.landmarks.push({ id: 'tarkwa', kind: 'beach', name: 'Tarkwa Bay', x: -30, z: 252, cx: -30, cz: 252, w: 150, d: 60, huts: 4, note: 'Reached by boat only (the channel has no bridge).' });
      a.city.landmarks.push({ id: 'tarkwa_jetty', kind: 'jetty', name: 'Lekki jetty', x: -80, z: 152, z2: 182 });
      a.city.landmarks.push({ id: 'tarkwa_jetty2', kind: 'jetty', name: 'Tarkwa Bay jetty', x: 10, z: 216, z2: 196 });
      for (const [lm] of [[0]]) void lm;
    }, extraLoops: [] });
  // Tarkwa Bay island (10 Oct 2026): the district grows south past a boat-only channel. Roads stay on the old land; the channel has no gaps, so you need a boat.
  const NB = { ...B, maxZ: 290 }; api.city.bounds = NB; api.city.water = WATER(NB);
  api.city.creeks = [{ id: 'lk_bay', name: 'Tarkwa Bay channel', x0: NB.minX, x1: NB.maxX, z0: 178, z1: 216, gaps: [], y: -3.6, axis: 'x' }];
  for (const d of api.city.districts) if (d.id === 'd_lkjetty') d.z1 = 178; api.city.districts.push({ id: 'd_tarkwa', name: 'Tarkwa Bay island', x0: NB.minX, x1: NB.maxX, z0: 216, z1: 290, color: '#f1e2b0' });
  api.city.zones.push({ id: 'lk_tz', x0: -100, x1: 60, z0: 224, z1: 280 });
  api.city.boat = { stops: [{ id: 'lk_jetty', name: 'Lekki jetty', x: -80, z: 162, r: 14, berth: { x: -80, z: 192 }, out: [1, 0], arrive: { x: -80, z: 160, ry: 0 } }, { id: 'lk_tarkwa', name: 'Tarkwa Bay jetty', x: 10, z: 226, r: 14, berth: { x: 10, z: 204 }, out: [1, 0], arrive: { x: 10, z: 226, ry: 0 } }],
    routes: [{ from: 'lk_jetty', to: 'lk_tarkwa', fare: 600, crossMs: 24000 }, { from: 'lk_tarkwa', to: 'lk_jetty', fare: 600, crossMs: 24000 }, { from: 'lk_jetty', to: 'isl_marina', fare: 900, crossMs: 30000 }] };
  write(api.city);
}

// ---- mainland: National Theatre landmark + link to the island (idempotent) --------------------------------------
{
  const f = new URL('../server/config/cities/lagos-mainland.json', import.meta.url); const c = JSON.parse(fs.readFileSync(f));
  c.buildings = c.buildings.filter(b => b.model !== 'theatre'); { c.buildings.push({ kind: 'landmark', model: 'theatre', x: -202, z: 139.5, w: 56, d: 22, h: 18, floors: 1, color: '#d8d6cf', face: [0, -1], label: 'National Theatre', id: 'b_theatre', nocollideCheck: true }); }
  c.links = [{ id: 'to-island', name: 'Third Mainland Bridge road', to: 'lagos-island', x: 120, z: 140, r: 16, fare: 200, arrive: { x: -190, z: -10, ry: 0 } }];
  fs.writeFileSync(f, JSON.stringify(c, null, 1)); console.log('mainland: National Theatre + link added');
}
