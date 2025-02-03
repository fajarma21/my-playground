import React, { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";

import { getFormattedData } from "./View.helpers";
import styles from "./View.module.css";
import { DataAccordionProps } from "./View.types";

const DataAccordion = ({ data }: DataAccordionProps) => {
  const { bitrate, dimension, duration, extension, size } =
    getFormattedData(data);

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={styles.accordion} data-open={open || undefined}>
      <button type="button" className={styles.accordionHead} onClick={toggle}>
        <b>Data</b>
        <FaCircleInfo />
      </button>
      <div className={styles.accordionBody}>
        <table className={styles.tableContent}>
          <tbody>
            <tr>
              <td>Extension</td>
              <td>{extension}</td>
            </tr>
            <tr>
              <td>Dimension</td>
              <td>{dimension}</td>
            </tr>
            <tr>
              <td>Size</td>
              <td>{size}</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>{duration}</td>
            </tr>
            <tr>
              <td>Bitrate</td>
              <td>{bitrate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataAccordion;
