import { convertDayName, convertTemp, convertFahrenheit } from './utils';
import { state, restoreState } from '../state';

restoreState();

class Forecast {
  constructor({ id, forecastData }) {
    this.id = id;
    this.day = convertDayName(forecastData.dt);
    this.t =
      state.degree === '°C'
        ? convertTemp(forecastData.temp)
        : convertFahrenheit(convertTemp(forecastData.temp));
    this.deg = state.degree;
    this.icon = forecastData.weather[0].icon;
    this.description = forecastData.weather[0].description;
  }

  render() {
    return `
      <div class="forecast" id="${this.id}">
        <div>
          <p class="forecast-day">
            <span data-i18n="day['${this.day}']"></span>
            ${this.day}
          </p>
          <p class="forecast-temperature">
            <span class="degree-t">${this.t}</span>
            <span class="degree-icon">${this.deg}</span>
          </p>
        </div>
        <img class="forecast-icon"
          alt="${this.description}"
          title="${this.description}"
          src="https://openweathermap.org/img/wn/${this.icon}@2x.png">
      </div>
    `;
  }
}

export { Forecast };
