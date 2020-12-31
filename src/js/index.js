import Location from './models/Location';
import Weather from './models/Weather';
import * as locationView from './views/locationView';
import * as weatherView from './views/weatherView';
import {
  elements
} from './views/base';

window.addEventListener('load', () => elements.preloaderElement.classList.add('hidePreloader'));

const state = {};

const allElements = [elements.startElement, elements.todayElement, elements.hourlyElement, elements.weeklyElement];

window.s = state;

let preloaderActivate = function() {
  if (elements.getGeoElement.classList.contains('d-none')) {
    elements.preloaderElement.classList.remove('hidePreloader');
    elements.startElement.classList.add('hidePreloader');
  }
  allElements.forEach(element => element.removeEventListener("click", preloaderActivate));
}

let handler = function getGeoLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    elements.notificationElement.style.display = "block";
    elements.notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>"
  }

  allElements.forEach(element => element.removeEventListener('click', handler));
}

allElements.forEach(element => element.addEventListener("click", handler))
allElements.forEach(element => element.addEventListener("click", preloaderActivate));

//Set users position
let latitude;
let longitude;


function setPosition(position) {

  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  controlLocation(latitude, longitude);
  controlWeather(latitude, longitude);

}

function showError(err) {
  elements.notificationElement.style.display = "block";
  elements.notificationElement.innerHTML = `<h3 class="text-center" style="color:red"> ${err.message} Check internet connection</h3>`;
}

const apiKey = "f6b43829a6dea90e8fcf07d58ccf2766";

const controlLocation = async () => {
  //   create new location object and add it to state
  if (latitude, longitude) {

    state.location = new Location(latitude, longitude);

    window.l = state.location

    try {

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${state.location.latitude}&lon=${state.location.longitude}&appid=${apiKey}`;

      await state.location.getData(api);

      locationView.renderLocation(state.location.data);


    } catch (err) {
      alert("Location " + err.message)
    }
  }
}


const controlWeather = async () => {
  //create new weather object and save it to state
  if (latitude, longitude) {
    state.weather = new Weather(latitude, longitude);
    window.w = state.weather;

    try {

      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${state.weather.latitude}&lon=${state.weather.longitude}&appid=${apiKey}`;

      await state.weather.getData(api);

      weatherView.renderResults(state.weather.data)
      elements.preloaderElement.classList.add('hidePreloader');
      elements.startElement.classList.remove('hidePreloader');
      document.querySelector('.today').scrollIntoView();


    } catch (err) {
      alert("Weather " + err.message)
    }
  }
}
