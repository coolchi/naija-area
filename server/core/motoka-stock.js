// Motoka AutoMart outdoor stock: every car parked on the forecourt and in the Auto Mart car park is for sale.
// Exclusive models (supercars) share one daily pool: at most `supercarDailyStock` are shown and sold each Lagos day.
import { bays } from './carparks-layout.js';
import { dayKey, dayStart } from './rewards.js';

export const exclusiveIds = (app) => Object.entries(app.balance.cars.models).filter(([, m]) => m.exclusive).map(([id]) => id);

/** Showcase row in front of Motoka (left→right): McLaren, Cybertruck, G63 — clustered on the facade. */
export const FRONT_SHOW = ['mclaren', 'cyber', 'g63'];
/** Prefer these for the east/west flanks (no Cybertruck — too long for the side alleys). */
export const SIDE_SHOW = ['gwagon', 'mclaren', 'g63', 'gwagon', 'mclaren', 'g63'];

/** Half-length along forward axis (metres) so nose-in parking keeps the whole body clear of the wall. */
const HALF_LEN = { mclaren: 2.95, g63: 2.55, cyber: 4.05, gwagon: 2.45 };
/** Extra metres toward the road (smaller z) so rears/tires stay clear of the forecourt edge. */
const FORWARD_EXTRA = { g63: 0.95, mclaren: 0.35, cyber: 0.2 };
/** How wide the three-car display row is (centred on Motoka); keep them together on the main frontage. */
const FRONT_ROW_W = 15;
/** Cars per flank (east and west walls), nose pointing outward. */
const SIDE_PER_FLANK = 3;
/** Gap between rear bumper and the side wall. */
const SIDE_REAR_GAP = 0.5;

export function supercarsSoldToday(app, now = app.clock.now()) {
  const ids = exclusiveIds(app); if (!ids.length) return 0;
  const start = dayStart(dayKey(now));
  const marks = ids.map(() => '?').join(',');
  return Number(app.db.prepare(`SELECT COUNT(*) AS n FROM ledger_tx WHERE reason='car_purchase' AND ref IN (${marks}) AND created_at>=?`).get(...ids, start).n) || 0;
}

export function supercarsLeft(app, now = app.clock.now()) {
  const cap = app.balance.cars.supercarDailyStock ?? 20;
  return Math.max(0, cap - supercarsSoldToday(app, now));
}

function rowOf(m) {
  return { model: m.id, name: m.name, color: m.color, body: m.body || (m.exclusive ? 'suv' : 'hatch'), exclusive: !!m.exclusive, price: m.price };
}

/** Catalogue rows the yard should park today. Regular models always; exclusive units equal the remaining daily stock, grouped by model. */
export function motokaCatalogue(app, now = app.clock.now()) {
  const C = app.balance.cars; const left = supercarsLeft(app, now);
  const regular = Object.entries(C.models).filter(([, m]) => !m.exclusive).map(([id, m]) => rowOf({ id, ...m, exclusive: false }));
  const exclusives = Object.entries(C.models).filter(([, m]) => m.exclusive);
  const stock = [...regular];
  // Same models stay together: fill each exclusive type in turn so the lot can park them side-by-side.
  const n = Math.max(1, exclusives.length);
  const base = Math.floor(left / n), extra = left % n;
  exclusives.forEach(([id, m], i) => {
    const count = base + (i < extra ? 1 : 0);
    for (let k = 0; k < count; k++) stock.push(rowOf({ id, ...m, exclusive: true }));
  });
  return { stock, supercarsLeft: left, supercarsDaily: C.supercarDailyStock ?? 20 };
}

function takeModel(byModel, id) {
  const list = byModel.get(id);
  if (!list?.length) return null;
  return list.shift();
}

function takeSideCar(byModel, prefer) {
  for (const id of prefer) {
    const s = takeModel(byModel, id);
    if (s) return s;
  }
  for (const [id, list] of byModel) {
    if (!list.length) continue;
    const s = list[0];
    if (s.exclusive) return list.shift();
  }
  return null;
}

/** Place Motoka stock: front facade row, east/west flank supercars, then the car-park bays. */
export function motokaSpots(city, stock) {
  const v = (city.venues || []).find((x) => x.id === 'venue_motors'); if (!v) return [];
  const building = (city.buildings || []).find((x) => x.id === v.buildingId) || null;
  const lot = (city.carParks || []).find((x) => x.id === 'cp_motors' || x.venueId === 'venue_motors');
  const park = lot ? bays(lot) : [];

  // Forecourt south of Motoka's front wall. Face of Motoka is [0,-1] → road is -z; forward=(cos ry, -sin ry) so ry=π/2 noses at the road.
  const bx = building?.x ?? v.x;
  const bz = building?.z ?? (v.z + 8);
  const bw = building?.w ?? 24;
  const bd = building?.d ?? 16;
  const southFace = bz - bd / 2;
  const northFace = bz + bd / 2;
  const westFace = bx - bw / 2;
  const eastFace = bx + bw / 2;
  const rowW = Math.min(FRONT_ROW_W, Math.max(10, bw - 6));
  const x0 = bx - rowW / 2;
  const span = rowW;

  const byModel = new Map();
  for (const s of stock) {
    if (!byModel.has(s.model)) byModel.set(s.model, []);
    byModel.get(s.model).push(s);
  }

  const out = [];
  // Front row: nose toward Lagoon Drive.
  const front = [];
  for (const id of FRONT_SHOW) {
    const s = takeModel(byModel, id);
    if (s) front.push(s);
  }
  const faceRoad = Math.PI / 2;
  const rearGap = 0.55;
  const gap = front.length > 1 ? span / (front.length - 1) : 0;
  front.forEach((s, k) => {
    const half = HALF_LEN[s.model] ?? 2.6;
    const nudge = FORWARD_EXTRA[s.model] ?? 0;
    const frontZ = southFace - rearGap - half - nudge;
    out.push({ ...s, x: x0 + k * gap, z: frontZ, ry: faceRoad, place: 'yard' });
  });

  // Flanks: supercars along the east and west walls, nose pointing outward (length into the side alley).
  const zLo = southFace + 2.8;
  const zHi = northFace - 2.2;
  const flankZs = [];
  for (let i = 0; i < SIDE_PER_FLANK; i++) {
    const t = SIDE_PER_FLANK === 1 ? 0.5 : i / (SIDE_PER_FLANK - 1);
    flankZs.push(zLo + t * (zHi - zLo));
  }
  const flanks = [
    { sign: -1, ry: Math.PI }, // west wall → nose west
    { sign: 1, ry: 0 }, // east wall → nose east
  ];
  let sidePick = 0;
  for (const flank of flanks) {
    for (const z of flankZs) {
      const i = sidePick++ % SIDE_SHOW.length;
      const prefer = SIDE_SHOW.slice(i).concat(SIDE_SHOW.slice(0, i));
      const s = takeSideCar(byModel, prefer);
      if (!s) break;
      const half = HALF_LEN[s.model] ?? 2.6;
      const wall = flank.sign < 0 ? westFace : eastFace;
      const x = wall + flank.sign * (SIDE_REAR_GAP + half);
      out.push({ ...s, x, z, ry: flank.ry, place: 'yard' });
    }
  }

  const rest = [];
  for (const list of byModel.values()) for (const s of list) rest.push(s);
  for (let i = 0; i < rest.length && i < park.length; i++) {
    const b = park[i], s = rest[i];
    out.push({ ...s, x: b.x, z: b.z, ry: b.ry, place: 'lot' });
  }
  return out;
}
