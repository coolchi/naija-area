// MailDESK HTTP client (https://maildesk.ng/docs/send). No SDK — one POST to /api/v1/emails.
import { bad } from '../core/util.js';

const BASE = 'https://maildesk.ng/api/v1';

/**
 * Send one email. Returns the 201 JSON body.
 * @param {{ apiKey: string, from: string, to: string|string[], subject: string, html?: string, text?: string, replyTo?: string, tags?: string[], fetchImpl?: typeof fetch }} opts
 */
export async function sendEmail(opts) {
  const key = String(opts.apiKey || '').trim();
  if (!key.startsWith('md_')) bad('MAIL_OFF', 'Email sending is not configured.', 503);
  const from = opts.from; const to = opts.to; const subject = String(opts.subject || '').slice(0, 998);
  if (!from || !to || !subject) bad('MAIL_BAD', 'Email needs from, to and subject.');
  if (!opts.html && !opts.text) bad('MAIL_BAD', 'Email needs an html or text body.');

  const body = {
    from, to, subject,
    ...(opts.html ? { html: opts.html } : {}),
    ...(opts.text ? { text: opts.text } : {}),
    ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    ...(opts.tags ? { tags: opts.tags } : {}),
  };

  const fetchImpl = opts.fetchImpl || globalThis.fetch;
  if (typeof fetchImpl !== 'function') bad('MAIL_OFF', 'Email sending is not available on this host.', 503);

  let res, data;
  try {
    res = await fetchImpl(`${BASE}/emails`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    data = await res.json().catch(() => ({}));
  } catch (e) {
    bad('MAIL_FAIL', 'Could not reach the mail service. Try again shortly.', 502);
  }

  if (res.status === 201) return data;

  if (res.status === 429) {
    const wait = Number(res.headers?.get?.('retry-after') || 0);
    bad('MAIL_RATE', wait ? `Too many emails. Wait ${wait}s and try again.` : 'Too many emails. Try again in a minute.', 429);
  }

  const msg = data?.message || (data?.status === 'failed' || data?.status === 'suppressed'
    ? `Mail was not delivered (${data.status}).`
    : `Mail service error (${res.status}).`);
  const status = res.status === 401 || res.status === 403 ? 503 : (res.status >= 400 && res.status < 500 ? 400 : 502);
  bad('MAIL_FAIL', msg, status, { mailStatus: res.status, mailId: data?.id || null });
}

export function mailConfig(env = process.env) {
  const apiKey = String(env.MAILDESK_API_KEY || '').trim();
  const from = String(env.MAILDESK_FROM || '').trim().replace(/^["']|["']$/g, '').trim();
  const enabled = apiKey.startsWith('md_') && !!from;
  return { enabled, apiKey, from, replyTo: String(env.MAILDESK_REPLY_TO || '').trim().replace(/^["']|["']$/g, '').trim() || undefined };
}
