import React, { useEffect, useState } from "react";
import "../index.css";
import Axios from "axios";

export default function CurrentWeather() {
  const [weatherObject, setWeatherObject] = useState(null);
  const API_KEY = "2556cd525f1a4c4667df8b07c7e533c3";
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
  const [temp, setTemp] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [iconURL, setIconURL] = useState("");
  const [feelsLike, setFeelsLike] = useState(0);
  const [city, setCity] = useState("Loading...");

  const getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  useEffect(() => {
    Axios.get("https://api.ipify.org?format=json").then((response) => {
      console.log(response);
      const ip = response.data.ip;
      const key = "90dc43e29b39fa2db367deba74847da5";
      Axios.get(`http://api.ipstack.com/${ip}?access_key=${key}`).then(
        (response) => {
          console.log(response);
          const lat = response.data.latitude;
          const lon = response.data.longitude;
          getWeather(lat, lon);
        }
      );
    });
  }, []);

  const getWeather = (lat, lon) => {
    const url = `${API_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    Axios.get(url)
      .then((response) => {
        console.log(response);
        setWeatherObject(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    console.log(weatherObject);
    if (weatherObject != null) {
      setTemp(weatherObject.main.temp.toFixed(1));
      setFeelsLike(weatherObject.main.feels_like.toFixed(1));
      setMin(weatherObject.main.temp_min.toFixed(1));
      setMax(weatherObject.main.temp_max.toFixed(1));
      setIconURL(
        `http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`
      );
      setCity(weatherObject.name);
    }
  }, [weatherObject]);

  return (
    <div class='w-11/12 md:w-8/12 lg:w-7/12 bg-white bg-opacity-20 shadow-xl border-white border-2 rounded-lg border-opacity-10 h-96 flex flex-col justify-center items-center'>
      <span class='text-4xl pb-8'>{city}</span>
      <span class='text-2xl'>{temp}&#176;F</span>
      <span>
        <img class='h-40' src={iconURL}></img>
      </span>
      <span>Feels Like: {feelsLike}&#176;F</span>
      <span>
        Min:{min} Max: {max}
      </span>
    </div>
  );
}
