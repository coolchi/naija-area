// Performance budgets (PLACEHOLDER ESTIMATES, chosen for mid-range phones; adjust after real-device measurements).
// Used by tests/props.test.js and the headless smokes. Measured numbers are printed by the smokes; these are the limits they assert.
export const PERF = {
  interior: { drawCalls: 160, triangles: 40000, propTriangles: 3500, propCatalogueTriangles: 60000 }, // per open room (house, venue, garage)
  walkers: { max: 36, drawCalls: 7 },
};
