// More > Graphics: Auto, Lite, Normal, High. Changes apply at once (resolution, fog, view distance, frame cap); walker count and anti-aliasing apply after a reload.
import { h } from './api.js';
import * as Q from './quality.js';
import { PROFILES, LEVELS } from './quality-config.js';

export function graphicsBlock(g) {
  const cur = g.qualityChoice || 'auto'; const note = h('p', { class: 'mut', id: 'qualityNote' });
  const say = () => { note.textContent = `Now using: ${g.quality?.label || '?'}${g.qualityChoice === 'auto' ? ' (Auto picks for your phone and slows down if it lags)' : ''}. Some changes apply after you reload.`; };
  const btns = ['auto', ...LEVELS].map(v => h('button', { class: 'btn small ghost' + (v === cur ? ' on' : ''), 'data-quality': v, onclick: (e) => {
    g.qualityChoice = v; Q.saveChoice(localStorage, v); g.governor = new Q.Governor(); Q.apply(g, Q.resolve(v, Q.readEnv())); for (const b of btns) b.classList.toggle('on', b === e.currentTarget); say();
  } }, v === 'auto' ? 'Auto' : PROFILES[v].label));
  say(); return [h('b', {}, '🎞️ Graphics'), h('div', { class: 'quality-row' }, btns), note];
}
