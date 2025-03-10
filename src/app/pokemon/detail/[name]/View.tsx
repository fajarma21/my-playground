"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";

import MainImage from "./components/MainImage";
import { getPokemonData } from "./View.helpers";
import { PokemonDetailProps } from "./View.types";
import { PokemonData } from "@/app/pokemon/types";
import Content from "./components/Content";

const PokemonDetail = ({ params }: PokemonDetailProps) => {
  const { name } = use(params);

  const { data, isLoading, isError } = useQuery<PokemonData>({
    queryKey: ["pokemon"],
    queryFn: () => getPokemonData(name),
    enabled: Boolean(name),
  });
  const { id = 0, moves = [], stats = [], types = [] } = data || {};

  return (
    <>
      <MainImage id={id} name={name} />
      <Content
        id={id}
        isError={isError}
        isLoading={isLoading}
        moves={moves}
        name={name}
        stats={stats}
        types={types}
      />
    </>
  );
};

export default PokemonDetail;
