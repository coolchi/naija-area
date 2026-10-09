// Economy v0. ALL amounts live in config/balance.js (ESTIMATES). Everything that moves money goes through ledger.post.
import { bad, clamp, cleanText, hasBadWord, dayKey } from './util.js';
import { move, post, cashId, savId, balanceOf, SYS } from './ledger.js';

export const dist = (ax, az, bx, bz) => Math.hypot(ax - bx, az - bz);
export const notify = (app, uid, kind, text) => {
  app.db.prepare('INSERT INTO notifications(user_id,kind,text,created_at) VALUES (?,?,?,?)').run(uid, kind, text, app.clock.now());
  app.pushUser?.(uid, { type: 'notification', kind, text });
};

export function gameTime(app, now = app.clock.now()) {
  const c = app.balance.worldClock; const gm = ((now - c.startRealMs) / 60000) * c.gameMinutesPerRealMinute;
  const mins = ((gm % 1440) + 1440) % 1440;
  return { day: Math.floor(gm / 1440) + 1, hour: Math.floor(mins / 60), minute: Math.floor(mins % 60), minutesOfDay: mins };
}

export function getState(app, uid) {
  const s = app.db.prepare('SELECT * FROM player_state WHERE user_id=?').get(uid);
  if (!s) bad('NO_PLAYER', 'Player not found', 404);
  const live = app.world?.players.get(uid); // live (heartbeat-fed) position overrides the periodically persisted one
  if (live) { s.x = live.x; s.z = live.z; s.ry = live.ry; s.mode = live.mode; }
  return s;
}
/** lazily apply decay since needs_at; persist */
export function refreshNeeds(app, uid) {
  const s = getState(app, uid); const now = app.clock.now(); const n = app.balance.needs;
  const mins = Math.max(0, (now - s.needs_at) / 60000);
  const energy = clamp(s.energy - mins * n.energyDecayPerMin, n.min, n.max), hunger = clamp(s.hunger - mins * n.hungerDecayPerMin, n.min, n.max);
  if (mins > 0) app.db.prepare('UPDATE player_state SET energy=?, hunger=?, needs_at=? WHERE user_id=?').run(energy, hunger, now, uid);
  return { ...s, energy, hunger, needs_at: now };
}
const setNeeds = (app, uid, energy, hunger) => app.db.prepare('UPDATE player_state SET energy=?, hunger=?, needs_at=? WHERE user_id=?')
  .run(clamp(energy, 0, 100), clamp(hunger, 0, 100), app.clock.now(), uid);

export function homeOf(app, uid) { return app.db.prepare('SELECT * FROM property_owner WHERE user_id=?').get(uid); }
export function propDef(app, id) { return app.city.propertyById[id]; }

// ---- JOBS ---------------------------------------------------------------
export const jobDef = (app, id) => app.balance.jobs.find(j => j.id === id);
export function jobsFor(app, uid) {
  const s = getState(app, uid); const now = app.clock.now();
  const active = activeShift(app, uid);
  return app.balance.jobs.map(j => {
    const last = app.db.prepare("SELECT claimed_at FROM shifts WHERE user_id=? AND job_id=? AND status='claimed' ORDER BY id DESC LIMIT 1").get(uid, j.id);
    const cdLeft = last ? Math.max(0, last.claimed_at + j.cooldownSec * 1000 - now) : 0;
    const loc = app.city.jobLoc[j.location];
    return { ...j, locked: s.total_shifts < j.minShiftsToUnlock, shiftsNeeded: Math.max(0, j.minShiftsToUnlock - s.total_shifts), cooldownLeftMs: cdLeft, x: loc?.x, z: loc?.z, place: loc?.label };
  }).map(j => ({ ...j, active: active?.job_id === j.id }));
}
export function activeShift(app, uid) { return app.db.prepare("SELECT * FROM shifts WHERE user_id=? AND status='active'").get(uid); }
export function startShift(app, uid, jobId) {
  const job = jobDef(app, jobId); if (!job) bad('NO_JOB', 'Unknown job.', 404);
  return app.db.transaction(() => {
    const now = app.clock.now(); const st = refreshNeeds(app, uid);
    if (activeShift(app, uid)) bad('SHIFT_ACTIVE', 'You already have a shift running.', 409);
    if (st.total_shifts < job.minShiftsToUnlock) bad('JOB_LOCKED', `Complete ${job.minShiftsToUnlock - st.total_shifts} more shift(s) to unlock this job.`);
    const loc = app.city.jobLoc[job.location];
    if (dist(st.x, st.z, loc.x, loc.z) > app.balance.interact.jobRadius + 6) bad('TOO_FAR', `Go to ${loc.label} to start this job.`);
    const last = app.db.prepare("SELECT claimed_at FROM shifts WHERE user_id=? AND job_id=? AND status='claimed' ORDER BY id DESC LIMIT 1").get(uid, job.id);
    if (last && now < last.claimed_at + job.cooldownSec * 1000) bad('COOLDOWN', 'You need a short break before this job again.', 429, { retryMs: last.claimed_at + job.cooldownSec * 1000 - now });
    if (st.energy < Math.max(job.energyCost, app.balance.minNeedsToWork.energy)) bad('TOO_TIRED', 'Too tired to work. Eat/drink something or rest.');
    if (st.hunger < Math.max(job.hungerCost, app.balance.minNeedsToWork.hunger)) bad('TOO_HUNGRY', 'Too hungry to work. Buy some food first.');
    setNeeds(app, uid, st.energy - job.energyCost, st.hunger - job.hungerCost);
    const r = app.db.prepare("INSERT INTO shifts(user_id,job_id,started_at,ends_at,wage,status) VALUES (?,?,?,?,?,'active')").run(uid, job.id, now, now + job.durationSec * 1000, job.wage);
    return { shiftId: Number(r.lastInsertRowid), endsAt: now + job.durationSec * 1000, job };
  })();
}
export function claimShift(app, uid) {
  return app.db.transaction(() => {
    const now = app.clock.now(); const sh = activeShift(app, uid);
    if (!sh) bad('NO_SHIFT', 'No active shift.', 404);
    if (now < sh.ends_at) bad('SHIFT_NOT_DONE', 'Shift is not finished yet.', 409, { remainingMs: sh.ends_at - now });
    // the status flip is the lock: only the request that changes the row pays out
    const u = app.db.prepare("UPDATE shifts SET status='claimed', claimed_at=? WHERE id=? AND status='active'").run(now, sh.id);
    if (u.changes !== 1) bad('ALREADY_CLAIMED', 'Already claimed.', 409);
    move(app, { from: SYS.FAUCET_JOBS, to: cashId(uid), amount: sh.wage, reason: 'job_wage', ref: sh.job_id, userId: uid, idemKey: `shift:${sh.id}` });
    app.db.prepare('UPDATE player_state SET total_shifts=total_shifts+1 WHERE user_id=?').run(uid);
    return { wage: sh.wage, cash: balanceOf(app.db, cashId(uid)) };
  })();
}
export function abandonShift(app, uid) {
  const r = app.db.prepare("DELETE FROM shifts WHERE user_id=? AND status='active'").run(uid);
  if (!r.changes) bad('NO_SHIFT', 'No active shift.', 404); return { ok: true };
}

// ---- SHOPS --------------------------------------------------------------
export function shopBuy(app, uid, shopId, itemId, qty = 1, idemKey = null) {
  const shop = app.city.shopById[shopId]; if (!shop) bad('NO_SHOP', 'Unknown shop.', 404);
  const item = shop.items.find(i => i.id === itemId); if (!item) bad('NO_ITEM', 'Unknown item.', 404);
  if (!Number.isInteger(qty) || qty < 1 || qty > 5) bad('BAD_QTY', 'Quantity 1-5.');
  return app.db.transaction(() => {
    const st = refreshNeeds(app, uid);
    if (dist(st.x, st.z, shop.x, shop.z) > app.balance.interact.shopRadius + 8) bad('TOO_FAR', `Walk up to ${shop.name} first.`);
    const total = item.price * qty;
    const r = move(app, { from: cashId(uid), to: SYS.SINK_SHOPS, amount: total, reason: 'shop_purchase', ref: `${shopId}:${itemId}x${qty}`, userId: uid, idemKey: idemKey ? `shop:${uid}:${idemKey}` : null });
    if (!r.duplicate) setNeeds(app, uid, st.energy + item.energy * qty, st.hunger + item.hunger * qty);
    const s2 = getState(app, uid);
    return { spent: total, duplicate: r.duplicate, energy: s2.energy, hunger: s2.hunger, cash: balanceOf(app.db, cashId(uid)) };
  })();
}

// ---- HOUSING ------------------------------------------------------------
export function propertyView(app, p, uid) {
  const o = app.db.prepare('SELECT po.*, u.username FROM property_owner po JOIN users u ON u.id=po.user_id WHERE property_id=?').get(p.id);
  return { id: p.id, name: o?.custom_name || p.name, baseName: p.name, tier: p.tier, tierLabel: p.tierLabel, rent: p.rent, price: p.price, rooms: p.rooms, door: p.door, buildingId: p.buildingId,
    status: o ? (o.user_id === uid ? 'yours' : 'taken') : 'available', owner: o ? o.username : null, mode: o && (o.user_id === uid || true) ? o.mode : null,
    nextRentDue: o && o.user_id === uid ? o.next_rent_due : undefined, missed: o && o.user_id === uid ? o.missed : undefined };
}
export function listProperties(app, uid) { return app.city.properties.map(p => propertyView(app, p, uid)); }
export function acquireProperty(app, uid, propertyId, mode, idemKey) {
  const p = propDef(app, propertyId); if (!p) bad('NO_PROPERTY', 'Unknown property.', 404);
  if (!['rent', 'own'].includes(mode)) bad('BAD_MODE', 'mode must be rent or own.');
  if (mode === 'own' && !p.price) bad('NOT_FOR_SALE', 'This property is rent-only.');
  return app.db.transaction(() => {
    const now = app.clock.now(); const st = getState(app, uid);
    if (homeOf(app, uid)) bad('ALREADY_HOUSED', 'You already have a home. Move out/sell first.', 409);
    if (app.db.prepare('SELECT 1 FROM property_owner WHERE property_id=?').get(propertyId)) bad('TAKEN', 'Someone already lives here.', 409);
    if (dist(st.x, st.z, p.door.x, p.door.z) > app.balance.interact.houseRadius + 10) bad('TOO_FAR', 'Walk to the door first.');
    const amount = mode === 'own' ? p.price : p.rent; // renting: first period is paid upfront (acts as the deposit)
    move(app, { from: cashId(uid), to: mode === 'own' ? SYS.SINK_PROPERTY : SYS.SINK_RENT, amount, reason: mode === 'own' ? 'property_purchase' : 'rent_first_period', ref: propertyId, userId: uid, idemKey: idemKey ? `home:${uid}:${idemKey}` : null });
    app.db.prepare('INSERT INTO property_owner(property_id,user_id,mode,custom_name,next_rent_due,missed,since,paid_price) VALUES (?,?,?,?,?,0,?,?)')
      .run(propertyId, uid, mode, null, mode === 'rent' ? now + app.balance.housing.rentPeriodMs : null, now, mode === 'own' ? p.price : 0);
    notify(app, uid, 'home', mode === 'own' ? `You bought ${p.name}!` : `You moved into ${p.name}. Rent ₦${p.rent.toLocaleString('en-NG')} every ${fmtPeriod(app.balance.housing.rentPeriodMs)}.`);
    return { ok: true, cash: balanceOf(app.db, cashId(uid)) };
  })();
}
const fmtPeriod = (ms) => ms >= 3600000 ? `${Math.round(ms / 3600000)}h` : `${Math.round(ms / 60000)} min`;
export function releaseProperty(app, uid) {
  return app.db.transaction(() => {
    const h = homeOf(app, uid); if (!h) bad('NO_HOME', 'You have no home.', 404);
    let refund = 0;
    if (h.mode === 'own' && h.paid_price > 0) {
      refund = Math.floor(h.paid_price * app.balance.housing.sellBackFraction);
      if (refund > 0) move(app, { from: SYS.SINK_PROPERTY, to: cashId(uid), amount: refund, reason: 'property_sellback', ref: h.property_id, userId: uid, idemKey: `sell:${h.property_id}:${h.since}` });
    }
    app.db.prepare('DELETE FROM property_items WHERE property_id=?').run(h.property_id);
    app.db.prepare('DELETE FROM property_owner WHERE property_id=?').run(h.property_id);
    return { ok: true, refund, cash: balanceOf(app.db, cashId(uid)) };
  })();
}
export function nameProperty(app, uid, name) {
  const h = homeOf(app, uid); if (!h) bad('NO_HOME', 'You have no home.', 404);
  const n = cleanText(name, app.balance.housing.maxNameLen);
  if (n.length < app.balance.housing.minNameLen) bad('BAD_NAME', `Name must be at least ${app.balance.housing.minNameLen} characters.`);
  if (hasBadWord(n)) bad('BAD_NAME', 'Please pick a cleaner name.');
  app.db.prepare('UPDATE property_owner SET custom_name=? WHERE property_id=? AND user_id=?').run(n, h.property_id, uid);
  return { name: n };
}
/** OWNER-ONLY: furniture list. Anyone else gets 403 (tested). */
export function interior(app, uid, propertyId) {
  const p = propDef(app, propertyId); if (!p) bad('NO_PROPERTY', 'Unknown property.', 404);
  const o = app.db.prepare('SELECT * FROM property_owner WHERE property_id=?').get(propertyId);
  if (!o || o.user_id !== uid) bad('FORBIDDEN', 'Only the person who lives here can go inside.', 403);
  const items = app.db.prepare('SELECT item_id FROM property_items WHERE property_id=?').all(propertyId).map(r => r.item_id);
  return { id: p.id, name: o.custom_name || p.name, tier: p.tier, tierLabel: p.tierLabel, rooms: p.rooms, items, catalog: app.balance.housing.furniture };
}
export function buyFurniture(app, uid, itemId, idemKey) {
  const h = homeOf(app, uid); if (!h) bad('NO_HOME', 'You have no home.', 404);
  const item = app.balance.housing.furniture.find(f => f.id === itemId); if (!item) bad('NO_ITEM', 'Unknown item.', 404);
  return app.db.transaction(() => {
    if (app.db.prepare('SELECT 1 FROM property_items WHERE property_id=? AND item_id=?').get(h.property_id, itemId)) bad('OWNED', 'Already placed.', 409);
    move(app, { from: cashId(uid), to: SYS.SINK_FURNITURE, amount: item.price, reason: 'furniture', ref: `${h.property_id}:${itemId}`, userId: uid, idemKey: idemKey ? `furn:${uid}:${idemKey}` : null });
    app.db.prepare('INSERT INTO property_items(property_id,item_id,user_id,bought_at) VALUES (?,?,?,?)').run(h.property_id, itemId, uid, app.clock.now());
    return { ok: true, cash: balanceOf(app.db, cashId(uid)) };
  })();
}
/** Scheduled: charge rent when due. Missed payment -> notify; after N missed periods -> evict. Idempotent per period. */
export function tickRent(app) {
  const now = app.clock.now(); const period = app.balance.housing.rentPeriodMs; const out = { charged: 0, missed: 0, evicted: 0 };
  const due = app.db.prepare("SELECT * FROM property_owner WHERE mode='rent' AND next_rent_due IS NOT NULL AND next_rent_due <= ?").all(now);
  for (const h of due) {
    app.db.transaction(() => {
      const p = propDef(app, h.property_id);
      let periodsBehind = 0; let cur = h;
      // catch up every due period (server may have been down), but only evict on missed payments
      while (cur.next_rent_due <= now && periodsBehind < 10) {
        periodsBehind++;
        try {
          move(app, { from: cashId(cur.user_id), to: SYS.SINK_RENT, amount: p.rent, reason: 'rent', ref: h.property_id, userId: cur.user_id, idemKey: `rent:${h.property_id}:${h.since}:${cur.next_rent_due}` });
          out.charged++;
          app.db.prepare('UPDATE property_owner SET next_rent_due=next_rent_due+?, missed=0 WHERE property_id=?').run(period, h.property_id);
          cur = { ...cur, next_rent_due: cur.next_rent_due + period, missed: 0 };
        } catch (e) {
          if (e.code !== 'INSUFFICIENT_FUNDS') throw e;
          out.missed++; const missed = cur.missed + 1;
          if (missed >= app.balance.housing.graceMissedPeriods) {
            app.db.prepare('DELETE FROM property_items WHERE property_id=?').run(h.property_id);
            app.db.prepare('DELETE FROM property_owner WHERE property_id=?').run(h.property_id);
            notify(app, cur.user_id, 'eviction', `You were evicted from ${p.name} after missing rent. Earn some cash and find a new place.`); out.evicted++;
            return;
          }
          app.db.prepare('UPDATE property_owner SET next_rent_due=next_rent_due+?, missed=? WHERE property_id=?').run(period, missed, h.property_id);
          notify(app, cur.user_id, 'rent_missed', `Rent for ${p.name} (₦${p.rent.toLocaleString('en-NG')}) could not be paid. ${app.balance.housing.graceMissedPeriods - missed} period(s) before eviction!`);
          cur = { ...cur, next_rent_due: cur.next_rent_due + period, missed };
        }
      }
    })();
  }
  return out;
}

// ---- BANK ---------------------------------------------------------------
export function bankMove(app, uid, dir, amount, idemKey) {
  if (!Number.isInteger(amount) || amount <= 0) bad('BAD_AMOUNT', 'Enter a positive whole number.');
  const [from, to] = dir === 'deposit' ? [cashId(uid), savId(uid)] : dir === 'withdraw' ? [savId(uid), cashId(uid)] : bad('BAD_DIR', 'deposit or withdraw');
  move(app, { from, to, amount, reason: `bank_${dir}`, userId: uid, idemKey: idemKey ? `bank:${uid}:${idemKey}` : null });
  return { cash: balanceOf(app.db, cashId(uid)), savings: balanceOf(app.db, savId(uid)) };
}
/** daily-ish interest on savings, per period index so each period is paid once */
export function tickInterest(app) {
  const now = app.clock.now(); const b = app.balance.bank; let paid = 0;
  const due = app.db.prepare('SELECT user_id, savings_interest_at FROM player_state WHERE savings_interest_at + ? <= ?').all(b.interestPeriodMs, now);
  for (const r of due) {
    app.db.transaction(() => {
      const periods = Math.min(30, Math.floor((now - r.savings_interest_at) / b.interestPeriodMs));
      for (let i = 1; i <= periods; i++) {
        const bal = Math.min(balanceOf(app.db, savId(r.user_id)), b.maxSavingsForInterest);
        const interest = Math.floor(bal * b.dailyInterestRate);
        if (interest > 0) { move(app, { from: SYS.FAUCET_INTEREST, to: savId(r.user_id), amount: interest, reason: 'interest', userId: r.user_id, idemKey: `int:${r.user_id}:${r.savings_interest_at + i * b.interestPeriodMs}` }); paid++; }
      }
      app.db.prepare('UPDATE player_state SET savings_interest_at=savings_interest_at+? WHERE user_id=?').run(periods * b.interestPeriodMs, r.user_id);
    })();
  }
  return { paid };
}

// ---- TRANSFERS (capped, rate-limited, account-age gated) -------------------
export function transfer(app, uid, toUsername, amount, idemKey) {
  const t = app.balance.transfer; const now = app.clock.now();
  const me = app.db.prepare('SELECT id, username, is_guest, created_at FROM users WHERE id=?').get(uid);
  if (me.is_guest && !t.allowGuests) bad('GUEST_NOT_ALLOWED', 'Guests cannot send money. Create an account.', 403);
  if (!Number.isInteger(amount) || amount < t.minAmount) bad('BAD_AMOUNT', `Minimum transfer is ₦${t.minAmount}.`);
  if (amount > t.maxPerTx) bad('OVER_LIMIT', `Maximum per transfer is ₦${t.maxPerTx.toLocaleString('en-NG')}.`);
  if (now - me.created_at < t.minAccountAgeMs) bad('ACCOUNT_TOO_NEW', 'New accounts can send money after a short wait.', 403);
  const to = app.db.prepare('SELECT id, username, is_guest FROM users WHERE username=?').get(String(toUsername || ''));
  if (!to) bad('NO_RECIPIENT', 'No player with that username.', 404);
  if (to.id === uid) bad('SELF', 'You cannot send money to yourself.');
  return app.db.transaction(() => {
    const dayStart = now - 24 * 3600 * 1000;
    const sent = app.db.prepare("SELECT COALESCE(SUM(-e.amount),0) s FROM ledger_entries e JOIN ledger_tx t ON t.id=e.tx_id WHERE e.account_id=? AND t.reason='p2p_transfer' AND e.created_at>?").get(cashId(uid), dayStart).s;
    if (sent + amount > t.maxPerDay) bad('DAILY_LIMIT', `Daily transfer limit is ₦${t.maxPerDay.toLocaleString('en-NG')}.`, 429);
    const cnt = app.db.prepare("SELECT COUNT(*) n FROM ledger_entries e JOIN ledger_tx t ON t.id=e.tx_id WHERE e.account_id=? AND t.reason='p2p_transfer' AND e.amount<0 AND e.created_at>?").get(cashId(uid), now - 3600000).n;
    if (cnt >= t.maxPerHourCount) bad('RATE_LIMIT', 'Too many transfers this hour.', 429);
    const r = move(app, { from: cashId(uid), to: cashId(to.id), amount, reason: 'p2p_transfer', ref: `${uid}->${to.id}`, userId: uid, idemKey: idemKey ? `xfer:${uid}:${idemKey}` : null });
    if (!r.duplicate) notify(app, to.id, 'transfer', `${me.username} sent you ₦${amount.toLocaleString('en-NG')}.`);
    return { ok: true, duplicate: r.duplicate, cash: balanceOf(app.db, cashId(uid)) };
  })();
}

// ---- TEST TOP-UP (mock; no real money) ----------------------------------
export function testTopup(app, uid, amount, idemKey) {
  const t = app.balance.topup; const now = app.clock.now();
  if (!t.options.includes(amount)) bad('BAD_AMOUNT', 'Pick one of the test top-up amounts.');
  return app.db.transaction(() => {
    const today = app.db.prepare("SELECT COALESCE(SUM(e.amount),0) s FROM ledger_entries e JOIN ledger_tx t ON t.id=e.tx_id WHERE e.account_id=? AND t.reason='test_topup' AND e.created_at>?").get(cashId(uid), now - 24 * 3600 * 1000).s;
    if (today + amount > t.maxPerDay) bad('DAILY_LIMIT', 'Test top-up daily limit reached.', 429);
    move(app, { from: SYS.FAUCET_TESTTOPUP, to: cashId(uid), amount, reason: 'test_topup', userId: uid, idemKey: idemKey ? `topup:${uid}:${idemKey}` : null });
    return { cash: balanceOf(app.db, cashId(uid)), test: true };
  })();
}

// ---- LEADERBOARD / PROFILE ---------------------------------------------
export function netWorth(app, uid) {
  const cash = balanceOf(app.db, cashId(uid)), sav = balanceOf(app.db, savId(uid)); const h = homeOf(app, uid);
  const prop = h && h.mode === 'own' ? Math.floor(h.paid_price * app.balance.housing.sellBackFraction) : 0;
  return { cash, savings: sav, property: prop, total: cash + sav + prop };
}
export function leaderboard(app) {
  const now = app.clock.now(); const lb = app.balance.leaderboard;
  if (app.lbCache && now - app.lbCache.at < lb.cacheMs) return app.lbCache.rows;
  const rows = app.db.prepare(`SELECT u.id, u.username, u.is_guest,
      (SELECT balance FROM accounts WHERE id='u:'||u.id) cash, (SELECT balance FROM accounts WHERE id='s:'||u.id) sav,
      COALESCE((SELECT CAST(paid_price*? AS INTEGER) FROM property_owner po WHERE po.user_id=u.id AND po.mode='own'),0) prop
    FROM users u WHERE u.is_bot=0 ORDER BY (cash + sav + prop) DESC LIMIT ?`).all(app.balance.housing.sellBackFraction, lb.size)
    .map((r, i) => ({ rank: i + 1, name: r.username, guest: !!r.is_guest, netWorth: r.cash + r.sav + r.prop }));
  app.lbCache = { at: now, rows }; return rows;
}
export function profile(app, uid) {
  const st = refreshNeeds(app, uid); const nw = netWorth(app, uid); const h = homeOf(app, uid);
  const sh = activeShift(app, uid); const u = app.db.prepare('SELECT username,is_guest,color,created_at FROM users WHERE id=?').get(uid);
  return { id: uid, username: u.username, guest: !!u.is_guest, color: u.color, cash: nw.cash, savings: nw.savings, netWorth: nw.total,
    energy: Math.round(st.energy * 10) / 10, hunger: Math.round(st.hunger * 10) / 10, totalShifts: st.total_shifts, mode: st.mode,
    home: h ? propertyView(app, propDef(app, h.property_id), uid) : null,
    shift: sh ? { id: sh.id, jobId: sh.job_id, endsAt: sh.ends_at, startedAt: sh.started_at, wage: sh.wage } : null };
}
export function notifications(app, uid, limit = 20) {
  return app.db.prepare('SELECT id, kind, text, created_at, read_at FROM notifications WHERE user_id=? ORDER BY id DESC LIMIT ?').all(uid, limit);
}
