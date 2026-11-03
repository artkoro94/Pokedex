'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../shared/api/query-client';
import { ThemeProvider } from '../context/theme-context/theme-context';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
