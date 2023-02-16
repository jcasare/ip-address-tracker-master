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
    const ipData = geoData.ip;
    const ipLocation = geoData.location.city;
    const ipTimezone = geoData.location.timezone;
    const ipIsp = geoData.isp;
    console.log(geoData);

    const markerIcon = L.icon({
      iconUrl: "./images/icon-location.svg",
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
    });
    const marker = L.marker([lat, lng], { icon: markerIcon }).addTo(mymap);
    mymap.setView([lat, lng]);

    ipInfoDOM.innerHTML = `
      <div class ="ip-address info-item">
        <h4>IP ADDRESS</h4>
        <p>${ipData}</p>
      </div>
      <div class = "ip-location info-item">
        <h4>LOCATION</h4>
        <p>${ipLocation}</p>
      </div>
      <div class = "ip-timezone info-item">
        <h4>TIMEZONE</h4>
        <p>${ipTimezone}</p>
      </div>
      <div class = "ip-isp info-item">
        <h4>ISP</h4>
        <p>${ipIsp}</p>
      </div>
    `;
  } catch (error) {
    console.log(error);
  }
});
