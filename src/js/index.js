import Location from './models/Location';
import Weather from './models/Weather';
import * as locationView from './views/locationView';
import * as weatherView from './views/weatherView';
import {elements} from './views/base';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import "core-js/stable";
// import "regenerator-runtime/runtime";


window.addEventListener('load', () => elements.preloaderElement.classList.add('hidePreloader'));

const state = {};


window.s = state;

//Check if browser supports geolocation

elements.startElement.addEventListener("click", () => getGeoLocation());

function getGeoLocation() {

if ("geolocation" in navigator) {
console.log("geolocation" in navigator)
  navigator.geolocation.getCurrentPosition(setPosition, showError);

} else {
  elements.notificationElement.style.display = "block";
  elements.notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>"
}
}




//Set users position
let latitude;
let longitude;


  function setPosition(position) {

  if(elements.getGeoElement.classList.contains('d-none')) {
  elements.getGeoElement.classList.remove('d-none');
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  controlLocation(latitude, longitude);
  controlWeather(latitude, longitude);
}
  else {
    return
  }
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


      // weatherView.renderWeather(state)

    } catch (err) {
      alert("Weather " + err.message)
    }
  }
}
