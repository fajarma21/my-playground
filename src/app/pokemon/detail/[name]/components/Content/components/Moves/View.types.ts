import type { PokemonData } from '@/app/pokemon/types';

export interface MovesProps {
  moves: NonNullable<PokemonData['moves']>;
}
