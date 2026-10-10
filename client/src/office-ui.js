// The Naija Area office sheets: Reception (apply to join the contributor team) and the Idea box. Same sheets open from More > Apply to join.
import { get, post, h } from './api.js';

const when = (ms) => new Date(ms).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' });
export async function officeSheet(g, focus = 'apply') {
  const ui = g.ui; let tab = focus === 'ideas' ? 'ideas' : 'apply'; let info = await ui.guard(() => get('/api/office')); if (!info) return;
  const draw = () => {
    const tabs = h('div', { class: 'tabrow' }, [['apply', 'Apply to join'], ['ideas', 'Share an idea']].map(([id, t]) => h('button', { class: tab === id ? 'on' : '', 'data-tab': id, onclick: () => { tab = id; draw(); } }, t)));
    ui.openSheet('Naija Area Office', [tabs, ...(tab === 'apply' ? applyBody() : ideaBody())]);
  };
  const refresh = async () => { const i = await ui.guard(() => get('/api/office')); if (i) info = i; draw(); };
  const noAccount = () => h('p', { class: 'tag amber' }, 'Guests cannot apply or share ideas: create an account (Sign up on the start screen) so we can find you again.');
  const applyBody = () => {
    const a = info.application; const kids = [h('p', { class: 'mut' }, 'Join the contributor team: testers, designers, developers, artists, local knowledge and community helpers. This is not a waiting list for the game: you can play now.')];
    if (a) kids.push(h('div', { class: 'card inset', 'data-app-status': a.status }, h('b', {}, `Your application: ${a.roleLabel}`), h('p', {}, a.statusText), h('small', { class: 'mut' }, `Sent ${when(a.createdAt)} · ${a.status}`), ['new', 'review', 'shortlisted'].includes(a.status) ? h('div', { class: 'row', style: 'margin-top:6px' }, h('button', { class: 'btn small ghost', 'data-withdraw': '1', onclick: async () => { if (await ui.guard(() => post('/api/office/withdraw'))) { ui.toast('Application withdrawn.'); refresh(); } } }, 'Withdraw')) : null));
    if (!info.account) { kids.push(noAccount()); return kids; }
    if (!info.canApply) { if (!a) kids.push(h('p', { class: 'mut' }, 'You cannot apply right now.')); return kids; }
    const role = h('select', { class: 'sheet-input', 'data-f': 'role' }, info.roles.map(r => h('option', { value: r.id }, r.label)));
    const skills = h('input', { class: 'sheet-input', 'data-f': 'skills', maxlength: info.rules.apply.skills, placeholder: 'Your skills in a line (optional)' });
    const message = h('textarea', { class: 'sheet-input', 'data-f': 'message', rows: 5, maxlength: info.rules.apply.message.max, placeholder: `Why do you want to join, and what can you help with? (${info.rules.apply.message.min}+ characters)` });
    const contact = h('input', { class: 'sheet-input', 'data-f': 'contact', type: 'email', maxlength: info.rules.apply.contact, placeholder: 'Email (optional: we can also reach you in the game)' });
    const consent = h('input', { type: 'checkbox', 'data-f': 'consent' }); const err = h('div', { class: 'err' });
    kids.push(h('label', { class: 'field' }, h('span', {}, 'I can help as'), role), h('label', { class: 'field' }, h('span', {}, 'Skills'), skills), h('label', { class: 'field' }, h('span', {}, 'Tell us about you'), message), h('label', { class: 'field' }, h('span', {}, 'Email'), contact),
      h('label', { class: 'check' }, consent, h('span', {}, ' You may use this email to contact me about this application. It is kept private and deleted if I delete my account.')), err,
      h('button', { class: 'btn big', 'data-send': '1', onclick: async (e) => { err.textContent = ''; e.target.disabled = true; try { await post('/api/office/apply', { role: role.value, skills: skills.value, message: message.value, contact: contact.value.trim(), contactOk: consent.checked }); ui.toast('Application sent. Thank you!'); refresh(); } catch (er) { err.textContent = er.message; e.target.disabled = false; } } }, 'Send application'));
    return kids;
  };
  const ideaBody = () => {
    const kids = [h('p', { class: 'mut' }, 'Have an idea for the game? Put it in the box. We read every one. Please keep it clean; no phone numbers.')];
    if (!info.account) { kids.push(noAccount()); return kids; }
    const cat = h('select', { class: 'sheet-input', 'data-f': 'category' }, info.categories.map(c => h('option', { value: c }, c)));
    const title = h('input', { class: 'sheet-input', 'data-f': 'title', maxlength: info.rules.idea.title.max, placeholder: 'Idea title' });
    const desc = h('textarea', { class: 'sheet-input', 'data-f': 'description', rows: 4, maxlength: info.rules.idea.description.max, placeholder: `Describe it (${info.rules.idea.description.min}+ characters)` });
    const why = h('input', { class: 'sheet-input', 'data-f': 'why', maxlength: info.rules.idea.why.max, placeholder: 'Why would it help? (optional)' });
    const pr = h('select', { class: 'sheet-input', 'data-f': 'priority' }, [1, 2, 3, 4, 5].map(n => h('option', { value: n, selected: n === 3 }, n === 1 ? '1 (nice to have)' : n === 5 ? '5 (must have)' : String(n)))); const err = h('div', { class: 'err' });
    kids.push(h('label', { class: 'field' }, h('span', {}, 'Category'), cat), h('label', { class: 'field' }, h('span', {}, 'Title'), title), h('label', { class: 'field' }, h('span', {}, 'The idea'), desc), h('label', { class: 'field' }, h('span', {}, 'Why it matters'), why), h('label', { class: 'field' }, h('span', {}, 'How important'), pr), err,
      h('button', { class: 'btn big', 'data-send': '1', disabled: info.ideasLeftToday <= 0, onclick: async (e) => { err.textContent = ''; e.target.disabled = true; try { await post('/api/office/idea', { category: cat.value, title: title.value, description: desc.value, why: why.value, priority: Number(pr.value) }); ui.toast('Idea received. Thank you!'); refresh(); } catch (er) { err.textContent = er.message; e.target.disabled = false; } } }, info.ideasLeftToday > 0 ? `Put it in the box (${info.ideasLeftToday} left today)` : 'Come back tomorrow'));
    if (info.ideas.length) kids.push(h('b', { style: 'display:block;margin-top:10px' }, 'Your ideas'), h('div', { class: 'list' }, info.ideas.map(i => h('div', { 'data-idea': i.id }, h('span', {}, i.title, h('small', { class: 'mut' }, ` · ${i.category} · ${i.status}`))))));
    return kids;
  };
  draw();
}
