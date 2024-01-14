// useRecipes.jsx
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

const useRecipes = () => {
  const apiKey = 'd816055e34cb4348aca41d05f9d397a5';
  const [recipes, setRecipes] = useState([]);

  const { data, isLoading, isError } = useQuery('recipes', async () => {
    // Check if recipes are already present, if yes, return them directly
    if (recipes.length > 0) {
      return recipes;
    }

    // Fetch recipes if not already present
    const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=50`);
    const data = await response.json();
    
    // Update state with fetched recipes
    setRecipes(data.recipes);

    return data.recipes;
  }, {
    staleTime: 86400000, // 1 hour (adjust this based on your requirement)
    cacheTime: 86400000, // 1 hour (optional, controls how long the cache is retained)
  });

  // Optional: Use useEffect to clear the recipes when the component unmounts
  useEffect(() => {
    return () => setRecipes([]);
  }, []);

  return { data, isLoading, isError };
};

export default useRecipes;
