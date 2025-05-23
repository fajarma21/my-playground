import styles from './View.module.css';
import type { TypeChipProps } from './View.types';

const TypeChip = ({ long, type, children }: TypeChipProps) => {
  return (
    <div
      className={styles.chip}
      data-type={type || undefined}
      data-long={long || undefined}
    >
      {children}
    </div>
  );
};

export default TypeChip;
