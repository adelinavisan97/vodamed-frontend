import axios from "axios";
import { useAuth } from "../components/authentication/authContext";

export const API_URL = 'https://sea-turtle-app-9l4ak.ondigitalocean.app/api';
// export const API_URL = 'http://localhost:443/api';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response?.status === 401) {
      // Token has expired or is invalid
      const auth = useAuth();
      auth.logout(); // Log out and redirect
    }
    return Promise.reject(error);
  }
);

export default apiClient;
