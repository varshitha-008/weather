import React, { useState } from 'react';

const Favorites = ({ favorites = [], onAdd, onRemove }) => {
  const [newCity, setNewCity] = useState('');

  const handleAdd = () => {
    if (newCity.trim() !== '') {
      onAdd(newCity);
      setNewCity('');
    }
  };

  return (
    <div className="favorites">
      <h3>Favorite Cities</h3>
      <ul>
        {favorites.map((fav, index) => (
          <li key={index}>
            {fav.city}
            <button onClick={() => onRemove(fav.city)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newCity}
        onChange={(e) => setNewCity(e.target.value)}
        placeholder="Add a city"
      />
      <button onClick={handleAdd}>Add to Favorites</button>
    </div>
  );
};

export default Favorites;
