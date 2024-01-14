// useRecipeDetails.jsx
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

const useRecipeDetails = (id) => {
  const apiKey = 'd816055e34cb4348aca41d05f9d397a5';
  const [recipeDetails, setRecipeDetails] = useState(null);

  const { data, isLoading, isError } = useQuery(['recipeDetails', id], async () => {
    // Check if recipe details are already present, if yes, return them directly
    if (recipeDetails) {
      return recipeDetails;
    }

    // Fetch recipe details if not already present
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
    const data = await response.json();

    // Update state with fetched recipe details
    setRecipeDetails(data);

    return data;
  }, {
    staleTime: 86400000, // 1 hour (adjust this based on your requirement)
    cacheTime: 86400000, // 1 hour (optional, controls how long the cache is retained)
  });

  // Optional: Use useEffect to clear the recipe details when the component unmounts
  useEffect(() => {
    return () => setRecipeDetails(null);
  }, []);

  return { data, isLoading, isError };
};

export default useRecipeDetails;
