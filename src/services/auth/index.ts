import axiosInstance from "../api/axiosInstance";
import { setAccessTokenToStorage } from "./tokenStorage";

/**
 * Authenticate user with credentials
 */
export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', {
    email,
    password
  });
  
  if (response.data?.accessToken) {
    setAccessTokenToStorage(response.data.accessToken);
  }
  
  return response.data;
};

/**
 * Register a new user
 */
export const registerUser = async (userData: {
  email: string;
  password: string;
  username: string;
  department?: string;
  jobPosition?: string;
}) => {
  return axiosInstance.post('/auth/register', userData);
};

/**
 * Get current user profile
 */
export const getCurrentUser = async () => {
  return axiosInstance.get('/auth/me');
};

/**
 * Log out the current user
 */
export const logoutUser = () => {
  setAccessTokenToStorage(undefined);
};
