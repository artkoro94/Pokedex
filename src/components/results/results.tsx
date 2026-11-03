import type { PokemonCardData } from '../../shared/api/pokemon-api';
import { PokemonList } from '../pokemon-list/pokemon-list';

interface ResultsLabels {
  title: string;
  loading: string;
  error: string;
  empty: string;
  count?: string;
}

interface ResultsProps {
  pokemons: PokemonCardData[];
  loading: boolean;
  error: Error | null;
  labels?: ResultsLabels;
}

const defaultLabels: ResultsLabels = {
  title: 'Results',
  loading: 'Loading...',
  error: 'Could not load pokemons. Try another name.',
  empty: 'No pokemons found.',
};

export const Results = ({
  pokemons,
  loading,
  error,
  labels = defaultLabels,
}: ResultsProps) => {
  const copy = { ...defaultLabels, ...labels };

  return (
    <section className="results-section">
      <div className="results-heading">
        <h2>{copy.title}</h2>
        {!loading && !error && pokemons.length > 0 && (
          <span className="results-count">{copy.count ?? pokemons.length}</span>
        )}
      </div>

      {loading && (
        <div className="pokemon-skeleton-grid" aria-label={copy.loading}>
          {Array.from({ length: 10 }, (_, index) => (
            <div className="pokemon-skeleton" key={index}>
              <span className="pokemon-skeleton__image" />
              <span className="pokemon-skeleton__title" />
              <span className="pokemon-skeleton__types" />
            </div>
          ))}
        </div>
      )}

      {error && <p className="error-message">{copy.error}</p>}

      {!loading && !error && pokemons.length === 0 && (
        <p className="status-message">{copy.empty}</p>
      )}

      {!loading && !error && pokemons.length > 0 && (
        <PokemonList pokemons={pokemons} />
      )}
    </section>
  );
};
