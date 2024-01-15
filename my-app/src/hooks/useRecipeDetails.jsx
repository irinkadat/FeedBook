// useRecipeDetails.jsx
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

const useRecipeDetails = (id) => {
  const apiKey = 'd816055e34cb4348aca41d05f9d397a5';
  const [recipeDetails, setRecipeDetails] = useState(null);

  const { data, isLoading, isError } = useQuery(['recipeDetails', id], async () => {
    console.log('Fetching data...');

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
    staleTime: 86400000, 
    cacheTime: 86400000, 
  });

  // Optional: Use useEffect to clear the recipe details when the component unmounts
  useEffect(() => {
    return () => setRecipeDetails(null);
  }, [id]);

  return { data, isLoading, isError };
};

export default useRecipeDetails;
