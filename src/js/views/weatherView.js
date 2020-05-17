import { elements} from './base';

export const renderResults = weather => {

weather.daily.forEach(renderWeather)

}

const KELVIN = 273;

export const renderWeather = (weather) => {

  weather.day = new Date(weather.dt * 1000);
  weather.clouds = weather.clouds;
  weather.display = weather.day.toString("");
  weather.today = weather.display.slice(0, 15);
  weather.windSpeed = Math.floor(weather.wind_speed / 0.44704);
  weather.windDirection = weather.wind_deg

  weather.temp = Math.floor(weather.temp.day - KELVIN);


  const markup = `

    <div class="container">

      <div class="date"><p>${weather.today}</p></div>

      <div class="weather-container">

        <div class="weather-icon"><img src="img/${weather.weather[0].icon}.png" alt=""></div>

        <div class="temperature-value"><p>${weather.temp}°<span>C</span></p></div>

        <div class="temperature-description"><p>${weather.weather[0].description}</p></div>

          <div class="wind-speed"><p> Wind Speed ${weather.windSpeed} mph</p></div>
          <div class="wind-direction" style="transform:rotate(${weather.windDirection}deg)";><p>&#x2193</p></div>
      </div>
  `
  elements.weatherContainer.insertAdjacentHTML('beforeend', markup);
}
