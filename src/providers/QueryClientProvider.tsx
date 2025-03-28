'use client';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

type Props = {
  children: React.ReactNode;
};

const QueryClientProviderWrapper = ({ children }: Props) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => toast.error(`Something went wrong: ${error.message}`),
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientProviderWrapper;
