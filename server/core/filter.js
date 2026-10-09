// Text safety filter (hardened). Token-based, so innocent words that merely CONTAIN a bad string ("grape", "class", "Scunthorpe") pass,
// while common evasions are caught: leetspeak (sh1t, f@ck), repeated letters (fuuuck), separators and spaced letters (f u c k, f.u.c.k),
// accents. Also blocks links, e-mail addresses and phone numbers in public text (scam/spam vector).
// THE LEXICON IS A STARTING POINT, NOT A FINISHED MODERATION SYSTEM: it needs review by native speakers of Nigerian Pidgin, Yoruba, Igbo and
// Hausa (see 11_next_steps.md). Reports + admin review (safety.js) exist because no word list is enough.

// base forms; suffixes s/es/ed/er/ers/ing/y/in are matched too. Kept short and unambiguous on purpose.
const SEVERE = ['nigga', 'nigger', 'faggot', 'retard', 'rape', 'rapist', 'molest', 'paedo', 'pedo', 'kike', 'chink', 'coon', 'tranny'];
const STRONG = ['fuck', 'shit', 'bitch', 'cunt', 'bastard', 'asshole', 'dick', 'pussy', 'whore', 'slut', 'cock', 'wanker', 'twat', 'bollocks', 'motherfucker', 'dickhead', 'prick', 'jackass', 'douche'];
const WORDS = new Set([...SEVERE, ...STRONG]);
const SUFFIX = ['', 's', 'es', 'ed', 'er', 'ers', 'ing', 'in', 'y', 'ish', 'ed'];
const LEET = { '0': 'o', '1': 'i', '!': 'i', '|': 'i', '3': 'e', '4': 'a', '@': 'a', '5': 's', '$': 's', '7': 't', '+': 't', '8': 'b', '9': 'g' };
const squashRuns = (s) => s.replace(/(.)\1{1,}/g, '$1');                // fuuuck -> fuck, shiiit -> shit
const norm = (s) => String(s).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[01!|3@4$57+89]/g, (c) => LEET[c]);
const isBadToken = (t) => { if (!t) return false; if (WORDS.has(t)) return true; for (const suf of SUFFIX) if (suf && t.endsWith(suf) && WORDS.has(t.slice(0, -suf.length))) return true; const q = squashRuns(t); if (q !== t) return isBadToken(q) || WORDS.has(q); return false; };

export function profane(text) {
  const n = norm(text); const tokens = n.split(/[^a-z]+/).filter(Boolean);
  for (const t of tokens) if (isBadToken(t)) return true;
  // spaced / dotted letters: "f u c k", "f.u.c.k", "s-h-i-t": runs of single-letter tokens are joined
  let run = ''; for (const t of [...tokens, '']) { if (t.length === 1) run += t; else { if (run.length >= 3 && isBadToken(run)) return true; run = ''; } }
  // glued separators inside one token group: "fu-ck" -> "fuck", "sh*t" handled by '*' stripped below
  const glued = n.replace(/[^a-z\s]+/g, '').split(/\s+/); for (const t of glued) if (t.length >= 4 && isBadToken(t)) return true;
  // two tokens that spell a strong word when joined ("fu ck", "shi t") only when both are short (<=3) to avoid "class hit"
  for (let i = 0; i + 1 < tokens.length; i++) if (tokens[i].length <= 3 && tokens[i + 1].length <= 3 && isBadToken(tokens[i] + tokens[i + 1])) return true;
  // masked vowels: f@ck, sh*t, b!tch, f#ck -> try each vowel in the masked slot(s)
  for (const raw of String(text).toLowerCase().split(/\s+/)) {
    const w = raw.replace(/[^a-z@*#%&]/g, ''); const slots = [...w].filter(c => '@*#%&'.includes(c)).length; if (!slots || slots > 2 || w.length < 4) continue;
    const fill = (str, acc) => { const i = str.search(/[@*#%&]/); if (i < 0) return isBadToken(norm(str)); return [...'aeiou'].some(v => fill(str.slice(0, i) + v + str.slice(i + 1), acc)); };
    if (fill(w, 0)) return true;
  }
  return false;
}
const URL_RE = /(https?:\/\/|www\.|[a-z0-9-]+\.(com|net|org|ng|io|co|me|ly|gg|xyz|biz|info|app|link)\b|t\.me\/|wa\.me\/|bit\.ly)/i;
const EMAIL_RE = /[a-z0-9._%+-]+\s*(@|\(at\)|\[at\])\s*[a-z0-9.-]+\s*(\.|\(dot\)|\[dot\])\s*[a-z]{2,}/i;
const PHONE_RE = /(\+?234|\b0)[\s\-.()]*[789][01][\s\-.()]*\d[\d\s\-.()]{6,}/;
export const hasContact = (text) => { const t = String(text); const digits = t.replace(/[^0-9]/g, ''); return URL_RE.test(t) || EMAIL_RE.test(t) || PHONE_RE.test(t) || /\d(?:[\s\-.]?\d){9,}/.test(t) || digits.length >= 10; };

/** @returns {{ok:true}|{ok:false,code:string,message:string}} */
export function screen(text, { links = false } = {}) {
  if (profane(text)) return { ok: false, code: 'CLEAN_IT_UP', message: 'Keep it clean, please.' };
  if (!links && hasContact(text)) return { ok: false, code: 'NO_CONTACT_INFO', message: 'No links, emails or phone numbers please.' };
  if (/(.)\1{9,}/.test(String(text))) return { ok: false, code: 'SPAM', message: 'That looks like spam.' };
  return { ok: true };
}
export const hasBadWord = (s) => profane(s);
