import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/RecipeCard.css";
import fav from "../assets/fav.svg";
import favRed from "../assets/fav-red.svg";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";

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

    onAddToFavorites({ title, image });
  };
  const auth = getAuth(app);
  const user = auth.currentUser;

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
        {user && (
          <img
            className="heart-icon"
            src={localIsFavorite ? favRed : fav}
            alt=""
            onClick={(e) => handleAddToFavorites(e)}
          />
        )}
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
