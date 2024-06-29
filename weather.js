let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

// to get the actual country name
const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

// to get the date and time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
  // console.log(curDate);
  // // const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  // console.log(formatter);
  return formatter.format(curDate);
};
let lat = 30.6243;
let long= 74.8769;
const successCallback = (position) => {
  // console.log(position);
  lat = position.coords.latitude;
  long = position.coords.longitude;
  getWeatherData();
  // console.log(lat,long)

  
};

const errorCallback = (error) => {
  // console.log(error);
  cityName.innerHTML = `Search A city name or enable location`;
};

// console.log(lat,long)

let city = "amritsar";

// search functionality
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityName = document.querySelector(".city_name");
  // console.log(cityName.value);
  city = cityName.value;

  getWeatherSearchData();

  cityName.value = "";
});

const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a0615e84540f7da07787c01ffdf2b475`;
  
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    // console.log(data);

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
    // console.log(weather[0].main);
    if (weather[0].main == "Clouds") {
      document.body.style.backgroundImage = `url("https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`;
      // console.log("done");
    }else if(weather[0].main == "Smoke"){
      document.body.style.backgroundImage = `url("https://images.pexels.com/photos/1287080/pexels-photo-1287080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`;
    }else if(weather[0].main == "Rain"){
      document.body.style.backgroundImage = `url("https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`;
    }else if(weather[0].main == "Clear"){
      document.body.style.backgroundImage = `url("https://images.pexels.com/photos/6775276/pexels-photo-6775276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`;
    }
    

    w_temperature.innerHTML = `${main.temp}&#176`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
    w_maxTem.innerHTML = `Min: ${main.temp_max.toFixed()}&#176`;

    w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log(error);
  }
};
const getWeatherSearchData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0615e84540f7da07787c01ffdf2b475`;
  
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    // console.log(data);

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
    if (weather[0].main == "Clouds") {
      document.body.style.backgroundImage = `url("https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`;
      // console.log("done");
    }else if(weather[0].main == "Smoke"){
      document.body.style.backgroundImage = `url("https://images.pexels.com/photos/1287080/pexels-photo-1287080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`;
    }else if(weather[0].main == "Rain"){
      document.body.style.backgroundImage = `url("https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`;
    }else if(weather[0].main == "Clear"){
      document.body.style.backgroundImage = `url("https://images.pexels.com/photos/6775276/pexels-photo-6775276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`;
    }
    
    w_temperature.innerHTML = `${main.temp}&#176`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
    w_maxTem.innerHTML = `Min: ${main.temp_max.toFixed()}&#176`;

    w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load", navigator.geolocation.getCurrentPosition(successCallback, errorCallback));