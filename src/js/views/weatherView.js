import {
  elements
} from './base';


export const renderResults = weather => {
  //
  // weather.daily.forEach(renderWeather)
  renderWeather(weather.daily[0])
}

const KELVIN = 273;

export const renderWeather = (weather) => {

  weather.day = new Date(weather.dt * 1000);
  weather.clouds = weather.clouds;
  weather.display = weather.day.toString("");
  weather.today = weather.display.slice(0, 15);
  weather.windSpeed = Math.floor(weather.wind_speed / 0.44704);
  weather.windDirection = weather.wind_deg;
  weather.icon = weather.weather[0].icon;
  weather.description = weather.weather[0].description;
  weather.temp = Math.floor(weather.temp.day - KELVIN);

  const allWeather = [{
    today: weather.today,
    icon: weather.icon,
    temp: weather.temp,
    description: weather.description,
    windSpeed: weather.windSpeed,
    windDirection: weather.windDirection
  }];

  displayDailyWeather(allWeather);

}

export const displayDailyWeather = (allWeather) => {
  console.log(allWeather)
  const markup = `
  <div class="card all-card today-card py-3">
          <div class="card-date">
            <h4 class="card-title text-center py-2">${allWeather[0].today}</h4>
          </div>
          <div class="owi-group text-center py-1">
            <i class="owi owi-4x owi-${allWeather[0].icon}"></i>
          </div>
          <div class="card-body">
            <h4 class="card-text temperature-icon text-center">${allWeather[0].temp}</h4>
            <h4 class="card-text weather-description text-center">${allWeather[0].description}</h4>
            <div class="wind">
              <h4 class="card-text wind-speed text-center">${allWeather[0].windSpeed}</h4>
                <div class="wind-direction" style="transform:rotate(${allWeather[0].windDirection}deg)";><p>&#x2193</p></div>
              </div>
          </div>
        </div>
            </div>`

  elements.todaysWeatherContainer.insertAdjacentHTML('beforeend', markup);
}
