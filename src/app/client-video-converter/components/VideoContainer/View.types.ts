import { ReactNode } from "react";
import { VideoData } from "@/app/client-video-converter/types";

export interface VideoContainerProps {
  children: ReactNode;
  title: string;
  videoData?: VideoData;
  onClickRemove?: () => void;
}
