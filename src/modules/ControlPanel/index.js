import './control.panel.css';
import { ControlPanel } from './ControlPanel';
import { getBackgroud } from '../Background/index';
import { state, saveState, restoreState } from '../state';
import { translate } from '../Translations/index';

const panel = new ControlPanel({
  id: 'ctrl-panel',
});
document.body.insertAdjacentHTML('afterbegin', panel.render());
translate(state.lang);

document.querySelector('.language-bar').addEventListener('click', (event) => {
  state.lang = event.target.id;
  saveState();
  translate(event.target.id);

  const en = document.querySelector('#en');
  const ru = document.querySelector('#ru');
  const be = document.querySelector('#be');

  if (event.target.id === 'en') {
    en.classList.add('active');
    ru.classList.remove('active');
    be.classList.remove('active');
  } else if (event.target.id === 'ru') {
    en.classList.remove('active');
    ru.classList.add('active');
    be.classList.remove('active');
  } else if (event.target.id === 'be') {
    en.classList.remove('active');
    ru.classList.remove('active');
    be.classList.add('active');
  }
});

const fahrenheit = document.querySelector('#fahrenheit');
const celsius = document.querySelector('#celsius');

function degreeConversion(event) {
  const degreeT = document.querySelectorAll('.degree-t');

  if (event.target.id === 'fahrenheit' && state.degree !== '°F') {
    fahrenheit.classList.add('active');
    celsius.classList.remove('active');

    degreeT.forEach((item) => {
      const temp = item;
      temp.innerText = Math.round((+temp.innerText * 9) / 5 + 32);
    });

    state.degree = event.target.innerText;
    saveState();
  } else if (event.target.id === 'celsius' && state.degree !== '°C') {
    fahrenheit.classList.remove('active');
    celsius.classList.add('active');

    degreeT.forEach((item) => {
      const temp = item;
      temp.innerText = Math.round(((+temp.innerText - 32) * 5) / 9);
    });

    state.degree = event.target.innerText;
    saveState();
  }

  const degreeIcons = document.querySelectorAll('.degree-icon');

  degreeIcons.forEach((item) => {
    const deg = item;
    deg.innerText = state.degree;
  });
}

const degrees = document.querySelector('.degrees');
degrees.addEventListener('click', (event) => {
  degreeConversion(event);
});

document.addEventListener('DOMContentLoaded', () => {
  restoreState();

  if (state.degree === '°F') {
    fahrenheit.classList.add('active');
    celsius.classList.remove('active');
  }
});

export function updateBackgroud() {
  const city = document
    .querySelector('.weather-location')
    .innerText.split(',')[0]
    .toLowerCase();

  const currentDay = new Date();

  const month = currentDay.getMonth();
  let season = '';

  if (month <= 1 || month === 11) {
    season = 'winter';
  } else if (month <= 4) {
    season = 'spring';
  } else if (month <= 7) {
    season = 'summer';
  } else if (month <= 10) {
    season = 'autumn';
  }

  const hour = currentDay.getHours();
  let day = '';

  if (hour < 6 || hour > 17) {
    day = 'night';
  } else {
    day = 'day';
  }

  getBackgroud(city, season, day);
}

document.querySelector('.button-update').addEventListener('click', () => {
  updateBackgroud();
});
