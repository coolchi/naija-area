// Police patrol missions (Sherif, 28 Oct 2026). ALL numbers are ESTIMATE defaults for Sherif to tune. Game money only.
// Suspects are SHARED per city: whoever arrests (or takes down) one first gets the credit, by server time.
export const PATROL = {
  enabled: true,
  pay: 1_000_000,                 // ₦1,000,000 per completed mission (Sherif's number)
  arrestsNeeded: 3,               // a mission completes when YOU make this many arrests/takedowns (ESTIMATE)
  timeLimitMs: 12 * 60000,        // 12 real minutes per mission (ESTIMATE)
  maxPerDay: 3,                   // completed missions per Lagos day (ESTIMATE) -> at most ₦3M/day
  cooldownMs: 20 * 60000,         // wait after any mission ends before the next (ESTIMATE)
  stationRadius: 30,              // must start within this of the station (or be inside it)
  arrestRange: 6,                 // metres from the server's known position to cuff
  gunRange: 35,                   // metres for a service-weapon shot
  fireIntervalMs: 600,            // fire-rate cap: at most one shot per 0.6 s
  ammoPerMission: 24,             // service rounds per mission
  serviceGun: { id: 'npf_service', name: 'NPF service pistol' }, // issued for the mission only, never owned (owned guns shoot the same)
  // Combat (Sherif's rules, 28 Oct). Damage is in suspect/player health points (player max health = balance.crash.maxHealth, 100).
  policeGunDamage: 30,            // one police-gun hit on a suspect
  hitsToDown: 4,                  // a suspect goes down (falls, out of play) after exactly 4 police-gun hits
  armedShare: 0.35,               // share of suspects who shoot back (never spawned against restricted accounts' view)
  suspectGunDamage: 10,           // = policeGunDamage / 3 (police gun does 3x a suspect's gun)
  suspectRange: 25,               // metres an armed suspect can hit you from
  suspectFireIntervalMs: 1500,    // one shot per 1.5 s per armed suspect
  suspectAccuracy: 0.35,          // chance each shot hits (capped by suspectAccuracyCap)
  suspectAccuracyCap: 0.5,
  suspectsPerCity: 6,             // live shared suspects kept on the map in a city while anyone patrols
  suspectLifeMs: 15 * 60000,      // an uncaught suspect slips away after this
  kinds: [
    { id: 'shop_robbery', label: 'Shop robber', speed: 0,   msg: 'Robbery in progress at {where}. Units respond.' },
    { id: 'bag_snatcher', label: 'Bag snatcher', speed: 4.5, msg: 'Bag snatcher running along {where}.' },
    { id: 'reckless_driver', label: 'Reckless driver', speed: 11, msg: 'Reckless driver speeding on {where}. Stop that car.' },
    { id: 'fleeing_suspect', label: 'Fleeing suspect', speed: 6, msg: 'Suspect fleeing on foot down {where}.' }
  ],
  _note: 'ESTIMATE. Non-graphic: suspects get cuffed, or fall down and surrender when hit (cartoon takedown, no blood). Guns only hit suspects, never players. Armed suspects shoot back; at 0 health you are knocked out and the mission fails. Restricted (under-18 result) accounts and guests: arrest only, no armed suspects shown to them.'
};
