const weatherForm = document.querySelector('.weather-form');
const cityInput= document.querySelector('#city');
const card = document.querySelector('.card');
const apikey = "07b7e031f58f204e2903a42109870f2e";

weatherForm.addEventListener('submit', async event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeather(city);
            displayWeather(weatherData);
        }catch(error){
            console.error('Error fetching weather data:', error);
        }
    }if(!city){
        Derror('Please enter a city name');
        card.style.display = "flex";
    }
})
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

function displayWeather(data) {
    const {name :city ,
        main : {temp, humidity}, 
        weather:[{description , id }]} = data;
        card.textContent = '';
        card.style.display = "flex";
    const cityElement = document.createElement('h2');
    cityElement.textContent = `Weather in ${city}`;
    const tempElement = document.createElement('p');
    tempElement.textContent = `Temperature: ${temp}°C`;
    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${humidity}%`;
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Description: ${description}`;
    const emojiElement = document.createElement('span');
    emojiElement.style.fontSize = '6rem'; 
    emojiElement.textContent = getwether_emoji(id);
    emojiElement.classList.add('emoji');
    card.appendChild(cityElement);
    card.appendChild(tempElement);
    card.appendChild(humidityElement);
    card.appendChild(descriptionElement);
    card.appendChild(emojiElement);
    card.classList.remove('errorDisplay');
    card.classList.add('weatherDisplay');


}
function getwether_emoji(weather) {
    if (weather >= 200 && weather < 300) {
        return '⛈️'; // Thunderstorm
    } else if (weather >= 300 && weather < 500) {
        return '🌧️'; // Drizzle
    } else if (weather >= 500 && weather < 600) {
        return '🌧️'; // Rain
    } else if (weather >= 600 && weather < 700) {
        return '❄️'; // Snow
    } else if (weather >= 700 && weather < 800) {
        return '🌫️'; // Atmosphere
    } else if (weather === 800) {
        return '☀️'; // Clear
    } else if (weather > 800 && weather < 900) {
        return '☁️'; // Clouds
    } else {
        return '❓'; // Unknown weather
    }
}
function Derror(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.classList.add('errorDisplay');
    card.style.display = "flex";
    card.style.visibility = "visible";
    card.innerHTML = '';  
    card.appendChild(errorMessage);
}
