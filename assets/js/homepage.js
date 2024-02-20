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

  var getCityCoordinates = function (coordinates) {
    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInputEl}&limit=1&appid=9f1308e7de8b872120cfd60501fcdbcb`
    console.log(results);

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    getCityWeather(data, coordinates);
                });
            }   else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to get city coordinates');
        });
  };

  
  
  