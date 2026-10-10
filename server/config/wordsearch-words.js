// Word search ("Find Am") word pool: ORIGINAL generic Lagos words (food, transport, places, culture), 4 to 9 letters, A to Z only. PLACEHOLDER CONTENT: a Lagos local editor should review
// the list (spelling, whether each word is well known, anything that could offend). Real area names are used only as plain place names. Each day the game picks 8 of these.
export const THEME = {
  food: ['JOLLOF', 'AKARA', 'MOIMOI', 'AMALA', 'EGUSI', 'SUYA', 'PUFFPUFF', 'CHINCHIN', 'PLANTAIN', 'GARI', 'EBA', 'OGI', 'ZOBO', 'BUKKA', 'PEPPERSOUP', 'ASUN', 'DODO', 'AGEGE', 'BOLE'],
  road: ['DANFO', 'OKADA', 'KEKE', 'MOLUE', 'BRIDGE', 'TRAFFIC', 'GOSLOW', 'CONDUCTOR', 'JUNCTION', 'FERRY', 'MARINA', 'BUSSTOP', 'LAGOON', 'HIGHWAY', 'ROUNDABOUT'],
  place: ['YABA', 'MUSHIN', 'IKOYI', 'LEKKI', 'SURULERE', 'IKEJA', 'OSHODI', 'APAPA', 'BADAGRY', 'AJEGUNLE', 'IKORODU', 'EPE', 'OJUELEGBA', 'MARYLAND', 'OBALENDE', 'ERIKO', 'EKO', 'LAGOS'],
  culture: ['OWAMBE', 'GELE', 'AGBADA', 'ANKARA', 'ASOEBI', 'BUBA', 'FILA', 'NAIRA', 'NAIJA', 'PIDGIN', 'YORUBA', 'IGBO', 'HAUSA', 'DRUMS', 'CARNIVAL', 'MARKET', 'BALOGUN', 'COMPOUND', 'MOTHER', 'GOSSIP']
};
export const POOL = [...new Set(Object.values(THEME).flat())].filter(w => /^[A-Z]{3,10}$/.test(w));
