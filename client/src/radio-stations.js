// The car's REAL radio stations: ONE config file (10 Oct 2026). Sherif approved these four Lagos stations for the in-car radio.
// Plain audio element straight from each station's own stream host: no proxy, no rebroadcast, no game ads over or inside a stream.
//
// HONESTY (see docs/RADIO.md and 20_radio_streaming_research.md):
//  - The URLs below answered HTTP 200 with audio/mpeg (128 kbps) when fetched with curl on 10 Oct 2026. Nobody has LISTENED to them in the game.
//  - NO station has given written permission for use in a game. Music licensing (COSON) and broadcaster rights may apply (layperson reading, needs a lawyer).
//    Sherif approved the technical build anyway. No letters or outreach to stations are planned.
//  - THE BEAT: its URL was INFERRED from the sister stations' naming (the same host, mount "beatfmlagos"); the station's own page only embeds an Atunwa player. A made-up
//    mount returned 404 and this one returned audio, but it is UNCONFIRMED BY EAR and may not be the right feed. Check it once by listening before treating it as final.
//  - Jet Radio was removed at Sherif's request.
//
// GLOBAL OFF SWITCH: set the environment variable NA_REAL_RADIO=0 on the server, or POST /api/admin/radio {"enabled":false} as admin (until restart).
// The client reads `realRadio` from GET /api/config. When it is false the car plays only the synthesised stations (radio.js).
// To remove or change a station, edit this list only.
export const REAL_STATIONS = [
  { id: 'cool', name: 'Cool FM', freq: '96.9', mood: 'Lagos pop and hits', url: 'https://coolfmlagos969-atunwadigital.streamguys1.com/coolfmlagos969', color: '#2bb3ff' },
  { id: 'wazobia', name: 'Wazobia FM', freq: '95.1', mood: 'Pidgin talk and music', url: 'https://wazobiafmlagos951-atunwadigital.streamguys1.com/wazobiafmlagos951', color: '#2ecc71' },
  { id: 'nigeriainfo', name: 'Nigeria Info', freq: '99.3', mood: 'Talk and news (may not suit every player)', url: 'https://nigeriainfofmlagos993-atunwadigital.streamguys1.com/nigeriainfofmlagos993', color: '#e0572b' },
  { id: 'beat', name: 'The Beat', freq: '99.9', mood: 'Hits', url: 'https://beatfmlagos-atunwadigital.streamguys1.com/beatfmlagos', color: '#d63aa8', unconfirmed: 'URL inferred from the sister stations; not confirmed by ear' },
];
/** the stations in the order the driver tunes through them: real ones first (when switched on), then the synthesised fallbacks */
export function carStations(realEnabled, synth, real = REAL_STATIONS) { return [...(realEnabled ? real.map(r => ({ ...r, kind: 'real' })) : []), ...synth]; }
export const STREAM_STALL_MS = 12000; // no sound this long after play() = treat as a stream error and fall through
export const FAIL_RETRY_MS = 5 * 60000; // a station that failed is skipped by the automatic fall-through for this long
