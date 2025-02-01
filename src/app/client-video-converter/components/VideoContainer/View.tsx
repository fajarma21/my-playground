import React from "react";

import DataAccordion from "./components/DataAccordion";

import styles from "./View.module.css";
import { VideoContainerProps } from "./View.types";

const VideoContainer = ({
  children,
  title,
  videoData,
}: VideoContainerProps) => {
  return (
    <div className={styles.videoContainer} data-title={title}>
      {videoData && (
        <video controls src={videoData.url} className={styles.video} />
      )}
      <div className={styles.absoluteCenter}>
        {children}
        {videoData && <DataAccordion key={videoData.url} data={videoData} />}
      </div>
    </div>
  );
};

export default VideoContainer;
