// In-process simulated residents ("bots") for demos and load/feel testing. They are flagged is_bot=1:
// counted in `onlineNow` but never in `registeredPlayers`, hidden from the leaderboard, and they cannot log in (no password).
// They use the same game functions as real clients (heartbeat with a movement trail, chat, shifts, shop), so server rules apply to them too.
import { newPlayer } from './core/auth.js';
import * as eco from './core/economy.js';
import { heartbeat, sendChat, teleport } from './core/world.js';

const NAMES = ['ade_ojo', 'chioma_k', 'tunde_ib', 'ngozi_a', 'musa_ng', 'bisi_lag', 'emeka_o', 'funke_b', 'sola_yaba', 'kemi_ikeja', 'dayo_lek', 'zainab_s'];
const LINES = ['How far?', 'Na wa o, this traffic!', 'Oga, where the market dey?', 'I don collect my shift money.', 'Who get change for ₦500?', 'Hustle never end.', 'Nice house o!', 'Abeg, which way to Corner Mart?', 'Wetin dey happen?', 'Hunger dey catch me.'];
const rnd = (a) => a[Math.floor(Math.random() * a.length)];

export function startBots(app, count = 8, { initialWait } = {}) {
  const city = app.city; const horiz = [...new Set(city.roads.filter(r => r.z1 === r.z2).map(r => r.z1))]; const vert = [...new Set(city.roads.filter(r => r.x1 === r.x2).map(r => r.x1))];
  const nearest = (arr, v) => arr.reduce((b, x) => (Math.abs(x - v) < Math.abs(b - v) ? x : b), arr[0]);
  const bots = [];
  for (let i = 0; i < Math.min(count, NAMES.length); i++) {
    const name = `${NAMES[i]}_bot`; let u = app.db.prepare('SELECT id FROM users WHERE username=?').get(name); const uid = u ? u.id : newPlayer(app, { username: name, isBot: true, ageConfirmed: true, cash: 4000 });
    const sp = city.spawns[i % city.spawns.length]; teleport(app, uid, sp.x, sp.z);
    bots.push({ uid, name, path: [], wait: initialWait ?? 1 + Math.random() * 5, mode: 'walk', place: null, ry: 0 });
  }
  const pathTo = (b, x, z) => { const p = app.world.players.get(b.uid); const hz = nearest(horiz, p.z), vx = nearest(vert, x); return [[p.x, hz], [vx, hz], [vx, nearest(horiz, z)], [x, nearest(horiz, z)], [x, z]]; };
  const step = (b) => {
    const p = app.world.players.get(b.uid); const now = app.clock.now(); const trail = [];
    try {
      const sh = eco.activeShift(app, b.uid); if (sh && sh.ends_at <= now) { eco.claimShift(app, b.uid); } 
      if (b.path.length) {
        const speed = b.mode === 'drive' ? 12 : 4.6; let budget = speed; let [tx, tz] = b.path[0]; let dx = tx - p.x, dz = tz - p.z; let d = Math.hypot(dx, dz);
        while (d < budget && b.path.length) { budget -= d; trail.push(null); p.x = tx; p.z = tz; b.path.shift(); if (!b.path.length) break; [tx, tz] = b.path[0]; dx = tx - p.x; dz = tz - p.z; d = Math.hypot(dx, dz); }
        if (b.path.length && d > 0) { const k = Math.min(1, budget / d); b.ry = Math.atan2(-dz, dx); trail.length = 0; trail.push({ a: 0, x: p.x + dx * k, z: p.z + dz * k, ry: b.ry }); }
        else { trail.length = 0; trail.push({ a: 0, x: p.x, z: p.z, ry: b.ry }); if (b.place) arrive(b); }
      } else { b.wait -= 1; if (b.wait <= 0) choose(b); if (Math.random() < 0.02) sendChat(app, b.uid, rnd(LINES)); }
      heartbeat(app, b.uid, { trail: trail.filter(Boolean), mode: b.mode, activity: b.path.length ? b.mode : 'idle' });
    } catch (e) { if (!e.code) console.error('[bot]', b.name, e.message); }
  };
  const choose = (b) => {
    const st = eco.getState(app, b.uid); const hungry = st.hunger < 40; const pool = hungry ? city.places.filter(x => x.type === 'shop') : city.places.filter(x => ['shop', 'job', 'house', 'landmark', 'plot'].includes(x.type));
    const dest = rnd(pool); const p = app.world.players.get(b.uid); b.place = dest; b.mode = Math.hypot(dest.x - p.x, dest.z - p.z) > 150 ? 'drive' : 'walk'; b.path = pathTo(b, dest.x, dest.z);
  };
  const arrive = (b) => {
    const pl = b.place; b.place = null; b.mode = 'walk'; b.wait = 4 + Math.random() * 14;
    try {
      if (pl.type === 'job') { const job = app.balance.jobs.find(j => j.location === pl.id && j.minShiftsToUnlock <= eco.getState(app, b.uid).total_shifts); if (job) eco.startShift(app, b.uid, job.id); }
      else if (pl.type === 'shop') { const shop = app.city.shopById[pl.id]; const item = shop.items.reduce((a, c) => (c.hunger > a.hunger ? c : a), shop.items[0]); eco.shopBuy(app, b.uid, shop.id, item.id, 1); }
    } catch { /* closed shop, no cash, cooldown ... normal */ }
    const st = eco.getState(app, b.uid); const cash = eco.netWorth(app, b.uid).cash; if (cash < 500) { try { eco.testTopup(app, b.uid, 1000); } catch { /* daily cap */ } } void st;
  };
  const timer = setInterval(() => bots.forEach(step), 1000); timer.unref?.();
  return { bots, stop: () => clearInterval(timer) };
}
