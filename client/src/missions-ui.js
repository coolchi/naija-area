// Phone > Missions: today's three missions, this week's three, and the login streak. Everything is counted by the server from your own play; collecting pays game money.
import { get, post, h, fmtN } from './api.js';

const hms = (ms) => { const m = Math.max(0, Math.round(ms / 60000)); return m >= 1440 ? `${Math.floor(m / 1440)}d ${Math.floor((m % 1440) / 60)}h` : `${Math.floor(m / 60)}h ${m % 60}m`; };
export async function missionsBody(g, reopen) {
  const v = await get('/api/missions'); if (!v.enabled) return [h('p', { class: 'mut' }, 'Missions are not available right now.')];
  const collect = async (id) => { try { const r = await post('/api/missions/claim', { id }); g.ui.toast(`+${fmtN(r.paid)}${r.capped ? ' (limit reached for now)' : ''}`, 'money'); g.audio?.play('achieve'); await g.refreshMe?.(); } catch (e) { g.ui.toast(e.message, 'bad'); } reopen(); };
  const row = (m) => h('div', { class: 'mission' + (m.claimed ? ' claimed' : m.done ? ' ready' : ''), 'data-mission': m.id },
    h('div', { class: 'row' }, h('b', {}, `${m.icon} ${m.title}`), h('span', { class: 'mut' }, `${fmtN(m.reward)}`)),
    h('div', { class: 'bar2m' }, h('i', { style: `width:${Math.round((m.progress / m.target) * 100)}%` })), h('div', { class: 'row' }, h('small', { class: 'mut' }, m.claimed ? 'Collected ✅' : `${m.progress.toLocaleString('en-NG')} / ${m.target.toLocaleString('en-NG')}`),
      !m.claimed && m.done ? h('button', { class: 'btn small', 'data-collect': m.id, onclick: () => collect(m.id) }, 'Collect') : null));
  const s = v.streak; const cells = s.ladder.map((r, i) => h('span', { class: 'sday' + (i + 1 === s.dayInCycle ? ' now' : i + 1 < s.dayInCycle || (s.claimedToday && i + 1 === s.dayInCycle) ? ' past' : '') }, h('small', {}, `D${i + 1}`), fmtN(r)));
  const streakBtn = s.enabled ? (s.claimedToday ? h('p', { class: 'mut' }, 'Today\'s streak bonus collected ✅. Come back tomorrow.') : h('button', { class: 'btn', 'data-streak': '1', onclick: async () => { try { const r = await post('/api/missions/streak'); g.ui.toast(`Day ${r.streak} streak: +${fmtN(r.paid)}`, 'money'); g.audio?.play('achieve'); await g.refreshMe?.(); } catch (e) { g.ui.toast(e.message, 'bad'); } reopen(); } }, `Collect today's bonus (${fmtN(s.todayReward)})`)) : null;
  return [
    h('b', {}, `🔥 Login streak: ${s.current} day${s.current === 1 ? '' : 's'} (best ${s.best})`), h('div', { class: 'streak-ladder' }, cells), streakBtn,
    h('b', {}, `🎯 Today (resets in ${hms(v.resetsInMs)})`), ...v.daily.map(row), h('b', {}, `📅 This week (resets in ${hms(v.weekResetsInMs)})`), ...v.weekly.map(row),
    h('p', { class: 'mut' }, `Game money only. You can collect up to ${fmtN(v.caps.perDay)} a day and ${fmtN(v.caps.perWeek)} a week from missions; ${fmtN(v.caps.leftNow)} left right now.`)];
}
/** a number for the phone tab label: missions ready to collect (+1 if the streak bonus is waiting) */
export async function readyCount(g) { try { const v = await get('/api/missions'); if (!v.enabled) return 0; return [...v.daily, ...v.weekly].filter(m => m.done && !m.claimed).length + (v.streak.enabled && !v.streak.claimedToday ? 1 : 0); } catch { return 0; } }
