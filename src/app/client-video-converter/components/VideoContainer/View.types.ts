import type { VideoData } from '@/app/client-video-converter/types';
import type { ReactNode } from 'react';

export interface VideoContainerProps {
  children: ReactNode;
  title: string;
  videoData?: VideoData;
  onClickRemove?: () => void;
}
