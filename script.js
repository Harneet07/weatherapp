const mainParent = document.querySelector('#mainParent');
const cityInput = document.querySelector('#cityInput');
const searchBtn = document.querySelector('#searchBtn');

function fetchWeather(city) {
  if (!city) return;

  mainParent.innerHTML = '';

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9ce99eb542470b1b396021455c7b3db0&units=metric`)
    .then((response) => {
      const data = response.data;
      const temp = data.main.temp;
      const feelsLike = data.main.feels_like;
      const humidity = data.main.humidity;
      const weather = data.weather[0].main;
      const description = data.weather[0].description;
      const windSpeed = data.wind.speed;
      const cityName = data.name;
      const country = data.sys.country;

      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

      const weatherCard = document.createElement('div');
      weatherCard.className = 'weather-card';

      weatherCard.innerHTML = `
        <h2>📍 ${cityName}, ${country}</h2>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
        <p><strong>Condition:</strong> ${weather} (${description})</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        <p><strong>Sunrise:</strong> ${sunrise}</p>
        <p><strong>Sunset:</strong> ${sunset}</p>
      `;

      mainParent.appendChild(weatherCard);
      cityInput.value = '';
    })
    .catch(() => {
      mainParent.innerHTML = "<p style='color:red;'>City not found or something went wrong 😢</p>";
    });
}

searchBtn.addEventListener('click', () => {
  fetchWeather(cityInput.value.trim());
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    fetchWeather(cityInput.value.trim());
  }
});
