import { POKEMON_API } from "@/constants/url";

import { GetPokemonListParams } from "./View.types";

export const getPokemonList = async ({ pageParam }: GetPokemonListParams) => {
  const response = await fetch(
    `${POKEMON_API}/pokemon?limit=10&offset=${pageParam}`
  );
  return await response.json();
};

export const getNextOffset = (url?: string) => {
  if (!url) return 0;
  const regx = url.match(/offset=(\d+)/) || [];
  return regx[1] || 0;
};
