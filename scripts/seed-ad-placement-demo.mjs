// Seed the demo ad sets for exclusive vs shared placement from the rendered creative files (../ad_creatives/creatives/manifest.json by default).
// Usage: node scripts/seed-ad-placement-demo.mjs [--manifest path] [--exclusive jolly-pot] [--shared yarn-mobile,korope-rides,paddipay] [--tier mega] [--days 30]
// Uses the database the server uses (NA_DB / NA_DATABASE_URL). Idempotent per brand name: run it once on a fresh database. All brands are FICTIONAL demo brands, test mode.
import fs from 'node:fs'; import path from 'node:path';
import { buildServer } from '../server/createServer.js'; import { seedPlacementDemo } from '../server/core/demo-ads.js'; import { RATE_CARD } from '../server/config/ratecard.js';
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const manifestPath = path.resolve(arg('manifest', new URL('../../ad_creatives/creatives/manifest.json', import.meta.url).pathname)); const baseDir = path.dirname(path.dirname(manifestPath));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); const brandsFile = path.join(baseDir, 'brands.json'); const brands = fs.existsSync(brandsFile) ? Object.fromEntries(JSON.parse(fs.readFileSync(brandsFile, 'utf8')).brands.map(b => [b.id, b])) : {};
const surface = arg('surface', 'road_billboard'), tier = arg('tier', 'mega'), aspect = RATE_CARD.surfaces[surface].aspect;
const imagesOf = (id) => manifest.filter(m => m.brand === id && Math.abs(m.w / m.h - aspect) / aspect < 0.2).map(m => fs.readFileSync(path.join(baseDir, m.file)));
const known = [...new Set(manifest.map(m => m.brand))]; const exId = arg('exclusive', known[0]); const shIds = (arg('shared') ? arg('shared').split(',') : known.filter(b => b !== exId).slice(0, 3));
const entry = (id) => ({ brand: brands[id]?.name || id, headline: brands[id]?.headline || id, linkUrl: `https://example.com/${id}`, email: `${id}@example.com`, images: imagesOf(id) });
const s = buildServer({ quiet: true }); try {
  const r = seedPlacementDemo(s.app, { surface, tier, days: Number(arg('days', 30)), exclusive: entry(exId), shared: shIds.map(entry) });
  console.log(`Exclusive board ${r.exclusive.slot}: ${exId} (${r.exclusive.designs} designs rotate). Shared board ${r.shared[0]?.slot}: ${r.shared.map(x => `${x.brand} (${x.designs})`).join(', ')}`);
} finally { await s.close(); }
