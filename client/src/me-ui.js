// Phone > Me: your season standing (three boards, badges, prizes), your titles and your achievements. Titles show after your name in chat and over your head for other players.
import { get, post, h } from './api.js';

const left = (ms) => { const d = Math.floor(ms / 86400000), hr = Math.floor((ms % 86400000) / 3600000); return d > 0 ? `${d} day${d === 1 ? '' : 's'} ${hr} h` : `${Math.max(0, hr)} h`; };
const money = (b, v) => b.unit === '₦' ? '₦' + Number(v).toLocaleString('en-NG') : `${v} ${b.unit}`;
/** the season card: time left, the three boards (top rows and your place), prizes, your badges and last season's winners */
export function seasonBlock(g, v) {
  if (!v || !v.enabled) return [];
  if (!v.started) return [h('div', { class: 'season', 'data-season': 'soon' }, h('b', {}, '🏁 Season 1 is coming'), h('small', { class: 'mut' }, `It starts in ${left(v.startsInMs)}. Three boards, a badge and a small prize for the top three.`))];
  const board = (b) => h('div', { class: 'sboard', 'data-board': b.id }, h('b', {}, `${b.icon} ${b.name}`), h('small', { class: 'mut' }, b.desc),
    ...(b.top.length ? b.top.map(r => h('div', { class: 'srow' + (r.me ? ' me' : '') }, h('span', {}, `${['🥇', '🥈', '🥉'][r.rank - 1] || r.rank + '.'} ${r.name}`), h('span', { class: 'mut' }, money(b, r.value)))) : [h('small', { class: 'mut' }, 'Nobody on this board yet. Be the first!')]),
    h('small', { class: b.me.qualifies ? 'okline' : 'mut', 'data-mine': b.id }, !v.eligible ? 'Create an account to join the boards.' : b.me.rank ? `You are #${b.me.rank} with ${money(b, b.me.value)}${b.me.qualifies ? '' : ` (you need ${money(b, b.min)} to win a prize)`}` : b.me.outside && b.players >= v.rankDepth ? `You are not in the top ${v.rankDepth}. Keep going. (You need ${money(b, b.min)} to win a prize.)` : `You are not on this board yet. (You need ${money(b, b.min)} to win a prize.)`));
  const badges = v.mine.length ? [h('b', {}, '🎖 Your badges'), ...v.mine.map(m => h('small', { class: 'okline', 'data-badge': m.season + ':' + m.board }, `${m.badgeIcon} ${m.icon} ${m.boardName} · season ${m.season}${m.prize ? ` · ₦${m.prize.toLocaleString('en-NG')}` : ''}`))] : [];
  const prev = v.previous ? [h('b', {}, `📜 Season ${v.previous.season} winners`), ...v.previous.winners.filter(w => w.place === 1).map(w => h('small', { class: 'mut' }, `${w.icon} ${w.boardName}: ${w.badgeIcon} ${w.name}`))] : [];
  return [h('div', { class: 'season', 'data-season': v.season }, h('b', {}, `🏁 Season ${v.season} · ends in ${left(v.endsInMs)}`), h('small', { class: 'mut' }, `Prizes for the top three of each board: ${v.prizes.map(p => `${p.icon} ₦${p.cash.toLocaleString('en-NG')}`).join(' · ')}. The winner also gets a title after their name.`), ...v.boards.map(board), ...badges, ...prev)];
}
export async function meBody(g, reopen) {
  const sv = await get('/api/seasons').catch(() => null);
  const v = await get('/api/achievements'); if (!v.enabled) return [h('p', { class: 'mut' }, 'Achievements are not available right now.')];
  const pick = async (id) => { try { await post('/api/achievements/title', { id }); g.ui.toast(id === '' ? 'Title hidden' : id === null ? 'Title is automatic' : 'Title set', ''); g.audio?.play('ok'); } catch (e) { g.ui.toast(e.message, 'bad'); } reopen(); };
  const chip = (label, id, on) => h('button', { class: 'btn small ' + (on ? '' : 'ghost'), 'data-title': id === '' ? 'none' : id === null ? 'auto' : id, onclick: () => pick(id) }, label);
  const chips = [chip('Automatic', null, v.selected === null), chip('None', '', v.selected === ''), ...v.titles.map(t => chip(t.text, t.id, v.selected === t.id))];
  const row = (a) => h('div', { class: 'ach' + (a.earned ? ' earned' : ''), 'data-ach': a.id }, h('span', { class: 'aicon' }, a.icon), h('div', { class: 'abody' }, h('b', {}, a.name + (a.title ? ` · “${a.title}”` : '')), h('small', { class: 'mut' }, a.desc), a.earned ? h('small', { class: 'okline' }, 'Earned ✅') : h('div', { class: 'bar2m' }, h('i', { style: `width:${Math.round(a.progress / a.target * 100)}%` }))));
  return [...seasonBlock(g, sv), h('b', {}, `🏅 Showing: ${v.showing ? `“${v.showing}”` : 'no title'}`), h('p', { class: 'mut' }, 'Pick the title other players see after your name.'), h('div', { class: 'quality-row' }, chips), h('b', {}, `🏆 Achievements ${v.earnedCount}/${v.total}`), ...v.achievements.map(row)];
}
