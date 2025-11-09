import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});
//axios is used for making HTTP requests
// axios instance is created with a base URL pointing to the API endpoint
//interceptor to attach token to every request if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
//this function exports the configured axios instance for use in other parts of the application

export default API;
