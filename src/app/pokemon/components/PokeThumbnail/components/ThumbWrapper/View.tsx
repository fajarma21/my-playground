import React, { unstable_ViewTransition as ViewTransition } from "react";
import { ThumbWrapperProps } from "./View.types";

const ThumbWrapper = ({ children, viewTransition }: ThumbWrapperProps) => {
  if (viewTransition) {
    return <ViewTransition name={viewTransition}>{children}</ViewTransition>;
  }
  return <>{children}</>;
};

export default ThumbWrapper;
