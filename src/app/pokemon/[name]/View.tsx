"use client";

import { MouseEvent, use, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import TypeChip from "@/app/pokemon/components/TypeChip";
import getPokemonImg from "@/app/pokemon/utils/getPokemonImg";
import useIntersect from "@/utils/useIntersect";

import Moves from "./components/Moves";
import Stats from "./components/Stats";
import styles from "./View.module.css";
import {
  getPokemonData,
  getPokemonSpeciesData,
  randomDescription,
} from "./View.helpers";
import {
  PokemonData,
  PokemonDetailProps,
  PokemonSpeciesData,
} from "./View.types";
import Evolution from "./components/Evolution";

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
      <div className={styles.imgWrapper}>
        <Image
          priority
          className={styles.imgModifier}
          src={getPokemonImg(id)}
          alt={name}
          height={300}
          width={300}
        />
      </div>
      <div className={styles.container} onClick={() => console.log()}>
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
