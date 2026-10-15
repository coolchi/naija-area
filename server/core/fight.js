// Street / venue fights: each punch costs the target health; higher strength wins ~1% of the loser's net worth (from cash).
// Equipped guns boost attack strength and damage. An active bodyguard cuts incoming damage and can block the purse.
import { bad } from './util.js';
import { ensurePresence } from './world.js';
import { netWorth, notify, profile } from './economy.js';
import { healthOf } from './crash.js';
import { strengthOf } from './gym.js';
import { move, cashId, balanceOf } from './ledger.js';
import { areFriends } from './phone/phone.js';
import { isBlocked } from './safety.js';
import { equippedGun } from './guns.js';
import { activeOf, cfgOf as bgCfg } from './bodyguards.js';
import { noteFight } from './police.js';

const setHealth = (app, uid, h) => {
  const max = app.balance.crash.maxHealth;
  app.db.prepare('UPDATE player_state SET health=?, health_at=? WHERE user_id=?').run(Math.max(0, Math.min(max, h)), app.clock.now(), uid);
};

/** Punch / challenge someone in the same venue. Stronger fighter wins the purse. */
export function punch(app, uid, targetUsername, idem) {
  const F = app.balance.fight; const name = String(targetUsername || '').replace(/^@/, '').trim();
  const t = app.db.prepare('SELECT id, username FROM users WHERE username=?').get(name); if (!t) bad('NO_PLAYER', 'No such player.', 404);
  if (t.id === uid) bad('SELF', 'You cannot fight yourself.');
  if (isBlocked(app, uid, t.id)) bad('BLOCKED', 'You cannot fight that player.', 403);
  const me = ensurePresence(app, uid); const them = ensurePresence(app, t.id);
  const cut = app.clock.now() - app.balance.heartbeat.activeWindowMs;
  if (!them.lastSeen || them.lastSeen < cut) bad('OFFLINE', 'They are not around right now.', 409);
  if (!me.venue || me.venue !== them.venue) bad('NOT_HERE', 'You both need to be in the same place to fight.', 409);
  if (!app.limiter.hit(`fight:${uid}`, 1, F.cooldownMs, app.clock.now())) bad('COOLDOWN', 'Your fists need a rest. Try again soon.', 429);
  if (!app.limiter.hit(`fightpair:${[uid, t.id].sort().join(':')}`, F.pairPerHour || 6, 3600000, app.clock.now())) bad('PAIR_LIMIT', 'You two have fought enough for now.', 429);

  const gun = equippedGun(app, uid);
  const myGuard = activeOf(app, uid);
  const theirGuard = activeOf(app, t.id);
  const BG = bgCfg(app);

  let myStr = strengthOf(app, uid).strength + (gun?.strength || 0);
  let theirStr = strengthOf(app, t.id).strength;
  if (theirGuard) theirStr += BG.defenceStrength || 0;

  const baseDmg = Math.max(1, Math.round(app.balance.crash.maxHealth * F.punchHealthPct * (gun?.damageMult || 1)));
  let dmg = baseDmg;
  if (theirGuard) dmg = Math.max(1, Math.round(dmg * (BG.damageScale ?? 0.3)));

  const hv = healthOf(app, t.id);
  const newHealth = Math.max(0, hv.health - dmg); setHealth(app, t.id, newHealth);

  const iWin = myStr > theirStr;
  let purse = 0; let won = false;
  const purseBlocked = !!(theirGuard && BG.blockPurse);
  if (iWin && !purseBlocked) {
    won = true;
    const nw = netWorth(app, t.id).total; purse = Math.floor(nw * F.stealNetWorthPct);
    const cash = balanceOf(app.db, cashId(t.id)); purse = Math.max(0, Math.min(purse, cash, F.maxPurse || 500000));
    if (purse > 0) {
      move(app, { from: cashId(t.id), to: cashId(uid), amount: purse, reason: 'fight_purse', ref: `${uid}->${t.id}`, userId: uid, idemKey: idem ? `fight:${uid}:${idem}` : `fight:${uid}:${t.id}:${app.clock.now()}` });
    }
  } else if (iWin && purseBlocked) {
    won = true; // strength win, but bodyguard kept the cash
  }

  const meName = app.db.prepare('SELECT username FROM users WHERE id=?').get(uid).username;
  const gunBit = gun ? ` with ${gun.name}` : '';
  const guardBit = theirGuard ? ` (bodyguard ${theirGuard.name} covered)` : '';
  notify(app, t.id, 'fight', won
    ? `@${meName} hit you${gunBit} (−${dmg} HP)${purse ? ' and took ₦' + purse : purseBlocked ? ' but your bodyguard kept your cash' : ''} — their strength is higher.${guardBit}`
    : `@${meName} hit you${gunBit} (−${dmg} HP) but you held your ground.${guardBit}`);
  notify(app, uid, 'fight', won
    ? `You beat @${t.username}! −${dmg} HP to them${purse ? `, +₦${purse}` : purseBlocked ? ' (their bodyguard blocked the purse)' : ''}.`
    : `You hit @${t.username} (−${dmg} HP) but their strength won out.`);

  try { noteFight(app, uid, t.id, { purse, damage: dmg }); } catch { /* police evidence must not break the fight */ }

  return {
    ok: true, won, purse, damage: dmg, purseBlocked,
    gun: gun ? { id: gun.id, name: gun.name, strength: gun.strength } : null,
    bodyguard: myGuard ? { name: myGuard.name } : null,
    targetGuard: theirGuard ? { name: theirGuard.name } : null,
    target: { username: t.username, health: Math.round(newHealth * 10) / 10, strength: theirStr },
    you: { strength: myStr, health: healthOf(app, uid).health },
    friends: areFriends(app, uid, t.id),
    text: won
      ? `You dropped @${t.username}! Strength ${myStr} > ${theirStr}.${purse ? ` Took ₦${purse}.` : purseBlocked ? ' Their bodyguard blocked the purse.' : ''}`
      : `@${t.username} is stronger (${theirStr} vs your ${myStr}). Hit landed (−${dmg} HP) but no purse.`,
    user: profile(app, uid)
  };
}
