import './background.css';
import { getPhoto } from '../Api/background';

export function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.height);
    img.src = src;
    img.onerror = () => {
      img.src = '../img/background-default.jpg';
    };
  });
}

export function getBackgroud(city, season, day) {
  (async () => {
    const data = await getPhoto(city, season, day);
    await preloadImage(data.urls.regular);

    document.body.style.background = `linear-gradient(180deg, rgba(8, 15, 26, 0.59), rgba(17, 17, 46, 0.46)) 50% fixed, url(${data.urls.regular}) no-repeat 50% fixed`;
    document.body.style.backgroundSize = 'cover';
  })();
}
