const ipInfoDOM = document.querySelector(".ip-info");

const submitBtn = document.querySelector(".submit-btn");
var mymap = L.map("map").setView([5.618030981700304, -0.17613662839527497], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mymap);

// map.on("click", async (e) => {
//   try {
//   } catch (error) {}
// });
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const ipInput = document.querySelector(".ip-input").value;

  try {
    const { data } = await axios.get(`/api/v1/getApiKey?ipAddress=${ipInput}`);
    const apiKey = data.apiKey;

    const { data: geoData } = await axios.get(`
https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipInput}
`);
    const lat = geoData.location.lat;
    const lng = geoData.location.lng;
    console.log(geoData);
    mymap.setView([lat, lng]);
    const marker = L.marker([lat, lng]).addTo(mymap);
  } catch (error) {
    console.log(error);
  }
});
