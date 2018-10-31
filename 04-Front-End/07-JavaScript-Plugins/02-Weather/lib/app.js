const API_KEY = '7cae54b659bd5361b8e7bb9973d5a412';

const icon = document.getElementById('icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const city = document.getElementById('city');

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${API_KEY}`)
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    temperature.innerText = `${Math.round(data.main.temp) - 273}°C`;
    description.innerText = data.weather[0].description;
    city.innerText = data.name;
  });
