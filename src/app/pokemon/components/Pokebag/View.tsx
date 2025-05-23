import Link from 'next/link';

import styles from './View.module.css';
import type { PokebagProps } from './View.types';

const Pokebag = ({ hasNew, onClick }: PokebagProps) => {
  return (
    <div className={styles.pokebagWrap} onClick={onClick}>
      <Link href="/pokemon/collections">
        <div className={styles.inner}>
          {hasNew && <div className={styles.notif}>!</div>}
          <div className={styles.icon}></div>
        </div>
      </Link>
    </div>
  );
};

export default Pokebag;
