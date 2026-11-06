import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('queryClient defaults', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('uses the configured TTL as staleTime', async () => {
    vi.stubEnv('NEXT_PUBLIC_QUERY_CACHE_TTL', '120000');

    const { queryClient } = await import('./query-client');

    expect(queryClient.getDefaultOptions().queries).toMatchObject({
      staleTime: 120000,
      gcTime: 300000,
      retry: 1,
      refetchOnWindowFocus: false,
    });
  });

  it('falls back to the default staleTime when the configured TTL is invalid', async () => {
    vi.stubEnv('NEXT_PUBLIC_QUERY_CACHE_TTL', 'invalid');

    const { queryClient } = await import('./query-client');

    expect(queryClient.getDefaultOptions().queries).toMatchObject({
      staleTime: 60000,
      gcTime: 300000,
    });
  });

  it('falls back to the default staleTime when the configured TTL is not positive', async () => {
    vi.stubEnv('NEXT_PUBLIC_QUERY_CACHE_TTL', '0');

    const { queryClient } = await import('./query-client');

    expect(queryClient.getDefaultOptions().queries).toMatchObject({
      staleTime: 60000,
      gcTime: 300000,
    });
  });
});
