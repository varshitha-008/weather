import React from 'react';

const WeatherDisplay = ({ data }) => {
  return (
    <div className="weather-display">
      <h2>{data.city}</h2>
      <p>Temperature: {data.temp}°C</p>
      <p>Condition: {data.condition}</p>
      {/* Add more weather details as needed */}
    </div>
  );
};

export default WeatherDisplay;
