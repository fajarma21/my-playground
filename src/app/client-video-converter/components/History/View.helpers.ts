import { HistoryData } from "@/app/client-video-converter/types";
import formatThousandUnit from "@/utils/formatThousandUnit";
import formatTime from "@/utils/formatTime";
import {
  CONDITIONS_BITRATE,
  CONDITIONS_SIZE,
} from "@/app/client-video-converter/constants";

export const getFormattedData = (data: HistoryData) => {
  const {
    bitrate,
    convertDuration,
    duration,
    frameRate,
    height,
    size,
    url,
    width,
  } = data;

  return {
    bitrate: formatThousandUnit(bitrate, CONDITIONS_BITRATE),
    convertDuration: `${convertDuration} s`,
    dimension: `${width}x${height}`,
    duration: formatTime(Math.round(duration * 1000)),
    frameRate: frameRate ? `${frameRate} fps` : "-",
    size: formatThousandUnit(size, CONDITIONS_SIZE),
    url,
  };
};
