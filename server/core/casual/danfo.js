// Traffic-jam puzzle ("Clear the Go-Slow"): a 6x6 junction packed with stuck vehicles. Slide vehicles along their own lane (vehicles never turn) until the yellow danfo, in the third row,
// can drive out through the gap on the right. One SLIDE = one vehicle moved any distance in one direction = one move. Fewest moves wins. ORIGINAL ruleset code (the sliding-block genre
// is generic); PURE: it runs on the client (to play) and on the server (to check the submitted move list against the level the server chose). Levels live in server/config/danfo-levels.js.
export const SIZE = 6, EXIT_ROW = 2;
/** a vehicle is { r, c, len, dir: 'h' | 'v', kind }. Vehicle 0 is always the danfo: horizontal, length 2, in EXIT_ROW. */
export const cellsOf = (v) => Array.from({ length: v.len }, (_, k) => (v.dir === 'h' ? [v.r, v.c + k] : [v.r + k, v.c]));
export function occupancy(vs) { const o = Array(SIZE * SIZE).fill(-1); vs.forEach((v, i) => { for (const [r, c] of cellsOf(v)) o[r * SIZE + c] = i; }); return o; }
/** structural check of a level: sizes, inside the board, no overlaps, danfo first and on the exit row, not already solved */
export function validate(vs) {
  const errs = []; if (!Array.isArray(vs) || vs.length < 2 || vs.length > 16) return ['vehicle count']; const seen = new Set();
  vs.forEach((v, i) => { if (!(v.len === 2 || v.len === 3) || !(v.dir === 'h' || v.dir === 'v')) errs.push(`v${i} shape`); for (const [r, c] of cellsOf(v)) { if (r < 0 || r >= SIZE || c < 0 || c >= SIZE) errs.push(`v${i} off the board`); else { const k = r * SIZE + c; if (seen.has(k)) errs.push(`v${i} overlaps`); seen.add(k); } } });
  const d = vs[0]; if (!d || d.dir !== 'h' || d.len !== 2 || d.r !== EXIT_ROW) errs.push('danfo must be vehicle 0: horizontal, length 2, on the exit row'); if (d && d.c + d.len >= SIZE) errs.push('already solved'); return errs;
}
export const solved = (vs) => vs[0].c + vs[0].len >= SIZE;
/** how far vehicle i can slide in each direction: { back, fwd } (back = up or left) */
export function room(vs, i, occ = occupancy(vs)) {
  const v = vs[i]; const [dr, dc] = v.dir === 'h' ? [0, 1] : [1, 0]; let back = 0, fwd = 0;
  for (;;) { const r = v.r - dr * (back + 1), c = v.c - dc * (back + 1); if (r < 0 || c < 0 || occ[r * SIZE + c] !== -1) break; back++; }
  for (;;) { const r = v.r + dr * (v.len + fwd), c = v.c + dc * (v.len + fwd); if (r >= SIZE || c >= SIZE || occ[r * SIZE + c] !== -1) break; fwd++; }
  return { back, fwd };
}
/** slide vehicle i by delta (negative = up/left). Returns false and changes nothing if it is blocked, off the board, or delta is 0. */
export function slide(vs, i, delta) {
  if (!Number.isInteger(i) || !Number.isInteger(delta) || delta === 0 || !vs[i]) return false; const m = room(vs, i); if (delta < 0 ? -delta > m.back : delta > m.fwd) return false;
  if (vs[i].dir === 'h') vs[i].c += delta; else vs[i].r += delta; return true;
}
export const clone = (vs) => vs.map(v => ({ ...v }));
/** server check of a move list "0:+2,3:-1": every slide must be legal, the last one must free the danfo, and nothing may be played after the exit is open. { ok, moves } or { ok:false, error } */
export function replay(vs0, log, maxMoves = 200) {
  if (typeof log !== 'string' || !/^\d+:[+-]?\d+(,\d+:[+-]?\d+)*$/.test(log)) return { ok: false, error: 'BAD_LOG' }; const parts = log.split(','); if (parts.length > maxMoves) return { ok: false, error: 'TOO_LONG' };
  const vs = clone(vs0); for (const p of parts) { if (solved(vs)) return { ok: false, error: 'AFTER_EXIT' }; const [i, d] = p.split(':').map(Number); if (!slide(vs, i, d)) return { ok: false, error: 'IMPOSSIBLE_MOVE' }; }
  return solved(vs) ? { ok: true, moves: parts.length } : { ok: false, error: 'NOT_SOLVED' };
}
/** breadth-first search for the fewest slides: { par, path: [[i, delta]...] } or null when unsolvable. Used by the level maker and the tests, never by the browser. */
export function solve(vs0, limit = 400000) {
  const key = (vs) => vs.map(v => (v.dir === 'h' ? v.c : v.r)).join(''); const start = clone(vs0); const seen = new Map([[key(start), null]]); let frontier = [start]; let depth = 0;
  const pos = (v) => (v.dir === 'h' ? v.c : v.r);
  while (frontier.length && seen.size < limit) {
    const next = []; depth++;
    for (const vs of frontier) { const occ = occupancy(vs); const k0 = key(vs);
      for (let i = 0; i < vs.length; i++) { const m = room(vs, i, occ); for (let d = -m.back; d <= m.fwd; d++) { if (!d) continue; const w = clone(vs); if (w[i].dir === 'h') w[i].c += d; else w[i].r += d; const k = key(w); if (seen.has(k)) continue; seen.set(k, { from: k0, i, d });
        if (solved(w)) { const path = []; let cur = k; while (seen.get(cur)) { const s = seen.get(cur); path.push([s.i, s.d]); cur = s.from; } return { par: depth, path: path.reverse() }; } next.push(w); } } }
    frontier = next; void pos;
  }
  return null;
}
