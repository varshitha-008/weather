import React from 'react';
import { FaCloud, FaSun, FaSnowflake, FaWind, FaCloudRain } from 'react-icons/fa';
import './FiveDayForecast.css';

const getWeatherIcon = (weather) => {
  switch (weather) {
    case 'Clear':
      return <FaSun />;
    case 'Clouds':
      return <FaCloud />;
    case 'Snow':
      return <FaSnowflake />;
    case 'Rain':
      return <FaCloudRain />;
    case 'Wind':
      return <FaWind />;
    default:
      return <FaCloud />;
  }
};

const FiveDayForecast = ({ forecastData, unit }) => {
  if (!forecastData.length) {
    return <div className="no-data">No forecast data available. Please search for a city.</div>;
  }

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-cards">
        {forecastData.map((forecast, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-icon">
              {getWeatherIcon(forecast.weather)}
            </div>
            <p className="forecast-date">{forecast.date}</p>
            <p className="forecast-weather">{forecast.weather}</p>
            <p className="forecast-temp">
              Temp: {forecast.temp} {unit === 'metric' ? '°C' : '°F'}
            </p>
            <img src={forecast.icon} alt={forecast.weather} className="forecast-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;
