import { Dialog } from 'fajarma-react-lib';
import { useState } from 'react';
import { FaCircleQuestion } from 'react-icons/fa6';

import styles from './View.module.css';
import type { ConvertContainerProps } from './View.types';

const ConvertContainer = ({
  converting,
  disabled,
  enableMT,
  finished,
  finishTime,
  onClickConvert,
}: ConvertContainerProps) => {
  const [display, setDisplay] = useState(false);

  const toggleDialog = () => {
    setDisplay((prev) => !prev);
  };

  const threadMode = enableMT ? 'Multi' : 'Single';

  return (
    <>
      <div>
        <div className={styles.helpContainer}>
          <button
            type="button"
            className={styles.helpBtn}
            onClick={toggleDialog}
          >
            <FaCircleQuestion
              color="white"
              aria-label={`${threadMode}-thread explanation`}
            />
          </button>
        </div>
        <div className={styles.mode}>{threadMode}-thread converter</div>
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
              {converting ? '' : 'Convert'}
            </button>
          )}
        </div>
      </div>

      <Dialog
        display={display}
        className={styles.dialog}
        overlayClassName={styles.overlay}
        onClose={toggleDialog}
      >
        <p>
          This threading-thing is depends on <b>crossOriginIsolated</b> status.
        </p>
        <br />
        <p>
          <b>crossOriginIsolated</b> will allow browser to use{' '}
          <b>SharedArrayBuffer</b> which will be used while transcoding. This
          will enable multi-thread transcoding and it makes transcoding faster.
        </p>
        <br />
        <p>Otherwise, transcoding progress will proceed at normal speed.</p>
        <br />
        <p>
          Learn more about <b>crossOriginIsolated</b> and how to enable it{' '}
          <a href="https://web.dev/articles/coop-coep" target="_blank">
            here
          </a>
          .
        </p>
      </Dialog>
    </>
  );
};

export default ConvertContainer;
