import './weather.css';
import { Weather } from './Weather';
import { getDataWeather } from '../Api/weather';
import { Forecast } from './Forecast';
import { clockStart } from './utils';
import { updateBackgroud } from '../ControlPanel/index';
import { state } from '../state';
import { translate } from '../Translations/index';

const main = document.createElement('main');
document.querySelector('#ctrl-panel').after(main);

function addWeatherLocation(address) {
  const location = address.split(',').reverse().join(', ');
  document.querySelector('.weather-location').innerHTML = `${location}`;
}

function addWeatherToDom(data) {
  const weather = new Weather({
    id: 'weather',
    weatherData: data,
  });

  document
    .querySelector('main')
    .insertAdjacentHTML('afterbegin', weather.render());

  clockStart();
  translate(state.lang);
}

function getForecastToDom(forecast) {
  for (let i = 1; i <= 3; i += 1) {
    const forecastWeather = new Forecast({
      id: `day-${i}`,
      forecastData: forecast[i],
    });

    document
      .querySelector('.weather-three-days')
      .insertAdjacentHTML('beforeend', forecastWeather.render());
  }
}

function getWeather(user) {
  (async () => {
    const data = await getDataWeather(user.coordinates[0], user.coordinates[1]);

    addWeatherToDom(data.current);
    addWeatherLocation(user.address);
    getForecastToDom(data.daily);
    updateBackgroud(); 
  })();
}

export { getWeather };
