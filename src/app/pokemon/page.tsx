'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersect } from 'fajarma-react-lib';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import getFirstName from '@/app/pokemon/utils/getFirstName';
import getImgFromSrc from '@/app/pokemon/utils/getImgFromUrl';

import Loader from '@/app/pokemon/components/Loader';
import PokeThumbnail from '@/app/pokemon/components/PokeThumbnail';

import { getNextOffset, getPokemonList } from './View.helpers';
import styles from './View.module.css';
import type { PokemonListData } from './View.types';

const Pokemon = () => {
  const path = usePathname();

  const { data, hasNextPage, isLoading, isError, isFetching, fetchNextPage } =
    useInfiniteQuery<PokemonListData>({
      queryKey: ['pokemon-list'],
      queryFn: getPokemonList,
      initialPageParam: 0,
      getNextPageParam: (allpage) => getNextOffset(allpage.next),
    });

  const { pages = [] } = data || {};

  const { ref } = useIntersect<HTMLDivElement>({
    callback: () => fetchNextPage(),
  });

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
                {page.results.map((item, index2) => (
                  <motion.li
                    key={item.name}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { delay: index2 * 0.05 },
                    }}
                  >
                    <PokeThumbnail
                      imgSize={100}
                      href={`${path}/detail/${item.name}`}
                      imgSrc={getImgFromSrc(item.url)}
                      priority={!index}
                      text={getFirstName(item.name)}
                      viewTransition={`${item.name}-thumbnail`}
                    />
                  </motion.li>
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
