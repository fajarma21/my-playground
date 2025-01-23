import useDisplayIntersect from "@/utils/useDisplayIntersect";
import React from "react";
import styles from "./View.module.css";
import { IntersectSectionProps } from "./View.types";

const IntersectSection = ({ children }: IntersectSectionProps) => {
  const { ref, intersecting } = useDisplayIntersect({ threshold: 0.3 });

  return (
    <section ref={ref}>
      <div className={styles.section} data-display={intersecting || undefined}>
        {children}
      </div>
    </section>
  );
};

export default IntersectSection;
