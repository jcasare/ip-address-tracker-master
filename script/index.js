const ipInfoDOM = document.querySelector(".ip-info");

var map = L.map("map").setView([5.618030981700304, -0.17613662839527497], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
