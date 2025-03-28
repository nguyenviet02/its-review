'use client';

import { useAxiosInstance } from '@/hooks/useAuth';
import { ReactNode, useEffect } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

/**
 * Top-level provider that handles app initialization
 */
export function AppProvider({ children }: AppProviderProps) {
  const { initializeToken } = useAxiosInstance();

  // Initialize token when app loads
  useEffect(() => {
    initializeToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
