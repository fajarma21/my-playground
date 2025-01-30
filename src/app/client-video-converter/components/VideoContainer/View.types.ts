import { ReactNode } from "react";

export interface VideoContainerProps {
  children: ReactNode;
  title: string;
  videoURL: string;
  onClickRemove?: () => void;
}
