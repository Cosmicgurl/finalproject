function refreshData(response){
   let temperatureElement = document.querySelector(".temperature-weather-app");
   let temperature = response.data.temperature.current;
   let cityElement= document.querySelector(".city-weather-app");
   let descriptionElement=document.querySelector("#description");
   let windspeedElement=document.querySelector("#windspeed");
   let humidityElement=document.querySelector("#humidity");
   let timeElement=document.querySelector("#time");
   let date = new Date(response.data.time * 1000);
   let iconElement = document.querySelector("#icon");

   temperatureElement.innerHTML = Math.round(temperature);
   cityElement.innerHTML = response.data.city;
   descriptionElement.innerHTML = response.data.condition.description;
   windspeedElement.innerHTML =`${response.data.wind.speed} km/h`;
   humidityElement.innerHTML =`${response.data.temperature.humidity} %`;
   timeElement.innerHTML = formatDate(date);
   iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji-weather-app"/>`
 
   getForecast(response.data.city);
}
function formatDate(date){
  let hours = date.getHours();
  let minutes= date.getMinutes();
  let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day= days[date.getDay()];

  if(minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${day} ${hours}:${minutes}, `
}


function searchCity(city) {
    let apiKey = "97bffc05t90b9a4d323obc7a7e7acf4e";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
axios.get(apiUrl).then(refreshData);
}


function handleSearchSubmit(event) {
    event.preventDefault();
let boxInputElement= document.querySelector(".box-input");
searchCity(boxInputElement.value);
}
function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()]
}

function getForecast(city){
  let apiKey = "97bffc05t90b9a4d323obc7a7e7acf4e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  

  let forecastHtml = "";
  
  response.data.daily.forEach(function(day, index) {
    if (index < 5) {
    forecastHtml = forecastHtml +
     ` <div class="col-2">
     <div class="forecast-day"> ${formatDay(day.time)}</div>
    <br/>
    <img src="${day.condition.icon_url}" alt="thunder" class="forcast-icon"/>
    <br>
    <div class="forecast-temp">${Math.round(day.temperature.maximum)}˚ <span class="forecast-temp-min">${Math.round(day.temperature.minimum)}˚</span>
    </div>
    </div>`;}
  } );
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchFromElement = document.querySelector(".search-form");
searchFromElement.addEventListener("submit", handleSearchSubmit);

searchCity("Munich");
