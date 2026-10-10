// Player data held by the table games and the new word/board games (Track C: chess, Word Duel, Find Am, Landlord Lagos, Suwe; Track D: Sports Hall ping pong and tennis),
// registered with the account module so "Download my data" lists it and "Close my account" cleans it (see docs/ACCOUNT_DATA.md).
// These games added NO tables of their own: they use game_matches / game_players / game_scores (table games, including sports matches and bot prizes through the ledger)
// and casual_runs / casual_daily (Find Am and the Suwe street run). game_scores, casual_runs and casual_daily are already erased by the core closing routine; this module adds
// what the core does not know about: the list of table matches you played (download) and your @name inside the text of finished matches (closing).
import { registerPlayerData } from './account.js';

const all = (app, sql, ...a) => app.db.prepare(sql).all(...a);
const KINDS = ['chess', 'wordduel', 'landlord', 'suwe', 'pingpong', 'tennis'];

export function exportGameData(app, uid) {
  const matches = all(app, `SELECT m.id, m.kind, m.venue_id, m.station_id, m.stake, m.status, m.winner, m.result, m.created_at, gp.seat, gp.out FROM game_matches m JOIN game_players gp ON gp.match_id=m.id WHERE gp.user_id=? ORDER BY m.id`, uid)
    .map(r => ({ matchId: r.id, game: r.kind, venue: r.venue_id, table: r.station_id, stake: r.stake, status: r.status, youWon: r.status === 'finished' ? r.winner === uid : null, draw: r.status === 'finished' && !r.winner, result: r.result, seat: r.seat, leftEarly: !!r.out, at: r.created_at ? new Date(r.created_at).toISOString() : null }));
  const runs = all(app, "SELECT id, kind, state, score, reward, day, status FROM casual_runs WHERE user_id=? AND kind IN ('wordsearch','suwe') ORDER BY id", uid).map(r => { let st = {}; try { st = JSON.parse(r.state || '{}'); } catch { /* ignore */ } return { runId: r.id, game: r.kind, day: r.day, status: r.status, score: r.score, reward: r.reward, wordsFound: st.found ? st.found.map(f => f.word) : undefined, stagesCleared: st.cleared, housesBuilt: st.houses ? st.houses.filter(x => x >= 0).length : undefined }; });
  return { note: 'Table games you sat at (chess, Word Duel, Landlord Lagos, Suwe, ping pong, tennis and the older games), and your Find Am and Suwe street runs. Game money only.', tableMatches: matches, wordSearchAndSuweRuns: runs };
}
export function eraseGameData(app, uid) {
  const name = app.db.prepare('SELECT username FROM users WHERE id=?').get(uid)?.username; if (!name) return;
  // finished matches stay (the other player's record and the ledger need them) but your @name inside their result text becomes "a player"
  for (const r of all(app, "SELECT m.id, m.result FROM game_matches m JOIN game_players gp ON gp.match_id=m.id WHERE gp.user_id=? AND m.result LIKE ?", uid, `%@${name}%`)) app.db.prepare('UPDATE game_matches SET result=? WHERE id=?').run(String(r.result).split(`@${name}`).join('a player'), r.id);
}
registerPlayerData('tableGamesAndWordGames', exportGameData, eraseGameData, 'finished table-game matches (chess, Word Duel, Landlord Lagos, Suwe, ping pong, tennis and older games) stay, with your @name replaced by "a player" in the result text and your player id anonymised');
export { KINDS };
