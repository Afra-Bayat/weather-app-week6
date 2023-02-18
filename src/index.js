//updating date and time
function updatingTime(date) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[currentTime.getDay()];
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth() + 1;
    let dates = currentTime.getDate();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let currentWeekday = document.querySelector("#weekday");
    currentWeekday.innerHTML = day;
    let currentDate = document.querySelector("#date");
    currentDate.innerHTML = `${year}/${month}/${dates}`;
    let currentminutes = document.querySelector("#minutes");
    if (minutes > 9) {
        currentminutes.innerHTML = minutes;
    } else {
        currentminutes.innerHTML = `0${minutes}`;
    }
    let currentHours = document.querySelector("#time");
    let currentDaytime = document.querySelector("#daytime");
    if (hours > 12 && hours - 12 > 10) {
        currentHours.innerHTML = hours - 12;
        currentDaytime.innerHTML = "pm";
    } else if (hours > 12 && hours - 12 <= 9) {
        currentHours.innerHTML = `0${hours - 12}`;
        currentDaytime.innerHTML = "pm";
    } else if (hours < 9) {
        currentHours.innerHTML = `0${hours}`;
        currentDaytime.innerHTML = "am";
    } else {
        currentHours.innerHTML = hours;
        currentDaytime.innerHTML = "am";
    }
}
let currentTime = new Date();
updatingTime(currentTime);

//updating weather
function predictCurrentweather(response) {
    let currentWeather = document.querySelector("header .current-weather");
    currentWeather.innerHTML = response.data.weather[0].description;
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    let highTemp = document.querySelector("#high-temp");
    highTemp.innerHTML = Math.round(response.data.main.temp_max);
    let lowTemp = document.querySelector("#low-temp");
    lowTemp.innerHTML = Math.round(response.data.main.temp_min);
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = Math.round(response.data.main.humidity);
    let feelingTemp = document.querySelector("#feeling-temp");
    feelingTemp.innerHTML = Math.round(response.data.main.feels_like);
    let city = document.querySelector(".city-name");
    city.innerHTML = response.data.name;
}

//updating heading
function updatingHeading(event) {
    event.preventDefault();
    let cityEntry = document.querySelector("#city-entry");
    let city = document.querySelector(".city-name");
    city.innerHTML = cityEntry.value;
    let apiKey = "d84bc80a567f5fbbdba41bbd38db2736";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let unit = "metric";
    let cityLocation = cityEntry.value;
    axios
        .get(`${apiEndpoint}?q=${cityLocation}&appid=${apiKey}&units=${unit}`)
        .then(predictCurrentweather);
}
let locationEntryForm = document.querySelector("#city-enquery-form");
locationEntryForm.addEventListener("submit", updatingHeading);

//changing temperature unit
let fahrenheitTemp = document.querySelector("#fahrenheit-icon");
let celsiusTemp = document.querySelector("#celsius-icon");
let currentTemp = document.querySelector("#current-temp");
document
    .querySelectorAll("#fahrenheit-icon, #celsius-icon")
    .forEach(function(button) {
        button.addEventListener("click", function(e) {
            if (button === fahrenheitTemp) {
                currentTemp.innerHTML = 37;
            } else {
                currentTemp.innerHTML = 3;
            }
        });
    });

//predicting current location weather
function predictionCurrentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "d84bc80a567f5fbbdba41bbd38db2736";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let unit = "metric";
    axios
        .get(`${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`)
        .then(predictCurrentweather);
}

function showPosition(event) {
    event.preventDefault;
    navigator.geolocation.getCurrentPosition(predictionCurrentLocation);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showPosition);