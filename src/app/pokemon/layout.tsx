"use client";

import Image from "next/image";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useDisplayIntersect from "@/utils/useDisplayIntersect";
import pokemonLogo from "@/assets/logo-pokemon.png";

import styles from "./layout.module.css";
import Header from "./components/Header";
import Link from "next/link";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

function PokemonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { ref, display } = useDisplayIntersect({});

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        {display && <Header />}
        <Link href="/pokemon">
          <Image
            ref={ref}
            priority
            src={pokemonLogo}
            alt="pokemon"
            width={212}
            height={78}
            className={styles.titleImg}
          />
        </Link>
        <div className={styles.content}>{children}</div>
        <ScrollToTop display={display} />
        <div className={styles.footer}>
          <p>
            Powered by{" "}
            <a href="https://pokeapi.co/" target="_blank">
              pokeapi.co
            </a>
          </p>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default PokemonLayout;
