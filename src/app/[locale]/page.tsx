'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Search } from '../../components/search/search';
import { Results } from '../../components/results/results';
import { usePokemonsQuery } from '../../hooks/use-pokemons-query';
import { PAGE_LIMIT } from '../../shared/api/pokemon-api';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const t = useTranslations('Home');
  const offset = currentPage * PAGE_LIMIT;

  const {
    data,
    isLoading,
    error,
  } = usePokemonsQuery(searchTerm, offset);

  const pokemons = data?.pokemons ?? [];
  const total = data?.total ?? 0;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="app">
      <section className="home-hero home-hero--compact">
        <div className="home-hero__content">
          <h1>{t('title')}</h1>
        </div>
        <div className="home-hero__decoration" aria-hidden="true">
          <span className="home-hero__orbit home-hero__orbit--outer" />
          <span className="home-hero__orbit home-hero__orbit--inner" />
          <span className="home-hero__ball">
            <span />
          </span>
        </div>
      </section>

      <Search
        onSearch={handleSearch}
        placeholder={t('searchPlaceholder')}
        buttonLabel={t('searchButton')}
      />

      <Results
        pokemons={pokemons}
        loading={isLoading}
        error={error as Error | null}
        total={total}
        page={currentPage}
        onPageChange={handlePageChange}
        showPagination={!searchTerm.trim()}
        labels={{
          title: t('resultsTitle'),
          loading: t('loading'),
          error: t('error'),
          empty: t('empty'),
          count: t('count', { count: pokemons.length }),
          previous: t('previous'),
          next: t('next'),
          page: t('page', {
            page: currentPage + 1,
            totalPages: Math.max(1, Math.ceil(total / PAGE_LIMIT)),
          }),
        }}
      />
    </main>
  );
}
