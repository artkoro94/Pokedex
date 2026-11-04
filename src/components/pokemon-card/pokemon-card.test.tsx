import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PokemonCard } from './pokemon-card';

const pokemonMock = {
  id: 25,
  name: 'pikachu',
  description: 'Types: electric. Height: 4. Weight: 60.',
  image: '/pikachu.png',
  types: ['electric'],
  height: 4,
  weight: 60,
};

describe('PokemonCard', () => {
  it('renders pokemon name, type and image', () => {
    render(<PokemonCard pokemon={pokemonMock} />);

    expect(
      screen.getByRole('heading', { name: 'pikachu' })
    ).toBeInTheDocument();

    expect(screen.getByText('electric')).toBeInTheDocument();

    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      pokemonMock.name
    );
  });

  it('links to the pokemon details page', () => {
    render(<PokemonCard pokemon={pokemonMock} />);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/pokemon/25'
    );
  });
});
