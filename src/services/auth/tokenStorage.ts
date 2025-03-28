// Token storage key
const TOKEN_STORAGE_KEY = 'auth_access_token';

// Module-level variables
let accessTokenCache: string | undefined;

/**
 * Set access token to storage
 */
export const setAccessTokenToStorage = (token: string | undefined): void => {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    accessTokenCache = token;
  }
};

/**
 * Get access token from storage
 */
export const getAccessTokenFromStorage = (): string | undefined => {
  if (typeof window !== 'undefined') {
    if (!accessTokenCache) {
      accessTokenCache = localStorage.getItem(TOKEN_STORAGE_KEY) || undefined;
    }
    return accessTokenCache;
  }
  return undefined;
};

/**
 * Clear access token from storage
 */
export const clearAccessToken = (): void => {
  setAccessTokenToStorage(undefined);
  accessTokenCache = undefined;
};
