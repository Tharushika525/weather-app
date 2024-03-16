document.getElementById("searchBtn").addEventListener('click',() =>{
    let searchValue=document.getElementById("searchTxt").value;
      let reop={
          method:'GET'
      };
  
      fetch(`http://api.weatherapi.com/v1/forecast.json?key=6d203a6eea184286be395957240703&q=${searchValue}`,reop)
      .then(responce=>responce.json())
      .then(data =>{
          console.log(data);
  
          document.getElementById("temp").innerHTML=data["current"]["temp_c"]+"°C ";
          document.getElementById("cloudy").innerHTML=data["current"]["condition"]["text"];
          document.getElementById("country").innerHTML=data["location"]["country"];
          document.getElementById("img").src=data["current"]["condition"]["icon"];
          document.getElementById("location").innerHTML=data["location"]["tz_id"];
          document.getElementById("name").innerHTML=data["location"]["name"];
          document.getElementById("humidity").innerHTML=data["current"]["humidity"];
          document.getElementById("wind").innerHTML=data["current"]["wind_kph"];
          document.getElementById("region").innerHTML=data["location"]["region"];
          document.getElementById("lon").innerHTML=data["location"]["lon"];
          document.getElementById("lat").innerHTML=data["location"]["lat"];
          
        
    
    

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
                        document.getElementById(`Image${i + 1}`).src =`${data.forecast.forecastday[0].day.condition.icon}`;
                       document.getElementById(`Cloudy${i + 1}`).innerHTML = `${data.forecast.forecastday[0].day.condition.text}`;
                    
  
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
  
                currentDate.setDate(currentDate.getDate() + 1);
            }
          




  
            const startDates = new Date(`${data.forecast.forecastday[0].date}`);
            let currentDates = new Date(startDates);
  
            for (let i = 7; i >= 1; i--) {
  
              const formatDates = currentDates.toISOString().split('T')[0];
  
              fetch(`https://api.weatherapi.com/v1/forecast.json?key=6d203a6eea184286be395957240703&q=${searchValue}&dt=${formatDates}`)
                  .then(response => response.json())
                  .then(data => {
                    document.getElementById(`DAte${i}`).innerHTML = `${data.forecast.forecastday[0].date}`
                    document.getElementById(`TEmp${i}`).innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c} °C`;
                    document.getElementById(`IMage${i}`).src = `${data.forecast.forecastday[0].day.condition.icon}`;
                    document.getElementById(`CLoudy${i}`).innerHTML = `${data.forecast.forecastday[0].day.condition.text}`;
                    
  
  
                  })
                  .catch(error => {
                      console.error("Error:", error);
                  });
  
              currentDates.setDate(currentDates.getDate() - 1);
          }
        (error => console.log("error", error));
      });
  
  });
  
  
  
 
  
  
  
  
  
 
    
  
  

  
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





               //---------------------CURRENT LOCATION-------------------
let latitude;
let longitude;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  fetchWeatherData(latitude + "," + longitude);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  marker = L.marker([latitude, longitude]).addTo(map);
  marker.setLatLng([latitude, longitude]).update();
  map.setView([latitude, longitude]);

  const geoApiUrl =`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

  $.ajax({
    method: "GET",
    url: geoApiUrl,
    success: (resp) => {
      console.log("====================================");
      console.log(resp);
      console.log("====================================");
    },
  });
}
  