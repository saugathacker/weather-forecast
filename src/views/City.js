import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function City() {
  const [search, setSearch] = useState("");
  const API_KEY = "2556cd525f1a4c4667df8b07c7e533c3";
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
  const [weatherObject, setWeatherObject] = useState(null);
  const [temp, setTemp] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [iconURL, setIconURL] = useState("");
  const [feelsLike, setFeelsLike] = useState(0);
  const [city, setCity] = useState("Loading...");
  const [showResult, setShowResult] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const onSearch = () => {
    const url = `${API_URL}q=${search}&appid=${API_KEY}&units=imperial`;
    setSearchError(false);
    setShowResult(false);

    Axios.get(url)
      .then((response) => {
        console.log(response);
        console.log("here");
        setWeatherObject(response.data);
      })
      .catch((err) => {
        console.log("errhere");
        setSearchError(true);
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
      setShowResult(true);
    }
  }, [weatherObject]);

  const result = (
    <div class='w-11/12 md:w-8/12 lg:w-7/12 mt-20 bg-white bg-opacity-20 shadow-xl border-white border-2 rounded-lg border-opacity-10 h-96 flex flex-col justify-center items-center'>
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

  return (
    <div class='w-11/12 md:w-8/12 lg:w-7/12 flex flex-col justify-start items-center'>
      <div class='w-11/12 bg-white bg-opacity-20 shadow-xl border-white border-2 rounded-lg border-opacity-10 h-40 flex flex-col justify-start items-center p-4'>
        <label class='mt-4'>City Search</label>
        <input
          class='mt-2 text-black pl-2 w-3/4 md:w-72'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
        <button
          class='border-white border-2 rounded-lg mt-2 px-2 bg-purple-400 hover:bg-purple-300'
          onClick={onSearch}>
          Search
        </button>
      </div>
      {searchError ? (
        <span class='text-red-800 text-xs text-center'>
          !PLEASE ENTER A VALID CITY
        </span>
      ) : (
        ""
      )}
      {showResult ? result : null}
    </div>
  );
}
