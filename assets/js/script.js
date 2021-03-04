let cityInput = document.querySelector("#city-input");
let searchBtn = document.querySelector("#search-btn");
let searchHistory = document.querySelector("#search-history");
let todayTemp = document.querySelector("#main-temp");
let todayHumidity = document.querySelector("#main-humidity");
let todayWind = document.querySelector("#main-wind");
let todayUV = document.querySelector("#main-uv");
let cityMain = document.querySelector("#main-city");
let mainIconCont = document.querySelector(".main-icon");
let searchHistoryArr = [];
let searchIdCounter = 0;







let getWeatherInfo = function(cityName) {
    let urlApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=bdedcd642abfc700f36dc9fcfcaa5000";
    fetch(urlApi)
    .then(function(response) {
      if (response.ok) {
          response.json().then(function(data) {
              displayWeatherInfo(data);
          });
      }
      else {
          alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather")
    });

};

let displayWeatherInfo = function(weatherData) {
    console.log(weatherData);
    let iconCode = weatherData.weather[0].icon;
    let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
    let mainIcon = document.createElement("img")
    mainIcon.setAttribute('src', iconUrl);
    mainIcon.setAttribute('alt', "Weather icon")
    mainIconCont.appendChild(mainIcon);
    cityMain.textContent = weatherData.name;
    todayTemp.textContent = weatherData.main.temp + ' F';
    todayHumidity.textContent = weatherData.main.humidity + " %";
    todayWind.textContent = weatherData.wind.speed + " miles/hour";
}

let searchInputHandler = function() {
    let citySearch = cityInput.value.trim();

    if (citySearch) {
        getWeatherInfo(citySearch);
        cityInput.value = "";
        mainIconCont.innerHTML="";
    }
    else {
        alert("Please enter a city name.")
    }

    createSearch(citySearch);
};

let createSearch = function(search) {
    searchIdCounter++
    let searchTextEl = document.createElement("p");
    searchTextEl.classList = "alert alert-primary fs-5";
    searchTextEl.setAttribute("data-search-id", searchIdCounter);
    searchTextEl.textContent = search;
    searchHistory.appendChild(searchTextEl);
};

searchBtn.addEventListener("click", searchInputHandler);