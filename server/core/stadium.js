// Stadium venue actions (10 Oct 2026): match-day ticket (ledger), a seat in the stands (mood, needs a ticket), the score board (cached live scores, see scores.js). Game money only.
import { bad } from './util.js';
import { ensurePresence } from './world.js';
import { addMood, notify } from './economy.js';
import { move, cashId, SYS, balanceOf } from './ledger.js';
import { scoresView, dayKey } from './scores.js';

const venueOf = (app, uid) => { const p = ensurePresence(app, uid); const v = p.venue && app.all.venueById[p.venue]; if (!v || v.kind !== 'stadium') bad('NOT_INSIDE', 'Step inside the stadium first.', 409); return v; };
export const hasTicket = (app, uid, venueId) => !!app.db.prepare('SELECT 1 FROM stadium_tickets WHERE user_id=? AND venue_id=? AND day=?').get(uid, venueId, dayKey(app.clock.now()));

export function buyTicket(app, uid, idem) {
  const v = venueOf(app, uid); const S = app.balance.stadium; if (hasTicket(app, uid, v.id)) bad('HAVE_TICKET', 'You already have today’s ticket.', 409);
  if (balanceOf(app.db, cashId(uid)) < S.ticketFee) bad('NO_FUNDS', 'Not enough cash for a ticket.', 402);
  return app.db.transaction(() => {
    move(app, { from: cashId(uid), to: SYS.SINK_FEES, amount: S.ticketFee, reason: 'stadium_ticket', ref: v.id, userId: uid, idemKey: idem ? `stadium_ticket:${uid}:${idem}` : null });
    app.db.prepare('INSERT INTO stadium_tickets(user_id, venue_id, day, created_at) VALUES (?,?,?,?)').run(uid, v.id, dayKey(app.clock.now()), app.clock.now());
    const mood = addMood(app, uid, S.ticketMood); return { ok: true, charged: S.ticketFee, mood, text: `Ticket bought for ₦${S.ticketFee}. Enjoy the match!`, cash: balanceOf(app.db, cashId(uid)) };
  })();
}
export function sitSeat(app, uid) {
  const v = venueOf(app, uid); const S = app.balance.stadium; if (!hasTicket(app, uid, v.id)) bad('NO_TICKET', 'Buy a ticket at the gate first.', 409);
  const now = app.clock.now(); const p = ensurePresence(app, uid); if (now - (p.lastSeat || 0) < S.seatCdMs) bad('COOLDOWN', 'Enjoy the view a little longer.', 429, { waitMs: S.seatCdMs - (now - p.lastSeat) });
  p.lastSeat = now; const mood = addMood(app, uid, S.seatMood); const live = scoresView(app).fixtures.find((f) => f.state === 'live');
  if (live) notify(app, uid, 'venue', `In the stands: ${live.home} ${live.homeGoals ?? 0} - ${live.awayGoals ?? 0} ${live.away}`);
  return { ok: true, mood, text: live ? `You find a seat. ${live.home} ${live.homeGoals ?? 0} - ${live.awayGoals ?? 0} ${live.away}. What a game! 🙌` : 'You find a seat and soak in the atmosphere. 🙌', match: live || null };
}
export function viewScores(app, uid) { const v = venueOf(app, uid); return { venue: v.id, hasTicket: hasTicket(app, uid, v.id), ...scoresView(app) }; }
/** called from venues.act for the three station types */
export function stadiumAct(app, uid, st, body = {}) {
  if (st.type === 'ticket') return buyTicket(app, uid, body.idem);
  if (st.type === 'seat') return sitSeat(app, uid);
  if (st.type === 'scores') return { info: true, ...viewScores(app, uid), text: 'Score board' };
  bad('NOT_AN_ACTION', 'Nothing to do with that.');
}
