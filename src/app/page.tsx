import Image from "next/image";
import Link from "next/link";

import pokemonLogo from "@/assets/logo-pokemon.png";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="pokemon" className={styles.link}>
          <Image
            priority
            className={styles.logo}
            src={pokemonLogo}
            alt="pokemon"
            width={212}
            height={78}
          />
        </Link>
      </div>
    </div>
  );
}
