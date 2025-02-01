import {
  DimensionData,
  OptionData,
  RateData,
  VideoData,
} from "@/app/client-video-converter/types";
import { BASE_MT_URL, BASE_URL } from "./View.constants";

export const getURLs = (enableMT: boolean) => {
  const baseURL = enableMT ? BASE_MT_URL : BASE_URL;
  return {
    coreURL: `${baseURL}/ffmpeg-core.js`,
    wasmURL: `${baseURL}/ffmpeg-core.wasm`,
    workerURL: enableMT ? `${baseURL}/ffmpeg-core.worker.js` : undefined,
  };
};

export const getFileName = (name: string) => {
  return name.replace(/\.(\w|\d)*$/, "");
};

const getError = (source: string, error: string | Event) => {
  return JSON.stringify({ source, error });
};

const getExtension = (name: string) => {
  const splitted = name.split(".");
  return splitted[splitted.length - 1];
};

const getRateData = (url: string, size: number): Promise<RateData> => {
  return new Promise((resolve, reject) => {
    const media = new Audio(url);
    media.onloadedmetadata = () => {
      const bitrate = (size * 8) / media.duration;
      resolve({
        duration: media.duration,
        bps: bitrate,
        kbps: bitrate / 1000,
        mbps: bitrate / 1000000,
      });
    };
    media.onerror = (error) => reject(getError("getRateData", error));
  });
};

const getDimension = (url: string): Promise<DimensionData> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.setAttribute("src", url);
    video.onloadedmetadata = () => {
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
      });
    };
    video.onerror = (error) => reject(getError("getDimension", error));
  });
};

export const getData = (file: File): Promise<VideoData> => {
  return new Promise((resolve, reject) => {
    const { name, size } = file;
    const reader = new FileReader();
    reader.onload = async () => {
      const videoUrl = String(reader.result);
      const rate = await getRateData(videoUrl, size);
      const dimension = await getDimension(videoUrl);

      resolve({
        ...rate,
        ...dimension,
        extension: getExtension(name),
        size,
        url: videoUrl,
      });
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(getError("getData", error));
  });
};

const getValidDimension = (value: number) => {
  const valid = value % 2 ? value + 1 : value;
  return String(valid);
};

export const generateCommand = ({
  duration,
  frameRate,
  height,
  width,
}: OptionData) => {
  const command = [];

  if (Number(duration)) command.push(...["-t", duration]);
  if (Number(frameRate)) command.push(...["-r", frameRate]);
  if (Number(height) && Number(width)) {
    const validW = getValidDimension(Number(width));
    const validH = getValidDimension(Number(height));
    command.push(...["-s", `${validW}x${validH}`]);
  }

  return command;
};
