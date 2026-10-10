// "Landlord Lagos" (working title): an original Lagos roll-and-buy property game for 2 to 4 players. Monopoly-STYLE, not Monopoly: see docs/WORD_BOARD_GAMES.md for what is different and why.
// GAME MONEY ONLY. The match cash below (start ₦1,500,000 play money) lives only inside the match and is NOT the ledger: the real in-game currency is touched only by the table-game layer
// (entry stake into escrow, the pot to the winner at the end), so a match makes no per-rent ledger entries. Nobody can cash out.
// Server-authoritative: the dice and the Luck deck come from a seeded generator stored in the match state (a match can be replayed from its seed and moves).
// Moves (st.phase decides which are legal):   roll | payfine | usepass (in Go-Slow, before rolling)   buy | skip (after landing on an unowned property)
//   build {sq} | sell {sq} | trade {to, give:[sq], get:[sq], giveCash, getCash} | end (finish your turn)   accept | decline (the player a trade was offered to)
// A match ends when one player is left (all others bankrupt or gone) or after MAX_ROUNDS rounds: then the richest (cash + property prices + buildings) wins; a tie is a draw.
import { SQUARES, GROUPS, SET_OF, CARDS, START_CASH, SALARY, FINE, MAX_ROUNDS, BUILD_MAX, RENT_MULT, STATION_RENT, UTILITY_MULT, GOSLOW } from '../../config/landlord-board.js';
export { SQUARES, GROUPS, CARDS, START_CASH, SALARY, FINE, MAX_ROUNDS };
const N = SQUARES.length, TRADES_PER_TURN = 2;
const fmt = (n) => '₦' + Math.round(n).toLocaleString('en-US');

// ---- seeded generator kept in the state (mulberry32 stepped one value at a time)
function rnd(st) { st.rs = (st.rs + 0x6D2B79F5) >>> 0; let t = st.rs; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
/** the next two dice WITHOUT rolling them (tests use this to set up a known roll) */
export const peekDice = (st) => { const c = { rs: st.rs }; return [d6(c), d6(c)]; };
const d6 = (st) => 1 + Math.floor(rnd(st) * 6);
const say = (st, seat, text) => { st.log.push({ seat, text }); if (st.log.length > 40) st.log.shift(); return text; };

export function newGame(n = 2, rng = Math.random) {
  n = Math.max(2, Math.min(4, n)); const st = { n, maxRounds: MAX_ROUNDS, round: 1, turn: 0, phase: 'roll', winner: null, why: null, dice: null, dbl: 0, rs: Math.floor(rng() * 4294967296) >>> 0, log: [], trade: null, tradesLeft: TRADES_PER_TURN, last: null,
    players: Array.from({ length: n }, () => ({ cash: START_CASH, pos: 0, slow: 0, pass: 0, out: false })), own: SQUARES.map(() => ({ o: -1, h: 0 })), deck: [], deckPos: 0 };
  const idx = CARDS.map((_, i) => i); for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd(st) * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; } st.deck = idx;
  st.turn = Math.floor(rnd(st) * n); return st;
}
// ---- queries
const active = (st) => st.players.map((p, i) => (p.out ? -1 : i)).filter(i => i >= 0);
const ownedBy = (st, seat) => st.own.map((o, i) => (o.o === seat ? i : -1)).filter(i => i >= 0);
const hasSet = (st, seat, g) => SET_OF(g).every(i => st.own[i].o === seat);
const stationsOf = (st, seat) => SQUARES.filter((s, i) => s.t === 'station' && st.own[i].o === seat).length;
const utilitiesOf = (st, seat) => SQUARES.filter((s, i) => s.t === 'utility' && st.own[i].o === seat).length;
export function rentOf(st, sq, dice = 7) {
  const s = SQUARES[sq], o = st.own[sq]; if (o.o < 0) return 0;
  if (s.t === 'station') return STATION_RENT[stationsOf(st, o.o) - 1];
  if (s.t === 'utility') return dice * UTILITY_MULT[utilitiesOf(st, o.o) - 1];
  return s.rent * RENT_MULT[o.h] * (o.h === 0 && hasSet(st, o.o, s.group) ? 2 : 1);   // a full set with no buildings pays double
}
const valueOf = (sq, o) => (SQUARES[sq].price || 0) + (SQUARES[sq].group ? o.h * GROUPS[SQUARES[sq].group].build : 0);
export const netWorth = (st, seat) => st.players[seat].cash + ownedBy(st, seat).reduce((a, i) => a + valueOf(i, st.own[i]), 0);
const canBuildOn = (st, seat, sq) => { const s = SQUARES[sq], o = st.own[sq]; if (s.t !== 'prop' || o.o !== seat || !hasSet(st, seat, s.group) || o.h >= BUILD_MAX) return false; if (st.players[seat].cash < GROUPS[s.group].build) return false; return SET_OF(s.group).every(i => st.own[i].h >= o.h); };
const canSellOn = (st, seat, sq) => { const s = SQUARES[sq], o = st.own[sq]; return s.t === 'prop' && o.o === seat && o.h > 0 && SET_OF(s.group).every(i => st.own[i].h <= o.h); };

// ---- money: pay a debt; sell buildings and then properties to the bank (half price) before going bankrupt
function liquidate(st, seat, need) {
  const p = st.players[seat];
  while (p.cash < need) { const c = ownedBy(st, seat).filter(i => st.own[i].h > 0).sort((a, b) => st.own[b].h - st.own[a].h); const hit = c.find(i => canSellOn(st, seat, i)); if (hit === undefined) break; st.own[hit].h--; p.cash += GROUPS[SQUARES[hit].group].build / 2; }
  while (p.cash < need) { const c = ownedBy(st, seat).sort((a, b) => SQUARES[a].price - SQUARES[b].price); if (!c.length) break; const sq = c[0]; p.cash += SQUARES[sq].price / 2; st.own[sq] = { o: -1, h: 0 }; say(st, seat, `${nm(st, seat)} sold ${SQUARES[sq].name} to the bank to raise cash.`); }
}
const nm = (st, seat) => `Player ${seat + 1}`;   // the client swaps "Player N" for the player's name
/** what a player could raise right now by selling everything to the bank (buildings and properties at half price) */
const quickCash = (st, seat) => st.players[seat].cash + ownedBy(st, seat).reduce((a, i) => a + (SQUARES[i].price + (SQUARES[i].group ? st.own[i].h * GROUPS[SQUARES[i].group].build : 0)) / 2, 0);
function bankrupt(st, seat, to) {
  const p = st.players[seat]; for (const i of ownedBy(st, seat)) if (st.own[i].h > 0) { p.cash += st.own[i].h * GROUPS[SQUARES[i].group].build / 2; st.own[i].h = 0; }   // buildings are sold off for half; the creditor gets the cash and the plain properties
  const get = to != null && !st.players[to].out ? st.players[to] : null; if (get) get.cash += Math.max(0, p.cash);
  for (const i of ownedBy(st, seat)) { st.own[i] = { o: get ? to : -1, h: 0 }; } if (p.pass && get) get.pass += p.pass; p.cash = 0; p.pass = 0; p.out = true;
  if (st.trade && (st.trade.from === seat || st.trade.to === seat)) st.trade = null;
  say(st, seat, `${nm(st, seat)} is bankrupt${get ? ` and everything goes to ${nm(st, to)}` : ' and the bank takes everything'}.`); checkEnd(st);
}
/** pay `amt` to a player (seat) or the bank (null). Returns false if the payer went bankrupt. */
function pay(st, seat, to, amt) {
  const p = st.players[seat]; if (amt <= 0) return true; if (p.cash < amt && quickCash(st, seat) >= amt) liquidate(st, seat, amt);   // only sell off assets if that really covers the debt; otherwise the creditor gets them
  if (p.cash >= amt) { p.cash -= amt; if (to != null) st.players[to].cash += amt; return true; } bankrupt(st, seat, to); return false;
}
function checkEnd(st) { const a = active(st); if (st.winner == null && a.length <= 1) { st.winner = a[0] ?? 'draw'; st.why = a.length ? 'Last landlord standing' : 'Everybody went bankrupt'; } }
function finishByRounds(st) {
  const a = active(st); const w = a.map(i => ({ i, nw: netWorth(st, i), props: ownedBy(st, i).length })).sort((x, y) => y.nw - x.nw || y.props - x.props);
  st.winner = w.length > 1 && w[0].nw === w[1].nw && w[0].props === w[1].props ? 'draw' : w[0].i; st.why = `After ${st.maxRounds} rounds the richest landlord wins (${w.map(x => `${nm(st, x.i)} ${fmt(x.nw)}`).join(', ')})`;
}
// ---- movement and landing
function advanceTurn(st) {
  const a = active(st); if (a.length <= 1) return checkEnd(st); const cur = st.turn; let nxt = cur; do { nxt = (nxt + 1) % st.n; } while (st.players[nxt].out);
  if (nxt <= cur) { st.round++; if (st.round > st.maxRounds) { finishByRounds(st); return; } }
  st.turn = nxt; st.phase = 'roll'; st.dice = null; st.dbl = 0; st.extra = false; st.tradesLeft = TRADES_PER_TURN; st.trade = null;
}
function after(st, seat) { // a landing has been resolved: what next? (a doubles roll goes again unless the player is stuck in Go-Slow or gone)
  if (st.winner != null) return; if (st.players[seat].out) return advanceTurn(st);
  if (st.extra && st.players[seat].slow === 0) { st.extra = false; st.phase = 'roll'; say(st, seat, `${nm(st, seat)} rolled doubles and goes again.`); } else st.phase = 'end';
}
function moveTo(st, seat, to) { const p = st.players[seat]; if (to < p.pos && to !== 0) { p.cash += SALARY; say(st, seat, `${nm(st, seat)} passed Pay Day: +${fmt(SALARY)}.`); } p.pos = to; }   // landing ON Pay Day is paid by land()
function toGoSlow(st, seat, why) { const p = st.players[seat]; p.pos = GOSLOW; p.slow = 1; st.dbl = 0; say(st, seat, `${nm(st, seat)} ${why} and is stuck in Go-Slow.`); }
function land(st, seat, dice, { double = false } = {}) {
  const p = st.players[seat]; const sq = p.pos; const s = SQUARES[sq]; const o = st.own[sq];
  if (s.t === 'start') { p.cash += SALARY; say(st, seat, `${nm(st, seat)} landed on Pay Day: +${fmt(SALARY)}.`); }
  else if (s.t === 'prop' || s.t === 'station' || s.t === 'utility') {
    if (o.o < 0) { if (p.cash >= s.price) { st.phase = 'buy'; st.last = { seat, buy: sq }; say(st, seat, `${nm(st, seat)} landed on ${s.name} (${fmt(s.price)}). Buy it?`); return; } say(st, seat, `${nm(st, seat)} landed on ${s.name} but cannot afford ${fmt(s.price)}.`); }
    else if (o.o !== seat) { const rent = rentOf(st, sq, dice) * (double ? 2 : 1); say(st, seat, `${nm(st, seat)} landed on ${s.name}, owned by ${nm(st, o.o)}: rent ${fmt(rent)}.`); pay(st, seat, o.o, rent); }
  } else if (s.t === 'levy') { say(st, seat, `${nm(st, seat)} paid the ${s.name}: ${fmt(s.amount)}.`); pay(st, seat, null, s.amount); }
  else if (s.t === 'checkpoint') toGoSlow(st, seat, 'ran into a police checkpoint');
  else if (s.t === 'luck') { if (luck(st, seat, dice)) return; }
  after(st, seat);
}
function luck(st, seat, dice) { // returns true if the card started something that handles "after" itself
  const p = st.players[seat]; const c = CARDS[st.deck[st.deckPos % st.deck.length]]; st.deckPos++; say(st, seat, `Luck for ${nm(st, seat)}: ${c.text}`);
  switch (c.t) {
    case 'cash': if (c.amt > 0) p.cash += c.amt; else pay(st, seat, null, -c.amt); break;
    case 'goto': moveTo(st, seat, c.sq); land(st, seat, dice); return true;
    case 'nearest': { let to = p.pos; do { to = (to + 1) % N; } while (SQUARES[to].t !== 'station'); moveTo(st, seat, to); land(st, seat, dice, { double: true }); return true; }
    case 'back': p.pos = (p.pos - c.n + N) % N; land(st, seat, dice); return true;
    case 'goslow': toGoSlow(st, seat, 'was sent by a Luck card'); break;
    case 'pass': p.pass++; break;
    case 'eachGet': for (const j of active(st)) if (j !== seat) pay(st, j, seat, c.amt); break;
    case 'eachPay': for (const j of active(st)) { if (j !== seat && !p.out) pay(st, seat, j, c.amt); } break;
    case 'repairs': { let tot = 0; for (const i of ownedBy(st, seat)) { const h = st.own[i].h; tot += h === 5 ? c.tower : h * c.house; } pay(st, seat, null, tot); break; }
  }
  return false;
}
function stepRoll(st, seat) {
  const p = st.players[seat]; const a = d6(st), b = d6(st); const dbl = a === b; st.dice = [a, b]; const tot = a + b; st.extra = false;
  say(st, seat, `${nm(st, seat)} rolled ${a} and ${b}.`);
  if (p.slow > 0) { // in Go-Slow: doubles frees you (no extra roll); the third failed try costs the fine; otherwise you stay
    if (dbl) { p.slow = 0; say(st, seat, `${nm(st, seat)} rolled doubles and is out of Go-Slow.`); }
    else if (p.slow >= 3) { say(st, seat, `${nm(st, seat)} pays the ${fmt(FINE)} fine after three tries.`); if (!pay(st, seat, null, FINE)) return after(st, seat); p.slow = 0; }
    else { p.slow++; st.phase = 'end'; return; }
  } else if (dbl) { st.dbl++; if (st.dbl >= 3) { toGoSlow(st, seat, 'rolled doubles three times'); st.phase = 'end'; return; } st.extra = true; }
  moveTo(st, seat, (p.pos + tot) % N); land(st, seat, tot);
}
// ---- the move entry point
export function play(st, seat, mv = {}) {
  if (st.winner != null) return { error: 'GAME_OVER' }; const act = String(mv.action || ''); const p = st.players[seat]; if (!p || p.out) return { error: 'NOT_YOUR_TURN' };
  if (st.turn !== seat) return { error: 'NOT_YOUR_TURN' };
  const sq = Number.isInteger(mv.sq) ? mv.sq : Number(mv.sq); const err = (error, message) => ({ error, message }); const ok = () => { const o = { ok: true, won: st.winner }; return o; };
  if (st.phase === 'trade') { // this seat has been offered a deal
    const t = st.trade; if (!t || t.to !== seat) return err('NOT_YOUR_TURN'); if (act !== 'accept' && act !== 'decline') return err('BAD_ACTION', 'Accept or decline the offer.');
    if (act === 'accept') { for (const i of t.give) st.own[i] = { o: seat, h: 0 }; for (const i of t.get) st.own[i] = { o: t.from, h: 0 }; st.players[t.from].cash += t.getCash - t.giveCash; p.cash += t.giveCash - t.getCash; say(st, seat, `${nm(st, seat)} accepted ${nm(st, t.from)}'s offer.`); } else say(st, seat, `${nm(st, seat)} declined ${nm(st, t.from)}'s offer.`);
    st.turn = t.from; st.phase = 'end'; st.trade = null; return ok();
  }
  switch (act) {
    case 'roll': if (st.phase !== 'roll') return err('BAD_ACTION', 'You cannot roll now.'); stepRoll(st, seat); return ok();
    case 'payfine': if (st.phase !== 'roll' || p.slow === 0) return err('BAD_ACTION', 'You are not in Go-Slow.'); if (p.cash < FINE) return err('NO_CASH', `You need ${fmt(FINE)}.`); p.cash -= FINE; p.slow = 0; say(st, seat, `${nm(st, seat)} paid the ${fmt(FINE)} fine and is out of Go-Slow.`); return ok();
    case 'usepass': if (st.phase !== 'roll' || p.slow === 0 || p.pass < 1) return err('BAD_ACTION', 'No free pass to use.'); p.pass--; p.slow = 0; say(st, seat, `${nm(st, seat)} used a free pass and is out of Go-Slow.`); return ok();
    case 'buy': { if (st.phase !== 'buy') return err('BAD_ACTION', 'Nothing to buy.'); const s = SQUARES[p.pos]; p.cash -= s.price; st.own[p.pos] = { o: seat, h: 0 }; say(st, seat, `${nm(st, seat)} bought ${s.name} for ${fmt(s.price)}.`); after(st, seat); return ok(); }
    case 'skip': { if (st.phase !== 'buy') return err('BAD_ACTION', 'Nothing to skip.'); say(st, seat, `${nm(st, seat)} did not buy ${SQUARES[p.pos].name}.`); after(st, seat); return ok(); }
    case 'build': { if (st.phase !== 'roll' && st.phase !== 'end') return err('BAD_ACTION', 'Not now.'); if (!canBuildOn(st, seat, sq)) return err('CANNOT_BUILD', 'You need the whole area, enough cash, and to build evenly.'); const g = GROUPS[SQUARES[sq].group]; p.cash -= g.build; st.own[sq].h++; say(st, seat, `${nm(st, seat)} built on ${SQUARES[sq].name} (${st.own[sq].h === 5 ? 'a tower' : st.own[sq].h + ' building' + (st.own[sq].h > 1 ? 's' : '')}).`); return ok(); }
    case 'sell': { if (st.phase !== 'roll' && st.phase !== 'end') return err('BAD_ACTION', 'Not now.'); if (!canSellOn(st, seat, sq)) return err('CANNOT_SELL', 'Sell the tallest building in the area first.'); st.own[sq].h--; p.cash += GROUPS[SQUARES[sq].group].build / 2; say(st, seat, `${nm(st, seat)} sold a building on ${SQUARES[sq].name}.`); return ok(); }
    case 'trade': {
      if (st.phase !== 'end') return err('BAD_ACTION', 'Offer a trade after you finish moving.'); if (st.tradesLeft < 1) return err('TRADE_LIMIT', 'No more offers this turn.');
      const to = Number(mv.to); const q = st.players[to]; if (!q || q.out || to === seat) return err('BAD_TRADE', 'Pick another player still in the game.');
      const give = [...new Set((mv.give || []).map(Number))], get = [...new Set((mv.get || []).map(Number))]; const giveCash = Math.max(0, Math.floor(Number(mv.giveCash) || 0)), getCash = Math.max(0, Math.floor(Number(mv.getCash) || 0));
      if (!give.length && !get.length && !giveCash && !getCash) return err('BAD_TRADE', 'The offer is empty.');
      const bldg = (i) => { const g = SQUARES[i]?.group; return g ? SET_OF(g).some(j => st.own[j].h > 0) : false; };
      if (give.some(i => !SQUARES[i] || st.own[i].o !== seat || bldg(i)) || get.some(i => !SQUARES[i] || st.own[i].o !== to || bldg(i))) return err('BAD_TRADE', 'You can only trade properties you own, and not in areas with buildings (sell them first).');
      if (giveCash > p.cash || getCash > q.cash) return err('BAD_TRADE', 'Not enough cash for that offer.'); if (!(give.length + get.length)) { /* cash for nothing is allowed as a gift */ }
      st.trade = { from: seat, to, give, get, giveCash, getCash }; st.tradesLeft--; st.phase = 'trade'; st.turn = to; say(st, seat, `${nm(st, seat)} offered ${nm(st, to)} a trade.`); return ok();
    }
    case 'end': if (st.phase !== 'end') return err('BAD_ACTION', st.phase === 'buy' ? 'Buy or skip first.' : 'Roll first.'); advanceTurn(st); return ok();
    default: return err('BAD_ACTION', 'Unknown action.');
  }
}
export function forfeit(st, seat) {
  const p = st.players[seat]; if (!p || p.out || st.winner != null) return { ok: true, won: st.winner };
  if (st.trade && (st.trade.from === seat || st.trade.to === seat)) { st.turn = st.trade.from; st.phase = 'end'; st.trade = null; }   // an open offer dies; the proposer carries on (or, if they left, their turn is skipped below)
  const wasTurn = st.turn === seat; bankrupt(st, seat, null); if (st.winner == null && wasTurn) advanceTurn(st);
  return { ok: true, won: st.winner };
}
export function view(st, who) {
  const me = st.players[who]; const myTurn = st.turn === who && st.winner == null && !me?.out; const act = [];
  if (myTurn) { if (st.phase === 'roll') { act.push('roll'); if (me.slow) { if (me.cash >= FINE) act.push('payfine'); if (me.pass) act.push('usepass'); } } else if (st.phase === 'buy') act.push('buy', 'skip'); else if (st.phase === 'end') { act.push('end'); if (st.tradesLeft > 0) act.push('trade'); } else if (st.phase === 'trade') act.push('accept', 'decline'); if (st.phase === 'roll' || st.phase === 'end') { /* building allowed */ } }
  const mgmt = myTurn && (st.phase === 'roll' || st.phase === 'end');
  return { game: 'landlord', you: who, mine: myTurn, turn: st.turn, phase: st.phase, round: Math.min(st.round, st.maxRounds), maxRounds: st.maxRounds, dice: st.dice, actions: act,
    players: st.players.map((q, i) => ({ seat: i, cash: q.cash, pos: q.pos, slow: q.slow, pass: q.pass, out: q.out, worth: netWorth(st, i), props: ownedBy(st, i).length })),
    squares: st.own.map((o, i) => ({ o: o.o, h: o.h, rent: o.o >= 0 ? rentOf(st, i, 7) : 0 })), canBuild: mgmt ? SQUARES.map((_, i) => i).filter(i => canBuildOn(st, who, i)) : [], canSell: mgmt ? SQUARES.map((_, i) => i).filter(i => canSellOn(st, who, i)) : [],
    buy: st.phase === 'buy' && myTurn ? { sq: me.pos, price: SQUARES[me.pos].price } : null, trade: st.trade && (st.trade.to === who || st.trade.from === who) ? st.trade : null, log: st.log.slice(-12), fine: FINE, why: st.why };
}
// ---- practice bot: buys sensibly, builds when comfortable, keeps a cash cushion, judges trade offers by value
const completes = (st, seat, sq) => { const g = SQUARES[sq].group; return g ? SET_OF(g).filter(i => i !== sq).every(i => st.own[i].o === seat) : false; };
export function bot(st, seat) {
  const p = st.players[seat]; const cushion = 150000 + st.round * 4000;
  if (st.phase === 'trade' && st.trade?.to === seat) {
    const t = st.trade; let recv = t.giveCash, give = t.getCash; for (const i of t.give) recv += SQUARES[i].price * (completes(st, seat, i) || (SQUARES[i].group && SET_OF(SQUARES[i].group).filter(j => j !== i).every(j => st.own[j].o === seat || t.give.includes(j))) ? 1.8 : 1);
    for (const i of t.get) give += SQUARES[i].price * (SQUARES[i].group && SET_OF(SQUARES[i].group).filter(j => j !== i).every(j => st.own[j].o === t.from || t.get.includes(j)) ? 2.2 : 1); return { action: recv >= give * 1.15 && p.cash + t.giveCash - t.getCash > 50000 ? 'accept' : 'decline' };
  }
  if (st.phase === 'roll') { if (p.slow) { if (p.pass) return { action: 'usepass' }; if (p.cash > 600000 && st.round < st.maxRounds - 2) return { action: 'payfine' }; } const b = pickBuild(st, seat, cushion); if (b != null) return { action: 'build', sq: b }; return { action: 'roll' }; }
  if (st.phase === 'buy') { const s = SQUARES[p.pos]; const worth = p.cash - s.price >= cushion || completes(st, seat, p.pos) || s.t === 'station'; return { action: worth && p.cash - s.price >= 40000 ? 'buy' : 'skip' }; }
  if (st.phase === 'end') { const b = pickBuild(st, seat, cushion); if (b != null) return { action: 'build', sq: b }; return { action: 'end' }; }
  return { action: 'end' };
}
function pickBuild(st, seat, cushion) { const p = st.players[seat]; const c = SQUARES.map((_, i) => i).filter(i => canBuildOn(st, seat, i) && p.cash - GROUPS[SQUARES[i].group].build >= cushion); return c.length ? c.sort((a, b) => SQUARES[a].price - SQUARES[b].price)[0] : null; }
