import {
  elements
} from './base';


export const renderResults = weather => {

  const hourlyWeather = weather.hourly.splice(0, 24);
  // console.log(hourlyWeather)
  // weather.daily.forEach(renderWeather)
  renderDailyWeather(weather.daily[0]);


  hourlyWeather.forEach(renderHourlyWeather)

}

const KELVIN = 273;

export const renderDailyWeather = (weather) => {

  weather.date = new Date(weather.dt * 1000);
  weather.clouds = weather.clouds;
  weather.display = weather.date.toString("");
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

  const markup = `
  <div class="card all-card today-card py-3">
          <div class="card-date">
            <h4 class="card-title text-center py-2">${allWeather[0].today}</h4>
          </div>
          <div class="owi-group text-center py-1">
            <i class="owi owi-4x owi-${allWeather[0].icon}"></i>
          </div>
          <div class="row card-body">
          <div class="col">
            <h4 class="card-text temperature-icon text-center">${allWeather[0].temp}°C</h4>
            <h4 class="card-text weather-description text-center">${allWeather[0].description}</h4>
            <div class="wind">

                <div class="wind-direction"><p class="text-center" style="transform:rotate(${allWeather[0].windDirection}deg)">&#x2193</p></div>
                  <h4 class="card-text wind-speed text-center">${allWeather[0].windSpeed} mph</h4>
              </div>
              </div>
          </div>
          </div>
        </div>
            </div>`
    if(elements.getGeoElement.classList.contains('d-none')) {
    elements.getGeoElement.classList.remove('d-none');
      elements.todaysWeatherContainer.insertAdjacentHTML('beforeend', markup);

    }
      else {
      return
      }

}
export const renderHourlyWeather = (weather) => {
console.log(weather)
weather.date = new Date(weather.dt * 1000);
weather.hours = weather.date.getHours();
weather.display = weather.date.toString();
weather.today = weather.display.slice(0, 15);
weather.time = weather.display.slice(16, 21)
weather.windSpeed = Math.floor(weather.wind_speed / 0.44704);
weather.windDirection = weather.wind_deg;
weather.icon = weather.weather[0].icon;
weather.description = weather.weather[0].description;
weather.temp = Math.floor(weather.temp - KELVIN);

  const allWeather = [{
    today: weather.today,
    date: weather.date,
    time: weather.hours + ":00",
    icon: weather.icon,
    temp: weather.temp,
    description: weather.description,
    windSpeed: weather.windSpeed,
    windDirection: weather.windDirection
  }];

displayHourlyWeather(allWeather)

}

export const displayHourlyWeather = (weather) => {


    const markup = `
<div class="col-10 mx-auto my-3 col-md-6 col-lg-4">

  <div class="hourly-card d-flex justify-content-center">


    <div class="card all-card hourly-card py-3">
    
            <div class="card-time">
              <h4 class="card-title text-center py-2">${weather[0].time}</h4>
            </div>
            <div class="owi-group text-center py-1">
              <i class="owi owi-4x owi-${weather[0].icon}"></i>
            </div>
            <div class="row card-body">
            <div class="col card-height">
              <h4 class="card-text temperature-icon text-center">${weather[0].temp}°C</h4>
              <h4 class="card-text weather-description text-center">${weather[0].description}</h4>
              <div class="wind">

                  <div class="wind-direction"><p class="text-center" style="transform:rotate(${weather[0].windDirection}deg)">&#x2193</p></div>
                    <h4 class="card-text wind-speed text-center">${weather[0].windSpeed} mph</h4>
                </div>
                </div>
            </div>
            </div>
          </div>
              </div>
                  </div>
                </div>
                    `

                  elements.hourlyWeatherContainer.insertAdjacentHTML('beforeend', markup);

}
