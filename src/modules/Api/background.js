const KEY = 'AbAnjPfqAlOnhjx4aXwsJRX9yc7HxIv1_Qpkp4jee70';

export async function getPhoto(city, season, day) {
  const url = `https://api.unsplash.com/photos/random/?orientation=landscape&per_page=1&query={${city},${season},${day}&client_id=${KEY}`;
  console.log('Запрос на фон:', city, season, day);

  const res = await fetch(url);
  const data = await res.json();

  return data;
}
