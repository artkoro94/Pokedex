'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Search } from '../../components/search/search';
import { Results } from '../../components/results/results';
import { usePokemonsQuery } from '../../hooks/use-pokemons-query';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [offset] = useState(0);
  const t = useTranslations('Home');

  const {
    data: pokemons = [],
    isLoading,
    error,
  } = usePokemonsQuery(searchTerm, offset);

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
        onSearch={setSearchTerm}
        placeholder={t('searchPlaceholder')}
        buttonLabel={t('searchButton')}
      />

      <Results
        pokemons={pokemons}
        loading={isLoading}
        error={error as Error | null}
        labels={{
          title: t('resultsTitle'),
          loading: t('loading'),
          error: t('error'),
          empty: t('empty'),
          count: t('count', { count: pokemons.length }),
        }}
      />
    </main>
  );
}
