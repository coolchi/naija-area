// Player-to-player marketplace (cars and wearables). GAME MONEY ONLY. Every number is an ESTIMATE / placeholder.
export const MARKET = {
  _note: 'ESTIMATE: nothing here is tuned. Fees, bands and limits are guesses to be changed after play-testing.',
  minAccountAgeMs: 60 * 60000,       // to LIST: account at least this old (a brand-new account cannot scam)
  minBuyerAgeMs: 30 * 60000,         // to BUY
  guestsMay: false,                  // guests cannot list or buy
  maxActiveListings: 5,
  listingTtlMs: 48 * 3600000,        // an unsold listing expires after this (the asset stays in escrow until the seller claims it back)
  relistCooldownMs: 5 * 60000,       // cancel then relist the same asset: wait this long (stops bait-and-switch cycling)
  listingFeeFraction: 0.01, listingFeeMin: 20, // paid when you list, never refunded (stops spam listings)
  saleFeeFraction: 0.05, saleFeeMin: 25,       // taken from the seller's proceeds on a sale; both fees go to the sink
  bands: { car: { min: 0.5, max: 1.5 }, wearable: { min: 0.3, max: 2 } }, // allowed ask as a multiple of the base value (car: current resale value; wearable: catalogue price)
  warnOverFraction: 1.3,             // the page shows a warning on asks above this multiple of value
  maxAsk: 100000000,
  dailySellCap: 15000000,             // most a seller can sell (sum of asks) per UTC day
  maxTradesPerPairPerDay: 2,         // the same buyer and seller at most this many sales a day (wash-trading brake)
  pageSize: 30,
  untradeable: { wearableCrowns: true } // unique crown items cannot be traded (their whole point is who owns them)
};
