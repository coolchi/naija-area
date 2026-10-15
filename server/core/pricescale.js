// Purchase prices are 10x the numbers written in the config files. Wages, rewards and exclusive cars stay as written.
import { WEARABLES } from '../config/wearables.js';
import { SKINS } from '../config/skins.js';
import { EVENTS } from '../config/events.js';
import { BUSINESS } from '../config/business.js';
import { CLUBS } from '../config/clubs.js';
import { PASS } from '../config/pass.js';
import { GUNS } from '../config/guns.js';
import { BODYGUARD } from '../config/bodyguards.js';

// NA_PRICE_SCALE=0 leaves the config numbers as written (the test suite). Anything else, including production, multiplies purchase prices by 10.
export const PRICE_SCALE = process.env.NA_PRICE_SCALE === '0' ? 1 : 10;
const KEYS = new Set(['price', 'rent', 'fare', 'fee', 'cost', 'upgrade', 'base', 'ticketFee', 'serviceFee', 'cancelFee', 'drinkFee', 'vipFee', 'feePerPoint', 'feePerCarPoint', 'minFee', 'koFee', 'repairPerPoint', 'createFee', 'premiumPrice', 'weekFee', 'dayFee', 'yearFee', 'carFee']);

function walk(node, scale, seen) {
  if (!node || typeof node !== 'object' || seen.has(node)) return;
  if (node.exclusive) return;
  seen.add(node);
  if (Array.isArray(node)) { for (const x of node) walk(x, scale, seen); return; }
  for (const [k, v] of Object.entries(node)) {
    if (typeof v === 'number' && Number.isInteger(v) && v > 0 && KEYS.has(k)) node[k] = v * scale;
    else if (v && typeof v === 'object') walk(v, scale, seen);
  }
}

let cataloguesScaled = false;
function scaleCatalogues(scale) {
  if (cataloguesScaled || scale === 1) return;
  const seen = new Set();
  walk(WEARABLES, scale, seen);
  walk(SKINS, scale, seen);
  walk(EVENTS, scale, seen);
  walk(BUSINESS, scale, seen);
  walk(CLUBS, scale, seen);
  walk(PASS, scale, seen);
  walk(GUNS, scale, seen);
  walk(BODYGUARD, scale, seen);
  cataloguesScaled = true;
}

/** Scale a fresh copy of the balance config and of each city. Never mutates the originals. */
export function scaleWorld(balance, cityJson, extraCities = []) {
  const scale = PRICE_SCALE;
  if (scale === 1) return { balance, cityJson, extraCities };
  scaleCatalogues(scale);
  const b = structuredClone(balance);
  const seen = new Set();
  walk(b, scale, seen);
  if (b.games?.stakes) b.games.stakes = b.games.stakes.map(n => (Number.isInteger(n) && n > 0 ? n * scale : n));
  if (b.flight?.fares) for (const k of Object.keys(b.flight.fares)) if (Number.isInteger(b.flight.fares[k]) && b.flight.fares[k] > 0) b.flight.fares[k] *= scale;
  const city = (raw) => { const c = structuredClone(raw); walk(c, scale, new Set()); return c; };
  return { balance: b, cityJson: city(cityJson), extraCities: extraCities.map(city) };
}
