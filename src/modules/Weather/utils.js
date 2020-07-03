import { EN, RU, BE } from '../Translations/translations';
import { state, restoreState } from '../state';

restoreState();
let lang = '';

if (state.lang === 'en') {
  lang = EN;
} else if (state.lang === 'ru') {
  lang = RU;
} else if (state.lang === 'be') {
  lang = BE;
}

const daysNames = lang.day;
const monthsNames = lang.month;

function convertDayName(date) {
  let dayName = '';

  const dayNumber = new Date(date * 1000).getDay();
  for (let i = 0; i < daysNames.length; i += 1) {
    if (dayNumber === i) {
      dayName = daysNames[i];
    }
  }
  return dayName;
}

function convertTemp(temp) {
  const t = Math.round((temp.day + temp.night) / 2);
  return t;
}

function convertFahrenheit(temp) {
  return ((+temp * 9) / 5 + 32).toFixed(0);
}

function convertDate(timestamp) {
  const newDate = new Date();

  let month = '';
  const monthNumber = newDate.getMonth();
  for (let i = 0; i < monthsNames.length; i += 1) {
    if (monthNumber === i) {
      month = monthsNames[i].slice(0, 3);
    }
  }

  const dayNameS = convertDayName(timestamp).slice(0, 3);
  const day = `${newDate.getDate()}`.slice(-2);

  const date = `${dayNameS} ${day} ${month}`;
  return date;
}

function updateTime() {
  const clock = document.getElementById('clock');

  const date = new Date();

  let hours = date.getHours();
  if (hours < 10) hours = `0${hours}`;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = `0${seconds}`;
  clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function clockStart() {
  setInterval(updateTime, 1000);
  updateTime();
}

export {
  convertDayName,
  convertTemp,
  convertDate,
  convertFahrenheit,
  clockStart,
};
