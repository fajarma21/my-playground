import React from "react";
import Image from "next/image";

import pokemonLogo from "@/assets/logo-pokemon.png";

import styles from "./View.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.floatHeader}>
      <Link href="/pokemon">
        <Image
          priority
          src={pokemonLogo}
          alt="pokemon"
          width={106}
          height={39}
          className={styles.headerImg}
        />
      </Link>
    </header>
  );
};

export default Header;
