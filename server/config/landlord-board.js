// "Landlord Lagos" (working title) board data: an ORIGINAL 36-square roll-and-buy property game set in Lagos. Not Monopoly: different board order, area groups, names, prices, cards and
// artwork, and no Hasbro names (see docs/WORD_BOARD_GAMES.md). Real LAGOS AREA NAMES are used only as plain group names; every street/building name below is INVENTED. PLACEHOLDER content:
// a Lagos local reviewer should check the names and card text. All prices are play money in naira thousands x 1000 (ESTIMATE numbers, tunable here).
export const K = 1000;
export const START_CASH = 1500 * K, SALARY = 200 * K, LEVY = 100 * K, FINE = 50 * K, MAX_ROUNDS = 20, BUILD_MAX = 5; // 5 buildings = a "tower"
export const RENT_MULT = [1, 5, 15, 45, 80, 125];            // rent = base x this, by number of buildings (0 to 5)
export const STATION_RENT = [30 * K, 60 * K, 120 * K, 240 * K];  // 1 to 4 stations owned by the same player
export const UTILITY_MULT = [5 * K, 12 * K];                  // x dice total, 1 or 2 utilities owned
export const GROUPS = {
  mushin: { name: 'Mushin', color: '#8d6e63', build: 50 * K }, surulere: { name: 'Surulere', color: '#26a69a', build: 50 * K }, yaba: { name: 'Yaba', color: '#ab47bc', build: 100 * K }, ikeja: { name: 'Ikeja', color: '#ef6c00', build: 100 * K },
  lekki: { name: 'Lekki', color: '#d32f2f', build: 150 * K }, vi: { name: 'Victoria Island', color: '#f9a825', build: 150 * K }, ikoyi: { name: 'Ikoyi', color: '#2e7d32', build: 200 * K }, banana: { name: 'Banana Island', color: '#1565c0', build: 200 * K }
};
const P = (name, group, price) => ({ t: 'prop', name, group, price, rent: Math.floor(price * 0.05 / K) * K }); // base rent about 5% of the price
export const SQUARES = [
  { t: 'start', name: 'Pay Day' }, P('Palm Wine Close', 'mushin', 60 * K), P("Tailor's Row", 'mushin', 60 * K), { t: 'luck', name: 'Luck' }, { t: 'station', name: 'Danfo Terminal', price: 200 * K },
  P('Bukka Street', 'surulere', 100 * K), P('Stadium View', 'surulere', 100 * K), { t: 'levy', name: 'Council Levy', amount: LEVY }, P('Aguda Crescent', 'surulere', 120 * K), { t: 'goslow', name: 'Go-Slow' },
  P('Tech Hub Lane', 'yaba', 140 * K), { t: 'utility', name: 'Power Company', price: 150 * K, kind: 'power' }, P('Campus Gate', 'yaba', 140 * K), P('Book Alley', 'yaba', 160 * K), { t: 'station', name: 'Keke Park', price: 200 * K },
  { t: 'luck', name: 'Luck' }, P('Fly-over Court', 'ikeja', 180 * K), P('Hangar Road', 'ikeja', 180 * K), { t: 'rest', name: 'Lagoon Rest' }, P('Bread Van Lane', 'ikeja', 200 * K),
  P('Beach Road Plot', 'lekki', 220 * K), { t: 'luck', name: 'Luck' }, P('Estate Gate', 'lekki', 220 * K), P('Roundabout Villa', 'lekki', 240 * K), { t: 'station', name: 'Ferry Jetty', price: 200 * K },
  P('Skyline Tower', 'vi', 260 * K), P('Lagoon View', 'vi', 260 * K), { t: 'checkpoint', name: 'Police Checkpoint' }, { t: 'utility', name: 'Water Board', price: 150 * K, kind: 'water' },
  P('Harbour Court', 'vi', 280 * K), P('Club House Avenue', 'ikoyi', 300 * K), P('Old Money Close', 'ikoyi', 320 * K), { t: 'station', name: 'Airport', price: 200 * K },
  { t: 'luck', name: 'Luck' }, P('Waterfront Mansion', 'banana', 350 * K), P('Palace Drive', 'banana', 400 * K)
];
export const GOSLOW = SQUARES.findIndex(s => s.t === 'goslow'), START = 0;
export const SET_OF = (g) => SQUARES.map((s, i) => (s.group === g ? i : -1)).filter(i => i >= 0);
// Luck cards (original text). t: cash (+/-), goto (square, collects Pay Day if it passes it), nearest (station), back, goslow, pass (keep: leave Go-Slow free), eachGet / eachPay (n x other players), repairs.
export const CARDS = [
  { t: 'cash', amt: 100 * K, text: 'Your cousin abroad sent money. Collect ₦100,000.' }, { t: 'cash', amt: 20 * K, text: 'The danfo conductor returned your change! Collect ₦20,000.' },
  { t: 'cash', amt: 60 * K, text: 'You danced well at the owambe and people sprayed you. Collect ₦60,000.' }, { t: 'cash', amt: 80 * K, text: 'Your old landlord returned your caution deposit. Collect ₦80,000.' },
  { t: 'cash', amt: -40 * K, text: 'No light for three days. Fuel for the generator: pay ₦40,000.' }, { t: 'cash', amt: -30 * K, text: 'Fined for a faded number plate: pay ₦30,000.' },
  { t: 'cash', amt: -70 * K, text: 'Aso-ebi for the whole family wedding: pay ₦70,000.' }, { t: 'goto', sq: 0, text: 'Late for work! Rush to Pay Day and collect your salary.' },
  { t: 'nearest', text: 'A free danfo ride! Go to the nearest station. If someone owns it, you pay them double the rent.' }, { t: 'goto', sq: 20, text: 'Weekend at the beach! Go to Beach Road Plot. Passing Pay Day pays you.' },
  { t: 'goto', sq: 35, text: 'Invited to a big party! Go to Palace Drive. Passing Pay Day pays you.' }, { t: 'back', n: 3, text: 'Go-slow on the bridge. Go back 3 squares.' },
  { t: 'goslow', text: 'Police checkpoint ahead! Go straight to Go-Slow. No Pay Day.' }, { t: 'pass', text: 'An old friend at the checkpoint waves you through. Keep this card to leave Go-Slow free.' },
  { t: 'eachGet', amt: 15 * K, text: 'It is your birthday! Every other player gives you ₦15,000.' }, { t: 'eachPay', amt: 15 * K, text: 'You promised everybody zobo. Pay each other player ₦15,000.' },
  { t: 'repairs', house: 20 * K, tower: 80 * K, text: 'Rainy season! Roof repairs: pay ₦20,000 for each building and ₦80,000 for each tower you own.' }
];
