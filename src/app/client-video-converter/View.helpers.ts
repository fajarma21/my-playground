import { BASE_MT_URL, BASE_URL } from "./View.constants";

export const getURLs = (enableMT: boolean) => {
  const baseURL = enableMT ? BASE_MT_URL : BASE_URL;
  return {
    coreURL: `${baseURL}/ffmpeg-core.js`,
    wasmURL: `${baseURL}/ffmpeg-core.wasm`,
    workerURL: enableMT ? `${baseURL}/ffmpeg-core.worker.js` : undefined,
  };
};

export const msToSecond = (mili: number, decimalCount = 0) => {
  const decimalValue = Math.pow(10, decimalCount);
  return Math.round((mili / 1000) * decimalValue) / decimalValue;
};
