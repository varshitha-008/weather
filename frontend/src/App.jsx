import React, { useState, useEffect } from 'react';
import Main from './components/Main';
import WeatherDashboard from './components/WeatherDashboard';
import FiveDayForecast from './components/FiveDayForecast';
import FavoritesList from './components/FavoritesList';
// import './components/App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState(localStorage.getItem('unit') || 'metric');
  const [lastSearchedCity, setLastSearchedCity] = useState(localStorage.getItem('lastSearchedCity') || '');

  useEffect(() => {
    fetch('https://weather-3-44kv.onrender.com/favorites')
      .then((response) => response.json())
      .then((data) => setFavorites(data || []))
      .catch((error) => console.error('Error fetching favorites:', error));

    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
  }, [lastSearchedCity]);

  // const handleSearch = async (city) => {
  //   const apiKey = '5ab224be174208d5ebda0aa9f35a2f72'; // Your API key
  //   const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
  //   try {
  //     const response = await fetch(apiUrl);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setWeatherData(data.list[0]); 
  //     setForecastData(data.list.slice(1, 6).map(item => ({
  //       date: new Date(item.dt * 1000).toLocaleDateString(),
  //       temp: item.main.temp,
  //       weather: item.weather[0].main,
  //       icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
  //     })));
  //     localStorage.setItem('lastSearchedCity', city);
  //   } catch (error) {
  //     console.error('Error fetching weather data:', error);
  //     setWeatherData(null);
  //     setForecastData([]);
  //   }
  // };


  const handleSearch = async (city) => {
    const apiKey = '5ab224be174208d5ebda0aa9f35a2f72'; // Your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData({
        ...data.list[0],
        city: data.city.name // Store the city name in weatherData
      });
      setForecastData(data.list.slice(1, 6).map(item => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temp: item.main.temp,
        weather: item.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
      })));
      setLastSearchedCity(city); // Save the last searched city
      localStorage.setItem('lastSearchedCity', city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setForecastData([]);
    }
  };


  const addFavorite = (city) => {
    fetch('https://weather-3-44kv.onrender.com/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city, id: Date.now() }) 
    })
      .then((response) => response.json())
      .then((data) => {
        setFavorites((prevFavorites) => [...prevFavorites, data]);
      })
      .catch((error) => console.error('Error adding favorite:', error));
  };

  const removeFavorite = (city) => {
    const favoriteToRemove = favorites.find(fav => fav.city === city);
    if (favoriteToRemove) {
      fetch(`https://weather-3-44kv.onrender.com/favorites/${favoriteToRemove.id}`, {
        method: 'DELETE'
      })
        .then(() => {
          setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== favoriteToRemove.id));
        })
        .catch((error) => console.error('Error removing favorite:', error));
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    localStorage.setItem('unit', newUnit);
    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
  };

  return (
    <div className="App">
      <Main
        onSearch={handleSearch}
      />
      <WeatherDashboard
        weatherData={weatherData}
        onAddFavorite={addFavorite}
        onRemoveFavorite={removeFavorite}
        favorites={favorites}
        unit={unit}
        onToggleUnit={toggleUnit}
      />
      {lastSearchedCity && (
        <FiveDayForecast forecastData={forecastData} unit={unit} />
      )}
      <FavoritesList
        favorites={favorites}
        onRemoveFavorite={removeFavorite}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default App;
