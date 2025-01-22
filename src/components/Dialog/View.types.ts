import { ReactNode } from "react";

export interface DialogProps {
  children: ReactNode;
  overlayClassName?: string;
  className?: string;
  display?: boolean;
  onClose: () => void;
}
