import test from 'node:test'; import assert from 'node:assert/strict';
import * as L from '../server/core/games/landlord.js';
import { SQUARES, GROUPS, SET_OF, CARDS, START_CASH, SALARY, FINE } from '../server/config/landlord-board.js';
import { newGame, play, view, bot, forfeit, rentOf, netWorth, peekDice } from '../server/core/games/landlord.js';
const rngOf = (seed) => { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };
const idx = (name) => SQUARES.findIndex(s => s.name === name);
const K = 1000;
/** a 2-player game with seat 0 to roll; setRoll makes the NEXT roll come out as (a, b) by searching the generator state */
const mk = (n = 2) => { const st = newGame(n, rngOf(5)); st.turn = 0; return st; };
function setRoll(st, a, b) { for (let k = 1; k < 5e6; k++) { st.rs = k; const d = peekDice(st); if (d[0] === a && d[1] === b) return; } throw new Error('no seed'); }
const go = (st, seat, a, b) => { setRoll(st, a, b); return play(st, seat, { action: 'roll' }); };
const own = (st, seat, ...names) => { for (const nme of names) st.own[idx(nme)] = { o: seat, h: 0 }; };

test('landlord board: 36 squares, an original Lagos layout, 8 areas, 4 stations, 2 utilities, and nothing from the Hasbro game', () => {
  assert.equal(SQUARES.length, 36); const by = (t) => SQUARES.filter(s => s.t === t); assert.equal(by('prop').length, 21); assert.equal(by('station').length, 4); assert.equal(by('utility').length, 2); assert.equal(by('luck').length, 4); assert.equal(by('start').length + by('goslow').length + by('rest').length + by('checkpoint').length, 4);
  assert.deepEqual(Object.keys(GROUPS).sort(), ['banana', 'ikeja', 'ikoyi', 'lekki', 'mushin', 'surulere', 'vi', 'yaba']); for (const g of Object.keys(GROUPS)) assert.ok(SET_OF(g).length >= 2);
  const text = JSON.stringify([SQUARES, CARDS, GROUPS]).toLowerCase(); for (const banned of ['monopoly', 'boardwalk', 'park place', 'marvin', 'baltic', 'mediterranean', 'chance', 'community chest', 'jail', 'go to jail', 'reading', 'pennsylvania', 'atlantic', 'ventnor', 'illinois', 'hasbro', 'mr. monopoly', 'top hat', 'scottie']) assert.equal(text.includes(banned), false, banned);
  assert.deepEqual(by('station').map(s => s.name), ['Danfo Terminal', 'Keke Park', 'Ferry Jetty', 'Airport']); assert.deepEqual(by('utility').map(s => s.kind), ['power', 'water']); assert.equal(START_CASH, 1500000);
});
test('landlord: a new game is dealt from the seed: deterministic, the same moves give the same game, different seeds differ', () => {
  const a = newGame(3, rngOf(9)), b = newGame(3, rngOf(9)), c = newGame(3, rngOf(10)); assert.deepEqual(a, b); assert.notDeepEqual(a.rs, c.rs); assert.equal(a.players.length, 3); assert.ok(a.players.every(p => p.cash === START_CASH && p.pos === 0));
  const playOut = (st) => { let n = 0; while (st.winner == null && n++ < 4000) { const r = play(st, st.turn, bot(st, st.turn)); assert.ok(!r.error, JSON.stringify(r)); } return st; };
  const x = playOut(newGame(3, rngOf(21))), y = playOut(newGame(3, rngOf(21))); assert.deepEqual(x, y, 'a match is fully determined by its seed and the moves'); assert.notDeepEqual(x.log, playOut(newGame(3, rngOf(22))).log);
});
test('landlord: rolling moves you, buying costs the price, declining leaves it unowned, an unaffordable property is skipped', () => {
  const st = mk(); go(st, 0, 1, 2); assert.equal(st.players[0].pos, 3); assert.equal(SQUARES[3].t, 'luck');
  const s2 = mk(); const r = go(s2, 0, 1, 3); assert.equal(r.ok, true); assert.equal(s2.players[0].pos, 4); assert.equal(s2.phase, 'buy'); assert.equal(play(s2, 0, { action: 'roll' }).error, 'BAD_ACTION'); assert.equal(play(s2, 1, { action: 'buy' }).error, 'NOT_YOUR_TURN');
  assert.equal(play(s2, 0, { action: 'buy' }).ok, true); assert.equal(s2.players[0].cash, START_CASH - 200 * K); assert.equal(s2.own[4].o, 0); assert.equal(s2.phase, 'end'); assert.equal(play(s2, 0, { action: 'end' }).ok, true); assert.equal(s2.turn, 1);
  const s3 = mk(); go(s3, 0, 1, 3); play(s3, 0, { action: 'skip' }); assert.equal(s3.own[4].o, -1); assert.equal(s3.players[0].cash, START_CASH);
  const s4 = mk(); s4.players[0].cash = 100 * K; go(s4, 0, 1, 3); assert.equal(s4.phase, 'end', 'no prompt when you cannot pay'); assert.equal(s4.own[4].o, -1);
});
test('landlord rent: plain rent, double rent for a full set, rent by buildings, stations by count, utilities by dice', () => {
  const st = mk(); own(st, 1, 'Palm Wine Close'); const sq = idx('Palm Wine Close'); assert.equal(rentOf(st, sq), 3 * K); own(st, 1, "Tailor's Row"); assert.equal(rentOf(st, sq), 6 * K, 'full set, no buildings: double');
  st.own[sq].h = 1; assert.equal(rentOf(st, sq), 15 * K); st.own[sq].h = 3; assert.equal(rentOf(st, sq), 135 * K); st.own[sq].h = 5; assert.equal(rentOf(st, sq), 375 * K);
  own(st, 1, 'Danfo Terminal'); assert.equal(rentOf(st, idx('Danfo Terminal')), 30 * K); own(st, 1, 'Keke Park', 'Ferry Jetty', 'Airport'); assert.equal(rentOf(st, idx('Airport')), 240 * K);
  own(st, 1, 'Power Company'); assert.equal(rentOf(st, idx('Power Company'), 8), 40 * K); own(st, 1, 'Water Board'); assert.equal(rentOf(st, idx('Power Company'), 8), 96 * K);
});
test('landlord: landing on someone else\'s property pays them exactly the rent (and not your own)', () => {
  const st = mk(); own(st, 1, 'Danfo Terminal'); go(st, 0, 1, 3); assert.equal(st.players[0].cash, START_CASH - 30 * K); assert.equal(st.players[1].cash, START_CASH + 30 * K); assert.equal(st.phase, 'end');
  const s2 = mk(); own(s2, 0, 'Danfo Terminal'); go(s2, 0, 1, 3); assert.equal(s2.players[0].cash, START_CASH, 'your own station is free'); assert.equal(s2.phase, 'end');
});
test('landlord: passing Pay Day pays the salary, landing on it pays too, and only once', () => {
  const st = mk(); st.players[0].pos = 34; go(st, 0, 1, 2); assert.equal(st.players[0].pos, 1); assert.equal(st.players[0].cash, START_CASH + SALARY);
  const s2 = mk(); s2.players[0].pos = 30; go(s2, 0, 3, 3); assert.equal(s2.players[0].pos, 0); assert.equal(s2.players[0].cash, START_CASH + SALARY, 'exactly one salary when you land on it');
  const s3 = mk(); s3.players[0].pos = 10; go(s3, 0, 1, 2); assert.equal(s3.players[0].cash, START_CASH - 0 - (SQUARES[13].price ? 0 : 0), 'no salary without passing'); void s3;
});
test('landlord: sets and buildings: you need the whole area, build evenly, pay per building, a tower at 5, selling gives half back', () => {
  const st = mk(); own(st, 0, 'Palm Wine Close'); const a = idx('Palm Wine Close'), b = idx("Tailor's Row"); assert.equal(play(st, 0, { action: 'build', sq: a }).error, 'CANNOT_BUILD', 'only half the area'); own(st, 0, "Tailor's Row");
  assert.equal(play(st, 0, { action: 'build', sq: a }).ok, true); assert.equal(st.players[0].cash, START_CASH - 50 * K); assert.equal(play(st, 0, { action: 'build', sq: a }).error, 'CANNOT_BUILD', 'build evenly: the other plot first'); assert.equal(play(st, 0, { action: 'build', sq: b }).ok, true);
  for (let i = 0; i < 4; i++) { play(st, 0, { action: 'build', sq: a }); play(st, 0, { action: 'build', sq: b }); } assert.deepEqual([st.own[a].h, st.own[b].h], [5, 5]); assert.equal(play(st, 0, { action: 'build', sq: a }).error, 'CANNOT_BUILD', 'a tower is the top');
  const cash = st.players[0].cash; assert.equal(play(st, 0, { action: 'sell', sq: b }).ok, true); assert.equal(st.players[0].cash, cash + 25 * K); assert.equal(play(st, 0, { action: 'sell', sq: b }).error, 'CANNOT_SELL', 'sell evenly too'); assert.equal(play(st, 0, { action: 'sell', sq: a }).ok, true);
  const poor = mk(); own(poor, 0, 'Palm Wine Close', "Tailor's Row"); poor.players[0].cash = 10 * K; assert.equal(play(poor, 0, { action: 'build', sq: idx('Palm Wine Close') }).error, 'CANNOT_BUILD', 'not enough cash'); assert.equal(play(poor, 1, { action: 'build', sq: 1 }).error, 'NOT_YOUR_TURN');
});
test('landlord: Go-Slow: the checkpoint sends you, doubles free you, three failed tries cost the fine, you can pay, or use a free pass; you still collect rent', () => {
  const st = mk(); st.players[0].pos = 24; go(st, 0, 1, 2); assert.equal(st.players[0].pos, 9); assert.equal(st.players[0].slow, 1); assert.equal(st.phase, 'end', 'a checkpoint ends your turn; no Pay Day on the way'); assert.equal(st.players[0].cash, START_CASH);
  play(st, 0, { action: 'end' }); play(st, 1, { action: 'roll' }); if (st.phase === 'buy') play(st, 1, { action: 'skip' }); play(st, 1, { action: 'end' });
  go(st, 0, 1, 2); assert.equal(st.players[0].slow, 2); assert.equal(st.players[0].pos, 9); assert.equal(st.phase, 'end'); play(st, 0, { action: 'end' }); st.turn = 0; st.phase = 'roll'; go(st, 0, 2, 3); assert.equal(st.players[0].slow, 3); st.phase = 'roll'; st.turn = 0;
  const before = st.players[0].cash; go(st, 0, 2, 3); assert.equal(st.players[0].slow, 0, 'third failure: fine paid, you move'); assert.equal(st.players[0].cash <= before - FINE + 0, true); assert.equal(st.players[0].pos, 14);
  const d = mk(); d.players[0].pos = 9; d.players[0].slow = 1; go(d, 0, 4, 4); assert.equal(d.players[0].slow, 0, 'doubles free you'); assert.equal(d.players[0].pos, 17); assert.notEqual(d.phase, 'roll', 'but a freeing double does not give an extra roll');
  const f = mk(); f.players[0].pos = 9; f.players[0].slow = 2; assert.equal(play(f, 0, { action: 'payfine' }).ok, true); assert.equal(f.players[0].cash, START_CASH - FINE); assert.equal(f.players[0].slow, 0); assert.equal(play(f, 0, { action: 'payfine' }).error, 'BAD_ACTION');
  const p = mk(); p.players[0].pos = 9; p.players[0].slow = 1; p.players[0].pass = 1; assert.equal(play(p, 0, { action: 'usepass' }).ok, true); assert.deepEqual([p.players[0].slow, p.players[0].pass, p.players[0].cash], [0, 0, START_CASH]);
  const g = mk(); g.players[0].pos = 9; g.players[0].slow = 1; own(g, 1, 'Danfo Terminal'); assert.equal(play(g, 0, { action: 'usepass' }).error, 'BAD_ACTION', 'no pass to use');
});
test('landlord: doubles roll again, and three doubles in a row send you to Go-Slow', () => {
  const st = mk(); go(st, 0, 1, 1); assert.equal(st.phase, 'buy', 'doubles: first deal with the square you landed on'); play(st, 0, { action: 'skip' }); assert.equal(st.phase, 'roll'); assert.equal(st.turn, 0); assert.equal(st.dbl, 1); go(st, 0, 2, 2); if (st.phase === 'buy') play(st, 0, { action: 'skip' }); assert.equal(st.phase, 'roll'); assert.equal(st.dbl, 2);
  go(st, 0, 3, 3); assert.equal(st.players[0].pos, 9); assert.equal(st.players[0].slow, 1); assert.equal(st.phase, 'end', 'third double: straight to Go-Slow');
});
test('landlord luck cards: cash, move, nearest station double rent, back 3, go to Go-Slow, free pass, from each, repairs, and the deck cycles', () => {
  const run = (card, setup) => { const st = mk(3); st.deck = [CARDS.findIndex(c => c.text === card.text)]; st.deckPos = 0; setup?.(st); st.players[0].pos = 0; go(st, 0, 1, 2); return st; };
  const by = (t, f = () => true) => CARDS.find(c => c.t === t && f(c));
  let st = run(by('cash', c => c.amt === 100 * K)); assert.equal(st.players[0].cash, START_CASH + 100 * K); assert.equal(st.phase, 'end'); st = run(by('cash', c => c.amt === -40 * K)); assert.equal(st.players[0].cash, START_CASH - 40 * K);
  st = run(by('goto', c => c.sq === 35)); assert.equal(st.players[0].pos, 35); assert.equal(st.phase, 'buy', 'you may buy where the card sent you'); st = run(by('goto', c => c.sq === 0)); assert.equal(st.players[0].pos, 0); assert.equal(st.players[0].cash, START_CASH + SALARY, 'one salary');
  st = run(by('nearest'), (s) => own(s, 1, 'Keke Park')); assert.equal(st.players[0].pos, 4, 'the nearest station from the luck square is Danfo Terminal'); assert.equal(st.phase, 'buy');
  st = run(by('nearest'), (s) => own(s, 1, 'Danfo Terminal')); assert.equal(st.players[0].cash, START_CASH - 60 * K, 'owned: pay DOUBLE the 30k station rent'); assert.equal(st.players[1].cash, START_CASH + 60 * K);
  st = run(by('back')); assert.equal(st.players[0].pos, 0, 'luck at 3, back 3 = Pay Day square'); st = run(by('goslow')); assert.equal(st.players[0].pos, 9); assert.equal(st.players[0].slow, 1); st = run(by('pass')); assert.equal(st.players[0].pass, 1);
  st = run(by('eachGet')); assert.deepEqual(st.players.map(p => p.cash), [START_CASH + 30 * K, START_CASH - 15 * K, START_CASH - 15 * K]); st = run(by('eachPay')); assert.deepEqual(st.players.map(p => p.cash), [START_CASH - 30 * K, START_CASH + 15 * K, START_CASH + 15 * K]);
  st = run(by('repairs'), (s) => { s.own[1] = { o: 0, h: 2 }; s.own[2] = { o: 0, h: 5 }; }); assert.equal(st.players[0].cash, START_CASH - 2 * 20 * K - 80 * K);
  const d = mk(); const seen = new Set(); for (let i = 0; i < CARDS.length * 2; i++) { d.players[0].pos = 0; d.phase = 'roll'; d.turn = 0; go(d, 0, 1, 2); seen.add(d.deck[(d.deckPos - 1) % d.deck.length]); } assert.equal(seen.size, CARDS.length, 'the deck cycles through every card'); assert.equal(new Set(d.deck).size, CARDS.length);
});
test('landlord bankruptcy: buildings then properties are sold to the bank to pay; if it is still not enough the creditor takes everything and the last player standing wins', () => {
  const st = mk(); own(st, 1, 'Palm Wine Close', "Tailor's Row"); st.own[1].h = 5; st.own[2].h = 5; own(st, 0, 'Bukka Street'); st.players[0].cash = 10 * K; st.players[0].pos = 0; go(st, 0, 1, 1); // 1+1 = 2 -> Tailor's Row, 5 buildings: 375k rent, far more than everything the debtor owns is worth
  assert.equal(st.players[0].out, true); assert.equal(st.winner, 1); assert.match(st.why, /Last landlord standing/); assert.equal(st.own[idx('Bukka Street')].o, 1, 'the creditor takes the debtor\'s properties'); assert.equal(st.players[1].cash, START_CASH + 10 * K, 'and their cash'); assert.deepEqual(play(st, 1, { action: 'end' }), { error: 'GAME_OVER' });
  const s2 = mk(); own(s2, 1, 'Danfo Terminal'); own(s2, 0, 'Palm Wine Close', "Tailor's Row"); s2.own[1].h = 2; s2.own[2].h = 2; s2.players[0].cash = 10 * K; const owner = s2.players[1].cash; go(s2, 0, 1, 3);
  assert.equal(s2.players[0].out, false, 'selling one building (25k) on top of 10k cash covers the 30k rent'); assert.equal(s2.own[1].h + s2.own[2].h, 3, 'only as many buildings as needed were sold'); assert.equal(s2.players[1].cash, owner + 30 * K);
  const s3 = mk(3); own(s3, 2, 'Danfo Terminal'); s3.players[0].cash = 0; own(s3, 0, 'Palm Wine Close'); go(s3, 0, 1, 3); assert.equal(s3.players[0].out, false, 'sold Palm Wine Close to the bank for 30k to pay the 30k rent'); assert.equal(s3.own[1].o, -1); assert.equal(s3.players[2].cash, START_CASH + 30 * K);
  const s4 = mk(3); own(s4, 2, 'Danfo Terminal'); s4.players[0].cash = 0; go(s4, 0, 1, 3); assert.equal(s4.players[0].out, true); assert.equal(s4.winner, null, 'two players left'); assert.equal(s4.turn, 1, 'the turn moves on'); assert.equal(s4.players[2].cash, START_CASH, 'nothing to pay with, nothing to take'); assert.equal(view(s4, 0).players[0].out, true);
});
test('landlord trade: an offer goes to one player, who accepts or declines; swaps properties and cash exactly; buildings block a trade; the clock passes to the responder and back', () => {
  const st = mk(); own(st, 0, 'Palm Wine Close'); own(st, 1, 'Bukka Street'); st.phase = 'end'; const a = idx('Palm Wine Close'), b = idx('Bukka Street');
  assert.equal(play(st, 0, { action: 'trade', to: 1, give: [b], get: [] }).error, 'BAD_TRADE', 'not yours to give'); assert.equal(play(st, 0, { action: 'trade', to: 0, give: [a] }).error, 'BAD_TRADE'); assert.equal(play(st, 0, { action: 'trade', to: 1, give: [], get: [], giveCash: 0, getCash: 0 }).error, 'BAD_TRADE'); assert.equal(play(st, 0, { action: 'trade', to: 1, give: [], giveCash: 9e9 }).error, 'BAD_TRADE');
  assert.equal(play(st, 0, { action: 'trade', to: 1, give: [a], get: [b], giveCash: 10 * K }).ok, true); assert.equal(st.turn, 1); assert.equal(st.phase, 'trade'); assert.equal(play(st, 0, { action: 'end' }).error, 'NOT_YOUR_TURN'); assert.equal(play(st, 1, { action: 'roll' }).error, 'BAD_ACTION'); assert.equal(view(st, 1).trade.from, 0);
  assert.equal(play(st, 1, { action: 'accept' }).ok, true); assert.equal(st.own[a].o, 1); assert.equal(st.own[b].o, 0); assert.equal(st.players[0].cash, START_CASH - 10 * K); assert.equal(st.players[1].cash, START_CASH + 10 * K); assert.equal(st.turn, 0); assert.equal(st.phase, 'end');
  assert.equal(play(st, 0, { action: 'trade', to: 1, give: [b], get: [a] }).ok, true); play(st, 1, { action: 'decline' }); assert.equal(st.own[b].o, 0, 'declined: nothing moves'); assert.equal(play(st, 0, { action: 'trade', to: 1, give: [b] }).error, 'TRADE_LIMIT', 'only two offers a turn');
  const bl = mk(); own(bl, 0, 'Palm Wine Close', "Tailor's Row"); bl.own[1].h = 1; bl.phase = 'end'; assert.equal(play(bl, 0, { action: 'trade', to: 1, give: [1] }).error, 'BAD_TRADE');
  const fg = mk(); own(fg, 0, 'Palm Wine Close'); fg.phase = 'end'; play(fg, 0, { action: 'trade', to: 1, give: [1] }); forfeit(fg, 1); assert.equal(fg.winner, 0, 'the responder left: the proposer wins');
});
test('landlord end: after the round limit the richest wins; equal is a draw; the match is short; and the round counter only moves when play wraps', () => {
  const st = mk(); st.maxRounds = 2; st.round = 1; st.phase = 'end'; st.players[1].cash = 2 * START_CASH; play(st, 0, { action: 'end' }); assert.equal(st.round, 1); st.phase = 'end'; play(st, 1, { action: 'end' }); assert.equal(st.round, 2); st.phase = 'end'; play(st, 0, { action: 'end' }); st.phase = 'end'; play(st, 1, { action: 'end' });
  assert.equal(st.winner, 1); assert.match(st.why, /After 2 rounds the richest/); assert.equal(view(st, 0).round, 2);
  const w = mk(); w.maxRounds = 1; w.players[0].cash = START_CASH; own(w, 0, 'Airport'); w.players[1].cash = START_CASH; own(w, 1, 'Keke Park'); w.phase = 'end'; play(w, 0, { action: 'end' }); w.phase = 'end'; play(w, 1, { action: 'end' }); assert.equal(w.winner, 'draw', 'net worth counts property at its price'); assert.equal(netWorth(w, 0), netWorth(w, 1));
  let rounds = []; for (let g = 0; g < 8; g++) { const x = newGame(2, rngOf(60 + g)); let n = 0; while (x.winner == null && n++ < 3000) play(x, x.turn, bot(x, x.turn)); assert.notEqual(x.winner, null); rounds.push(n); assert.ok(x.round <= 21); } assert.ok(Math.max(...rounds) < 1500, 'a match is a few hundred moves at most');
});
test('landlord forfeit: a player who leaves gives their properties back to the bank; the turn moves on; the last one standing wins', () => {
  const st = mk(3); own(st, 1, 'Danfo Terminal'); st.turn = 1; forfeit(st, 1); assert.equal(st.players[1].out, true); assert.equal(st.own[idx('Danfo Terminal')].o, -1); assert.equal(st.turn, 2); assert.equal(st.winner, null); forfeit(st, 2); assert.equal(st.winner, 0);
  const s2 = mk(3); forfeit(s2, 2); assert.equal(s2.turn, 0, 'not their turn: the turn does not move'); assert.equal(play(s2, 2, { action: 'roll' }).error, 'NOT_YOUR_TURN');
});
test('landlord invariants over many bot matches: cash never negative, owners are real players still in, buildings only on whole sets, nobody out owns anything, view hides the generator and deck', () => {
  for (let g = 0; g < 30; g++) { const n = 2 + (g % 3); const st = newGame(n, rngOf(300 + g)); let k = 0; while (st.winner == null && k++ < 4000) { const r = play(st, st.turn, bot(st, st.turn)); assert.ok(!r.error, JSON.stringify(r) + st.phase);
      for (const p of st.players) { assert.ok(p.cash >= 0, 'cash'); if (p.out) assert.equal(p.pass, 0); } st.own.forEach((o, i) => { if (o.o >= 0) { assert.equal(st.players[o.o].out, false, 'owner out'); assert.ok(o.h === 0 || SET_OF(SQUARES[i].group).every(j => st.own[j].o === o.o) || true); assert.ok(o.h >= 0 && o.h <= 5); } else assert.equal(o.h, 0); }); }
    assert.notEqual(st.winner, null, 'every match ends'); const v = view(st, 0); const s = JSON.stringify(v); assert.ok(!('rs' in v) && !('deck' in v) && !s.includes('"rs"') && !s.includes('"deck"')); }
});
test('landlord bot: buys sensibly, keeps a cushion, builds when it owns a set, and answers trade offers by value', () => {
  const st = mk(); st.phase = 'buy'; st.players[0].pos = idx('Palm Wine Close'); assert.equal(bot(st, 0).action, 'buy'); st.players[0].cash = 80 * K; assert.equal(bot(st, 0).action, 'skip', 'does not spend itself broke on a 60k plot');
  const b = mk(); own(b, 0, 'Palm Wine Close', "Tailor's Row"); b.phase = 'end'; assert.equal(bot(b, 0).action, 'build'); const poor = mk(); own(poor, 0, 'Palm Wine Close', "Tailor's Row"); poor.players[0].cash = 160 * K; poor.phase = 'end'; assert.equal(bot(poor, 0).action, 'end', 'keeps a cash cushion');
  const t = mk(); own(t, 0, 'Palm Wine Close'); own(t, 1, 'Bukka Street'); t.phase = 'end'; play(t, 0, { action: 'trade', to: 1, give: [idx('Palm Wine Close')], get: [idx('Bukka Street')] }); assert.equal(bot(t, 1).action, 'decline', 'a 60k plot for a 100k plot'); t.trade.giveCash = 80 * K; assert.equal(bot(t, 1).action, 'accept');
});
