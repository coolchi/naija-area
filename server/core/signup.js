// Sign-up choices: your city (where you start), your CITY OF INTEREST (its own step) and your interests. Lists live in server/config/signup.js (assumptions are written there).
import { bad } from './util.js';
import { cityIdOf, enterCity } from './cities.js';
import { assertNotFlying } from './flight.js';
import { INTEREST_OPTIONS, SIGNUP_RULES, START_CLOSED, WISHLIST_CITIES, FALLBACK_CITY } from '../config/signup.js';

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
/** the cities a player can choose: one entry per city name (Lagos groups its districts), enabled ones only. `entry` is the district you start in. */
export function cityChoices(app) {
  const groups = new Map();
  for (const c of Object.values(app.cities)) {
    if (c.enabled === false || c.preview) continue; const name = c.cityName || c.name; const id = slug(name);
    const g = groups.get(id) || { id, name, state: c.state || null, entry: null, districts: 0, blurb: '' }; g.districts++;
    if (!g.entry || c.id === app.defaultCityId || (g.entry !== app.defaultCityId && c.kind !== 'district' && app.cities[g.entry].kind === 'district')) g.entry = c.id; groups.set(id, g);
  }
  return [...groups.values()].map(g => ({ ...g, blurb: g.districts > 1 ? `${g.districts} districts to explore` : (app.cities[g.entry].blurb || 'A city of its own') })).sort((a, b) => (a.id === slug(app.city.cityName || app.city.name) ? -1 : 0) - (b.id === slug(app.city.cityName || app.city.name) ? -1 : 0) || a.name.localeCompare(b.name));
}
/** every city a player can pick at sign-up, open or not: built cities (open unless held back in START_CLOSED), then wished-for cities that are not built yet. `open` = you can start there. */
export function startOptions(app) {
  const built = cityChoices(app).map(c => ({ ...c, open: !START_CLOSED.includes(c.id), built: true })); const have = new Set(built.map(c => c.id));
  const wish = WISHLIST_CITIES.filter(w => !have.has(w.id)).map(w => ({ id: w.id, name: w.name, state: w.state || null, entry: null, districts: 0, blurb: 'Not open yet: you would start in Lagos', open: false, built: false }));
  return [...built.map(c => c.open ? c : { ...c, blurb: 'Not open yet: you would start in Lagos' }), ...wish];
}
const fallbackId = (app) => { const f = cityChoices(app).find(c => c.id === FALLBACK_CITY) || cityChoices(app).find(c => c.entry === app.defaultCityId); return f?.id || FALLBACK_CITY; };
const groupOfCity = (app, cityId) => { const c = app.cities[cityId]; return c ? slug(c.cityName || c.name) : null; };
const row = (app, uid) => app.db.prepare('SELECT * FROM signup_profiles WHERE user_id=?').get(uid);
const parse = (r) => { if (!r) return null; let it = []; try { it = JSON.parse(r.interests); } catch { /* corrupt: none */ } return { homeCity: r.home_city, interestCity: r.interest_city, interests: it, skipped: !!r.skipped, completedAt: r.completed_at, updatedAt: r.updated_at }; };
/** compact view for the profile / auth responses: needed = a registered (non-guest, non-bot) account that has not done or skipped the set-up yet */
export function signupView(app, uid) {
  const u = app.db.prepare('SELECT is_guest,is_bot FROM users WHERE id=?').get(uid); const p = parse(row(app, uid));
  const home = p?.homeCity || groupOfCity(app, cityIdOf(app, uid)); const opt = startOptions(app).find(c => c.id === home);
  return { needed: !p && !!u && !u.is_guest && !u.is_bot, done: !!p && !p.skipped, skipped: !!p?.skipped, homeCity: home, homeName: opt?.name || home, homeOpen: opt ? opt.open : true, startsIn: opt && !opt.open ? (startOptions(app).find(c => c.id === fallbackId(app))?.name || 'Lagos') : null, interestCity: p?.interestCity || null, interests: p?.interests || [] };
}
const lockedHomeOf = (app, prev) => { const h = prev?.home_city; if (!h) return null; const o = startOptions(app).find(c => c.id === h); return o && o.open ? h : null; }; // a wish for a closed city does not lock you in
export function options(app, uid) {
  const cur = signupView(app, uid); const home = groupOfCity(app, cityIdOf(app, uid)); const all = startOptions(app);
  return { cities: all.map(c => ({ id: c.id, name: c.name, state: c.state, blurb: c.blurb, districts: c.districts, open: c.open })), openNow: all.filter(c => c.open).map(c => c.name), fallbackCity: all.find(c => c.id === fallbackId(app))?.name || 'Lagos', interests: INTEREST_OPTIONS, rules: SIGNUP_RULES, current: cur, homeCity: home, homeLocked: !!lockedHomeOf(app, row(app, uid)) };
}
/** save the three choices. First time: the home city moves you there. Later: the home city is locked (travel by plane, boat or road), interests and city of interest stay editable. */
export function save(app, uid, body = {}) {
  const u = app.db.prepare('SELECT is_guest FROM users WHERE id=?').get(uid); if (!u) bad('NO_PLAYER', 'Unknown player.', 401); const now = app.clock.now(); const prev = row(app, uid);
  if (body.skip === true) { if (!prev) app.db.prepare('INSERT INTO signup_profiles(user_id,home_city,interest_city,interests,skipped,completed_at,updated_at) VALUES (?,?,?,?,?,?,?)').run(uid, null, null, '[]', 1, now, now); return { ok: true, skipped: true, signup: signupView(app, uid) }; }
  const choices = startOptions(app); const byId = Object.fromEntries(choices.map(c => [c.id, c]));
  const homeId = body.homeCity == null || body.homeCity === '' ? null : String(body.homeCity); const intId = body.interestCity == null || body.interestCity === '' ? null : String(body.interestCity);
  if (homeId && !byId[homeId]) bad('BAD_CITY', 'Pick a city from the list.'); if (intId && !byId[intId]) bad('BAD_CITY', 'Pick a city of interest from the list.');
  const here = groupOfCity(app, cityIdOf(app, uid)); const lockedHome = lockedHomeOf(app, prev); const home = lockedHome || homeId || prev?.home_city || here; const fallback = byId[home] && !byId[home].open;
  if (lockedHome && homeId && homeId !== lockedHome) bad('HOME_LOCKED', 'Your city is where you live now. Travel by plane, boat or road to move.', 409);
  if (intId && intId === home) bad('SAME_CITY', 'Pick a city OTHER than your own as your city of interest.');
  const list = Array.isArray(body.interests) ? body.interests.map(String) : []; const known = new Set(INTEREST_OPTIONS.map(i => i.id)); const uniq = [...new Set(list)];
  if (uniq.some(i => !known.has(i))) bad('BAD_INTEREST', 'Pick interests from the list.');
  if (uniq.length < SIGNUP_RULES.minInterests) bad('NEED_INTEREST', `Pick at least ${SIGNUP_RULES.minInterests} interest.`); if (uniq.length > SIGNUP_RULES.maxInterests) bad('TOO_MANY_INTERESTS', `Pick at most ${SIGNUP_RULES.maxInterests} interests.`);
  return app.db.transaction(() => {
    let moved = null;
    if (!lockedHome && !fallback && home !== here) { assertNotFlying(app, uid); const p = app.world.players.get(uid); if (p?.venue) bad('INSIDE', 'Step outside first.', 409); moved = enterCity(app, uid, byId[home].entry); }
    if (prev) app.db.prepare('UPDATE signup_profiles SET home_city=?, interest_city=?, interests=?, skipped=0, updated_at=? WHERE user_id=?').run(home, intId, JSON.stringify(uniq), now, uid);
    else app.db.prepare('INSERT INTO signup_profiles(user_id,home_city,interest_city,interests,skipped,completed_at,updated_at) VALUES (?,?,?,?,?,?,?)').run(uid, home, intId, JSON.stringify(uniq), 0, now, now);
    return { ok: true, moved, fallback: fallback ? { wanted: byId[home].name, startsIn: byId[fallbackId(app)]?.name || 'Lagos' } : null, signup: signupView(app, uid) };
  })();
}
/** admin backend: how many players chose what */
export function stats(app) {
  const rows = app.db.prepare('SELECT home_city, interest_city, interests, skipped FROM signup_profiles').all(); const names = Object.fromEntries(startOptions(app).map(c => [c.id, c.name])); const home = {}, interest = {}, topics = {}; let skipped = 0, done = 0;
  for (const r of rows) { if (r.skipped) { skipped++; continue; } done++; if (r.home_city) home[r.home_city] = (home[r.home_city] || 0) + 1; if (r.interest_city) interest[r.interest_city] = (interest[r.interest_city] || 0) + 1; try { for (const i of JSON.parse(r.interests)) topics[i] = (topics[i] || 0) + 1; } catch { /* skip */ } }
  const list = (m, label) => Object.entries(m).sort((a, b) => b[1] - a[1]).map(([id, n]) => ({ id, label: label(id), n }));
  const topicLabel = (id) => INTEREST_OPTIONS.find(i => i.id === id)?.label || id;
  const recent = app.db.prepare('SELECT u.id, u.username, p.home_city, p.interest_city, p.interests, p.skipped, p.completed_at, p.updated_at FROM signup_profiles p JOIN users u ON u.id=p.user_id ORDER BY p.updated_at DESC LIMIT 80').all().map(r => {
    let interests = []; try { interests = JSON.parse(r.interests); } catch { /* corrupt row */ }
    return { id: r.id, username: r.username, home: r.home_city ? (names[r.home_city] || r.home_city) : null, interest: r.interest_city ? (names[r.interest_city] || r.interest_city) : null, interests: interests.map(topicLabel), skipped: !!r.skipped, at: r.updated_at || r.completed_at };
  });
  return { total: rows.length, done, skipped, homeCities: list(home, id => names[id] || id), interestCities: list(interest, id => names[id] || id), interests: list(topics, topicLabel), recent };
}
export const exportMine = (app, uid) => parse(row(app, uid));
export const deleteMine = (app, uid) => { app.db.prepare('DELETE FROM signup_profiles WHERE user_id=?').run(uid); };
