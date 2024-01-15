import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/RecipeCard.css";
import fav from "../assets/fav.svg";
import favRed from "../assets/fav-red.svg";

const RecipeCard = ({
  title,
  category,
  image,
  onAddToFavorites,
  isFavorite,
}) => {
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    
    setLocalIsFavorite(!localIsFavorite);

    onAddToFavorites({ title, category, image });
  };

  return (
    <div
      className={`recipe-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img className="recipe-image" src={image} alt={title} />
      <div className="recipe-details">
        <h3 className="recipe-title">{title}</h3>
        <p className="recipe-category">{category}</p>
        <img
          className="heart-icon"
          src={localIsFavorite ? favRed : fav}
          alt=""
          onClick={(e) => handleAddToFavorites(e)}
        />
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  image: PropTypes.string.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
};

export default RecipeCard;
