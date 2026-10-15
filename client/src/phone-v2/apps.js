// Phone UI (PHONE_V2): iPhone Pro Max chrome — home, Contacts, Messages, chat (text / voice / pay), Calls, settings.
// Older apps (wallet, jobs, home, land, ranks, garage, games, map, alerts, more) open as in-phone screens.
import { get, post, h, fmtN } from '../api.js';
import { pickMime } from './phone2.js';

const DOT = { online: '#30d158', home: '#0a84ff', in_call: '#ffd60a', dnd: '#ff453a', offline: '#636366' };
const APP_META = {
  calls: ['c-green', '📞'], messages: ['c-blue', '💬'], contacts: ['c-purple', '👥'], wallet: ['c-orange', '💰'],
  jobs: ['c-red', '💼'], home: ['c-teal', '🏠'], land: ['c-green', '🌍'], garage: ['c-gray', '🚗'],
  ride: ['c-orange', '🚕'], life: ['c-pink', '🏙'], games: ['c-purple', '🎮'], map: ['c-teal', '🗺'],
  ranks: ['c-orange', '🏆'], missions: ['c-red', '🎯'], me: ['c-blue', '🏅'], safe: ['c-gray', '🛡'],
  invite: ['c-green', '🎁'], alerts: ['c-red', '🔔'], more: ['c-gray', '⚙️'], settings: ['c-gray', '⚙️'],
};
const APPS = [['calls', 'Phone'], ['messages', 'Messages'], ['contacts', 'Contacts'], ['wallet', 'Wallet'], ['jobs', 'Jobs'], ['home', 'Home'], ['land', 'Land'], ['garage', 'Garage'], ['ride', 'Oya Ride'], ['life', 'City life'], ['games', 'Games'], ['map', 'Map'], ['ranks', 'Ranks'], ['missions', 'Missions'], ['me', 'Me'], ['invite', 'Invite'], ['safe', 'Safety'], ['alerts', 'Alerts'], ['more', 'Settings']];
const DOCK = ['calls', 'messages', 'contacts', 'wallet'];
// Home grid (not docked) — keep ≤12 so the Pro Max home fits without scrolling.
const HOME_APPS = ['missions', 'jobs', 'garage', 'ride', 'life', 'games', 'map', 'home', 'invite', 'me', 'alerts', 'more'];
const PAY_PRESETS = [500, 1000, 5000, 20000];
const fmtT = (ms) => new Date(ms).toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' });
const dur = (ms) => `${Math.floor(ms / 60000)}:${String(Math.round(ms / 1000) % 60).padStart(2, '0')}`;
const initial = (n) => String(n || '?').slice(0, 1).toUpperCase();
const av = (name, state) => h('span', { class: 'pav' }, initial(name), state ? h('i', { class: 'pdot', style: `background:${DOT[state] || '#636366'}` }) : '');

export class PhoneShell {
  constructor(ui) { this.ui = ui; this.g = ui.g; this.p = ui.g.phone2; this.stack = []; this.cur = 'home'; this.off = null; }
  open(app = 'home') {
    this.ui.openSheet('Phone', [], () => {
      this.off?.(); this.off = null; clearInterval(this.chatTimer); clearInterval(this.statusTick);
      document.getElementById('sheetWrap')?.classList.remove('phone-mode');
    });
    document.getElementById('sheetWrap')?.classList.add('phone-mode');
    this.frame = h('div', { class: 'phoneframe' });
    this.status = h('div', { class: 'pstatus' });
    this.screen = h('div', { class: 'pscreen' });
    this.nav = h('div', { class: 'pnav' }, h('button', { class: 'phome-ind', id: 'phHome', onclick: () => this.go('home', true), 'aria-label': 'Home' }, ''));
    this.frame.append(this.status, this.screen, this.nav);
    this.ui.setSheetBody([this.frame]);
    this.stack = []; this.cur = null; this.off = this.p?.on?.((e) => this.onEvent(e));
    this.go(app, true); this.statusTick = setInterval(() => this.drawStatus(), 15000);
  }
  drawStatus() {
    if (!this.status?.isConnected) return clearInterval(this.statusTick);
    const b = this.p?.badges || {};
    this.status.replaceChildren(
      h('span', {}, fmtT(Date.now())),
      h('span', { class: 'psig' }, this.p?.call ? '📞' : '', b.missed ? `📵${b.missed}` : '', '▮▮▮', '🔋'),
    );
  }
  go(app, reset = false) { if (reset) this.stack = []; else if (this.cur) this.stack.push(this.cur); this.cur = app; this.draw(); }
  back() { if (!this.stack.length) { if (this.cur !== 'home') return this.go('home', true); return this.ui.closeSheet(); } this.cur = this.stack.pop(); this.draw(); }
  async draw() {
    this.drawStatus(); clearInterval(this.chatTimer); const app = this.cur;
    this.screen.replaceChildren(h('div', { class: 'ph-pad ph-mut' }, 'Loading…'));
    let el;
    if (app === 'home') el = this.homeScreen();
    else if (app === 'contacts') el = await this.contacts();
    else if (app === 'messages') el = await this.messages();
    else if (app === 'calls') el = await this.calls();
    else if (app === 'settings') el = await this.settings();
    else if (app === 'ride') el = await this.ride();
    else if (app === 'invite') el = await this.invite();
    else if (app.startsWith('chat:')) el = await this.chat(app.slice(5));
    else if (app === 'map') { this.ui.closeSheet(); return this.ui.openMap(); }
    else if (app === 'more') el = [...await this.settings(), ...[].concat(await this.ui.tab_more())];
    else if (this.ui['tab_' + app]) el = await this.ui['tab_' + app]();
    else el = [h('p', { class: 'ph-mut' }, 'Nothing here yet.')];
    if (this.cur !== app) return;
    if (app === 'home') this.screen.replaceChildren(h('div', { class: 'phome' }, ...[].concat(el)));
    else if (app.startsWith('chat:')) this.screen.replaceChildren(...[].concat(el));
    else {
      const title = (APPS.find((a) => a[0] === app) || [])[1] || app;
      this.screen.replaceChildren(h('div', { class: 'pappview' },
        h('div', { class: 'papp-head' },
          h('button', { class: 'pback', onclick: () => this.back() }, '‹ Back'),
          h('h3', {}, title),
          h('span', { style: 'width:52px' }, '')),
        h('div', { class: 'ph-pad', style: 'flex:1;overflow:auto' }, ...[].concat(el))));
    }
  }
  onEvent(e) {
    if (!this.screen?.isConnected) return;
    if (e.kind === 'message' && this.cur === 'messages') this.draw();
    else if (e.kind === 'message' && this.cur === `chat:${e.m.from}`) this.chatPoll?.();
    else if (e.kind === 'friends' && (this.cur === 'contacts' || this.cur === 'home')) this.draw();
    else if (e.kind === 'read' && this.cur?.startsWith('chat:')) this.chatPoll?.();
    else if (e.kind === 'call-ended' && this.cur === 'calls') this.draw();
  }
  appBtn(id, label, badge) {
    const [cls, icon] = APP_META[id] || ['c-gray', '📱'];
    return h('button', { class: 'papp', 'data-app': id, onclick: () => { if (id === 'calls') this.p.badges.missed = 0; this.go(id); } },
      h('span', { class: `pico ${cls}` }, icon, badge ? h('b', { class: 'pbadge' }, String(badge)) : ''),
      h('span', { class: 'plab' }, label));
  }
  homeScreen() {
    const b = this.p?.badges || {}; const badge = { messages: b.msgs, contacts: b.reqs, calls: b.missed, alerts: this.g.unread };
    const now = new Date();
    const date = now.toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long' });
    const byId = Object.fromEntries(APPS);
    const grid = HOME_APPS.map((id) => this.appBtn(id, byId[id] || id, badge[id]));
    return [
      h('div', { class: 'phome-clock' }, fmtT(Date.now())),
      h('div', { class: 'phome-date' }, date),
      h('div', { class: 'pgrid' }, grid),
      h('div', { class: 'pdock' }, DOCK.map((id) => this.appBtn(id, byId[id] || id, badge[id]))),
    ];
  }
  async invite() {
    if (this.g.user?.guest) return [h('p', { class: 'ph-mut' }, 'Create a free account to invite friends and earn bonuses.')];
    const d = await this.ui.guard(() => get('/api/referrals')); if (!d) return [];
    const s = d.summary || {};
    const link = d.url || (location.origin + (d.path || `/?ref=${d.code}`));
    const copy = async () => { try { await navigator.clipboard.writeText(link); this.ui.toast('Invite link copied.'); } catch { this.ui.toast(link); } };
    const email = h('input', { class: 'ph-input', type: 'email', placeholder: 'friend@email.com', maxlength: 120 });
    const list = (title, rows) => [
      h('div', { class: 'ph-mut', style: 'margin:12px 4px 4px' }, title),
      rows.length
        ? h('div', { class: 'plist' }, rows.map((r) => h('div', { class: 'prow' },
          h('span', {}, h('b', {}, `@${r.username}`), r.via ? h('div', { class: 'ph-mut small' }, `via @${r.via}`) : ''),
          h('span', { class: 'ph-mut small' }, r.at ? new Date(r.at).toLocaleDateString('en-NG') : ''))))
        : h('p', { class: 'ph-mut' }, 'Nobody here yet.'),
    ];
    return [
      h('p', { class: 'ph-mut' }, d.tip || 'Share your link. Earn when friends join.'),
      h('div', { class: 'plist' },
        h('div', { class: 'prow' }, h('span', {}, 'Network'), h('b', {}, String(s.network || 0))),
        h('div', { class: 'prow' }, h('span', {}, 'Level 1 · direct'), h('b', {}, String(s.level1 || 0))),
        h('div', { class: 'prow' }, h('span', {}, 'Level 2'), h('b', {}, String(s.level2 || 0))),
        h('div', { class: 'prow' }, h('span', {}, 'Level 3'), h('b', {}, String(s.level3 || 0))),
        h('div', { class: 'prow' }, h('span', {}, 'Earned'), h('b', {}, fmtN(s.earned || 0)))),
      h('p', { class: 'ph-mut', style: 'margin-top:12px' }, 'Your signup link'),
      h('div', { class: 'plist' }, h('div', { class: 'prow' }, h('span', { style: 'word-break:break-all;font-size:12px' }, link))),
      h('div', { style: 'display:flex;gap:8px;margin:8px 0 14px' },
        h('button', { class: 'ph-btn', style: 'flex:1', onclick: copy }, 'Copy link'),
        h('button', { class: 'ph-btn ghost', style: 'flex:1', onclick: async () => {
          if (navigator.share) { try { await navigator.share({ title: 'Naija Area', text: 'Join me on Naija Area', url: link }); } catch { /* cancelled */ } }
          else copy();
        } }, 'Share')),
      h('p', { class: 'ph-mut' }, 'Invite by email'),
      h('div', { style: 'display:flex;gap:8px;margin-bottom:10px' }, email,
        h('button', { class: 'ph-btn', onclick: async () => {
          const r = await this.ui.guard(() => post('/api/referrals/invite', { email: email.value.trim() }));
          if (!r) return;
          this.ui.toast(r.text || 'Invite ready.');
          if (!r.sent && r.mailto) location.href = r.mailto;
          this.draw();
        } }, 'Invite')),
      ...(d.invites?.length ? [
        h('div', { class: 'ph-mut', style: 'margin:8px 4px' }, 'Email invites'),
        h('div', { class: 'plist' }, d.invites.map((i) => h('div', { class: 'prow' },
          h('span', {}, h('b', {}, i.email), h('div', { class: 'ph-mut small' }, i.status === 'accepted' ? `Joined${i.acceptedUser ? ' · @' + i.acceptedUser : ''}` : 'Waiting')),
          h('span', { class: 'ph-mut small' }, i.status)))),
      ] : []),
      ...list(`Level 1 · ${fmtN(d.rewards?.[0] || 0)} each`, d.level1 || []),
      ...list(`Level 2 · ${fmtN(d.rewards?.[1] || 0)} each`, d.level2 || []),
      ...list(`Level 3 · ${fmtN(d.rewards?.[2] || 0)} each`, d.level3 || []),
    ];
  }
  async ride() {
    const g = this.g, R = g.rideSvc; if (!R) return [h('p', { class: 'ph-mut' }, 'Oya Ride is not available.')]; await R.load(); const r = R.ride;
    if (r) {
      return [
        h('div', { class: 'plist' }, h('div', { class: 'prow' }, h('span', {},
          h('b', {}, r.state === 'arriving' ? `🚕 ${r.driver.name} is on the way` : `🚕 ${r.driver.name} has arrived`),
          h('div', { class: 'ph-mut' }, `${r.driver.car} · ${r.driver.plate}`),
          h('div', {}, `To ${r.placeName}`),
          h('div', { class: 'ph-mut' }, `Fare ${fmtN(r.fare)} (ESTIMATE)`)))),
        h('button', { class: 'ph-btn ghost', style: 'margin:12px;width:calc(100% - 24px)', onclick: async () => { await R.cancel(); this.draw(); } }, r.state === 'arrived' ? 'Cancel (small fee)' : 'Cancel ride'),
      ];
    }
    const ok = new Set(['venue', 'shop', 'landmark', 'busstop']); const homes = new Set((g.user?.homes || []).map((x) => x.id || x));
    const list = g.city.places.filter((p) => ok.has(p.type) || homes.has(p.id));
    const out = [h('p', { class: 'ph-mut' }, 'Pick where you are going. Fares are estimates; you pay when you get in.')];
    const box = h('div', { class: 'plist' }); const input = h('input', { class: 'ph-input', id: 'rideSearch', placeholder: 'Search a place…' }); const detail = h('div', { id: 'rideDetail' });
    const draw = (q) => { box.replaceChildren(...list.filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 30).map((p) => h('button', { class: 'prow tap', style: 'width:100%;border:0;color:inherit;font:inherit;text-align:left', 'data-place': p.id, onclick: () => pick(p) }, `${p.name}${p.area ? ' · ' + p.area : ''}`))); };
    const pick = async (p) => {
      detail.replaceChildren(h('p', { class: 'ph-mut' }, 'Getting a price…'));
      try {
        const q = await get('/api/ride/quote?place=' + encodeURIComponent(p.id));
        detail.replaceChildren(h('div', { class: 'plist', style: 'padding:12px' }, h('b', {}, q.place.name), h('div', {}, `About ${q.distance} m · fare ${fmtN(q.fare)}${q.rush ? ' (rush)' : ''}`), h('div', { class: 'ph-mut' }, `Driver in ~${Math.round(q.etaMs / 1000)}s`),
          h('button', { class: 'ph-btn', style: 'margin-top:10px;width:100%', id: 'rideGo', onclick: async () => { try { await R.request(p.id); this.ui.closeSheet(); } catch (e) { this.ui.error(e); } } }, `Request · ${fmtN(q.fare)}`)));
      } catch (e) { detail.replaceChildren(h('p', { class: 'ph-mut' }, e.message || 'Could not get a price.')); }
    };
    input.oninput = () => draw(input.value); draw(''); out.push(input, detail, box); return out;
  }
  async contacts() {
    if (this.g.user?.guest) return [h('p', { class: 'ph-mut' }, 'Create a free account to add friends, chat and call.')];
    const d = await this.ui.guard(() => get('/api/phone/friends')); if (!d) return [];
    this.p.badges.reqs = d.incoming.length; this.p.drawBadge();
    const add = h('input', { class: 'ph-input', id: 'friendName', placeholder: 'Add friend @username', maxlength: 20 });
    const row = (f) => h('div', { class: 'prow', 'data-friend': f.username },
      h('span', { style: 'display:flex;gap:10px;align-items:center;min-width:0' }, av(f.username, f.state), h('span', {}, h('b', {}, `@${f.username}`), h('div', { class: 'ph-mut small' }, f.state.replace('_', ' ')))),
      h('span', { style: 'display:flex;gap:6px' },
        h('button', { class: 'ph-btn small ghost', onclick: () => this.go('chat:' + f.username) }, '💬'),
        h('button', { class: 'ph-btn small green', disabled: this.p.usable ? null : 'disabled', onclick: () => this.p.dial(f.username) }, '📞'),
        h('button', { class: 'ph-btn small ghost', onclick: () => this.more(f.username) }, '⋯')));
    return [
      h('div', { style: 'display:flex;gap:8px;margin-bottom:10px' }, add, h('button', { class: 'ph-btn', id: 'friendAdd', onclick: async () => { const r = await this.ui.guard(() => post('/api/phone/friends/request', { username: add.value.replace('@', '') })); if (r) { this.ui.toast(r.status === 'accepted' ? 'You are now friends!' : 'Friend request sent.'); this.draw(); } } }, 'Add')),
      d.incoming.length ? h('div', {},
        h('div', { class: 'ph-mut', style: 'margin:8px 4px' }, 'Requests'),
        h('div', { class: 'plist' }, d.incoming.map((r) => h('div', { class: 'prow', 'data-req': r.id },
          h('span', {}, `@${r.from}`),
          h('span', { style: 'display:flex;gap:6px' },
            h('button', { class: 'ph-btn small green', onclick: async () => { await this.ui.guard(() => post('/api/phone/friends/respond', { id: r.id, accept: true })); this.draw(); } }, 'Accept'),
            h('button', { class: 'ph-btn small ghost', onclick: async () => { await this.ui.guard(() => post('/api/phone/friends/respond', { id: r.id, accept: false })); this.draw(); } }, 'No')))))) : '',
      h('div', { class: 'ph-mut', style: 'margin:8px 4px' }, `Friends (${d.friends.length})`),
      d.friends.length ? h('div', { class: 'plist' }, d.friends.map(row)) : h('p', { class: 'ph-mut' }, 'No friends yet. Type a username above.'),
      d.outgoing.length ? h('p', { class: 'ph-mut' }, `Waiting: ${d.outgoing.map((o) => '@' + o.to).join(', ')}`) : '',
    ];
  }
  more(name) {
    const close = () => overlay.remove();
    const overlay = h('div', { class: 'pay-overlay', onclick: (e) => { if (e.target === overlay) close(); } },
      h('div', { class: 'pay-sheet-card', onclick: (e) => e.stopPropagation() },
        h('div', { class: 'pay-sheet' },
          h('h4', {}, `@${name}`),
          h('p', { class: 'ph-mut' }, 'Mute and block apply to chats, calls and voice notes.'),
          h('button', { class: 'ph-btn ghost', style: 'width:100%;margin-top:8px', onclick: async () => { await this.ui.guard(() => post('/api/phone/friends/remove', { username: name })); close(); this.go('contacts', true); } }, 'Remove friend'),
          h('button', { class: 'ph-btn ghost', style: 'width:100%;margin-top:8px', onclick: () => { this.ui.setBlock(name, 'mute'); close(); } }, 'Mute'),
          h('button', { class: 'ph-btn red', style: 'width:100%;margin-top:8px', onclick: () => { this.ui.setBlock(name, 'block'); close(); } }, 'Block'),
          h('button', { class: 'ph-btn ghost', style: 'width:100%;margin-top:8px', onclick: close }, 'Cancel'))));
    this.screen.append(overlay);
  }
  async messages() {
    const d = await this.ui.guard(() => get('/api/phone/threads')); if (!d) return [];
    this.p.badges.msgs = d.threads.reduce((a, t) => a + t.unread, 0); this.p.drawBadge();
    return [
      h('button', { class: 'ph-btn', style: 'width:100%;margin-bottom:10px', id: 'newChat', onclick: () => this.go('contacts') }, '＋ New chat'),
      d.threads.length ? h('div', { class: 'plist' }, d.threads.map((t) => h('div', { class: 'prow tap', 'data-thread': t.with, onclick: () => this.go('chat:' + t.with) },
        h('span', { style: 'display:flex;gap:10px;align-items:center;min-width:0;flex:1' }, av(t.with, t.state),
          h('span', { style: 'min-width:0' }, h('b', {}, `@${t.with}`), h('div', { class: 'ph-mut small', style: 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px' },
            t.last ? (t.last.kind === 'voice' ? '🎤 Voice note' : t.last.kind === 'pay' ? (t.last.mine ? '💸 You sent money' : '💸 Received money') : t.last.text) : 'No messages yet'))),
        t.unread ? h('b', { class: 'pbadge inl' }, String(t.unread)) : h('span', { class: 'ph-mut small' }, t.last ? fmtT(t.last.at) : ''))))
        : h('p', { class: 'ph-mut' }, 'No chats yet. Open Contacts and tap 💬.'),
    ];
  }
  async chat(name) {
    const log = h('div', { class: 'chatlog', 'data-chat-open': name }); let lastId = 0; const seen = new Set();
    const bubble = (m) => {
      if (m.kind === 'system') return h('div', { class: 'sysmsg' }, m.text);
      if (m.kind === 'pay') {
        return h('div', { class: `bub pay ${m.mine ? 'me' : 'them'}`, 'data-msg': m.id },
          h('div', { class: 'paylabel' }, m.mine ? 'Payment' : 'Payment received'),
          h('div', { class: 'payamt' }, fmtN(m.pay?.amount || 0)),
          h('small', { class: 'btime' }, fmtT(m.at)));
      }
      const body = m.kind === 'voice' ? this.voiceBubble(m) : h('span', { class: 'btext' }, m.text);
      return h('div', { class: `bub ${m.mine ? 'me' : 'them'}`, 'data-msg': m.id }, body, h('small', { class: 'btime' }, fmtT(m.at)));
    };
    const headMeta = h('div', { class: 'cinfo' }, h('b', {}, `@${name}`), h('small', {}, '…'));
    const poll = async (mark = true) => {
      const d = await get(`/api/phone/thread?with=${encodeURIComponent(name)}&after=${lastId}${mark ? '' : '&read=0'}`).catch(() => null); if (!d) return;
      headMeta.replaceChildren(h('b', {}, `@${name}`), h('small', {}, d.state.replace('_', ' ')));
      if (!d.friends) {
        compose.replaceChildren(h('p', { class: 'ph-mut', style: 'flex:1;margin:0' }, 'Add them as a friend to chat and send money.'),
          h('button', { class: 'ph-btn small', onclick: async () => { await this.ui.guard(() => post('/api/phone/friends/request', { username: name })); this.ui.toast('Friend request sent.'); } }, 'Add'));
      }
      for (const m of d.messages) { if (seen.has(m.id)) continue; seen.add(m.id); lastId = Math.max(lastId, m.id); log.append(bubble(m)); }
      log.scrollTop = log.scrollHeight;
      log.querySelectorAll('.bub.me').forEach((e) => { e.classList.toggle('read', Number(e.dataset.msg) <= d.readByThem); });
    };
    this.chatPoll = () => poll();
    const input = h('input', { class: 'ph-input', id: 'phChatInput', placeholder: 'iMessage', autocomplete: 'off', maxlength: 500, onkeydown: (e) => { e.stopPropagation(); if (e.key === 'Enter') send(); } });
    const send = async () => { const t = input.value.trim(); if (!t) return; input.value = ''; const r = await this.ui.guard(() => post('/api/phone/messages', { to: name, text: t })); if (r) await poll(); };
    const rec = this.recorder(name, () => poll());
    const compose = h('div', { class: 'chcomp' },
      h('button', { class: 'cpay', id: 'phChatPay', title: 'Pay', onclick: () => this.paySheet(name, () => poll()) }, '₦'),
      input,
      h('button', { class: 'csend', id: 'phChatSend', onclick: send, title: 'Send' }, '↑'),
      rec.btn);
    const head = h('div', { class: 'chead' },
      h('button', { class: 'pback', onclick: () => this.back() }, '‹'),
      av(name), headMeta,
      h('span', { class: 'crow-acts' },
        h('button', { class: 'cact-pay', id: 'phChatPayTop', title: 'Pay', onclick: () => this.paySheet(name, () => poll()) }, 'Pay'),
        h('button', { id: 'phChatCall', title: 'Call', onclick: () => this.p.dial(name) }, '📞')));
    await poll();
    this.chatTimer = setInterval(() => { if (!log.isConnected) return clearInterval(this.chatTimer); poll(); }, 4000);
    return [h('div', { class: 'chatview' }, head, log, compose)];
  }
  /** In-phone pay modal (does not leave the phone frame). */
  paySheet(name, done) {
    let amount = PAY_PRESETS[1];
    const cash = this.g.user?.cash ?? 0;
    const amtIn = h('input', { class: 'ph-input', type: 'number', inputmode: 'numeric', placeholder: 'Amount', value: String(amount), min: 1 });
    const presets = h('div', { class: 'pay-presets' });
    const paint = () => presets.replaceChildren(...PAY_PRESETS.map((n) => h('button', { class: n === amount ? 'on' : '', onclick: () => { amount = n; amtIn.value = String(n); paint(); } }, fmtN(n))));
    paint();
    const close = () => overlay.remove();
    const overlay = h('div', { class: 'pay-overlay', onclick: (e) => { if (e.target === overlay) close(); } },
      h('div', { class: 'pay-sheet-card', onclick: (e) => e.stopPropagation() },
        h('div', { class: 'pay-sheet' },
          h('div', { class: 'pay-grab' }, ''),
          h('h4', {}, `Pay @${name}`),
          h('p', { class: 'ph-mut' }, `Cash on hand: ${fmtN(cash)} · game money only`),
          presets, amtIn,
          h('button', { class: 'ph-btn green', style: 'width:100%;margin-top:14px', onclick: async () => {
            const n = Math.floor(Number(amtIn.value)); if (!(n > 0)) return this.ui.toast('Enter an amount.');
            const r = await this.ui.guard(() => post('/api/phone/pay', { to: name, amount: n, idem: crypto.randomUUID?.() || String(Math.random()) }));
            if (r) { if (r.user) this.g.update?.(r.user); this.ui.toast(r.text || 'Sent', 'money'); close(); done?.(); }
          } }, 'Send payment'),
          h('button', { class: 'ph-btn ghost', style: 'width:100%;margin-top:8px', onclick: close }, 'Cancel'))));
    this.screen.append(overlay);
  }
  voiceBubble(m) {
    const v = m.voice; if (v.gone) return h('span', { class: 'ph-mut' }, '🎤 Voice note expired');
    const bars = (v.waveform?.length ? v.waveform : Array.from({ length: 28 }, (_, i) => 30 + ((i * 37) % 60))).map((n) => h('i', { style: `height:${Math.max(12, n * 0.3)}px` }));
    const btn = h('button', { class: 'vplay', 'data-voice': v.id, onclick: () => this.play(v.id, btn) }, '▶');
    return h('span', { class: 'vnote' }, btn, h('span', { class: 'vwave' }, bars), h('small', {}, dur(v.durationMs)),
      h('button', { class: 'vrep', title: 'Report', onclick: () => this.ui.reportSheet('voice_note', String(v.id), 'a voice note') }, '⚑'));
  }
  play(id, btn) {
    const cur = this.audio; if (cur) { cur.pause(); this.audioBtn && (this.audioBtn.textContent = '▶'); if (this.audioId === id) { this.audio = null; return; } }
    const a = this.audio = new Audio(`/api/phone/voice/${id}`); this.audioId = id; this.audioBtn = btn; btn.textContent = '⏸';
    a.onended = () => { btn.textContent = '▶'; }; a.onerror = () => { btn.textContent = '▶'; this.ui.toast('Could not play that voice note.'); };
    a.play().catch(() => { btn.textContent = '▶'; });
  }
  recorder(name, done) {
    const mime = pickMime(); const btn = h('button', { class: '', id: 'recBtn', title: 'Voice note' }, '🎤'); let rec = null, chunks = [], t0 = 0, stream = null, tmr = null, wave = [], an = null, ctx = null;
    if (!mime || !navigator.mediaDevices?.getUserMedia || window.__naDemo) { btn.disabled = true; btn.title = window.__naDemo ? 'Voice notes need the live server' : 'Your browser cannot record voice notes'; return { btn }; }
    const stop = (send) => {
      clearInterval(tmr); if (!rec) return; const r = rec; rec = null;
      r.onstop = async () => {
        stream?.getTracks().forEach((t) => t.stop()); try { ctx?.close(); } catch { /* ignore */ }
        btn.textContent = '🎤'; btn.classList.remove('rec'); if (!send) return;
        const blob = new Blob(chunks, { type: r.mimeType || mime }); const ms = Date.now() - t0; const wf = wave.length ? wave.join(',') : '';
        const res = await fetch(`/api/phone/voice?to=${encodeURIComponent(name)}`, { method: 'POST', headers: { 'content-type': (blob.type || mime).split(';')[0], 'x-duration-ms': String(ms), 'x-waveform': wf }, body: blob });
        const j = await res.json().catch(() => ({})); if (!res.ok) this.ui.toast(j.message || 'Could not send the voice note.'); else done();
      };
      r.stop();
    };
    btn.onclick = async () => {
      if (rec) return stop(true); if (!(await this.p.consentOk())) return;
      try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch (e) { return this.ui.toast(this.p.micMsg(e)); }
      chunks = []; wave = []; rec = new MediaRecorder(stream, { mimeType: mime, audioBitsPerSecond: 24000 });
      rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); an = ctx.createAnalyser(); ctx.createMediaStreamSource(stream).connect(an); } catch { an = null; }
      rec.start(250); t0 = Date.now(); btn.textContent = '⏹'; btn.classList.add('rec');
      tmr = setInterval(() => {
        const s = Math.round((Date.now() - t0) / 1000); btn.textContent = `⏹`;
        if (an) { const b = new Uint8Array(an.fftSize); an.getByteTimeDomainData(b); let m = 0; for (const v of b) m = Math.max(m, Math.abs(v - 128)); if (wave.length < 48 && s * 1000 % 1250 < 1000) wave.push(Math.min(100, Math.round(m * 1.6))); }
        if (s >= 60) stop(true);
      }, 500);
    };
    btn.oncontextmenu = (e) => { e.preventDefault(); stop(false); };
    return { btn };
  }
  async calls() {
    const d = await this.ui.guard(() => get('/api/phone/friends')); if (!d) return [];
    const t = await this.ui.guard(() => get('/api/phone/threads'));
    const log = []; for (const th of (t?.threads || [])) if (th.last?.kind === 'system') log.push({ who: th.with, text: th.last.text, at: th.last.at });
    log.sort((a, b) => b.at - a.at);
    return [
      h('p', { class: 'ph-mut' }, 'Voice calls · friends only · never recorded.'),
      h('div', { class: 'plist' }, d.friends.map((f) => h('div', { class: 'prow', 'data-call-friend': f.username },
        h('span', { style: 'display:flex;gap:10px;align-items:center' }, av(f.username, f.state), h('b', {}, `@${f.username}`)),
        h('button', { class: 'ph-btn small green', disabled: f.state === 'offline' || f.state === 'dnd' ? 'disabled' : null, onclick: () => this.p.dial(f.username) }, 'Call')))),
      d.friends.length ? '' : h('p', { class: 'ph-mut' }, 'No friends yet.'),
      log.length ? h('div', {}, h('div', { class: 'ph-mut', style: 'margin:12px 4px 6px' }, 'Recent'), h('div', { class: 'plist' }, log.slice(0, 8).map((l) => h('div', { class: 'prow' }, h('span', {}, l.text), h('span', { class: 'ph-mut small' }, `@${l.who} · ${fmtT(l.at)}`))))) : '',
    ];
  }
  async settings() {
    if (this.g.user?.guest) return [];
    const s = await this.ui.guard(() => get('/api/phone/settings')); if (!s) return [];
    const sel = (key, val) => async () => { await this.ui.guard(() => post('/api/phone/settings', { [key]: val })); this.draw(); };
    const tog = (label, on, key) => h('div', { class: 'prow' }, h('span', {}, label), h('button', { class: `ph-btn small ${on ? 'green' : 'ghost'}`, 'data-setting': key, onclick: sel(key, !on) }, on ? 'On' : 'Off'));
    return [
      h('div', { class: 'ph-mut', style: 'margin:4px 4px 8px' }, 'More apps'),
      h('div', { class: 'plist' },
        h('div', { class: 'prow tap', onclick: () => this.go('land') }, h('span', {}, '🌍 Land'), h('span', { class: 'ph-mut' }, '›')),
        h('div', { class: 'prow tap', onclick: () => this.go('safe') }, h('span', {}, '🛡 Safety'), h('span', { class: 'ph-mut' }, '›')),
        h('div', { class: 'prow tap', onclick: () => this.go('contacts') }, h('span', {}, '👥 Contacts'), h('span', { class: 'ph-mut' }, '›')),
      ),
      h('div', { class: 'ph-mut', style: 'margin:14px 4px 8px' }, 'Phone'),
      h('div', { class: 'plist' },
      tog('Do Not Disturb', s.dnd, 'dnd'),
      tog('Show online status', s.showPresence, 'showPresence'),
      h('div', { class: 'prow' }, h('span', {}, 'Calls from'), h('button', { class: 'ph-btn small ghost', 'data-setting': 'callsFrom', onclick: sel('callsFrom', s.callsFrom === 'friends' ? 'nobody' : 'friends') }, s.callsFrom)),
      h('div', { class: 'prow' }, h('span', {}, 'Voice notes from'), h('button', { class: 'ph-btn small ghost', 'data-setting': 'voiceNotesFrom', onclick: sel('voiceNotesFrom', s.voiceNotesFrom === 'nobody' ? 'friends' : 'nobody') }, s.voiceNotesFrom)),
    ), h('p', { class: 'ph-mut', style: 'margin:12px 4px' }, s.voiceConsent ? 'Voice notice accepted.' : 'You will be asked to accept the voice notice the first time you record or call.')];
  }
}
