import React from "react";
import styles from "./View.module.css";
import { useMainContext } from "../../contexts/main";
import Status from "../Status";
import { STATUSES } from "./View.constants";

const LeftSide = () => {
  const { plantData } = useMainContext();

  if (!plantData) return null;

  const { maintenance } = plantData;

  return (
    <div className={styles.leftSide}>
      {STATUSES.map((item) => (
        <Status
          key={item.text}
          amount={maintenance[item.text].amount}
          {...item}
        />
      ))}
    </div>
  );
};

export default LeftSide;
