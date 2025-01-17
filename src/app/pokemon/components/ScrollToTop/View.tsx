import React from "react";

import styles from "./View.module.css";
import { ScrollToTopProps } from "./View.types";

const ScrollToTop = ({ display }: ScrollToTopProps) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={styles.scrollTop}
      data-display={display || undefined}
      onClick={handleScrollToTop}
    />
  );
};

export default ScrollToTop;
