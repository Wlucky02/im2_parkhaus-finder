// =====================
// API FETCH
// =====================
async function loadData() {
  const url =
    "https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=20";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fehler:", error);
    return null;
  }
}


const apiData = await loadData();

export const apiArray = apiData?.results ?? [];
console.log("API Data:", apiArray);

// =====================
// LOCALE PARKHÄUSER (BASISDATEN)
// =====================
let parkhouses = [
{ title: "Storchen", lat: 47.5592347, lng: 7.58658, free: 12, image: "bilder/parkhaus_storchen.png", map: "https://www.google.com/maps?q=Parkhaus+Storchen+Basel" },
{ title: "Messe", lat: 47.563241, lng: 7.602175, free: 474, image: "bilder/parkhaus_messe.png", map: "https://maps.app.goo.gl/mTZeVQmj8kRvW9Z58" },
{ title: "Bad. Bahnhof", lat: 47.5651794, lng: 7.6089067, free: 246, image: "bilder/parkhaus_badbahnhof.png", map: "https://maps.app.goo.gl/DtTLq6VUZeES2J5w6" },
{ title: "Centralbahn", lat: 47.547299, lng: 7.5922975, free: 119, image: "bilder/parkhaus_centralbahn.png", map: "https://maps.app.goo.gl/Nw6NK3ntf7jFgD4U9" },
{ title: "Rebgasse", lat: 47.5607142, lng: 7.594263, free: 178, image: "bilder/parkhaus_rebgasse.png", map: "https://maps.app.goo.gl/1zTHns425BKxH4qq9" },
{ title: "Elisabethen", lat: 47.5506254, lng: 7.5874932, free: 515, image: "bilder/parkhaus_elisabethen.png", map: "https://maps.app.goo.gl/MNPQgYs5Vi4Bw6WE6" },
{ title: "City", lat: 47.561101, lng: 7.5824076, free: 175, image: "bilder/parkhaus_city.png", map: "https://maps.app.goo.gl/gk2w1kvUe5sGQqLz5" },
{ title: "Steinen", lat: 47.5524554, lng: 7.5858936, free: 174, image: "bilder/parkhaus_steinen.png", map: "https://maps.app.goo.gl/JYM31sr1oQvdzYta6" },
{ title: "Clarahuus", lat: 47.5622725, lng: 7.5917937, free: 9, image: "bilder/parkhaus_clarahuus.png", map: "https://maps.app.goo.gl/RXw7P94h8buipsTZ8" },
{ title: "Claramatte", lat: 47.5639644, lng: 7.5946604, free: 74, image: "bilder/parkhaus_claramatte.png", map: "https://maps.app.goo.gl/dfCeN4DaJ1EMJppz6" },
{ title: "Post Basel", lat: 47.5468617, lng: 7.5929374, free: 77, image: "bilder/parkhaus_post.png", map: "https://maps.app.goo.gl/dxwL79UayXoordq37" },
{ title: "Kunstmuseum", lat: 47.5545146, lng: 7.5927014, free: 123, image: "bilder/parkhaus_kunstmuseum.png", map: "https://maps.app.goo.gl/QMNhhk7bVEtsA9MVA" },
{ title: "Bahnhof Süd", lat: 47.5458851, lng: 7.5884556, free: 36, image: "bilder/parkhaus_bahnhofsued.png", map: "https://maps.app.goo.gl/xMbKhCGSCyjvUAJE8" },
{ title: "Anfos", lat: 47.5515968, lng: 7.593512, free: 42, image: "bilder/parkhaus_anfos.png", map: "https://maps.app.goo.gl/9JTVivAWyDtni5bW9" },
{ title: "Aeschen", lat: 47.5504299, lng: 7.5943046, free: 47, image: "bilder/parkhaus_aeschen.png", map: "https://maps.app.goo.gl/Y442NKmpWXUoFnfY6" }
];

// =====================
// NORMALISIERUNG
// =====================
function normalizeName(str) {
  return str
    .replace(/^parkhaus\s+/i, "")   // remove leading "Parkhaus"
    .trim();
}

function mergeApiData(apiArray) {
  // 1. build lookup map from API
  const apiMap = new Map();

  apiArray.forEach(item => {
    const keys = [
      item.name,
      item.title,
      item.id2
    ]
      .filter(Boolean)
      .map(normalizeName);

    keys.forEach(key => {
      apiMap.set(key, item);
    });
  });

  // 2. merge into local structure
  return parkhouses.map(local => {
    const key = normalizeName(local.title);
    const api = apiMap.get(key);

    if (!api) return local;

    return {
      ...local,
      title: local.title,
      free: api.free ?? local.free,
      lat: api.geo_point_2d?.lat ?? local.lat,
      lng: api.geo_point_2d?.lon ?? local.lng,
      map: local.map,
      image: local.image,

      // optional extra data from API if you want it
      total: api.total,
      occupancy: api.auslastung_prozent,
      link: api.link,
      status: api.status
    };
  });
}

// =====================
// PUBLIC API
// =====================
export function getParkhouses(apiArray = []) {

  return mergeApiData(apiArray);
}

function updateClock() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(2);

  const clock = document.getElementById('clock');
  const date = document.getElementById('date');

  if (clock) clock.textContent = `${hours}:${minutes}:${seconds}`;
  if (date) date.textContent = `${day}.${month}.${year}`;
}

document.addEventListener("DOMContentLoaded", () => {
  setInterval(updateClock, 1000);
  updateClock();
});