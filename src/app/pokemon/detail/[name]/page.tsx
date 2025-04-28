"use client";

import dynamic from "next/dynamic";

const PokemonDetailLazy = dynamic(() => import("./View"));

export default PokemonDetailLazy;
