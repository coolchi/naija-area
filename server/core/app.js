import { SCHEMA, migrate } from './schema.js';
import { ensureSystemAccounts } from './ledger.js';
import { indexCity, mergeCities, validateCity } from './city.js';
import { createWorld } from './world.js';
import { Limiter } from './util.js';
import { installSocial } from './social.js';
import { carValue } from './cars.js';
import { palette } from './homes.js';
import { GAME_NAME } from '../config/game.js';
import { BALANCE } from '../config/balance.js';

/** Build the app object shared by every core module. db must offer better-sqlite3's API (prepare/transaction/exec). */
export function createApp({ db, platform, cityJson, extraCities = [], balance = BALANCE, clock, gameName = GAME_NAME, filterHeadless = true }) {
  if (!db.managedSchema) { db.exec(SCHEMA); migrate(db); } // SQLite: idempotent in-code schema. Postgres: versioned migrations in server/migrations/pg, applied before createApp
  ensureSystemAccounts(db);
  const offset = { ms: 0 };
  for (const raw of [cityJson, ...extraCities]) { const problems = validateCity(raw); if (problems.length) throw new Error(`City config ${raw.id || '?'} is not valid: ${problems.slice(0, 5).join('; ')}`); }
  const city = indexCity(cityJson); const cities = { [city.id]: city }; for (const raw of extraCities) { const c = indexCity(raw); cities[c.id] = c; }
  for (const c of Object.values(cities)) if (c.links) c.links = c.links.filter(l => cities[l.to]); // a link to a city that is not loaded is simply not offered
  const boatStops = {}; for (const c of Object.values(cities)) for (const s of c.boat?.stops || []) boatStops[s.id] = { ...s, city: c.id }; // every jetty, by id, across all loaded cities
  for (const c of Object.values(cities)) if (c.boat) c.boat.routes = (c.boat.routes || []).filter(r => boatStops[r.from]?.city === c.id && boatStops[r.to]); // a route to a jetty that is not loaded is simply not offered
  const app = {
    db, platform, boatStops, balance, gameName, filterHeadless, city, cities, defaultCityId: city.id, all: mergeCities(Object.values(cities)), world: createWorld(), limiter: new Limiter(),
    clock: clock || { now: () => Date.now() + offset.ms, advance: (ms) => { offset.ms += ms; } }, adsVersion: 1, pushUser: null
  };
  installSocial(app); app.carValue = (uid) => carValue(app, uid); app.palette = () => palette(app);
  return app;
}
