# In-game phone (PHONE_V2)

Status: built and ON by default (`PHONE_V2` default true; set `PHONE_V2=false` to fall back to the old tabbed phone). Spec: `../15_phone_system_spec.md`.

## What it is
- **Home screen** as the landing screen: status bar (time, signal, battery), app grid, Back / Home / Close buttons. Old features (Wallet, Jobs, Home/houses, Garage, Games, Map, ...) are apps on the grid.
- **Contacts**: friend requests by username, accept/decline, presence dot (online / offline), mute, block, remove, report.
- **Messages**: persistent 1:1 chats with friends only, unread badges, read ticks.
- **Voice notes**: MediaRecorder (webm/opus; ogg or mp4 fallback for iOS Safari), 60 s max, 600 KB max, server checks magic bytes, mime allow-list, duration, bytes-per-ms, per-minute and per-day caps. Audio is served only to the two people in the thread (403 otherwise). **Auto-delete 24 hours after sending (Sherif, 10 Oct 2026)**; a note with an OPEN report is frozen until the report is resolved. Configurable: `balance.phone.voice.retentionMs`.
- **Calls**: live 1:1 voice between friends, WebRTC audio, signalling over the existing websocket (server relays offer/answer/ICE only). Incoming call screen rings (WebAudio ringtone + vibration), answer/decline, in-call mute and hang up, missed-call system message in the chat, busy and Do-not-disturb replies, ring timeout (`balance.phone.call.ringMs`). **No call recording**; the call log keeps metadata only (who, when, seconds, end reason, which ICE path was used).
- During a **staked game** an incoming call shows a banner and never interrupts the turn.

## Defaults used (spec open questions)
Friends-only calls and voice notes; guests have no phone features; mute/block/report apply to chats, calls and voice notes; voice-note retention 24 h (decided by Sherif); the voice consent sheet is shown once before the first mic use (18+ notice).

## STUN / TURN
Public Google STUN is the default (`NA_STUN_URLS`). **TURN is not configured: no account yet.** The relay vendor decision is due within 30 days of 10 Oct 2026 (Sherif). Without TURN, some mobile networks (symmetric NAT, common on Nigerian carriers: UNVERIFIED) will fail to connect and calls will end with an ICE failure that is logged.
To plug in Cloudflare TURN or any other relay, set before starting the server:
```
NA_TURN_URLS=turn:turn.example.com:3478?transport=udp,turns:turn.example.com:443?transport=tcp
NA_TURN_USERNAME=...     NA_TURN_CREDENTIAL=...
```
(Cloudflare Realtime TURN issues short-lived credentials by API; the current code uses static env credentials, so short-lived credential minting would be a small addition in `iceServers()` in `server/core/phone/phone.js`. UNVERIFIED against Cloudflare's current docs.)

## Tests
- `tests/phone.test.js`: friends, chat, voice-note limits, retention + freeze, report flow, call state machine (ring, answer, decline, cancel, missed, busy, DND, offline, blocked, non-friend).
- `scripts/phone-smoke.mjs` (`npm run smoke:phone`): two real Chrome contexts with fake media devices. Verifies: home screen apps, friend request/accept, text + read ticks, real MediaRecorder voice note recorded and delivered and fetchable (stranger gets 403), incoming call screen rings, signalling (offer and answer applied on both sides), mute, hang up logged as completed, decline, missed on timeout.

## Verified vs NOT verified
- Verified: server logic, signalling through the websocket, voice-note recording with Chrome's fake microphone, the UI flows above.
- **NOT verified: real two-way audio.** In this sandbox Chrome gathers no ICE candidates at all (a bare `RTCPeerConnection` also returns zero candidates), so the peer connection never reaches "connected". The smoke prints this honestly. Real audio, TURN, iOS Safari and Nigerian mobile networks must be tested on real phones.
- Not verified: voice quality and data use (Opus bitrates in the spec are ESTIMATES), battery.

## Demo-static
The offline demo has no websocket, so incoming-call push does not work and there is only one player: friends/chat/voice-note screens render and use the in-browser mock server, but live calls cannot be tried there.
