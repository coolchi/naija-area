// Password reset page: /reset asks for a link by email; /reset?token=... sets the new password. No inline script (CSP).
(() => {
const $ = (s) => document.querySelector(s);
const post = async (p, b) => { const r = await fetch(p, { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }); const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.message || 'Something went wrong. Try again.'); return d; };
const token = new URLSearchParams(location.search).get('token');
if (!token) {
  $('#askCard').hidden = false;
  $('#askForm').onsubmit = async (e) => { e.preventDefault(); const b = $('#askGo'); b.disabled = true; $('#askMsg').textContent = '';
    try { const d = await post('/api/auth/forgot', { email: new FormData(e.target).get('email') }); $('#askMsg').textContent = d.message; } catch (er) { $('#askMsg').textContent = er.message; } finally { b.disabled = false; } };
  return;
}
history.replaceState(null, '', '/reset'); // keep the token out of the address bar, history and Referer
$('#setCard').hidden = false;
fetch('/api/auth/reset/check?token=' + encodeURIComponent(token), { credentials: 'same-origin' }).then(r => r.json()).then(d => {
  if (d.ok) $('#setWho').textContent = `Account: @${d.username}`; else { $('#setWho').textContent = d.message || 'This link does not work.'; $('#setForm').hidden = true; $('#setMsg').innerHTML = '<a href="/reset">Ask for a new link</a>'; }
}).catch(() => {});
$('#setForm').onsubmit = async (e) => { e.preventDefault(); const f = new FormData(e.target); const p1 = String(f.get('password') || ''), p2 = String(f.get('password2') || '');
  if (p1 !== p2) { $('#setMsg').textContent = 'The two passwords do not match.'; return; }
  const b = $('#setGo'); b.disabled = true;
  try { const d = await post('/api/auth/reset', { token, password: p1 }); $('#setForm').hidden = true; $('#setMsg').innerHTML = ''; $('#setMsg').append(d.message + ' ', Object.assign(document.createElement('a'), { href: '/', textContent: 'Log in' })); }
  catch (er) { $('#setMsg').textContent = er.message; b.disabled = false; } };
})();
