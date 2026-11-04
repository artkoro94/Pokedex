import { PAGE_LIMIT, type PokemonCardData } from '../../shared/api/pokemon-api';
import { PokemonList } from '../pokemon-list/pokemon-list';

interface ResultsLabels {
  title: string;
  loading: string;
  error: string;
  empty: string;
  count?: string;
  previous: string;
  next: string;
  page: string;
}

interface ResultsProps {
  pokemons: PokemonCardData[];
  loading: boolean;
  error: Error | null;
  total: number;
  page: number;
  onPageChange: (page: number) => void;
  showPagination: boolean;
  labels: ResultsLabels;
}

export const Results = ({
  pokemons,
  loading,
  error,
  total,
  page,
  onPageChange,
  showPagination,
  labels,
}: ResultsProps) => {
  const totalPages = Math.ceil(total / PAGE_LIMIT);
  const canGoPrevious = page > 0;
  const canGoNext = page + 1 < totalPages;

  return (
    <section className="results-section">
      <div className="results-heading">
        <h2>{labels.title}</h2>
        {!loading && !error && pokemons.length > 0 && (
          <span className="results-count">{labels.count}</span>
        )}
      </div>

      {loading && (
        <div className="pokemon-skeleton-grid" aria-label={labels.loading}>
          {Array.from({ length: 10 }, (_, index) => (
            <div className="pokemon-skeleton" key={index}>
              <span className="pokemon-skeleton__image" />
              <span className="pokemon-skeleton__title" />
              <span className="pokemon-skeleton__types" />
            </div>
          ))}
        </div>
      )}

      {error && <p className="error-message">{labels.error}</p>}

      {!loading && !error && pokemons.length === 0 && (
        <p className="status-message">{labels.empty}</p>
      )}

      {!loading && !error && pokemons.length > 0 && (
        <>
          <PokemonList pokemons={pokemons} />

          {showPagination && totalPages > 1 && (
            <nav className="pagination" aria-label="Pokémon pages">
              <button
                className="pagination__button"
                type="button"
                disabled={!canGoPrevious}
                onClick={() => onPageChange(page - 1)}
              >
                <span aria-hidden="true">←</span>
                {labels.previous}
              </button>

              <span className="pagination__status">
                {labels.page}
              </span>

              <button
                className="pagination__button"
                type="button"
                disabled={!canGoNext}
                onClick={() => onPageChange(page + 1)}
              >
                {labels.next}
                <span aria-hidden="true">→</span>
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
};
