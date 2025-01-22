import React, { ButtonHTMLAttributes } from "react";
import styles from "./View.module.css";

const Button = ({
  className,
  children,
  color,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      {...rest}
      className={`${styles.btnModifier} ${className}`}
      data-color={color}
    >
      {children}
    </button>
  );
};

export default Button;
