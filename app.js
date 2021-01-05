const textAr = document.getElementById("city");
const button = document.getElementById("submission");
const weatherDisplay = document.getElementById("display-weather");
const image = document.getElementById("gif");

async function weatherAPI(city) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=719e2e4484f216eea5360251af143581&units=metric`
    );

    const currentWeather = await res.json();
    const weatherTemp = Math.floor(currentWeather.main.temp);
    const weatherType = currentWeather.weather[0].main;
    const cityName = currentWeather.name;
    const country = currentWeather.sys.country;
    const weatherComplete = [cityName, country, weatherTemp, weatherType];

    return weatherComplete;
}

async function updateDisplay() {
    let city = textAr.value;
    const callGif = await getSimpsonGif();
    const callWeather = await weatherAPI(city);
    weatherDisplay.innerHTML = callWeather;
    image.src = callGif;
}

async function getSimpsonGif() {
    let typeOfWeather = await weatherAPI(textAr.value);

    const giphyAPI = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${typeOfWeather[3]}&api_key=lNzNrV0L3XhtLAkQe47x5yy389MSkWph&limit=11`
    );

    let test = await giphyAPI.json();

    let randomGif = Math.floor(Math.random() * 10);
    let test2 = test.data[randomGif].images.original.url;
    return test2;
}

button.addEventListener("click", updateDisplay);