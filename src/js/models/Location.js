export default class Location {

  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;

  }

  async getLocation() {

    const key = "f6b43829a6dea90e8fcf07d58ccf2766";

    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${key}`;

    await fetch(api)

      .then(response => response.json())

      .then(data => {
        this.name = data.name;
        this.country = data.sys.country;

      })

      .catch(err => {
        alert(err);
      });

  }
}
