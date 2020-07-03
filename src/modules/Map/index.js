import './map.css';
import { Map } from './Map';
import { getWeather } from '../Weather/index';
import { state } from '../state';
import { translate } from '../Translations/index';

export const user = {};
let inputSearch = '';

function createMapDom(coordinates) {
  const map = new Map({
    id: 'map',
    latitude: coordinates[0],
    longitude: coordinates[1],
  });

  document.querySelector('main').insertAdjacentHTML('beforeend', map.render());
  translate(state.lang);
}

function updateMapDom(coordinates) {
  const [ lng, ltd ] = coordinates;
  document.querySelector('.latitude-data').innerText = lng;
  document.querySelector('.longitude-data').innerText = ltd;
}

function init() {
  function createMap(coordinates) {
    return new window.ymaps.Map(
      'map',
      {
        center: coordinates,
        zoom: 12,
        controls: [inputSearch, 'zoomControl'],
      },
      {
        searchControlProvider: 'yandex#search',
      }
    );
  }

  window.ymaps.geolocation
    .get({
      mapStateAutoApply: true,
    })
    .then(
      (result) => {
        user.address = result.geoObjects.get(0).properties.get('text');
        user.coordinates = result.geoObjects.get(0).geometry.getCoordinates();

        createMapDom(user.coordinates);
        createMap(user.coordinates);
        getWeather(user);
      },
      (err) => {
        document.querySelector('#status').innerHTML = `Error: ${err}`;
      }
    );

  inputSearch = new window.ymaps.control.SearchControl({
    options: {
      size: 'small',
    },
  });
}

window.ymaps.ready(init);

function search(event) {
  event.preventDefault();

  const valueSearch = document.querySelector('.search-block input').value;

  inputSearch.search(valueSearch).then(() => {
    const geoObjectsArray = inputSearch.getResultsArray();
    if (geoObjectsArray.length) {
      user.address = geoObjectsArray[0].properties.get('address');
      user.coordinates = geoObjectsArray[0].geometry.getCoordinates();
      updateMapDom(user.coordinates);
      document.querySelector('#weather').innerHTML = '';
      getWeather(user);
    }
  });
}

document.querySelector('#search-form').addEventListener('submit', search);
