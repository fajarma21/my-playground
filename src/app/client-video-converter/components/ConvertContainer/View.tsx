import React from "react";
import styles from "./View.module.css";
import { ConvertContainerProps } from "./View.types";

const ConvertContainer = ({
  converting,
  disabled,
  enableMT,
  finished,
  finishTime,
  onClickConvert,
}: ConvertContainerProps) => {
  return (
    <div>
      <div className={styles.mode}>
        {enableMT ? "Multi" : "Single"}-thread converter
      </div>
      <div className={styles.buttonContainer}>
        {finished ? (
          <div className={styles.finishedContainer}>
            Finished in
            <br />
            <b>{finishTime}s</b>
          </div>
        ) : (
          <button
            disabled={disabled}
            type="button"
            className={styles.convertBtn}
            onClick={onClickConvert}
          >
            {converting ? "" : "Convert"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ConvertContainer;
