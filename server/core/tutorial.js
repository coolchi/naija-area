// First-five-minutes tutorial: a checklist whose steps are CHECKED BY THE SERVER wherever the server can know (walked, shift started and paid, bought something, has a home);
// "ack" steps (open the map, open the phone) are reported by the client and only guide: they never gate the reward. The one-time reward goes through the ledger.
import { bad } from './util.js';
import { notify } from './economy.js';
import { TUTORIAL } from '../config/progress.js';
import { grantReward } from './rewards.js';

const row = (app, uid) => app.db.prepare('SELECT * FROM tutorial_state WHERE user_id=?').get(uid);
const acksOf = (r) => { try { return new Set(JSON.parse(r.acks)); } catch { return new Set(); } };
const checks = {
  walk: (app, uid, r) => { const p = app.db.prepare('SELECT x,z FROM player_state WHERE user_id=?').get(uid); const live = app.world.players.get(uid); const x = live?.x ?? p?.x, z = live?.z ?? p?.z; return Math.hypot((x ?? 0) - r.start_x, (z ?? 0) - r.start_z) >= TUTORIAL.minWalkM; },
  shift_started: (app, uid) => !!app.db.prepare('SELECT 1 FROM shifts WHERE user_id=? LIMIT 1').get(uid),
  paid: (app, uid) => !!app.db.prepare("SELECT 1 FROM ledger_tx WHERE user_id=? AND reason='job_wage' LIMIT 1").get(uid),
  bought: (app, uid) => !!app.db.prepare("SELECT 1 FROM ledger_tx WHERE user_id=? AND reason IN ('shop_purchase','shop_delivery') LIMIT 1").get(uid),
  home: (app, uid) => !!app.db.prepare('SELECT 1 FROM property_owner WHERE user_id=?').get(uid)
};
const eligible = (app, uid) => { const u = app.db.prepare('SELECT is_bot FROM users WHERE id=?').get(uid); return !!u && !u.is_bot && TUTORIAL.enabled; };
function ensure(app, uid) {
  let r = row(app, uid); if (r) return r; const p = app.world.players.get(uid) || app.db.prepare('SELECT x,z FROM player_state WHERE user_id=?').get(uid) || { x: 0, z: 0 };
  app.db.prepare('INSERT INTO tutorial_state(user_id,start_x,start_z,created_at) VALUES (?,?,?,?)').run(uid, p.x, p.z, app.clock.now()); return row(app, uid);
}
/** the checklist for the player, evaluating the server-side steps and paying the reward once when they are all done */
export function view(app, uid) {
  if (!eligible(app, uid)) return { active: false, enabled: false };
  const r = ensure(app, uid); const acks = acksOf(r); const steps = TUTORIAL.steps.map(s => ({ id: s.id, icon: s.icon, title: s.title, touch: s.touch, desk: s.desk, guide: s.check === 'ack', done: s.check === 'ack' ? acks.has(s.id) : !!checks[s.check]?.(app, uid, r) }));
  const serverDone = steps.filter(s => !s.guide).every(s => s.done); let reward = r.reward;
  if (serverDone && !r.done_at && !r.skipped) {
    const now = app.clock.now(); const paid = grantReward(app, uid, { amount: TUTORIAL.reward, reason: 'mission_tutorial', ref: 'tutorial', idemKey: `tutorial:${uid}`, countCaps: false });
    app.db.prepare('UPDATE tutorial_state SET done_at=?, reward=? WHERE user_id=?').run(now, paid, uid); reward = paid; r.done_at = now;
    notify(app, uid, 'tutorial', `Tutorial complete! You earned ₦${paid.toLocaleString('en-NG')} (game money).`);
  }
  return { active: !r.skipped && !r.done_at, enabled: true, skipped: !!r.skipped, done: !!r.done_at, reward: reward || 0, rewardAmount: TUTORIAL.reward, pollMs: TUTORIAL.pollMs, steps, current: steps.find(s => !s.done)?.id || null, doneCount: steps.filter(s => s.done).length };
}
export function ack(app, uid, step) {
  if (!eligible(app, uid)) bad('OFF', 'The tutorial is off.', 409); const def = TUTORIAL.steps.find(s => s.id === step && s.check === 'ack'); if (!def) bad('BAD_STEP', 'That step is not reported by the app.');
  const r = ensure(app, uid); const a = acksOf(r); a.add(step); app.db.prepare('UPDATE tutorial_state SET acks=? WHERE user_id=?').run(JSON.stringify([...a]), uid); return view(app, uid);
}
export function skip(app, uid) { if (!eligible(app, uid)) bad('OFF', 'The tutorial is off.', 409); ensure(app, uid); app.db.prepare('UPDATE tutorial_state SET skipped=1 WHERE user_id=?').run(uid); return view(app, uid); }
export function restart(app, uid) { if (!eligible(app, uid)) bad('OFF', 'The tutorial is off.', 409); const r = ensure(app, uid); if (r.done_at) { app.db.prepare('UPDATE tutorial_state SET skipped=0, acks=? WHERE user_id=?').run('[]', uid); return { ...view(app, uid), active: true, replay: true }; } app.db.prepare('UPDATE tutorial_state SET skipped=0 WHERE user_id=?').run(uid); return view(app, uid); }
export const exportMine = (app, uid) => { const r = row(app, uid); return r ? { startedAt: r.created_at, done: !!r.done_at, skipped: !!r.skipped, reward: r.reward } : null; };
export const deleteMine = (app, uid) => { app.db.prepare('DELETE FROM tutorial_state WHERE user_id=?').run(uid); };
