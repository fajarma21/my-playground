import { Dialog } from 'fajarma-react-lib';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa6';

import type { HistoryData } from '@/app/client-video-converter/types';

import { getFormattedData } from './View.helpers';
import styles from './View.module.css';
import type { HistoryProps } from './View.types';

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
              <th>Frame Rate</th>
              <th>Size</th>
              <th>Convert Duration</th>
              <th>Video</th>
            </tr>
          </thead>
          <tbody>
            {list.length ? (
              list.map((item, index) => {
                const {
                  bitrate,
                  convertDuration,
                  dimension,
                  duration,
                  frameRate,
                  size,
                } = getFormattedData(item);
                return (
                  <tr key={`list-${index}`}>
                    <td>{dimension}</td>
                    <td>{duration}</td>
                    <td>{bitrate}</td>
                    <td>{frameRate}</td>
                    <td>{size}</td>
                    <td>{convertDuration}</td>
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
                );
              })
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
