class Map {
  constructor({ id, latitude, longitude }) {
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  render() {
    return `
      <section class="geolocation">
        <div class="map" id="${this.id}"></div>
        <div class="coordinates">
          <p id="status"></p>
          <p id="latitude">
            <span data-i18n="lat"></span>
            <span class="latitude-data">${this.latitude}</span>°
          </p>
          <p id="longitude">
            <span data-i18n="lng"></span>
            <span class="longitude-data">${this.longitude}</span>°
          </p>
        </div>
      </section>
    `;
  }
}

export { Map };
