import React, { useRef } from "react";
import { FaRegFolderOpen } from "react-icons/fa6";

import { ACCEPTED_VIDEO } from "./View.constants";
import styles from "./View.module.css";
import { UploadBtnProps } from "./View.types";

const UploadBtn = ({ display, onChange }: UploadBtnProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={ACCEPTED_VIDEO}
        onChange={onChange}
      />
      {display && (
        <button
          type="button"
          data-control
          className={`${styles.videoBtn} ${styles.videoUpload}`}
          onClick={handleClick}
        >
          <FaRegFolderOpen size={20} color="white" />
        </button>
      )}
    </>
  );
};

export default UploadBtn;
