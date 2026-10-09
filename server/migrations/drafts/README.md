# Draft migrations (not applied)
Nothing in the server loads this folder. A file here is a proposal reviewed with the spec, then (when approved) folded into `server/core/schema.js` (`SCHEMA` + `migrate()`), which is the only place that changes a real database.

- `001_phone_v2.sql`: friends, phone settings, threads/messages/voice notes, call log, sponsored phone apps. See `15_phone_system_spec.md` section 6.
- `tests/phone-draft.test.js` applies it to an in-memory database on top of the real schema, twice, to prove it is valid and idempotent.
