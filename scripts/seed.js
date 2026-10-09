// `npm run seed`: demo data for the file DB: resident players (flagged bots) with homes, names and furniture, a few land plots,
// and three advertisers with approved, live demo campaigns (generated placeholder creatives). Idempotent: skips if already seeded.
import { buildServer } from '../server/createServer.js';
import { newPlayer } from '../server/core/auth.js';
import * as eco from '../server/core/economy.js';
import * as ads from '../server/core/ads.js';
import { buyPlot } from '../server/core/social.js';
import { teleport } from '../server/core/world.js';
import { makePng } from '../server/lib/png.js';

const s = buildServer({ quiet: true }); const app = s.app; const db = app.db;
if (db.prepare("SELECT 1 FROM users WHERE username='ade_ojo_bot'").get()) { console.log('Already seeded (ade_ojo_bot exists). Nothing to do.'); await s.close(); process.exit(0); }
const mk = (name, cash) => newPlayer(app, { username: name, isBot: true, ageConfirmed: true, cash });
const residents = [['ade_ojo_bot', 'Villa Ojo', 'h01', ['sofa', 'tv']], ['chioma_k_bot', "Chi's Corner", 'h02', ['fridge', 'plant', 'rug']], ['tunde_ib_bot', 'Mama Tunde Place', 'h03', ['sofa', 'plant']]];
const props = app.city.properties.filter(p => p.tier === 1);
residents.forEach(([name, house, , items], i) => {
  const uid = mk(name, 40000); const p = props[i]; teleport(app, uid, p.door.x, p.door.z); eco.acquireProperty(app, uid, p.id, 'rent', `seed${i}`); eco.nameProperty(app, uid, house);
  for (const it of items) eco.placeFurniture(app, uid, it, undefined, undefined, 0, `seedf${i}${it}`); eco.bankMove(app, uid, 'deposit', 5000, `seedb${i}`);
});
const rich = mk('landlord_bot', 5000000); const plot = app.city.plots[0]; teleport(app, rich, plot.x, plot.z + 20); buyPlot(app, rich, plot.id, 'seedplot');
// advertisers + creatives (simple generated banners; real brands would upload their own)
const brands = [['Mama Tee Foods (demo)', 'demo1@example.com', 'Fresh jollof, hot every day', [0, 135, 81], 'road_billboard', 'major', 1024, 512], ['Eko Telecom (demo)', 'demo2@example.com', 'Data that no dey finish', [255, 194, 14], 'road_billboard', 'street', 1024, 512], ['Lagoon Realty (demo)', 'demo3@example.com', 'Your plot by the water', [30, 90, 160], 'lagoon_plot', 'plot6x6', 768, 768]];
for (const [brand, email, headline, col, surface, tier, w, h] of brands) {
  const a = ads.getOrCreateAdvertiser(app, { email, brand }); const img = makePng(w, h, (x, y) => { const stripe = ((x + y) >> 6) & 1; const k = stripe ? 1 : 0.82; const edge = x < 24 || y < 24 || x > w - 24 || y > h - 24 ? 0.55 : 1; return [col[0] * k * edge, col[1] * k * edge, col[2] * k * edge]; }, 6);
  const up = ads.uploadCreative(app, a.id, img, 'image/png'); const id = ads.createCampaign(app, a.id, { surface, tier, units: 1, days: 30, creativeId: up.creativeId, headline, linkUrl: 'https://example.com/' + brand.split(' ')[0].toLowerCase(), testModeAck: true }, { demo: true });
  if (db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status === 'human_review') ads.decide(app, id, 'approve', 'seed', 'demo');
}
ads.tickAds(app); console.log('Seeded: 4 resident bots (3 with homes, 1 with land) and 3 live demo campaigns. Run `npm start` (or `npm run bots`).'); await s.close();
