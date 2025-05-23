import TypeChip from '@/app/pokemon/components/TypeChip';
import IntersectSection from '@/components/IntersectSection';

import styles from './View.module.css';
import type { MovesProps } from './View.types';

const Moves = ({ moves }: MovesProps) => {
  return (
    <IntersectSection>
      <h3>Moves ({moves.length})</h3>
      <div className={styles.scrollRow}>
        {moves.map((item, index) => {
          const { move } = item || {};
          const { name: moveName = '' } = move || {};
          return <TypeChip key={`type-${index}`}>{moveName}</TypeChip>;
        })}
      </div>
    </IntersectSection>
  );
};

export default Moves;
