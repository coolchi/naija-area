// Age-check config. NO VENDOR IS CHOSEN. Default: off (the 18+ checkbox only, as before). The mock provider is a stand-in for tests and play-testing.
const env = process.env;
const num = (k, d) => (env[k] !== undefined && env[k] !== '' ? Number(env[k]) : d);
export const AGE = {
  // off      : only the 18+ tick box (today). A recorded "fail" still blocks buying.
  // payments : a recorded pass is needed to buy ₦ (a tick box is not enough to take money).
  // play     : a recorded pass is needed to play at all.
  mode: env.NA_AGE_CHECK || 'off',
  provider: env.NA_AGE_PROVIDER || 'mock',
  minAge: 18,
  sessionTtlMs: 30 * 60 * 1000,            // a started check must be finished within 30 minutes (ESTIMATE)
  maxStartsPerDay: num('NA_AGE_MAX_STARTS_DAY', 5),   // ESTIMATE: stops guessing/farming a vendor
  failCooldownMs: 24 * 3600 * 1000,        // after a confirmed under-18 result, wait before another try (ESTIMATE; a policy decision for Sherif and a lawyer)
  maxFailsPer30d: 3,                       // then only an admin can reopen it
  keepFinishedSessionsMs: 30 * 86400000,   // session rows hold no personal data (id, outcome, times) and are deleted after 30 days
  webhookPerMinPerIp: 120
};
