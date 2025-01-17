import React from "react";

import IntersectSection from "@/components/IntersectSection";

import styles from "./View.module.css";
import { StatsProps } from "./View.types";

const Stats = ({ stats }: StatsProps) => {
  return (
    <IntersectSection>
      <h3>Base Stats</h3>
      <table className={styles.statsTable}>
        <tbody>
          {stats.map((item, index) => {
            const { base_stat = 0, stat } = item || {};
            const { name: statName } = stat || {};
            return (
              <tr key={`row-${index}`}>
                <th>{statName}</th>
                <td>{base_stat}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </IntersectSection>
  );
};

export default Stats;
