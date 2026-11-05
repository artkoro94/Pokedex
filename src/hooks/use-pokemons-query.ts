import { useQuery } from '@tanstack/react-query';

import { fetchPokemonPage } from '../shared/api/pokemon-api';

export const usePokemonsQuery = (
  searchTerm: string,
  offset: number
) => {
  return useQuery({
    queryKey: ['pokemons', searchTerm, offset],
    queryFn: ({ signal }) => fetchPokemonPage(searchTerm, offset, signal),
  });
};
