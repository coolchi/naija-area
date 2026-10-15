// Nigeria Police Force station (ESTIMATE placeholders). Game money only — no real fines or records.
export const POLICE = {
  venueId: 'venue_police',
  reportFee: 500,                 // small filing fee
  reportsPerHour: 6,
  evidenceMs: 2 * 3600000,        // a fight / stolen purse in the last 2h is enough to hold them
  holdMs: 30 * 60000,             // auto-release after 30 real minutes if nobody bails
  bailBase: 5000,                 // base bail
  bailTheftMult: 2,               // theft holds cost more
  bailAssaultMult: 1.5,
  bailCap: 200000,
  stationRadius: 22,              // snap-back if a held player wanders off
  reasons: ['assault', 'theft', 'harassment', 'other'],
  _note: 'ESTIMATE. Report a case at the station; recent fights or purse theft get the accused held until bail or time runs out.'
};
