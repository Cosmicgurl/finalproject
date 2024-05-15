function refreshData(response){
   let temperatureElement = document.querySelector(".temperature-weather-app");
   let temperature = response.data.temperature.current;
   let cityElement= document.querySelector(".city-weather-app");
   cityElement.innerHTML= response.data.city;
   temperatureElement.innerHTML = Math.round(temperature);
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

let searchFromElement = document.querySelector(".search-form");
searchFromElement.addEventListener("submit", handleSearchSubmit);

searchCity("Munich");