// SAFETY AND FAMILY CONTROLS (queue batch 1 item 7). Every number here is an ESTIMATE for Sherif to tune.
// The game is 18+ only (MIN_AGE in config/game.js). These controls are for ADULTS who want limits (their own, or on a shared phone / a household) and they are
// also the automatic "restricted mode" for an account whose age check came back UNDER 18. Nothing here lets a child in: that is the age check's job.
export const GUARDIAN = {
  enabled: true,
  chatModes: ['all', 'friends', 'off'],                  // all: as today. friends: no public chat, no messages to or from non-friends. off: no chat at all, public chat hidden
  playLimitOptions: [30, 60, 90, 120, 180, 240],         // daily play limit, minutes (ESTIMATE list)
  breakOptions: [20, 30, 45, 60],                        // "take a break" reminder every N minutes of one session (ESTIMATE list)
  topupDailyOptionsNgn: [0, 1000, 2000, 5000, 10000],    // own daily limit on REAL money buying ₦ (0 = no buying at all). The shop's own daily limit still applies on top.
  curfewMaxHours: 16,                                    // longest quiet-hours window that can be set (so nobody sets a 24 h block by mistake)
  playTickMaxMs: 60000,                                  // a gap between two heartbeats longer than this counts as this much (idle or closed tab does not count)
  pin: { minLen: 4, maxLen: 6, maxFails: 5, lockMs: 15 * 60000 },   // optional guardian PIN: while set, every change needs it. 5 wrong tries lock it for 15 minutes.
  warnAtMinutesLeft: [10, 1],                            // the client warns when this many minutes of the day are left
  // an account whose age check says UNDER 18 is put in this mode by the server (the player cannot change it). Chat limited to friends, nothing staked, no buying, no transfers, no clubs.
  restricted: { chat: 'friends', maxStake: 0, transfersOff: true, topupDailyNgn: 0, adultVenueKinds: ['club'] },
  // even in plain 18+ mode, a stake at or above this needs a RECORDED age pass (when age checks exist). null = off. ESTIMATE; a policy choice for Sherif and a lawyer.
  stakeNeedsAgePassFrom: null,
  adultVenueKinds: ['club']                              // venue kinds that restricted mode keeps out (clubs serve soft drinks only here, but they are a nightlife setting)
};
