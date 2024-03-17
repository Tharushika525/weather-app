//---------------------CURRENT LOCATION-------------------

let latitude;
let longitude;


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function showLocation(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  searchLocation(latitude + "," + longitude);




}
getLocation()
function searchInput() {
  let searchValue = document.getElementById("searchTxt").value;
  searchLocation(searchValue)
}







//----------------------CURRENT DETAILS-----------------------
function searchLocation(searchValue) {

  let reop = {
    method: 'GET'
  };
  console.log(searchValue);
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=6d203a6eea184286be395957240703&q=${searchValue}&aqi=yes&alerts=yes  `, reop)

    .then(response => response.json())
    .then(data => {
      console.log(data);
      longitude = data["location"]["lon"]
      latitude = data["location"]["lat"]
      console.log(longitude);
      console.log(latitude);
      iniMap(latitude, longitude);






      document.getElementById("temp").innerHTML = data["current"]["temp_c"] + "°C ";
      document.getElementById("cloudy").innerHTML = data["current"]["condition"]["text"];
      document.getElementById("country").innerHTML = data["location"]["country"];
      document.getElementById("img").src = data["current"]["condition"]["icon"];
      document.getElementById("location").innerHTML = data["location"]["tz_id"];
      document.getElementById("name").innerHTML = data["location"]["name"];
      document.getElementById("humidity").innerHTML = data["current"]["humidity"];
      document.getElementById("wind").innerHTML = data["current"]["wind_kph"];
      document.getElementById("region").innerHTML = data["location"]["region"];
      document.getElementById("lon").innerHTML = data["location"]["lon"];
      document.getElementById("lat").innerHTML = data["location"]["lat"];







      //----------------------------FORECAST---------------------------
      const startDate = new Date(`${data.forecast.forecastday[0].date}`);
      let currentDate = new Date(startDate);

      for (let i = 0; i < 7; i++) {
        const formatDate = currentDate.toISOString().split('T')[0];

        fetch(`https://api.weatherapi.com/v1/forecast.json?key=6d203a6eea184286be395957240703&q=${searchValue}&dt=${formatDate}`)
          .then(response => response.json())
          .then(data => {
            document.getElementById(`Date${i + 1}`).innerHTML = `${data.forecast.forecastday[0].date}`;
            document.getElementById(`Temp${i + 1}`).innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c} °C`;
            document.getElementById(`Image${i + 1}`).src = `${data.forecast.forecastday[0].day.condition.icon}`;
            document.getElementById(`Cloudy${i + 1}`).innerHTML = `${data.forecast.forecastday[0].day.condition.text}`;


          })
          .catch(error => {
            console.error("Error:", error);
          });

        currentDate.setDate(currentDate.getDate() + 1);
      }







      const dateNow = new Date();
      dateNow.setDate(dateNow.getDate() - 1);


      for (let i = 7; i >= 1; i--) {



        const dateString = dateNow.toLocaleDateString();

        fetch(`https://api.weatherapi.com/v1/history.json?key=6d203a6eea184286be395957240703&q=${searchValue}&dt=${dateString}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            document.getElementById(`DAte${i}`).innerHTML = `${data.forecast.forecastday[0].date}`;
            document.getElementById(`TEmp${i}`).innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c} °C`;
            document.getElementById(`IMage${i}`).src = `${data.forecast.forecastday[0].day.condition.icon}`;
            document.getElementById(`CLoudy${i}`).innerHTML = `${data.forecast.forecastday[0].day.condition.text}`;



          })
          .catch(error => {
            console.error("Error:", error);
          });

        dateNow.setDate(dateNow.getDate() - 1);
      }
      (error => console.log("error", error));
    });

};





//--------------------------CURRENT TIME------------------------
function updateLocalTime() {
  const localTimeElement = document.getElementById("local-time");
  const now = new Date();
  const localTimeString = now.toLocaleTimeString();

  localTimeElement.textContent = `${localTimeString}`;
}

updateLocalTime();

setInterval(updateLocalTime, 1000);



//---------------------------CURRENT DATE---------------------------
function updateLocalDate() {
  const localDateElement = document.getElementById("local-date");
  const now = new Date();
  const localDateString = now.toLocaleDateString();

  localDateElement.textContent = `${localDateString}`;
}

updateLocalDate();

setInterval(updateLocalDate, 1000);














//--------------------------MAP---------------------------

var map;
function iniMap(latitude, longitude) {
  if (map) {

    map.remove();
  }
  map = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  var marker = L.marker([latitude, longitude]).addTo(map);
}