// Phone controller (PHONE_V2): websocket events, unread/missed badges, voice calls (WebRTC audio, signalling through the server), the call overlay, ringtone and voice-note recording.
// No call audio is ever recorded or sent to the server. Calls are friends-only; guests have no phone features.
import { get, post, h, $ } from '../api.js';

const MIMES = ['audio/webm;codecs=opus', 'audio/ogg;codecs=opus', 'audio/mp4'];
export const pickMime = () => (typeof MediaRecorder === 'undefined' ? null : MIMES.find(m => MediaRecorder.isTypeSupported?.(m)) || null);
export class PhoneSys {
  constructor(g) { this.g = g; this.call = null; this.pc = null; this.stream = null; this.muted = false; this.pendingIce = []; this.offer = null; this.badges = { msgs: 0, reqs: 0, missed: 0 }; this.listeners = new Set(); this.enabled = !!g.cfg.phone; }
  get usable() { return this.enabled && !this.g.user?.guest; }
  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  emit(ev) { for (const f of this.listeners) try { f(ev); } catch { /* ignore */ } }
  start() { if (!this.usable) return; this.refresh(); this.timer = setInterval(() => this.poll(), 5000); }
  stop() { clearInterval(this.timer); this.endLocal(); }
  async refresh() { if (!this.usable) return; try { const f = await get('/api/phone/friends'); const t = await get('/api/phone/threads'); this.badges.reqs = f.incoming.length; this.badges.msgs = t.threads.reduce((a, x) => a + x.unread, 0); this.drawBadge(); } catch { /* offline */ } }
  drawBadge() { const n = this.badges.msgs + this.badges.reqs + this.badges.missed; const b = $('#phoneBadge'); if (b && n) { b.textContent = String(n + (this.g.unread || 0)); b.classList.remove('hidden'); } }
  async poll() { if (!this.usable) return; try { const r = await get('/api/phone/call'); if (r.call && (!this.call || this.call.callId !== r.call.callId)) this.adopt(r.call); else if (!r.call && this.call && this.call.state !== 'ended' && Date.now() - (this.call.startedAt || 0) > 4000) this.finish('ended'); } catch { /* ignore */ } this.refresh(); }
  adopt(c) { if (this.call && this.call.callId === c.callId) return; this.call = { ...c, startedAt: Date.now() }; this.iceServers = c.iceServers || this.iceServers; if (c.incoming && c.state === 'ringing') this.ringIn(); this.render(); }
  onPush(m) {
    const t = m.type; if (t === 'phone.message') { this.badges.msgs++; this.drawBadge(); this.emit({ kind: 'message', m }); if (!document.querySelector('[data-chat-open="' + m.from + '"]')) this.g.ui.toast(`💬 @${m.from}: ${m.kind === 'voice' ? '🎤 voice note' : (m.text || '').slice(0, 60)}`); }
    else if (t === 'phone.message.read') this.emit({ kind: 'read', m });
    else if (t === 'phone.friend.request') { this.badges.reqs++; this.drawBadge(); this.g.ui.toast(`🤝 @${m.from} sent a friend request`); this.emit({ kind: 'friends' }); }
    else if (t === 'phone.friend.update') this.emit({ kind: 'friends' });
    else if (t === 'phone.call.incoming') { this.iceServers = m.iceServers; this.call = { callId: m.callId, state: 'ringing', with: m.from, incoming: true, ringUntil: m.ringUntil, startedAt: Date.now() }; this.offer = null; this.pendingIce = []; this.ringIn(); this.render(); }
    else if (t === 'phone.call.state' && this.call?.callId === m.callId) { this.call.state = m.state; if (m.iceServers) this.iceServers = m.iceServers; this.render(); }
    else if (t === 'phone.call.signal' && this.call?.callId === m.callId) this.onSignal(m);
    else if (t === 'phone.call.ended' && this.call?.callId === m.callId) { if (m.reason === 'missed' || m.reason === 'cancelled' || m.reason === 'dnd' || m.reason === 'busy') { if (this.call.incoming) { this.badges.missed++; this.drawBadge(); this.g.ui.toast(`📞 Missed call from @${this.call.with}`); } } this.finish(m.reason); }
  }
  // ---------- ringing
  ringIn() { this.stopRing(); this.ringBeep(); this.ringTimer = setInterval(() => this.ringBeep(), 2200); try { navigator.vibrate?.([300, 150, 300]); } catch { /* ignore */ } }
  ringBeep() { try { const A = (this.ctx ||= new (window.AudioContext || window.webkitAudioContext)()); if (A.state === 'suspended') A.resume(); const now = A.currentTime; [0, 0.35].forEach((o, i) => { const os = A.createOscillator(), gn = A.createGain(); os.type = 'sine'; os.frequency.value = i ? 523 : 659; gn.gain.setValueAtTime(0.0001, now + o); gn.gain.exponentialRampToValueAtTime(0.08, now + o + 0.03); gn.gain.exponentialRampToValueAtTime(0.0001, now + o + 0.3); os.connect(gn).connect(A.destination); os.start(now + o); os.stop(now + o + 0.32); }); } catch { /* audio may be locked until a tap */ } }
  stopRing() { clearInterval(this.ringTimer); this.ringTimer = null; }
  // ---------- calling
  async consentOk() {
    const s = await get('/api/phone/settings'); if (s.voiceConsent) return true;
    return new Promise(res => { const done = (v) => { el.remove(); res(v); }; const el = h('div', { id: 'consentUi' }, h('div', { class: 'cinner card' }, h('b', {}, 'Voice notice'), h('p', {}, 'Calls and voice notes use your microphone. Calls are peer to peer and are never recorded by the game. Voice notes are deleted 24 hours after sending. You can mute, block or report anyone. 18+ only.'),
      h('div', { class: 'crow' }, h('button', { class: 'cbtn green', id: 'voiceConsent', onclick: async () => { await post('/api/phone/settings', { voiceConsent: true }); done(true); } }, 'I agree'), h('button', { class: 'cbtn', onclick: () => done(false) }, 'Not now')))); document.body.append(el); });
  }
  async dial(name) {
    if (this.call && this.call.state !== 'ended') return this.g.ui.toast('You are already in a call.'); if (!(await this.consentOk())) return;
    const r = await this.g.ui.guard(() => post('/api/phone/call/start', { to: name })); if (!r) return; if (r.ok === false) { this.g.ui.toast(r.text || 'They cannot take the call right now.'); return; }
    this.iceServers = r.iceServers; this.call = { callId: r.callId, state: 'ringing', with: name, incoming: false, ringUntil: r.ringUntil, startedAt: Date.now() }; this.render();
    try { await this.openMic(); await this.makePc(); const off = await this.pc.createOffer(); await this.pc.setLocalDescription(off); await post('/api/phone/call/signal', { callId: r.callId, kind: 'offer', sdp: off.sdp }); }
    catch (e) { this.g.ui.toast(this.micMsg(e)); this.hangup(); }
  }
  micMsg(e) { return e?.name === 'NotAllowedError' ? 'Microphone is blocked. Allow it in your browser settings to call.' : e?.name === 'NotFoundError' ? 'No microphone found.' : 'Could not start the call audio.'; }
  async openMic() { this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 }, video: false }); }
  async makePc() {
    const pc = this.pc = new RTCPeerConnection({ iceServers: this.iceServers || [{ urls: ['stun:stun.l.google.com:19302'] }] }); const id = this.call.callId;
    for (const tr of this.stream.getTracks()) pc.addTrack(tr, this.stream);
    pc.onicecandidate = (e) => { if (e.candidate) post('/api/phone/call/signal', { callId: id, kind: 'ice', candidate: e.candidate.toJSON() }).catch(() => {}); };
    pc.ontrack = (e) => { let a = $('#callAudio'); if (!a) { a = h('audio', { id: 'callAudio', autoplay: true, playsinline: true }); document.body.append(a); } a.srcObject = e.streams[0]; a.play?.().catch(() => {}); };
    pc.onconnectionstatechange = () => { if (!this.call) return; this.call.rtc = pc.connectionState; if (pc.connectionState === 'connected') { this.call.connectedAt ||= Date.now(); this.sendStats(); } if (pc.connectionState === 'failed') { this.g.ui.toast('The call could not connect (network).'); this.hangup(); } this.render(); };
  }
  async onSignal(m) {
    try {
      if (m.kind === 'offer') { this.offer = m; if (this.pc) await this.takeOffer(); }
      else if (m.kind === 'answer') { await this.pc?.setRemoteDescription({ type: 'answer', sdp: m.sdp }); await this.flushIce(); }
      else if (m.kind === 'ice') { if (this.pc?.remoteDescription) await this.pc.addIceCandidate(m.candidate).catch(() => {}); else this.pendingIce.push(m.candidate); }
    } catch (e) { console.warn('signal', e); }
  }
  async flushIce() { for (const c of this.pendingIce.splice(0)) await this.pc.addIceCandidate(c).catch(() => {}); }
  async takeOffer() { await this.pc.setRemoteDescription({ type: 'offer', sdp: this.offer.sdp }); await this.flushIce(); const ans = await this.pc.createAnswer(); await this.pc.setLocalDescription(ans); await post('/api/phone/call/signal', { callId: this.call.callId, kind: 'answer', sdp: ans.sdp }); }
  async answer() {
    if (!this.call?.incoming) return; this.stopRing(); if (!(await this.consentOk())) return this.decline();
    const r = await this.g.ui.guard(() => post('/api/phone/call/act', { callId: this.call.callId, action: 'answer' })); if (!r || r.state !== 'active') return this.finish(r?.reason || 'missed'); this.call.state = 'active'; this.render();
    try { await this.openMic(); await this.makePc(); if (this.offer) await this.takeOffer(); } catch (e) { this.g.ui.toast(this.micMsg(e)); this.hangup(); }
  }
  async decline() { this.stopRing(); if (!this.call) return; await post('/api/phone/call/act', { callId: this.call.callId, action: 'decline' }).catch(() => {}); this.finish('declined'); }
  async hangup() { const c = this.call; if (!c) return; this.stopRing(); await post('/api/phone/call/act', { callId: c.callId, action: c.state === 'ringing' && !c.incoming ? 'cancel' : 'hangup' }).catch(() => {}); this.finish('completed'); }
  toggleMute() { this.muted = !this.muted; this.stream?.getAudioTracks().forEach(t => { t.enabled = !this.muted; }); this.render(); }
  async sendStats() { try { const st = await this.pc.getStats(); let path = null; st.forEach(r => { if (r.type === 'candidate-pair' && r.state === 'succeeded' && r.nominated) { const l = st.get(r.localCandidateId); path = l?.candidateType === 'relay' ? 'relay' : l?.candidateType === 'srflx' ? 'srflx' : 'host'; } }); if (path) { this.call.icePath = path; post('/api/phone/call/stats', { callId: this.call.callId, icePath: path }).catch(() => {}); } } catch { /* optional */ } }
  endLocal() { this.stopRing(); try { this.pc?.close(); } catch { /* ignore */ } this.pc = null; this.stream?.getTracks().forEach(t => t.stop()); this.stream = null; this.offer = null; this.pendingIce = []; this.muted = false; $('#callAudio')?.remove(); }
  finish(reason) { const c = this.call; this.endLocal(); if (!c) return; c.state = 'ended'; c.reason = reason; this.render(); this.emit({ kind: 'call-ended', c }); this.lastEnded = c; setTimeout(() => { if (this.call === c) { this.call = null; this.render(); } }, 2200); }
  // ---------- overlay
  render() {
    let el = $('#callUi'); const c = this.call; if (!c) { el?.remove(); return; }
    if (!el) { el = h('div', { id: 'callUi' }); document.body.append(el); }
    const inGame = !!(this.g.venue?.open && this.g.venue.match && this.g.venue.match.status === 'playing'); // never interrupt a staked game: show a small banner instead
    const secs = c.connectedAt ? Math.floor((Date.now() - c.connectedAt) / 1000) : 0; const t = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
    const title = c.state === 'ended' ? ({ completed: 'Call ended', declined: 'Call declined', missed: 'Missed call', cancelled: 'Missed call', busy: 'They are busy', dnd: 'Not available', failed: 'Call failed' }[c.reason] || 'Call ended') : c.incoming && c.state === 'ringing' ? 'Incoming call' : c.state === 'ringing' ? 'Calling…' : (c.rtc === 'connected' ? `In call · ${t}` : 'Connecting…');
    const btn = (id, cls, label, fn) => h('button', { id, class: `cbtn ${cls}`, onclick: fn }, label);
    const acts = c.state === 'ended' ? [] : c.incoming && c.state === 'ringing' ? [btn('callDecline', 'red', '✖ Decline', () => this.decline()), btn('callAnswer', 'green', '📞 Answer', () => this.answer())]
      : [btn('callMute', this.muted ? 'on' : '', this.muted ? '🔇 Muted' : '🎙 Mute', () => this.toggleMute()), btn('callHang', 'red', c.state === 'ringing' ? '✖ Cancel' : '📵 Hang up', () => this.hangup())];
    el.className = inGame ? 'banner' : ''; el.replaceChildren(h('div', { class: 'cinner' }, h('div', { class: 'cavatar' }, '📞'), h('div', { class: 'cname' }, `@${c.with}`), h('div', { class: 'cstate', id: 'callState' }, title), h('div', { class: 'crow' }, acts)));
    clearInterval(this.uiTick); if (c.state === 'active') this.uiTick = setInterval(() => { if (this.call) this.render(); else clearInterval(this.uiTick); }, 1000);
  }
}
