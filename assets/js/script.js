let cityInput = document.querySelector("#city-input");
let searchBtn = document.querySelector("#search-btn");
let searchHistory = document.querySelector("#search-history");
let todayTemp = document.querySelector("#main-temp");
let todayHumidity = document.querySelector("#main-humidity");
let todayWind = document.querySelector("#main-wind");
let todayUV = document.querySelector("#main-uv");
let cityMain = document.querySelector("#main-city");
let mainIconCont = document.querySelector(".main-icon");
let searchHistoryArr = JSON.parse(localStorage.getItem("history")) || [];
let searchIdCounter = 0;

tomorrow = moment().add(1, 'd').format("M/D/YY");
day2 = moment().add(2, 'd').format("M/D/YY");
day3 = moment().add(3, 'd').format("M/D/YY");
day4 = moment().add(4, 'd').format("M/D/YY");
day5 = moment().add(5, 'd').format("M/D/YY");








let getWeatherInfo = function(cityName) {
    let urlApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=bdedcd642abfc700f36dc9fcfcaa5000";
    fetch(urlApi)
    .then(function(response) {
      if (response.ok) {
          response.json().then(function(data1) {
              let latitude = data1.coord.lat;
              let longitude = data1.coord.lon;

              fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=bdedcd642abfc700f36dc9fcfcaa5000")
              .then(function(response){
                  response.json().then(function(data){
                      displayWeatherInfo(data1, data);
                  })
              })
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

let displayWeatherInfo = function(weatherData, dailyData) {
    console.log(weatherData);
    console.log(dailyData);
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
    todayUV.textContent = dailyData.current.uvi;


    // tomorrow
    $("#card-1").children(".card-body").children(".card-date").text(tomorrow);
    $("#card-1").children(".card-body").children(".card-temp").text("Temp: " + dailyData.daily[1].temp.day + " F");
    $("#card-1").children(".card-body").children(".card-humidity").text("Humidity: " + dailyData.daily[1].humidity + " %");
    $("#card-1").children(".card-body").children(".card-humidity")
    // Day2
    $("#card-2").children(".card-body").children(".card-date").text(day2);
    $("#card-2").children(".card-body").children(".card-temp").text("Temp: " + dailyData.daily[2].temp.day + " F");
    $("#card-2").children(".card-body").children(".card-humidity").text("Humidity: " + dailyData.daily[2].humidity + " %");
    // Day3
    $("#card-3").children(".card-body").children(".card-date").text(day3);
    $("#card-3").children(".card-body").children(".card-temp").text("Temp: " + dailyData.daily[3].temp.day + " F");
    $("#card-3").children(".card-body").children(".card-humidity").text("Humidity: " + dailyData.daily[3].humidity + " %");
    // Day4
    $("#card-4").children(".card-body").children(".card-date").text(day4);
    $("#card-4").children(".card-body").children(".card-temp").text("Temp: " + dailyData.daily[4].temp.day + " F");
    $("#card-4").children(".card-body").children(".card-humidity").text("Humidity: " + dailyData.daily[4].humidity + " %");
    // Day5
    $("#card-5").children(".card-body").children(".card-date").text(day5);
    $("#card-5").children(".card-body").children(".card-temp").text("Temp: " + dailyData.daily[5].temp.day + " F");
    $("#card-5").children(".card-body").children(".card-humidity").text("Humidity: " + dailyData.daily[5].humidity + " %");

    if (todayUV.textContent <= 2 && todayUV.textContent < 3) {
        todayUV.classList.add("green");
        todayUV.classList.remove("red");
        todayUV.classList.remove("yellow");
    };
    if (todayUV.textContent >= 3 && todayUV.textContent <= 5) {
        todayUV.classList.add("yellow");
        todayUV.classList.remove("green");
        todayUV.classList.remove("red");
    };
    if (todayUV.textContent > 5) {
        todayUV.classList.add("red");
        todayUV.classList.remove("yellow");
        todayUV.classList.remove("green");
    };
};

let searchInputHandler = function() {
    let citySearch = cityInput.value.trim();

    if (citySearch) {
        getWeatherInfo(citySearch);
        cityInput.value = "";
        mainIconCont.innerHTML="";
        searchHistoryArr.push(citySearch);
    }
    else {
        alert("Please enter a city name.")
    }

    createSearch(citySearch);
};

let createSearch = function(search) {
    searchIdCounter++
    let searchTextEl = document.createElement("p");
    searchTextEl.classList = "alert alert-primary fs-5 history-button";
    searchTextEl.setAttribute("data-search-id", searchIdCounter);
    searchTextEl.textContent = search;
    searchHistory.appendChild(searchTextEl);
    localStorage.setItem("history", JSON.stringify(searchHistoryArr));
};

let loadSearch = function() {
    for (let i = 0; i < searchHistoryArr.length; i++) {
    let searchTextEl = document.createElement("p");
    searchTextEl.classList = "alert alert-primary fs-5 history-button";
    searchTextEl.setAttribute("data-search-id", searchIdCounter);
    searchTextEl.textContent = searchHistoryArr[i];
    searchHistory.appendChild(searchTextEl);
    }
}

searchBtn.addEventListener("click", searchInputHandler);


loadSearch();

$("#search-history").on("click", "p", function(){
    let cityName = $(this).text().trim();
    let urlApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=bdedcd642abfc700f36dc9fcfcaa5000";
    fetch(urlApi)
    .then(function(response) {
      if (response.ok) {
          response.json().then(function(data1) {
              let latitude = data1.coord.lat;
              let longitude = data1.coord.lon;

              fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=bdedcd642abfc700f36dc9fcfcaa5000")
              .then(function(response){
                  response.json().then(function(data){
                      mainIconCont.innerHTML="";
                      displayWeatherInfo(data1, data);
                  })
              })
          });
      }
      else {
          alert("Error: " + response.statusText);
      }
    })
    
    .catch(function(error) {
        alert("Unable to connect to OpenWeather")
    });
});
