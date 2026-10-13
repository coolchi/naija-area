// Admin player directory: everyone, who is on the map right now, and who was seen in the last day.
import { startOptions } from './signup.js';

const cityLabel = (app, id) => {
  const c = app.cities?.[id]; if (!c) return id || '';
  return c.cityName && c.name && c.cityName !== c.name ? `${c.cityName} · ${c.name}` : (c.cityName || c.name);
};

export function directory(app, { scope = 'all', q = '' } = {}) {
  const now = app.clock.now();
  const onlineCut = now - (app.balance.heartbeat?.activeWindowMs || 60000);
  const activeCut = now - 24 * 3600000;
  const online = new Map();
  for (const p of app.world?.players?.values() || []) if (!p.isBot && p.lastSeen >= onlineCut) online.set(p.id, p);
  const like = String(q || '').replace(/[%_]/g, '').trim().slice(0, 40);
  const where = ['u.is_bot=0']; const args = [];
  if (like) { where.push('lower(u.username) LIKE ?'); args.push('%' + like.toLowerCase() + '%'); }
  if (scope === 'online') {
    const ids = [...online.keys()].slice(0, 500);
    if (!ids.length) return pack(app, now, online, activeCut, []);
    where.push(`u.id IN (${ids.map(() => '?').join(',')})`); args.push(...ids);
  } else if (scope === 'active') { where.push('u.last_seen>=?'); args.push(activeCut); }
  const rows = app.db.prepare(`SELECT u.id, u.username, u.is_guest, u.created_at, u.last_seen, ps.city_id, ps.mode, ps.x, ps.z,
      (SELECT balance FROM accounts WHERE id='u:'||u.id) cash,
      (SELECT balance FROM accounts WHERE id='s:'||u.id) sav,
      (SELECT COUNT(*) FROM property_owner WHERE user_id=u.id) homes,
      sp.home_city, sp.interest_city, sp.skipped
    FROM users u
    LEFT JOIN player_state ps ON ps.user_id=u.id
    LEFT JOIN signup_profiles sp ON sp.user_id=u.id
    WHERE ${where.join(' AND ')}
    ORDER BY u.last_seen DESC NULLS LAST LIMIT 200`).all(...args);
  return pack(app, now, online, activeCut, rows);
}

function pack(app, now, online, activeCut, rows) {
  const players = app.db.prepare('SELECT COUNT(*) n FROM users WHERE is_bot=0').get().n;
  const guests = app.db.prepare('SELECT COUNT(*) n FROM users WHERE is_bot=0 AND is_guest=1').get().n;
  const bots = app.db.prepare('SELECT COUNT(*) n FROM users WHERE is_bot=1').get().n;
  const active = app.db.prepare('SELECT COUNT(*) n FROM users WHERE is_bot=0 AND last_seen>=?').get(activeCut).n;
  const banned = new Set(app.db.prepare("SELECT user_id FROM sanctions WHERE kind='ban' AND lifted_at IS NULL AND (until_at IS NULL OR until_at>?)").all(now).map(r => r.user_id));
  const names = Object.fromEntries(startOptions(app).map(c => [c.id, c.name]));
  return {
    counts: { players, guests, bots, online: online.size, active },
    rows: rows.map(r => {
      const live = online.get(r.id);
      return {
        id: r.id, username: r.username, guest: !!r.is_guest, deleted: /^deleted_/.test(r.username),
        createdAt: r.created_at, lastSeen: r.last_seen, online: !!live,
        city: cityLabel(app, live?.city || r.city_id), mode: live?.mode || r.mode || null,
        x: Math.round(live ? live.x : (r.x || 0)), z: Math.round(live ? live.z : (r.z || 0)),
        cash: r.cash || 0, savings: r.sav || 0, homes: r.homes || 0,
        homeChoice: r.home_city ? (names[r.home_city] || r.home_city) : null, interestChoice: r.interest_city ? (names[r.interest_city] || r.interest_city) : null, signupSkipped: r.skipped == null ? null : !!r.skipped,
        banned: banned.has(r.id),
      };
    }),
  };
}
