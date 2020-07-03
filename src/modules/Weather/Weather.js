import { convertDate, convertFahrenheit } from './utils';
import { state, restoreState } from '../state';

restoreState();
class Weather {
  constructor({ id, weatherData }) {
    this.id = id;
    this.date = convertDate(weatherData.dt);
    this.t =
      state.degree === '°C'
        ? Math.round(weatherData.temp)
        : convertFahrenheit(weatherData.temp);
    this.deg = state.degree;
    this.icon = weatherData.weather[0].icon;
    this.description = weatherData.weather[0].description;
    this.weatherID = weatherData.weather[0].id;
    this.feelsLike =
      state.degree === '°C'
        ? Math.round(weatherData.feels_like)
        : convertFahrenheit(weatherData.feels_like);
    this.wind = weatherData.wind_speed.toFixed(1);
    this.humidity = weatherData.humidity;
  }

  render() {
    return `
      <div class="weather-wrap" id="${this.id}">
        <p class="weather-location"></p>
        <div class="weather-date-time">
          <p id="date">${this.date}</p>
          <p id="clock"></p>
        <section class="weather-today">
          <p class="weather-temperature-today">
            <span class="degree-t">${this.t}</span>
            <span class="degree-icon">${this.deg}</span>
          </p>
          <div class="weather-description">
            <img class="weather-icon"
              alt="${this.description}"
              title="${this.description}"
              src="https://openweathermap.org/img/wn/${this.icon}@2x.png">
            <p data-i18n="weather['${this.weatherID}']">${this.description}</p>
            <p>
              <span data-i18n="feel"></span>
              <span class="degree-t">${this.feelsLike}</span>
              <span class="degree-icon">${this.deg}</span>
            </p>
            <p>
              <span data-i18n="wind"></span>
              ${this.wind}
              <span data-i18n="ms"></span>
            </p>
            <p>
              <span data-i18n="humidity"></span>
              ${this.humidity}%
            </p>
          </div>
        </section>
        <section class="weather-three-days"></section>
      </div>
    `;
  }
}

export { Weather };
