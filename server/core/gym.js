// Gym training: station taps raise strength (ESTIMATE). Game money only for entry fees.
import { bad } from './util.js';
import { ensurePresence } from './world.js';
import { addMood, refreshNeeds, profile } from './economy.js';
import { move, cashId, SYS, balanceOf } from './ledger.js';

export function strengthOf(app, uid) {
  const G = app.balance.gym; const st = app.db.prepare('SELECT strength, strength_at FROM player_state WHERE user_id=?').get(uid);
  let s = st?.strength ?? G.startStrength; const at = st?.strength_at || app.clock.now();
  if (G.decayPerMin > 0) {
    const mins = Math.max(0, (app.clock.now() - at) / 60000);
    s = Math.max(G.minStrength, s - mins * G.decayPerMin);
  }
  return { strength: Math.round(s * 10) / 10, at, max: G.maxStrength };
}
export function setStrength(app, uid, value) {
  const G = app.balance.gym; const s = Math.max(G.minStrength, Math.min(G.maxStrength, value));
  app.db.prepare('UPDATE player_state SET strength=?, strength_at=? WHERE user_id=?').run(s, app.clock.now(), uid);
  return s;
}
export const strengthView = (app, uid) => { const { strength, max } = strengthOf(app, uid); return { strength, max }; };

const cd = (app, uid, key, ms, msg) => {
  const now = app.clock.now(); const k = `gym:${key}:${uid}`; const last = app.gymCd?.get(k) || 0;
  if (now - last < ms) bad('COOLDOWN', msg, 429, { waitMs: ms - (now - last) });
  (app.gymCd ||= new Map()).set(k, now);
};

/** Train on a gym station. Raises strength; optional fee and energy cost. */
export function train(app, uid, venueId, stationId, idem) {
  const v = app.all.venueById[venueId]; if (!v || v.kind !== 'gym') bad('NO_GYM', 'That is not a gym.', 404);
  const st = v.stations.find(s => s.id === stationId); if (!st || !['gym', 'train', 'bench', 'bags', 'treadmill', 'squat', 'weights'].includes(st.type)) bad('NO_STATION', 'Pick a piece of gym equipment.', 404);
  const p = ensurePresence(app, uid); if (p.venue !== venueId) bad('NOT_INSIDE', 'Step inside the gym first.', 409);
  const G = app.balance.gym; const eq = G.equipment.find(e => e.id === (st.equip || st.type)) || G.equipment.find(e => e.id === 'weights');
  if (!eq) bad('NO_EQUIP', 'Unknown equipment.', 404);
  cd(app, uid, `${venueId}:${eq.id}`, eq.cdMs, 'Catch your breath. Come back to this machine soon.');
  const needs = refreshNeeds(app, uid);
  if (needs.energy < (eq.energy || 2)) bad('TOO_TIRED', 'You are too tired. Rest or eat first.', 409);
  const fee = st.fee ?? eq.fee ?? 0;
  return app.db.transaction(() => {
    if (fee > 0) {
      if (balanceOf(app.db, cashId(uid)) < fee) bad('NO_FUNDS', 'Not enough cash for that session.', 402);
      move(app, { from: cashId(uid), to: SYS.SINK_FEES, amount: fee, reason: 'gym_train', ref: `${venueId}:${eq.id}`, userId: uid, idemKey: idem ? `gym:${uid}:${idem}` : null });
    }
    app.db.prepare('UPDATE player_state SET energy=? WHERE user_id=?').run(Math.max(0, needs.energy - (eq.energy || 2)), uid);
    const cur = strengthOf(app, uid); const next = setStrength(app, uid, cur.strength + eq.strength);
    const mood = addMood(app, uid, eq.mood || 1);
    return {
      ok: true, charged: fee, strength: next, maxStrength: G.maxStrength, mood, energy: Math.max(0, needs.energy - (eq.energy || 2)),
      text: `${eq.verb || 'You trained'} on the ${st.label}. Strength ${cur.strength.toFixed?.(1) || cur.strength} → ${next.toFixed?.(1) || next} 💪`,
      user: profile(app, uid)
    };
  })();
}

/** Soft actions at church / mosque / cinema (mood only). */
export function placeAct(app, uid, venueId, stationId) {
  const v = app.all.venueById[venueId]; const st = v?.stations.find(s => s.id === stationId); if (!st) bad('NO_STATION', 'Nothing like that here.', 404);
  const p = ensurePresence(app, uid); if (p.venue !== venueId) bad('NOT_INSIDE', 'Step inside first.', 409);
  const P = app.balance.places || {};
  if (st.type === 'pray') {
    cd(app, uid, 'pray', P.prayCdMs || 10 * 60000, 'Take a quiet moment. Come back later.');
    const mood = addMood(app, uid, P.prayMood || 3);
    return { ok: true, mood, text: v.kind === 'mosque' ? 'You prayed. Peace upon you. 🕌' : 'You prayed. Amen. 🙏' };
  }
  if (st.type === 'cinema' || (st.type === 'tv' && v.kind === 'cinema')) {
    cd(app, uid, 'cinema', P.cinemaCdMs || 15 * 60000, 'The reel is still rolling. Sit small.');
    const mood = addMood(app, uid, P.cinemaMood || 4);
    return { ok: true, mood, text: 'The picture dey sweet! 🎬' };
  }
  if (st.type === 'rest') {
    cd(app, uid, 'rest:' + venueId, P.restCdMs || 5 * 60000, 'Sit small. You just rested.');
    const mood = addMood(app, uid, P.restMood || 1);
    return { ok: true, mood, text: 'You sat down for a moment. 😌' };
  }
  bad('NOT_AN_ACTION', 'Nothing to do with that.');
}
