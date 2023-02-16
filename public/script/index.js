const ipInfoDOM = document.querySelector(".ip-info");

const submitBtn = document.querySelector(".submit-btn");
var map = L.map("map").setView([5.618030981700304, -0.17613662839527497], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// map.on("click", async (e) => {
//   try {
//   } catch (error) {}
// });
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const ipInput = document.querySelector(".ip-input");
  const ip = ipInput.value;
  try {
    const { data } = await axios.get(`
https://geo.ipify.org/api/v2/country,city?apiKey=at_UgFcn8VwEXSkJUcH66EVPl4XhqRSW&ipAddress=${ip}
`);
  } catch (error) {
    console.log(error);
  }
});
