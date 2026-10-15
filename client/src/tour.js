// Onboarding (10 Oct 2026): a short first-run tour, a "?" help button that reopens it, and a one-line "what to do next" hint driven by the player's own state.
// Pure data and functions first (unit-tested), then the small DOM class. Text is plain, Nigerian-English friendly, no invented facts about real places.
export const TOUR_KEY = 'na_tour_v1';
export const STEPS = [
  { icon: '🚶', title: 'Move around', touch: 'Drag on the left side of the screen to walk. Drag on the right to look around.', desk: 'Use W A S D or the arrow keys to walk. Hold Shift to run. Drag the mouse to look around.' },
  { icon: '🗺️', title: 'Tap places', touch: 'Tap any building, sign or marker to see what it is. Tap the little map in the corner for the big map and search.', desk: 'Click any building, sign or marker to see what it is. Press M (or click the little map) for the big map and search.' },
  { icon: '💼', title: 'Earn money', touch: 'Go to a blue job marker (Corner Mart is the easiest) and start a shift. Game money only: nothing here costs real money.', desk: 'Go to a blue job marker (Corner Mart is the easiest) and start a shift. Game money only: nothing here costs real money.' },
  { icon: '🍲', title: 'Look after yourself', touch: 'Watch the bars top left: energy ⚡, hunger 🍲, health ❤️ and mood 😊. Eat at Mama Put, rest at home.', desk: 'Watch the bars top left: energy ⚡, hunger 🍲, health ❤️ and mood 😊. Eat at Mama Put, rest at home.' },
  { icon: '📱', title: 'Your phone', touch: 'Tap 📱 for wallet, jobs, garage, games, map and Oya Ride. Create a free account to add friends, chat and call.', desk: 'Press P or click 📱 for wallet, jobs, garage, games, map and Oya Ride. Create a free account to add friends, chat and call.' },
  { icon: '🚗', title: 'Cars and the road', touch: 'Walk up to your own car and tap it to get in. Traffic stops for you, but not always: a hit hurts your health (never your account).', desk: 'Walk up to your own car and tap it (or press C beside it) to get in. Traffic stops for you, but not always: a hit hurts your health (never your account).' }
];
export const stepText = (s, touch) => (touch ? s.touch : s.desk);
/** one line telling the player what to try next, or null. Order matters: the first match wins. `u` is the /api/me user. */
export function nextHint(u) {
  if (!u) return null;
  if (u.shift) return { id: 'shift', text: 'Your shift is running. Wait for the timer, then collect your pay.' };
  if (!u.totalShifts) return { id: 'first_job', text: 'Start your first job: go to a blue 💼 marker (Corner Mart is the easiest).' };
  if (u.fainted) return { id: 'fainted', text: 'You fainted from hunger. Call a cab or a friend to take you to a canteen, then eat to regain strength.' };
  if (u.hunger != null && u.hunger < 35) return { id: 'hungry', text: 'Food is low. Eat at Mama Put Canteen before you faint.' };
  if (u.energy != null && u.energy < 30) return { id: 'tired', text: 'You are tired. Rest at home or buy a drink.' };
  if (u.health && u.health.health != null && u.health.health < 40) return { id: 'hurt', text: 'Your health is low. Rest, or visit the Community Clinic.' };
  if (!u.home) return { id: 'home', text: 'Get a place to stay: tap a green 🏠 house marker and rent a room.' };
  if (u.guest) return { id: 'account', text: 'Create a free account (phone menu) to keep your progress and add friends.' };
  if ((u.cash || 0) >= 20000) return { id: 'spend', text: 'Got money? Play a game at Mama Put, or look at cars at Motoka AutoMart Showroom.' };
  return null;
}
export const seenTour = (store) => { try { return !!store.getItem(TOUR_KEY); } catch { return true; } };
export const markTour = (store) => { try { store.setItem(TOUR_KEY, String(Date.now())); } catch { /* ignore */ } };

import { h, $ } from './api.js';
export class Tour {
  constructor(game) {
    this.g = game; this.i = 0; this.hintDismissed = new Set(); this.touch = matchMedia('(pointer: coarse)').matches;
    this.help = h('button', { class: 'round small', id: 'helpBtn', 'aria-label': 'How to play', onclick: () => this.open() }, '?'); $('#right').append(this.help);
    this.hint = h('div', { id: 'hintChip', class: 'pill hidden', onclick: () => { if (this.cur) { this.hintDismissed.add(this.cur.id); this.hint.classList.add('hidden'); } } }); document.body.appendChild(this.hint);
    this.timer = setInterval(() => this.tickHint(), 3000);
  }
  /** show the tour once for a new player */
  maybeStart() { if (navigator.webdriver && !localStorage.getItem('na_tour_force')) return; /* automated browsers skip it so the other smoke tests are not blocked */ if (!seenTour(localStorage)) setTimeout(() => this.open(), 1200); }
  open() { this.close(); this.i = 0; this.root = h('div', { id: 'tour', class: 'tour', role: 'dialog', 'aria-label': 'How to play' }); document.body.appendChild(this.root); this.draw(); }
  close() { this.root?.remove(); this.root = null; markTour(localStorage); }
  draw() {
    const s = STEPS[this.i], last = this.i === STEPS.length - 1;
    this.root.replaceChildren(h('div', { class: 'tour-card' }, h('div', { class: 'tour-ico' }, s.icon), h('h3', {}, s.title), h('p', {}, stepText(s, this.touch)),
      h('div', { class: 'tour-dots' }, STEPS.map((_, k) => h('i', { class: k === this.i ? 'on' : '' }))),
      h('div', { class: 'tour-btns' }, h('button', { class: 'btn ghost', id: 'tourSkip', onclick: () => this.close() }, last ? 'Close' : 'Skip'), this.i > 0 ? h('button', { class: 'btn ghost', id: 'tourBack', onclick: () => { this.i--; this.draw(); } }, 'Back') : '', h('button', { class: 'btn', id: 'tourNext', onclick: () => { if (last) this.close(); else { this.i++; this.draw(); } } }, last ? "Let's go" : 'Next'))));
  }
  tickHint() {
    const g = this.g; if (!g.playing || this.root || g.busy || g.commute || g.tutorial?.v?.active) { this.hint.classList.add('hidden'); return; }
    const h2 = nextHint(g.user); this.cur = h2; if (!h2 || this.hintDismissed.has(h2.id)) { this.hint.classList.add('hidden'); return; } this.hint.textContent = '💡 ' + h2.text; this.hint.classList.remove('hidden');
  }
}
