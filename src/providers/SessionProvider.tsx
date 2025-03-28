'use client';
import useAxiosInstance from '@/hooks/useAuth';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initializeToken } = useAxiosInstance();
  useEffect(() => {
    initializeToken();
  }, [initializeToken]);
  return <SessionProvider>{children}</SessionProvider>;
}
