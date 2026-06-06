import { getParkhouses } from "./script.js";

document.addEventListener("DOMContentLoaded", async () => {
  const counter = document.getElementById("freeCount");
  const parkingTitle = document.querySelector(".parking-title");

  // Sicherheitsüberprüfung, falls die Elemente im HTML fehlen
  if (!counter || !parkingTitle) {
    console.error("HTML-Elemente wurden nicht gefunden!");
    return;
  }

  // Den Namen des Parkhauses aus dem HTML auslesen (z.B. "Aeschen")
  const currentName = parkingTitle.textContent.trim();
  console.log("Suche Live-Daten für:", currentName);

  try {
    // WICHTIG: "await" wartet, bis die API fertig geladen hat!
    const parkhouses = await getParkhouses();

    // Suchen nach dem passenden Parkhaus im geladenen Array
    const found = parkhouses.find(p => p.title.toLowerCase() === currentName.toLowerCase());

    if (found) {
      counter.innerText = found.free;
      console.log(`Erfolgreich aktualisiert: ${found.free} freie Plätze.`);
    } else {
      console.warn(`Parkhaus "${currentName}" wurde in den API-Daten nicht gefunden.`);
    }

  } catch (error) {
    console.error("Fehler beim Laden der Live-Daten:", error);
  }
});