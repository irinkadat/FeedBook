import { useQuery } from "react-query";
import { axiosInstance } from "../lib/axios"


const fetchReceipes = async() => {
  const apiKey = 'd816055e34cb4348aca41d05f9d397a5';
  const response = await axiosInstance.get(`/random?apiKey=${apiKey}&number=50`);
  console.log(response.data);
  return response.data.recipes
}

const useRecipes = () => {
  return useQuery({ 
    queryKey : ['receipes'],
    queryFn : fetchReceipes, 
    staleTime: 86400000, 
    refetchOnWindowFocus : false,
    refetchOnReconnect : false
  })
}

export default useRecipes;
