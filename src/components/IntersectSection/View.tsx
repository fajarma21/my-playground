import { useIntersect } from 'fajarma-react-lib';

import styles from './View.module.css';
import type { IntersectSectionProps } from './View.types';

const IntersectSection = ({ children }: IntersectSectionProps) => {
  const { ref, intersecting } = useIntersect<HTMLDivElement>({
    options: { threshold: 0.3 },
  });

  return (
    <section ref={ref}>
      <div className={styles.section} data-display={intersecting || undefined}>
        {children}
      </div>
    </section>
  );
};

export default IntersectSection;
