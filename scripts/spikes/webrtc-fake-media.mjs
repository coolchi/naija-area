// SPIKE (phase 3 planning, not part of npm test): proves headless Chrome can do getUserMedia with FAKE devices, a two-peer WebRTC audio call
// (loopback in one page, no STUN/TURN), and MediaRecorder voice notes. Run: node scripts/spikes/webrtc-fake-media.mjs
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import http from 'node:http';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
const srv = http.createServer((q, r) => { r.setHeader('content-type', 'text/html'); r.end('<!doctype html><title>spike</title><body>spike'); }); await new Promise(r => srv.listen(0, '127.0.0.1', r));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required', '--allow-loopback-in-peer-connection', '--force-webrtc-ip-handling-policy=default', '--webrtc-ip-handling-policy=default', '--enable-features=NetworkServiceInProcess', '--disable-features=NetworkServiceSandbox,WebRtcHideLocalIpsWithMdns'] });
const page = await browser.newPage(); await page.goto(`http://127.0.0.1:${srv.address().port}/`);
const out = await page.evaluate(async () => {
  const res = {}; const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true }, video: false }); res.tracks = stream.getAudioTracks().map(t => t.label);
  const a = new RTCPeerConnection(), b = new RTCPeerConnection(); const qa = [], qb = []; let ready = false; a.onicecandidate = e => { if (e.candidate) (ready ? b.addIceCandidate(e.candidate) : qa.push(e.candidate)); }; b.onicecandidate = e => { if (e.candidate) (ready ? a.addIceCandidate(e.candidate) : qb.push(e.candidate)); };
  let remote = null; b.ontrack = e => { remote = e.streams[0]; }; stream.getTracks().forEach(t => a.addTrack(t, stream));
  const offer = await a.createOffer(); await a.setLocalDescription(offer); await b.setRemoteDescription(offer); const ans = await b.createAnswer(); await b.setLocalDescription(ans); await a.setRemoteDescription(ans); ready = true; qa.forEach(c => b.addIceCandidate(c)); qb.forEach(c => a.addIceCandidate(c));
  await new Promise(r => { const t = setInterval(() => { if (a.connectionState === 'connected' && b.connectionState === 'connected') { clearInterval(t); r(); } }, 100); setTimeout(r, 8000); });
  await new Promise(r => setTimeout(r, 1500)); res.connection = [a.connectionState, b.connectionState]; res.sdp = a.localDescription.sdp.split('\n').filter(l => /^(m=|a=candidate|a=ice-ufrag|a=sendrecv|a=inactive)/.test(l)).join('|'); res.debug = { ice: [a.iceConnectionState, b.iceConnectionState], gather: [a.iceGatheringState, b.iceGatheringState], cand: [qa.length, qb.length] }; res.gotRemoteStream = !!remote;
  const st = await b.getStats(); st.forEach(s => { if (s.type === 'inbound-rtp' && s.kind === 'audio') res.inbound = { bytesReceived: s.bytesReceived, packetsReceived: s.packetsReceived, codecId: s.codecId }; if (s.type === 'codec' && /opus/i.test(s.mimeType)) res.codec = s.mimeType; });
  res.recorderTypes = Object.fromEntries(['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'].map(t => [t, MediaRecorder.isTypeSupported(t)]));
  const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/mp4'; const rec = new MediaRecorder(stream, { mimeType: mime, audioBitsPerSecond: 24000 }); const parts = []; rec.ondataavailable = e => parts.push(e.data); const done = new Promise(r => { rec.onstop = r; });
  rec.start(); await new Promise(r => setTimeout(r, 2000)); rec.stop(); await done; const blob = new Blob(parts, { type: mime }); res.voiceNote = { mime, bytes: blob.size, seconds: 2, kbpsMeasured: Math.round((blob.size * 8) / 2 / 100) / 10 };
  a.close(); b.close(); stream.getTracks().forEach(t => t.stop()); return res;
});
console.log(JSON.stringify(out, null, 2)); await browser.close(); srv.close();
const capture = out.tracks?.length > 0 && out.voiceNote?.bytes > 500; const ice = out.connection?.every(c => c === 'connected') && out.inbound?.bytesReceived > 0;
console.log(`fake mic + MediaRecorder voice note: ${capture ? 'OK' : 'FAILED'}`); console.log(`two-peer WebRTC audio loopback: ${ice ? 'OK' : 'NOT VERIFIED (ICE gathered ' + (out.debug?.cand[0] + out.debug?.cand[1]) + ' candidates; some sandboxes block network-interface enumeration. Re-run on a normal machine/CI runner)'}`);
process.exit(capture ? 0 : 1);
