// Bodyguard hire: pay for a day or a year of HD protection. Optional +carFee Black G-Wagon escort.
// While active, fights hurt less and purse theft is blocked.
import { bad } from './util.js';
import { ensurePresence } from './world.js';
import { isOpen, venueDef } from './venues.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { gameTime, notify } from './economy.js';
import * as DEFAULT from '../config/bodyguards.js';

export const cfgOf = (app) => app.balance.bodyguard || DEFAULT.BODYGUARD;

/** real ms for N game-days (follows worldClock) */
export function gameDaysMs(app, days) {
  const gmpm = app.balance.worldClock.gameMinutesPerRealMinute || 15;
  return Math.round(days * (1440 / gmpm) * 60 * 1000);
}

const hireVenue = (app, venueId) => {
  const v = venueDef(app, venueId);
  if (!v || !(v.gunShop || v.bodyguardDesk)) bad('NO_DESK', 'No bodyguard desk here.', 404);
  return v;
};

const pickName = (app, uid) => {
  const C = cfgOf(app); const names = C.names || DEFAULT.BODYGUARD.names;
  return names[Math.abs(uid * 17 + (app.clock.now() | 0)) % names.length];
};

const planOf = (C, planId) => {
  if (planId === 'day') return { id: 'day', fee: C.dayFee, days: C.dayDays, label: '1 day' };
  if (planId === 'year') return { id: 'year', fee: C.yearFee, days: C.yearDays, label: '1 year' };
  // Legacy week rows still expire; new hires cannot pick week.
  if (planId === 'week' && C.weekFee != null) return { id: 'week', fee: C.weekFee, days: C.weekDays || 7, label: '1 week' };
  return null;
};

const carView = (C, withCar) => withCar ? { body: C.carBody || 'gwagon', color: C.carColor || '#0a0a0a', label: C.carLabel || 'Black G-Wagon' } : null;

/** active hire, or null if expired / never hired */
export function activeOf(app, uid) {
  const row = app.db.prepare('SELECT * FROM bodyguards WHERE user_id=?').get(uid);
  if (!row) return null;
  if (row.until_at <= app.clock.now()) {
    app.db.prepare('DELETE FROM bodyguards WHERE user_id=?').run(uid);
    return null;
  }
  return row;
}

export function view(app, uid) {
  const C = cfgOf(app); const row = activeOf(app, uid); const cash = balanceOf(app.db, cashId(uid));
  const gt = gameTime(app);
  let leftDays = 0;
  if (row) {
    const leftMs = row.until_at - app.clock.now();
    leftDays = Math.max(0, Math.ceil(leftMs / gameDaysMs(app, 1)));
  }
  const body = C.body || 'hd';
  const withCar = !!(row && row.with_car);
  const carFee = C.carFee || 0;
  return {
    active: !!row,
    guard: row ? { name: row.name, plan: row.plan, untilAt: row.until_at, leftDays, paid: row.paid, body, withCar, car: carView(C, withCar) } : null,
    body,
    rare: !!C.rare,
    carAddOn: { fee: carFee, body: C.carBody || 'gwagon', color: C.carColor || '#0a0a0a', label: C.carLabel || 'Black G-Wagon', canAfford: cash >= carFee },
    plans: [
      { id: 'day', label: '1 day · HD Body', fee: C.dayFee, days: C.dayDays, body, rare: true, canAfford: cash >= C.dayFee },
      { id: 'year', label: '1 year · HD Body', fee: C.yearFee, days: C.yearDays, body, rare: true, canAfford: cash >= C.yearFee }
    ],
    cash,
    rules: { damageScale: C.damageScale, blockPurse: !!C.blockPurse, defenceStrength: C.defenceStrength },
    note: 'Hire an HD Body Upgrade bodyguard (rare high-res model). ₦100 million a day or ₦10 billion a year (ESTIMATE). Optional +₦10 million once for a Black G-Wagon escort — their car follows you. Game money only.',
    worldDay: gt.day
  };
}

export function deskView(app, uid, venueId) {
  hireVenue(app, venueId);
  const v = venueDef(app, venueId);
  return { venueId, name: v.name, open: isOpen(app, v), hours: v.hours, ...view(app, uid) };
}

export function hire(app, uid, venueId, plan, idem, withCarWanted) {
  const v = hireVenue(app, venueId);
  const p = ensurePresence(app, uid); if (p.venue !== venueId) bad('NOT_INSIDE', 'Step inside to hire a bodyguard.', 409);
  if (!isOpen(app, v)) bad('CLOSED', `${v.name} is closed. Opens ${v.hours[0]}:00 to ${v.hours[1]}:00.`, 409, { hours: v.hours });
  const C = cfgOf(app);
  const planId = String(plan || '');
  const pl = planOf(C, planId);
  if (!pl || (planId !== 'day' && planId !== 'year')) bad('BAD_PLAN', 'Pick day or year.');
  const carFee = C.carFee || 0;
  return app.db.transaction(() => {
    const now = app.clock.now();
    const cur = app.db.prepare('SELECT * FROM bodyguards WHERE user_id=?').get(uid);
    const alreadyCar = !!(cur && cur.until_at > now && cur.with_car);
    const addCar = !alreadyCar && !!withCarWanted;
    const fee = pl.fee + (addCar ? carFee : 0);
    if (balanceOf(app.db, cashId(uid)) < fee) {
      const need = addCar ? `${pl.label} of HD protection plus Black G-Wagon` : `${pl.label} of HD protection`;
      bad('NO_FUNDS', `${need} costs ₦${fee.toLocaleString('en-NG')}.`, 402, { need: fee });
    }
    const base = cur && cur.until_at > now ? cur.until_at : now;
    const until = base + gameDaysMs(app, pl.days);
    const name = cur?.name || pickName(app, uid);
    const withCar = alreadyCar || addCar ? 1 : 0;
    move(app, { from: cashId(uid), to: SYS.SINK_FEES, amount: fee, reason: 'bodyguard', ref: addCar ? `${planId}+car` : planId, userId: uid, idemKey: idem ? `bodyguard:${uid}:${planId}:${addCar ? 'car' : 'foot'}:${idem}` : null });
    app.db.prepare(`INSERT INTO bodyguards(user_id,plan,paid,hired_at,until_at,name,with_car) VALUES (?,?,?,?,?,?,?)
      ON CONFLICT(user_id) DO UPDATE SET plan=excluded.plan, paid=bodyguards.paid+excluded.paid, until_at=excluded.until_at, name=excluded.name, with_car=excluded.with_car`).run(uid, planId, fee, now, until, name, withCar);
    const carBit = withCar ? ' with Black G-Wagon escort' : '';
    notify(app, uid, 'venue', `${name} (HD Body${carBit}) is on your detail until the plan ends.`);
    const text = addCar
      ? `${name} hired — HD Body Upgrade + Black G-Wagon — for ${pl.label} (₦${fee.toLocaleString('en-NG')}).`
      : `${name} hired — HD Body Upgrade — for ${pl.label} (₦${fee.toLocaleString('en-NG')}).`;
    return { ok: true, charged: fee, cash: balanceOf(app.db, cashId(uid)), text, bodyguard: view(app, uid) };
  })();
}

export function dismiss(app, uid) {
  const row = activeOf(app, uid); if (!row) bad('NO_GUARD', 'You have no bodyguard on detail.', 409);
  app.db.prepare('DELETE FROM bodyguards WHERE user_id=?').run(uid);
  return { ok: true, text: `${row.name} has been stood down.`, bodyguard: view(app, uid) };
}
