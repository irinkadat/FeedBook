import React from "react";
import PropTypes from "prop-types";
import "../styles/FavoritesPage.css";

const FavoritesPage = ({ favorites, onRemoveFromFavorites }) => {
  if (!Array.isArray(favorites)) {
    console.error("Favorites is not an array:", favorites);
    return <div>Error: Invalid favorites data</div>;
  }

  return (
    <div className="favorites-container">
      <h1>Favorites</h1>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((recipe, index) => (
            <div key={index} className="favorite-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.category}</p>
              <img src={recipe.image} alt={recipe.title} />
              <button onClick={() => onRemoveFromFavorites(recipe)}>
                Remove
              </button>
            </div>
          ))
        ) : (
          <div>No favorites to display</div>
        )}
      </div>
    </div>
  );
};

FavoritesPage.propTypes = {
  favorites: PropTypes.array.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
};

export default FavoritesPage;
