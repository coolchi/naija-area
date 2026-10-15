// 3-level multi-level referrals: signup link + email invite, payouts to ancestors (L1 ₦1m, L2 ₦200k, L3 ₦50k).
import { REFERRAL } from '../config/referrals.js';
import { bad, cleanText, dayKey } from './util.js';
import { move, cashId, SYS, balanceOf } from './ledger.js';
import { notify } from './economy.js';
import { registerPlayerData } from './account.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const naira = (n) => '₦' + Math.round(n).toLocaleString('en-NG');

function alphabetCode(n = REFERRAL.codeLen) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < n; i++) s += alphabet[(Math.random() * alphabet.length) | 0];
  return s;
}

export function ensureCode(app, uid) {
  const ex = app.db.prepare('SELECT code FROM referral_codes WHERE user_id=?').get(uid);
  if (ex) return ex.code;
  for (let i = 0; i < 12; i++) {
    const code = alphabetCode();
    try {
      app.db.prepare('INSERT INTO referral_codes(user_id, code, created_at) VALUES (?,?,?)').run(uid, code, app.clock.now());
      return code;
    } catch (e) {
      if (!/UNIQUE|CONSTRAINT/i.test(String(e.message || e))) throw e;
    }
  }
  bad('CODE_FAIL', 'Could not make a referral code. Try again.', 500);
}

function resolveRef(app, raw) {
  const ref = cleanText(String(raw || ''), 40).toUpperCase();
  if (!ref) return null;
  const inv = app.db.prepare("SELECT * FROM referral_invites WHERE token=? AND status='pending'").get(ref);
  if (inv) {
    const u = app.db.prepare('SELECT id, username, is_guest, is_bot FROM users WHERE id=?').get(inv.inviter_id);
    if (u && !u.is_guest && !u.is_bot) return { parentId: u.id, username: u.username, inviteId: inv.id };
  }
  const row = app.db.prepare('SELECT c.user_id, u.username, u.is_guest, u.is_bot FROM referral_codes c JOIN users u ON u.id=c.user_id WHERE c.code=?').get(ref);
  if (row && !row.is_guest && !row.is_bot) return { parentId: row.user_id, username: row.username, inviteId: null };
  // also allow plain username (case-insensitive)
  const byName = app.db.prepare('SELECT id, username, is_guest, is_bot FROM users WHERE lower(username)=lower(?)').get(cleanText(String(raw || ''), 20));
  if (byName && !byName.is_guest && !byName.is_bot) return { parentId: byName.id, username: byName.username, inviteId: null };
  return null;
}

function parentOf(app, uid) {
  const r = app.db.prepare('SELECT parent_id FROM referral_edges WHERE user_id=?').get(uid);
  return r?.parent_id || null;
}

/** Walk up to `levels` ancestors: [L1 parent, L2 grandparent, L3 …]. */
function ancestors(app, parentId, levels = REFERRAL.levels) {
  const out = [];
  let cur = parentId;
  for (let i = 0; i < levels && cur; i++) {
    out.push(cur);
    cur = parentOf(app, cur);
  }
  return out;
}

/**
 * Attach a new registered player to a referrer and pay ancestors.
 * Safe to call once; second call is a no-op if an edge already exists.
 */
export function attachReferral(app, uid, refRaw) {
  if (!refRaw) return null;
  const me = app.db.prepare('SELECT id, username, is_guest, is_bot FROM users WHERE id=?').get(uid);
  if (!me || me.is_guest || me.is_bot) return null;
  if (app.db.prepare('SELECT 1 FROM referral_edges WHERE user_id=?').get(uid)) return null;

  const hit = resolveRef(app, refRaw);
  if (!hit) bad('BAD_REFERRAL', 'That invite link or code is not valid.');
  if (hit.parentId === uid) bad('SELF_REFERRAL', 'You cannot use your own invite link.');

  const chain = ancestors(app, hit.parentId, REFERRAL.levels);
  if (chain.includes(uid)) bad('BAD_REFERRAL', 'That invite link is not valid.');

  const now = app.clock.now();
  const paid = [];
  app.db.transaction(() => {
    app.db.prepare('INSERT INTO referral_edges(user_id, parent_id, created_at) VALUES (?,?,?)').run(uid, hit.parentId, now);
    let inviteId = hit.inviteId;
    if (!inviteId) {
      const mail = app.db.prepare('SELECT email FROM users WHERE id=?').get(uid)?.email;
      if (mail) {
        const byMail = app.db.prepare("SELECT id FROM referral_invites WHERE inviter_id=? AND email=? AND status='pending' ORDER BY id LIMIT 1")
          .get(hit.parentId, mail);
        if (byMail) inviteId = byMail.id;
      }
    }
    if (inviteId) {
      app.db.prepare("UPDATE referral_invites SET status='accepted', accepted_at=?, accepted_user_id=? WHERE id=? AND status='pending'")
        .run(now, uid, inviteId);
    }
    for (let i = 0; i < chain.length; i++) {
      const beneficiary = chain[i];
      const amount = REFERRAL.rewards[i];
      if (!amount) continue;
      const level = i + 1;
      const idem = `referral:L${level}:${uid}`;
      const r = move(app, {
        from: SYS.FAUCET_REFERRAL, to: cashId(beneficiary), amount,
        reason: 'referral', ref: `L${level}:${uid}`, userId: beneficiary, idemKey: idem,
      });
      if (!r.duplicate) {
        app.db.prepare('INSERT INTO referral_payouts(beneficiary_id, source_user_id, level, amount, created_at) VALUES (?,?,?,?,?)')
          .run(beneficiary, uid, level, amount, now);
        paid.push({ beneficiary, level, amount });
      }
    }
  })();

  for (const p of paid) {
    const who = p.level === 1 ? `@${me.username} joined with your link` : p.level === 2 ? `@${me.username} joined under your friend` : `@${me.username} joined in your network`;
    notify(app, p.beneficiary, 'referral', `${who}. You earned ${naira(p.amount)}.`);
  }
  return { parentId: hit.parentId, parentName: hit.username, paid };
}

export function previewRef(app, refRaw) {
  const hit = resolveRef(app, refRaw);
  if (!hit) return { ok: false };
  return { ok: true, username: hit.username, rewards: REFERRAL.rewards.slice(), levels: REFERRAL.levels };
}

function publicBase(app) {
  const u = app.payments?.cfg?.publicUrl || process.env.NA_PUBLIC_URL || '';
  return String(u || '').replace(/\/$/, '') || '';
}

export function mine(app, uid) {
  const u = app.db.prepare('SELECT is_guest FROM users WHERE id=?').get(uid);
  if (!u || u.is_guest) bad('ACCOUNT_REQUIRED', 'Create a free account to invite friends.', 403);
  const code = ensureCode(app, uid);
  const base = publicBase(app);
  const path = `/?ref=${encodeURIComponent(code)}`;
  const url = base ? `${base}${path}` : path;

  const direct = app.db.prepare(`SELECT e.user_id, e.created_at, u.username
    FROM referral_edges e JOIN users u ON u.id=e.user_id WHERE e.parent_id=? ORDER BY e.created_at DESC`).all(uid);

  // Level-2: children of my directs. Level-3: children of those.
  const l2 = [], l3 = [];
  for (const d of direct) {
    const kids = app.db.prepare(`SELECT e.user_id, e.created_at, u.username, e.parent_id
      FROM referral_edges e JOIN users u ON u.id=e.user_id WHERE e.parent_id=? ORDER BY e.created_at DESC`).all(d.user_id);
    for (const k of kids) {
      l2.push({ ...k, via: d.username });
      const gkids = app.db.prepare(`SELECT e.user_id, e.created_at, u.username
        FROM referral_edges e JOIN users u ON u.id=e.user_id WHERE e.parent_id=? ORDER BY e.created_at DESC`).all(k.user_id);
      for (const g of gkids) l3.push({ ...g, via: k.username });
    }
  }

  const earned = app.db.prepare('SELECT COALESCE(SUM(amount),0) s FROM referral_payouts WHERE beneficiary_id=?').get(uid).s;
  const byLevel = app.db.prepare('SELECT level, COUNT(*) n, COALESCE(SUM(amount),0) s FROM referral_payouts WHERE beneficiary_id=? GROUP BY level').all(uid);
  const invites = app.db.prepare(`SELECT id, email, status, created_at, accepted_at, accepted_user_id FROM referral_invites
    WHERE inviter_id=? ORDER BY id DESC LIMIT 40`).all(uid);

  return {
    code, url, path,
    rewards: REFERRAL.rewards.slice(),
    levels: REFERRAL.levels,
    summary: {
      level1: direct.length,
      level2: l2.length,
      level3: l3.length,
      network: direct.length + l2.length + l3.length,
      earned,
      byLevel: Object.fromEntries(byLevel.map((r) => [r.level, { count: r.n, amount: r.s }])),
    },
    level1: direct.map((r) => ({ id: r.user_id, username: r.username, at: r.created_at })),
    level2: l2.map((r) => ({ id: r.user_id, username: r.username, via: r.via, at: r.created_at })),
    level3: l3.map((r) => ({ id: r.user_id, username: r.username, via: r.via, at: r.created_at })),
    invites: invites.map((i) => ({
      id: i.id, email: i.email, status: i.status, at: i.created_at, acceptedAt: i.accepted_at,
      acceptedUser: i.accepted_user_id ? (app.db.prepare('SELECT username FROM users WHERE id=?').get(i.accepted_user_id)?.username || null) : null,
    })),
    cash: balanceOf(app.db, cashId(uid)),
    tip: `Earn ${naira(REFERRAL.rewards[0])} when a friend joins with your link, ${naira(REFERRAL.rewards[1])} when they invite someone, and ${naira(REFERRAL.rewards[2])} at level 3.`,
  };
}

export async function inviteByEmail(app, uid, emailRaw) {
  const u = app.db.prepare('SELECT is_guest, username FROM users WHERE id=?').get(uid);
  if (!u || u.is_guest) bad('ACCOUNT_REQUIRED', 'Create a free account to invite friends.', 403);
  const email = cleanText(String(emailRaw || ''), REFERRAL.inviteEmailMax).toLowerCase();
  if (!EMAIL.test(email)) bad('BAD_EMAIL', 'Enter a valid email address.');

  const day = dayKey(app.clock.now());
  const dayStart = Date.parse(day + 'T00:00:00.000Z');
  const used = app.db.prepare('SELECT COUNT(*) n FROM referral_invites WHERE inviter_id=? AND created_at>=?').get(uid, dayStart).n;
  if (used >= REFERRAL.invitePerDay) bad('TOO_MANY', `You can send ${REFERRAL.invitePerDay} email invites per day.`, 429);

  const dup = app.db.prepare("SELECT 1 FROM referral_invites WHERE inviter_id=? AND email=? AND status='pending'").get(uid, email);
  if (dup) bad('ALREADY_INVITED', 'You already invited that email. Share your link again.', 409);

  ensureCode(app, uid);
  let token = alphabetCode(10);
  for (let i = 0; i < 8; i++) {
    try {
      const r = app.db.prepare('INSERT INTO referral_invites(inviter_id, email, token, status, created_at) VALUES (?,?,?,?,?)')
        .run(uid, email, token, 'pending', app.clock.now());
      const id = Number(r.lastInsertRowid);
      const base = publicBase(app);
      const path = `/?ref=${encodeURIComponent(token)}`;
      const url = base ? `${base}${path}` : path;
      const subject = `Join me on ${app.gameName}`;
      const text = `Hey!\n\nCome play ${app.gameName} with me. Sign up with this link and I get a bonus when you join:\n\n${url || path}\n\n— @${u.username}`;
      const html = `<p>Hey!</p><p>Come play <b>${escHtml(app.gameName)}</b> with me. Sign up with this link and I get a bonus when you join:</p><p><a href="${escAttr(url || path)}">${escHtml(url || path)}</a></p><p>— @${escHtml(u.username)}</p>`;
      const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

      let sent = false, mailId = null;
      if (typeof app.mail?.send === 'function') {
        try {
          const out = await app.mail.send({ to: email, subject, text, html, tags: ['referral-invite'] });
          sent = true;
          mailId = out?.id || null;
        } catch (mailErr) {
          app.db.prepare('DELETE FROM referral_invites WHERE id=?').run(id);
          throw mailErr;
        }
      } else {
        console.info(`[referral-invite] mail off — @${u.username} -> ${email} ${url || path}`);
      }
      return {
        ok: true, id, email, token, url, path, sent, mailId,
        mailto: sent ? null : mailto,
        text: sent ? `Invite emailed to ${email}.` : `Invite ready for ${email}. Open your mail app or copy the link.`,
      };
    } catch (e) {
      if (e?.code) throw e; // GameError from mail or validation
      if (!/UNIQUE|CONSTRAINT/i.test(String(e.message || e))) throw e;
      token = alphabetCode(10);
    }
  }
  bad('INVITE_FAIL', 'Could not create that invite. Try again.', 500);
}

const escHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const escAttr = (s) => escHtml(s).replace(/`/g, '');

registerPlayerData('referrals',
  (app, uid) => ({
    code: app.db.prepare('SELECT code, created_at FROM referral_codes WHERE user_id=?').get(uid) || null,
    edge: app.db.prepare('SELECT parent_id, created_at FROM referral_edges WHERE user_id=?').get(uid) || null,
    invites: app.db.prepare('SELECT email, status, created_at, accepted_at FROM referral_invites WHERE inviter_id=? ORDER BY id').all(uid),
    payouts: app.db.prepare('SELECT source_user_id, level, amount, created_at FROM referral_payouts WHERE beneficiary_id=? ORDER BY id').all(uid),
  }),
  (app, uid) => {
    // Keep edges/payouts for the network and ledger history; clear personal invite inbox + code ownership markers softly.
    app.db.prepare('DELETE FROM referral_invites WHERE inviter_id=?').run(uid);
  },
  'your email invites are removed; who referred whom and payout ledger rows stay (anonymised with the account)');
