// Phone > Me: your titles and achievements (and, later, your season standing). Titles show after your name in chat and over your head for other players.
import { get, post, h } from './api.js';

export async function meBody(g, reopen) {
  const v = await get('/api/achievements'); if (!v.enabled) return [h('p', { class: 'mut' }, 'Achievements are not available right now.')];
  const pick = async (id) => { try { await post('/api/achievements/title', { id }); g.ui.toast(id === '' ? 'Title hidden' : id === null ? 'Title is automatic' : 'Title set', ''); g.audio?.play('ok'); } catch (e) { g.ui.toast(e.message, 'bad'); } reopen(); };
  const chip = (label, id, on) => h('button', { class: 'btn small ' + (on ? '' : 'ghost'), 'data-title': id === '' ? 'none' : id === null ? 'auto' : id, onclick: () => pick(id) }, label);
  const chips = [chip('Automatic', null, v.selected === null), chip('None', '', v.selected === ''), ...v.titles.map(t => chip(t.text, t.id, v.selected === t.id))];
  const row = (a) => h('div', { class: 'ach' + (a.earned ? ' earned' : ''), 'data-ach': a.id }, h('span', { class: 'aicon' }, a.icon), h('div', { class: 'abody' }, h('b', {}, a.name + (a.title ? ` · “${a.title}”` : '')), h('small', { class: 'mut' }, a.desc), a.earned ? h('small', { class: 'okline' }, 'Earned ✅') : h('div', { class: 'bar2m' }, h('i', { style: `width:${Math.round(a.progress / a.target * 100)}%` }))));
  return [h('b', {}, `🏅 Showing: ${v.showing ? `“${v.showing}”` : 'no title'}`), h('p', { class: 'mut' }, 'Pick the title other players see after your name.'), h('div', { class: 'quality-row' }, chips), h('b', {}, `🏆 Achievements ${v.earnedCount}/${v.total}`), ...v.achievements.map(row)];
}
