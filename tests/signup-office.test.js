// Sign-up choices (city, city of interest, interests), apply-to-join, the Naija Area office venue, ideas, and the admin backend view (10 Oct 2026).
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at, DAY } from './helpers.js';
import { cityIdOf } from '../server/core/cities.js';
import { cityChoices } from '../server/core/signup.js';
import { INTEREST_OPTIONS, APPLY_ROLES, IDEA_CATEGORIES } from '../server/config/signup.js';

const goodApply = (o = {}) => ({ role: 'tester', skills: 'I play on a cheap phone', message: 'I would like to test the new districts and report bugs every week.', ...o });
const goodIdea = (o = {}) => ({ category: 'gameplay', title: 'Okada race in Kano', description: 'A short okada race through the old city lanes with a small prize in game money.', why: 'It would be fun on a phone.', priority: 3, ...o });
const post = (s, u, path, body) => call(s, 'POST', path, { uid: u, body });
const admin = (s, method, path, body) => call(s, method, path, { admin: true, body });

test('city choices: one entry per city (Lagos groups its districts and starts on the Mainland), preview towns are never offered', () => {
  const s = makeServer(); const c = cityChoices(s.app); const ids = c.map(x => x.id); assert.equal(ids[0], 'lagos'); for (const id of ['kano', 'shagamu', 'abeokuta', 'ijebu-ode', 'abule']) assert.ok(ids.includes(id), id);
  assert.ok(!ids.includes('preview-town')); assert.equal(c.find(x => x.id === 'lagos').entry, 'lagos-mainland'); assert.ok(c.find(x => x.id === 'lagos').districts >= 5); assert.equal(c.find(x => x.id === 'kano').entry, 'kano');
});
test('who still needs set-up: registered accounts yes, guests and bots no, and done or skipped means no', async () => {
  const s = makeServer(); const u = mkUser(s); const g = mkUser(s, { guest: true }); const b = mkUser(s, { bot: true });
  assert.equal((await ok(s, 'GET', '/api/me', { uid: u })).user.signup.needed, true); assert.equal((await ok(s, 'GET', '/api/me', { uid: g })).user.signup.needed, false); assert.equal((await ok(s, 'GET', '/api/me', { uid: b })).user.signup.needed, false);
  const r = await ok(s, 'POST', '/api/signup/profile', { uid: u, body: { skip: true } }); assert.equal(r.signup.needed, false); assert.equal(r.signup.skipped, true); assert.equal((await ok(s, 'GET', '/api/me', { uid: u })).user.signup.needed, false);
});
test('choose city, then a DIFFERENT city of interest, then interests: stored, you start in the chosen city, and the options list says what is allowed', async () => {
  const s = makeServer(); const u = mkUser(s); const o = await ok(s, 'GET', '/api/signup/options', { uid: u }); assert.equal(o.homeCity, 'lagos'); assert.equal(o.interests.length, INTEREST_OPTIONS.length); assert.equal(o.homeLocked, false);
  const r = await ok(s, 'POST', '/api/signup/profile', { uid: u, body: { homeCity: 'kano', interestCity: 'lagos', interests: ['music', 'cars'] } }); assert.equal(r.moved.cityId, 'kano'); assert.equal(cityIdOf(s.app, u), 'kano'); assert.equal(r.user.cityId, 'kano');
  assert.deepEqual(r.signup, { needed: false, done: true, skipped: false, homeCity: 'kano', interestCity: 'lagos', interests: ['music', 'cars'] }); assert.equal((await ok(s, 'GET', '/api/signup/options', { uid: u })).homeLocked, true);
});
test('set-up rules: unknown city or interest, same city twice, none or too many interests, and the home city cannot be changed afterwards', async () => {
  const s = makeServer(); const u = mkUser(s); const sv = (b) => post(s, u, '/api/signup/profile', b); const ints = INTEREST_OPTIONS.map(i => i.id);
  assert.equal((await sv({ homeCity: 'atlantis', interests: ['music'] })).json.error, 'BAD_CITY'); assert.equal((await sv({ interestCity: 'atlantis', interests: ['music'] })).json.error, 'BAD_CITY'); assert.equal((await sv({ interestCity: 'lagos', interests: ['music'] })).json.error, 'SAME_CITY', 'you start in Lagos');
  assert.equal((await sv({ interests: ['music', 'unicorns'] })).json.error, 'BAD_INTEREST'); assert.equal((await sv({ interests: [] })).json.error, 'NEED_INTEREST'); assert.equal((await sv({ interests: ints.slice(0, 6) })).json.error, 'TOO_MANY_INTERESTS');
  assert.equal((await sv({ interests: ['music', 'music', 'cars'] })).status, 200, 'repeats collapse'); assert.deepEqual((await ok(s, 'GET', '/api/signup/options', { uid: u })).current.interests, ['music', 'cars']);
  assert.equal((await sv({ homeCity: 'kano', interests: ['music'] })).json.error, 'HOME_LOCKED'); const ed = await ok(s, 'POST', '/api/signup/profile', { uid: u, body: { interestCity: 'kano', interests: ['football'] } }); assert.equal(ed.signup.interestCity, 'kano'); assert.deepEqual(ed.signup.interests, ['football']); assert.equal(cityIdOf(s.app, u), 'lagos-mainland');
});
test('the home city cannot be changed while flying or inside a venue (and nothing is saved then)', async () => {
  const s = makeServer(); const u = mkUser(s, { ageMs: 600000 }); const v = s.app.city.venueById.venue_salon1; at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: v.id } });
  const r = await post(s, u, '/api/signup/profile', { homeCity: 'kano', interests: ['music'] }); assert.equal(r.json.error, 'INSIDE'); assert.equal((await ok(s, 'GET', '/api/me', { uid: u })).user.signup.needed, true);
});
test('apply to join: a registered account, validated, one open application, visible to the applicant with a kind status text', async () => {
  const s = makeServer(); const u = mkUser(s); const g = mkUser(s, { guest: true });
  assert.equal((await post(s, g, '/api/office/apply', goodApply())).json.error, 'NEED_ACCOUNT'); assert.equal((await ok(s, 'GET', '/api/office', { uid: g })).canApply, false);
  assert.equal((await post(s, u, '/api/office/apply', goodApply({ role: 'king' }))).json.error, 'BAD_ROLE'); assert.equal((await post(s, u, '/api/office/apply', goodApply({ message: 'short' }))).json.error, 'MESSAGE_SHORT'); assert.equal((await post(s, u, '/api/office/apply', goodApply({ message: 'x'.repeat(1001) }))).json.error, 'MESSAGE_LONG');
  assert.equal((await post(s, u, '/api/office/apply', goodApply({ message: 'I want to join and my phone is 08031234567 call me' }))).json.error, 'NO_CONTACT_INFO'); assert.equal((await post(s, u, '/api/office/apply', goodApply({ skills: 'fuck all' }))).json.error, 'CLEAN_IT_UP');
  assert.equal((await post(s, u, '/api/office/apply', goodApply({ contact: 'not-an-email' }))).json.error, 'BAD_CONTACT'); assert.equal((await post(s, u, '/api/office/apply', goodApply({ contact: 'ada@example.com' }))).json.error, 'CONSENT_NEEDED');
  const r = await ok(s, 'POST', '/api/office/apply', { uid: u, body: goodApply({ contact: 'ada@example.com', contactOk: true }) }); assert.equal(r.application.status, 'new'); assert.match(r.application.statusText, /Received/);
  assert.equal((await post(s, u, '/api/office/apply', goodApply())).json.error, 'ALREADY_APPLIED'); const info = await ok(s, 'GET', '/api/office', { uid: u }); assert.equal(info.canApply, false); assert.equal(info.application.roleLabel, APPLY_ROLES[0].label); assert.deepEqual(info.roles.map(x => x.id), APPLY_ROLES.map(x => x.id));
  const w = await ok(s, 'POST', '/api/office/withdraw', { uid: u }); assert.equal(w.application.status, 'withdrawn'); assert.equal((await ok(s, 'GET', '/api/office', { uid: u })).canApply, true); assert.equal((await post(s, u, '/api/office/apply', goodApply())).status, 200, 'can apply again after withdrawing');
  assert.equal((await post(s, g, '/api/office/withdraw', {})).json.error, 'NEED_ACCOUNT');
});
test('backend view: applications listed with the applicant, status and note set by the admin, the applicant is told, declined means a wait before applying again, accepted is final', async () => {
  const s = makeServer(); const u = mkUser(s); await ok(s, 'POST', '/api/office/apply', { uid: u, body: goodApply({ contact: 'ada@example.com', contactOk: true, role: 'designer' }) });
  assert.equal((await call(s, 'GET', '/api/admin/applications')).status, 401, 'admin only'); const list = (await ok(s, 'GET', '/api/admin/applications', { admin: true })); assert.equal(list.rows.length, 1); const a = list.rows[0]; assert.equal(a.role, 'designer'); assert.ok(a.username); assert.equal(a.contact, 'ada@example.com'); assert.equal(list.summary.applications.new, 1);
  assert.equal((await admin(s, 'POST', `/api/admin/applications/${a.id}/status`, { status: 'nonsense' })).json.error, 'BAD_STATUS'); assert.equal((await admin(s, 'POST', `/api/admin/applications/999/status`, { status: 'review' })).status, 404);
  await ok(s, 'POST', `/api/admin/applications/${a.id}/status`, { admin: true, body: { status: 'shortlisted', note: 'Strong portfolio' } }); assert.match((await ok(s, 'GET', '/api/office', { uid: u })).application.statusText, /shortlist/); assert.ok((await ok(s, 'GET', '/api/notifications', { uid: u })).rows.some(n => n.kind === 'office' && /shortlist/.test(n.text)));
  assert.equal((await ok(s, 'GET', '/api/admin/applications?status=new', { admin: true })).rows.length, 0); assert.equal((await ok(s, 'GET', '/api/admin/applications?status=shortlisted,accepted', { admin: true })).rows[0].note, 'Strong portfolio');
  await ok(s, 'POST', `/api/admin/applications/${a.id}/status`, { admin: true, body: { status: 'declined' } }); assert.equal((await post(s, u, '/api/office/apply', goodApply())).json.error, 'TOO_SOON'); s.app.clock.advance(8 * DAY); assert.equal((await post(s, u, '/api/office/apply', goodApply())).status, 200);
  const id2 = (await ok(s, 'GET', '/api/admin/applications?status=new', { admin: true })).rows[0].id; await ok(s, 'POST', `/api/admin/applications/${id2}/status`, { admin: true, body: { status: 'accepted' } }); assert.equal((await post(s, u, '/api/office/apply', goodApply())).json.error, 'ALREADY_MEMBER');
});
test('applicant email is only shown to the admin when the player ticked consent, and a rate limit stops application floods', async () => {
  const s = makeServer(); const u = mkUser(s); await ok(s, 'POST', '/api/office/apply', { uid: u, body: goodApply() }); const row = s.db.prepare('SELECT contact, contact_ok FROM applications').get(); assert.equal(row.contact, null); assert.equal(row.contact_ok, 0);
  const v = mkUser(s); let last; for (let i = 0; i < 5; i++) { last = await post(s, v, '/api/office/apply', goodApply()); if (last.status === 200) await ok(s, 'POST', '/api/office/withdraw', { uid: v }); } assert.equal(last.status, 429);
});
test('share an idea: same fields and limits as the idea pipeline, five a day, no duplicates, no rude words, guests need an account', async () => {
  const s = makeServer(); const u = mkUser(s); const g = mkUser(s, { guest: true }); assert.equal((await post(s, g, '/api/office/idea', goodIdea())).json.error, 'NEED_ACCOUNT');
  assert.equal((await post(s, u, '/api/office/idea', goodIdea({ category: 'memes' }))).json.error, 'BAD_CATEGORY'); assert.equal((await post(s, u, '/api/office/idea', goodIdea({ title: 'abc' }))).json.error, 'TITLE_SHORT'); assert.equal((await post(s, u, '/api/office/idea', goodIdea({ description: 'too short' }))).json.error, 'DESCRIPTION_SHORT');
  assert.equal((await post(s, u, '/api/office/idea', goodIdea({ priority: 9 }))).json.error, 'BAD_PRIORITY'); assert.equal((await post(s, u, '/api/office/idea', goodIdea({ why: 'y'.repeat(601) }))).json.error, 'WHY_LONG'); assert.equal((await post(s, u, '/api/office/idea', goodIdea({ description: 'This is a shit idea but it is long enough' }))).json.error, 'CLEAN_IT_UP');
  const r = await ok(s, 'POST', '/api/office/idea', { uid: u, body: goodIdea() }); assert.equal(r.ideasLeftToday, 4); assert.equal((await post(s, u, '/api/office/idea', goodIdea())).json.error, 'DUPLICATE_IDEA');
  for (let i = 0; i < 4; i++) await ok(s, 'POST', '/api/office/idea', { uid: u, body: goodIdea({ title: `Another idea number ${i}` }) }); assert.equal((await post(s, u, '/api/office/idea', goodIdea({ title: 'Idea number six' }))).json.error, 'IDEA_LIMIT'); s.app.clock.advance(DAY + 1000); assert.equal((await post(s, u, '/api/office/idea', goodIdea({ title: 'Idea number six' }))).status, 200);
  assert.equal((await ok(s, 'GET', '/api/office', { uid: u })).ideas.length, 6); assert.deepEqual((await ok(s, 'GET', '/api/office', { uid: u })).categories, IDEA_CATEGORIES);
});
test('ideas in the backend, and the export in the idea pipeline record shape: accepted contributors count as named contributors, everyone else is anonymous', async () => {
  const s = makeServer(); const a = mkUser(s), b = mkUser(s); await ok(s, 'POST', '/api/office/idea', { uid: a, body: goodIdea({ title: 'Idea from a player' }) }); await ok(s, 'POST', '/api/office/apply', { uid: b, body: goodApply({ role: 'developer' }) });
  const ap = (await ok(s, 'GET', '/api/admin/applications', { admin: true })).rows[0]; await ok(s, 'POST', `/api/admin/applications/${ap.id}/status`, { admin: true, body: { status: 'accepted' } }); await ok(s, 'POST', '/api/office/idea', { uid: b, body: goodIdea({ title: 'Idea from a contributor' }) });
  const ideas = await ok(s, 'GET', '/api/admin/ideas', { admin: true }); assert.equal(ideas.rows.length, 2); assert.ok(ideas.rows.every(r => r.username && r.title && r.status === 'new')); assert.equal(ideas.summary.ideas.new, 2);
  const ex = (await ok(s, 'GET', '/api/admin/ideas/export', { admin: true })).rows; assert.equal(ex.length, 2); const player = ex.find(x => x.title === 'Idea from a player'), member = ex.find(x => x.title === 'Idea from a contributor');
  assert.equal(player.contributorId, null); assert.equal(player.name, ''); assert.equal(member.contributorId, `G${b}`); assert.equal(member.role, 'dev'); assert.equal(member.source, 'game-office'); for (const k of ['createdAt', 'category', 'description', 'why', 'priority']) assert.ok(k in member);
  assert.equal((await ok(s, 'POST', '/api/admin/ideas/exported', { admin: true, body: { ids: ex.map(x => x.gameId) } })).marked, 2); assert.equal((await ok(s, 'GET', '/api/admin/ideas/export', { admin: true })).rows.length, 0, 'exported once');
  await ok(s, 'POST', `/api/admin/ideas/${ideas.rows[0].id}/status`, { admin: true, body: { status: 'parked', note: 'later' } }); assert.equal((await ok(s, 'GET', '/api/admin/ideas?status=parked', { admin: true })).rows.length, 1); assert.equal((await admin(s, 'POST', `/api/admin/ideas/${ideas.rows[0].id}/status`, { status: 'x' })).json.error, 'BAD_STATUS');
});
test('backend view of sign-up choices: counts by city, city of interest and interest, skipped separately', async () => {
  const s = makeServer(); const a = mkUser(s), b = mkUser(s), c = mkUser(s); await ok(s, 'POST', '/api/signup/profile', { uid: a, body: { homeCity: 'kano', interestCity: 'lagos', interests: ['music', 'cars'] } }); await ok(s, 'POST', '/api/signup/profile', { uid: b, body: { interestCity: 'kano', interests: ['music'] } }); await ok(s, 'POST', '/api/signup/profile', { uid: c, body: { skip: true } });
  const st = await ok(s, 'GET', '/api/admin/signups', { admin: true }); assert.equal(st.total, 3); assert.equal(st.done, 2); assert.equal(st.skipped, 1); assert.deepEqual(st.homeCities.map(x => [x.id, x.n]).sort(), [['kano', 1], ['lagos', 1]]); assert.equal(st.interests[0].id, 'music'); assert.equal(st.interests[0].n, 2); assert.equal(st.interestCities.find(x => x.id === 'kano').label, 'Kano');
});
test('the Naija Area office is a visible building and venue in Lagos Mainland with reception, idea box and notice board, and opens for visitors', async () => {
  const s = makeServer(); const v = s.app.city.venueById.venue_office; assert.ok(v); assert.equal(v.kind, 'office'); const b = s.app.city.buildingById[v.buildingId]; assert.equal(b.label, 'Naija Area Office'); assert.ok(b.w >= 20);
  assert.deepEqual(v.stations.filter(x => x.type === 'office').map(x => x.focus).sort(), ['apply', 'ideas']); assert.ok(v.room.decor.length >= 12 && v.room.detailV2); assert.ok(s.app.city.places.some(p => p.id === 'venue_office'), 'on the map and in search');
  const u = mkUser(s, { ageMs: 600000 }); at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); const view = await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: v.id } }); assert.equal(view.name, 'Naija Area Office');
});
test('player data helpers (used by account deletion and download): the player gets their own rows back, and they can be erased', async () => {
  const s = makeServer(); const u = mkUser(s); await ok(s, 'POST', '/api/office/apply', { uid: u, body: goodApply({ contact: 'ada@example.com', contactOk: true }) }); await ok(s, 'POST', '/api/office/idea', { uid: u, body: goodIdea() }); await ok(s, 'POST', '/api/signup/profile', { uid: u, body: { interests: ['music'] } });
  const office = await import('../server/core/office.js'), signup = await import('../server/core/signup.js'); const mine = office.exportMine(s.app, u); assert.equal(mine.applications.length, 1); assert.equal(mine.ideas.length, 1); assert.equal(signup.exportMine(s.app, u).interests[0], 'music');
  office.deleteMine(s.app, u); signup.deleteMine(s.app, u); assert.equal(office.exportMine(s.app, u).applications.length, 0); assert.equal(office.exportMine(s.app, u).ideas.length, 0); assert.equal(signup.exportMine(s.app, u), null);
});
test('the admin page has the backend cards for applications, ideas and sign-up choices, and the script that fills them uses only ids that exist', async () => {
  const fs = await import('node:fs'); const html = fs.readFileSync(new URL('../public/admin.html', import.meta.url), 'utf8'); const js = fs.readFileSync(new URL('../public/js/admin-office.js', import.meta.url), 'utf8');
  assert.match(html, /<script src="\/js\/admin-office.js"><\/script>/); for (const id of new Set([...js.matchAll(/\$\('#([a-z]+)'\)/g)].map(m => m[1]))) if (!['iexp', 'out'].includes(id)) assert.ok(html.includes(`id="${id}"`), `#${id} in admin.html`);
  for (const route of ['/api/admin/applications', '/api/admin/ideas', '/api/admin/signups', '/api/admin/ideas/export', '/api/admin/ideas/exported']) assert.ok(js.includes(route), route);
});
