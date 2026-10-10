// Sports hall UI (client): the ping pong and tennis match panel, the "play the bot / wait for a player" sit panel, "coming soon" tables, and the hooks into venue.js.
// The server owns every rule and every score. This file draws the view it sends and forwards taps. The timing meter is a picture of SERVER time: the server reads its own
// clock when your move arrives, so the page cannot cheat it (see server/core/games/rally.js and docs/SPORTS_HALL.md). GAME MONEY ONLY.
import { get, post, fmtN, h } from './api.js';
import { meterAt } from '../../server/core/games/rally.js';
import { viewCol, eventText, qualityLabel } from './sports-anim.js';
export { eventText };

const CSS = `
.rl{display:flex;flex-direction:column;gap:8px}.rl-score{display:grid;grid-template-columns:1fr auto auto;gap:2px 10px;align-items:center;background:#10231a;color:#fff;border-radius:12px;padding:8px 12px}
.rl-score .nm{font-weight:800}.rl-score .pt{font:800 24px/1 inherit;min-width:42px;text-align:right}.rl-score .gm{font-size:12px;color:#bfe3cc;min-width:56px;text-align:right}.rl-score .srv{color:#ffd166}
.rl-court{display:flex;flex-direction:column;gap:3px;background:#1d5c8a;border:3px solid #fff;border-radius:10px;padding:6px;max-width:330px}.rl-court.tennis{background:#3f8f6c}
.rl-half{display:grid;grid-template-columns:repeat(3,1fr);gap:3px}.rl-net{height:5px;background:repeating-linear-gradient(90deg,#fff 0 6px,#555 6px 9px);border-radius:3px;margin:1px 0}
.rl-cell{position:relative;min-height:34px;border:2px solid rgba(255,255,255,.55);border-radius:6px;background:rgba(255,255,255,.12);color:#fff;font-size:11px;font-weight:700;padding:0;cursor:pointer}
.rl-cell:disabled{opacity:.45;cursor:default}.rl-cell.on{background:#ffd166;color:#222;border-color:#fff;box-shadow:0 0 0 2px #222}.rl-cell.cv.on{background:#7ee2a8}
.rl-cell i{position:absolute;left:3px;right:3px;bottom:2px;height:4px;border-radius:2px;background:#ff7a59;opacity:var(--h,0)}
.rl-lab{font-size:11px;color:#5b5b4a;display:flex;justify-content:space-between;max-width:330px}
.rl-meter{position:relative;height:22px;border-radius:11px;background:linear-gradient(90deg,#d6402f 0%,#f2b705 50%,#35c46b 85%,#1fa855 100%);border:2px solid #222;max-width:330px}
.rl-meter b{position:absolute;top:-4px;width:6px;height:28px;margin-left:-3px;background:#fff;border:2px solid #222;border-radius:3px}.rl-meter.off{opacity:.4}
.rl-shots{display:flex;flex-wrap:wrap;gap:6px}.rl-shot{border:2px solid #d9d3bd;background:#fff;border-radius:10px;padding:5px 9px;font-weight:700;font-size:13px;cursor:pointer}.rl-shot.on{border-color:#1b3a2b;background:#eaffef}.rl-shot:disabled{opacity:.5}
.rl-shot small{display:block;font-weight:600;color:#5b5b4a;font-size:10px}.rl-log{font-size:12px;color:#444;display:flex;flex-direction:column;gap:2px;max-height:92px;overflow:auto}
.rl-hit{font-size:20px!important;padding:14px!important}.rl-bots{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}.vstrip .vst.soon{opacity:.6;border-style:dashed}
.rl-q{font-weight:800;font-size:12px;min-width:56px}.rl-main{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-start}.rl-courtbox{flex:0 1 250px}.rl-pick{flex:1 1 180px}.rl-court{max-width:250px!important}
.rl-foot{position:sticky;bottom:-12px;background:#fffaf0;padding:6px 0 2px;display:flex;align-items:center;gap:8px;border-top:2px solid #e6dfc8;z-index:2}.rl-foot .row{flex:1;flex-wrap:nowrap}.rl-hit{padding:9px 16px!important;font-size:17px!important;width:auto!important;flex:0 0 140px}.vpanel:has(.rl){max-height:64vh}.rl-cell{min-height:26px!important}.rl-court{padding:4px!important;gap:2px!important}.rl-meter{max-width:none!important;flex:1}.rl-score .pt{font-size:20px!important}`;
const injectCss = () => { if (document.getElementById('sportsCss')) return; const s = document.createElement('style'); s.id = 'sportsCss'; s.textContent = CSS; document.head.append(s); };
const QL = qualityLabel;
const ICON = { pingpong: '🏓', tennis: '🎾' };
const RULES = {
  pingpong: 'Best of 3 games. A game is first to 11, win by 2. The server changes every 2 points. Each turn: say where you will stand for the incoming ball (green half, your side), pick a shot and where to aim (the top half), then tap Hit as the meter reaches the green end.',
  tennis: 'One short set: first to 4 games (win by 2). Points 0, 15, 30, 40, deuce and advantage. First serve, second serve, double fault. Each turn: say where you will stand for the incoming ball (green half), pick a shot and where to aim, then tap Hit as the meter reaches the green end.',
};

export function installSports(Venue) {
  const P = Venue.prototype; injectCss();
  // ---- the match panel
  P.sportsBoardFor = function (kind) { return kind === 'pingpong' || kind === 'tennis' ? () => this.rallyBoard(this.match) : null; };
  P.meterLoop = function () {
    if (this._meterOn) return; this._meterOn = true;
    this.anim.push(() => { const mk = document.getElementById('rlMark'); if (!mk) return; const q = meterAt(this.g.serverNow()); mk.style.left = (q * 100).toFixed(1) + '%'; const l = document.getElementById('rlQ'); if (l) { const t = QL(q); if (l.textContent !== t) l.textContent = t; } });
  };
  P.rallyBoard = function (v) {
    const b = v.board, me = b.you ?? v.youSeat, opp = 1 - me, tennis = v.kind === 'tennis'; const name = (s) => v.players.find(p => p.seat === s)?.name || '?'; const names = [name(0), name(1)];
    const S = (this.rs ||= {}); if (S.mid !== v.id) Object.assign(S, { mid: v.id, shot: null, aim: 1, depth: 1, cAim: 1, cDepth: 1 }); this.meterLoop();
    const serving = b.role === 'serve', returning = b.role === 'return', mine = !!b.mine; const table = b.phase === 'serve' ? b.serves : b.shots; const opts = table.filter(o => b.legal.includes(o.id));
    if (!opts.some(o => o.id === S.shot)) S.shot = opts[0]?.id || null; const cur = opts.find(o => o.id === S.shot); if (cur && cur.depth != null) S.depth = cur.depth;
    const labels = Object.fromEntries([...b.shots, ...b.serves].map(o => [o.id, o.label]));
    // scoreboard
    const sc = b.score; const row = (s) => { const pt = tennis ? sc.points[s] : sc.points[s]; const gm = tennis ? `games ${sc.games[s]}${sc.sets[0] + sc.sets[1] ? ` · sets ${sc.sets[s]}` : ''}` : `games ${sc.games[s]}`;
      return [h('span', { class: `nm ${b.server === s ? 'srv' : ''}` }, `${b.server === s ? (ICON[v.kind] || '•') + ' ' : ''}${s === me ? 'You' : '@' + name(s)}`), h('span', { class: 'pt', 'data-score': s }, String(pt)), h('span', { class: 'gm' }, gm)]; };
    const score = h('div', { class: 'rl-score', id: 'rlScore' }, ...row(me), ...row(opp));
    const first = b.phase === 'serve' && tennis && b.serveNo === 2 ? ' · second serve' : '';
    const status = b.winner != null ? '' : serving ? `Your serve${first}: pick a serve and aim it.` : returning ? `Incoming: ${labels[b.ball?.shot] || 'ball'}${b.ball?.serve ? ' (serve)' : ''}. Where will you stand, and what will you hit back?` : `Waiting for @${name(opp)}…`;
    // court: top half = the other side (aim here), bottom half = mine (cover here)
    const heatA = b.hist[opp].cover, heatB = b.hist[opp].aim; const mx = (a) => Math.max(1, ...a);
    const cell = (half, j, depth) => { const col = viewCol(me, j); const isAim = half === 'opp'; const on = isAim ? (S.aim === col && S.depth === depth) : (S.cAim === col && S.cDepth === depth);
      const dis = !mine || (isAim ? (cur?.depth != null && cur.depth !== depth) : !returning); const heat = (isAim ? heatA : heatB)[depth * 3 + col] / mx(isAim ? heatA : heatB);
      return h('button', { class: `rl-cell ${isAim ? 'aim' : 'cv'} ${on ? 'on' : ''}`, 'data-half': half, 'data-col': col, 'data-depth': depth, disabled: dis, title: isAim ? 'Aim here' : 'Stand here to cover', style: `--h:${heat.toFixed(2)}`, onclick: () => { if (isAim) { S.aim = col; S.depth = depth; } else { S.cAim = col; S.cDepth = depth; } this.renderMatch(v); } }, isAim ? (on ? 'AIM' : '') : (on ? 'COVER' : ''), h('i')); };
    const top = h('div', { class: 'rl-half' }, [1, 0].flatMap(d => [0, 1, 2].map(j => cell('opp', j, d)))); const bot = h('div', { class: 'rl-half' }, [0, 1].flatMap(d => [0, 1, 2].map(j => cell('me', j, d))));
    const court = h('div', { class: `rl-court ${tennis ? 'tennis' : ''}`, id: 'rlCourt' }, top, h('div', { class: 'rl-net' }), bot);
    const lab = h('div', { class: 'rl-lab' }, h('span', {}, `Their side: tap to AIM (orange = where @${name(opp)} tends to stand)`)); const lab2 = h('div', { class: 'rl-lab' }, h('span', {}, returning ? 'Your side: tap where you will STAND (orange = where they like to hit)' : 'Your side'));
    // shots
    const shots = h('div', { class: 'rl-shots', id: 'rlShots' }, opts.map(o => h('button', { class: `rl-shot ${o.id === S.shot ? 'on' : ''}`, 'data-shot': o.id, disabled: !mine, title: o.note, onclick: () => { S.shot = o.id; this.renderMatch(v); } }, o.label, h('small', {}, `${'⚡'.repeat(Math.max(1, Math.round(o.pace * 3)))} · risk ${Math.round(o.risk * 100)}%${o.depth != null ? (o.depth ? ' · deep' : ' · short') : ''}`))));
    const meter = h('div', { class: `rl-meter ${mine ? '' : 'off'}`, id: 'rlMeter' }, h('b', { id: 'rlMark' })); const q = h('span', { class: 'rl-q', id: 'rlQ' }, '');
    const hit = h('button', { class: 'btn big alt rl-hit', id: 'rlHit', disabled: !mine || !S.shot, onclick: () => { const mv = { shot: S.shot, aim: S.aim, depth: S.depth }; if (returning) { mv.coverAim = S.cAim; mv.coverDepth = S.cDepth; } this.move(v, mv); } }, `${ICON[v.kind] || ''} ${serving ? 'Serve' : 'Hit it'}`);
    const log = h('div', { class: 'rl-log', id: 'rlLog' }, b.log.filter(e => ['resolve', 'error', 'fault', 'point'].includes(e.k)).slice(-5).map(e => h('div', {}, eventText(e, me, names, labels))));
    const st = b.stats; const stats = b.winner != null ? h('p', { class: 'mut' }, `Aces ${st[me].aces}-${st[opp].aces} · winners ${st[me].winners}-${st[opp].winners} · errors ${st[me].errors}-${st[opp].errors} · longest rally ${Math.max(st[0].longest, st[1].longest)}`) : '';
    const hint = this.rsHint === false ? '' : h('p', { class: 'mut' }, 'Tap Hit when the white marker is at the green end. The server reads the meter on ITS clock when your tap arrives, so a laggy tap loses a little.');
    return h('div', { class: `rl ${v.kind}` }, score, h('p', { class: 'mut', id: 'rlStatus' }, status), mine ? h('div', { class: 'rl-main' }, h('div', { class: 'rl-courtbox' }, lab, court, lab2), h('div', { class: 'rl-pick' }, shots, h('p', { class: 'mut', id: 'rlNote' }, cur?.note || ''), hint)) : '',
      mine ? h('div', { class: 'rl-foot' }, h('div', { class: 'row', style: 'margin:0' }, meter, q), hit) : '', log, stats);
  };
  // ---- station: coming soon, bot matches
  const origSit = P.sitPanel;
  P.sitPanel = function (st) {
    if (st.soon) { const kids = [h('div', { class: 'row sp' }, h('b', {}, st.label), h('button', { class: 'btn small ghost', onclick: () => this.panel.classList.add('hidden') }, '✕')), h('p', {}, '🔒 Coming soon.'), h('p', { class: 'mut' }, 'This table opens by itself as soon as the game is ready. Check back soon.')]; this.showPanel(kids); return; }
    if (!st.sport) return origSit.call(this, st);
    origSit.call(this, st); if (st.match?.you) return;
    const k = [h('p', { class: 'mut' }, `${ICON[st.sport]} ${RULES[st.sport]}`)]; const busy = !!st.match;
    if (!busy) { const wrap = h('div', { class: 'rl-bots', id: 'rlBots' }, h('span', { class: 'mut' }, 'Loading bots…')); k.push(h('b', {}, 'Practice against a bot'), wrap);
      get('/api/sports/levels').then(r => { wrap.replaceChildren(...r.levels.map(l => h('button', { class: 'btn small alt', 'data-level': l.id, onclick: () => this.sitBot(st, l.id) }, `${l.name} · win ${fmtN(l.prize)}`)), h('p', { class: 'mut' }, r.note)); }).catch(() => { wrap.replaceChildren(h('span', { class: 'mut' }, 'Bots are not available right now.')); }); }
    const first = this.panel.firstChild; if (first?.nextSibling) first.after(...k); else this.panel.append(...k);
  };
  P.sitBot = async function (st, level) { const r = await this.g.ui.guard(() => post('/api/sports/bot', { venueId: this.id, stationId: st.id, level })); if (!r) return; this.focusMatch(r.id, r); this.g.net.nudge(); };
  // ---- the strip: mark coming-soon tables
  const origStrip = P.drawStrip;
  P.drawStrip = function () { origStrip.call(this); for (const st of this.data.stations) { const btn = this.strip.querySelector(`[data-station="${st.id}"]`); if (!btn) continue; if (st.soon) { btn.classList.add('soon'); const sm = btn.querySelector('small') || btn.appendChild(h('small', {})); sm.textContent = 'coming soon'; } else if (st.sport && !st.match) { const sm = btn.querySelector('small'); if (sm) sm.textContent = 'free · bot or player'; } } };
}
