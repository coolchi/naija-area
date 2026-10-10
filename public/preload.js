// Starts the two requests the game always makes first while the 300 KB game bundle is still downloading (queue batch 1 item 2, faster loading).
// api.js uses these answers once and falls back to a normal request if one failed. Not used by the static demo (no server there).
if (location.protocol.startsWith('http')) { window.__pre = {}; for (const p of ['/api/config', '/api/city']) window.__pre[p] = fetch(p, { credentials: 'same-origin' }).catch(() => null); }
