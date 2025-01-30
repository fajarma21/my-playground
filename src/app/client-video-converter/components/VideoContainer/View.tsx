import React from "react";

import styles from "./View.module.css";
import { VideoContainerProps } from "./View.types";

const VideoContainer = ({ children, title, videoURL }: VideoContainerProps) => {
  return (
    <div className={styles.videoContainer} data-title={title}>
      {videoURL && <video controls src={videoURL} className={styles.video} />}
      <div className={styles.absoluteCenter}>{children}</div>
    </div>
  );
};

export default VideoContainer;
