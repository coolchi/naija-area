// Police Station: report a case, hold offenders, bail people out. Game money only.
import { POLICE as DEF } from '../config/police.js';
import { bad, cleanText } from './util.js';
import { notify, profile, dist } from './economy.js';
import { ensurePresence } from './world.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { isBlocked } from './safety.js';
import { venueDef, isOpen } from './venues.js';
import { cityOf } from './cities.js';

const cfg = (app) => ({ ...DEF, ...(app.balance.police || {}) });
const nameOf = (app, id) => app.db.prepare('SELECT username FROM users WHERE id=?').get(id)?.username;
const byName = (app, name) => app.db.prepare('SELECT id, username FROM users WHERE username=?').get(String(name || '').replace(/^@/, '').trim());

export function stationOf(app, uid) {
  const C = cfg(app); const v = venueDef(app, C.venueId) || (cityOf(app, uid).venues || []).find(x => x.kind === 'police');
  return v || null;
}

export function activeHold(app, uid) {
  const now = app.clock.now();
  return app.db.prepare("SELECT * FROM police_holds WHERE user_id=? AND status='held' AND until_at>?").get(uid, now) || null;
}

export function holdView(app, row) {
  if (!row) return null;
  const C = cfg(app); const left = Math.max(0, row.until_at - app.clock.now());
  return {
    id: row.id, username: nameOf(app, row.user_id), reason: row.reason, charge: row.charge,
    bail: bailOf(app, row), untilAt: row.until_at, leftMs: left,
    reporter: row.reporter_id ? nameOf(app, row.reporter_id) : null
  };
}

export function bailOf(app, row) {
  const C = cfg(app);
  let m = C.bailBase;
  if (row.reason === 'theft') m = Math.round(m * C.bailTheftMult);
  else if (row.reason === 'assault') m = Math.round(m * C.bailAssaultMult);
  m = Math.max(C.bailBase, Math.min(C.bailCap, m + Math.round((row.charge || 0) * 0.1)));
  return m;
}

/** Log evidence from a fight (purse theft or assault). Used later when someone reports. */
export function noteFight(app, attackerId, victimId, { purse = 0, damage = 0 } = {}) {
  const C = cfg(app); const now = app.clock.now();
  const kind = purse > 0 ? 'theft' : 'assault';
  app.db.prepare('INSERT INTO police_evidence(attacker_id, victim_id, kind, amount, created_at, expires_at) VALUES (?,?,?,?,?,?)')
    .run(attackerId, victimId, kind, purse || damage, now, now + C.evidenceMs);
  // Purse theft: hold the attacker at once (they can be bailed at the station).
  if (purse > 0) detain(app, attackerId, { reason: 'theft', charge: purse, reporterId: victimId, auto: true });
}

export function detain(app, uid, { reason = 'other', charge = 0, reporterId = null, auto = false } = {}) {
  const C = cfg(app); const now = app.clock.now();
  const cur = activeHold(app, uid);
  if (cur) {
    // Extend / escalate an existing hold.
    const until = Math.max(cur.until_at, now + C.holdMs);
    const charge2 = Math.max(cur.charge || 0, charge || 0);
    app.db.prepare('UPDATE police_holds SET until_at=?, reason=?, charge=?, reporter_id=COALESCE(?, reporter_id) WHERE id=?')
      .run(until, reason, charge2, reporterId, cur.id);
    return activeHold(app, uid);
  }
  const st = stationOf(app, uid);
  app.db.prepare('INSERT INTO police_holds(user_id, reason, charge, reporter_id, status, held_at, until_at, auto) VALUES (?,?,?,?,?,?,?,?)')
    .run(uid, reason, charge, reporterId, 'held', now, now + C.holdMs, auto ? 1 : 0);
  const p = ensurePresence(app, uid);
  p.detained = true; p.mode = 'walk';
  if (st) {
    p.x = st.x; p.z = st.z; p.ry = 0; p.venue = st.id; p.force = { x: st.x, z: st.z, ry: 0, reason: 'police' };
    app.db.prepare("UPDATE player_state SET x=?, z=?, ry=0, mode='walk' WHERE user_id=?").run(st.x, st.z, uid);
  }
  const who = nameOf(app, uid);
  notify(app, uid, 'police', auto
    ? `Police picked you up for ${reason}${charge ? ` (₦${charge.toLocaleString('en-NG')})` : ''}. Bail at the Police Station, or wait it out.`
    : `You are being held at the Police Station for ${reason}. Someone can bail you, or wait for release.`);
  if (reporterId) notify(app, reporterId, 'police', `@${who} is at the Police Station for ${reason}.`);
  try { app.pushUser?.(uid, { type: 'police.held', reason, untilAt: now + C.holdMs }); } catch { /* ignore */ }
  return activeHold(app, uid);
}

export function release(app, uid, { by = null, how = 'time' } = {}) {
  const h = activeHold(app, uid); if (!h) return null;
  const now = app.clock.now();
  app.db.prepare("UPDATE police_holds SET status=?, released_at=?, released_by=?, release_how=? WHERE id=?")
    .run('released', now, by, how, h.id);
  const p = app.world?.players?.get(uid); if (p) { p.detained = false; if (p.venue === cfg(app).venueId) p.venue = null; }
  notify(app, uid, 'police', how === 'bail' ? 'You have been bailed out. Stay out of wahala.' : 'Police released you. Walk free.');
  try { app.pushUser?.(uid, { type: 'police.released', how }); } catch { /* ignore */ }
  return h;
}

/** Heartbeat: expire holds, snap detained players back to the station. */
export function policeTick(app, p) {
  const h = activeHold(app, p.id);
  if (!h) { if (p.detained) p.detained = false; return; }
  if (h.until_at <= app.clock.now()) { release(app, p.id, { how: 'time' }); return; }
  p.detained = true;
  const C = cfg(app); const st = stationOf(app, p.id); if (!st) return;
  if (dist(p.x, p.z, st.x, st.z) > C.stationRadius) {
    p.x = st.x; p.z = st.z; p.mode = 'walk'; p.venue = st.id;
    p.force = { x: st.x, z: st.z, ry: p.ry || 0, reason: 'police' };
    app.db.prepare("UPDATE player_state SET x=?, z=?, mode='walk' WHERE user_id=?").run(st.x, st.z, p.id);
  }
}

export function stationView(app, uid) {
  const C = cfg(app); const v = stationOf(app, uid); const now = app.clock.now();
  const holds = app.db.prepare("SELECT * FROM police_holds WHERE status='held' AND until_at>? ORDER BY held_at DESC LIMIT 40").all(now);
  const mine = activeHold(app, uid);
  const cash = balanceOf(app.db, cashId(uid));
  return {
    name: v?.name || 'Police Station', venueId: v?.id || C.venueId, open: v ? isOpen(app, v) : true, hours: v?.hours || [0, 24],
    cash, you: holdView(app, mine),
    holding: holds.map(r => holdView(app, r)),
    reasons: C.reasons, reportFee: C.reportFee,
    note: 'Report a case if someone attacked or robbed you. Bail frees people from the holding cell. Game money only (ESTIMATE fees).'
  };
}

export function reportCase(app, uid, { username, reason, detail, venueId, idem } = {}) {
  const C = cfg(app); const v = stationOf(app, uid);
  if (!v || (venueId && venueId !== v.id)) bad('NO_STATION', 'Go to the Police Station first.', 404);
  const p = ensurePresence(app, uid); if (p.venue !== v.id) bad('NOT_INSIDE', 'Step inside the Police Station first.', 409);
  if (!isOpen(app, v)) bad('CLOSED', `${v.name} is closed.`, 409, { hours: v.hours });
  const reasonId = C.reasons.includes(reason) ? reason : 'other';
  const t = byName(app, username); if (!t) bad('NO_PLAYER', 'No player with that username.', 404);
  if (t.id === uid) bad('SELF', 'You cannot report yourself.');
  if (isBlocked(app, uid, t.id)) bad('BLOCKED', 'You cannot report that player.', 403);
  const now = app.clock.now();
  if (!app.limiter.hit(`police_report:${uid}`, C.reportsPerHour, 3600000, now)) bad('RATE_LIMIT', 'You have filed a lot of cases. Wait a bit.', 429);

  const fee = C.reportFee; const cash = balanceOf(app.db, cashId(uid));
  if (fee > 0 && cash < fee) bad('INSUFFICIENT_FUNDS', `Filing fee is ₦${fee.toLocaleString('en-NG')}.`, 402);

  // Evidence: they attacked / robbed this reporter recently
  const ev = app.db.prepare('SELECT * FROM police_evidence WHERE attacker_id=? AND victim_id=? AND expires_at>? ORDER BY id DESC LIMIT 1')
    .get(t.id, uid, now);
  const note = cleanText(detail || '', 200);

  app.db.transaction(() => {
    if (fee > 0) move(app, { from: cashId(uid), to: SYS.SINK_FEES, amount: fee, reason: 'police_report', ref: String(t.id), userId: uid, idemKey: idem ? `preport:${uid}:${idem}` : null });
    app.db.prepare('INSERT INTO police_cases(reporter_id, accused_id, reason, detail, evidence_id, created_at, status) VALUES (?,?,?,?,?,?,?)')
      .run(uid, t.id, reasonId, note, ev?.id || null, now, ev ? 'held' : 'logged');
  })();

  let held = null;
  if (ev) {
    held = detain(app, t.id, { reason: ev.kind === 'theft' ? 'theft' : (reasonId === 'theft' ? 'theft' : 'assault'), charge: ev.amount || 0, reporterId: uid });
  } else {
    notify(app, t.id, 'police', `@${nameOf(app, uid)} filed a case against you (${reasonId}) at the Police Station. No recent evidence — logged for the record.`);
  }

  return {
    ok: true, fee, evidence: !!ev, held: holdView(app, held),
    text: ev
      ? `Case filed. @${t.username} is being held for ${ev.kind}. Bail is available at the desk.`
      : `Case logged against @${t.username}. No recent fight or theft on record — police noted it.`,
    user: profile(app, uid), station: stationView(app, uid)
  };
}

export function bailOut(app, uid, { username, holdId, venueId, idem } = {}) {
  const C = cfg(app); const v = stationOf(app, uid);
  if (!v || (venueId && venueId !== v.id)) bad('NO_STATION', 'Go to the Police Station first.', 404);
  const p = ensurePresence(app, uid); if (p.venue !== v.id) bad('NOT_INSIDE', 'Step inside the Police Station first.', 409);
  if (!isOpen(app, v)) bad('CLOSED', `${v.name} is closed.`, 409, { hours: v.hours });

  let h = null;
  if (holdId) h = app.db.prepare("SELECT * FROM police_holds WHERE id=? AND status='held' AND until_at>?").get(Number(holdId), app.clock.now());
  else if (username) {
    const t = byName(app, username); if (!t) bad('NO_PLAYER', 'No player with that username.', 404);
    h = activeHold(app, t.id);
  } else {
    h = activeHold(app, uid);
  }
  if (!h) bad('NOT_HELD', 'Nobody matching that is in holding.', 404);

  const fee = bailOf(app, h); const cash = balanceOf(app.db, cashId(uid));
  if (cash < fee) bad('INSUFFICIENT_FUNDS', `Bail is ₦${fee.toLocaleString('en-NG')}.`, 402);

  app.db.transaction(() => {
    move(app, { from: cashId(uid), to: SYS.SINK_FEES, amount: fee, reason: 'police_bail', ref: String(h.id), userId: uid, idemKey: idem ? `pbail:${uid}:${idem}` : `pbail:${uid}:${h.id}` });
    release(app, h.user_id, { by: uid, how: 'bail' });
  })();

  const freed = nameOf(app, h.user_id);
  if (h.user_id !== uid) notify(app, h.user_id, 'police', `@${nameOf(app, uid)} paid your bail (₦${fee.toLocaleString('en-NG')}).`);
  return {
    ok: true, fee, freed,
    text: h.user_id === uid ? `You paid ₦${fee.toLocaleString('en-NG')} bail and walked free.` : `You bailed @${freed} for ₦${fee.toLocaleString('en-NG')}.`,
    user: profile(app, uid), station: stationView(app, uid)
  };
}

export function policeStatus(app, uid) {
  const h = activeHold(app, uid);
  return { detained: !!h, hold: holdView(app, h), station: stationOf(app, uid) && { id: stationOf(app, uid).id, name: stationOf(app, uid).name, x: stationOf(app, uid).x, z: stationOf(app, uid).z } };
}
