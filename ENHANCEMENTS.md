# Pushkaralu GIS: what was added

Your map, layers, colours and original code are untouched.
`index.html` got exactly 3 small additions (a stylesheet link, a script tag,
and a block that hands the map + data to the new file).

New files: `enhancements.css`, `enhancements.js`

## New features
1. **Google Maps hint**: a pill on the map ("Tap any facility icon, then Open in Google Maps...")
   and a tip line inside the navigation dialog. The Google Maps button now has a pin icon.
2. **Search**: facilities, parking lots, ghats (works in English, Telugu, Hindi).
3. **Layers & legend**: switch Ghats / Facilities / Parking / Approach roads / Walking routes on or off,
   with colour swatches that match the map. Facility-type filter chips.
4. **Nearest facility**: Medical, Drinking water, Toilets, Changing rooms, Help/Info, Parking.
   Uses GPS (falls back to map centre), skips inactive ones, shows distance + walking minutes.
5. **Emergency (SOS)**: one-tap call 112 / 108 / 100 / 101 / 1098, jump to Lost & found, nearest medical aid.
6. **Languages**: English / తెలుగు / हिन्दी for all new text and facility names.
7. **Parking**: parking icon now shown (the PNG existed but was never used); tap a lot for capacity, vehicle type, open/closed.
8. **Status**: Active / Not active badge on every facility, red warning before navigating to an inactive one.
   Inactive facility icons are slightly faded.
9. **Share location** (WhatsApp / phone share sheet) and **Report a problem** (pre-filled WhatsApp message).
10. **Offline banner** and a **text size (A+)** button.

## Settings you can edit (top of enhancements.js, CONFIG)
- `controlRoomPhone`: shows a "Control room" call button in SOS
- `reportWhatsApp`: number that receives problem reports

## Run it
Same as before: it must be served over http (not double-clicked), e.g. `python3 -m http.server`
then open http://localhost:8000
