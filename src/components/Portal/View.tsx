"use client";

import React from "react";
import { createPortal } from "react-dom";

import { PortalProps } from "./View.types";
import { canUseDOM } from "@/utils/canUseDOM";

const Portal = ({ children }: PortalProps) => {
  if (canUseDOM) return createPortal(children, document.body);
  return <>{children}</>;
};

export default Portal;
