var searchFormEL = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var currentWeather = document.querySelector('.current-weather');
var cityName = document.querySelector('.city-name');
var temp = document.querySelector('#temp');
var windSpeed = document.querySelector('.wind-speed');
var humidity = document.querySelector('#humidity');
var forecast = document.querySelector('.forecast');
var forecastContainer = document.querySelector('#forecast-container');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var citySearch = cityInputEl.value.trim();

  if (citySearch) {
    console.log(citySearch);
    getCityCoordinates(citySearch);

  } else {
    alert('Please enter a valid city name.');
  }
};

var getCityCoordinates = function (cityName) {
  var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d50b5cd718f93a672cf5ded5abca6de9&units=imperial`
  console.log("here");
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          getCurrentWeather(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to get city coordinates');
    });
};

var getCurrentWeather = function (data) {
  console.log(data);
  var lat = data.coord.lat
  var lon = data.coord.lon
  getForecast(lat, lon)
  cityName.textContent = data.name;
  temp.textContent = `temp: ${data.main.temp} degrees`;
  windSpeed.textContent = `wind: ${data.wind.speed} mph`;
  // console.log(data.list[0].wind.speed);
  humidity.textContent = `humidity: ${data.main.humidity}%`;

};

var getForecast = function (lat, lon) {
  // var apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d50b5cd718f93a672cf5ded5abca6de9&units=imperial`
  var apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d50b5cd718f93a672cf5ded5abca6de9&units=imperial`
  console.log("here");
  fetch(apiUrl)
    // .then(function (response) {
    //   if (response.ok) {
    //     response.json().then(function (data) {
    //       getFiveDay(data);
    //     });
    //   } else {
    //     alert('Error: ' + response.statusText);
    //   }
    // })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      return getFiveDay(data)
    })
    .catch(function (error) {
      alert('Unable to get forecast');
    });
};

var getFiveDay = function (data) {
  console.log("Forecast data:", data);
  // var currentTime = data.list.dt_txt.split(" ")[1].split(":")[0]
  for (var i = 0; i < data.list.length; i += 8) {
    var htmlCard = `
    <div class="five-day-weather">
    <h2 class="city-name">Date: ${data.list[i].dt_txt.split(" ")[0]}</h2>
      <p id="temp">Temp: ${data.list[i].main.temp} degrees</p>
      <p class="wind-speed">Wind:  ${data.list[i].wind.speed} mph</p>
      <p id="humidity">Humidity: ${data.list[i].main.humidity}%</p>
    </div>
    `
    var htmlEl = document.createElement('section')
    htmlEl.innerHTML = htmlCard
    forecastContainer.appendChild(htmlEl)
    // console.log(data.list[i]);
    // var tempFive = document.createElement('p');
    // var windSpeedFive = document.createElement('p');
    // var humidityFive = document.createElement('p');
    // tempFive.textContent = `temp: ${data.list[i].main.temp} degrees`;
    // windSpeedFive.textContent = `wind: ${data.list[i].wind.speed} mph`;
    // humidityFive.textContent = `humidity: ${data.list[i].main.humidity}%`;
    // forecastContainer.append(tempFive);
    // forecastContainer.append(windSpeedFive);
    // forecastContainer.append(humidityFive);
  }
};


searchFormEL.addEventListener("submit", formSubmitHandler);

// TODO: save previous city searches to local storage
// style cards
// style search area



