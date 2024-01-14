// pages/RecipeListPage.jsx
import React, { useState } from 'react';
import RecipeList from '../components/RecipeList';
import useRecipes from '../hooks/useRecipes';
import SearchBar from '../components/SearchBar';

const RecipeListPage = ({ onAddToFavorites }) => {
  const { data: recipes, isLoading, isError } = useRecipes();
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearch = (query) => {
    // Filter recipes based on the search query
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching recipes</div>;
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <RecipeList recipes={filteredRecipes} onAddToFavorites={onAddToFavorites} />
    </div>
  );
};

export default RecipeListPage;
