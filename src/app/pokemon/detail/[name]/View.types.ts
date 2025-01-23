import { randomDescription } from "./View.helpers";

export interface PokemonDetailProps {
  params: Promise<{ name: string }>;
}

interface MovesData {
  move?: {
    name?: string;
  };
}

interface StatsData {
  base_stat?: number;
  stat?: {
    name?: string;
  };
}

interface TypesData {
  type?: {
    name?: string;
  };
}

export interface PokemonData {
  id?: number;
  moves?: MovesData[];
  stats?: StatsData[];
  types?: TypesData[];
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
