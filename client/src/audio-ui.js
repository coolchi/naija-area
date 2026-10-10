// More > Sound: effects volume, music volume, on/off. Settings are kept in the browser (audio.js). Nothing here is sent to the server.
import { h, $ } from './api.js';

export function soundBlock(g) {
  const a = g.audio; if (!a) return []; const s = a.set; const mk = (id, label, key) => h('label', { class: 'mut', style: 'display:block;margin:4px 0' }, `${label} `, h('input', { type: 'range', min: 0, max: 100, value: Math.round(s[key] * 100), 'data-sound': id, oninput: (e) => { a.update({ [key]: e.target.value / 100 }); if (key === 'sfx') a.play('coin'); } }));
  const btn = h('button', { class: 'btn small ghost', 'data-sound': 'on', onclick: () => { const on = a.toggle(); btn.textContent = on ? 'Sound is on' : 'Sound is off'; $('#muteBtn').textContent = on ? '🔊' : '🔇'; g.ui.sfxOn = on; } }, s.on ? 'Sound is on' : 'Sound is off');
  return [h('b', {}, '🔊 Sound'), h('p', { class: 'mut' }, 'Effects and light music are made by your phone as you play. The car radio has its own volume.'), btn, mk('sfx', 'Effects', 'sfx'), mk('music', 'Music', 'music')];
}
