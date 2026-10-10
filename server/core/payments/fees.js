// Pure money maths for the payments module. All amounts here are integer KOBO (1 naira = 100 kobo) unless a name says Ngn.
export const toKobo = (ngn) => Math.round(ngn * 100);
export const toNgn = (kobo) => kobo / 100;

/** Monipay collection fee ESTIMATE: rate x amount, capped. Not from the API docs: from Sherif's own notes on Monipay pricing. */
export function collectionFeeKobo(amountKobo, cfg) { return Math.min(Math.round(amountKobo * cfg.rate), cfg.capKobo); }

/** Price a net amount (kobo): VAT line on top, fee estimate on the total charged (the merchant bears the fee, the player does not see it). */
export function priceKobo(netKobo, { vatRate, fee }) {
  if (!Number.isInteger(netKobo) || netKobo <= 0) throw new Error('payments: net must be a positive integer of kobo');
  const vatKobo = Math.round(netKobo * vatRate); const totalKobo = netKobo + vatKobo;
  const feeEstKobo = collectionFeeKobo(totalKobo, fee);
  return { netKobo, vatKobo, totalKobo, feeEstKobo, merchantNetKobo: totalKobo - feeEstKobo - vatKobo };
}
/** Proportional share of `whole` for a partial refund of `part` out of `total` (floors, so we never over-reverse the credit). */
export const proportion = (whole, part, total) => Math.floor((whole * part) / total);
