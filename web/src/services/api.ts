import axios from "axios";

// Create an instance of axios with a custom configuration
const api = axios.create({
  // Set the base URL for your API
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  // Optionally, set default headers or other configurations here
  headers: {
    "Content-Type": "application/json", // Ensure JSON content type
  },
});

// Optional: You can add request or response interceptors if needed
api.interceptors.request.use(
  (config) => {
    // If you need to add a token to each request, you can do that here:
    const token = localStorage.getItem("adminToken"); // Or use Cookies if storing token there
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors globally (e.g., log out if token is invalid)
    if (error.response && error.response.status === 401) {
      // Redirect to login or handle token expiration
      window.location.href = "/auth/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
