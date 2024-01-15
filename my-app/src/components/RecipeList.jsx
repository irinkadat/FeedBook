import React from "react";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RecipeList = ({ recipes, favorites, onAddToFavorites }) => {
  console.log(recipes);
  if (!recipes || recipes.length === 0) {
    return <p>No recipes available.</p>;
  }

  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => {
        if (recipe.image) {
          return (
            <li key={recipe.id}>
              <Link
                to={`/recipe/${recipe.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <RecipeCard
                  title={recipe.title}
                  category={recipe.category}
                  image={recipe.image}
                  onAddToFavorites={onAddToFavorites}
                  isFavorite={favorites?.some(
                    (fav) => fav.title === recipe.title
                  )}
                />
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  // favorites: PropTypes.array.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
};

export default RecipeList;
