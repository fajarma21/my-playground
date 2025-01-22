import React from "react";
import styles from "./View.module.css";
import { InputProps } from "./View.types";

const Input = ({ className, ...rest }: InputProps) => {
  return <input {...rest} className={`${styles.inputText} ${className}`} />;
};

export default Input;
