import React from 'react';
import { FaPlus } from 'react-icons/fa';
import './WeatherDashboard.css';

const WeatherDashboard = ({ weatherData, onAddFavorite, unit }) => {
  if (!weatherData) return null;

  return (
    <div className="weather-dashboard">
      <h2>Weather in {weatherData.city}</h2>
      <p className="description">{weatherData.weather[0].description}</p>
      <p className="temperature">Temperature: {weatherData.main.temp}° {unit === 'metric' ? 'C' : 'F'}</p>
      <button className="add-favorite-btn" onClick={() => onAddFavorite(weatherData.city)}>
        <FaPlus className="icon" /> Add to Favorites
      </button>
    </div>
  );
};

export default WeatherDashboard;
