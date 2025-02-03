export interface DimensionData {
  height: number;
  width: number;
}

export interface RateData {
  duration: number;
  bitrate: number;
}

export interface VideoData extends DimensionData, RateData {
  extension: string;
  frameRate: number;
  size: number;
  url: string;
}

export interface HistoryData extends VideoData {
  convertDuration: number;
}

export interface OptionData {
  id: number;
  duration: string;
  extension: string;
  frameRate: string;
  height: string;
  width: string;
}
