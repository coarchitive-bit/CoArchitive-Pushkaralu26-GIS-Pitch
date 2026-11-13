/* ==========================================================
   PUSHKARALU GIS — ENHANCEMENTS
   Adds extra features on top of the existing map without touching
   the base map, its layers or its colours.

   Features
   1. "Open in Google Maps" hint text (pill + inside the dialog)
   2. Search (facilities, parking lots, ghats)
   3. Layers & legend panel with on/off switches + facility-type filter
   4. Nearest facility finder (uses GPS, falls back to map centre)
   5. Emergency panel (one-tap calls, lost & found, nearest medical aid)
   6. Languages: English / Telugu / Hindi (for all new text)
   7. Parking icons + parking info (capacity, vehicle type, status)
   8. Facility status badges + "not active" warning before navigating
   9. Share location (WhatsApp / phone share) + report a problem
  10. Offline banner, text-size button
   ========================================================== */

/* ----------------------------------------------------------
   EASY SETTINGS — edit these, nothing else needs touching
   ---------------------------------------------------------- */
const CONFIG = {
    // Shown as a "Control room" call button in the Emergency panel.
    // Leave "" to hide the button.  Example: "+918812345678"
    controlRoomPhone: "",

    // Optional: WhatsApp number (country code, no +) that receives
    // "Report a problem" messages. Leave "" to let the visitor pick a contact.
    reportWhatsApp: "",

    // Event name used in share/report messages
    eventName: "Godavari Pushkaralu",

    walkMetresPerMinute: 80
};

/* ----------------------------------------------------------
   TRANSLATIONS (new UI text only)
   ---------------------------------------------------------- */
const I18N = {
    en: {
        search_ph: "Search facility or ghat",
        hint: "Tap any facility icon, then <b>Open in Google Maps</b> to get directions.",
        layers: "Layers", nearest: "Nearest", emergency: "SOS", language: "Language", textsize: "A+",
        layers_title: "Map layers & legend", show_types: "Facility types",
        l_ghats: "Ghats", l_amen: "Facilities", l_park: "Parking", l_appr: "Approach roads", l_walk: "Walking routes",
        facilities_summary: (n, a) => `${n} facilities mapped · ${a} active`,
        nearest_title: "Find nearest facility", nearest_sub: "Pick what you need. We measure from your location.",
        n_medical: "Medical", n_water: "Drinking water", n_toilet: "Toilets", n_changing: "Changing rooms", n_info: "Help / Info", n_parking: "Parking",
        locating: "Finding your location…", from_you: "from your location", from_centre: "from map centre (location not available)",
        none_found: "Nothing of this type is mapped yet.", only_inactive: "No active one right now. Showing the nearest one that is currently not active.",
        walk: (m) => `${m} min walk`, navigate: "Navigate", show_map: "Show on map",
        emerg_title: "Emergency help", emerg_sub: "Tap a number to call.",
        e_112: "All emergencies", e_108: "Ambulance", e_100: "Police", e_101: "Fire", e_1098: "Childline",
        e_control: "Control room", e_lost: "Lost & found point", e_medical: "Nearest medical aid",
        lang_title: "Language", textsize_title: "Text size",
        open_gmaps: "Open in Google Maps", share: "Share location", report: "Report a problem", cancel: "Cancel",
        navigate_to: (n) => `Navigate to ${n}?`,
        tip_dialog: "Tip: Google Maps will show walking directions from where you are.",
        inactive_warn: "This facility is currently not active. You can still get directions, but please check with volunteers first.",
        closed_warn: "This parking lot is currently closed. Please use another parking lot.",
        st_active: "Active", st_not_active: "Not active", st_open: "Open", st_closed: "Closed",
        capacity: "Capacity", vehicles: "Vehicles", cars: "Cars", bikes: "Bikes", all: "All vehicles",
        grp_facility: "Facility", grp_parking: "Parking", grp_ghat: "Ghat", no_results: "No results",
        offline: "You are offline. The map may not load new areas.", close: "Close",
        ty_medical: "Medical", ty_water: "Drinking water", ty_toilet: "Toilets", ty_changing: "Changing rooms", ty_info: "Help / Info", ty_police: "Police", ty_food: "Food",
        "fn_hospital": "Hospital", "fn_changing rooms": "Changing rooms", "fn_toilets": "Toilets", "fn_washrooms": "Washrooms",
        "fn_water drinking point": "Drinking water point", "fn_control center": "Control centre", "fn_lost and found": "Lost & found",
        report_msg: (n, c) => `Problem report — ${n} (${c}): `,
        share_msg: (n) => `${n} — ${CONFIG.eventName}`
    },
    te: {
        search_ph: "సౌకర్యం / ఘాట్ వెతకండి",
        hint: "ఏదైనా సౌకర్య చిహ్నాన్ని నొక్కి, <b>గూగుల్ మ్యాప్స్‌లో తెరవండి</b> ద్వారా దారి పొందండి.",
        layers: "లేయర్లు", nearest: "సమీపం", emergency: "అత్యవసరం", language: "భాష", textsize: "A+",
        layers_title: "మ్యాప్ లేయర్లు", show_types: "సౌకర్యాల రకాలు",
        l_ghats: "ఘాట్లు", l_amen: "సౌకర్యాలు", l_park: "పార్కింగ్", l_appr: "చేరుకునే రోడ్లు", l_walk: "నడక మార్గాలు",
        facilities_summary: (n, a) => `${n} సౌకర్యాలు · ${a} అందుబాటులో ఉన్నాయి`,
        nearest_title: "సమీప సౌకర్యం కనుగొనండి", nearest_sub: "మీకు ఏది కావాలో ఎంచుకోండి. మీ స్థానం నుండి దూరం లెక్కిస్తాం.",
        n_medical: "వైద్యం", n_water: "తాగునీరు", n_toilet: "మరుగుదొడ్లు", n_changing: "బట్టలు మార్చే గదులు", n_info: "సహాయం / సమాచారం", n_parking: "పార్కింగ్",
        locating: "మీ స్థానాన్ని గుర్తిస్తున్నాం…", from_you: "మీ స్థానం నుండి", from_centre: "మ్యాప్ మధ్య నుండి (స్థానం అందుబాటులో లేదు)",
        none_found: "ఈ రకం ఇంకా మ్యాప్‌లో లేదు.", only_inactive: "ప్రస్తుతం అందుబాటులో ఉన్నది లేదు. అందుబాటులో లేని సమీపమైనది చూపిస్తున్నాం.",
        walk: (m) => `${m} నిమిషాల నడక`, navigate: "దారి చూపు", show_map: "మ్యాప్‌లో చూపు",
        emerg_title: "అత్యవసర సహాయం", emerg_sub: "కాల్ చేయడానికి నంబర్‌ను నొక్కండి.",
        e_112: "అన్ని అత్యవసరాలు", e_108: "అంబులెన్స్", e_100: "పోలీస్", e_101: "అగ్నిమాపక", e_1098: "చైల్డ్‌లైన్",
        e_control: "కంట్రోల్ రూమ్", e_lost: "పోగొట్టుకున్నవి – దొరికినవి కేంద్రం", e_medical: "సమీప వైద్య సహాయం",
        lang_title: "భాష", textsize_title: "అక్షరాల పరిమాణం",
        open_gmaps: "గూగుల్ మ్యాప్స్‌లో తెరవండి", share: "స్థానాన్ని షేర్ చేయండి", report: "సమస్యను తెలియజేయండి", cancel: "రద్దు",
        navigate_to: (n) => `${n} కు వెళ్లాలా?`,
        tip_dialog: "గూగుల్ మ్యాప్స్ మీరున్న చోటు నుండి నడక మార్గం చూపిస్తుంది.",
        inactive_warn: "ఈ సౌకర్యం ప్రస్తుతం అందుబాటులో లేదు. దారి పొందవచ్చు, కానీ ముందుగా వాలంటీర్లను అడగండి.",
        closed_warn: "ఈ పార్కింగ్ ప్రస్తుతం మూసివేశారు. దయచేసి మరో పార్కింగ్ ఉపయోగించండి.",
        st_active: "అందుబాటులో ఉంది", st_not_active: "అందుబాటులో లేదు", st_open: "తెరిచి ఉంది", st_closed: "మూసివేశారు",
        capacity: "సామర్థ్యం", vehicles: "వాహనాలు", cars: "కార్లు", bikes: "బైక్‌లు", all: "అన్ని వాహనాలు",
        grp_facility: "సౌకర్యం", grp_parking: "పార్కింగ్", grp_ghat: "ఘాట్", no_results: "ఫలితాలు లేవు",
        offline: "ఇంటర్నెట్ లేదు. మ్యాప్ కొత్త ప్రాంతాలను లోడ్ చేయకపోవచ్చు.", close: "మూసివేయి",
        ty_medical: "వైద్యం", ty_water: "తాగునీరు", ty_toilet: "మరుగుదొడ్లు", ty_changing: "బట్టలు మార్చే గదులు", ty_info: "సహాయం / సమాచారం", ty_police: "పోలీస్", ty_food: "ఆహారం",
        "fn_hospital": "ఆసుపత్రి", "fn_changing rooms": "బట్టలు మార్చే గదులు", "fn_toilets": "మరుగుదొడ్లు", "fn_washrooms": "వాష్‌రూమ్‌లు",
        "fn_water drinking point": "తాగునీటి కేంద్రం", "fn_control center": "నియంత్రణ కేంద్రం", "fn_lost and found": "పోగొట్టుకున్నవి – దొరికినవి",
        report_msg: (n, c) => `సమస్య నివేదిక — ${n} (${c}): `,
        share_msg: (n) => `${n} — ${CONFIG.eventName}`
    },
    hi: {
        search_ph: "सुविधा या घाट खोजें",
        hint: "किसी भी सुविधा के आइकन पर टैप करें, फिर रास्ते के लिए <b>Google Maps में खोलें</b> दबाएँ।",
        layers: "परतें", nearest: "निकटतम", emergency: "आपातकाल", language: "भाषा", textsize: "A+",
        layers_title: "मानचित्र परतें और संकेत", show_types: "सुविधाओं के प्रकार",
        l_ghats: "घाट", l_amen: "सुविधाएँ", l_park: "पार्किंग", l_appr: "पहुँच मार्ग", l_walk: "पैदल मार्ग",
        facilities_summary: (n, a) => `${n} सुविधाएँ दर्ज · ${a} चालू`,
        nearest_title: "निकटतम सुविधा खोजें", nearest_sub: "जो चाहिए चुनें। दूरी आपकी लोकेशन से नापी जाएगी।",
        n_medical: "चिकित्सा", n_water: "पीने का पानी", n_toilet: "शौचालय", n_changing: "चेंजिंग रूम", n_info: "सहायता / सूचना", n_parking: "पार्किंग",
        locating: "आपकी लोकेशन खोज रहे हैं…", from_you: "आपकी लोकेशन से", from_centre: "मानचित्र के केंद्र से (लोकेशन उपलब्ध नहीं)",
        none_found: "इस प्रकार की सुविधा अभी मानचित्र में नहीं है।", only_inactive: "अभी कोई चालू नहीं है। निकटतम बंद सुविधा दिखा रहे हैं।",
        walk: (m) => `${m} मिनट पैदल`, navigate: "रास्ता दिखाएँ", show_map: "मानचित्र पर देखें",
        emerg_title: "आपातकालीन सहायता", emerg_sub: "कॉल करने के लिए नंबर दबाएँ।",
        e_112: "सभी आपात स्थितियाँ", e_108: "एम्बुलेंस", e_100: "पुलिस", e_101: "अग्निशमन", e_1098: "चाइल्डलाइन",
        e_control: "कंट्रोल रूम", e_lost: "खोया-पाया केंद्र", e_medical: "निकटतम चिकित्सा सहायता",
        lang_title: "भाषा", textsize_title: "अक्षर का आकार",
        open_gmaps: "Google Maps में खोलें", share: "लोकेशन शेयर करें", report: "समस्या बताएँ", cancel: "रद्द करें",
        navigate_to: (n) => `${n} तक नेविगेट करें?`,
        tip_dialog: "Google Maps आपकी मौजूदा जगह से पैदल रास्ता दिखाएगा।",
        inactive_warn: "यह सुविधा अभी चालू नहीं है। आप रास्ता देख सकते हैं, पर पहले स्वयंसेवकों से पूछ लें।",
        closed_warn: "यह पार्किंग अभी बंद है। कृपया दूसरी पार्किंग का उपयोग करें।",
        st_active: "चालू", st_not_active: "चालू नहीं", st_open: "खुला", st_closed: "बंद",
        capacity: "क्षमता", vehicles: "वाहन", cars: "कारें", bikes: "बाइक", all: "सभी वाहन",
        grp_facility: "सुविधा", grp_parking: "पार्किंग", grp_ghat: "घाट", no_results: "कोई परिणाम नहीं",
        offline: "इंटरनेट नहीं है। मानचित्र नए क्षेत्र लोड नहीं कर पाएगा।", close: "बंद करें",
        ty_medical: "चिकित्सा", ty_water: "पीने का पानी", ty_toilet: "शौचालय", ty_changing: "चेंजिंग रूम", ty_info: "सहायता / सूचना", ty_police: "पुलिस", ty_food: "भोजन",
        "fn_hospital": "अस्पताल", "fn_changing rooms": "चेंजिंग रूम", "fn_toilets": "शौचालय", "fn_washrooms": "वॉशरूम",
        "fn_water drinking point": "पीने के पानी का स्थान", "fn_control center": "नियंत्रण कक्ष", "fn_lost and found": "खोया-पाया",
        report_msg: (n, c) => `समस्या रिपोर्ट — ${n} (${c}): `,
        share_msg: (n) => `${n} — ${CONFIG.eventName}`
    }
};

/* ----------------------------------------------------------
   HELPERS
   ---------------------------------------------------------- */
const TYPE_BY_NAME = {
    "hospital": "medical",
    "changing rooms": "changing",
    "toilets": "toilet",
    "washrooms": "toilet",
    "water drinking point": "water",
    "control center": "info",
    "lost and found": "info"
};
const TYPE_BY_CATEGORY = { medical: "medical", water: "water", police: "police", food: "food" };

// Icon file per facility type (same PNGs already in assets/amenities)
const TYPE_ICON = {
    medical: "assets/amenities/medical.png",
    water: "assets/amenities/water.png",
    toilet: "assets/amenities/toilet.png",
    changing: "assets/amenities/changing-room.png",
    info: "assets/amenities/information.png",
    police: "assets/amenities/police.png",
    food: "assets/amenities/food.png",
    parking: "assets/amenities/parking.png"
};
const TYPE_EMOJI = { medical: "🏥", water: "💧", toilet: "🚻", changing: "🚪", info: "ℹ️", police: "🚓", food: "🍲", parking: "🅿️", ghat: "🛕" };

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const titleCase = s => String(s || "").replace(/\b\w/g, c => c.toUpperCase());

function haversine(a, b) {
    const R = 6371000, rad = x => x * Math.PI / 180;
    const dLat = rad(b[1] - a[1]), dLng = rad(b[0] - a[0]);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[1])) * Math.cos(rad(b[1])) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
}

function centroid(geometry) {
    if (!geometry) return null;
    if (geometry.type === "Point") return geometry.coordinates;
    let ring;
    if (geometry.type === "Polygon") ring = geometry.coordinates[0];
    else if (geometry.type === "MultiPolygon") ring = geometry.coordinates[0][0];
    else if (geometry.type === "LineString") ring = geometry.coordinates;
    else if (geometry.type === "MultiLineString") ring = geometry.coordinates[0];
    else return null;
    const pts = ring.length > 1 && ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1] ? ring.slice(0, -1) : ring;
    const sum = pts.reduce((s, c) => [s[0] + c[0], s[1] + c[1]], [0, 0]);
    return [sum[0] / pts.length, sum[1] / pts.length];
}

const isActive = status => !["not active", "inactive", "closed"].includes(String(status || "").toLowerCase().trim());

/* ----------------------------------------------------------
   MAIN
   ---------------------------------------------------------- */
async function init(app) {
    const { map, maplibregl, data } = app;

    /* ---------- language ---------- */
    let lang = "en";
    try { lang = localStorage.getItem("pk-lang") || "en"; } catch (e) { /* ignore */ }
    if (!I18N[lang]) lang = "en";

    const t = (key, ...args) => {
        const v = (I18N[lang] && I18N[lang][key] !== undefined) ? I18N[lang][key] : I18N.en[key];
        if (v === undefined) return key;
        return typeof v === "function" ? v(...args) : v;
    };
    const facName = raw => {
        const k = "fn_" + String(raw || "").toLowerCase().trim();
        return (I18N[lang] && I18N[lang][k]) || I18N.en[k] || titleCase(raw || "Facility");
    };

    /* ---------- build facility + parking lists ---------- */
    const facilities = data.amenities.features
        .filter(f => f.geometry && f.geometry.type === "Point")
        .map(f => {
            const p = f.properties || {};
            return { kind: "facility", raw: p.name || "", type: amenityType(p), status: p.status || "", coord: f.geometry.coordinates };
        });

    const parkingLots = data.parking.features.map(f => {
        const p = f.properties || {};
        return {
            kind: "parking", raw: p.parking_id || "Parking", type: "parking",
            status: p.status || "", capacity: p.capacity, vehicles: p["vehicle ty"] || "all",
            coord: centroid(f.geometry)
        };
    }).filter(x => x.coord);

    function amenityType(p) {
        const n = String(p.name || "").toLowerCase().trim();
        return TYPE_BY_NAME[n] || TYPE_BY_CATEGORY[String(p.category || "").toLowerCase()] || "info";
    }

    /* ---------- small extras on the EXISTING layers ---------- */
    // Make police / food icons work if those facilities are added to the data
    // later (icons were already loaded by the original code but unused).
    try {
        const nameMatch = ["match", ["get", "name"],
            "hospital", "amenity-medical",
            "changing rooms", "amenity-changing",
            "toilets", "amenity-toilet",
            "washrooms", "amenity-toilet",
            "water drinking point", "amenity-water",
            "control center", "amenity-information",
            "lost and found", "amenity-information",
            ["match", ["downcase", ["to-string", ["get", "category"]]],
                "police", "amenity-police",
                "food", "amenity-food",
                "medical", "amenity-medical",
                "water", "amenity-water",
                "amenity-information"]
        ];
        map.setLayoutProperty("amenity-icons", "icon-image", nameMatch);
        // visually soften facilities that are "not active"
        map.setPaintProperty("amenity-icons", "icon-opacity",
            ["case", ["in", ["downcase", ["to-string", ["get", "status"]]], ["literal", ["not active", "inactive", "closed"]]], 0.5, 1]);
    } catch (e) { console.warn("Could not extend amenity layer:", e); }

    /* ---------- parking icons (parking.png existed but was never shown) ---------- */
    try {
        if (!map.hasImage("amenity-parking")) {
            const img = await map.loadImage(TYPE_ICON.parking);
            map.addImage("amenity-parking", img.data);
        }
        map.addSource("pk-parking-points", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: data.parking.features.map(f => ({
                    type: "Feature",
                    properties: { ...(f.properties || {}) },
                    geometry: { type: "Point", coordinates: centroid(f.geometry) }
                })).filter(f => f.geometry.coordinates)
            }
        });
        map.addLayer({
            id: "parking-icons",
            type: "symbol",
            source: "pk-parking-points",
            minzoom: 13,
            layout: {
                "icon-image": "amenity-parking",
                "icon-size": 0.12,
                "icon-anchor": "bottom",
                "icon-allow-overlap": true,
                "icon-ignore-placement": true
            },
            paint: {
                "icon-opacity": ["case", ["==", ["downcase", ["to-string", ["get", "status"]]], "closed"], 0.5, 1]
            }
        });
    } catch (e) { console.warn("Could not add parking icons:", e); }

    /* ---------- highlight ring (used by search / nearest) ---------- */
    map.addSource("pk-highlight", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
    map.addLayer({
        id: "pk-highlight-ring", type: "circle", source: "pk-highlight",
        paint: {
            "circle-radius": 26, "circle-color": "#D4A72C", "circle-opacity": 0.18,
            "circle-stroke-color": "#D4A72C", "circle-stroke-width": 3
        }
    });
    let highlightTimer = null;
    function highlight(coord) {
        map.getSource("pk-highlight").setData({
            type: "FeatureCollection",
            features: [{ type: "Feature", properties: {}, geometry: { type: "Point", coordinates: coord } }]
        });
        clearTimeout(highlightTimer);
        highlightTimer = setTimeout(() => {
            map.getSource("pk-highlight").setData({ type: "FeatureCollection", features: [] });
        }, 9000);
    }
    function flyTo(coord) {
        map.flyTo({
            center: coord, zoom: Math.max(map.getZoom(), 17.5), duration: 1200,
            bearing: map.getBearing(), pitch: map.getPitch()
        });
        highlight(coord);
    }

    /* ======================================================
       BUILD UI
       ====================================================== */
    const ui = document.createElement("div");
    ui.className = "pk-ui";
    ui.id = "pk-ui";
    ui.innerHTML = `
        <div class="pk-search">
            <span class="pk-search-icon">🔍</span>
            <input id="pk-search-input" type="search" autocomplete="off" data-i18n-ph="search_ph" aria-label="Search">
            <div id="pk-results" class="pk-results" role="listbox"></div>
        </div>

        <div id="pk-hint" class="pk-hint">
            <span class="pk-hint-icon">📍</span>
            <span id="pk-hint-text"></span>
            <button class="pk-hint-close" id="pk-hint-close" aria-label="Close">×</button>
        </div>

        <div class="pk-toolbar">
            <button class="pk-btn" data-panel="layers"><span class="pk-ico">🗺️</span><span class="pk-label" data-i18n="layers"></span></button>
            <button class="pk-btn" data-panel="nearest"><span class="pk-ico">🧭</span><span class="pk-label" data-i18n="nearest"></span></button>
            <button class="pk-btn pk-emergency" data-panel="emergency"><span class="pk-ico">🚨</span><span class="pk-label" data-i18n="emergency"></span></button>
            <button class="pk-btn" data-panel="language"><span class="pk-ico">🌐</span><span class="pk-label" data-i18n="language"></span></button>
            <button class="pk-btn" id="pk-textsize" aria-label="Text size"><span class="pk-ico" style="font-weight:700">A+</span></button>
        </div>

        <!-- LAYERS -->
        <div class="pk-panel" id="pk-panel-layers">
            <div class="pk-panel-head"><h3 class="pk-panel-title" data-i18n="layers_title"></h3><button class="pk-x" data-close aria-label="Close">×</button></div>
            <p class="pk-panel-sub" id="pk-summary"></p>
            <div id="pk-layer-list"></div>
            <div class="pk-section-label" data-i18n="show_types"></div>
            <div class="pk-chips" id="pk-type-chips"></div>
        </div>

        <!-- NEAREST -->
        <div class="pk-panel" id="pk-panel-nearest">
            <div class="pk-panel-head"><h3 class="pk-panel-title" data-i18n="nearest_title"></h3><button class="pk-x" data-close aria-label="Close">×</button></div>
            <p class="pk-panel-sub" data-i18n="nearest_sub"></p>
            <div class="pk-near-grid" id="pk-near-grid"></div>
            <div class="pk-near-result" id="pk-near-result"></div>
        </div>

        <!-- EMERGENCY -->
        <div class="pk-panel" id="pk-panel-emergency">
            <div class="pk-panel-head"><h3 class="pk-panel-title" data-i18n="emerg_title"></h3><button class="pk-x" data-close aria-label="Close">×</button></div>
            <p class="pk-panel-sub" data-i18n="emerg_sub"></p>
            <a class="pk-call sos" href="tel:112"><span data-i18n="e_112"></span><span class="pk-call-num">112</span></a>
            <a class="pk-call" href="tel:108"><span data-i18n="e_108"></span><span class="pk-call-num">108</span></a>
            <a class="pk-call" href="tel:100"><span data-i18n="e_100"></span><span class="pk-call-num">100</span></a>
            <a class="pk-call" href="tel:101"><span data-i18n="e_101"></span><span class="pk-call-num">101</span></a>
            <a class="pk-call" href="tel:1098"><span data-i18n="e_1098"></span><span class="pk-call-num">1098</span></a>
            <a class="pk-call" id="pk-control-call" href="#" style="display:none"><span data-i18n="e_control"></span><span class="pk-call-num" id="pk-control-num"></span></a>
            <div class="pk-row" style="margin-top:6px">
                <button class="pk-secondary" id="pk-go-lost" data-i18n="e_lost"></button>
                <button class="pk-secondary" id="pk-go-medical" data-i18n="e_medical"></button>
            </div>
        </div>

        <!-- LANGUAGE -->
        <div class="pk-panel" id="pk-panel-language">
            <div class="pk-panel-head"><h3 class="pk-panel-title" data-i18n="lang_title"></h3><button class="pk-x" data-close aria-label="Close">×</button></div>
            <div class="pk-lang-row">
                <button data-lang="en">English</button>
                <button data-lang="te">తెలుగు</button>
                <button data-lang="hi">हिन्दी</button>
            </div>
        </div>
    `;
    document.body.appendChild(ui);

    const offline = document.createElement("div");
    offline.className = "pk-offline";
    offline.id = "pk-offline";
    document.body.appendChild(offline);

    const $ = id => document.getElementById(id);

    /* ---------- panels ---------- */
    const panels = ["layers", "nearest", "emergency", "language"];
    function openPanel(name) {
        const already = $("pk-panel-" + name).classList.contains("show");
        panels.forEach(p => {
            $("pk-panel-" + p).classList.remove("show");
            ui.querySelector(`[data-panel="${p}"]`).classList.remove("active");
        });
        if (!already) {
            $("pk-panel-" + name).classList.add("show");
            ui.querySelector(`[data-panel="${name}"]`).classList.add("active");
        }
    }
    ui.querySelectorAll("[data-panel]").forEach(b => b.addEventListener("click", () => openPanel(b.dataset.panel)));
    ui.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", () => {
        panels.forEach(p => {
            $("pk-panel-" + p).classList.remove("show");
            ui.querySelector(`[data-panel="${p}"]`).classList.remove("active");
        });
    }));

    /* ---------- hint pill ---------- */
    $("pk-hint-close").addEventListener("click", () => { $("pk-hint").style.display = "none"; });

    /* ======================================================
       LAYERS & LEGEND
       ====================================================== */
    const LAYER_GROUPS = [
        { key: "l_ghats", swatch: `<span class="pk-swatch ghat"></span>`, count: () => data.ghats.features.length,
          layers: ["all-ghats-fill", "all-ghats-outline", "ghat-fill", "ghat-pattern", "ghat-outline-outer", "ghat-outline", "ghat-labels"] },
        { key: "l_amen", swatch: `<span class="pk-swatch amen"><img src="${TYPE_ICON.toilet}" alt=""></span>`, count: () => facilities.length,
          layers: ["amenity-icons"] },
        { key: "l_park", swatch: `<span class="pk-swatch parking"></span>`, count: () => parkingLots.length,
          layers: ["parking-fill", "parking-outline", "parking-icons"] },
        { key: "l_appr", swatch: `<span class="pk-swatch approach"></span>`, count: () => data.approach.features.length,
          layers: ["approach-road-casing", "approach-road-lines", "approach-road-arrows", "approach-road-endpoints"] },
        { key: "l_walk", swatch: `<span class="pk-swatch walking"></span>`, count: () => data.walking.features.length,
          layers: ["walking-route-casing", "walking-route-lines", "walking-route-arrows"] }
    ];
    const layerState = {};
    LAYER_GROUPS.forEach(g => layerState[g.key] = true);

    function renderLayers() {
        const list = $("pk-layer-list");
        list.innerHTML = "";
        LAYER_GROUPS.forEach(g => {
            const row = document.createElement("label");
            row.className = "pk-layer-row";
            row.innerHTML = `<input type="checkbox" ${layerState[g.key] ? "checked" : ""}>${g.swatch}
                <span class="pk-layer-text">${esc(t(g.key))}</span><span class="pk-layer-count">${g.count()}</span>`;
            row.querySelector("input").addEventListener("change", e => {
                layerState[g.key] = e.target.checked;
                g.layers.forEach(id => {
                    if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", e.target.checked ? "visible" : "none");
                });
            });
            list.appendChild(row);
        });
        const active = facilities.filter(f => isActive(f.status)).length;
        $("pk-summary").textContent = t("facilities_summary", facilities.length, active);
        renderTypeChips();
    }

    // facility-type filter (only types that exist in the data)
    const typesPresent = [...new Set(facilities.map(f => f.type))];
    const typeOn = {};
    typesPresent.forEach(ty => typeOn[ty] = true);

    function applyTypeFilter() {
        const allOn = typesPresent.every(ty => typeOn[ty]);
        if (allOn) { map.setFilter("amenity-icons", null); return; }
        const names = [];
        data.amenities.features.forEach(f => {
            const p = f.properties || {};
            if (typeOn[amenityType(p)]) names.push(String(p.name || "").toLowerCase());
        });
        map.setFilter("amenity-icons", ["in", ["downcase", ["to-string", ["get", "name"]]], ["literal", names]]);
    }
    function renderTypeChips() {
        const box = $("pk-type-chips");
        box.innerHTML = "";
        typesPresent.forEach(ty => {
            const b = document.createElement("button");
            b.className = "pk-chip" + (typeOn[ty] ? "" : " off");
            b.innerHTML = `<img src="${TYPE_ICON[ty]}" alt=""><span>${esc(t("ty_" + ty))}</span>`;
            b.addEventListener("click", () => {
                typeOn[ty] = !typeOn[ty];
                b.classList.toggle("off", !typeOn[ty]);
                applyTypeFilter();
            });
            box.appendChild(b);
        });
    }

    /* ======================================================
       FACILITY / PARKING DIALOG  (the Google Maps hint lives here)
       ====================================================== */
    const overlay = $("amenity-dialog-overlay");
    const dialog = overlay.querySelector(".amenity-dialog");
    const dialogText = $("amenity-dialog-text");
    const gmapsBtn = $("open-google-maps");

    // extras inserted into the existing dialog
    const meta = document.createElement("div");
    meta.className = "pk-dialog-meta";
    meta.id = "pk-dialog-meta";
    dialogText.insertAdjacentElement("afterend", meta);

    const warn = document.createElement("div");
    warn.className = "pk-dialog-warn";
    warn.id = "pk-dialog-warn";
    warn.style.display = "none";
    meta.insertAdjacentElement("afterend", warn);

    const actions = document.createElement("div");
    actions.className = "pk-dialog-actions";
    actions.innerHTML = `<button id="pk-share"></button><button id="pk-report"></button>`;
    $("cancel-amenity-dialog").insertAdjacentElement("beforebegin", actions);

    let current = null; // facility currently shown in the dialog

    function openFacility(item) {
        current = item;
        const name = item.kind === "facility" ? facName(item.raw) : titleCase(item.raw);
        app.setDestination(item.coord);

        $("amenity-dialog-title").textContent = t("navigate_to", name);
        dialog.querySelector(".amenity-dialog-icon").textContent = TYPE_EMOJI[item.type] || "📍";
        dialogText.innerHTML = `<span class="pk-dialog-tip">${esc(t("tip_dialog"))}</span>`;
        gmapsBtn.innerHTML = `<span>📍</span><span>${esc(t("open_gmaps"))}</span>`;

        const good = isActive(item.status);
        const label = item.kind === "parking"
            ? (String(item.status).toLowerCase() === "closed" ? t("st_closed") : t("st_open"))
            : (good ? t("st_active") : t("st_not_active"));
        let badges = `<span class="pk-badge ${good ? "good" : "bad"}">${esc(label)}</span>`;
        if (item.kind === "parking") {
            if (item.capacity != null) badges += `<span class="pk-badge info">${esc(t("capacity"))}: ${esc(item.capacity)}</span>`;
            const vk = String(item.vehicles || "all").toLowerCase();
            badges += `<span class="pk-badge info">${esc(t("vehicles"))}: ${esc(t(["cars", "bikes", "all"].includes(vk) ? vk : "all"))}</span>`;
        }
        meta.innerHTML = badges;

        if (!good) {
            warn.textContent = item.kind === "parking" ? t("closed_warn") : t("inactive_warn");
            warn.style.display = "block";
        } else {
            warn.style.display = "none";
        }

        $("pk-share").textContent = "📤 " + t("share");
        $("pk-report").textContent = "⚠️ " + t("report");
        $("cancel-amenity-dialog").textContent = t("cancel");
        overlay.classList.add("show");
    }

    function mapsPlaceUrl(c) { return `https://www.google.com/maps/search/?api=1&query=${c[1]},${c[0]}`; }

    $("pk-share").addEventListener("click", async () => {
        if (!current) return;
        const name = current.kind === "facility" ? facName(current.raw) : titleCase(current.raw);
        const text = `${t("share_msg", name)}\n${mapsPlaceUrl(current.coord)}`;
        if (navigator.share) {
            try { await navigator.share({ title: name, text, url: mapsPlaceUrl(current.coord) }); return; } catch (e) { /* cancelled -> fall through */ }
        }
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });

    $("pk-report").addEventListener("click", () => {
        if (!current) return;
        const name = current.kind === "facility" ? facName(current.raw) : titleCase(current.raw);
        const coords = `${current.coord[1].toFixed(5)}, ${current.coord[0].toFixed(5)}`;
        const text = t("report_msg", name, coords) + "\n" + mapsPlaceUrl(current.coord);
        const base = CONFIG.reportWhatsApp ? `https://wa.me/${CONFIG.reportWhatsApp}` : "https://wa.me/";
        window.open(`${base}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });

    /* ---------- map clicks: facilities + parking ---------- */
    map.on("click", "amenity-icons", e => {
        const f = e.features && e.features[0];
        if (!f || !f.geometry) return;
        const p = f.properties || {};
        openFacility({ kind: "facility", raw: p.name || "", type: amenityType(p), status: p.status || "", coord: f.geometry.coordinates.slice() });
    });

    function openParkingFromFeature(f, lngLat) {
        const p = f.properties || {};
        const coord = (f.geometry && f.geometry.type === "Point") ? f.geometry.coordinates.slice() : (centroid(f.geometry) || [lngLat.lng, lngLat.lat]);
        openFacility({
            kind: "parking", raw: p.parking_id || "Parking", type: "parking", status: p.status || "",
            capacity: p.capacity, vehicles: p["vehicle ty"] || "all", coord
        });
    }
    map.on("click", "parking-icons", e => { const f = e.features && e.features[0]; if (f) openParkingFromFeature(f, e.lngLat); });
    map.on("click", "parking-fill", e => {
        // an icon click is handled above; only react to the polygon when no icon is on top
        const icons = map.queryRenderedFeatures(e.point, { layers: ["parking-icons"] });
        if (icons.length) return;
        const f = e.features && e.features[0]; if (f) openParkingFromFeature(f, e.lngLat);
    });
    ["parking-icons", "parking-fill"].forEach(id => {
        map.on("mouseenter", id, () => map.getCanvas().style.cursor = "pointer");
        map.on("mouseleave", id, () => map.getCanvas().style.cursor = "");
    });

    /* ======================================================
       NEAREST FACILITY
       ====================================================== */
    const NEAR_TYPES = ["medical", "water", "toilet", "changing", "info", "parking"];
    let lastUserPos = null;
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            p => { lastUserPos = [p.coords.longitude, p.coords.latitude]; },
            () => { /* permission denied / unavailable: we fall back to map centre */ },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
        );
    }
    function getReference() {
        return new Promise(resolve => {
            if (lastUserPos) return resolve({ coord: lastUserPos, source: "you" });
            if (!navigator.geolocation) return resolve({ coord: map.getCenter().toArray(), source: "centre" });
            navigator.geolocation.getCurrentPosition(
                p => { lastUserPos = [p.coords.longitude, p.coords.latitude]; resolve({ coord: lastUserPos, source: "you" }); },
                () => resolve({ coord: map.getCenter().toArray(), source: "centre" }),
                { enableHighAccuracy: true, timeout: 6000, maximumAge: 15000 }
            );
        });
    }

    function renderNearGrid() {
        const grid = $("pk-near-grid");
        grid.innerHTML = "";
        NEAR_TYPES.forEach(ty => {
            const b = document.createElement("button");
            b.className = "pk-near-btn";
            b.dataset.type = ty;
            b.innerHTML = `<img src="${TYPE_ICON[ty]}" alt=""><span>${esc(t("n_" + ty))}</span>`;
            b.addEventListener("click", () => findNearest(ty));
            grid.appendChild(b);
        });
    }

    async function findNearest(type, opts = {}) {
        const out = $("pk-near-result");
        ui.querySelectorAll(".pk-near-btn").forEach(b => b.classList.toggle("active", b.dataset.type === type));
        if (!opts.silent) out.textContent = t("locating");

        const pool = (type === "parking" ? parkingLots : facilities.filter(f => f.type === type));
        if (!pool.length) { out.textContent = t("none_found"); return null; }

        const ref = await getReference();
        const activePool = pool.filter(f => isActive(f.status));
        const usePool = activePool.length ? activePool : pool;
        const ranked = usePool.map(f => ({ f, d: haversine(ref.coord, f.coord) })).sort((a, b) => a.d - b.d)[0];

        const item = ranked.f;
        const metres = Math.round(ranked.d);
        const dist = metres >= 1000 ? `${(metres / 1000).toFixed(1)} km` : `${metres} m`;
        const mins = Math.max(1, Math.round(ranked.d / CONFIG.walkMetresPerMinute));
        const name = item.kind === "facility" ? facName(item.raw) : titleCase(item.raw);

        out.innerHTML = `
            <div class="pk-near-name">${esc(TYPE_EMOJI[item.type] || "📍")} ${esc(name)}</div>
            <div class="pk-near-meta">${esc(dist)} · ${esc(t("walk", mins))}<br>${esc(ref.source === "you" ? t("from_you") : t("from_centre"))}</div>
            ${activePool.length ? "" : `<div class="pk-dialog-warn">${esc(t("only_inactive"))}</div>`}
            <div class="pk-row">
                <button class="pk-primary" id="pk-near-nav">${esc(t("navigate"))}</button>
                <button class="pk-secondary" id="pk-near-show">${esc(t("show_map"))}</button>
            </div>`;
        $("pk-near-nav").addEventListener("click", () => openFacility(item));
        $("pk-near-show").addEventListener("click", () => flyTo(item.coord));
        flyTo(item.coord);
        return item;
    }

    /* ---------- emergency shortcuts ---------- */
    $("pk-go-lost").addEventListener("click", () => {
        const f = facilities.find(x => x.raw.toLowerCase() === "lost and found") || facilities.find(x => x.type === "info");
        if (!f) return;
        flyTo(f.coord);
        openFacility(f);
    });
    $("pk-go-medical").addEventListener("click", async () => {
        const item = await findNearest("medical", { silent: true });
        if (item) openFacility(item);
    });
    if (CONFIG.controlRoomPhone) {
        const a = $("pk-control-call");
        a.href = "tel:" + CONFIG.controlRoomPhone.replace(/\s+/g, "");
        $("pk-control-num").textContent = CONFIG.controlRoomPhone;
        a.style.display = "flex";
    }

    /* ======================================================
       SEARCH
       ====================================================== */
    function buildIndex() {
        const idx = [];
        facilities.forEach(f => idx.push({
            kind: "facility", label: facName(f.raw), search: `${f.raw} ${facName(f.raw)} ${t("ty_" + f.type)}`.toLowerCase(),
            group: t("grp_facility"), emoji: TYPE_EMOJI[f.type], item: f
        }));
        parkingLots.forEach(p => idx.push({
            kind: "parking", label: titleCase(p.raw), search: `${p.raw} ${t("n_parking")}`.toLowerCase(),
            group: t("grp_parking"), emoji: TYPE_EMOJI.parking, item: p
        }));
        data.ghats.features.forEach(g => idx.push({
            kind: "ghat", label: app.ghatName(g), search: `${app.ghatName(g)} ${t("grp_ghat")}`.toLowerCase(),
            group: t("grp_ghat"), emoji: TYPE_EMOJI.ghat, item: g
        }));
        return idx;
    }

    const input = $("pk-search-input");
    const results = $("pk-results");

    function renderResults() {
        const q = input.value.trim().toLowerCase();
        if (!q) { results.classList.remove("show"); results.innerHTML = ""; return; }
        const hits = buildIndex().filter(x => x.search.includes(q)).slice(0, 7);
        results.innerHTML = "";
        if (!hits.length) {
            results.innerHTML = `<div class="pk-no-results">${esc(t("no_results"))}</div>`;
        }
        hits.forEach(h => {
            const b = document.createElement("button");
            b.className = "pk-result";
            b.setAttribute("role", "option");
            b.innerHTML = `<span class="pk-result-emoji">${esc(h.emoji || "📍")}</span><span>${esc(h.label)}<small>${esc(h.group)}</small></span>`;
            b.addEventListener("click", () => {
                results.classList.remove("show");
                input.value = "";
                input.blur();
                if (h.kind === "ghat") { app.zoomToGhat(h.item); app.showGhatCard(h.item, false); }
                else { flyTo(h.item.coord); openFacility(h.item); }
            });
            results.appendChild(b);
        });
        results.classList.add("show");
    }
    input.addEventListener("input", renderResults);
    input.addEventListener("focus", renderResults);
    document.addEventListener("click", e => { if (!e.target.closest(".pk-search")) results.classList.remove("show"); });
    input.addEventListener("keydown", e => {
        if (e.key === "Escape") { results.classList.remove("show"); input.blur(); }
        if (e.key === "Enter") { const first = results.querySelector(".pk-result"); if (first) first.click(); }
    });

    /* ======================================================
       LANGUAGE + TEXT SIZE + OFFLINE
       ====================================================== */
    function applyLang() {
        ui.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
        ui.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
        $("pk-hint-text").innerHTML = t("hint");
        ui.querySelectorAll("[data-lang]").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
        ui.setAttribute("lang", lang);
        renderLayers();
        renderNearGrid();
        $("pk-near-result").innerHTML = "";
        offline.textContent = t("offline");
        // keep an open dialog in sync
        if (overlay.classList.contains("show") && current) openFacility(current);
        // static texts of the existing dialog that we may reword
        $("cancel-amenity-dialog").textContent = t("cancel");
        gmapsBtn.innerHTML = `<span>📍</span><span>${esc(t("open_gmaps"))}</span>`;
        $("pk-share").textContent = "📤 " + t("share");
        $("pk-report").textContent = "⚠️ " + t("report");
    }
    ui.querySelectorAll("[data-lang]").forEach(b => b.addEventListener("click", () => {
        lang = b.dataset.lang;
        try { localStorage.setItem("pk-lang", lang); } catch (e) { /* ignore */ }
        applyLang();
    }));

    const scales = [1, 1.15, 1.3];
    let scaleIdx = 0;
    try { scaleIdx = Math.max(0, Math.min(2, parseInt(localStorage.getItem("pk-scale") || "0", 10) || 0)); } catch (e) { /* ignore */ }
    const setScale = () => document.documentElement.style.setProperty("--pk-scale", scales[scaleIdx]);
    setScale();
    $("pk-textsize").addEventListener("click", () => {
        scaleIdx = (scaleIdx + 1) % scales.length;
        try { localStorage.setItem("pk-scale", String(scaleIdx)); } catch (e) { /* ignore */ }
        setScale();
    });

    const syncOnline = () => offline.classList.toggle("show", navigator.onLine === false);
    window.addEventListener("online", syncOnline);
    window.addEventListener("offline", syncOnline);
    syncOnline();

    applyLang();
    window.PushkarEnhancements = { findNearest, flyTo, openFacility, t };
    console.log("Pushkaralu enhancements ready");
}

if (window.PushkarApp) {
    init(window.PushkarApp);
} else {
    window.addEventListener("pushkar:ready", () => init(window.PushkarApp), { once: true });
}
