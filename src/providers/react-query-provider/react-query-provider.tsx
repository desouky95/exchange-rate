"use client";

import { getQueryClient } from "@/utils";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools client={queryClient} />
    </QueryClientProvider>
  );
}

export { ReactQueryProvider };
