import { PokemonData } from "@/app/pokemon/types";

export interface StatsProps {
  stats: NonNullable<PokemonData["stats"]>;
}
