export interface PokeLS {
  id: number;
  name: string;
  nickname: string;
  queue: number;
  time: number;
}

export type EditMode = "" | "edit" | "release";

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
