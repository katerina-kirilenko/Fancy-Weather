import { EN, RU, BE } from './translations';
import { state, restoreState } from '../state';

export function translate(langID) {
  const elementsToTranslate = document.querySelectorAll('[data-i18n]');

  restoreState();
  let langCurrent = state.lang;

  if (langID === 'en') {
    langCurrent = EN;
  } else if (langID === 'ru') {
    langCurrent = RU;
  } else if (langID === 'be') {
    langCurrent = BE;
  }

  elementsToTranslate.forEach((item) => {
    const element = item;
    if (langCurrent[element.dataset.i18n]) {
      element.textContent = langCurrent[element.dataset.i18n];
    }
    if (element.dataset.i18n === 'placeholder') {
      element.setAttribute('placeholder', langCurrent[element.dataset.i18n]);
    }
  });
}
