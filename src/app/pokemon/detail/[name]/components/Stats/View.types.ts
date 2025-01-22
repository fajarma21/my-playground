import { PokemonData } from "../../View.types";

export interface StatsProps {
  stats: NonNullable<PokemonData["stats"]>;
}
