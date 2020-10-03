import {
  elements
} from './base';



export const renderResults = weather => {

  const hourlyWeather = weather.hourly.splice(0, 24);

  // weather.daily.forEach(renderWeather)
  renderWeather(weather.daily[0]);

  //
  // hourlyWeather.forEach(renderHourlyWeather);
hourlyWeather.forEach(renderWeather);

}

const KELVIN = 273;

let indexOf6AM = false;

export const renderWeather = (weather, i) => {

  weather.date = new Date(weather.dt * 1000);
  weather.hours = weather.date.getHours();
  weather.clouds = weather.clouds;
  weather.display = weather.date.toString("");
  weather.today = weather.display.slice(0, 15);
  weather.time = weather.display.slice(16, 21)
  weather.windSpeed = Math.floor(weather.wind_speed / 0.44704);
  weather.windDirection = weather.wind_deg;
  weather.icon = weather.weather[0].icon;
  weather.description = weather.weather[0].description;
  weather.todayTemp = Math.floor(weather.temp.day - KELVIN);
  weather.temp = Math.floor(weather.temp - KELVIN);



  const allWeather = [{
        today: weather.today,
        date: weather.date,
        time: weather.time,
        icon: weather.icon,
        todayTemp: weather.todayTemp,
        temp: weather.temp,
        description: weather.description,
        windSpeed: weather.windSpeed,
        windDirection: weather.windDirection
  }];

  displayDailyWeather(allWeather);

  displayCarousel(allWeather, i);

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

                <div class="wind-direction"><p class="text-center" style="transform:rotate(${weather[0].windDirection}deg)">&#x2193</p></div>
                  <h4 class="card-text wind-speed text-center">${weather[0].windSpeed} mph</h4>
              </div>
              </div>
          </div>
          </div>
        </div>
            </div>`
  if (elements.getGeoElement.classList.contains('d-none')) {
    elements.getGeoElement.classList.remove('d-none');
    elements.todaysWeatherContainer.insertAdjacentHTML('beforeend', markup);

  } else {
    return
  }

}

export const displayCarousel = (weather, i) => {

  let carouselActive = '';

  if (i === 0) {
    carouselActive = 'carousel-item active'
  } else {
    carouselActive = 'carousel-item'
  }

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

  </div>`

  if (weather[0].time === "07:00") {
    indexOf6AM = true;
  }


  if(!indexOf6AM) {
    elements.carouselContainer.insertAdjacentHTML('beforeEnd', markup);

  }





}
