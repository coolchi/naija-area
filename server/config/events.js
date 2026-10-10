// In-game events: night-only events (item 4) and calendar festivals (item 6) share this config. GAME MONEY ONLY. Every number is an ESTIMATE / placeholder.
// window.type 'night': game hours [from, to) (wraps past midnight), optionally only on every Nth game day. window.type 'dates': real calendar dates (month/day, UTC+1, ESTIMATE).
export const EVENTS = {
  _note: 'ESTIMATE: nothing here is tuned.',
  enabled: true,
  forced: [],                    // ids of events to switch on regardless of the clock (tests, admin)
  claimDailyCap: 3000,           // most game money events can hand out to one player per UTC day (a faucet cap, inside the economy)
  events: [
    { id: 'night_market', kind: 'night', name: 'Night Market', icon: '🌙', blurb: 'After dark the roadside stalls come out: suya, zobo, roasted corn. Limited stock each night.',
      window: { type: 'night', from: 21, to: 4 },
      shop: [
        { id: 'nm_suya', name: 'Night suya', price: 900, hunger: 35, mood: 5, stockPerNight: 150, limitPerPlayer: 3 },
        { id: 'nm_zobo', name: 'Cold zobo', price: 400, hunger: 8, mood: 4, stockPerNight: 200, limitPerPlayer: 3 },
        { id: 'nm_corn', name: 'Roasted corn and pear', price: 600, hunger: 25, mood: 3, stockPerNight: 120, limitPerPlayer: 2 }
      ] },
    { id: 'street_owambe', kind: 'night', name: 'Street Owambe', icon: '🎉', blurb: 'Every third night somebody throws a party on the street. Come and dance: a little cash and a mood lift, once a night.',
      window: { type: 'night', from: 22, to: 3, everyNthDay: 3, dayOffset: 1 },
      claim: { label: 'Join the dance', mood: 10, cash: 500 } },
    // ---- FESTIVALS (item 6). Calendar windows: type 'dates' = the same dates every year [fromMonth, fromDay, toMonth, toDay] (UTC+1; may wrap the new year);
    // type 'spans' = explicit dates per year for festivals that move ([from, to] as YYYY-MM-DD, inclusive). `stockPerRun` is the stock of a limited item for the whole festival run (all players together).
    // `perDay: true` on a claim = once per player per day while it runs. Limited items are wearables with `shop: 'event'` (server/config/wearables.js): they are bought only here, only while it runs, and kept for good.
    { id: 'detty_december', kind: 'festival', name: 'Detty December', icon: '🎆', blurb: 'The city goes out. Parties, small chops and a limited Detty hat and wristband you can only buy until the 5th of January.',
      window: { type: 'dates', range: [12, 10, 1, 5] },
      shop: [
        { id: 'dd_smallchops', name: 'Small chops platter', price: 1500, hunger: 30, mood: 6, stockPerRun: 4000, limitPerPlayer: 5 },
        { id: 'dd_chapman', name: 'Chilled chapman', price: 700, hunger: 5, mood: 5, stockPerRun: 4000, limitPerPlayer: 5 },
        { id: 'dd_hat', name: 'Detty December hat (limited)', price: 120000, mood: 8, stockPerRun: 500, limitPerPlayer: 1, wear: 'fest_detty_hat', limited: true },
        { id: 'dd_band', name: 'Detty wristband (limited)', price: 80000, mood: 6, stockPerRun: 500, limitPerPlayer: 1, wear: 'fest_detty_band', limited: true }
      ],
      claim: { label: 'Hit the Detty party', mood: 10, cash: 600, perDay: true } },
    { id: 'christmas', kind: 'festival', name: 'Christmas', icon: '🎄', blurb: 'Jollof, chicken and a gift a day, from the 20th to the 27th of December. A limited Christmas cap.',
      window: { type: 'dates', range: [12, 20, 12, 27] },
      shop: [
        { id: 'xm_jollof', name: 'Christmas jollof and chicken', price: 2000, hunger: 55, mood: 8, stockPerRun: 6000, limitPerPlayer: 4 },
        { id: 'xm_cap', name: 'Christmas cap (limited)', price: 100000, mood: 8, stockPerRun: 500, limitPerPlayer: 1, wear: 'fest_xmas_cap', limited: true }
      ],
      claim: { label: 'Open your Christmas gift', mood: 8, cash: 700, perDay: true } },
    // Eid dates are ESTIMATES from the tabulated Islamic calendar: the real day depends on the moon being sighted and can differ by a day. Edit the dates here, or switch it on with `forced`.
    { id: 'eid_al_fitr', kind: 'festival', name: 'Eid al-Fitr (Sallah)', icon: '🌙', blurb: 'Sallah days: rice and stew, a Sallah gift each day and a limited white agbada cap.',
      window: { type: 'spans', spans: [['2027-03-09', '2027-03-11'], ['2028-02-26', '2028-02-28'], ['2029-02-14', '2029-02-16'], ['2030-02-04', '2030-02-06']] },
      shop: [
        { id: 'ef_rice', name: 'Sallah rice and stew', price: 1800, hunger: 50, mood: 8, stockPerRun: 6000, limitPerPlayer: 4 },
        { id: 'ef_cap', name: 'Sallah agbada cap (limited)', price: 100000, mood: 8, stockPerRun: 500, limitPerPlayer: 1, wear: 'fest_eid_cap', limited: true }
      ],
      claim: { label: 'Collect your Sallah gift', mood: 8, cash: 700, perDay: true } },
    { id: 'eid_al_adha', kind: 'festival', name: 'Eid al-Adha (Ileya)', icon: '🐑', blurb: 'Ileya: ram stew and a daily gift for three days, with a limited Ileya cap.',
      window: { type: 'spans', spans: [['2027-05-16', '2027-05-18'], ['2028-05-05', '2028-05-07'], ['2029-04-24', '2029-04-26'], ['2030-04-13', '2030-04-15']] },
      shop: [
        { id: 'ea_ram', name: 'Ram stew and pounded yam', price: 2200, hunger: 55, mood: 8, stockPerRun: 6000, limitPerPlayer: 4 },
        { id: 'ea_cap', name: 'Ileya cap (limited)', price: 100000, mood: 8, stockPerRun: 500, limitPerPlayer: 1, wear: 'fest_adha_cap', limited: true }
      ],
      claim: { label: 'Collect your Ileya gift', mood: 8, cash: 700, perDay: true } }
  ]
};
