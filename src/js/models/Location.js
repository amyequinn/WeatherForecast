export default class Location {

  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;

  }

  async getData(api) {

    await fetch(api)

      .then(response => response.json())

      .then(data => {
        this.data = data

      })

      .catch(err => {
        alert(err);
      });

  }
}
