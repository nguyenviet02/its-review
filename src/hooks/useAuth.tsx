import { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';
import axiosInstance from '@/services/api/axiosInstance';
import {
  getAccessTokenFromStorage,
  setAccessTokenToStorage,
} from '@/services/auth/tokenStorage';

// Module-level variables
let refreshPromise: Promise<string | undefined> | null = null;

/**
 * Refresh access token from session
 * Using a singleton promise to prevent multiple simultaneous refresh attempts
 */
async function refreshAccessToken(): Promise<string | undefined> {
  // If we're already refreshing, return the existing promise to prevent multiple calls
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = getSession()
    .then((session) => {
      const token = session?.accessToken;
      // Store token in localStorage
      setAccessTokenToStorage(token);
      refreshPromise = null;
      return token;
    })
    .catch((error) => {
      console.error('Failed to refresh token:', error);
      refreshPromise = null;
      return undefined;
    });

  return refreshPromise;
}

// Request interceptor - uses cached token without calling getSession()
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = getAccessTokenFromStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - only calls getSession() on auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is unauthorized (401) and we haven't tried to refresh yet
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Get a fresh token
      const token = await refreshAccessToken();

      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

/**
 * Custom hook that provides the axios instance with token management
 */
export function useAxiosInstance(): {
  axiosInstance: AxiosInstance;
  initializeToken: () => Promise<void>;
} {
  // Function to initialize the token (call once at app startup)
  const initializeToken = async (): Promise<void> => {
    // Try to get token from localStorage first
    const storedToken = getAccessTokenFromStorage();
    if (!storedToken) {
      // If no token in localStorage, get from session
      await refreshAccessToken();
    }
  };

  return {
    axiosInstance,
    initializeToken,
  };
}

export default useAxiosInstance;
