// A labelled practice opponent for table games, so one person can try Whot/Ludo alone. It only joins FRIENDLY tables (no stake, no money moves),
// never scores on the weekly board, and is clearly a bot (@Practice_Bot, flagged is_bot). Real games are between two real players.
import { newPlayer } from './auth.js';
import { ensurePresence } from './world.js';
import * as games from './games.js';
import { SHAPES } from './games/whot.js';

export function startPracticeBot(app, { intervalMs = 1500, name = 'Practice_Bot' } = {}) {
  let row = app.db.prepare('SELECT id FROM users WHERE username=?').get(name); const uid = row ? row.id : newPlayer(app, { username: name, isBot: true, ageConfirmed: true });
  const step = () => {
    try {
      const p = ensurePresence(app, uid); p.lastSeen = app.clock.now(); games.expireStale(app);
      const act = app.db.prepare("SELECT * FROM game_matches WHERE status='active' AND turn_user=?").get(uid);
      if (act) { const v = games.viewFor(app, uid, act); const b = v.board; let mv;
        if (act.kind === 'whot') { if (b.playable.length) { const c = b.hand.find(x => x.id === b.playable[0]); const cnt = {}; for (const h of b.hand) cnt[h.s] = (cnt[h.s] || 0) + 1; const shape = SHAPES.slice().sort((a, z) => (cnt[z] || 0) - (cnt[a] || 0))[0]; mv = { card: c.id, shape }; } else mv = { action: 'draw' }; }
        else mv = b.canRoll ? { action: 'roll' } : { token: b.legal[Math.floor(Math.random() * b.legal.length)] };
        games.playMove(app, uid, act.id, mv); return; }
      if (games.myMatch(app, uid, { onlyLive: true })) return;
      const w = app.db.prepare("SELECT * FROM game_matches WHERE status='waiting' AND stake=0 AND p1!=? ORDER BY id LIMIT 1").get(uid); if (!w) return;
      p.venue = w.venue_id; games.sit(app, uid, w.venue_id, w.station_id, 0);
    } catch (e) { if (!/ALREADY|TABLE_BUSY|CANNOT/.test(e.code || '')) console.error('practice bot', e.message); }
  };
  const t = setInterval(step, intervalMs); t.unref?.(); return { uid, step, stop: () => clearInterval(t) };
}
