import React from 'react';

const WeatherDashboard = ({ weatherData, onAddFavorite, unit }) => {
  if (!weatherData) return null;

  return (
    <div className="weather-dashboard">
      <h2>Weather in {weatherData.city}</h2>
      <p>{weatherData.weather[0].description}</p>
      <p>Temperature: {weatherData.main.temp}° {unit === 'metric' ? 'C' : 'F'}</p>
      <button onClick={() => onAddFavorite(weatherData.city)}>Add to Favorites</button>
    </div>
  );
};

export default WeatherDashboard;
