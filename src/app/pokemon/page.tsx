"use client";

import dynamic from "next/dynamic";

const PokemonLazy = dynamic(() => import("./View"));

export default PokemonLazy;
