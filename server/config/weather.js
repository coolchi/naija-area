// Weather, rain, flooding and the day/night phases. ALL NUMBERS ARE ESTIMATES / PLACEHOLDERS: the odds are loosely shaped like Lagos seasons (rains April to October, dry hazy
// harmattan season December to February) but they are NOT climate data. Flood-prone streets are INVENTED rectangles over real-feeling street names in this game's own maps.
export const WEATHER = {
  _note: 'ESTIMATE: nothing here is tuned or taken from weather records.',
  enabled: true,
  live: true,                         // when nothing is forced, follow the live Lagos observation (Open-Meteo). Admin "automatic" uses this.
  latitude: 6.5244,                   // Lagos
  longitude: 3.3792,
  liveMinutes: 10,                    // how long a live reading is trusted
  forced: null,                       // null, or 'clear' | 'cloudy' | 'rain' | 'storm' to pin the weather (tests, demos, the admin route)
  seed: 'naija-area-weather-1',
  blockMinutes: 12,                   // real minutes per weather block (= 3 game hours); one front lasts frontBlocks blocks
  frontBlocks: 2,
  // odds per real calendar month (Jan = 0): [clear, cloudy, rain, storm], weights
  monthOdds: [[62, 28, 8, 2], [60, 28, 9, 3], [48, 30, 16, 6], [40, 30, 22, 8], [28, 30, 30, 12], [18, 24, 40, 18], [20, 28, 38, 14], [26, 32, 30, 12], [24, 30, 32, 14], [30, 30, 28, 12], [48, 30, 16, 6], [60, 28, 9, 3]],
  // flooding: a storm floods the zones at once (level 2); steady rain (two rainy blocks running) floods them (level 1); water drains for one block after the rain
  speed: { 0: { walk: 1, drive: 1 }, 1: { walk: 0.85, drive: 0.6 }, 2: { walk: 0.7, drive: 0.4 } }, // client speed scale inside a flooded zone, by flood level
  fareSurge: { rain: 1.15, storm: 1.3 },   // Oya Ride and travel fares in the wet (ESTIMATE)
  phases: { dawn: [5, 7], day: [7, 18], dusk: [18, 20] }, // game hours; everything else is night
  zones: {
    'lagos-mainland': [
      { id: 'mn-lagoon', name: 'Lagoon Drive low end', x1: -240, z1: 112, x2: -128, z2: 128 },
      { id: 'mn-underpass', name: 'Danfo Drive underpass', x1: -52, z1: -128, x2: 52, z2: -112 },
      { id: 'mn-okada', name: 'Okada Road dip', x1: -128, z1: 40, x2: -112, z2: 112 }
    ],
    'lagos-island': [
      { id: 'is-marina', name: 'Marina front', x1: -120, z1: 141, x2: 120, z2: 159 },
      { id: 'is-customs', name: 'Customs Road east', x1: 100, z1: 72, x2: 240, z2: 88 }
    ],
    'lagos-lekki': [
      { id: 'lk-beach', name: 'Beach Road', x1: -100, z1: 82, x2: 120, z2: 98 },
      { id: 'lk-link', name: 'Link Road west', x1: -240, z1: -8, x2: -120, z2: 8 },
      { id: 'lk-admiralty', name: 'Admiralty Way low end', x1: -168, z1: 100, x2: -152, z2: 170 }
    ],
    'lagos-vi-ikoyi': [
      { id: 'vi-barbeach', name: 'Bar Beach Road', x1: -150, z1: 142, x2: 100, z2: 158 },
      { id: 'vi-odeku', name: 'Adeola Odeku low stretch', x1: 0, z1: 72, x2: 120, z2: 88 }
    ]
  }
};
