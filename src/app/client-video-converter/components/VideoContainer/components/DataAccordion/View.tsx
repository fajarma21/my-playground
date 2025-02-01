import React, { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";

import getRoundNumber from "@/utils/getRoundNumber";

import styles from "./View.module.css";
import { DataAccordionProps } from "./View.types";

const DataAccordion = ({ data }: DataAccordionProps) => {
  const { duration, extension, height, kbps, size, width } = data;

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
              <td>
                {width}x{height}
              </td>
            </tr>
            <tr>
              <td>Size</td>
              <td>{getRoundNumber(size / 1000, 2)} kb</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>{getRoundNumber(duration, 2)} s</td>
            </tr>
            <tr>
              <td>Bitrate</td>
              <td>{getRoundNumber(kbps, 2)} Kbps</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataAccordion;
