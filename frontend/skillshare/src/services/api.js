// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// // Attach the access token from localStorage for every request
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // use only 'token'
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle token expiration (refresh automatically)
// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If 401 and not retried yet → try refreshing token
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refresh = localStorage.getItem("refresh");

//       if (refresh) {
//         try {
//           // 👇 correct URL — make sure this exists in your Django urls.py
//           const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh });

//           const newAccessToken = res.data.access;
//           localStorage.setItem("token", newAccessToken);
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//           return API(originalRequest);
//         } catch (err) {
//           console.error("Token refresh failed:", err);
//           localStorage.removeItem("token");
//           localStorage.removeItem("refresh");
//           window.location.href = "/login";
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

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

export default API;
