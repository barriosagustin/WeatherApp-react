const WeatherCard = ({ data }) => {
  if (!data) return null;

  const { name, main, weather } = data;

  return (
    <div className="weather-card">
      <h3>{name}</h3>
      <p>Temperature: {parseInt(main.temp - 273.15)}ºC</p>
      <p>Weather condition: {weather[0].description}</p>
      <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
           alt="Weather icon" />
    </div>
  );
};

export default WeatherCard;
