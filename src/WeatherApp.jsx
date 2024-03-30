import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import WeatherCard from "./WeatherCard";

const WeatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [city, setCity] = useState("");
  const [dataWeather, setDataWeather] = useState(null);
  const [error, setError] = useState(null);
  const [searchedCity, setSearchedCity] = useState("");
  const [citiesWeather, setCitiesWeather] = useState([]);

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      setError("Please enter a city name");
      return;
    }
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`);
      const data = await response.json();
      if (data.cod === "404") {
        setError("City not found");
        setDataWeather(null);
        handleRemoveSearchedCity();
      } else {
        setDataWeather(data);
        setError(null);
        setSearchedCity(city);
        setCity("");
      }
    } catch (error) {
      setError("Failed to fetch data");
      console.log(error);
    }
  };

  const handleRemoveSearchedCity = () => {
    setSearchedCity("");
    setDataWeather(null);
  };

  useEffect(() => {
    const fetchCitiesWeather = async () => {
      const cities = ["New York", "London", "Paris", "Sidney", "Tokyo"];
      const citiesData = await Promise.all(
        cities.map(async (city) => {
          const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`);
          const data = await response.json();
          return data;
        })
      );
      setCitiesWeather(citiesData);
    };
    fetchCitiesWeather();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Weather App</h1>

        <div className="input">
          <form onSubmit={handleSubmit}>
            <input
              className="input-style"
              type="text"
              placeholder="Insert City name"
              value={city}
              onChange={handleChangeCity}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        {error && <p>{error}</p>}
        {searchedCity && (
          <div className="searched-city">
            <WeatherCard data={dataWeather} />
            <button className="close-button" onClick={handleRemoveSearchedCity}>
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </button>
          </div>
        )}
        <h2>Top 5 Cities</h2>
        <div className="weather-cards-horizontal">
          {citiesWeather.map((cityData, index) => (
            <WeatherCard key={index} data={cityData} />
          ))}
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
