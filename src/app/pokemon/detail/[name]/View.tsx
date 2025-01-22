"use client";

import { MouseEvent, use, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import TypeChip from "@/app/pokemon/components/TypeChip";
import useIntersect from "@/utils/useIntersect";

import Evolution from "./components/Evolution";
import MainImage from "./components/MainImage";
import Moves from "./components/Moves";
import Stats from "./components/Stats";
import {
  getPokemonData,
  getPokemonSpeciesData,
  randomDescription,
} from "./View.helpers";
import styles from "./View.module.css";
import {
  PokemonData,
  PokemonDetailProps,
  PokemonSpeciesData,
} from "./View.types";

const PokemonDetail = ({ params }: PokemonDetailProps) => {
  const { name } = use(params);

  const [loadEvolution, setLoadEvolution] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState("");

  const { data, isLoading, isError } = useQuery<PokemonData>({
    queryKey: ["pokemon"],
    queryFn: () => getPokemonData(name),
    enabled: Boolean(name),
  });
  const { id = 0, moves = [], stats = [], types = [] } = data || {};

  const { data: dataSpecies, isLoading: isLoadingSpecies } =
    useQuery<PokemonSpeciesData>({
      queryKey: ["pokemon-species", [name]],
      queryFn: () => getPokemonSpeciesData(name),
      enabled: Boolean(name),
    });
  const { evolution_chain, flavor_text_entries = [] } = dataSpecies || {};
  const { url = "" } = evolution_chain || {};
  const description = useMemo(
    () => randomDescription(flavor_text_entries),
    [flavor_text_entries]
  );

  const handleChangeDesc = (e: MouseEvent) => {
    e.preventDefault();

    let result = randomDescription(flavor_text_entries);
    while (result === description) {
      result = randomDescription(flavor_text_entries);
    }
    setSelectedDesc(result);
  };

  const { ref } = useIntersect({ callback: () => setLoadEvolution(true) });

  if (isError) return <p>Something went wrong... Please try again.</p>;
  if (isLoading || isLoadingSpecies) return <p>Loading...</p>;

  return (
    <>
      <MainImage id={id} name={name} />

      <div className={styles.container}>
        <h1>{name}</h1>
        <section className={styles.row}>
          {types.map((item, index) => {
            const { type } = item || {};
            const { name: typeName = "" } = type || {};
            return (
              <TypeChip key={`type-${index}`} long type={typeName}>
                {typeName}
              </TypeChip>
            );
          })}
          {Boolean(description || selectedDesc) && (
            <>
              <p>{selectedDesc || description}</p>
              <a
                href="#!"
                className={styles.reroll}
                onClick={handleChangeDesc}
              />
            </>
          )}
        </section>

        <Stats stats={stats} />

        <Moves moves={moves} />

        {loadEvolution && <Evolution url={url} />}

        {!loadEvolution && <div ref={ref} />}
      </div>
    </>
  );
};

export default PokemonDetail;
