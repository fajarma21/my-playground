import getPokemonId from "../getPokemonId";
import { POKEMON_ASSET_URL } from "./index.constants";

const getPokemonImg = (id: string | number) => {
  const validId = getPokemonId(id);
  return `${POKEMON_ASSET_URL}/${validId}.png`;
};

export default getPokemonImg;
