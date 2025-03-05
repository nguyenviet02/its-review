import axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";

import axiosInstance from "@/lib/axios/axiosInstance";
import { useEffect } from "react";

// Token storage key
const TOKEN_STORAGE_KEY = "auth_access_token";

// Module-level variables
let accessTokenCache: string | undefined;
let isRefreshingToken = false;
let refreshPromise: Promise<string | undefined> | null = null;

// Functions to handle localStorage token storage
const setAccessTokenToStorage = (token: string | undefined): void => {
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    accessTokenCache = token;
  }
};

const getAccessTokenFromStorage = (): string | undefined => {
  if (typeof window !== "undefined") {
    if (!accessTokenCache) {
      accessTokenCache = localStorage.getItem(TOKEN_STORAGE_KEY) || undefined;
    }
    return accessTokenCache;
  }
  return undefined;
};

// Function to get a fresh token
async function refreshAccessToken(): Promise<string | undefined> {
  // If we're already refreshing, return the existing promise to prevent multiple calls
  if (refreshPromise) {
    return refreshPromise;
  }

  isRefreshingToken = true;
  refreshPromise = getSession()
    .then((session) => {
      const token = session?.accessToken;
      // Store token in localStorage
      setAccessTokenToStorage(token);
      isRefreshingToken = false;
      refreshPromise = null;
      return token;
    })
    .catch((error) => {
      console.error("Failed to refresh token:", error);
      isRefreshingToken = false;
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
    axiosInstance: axiosInstance,
    initializeToken,
  };
}

export default useAxiosInstance;
