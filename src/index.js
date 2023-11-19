function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElemenet = document.querySelector("#humidity");
  let windSpeedElement=document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time*1000);
  let iconElement = document.querySelector("#icon");
 
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML=response.data.condition.description;
  humidityElemenet.innerHTML=`${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML=`${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  timeElement.innerHTML=formatDate(date);
  iconElement.innerHTML = `<img src="${response.condition.icon_url}"class="current-temperature-icon"/>`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "2a13dab699cc2d0f4bde9703343t9bo8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
