import {
  elements
} from './base';



export const renderResults = weather => {

  const hourlyWeather = weather.hourly.splice(0, 24);

  // weather.daily.forEach(renderWeather)
  renderWeather(weather.daily[0]);


  // hourlyWeather.forEach(renderHourlyWeather);
  hourlyWeather.forEach(renderWeather);

}

const KELVIN = 273;

let indexOf6AM = false;

export const renderWeather = (weather, i) => {



  weather.date = new Date(weather.dt * 1000);
  weather.hours = weather.date.getHours();
  weather.clouds = weather.clouds;
  weather.string = weather.date.toString("");
  weather.today = weather.string.slice(0, 15);
  weather.time = weather.string.slice(16, 21);
  weather.windSpeed = Math.floor(weather.wind_speed / 0.44704);
  weather.windDirection = weather.wind_deg;
  weather.icon = weather.weather[0].icon;
  weather.description = weather.weather[0].description;
  weather.todayTemp = Math.floor(weather.temp.day - KELVIN);
  weather.temp = Math.floor(weather.temp - KELVIN);
  weather.sunrise = new Date(weather.sunrise * 1000);
  weather.sunriseString = weather.sunrise.toString("");
  weather.sunriseTime = weather.sunriseString.slice(15, 21);
  weather.sunset = new Date(weather.sunset * 1000);
  weather.sunsetString = weather.sunset.toString("");
  weather.sunsetTime = weather.sunsetString.slice(16, 21);


  const allWeather = [{
    today: weather.today,
    date: weather.date,
    time: weather.time,
    icon: weather.icon,
    todayTemp: weather.todayTemp,
    temp: weather.temp,
    description: weather.description,
    windSpeed: weather.windSpeed,
    windDirection: weather.windDirection,
    sunset: weather.sunsetTime,
    sunrise: weather.sunriseTime
  }];
  // if i is undefined - this is the daily weather to be displayed on the daily
  // card, else it is the hourly weather (i = 0 > 23) from the forEach method to
  // be displayed on the Carousel;
  isNaN(i) ? displayDailyWeather(allWeather) : displayCarousel(allWeather, i);
}


export const displayDailyWeather = (weather, i) => {

  const markup = `

   <div class="card all-card today-card py-3">
          <div class="card-date">
            <h4 class="card-title text-center py-2">${weather[0].today}</h4>
          </div>
          <div class="owi-group text-center py-1">
            <i class="owi owi-4x owi-${weather[0].icon}"></i>
          </div>
          <div class="row card-body">
          <div class="col">
            <h4 class="card-text temperature-icon text-center">${weather[0].todayTemp}°C</h4>
            <h4 class="card-text weather-description text-center">${weather[0].description}</h4>
            <div class="wind">
  <h4 class="card-text wind-speed text-center">
  <span>
  <i class="fas fa-wind text-center" alt="wind_symbol">
  </i>
  ${weather[0].windSpeed} mph
  </span>
  </h4>
                <div class="wind-direction"><p class="text-center" style="transform:rotate(${weather[0].windDirection}deg)">&#x2193</p></div>


              </div>
              </div>
          </div>
          </div>
          </div>
          </div>
      `

  const sunTimes = `

         <div class="card sun-card py-3">

                <div class="row card-body">
                <div class="col">
                  <h4 class="card-text temperature-icon text-center">Sunrise <i class="wi wi-sunrise"></i>${weather[0].sunrise}</h4>

                </div>
                  <div class="col">
                    <h4 class="card-text weather-description text-center">Sunset <i class="wi wi-sunset"></i> ${weather[0].sunset}</h4>
                  </div>

                </div>
            `
  if (elements.getGeoElement.classList.contains('d-none')) {
    elements.getGeoElement.classList.remove('d-none');
    elements.todaysWeatherContainer.insertAdjacentHTML('beforeend', markup);
    elements.todaysSunriseContainer.insertAdjacentHTML('beforeend', sunTimes);

  } else {
    return
  }

}

export const displayCarousel = (weather, i) => {

  let carouselActive = '';

  carouselActive = (i === 0) ? 'carousel-item active' : 'carousel-item';

  const markup = `


  <div class="${carouselActive} col-12 col-sm-6 col-md-4 col-lg-3">

<div class="img-fluid mx-auto d-block">

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
  <h4 class="card-text wind-speed text-center">
  <span>
  <i class="fas fa-wind text-center" alt="wind_symbol">
  </i>
  ${weather[0].windSpeed} mph
  </span>
  </h4>
                  <div class="wind-direction"><p class="text-center" style="transform:rotate(${weather[0].windDirection}deg)">&#x2193</p></div>

                </div>
                </div>
            </div>
            </div>
          </div>
              </div>
                  </div>
                </div>

  </div>`

  //display only the hourly weather until 6am for today

  if (weather[0].time === "07:00") {
    indexOf6AM = true;
  }

  if (!indexOf6AM) {
    elements.carouselContainer.insertAdjacentHTML('beforeEnd', markup);

  }





}
