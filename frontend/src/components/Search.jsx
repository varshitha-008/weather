import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity('');  // Clear the input after search
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
