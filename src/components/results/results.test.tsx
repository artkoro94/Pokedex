import { screen, render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Results } from './results';
import {
  bulbasaurMock,
  pikachuMock,
  pokemonListMock,
} from '../../shared/test/pokemon-mocks';

const labels = {
  title: 'Results',
  loading: 'Loading...',
  error: 'Could not load pokemons. Try another name.',
  empty: 'No pokemons found.',
  count: '2 Pokémon',
  previous: 'Previous',
  next: 'Next',
  page: 'Page 1 of 2',
};

const defaultProps = {
  pokemons: [],
  loading: false,
  error: null,
  total: 20,
  page: 0,
  onPageChange: vi.fn(),
  showPagination: false,
  labels,
};

describe('Results', () => {
  it('renders section title', () => {
    render(<Results {...defaultProps} />);

    expect(
      screen.getByRole('heading', { name: 'Results' })
    ).toBeInTheDocument();
  });

  it('renders loading indicator while data is loading', () => {
    render(<Results {...defaultProps} loading />);

    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when error exists', () => {
    render(
      <Results
        {...defaultProps}
        error={new Error('Failed to load pokemons')}
      />
    );

    expect(
      screen.getByText('Could not load pokemons. Try another name.')
    ).toBeInTheDocument();
  });

  it('renders empty message when there are no pokemons', () => {
    render(<Results {...defaultProps} />);

    expect(screen.getByText('No pokemons found.')).toBeInTheDocument();
  });

  it('renders pokemon list when data exists', () => {
    render(
      <Results
        {...defaultProps}
        pokemons={pokemonListMock}
      />
    );

    expect(
      screen.getByRole('heading', { name: pikachuMock.name })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: bulbasaurMock.name })
    ).toBeInTheDocument();
  });

  it('does not render pokemon list while loading', () => {
    render(
      <Results
        {...defaultProps}
        pokemons={pokemonListMock}
        loading
      />
    );

    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: pikachuMock.name })
    ).not.toBeInTheDocument();
  });

  it('does not render empty message when error exists', () => {
    render(
      <Results
        {...defaultProps}
        error={new Error('Server error')}
      />
    );

    expect(
      screen.getByText('Could not load pokemons. Try another name.')
    ).toBeInTheDocument();

    expect(
      screen.queryByText('No pokemons found.')
    ).not.toBeInTheDocument();
  });
});
