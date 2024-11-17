import axios from "axios";

// Set base URL for axios requests
const API = axios.create({
  baseURL: "http://192.168.70.177:5000/api", // Replace with your backend URL
});

// Add authorization token to requests
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers["Authorization"];
  }
};

export default API;
