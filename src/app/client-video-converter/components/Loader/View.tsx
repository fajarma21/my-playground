import React from "react";
import styles from "./View.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader} />
      <p>Loading FFMpeg core...</p>
    </div>
  );
};

export default Loader;
