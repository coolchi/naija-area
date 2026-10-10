// How a player's avatar looks, derived from their colour so the same player always looks the same everywhere (pure, tested).
const SKINS = [0x8d5524, 0x6b4423, 0xc68642, 0x4a2c17, 0xe0ac69, 0x5c3a21]; // Nigerian faces: deeper tones first
const HAIR = [0x1a1a1a, 0x1a1a1a, 0x2a1c12, 0x111111];
/** the look of a player's avatar from their colour: skin tone, hair style and trousers vary so a crowd of players is not a row of clones. Same hex = same person. */
export const avatarLook = (hex) => { const h = Math.imul(hex, 2654435761) >>> 0; return { skin: SKINS[h % SKINS.length], style: (h >>> 8) % 5, hair: HAIR[(h >>> 12) % HAIR.length], trousers: [0x2c3e66, 0x3a3a40, 0x5a4a3a, 0x1f3b4d][(h >>> 16) % 4] }; };
