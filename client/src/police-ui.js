// Nigeria Police Station sheets: report a case, bail people from holding.
import { get, post, fmtN, h } from './api.js';

const REASON_LABEL = { assault: 'Assault', theft: 'Theft', harassment: 'Harassment', other: 'Other' };

export async function reportSheet(g, venueId) {
  const ui = g.ui;
  let reason = 'assault';
  const nameIn = h('input', { type: 'text', placeholder: '@username', maxlength: 24, style: 'width:100%;margin:6px 0' });
  const detailIn = h('textarea', { placeholder: 'What happened? (optional)', maxlength: 200, rows: 3, style: 'width:100%;margin:6px 0' });
  const draw = async () => {
    const d = await ui.guard(() => get('/api/police')); if (!d) return;
    const chips = h('div', { class: 'chips' }, d.reasons.map(r => h('button', {
      class: `chip ${r === reason ? 'on' : ''}`,
      onclick: () => { reason = r; draw(); }
    }, REASON_LABEL[r] || r)));
    ui.openSheet('Report a case', [
      h('div', { class: 'row sp' }, h('b', {}, `Cash ${fmtN(d.cash)}`), h('span', { class: `tag ${d.open ? 'green' : 'amber'}` }, d.open ? 'Open' : 'Closed')),
      h('p', { class: 'mut' }, d.note),
      h('p', {}, `Filing fee ${fmtN(d.reportFee)} (ESTIMATE). If they recently attacked or robbed you, police will hold them.`),
      h('b', {}, 'Who?'), nameIn,
      h('b', {}, 'Charge'), chips,
      h('b', {}, 'Details'), detailIn,
      h('button', { class: 'btn alt', onclick: async () => {
        const r = await ui.guard(() => post('/api/police/report', {
          venueId, username: nameIn.value, reason, detail: detailIn.value,
          idem: crypto.randomUUID?.() || String(Date.now())
        }));
        if (!r) return;
        ui.toast(r.text, r.fee ? 'money' : undefined);
        if (r.user) g.update(r.user); else g.refreshMe?.();
        g.net?.nudge();
        ui.closeSheet();
      } }, `File case · ${fmtN(d.reportFee)}`)
    ]);
  };
  await draw();
}

export async function bailSheet(g, venueId) {
  const ui = g.ui;
  const draw = async () => {
    const d = await ui.guard(() => get('/api/police')); if (!d) return;
    const kids = [
      h('div', { class: 'row sp' }, h('b', {}, `Cash ${fmtN(d.cash)}`), h('span', { class: `tag ${d.open ? 'green' : 'amber'}` }, d.open ? 'Open' : 'Closed')),
      h('p', { class: 'mut' }, 'Pay bail to free yourself or someone else from the holding cell. Game money only (ESTIMATE).')
    ];
    if (d.you) {
      kids.push(h('div', { class: 'card' },
        h('b', {}, `You are held · ${REASON_LABEL[d.you.reason] || d.you.reason}`),
        h('p', {}, `Bail ${fmtN(d.you.bail)} · about ${Math.ceil((d.you.leftMs || 0) / 60000)} min left if nobody pays`),
        h('button', { class: 'btn alt', disabled: d.cash < d.you.bail, onclick: async () => {
          const r = await ui.guard(() => post('/api/police/bail', { venueId, holdId: d.you.id, idem: crypto.randomUUID?.() || String(Date.now()) }));
          if (!r) return; ui.toast(r.text, 'money'); if (r.user) g.update(r.user); else g.refreshMe?.(); g.net?.nudge(); draw();
        } }, d.cash < d.you.bail ? 'Too dear' : `Bail yourself · ${fmtN(d.you.bail)}`)
      ));
    }
    const others = (d.holding || []).filter(hld => !d.you || hld.id !== d.you.id);
    if (!others.length && !d.you) kids.push(h('p', { class: 'mut' }, 'Holding is empty right now. Come back when someone gets locked up.'));
    if (others.length) {
      kids.push(h('b', {}, 'In holding'));
      kids.push(h('div', { class: 'list' }, others.map(hld => h('div', { class: 'row sp' },
        h('span', {}, `@${hld.username}`, h('small', { class: 'mut' }, ` · ${REASON_LABEL[hld.reason] || hld.reason} · ${fmtN(hld.bail)}`)),
        h('button', { class: 'btn small', disabled: d.cash < hld.bail, onclick: async () => {
          const r = await ui.guard(() => post('/api/police/bail', { venueId, holdId: hld.id, idem: crypto.randomUUID?.() || String(Date.now()) }));
          if (!r) return; ui.toast(r.text, 'money'); if (r.user) g.update(r.user); else g.refreshMe?.(); g.net?.nudge(); draw();
        } }, d.cash < hld.bail ? 'Too dear' : `Bail ${fmtN(hld.bail)}`)
      ))));
    }
    ui.openSheet('Bail desk', kids);
  };
  await draw();
}

export async function holdingSheet(g) {
  const ui = g.ui;
  const d = await ui.guard(() => get('/api/police')); if (!d) return;
  const rows = (d.holding || []).map(hld => h('div', {},
    h('span', {}, `@${hld.username}`),
    h('small', { class: 'mut' }, ` · ${REASON_LABEL[hld.reason] || hld.reason}${hld.reporter ? ` · reported by @${hld.reporter}` : ''}`)
  ));
  ui.openSheet('Holding cells', [
    h('p', { class: 'mut' }, 'People waiting for bail or release.'),
    rows.length ? h('div', { class: 'list' }, rows) : h('p', {}, 'Empty. The cells are quiet.'),
    d.you ? h('p', {}, 'You are in here too — talk to the Bail desk.') : ''
  ]);
}
