// Venue rooms (Mama Put, viewing centre, Ludo and Whot joint, car showroom): a small 3D room with tappable stations + a game panel for Whot and Ayo.
// GAME MONEY ONLY. The server owns every rule; this file only draws what the server sends and forwards taps.
import * as THREE from 'three';
import { get, post, fmtN, h, $ } from './api.js';
import { makeAvatar, makePlayerCar, makeNameSprite } from './entities.js';
import { venueShell, decorate, stationModel } from './rooms.js';
import * as PR from './props.js';
import { stateLabel, scoreText, kickoffText, sourceLine, groupByLeague } from './scores-view.js';

const SHAPE = { circle: ['●', '#d6402f'], triangle: ['▲', '#2e7dd1'], cross: ['✚', '#2e9b5e'], square: ['■', '#8a5ad1'], star: ['★', '#e0a020'], whot: ['W', '#222'] };
const hash = (s) => { let x = 7; for (const c of String(s)) x = (x * 31 + c.charCodeAt(0)) >>> 0; return x; };
const ICON = { dance: '💃', dj: '🎧', bar: '🥤', songs: '🎵', vip: '👑', style: '✂️', basin: '🚿', eat: '🍲', game: '🎲', board: '🏆', poster: '📜', tv: '📺', ticket: '🎟️', scores: '📊', seat: '🪑', car: '🚗', check: '🔍', service: '🔧' };

const GAME_NAME = { whot: 'Whot', ludo: 'Ludo', dominoes: 'Dominoes', draughts: 'Draughts', ayo: 'Ayo' };
export class Venue {
  constructor(game) { this.g = game; this.el = $('#venue'); this.open = false; this.shotId = null; }
  async show(venueId) {
    const g = this.g; const data = await g.ui.guard(() => post('/api/venue/enter', { venueId, pos: g.pos() })); if (!data) return false;
    this.data = data; this.id = venueId; this.open = true; g.busy = true; g.ctrl.frozen = true; this.matchId = null; this.match = null; this.dismissed = this.dismissed || new Set();
    this.el.classList.remove('hidden'); this.el.replaceChildren(); this.build(); this.chrome(); this.loop(); this.poll(); return true;
  }
  build() {
    const d = this.data; const R = d.room; this.canvas = h('canvas'); this.el.append(this.canvas);
    this.r = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true }); this.r.setPixelRatio(Math.min(devicePixelRatio, 2)); this.scene = new THREE.Scene(); this.scene.background = new THREE.Color(0x1d2b25);
    this.cam = new THREE.PerspectiveCamera(42, 1, 0.1, 100); this.yaw = Math.PI / 5; this.pitch = 0.82; this.dist = Math.max(15, Math.round(Math.max(d.room?.w || 9, d.room?.d || 9) * 1.15));
    this.hemi = new THREE.HemisphereLight(0xffffff, 0x887766, 1.0); const sun = this.sun = new THREE.DirectionalLight(0xfff0d0, 1.0); sun.position.set(5, 10, 6); this.scene.add(this.hemi, sun);
    this.anim = []; this.t0 = performance.now(); this.lights = { hemi: this.hemi, sun: this.sun }; venueShell(this.scene, R, d.room, d.sign, this.anim, this.lights); const decor = new THREE.Group(); this.scene.add(decor); decorate(decor, d.room?.decor, R, this.anim);
    this.stations = new THREE.Group(); this.scene.add(this.stations); this.people = new THREE.Group(); this.scene.add(this.people); this.meshes = {};
    for (const st of d.stations) this.addStation(st);
    this.bind(); this.resize(); this.onResize = () => this.resize(); addEventListener('resize', this.onResize);
  }
  addStation(st) {
    const grp = new THREE.Group(); const col = new THREE.Color(st.color || '#888'); const mat = (c) => new THREE.MeshLambertMaterial({ color: c });
    const box = (w, hh, dd, c, y) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, hh, dd), mat(c)); m.position.y = y ?? hh / 2; grp.add(m); return m; };
    if (stationModel(st, grp, this.anim)) { /* club / salon pieces live in rooms.js */ }
    else if (st.type === 'eat') { grp.add(PR.foodCounter(3.4, { c: col.getHex() })); }
    else if (st.type === 'game') { grp.add(PR.gameTable(0.95, { c: col.getHex() })); if (st.game === 'ludo') { box(1.5, 0.1, 1.5, 0xfaf5e6, 0.91); [0xd6402f, 0x2e9b5e, 0xe0a020, 0x2e7dd1].forEach((c, k) => { const q = box(0.6, 0.05, 0.6, c, 0.97); q.position.x = (k % 2 ? 1 : -1) * 0.45; q.position.z = (k < 2 ? -1 : 1) * 0.45; }); } else for (let i = 0; i < 4; i++) { const c = box(0.34, 0.03, 0.5, [0xd6402f, 0x2e7dd1, 0xe0a020, 0x2e9b5e][i], 0.88); c.position.x = -0.5 + i * 0.33; c.rotation.y = 0.2 * i - 0.3; } for (const sx of [-1.25, 1.25]) { const s = PR.stool({ c: 0x8a3f28 }); s.position.set(sx, 0, 0); grp.add(s); } }
    else if (st.type === 'board') { box(2.4, 1.5, 0.12, col, 1.6).position.z = -0.1; box(2.2, 1.3, 0.14, 0x0f3b27, 1.6).position.z = -0.08; }
    else if (st.type === 'poster') { box(0.1, 1.4, 1.2, col, 1.6); }
    else if (st.type === 'tv') { const u = PR.tvUnit(3.0); grp.add(u); const t = PR.tv(2.7, { wall: true }); t.position.set(0, 1.0, -0.3); grp.add(t); }
    else if (st.type === 'check') { const c = makePlayerCar(st.color || '#3a7ca5'); c.scale.setScalar(0.34); c.position.y = 0.55; grp.add(c); box(2.0, 0.5, 1.1, 0x555a60, 0.25); box(0.2, 0.4, 0.2, 0xe0a020, 0.7).position.x = 1.15; }
    else if (st.type === 'service') { grp.add(PR.workbench(2.0)); const tc = PR.toolCart(); tc.position.set(1.4, 0, 0.1); grp.add(tc); for (let i = 0; i < 3; i++) box(0.25, 0.25, 0.25, [0xd6402f, 0x2e7dd1, 0xe0a020][i], 1.1).position.x = -0.6 + i * 0.6; }
    else if (st.type === 'car') { const c = makePlayerCar(st.color || '#888'); c.scale.setScalar(0.38); c.rotation.y = Math.PI / 6; grp.add(c); box(1.8, 0.06, 1.0, 0xdddddd, 0.03); }
    const sp = makeNameSprite(`${ICON[st.type] || ''} ${st.label}`.slice(0, 26), '#fff3c4'); sp.scale.set(2.8, 0.7, 1); sp.position.y = st.type === 'dj' ? 2.3 : st.type === 'songs' ? 3.3 : st.type === 'dance' ? 1.2 : st.type === 'style' ? 2.5 : st.type === 'car' ? 1.8 : st.type === 'tv' ? 3.0 : st.type === 'board' ? 2.8 : 2.1; grp.add(sp);
    grp.position.set(st.x, 0, st.z); if (st.type === 'poster') grp.rotation.y = 0; grp.traverse(o => { o.userData.stationId = st.id; }); this.stations.add(grp); this.meshes[st.id] = grp;
  }
  people_refresh() {
    this.people.clear(); const d = this.data; const names = new Set(); const put = (u, color, x, z) => { if (names.has(u)) return; names.add(u); const a = makeAvatar(color || '#2e9b5e'); a.scale.setScalar(0.55); a.position.set(x, 0, z); const t = makeNameSprite('@' + u, '#ffffff'); t.scale.set(1.6, 0.4, 1); t.position.y = 2.2; a.add(t); this.people.add(a); };
    for (const st of d.stations) if (st.type === 'game' && st.match) { const m = st.match; m.players.forEach((u, k) => put(u, null, st.x + [-1.25, 1.25, -0.5, 0.5][k], st.z + (k < 2 ? 0.5 : 1.5))); }
    for (const o of d.occupants) { const hx = hash(o.username); put(o.username, o.color, -3 + (hx % 7) * 1.0, d.room.d / 2 - 1.1 - ((hx >> 4) % 2) * 0.8); }
  }
  chrome() {
    const d = this.data; this.strip = h('div', { class: 'vstrip' }); this.panel = h('div', { class: 'vpanel hidden' });
    const head = h('div', { class: 'ihead' }, h('div', {}, h('h3', {}, d.name), h('div', { style: 'font-size:13px' }, `${d.blurb} · open ${d.hours[0]}:00 to ${d.hours[1]}:00`), h('div', { class: 'tag amber', style: 'display:inline-block;margin-top:4px' }, '🎲 Game money only · 18+')), h('div', { class: 'row' }, h('button', { class: 'btn small red', id: 'venueLeave', onclick: () => this.leave() }, 'Leave')));
    this.el.append(head, this.strip, this.panel); this.drawStrip(); this.people_refresh();
  }
  drawStrip() {
    const d = this.data; this.strip.replaceChildren(...d.stations.map(st => { const m = st.match; const sub = st.type === 'game' ? (m ? (m.status === 'waiting' ? `waiting ${m.players.length}/${m.max}: @${m.host}${m.stake ? ' · ₦' + m.stake : ''}` : m.players.join(' v ')) : 'free table') : st.type === 'car' ? fmtN(st.price || 0) + ' (est.)' : '';
      return h('button', { class: `vst ${m?.you ? 'mine' : ''}`, 'data-station': st.id, onclick: () => this.pick(st.id) }, `${ICON[st.type] || '•'} ${st.label}`, sub ? h('small', {}, sub) : ''); }));
  }
  price(model) { return this.g.cfg.cars?.[model]?.price ?? this.catalog?.find(c => c.id === model)?.price ?? 0; }
  async pick(id) { await this.refreshVenue(); const st = this.data.stations.find(x => x.id === id); if (st) this.station(st); }
  async station(st) {
    const ui = this.g.ui;
    if (st.type === 'eat') { const body = h('div'); ui.openSheet(st.label, body); ui.shopBlock(body, st.shopId); }
    else if (st.type === 'poster') ui.openSheet(st.label, [h('p', {}, st.text), h('p', { class: 'mut' }, 'Reports, mutes and blocks work here too: tap a name in the chat.')]);
    else if (st.type === 'tv') { const r = await ui.guard(() => post('/api/venue/act', { venueId: this.id, stationId: st.id })); if (r) { ui.toast(r.text); this.g.net.nudge(); } }
    else if (st.type === 'board') this.board();
    else if (st.type === 'car') this.carSheet(st);
    else if (st.type === 'check' || st.type === 'service') this.mechanicSheet(st);
    else if (st.type === 'casual') ui.playCasual(st.game);
    else if (['dance', 'dj', 'bar', 'songs', 'vip', 'basin'].includes(st.type)) this.leisureAct(st);
    else if (st.type === 'style') this.salonSheet(st);
    else if (['ticket', 'seat'].includes(st.type)) { const r = await ui.guard(() => post('/api/venue/act', { venueId: this.id, stationId: st.id, idem: crypto.randomUUID?.() })); if (r) { ui.toast(r.text, r.charged ? 'money' : undefined); this.g.refreshMe?.(); this.g.net.nudge(); } }
    else if (st.type === 'scores') this.scoresSheet(st);
    else if (st.type === 'game') this.sitPanel(st);
  }
  async scoresSheet(st) {
    const ui = this.g.ui; const draw = async () => { const v = await ui.guard(() => get('/api/stadium/scores')); if (!v) return; const now = v.checkedAt; const kids = [h('div', { class: 'tag amber' }, 'TEST · plain names, no logos · not for publishing'), h('p', { class: 'mut', id: 'scoresSource' }, sourceLine(v, now))];
      for (const g of groupByLeague(v.fixtures)) kids.push(h('b', {}, g.league), h('div', { class: 'list' }, g.fixtures.map(f => h('div', { class: `fx ${f.state}`, 'data-state': f.state }, h('span', {}, `${f.home}`), h('b', {}, scoreText(f)), h('span', {}, `${f.away}`), h('small', { class: 'mut' }, f.state === 'upcoming' ? kickoffText(f) : stateLabel(f))))));
      kids.push(h('p', { class: 'mut' }, v.hasTicket ? '🎟️ You have today’s ticket: take a seat in the stands.' : '🎟️ Buy a ticket at the booth, then take a seat.'), h('p', { class: 'mut' }, `Everyone reads the same saved copy (the server asked the feed ${v.apiCallsToday} of ${v.apiCallsCap} times today).`), h('button', { class: 'btn small', id: 'scoresRefresh', onclick: () => draw() }, 'Reload saved copy'));
      ui.openSheet(st.label, kids); }; await draw();
  }
  async board(kind = 'all') {
    const ui = this.g.ui; const d = await ui.guard(() => get('/api/scoreboard' + (kind === 'all' ? '' : `?kind=${kind}`))); if (!d) return; const left = Math.max(0, d.endsAt - this.g.serverNow());
    const tabs = h('div', { class: 'chips' }, ['all', 'whot', 'ludo', 'dominoes', 'draughts', 'ayo'].map(k => h('button', { class: `chip ${k === kind ? 'on' : ''}`, onclick: () => this.board(k) }, k === 'all' ? 'All games' : GAME_NAME[k])));
    ui.openSheet('Weekly scoreboard', [tabs, d.rows.length ? h('div', { class: 'list' }, d.rows.map(r => h('div', {}, h('span', {}, `${r.rank}. @${r.username}`), h('span', { class: 'mut' }, `${r.wins}W ${r.draws}D ${r.losses}L · `), h('b', {}, `${r.points} pts`)))) : h('p', { class: 'mut' }, 'Nobody has played this week yet. Be the first!'), h('p', { class: 'mut' }, `${d.scoring} Resets in ${Math.floor(left / 86400000)}d ${Math.floor(left % 86400000 / 3600000)}h.`)]);
  }
  async leisureAct(st) {
    const ui = this.g.ui; const r = await ui.guard(() => post('/api/venue/act', { venueId: this.id, stationId: st.id, idem: `${st.id}${Date.now()}` })); if (!r) return;
    if (st.type === 'songs') { ui.openSheet('Song slot board', [h('p', {}, '🎵 Tonight’s lineup'), h('div', { class: 'list', id: 'songSlots' }, r.slots.map(sl => h('div', {}, h('span', {}, `Slot ${sl.slot}`), h('span', { class: 'mut' }, sl.title)))), h('p', { class: 'mut' }, r.note)]); return; }
    ui.toast(r.text); if (r.mood != null) this.g.refreshMe?.(); this.g.net.nudge();
  }
  async salonSheet(st) {
    const ui = this.g.ui; const m = await ui.guard(() => get(`/api/salon?venueId=${this.id}`)); if (!m) return;
    const rows = m.styles.map(s => h('button', { class: 'btn alt', 'data-style': s.id, onclick: async () => { const r = await ui.guard(() => post('/api/salon/style', { venueId: this.id, stationId: st.id, styleId: s.id, idem: `${s.id}${Date.now()}` })); if (r) { ui.toast(r.text); ui.closeSheet(); this.g.net.nudge(); } } }, `${s.name} · ${fmtN(s.fee)} · +${s.mood} mood`));
    ui.openSheet(st.label, [h('p', {}, m.current ? `Your look: ${m.current.name}${m.current.fresh ? ' ✨ fresh' : ''}` : 'Pick a style. A fresh look gives a small mood boost.'), h('div', { class: 'col' }, rows), h('p', { class: 'mut' }, m.note)]);
  }
  async mechanicSheet(st) {
    const ui = this.g.ui; const d = await ui.guard(() => get('/api/mechanic')); if (!d) return; const bar = (pct) => h('div', { class: 'cbar' }, h('i', { style: `width:${pct}%` }));
    const list = d.cars.length ? h('div', { class: 'list' }, d.cars.map(c => h('div', { 'data-car': c.id }, h('span', {}, `${c.active ? '✅ ' : ''}${c.name}`, h('small', { class: 'mut' }, ` · ${c.label}${c.perkUntil ? ' · perk on' : ''}`)), h('span', { style: 'min-width:90px' }, bar(c.condition), h('small', { class: 'mut' }, ` ${c.condition}%`)), c.damage ? h('small', { class: 'mut' }, ` · 💥 body damage ${c.damage}`) : ''))) : h('p', { class: 'mut' }, 'Your garage is empty. Meco only works on cars you own.');
    if (st.type === 'check') { ui.openSheet('Check my car', [h('p', {}, d.text), list, h('p', { class: 'mut' }, `Condition drops a little each day. Below ${d.roughBelow}% a car is rough and rides give less mood. Service fee: ${fmtN(d.fee)} (ESTIMATE).`)]); return; }
    const act = d.active; const fresh = !!act?.perkUntil;
    ui.openSheet('Service', [h('div', { class: 'tag amber' }, 'Placeholder fee · ESTIMATE'), act ? h('p', {}, `${act.name}: ${act.label} (${act.condition}%)`) : h('p', { class: 'mut' }, 'You need your own active car. Borrowed cars are not serviced here.'),
      h('p', { class: 'mut' }, `Service resets condition and gives about ${d.perk.minutes} minutes of cheaper fuel (${d.perk.farePctOff}% off) and +${d.perk.extraMood} mood on rides.`),
      h('button', { class: 'btn big alt', id: 'mecoService', disabled: !act || fresh, onclick: async () => { const r = await ui.guard(() => post('/api/mechanic/service', { idemKey: crypto.randomUUID?.() })); if (r) { ui.closeSheet(); ui.toast(r.text, 'money'); this.g.refreshMe?.(); } } }, fresh ? 'Already serviced' : `Service · ${fmtN(d.fee)}`),
      act?.damage ? h('div', {}, h('p', { class: 'mut' }, `💥 Crash damage ${act.damage} (car health ${act.health}%). Body work costs ${fmtN(act.repairFee)} (${fmtN(d.repairPerPoint)} per point, ESTIMATE).`),
        h('button', { class: 'btn big', id: 'mecoRepair', onclick: async () => { const r = await ui.guard(() => post('/api/mechanic/repair', { idemKey: crypto.randomUUID?.() })); if (r) { ui.closeSheet(); ui.toast(r.text, 'money'); this.g.refreshMe?.(); } } }, `Repair crash damage · ${fmtN(act.repairFee)}`)) : '']);
  }
  async carSheet(st) {
    const ui = this.g.ui; const gar = await ui.guard(() => get('/api/garage')); if (!gar) return; this.catalog = gar.catalogue; const m = gar.catalogue.find(c => c.id === st.model); const cur = gar.active; const owned = gar.cars.some(c => c.model === st.model);
    const row = (l, v) => h('div', { class: 'row sp' }, h('span', { class: 'mut' }, l), h('b', {}, v));
    ui.openSheet(m.name, [h('div', { class: 'tag amber' }, 'Placeholder model · price is an ESTIMATE'), row('Price', fmtN(m.price)), row('Fuel per 100 m', '₦' + (m.perM * 100).toFixed(0) + ` (borrowed: ₦${(gar.borrowed.perM * 100).toFixed(0)} + ₦${gar.borrowed.base} tip)`), row('Speed', `${m.speed} (borrowed ${gar.borrowed.speed})`), row('Mood on a nice ride', `+${m.mood}`), row('Resale', `about ${Math.round((1 - gar.resale.firstDriveOffFraction) * 100)}% right after purchase, then about ${Math.round(gar.resale.perDayDepreciation * 100)}% less per day (never below ${Math.round(gar.resale.floorFraction * 100)}%)`), row('Your car now', cur.label),
      h('button', { class: 'btn big alt', disabled: gar.cars.length >= gar.slots, onclick: async () => { const r = await ui.guard(() => post('/api/garage/buy', { model: m.id, idemKey: crypto.randomUUID?.() })); if (r) { ui.closeSheet(); ui.toast(`Congrats! ${m.name} is in your garage 🚗`, 'money'); this.g.refreshMe?.(); } } }, owned ? 'Buy another' : `Buy · ${fmtN(m.price)}`), gar.cars.length >= gar.slots ? h('p', { class: 'mut' }, 'Garage full: sell a car in Phone → Garage.') : '']);
  }
  sitPanel(st) {
    const G = this.data.stakes; let stake = 0; const m = st.match; const info = this.g.cfg; void info;
    const title = { ludo: 'Ludo table (2 to 4 players)', dominoes: 'Dominoes table (2 to 4 players)', draughts: 'Draughts board (2 players)', ayo: 'Ayo board (2 players)', whot: 'Whot bench' }[st.game] || 'Table'; const kids = [h('div', { class: 'row sp' }, h('b', {}, `${st.label}`), h('button', { class: 'btn small ghost', onclick: () => this.panel.classList.add('hidden') }, '✕'))];
    if (m && m.you) { this.focusMatch(m.id); return; }
    if (m && m.status === 'active') kids.push(h('p', { class: 'mut' }, `Game in progress: ${m.players.map(x => '@' + x).join(', ')}. Try another table.`));
    else if (m) kids.push(h('p', {}, `${m.players.map(x => '@' + x).join(', ')} ${m.players.length > 1 ? 'are' : 'is'} waiting (${m.players.length}/${m.max}).`), h('p', { class: 'mut' }, m.stake ? `Stake ₦${m.stake} each (game money). Winner takes the whole pot.` : 'Friendly game: no stake.'), h('button', { class: 'btn big alt', onclick: () => this.sit(st, 0) }, m.stake ? `Join · stake ${fmtN(m.stake)}` : 'Join the game'));
    else { const draw = () => chips.replaceChildren(...G.map(s => h('button', { class: `chip ${s === stake ? 'on' : ''}`, onclick: () => { stake = s; draw(); sitBtn.textContent = s ? `Sit and wait · stake ${fmtN(s)}` : 'Sit and wait · friendly'; } }, s ? fmtN(s) : 'Friendly'))); const chips = h('div', { class: 'chips' }); const sitBtn = h('button', { class: 'btn big alt', onclick: () => this.sit(st, stake) }, 'Sit and wait · friendly'); draw();
      kids.push(h('p', { class: 'mut' }, `${title}: sit down and wait for others to join (Ludo and Dominoes: host starts when 2 to 4 are seated). Pick a stake (game money, held safely until the game ends).`), chips, sitBtn); }
    kids.push(h('p', { class: 'mut' }, '🎲 Game money only. No cash value, no cash-out.')); this.showPanel(kids);
  }
  showPanel(kids) { this.panel.replaceChildren(...[].concat(kids)); this.panel.classList.remove('hidden'); }
  async sit(st, stake) { const r = await this.g.ui.guard(() => post('/api/game/sit', { venueId: this.id, stationId: st.id, stake })); if (!r) return; this.focusMatch(r.id, r); this.g.net.nudge(); }
  focusMatch(id, view) { this.matchId = id; if (view) this.renderMatch(view); else this.pollGame(); }
  async pollGame() { if (!this.matchId) return; const v = await get(`/api/game?id=${this.matchId}`).catch(() => null); if (v) this.renderMatch(v); }
  renderMatch(v) {
    this.match = v; if (this.dismissed.has(v.id)) return; this.matchId = v.id; const me = this.g.user?.username; const kids = []; const head = h('div', { class: 'row sp' }, h('b', {}, `${v.label} · ${v.players.map(x => x.name).join(', ')}`), h('span', { class: 'tag amber' }, v.stake ? `Stake ${fmtN(v.stake)} · pot ${fmtN(v.pot)}` : 'Friendly')); kids.push(head);
    if (v.status === 'waiting') { kids.push(h('p', {}, `Seated ${v.players.length}/${v.max} · waiting for players… ⏳`), h('div', { class: 'row' }, v.players.map(x => h('span', { class: 'tag' }, '@' + x.name))), h('p', { class: 'mut' }, 'Your stake is held safely and comes back if nobody joins.'), v.canStart ? h('button', { class: 'btn big alt', id: 'ludoStart', onclick: () => this.startMatch(v) }, `▶ Start now with ${v.players.length} players`) : v.max > 2 && v.isHost ? h('p', { class: 'mut' }, 'Need at least 2 players to start.') : '', h('button', { class: 'btn ghost', onclick: () => this.leaveMatch(v) }, 'Leave the table')); }
    else if (v.status === 'active') {
      const mine = v.board?.mine; const left = Math.max(0, Math.ceil((v.deadlineAt - this.g.serverNow()) / 1000)); kids.push(h('div', { class: 'row sp' }, h('span', { class: mine ? 'tag green' : 'tag' }, mine ? '🟢 Your turn' : `⏳ @${v.turn}'s turn`), h('span', { class: 'mut', id: 'gtimer' }, `${left}s`)));
      kids.push(({ ludo: () => this.ludoBoard(v), dominoes: () => this.dominoBoard(v), draughts: () => this.draughtsBoard(v), ayo: () => this.ayoBoard(v) }[v.kind] || (() => this.whotBoard(v)))()); kids.push(h('div', { class: 'row' }, h('button', { class: 'btn small ghost', onclick: () => this.g.ui.confirm?.call(this.g.ui, v.kind === 'ludo' || v.kind === 'dominoes' ? 'Leave this game? You are out and your stake stays in the pot.' : 'Resign this game? Your opponent wins the pot.', () => this.leaveMatch(v)) }, '🏳 Resign')));
    } else { const r = v.result || {}; kids.push(h('div', { class: `banner ${r.youWon ? 'win' : r.draw ? 'draw' : 'lose'}` }, r.cancelled ? `Table closed. ${r.why || ''}` : r.draw ? '🤝 Draw' : r.youWon ? `🏆 You won! ${v.stake ? '+' + fmtN(v.pot) : ''}` : `You lost. ${r.why || ''}`), h('button', { class: 'btn alt', onclick: () => { this.dismissed.add(v.id); this.matchId = null; this.panel.classList.add('hidden'); this.g.net.nudge(); this.refreshVenue(); } }, 'Back to the room')); this.g.refreshMe?.(); }
    kids.push(h('p', { class: 'mut' }, '🎲 Game money only.')); this.showPanel(kids); void me;
  }
  card(c, { onclick, disabled, mini } = {}) { const [g, col] = SHAPE[c.s]; return h('button', { class: `wcard ${mini ? 'mini' : ''}`, 'data-card': c.id, disabled: !!disabled, style: `--c:${col}`, onclick }, h('span', { class: 'n' }, c.s === 'whot' ? '20' : c.n), h('span', { class: 'g' }, g)); }
  whotBoard(v) {
    const b = v.board; const wrap = h('div', { class: 'whot' }); const top = h('div', { class: 'row' }, h('div', {}, h('small', { class: 'mut' }, 'Top card'), this.card(b.top, { disabled: true })), h('div', {}, h('small', { class: 'mut' }, 'Shape to match'), h('div', { class: 'shape', style: `color:${SHAPE[b.shape][1]}` }, SHAPE[b.shape][0])), h('div', { class: 'mut' }, `Opponent: ${b.oppCount} cards`, h('br'), `Market: ${b.market}`), b.last ? h('div', { class: 'mut' }, this.lastText(v)) : '');
    const hand = h('div', { class: 'hand' }, b.hand.map(c => this.card(c, { disabled: !b.mine || !b.playable.includes(c.id), onclick: () => (c.s === 'whot' ? this.pickShape(v, c) : this.move(v, { card: c.id })) })));
    const draw = h('button', { class: 'btn small', id: 'whotDraw', disabled: !b.mine, onclick: () => this.move(v, { action: 'draw' }) }, '🃏 Draw one card'); wrap.append(top, hand, draw); this.shapeBox = h('div', { class: 'chips' }); wrap.append(this.shapeBox); return wrap;
  }
  lastText(v) { const l = v.board.last; if (!l) return ''; const who = (l.who === v.you) ? 'You' : 'They'; if (l.effect === 'draw') return `${who} drew a card.`; const fx = { hold: 'Hold on!', suspend: 'Suspension!', pick2: 'Pick two!', pick3: 'Pick three!', market: 'General market!', whot: 'Whot!' }[l.effect]; return `${who} played ${l.card.replace(/[a-z]+/, '')}${fx ? ' · ' + fx : ''}`; }
  pickShape(v, c) { this.shapeBox.replaceChildren(h('b', {}, 'Call a shape: '), ...['circle', 'triangle', 'cross', 'square', 'star'].map(s => h('button', { class: 'chip', style: `color:${SHAPE[s][1]}`, 'data-shape': s, onclick: () => this.move(v, { card: c.id, shape: s }) }, SHAPE[s][0] + ' ' + s))); }
  ayoBoard(v) {
    const b = v.board; const me = v.youSeat; const base = me === 0 ? 0 : 6; const oppBase = me === 0 ? 6 : 0; const bottom = [0, 1, 2, 3, 4, 5].map(k => base + k); const top = [5, 4, 3, 2, 1, 0].map(k => oppBase + k);
    const pit = (i, mine) => { const k = i - base; const legal = mine && b.legal.includes(k); return h('button', { class: `pit ${mine ? 'mine' : ''} ${legal ? 'legal' : ''}`, 'data-pit': i, disabled: !legal, onclick: () => this.move(v, { house: k }) }, h('b', {}, b.pits[i])); };
    const opp = 1 - me; const oppName = v.players.find(p => p.seat === opp)?.name;
    return h('div', { class: 'ayo' }, h('div', { class: 'row sp' }, h('span', { class: 'mut' }, `@${oppName} captured: ${b.store[opp]}`), h('span', { class: 'mut' }, b.last ? `Last: house ${b.last.house + 1}${b.last.captured ? ` · captured ${b.last.captured}` : ''}` : '')), h('div', { class: 'pits' }, top.map(i => pit(i, false))), h('div', { class: 'pits' }, bottom.map(i => pit(i, true))), h('div', { class: 'row sp' }, h('b', {}, `You captured: ${b.store[me]} (first to 25 wins)`)));
  }
  dominoBoard(v) {
    const b = v.board; const PIP = ['·', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅']; const half = (n) => h('span', { class: 'dh' }, PIP[n]);
    const tile = (a, c, o = {}) => h('button', { class: `dtile ${o.mini ? 'mini' : ''}`, 'data-tile': o.id || '', disabled: !!o.disabled, onclick: o.onclick }, half(a), h('i', {}), half(c));
    const names = h('div', { class: 'row' }, v.players.map(p => h('span', { class: `tag ${p.seat === b.turn ? 'green' : ''}` }, `${p.you ? 'You' : '@' + p.name}: ${b.counts[p.seat]}${b.out[p.seat] ? ' (out)' : ''}`)), h('span', { class: 'tag amber' }, `Boneyard ${b.yard}`));
    const chain = h('div', { class: 'dchain' }, b.chain.length ? b.chain.map(t => tile(t[0], t[1], { mini: true, disabled: true })) : h('span', { class: 'mut' }, 'No tiles down yet. Play any tile to start.'));
    const pick = h('div', { class: 'row' }); const dp = this.dpick && b.playable.includes(this.dpick) ? this.dpick : null; if (!dp) this.dpick = null;
    const go = (mv) => { this.dpick = null; this.move(v, mv); };
    if (dp) { const e = b.ends; pick.replaceChildren(h('span', { class: 'mut' }, `Tile ${dp}: which end?`), h('button', { class: 'btn small alt', id: 'domLeft', onclick: () => go({ tile: dp, end: 'left' }) }, `◀ Left (${e[0]})`), h('button', { class: 'btn small alt', id: 'domRight', onclick: () => go({ tile: dp, end: 'right' }) }, `Right (${e[1]}) ▶`)); }
    const choose = (id) => { const [x, y] = id.split('-').map(Number); const e = b.ends; if (!e || e[0] === e[1] || !((x === e[0] || y === e[0]) && (x === e[1] || y === e[1]))) return go({ tile: id }); this.dpick = id; this.renderMatch(v); };
    const hand = h('div', { class: 'hand' }, b.hand.map(id => { const [x, y] = id.split('-').map(Number); return tile(x, y, { id, disabled: !b.mine || !b.playable.includes(id), onclick: () => choose(id) }); }));
    const draw = b.canDraw ? h('button', { class: 'btn alt', id: 'domDraw', onclick: () => this.move(v, { action: 'draw' }) }, `Draw from the boneyard (${b.yard})`) : '';
    const last = b.last; const who = last ? (v.players.find(p => p.seat === last.who)?.name) : null; const lt = last ? (last.pass ? `@${who} had no play and passed.` : last.draw ? `@${who} drew a tile.` : `@${who} played ${last.tile}.`) : '';
    return h('div', { class: 'domino' }, names, chain, h('p', { class: 'mut' }, lt), pick, hand, draw, b.mine && !b.playable.length && !b.canDraw ? h('p', { class: 'mut' }, 'No play: you pass.') : '', b.tiles ? h('p', { class: 'mut' }, 'Final hands: ' + v.players.map(p => `@${p.name} ${b.tiles[p.seat].join(' ') || '(empty)'}`).join(' · ')) : '');
  }
  draughtsBoard(v) {
    const b = v.board; const me = v.youSeat; const flip = me === 1; const sel = this.dsel; const legal = b.legal || []; const froms = new Set(legal.map(m => m.from)); const tos = sel ? legal.filter(m => m.from === sel).map(m => m.to) : [];
    const rows = [...Array(8).keys()]; if (flip) rows.reverse(); const cols = [...Array(8).keys()]; if (flip) cols.reverse();
    const grid = h('div', { class: 'dgrid' }, rows.flatMap(r => cols.map(c => { const val = b.board[r * 8 + c]; const k = `${r},${c}`; const dark = (r + c) % 2 === 1; const mine = val && ((val <= 2) === (me === 0)); const cls = `dcell ${dark ? 'dk' : 'lt'} ${sel === k ? 'sel' : ''} ${tos.includes(k) ? 'dest' : ''} ${b.mine && froms.has(k) ? 'can' : ''}`;
      const piece = val ? h('span', { class: `dp ${val <= 2 ? 'p0' : 'p1'} ${mine ? 'mine' : ''}` }, val === 2 || val === 4 ? '♛' : '') : '';
      return h('button', { class: cls, 'data-cell': k, disabled: !dark || !b.mine, onclick: () => { if (tos.includes(k)) { const paths = legal.filter(m => m.from === sel && m.to === k); this.dsel = null; this.move(v, { from: sel, to: k, path: paths[0].path }); } else if (froms.has(k)) { this.dsel = k; this.renderMatch(v); } else { this.dsel = null; this.renderMatch(v); } } }, piece); })));
    const opp = v.players.find(p => p.seat === 1 - me)?.name; const last = b.last; const lt = last ? `${last.who === me ? 'You' : '@' + opp} moved ${last.captured ? `and captured ${last.captured}` : ''}${last.crowned ? ' · crowned 👑' : ''}` : '';
    return h('div', { class: 'draughts' }, h('div', { class: 'row sp' }, h('span', { class: 'mut' }, `You ${b.count[me]} · @${opp} ${b.count[1 - me]}`), b.mine && b.mustJump ? h('span', { class: 'tag amber' }, 'You must capture!') : ''), grid, h('p', { class: 'mut' }, lt));
  }
  ludoBoard(v) {
    const b = v.board; const COL = ['#d6402f', '#2e9b5e', '#e0a020', '#2e7dd1']; const NAME = ['Red', 'Green', 'Yellow', 'Blue']; const colOf = (seat) => b.corners[seat]; const S = 250, C = S / 2, R = 104, step = 13;
    const pos = (cell, r = R) => { const a = (cell / 52) * 2 * Math.PI - Math.PI / 2; return [C + r * Math.cos(a), C + r * Math.sin(a)]; };
    const board = h('div', { class: 'ludo', style: `width:${S}px;height:${S}px` });
    for (let c = 0; c < 52; c++) { const [x, y] = pos(c); const corner = [0, 13, 26, 39].indexOf(c); board.append(h('i', { class: `lc ${b.safe.includes(c) ? 'safe' : ''}`, style: `left:${x - 6}px;top:${y - 6}px;${corner >= 0 ? `background:${COL[corner]}` : ''}` })); }
    for (let sd = 0; sd < 4; sd++) for (let k = 1; k <= 5; k++) { const [x, y] = pos(sd * 13, R - k * 15); board.append(h('i', { class: 'lc hc', style: `left:${x - 5}px;top:${y - 5}px;background:${COL[sd]}55` })); }
    const stack = {}; const place = (seat, i, p) => { let x, y; if (p === -1) { const cx = pos(colOf(seat) * 13, R + 22); [x, y] = [cx[0] + (i % 2) * 10 - 5, cx[1] + Math.floor(i / 2) * 10 - 5]; } else if (p <= 50) { [x, y] = pos(b.cells[seat][i]); } else if (p < 56) { [x, y] = pos(colOf(seat) * 13, R - (p - 50) * 15); } else { [x, y] = [C - 12 + colOf(seat) * 8, C - 4]; } const k = `${Math.round(x)},${Math.round(y)}`; const n = stack[k] = (stack[k] || 0) + 1; return [x + (n - 1) * 4 - 7, y - (n - 1) * 3 - 7]; };
    b.tokens.forEach((ts, seat) => ts.forEach((p, i) => { const [x, y] = place(seat, i, p); const mine = seat === v.youSeat; board.append(h('b', { class: `ltok ${mine && b.legal.includes(i) ? 'legal' : ''}`, 'data-seat': seat, 'data-tok': i, style: `left:${x}px;top:${y}px;background:${COL[colOf(seat)]}` }, mine ? String(i + 1) : '')); }));
    const names = h('div', { class: 'row', style: 'flex-wrap:wrap' }, v.players.map(pl => h('span', { class: 'tag', style: `border-left:6px solid ${COL[colOf(pl.seat)]}` }, `${NAME[colOf(pl.seat)]} @${pl.name}${pl.out ? ' (left)' : ''}${pl.you ? ' (you)' : ''}`)));
    const dieEl = h('div', { class: 'die', id: 'ludoDie' }, b.die ? ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][b.die] : '🎲'); const last = b.last; const lt = last ? `${last.who === v.youSeat ? 'You' : '@' + v.players.find(x => x.seat === last.who)?.name} rolled ${last.die}${last.note ? ' · ' + last.note : ''}${last.captured ? ` · sent ${last.captured} token(s) home!` : ''}${last.home ? ' · token home! 🏠' : ''}` : '';
    const roll = h('button', { class: 'btn big alt', id: 'ludoRoll', disabled: !b.canRoll, onclick: () => this.move(v, { action: 'roll' }) }, '🎲 Roll the die');
    const mine = b.tokens[v.youSeat] || []; const where = (p) => (p === -1 ? 'in base' : p === 56 ? 'HOME ✔' : p > 50 ? `home column ${p - 50}/5` : `step ${p}`);
    const toks = h('div', { class: 'chips' }, mine.map((p, i) => h('button', { class: `chip ${b.legal.includes(i) ? 'on' : ''}`, 'data-token': i, disabled: !b.legal.includes(i), onclick: () => this.move(v, { token: i }) }, `Token ${i + 1}: ${where(p)}`)));
    return h('div', { class: 'ludowrap' }, names, h('div', { class: 'row' }, board, h('div', {}, dieEl, roll)), h('p', { class: 'mut' }, lt), b.mine && b.die ? h('p', {}, `You rolled ${b.die}. Pick a token to move:`) : '', toks, h('p', { class: 'mut' }, 'Roll a 6 to leave base. A 6 gives another roll. Land on a rival (off the safe ⭐ cells) to send them home.'));
  }
  async startMatch(v) { const r = await this.g.ui.guard(() => post('/api/game/start', { matchId: v.id })); if (r) this.renderMatch(r); else this.pollGame(); }
  async move(v, mv) { const r = await this.g.ui.guard(() => post('/api/game/move', { matchId: v.id, ...mv })); if (r) { this.renderMatch(r); this.g.ui.sfx('ok'); } else this.pollGame(); }
  async leaveMatch(v) { const r = await this.g.ui.guard(() => post('/api/game/leave', { matchId: v.id })); this.g.ui.closeSheet(); if (r) this.renderMatch(r); else this.pollGame(); this.refreshVenue(); }
  async refreshVenue() { const d = await get(`/api/venue?id=${this.id}`).catch(() => null); if (d && this.open) { this.data = d; this.drawStrip(); this.people_refresh(); } }
  poll() { clearInterval(this.pt); this.pt = setInterval(async () => { if (!this.open) return; await this.refreshVenue(); if (this.matchId) await this.pollGame(); else { const mine = this.data.stations.find(s => s.match?.you); if (mine && !this.dismissed.has(mine.match.id)) this.focusMatch(mine.match.id); } const t = $('#gtimer'); if (t && this.match?.status === 'active') t.textContent = `${Math.max(0, Math.ceil((this.match.deadlineAt - this.g.serverNow()) / 1000))}s`; }, 1500); }
  tap(ev) { const rc = this.canvas.getBoundingClientRect(); const v = new THREE.Vector2(((ev.clientX - rc.left) / rc.width) * 2 - 1, -((ev.clientY - rc.top) / rc.height) * 2 + 1); const ray = new THREE.Raycaster(); ray.setFromCamera(v, this.cam); const hit = ray.intersectObjects(this.stations.children, true)[0]; if (hit) { const id = hit.object.userData.stationId; this.pick(id); } }
  bind() {
    let drag = null; const cv = this.canvas; cv.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, moved: 0, id: e.pointerId }; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointermove', (e) => { if (drag && drag.id === e.pointerId) { const dx = e.clientX - drag.x; drag.x = e.clientX; drag.moved += Math.abs(dx); this.yaw = Math.max(Math.PI / 5 - 0.7, Math.min(Math.PI / 5 + 0.7, this.yaw - dx * 0.006)); } });
    cv.addEventListener('pointerup', (e) => { if (drag && drag.moved < 8) this.tap(e); drag = null; }); cv.addEventListener('wheel', (e) => { this.dist = Math.max(9, Math.min(24, this.dist + e.deltaY * 0.02)); e.preventDefault(); }, { passive: false });
    this.onKey = (e) => { if (this.open && e.key === 'Escape' && !this.g.ui.sheetOpen) this.leave(); }; addEventListener('keydown', this.onKey);
  }
  resize() { const w = this.el.clientWidth, hh = this.el.clientHeight; this.r.setSize(w, hh, false); this.cam.aspect = w / hh; this.cam.updateProjectionMatrix(); }
  loop() { if (!this.open) return; this.cam.position.set(Math.sin(this.yaw) * Math.cos(this.pitch) * this.dist, Math.sin(this.pitch) * this.dist, Math.cos(this.yaw) * Math.cos(this.pitch) * this.dist); this.cam.lookAt(0, 0.6, 0.3); const tt = (performance.now() - this.t0) / 1000; for (const f of this.anim) f(tt); this.r.render(this.scene, this.cam); this.raf = requestAnimationFrame(() => this.loop()); }
  async leave() {
    if (!this.open) return; const r = await this.g.ui.guard(() => post('/api/venue/leave')); if (!r) return; this.open = false; clearInterval(this.pt); cancelAnimationFrame(this.raf); removeEventListener('keydown', this.onKey); removeEventListener('resize', this.onResize);
    this.r.dispose(); this.el.classList.add('hidden'); this.el.replaceChildren(); this.g.busy = false; this.g.ctrl.frozen = false; this.g.net.nudge(); $('#game').focus();
  }
}
