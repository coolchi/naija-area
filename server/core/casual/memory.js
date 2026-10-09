// Memory match ("Pair Am"): 8 pairs on a 4x4 grid. The layout lives ONLY on the server; the client learns a card's symbol when it flips it.
import { mulberry32 } from './merge.js';
export const SYMBOLS = ['danfo', 'keke', 'suya', 'akara', 'ankara', 'naira', 'agbada', 'gele']; // original themed icons drawn by the client (CSS), not copied art
export function layout(seed, pairs = 8) { const rng = mulberry32(seed); const cards = []; for (let i = 0; i < pairs; i++) cards.push(i, i); for (let i = cards.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [cards[i], cards[j]] = [cards[j], cards[i]]; } return cards; }
export const newState = (seed, pairs = 8) => ({ cards: layout(seed, pairs), matched: [], open: null, flips: 0, moves: 0 });
/** flip card i. Returns { symbol, symbolName, result: 'first'|'match'|'miss', other?, done } or { error } */
export function flip(st, i) {
  if (!Number.isInteger(i) || i < 0 || i >= st.cards.length) return { error: 'BAD_CARD' }; if (st.matched.includes(i)) return { error: 'ALREADY_MATCHED' }; if (st.open === i) return { error: 'SAME_CARD' };
  st.flips++; const symbol = st.cards[i];
  if (st.open == null) { st.open = i; return { symbol, symbolName: SYMBOLS[symbol], result: 'first', done: false }; }
  const other = st.open; st.open = null; st.moves++;
  if (st.cards[other] === symbol) { st.matched.push(other, i); return { symbol, symbolName: SYMBOLS[symbol], result: 'match', other, done: st.matched.length === st.cards.length }; }
  return { symbol, symbolName: SYMBOLS[symbol], result: 'miss', other, otherSymbol: st.cards[other], done: false };
}
