import type { PokemonData } from '@/app/pokemon/types';
import type { randomDescription } from './View.helpers';

export interface ContentProps {
  id: number;
  isError: boolean;
  isLoading: boolean;
  moves: NonNullable<PokemonData['moves']>;
  name: string;
  stats: NonNullable<PokemonData['stats']>;
  types: NonNullable<PokemonData['types']>;
}

interface FlavorTextEntries {
  flavor_text?: string;
  version?: {
    name?: string;
  };
}

export interface PokemonSpeciesData {
  evolution_chain?: {
    url?: string;
  };
  flavor_text_entries?: FlavorTextEntries[];
}

export type Description = ReturnType<typeof randomDescription>;
