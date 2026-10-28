// Inactivity tax (Sherif, 28 Oct 2026). Game money only: never real money, never MoniPay payments.
// A player away (no login, no heartbeat) for more than `graceMs` pays `rate` of net worth once for EACH full 24 h away.
export const INACTIVITY_TAX = {
  enabled: true,
  rate: 0.01,                 // 1% of net worth per full day away (Sherif)
  minNetWorth: 1_000_000,     // net worth under ₦1M is exempt (Sherif)
  graceMs: 24 * 3600000,      // the first 24 h away are free; each further full 24 h is one charge
  maxDaysPerCatchUp: 60,      // ESTIMATE: a player away longer is charged for at most 60 days in one catch-up
  netWorth: 'cash+bank',      // net worth = cash + bank (savings) balance. Property and cars are NOT counted (ESTIMATE choice, see report)
  guests: false               // guests are exempt (guest login is off; they start with ₦3,000)
};
