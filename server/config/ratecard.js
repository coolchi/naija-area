// RATE CARD: ALL ESTIMATES from 06_ad_revenue_model.md §3.2 (launch rates at modest audience). Not real quotes.
// Prices are per board (or per plot) per 7 days, in naira. Locked at booking.
// PLACEMENT (21_ad_exclusive_vs_shared_plan.md; Sherif approved 11 Oct 2026, ALL NUMBERS ARE ESTIMATES, configurable):
//  shared    : ONE rotation position on a board (1 of positionsPerBoard), today's weekly rate; up to maxCreativesShared designs rotate inside that position
//  exclusive : ALL positionsPerBoard positions of a board, the advertiser alone on it; price = shared weekly x exclusiveMultiplier; up to maxCreativesExclusive designs rotate
export const PLACEMENTS = ['shared', 'exclusive'];
export const DEFAULT_PLACEMENT = 'shared';
const EXCLUSIVE_MULTIPLIER = 3; // ESTIMATE: a visible premium over 1 shared slot but cheaper than buying all 4 shared slots (4x). Set per surface below.
export const RATE_CARD = {
  maxCreativesShared: 2,      // ESTIMATE: designs per shared campaign (a surface may override with its own maxCreativesShared)
  maxCreativesExclusive: 4,   // ESTIMATE: designs per exclusive campaign (a surface may override with its own maxCreativesExclusive)
  _note: 'ESTIMATE rates, TEST MODE. See 06_ad_revenue_model.md. No real payments are taken.',
  surfaces: {
    road_billboard: {
      label: 'Road billboard', size: '1024x512 (2:1)', aspect: 2, maxBoardsPerOrder: 3, positionsPerBoard: 4, exclusiveMultiplier: EXCLUSIVE_MULTIPLIER,
      tiers: {
        street: { label: 'Street board', weekly: 30000 },  // ESTIMATE range 25-40k
        major:  { label: 'Major road board', weekly: 80000 },  // ESTIMATE range 60-100k
        mega:   { label: 'Mega board', weekly: 200000 }     // ESTIMATE range 150-250k
      }
    },
    airport_board: {
      label: 'Airport board', size: '1024x512 (2:1)', aspect: 2, maxBoardsPerOrder: 2, positionsPerBoard: 4, exclusiveMultiplier: EXCLUSIVE_MULTIPLIER,
      tiers: { standard: { label: 'Airport board', weekly: 160000 } } // ESTIMATE: 2x the major road tier
    },
    carpark_board: {
      label: 'Car park board', size: '1024x512 (2:1)', aspect: 2, maxBoardsPerOrder: 3, positionsPerBoard: 4, exclusiveMultiplier: EXCLUSIVE_MULTIPLIER,
      tiers: { lot: { label: 'Car park board', weekly: 20000 } } // ESTIMATE: below a street board, drivers see it while parking
    },
    lagoon_plot: {
      label: 'Lagoon plot (placeholder)', size: '768x768 (square)', aspect: 1, maxBoardsPerOrder: 3, positionsPerBoard: 4, exclusiveMultiplier: EXCLUSIVE_MULTIPLIER,
      tiers: { plot6x6: { label: 'Lagoon plot 6x6 cells (36 cells x N300)', weekly: 36 * 300 } } // ESTIMATE N300/cell
    }
  },
  durationsDays: [1, 3, 7, 14, 30],
  vatRate: 0.075, // 7.5% Nigerian VAT; shown on the fake invoice as an ESTIMATE of how it will look
  minImageBytes: 500, maxImageBytes: 1_000_000, maxImagePx: 4096, minImagePx: 128
};
export const isPlacement = (p) => PLACEMENTS.includes(p);
/** the weekly rate for one board in this placement (shared = the rate card; exclusive = shared x the surface's exclusiveMultiplier) */
export function weeklyFor(surface, tier, placement = DEFAULT_PLACEMENT) {
  const s = RATE_CARD.surfaces[surface]; const t = s?.tiers[tier]; if (!t || !isPlacement(placement)) return null;
  return placement === 'exclusive' ? Math.round(t.weekly * (s.exclusiveMultiplier ?? EXCLUSIVE_MULTIPLIER)) : t.weekly;
}
/** how many designs (creatives) a campaign may rotate in this placement */
export function maxCreatives(surface, placement = DEFAULT_PLACEMENT) {
  const s = RATE_CARD.surfaces[surface] || {}; return placement === 'exclusive' ? (s.maxCreativesExclusive ?? RATE_CARD.maxCreativesExclusive) : (s.maxCreativesShared ?? RATE_CARD.maxCreativesShared);
}
/** plain-language label for quotes, invoices and dashboards */
export function placementLabel(surface, placement = DEFAULT_PLACEMENT) {
  const per = RATE_CARD.surfaces[surface]?.positionsPerBoard || 4; return placement === 'exclusive' ? 'Exclusive (whole board)' : `Shared (1 of ${per} positions)`;
}
export function priceFor(surface, tier, units, days, placement = DEFAULT_PLACEMENT) {
  const s = RATE_CARD.surfaces[surface]; if (!s) return null;
  const t = s.tiers[tier]; if (!t) return null;
  if (!isPlacement(placement)) return null;
  if (!Number.isInteger(units) || units < 1 || units > s.maxBoardsPerOrder) return null;
  if (!RATE_CARD.durationsDays.includes(days)) return null;
  const weekly = weeklyFor(surface, tier, placement);
  const net = Math.round(weekly * units * days / 7);
  const vat = Math.round(net * RATE_CARD.vatRate);
  return { weekly, sharedWeekly: t.weekly, placement, net, vat, total: net + vat };
}
export const AD_POLICY = {
  rotationMs: 10000,           // rotate among ads on a board every 10 s (as LL does; CONFIRMED in research)
  viewableMinPct: 50,          // MRC-style: >=50% of pixels ...
  viewableMinMs: 1000,         // ... for >=1 continuous second (display standard; video differs)
  maxSurfaceDistance: 90,      // metres between player (server-known) and board
  maxEvidenceAgeMs: 120000,
  dedupeWindowMs: 10000,
  maxClaimsPerMinutePerUser: 24,
  tapDedupeMs: 3600 * 1000,
  tapTokenTtlMs: 10 * 60 * 1000,
  // categories needing human review / extra paperwork (not auto-approved)
  restrictedKeywords: ['bet', 'betting', 'casino', 'lottery', 'alcohol', 'beer', 'vodka', 'whisky', 'tobacco', 'cigarette', 'election', 'vote', 'party politics', 'loan', 'forex', 'crypto', 'investment returns'],
  prohibitedKeywords: ['guaranteed returns', 'double your money', 'sex', 'porn', 'escort', 'weapon', 'gun sale', 'hate'],
};

// ---- AD FORMATS BEYOND BILLBOARDS (Track G item 8, 10 Oct 2026). Same advertiser portal, same moderation pipeline, same server-side counting. ALL NUMBERS ARE ESTIMATES, TEST MODE.
//  shop_front : a sponsor sign on the front of a shop or venue (a real board on the building, derived from the city's shops and venues). Counted like a billboard (player evidence, validated).
//  radio_spot : a sponsored spot on the four in-game (synthesised) radio stations: a card with the brand, headline and image, and a chime, every `everyMs` while a driver is tuned in. NEVER on the real
//               stations (their streams are played as they are, see docs/RADIO.md). The client reports how long the card was up; the server checks the spot window, that the player is in a car, and the length.
//  ride_car   : the Oya Ride driver's car wears the sponsor's livery (side panels and the pick-up card). Counted by the SERVER alone: one valid impression per ride that the passenger boards.
export const AD_FORMATS = {
  _note: 'ESTIMATES. Prices are placeholders; nothing is charged in test mode.',
  shopFront: { maxPerCity: 8, w: 4.4, h: 2.2, y: 4.6, standOff: 0.35, nameSignHalf: 8 },
  radio: { everyMs: 180000, minListenMs: 5000, stations: ['eko', 'highlife', 'gospel', 'night'] }, // a spot every 3 minutes; the card shows for one rotation window (AD_POLICY.rotationMs)
  rideCar: { dedupePerRide: true }
};
RATE_CARD.surfaces.shop_front = { label: 'Shop front sign', size: '1024x512 (2:1)', aspect: 2, maxBoardsPerOrder: 3, positionsPerBoard: 4, exclusiveMultiplier: EXCLUSIVE_MULTIPLIER, tiers: { shop: { label: 'Shop or venue front', weekly: 25000 } } }; // ESTIMATE: below a street board
RATE_CARD.surfaces.radio_spot = { label: 'Radio spot (in-game stations)', size: '768x768 (square)', aspect: 1, maxBoardsPerOrder: 2, positionsPerBoard: 4, exclusiveMultiplier: EXCLUSIVE_MULTIPLIER, tiers: { station: { label: 'In-game station, a spot every 3 minutes', weekly: 40000 } } }; // ESTIMATE
RATE_CARD.surfaces.ride_car = { label: 'Oya Ride car livery', size: '1024x512 (2:1)', aspect: 2, maxBoardsPerOrder: 1, positionsPerBoard: 4, exclusiveMultiplier: EXCLUSIVE_MULTIPLIER, tiers: { fleet: { label: 'Every Oya Ride car in the city', weekly: 60000 } } }; // ESTIMATE
