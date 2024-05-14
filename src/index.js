function handleFormElement(event) {
    event.preventDefault();
let boxInputElement= document.querySelector(".box-input");
let cityElement= document.querySelector(".city-weather-app");
cityElement.innerHTML= boxInputElement.value;
}



let searchFromElement = document.querySelector(".search-form");
searchFromElement.addEventListener("submit", handleFormElement)