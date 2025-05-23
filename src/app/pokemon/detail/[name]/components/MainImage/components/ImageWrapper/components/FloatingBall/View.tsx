import Pokeball from '@/app/pokemon/components/Pokeball';

import styles from './View.module.css';
import type { FloatingBallProps } from './View.types';

const FloatingBall = ({
  display,
  throwing,
  onClickBall,
}: FloatingBallProps) => {
  return (
    <div className={styles.pokeballWrap} data-display={display || undefined}>
      <button
        type="button"
        className={styles.btnModifier}
        data-throw={throwing || undefined}
        onClick={onClickBall}
      >
        <Pokeball rotating />
      </button>
    </div>
  );
};

export default FloatingBall;
