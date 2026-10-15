process.env.NA_BCRYPT_COST = '4';
import { buildServer } from '../server/createServer.js';
import { dispatch } from '../server/core/routes.js';
import { makePng } from '../server/lib/png.js';
import * as auth from '../server/core/auth.js';
import { teleport } from '../server/core/world.js';
import { BALANCE } from '../server/config/balance.js';
import { WEATHER } from '../server/config/weather.js';

// NA_TEST_PG_URL=postgres://... (set by `npm run test:pg`) runs EVERY test against real Postgres: each server gets its own throw-away schema. Default: in-memory SQLite.
export const PG_URL = process.env.NA_TEST_PG_URL || null;
let schemaN = 0; const tag = Math.random().toString(36).slice(2, 8);
export function makeServer(opts = {}) {
  const balance = structuredClone(BALANCE); balance.shops.enforceHours = false; balance.weather = { ...WEATHER, forced: 'clear' }; // tests never depend on the real clock's weather (weather tests set their own)
  const pg = PG_URL && !opts.dbPath && opts.databaseUrl === undefined ? { databaseUrl: PG_URL, databaseSchema: `t_${tag}_${++schemaN}` } : {};
  // mail off by default so tests never call a real MailDESK key from the shell env
  return buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'test-admin', dev: true, balance, mailConfig: { enabled: false, apiKey: '', from: '' }, ...pg, ...opts });
}
export async function call(s, method, path, { uid, body, query, raw, headers = {}, admin, ua, ip = '10.0.0.1' } = {}) {
  const [p, qs] = path.split('?'); const q = { ...(qs ? Object.fromEntries(new URLSearchParams(qs)) : {}), ...(query || {}) };
  return dispatch(s.app, { method, path: p, query: q, body, raw, headers, ip, ua, uid, isAdmin: !!admin });
}
export const ok = async (s, method, path, opts) => { const r = await call(s, method, path, opts); if (r.status !== 200) throw new Error(`${method} ${path} -> ${r.status} ${JSON.stringify(r.json)}`); return r.json; };
let n = 0;
export function mkUser(s, { cash, guest = false, bot = false, ageMs = 0 } = {}) {
  const uid = auth.newPlayer(s.app, { username: `${bot ? 'bot' : guest ? 'Guest' : 'user'}${++n}_${Math.floor(Math.random() * 1e6)}`.slice(0, 20), isGuest: guest, isBot: bot, ageConfirmed: true, cash });
  if (ageMs) s.app.clock.advance(ageMs);
  return uid;
}
export const at = (s, uid, x, z) => teleport(s.app, uid, x, z);
export const png = (w = 1024, h = 512) => makePng(w, h, (x, y) => [(x * 255 / w) | 0, 120, (y * 255 / h) | 0], 0);
export const jobPos = (s, jobLocId) => s.app.city.jobLoc[jobLocId];
export const HOUR = 3600000, DAY = 86400000;
export async function newAdvertiser(s, brand = 'Test Brand') { const r = await ok(s, 'POST', '/api/advertiser/register', { body: { email: 'ads@example.com', brand } }); return r.key; }
export async function submitAd(s, key, { pngW = 1024, pngH = 512, ...over } = {}) {
  const up = await ok(s, 'POST', '/api/ads/upload', { raw: png(pngW, pngH), headers: { 'x-advertiser-key': key, 'content-type': 'image/png' } });
  const body = { creativeId: up.creativeId, surface: 'road_billboard', tier: 'street', units: 1, days: 7, linkUrl: 'https://brand.example.com/promo', headline: 'Fresh deals', testModeAck: true, ...over };
  return call(s, 'POST', '/api/ads/campaigns', { body, headers: { 'x-advertiser-key': key } });
}
