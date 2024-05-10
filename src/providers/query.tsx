'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cache } from 'react';

const getQueryClient = cache(() => {
  return new QueryClient();
});

export const DataQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const client = getQueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
