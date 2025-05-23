'use client';

import { useQuery } from '@tanstack/react-query';
import { useIntersect } from 'fajarma-react-lib';
import type { MouseEvent } from 'react';
import { useMemo, useState } from 'react';

import TypeChip from '@/app/pokemon/components/TypeChip';
import getFirstName from '@/app/pokemon/utils/getFirstName';

import Evolution from './components/Evolution';
import Moves from './components/Moves';
import Stats from './components/Stats';

import { getPokemonSpeciesData, randomDescription } from './View.helpers';
import styles from './View.module.css';
import type {
  ContentProps,
  Description,
  PokemonSpeciesData,
} from './View.types';

const Content = ({
  id,
  isError,
  isLoading,
  moves,
  name,
  stats,
  types,
}: ContentProps) => {
  const [loadEvolution, setLoadEvolution] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState<Description>();

  const { data: dataSpecies, isLoading: isLoadingSpecies } =
    useQuery<PokemonSpeciesData>({
      queryKey: ['pokemon-species', [id]],
      queryFn: () => getPokemonSpeciesData(id),
      enabled: Boolean(id),
    });

  const { evolution_chain, flavor_text_entries = [] } = dataSpecies || {};
  const { url = '' } = evolution_chain || {};
  const description = useMemo(
    () => randomDescription(flavor_text_entries),
    [flavor_text_entries]
  );
  const displayDescription = selectedDesc || description;

  const handleChangeDesc = (e: MouseEvent) => {
    e.preventDefault();

    let result = randomDescription(flavor_text_entries);
    while (result === description) {
      result = randomDescription(flavor_text_entries);
    }
    setSelectedDesc(result);
  };

  const { ref } = useIntersect<HTMLDivElement>({
    callback: () => setLoadEvolution(true),
  });

  if (isError) return <p>Something went wrong... Please try again.</p>;
  if (isLoading || isLoadingSpecies) return <p>Loading...</p>;

  return (
    <>
      <div className={styles.container}>
        <h1>{getFirstName(name)}</h1>
        <section className={styles.row}>
          {types.map((item, index) => {
            const { type } = item || {};
            const { name: typeName = '' } = type || {};
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

export default Content;
