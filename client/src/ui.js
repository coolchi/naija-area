import { graphicsBlock } from './quality-ui.js';
import { soundBlock } from './audio-ui.js';
import { missionsBody } from './missions-ui.js';
import { meBody } from './me-ui.js';
import { safetyBody } from './guardian-ui.js';
import { roadPts, nearestOnPoly } from './roadgeom.js';
import { PhoneShell } from './phone-v2/apps.js';
import { get, post, fmtN, h, $, $$, ApiError } from './api.js';
import { healthNow } from './crash.js';
import * as casualUi from './casual.js';
import { CityMap } from './map.js';
import { buyCard, checkReturn } from './pay-ui.js';
import { setupFlow } from './setup-ui.js';
import { officeSheet } from './office-ui.js';
import { downloadData, closeAccountSheet } from './account-ui.js';
import { lifeUi } from './life-ui.js';

// ---- pidgin toasts (tone: playful, never about real money) ----
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const LINES = {
  wage: (n) => pick([`Nailed it! ${fmtN(n)} don enter your pocket.`, `Oya collect your ${fmtN(n)}. Hustle pays!`, `Correct hustle! +${fmtN(n)}`]),
  shiftStart: () => pick(['Oya, na work time! Shift don start.', 'Shift don start. No dull!']),
  bought: (n) => pick([`Correct! You pay ${fmtN(n)}.`, `Paid ${fmtN(n)}. Enjoy am!`]),
  home: () => pick(['Congrats, na your house be this!', 'New keys, new vibes. Welcome home!']),
  plot: () => 'Congrats, the land is yours! Watch out for omo-onile.',
  travel: (n) => (n ? `Safe journey! ${fmtN(n)} gone for transport.` : 'Enjoy the ride, free of charge.'),
  hit: (p) => `Nailed it! +${p}% bonus on this shift.`, miss: () => 'Ah ah, you miss am! No bonus this time.',
  sold: (n) => `Sold. ${fmtN(n)} back in your pocket.`, blocked: () => 'Something is in the way.',
};
const ERR = { INSUFFICIENT_FUNDS: () => pick(['Your pocket dry o. Money no reach.', 'No cash for that one. Go hustle first!']), TOO_FAR: () => pick(['You dey far o. Move closer.', 'Walk go there first, oga.']), TOO_TIRED: () => 'You don tire. Eat or rest first!', TOO_HUNGRY: () => 'Hunger dey vex you. Buy food first.', BLOCKED: () => 'Something is in the way.', COOLDOWN: null, LOGIN_REQUIRED: () => 'Session don end. Please log in again.', JOB_FULL: () => 'Monipay Bank don full for today. Come back tomorrow.', HOURS_DONE: () => 'You don do your 10 hours. Come back tomorrow.', SUPER_SOLD_OUT: () => 'Supercars for today don finish. Come back tomorrow.' };
const durLabel = (sec) => {
  const s = Math.max(0, Math.round(sec)); if (s < 60) return `${s}s`;
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  if (h && m) return `${h}h ${m}m`; if (h) return `${h}h`; return `${m}m`;
};
const cdLabel = (ms) => {
  const s = Math.max(0, Math.ceil(ms / 1000)); if (s < 60) return `${s}s`;
  const h = Math.floor(s / 3600), m = Math.ceil((s % 3600) / 60);
  if (h && m) return `${h}h ${m}m`; if (h) return `${h}h`; return `${m}m`;
};
const leftLabel = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)); if (s < 60) return `${s}s left`; if (s < 3600) return `${Math.ceil(s / 60)}m left`; const h = Math.floor(s / 3600); let m = Math.ceil((s % 3600) / 60); if (m >= 60) return `${h + 1}h left`; return m ? `${h}h ${m}m left` : `${h}h left`; };
export const say = (k, ...a) => LINES[k](...a);

export class UI {
  constructor(game) {
    this.g = game; this.sheetOpen = false; this.onClose = null; this.mm = $('#minimap').getContext('2d'); $('#minimap').style.cursor = 'pointer'; $('#minimap').title = 'Open the full map (M)'; $('#minimap').addEventListener('click', () => this.openMap()); this.chatOn = false; this.sfxOn = true; this.actx = null;
    $('#sheetX').onclick = () => this.closeSheet(); $('#sheetWrap').addEventListener('pointerdown', (e) => { if (e.target.id === 'sheetWrap') this.closeSheet(); });
    $('#phoneBtn').onclick = () => this.phone(); $('#muteBtn').onclick = () => { const on = this.g.audio ? this.g.audio.toggle() : !this.sfxOn; this.sfxOn = on; $('#muteBtn').textContent = on ? '🔊' : '🔇'; };
    $('#carBtn').onclick = () => game.toggleCar();
    $('#chatForm').addEventListener('submit', async (e) => { e.preventDefault(); const i = $('#chatInput'); const t = i.value.trim(); if (!t) return this.hideChat(); i.value = ''; this.hideChat(); try { await post('/api/chat', { text: t }); } catch (er) { this.error(er); } });
    addEventListener('keydown', (e) => {
      if (e.target.closest('input,textarea')) { if (e.key === 'Escape') { this.hideChat(); e.target.blur(); } return; }
      if (e.key === 'Escape') { if (this.sheetOpen) this.closeSheet(); }
      if (!game.playing) return; const k = e.key.toLowerCase();
      if (k === 'enter' && !e.repeat && !this.sheetOpen && game.ctrl?.mode === 'walk' && game.ownCar?.nearEnough()) { e.preventDefault(); game.enterOwnCar(); return; }
      if (k === 't' || k === 'enter') { e.preventDefault(); this.showChat(); } else if (k === 'p') this.phone(); else if (k === 'm') this.openMap(); else if (k === 'c') game.toggleCar(); else if (k === 'f' || k === ' ') { if (!this.sheetOpen) game.doAction(); }
    });
    $('#actionBtn').onclick = () => game.doAction();
  }
  // ---------- audio (tiny WebAudio blips, no assets) ----------
  sfx(kind, vol = 1) { this.g.audio?.play(kind, vol); } // synthesised sounds live in audio.js (recipes in audio-config.js)
  haptic(ms = 15) { try { navigator.vibrate?.(ms); } catch { /* optional */ } }
  checkPayReturn() { return checkReturn(this); }
  toast(text, kind = '') { const el = h('div', { class: `toast ${kind}` }, text); const box = $('#toasts'); box.append(el); while (box.children.length > 3) box.firstChild.remove(); setTimeout(() => el.remove(), 4300); if (kind === 'bad') this.sfx('bad'); else if (kind === 'money') { this.sfx('coin'); this.haptic(); } }
  error(e) { if (e instanceof ApiError) { if (e.status === 401 && e.code === 'LOGIN_REQUIRED') { this.g.sessionLost(); return; } const f = ERR[e.code]; this.toast(f ? f() : e.message, 'bad'); } else { console.error(e); this.toast('Something went wrong. Try again.', 'bad'); } }
  showChat() { $('#chatForm').classList.add('on'); $('#chatInput').focus(); } hideChat() { $('#chatForm').classList.remove('on'); $('#game').focus(); }
  addChat(u, t, id, tt) { const d = h('div', { style: 'pointer-events:auto;cursor:pointer', title: 'Tap to report, mute or block', onclick: () => this.playerMenu(u, id && { kind: 'chat', target: id, text: `${u}: ${t}` }) }, `${u}${tt ? ` [${tt}]` : ''}: ${t}`); $('#chatlog').append(d); while ($('#chatlog').children.length > 5) $('#chatlog').firstChild.remove(); setTimeout(() => d.remove(), 14000); }

  // ---------- trust & safety UI ----------
  /** menu for a player (from chat or a house card): report the thing, mute, block */
  playerMenu(username, report) {
    if (username === this.g.user?.username) return;
    const draw = () => this.openSheet(`@${username}`, [report ? h('p', { class: 'mut' }, `"${report.text}"`) : '', h('div', { class: 'row' },
      report ? h('button', { class: 'btn red', onclick: () => this.reportSheet(report.kind, report.target, report.text) }, '🚩 Report') : '',
      h('button', { class: 'btn ghost', onclick: () => this.setBlock(username, 'mute') }, '🔇 Mute'), h('button', { class: 'btn ghost', onclick: () => this.setBlock(username, 'block') }, '⛔ Block')),
      h('p', { class: 'mut' }, 'Mute: you stop seeing their chat and messages. Block: they cannot message you, knock on your door or sit at your tables, and you will not see each other.')]);
    draw();
  }
  async setBlock(username, kind) { const r = await this.guard(() => post('/api/social/mute', { username, kind })); if (r) { this.toast(kind === 'block' ? `@${username} blocked.` : kind === 'mute' ? `@${username} muted.` : `@${username} unblocked.`); this.closeSheet(); } }
  reportSheet(kind, target, what = '') {
    const labels = { abusive: 'Abusive or insulting', sexual: 'Sexual content', hate: 'Hate or discrimination', scam_spam: 'Scam or spam', personal_info: 'Shares personal info', misleading: 'Misleading', other: 'Something else' };
    let reason = 'abusive'; const note = h('input', { class: 'sheet-input', maxlength: 200, placeholder: 'Anything we should know? (optional)' });
    const chips = h('div', { class: 'chips' }); const drawChips = () => chips.replaceChildren(...Object.entries(labels).map(([k, l]) => h('button', { class: `chip ${k === reason ? 'on' : ''}`, onclick: () => { reason = k; drawChips(); } }, l))); drawChips();
    this.openSheet('Report', [h('p', { class: 'mut' }, what ? `Reporting: ${what}` : 'Tell us what is wrong.'), chips, note, h('div', { class: 'row' }, h('button', { class: 'btn red', onclick: async () => { const r = await this.guard(() => post('/api/report', { kind, target: String(target), reason, detail: note.value })); if (r) { this.toast(r.message); this.closeSheet(); } } }, 'Send report'), h('button', { class: 'btn ghost', onclick: () => this.closeSheet() }, 'Cancel')), h('p', { class: 'mut' }, 'Reports go to a human reviewer. False reports can limit your own account.')]);
  }
  // ---------- HUD ----------
  /** health bar (server value plus natural recovery since it arrived), also called a few times a second */
  healthBar(u) { const el = $('#healthBar'); if (!el || !u?.health) return; const hv = u.health; if (!hv.at) hv.at = Date.now(); const v = healthNow(hv, this.g.cfg?.crash?.regenPerMin ?? 3, Date.now()); el.style.width = Math.round(v / hv.max * 100) + '%'; el.style.background = v < 30 ? '#d6402f' : v < 60 ? '#f29a2e' : '#e0405a'; el.parentElement.title = `Health ${Math.round(v)}/${hv.max}`; }
  hud(u) { this.healthBar(u);
    $('#cash').textContent = fmtN(u.cash); $('#sav').textContent = '🏦 ' + fmtN(u.savings);
    $('#energyBar').style.width = u.energy + '%'; $('#hungerBar').style.width = u.hunger + '%';
    $('#energyBar').style.background = u.energy < 20 ? '#d6402f' : '#35c46b'; $('#hungerBar').style.background = u.hunger < 20 || u.fainted ? '#d6402f' : '#f29a2e';
    if (u.fainted) $('#hungerBar').parentElement.title = 'Fainted from hunger — call a cab or friend to eat';
    const sb = $('#shiftbar'); if (u.shift) { const j = this.g.cfg.jobs?.find(x => x.id === u.shift.jobId); const left = Math.max(0, u.shift.endsAt - this.g.serverNow()); sb.classList.remove('hidden'); sb.textContent = left > 0 ? `💼 ${j?.name || 'Shift'} · ${leftLabel(left)}` : `💼 ${j?.name || 'Shift'} done: collect your pay!`; } else sb.classList.add('hidden');
  }
  clock(w) { const h12 = ((w.hour + 11) % 12) + 1; const night = w.hour < 6 || w.hour >= 19; const tail = w.real && w.date ? w.date : `Day ${w.day}`; $('#clock').textContent = `${night ? '🌙' : '🌞'} ${h12}:${String(w.minute).padStart(2, '0')} ${w.hour >= 12 ? 'PM' : 'AM'} · ${tail}`; }
  badge(n) { const b = $('#phoneBadge'); b.textContent = n; b.classList.toggle('hidden', !n); }
  loc(text) { $('#loc').textContent = text; }
  waypoint(wp, d) { const el = $('#waypoint'); if (!wp) return el.classList.add('hidden'); el.classList.remove('hidden'); el.textContent = `📍 ${wp.label} · ${Math.round(d)} m`; }
  action(label) { const b = $('#actionBtn'); if (!label) return b.classList.add('hidden'); b.classList.remove('hidden'); b.textContent = label; }
  /** HUD radar: pans with the player so they stay centred and never walk off the visible map. */
  minimap(ctrl, city, ghosts, wp) {
    const c = this.mm, W = 300, mid = W / 2;
    const B = city.bounds;
    // ~160 m across the radar; larger districts stay readable while the view follows the player
    const span = Math.min(180, Math.max(90, Math.max(B.maxX - B.minX, B.maxZ - B.minZ) * 0.22));
    const S = (W - 20) / span;
    const cx = ctrl.x, cz = ctrl.z;
    const X = (x) => (x - cx) * S + mid, Z = (z) => (z - cz) * S + mid;
    const near = (x, z, pad = 40) => Math.abs(x - cx) * S < mid + pad && Math.abs(z - cz) * S < mid + pad;
    c.clearRect(0, 0, W, W);
    // water beyond the district edge, land inside bounds
    c.fillStyle = '#2b6f8a'; c.fillRect(0, 0, W, W);
    c.fillStyle = '#c9c3ad';
    const lx = X(B.minX), lz = Z(B.minZ), lw = (B.maxX - B.minX) * S, ld = (B.maxZ - B.minZ) * S;
    c.fillRect(lx, lz, lw, ld);
    if (city.water) { c.fillStyle = '#2b6f8a'; c.fillRect(X(city.water.minX ?? B.minX), Z(Math.max(B.maxZ, city.water.minZ ?? B.maxZ)), W, W); }
    c.fillStyle = '#2b6f8a';
    for (const k of city.creeks || []) {
      if (!near((k.x0 + k.x1) / 2, (k.z0 + k.z1) / 2, 80)) continue;
      c.fillRect(X(Math.max(B.minX, k.x0)), Z(Math.max(B.minZ, k.z0)), (Math.min(B.maxX, k.x1) - Math.max(B.minX, k.x0)) * S, (Math.min(B.maxZ, k.z1) - Math.max(B.minZ, k.z0)) * S);
    }
    c.fillStyle = '#e9d9a0';
    for (const l of city.landmarks || []) if (l.kind === 'beach' && !l.island && near(l.cx, l.cz, 80)) c.fillRect(X(l.cx - l.w / 2), Z(l.cz - l.d / 2), l.w * S, l.d * S);
    c.fillStyle = '#8f8a79';
    for (const b of city.buildings) { if (!near(b.x, b.z, 24)) continue; c.fillRect(X(b.x - b.w / 2), Z(b.z - b.d / 2), b.w * S, b.d * S); }
    // Roads after buildings so streets stay visible. Include any segment that crosses the radar
    // (not only roads whose endpoints sit near you — long roads like Danfo Drive were vanishing mid-block).
    const viewR = span / 2 + 20;
    const roadStroke = (pts, color, width) => {
      c.strokeStyle = color; c.lineWidth = width; c.lineJoin = 'round'; c.lineCap = 'butt';
      c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(X(p[0]), Z(p[1])) : c.moveTo(X(p[0]), Z(p[1]))); c.stroke();
    };
    for (const r of city.roads || []) {
      const pts = roadPts(r); if (nearestOnPoly(pts, cx, cz).d > viewR + (r.width || 10)) continue;
      const w = Math.max(2, (r.width || 10) * S);
      roadStroke(pts, '#b9b39a', w + 2.5);
      roadStroke(pts, '#3d4046', w);
    }
    c.fillStyle = '#3d4046';
    for (const o of city.roundabouts || []) {
      if (!near(o.x, o.z, 40)) continue;
      c.beginPath(); c.arc(X(o.x), Z(o.z), o.outerR * S, 0, 7); c.fill();
      c.fillStyle = '#6a9a55'; c.beginPath(); c.arc(X(o.x), Z(o.z), o.islandR * S, 0, 7); c.fill(); c.fillStyle = '#3d4046';
    }
    c.fillStyle = '#ffc20e'; for (const s of city.shops) { if (near(s.x, s.z)) c.fillRect(X(s.x) - 3, Z(s.z) - 3, 6, 6); }
    c.fillStyle = '#4aa3ff'; for (const j of city.jobs) { if (near(j.x, j.z)) c.fillRect(X(j.x) - 3, Z(j.z) - 3, 6, 6); }
    c.fillStyle = '#35c46b'; for (const b of city.billboards) if (b.surface !== 'lagoon_plot' && near(b.x, b.z)) c.fillRect(X(b.x) - 2, Z(b.z) - 2, 4, 4);
    try { this.patrolMm?.(c, X, Z); } catch { /* patrol dots are optional */ }
    if (wp && near(wp.x, wp.z, 60)) { c.fillStyle = '#b44cff'; c.beginPath(); c.arc(X(wp.x), Z(wp.z), 7, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2; c.stroke(); }
    c.fillStyle = '#fff';
    for (const g of ghosts.map.values()) if (g.root && near(g.root.position.x, g.root.position.z)) { c.beginPath(); c.arc(X(g.root.position.x), Z(g.root.position.z), 3.5, 0, 7); c.fill(); }
    // district edge so you can see when you are near the map border
    c.strokeStyle = '#b3261e99'; c.lineWidth = 2; c.strokeRect(lx, lz, lw, ld);
    c.save(); c.translate(mid, mid); c.rotate(-ctrl.ry + Math.PI / 2); c.fillStyle = '#ff3b30'; c.beginPath(); c.moveTo(0, -8); c.lineTo(6, 7); c.lineTo(-6, 7); c.closePath(); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2; c.stroke(); c.restore();
  }

  // ---------- sheets ----------
  openSheet(title, body, onClose) {
    const wrap = $('#sheetWrap');
    // Leaving the iPhone chrome (e.g. Land → View plot) must restore the cream sheet.
    // Otherwise #sheet stays transparent and dark ink disappears over the night world.
    if (wrap.classList.contains('phone-mode')) {
      wrap.classList.remove('phone-mode');
      const prev = this.onClose; this.onClose = null; try { prev?.(); } catch { /* ignore */ }
    }
    this.onClose = onClose || null;
    $('#sheetTitle').textContent = title;
    $('#sheetBody').replaceChildren(...[].concat(body));
    wrap.classList.remove('hidden');
    this.sheetOpen = true;
    this.g.ctrl.frozen = true;
  }
  setSheetBody(body) { $('#sheetBody').replaceChildren(...[].concat(body)); }
  closeSheet() {
    if (!this.sheetOpen) return;
    $('#sheetWrap').classList.remove('phone-mode');
    $('#sheetWrap').classList.add('hidden');
    this.sheetOpen = false;
    this.g.ctrl.frozen = this.g.busy;
    clearInterval(this.tick);
    const f = this.onClose; this.onClose = null; f?.();
    $('#game').focus();
  }
  async guard(fn) { try { return await fn(); } catch (e) { this.error(e); return null; } }

  /** universal tap-a-place sheet: info block by type + travel chips + Go */
  async place(placeId) {
    const g = this.g; const pl = g.city.places.find(p => p.id === placeId); if (!pl) return;
    const body = h('div', {}); this.openSheet(pl.name, body); clearInterval(this.tick);
    const render = async () => {
      const q = await get(`/api/travel/quote?place=${encodeURIComponent(placeId)}`).catch(e => { this.error(e); return null; }); if (!q || !this.sheetOpen) return;
      const here = q.distance < 22; let mode = here ? null : this.lastMode && q.modes.find(m => m.id === this.lastMode) ? this.lastMode : 'keke';
      const info = h('div', {}); const goWrap = h('div', {}); const rebuild = () => {
        const chips = h('div', { class: 'chips' }, q.modes.map(m => h('button', { class: `chip ${m.id === mode ? 'on' : ''}`, onclick: () => { mode = m.id; this.lastMode = m.id; rebuild(); } }, ({ walk: '🚶', keke: '🛺', danfo: '🚌', car: '🚗' }[m.id] || ''), ' ', m.label, h('small', {}, m.fare ? `${fmtN(m.fare)} · ${m.seconds}s` : `free · ~${m.seconds}s`))));
        const sel = q.modes.find(m => m.id === mode); const go = h('button', { class: 'btn big alt', disabled: here || !sel, onclick: () => this.go(pl, sel, q) }, here ? "You're here" : mode === 'walk' ? 'Set waypoint & walk' : `Go · ${fmtN(sel.fare)}`);
        goWrap.replaceChildren(h('div', { class: 'row sp' }, h('span', { class: 'mut' }, `${Math.round(q.distance)} m away`), h('span', { class: `tag ${q.rush ? 'amber' : 'green'}` }, (q.rush ? '⏰ ' : '') + q.traffic)), here ? '' : chips, go);
      }; rebuild();
      body.replaceChildren(h('div', { class: 'mut' }, `${pl.area} · ${placeKindLabel(pl)}`), info, goWrap); this.fillPlaceInfo(info, pl, q);
    }; render();
  }
  async go(pl, mode, q) {
    const g = this.g; if (mode.id === 'walk') { g.setWaypoint(pl.x, pl.z, pl.name); this.closeSheet(); this.toast(`Waypoint set: ${pl.name}. Follow the purple pin.`); return; }
    const r = await this.guard(() => post('/api/travel', { placeId: pl.id, mode: mode.id, pos: g.pos() })); if (!r) return; this.closeSheet(); g.update(r.user); g.runCommute(r, pl, q);
  }
  fillPlaceInfo(el, pl, q) {
    if (pl.type === 'shop') this.shopBlock(el, pl.id); else if (pl.type === 'job') this.jobBlock(el, pl.id); else if (pl.type === 'house') this.houseBlock(el, pl.id); else if (pl.type === 'plot') this.plotBlock(el, pl.id); else if (pl.type === 'venue') this.venueBlock(el, pl); else if (pl.id === 'clinic') this.clinicBlock(el, pl);
    else el.replaceChildren(h('p', { class: 'mut' }, pl.id === 'airport' ? 'Fly to Kano, Abuja and Port Harcourt from the departures board. The airport also hosts premium ad boards.' : 'A public landmark. Wave to the neighbours.'));
  }

  async clinicBlock(el, pl) {
    const near = dist2(this.g.pos(), pl) < 28 + 4; const d = await this.guard(() => get('/api/clinic')); if (!d) return; const full = d.fee === 0;
    el.replaceChildren(h('p', {}, `Health ${Math.round(d.health)} / ${d.max}. It also comes back slowly by itself (about ${d.regenPerMin} a minute, ESTIMATE).`), h('div', { class: 'tag amber' }, 'Placeholder fee · ESTIMATE'),
      h('p', { class: 'mut' }, 'If your health ever hits zero you wake up here. You lose nothing but a small fee, and your account is safe.'),
      h('button', { class: 'btn big alt', id: 'clinicTreat', disabled: !near || full, onclick: async () => { const r = await this.guard(() => post('/api/clinic/treat', { idemKey: crypto.randomUUID?.(), pos: this.g.pos() })); if (r) { this.g.user.health = { health: r.health, max: d.max, at: Date.now() }; this.toast(r.text, 'money'); this.closeSheet(); this.g.refreshMe?.(); } } }, full ? 'You are fine' : !near ? 'Get to the clinic door first' : `Treat me · ${fmtN(d.fee)}`));
  }
  venueBlock(el, pl) {
    const near = dist2(this.g.pos(), pl) < 16 + 4; const hrs = pl.hours ? `Open ${pl.hours[0]}:00 to ${pl.hours[1]}:00` : '';
    const desc = pl.blurb
      || (pl.id === 'venue_motors' ? 'Look at the cars, compare running costs and buy one. Placeholder prices are ESTIMATES.'
        : pl.id === 'venue_meco' ? 'Meco fixes cars. Check your car, or pay a placeholder (ESTIMATE) fee for a quick service.'
          : pl.id === 'venue_armoury' || pl.kind === 'armoury' ? 'Buy a gun and keep it, or hire an HD bodyguard (optional Black G-Wagon escort). Placeholder prices (ESTIMATE). Game money only.'
            : pl.id === 'venue_police' || pl.kind === 'police' ? 'Report a case or bail someone from holding. Filing and bail fees are game money only (ESTIMATE).'
              : 'Step inside to eat, chat, and play Whot or Ayo against other players. 🎲 Game money only.');
    el.replaceChildren(h('p', { class: 'mut' }, hrs), h('p', {}, desc),
      h('button', { class: 'btn big alt', disabled: !near, id: 'venueEnter', onclick: () => { this.closeSheet(); this.g.venue.show(pl.id); } }, near ? 'Go inside' : 'Walk to the door first'));
  }
  // ----- shops with price channels
  async shopBlock(el, shopId) {
    const d = await this.guard(() => get('/api/shops')); if (!d) return; const s = d.shops.find(x => x.id === shopId); if (!s) return; this.g.shops = d.shops; let channel = 'local';
    const draw = () => {
      const near = Math.hypot(this.g.ctrl.x - s.x, this.g.ctrl.z - s.z) < 24; const dm = d.channels.delivery;
      el.replaceChildren(h('p', { class: 'mut' }, s.desc), h('div', { class: 'row' }, h('span', { class: `tag ${s.status.open ? 'green' : 'red'}` }, s.status.text), h('span', { class: 'tag' }, s.channel === 'market' ? `Market ×${d.channels.market.mult}` : `Supermarket ×${d.channels.supermarket.mult}`)),
        h('div', { class: 'chips' }, h('button', { class: `chip ${channel === 'local' ? 'on' : ''}`, onclick: () => { channel = 'local'; draw(); } }, s.channel === 'market' ? 'Market stall' : 'In store', h('small', {}, near ? 'you are here' : 'walk there')),
          h('button', { class: `chip ${channel === 'delivery' ? 'on' : ''}`, onclick: () => { channel = 'delivery'; draw(); } }, '🛵 Delivery', h('small', {}, `×${dm.mult} + ${fmtN(dm.fee)} fee`))),
        h('div', { class: 'list' }, s.items.map(i => { const price = channel === 'delivery' ? i.deliveryPrice : i.price; const blocked = channel === 'local' && (!s.status.open || !near);
          return h('div', {}, h('div', {}, h('b', {}, i.name), h('div', { class: 'mut' }, [i.hunger ? `🍲 +${i.hunger}` : '', i.energy ? `⚡ +${i.energy}` : ''].filter(Boolean).join('  '))),
            h('button', { class: 'btn small', disabled: blocked, onclick: () => this.buy(s, i, channel, price, dm.fee) }, `${fmtN(price)}${channel === 'delivery' ? '+' + dm.fee : ''}`)); })),
        channel === 'local' && !near ? h('p', { class: 'mut' }, 'Walk or ride to the shop to buy here, or switch to delivery.') : '');
    }; draw();
  }
  async buy(s, i, channel, price, fee) { const r = await this.guard(() => post('/api/shop/buy', { shopId: s.id, itemId: i.id, channel, qty: 1, idem: crypto.randomUUID?.() || String(Math.random()), pos: this.g.pos() })); if (!r) return; this.g.update(r.user); this.toast(say('bought', r.spent), 'money'); }

  // ----- jobs + timing mini-game
  jobBlock(el, locId) {
    const g = this.g; const jobs = (g.cfg.jobs || []).filter(j => j.location === locId);
    const draw = async () => {
      const st = await this.guard(() => get('/api/jobs')); if (!st) return; const u = g.user; const mine = st.jobs.filter(j => j.location === locId);
      const shift = u.shift; const rows = mine.map(j => { const active = shift && shift.jobId === j.id; const left = active ? Math.max(0, shift.endsAt - g.serverNow()) : 0;
        const capped = j.dailySlots || j.maxHoursPerDay; const spotFull = j.dailySlots && j.slotsLeft === 0 && !j.onRoster; const hoursDone = j.maxHoursPerDay && j.hoursLeft === 0;
        const capLine = capped ? (spotFull ? 'Full for today. Come back tomorrow.' : hoursDone ? `Your ${j.maxHoursPerDay} hours are done. Come back tomorrow.` : `${j.onRoster ? 'You have a spot today' : `${j.slotsLeft} of ${j.slotsTotal} spots left`} · ${j.hoursLeft} hour${j.hoursLeft === 1 ? '' : 's'} left for you`) : '';
        const startText = j.cooldownLeftMs > 0 ? `Break (${cdLabel(j.cooldownLeftMs)})` : shift ? 'Finish your shift first' : hoursDone ? 'Hours done today' : spotFull ? 'Full today — come back tomorrow' : (j.maxHoursPerDay ? 'Start hour' : 'Start shift');
        return h('div', { class: 'card', style: 'margin:8px 0;padding:12px;box-shadow:none;border:2px solid #e3dcc2' }, h('div', { class: 'row sp' }, h('b', {}, j.name), h('span', { class: 'tag amber' }, `${fmtN(j.wage)} / ${durLabel(j.durationSec)}`)), h('div', { class: 'mut' }, j.desc),
          h('div', { class: 'mut' }, `⚡ -${j.energyCost}  🍲 -${j.hungerCost}${j.cooldownSec ? `  · ${durLabel(j.cooldownSec)} break after pay` : ''}${j.locked ? ` · 🔒 ${j.shiftsNeeded} more shift(s) to unlock` : ''}`),
          capLine ? h('div', { class: 'mut' }, capLine) : '',
          active ? h('div', {}, h('div', { class: 'progress' }, h('i', { style: `width:${Math.min(100, 100 - (left / (j.durationSec * 10)))}%` })), left > 0 ? h('div', { class: 'mut' }, leftLabel(left)) : '',
              h('div', { class: 'row' }, h('button', { class: 'btn alt', onclick: () => this.miniGame(draw) }, '🎯 Quick task (+25%)'), h('button', { class: 'btn', disabled: left > 0, onclick: async () => { const r = await this.guard(() => post('/api/jobs/claim')); if (r) { g.update(r.user); this.toast(say('wage', r.wage), 'money'); draw(); } } }, left > 0 ? 'Working…' : 'Collect pay')))
            : h('button', { class: 'btn', style: 'margin-top:6px', disabled: j.locked || !!shift || j.cooldownLeftMs > 0 || spotFull || hoursDone, onclick: async () => { const r = await this.guard(() => post('/api/jobs/start', { jobId: j.id, pos: g.pos() })); if (r) { g.update(r.user); this.toast(say('shiftStart')); draw(); } } }, startText)); });
      el.replaceChildren(...rows);
    }; draw(); clearInterval(this.tick); this.tick = setInterval(() => { if (this.sheetOpen && !this.mgOpen) draw(); }, 2500);
  }
  async miniGame(back) {
    const t = await this.guard(() => post('/api/jobs/task/start')); if (!t) return; this.mgOpen = true; let raf; const cur = h('div', { class: 'cur' }); const zone = h('div', { class: 'zone', style: `left:${(t.target - t.width / 2) * 100}%;width:${t.width * 100}%` });
    const bar = h('div', { class: 'mgbar' }, zone, cur); const res = h('div', { class: 'big', style: 'font:400 22px "Lilita One";min-height:30px' }); let done = false; const wave = (x) => { const f = x - Math.floor(x); return f < 0.5 ? f * 2 : 2 - f * 2; };
    const loop = () => { cur.style.left = `calc(${wave((this.g.serverNow() - t.startedAt) / t.periodMs) * 100}% - 4px)`; if (!done) raf = requestAnimationFrame(loop); }; loop();
    const stop = h('button', { class: 'btn big alt', onclick: async () => { if (done) { this.mgOpen = false; back(); return; } done = true; const r = await this.guard(() => post('/api/jobs/task/stop')); cancelAnimationFrame(raf); if (r) { cur.style.left = `calc(${r.pos * 100}% - 4px)`; res.textContent = r.hit ? say('hit', r.bonusPct) : say('miss'); this.sfx(r.hit ? 'coin' : 'bad'); stop.textContent = 'Back to work'; } else { this.mgOpen = false; back(); } } }, 'STOP!');
    this.setSheetBody(h('div', { class: 'minigame' }, h('p', { class: 'mut' }, 'Stop the gold bar inside the green zone. One try per shift.'), bar, res, stop));
  }

  // ----- houses: the house card
  async houseBlock(el, propertyId) {
    const g = this.g; const d = await this.guard(() => get('/api/properties')); if (!d) return; g.props = d.properties; g.world.setMarkers(d.properties); const p = d.properties.find(x => x.id === propertyId); if (!p) return; const T = g.cfg.maxNameLen;
    const mine = p.status === 'yours'; const dotLabel = { home: "They're home right now", online: 'Online, but out and about', away: 'Not around right now' }[p.presence];
    const title = p.owner ? `@${p.owner}'s ${p.name}` : `${p.baseName}`;
    const nameRow = mine ? h('div', { class: 'row' }, h('button', { class: 'btn small ghost', onclick: () => this.rename(p, () => this.houseBlock(el, propertyId)) }, '✏️ Rename'), h('span', { class: 'mut' }, `max ${T} characters`)) : '';
    const near = Math.hypot(g.ctrl.x - p.door.x, g.ctrl.z - p.door.z) < 30; const kids = [];
    kids.push(h('div', { class: 'row' }, p.owner ? h('div', { class: 'avatar', style: `background:${p.ownerColor || '#2e9b5e'}` }, p.owner[0].toUpperCase()) : h('div', { class: 'avatar', style: 'background:#8a8f98' }, '🏠'),
      h('div', {}, h('b', { style: 'font-size:18px' }, title), h('div', { class: 'mut' }, `${p.tierLabel} · ${p.area}`))));
    if (p.owner) kids.push(h('div', { class: 'row sp' }, h('span', {}, h('span', { class: `dot ${p.presence}` }), dotLabel), h('span', { class: 'tag' }, `${p.items} items`)));
    kids.push(nameRow);
    if (mine) kids.push(h('p', { class: 'mut' }, 'Your name is on the house. Other players can read it from the street.'));
    if (mine && (g.cfg.facades || []).length) {
      kids.push(h('div', { class: 'mut' }, 'Paint the outside'));
      kids.push(h('div', { class: 'swatches' }, g.cfg.facades.map(c => h('button', { class: `sw ${p.facade === c.hex ? 'on' : ''}`, title: c.name, style: `background:${c.hex}`, onclick: async () => { const r = await this.guard(() => post('/api/property/facade', { propertyId: p.id, color: c.id, idemKey: crypto.randomUUID?.() })); if (r) { g.update(r.user); this.toast(r.charged ? `Outside painted. −${fmtN(r.charged)}` : 'Already that colour.', 'money'); g.refreshProps(); this.houseBlock(el, propertyId); } } }))));
    }
    if (mine) {
      kids.push(h('div', { class: 'row' }, h('span', { class: 'tag green' }, p.mode === 'own' ? 'You own this' : `Rent ${fmtN(p.rent)}/day`), p.nextRentDue ? h('span', { class: 'mut' }, `next rent ${new Date(p.nextRentDue).toLocaleString('en-NG', { weekday: 'short', hour: 'numeric', minute: '2-digit' })}`) : ''));
      kids.push(h('div', { class: 'row' }, h('button', { class: 'btn', onclick: () => { this.closeSheet(); g.enterHome(); } }, '🚪 Go inside'), h('button', { class: 'btn ghost', onclick: () => this.confirm(p.mode === 'own' ? `Sell for about 70% of what you paid?` : 'Move out? (no refund)', async () => { const r = await this.guard(() => post('/api/property/release')); if (r) { g.update(r.user); this.toast(r.refund ? say('sold', r.refund) : 'You moved out.'); this.houseBlock(el, propertyId); } }) }, p.mode === 'own' ? 'Sell house' : 'Move out')));
    } else if (p.owner) {
      kids.push(h('div', { class: 'row' }, h('button', { class: 'btn', disabled: p.presence !== 'home' || !near, onclick: () => this.knock(p) }, '🏠 Visit'), h('button', { class: 'btn ghost', onclick: () => this.message(p.owner) }, '💬 Message'), h('button', { class: 'btn ghost small', title: 'Mute, block or report', onclick: () => this.playerMenu(p.owner, p.hasCustomName && !p.nameHidden ? { kind: 'house_name', target: p.id, text: `${p.owner}'s "${p.name}"` } : null) }, '⋯')));
      kids.push(h('div', { class: 'mut' }, "You can only drop by when they're home" + (near ? '.' : ' and you are at the door.')));
    } else {
      kids.push(h('p', { class: 'mut' }, `${p.rooms} room(s). Rent ${fmtN(p.rent)} per day (first day paid up front)${p.price ? ` · or buy for ${fmtN(p.price)}` : ' · rent only'}.`));
      kids.push(h('div', { class: 'row' }, h('button', { class: 'btn', disabled: !near, onclick: () => this.review(p, 'rent', () => this.houseBlock(el, propertyId)) }, `Rent · ${fmtN(p.rent)}`), p.price ? h('button', { class: 'btn alt', disabled: !near, onclick: () => this.review(p, 'own', () => this.houseBlock(el, propertyId)) }, `Buy · ${fmtN(p.price)}`) : ''));
      if (!near) kids.push(h('div', { class: 'mut' }, 'Get to the door first (use the travel chips below).'));
    }
    el.replaceChildren(...kids);
  }
  review(p, mode, done) { const cost = mode === 'own' ? p.price : p.rent; const body = h('div', {}, h('h3', {}, 'Review'), h('p', {}, `${p.baseName} · ${p.tierLabel} · ${p.area}`), h('p', {}, mode === 'own' ? `Price ${fmtN(cost)} (one-off). You can sell back later for about 70%.` : `Rent ${fmtN(cost)} per day. Day 1 is paid now. Miss ${this.g.cfg.evictAfter || 2} rent days and you are evicted.`), h('div', { class: 'row' }, h('button', { class: 'btn alt', onclick: async () => { const r = await this.guard(() => post('/api/property/acquire', { propertyId: p.id, mode, idem: crypto.randomUUID?.() || String(Math.random()), pos: this.g.pos() })); if (r) { this.g.update(r.user); this.toast(say('home'), 'money'); this.sfx('ok'); done(); this.g.refreshProps(); } } }, `Pay ${fmtN(cost)}`), h('button', { class: 'btn ghost', onclick: done }, 'Back'))); this.setSheetBody(body); }
  // Always open the sheet — chips (tow, etc.) call this while the sheet is closed; setSheetBody alone would write into a hidden panel.
  confirm(text, yes) {
    this.openSheet('Confirm', h('div', {},
      h('p', {}, text),
      h('div', { class: 'row' },
        h('button', { class: 'btn red', onclick: () => yes?.() }, 'Yes'),
        h('button', { class: 'btn ghost', onclick: () => this.closeSheet() }, 'Cancel'))));
  }
  rename(p, done) { const T = this.g.cfg.maxNameLen; const inp = h('input', { class: 'sheet-input', maxlength: T, value: p.name }); this.setSheetBody(h('div', {}, h('h3', {}, 'Name your house'), inp, h('p', { class: 'mut' }, `3-${T} characters. Rude names get refused.`), h('div', { class: 'row' }, h('button', { class: 'btn', onclick: async () => { const r = await this.guard(() => post('/api/property/name', { name: inp.value })); if (r) { this.g.update(r.user); this.toast(`Your house is now "${r.name}"`, 'money'); this.g.refreshProps(); done(); } } }, 'Save'), h('button', { class: 'btn ghost', onclick: done }, 'Cancel')))); inp.focus(); inp.select(); }
  message(to) { const inp = h('input', { class: 'sheet-input', maxlength: 140, placeholder: `Message @${to}…` }); this.setSheetBody(h('div', {}, h('h3', {}, `Message @${to}`), inp, h('div', { class: 'row' }, h('button', { class: 'btn', onclick: async () => { const r = await this.guard(() => post('/api/dm', { to, text: inp.value })); if (r) { this.toast('Message sent.'); this.closeSheet(); } } }, 'Send'), h('button', { class: 'btn ghost', onclick: () => this.closeSheet() }, 'Cancel')))); inp.focus(); }
  async knock(p) {
    const r = await this.guard(() => post('/api/visit/knock', { propertyId: p.id, pos: this.g.pos() })); if (!r) return; this.sfx('knock'); const g = this.g; let alive = true;
    const left = h('b', {}); const body = h('div', { style: 'text-align:center' }, h('h3', {}, 'Knock knock…'), h('p', {}, `Waiting for @${r.owner} to open the door of ${r.name}`), h('p', {}, left), h('button', { class: 'btn ghost', onclick: async () => { alive = false; await post('/api/visit/cancel').catch(() => {}); this.closeSheet(); } }, 'Walk away'));
    this.setSheetBody(body); this.onClose = () => { alive = false; }; const t0 = Date.now();
    const poll = async () => { if (!alive || !this.sheetOpen) return; left.textContent = `${Math.max(0, Math.ceil((r.expiresAt - g.serverNow()) / 1000))}s`; const k = g.lastKnocks?.mine; if (k && k.id === r.knockId) { if (k.status === 'accepted') { alive = false; this.closeSheet(); this.toast('Come in!', 'money'); g.enterAsVisitor(p.id); return; } if (k.status === 'declined') { alive = false; body.replaceChildren(h('p', {}, `@${r.owner} isn't receiving visitors right now. 🚪`), h('button', { class: 'btn', onclick: () => this.closeSheet() }, 'OK')); return; } if (k.status === 'expired') { alive = false; body.replaceChildren(h('p', {}, `No answer at @${r.owner}'s door.`), h('button', { class: 'btn', onclick: () => this.closeSheet() }, 'OK')); return; } } setTimeout(poll, 800); }; g.net.nudge(); poll();
  }
  // incoming knock prompt for the host
  hostKnock(k) { if (this.knockShown === k.id) return; this.knockShown = k.id; this.sfx('knock'); const el = h('div', { class: 'toast money', style: 'pointer-events:auto' }, h('div', {}, `🚪 @${k.from} is at your door!`), h('div', { class: 'row' }, h('button', { class: 'btn small', onclick: async () => { el.remove(); const r = await this.guard(() => post('/api/visit/respond', { knockId: k.id, accept: true })); if (r) this.toast(`@${k.from} is coming in.`); } }, 'Let in'), h('button', { class: 'btn small red', onclick: async () => { el.remove(); await this.guard(() => post('/api/visit/respond', { knockId: k.id, accept: false })); } }, 'Not now'))); $('#toasts').append(el); setTimeout(() => el.remove(), Math.max(1000, k.expiresAt - this.g.serverNow())); }

  // ----- land plots
  async plotBlock(el, plotId) {
    const g = this.g; const d = await this.guard(() => get('/api/plots')); if (!d) return; const p = d.plots.find(x => x.id === plotId); if (!p) return; g.plots = d.plots; const near = Math.hypot(g.ctrl.x - p.x, g.ctrl.z - p.z) < p.size / 2 + 25;
    const riskTag = h('span', { class: `tag ${p.risk === 'high' ? 'red' : p.risk === 'medium' ? 'amber' : 'green'}` }, `Omo-onile risk: ${p.risk}`);
    const kids = [h('div', { class: 'row' }, h('b', {}, p.name), riskTag), h('div', { class: 'row' }, h('span', { class: 'tag' }, `${p.sqm} sqm`), h('span', { class: 'tag green' }, `📈 ~${p.growthPerWeekPct}%/week (ESTIMATE)`)), h('div', { class: 'mut' }, 'Prices, growth and risk are placeholders for testing. Land value compounds over real days; omo-onile may demand a levy.')];
    if (p.status === 'yours') kids.push(h('p', {}, `Your plot. Value now ${fmtN(p.value)} · sell for ${fmtN(p.sellValue)}`), h('button', { class: 'btn red', onclick: () => this.confirm(`Sell for ${fmtN(p.sellValue)}?`, async () => { const r = await this.guard(() => post('/api/plot/sell', { plotId })); if (r) { g.update(r.user); this.toast(say('sold', r.value), 'money'); this.plotBlock(el, plotId); this.closeSheet(); } }) }, 'Sell plot'));
    else if (p.status === 'taken') kids.push(h('p', { class: 'mut' }, `Owned by @${p.owner}.`));
    else kids.push(h('p', {}, `Price ${fmtN(p.price)}`), h('button', { class: 'btn alt', disabled: !near, onclick: () => this.setSheetBody(h('div', {}, h('h3', {}, 'Review'), h('p', {}, `${p.name} · ${p.area} · ${p.sqm} sqm`), h('p', {}, `Price ${fmtN(p.price)}. ${p.risk === 'high' ? 'Omo-onile risk is HIGH: expect levy demands.' : p.risk === 'medium' ? 'Some omo-onile risk.' : 'Documents are clean (low risk).'}`), h('div', { class: 'row' }, h('button', { class: 'btn alt', onclick: async () => { const r = await this.guard(() => post('/api/plot/buy', { plotId, idem: crypto.randomUUID?.() || String(Math.random()), pos: g.pos() })); if (r) { g.update(r.user); this.toast(say('plot'), 'money'); this.closeSheet(); } } }, `Pay ${fmtN(p.price)}`), h('button', { class: 'btn ghost', onclick: () => this.closeSheet() }, 'Back')))) }, 'Buy plot'), near ? '' : h('div', { class: 'mut' }, 'Walk up to the plot first.'));
    el.replaceChildren(...kids);
  }

  // ----- billboards
  async board(slotId) {
    const g = this.g; const win = Math.floor(g.serverNow() / g.ads.rot); const cur = g.ads.currentFor(slotId, win); const def = g.world.boards[slotId].def;
    const kids = [h('div', { class: 'mut' }, `${{ road_billboard: 'Road billboard', airport_board: 'Airport board', carpark_board: 'Car park board', lagoon_plot: 'Lagoon plot' }[def.surface]} · ${slotId}`)];
    if (cur) { kids.push(h('h3', {}, cur.b), cur.h ? h('p', {}, cur.h) : '', h('span', { class: 'tag amber' }, 'Sponsored'), h('div', { class: 'row' }, h('button', { class: 'btn ghost small', onclick: () => this.reportSheet('ad_creative', cur.i ? `${cur.c}:${cur.i}` : cur.c, `${cur.b}${cur.h ? ': ' + cur.h : ''}`) }, '🚩 Report this ad'), h('button', { class: 'btn alt', onclick: async () => { const r = await this.guard(() => post('/api/ads/tap', { campaign: cur.c, slot: slotId, pos: g.pos() })); if (r) { window.open(r.path, '_blank', 'noopener'); this.toast(`Opening ${r.brand}'s page in a new tab.`); } } }, 'Visit advertiser'))); }
    else kids.push(h('h3', {}, 'Your ad here'), h('p', {}, 'This board is free. Brands rent boards at /advertise (test mode).'), h('a', { href: '/advertise', target: '_blank', rel: 'noopener', class: 'btn' }, 'Advertise on this board'));
    this.openSheet('Billboard', kids);
  }

  // ---------- phone ----------
  phone(tab) {
    this.g.tutorial?.ack('phone');
    // Prefer iPhone chrome whenever PhoneSys exists (cfg.phone gates APIs, not the shell).
    if (this.g.phone2) { this.shell ||= new PhoneShell(this); return this.shell.open(tab || 'home'); }
    return this.phoneLegacy(tab || 'wallet');
  }
  phoneLegacy(tab = 'wallet') {
    // Fallback only: icon grid (no horizontal scroll chip row).
    const tabs = [['wallet', '💰', 'Wallet'], ['jobs', '💼', 'Jobs'], ['home', '🏠', 'Home'], ['land', '🌍', 'Land'], ['ranks', '🏆', 'Ranks'], ['missions', '🎯', 'Missions'], ['me', '🏅', 'Me'], ['safe', '🛡', 'Safety'], ['garage', '🚗', 'Garage'], ['games', '🎮', 'Games'], ['map', '🗺', 'Map'], ['alerts', '🔔', 'Alerts'], ['more', '⚙️', 'More']];
    const body = h('div', {}); let cur = tab;
    const bar = h('div', { class: 'phone-grid' });
    const drawTabs = () => bar.replaceChildren(...tabs.map(([id, ico, l]) => h('button', { class: 'pgrid-btn' + (id === cur ? ' on' : ''), onclick: () => { cur = id; drawTabs(); render(); } }, h('span', { class: 'pgrid-ico' }, ico), h('span', {}, l))));
    const render = async () => { body.replaceChildren(h('p', { class: 'mut' }, 'Loading…')); const fn = this['tab_' + cur]; const el = await fn.call(this); body.replaceChildren(...[].concat(el)); };
    drawTabs(); this.openSheet('Phone', [bar, body]); render();
  }
  async tab_wallet() {
    const g = this.g; const u = g.user; const rows = await this.guard(() => get('/api/ledger')); const cashIn = h('input', { class: 'sheet-input', type: 'number', min: 100, placeholder: 'Amount ₦' }); const to = h('input', { class: 'sheet-input', placeholder: 'Send to @username' });
    const bank = (dir) => async () => { const r = await this.guard(() => post('/api/bank', { dir, amount: Math.floor(Number(cashIn.value)), idem: crypto.randomUUID?.() || String(Math.random()) })); if (r) { g.update(r.user); this.toast(dir === 'deposit' ? 'Saved in the bank.' : 'Withdrawn.', 'money'); this.setSheetBody([]); this.phone('wallet'); } };
    return [h('div', { class: 'row sp' }, h('div', {}, h('div', { class: 'mut' }, 'Cash'), h('b', { style: 'font-size:26px' }, fmtN(u.cash))), h('div', {}, h('div', { class: 'mut' }, 'Savings (≈0.5%/day, ESTIMATE)'), h('b', { style: 'font-size:22px' }, fmtN(u.savings))), h('div', {}, h('div', { class: 'mut' }, 'Net worth'), h('b', {}, fmtN(u.netWorth)))),
      cashIn, h('div', { class: 'row' }, h('button', { class: 'btn', onclick: bank('deposit') }, 'Save'), h('button', { class: 'btn ghost', onclick: bank('withdraw') }, 'Withdraw'), h('button', { class: 'btn alt', onclick: async () => { const r = await this.guard(() => post('/api/transfer', { to: to.value.replace('@', ''), amount: Math.floor(Number(cashIn.value)), idem: crypto.randomUUID?.() || String(Math.random()) })); if (r) { g.update(r.user); this.toast('Sent!', 'money'); } } }, 'Send money')), to,
      h('p', { class: 'mut' }, 'Transfers are capped and rate-limited. New accounts wait a few minutes. Guests cannot send money.'),
      h('div', { class: 'card', style: 'box-shadow:none;border:2px dashed #cfc8ac;padding:12px;margin:10px 0' }, h('b', {}, 'Test top-up'), h('div', { class: 'mut' }, 'TEST MODE: adds pretend ₦, no payment is taken. Paid test purchases are below.'), h('div', { class: 'chips' }, (g.cfg.topupOptions || []).map(a => h('button', { class: 'chip', onclick: async () => { const r = await this.guard(() => post('/api/topup/test', { amount: a, idem: crypto.randomUUID?.() || String(Math.random()) })); if (r) { g.update(r.user); this.toast(`+${fmtN(a)} (test)`, 'money'); } } }, `+${fmtN(a)}`)))),
      buyCard(this) || '',
      h('b', {}, 'Recent activity'), h('div', { class: 'list' }, (rows?.rows || []).slice(0, 12).map(r => h('div', {}, h('span', {}, r.reason.replaceAll('_', ' ')), h('b', { style: `color:${r.amount < 0 ? '#d6402f' : '#0b7a49'}` }, (r.amount > 0 ? '+' : '') + fmtN(r.amount)))))];
  }
  async tab_jobs() { const d = await this.guard(() => get('/api/jobs')); if (!d) return []; return [h('p', { class: 'mut' }, 'Tap a job to set a waypoint. Start shifts at the job location.'), h('div', { class: 'list' }, d.jobs.map(j => { const cap = j.dailySlots ? (j.slotsLeft === 0 && !j.onRoster ? ' · full today' : ` · ${j.slotsLeft} spots left`) : ''; const hours = j.maxHoursPerDay != null && j.hoursLeft != null ? ` · ${j.hoursLeft}h left today` : ''; return h('div', {}, h('div', {}, h('b', {}, j.name), h('div', { class: 'mut' }, `${fmtN(j.wage)} · ${durLabel(j.durationSec)} · ${j.place}${cap}${hours}${j.locked ? ' · 🔒' : ''}`)), h('button', { class: 'btn small ghost', onclick: () => { this.g.setWaypoint(j.x, j.z, j.name); this.closeSheet(); } }, '📍')); }))]; }
  async tab_home() {
    const g = this.g; const u = g.user; const d = await this.guard(() => get('/api/properties')); if (!d) return []; g.props = d.properties; g.world.setMarkers(d.properties);
    if (u.home) return [h('h3', {}, u.home.name), h('div', { class: 'mut' }, `${u.home.tierLabel} · ${u.home.area}`), h('div', { class: 'row' }, h('button', { class: 'btn', onclick: () => { this.closeSheet(); g.setWaypoint(u.home.door.x, u.home.door.z, u.home.name); } }, '📍 Waypoint'), h('button', { class: 'btn alt', onclick: () => this.place(u.home.id) }, 'Open house card'))];
    return [h('p', { class: 'mut' }, 'Find a place: green arrows over doors mean available. Tap a house to rent or buy.'), h('div', { class: 'list' }, d.properties.filter(p => p.status === 'available').slice(0, 12).map(p => h('div', {}, h('div', {}, h('b', {}, p.baseName), h('div', { class: 'mut' }, `${p.tierLabel} · ${p.area} · ${fmtN(p.rent)}/day${p.price ? ` · buy ${fmtN(p.price)}` : ''}`)), h('button', { class: 'btn small ghost', onclick: () => this.place(p.id) }, 'View'))))];
  }
  async tab_land() { const d = await this.guard(() => get('/api/plots')); if (!d) return []; return [h('div', { class: 'list' }, d.plots.map(p => h('div', {}, h('div', {}, h('b', {}, p.name), h('div', { class: 'mut' }, `${p.area} · ${fmtN(p.price)} · risk ${p.risk} · ${p.status}`)), h('button', { class: 'btn small ghost', onclick: () => this.place(p.id) }, 'View'))))]; }
  async tab_ranks() { const d = await this.guard(() => get('/api/leaderboard')); if (!d) return []; return [h('p', { class: 'mut' }, 'Net worth = cash + savings + property (70%) + land (95%). Bots are hidden.'), h('div', { class: 'list' }, d.rows.map(r => h('div', {}, h('span', {}, `#${r.rank} ${r.name}${r.guest ? ' (guest)' : ''}`), h('b', {}, fmtN(r.netWorth)))))]; }
  openMap(focusId) { this.g.tutorial?.ack('map'); this.bigmap = this.bigmap || new CityMap(this.g); if (this.sheetOpen) this.closeSheet(); this.bigmap.isOpen ? this.bigmap.close() : this.bigmap.open(focusId); }
  async tab_map() { this.openMap(); return []; }
  async tab_games() { return casualUi.hub(this); }
  playCasual(id) { casualUi.play(this, id); }
  async tab_garage() {
    const d = await this.guard(() => get('/api/garage')); if (!d) return []; const g = this.g; const motors = g.city.places.find(p => p.id === 'venue_motors');
    const cars = d.cars.length ? h('div', { class: 'list' }, d.cars.map(c => h('div', {}, h('span', {}, `${c.active ? '✅ ' : ''}${c.name}`, h('small', { class: 'mut' }, ` · worth ${fmtN(c.value)} (paid ${fmtN(c.paid)}) · ${c.ageDays}d old · ${c.conditionLabel} ${c.condition}%`)), h('span', { class: 'row' }, c.active ? '' : h('button', { class: 'btn small', onclick: async () => { await this.guard(() => post('/api/garage/use', { carId: c.id })); this.phone('garage'); } }, 'Use'), h('button', { class: 'btn small ghost', onclick: () => this.confirm(`Sell ${c.name} for about ${fmtN(c.value)}?`, async () => { const r = await this.guard(() => post('/api/garage/sell', { carId: c.id, idemKey: crypto.randomUUID?.() })); if (r) { this.toast(`Sold for ${fmtN(r.value)}.`, 'money'); g.refreshMe(); } this.phone('garage'); }) }, 'Sell'))))) : h('p', { class: 'mut' }, 'No car of your own yet. You are using a borrowed car: higher cost per trip, slower, no mood perk.');
    return [h('div', { class: 'row sp' }, h('b', {}, `Garage (${d.cars.length}/${d.slots})`), h('span', { class: 'mut' }, `Driving: ${d.active.label}`)), cars, h('p', { class: 'mut' }, `Resale: about ${Math.round((1 - d.resale.firstDriveOffFraction) * 100)}% on day one, then about ${Math.round(d.resale.perDayDepreciation * 100)}% less per day, never below ${Math.round(d.resale.floorFraction * 100)}%. All figures are ESTIMATES.`), h('button', { class: 'btn', id: 'openGarage', onclick: () => g.garage.show() }, '🚪 Open my garage'), motors ? h('button', { class: 'btn alt', onclick: () => { this.closeSheet(); this.place(motors.id); } }, '🏪 Visit Motoka AutoMart Showroom') : ''];
  }
  async tab_alerts() { const d = await this.guard(() => get('/api/notifications')); this.g.markRead(); if (!d) return []; return [h('div', { class: 'list' }, d.rows.map(n => h('div', {}, h('span', {}, n.text), h('span', { class: 'mut' }, new Date(n.created_at).toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' })))))]; }
  async tab_me() { return meBody(this.g, () => this.phone('me')); }
  async tab_safe() { return safetyBody(this.g, () => this.phone('safe')); }
  async tab_missions() { return missionsBody(this.g, () => this.phone('missions')); }
  async tab_more() {
    const g = this.g; const bl = await this.guard(() => get('/api/social/blocks')); const blocked = h('div', { class: 'list' }, (bl?.rows || []).map(r => h('div', {}, h('span', {}, `@${r.username} · ${r.kind}`), h('button', { class: 'btn small ghost', onclick: async () => { await this.setBlock(r.username, null); this.phone('more'); } }, 'Undo')))); const wr = g.user?.wear; return [...graphicsBlock(g), ...soundBlock(g), h('b', {}, '💎 Your look'), h('p', { id: 'wearStatus', class: 'mut' }, wr ? `${wr.status}${wr.ownedCount ? ` · ${wr.ownedCount} pieces owned, worth ${fmtN(wr.ownedValue)}` : ''}. Buy more at the jewelry store and cap store.` : 'Nothing yet.'), h('b', {}, '🧭 Your choices'), h('p', { id: 'choicesStatus', class: 'mut' }, g.user?.signup?.done ? `City: ${g.user.signup.homeCity}${g.user.signup.interestCity ? ` · interested in ${g.user.signup.interestCity}` : ''} · ${g.user.signup.interests.length} interests` : 'Not set yet.'), h('div', { class: 'row' }, h('button', { class: 'btn small', 'data-more': 'choices', onclick: async () => { g.ui.closeSheet?.(); await setupFlow(g, { editing: true }); } }, 'Change my choices'), h('button', { class: 'btn small alt', 'data-more': 'apply', onclick: () => officeSheet(g, 'apply') }, 'Apply to join the team'), h('button', { class: 'btn small ghost', 'data-more': 'idea', onclick: () => officeSheet(g, 'ideas') }, 'Share an idea'), h('button', { class: 'btn small ghost', 'data-more': 'tutorial', onclick: () => { g.ui.closeSheet?.(); g.tutorial?.restart(); } }, 'Replay the tutorial')), h('b', {}, '🔐 Your data'), h('p', { class: 'mut' }, 'See everything we hold about you, or close your account.'), h('div', { class: 'row' }, h('button', { class: 'btn small ghost', 'data-more': 'download', onclick: () => downloadData(g) }, 'Download my data'), h('button', { class: 'btn small red', 'data-more': 'close', onclick: () => closeAccountSheet(g) }, 'Close my account')), h('b', {}, 'Muted and blocked'), (bl?.rows || []).length ? blocked : h('p', { class: 'mut' }, 'Nobody. Tap a chat line or the ⋯ on a house card to mute, block or report.'), h('div', { class: 'row' }, h('a', { class: 'btn ghost', href: '/advertise', target: '_blank', rel: 'noopener' }, 'Advertise'), h('a', { class: 'btn ghost', href: '/methodology', target: '_blank', rel: 'noopener' }, 'How ads are counted'), h('a', { class: 'btn ghost', href: '/stats.html', target: '_blank', rel: 'noopener' }, 'Stats')),
      h('p', { class: 'mut' }, `${g.cfg.name} v0 · test build. In-game ₦ is fictional with no cash-out. 18+.`), h('div', { class: 'row' }, h('button', { class: 'btn red', onclick: () => g.logout() }, 'Log out'))];
  }
}
const dist2 = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const typeLabel = (t) => ({ venue: 'Place to hang out', shop: 'Shop', job: 'Work', house: 'House', plot: 'Land plot', landmark: 'Landmark' }[t] || t);
const placeKindLabel = (pl) => {
  if (pl.kind === 'armoury' || pl.id === 'venue_armoury') return 'Armoury';
  if (pl.kind === 'mosque' || (pl.id && String(pl.id).startsWith('venue_mosque'))) return 'Mosque';
  if (pl.kind === 'church' || pl.id === 'venue_church') return 'Church';
  if (pl.id === 'venue_motors') return 'Car showroom';
  if (pl.id === 'venue_meco' || pl.id === 'venue_meko') return 'Garage';
  return typeLabel(pl.type);
};
Object.assign(UI.prototype, lifeUi); // Track G: City life app (businesses, market, clubs, events, pass)
