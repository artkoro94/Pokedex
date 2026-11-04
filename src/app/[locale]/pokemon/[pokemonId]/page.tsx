'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Link } from '../../../../i18n/navigation';
import { usePokemonDetailsQuery } from '../../../../hooks/use-pokemon-details-query';

const formatHeight = (height?: number) =>
  height === undefined ? '—' : `${(height / 10).toFixed(1)} m`;

const formatWeight = (weight?: number) =>
  weight === undefined ? '—' : `${(weight / 10).toFixed(1)} kg`;

export default function PokemonDetailsPage() {
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const t = useTranslations('PokemonDetails');
  const parsedPokemonId = /^\d+$/.test(pokemonId) ? Number(pokemonId) : null;

  const {
    data: pokemon,
    isLoading,
    error,
  } = usePokemonDetailsQuery(
    parsedPokemonId !== null && parsedPokemonId > 0
      ? parsedPokemonId
      : null
  );

  if (parsedPokemonId === null || parsedPokemonId < 1) {
    return (
      <main className="pokemon-details-page">
        <section className="details-panel details-panel--message">
          <p className="error-message">{t('notFound')}</p>
          <Link className="button" href="/">{t('back')}</Link>
        </section>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="pokemon-details-page">
        <section className="details-panel details-panel--message">
          <p className="status-message">{t('loading')}</p>
        </section>
      </main>
    );
  }

  if (error || !pokemon) {
    return (
      <main className="pokemon-details-page">
        <section className="details-panel details-panel--message">
          <p className="error-message">{t('loadError')}</p>
          <Link className="button" href="/">{t('back')}</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="pokemon-details-page">
      <Link className="details-back-link" href="/">
        <span aria-hidden="true">←</span> {t('back')}
      </Link>

      <article className="pokemon-profile">
        <div className="pokemon-profile__visual">
          <span className="pokemon-profile__number">
            {pokemon.id}
          </span>
          <Image
            className="pokemon-profile__image"
            src={pokemon.image}
            alt={pokemon.name}
            width={420}
            height={420}
            priority
          />
        </div>

        <div className="pokemon-profile__content">
          <p className="pokemon-profile__eyebrow">{t('eyebrow')}</p>
          <h1 className="pokemon-profile__name">{pokemon.name}</h1>

          <div className="pokemon-profile__types" aria-label={t('types')}>
            {pokemon.types.map((type) => (
              <span className="pokemon-type" data-type={type} key={type}>
                {type}
              </span>
            ))}
          </div>

          <p className="pokemon-profile__description">
            {t('description', { name: pokemon.name })}
          </p>

          <h2 className="pokemon-profile__section-title">{t('measurements')}</h2>
          <div className="pokemon-profile__stats">
            <div className="pokemon-stat">
              <span className="pokemon-stat__label">{t('height')}</span>
              <strong>{formatHeight(pokemon.height)}</strong>
            </div>
            <div className="pokemon-stat">
              <span className="pokemon-stat__label">{t('weight')}</span>
              <strong>{formatWeight(pokemon.weight)}</strong>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
