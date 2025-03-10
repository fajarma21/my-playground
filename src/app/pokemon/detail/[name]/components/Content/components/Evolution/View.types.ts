export interface EvolutionProps {
  url: string;
}

interface Species {
  name?: string;
  url?: string;
}

export interface EvolveData {
  evolves_to: EvolveData[];
  species: Species;
}

export interface PokemonEvolutionData {
  chain?: Partial<EvolveData>;
}

export interface EvolveList {
  name: string;
  url: string;
}
