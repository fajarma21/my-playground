import React from "react";
import styles from "./View.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        <p>Client</p>Video Converter
      </h1>
    </div>
  );
};

export default Header;
