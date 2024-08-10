import React, { useState } from 'react';
import { FaSearch, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './Main.css';

const Main = ({ onSearch, weatherData, onAddFavorite, onRemoveFavorite, favorites, onToggleUnit, unit }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
    }
  };

  const isFavorite = (city) => {
    return favorites.some(fav => fav.city === city);
  };

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="search-input"
        />
        <button type="submit" className="search-btn">
          <FaSearch /> Search
        </button>
      </form>

      {weatherData && (
        <div className="weather-display">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp} {unit === 'metric' ? '°C' : '°F'}</p>
          <button onClick={() => onToggleUnit()} className="unit-btn">
            Switch to {unit === 'metric' ? 'Imperial' : 'Metric'}
          </button>
          {!isFavorite(weatherData.name) ? (
            <button onClick={() => onAddFavorite(weatherData.name)} className="favorite-btn">
              <FaStar /> Add to Favorites
            </button>
          ) : (
            <button onClick={() => onRemoveFavorite(weatherData.name)} className="favorite-btn">
              <FaStarHalfAlt /> Remove from Favorites
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
