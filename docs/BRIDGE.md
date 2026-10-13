# Lekki-Ikoyi Link Bridge (game model)

Built 10 Oct 2026 from written specifications. Web photos were used as **reference only** (looked at to read the silhouette; nothing was copied, traced or saved into the repo).

## Real structure (sources)
| Fact | Value | Source |
|---|---|---|
| Type | cable-stayed, single pylon, semi-fan, precast segmental concrete deck | Structurae; Julius Berger |
| Total length | 1,357 m (about 1.36 km); main bridge 635 m; approach viaducts 700 to 722 m | Structurae; Julius Berger; PR Newswire |
| Main spans | 55, 75, 75, 112.5, **pylon**, 112.5, 75, 75, 55 m | Structurae |
| Pylon | one, reinforced concrete, about 90 to 91 m high; legs taper straight | Structurae; Julius Berger (German article) |
| Stay cables | 28 (4 groups of 7), 55 to 119 m long | Structurae |
| Deck | 21.4 m wide; two 8 m carriageways (2 lanes each way); 2 m walkways each side; Ikoyi approach widened to 2 x 3 lanes | Structurae; PR Newswire |
| Clearance | 9 m headroom above water, 25 m wide navigation openings each side of the pylon | Wikipedia; Julius Berger |
| Opened | 29 May 2013 (finished Nov 2012 after 42 months) | Wikipedia; Julius Berger |

Links: https://structurae.net/en/structures/lekki-ikoyi-link-bridge , https://www.julius-berger-int.com/en/references/lekki-ikoyi-link-bridge-in-lagos-nigeria , https://en.wikipedia.org/wiki/Lekki-Ikoyi_Link_Bridge , https://www.prnewswire.co.uk/news-releases/basf-and-julius-berger-nigeria-add-fine-finish-to-lekki-ikoyi-link-bridge-in-lagos-163314266.html

Reference photos looked at (Wikimedia Commons, CC BY-SA, **not copied**): "Lekki - Ikoyi Link Bridge.jpg" (CC BY-SA 4.0) and "Lekki link bridge.jpg" (CC BY-SA 4.0). From them: the pylon looks like an **X / hourglass**: the two legs start apart near the deck edges, lean in to a narrow waist (with cross-beams), then open again into a V at the top; the cables fan from the legs to the deck on both sides.

## What the game does
- **Scale 0.4 of real, everywhere** (`bridges[0].scale`): deck length 1,357 m becomes 543 m, deck width 21.4 m becomes 8.6 m, spans 112.5 m become 45 m, pylon about 91 m above water becomes about 36.4 m (32.8 m above the deck, with the deck at 3.6 m, which is 9 m x 0.4, above the water).
- One district, `lagos-bridge`, is a corridor: the Ikoyi shore (west), Five Cowrie Creek with the bridge, the Lekki shore (east), a roundabout at each end and a road link gate at each end (to Victoria Island and Ikoyi, and to Lekki). You can walk or drive the whole deck; traffic runs both ways.
- Pylon: X-shaped, built from tapered struts with two cross-beams; 28 stay cables drawn as thin lines (4 x 7), anchored every 5.2 m along the deck; piers under the main-bridge spans; parapets, walkways, lamp posts every 22 m that light at night with the street-light system.
- The creek is real water below the deck (`creeks` in the config): the player is kept on the deck by colliders on both sides, and a unit test checks the gap equals the road width.
- The deck, pylon and cables are one merged mesh plus one line object (about 35 draw calls for the whole district in the smoke run).

## What the mesh shows
- Pylon: two panelled concrete legs on square pile caps in the creek. They stand outside the roadway (so a car can drive through), lean in through four framed openings that span the gap between the legs, then open into wide V horns. Course lines and a centre joint mark the concrete panels. Opening colours, bottom to top: teal, amber, blue, red, plus a vertical strip on each leg. They brighten at night with the street lights. The deck edge is a deep concrete girder, and the approach piers have caps and footings.
- 28 stay cables, black-and-white parapet blocks, a rail, and curved lamp posts on the cable bridge only.
- The district stays a straight corridor. The real deck has a gentle curve; bending it here would break the road and the two travel gates.

## NOT verified / simplified
- Leg spacing, opening sizes and the exact flare of the horns are still a reading of reference photos, not a measured survey. A local artist should compare them on the demo.
- Toll plaza, the lane widening on the Ikoyi side, and the real colour cycle (the openings hold one colour each) are not modelled. Cable lengths are not exactly 55 to 119 m x 0.4.
- Real length is compressed: you cross 543 m in about a minute on foot instead of 1.36 km.
