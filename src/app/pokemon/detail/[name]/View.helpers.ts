import { POKEMON_API } from "@/app/pokemon/constants/url";
import { PokemonSpeciesData } from "./View.types";

export const getPokemonData = async (value: string) => {
  try {
    const response = await fetch(`${POKEMON_API}/pokemon/${value}`);
    if (response.ok) return await response.json();
    throw new Error("Not Found");
  } catch (error) {
    console.log(error);
  }
};

export const getPokemonSpeciesData = async (value: number) => {
  const response = await fetch(`${POKEMON_API}/pokemon-species/${value}`);
  return await response.json();
};

export const randomDescription = (
  list: NonNullable<PokemonSpeciesData["flavor_text_entries"]>
) => {
  const index = Math.floor(Math.random() * list.length);
  const { flavor_text, version } = list[index] || {};
  const { name } = version || {};
  return {
    flavor_text: flavor_text || "",
    version: {
      name: (name || "").replaceAll("-", " "),
    },
  };
};
