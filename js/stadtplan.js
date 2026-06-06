import { getParkhouses } from "./script.js";

// MAP INITIALISIERUNG // 
const map = L.map("map").setView([47.5596, 7.5886], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap",
}).addTo(map);

// HILFSFUNKTIONEN FÜR MARKER // 
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

// AUTOMATISCHER START MIT DOPPELSCHUTZ-SPERRE // 
if (window.mapStarted === undefined) {
  window.mapStarted = false;
}

document.addEventListener("DOMContentLoaded", async () => {
  // Verhindert, dass die Marker doppelt gezeichnet werden
  if (window.mapStarted) return;
  window.mapStarted = true;

  try {
    // WICHTIG: "await" wartet, bis die API fertig geladen hat
    const parkhouses = await getParkhouses();
    console.log("Daten für Karte geladen:", parkhouses);

    // MARKER ERSTELLEN
    parkhouses.forEach(p => {
      const color = getColor(p.free);

      L.marker([p.lat, p.lng], {
        icon: createIcon(color)
      })
        .addTo(map)
        .bindPopup(`<b>${p.title}</b><br>Freie Plätze: ${p.free}`);
    });

  } catch (error) {
    console.error("Fehler beim Laden der Parkhäuser für die Karte:", error);
  }
});