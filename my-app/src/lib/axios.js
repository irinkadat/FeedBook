import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
});

axiosInstance.interceptors.request.use(async (request) => {
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
);

export { axiosInstance };
