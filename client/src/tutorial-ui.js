// First-five-minutes tutorial card: one line showing the current step ("2/7 Open the map"), tap to open the whole checklist. The server checks the steps (config/progress.js).
import { get, post, h, $ } from './api.js';

export class TutorialCard {
  constructor(game) {
    this.g = game; this.v = null; this.open = false; this.timer = null; this.touch = matchMedia('(pointer: coarse)').matches;
    this.el = h('div', { id: 'tutCard', class: 'pill hidden', 'data-tutorial': '1' }); document.body.append(this.el);
  }
  async start() { if (this.timer) return; await this.refresh(); }
  async refresh() {
    try { this.v = await get('/api/tutorial'); } catch { this.v = null; }
    this.draw(); clearTimeout(this.timer); if (this.v?.active) this.timer = setTimeout(() => this.refresh(), this.v.pollMs || 8000); else this.timer = null;
  }
  /** the app tells the server about steps only it can see (opened the map, opened the phone) */
  async ack(step) { if (!this.v?.active) return; const s = this.v.steps.find(x => x.id === step); if (!s || s.done) return; try { this.v = await post('/api/tutorial/ack', { step }); this.draw(); } catch { /* the next poll fixes it */ } }
  draw() {
    const v = this.v; const g = this.g;
    if (!v || !v.active || !g.playing) { if (v?.done && !this.celebrated) { this.celebrated = true; g.ui?.toast?.(`🎉 Tutorial complete! +₦${(v.reward || 0).toLocaleString('en-NG')}`); g.ui?.sfx?.('ok'); } this.el.classList.add('hidden'); return; }
    const cur = v.steps.find(s => s.id === v.current) || v.steps[0]; this.el.classList.remove('hidden'); this.el.classList.toggle('open', this.open);
    const head = h('div', { class: 'tut-head', 'data-tut-head': '1', onclick: () => { this.open = !this.open; this.draw(); } }, h('b', {}, `${cur.icon} ${v.doneCount + 1 > v.steps.length ? v.steps.length : v.doneCount + 1}/${v.steps.length} ${cur.title}`), h('span', { class: 'tut-more' }, this.open ? '▲' : '▼'));
    const kids = [head, h('div', { class: 'tut-text' }, this.touch ? cur.touch : cur.desk)];
    if (this.open) kids.push(h('ul', { class: 'tut-list' }, v.steps.map(s => h('li', { class: s.done ? 'done' : s.id === cur.id ? 'now' : '', 'data-step': s.id }, `${s.done ? '✅' : s.id === cur.id ? '👉' : '⬜'} ${s.title}`))), h('div', { class: 'row' }, h('small', { class: 'mut' }, `Finish the real steps to earn ₦${v.rewardAmount.toLocaleString('en-NG')} (game money).`), h('button', { class: 'btn small ghost', 'data-tut-skip': '1', onclick: async () => { try { this.v = await post('/api/tutorial/skip'); } catch { /* ignore */ } this.draw(); } }, 'Skip tutorial')));
    this.el.replaceChildren(...kids);
  }
  async restart() { try { this.v = await post('/api/tutorial/restart'); this.open = true; this.celebrated = false; this.draw(); this.refresh(); } catch (e) { this.g.ui?.toast?.(e.message); } }
}
