import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";

import getRoundNumber from "@/utils/getRoundNumber";
import { HistoryData } from "@/app/client-video-converter/types";

import styles from "./View.module.css";
import { HistoryProps } from "./View.types";
import Dialog from "@/components/Dialog";

const History = ({ list }: HistoryProps) => {
  const [display, setDisplay] = useState(false);
  const [selectedData, setSelectedData] = useState<HistoryData>();

  const toggleDialog = () => {
    setDisplay((prev) => !prev);
  };

  const handleClick = (data: HistoryData) => {
    setSelectedData(data);
    toggleDialog();
  };

  return (
    <>
      <div className={styles.historyContainer}>
        <h3>History</h3>
        <table>
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Duration</th>
              <th>Bitrate</th>
              <th>Size</th>
              <th>Convert Duration</th>
              <th>Video</th>
            </tr>
          </thead>
          <tbody>
            {list.length ? (
              list.map((item) => (
                <tr key={item.url}>
                  <td>
                    {item.width}x{item.height}
                  </td>
                  <td>{getRoundNumber(item.duration, 2)} s</td>
                  <td>{getRoundNumber(item.size / 1000, 2)} kb</td>
                  <td>{getRoundNumber(item.kbps, 2)} Kbps</td>
                  <td>{getRoundNumber(item.convertDuration, 2)} s</td>
                  <td>
                    <button
                      type="button"
                      className={styles.expandBtn}
                      onClick={() => handleClick(item)}
                    >
                      <FaEye aria-label="Open video" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No history</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Dialog
        display={display}
        overlayClassName={styles.overlay}
        onClose={toggleDialog}
      >
        {selectedData && (
          <video controls src={selectedData.url} className={styles.video} />
        )}
      </Dialog>
    </>
  );
};

export default History;
