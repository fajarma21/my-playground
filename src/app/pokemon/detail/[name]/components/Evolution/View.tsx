"use client";

import { Fragment, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import IntersectSection from "@/components/IntersectSection";
import getFirstName from "@/app/pokemon/utils/getFirstName";
import PokeThumbnail from "@/app/pokemon/components/PokeThumbnail";
import getImgFromSrc from "@/app/pokemon/utils/getImgFromUrl";

import { getAnyPokemonData, mapChainEvolution } from "./View.helpers";
import styles from "./View.module.css";
import { EvolutionProps, PokemonEvolutionData } from "./View.types";

const Evolution = ({ url }: EvolutionProps) => {
  const { data: dataEvolution, isLoading: isLoadingEvolution } =
    useQuery<PokemonEvolutionData>({
      queryKey: ["pokemon-evolution", [url]],
      queryFn: () => getAnyPokemonData(url),
      enabled: Boolean(url),
    });
  const { chain } = dataEvolution || {};
  const evolutions = useMemo(() => mapChainEvolution(chain), [chain]);

  return (
    <IntersectSection>
      <h3>Evolution Chain</h3>
      <div className={styles.evoContainer}>
        {isLoadingEvolution ? (
          <p>Loading...</p>
        ) : (
          evolutions.map((list, index) => (
            <div key={`row-${index}`} className={styles.evoRow}>
              {list.map((item, index) => (
                <Fragment key={`${item.name}-${index}`}>
                  {Boolean(index) && <div className={styles.evoGap} />}
                  <div className={styles.evoWrapper}>
                    <PokeThumbnail
                      imgSrc={getImgFromSrc(item.url)}
                      imgSize={100}
                      href={item.name}
                      text={getFirstName(item.name)}
                      width={120}
                    />
                  </div>
                </Fragment>
              ))}
            </div>
          ))
        )}
      </div>
    </IntersectSection>
  );
};

export default Evolution;
