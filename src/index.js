let dateElement = document.querySelector("#date");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayIndex = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function search(event) {
  console.log({ event });
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "4801008bd454a1660025e22526898e68";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function searchLocation(position) {
  alert(`Your latitude is ${latitude} and your longitude is ${longitude}`);
  let apiKey = "4801008bd454a1660025e22526898e68";
  let apiUrls = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  // position.coords.latitude
  //position.coords.longitude

  axios.get(`${apiUrls}&appid=${apiKey}`).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showWeather(response) {
  let descriptionElement = document.querySelector("#description");
  let percipitationElement = document.querySelector("#percipitation");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  descriptionElement.innerHTML = response.data.weather[0].description;
  percipitationElement.innerHTML = response.data.weather[0].percipitation;
  humidityElement.innerHTML = response.data.weather[0].humidity;
  windElement.innerHTML = response.data.weather[0].wind;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = (32 * 9) / 5 + 32;
}

function CurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPostion);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

dateElement.innerHTML = `${days[dayIndex]} ${hours}: ${minutes}`;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
