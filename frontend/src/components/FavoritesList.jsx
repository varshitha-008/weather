import React from 'react';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import './FavoritesList.css';

const FavoritesList = ({ favorites, onRemoveFavorite, onSearch }) => {
  return (
    <div className="favorites-container">
      <h3>Your Favorites</h3>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-card">
              <div className="favorite-details">
                <h4>{favorite.city}</h4>
                <div className="favorite-actions">
                  <button onClick={() => onSearch(favorite.city)} className="action-btn search-btn">
                    <FaSearch /> Search
                  </button>
                  <button onClick={() => onRemoveFavorite(favorite.city)} className="action-btn remove-btn">
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
