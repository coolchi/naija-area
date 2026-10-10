// Boards for the word and board games added in Track C (chess, word duel, Omo Onile, Suwe). Mixed into Venue.prototype (see venue.js). The server owns every rule:
// these functions only draw what the server sends in v.board and forward taps through this.move(v, {...}). GAME MONEY ONLY.
import { h, post, fmtN } from './api.js';
import { suweArena } from './suwe-ui.js';
import { SQUARES, GROUPS } from '../../server/config/landlord-board.js';

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
  },

  wordDuelBoard(v) {
    const b = v.board; const me = v.youSeat; const opp = v.players.find(p => p.seat === 1 - me)?.name; const key = `${v.id}:${b.round}`; if (this.wdKey !== key) { this.wdKey = key; this.wdWord = []; this.wdMsg = ''; this.wdUsed = []; }
    const letters = b.letters || []; const val = (c) => b.values[c]; const cur = this.wdWord.map(i => letters[i]).join('');
    const redraw = () => this.renderMatch(v);
    const tiles = h('div', { class: 'wdtiles' }, letters.map((c, i) => h('button', { class: `wdt ${this.wdWord.includes(i) ? 'used' : ''}`, 'data-i': i, 'data-l': c, disabled: !b.mine || this.wdWord.includes(i), onclick: () => { this.wdWord.push(i); this.wdMsg = ''; redraw(); } }, c.toUpperCase(), h('small', {}, val(c)))));
    const word = h('div', { class: 'wdword', id: 'wdWord' }, cur ? cur.toUpperCase() : h('span', { class: 'mut' }, 'Tap letters to build a word'));
    const submit = async () => { const r = await this.g.ui.guard(() => post('/api/game/move', { matchId: v.id, word: cur })); if (r) { this.wdWord = []; this.renderMatch(r); } else { this.wdMsg = 'Not accepted. Try another word.'; redraw(); } };
    const hist = b.results.map((r, i) => h('div', { class: 'wdres' }, h('b', {}, `Round ${i + 1}`), h('span', {}, ` ${r.letters.toUpperCase()}: you ${r.words[me] ? r.words[me].toUpperCase() : '(pass)'} ${r.scores[me]} · @${opp} ${r.words[1 - me] ? r.words[1 - me].toUpperCase() : '(pass)'} ${r.scores[1 - me]}`), h('small', { class: 'mut' }, ` · best possible: ${r.best.toUpperCase()} ${r.bestScore}`)));
    const total = h('div', { class: 'row sp' }, h('b', {}, `You ${b.total[me]} - ${b.total[1 - me]} @${opp}`), h('span', { class: 'mut' }, `Round ${b.round} of ${b.rounds}`));
    const play = b.mine ? [h('p', { class: 'mut' }, `Make ONE word of ${b.minLen} to ${b.maxLen} letters from these 7 letters. Your opponent has the same letters. Small numbers are letter points; longer words get a bonus.`), tiles, word,
      h('div', { class: 'row' }, h('button', { class: 'btn small', id: 'wdBack', onclick: () => { this.wdWord.pop(); redraw(); } }, '⌫'), h('button', { class: 'btn small ghost', onclick: () => { this.wdWord = []; redraw(); } }, 'Clear'), h('button', { class: 'btn small alt', id: 'wdSubmit', disabled: cur.length < b.minLen, onclick: submit }, 'Play this word'), h('button', { class: 'btn small ghost', id: 'wdPass', onclick: () => this.move(v, { pass: true }) }, 'Pass (0)')), this.wdMsg ? h('p', { class: 'tag amber' }, this.wdMsg) : '']
      : b.letters === null ? [] : [h('p', { class: 'mut' }, b.played ? `You played ${b.yourWord ? b.yourWord.toUpperCase() : 'a pass'}. Waiting for @${opp}…` : 'Waiting…')];
    return h('div', { class: 'wordduel' }, total, ...play, ...hist);
  },

  landlordBoard(v) {
    const b = v.board; const me = v.youSeat; const SEATC = ['#d6402f', '#2e7dd1', '#2e9b5e', '#e0a020']; const nameOf = (s) => (s === me ? 'You' : '@' + (v.players.find(p => p.seat === s)?.name || '?'));
    const txt = (t) => t.replace(/Player (\d)/g, (_, d) => nameOf(Number(d) - 1)); const money = (n) => '₦' + fmtN(n);
    const cell = (i) => (i <= 9 ? [0, i] : i <= 17 ? [i - 9, 9] : i <= 27 ? [9, 9 - (i - 18)] : [9 - (i - 27), 0]);
    const sel = this.lsel ?? null; const redraw = () => this.renderMatch(v); const act = (a, extra = {}) => this.move(v, { action: a, ...extra });
    const sqEls = SQUARES.map((s, i) => { const [r, c] = cell(i); const o = b.squares[i]; const g = s.group ? GROUPS[s.group] : null; const toks = b.players.filter(p => !p.out && p.pos === i);
      const short = s.t === 'luck' ? '?' : s.t === 'start' ? 'PAY DAY' : s.t === 'goslow' ? 'GO-SLOW' : s.t === 'rest' ? 'REST' : s.t === 'checkpoint' ? 'CHECK' : s.t === 'levy' ? 'LEVY' : s.name.split(' ').slice(0, 2).join(' ');
      return h('button', { class: `lsq ${s.t} ${sel === i ? 'sel' : ''} ${b.canBuild.includes(i) ? 'canb' : ''}`, 'data-sq': i, style: `grid-row:${r + 1};grid-column:${c + 1}`, onclick: () => { this.lsel = sel === i ? null : i; redraw(); } },
        g ? h('i', { class: 'lband', style: `background:${g.color}` }) : '', h('span', { class: 'lname' }, short), s.price ? h('small', {}, fmtN(s.price / 1000) + 'k') : '',
        o.o >= 0 ? h('b', { class: 'lown', style: `background:${SEATC[o.o]}` }, o.h ? (o.h === 5 ? '▲' : String(o.h)) : '') : '', toks.length ? h('span', { class: 'ltoks' }, toks.map(p => h('em', { class: 'ltok2', 'data-seat': p.seat, style: `background:${SEATC[p.seat]}` }, String(p.seat + 1)))) : ''); });
    const dice = b.dice ? h('div', { class: 'ldice', id: 'lDice' }, b.dice.map(d => ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][d]).join(' ')) : h('div', { class: 'ldice' }, '🎲');
    const turnName = nameOf(b.turn); const btn = (label, a, cls = 'alt', extra = {}) => h('button', { class: `btn small ${cls}`, id: `l_${a}`, onclick: () => act(a, extra) }, label);
    const A = b.actions; const bar = h('div', { class: 'lbar' });
    if (A.includes('roll')) bar.append(btn('🎲 Roll', 'roll')); if (A.includes('payfine')) bar.append(btn(`Pay ${money(b.fine)} fine`, 'payfine', '')); if (A.includes('usepass')) bar.append(btn('Use free pass', 'usepass', ''));
    if (A.includes('buy')) bar.append(btn(`Buy ${SQUARES[b.buy.sq].name} (${money(b.buy.price)})`, 'buy')); if (A.includes('skip')) bar.append(btn('Skip', 'skip', 'ghost'));
    if (A.includes('end')) bar.append(btn('End turn', 'end')); if (A.includes('trade')) bar.append(h('button', { class: 'btn small ghost', id: 'l_trade', onclick: () => { this.ltrade = this.ltrade ? null : { to: v.players.find(p => p.seat !== me && !b.players[p.seat].out)?.seat, give: [], get: [], giveCash: 0, getCash: 0 }; redraw(); } }, 'Offer a trade'));
    if (A.includes('accept')) bar.append(btn('Accept offer', 'accept'), btn('Decline', 'decline', 'ghost'));
    if (!b.mine) bar.append(h('span', { class: 'mut' }, b.phase === 'trade' && b.turn !== me ? `Waiting for ${turnName} to answer the offer…` : `Waiting for ${turnName}…`));
    const tr = b.trade ? h('div', { class: 'ltrade' }, h('b', {}, b.trade.from === me ? 'Your offer:' : `${nameOf(b.trade.from)} offers you:`), h('span', {}, ` ${[...(b.trade.from === me ? b.trade.give : b.trade.give).map(i => SQUARES[i].name), ...(b.trade.giveCash ? [money(b.trade.giveCash)] : [])].join(', ') || 'nothing'} for ${[...b.trade.get.map(i => SQUARES[i].name), ...(b.trade.getCash ? [money(b.trade.getCash)] : [])].join(', ') || 'nothing'}`)) : '';
    let form = ''; if (this.ltrade && A.includes('trade')) { const T = this.ltrade; const mine = SQUARES.map((_, i) => i).filter(i => b.squares[i].o === me); const theirs = SQUARES.map((_, i) => i).filter(i => b.squares[i].o === T.to);
      const chk = (list, key) => h('div', { class: 'row', style: 'flex-wrap:wrap' }, list.length ? list.map(i => h('button', { class: `chip ${T[key].includes(i) ? 'on' : ''}`, 'data-tsq': i, onclick: () => { T[key] = T[key].includes(i) ? T[key].filter(x => x !== i) : [...T[key], i]; redraw(); } }, SQUARES[i].name)) : h('span', { class: 'mut' }, 'none'));
      form = h('div', { class: 'ltradeform' }, h('b', {}, 'Offer to: '), v.players.filter(p => p.seat !== me && !b.players[p.seat].out).map(p => h('button', { class: `chip ${T.to === p.seat ? 'on' : ''}`, onclick: () => { T.to = p.seat; T.get = []; redraw(); } }, '@' + p.name)), h('p', { class: 'mut' }, 'You give:'), chk(mine, 'give'), h('label', {}, 'Cash you add ₦ ', h('input', { type: 'number', min: 0, step: 10000, value: T.giveCash, onchange: (e) => { T.giveCash = Number(e.target.value) || 0; } })), h('p', { class: 'mut' }, 'You get:'), chk(theirs, 'get'), h('label', {}, 'Cash you ask ₦ ', h('input', { type: 'number', min: 0, step: 10000, value: T.getCash, onchange: (e) => { T.getCash = Number(e.target.value) || 0; } })),
        h('button', { class: 'btn small alt', id: 'l_sendtrade', onclick: () => { const m = { to: T.to, give: T.give, get: T.get, giveCash: T.giveCash, getCash: T.getCash }; this.ltrade = null; act('trade', m); } }, 'Send offer')); }
    let det = ''; if (sel != null) { const s = SQUARES[sel], o = b.squares[sel]; const g = s.group ? GROUPS[s.group] : null; det = h('div', { class: 'ldet' }, h('b', {}, s.name), g ? h('span', { class: 'mut' }, ` · ${g.name} · build ${money(g.build)} each`) : '', s.price ? h('span', { class: 'mut' }, ` · price ${money(s.price)}`) : '', o.o >= 0 ? h('span', { class: 'tag' }, `${nameOf(o.o)}${o.h ? ` · ${o.h === 5 ? 'tower' : o.h + ' building(s)'}` : ''} · rent ${money(o.rent)}${s.t === 'utility' ? ' (x dice shown at 7)' : ''}`) : s.price ? h('span', { class: 'tag' }, 'Unowned') : '',
      b.canBuild.includes(sel) ? h('button', { class: 'btn small alt', id: 'l_build', onclick: () => act('build', { sq: sel }) }, 'Build here') : '', b.canSell.includes(sel) ? h('button', { class: 'btn small ghost', onclick: () => act('sell', { sq: sel }) }, 'Sell a building') : ''); }
    const center = h('div', { class: 'lcenter' }, h('b', {}, 'Landlord Lagos'), h('small', { class: 'mut' }, `Round ${b.round} of ${b.maxRounds}`), dice, h('small', { class: 'mut' }, b.mine ? 'Your turn' : `${turnName}'s turn`));
    const board = h('div', { class: 'lboard' }, ...sqEls, center);
    const roster = h('div', { class: 'lroster' }, b.players.map(p => h('div', { class: `lpl ${p.seat === b.turn ? 'now' : ''} ${p.out ? 'out' : ''}`, 'data-seat': p.seat }, h('em', { class: 'ltok2', style: `background:${SEATC[p.seat]}` }, String(p.seat + 1)), h('b', {}, nameOf(p.seat)), h('span', { class: 'mut' }, ` ${p.out ? 'bankrupt' : money(p.cash)} · ${p.props} props${p.slow ? ' · in Go-Slow' : ''}${p.pass ? ' · free pass' : ''}`))));
    const log = h('div', { class: 'llog', id: 'lLog' }, b.log.slice(-6).map(l => h('div', {}, txt(l.text))));
    return h('div', { class: 'landlord' }, board, bar, tr, form, det, roster, log, h('p', { class: 'mut' }, 'Play money only inside the match. The table stake is the only real game money, and the winner takes the pot. Working title; Monopoly-style, not Monopoly.'));
  },

  holdRender(v) { // the Suwe rhythm screen must not be rebuilt by the 3-second poll while somebody is mid-hop
    const L = this.suweLive; return !!(L && v.kind === 'suwe' && v.status === 'active' && v.board?.mine && L.key === `${v.id}:${v.board.turnNo}` && L.busy);
  },
  suweBoard(v) {
    const b = v.board; const me = v.youSeat; const opp = v.players.find(p => p.seat === 1 - me)?.name; const key = `${v.id}:${b.turnNo}`; this.suweLive?.arena?.destroy?.();
    const head = h('div', { class: 'row sp' }, h('b', {}, `Houses: you ${b.won[me]} - ${b.won[1 - me]} @${opp}`), h('span', { class: 'mut' }, `Turn ${b.turnNo + 1} of ${b.maxTurns} · first to ${b.housesToEnd} houses on the street ends it`));
    const l = b.last; const lt = l ? (l.kind === 'house' ? `${l.who === me ? 'You' : '@' + opp}: ${l.message}` : `${l.who === me ? 'You' : '@' + opp} on stage ${l.stage}: ${l.ok ? `clean! ${l.perfect} perfect hops` : l.message}`) : '';
    const prog = h('p', { class: 'mut' }, `You: ${b.phase === 'house' ? 'house throw next' : `stage ${b.stage} of ${b.stages}`} · lap ${b.lap}. Stages cleared: you ${b.progress[me]}, @${opp} ${b.progress[1 - me]}.`);
    if (b.mine && b.plan) {
      const house = b.phase === 'house'; const arena = suweArena({ labels: b.labels, houses: b.houses, you: me, plan: house ? { aimTol: b.plan.tol, aimPeriodMs: b.plan.aimPeriodMs } : b.plan, house: house ? { tol: b.plan.tol, aimPeriodMs: b.plan.aimPeriodMs } : null, onDone: (inp) => { this.suweLive = { key, busy: false, arena }; this.move(v, inp); } });
      this.suweLive = { key, busy: true, arena }; return h('div', { class: 'suweboard' }, head, prog, lt ? h('p', { class: 'mut', id: 'suweLast' }, lt) : '', arena.el, h('p', { class: 'mut' }, 'Rules vary by area: this is one common version. Yoruba text is placeholder for local review. Game money only.'));
    }
    this.suweLive = null; const st = suweArena({ labels: b.labels, houses: b.houses, you: me, plan: { events: [{ box: 0, at: 0, kind: 'hop' }], stoneBox: -1, aimTol: 0.2, aimPeriodMs: 1400, beatMs: 600, leadMs: 2400, windowMs: 150 }, static: true });
    return h('div', { class: 'suweboard' }, head, prog, lt ? h('p', { class: 'mut', id: 'suweLast' }, lt) : '', st.el, h('p', { class: 'mut' }, `Waiting for @${v.turn} to hop…`));
  }
};
