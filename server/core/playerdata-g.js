// Player data held by the Track G features (businesses, marketplace, clubs, events, pass and skins, flights...), registered with the account module so
// "Download my data" lists it and "Close my account" cleans it (docs/ACCOUNT_DATA.md). Each feature adds its own block below.
import { registerPlayerData } from './account.js';
const all = (app, sql, ...a) => app.db.prepare(sql).all(...a);
const del = (app, sql, ...a) => app.db.prepare(sql).run(...a);

registerPlayerData('businesses',
  (app, uid) => ({ businesses: all(app, 'SELECT id, type, city_id, name, level, paid, bought_at, earned_total FROM businesses WHERE user_id=?', uid), staff: all(app, 'SELECT s.name, s.skill, s.wage, s.hired_at, s.business_id FROM business_staff s JOIN businesses b ON b.id=s.business_id WHERE b.user_id=?', uid) }),
  (app, uid) => { del(app, 'DELETE FROM business_staff WHERE business_id IN (SELECT id FROM businesses WHERE user_id=?)', uid); del(app, 'DELETE FROM businesses WHERE user_id=?', uid); },
  'ledger entries for business purchases and income stay (anonymised); an unsold business is closed and its value is forfeited with the account');

registerPlayerData('marketplace',
  (app, uid) => ({ listings: all(app, 'SELECT id, kind, item_ref, ask, base_value, status, created_at, sold_at, buyer_id FROM market_listings WHERE seller_id=? ORDER BY id', uid), purchases: all(app, "SELECT id, kind, item_ref, ask, sold_at FROM market_listings WHERE buyer_id=? AND status='sold' ORDER BY id", uid) }),
  (app, uid) => { del(app, "DELETE FROM market_listings WHERE seller_id=? AND status IN ('open','expired','returned')", uid); },
  'listings still open or expired are removed and the item held in them is forfeited; finished sales stay (the other player\'s history and the ledger need them) with your player id anonymised');
