import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

const useRecipeDetails = (id) => {
  const apiKey = 'd816055e34cb4348aca41d05f9d397a5';
  const [recipeDetails, setRecipeDetails] = useState(null);

  const { data, isLoading, isError } = useQuery(['recipeDetails', id], async () => {
    console.log('Fetching data...');

    if (recipeDetails) {
      return recipeDetails;
    }

    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
    const data = await response.json();

    setRecipeDetails(data);

    return data;
  }, {
    staleTime: 86400000, 
    cacheTime: 86400000, 
  });

  useEffect(() => {
    return () => setRecipeDetails(null);
  }, [id]);

  return { data, isLoading, isError };
};

export default useRecipeDetails;
