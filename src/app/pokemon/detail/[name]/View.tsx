"use client";

import { MouseEvent, use, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import TypeChip from "@/app/pokemon/components/TypeChip";
import getFirstName from "@/app/pokemon/utils/getFirstName";
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
  Description,
  PokemonData,
  PokemonDetailProps,
  PokemonSpeciesData,
} from "./View.types";

const PokemonDetail = ({ params }: PokemonDetailProps) => {
  const { name } = use(params);

  const [loadEvolution, setLoadEvolution] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState<Description>();

  const { data, isLoading, isError } = useQuery<PokemonData>({
    queryKey: ["pokemon"],
    queryFn: () => getPokemonData(name),
    enabled: Boolean(name),
  });
  const { id = 0, moves = [], stats = [], types = [] } = data || {};

  const { data: dataSpecies, isLoading: isLoadingSpecies } =
    useQuery<PokemonSpeciesData>({
      queryKey: ["pokemon-species", [id]],
      queryFn: () => getPokemonSpeciesData(id),
      enabled: Boolean(id),
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

  const displayDescription = selectedDesc || description;

  if (isError) return <p>Something went wrong... Please try again.</p>;
  if (isLoading || isLoadingSpecies) return <p>Loading...</p>;

  return (
    <>
      <MainImage id={id} name={name} />

      <div className={styles.container}>
        <h1>{getFirstName(name)}</h1>
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
          {Boolean(displayDescription) && (
            <div className={styles.descriptionContainer}>
              <p>{displayDescription.flavor_text}</p>
              <p>
                <b>- Pokemon {displayDescription.version.name} -</b>
              </p>
              <a
                href="#!"
                className={styles.reroll}
                onClick={handleChangeDesc}
              />
            </div>
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
