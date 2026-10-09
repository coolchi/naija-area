// Whot (basic house rules), two players. Pure functions; randomness is injected so tests are deterministic.
//   Deck: 54 cards (circle, triangle: 1-5,7,8,10-14; cross, square: 1,2,3,5,7,10,11,13,14; star: 1-5,7,8; five Whot (20)).
//   Deal 5 each; the first up-card is never a special card. A card is playable if its shape matches the current shape, or its number matches the
//   top card, or it is a Whot (then you choose the new shape). Specials (2-player): 1 Hold on, 8 Suspension (opponent misses a turn: you play again),
//   2 Pick two, 5 Pick three (opponent draws, you play again), 14 General market (opponent draws one, you play again), 20 Whot (choose a shape).
//   Pick cards cannot be defended in this basic version. Can't play (or don't want to)? Draw one card and your turn ends.
//   First to empty their hand wins (even with a special). If the market runs out the discard pile (except the top) is reshuffled.
export const SHAPES = ['circle', 'triangle', 'cross', 'square', 'star'];
const NUMS = { circle: [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14], triangle: [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14], cross: [1, 2, 3, 5, 7, 10, 11, 13, 14], square: [1, 2, 3, 5, 7, 10, 11, 13, 14], star: [1, 2, 3, 4, 5, 7, 8] };
export const SPECIAL = { 1: 'hold', 8: 'suspend', 2: 'pick2', 5: 'pick3', 14: 'market', 20: 'whot' };
export const HAND = 5, MAX_MOVES = 300;
export function makeDeck() { const d = []; for (const s of SHAPES) for (const n of NUMS[s]) d.push({ id: `${s}${n}`, s, n }); for (let i = 1; i <= 5; i++) d.push({ id: `whot${i}`, s: 'whot', n: 20 }); return d; }
export function shuffle(a, rng = Math.random) { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
export function newGame(rng = Math.random, deck = shuffle(makeDeck(), rng)) {
  const market = deck.slice(); const hands = { a: [], b: [] };
  for (let i = 0; i < HAND; i++) { hands.a.push(market.pop()); hands.b.push(market.pop()); }
  const skipped = []; let top = market.pop(); while (SPECIAL[top.n]) { skipped.push(top); top = market.pop(); } market.unshift(...skipped);
  return { market, pile: [top], hands, turn: rng() < 0.5 ? 'a' : 'b', required: null, moves: 0, winner: null, last: null };
}
export const other = (p) => (p === 'a' ? 'b' : 'a');
export const currentShape = (st) => st.required || st.pile[st.pile.length - 1].s;
export const canPlay = (st, card) => card.s === 'whot' || card.s === currentShape(st) || card.n === st.pile[st.pile.length - 1].n;
export const playable = (st, who) => st.hands[who].filter(c => canPlay(st, c)).map(c => c.id);
function drawN(st, who, n, rng) {
  let got = 0; for (let i = 0; i < n; i++) {
    if (!st.market.length && st.pile.length > 1) { const top = st.pile.pop(); st.market = shuffle(st.pile, rng); st.pile = [top]; }
    if (!st.market.length) break; st.hands[who].push(st.market.pop()); got++;
  } return got;
}
export function play(st, who, cardId, shape, rng = Math.random) {
  if (st.winner) return { error: 'GAME_OVER' }; if (st.turn !== who) return { error: 'NOT_YOUR_TURN' };
  const card = st.hands[who].find(c => c.id === cardId); if (!card) return { error: 'NO_SUCH_CARD' }; if (!canPlay(st, card)) return { error: 'CANNOT_PLAY', message: 'That card does not match the shape or number.' };
  if (card.s === 'whot' && !SHAPES.includes(shape)) return { error: 'CHOOSE_SHAPE', message: 'Choose a shape for your Whot.' };
  st.hands[who] = st.hands[who].filter(c => c.id !== cardId); st.pile.push(card); st.required = card.s === 'whot' ? shape : null; st.moves++;
  const opp = other(who); const eff = SPECIAL[card.n]; const info = { who, card: card.id, effect: eff || null };
  if (st.hands[who].length === 0) { st.winner = who; st.last = info; return { ok: true, info, won: who }; }
  if (eff === 'pick2') info.drew = drawN(st, opp, 2, rng); else if (eff === 'pick3') info.drew = drawN(st, opp, 3, rng); else if (eff === 'market') info.drew = drawN(st, opp, 1, rng);
  st.turn = eff === 'hold' || eff === 'suspend' || eff === 'pick2' || eff === 'pick3' || eff === 'market' ? who : opp;
  st.last = info; if (st.moves >= MAX_MOVES) { st.winner = st.hands.a.length === st.hands.b.length ? 'draw' : st.hands.a.length < st.hands.b.length ? 'a' : 'b'; }
  return { ok: true, info, won: st.winner };
}
export function draw(st, who, rng = Math.random) {
  if (st.winner) return { error: 'GAME_OVER' }; if (st.turn !== who) return { error: 'NOT_YOUR_TURN' };
  const n = drawN(st, who, 1, rng); st.turn = other(who); st.moves++; st.last = { who, drew: n, effect: 'draw' };
  if (st.moves >= MAX_MOVES) st.winner = st.hands.a.length === st.hands.b.length ? 'draw' : st.hands.a.length < st.hands.b.length ? 'a' : 'b';
  return { ok: true, info: st.last, won: st.winner };
}
export function view(st, who) {
  const top = st.pile[st.pile.length - 1]; const me = st.hands[who];
  return { game: 'whot', top, shape: currentShape(st), hand: me, playable: st.turn === who && !st.winner ? playable(st, who) : [], oppCount: st.hands[other(who)].length, market: st.market.length, mine: st.turn === who, last: st.last, moves: st.moves };
}
