// BATTLE PASS CONFIG (Track G item 9, 10 Oct 2026). GAME MONEY ONLY. ALL NUMBERS ARE ESTIMATES.
// A season is a calendar window (UTC+1 dates). You earn pass XP by playing (every XP source below has a per-day limit and there is a daily total cap); each tier needs `tierXp` XP.
// Every tier has a FREE reward; players who buy the premium track (game money) also get the PREMIUM reward for every tier they have reached, including past ones.
// The pass never sells XP or tiers for money, and nothing here is bought with real money. Real-money premium is NOT built: it waits for a lawyer and for Monipay live keys (docs/PASS_SKINS.md).
export const PASS = {
  enabled: true,
  tierXp: 120,                       // XP for each tier (flat)
  tiers: 30,
  dailyXpCap: 250,                   // most pass XP a player can earn in one day (UTC+1), whatever they do
  loginXp: 40,                       // the daily "check in" button (once a day; counts towards the daily cap)
  claimGraceDays: 7,                 // after a season ends you can still claim what you reached for this many days
  premiumPrice: 25000,               // game money (ESTIMATE), paid once per season to the cosmetics sink
  realMoney: { enabled: false, note: 'Real-money premium is NOT switched on. It waits for a lawyer\'s view (virtual items, minors) and the Monipay live keys.' },
  seasonCashCap: 20000,              // the most game cash one player can take out of a season's rewards (a sanity cap above the sum of the rewards below)
  seasons: [
    { id: 's1', name: 'Detty Season', from: '2026-10-01', to: '2026-12-31' },
    { id: 's2', name: 'Harmattan Season', from: '2027-01-08', to: '2027-04-07' } // starts after s1's claim grace has run out, so a season is never claimed over another
  ],
  // XP per source. `reason` is the ledger reason that earns it (a real thing happened and was paid); `perDay` is how many times a day it counts.
  sources: {
    job_wage:         { label: 'Finish a delivery shift', xp: 30, perDay: 5 },
    casual_reward:    { label: 'Win a break game',        xp: 15, perDay: 6 },
    transport:        { label: 'Take a ride or a trip',   xp: 10, perDay: 6 },
    game_win:         { label: 'Win a staked table game', xp: 20, perDay: 4 },
    sports_prize:     { label: 'Win at the sports hall',  xp: 15, perDay: 4 },
    business_collect: { label: 'Collect business income', xp: 20, perDay: 3 },
    event_claim:      { label: 'Join an event',           xp: 25, perDay: 2 },
    skin_buy:         { label: 'Dress up',                xp: 10, perDay: 1 }
  },
  // rewards: the default free reward is cash; the table overrides tiers. cash amounts are game money paid from the pass faucet.
  free:    { cash: (t) => 100 + 10 * t, skins: { 5: 'av_pass_sunrise', 15: 'car_pass_sunset', 25: 'home_pass_night' } },
  premium: { cash: (t) => 150 + 15 * t, skins: { 8: 'av_pass_midnight', 12: 'car_pass_emerald', 18: 'home_pass_royal', 24: 'av_pass_royal' } }
};
/** the full reward table for a track, tier 1..tiers: [{ tier, cash, skin }] (skin replaces the cash on that tier) */
export function rewardsOf(track, cfg = PASS) { const T = cfg[track]; const out = []; for (let t = 1; t <= cfg.tiers; t++) { const skin = T.skins[t] || null; out.push({ tier: t, track, cash: skin ? 0 : T.cash(t), skin }); } return out; }
