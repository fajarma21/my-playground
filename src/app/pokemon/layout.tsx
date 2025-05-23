'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useIntersect } from 'fajarma-react-lib';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import pokemonLogo from '@/assets/logo-pokemon.png';
import getCurrentPath from '@/utils/getCurrentPath';

import ThumbWrapper from '../../components/ThumbWrapper';
import Header from './components/Header';
import Pokebag from './components/Pokebag';
import ScrollToTop from './components/ScrollToTop';
import { CatchProvider } from './contexts/catch';
import styles from './layout.module.css';

const queryClient = new QueryClient();

function PokemonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [catchNew, setCatchNew] = useState(false);
  const { ref, intersecting } = useIntersect<HTMLImageElement>({});

  const isCollection = getCurrentPath(pathname) === 'collections';

  const handleChangeCatchNew = (value: boolean) => {
    setCatchNew(value);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CatchProvider onChangeCatchNew={handleChangeCatchNew}>
        <div className={styles.container}>
          {!intersecting && <Header />}
          <Link href="/pokemon">
            <ThumbWrapper viewTransition="pokemon-logo">
              <Image
                ref={ref}
                priority
                src={pokemonLogo}
                alt="pokemon"
                width={212}
                height={78}
                className={styles.titleImg}
              />
            </ThumbWrapper>
          </Link>
          <div className={styles.content}>{children}</div>
          <ScrollToTop display={!intersecting} />
          {!isCollection && (
            <Pokebag
              hasNew={catchNew}
              onClick={() => handleChangeCatchNew(false)}
            />
          )}
          <div className={styles.footer}>
            <p>
              Powered by{' '}
              <a href="https://pokeapi.co/" target="_blank">
                pokeapi.co
              </a>
            </p>
          </div>
        </div>
      </CatchProvider>
    </QueryClientProvider>
  );
}

export default PokemonLayout;
