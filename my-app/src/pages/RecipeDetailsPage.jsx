// pages/RecipeDetailsPage.jsx
import React from 'react';
import RecipeDetails from '../components/RecipeDetails';
import { useParams } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const { data: recipes, isLoading, isError } = useRecipes();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching recipes</div>;
  }

  return (
    <div>
      {/* Pass the 'recipes' data to the RecipeDetails component */}
      <RecipeDetails recipes={recipes} />
    </div>
  );
};

export default RecipeDetailsPage;
