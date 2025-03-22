import './style.css';
const cityInput = document.querySelector('.input');
const wrapper = document.querySelector('.app');
const submitButton = document.querySelector('.button');

const renderWeatherData = async () => {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityInput.value}?key=2Z9MPADCAXK9BNDNAFH4XZDRX`
  );
  const weatherData = await response.json();
  const location = weatherData.resolvedAddress;
  const temperature = Math.round(
    (weatherData.currentConditions.temp - 32) / 1.8
  );

  const dataBlock = document.createElement('div');
  dataBlock.classList.add('weather__block');

  const tempWrapper = document.createElement('div');
  tempWrapper.classList.add('temp__wrapper');

  const locationText = document.createElement('h2');
  locationText.classList.add('weather__heading');

  const temperatureText = document.createElement('p');
  temperatureText.classList.add('weather__temp');

  const icon = document.createElement('img');
  icon.classList.add('weather__icon');
  icon.src = `./src/icons/${weatherData.currentConditions.icon}.svg`;

  tempWrapper.append(temperatureText, icon);
  dataBlock.append(locationText, tempWrapper);

  locationText.innerText = `Weather in ${location}`;
  temperatureText.innerText = `${temperature}°C`;
  if (document.querySelector('.weather__block')) {
    document.querySelector('.weather__block').remove();
    wrapper.append(dataBlock);
  } else {
    wrapper.append(dataBlock);
  }
};

submitButton.addEventListener('click', renderWeatherData);
