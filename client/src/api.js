export class ApiError extends Error { constructor(status, data) { super(data?.message || 'Request failed'); this.status = status; this.code = data?.error || 'ERROR'; this.data = data || {}; } }
export async function api(method, path, body, opts = {}) {
  let res;
  try {
    const pre = method === 'GET' && typeof window !== 'undefined' && window.__pre?.[path]; if (pre) { delete window.__pre[path]; const r0 = await pre; if (r0 && r0.ok) { try { return await r0.json(); } catch { /* fall through to a normal request */ } } }
    res = await fetch(path, { method, credentials: 'same-origin', headers: body !== undefined && !opts.raw ? { 'content-type': 'application/json', ...(opts.headers || {}) } : (opts.headers || {}), body: opts.raw ? body : body !== undefined ? JSON.stringify(body) : undefined });
  } catch (e) { throw new ApiError(0, { error: 'NETWORK', message: 'Cannot reach the server. Check your connection.' }); }
  let data = null; try { data = await res.json(); } catch { /* non-json */ }
  if (!res.ok && res.status === 403 && data?.error === 'BANNED') showBanned(data.message);
  if (!res.ok && res.status === 403 && data?.error === 'BREAK_TIME' && typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('na-break', { detail: data })); // safety settings: the day's play time is used up, or quiet hours
  if (!res.ok) throw new ApiError(res.status, data || { message: `Server error (${res.status})` });
  return data;
}
/** a suspended account sees why, and can still log out or take their data (the server allows only those) */
function showBanned(message) {
  if (typeof document === 'undefined' || document.getElementById('banned')) return; const d = document.createElement('div'); d.id = 'banned'; d.style.cssText = 'position:fixed;inset:0;z-index:999;background:#101418f2;color:#fff;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;font:700 16px Nunito,system-ui,sans-serif';
  const box = document.createElement('div'); box.style.maxWidth = '420px'; const t = document.createElement('p'); t.textContent = '⛔ ' + (message || 'Your account is suspended.'); const row = document.createElement('div'); row.style.cssText = 'display:flex;gap:10px;justify-content:center;flex-wrap:wrap';
  const mk = (label, fn) => { const b = document.createElement('button'); b.textContent = label; b.style.cssText = 'padding:10px 16px;border-radius:12px;border:0;font:800 14px Nunito,system-ui;cursor:pointer'; b.onclick = fn; return b; };
  row.append(mk('Download my data', () => { location.href = '/api/account/export'; }), mk('Log out', async () => { await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {}); location.reload(); })); box.append(t, row); d.append(box); document.body.append(d);
}
export const get = (p) => api('GET', p);
export const post = (p, b = {}) => api('POST', p, b);
export const fmtN = (n) => '₦' + Math.round(n).toLocaleString('en-NG');
export const $ = (s, el = document) => el.querySelector(s);
export const $$ = (s, el = document) => [...el.querySelectorAll(s)];
export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) { if (k === 'class') el.className = v; else if (k.startsWith('on')) el.addEventListener(k.slice(2), v); else if (v !== false && v != null) el.setAttribute(k, v === true ? '' : v); }
  for (const k of kids.flat()) if (k != null && k !== false) el.append(k.nodeType ? k : document.createTextNode(String(k)));
  return el;
}
