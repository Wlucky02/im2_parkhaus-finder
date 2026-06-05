import { getParkhouses } from "./script.js";

const parkhouses = getParkhouses();

/* =========================
   KACHELN
========================= */

const grid = document.getElementById("parkingGrid");

const links = {
  "Bad. Bahnhof": "bad_bahnhof.html",
  "Messe": "messe.html",
  "Storchen": "storchen.html",
  "Centralbahn": "centralbahn.html",
  "Rebgasse": "rebgasse.html",
  "Elisabethen": "elisabethen.html",
  "City": "city.html",
  "Steinen": "steinen.html",
  "Clarahuus": "clarahuus.html", 
  "Claramatte": "claramatte.html", 
  "Post Basel": "post.html", 
  "Kunstmuseum": "kunstmuseum.html", 
  "Bahnhof Süd": "bahnhof_sued.html", 
  "Anfos": "anfos.html", 
  "Aeschen": "aeschen.html", 
};

parkhouses.forEach((parkhaus) => {

  const card = document.createElement("div");

  card.classList.add("card");

  const pageLink = links[parkhaus.title];

  if (pageLink) {

    card.innerHTML = `

      <a href="${pageLink}" class="card-link">

        <img src="${parkhaus.image}" alt="${parkhaus.title}">

        <h3>${parkhaus.title}</h3>

        <p class="free">
          ${parkhaus.free} Plätze frei
        </p>

      </a>

      <button class="nav-btn">
        <i class="fa-solid fa-location-dot"></i>
        Navigation
      </button>

    `;

  } else {

    card.innerHTML = `

      <img src="${parkhaus.image}" alt="${parkhaus.title}">

      <h3>${parkhaus.title}</h3>

      <p class="free">
        ${parkhaus.free} Plätze frei
      </p>

      <button class="nav-btn">
        <i class="fa-solid fa-location-dot"></i>
        Navigation
      </button>

    `;
  }

  const button = card.querySelector(".nav-btn");

  button.addEventListener("click", () => {
    window.open(parkhaus.map, "_blank");
  });

  grid.appendChild(card);

});

/* =========================
   TOP 5
========================= */

const sorted = [...parkhouses]
  .sort((a, b) => b.free - a.free)
  .slice(0, 5);

const table = document.getElementById("topTable");

sorted.forEach((item, index) => {

  const colorClass =
    index < 3 ? "rank-green" : "rank-orange";

  const row = document.createElement("tr");

  row.innerHTML = `

     <td data-label="Parkhaus">
      <span class="rank ${colorClass}">
        ${index + 1}. ${item.title}
      </span>
    </td>

    <td data-label="Freie Plätze">
    ${item.free}</td>

    <td data-label="Navigation">
      <button class="route-btn">
        <i class="fa-solid fa-location-dot"></i>
        zur Navigation
      </button>
    </td>

  `;

  const routeButton = row.querySelector(".route-btn");

  routeButton.addEventListener("click", () => {
    window.open(item.map, "_blank");
  });

  table.appendChild(row);

});


