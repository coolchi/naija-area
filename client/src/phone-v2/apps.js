// Phone UI (PHONE_V2): home screen (status bar, app grid, back/home), Contacts, Messages + chat (text and voice notes), Calls and phone settings.
// The older apps (wallet, jobs, home, land, ranks, garage, games, map, alerts, more) are reused as apps on the home screen.
import { get, post, h, fmtN } from '../api.js';
import { pickMime } from './phone2.js';

const DOT = { online: '#2e9b5e', home: '#2a7de1', in_call: '#e0a020', dnd: '#d6402f', offline: '#aaa' };
const APPS = [['calls', '📞', 'Phone'], ['messages', '💬', 'Messages'], ['contacts', '👥', 'Contacts'], ['wallet', '💰', 'Wallet'], ['jobs', '💼', 'Jobs'], ['home', '🏠', 'Home'], ['land', '🌍', 'Land'], ['garage', '🚗', 'Garage'], ['ride', '🚕', 'Oya Ride'], ['games', '🎮', 'Games'], ['map', '🗺', 'Map'], ['ranks', '🏆', 'Ranks'], ['alerts', '🔔', 'Alerts'], ['more', '⚙️', 'Settings']];
const dot = (s) => h('i', { class: 'pdot', title: s, style: `background:${DOT[s] || '#aaa'}` });
const fmtT = (ms) => new Date(ms).toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' });
const dur = (ms) => `${Math.floor(ms / 60000)}:${String(Math.round(ms / 1000) % 60).padStart(2, '0')}`;

export class PhoneShell {
  constructor(ui) { this.ui = ui; this.g = ui.g; this.p = ui.g.phone2; this.stack = []; this.cur = 'home'; this.off = null; }
  open(app = 'home') {
    this.ui.openSheet('Phone', [], () => { this.off?.(); this.off = null; clearInterval(this.chatTimer); });
    this.frame = h('div', { class: 'phoneframe' }); this.status = h('div', { class: 'pstatus' }); this.screen = h('div', { class: 'pscreen' }); this.nav = h('div', { class: 'pnav' },
      h('button', { id: 'phBack', onclick: () => this.back(), 'aria-label': 'Back' }, '◀'), h('button', { id: 'phHome', onclick: () => this.go('home', true), 'aria-label': 'Home' }, '●'), h('button', { id: 'phMenu', onclick: () => this.ui.closeSheet(), 'aria-label': 'Close phone' }, '✕'));
    this.frame.append(this.status, this.screen, this.nav); this.ui.setSheetBody([this.frame]); this.stack = []; this.cur = null; this.off = this.p?.on?.((e) => this.onEvent(e)); this.go(app, true); this.statusTick = setInterval(() => this.drawStatus(), 15000);
  }
  drawStatus() { if (!this.status.isConnected) return clearInterval(this.statusTick); const gt = this.g.user?.gameTime || {}; const b = this.p?.badges || {}; this.status.replaceChildren(h('span', {}, fmtT(Date.now())), h('span', { class: 'mut' }, this.p?.call ? '📞 in call' : ''), h('span', {}, `${b.missed ? '📵' + b.missed + ' ' : ''}📶 🔋`)); void gt; }
  go(app, reset = false) { if (reset) this.stack = []; else if (this.cur) this.stack.push(this.cur); this.cur = app; this.draw(); }
  back() { if (!this.stack.length) { if (this.cur !== 'home') return this.go('home', true); return this.ui.closeSheet(); } this.cur = this.stack.pop(); this.draw(); }
  async draw() {
    this.drawStatus(); clearInterval(this.chatTimer); const app = this.cur; this.screen.replaceChildren(h('p', { class: 'mut' }, 'Loading…')); let el;
    if (app === 'home') el = this.homeScreen(); else if (app === 'contacts') el = await this.contacts(); else if (app === 'messages') el = await this.messages(); else if (app === 'calls') el = await this.calls(); else if (app === 'settings') el = await this.settings(); else if (app === 'ride') el = await this.ride();
    else if (app.startsWith('chat:')) el = await this.chat(app.slice(5)); else if (app === 'map') { this.ui.closeSheet(); return this.ui.openMap(); } else if (app === 'more') el = [...await this.settings(), ...[].concat(await this.ui.tab_more())];
    else if (this.ui['tab_' + app]) el = await this.ui['tab_' + app](); else el = [h('p', {}, 'Nothing here yet.')];
    if (this.cur === app) { const apptitle = (APPS.find(a => a[0] === app) || [])[2] || (app.startsWith('chat:') ? '@' + app.slice(5) : ''); this.screen.replaceChildren(...(app === 'home' ? [] : [h('div', { class: 'ptitle' }, apptitle)]), ...[].concat(el)); this.nav.querySelector('#phBack').disabled = app === 'home' && !this.stack.length && false; }
  }
  onEvent(e) { if (!this.screen?.isConnected) return; if (e.kind === 'message' && this.cur === 'messages') this.draw(); else if (e.kind === 'message' && this.cur === `chat:${e.m.from}`) this.chatPoll?.(); else if (e.kind === 'friends' && (this.cur === 'contacts' || this.cur === 'home')) this.draw(); else if (e.kind === 'read' && this.cur?.startsWith('chat:')) this.chatPoll?.(); else if (e.kind === 'call-ended' && this.cur === 'calls') this.draw(); }
  // ---------- Oya Ride (generic in-game ride-hailing)
  async ride() {
    const g = this.g, R = g.rideSvc; if (!R) return [h('p', {}, 'Oya Ride is not available.')]; await R.load(); const r = R.ride;
    if (r) { return [h('div', { class: 'card' }, h('b', {}, r.state === 'arriving' ? `🚕 ${r.driver.name} is on the way` : `🚕 ${r.driver.name} has arrived`), h('div', { class: 'mut' }, `${r.driver.car} · ${r.driver.plate}`), h('div', {}, `To ${r.placeName}`), h('div', {}, `Fare ₦${r.fare.toLocaleString('en-NG')} (ESTIMATE) · paid when you get in`),
      h('div', { class: 'mut' }, r.state === 'arriving' ? 'Wait where you are. Your driver will pull up beside you.' : 'Walk to your driver and tap "Get in" at the bottom of the screen.'), h('button', { class: 'btn ghost', onclick: async () => { await R.cancel(); this.draw(); } }, r.state === 'arrived' ? 'Cancel (small fee)' : 'Cancel ride'))]; }
    const ok = new Set(['venue', 'shop', 'landmark', 'busstop']); const homes = new Set((g.user?.homes || []).map(x => x.id || x)); const list = g.city.places.filter(p => ok.has(p.type) || homes.has(p.id)); const out = [h('p', { class: 'mut' }, 'Pick where you are going. Fares are estimates; you pay when you get in.')];
    const box = h('div', { class: 'col' }); const input = h('input', { class: 'sheet-input', id: 'rideSearch', placeholder: 'Search a place…' }); const detail = h('div', { id: 'rideDetail' });
    const draw = (q) => { box.replaceChildren(...list.filter(p => !q || p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 30).map(p => h('button', { class: 'btn ghost ride-dest', 'data-place': p.id, onclick: () => pick(p) }, `${p.name}${p.area ? ' · ' + p.area : ''}`))); };
    const pick = async (p) => { detail.replaceChildren(h('p', { class: 'mut' }, 'Getting a price…')); try { const q = await get('/api/ride/quote?place=' + encodeURIComponent(p.id)); detail.replaceChildren(h('div', { class: 'card' }, h('b', {}, q.place.name), h('div', {}, `About ${q.distance} m · fare ₦${q.fare.toLocaleString('en-NG')}${q.rush ? ' (rush hour)' : ''} (ESTIMATE)`), h('div', { class: 'mut' }, `Driver arrives in about ${Math.round(q.etaMs / 1000)} s`), h('button', { class: 'btn big', id: 'rideGo', onclick: async () => { try { await R.request(p.id); this.ui.closeSheet(); } catch (e) { this.ui.error(e); } } }, `Request ride · ₦${q.fare.toLocaleString('en-NG')}`))); } catch (e) { detail.replaceChildren(h('p', { class: 'mut' }, e.message || 'Could not get a price.')); } };
    input.oninput = () => draw(input.value); draw(''); out.push(input, detail, box); return out;
  }
  homeScreen() {
    const b = this.p?.badges || {}; const badge = { messages: b.msgs, contacts: b.reqs, calls: b.missed, alerts: this.g.unread };
    return [h('div', { class: 'pgrid' }, APPS.map(([id, icon, label]) => h('button', { class: 'papp', 'data-app': id, onclick: () => { if (id === 'calls') this.p.badges.missed = 0; this.go(id); } }, h('span', { class: 'pico' }, icon, badge[id] ? h('b', { class: 'pbadge' }, String(badge[id])) : ''), h('span', { class: 'plab' }, label))),
      ...(this.sponsored ? [] : [])), h('p', { class: 'mut', style: 'text-align:center;margin:8px 0 0' }, 'Calls and chats are friends only. 18+.')];
  }
  // ---------- contacts
  async contacts() {
    if (this.g.user?.guest) return [h('p', {}, 'Create a free account to add friends, chat and call.')];
    const d = await this.ui.guard(() => get('/api/phone/friends')); if (!d) return []; this.p.badges.reqs = d.incoming.length; this.p.drawBadge();
    const add = h('input', { class: 'sheet-input', id: 'friendName', placeholder: 'Add a friend: @username', maxlength: 20 });
    const row = (f) => h('div', { class: 'prow', 'data-friend': f.username }, h('span', {}, dot(f.state), h('b', {}, ` @${f.username}`), h('small', { class: 'mut' }, ` · ${f.state.replace('_', ' ')}`), f.unread ? h('b', { class: 'pbadge inl' }, String(f.unread)) : ''),
      h('span', { class: 'row' }, h('button', { class: 'btn small ghost', onclick: () => this.go('chat:' + f.username) }, '💬'), h('button', { class: 'btn small', disabled: this.p.usable ? null : 'disabled', onclick: () => this.p.dial(f.username) }, '📞'), h('button', { class: 'btn small ghost', onclick: () => this.more(f.username) }, '⋯')));
    return [h('div', { class: 'row' }, add, h('button', { class: 'btn small', id: 'friendAdd', onclick: async () => { const r = await this.ui.guard(() => post('/api/phone/friends/request', { username: add.value.replace('@', '') })); if (r) { this.ui.toast(r.status === 'accepted' ? 'You are now friends!' : 'Friend request sent.'); this.draw(); } } }, 'Add')),
      d.incoming.length ? h('div', {}, h('b', {}, 'Requests'), h('div', { class: 'list' }, d.incoming.map(r => h('div', { 'data-req': r.id }, h('span', {}, `@${r.from}`), h('span', { class: 'row' }, h('button', { class: 'btn small', onclick: async () => { await this.ui.guard(() => post('/api/phone/friends/respond', { id: r.id, accept: true })); this.draw(); } }, 'Accept'), h('button', { class: 'btn small ghost', onclick: async () => { await this.ui.guard(() => post('/api/phone/friends/respond', { id: r.id, accept: false })); this.draw(); } }, 'Decline'))))) ) : '',
      h('b', {}, `Friends (${d.friends.length})`), d.friends.length ? h('div', { class: 'list' }, d.friends.map(row)) : h('p', { class: 'mut' }, 'No friends yet. Type a username above, or tap a player name in the chat.'), d.outgoing.length ? h('p', { class: 'mut' }, `Waiting for: ${d.outgoing.map(o => '@' + o.to).join(', ')}`) : ''];
  }
  more(name) { this.ui.openSheet(`@${name}`, [h('div', { class: 'col' }, h('button', { class: 'btn ghost', onclick: async () => { await this.ui.guard(() => post('/api/phone/friends/remove', { username: name })); this.ui.closeSheet(); this.ui.phone('contacts'); } }, 'Remove friend'), h('button', { class: 'btn ghost', onclick: () => this.ui.setBlock(name, 'mute') }, 'Mute (hide their chats, calls and voice notes)'), h('button', { class: 'btn red', onclick: () => this.ui.setBlock(name, 'block') }, 'Block')), h('p', { class: 'mut' }, 'Mute and block apply to chats, calls and voice notes.')]); }
  // ---------- messages
  async messages() {
    const d = await this.ui.guard(() => get('/api/phone/threads')); if (!d) return []; this.p.badges.msgs = d.threads.reduce((a, t) => a + t.unread, 0); this.p.drawBadge();
    return [h('button', { class: 'btn small', id: 'newChat', onclick: () => this.go('contacts') }, '＋ New chat from Contacts'), d.threads.length ? h('div', { class: 'list' }, d.threads.map(t => h('div', { class: 'prow tap', 'data-thread': t.with, onclick: () => this.go('chat:' + t.with) }, h('span', {}, dot(t.state), h('b', {}, ` @${t.with}`), h('div', { class: 'mut small' }, t.last ? (t.last.kind === 'voice' ? '🎤 Voice note' : t.last.text) : '')), t.unread ? h('b', { class: 'pbadge inl' }, String(t.unread)) : ''))) : h('p', { class: 'mut' }, 'No chats yet. Open Contacts and tap 💬 on a friend.')];
  }
  async chat(name) {
    const log = h('div', { class: 'chatlog', 'data-chat-open': name }); let lastId = 0; const seen = new Set(); let state = 'offline';
    const bubble = (m) => { if (m.kind === 'system') return h('div', { class: 'sysmsg' }, m.text); const mine = m.mine; const body = m.kind === 'voice' ? this.voiceBubble(m) : h('span', {}, m.text); return h('div', { class: `bub ${mine ? 'me' : 'them'}`, 'data-msg': m.id }, body, h('small', { class: 'mut' }, fmtT(m.at))); };
    const poll = async (mark = true) => { const d = await get(`/api/phone/thread?with=${encodeURIComponent(name)}&after=${lastId}${mark ? '' : '&read=0'}`).catch(() => null); if (!d) return; state = d.state; head.replaceChildren(dot(d.state), h('b', {}, ` @${name}`), h('small', { class: 'mut' }, ` ${d.state.replace('_', ' ')}`)); if (!d.friends) { compose.replaceChildren(h('p', { class: 'mut' }, 'You can only chat with friends.'), h('button', { class: 'btn small', onclick: async () => { await this.ui.guard(() => post('/api/phone/friends/request', { username: name })); this.ui.toast('Friend request sent.'); } }, 'Send friend request')); }
      for (const m of d.messages) { if (seen.has(m.id)) continue; seen.add(m.id); lastId = Math.max(lastId, m.id); log.append(bubble(m)); log.scrollTop = log.scrollHeight; } log.querySelectorAll('.bub.me').forEach(e => { e.classList.toggle('read', Number(e.dataset.msg) <= d.readByThem); }); };
    this.chatPoll = () => poll(); const head = h('div', { class: 'chead' });
    const input = h('input', { class: 'sheet-input', id: 'phChatInput', placeholder: 'Message…', maxlength: 500, onkeydown: (e) => { e.stopPropagation(); if (e.key === 'Enter') send(); } });
    const send = async () => { const t = input.value.trim(); if (!t) return; input.value = ''; const r = await this.ui.guard(() => post('/api/phone/messages', { to: name, text: t })); if (r) await poll(); };
    const rec = this.recorder(name, () => poll()); const compose = h('div', { class: 'row chcomp' }, input, h('button', { class: 'btn small', id: 'phChatSend', onclick: send }, 'Send'), rec.btn);
    await poll(); this.chatTimer = setInterval(() => { if (!log.isConnected) return clearInterval(this.chatTimer); poll(); }, 4000);
    return [h('div', { class: 'row sp' }, head, h('button', { class: 'btn small', id: 'phChatCall', onclick: () => this.p.dial(name) }, '📞 Call')), log, compose, h('p', { class: 'mut small' }, 'Report a message or voice note: press and hold it. Mute and block are under Contacts ⋯.')];
  }
  voiceBubble(m) {
    const v = m.voice; if (v.gone) return h('span', { class: 'mut' }, '🎤 Voice note expired or removed');
    const bars = (v.waveform?.length ? v.waveform : Array.from({ length: 28 }, (_, i) => 30 + ((i * 37) % 60))).map(n => h('i', { style: `height:${Math.max(12, n * 0.3)}px` }));
    const btn = h('button', { class: 'vplay', 'data-voice': v.id, onclick: () => this.play(v.id, btn) }, '▶'); const el = h('span', { class: 'vnote' }, btn, h('span', { class: 'vwave' }, bars), h('small', {}, dur(v.durationMs)), h('button', { class: 'vrep', title: 'Report', onclick: () => this.ui.reportSheet('voice_note', String(v.id), 'a voice note') }, '🚩')); return el;
  }
  play(id, btn) { const cur = this.audio; if (cur) { cur.pause(); this.audioBtn && (this.audioBtn.textContent = '▶'); if (this.audioId === id) { this.audio = null; return; } } const a = this.audio = new Audio(`/api/phone/voice/${id}`); this.audioId = id; this.audioBtn = btn; btn.textContent = '⏸'; a.onended = () => { btn.textContent = '▶'; }; a.onerror = () => { btn.textContent = '▶'; this.ui.toast('Could not play that voice note.'); }; a.play().catch(() => { btn.textContent = '▶'; }); }
  recorder(name, done) {
    const mime = pickMime(); const btn = h('button', { class: 'btn small alt', id: 'recBtn', title: 'Voice note' }, '🎤'); let rec = null, chunks = [], t0 = 0, stream = null, tmr = null, wave = [], an = null, ctx = null;
    if (!mime || !navigator.mediaDevices?.getUserMedia || window.__naDemo) { btn.disabled = true; btn.title = window.__naDemo ? 'Voice notes need the live server' : 'Your browser cannot record voice notes'; return { btn }; }
    const stop = (send) => { clearInterval(tmr); if (!rec) return; const r = rec; rec = null; r.onstop = async () => { stream?.getTracks().forEach(t => t.stop()); try { ctx?.close(); } catch { /* ignore */ } btn.textContent = '🎤'; btn.classList.remove('rec'); if (!send) return; const blob = new Blob(chunks, { type: r.mimeType || mime }); const ms = Date.now() - t0; const wf = wave.length ? wave.join(',') : ''; const res = await fetch(`/api/phone/voice?to=${encodeURIComponent(name)}`, { method: 'POST', headers: { 'content-type': (blob.type || mime).split(';')[0], 'x-duration-ms': String(ms), 'x-waveform': wf }, body: blob }); const j = await res.json().catch(() => ({})); if (!res.ok) this.ui.toast(j.message || 'Could not send the voice note.'); else done(); }; r.stop(); };
    btn.onclick = async () => {
      if (rec) return stop(true); if (!(await this.p.consentOk())) return;
      try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch (e) { return this.ui.toast(this.p.micMsg(e)); }
      chunks = []; wave = []; rec = new MediaRecorder(stream, { mimeType: mime, audioBitsPerSecond: 24000 }); rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); an = ctx.createAnalyser(); ctx.createMediaStreamSource(stream).connect(an); } catch { an = null; }
      rec.start(250); t0 = Date.now(); btn.textContent = '⏹ 0s'; btn.classList.add('rec');
      tmr = setInterval(() => { const s = Math.round((Date.now() - t0) / 1000); btn.textContent = `⏹ ${s}s`; if (an) { const b = new Uint8Array(an.fftSize); an.getByteTimeDomainData(b); let m = 0; for (const v of b) m = Math.max(m, Math.abs(v - 128)); if (wave.length < 48 && s * 1000 % 1250 < 1000) wave.push(Math.min(100, Math.round(m * 1.6))); } if (s >= 60) stop(true); }, 500);
    };
    btn.oncontextmenu = (e) => { e.preventDefault(); stop(false); };
    return { btn };
  }
  // ---------- calls
  async calls() {
    const d = await this.ui.guard(() => get('/api/phone/friends')); if (!d) return []; const t = await this.ui.guard(() => get('/api/phone/threads'));
    const log = []; for (const th of (t?.threads || [])) if (th.last?.kind === 'system') log.push({ who: th.with, text: th.last.text, at: th.last.at }); log.sort((a, b) => b.at - a.at);
    return [h('p', { class: 'mut' }, 'Call a friend. Calls are voice only, peer to peer, never recorded.'), h('div', { class: 'list' }, d.friends.map(f => h('div', { 'data-call-friend': f.username }, h('span', {}, dot(f.state), ` @${f.username}`), h('button', { class: 'btn small', disabled: f.state === 'offline' || f.state === 'dnd' ? 'disabled' : null, onclick: () => this.p.dial(f.username) }, '📞 Call')))), d.friends.length ? '' : h('p', { class: 'mut' }, 'No friends yet. Add some in Contacts.'),
      log.length ? h('div', {}, h('b', {}, 'Recent'), h('div', { class: 'list' }, log.slice(0, 8).map(l => h('div', {}, h('span', {}, `${l.text}`), h('span', { class: 'mut' }, `@${l.who} · ${fmtT(l.at)}`))))) : ''];
  }
  // ---------- settings
  async settings() {
    if (this.g.user?.guest) return [];
    const s = await this.ui.guard(() => get('/api/phone/settings')); if (!s) return []; const sel = (key, val) => async () => { await this.ui.guard(() => post('/api/phone/settings', { [key]: val })); this.draw(); };
    const tog = (label, on, key) => h('div', { class: 'prow' }, h('span', {}, label), h('button', { class: `btn small ${on ? '' : 'ghost'}`, 'data-setting': key, onclick: sel(key, !on) }, on ? 'On' : 'Off'));
    return [tog('Do not disturb (calls go to missed)', s.dnd, 'dnd'), tog('Show my online dot to friends', s.showPresence, 'showPresence'), h('div', { class: 'prow' }, h('span', {}, 'Calls from'), h('button', { class: 'btn small ghost', 'data-setting': 'callsFrom', onclick: sel('callsFrom', s.callsFrom === 'friends' ? 'nobody' : 'friends') }, s.callsFrom)), h('div', { class: 'prow' }, h('span', {}, 'Voice notes from'), h('button', { class: 'btn small ghost', 'data-setting': 'voiceNotesFrom', onclick: sel('voiceNotesFrom', s.voiceNotesFrom === 'friends' ? 'nobody' : 'friends') }, s.voiceNotesFrom)),
      h('p', { class: 'mut small' }, s.voiceConsent ? 'Voice notice accepted.' : 'You will be asked to accept the voice notice the first time you record or call.')];
  }
}
