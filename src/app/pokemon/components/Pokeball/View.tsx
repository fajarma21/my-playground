import styles from './View.module.css';
import type { PokeballProps } from './View.types';

const Pokeball = ({ rotating }: PokeballProps) => {
  return (
    <div className={styles.ball} data-rotating={rotating || undefined}>
      <div className={styles.circle} />
    </div>
  );
};

export default Pokeball;
