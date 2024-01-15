import React, { useState } from "react";
import RecipeList from "../components/RecipeList";
import useRecipes from "../hooks/useRecipes";
import SearchBar from "../components/SearchBar";

const RecipeListPage = ({ onAddToFavorites }) => {
  const { data: recipes, isLoading, isError } = useRecipes();
  const [filteredRecipes, setFilteredRecipes] = useState();


  const handleSearch = (query) => {
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleReset = () => {
    setFilteredRecipes(undefined);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching recipes</div>;
  }

  
  return (
    <div>
      <SearchBar onSearch={handleSearch} onReset={handleReset} />
      <RecipeList
        recipes={filteredRecipes ? filteredRecipes : recipes}
        onAddToFavorites={onAddToFavorites}
      />
    </div>
  );
};

export default RecipeListPage;