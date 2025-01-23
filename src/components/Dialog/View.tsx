"use client";

import React, { useEffect, useRef, useState } from "react";
import Portal from "../Portal";
import styles from "./View.module.css";
import { DialogProps } from "./View.types";

const Dialog = ({
  display,
  children,
  className = "",
  overlayClassName = "",
  onClose,
}: DialogProps) => {
  const [displayDOM, setDisplayDOM] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (display) setDisplayDOM(true);
    else {
      timeoutRef.current = setTimeout(() => {
        setDisplayDOM(false);
      }, 750);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [display]);

  if (displayDOM) {
    return (
      <Portal>
        <div
          className={`${styles.overlay} ${overlayClassName}`}
          data-show={display}
          onClick={onClose}
        />
        <div className={`${styles.dialog} ${className}`} data-show={display}>
          {children}
        </div>
      </Portal>
    );
  }
  return null;
};

export default Dialog;
