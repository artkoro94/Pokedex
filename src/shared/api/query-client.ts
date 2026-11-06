import { QueryClient } from '@tanstack/react-query';

const DEFAULT_STALE_TIME = 60_000;
const DEFAULT_GC_TIME = 5 * 60_000;

const configuredStaleTime = Number(
  process.env.NEXT_PUBLIC_QUERY_CACHE_TTL ?? DEFAULT_STALE_TIME
);

const staleTime =
  Number.isFinite(configuredStaleTime) && configuredStaleTime > 0
    ? configuredStaleTime
    : DEFAULT_STALE_TIME;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime,
      gcTime: DEFAULT_GC_TIME,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
