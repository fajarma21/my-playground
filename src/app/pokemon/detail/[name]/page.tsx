"use client";

import dynamic from "next/dynamic";
import { PokemonListResult } from "./View.types";
import { getPokemons } from "./View.helpers";

const PokemonDetailLazy = dynamic(() => import("./View"));

export default PokemonDetailLazy;

export async function generateStaticParams() {
  const list: PokemonListResult = await getPokemons();
  return list.results.map(({ name }) => ({ name }));
}
