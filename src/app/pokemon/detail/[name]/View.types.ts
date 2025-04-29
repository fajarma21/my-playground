export interface PokemonDetailProps {
  params: Promise<{ name: string }>;
}

interface PokemonList {
  name: string;
}

export type PokemonListResult = {
  results: PokemonList[];
};
