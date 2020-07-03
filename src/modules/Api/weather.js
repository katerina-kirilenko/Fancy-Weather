const KEY = '65bf0414f752529b1cc7709ad0a4a48a';

export async function getDataWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&
exclude=minutely,hourly&units=metric&lon=${lon}&appid=${KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return data;
}
