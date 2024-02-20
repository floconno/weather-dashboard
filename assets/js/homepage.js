var searchFormEL = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var forecastContainerEl = document.querySelector('#forecast-container');
var fiveDayForecast = document.querySelector('#five-day-forecast');

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var citySearch = cityInputEl.value.trim();
  
    if (citySearch) {
      getCityWeather(citySearch);
  
      forecastContainerEl.textContent = '';
      cityInputEl.value = '';
    } else {
      alert('Please enter a valid city name.');
    }
  };


  