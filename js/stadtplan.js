import { getParkhouses } from "./script.js";

// =====================
// MAP INITIALISIERUNG
// =====================
const map = L.map("map").setView([47.5596, 7.5886], 13);



L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap",
}).addTo(map);




// =====================
// PARKHÄUSER (LOKAL)
// =====================
const parkhouses = getParkhouses();

console.log(getParkhouses());



function getColor(free) {
  if (free <= 50) return "red";
  if (free <= 150) return "orange";
  return "green";
}

function createIcon(color) {
  return L.divIcon({
    className: "custom-pin",
    html: `<div class="pin ${color}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 20],
  });
}

// MARKER ERSTELLEN
parkhouses.forEach(p => {
  const color = getColor(p.free);

  L.marker([p.lat, p.lng], {
    icon: createIcon(color)
  })
    .addTo(map)
    .bindPopup(`${p.title}<br>frei: ${p.free}`);
});
