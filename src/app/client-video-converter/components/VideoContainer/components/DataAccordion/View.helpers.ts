import { VideoData } from "@/app/client-video-converter/types";
import {
  CONDITIONS_BITRATE,
  CONDITIONS_SIZE,
} from "@/app/client-video-converter/constants";
import formatTime from "@/utils/formatTime";
import formatThousandUnit from "@/utils/formatThousandUnit";

export const getFormattedData = (data: VideoData) => {
  const { bitrate, duration, extension, height, size, width } = data;

  return {
    bitrate: formatThousandUnit(bitrate, CONDITIONS_BITRATE),
    dimension: `${width}x${height}`,
    duration: formatTime(Math.round(duration * 1000)),
    extension,
    size: formatThousandUnit(size, CONDITIONS_SIZE),
  };
};
