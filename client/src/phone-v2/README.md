# phone-v2 (empty on purpose)
Client modules for the phone system (phase 3) will live here, behind the `PHONE_V2` flag. Nothing here is imported by `main.js`, so the bundle and the game are unchanged.

Planned files (see `15_phone_system_spec.md` section 4 and 5):
`shell.js` (status bar, home/back gestures, app grid) · `home.js` · `contacts.js` · `chats.js` · `voicenote.js` (MediaRecorder + player) · `call.js` (RTCPeerConnection + call UI) · `signal.js` (the `phone.*` events on the existing socket).

The clickable design mockup is `app/docs/phone-mockup.html` (open it in a browser; no server needed).
