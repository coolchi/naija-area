import { SCHEMA, migrate } from './schema.js';
import { ensureSystemAccounts } from './ledger.js';
import { indexCity } from './city.js';
import { createWorld } from './world.js';
import { Limiter } from './util.js';
import { installSocial } from './social.js';
import { carValue } from './cars.js';
import { palette } from './homes.js';
import { GAME_NAME } from '../config/game.js';
import { BALANCE } from '../config/balance.js';

/** Build the app object shared by every core module. db must offer better-sqlite3's API (prepare/transaction/exec). */
export function createApp({ db, platform, cityJson, balance = BALANCE, clock, gameName = GAME_NAME, filterHeadless = true }) {
  db.exec(SCHEMA); migrate(db);
  ensureSystemAccounts(db);
  const offset = { ms: 0 };
  const app = {
    db, platform, balance, gameName, filterHeadless, city: indexCity(cityJson), world: createWorld(), limiter: new Limiter(),
    clock: clock || { now: () => Date.now() + offset.ms, advance: (ms) => { offset.ms += ms; } }, adsVersion: 1, pushUser: null
  };
  installSocial(app); app.carValue = (uid) => carValue(app, uid); app.palette = () => palette(app);
  return app;
}
