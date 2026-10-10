export class ApiError extends Error { constructor(status, data) { super(data?.message || 'Request failed'); this.status = status; this.code = data?.error || 'ERROR'; this.data = data || {}; } }
export async function api(method, path, body, opts = {}) {
  let res;
  try {
    const pre = method === 'GET' && typeof window !== 'undefined' && window.__pre?.[path]; if (pre) { delete window.__pre[path]; const r0 = await pre; if (r0 && r0.ok) { try { return await r0.json(); } catch { /* fall through to a normal request */ } } }
    res = await fetch(path, { method, credentials: 'same-origin', headers: body !== undefined && !opts.raw ? { 'content-type': 'application/json', ...(opts.headers || {}) } : (opts.headers || {}), body: opts.raw ? body : body !== undefined ? JSON.stringify(body) : undefined });
  } catch (e) { throw new ApiError(0, { error: 'NETWORK', message: 'Cannot reach the server. Check your connection.' }); }
  let data = null; try { data = await res.json(); } catch { /* non-json */ }
  if (!res.ok) throw new ApiError(res.status, data || { message: `Server error (${res.status})` });
  return data;
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
