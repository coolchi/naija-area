import { get, post, fmtN, h, $, $$, ApiError } from './api.js';
import * as casualUi from './casual.js';
import { CityMap } from './map.js';

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
const ERR = { INSUFFICIENT_FUNDS: () => pick(['Your pocket dry o. Money no reach.', 'No cash for that one. Go hustle first!']), TOO_FAR: () => pick(['You dey far o. Move closer.', 'Walk go there first, oga.']), TOO_TIRED: () => 'You don tire. Eat or rest first!', TOO_HUNGRY: () => 'Hunger dey vex you. Buy food first.', BLOCKED: () => 'Something is in the way.', COOLDOWN: null, LOGIN_REQUIRED: () => 'Session don end. Please log in again.' };
export const say = (k, ...a) => LINES[k](...a);

export class UI {
  constructor(game) {
    this.g = game; this.sheetOpen = false; this.onClose = null; this.mm = $('#minimap').getContext('2d'); $('#minimap').style.cursor = 'pointer'; $('#minimap').title = 'Open the full map (M)'; $('#minimap').addEventListener('click', () => this.openMap()); this.chatOn = false; this.sfxOn = true; this.actx = null;
    $('#sheetX').onclick = () => this.closeSheet(); $('#sheetWrap').addEventListener('pointerdown', (e) => { if (e.target.id === 'sheetWrap') this.closeSheet(); });
    $('#phoneBtn').onclick = () => this.phone(); $('#muteBtn').onclick = () => { this.sfxOn = !this.sfxOn; $('#muteBtn').textContent = this.sfxOn ? '🔊' : '🔇'; };
    $('#carBtn').onclick = () => game.toggleCar();
    $('#chatForm').addEventListener('submit', async (e) => { e.preventDefault(); const i = $('#chatInput'); const t = i.value.trim(); if (!t) return this.hideChat(); i.value = ''; this.hideChat(); try { await post('/api/chat', { text: t }); } catch (er) { this.error(er); } });
    addEventListener('keydown', (e) => {
      if (e.target.closest('input,textarea')) { if (e.key === 'Escape') { this.hideChat(); e.target.blur(); } return; }
      if (e.key === 'Escape') { if (this.sheetOpen) this.closeSheet(); }
      if (!game.playing) return; const k = e.key.toLowerCase();
      if (k === 't' || k === 'enter') { e.preventDefault(); this.showChat(); } else if (k === 'p') this.phone(); else if (k === 'm') this.openMap(); else if (k === 'c') game.toggleCar(); else if (k === 'f' || k === ' ') { if (!this.sheetOpen) game.doAction(); }
    });
    $('#actionBtn').onclick = () => game.doAction();
  }
  // ---------- audio (tiny WebAudio blips, no assets) ----------
  sfx(kind) {
    if (!this.sfxOn) return; try { this.actx ||= new (window.AudioContext || window.webkitAudioContext)(); const c = this.actx; const o = c.createOscillator(), gn = c.createGain(); o.connect(gn); gn.connect(c.destination);
      const T = { coin: [[880, .07], [1320, .12]], ok: [[520, .08], [780, .1]], bad: [[180, .18]], horn: [[330, .22], [330, .22]], thunk: [[110, .09]], knock: [[140, .06], [140, .06], [140, .06]] }[kind] || [[600, .08]]; let t = c.currentTime;
      o.type = kind === 'horn' ? 'sawtooth' : 'triangle'; gn.gain.setValueAtTime(0.08, t); for (const [f, d] of T) { o.frequency.setValueAtTime(f, t); t += d; } gn.gain.exponentialRampToValueAtTime(0.0001, t + 0.05); o.start(); o.stop(t + 0.08); } catch { /* audio is optional */ }
  }
  haptic(ms = 15) { try { navigator.vibrate?.(ms); } catch { /* optional */ } }
  toast(text, kind = '') { const el = h('div', { class: `toast ${kind}` }, text); const box = $('#toasts'); box.append(el); while (box.children.length > 3) box.firstChild.remove(); setTimeout(() => el.remove(), 4300); if (kind === 'bad') this.sfx('bad'); else if (kind === 'money') { this.sfx('coin'); this.haptic(); } }
  error(e) { if (e instanceof ApiError) { if (e.status === 401 && e.code === 'LOGIN_REQUIRED') { this.g.sessionLost(); return; } const f = ERR[e.code]; this.toast(f ? f() : e.message, 'bad'); } else { console.error(e); this.toast('Something went wrong. Try again.', 'bad'); } }
  showChat() { $('#chatForm').classList.add('on'); $('#chatInput').focus(); } hideChat() { $('#chatForm').classList.remove('on'); $('#game').focus(); }
  addChat(u, t, id) { const d = h('div', { style: 'pointer-events:auto;cursor:pointer', title: 'Tap to report, mute or block', onclick: () => this.playerMenu(u, id && { kind: 'chat', target: id, text: `${u}: ${t}` }) }, `${u}: ${t}`); $('#chatlog').append(d); while ($('#chatlog').children.length > 5) $('#chatlog').firstChild.remove(); setTimeout(() => d.remove(), 14000); }

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
  hud(u) {
    $('#cash').textContent = fmtN(u.cash); $('#sav').textContent = '🏦 ' + fmtN(u.savings); $('#energyBar').style.width = u.energy + '%'; $('#hungerBar').style.width = u.hunger + '%'; $('#moodBar').style.width = (u.mood ?? 60) + '%'; $('#moodBar').style.background = (u.mood ?? 60) >= this.g.cfg.moodHappyAt ? '#f7c948' : '#e58fb3';
    $('#energyBar').style.background = u.energy < 20 ? '#d6402f' : '#35c46b'; $('#hungerBar').style.background = u.hunger < 20 ? '#d6402f' : '#f29a2e';
    const sb = $('#shiftbar'); if (u.shift) { const j = this.g.cfg.jobs?.find(x => x.id === u.shift.jobId); const left = Math.max(0, u.shift.endsAt - this.g.serverNow()); sb.classList.remove('hidden'); sb.textContent = left > 0 ? `💼 ${j?.name || 'Shift'} · ${Math.ceil(left / 1000)}s left` : `💼 ${j?.name || 'Shift'} done: collect your pay!`; } else sb.classList.add('hidden');
  }
  clock(w) { const h12 = ((w.hour + 11) % 12) + 1; const night = w.hour < 6 || w.hour >= 19; $('#clock').textContent = `${night ? '🌙' : '🌞'} ${h12}:${String(w.minute).padStart(2, '0')} ${w.hour >= 12 ? 'PM' : 'AM'} · Day ${w.day}`; }
  badge(n) { const b = $('#phoneBadge'); b.textContent = n; b.classList.toggle('hidden', !n); }
  loc(text) { $('#loc').textContent = text; }
  waypoint(wp, d) { const el = $('#waypoint'); if (!wp) return el.classList.add('hidden'); el.classList.remove('hidden'); el.textContent = `📍 ${wp.label} · ${Math.round(d)} m`; }
  action(label) { const b = $('#actionBtn'); if (!label) return b.classList.add('hidden'); b.classList.remove('hidden'); b.textContent = label; }
  minimap(ctrl, city, ghosts, wp, plotsOwned) {
    const c = this.mm, W = 300, S = W / 520; const B = city.bounds; const X = (x) => (x - B.minX) * S + 8, Z = (z) => (z - B.minZ) * S + 8; c.clearRect(0, 0, W, W); c.fillStyle = '#c9c3ad'; c.fillRect(0, 0, W, W);
    c.fillStyle = '#2b6f8a'; c.fillRect(0, Z(B.maxZ), W, W); c.fillStyle = '#3d4046'; for (const r of city.roads) { c.fillRect(X(Math.min(r.x1, r.x2)) - (r.x1 === r.x2 ? r.width * S / 2 : 0), Z(Math.min(r.z1, r.z2)) - (r.z1 === r.z2 ? r.width * S / 2 : 0), r.x1 === r.x2 ? r.width * S : Math.abs(r.x2 - r.x1) * S, r.z1 === r.z2 ? r.width * S : Math.abs(r.z2 - r.z1) * S); }
    c.fillStyle = '#8f8a79'; for (const b of city.buildings) c.fillRect(X(b.x - b.w / 2), Z(b.z - b.d / 2), b.w * S, b.d * S);
    c.fillStyle = '#ffc20e'; for (const s of city.shops) c.fillRect(X(s.x) - 3, Z(s.z) - 3, 6, 6); c.fillStyle = '#4aa3ff'; for (const j of city.jobs) c.fillRect(X(j.x) - 3, Z(j.z) - 3, 6, 6);
    c.fillStyle = '#35c46b'; for (const b of city.billboards) if (b.surface !== 'lagoon_plot') c.fillRect(X(b.x) - 2, Z(b.z) - 2, 4, 4);
    if (wp) { c.fillStyle = '#b44cff'; c.beginPath(); c.arc(X(wp.x), Z(wp.z), 7, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2; c.stroke(); }
    c.fillStyle = '#fff'; for (const g of ghosts.map.values()) if (g.root) { c.beginPath(); c.arc(X(g.root.position.x), Z(g.root.position.z), 3.5, 0, 7); c.fill(); }
    c.save(); c.translate(X(ctrl.x), Z(ctrl.z)); c.rotate(-ctrl.ry + Math.PI / 2); c.fillStyle = '#ff3b30'; c.beginPath(); c.moveTo(0, -8); c.lineTo(6, 7); c.lineTo(-6, 7); c.closePath(); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2; c.stroke(); c.restore();
  }

  // ---------- sheets ----------
  openSheet(title, body, onClose) { this.onClose = onClose || null; $('#sheetTitle').textContent = title; const b = $('#sheetBody'); b.replaceChildren(...[].concat(body)); $('#sheetWrap').classList.remove('hidden'); this.sheetOpen = true; this.g.ctrl.frozen = true; }
  setSheetBody(body) { $('#sheetBody').replaceChildren(...[].concat(body)); }
  closeSheet() { if (!this.sheetOpen) return; $('#sheetWrap').classList.add('hidden'); this.sheetOpen = false; this.g.ctrl.frozen = this.g.busy; clearInterval(this.tick); const f = this.onClose; this.onClose = null; f?.(); $('#game').focus(); }
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
      body.replaceChildren(h('div', { class: 'mut' }, `${pl.area} · ${typeLabel(pl.type)}`), info, goWrap); this.fillPlaceInfo(info, pl, q);
    }; render();
  }
  async go(pl, mode, q) {
    const g = this.g; if (mode.id === 'walk') { g.setWaypoint(pl.x, pl.z, pl.name); this.closeSheet(); this.toast(`Waypoint set: ${pl.name}. Follow the purple pin.`); return; }
    const r = await this.guard(() => post('/api/travel', { placeId: pl.id, mode: mode.id, pos: g.pos() })); if (!r) return; this.closeSheet(); g.update(r.user); g.runCommute(r, pl, q);
  }
  fillPlaceInfo(el, pl, q) {
    if (pl.type === 'shop') this.shopBlock(el, pl.id); else if (pl.type === 'job') this.jobBlock(el, pl.id); else if (pl.type === 'house') this.houseBlock(el, pl.id); else if (pl.type === 'plot') this.plotBlock(el, pl.id); else if (pl.type === 'venue') this.venueBlock(el, pl);
    else el.replaceChildren(h('p', { class: 'mut' }, pl.id === 'airport' ? 'Fast travel to other cities (Abuja, Port Harcourt) comes later. The airport also hosts premium ad boards.' : 'A public landmark. Wave to the neighbours.'));
  }

  venueBlock(el, pl) {
    const near = dist2(this.g.pos(), pl) < 16 + 4; const hrs = pl.hours ? `Open ${pl.hours[0]}:00 to ${pl.hours[1]}:00` : '';
    el.replaceChildren(h('p', { class: 'mut' }, hrs), h('p', {}, pl.id === 'venue_motors' ? 'Look at the cars, compare running costs and buy one. Placeholder prices are ESTIMATES.' : pl.id === 'venue_meco' ? 'Meco fixes cars. Check your car, or pay a placeholder (ESTIMATE) fee for a quick service.' : 'Step inside to eat, chat, and play Whot or Ayo against other players. 🎲 Game money only.'),
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
        return h('div', { class: 'card', style: 'margin:8px 0;padding:12px;box-shadow:none;border:2px solid #e3dcc2' }, h('div', { class: 'row sp' }, h('b', {}, j.name), h('span', { class: 'tag amber' }, `${fmtN(j.wage)} / ${j.durationSec}s`)), h('div', { class: 'mut' }, j.desc),
          h('div', { class: 'mut' }, `⚡ -${j.energyCost}  🍲 -${j.hungerCost}  · cooldown ${j.cooldownSec}s${j.locked ? ` · 🔒 ${j.shiftsNeeded} more shift(s) to unlock` : ''}`),
          active ? h('div', {}, h('div', { class: 'progress' }, h('i', { style: `width:${Math.min(100, 100 - (left / (j.durationSec * 10)))}%` })), left > 0 ? h('div', { class: 'mut' }, `${Math.ceil(left / 1000)}s left`) : '',
              h('div', { class: 'row' }, h('button', { class: 'btn alt', onclick: () => this.miniGame(draw) }, '🎯 Quick task (+25%)'), h('button', { class: 'btn', disabled: left > 0, onclick: async () => { const r = await this.guard(() => post('/api/jobs/claim')); if (r) { g.update(r.user); this.toast(say('wage', r.wage), 'money'); draw(); } } }, left > 0 ? 'Working…' : 'Collect pay')))
            : h('button', { class: 'btn', style: 'margin-top:6px', disabled: j.locked || !!shift || j.cooldownLeftMs > 0, onclick: async () => { const r = await this.guard(() => post('/api/jobs/start', { jobId: j.id, pos: g.pos() })); if (r) { g.update(r.user); this.toast(say('shiftStart')); draw(); } } }, j.cooldownLeftMs > 0 ? `Break (${Math.ceil(j.cooldownLeftMs / 1000)}s)` : shift ? 'Finish your shift first' : 'Start shift')); });
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
  confirm(text, yes) { this.setSheetBody(h('div', {}, h('p', {}, text), h('div', { class: 'row' }, h('button', { class: 'btn red', onclick: yes }, 'Yes'), h('button', { class: 'btn ghost', onclick: () => this.closeSheet() }, 'Cancel')))); }
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
    const kids = [h('div', { class: 'mut' }, `${{ road_billboard: 'Road billboard', airport_board: 'Airport board', lagoon_plot: 'Lagoon plot' }[def.surface]} · ${slotId}`)];
    if (cur) { kids.push(h('h3', {}, cur.b), cur.h ? h('p', {}, cur.h) : '', h('span', { class: 'tag amber' }, 'Sponsored'), h('div', { class: 'row' }, h('button', { class: 'btn ghost small', onclick: () => this.reportSheet('ad_creative', cur.c, `${cur.b}${cur.h ? ': ' + cur.h : ''}`) }, '🚩 Report this ad'), h('button', { class: 'btn alt', onclick: async () => { const r = await this.guard(() => post('/api/ads/tap', { campaign: cur.c, slot: slotId, pos: g.pos() })); if (r) { window.open(r.path, '_blank', 'noopener'); this.toast(`Opening ${r.brand}'s page in a new tab.`); } } }, 'Visit advertiser'))); }
    else kids.push(h('h3', {}, 'Your ad here'), h('p', {}, 'This board is free. Brands rent boards at /advertise (test mode).'), h('a', { href: '/advertise', target: '_blank', rel: 'noopener', class: 'btn' }, 'Advertise on this board'));
    this.openSheet('Billboard', kids);
  }

  // ---------- phone ----------
  phone(tab = 'wallet') {
    const g = this.g; const tabs = [['wallet', '💰 Wallet'], ['jobs', '💼 Jobs'], ['home', '🏠 Home'], ['land', '🌍 Land'], ['ranks', '🏆 Ranks'], ['garage', '🚗 Garage'], ['games', '🎮 Games'], ['map', '🗺 Map'], ['alerts', '🔔 Alerts'], ['more', '⚙️ More']]; const body = h('div', {}); let cur = tab;
    const bar = h('div', { class: 'tabrow' }); const drawTabs = () => bar.replaceChildren(...tabs.map(([id, l]) => h('button', { class: id === cur ? 'on' : '', onclick: () => { cur = id; drawTabs(); render(); } }, l)));
    const render = async () => { body.replaceChildren(h('p', { class: 'mut' }, 'Loading…')); const fn = this['tab_' + cur]; const el = await fn.call(this); body.replaceChildren(...[].concat(el)); };
    drawTabs(); this.openSheet('Phone', [bar, body]); render();
  }
  async tab_wallet() {
    const g = this.g; const u = g.user; const rows = await this.guard(() => get('/api/ledger')); const cashIn = h('input', { class: 'sheet-input', type: 'number', min: 100, placeholder: 'Amount ₦' }); const to = h('input', { class: 'sheet-input', placeholder: 'Send to @username' });
    const bank = (dir) => async () => { const r = await this.guard(() => post('/api/bank', { dir, amount: Math.floor(Number(cashIn.value)), idem: crypto.randomUUID?.() || String(Math.random()) })); if (r) { g.update(r.user); this.toast(dir === 'deposit' ? 'Saved in the bank.' : 'Withdrawn.', 'money'); this.setSheetBody([]); this.phone('wallet'); } };
    return [h('div', { class: 'row sp' }, h('div', {}, h('div', { class: 'mut' }, 'Cash'), h('b', { style: 'font-size:26px' }, fmtN(u.cash))), h('div', {}, h('div', { class: 'mut' }, 'Savings (≈0.5%/day, ESTIMATE)'), h('b', { style: 'font-size:22px' }, fmtN(u.savings))), h('div', {}, h('div', { class: 'mut' }, 'Net worth'), h('b', {}, fmtN(u.netWorth)))),
      cashIn, h('div', { class: 'row' }, h('button', { class: 'btn', onclick: bank('deposit') }, 'Save'), h('button', { class: 'btn ghost', onclick: bank('withdraw') }, 'Withdraw'), h('button', { class: 'btn alt', onclick: async () => { const r = await this.guard(() => post('/api/transfer', { to: to.value.replace('@', ''), amount: Math.floor(Number(cashIn.value)), idem: crypto.randomUUID?.() || String(Math.random()) })); if (r) { g.update(r.user); this.toast('Sent!', 'money'); } } }, 'Send money')), to,
      h('p', { class: 'mut' }, 'Transfers are capped and rate-limited. New accounts wait a few minutes. Guests cannot send money.'),
      h('div', { class: 'card', style: 'box-shadow:none;border:2px dashed #cfc8ac;padding:12px;margin:10px 0' }, h('b', {}, 'Test top-up'), h('div', { class: 'mut' }, 'TEST MODE: adds pretend ₦, no payment is taken. Real payments (Monipay) come later.'), h('div', { class: 'chips' }, (g.cfg.topupOptions || []).map(a => h('button', { class: 'chip', onclick: async () => { const r = await this.guard(() => post('/api/topup/test', { amount: a, idem: crypto.randomUUID?.() || String(Math.random()) })); if (r) { g.update(r.user); this.toast(`+${fmtN(a)} (test)`, 'money'); } } }, `+${fmtN(a)}`)))),
      h('b', {}, 'Recent activity'), h('div', { class: 'list' }, (rows?.rows || []).slice(0, 12).map(r => h('div', {}, h('span', {}, r.reason.replaceAll('_', ' ')), h('b', { style: `color:${r.amount < 0 ? '#d6402f' : '#0b7a49'}` }, (r.amount > 0 ? '+' : '') + fmtN(r.amount)))))];
  }
  async tab_jobs() { const d = await this.guard(() => get('/api/jobs')); if (!d) return []; return [h('p', { class: 'mut' }, 'Tap a job to set a waypoint. Start shifts at the job location.'), h('div', { class: 'list' }, d.jobs.map(j => h('div', {}, h('div', {}, h('b', {}, j.name), h('div', { class: 'mut' }, `${fmtN(j.wage)} · ${j.durationSec}s · ${j.place}${j.locked ? ' · 🔒' : ''}`)), h('button', { class: 'btn small ghost', onclick: () => { this.g.setWaypoint(j.x, j.z, j.name); this.closeSheet(); } }, '📍'))))]; }
  async tab_home() {
    const g = this.g; const u = g.user; const d = await this.guard(() => get('/api/properties')); if (!d) return []; g.props = d.properties; g.world.setMarkers(d.properties);
    if (u.home) return [h('h3', {}, u.home.name), h('div', { class: 'mut' }, `${u.home.tierLabel} · ${u.home.area}`), h('div', { class: 'row' }, h('button', { class: 'btn', onclick: () => { this.closeSheet(); g.setWaypoint(u.home.door.x, u.home.door.z, u.home.name); } }, '📍 Waypoint'), h('button', { class: 'btn alt', onclick: () => this.place(u.home.id) }, 'Open house card'))];
    return [h('p', { class: 'mut' }, 'Find a place: green arrows over doors mean available. Tap a house to rent or buy.'), h('div', { class: 'list' }, d.properties.filter(p => p.status === 'available').slice(0, 12).map(p => h('div', {}, h('div', {}, h('b', {}, p.baseName), h('div', { class: 'mut' }, `${p.tierLabel} · ${p.area} · ${fmtN(p.rent)}/day${p.price ? ` · buy ${fmtN(p.price)}` : ''}`)), h('button', { class: 'btn small ghost', onclick: () => this.place(p.id) }, 'View'))))];
  }
  async tab_land() { const d = await this.guard(() => get('/api/plots')); if (!d) return []; return [h('div', { class: 'list' }, d.plots.map(p => h('div', {}, h('div', {}, h('b', {}, p.name), h('div', { class: 'mut' }, `${p.area} · ${fmtN(p.price)} · risk ${p.risk} · ${p.status}`)), h('button', { class: 'btn small ghost', onclick: () => this.place(p.id) }, 'View'))))]; }
  async tab_ranks() { const d = await this.guard(() => get('/api/leaderboard')); if (!d) return []; return [h('p', { class: 'mut' }, 'Net worth = cash + savings + property (70%) + land (95%). Bots are hidden.'), h('div', { class: 'list' }, d.rows.map(r => h('div', {}, h('span', {}, `#${r.rank} ${r.name}${r.guest ? ' (guest)' : ''}`), h('b', {}, fmtN(r.netWorth)))))]; }
  openMap(focusId) { this.bigmap = this.bigmap || new CityMap(this.g); if (this.sheetOpen) this.closeSheet(); this.bigmap.isOpen ? this.bigmap.close() : this.bigmap.open(focusId); }
  async tab_map() { this.openMap(); return []; }
  async tab_games() { return casualUi.hub(this); }
  playCasual(id) { casualUi.play(this, id); }
  async tab_garage() {
    const d = await this.guard(() => get('/api/garage')); if (!d) return []; const g = this.g; const motors = g.city.places.find(p => p.id === 'venue_motors');
    const cars = d.cars.length ? h('div', { class: 'list' }, d.cars.map(c => h('div', {}, h('span', {}, `${c.active ? '✅ ' : ''}${c.name}`, h('small', { class: 'mut' }, ` · worth ${fmtN(c.value)} (paid ${fmtN(c.paid)}) · ${c.ageDays}d old · ${c.conditionLabel} ${c.condition}%`)), h('span', { class: 'row' }, c.active ? '' : h('button', { class: 'btn small', onclick: async () => { await this.guard(() => post('/api/garage/use', { carId: c.id })); this.phone('garage'); } }, 'Use'), h('button', { class: 'btn small ghost', onclick: () => this.confirm(`Sell ${c.name} for about ${fmtN(c.value)}?`, async () => { const r = await this.guard(() => post('/api/garage/sell', { carId: c.id, idemKey: crypto.randomUUID?.() })); if (r) { this.toast(`Sold for ${fmtN(r.value)}.`, 'money'); g.refreshMe(); } this.phone('garage'); }) }, 'Sell'))))) : h('p', { class: 'mut' }, 'No car of your own yet. You are using a borrowed car: higher cost per trip, slower, no mood perk.');
    return [h('div', { class: 'row sp' }, h('b', {}, `Garage (${d.cars.length}/${d.slots})`), h('span', { class: 'mut' }, `Driving: ${d.active.label}`)), cars, h('p', { class: 'mut' }, `Resale: about ${Math.round((1 - d.resale.firstDriveOffFraction) * 100)}% on day one, then about ${Math.round(d.resale.perDayDepreciation * 100)}% less per day, never below ${Math.round(d.resale.floorFraction * 100)}%. All figures are ESTIMATES.`), motors ? h('button', { class: 'btn alt', onclick: () => { this.closeSheet(); this.place(motors.id); } }, '🏪 Visit Naija Auto Mart') : ''];
  }
  async tab_alerts() { const d = await this.guard(() => get('/api/notifications')); this.g.markRead(); if (!d) return []; return [h('div', { class: 'list' }, d.rows.map(n => h('div', {}, h('span', {}, n.text), h('span', { class: 'mut' }, new Date(n.created_at).toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' })))))]; }
  async tab_more() {
    const g = this.g; const bl = await this.guard(() => get('/api/social/blocks')); const blocked = h('div', { class: 'list' }, (bl?.rows || []).map(r => h('div', {}, h('span', {}, `@${r.username} · ${r.kind}`), h('button', { class: 'btn small ghost', onclick: async () => { await this.setBlock(r.username, null); this.phone('more'); } }, 'Undo')))); return [h('b', {}, 'Muted and blocked'), (bl?.rows || []).length ? blocked : h('p', { class: 'mut' }, 'Nobody. Tap a chat line or the ⋯ on a house card to mute, block or report.'), h('div', { class: 'row' }, h('a', { class: 'btn ghost', href: '/advertise', target: '_blank', rel: 'noopener' }, 'Advertise'), h('a', { class: 'btn ghost', href: '/methodology', target: '_blank', rel: 'noopener' }, 'How ads are counted'), h('a', { class: 'btn ghost', href: '/stats.html', target: '_blank', rel: 'noopener' }, 'Stats')),
      h('p', { class: 'mut' }, `${g.cfg.name} v0 · test build. In-game ₦ is fictional with no cash-out. 18+.`), h('div', { class: 'row' }, h('button', { class: 'btn red', onclick: () => g.logout() }, 'Log out'))];
  }
}
const dist2 = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const typeLabel = (t) => ({ venue: 'Place to hang out', shop: 'Shop', job: 'Work', house: 'House', plot: 'Land plot', landmark: 'Landmark' }[t] || t);
