import type { PokemonCardData } from '../api/pokemon-api';

export const pikachuMock: PokemonCardData = {
  id: 25,
  name: 'pikachu',
  description: 'Types: electric. Height: 4. Weight: 60.',
  image: '/icons.svg',
  types: ['electric'],
  height: 4,
  weight: 60,
};

export const bulbasaurMock: PokemonCardData = {
  id: 1,
  name: 'bulbasaur',
  description:
    'Types: grass, poison. Height: 7. Weight: 69.',
  image: '/icons.svg',
  types: ['grass', 'poison'],
  height: 7,
  weight: 69,
};

export const pokemonListMock: PokemonCardData[] = [
  pikachuMock,
  bulbasaurMock,
];