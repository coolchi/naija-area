// Club and salon actions. Everything is game money (placeholders, ESTIMATE) through the ledger, with cooldowns so nothing can be farmed.
import { bad } from './util.js';
import { ensurePresence } from './world.js';
import { addMood, notify } from './economy.js';
import { move, cashId, SYS, balanceOf } from './ledger.js';

const cd = (app, uid, key, ms, msg, where = '') => { const now = app.clock.now(); const k = `leisure:${key}:${where}:${uid}`; const last = app.leisureCd?.get(k) || 0; if (now - last < ms) bad('COOLDOWN', msg, 429, { waitMs: ms - (now - last) }); (app.leisureCd ||= new Map()).set(k, now); };
const charge = (app, uid, amount, reason, ref, idem) => { if (balanceOf(app.db, cashId(uid)) < amount) bad('NO_FUNDS', 'Not enough cash for that.', 402); move(app, { from: cashId(uid), to: SYS.SINK_FEES, amount, reason, ref, userId: uid, idemKey: idem ? `${reason}:${uid}:${idem}` : null }); };

export function clubAct(app, uid, v, st, body = {}) {
  const C = app.balance.leisure.club;
  if (st.type === 'dance') { cd(app, uid, 'dance', C.danceCdMs, 'Your legs need a small rest. Come back soon!', v.id); const mood = addMood(app, uid, C.danceMood); return { ok: true, mood, text: 'You dey shake body! The floor is yours. 💃' }; }
  if (st.type === 'bar') { const fee = st.fee ?? C.drinkFee; cd(app, uid, 'drink', C.drinkCdMs, 'Slow down on the drinks (soft drinks only here).', v.id); charge(app, uid, fee, 'club_drink', v.id, body.idem); const mood = addMood(app, uid, C.drinkMood); return { ok: true, charged: fee, mood, text: `Cold zobo for ₦${fee}. Sip small!` }; }
  if (st.type === 'vip') { const fee = st.fee ?? C.vipFee; cd(app, uid, 'vip', C.vipCdMs, 'You already enjoyed the VIP corner. Give it a little time.', v.id); charge(app, uid, fee, 'club_vip', v.id, body.idem); const mood = addMood(app, uid, C.vipMood); notify(app, uid, 'venue', 'VIP vibes: you sat in the VIP corner.'); return { ok: true, charged: fee, mood, text: `VIP corner for ₦${fee}. Big boy energy!` }; }
  if (st.type === 'dj') return { ok: true, text: 'DJ is warming up the decks. (Placeholder: no real music in this version.)', info: true };
  if (st.type === 'songs') return { ok: true, info: true, slots: Array.from({ length: C.song.slots }, (_, i) => ({ slot: i + 1, title: 'Open slot', artist: null })), note: C.song.note, text: 'Song slot board' };
  bad('NOT_AN_ACTION', 'Nothing to do with that.');
}
export function basinAct(app, uid, v, st) { const S = app.balance.leisure.salon; cd(app, uid, 'wash', S.washCdMs, 'Your hair is clean already!', v.id); const mood = addMood(app, uid, S.washMood); return { ok: true, mood, text: 'Fresh wash. Head dey cool! 🚿' }; }

export function salonMenu(app, uid, venueId) {
  const v = (app.city.venues || []).find(x => x.id === venueId && x.kind === 'salon'); if (!v) bad('NO_VENUE', 'No salon like that.', 404); const S = app.balance.leisure.salon;
  const st = app.db.prepare('SELECT hair, hair_at FROM player_state WHERE user_id=?').get(uid) || {}; const cur = S.styles.find(x => x.id === st.hair);
  return { venue: v.id, name: v.name, styles: S.styles, current: cur ? { ...cur, fresh: app.clock.now() - st.hair_at < S.freshMs } : null, note: 'Fees are placeholders (ESTIMATE). Game money only.' };
}
export function salonStyle(app, uid, venueId, stationId, styleId, idem) {
  const v = (app.city.venues || []).find(x => x.id === venueId && x.kind === 'salon'); if (!v) bad('NO_VENUE', 'No salon like that.', 404); const st = v.stations.find(s => s.id === stationId && s.type === 'style'); if (!st) bad('NO_STATION', 'Sit in a styling chair first.', 404);
  const p = ensurePresence(app, uid); if (p.venue !== venueId) bad('NOT_INSIDE', 'Step inside first.', 409);
  const S = app.balance.leisure.salon; const style = S.styles.find(x => x.id === styleId); if (!style) bad('BAD_STYLE', 'Pick a style from the menu.');
  cd(app, uid, 'style', S.cdMs, 'You just got a fresh look. Let it breathe a little!', 'salon');
  return app.db.transaction(() => {
    charge(app, uid, style.fee, 'salon_style', `${venueId}:${style.id}`, idem); app.db.prepare('UPDATE player_state SET hair=?, hair_at=? WHERE user_id=?').run(style.id, app.clock.now(), uid); const mood = addMood(app, uid, style.mood);
    return { ok: true, charged: style.fee, mood, style: { id: style.id, name: style.name }, text: `Fresh! ${style.name} for ₦${style.fee}. You dey shine! ✨`, cash: balanceOf(app.db, cashId(uid)) };
  })();
}
