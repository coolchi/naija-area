// Recorded-SHAPE sample for the mock live-scores provider (10 Oct 2026). It has the same JSON shape as API-Football's /fixtures response
// (fixture.status.short / elapsed, league, teams, goals). Team and league names are INVENTED sample names, not real clubs or competitions.
// Kick-off times are given as minutes from "now" so the sample always shows one live match, one finished and two coming up.
// The mock provider turns this into a response with absolute timestamps (see mockResponse in core/scores.js).
export const SAMPLE_FIXTURES = [
  { id: 910001, startMin: -38, status: 'live', league: 'Sample Premier League', country: 'Nigeria', home: 'Eko Lions', away: 'Ikeja Eagles', goals: [1, 0] },
  { id: 910002, startMin: -150, status: 'done', league: 'Sample Premier League', country: 'Nigeria', home: 'Surulere Stars', away: 'Badagry Bulls', goals: [2, 2] },
  { id: 910003, startMin: 55, status: 'next', league: 'Sample Premier League', country: 'Nigeria', home: 'Lekki Waves', away: 'Ajegunle Aces', goals: [null, null] },
  { id: 910004, startMin: 190, status: 'next', league: 'Sample Cup', country: 'Nigeria', home: 'Ikorodu United', away: 'Apapa Rovers', goals: [null, null] },
];
