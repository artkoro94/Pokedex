'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Search } from '../../components/search/search';
import { Results } from '../../components/results/results';
import { RefreshButton } from '../../components/refresh-button/refresh-button';
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
      <section className="home-hero">
        <div className="home-hero__content">
          <span className="home-hero__eyebrow">{t('eyebrow')}</span>
          <h1>{t('title')}</h1>
          <p>{t('description')}</p>
        </div>
        <div className="home-hero__decoration" aria-hidden="true">
          <span className="home-hero__orbit home-hero__orbit--outer" />
          <span className="home-hero__orbit home-hero__orbit--inner" />
          <span className="home-hero__ball">
            <span />
          </span>
        </div>
      </section>

      <div className="catalog-toolbar">
        <Search
          onSearch={setSearchTerm}
          placeholder={t('searchPlaceholder')}
          buttonLabel={t('searchButton')}
        />
        <RefreshButton label={t('refreshButton')} />
      </div>

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
