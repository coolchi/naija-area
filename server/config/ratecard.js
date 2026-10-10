// RATE CARD: ALL ESTIMATES from 06_ad_revenue_model.md §3.2 (launch rates at modest audience). Not real quotes.
// Prices are per board (or per plot) per 7 days, in naira. Locked at booking.
export const RATE_CARD = {
  _note: 'ESTIMATE rates, TEST MODE. See 06_ad_revenue_model.md. No real payments are taken.',
  surfaces: {
    road_billboard: {
      label: 'Road billboard', size: '1024x512 (2:1)', aspect: 2, maxBoardsPerOrder: 3, positionsPerBoard: 4,
      tiers: {
        street: { label: 'Street board', weekly: 30000 },  // ESTIMATE range 25-40k
        major:  { label: 'Major road board', weekly: 80000 },  // ESTIMATE range 60-100k
        mega:   { label: 'Mega board', weekly: 200000 }     // ESTIMATE range 150-250k
      }
    },
    airport_board: {
      label: 'Airport board', size: '1024x512 (2:1)', aspect: 2, maxBoardsPerOrder: 2, positionsPerBoard: 4,
      tiers: { standard: { label: 'Airport board', weekly: 160000 } } // ESTIMATE: 2x the major road tier
    },
    carpark_board: {
      label: 'Car park board', size: '1024x512 (2:1)', aspect: 2, maxBoardsPerOrder: 3, positionsPerBoard: 4,
      tiers: { lot: { label: 'Car park board', weekly: 20000 } } // ESTIMATE: below a street board, drivers see it while parking
    },
    lagoon_plot: {
      label: 'Lagoon plot (placeholder)', size: '768x768 (square)', aspect: 1, maxBoardsPerOrder: 3, positionsPerBoard: 4,
      tiers: { plot6x6: { label: 'Lagoon plot 6x6 cells (36 cells x N300)', weekly: 36 * 300 } } // ESTIMATE N300/cell
    }
  },
  durationsDays: [1, 3, 7, 14, 30],
  vatRate: 0.075, // 7.5% Nigerian VAT; shown on the fake invoice as an ESTIMATE of how it will look
  minImageBytes: 500, maxImageBytes: 1_000_000, maxImagePx: 4096, minImagePx: 128
};
export function priceFor(surface, tier, units, days) {
  const s = RATE_CARD.surfaces[surface]; if (!s) return null;
  const t = s.tiers[tier]; if (!t) return null;
  if (!Number.isInteger(units) || units < 1 || units > s.maxBoardsPerOrder) return null;
  if (!RATE_CARD.durationsDays.includes(days)) return null;
  const net = Math.round(t.weekly * units * days / 7);
  const vat = Math.round(net * RATE_CARD.vatRate);
  return { weekly: t.weekly, net, vat, total: net + vat };
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
