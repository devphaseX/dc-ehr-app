"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./query-client";

export const DataQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const client = getQueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
