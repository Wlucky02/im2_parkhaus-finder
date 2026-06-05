import { getParkhouses } from "./script.js";

let counter = document.getElementById("freeCount");
let parkingTitle = document.querySelector(".parking-title");


const parkhouses = getParkhouses();

parkhouses.forEach(p => {
    if (p.title == parkingTitle.textContent) {
        counter.innerText = p.free;
    }
});