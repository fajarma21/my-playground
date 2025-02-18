import React, { CSSProperties } from "react";

import styles from "./View.module.css";
import { StatusProps } from "./View.types";

const Status = ({ amount, color, text }: StatusProps) => {
  const inline = {
    "--amount": `${amount}%`,
    "--color": color,
  } as CSSProperties;

  return (
    <div className={styles.container} style={inline}>
      <div className={styles.status} />
      <p>{text}</p>
    </div>
  );
};

export default Status;
