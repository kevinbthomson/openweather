import $ from 'jquery';


const endpoint = "http://api.openweathermap.org/data/2.5/forecast?appid=5a47c7954f010f644d95d0ce40de4fa6&units=imperial";

const searchInput = document.querySelector('.search');
const searchForm = document.querySelector('#weather-form');
const currentTemp = document.querySelector('.current-temp-message');
const alert = document.querySelector('.alert-message');

let cityMessage;

function buildForecast(forecast) {
  const tempratures = forecast.list.map(day => {
    return day.main.temp;
  });

  console.log(tempratures);
}

function returnWeather(data) {
  const forecast = data;

  if (forecast.cod === "404") {
    alert.style.display = 'block'
    currentTemp.style.display = 'none';;
  } else {
    alert.style.display = 'none';
    
    const temprature = parseFloat(forecast.list[0].main.temp).toFixed();
    const city = forecast.city.name;
    
    cityMessage = ("The temprature in " + city + " is " + temprature + " Degrees Fahrenheit");

    currentTemp.style.display = 'block';
    currentTemp.textContent = cityMessage;

    buildForecast(forecast);
  }
}

function searchWeather() {
  const val = searchInput.value;

  if (val == '' && val.length < 1) {
    alert.style.display = 'block';
    currentTemp.style.display = 'none';
  } else {
    alert.style.display = 'none';
    currentTemp.style.display = 'block';
    
    const city = '&q=' + val + ',us';
    const weatherSearch = endpoint + city;

    fetch(weatherSearch)
      .then(myBlob => myBlob.json())
      .then(data => returnWeather(data));
  }
}

searchInput.focus();

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  searchWeather();
});