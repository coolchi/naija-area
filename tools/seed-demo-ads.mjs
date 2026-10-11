#!/usr/bin/env node
// Load the 40 demo ad creatives (8 FICTIONAL brands x 5 surfaces) onto a running game, through the real advertiser/admin flow. Docs: docs/DEMO_ADS_SEED.md
//   node tools/seed-demo-ads.mjs --dir <ad_creatives folder> [--dry-run] [--days 30] [--json]
// <dir> holds brands.json, creatives/manifest.json, creatives/<brand>/<brand>__<surface>_<WxH>.png and (optional) creatives_extra/<brand>/*billboard*.png (more billboard designs for the exclusive brand).
// Uses the database the server uses (NA_DATABASE_URL / NA_DB). With Postgres the live server holds the single-writer lock, so this script opens the database as a SECOND, short-lived client
// (NA_DB_SINGLE_INSTANCE=0 is set below, for this process only). It touches only demo rows (advertiser e-mail @demo.naija-area.invalid, campaigns with is_demo=1) and never edits real campaigns.
import fs from 'node:fs'; import path from 'node:path';
process.env.NA_DB_SINGLE_INSTANCE = '0';   // this process only; the live server keeps its lock
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; }; const flag = (k) => process.argv.includes('--' + k);
const dir = path.resolve(arg('dir', new URL('../../ad_creatives', import.meta.url).pathname));
const { buildServer } = await import('../server/createServer.js'); const { seedDemoCatalog, DEMO_EMAIL_DOMAIN } = await import('../server/core/demo-ads.js'); const { RATE_CARD, maxCreatives } = await import('../server/config/ratecard.js');

const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'creatives', 'manifest.json'), 'utf8')); const brands = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(dir, 'brands.json'), 'utf8')).brands.map(b => [b.id, b]));
const read = (m) => fs.readFileSync(path.join(dir, m.file)); const one = (brand, surf) => { const m = manifest.find(x => x.brand === brand && x.surface === surf); if (!m) throw new Error(`manifest has no ${brand}/${surf}`); return read(m); };
const extras = (brand) => { const d = path.join(dir, 'creatives_extra', brand); return fs.existsSync(d) ? fs.readdirSync(d).filter(f => /billboard.*\.png$/.test(f)).sort().map(f => fs.readFileSync(path.join(d, f))) : []; };

// THE LAYOUT (edit here). Order matters: the exclusive board is created first so it takes a whole board before the shared campaigns are placed.
//   road_billboard : 1 EXCLUSIVE campaign on a Major board (Jolly Pot alone, 4 designs rotating), then SHARED campaigns of 7 other brands (4 on Major, 3 on Street)
//   shop_front, lagoon_plot, radio_spot : one SHARED campaign per brand (8 each)
//   ride_car : the livery board has 4 positions, so 4 brands get a SHARED campaign (the other 4 liveries stay unused; see the docs)
const EXCL = arg('exclusive', 'jolly-pot'); const ids = Object.keys(brands); const others = ids.filter(b => b !== EXCL);
const plan = []; const add = (brandId, surface, tier, placement, images) => plan.push({ brandId, brand: brands[brandId].name, headline: brands[brandId].headline, linkUrl: `https://example.com/demo/${brandId}`, surface, tier, placement, days: Number(arg('days', 30)), images });
{ const imgs = [one(EXCL, 'billboard'), ...extras(EXCL)].slice(0, maxCreatives('road_billboard', 'exclusive')); add(EXCL, 'road_billboard', 'major', 'exclusive', imgs); if (imgs.length < 4) console.warn(`NOTE: the exclusive board has only ${imgs.length} design(s) (creatives_extra/${EXCL} is missing or short)`); }
others.forEach((b, i) => add(b, 'road_billboard', i < 4 ? 'major' : 'street', 'shared', [one(b, 'billboard')]));
for (const b of ids) add(b, 'shop_front', 'shop', 'shared', [one(b, 'shopfront')]);
for (const b of ids) add(b, 'lagoon_plot', 'plot6x6', 'shared', [one(b, 'lagoon')]);
for (const b of ids) add(b, 'radio_spot', 'station', 'shared', [one(b, 'radio')]);
{ const positions = RATE_CARD.surfaces.ride_car.positionsPerBoard; const boards = 1; for (const b of ids.slice(0, positions * boards)) add(b, 'ride_car', 'fleet', 'shared', [one(b, 'livery')]); }

const s = buildServer({ quiet: true });
try {
  const r = seedDemoCatalog(s.app, plan, { dryRun: flag('dry-run'), log: flag('json') ? undefined : (m) => console.log(m) });
  const by = (rows) => rows.reduce((o, c) => (o[c.surface] = (o[c.surface] || 0) + 1, o), {});
  const live = s.app.db.prepare("SELECT surface, COUNT(*) n FROM ad_campaigns WHERE is_demo=1 AND status IN ('scheduled','live') GROUP BY surface").all();
  const summary = { dryRun: flag('dry-run'), created: r.created.length, createdBySurface: by(r.created), skippedAlreadyThere: r.skipped.length, failed: r.failed, demoCampaignsRunningNow: Object.fromEntries(live.map(x => [x.surface, Number(x.n)])), boards: r.created.map(c => `${c.surface}:${c.tier} ${c.placement} ${c.brand} -> ${c.slot || '-'} (#${c.campaignId} ${c.status})`) };
  if (flag('json')) console.log(JSON.stringify(summary, null, 1)); else { console.log(`\nDemo seed ${flag('dry-run') ? '(DRY RUN) ' : ''}done: ${summary.created} created, ${summary.skippedAlreadyThere} already there, ${r.failed.length} failed.`); console.log('created per surface:', JSON.stringify(summary.createdBySurface)); console.log('demo campaigns scheduled/live now:', JSON.stringify(summary.demoCampaignsRunningNow)); for (const l of summary.boards) console.log('  ' + l); }
  process.exitCode = r.failed.length ? 1 : 0;
} finally { await s.close(); }
