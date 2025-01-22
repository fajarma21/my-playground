import React from "react";
import styles from "./View.module.css";
import Pokeball from "@/app/pokemon/components/Pokeball";

const EmptyState = () => {
  return (
    <div className={styles.emptyWrapper}>
      <div className={styles.ballWrapper}>
        <Pokeball rotating />
      </div>
      <p>
        ...
        <br />
        There is nothing here.
        <br />
        Go throw some pokeballs.
      </p>
    </div>
  );
};

export default EmptyState;
