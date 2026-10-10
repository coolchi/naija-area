// Boards for the word and board games added in Track C (chess, word duel, Omo Onile, Suwe). Mixed into Venue.prototype (see venue.js). The server owns every rule:
// these functions only draw what the server sends in v.board and forward taps through this.move(v, {...}). GAME MONEY ONLY.
import { h, fmtN } from './api.js';

const GLYPH = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
const FILES = 'abcdefgh';
const nm = (i) => FILES[i % 8] + (8 - Math.floor(i / 8));

export const boards2 = {
  chessBoard(v) {
    const b = v.board; const me = b.you; const flip = b.color === 'b'; const legal = b.legal || []; const sel = this.csel && legal.some(m => m.from === this.csel) ? this.csel : null; if (!sel) this.csel = null;
    const froms = new Set(legal.map(m => m.from)); const tos = sel ? legal.filter(m => m.from === sel).map(m => m.to) : []; const last = b.last;
    const idx = [...Array(64).keys()]; if (flip) idx.reverse();
    const kingSq = b.check && b.mine ? b.board.findIndex(x => x === (b.color === 'w' ? 'K' : 'k')) : -1;
    const go = (from, to, promo) => { this.csel = null; this.cpromo = null; this.move(v, { from, to, promo }); };
    const grid = h('div', { class: 'cgrid' }, idx.map(i => { const x = b.board[i]; const n = nm(i); const light = (Math.floor(i / 8) + (i % 8)) % 2 === 0;
      const cls = `ccell ${light ? 'lt' : 'dk'} ${sel === n ? 'sel' : ''} ${tos.includes(n) ? 'dest' : ''} ${last && (last.from === n || last.to === n) ? 'lastmv' : ''} ${i === kingSq ? 'incheck' : ''} ${b.mine && froms.has(n) ? 'can' : ''}`;
      return h('button', { class: cls, 'data-sq': n, disabled: !b.mine, onclick: () => {
        if (tos.includes(n)) { const opts = legal.filter(m => m.from === sel && m.to === n); if (opts.length > 1 && opts[0].promo) { this.cpromo = { from: sel, to: n }; this.renderMatch(v); } else go(sel, n); }
        else if (froms.has(n)) { this.csel = n; this.cpromo = null; this.renderMatch(v); } else { this.csel = null; this.renderMatch(v); } } },
      x ? h('span', { class: `cp ${x === x.toUpperCase() ? 'cw' : 'cb'}` }, GLYPH[x.toLowerCase()]) : '', i === idx[0] || i === idx[7] ? '' : ''); }));
    const opp = v.players.find(p => p.seat === 1 - v.youSeat)?.name; const tray = (side) => (b.lost[side] || []).map(t => GLYPH[t]).join('');
    const promo = this.cpromo ? h('div', { class: 'row', id: 'chessPromo' }, h('b', {}, 'Promote to:'), ['q', 'r', 'b', 'n'].map(p => h('button', { class: 'btn small alt', 'data-promo': p, onclick: () => go(this.cpromo.from, this.cpromo.to, p) }, GLYPH[p]))) : '';
    const lt = last ? `${last.who === v.youSeat ? 'You' : '@' + opp}: ${last.san}${last.check ? ' (check)' : ''}` : 'White moves first.';
    return h('div', { class: 'chess' }, h('div', { class: 'row sp' }, h('span', { class: 'mut' }, `You are ${b.color === 'w' ? 'White ♙' : 'Black ♟'} vs @${opp}`), b.check && b.mine ? h('span', { class: 'tag amber', id: 'chessCheck' }, 'Check! Save your king') : ''),
      h('div', { class: 'ctray mut' }, `Taken by you: ${tray(b.color === 'w' ? 'b' : 'w') || '–'}`), grid, h('div', { class: 'ctray mut' }, `Taken by @${opp}: ${tray(b.color) || '–'}`), promo, h('p', { class: 'mut', id: 'chessLast' }, lt),
      h('p', { class: 'mut' }, 'Tap a piece, then a highlighted square. Full rules: castling, en passant, promotion, check, checkmate and stalemate.'));
  }
};
