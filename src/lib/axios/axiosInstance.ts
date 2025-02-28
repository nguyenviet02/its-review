import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: "http://10.241.94.149:5000", // Replace with your API base URL
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
		const session = await getSession()
    // Do something before the request is sent
    // For example, add an authentication token to the headers
    const token = session?.accessToken; // Retrieve auth token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;