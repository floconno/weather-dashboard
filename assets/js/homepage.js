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
  var apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d50b5cd718f93a672cf5ded5abca6de9&units=imperial`
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
  cityName.textContent = data.city.name;
  temp.textContent = `temp: ${data.list[0].main.temp} degrees`;
  windSpeed.textContent = `wind: ${data.list[0].wind.speed} mph`;
  console.log(data.list[0].wind.speed);
  humidity.textContent = `humidity: ${data.list[0].main.humidity}%`;

};

var getForecast = function (cityName) {
  var apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d50b5cd718f93a672cf5ded5abca6de9&units=imperial`
  console.log("here");
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          getFiveDay(data);
        });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
    .catch(function (error) {
      alert('Unable to get forecast');
    });
};

var getFiveDay = function (data) {
  console.log("Forecast data:", data);
  for (var i = 0; i < data.list.length; i += 8) {
    var tempFive = document.createElement('p');
    var windSpeedFive = document.createElement('p');
    var humidityFive= document.createElement('p');
    tempFive.textContent = `temp: ${data.list[i].main.temp} degrees`;
    windSpeedFive.textContent = `wind: ${data.list[i].wind.speed} mph`;
    humidityFive.textContent = `humidity: ${data.list[i].main.humidity}%`;
    forecastContainer.append(tempFive);
    forecastContainer.append(windSpeedFive);
    forecastContainer.append(humidityFive);
  }
};


searchFormEL.addEventListener("submit", formSubmitHandler);





