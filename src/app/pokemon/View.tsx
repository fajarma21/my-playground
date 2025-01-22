"use client";

import React, { Fragment } from "react";
import { usePathname } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

import useIntersect from "@/utils/useIntersect";
import getImgFromSrc from "@/app/pokemon/utils/getImgFromUrl";

import PokeThumbnail from "@/app/pokemon/components/PokeThumbnail";
import Loader from "@/app/pokemon/components/Loader";

import styles from "./View.module.css";
import { getNextOffset, getPokemonList } from "./View.helpers";
import { PokemonListData } from "./View.types";

const Pokemon = () => {
  const path = usePathname();

  const { data, hasNextPage, isLoading, isError, isFetching, fetchNextPage } =
    useInfiniteQuery<PokemonListData>({
      queryKey: ["pokemon-list"],
      queryFn: getPokemonList,
      initialPageParam: 0,
      getNextPageParam: (allpage) => getNextOffset(allpage.next),
    });

  const { pages = [] } = data || {};

  const { ref } = useIntersect({ callback: () => fetchNextPage() });

  return (
    <>
      {isError && <p>Error...</p>}
      <ul className={styles.pokemonContainer}>
        {isLoading ? (
          [...Array(10)].map((_, index) => <Loader key={`loader-${index}`} />)
        ) : (
          <>
            {pages.map((page, index) => (
              <Fragment key={`page-${index}`}>
                {page.results.map((item) => (
                  <li key={item.name}>
                    <PokeThumbnail
                      imgSize={100}
                      href={`${path}/detail/${item.name}`}
                      imgSrc={getImgFromSrc(item.url)}
                      priority={!index}
                      text={item.name}
                    />
                  </li>
                ))}
              </Fragment>
            ))}
            {isFetching &&
              [...Array(4)].map((_, index) => (
                <Loader key={`loader-${index}`} />
              ))}
          </>
        )}
      </ul>

      {hasNextPage && !isFetching && <div ref={ref} />}
    </>
  );
};

export default Pokemon;
