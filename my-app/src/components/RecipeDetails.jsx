// components/RecipeDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/RecipeDetails.css';

const RecipeDetails = ({ recipes }) => {
  const { id } = useParams();
  const selectedRecipe = recipes.find((recipe) => recipe.id.toString() === id);

  if (!selectedRecipe) {
    return <div className="recipe-not-found">Recipe not found!</div>;
  }

  return (
    <div className="recipe-card d">
      <img className="recipe-image" src={selectedRecipe.image} alt={selectedRecipe.title} />
      <div className="recipe-details">
        <h2 className="detailrec-title">{selectedRecipe.title}</h2>
        {/* Check if ingredients is defined before joining */}
        {selectedRecipe.ingredients && (
          <p className="recipe-ingredients">Ingredients: {selectedRecipe.ingredients.join(', ')}</p>
        )}
        <p className="recipe-instructions">Instructions: {selectedRecipe.instructions}</p>
      </div>
    </div>
  );
};

RecipeDetails.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default RecipeDetails;
