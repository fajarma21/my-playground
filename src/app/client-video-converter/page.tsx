"use client";

import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
} from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

import {
  HistoryData,
  OptionData,
  VideoData,
} from "@/app/client-video-converter/types";
import canUseDOM from "@/utils/canUseDOM";
import getRoundNumber from "@/utils/getRoundNumber";

import Options from "./components/Options";
import Message from "./components/Message";
import VideoContainer from "./components/VideoContainer";
import ConvertContainer from "./components/ConvertContainer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import UploadBtn from "./components/UploadBtn";
import History from "./components/History";
import Footer from "./components/Footer";

import { generateCommand, getData, getFileName, getURLs } from "./View.helpers";
import styles from "./View.module.css";

const ClientVideoConverter = () => {
  const ffmpegRef = useRef<FFmpeg>(null);

  const [enableMT, setEnableMT] = useState(false);
  const [init, setInit] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);

  const [videoFile, setVideoFile] = useState<File>();
  const [originData, setOriginData] = useState<VideoData>();
  const [resultData, setResultData] = useState<VideoData>();
  const [history, setHistory] = useState<HistoryData[]>([]);

  const [options, setOptions] = useState<OptionData>({
    id: 0,
    height: "",
    width: "",
    duration: "",
    extension: "",
    frameRate: "",
  });

  const [converting, setConverting] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [finishTime, setFinishTime] = useState(0);

  const { extension, frameRate } = options;
  const isFinished = progress >= 100 && Boolean(resultData);

  const load = useCallback(async () => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;
    ffmpeg.on("log", ({ message }) => {
      if (message.toLowerCase() !== "aborted()") {
        setMessages((prev) => [...prev, message]);
      }
    });
    ffmpeg.on("progress", ({ progress: p }) => {
      setProgress(p > 100 ? 0 : p * 100);
    });

    const { coreURL, wasmURL, workerURL } = getURLs(enableMT);

    await ffmpeg.load({
      coreURL: await toBlobURL(coreURL, "text/javascript"),
      wasmURL: await toBlobURL(wasmURL, "application/wasm"),
      workerURL: workerURL
        ? await toBlobURL(workerURL, "text/javascript")
        : undefined,
    });
    setIsReady(true);
  }, [enableMT]);

  const transcode = async (file: File) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;

    setConverting(true);

    const { name } = file;
    setMessages((prev) => [...prev, `----- start converting ${name} -----`]);

    try {
      const startTime = performance.now();

      const resultName = `${getFileName(name)}_output.${extension}`;
      await ffmpeg.writeFile(name, await fetchFile(file));

      const command = generateCommand(options);
      await ffmpeg.exec(["-i", name, "-c:a", "copy", ...command, resultName]);
      const data = await ffmpeg.readFile(resultName);

      if (typeof data !== "string") {
        const buffer = data.buffer as BlobPart;
        const outputFile = new File([buffer], resultName, {
          type: `video/${extension}`,
        });

        if (outputFile.size < 100) throw new Error("Unknown Error");

        const result = await getData(outputFile);
        setResultData(result);
        setConverting(false);
        setMessages((prev) => [...prev, "----- finished -----"]);

        const endTime = performance.now();
        const timeSecond = (endTime - startTime) / 1000;
        const time = getRoundNumber(timeSecond);
        setFinishTime(time);
        setHistory((prev) => [
          {
            ...result,
            convertDuration: time,
            frameRate: Number(frameRate),
          },
          ...prev,
        ]);
      }
    } catch (error) {
      setConverting(false);
      setProgress(0);
      setMessages((prev) => [
        ...prev,
        `something went wrong: ${error}`,
        "----- terminated -----",
      ]);
      setIsError(true);
      ffmpegRef.current = new FFmpeg();
      load();
    }
  };

  const handleInputFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setProgress(0);
      setResultData(undefined);
      setVideoFile(files[0]);

      try {
        const result = await getData(files[0]);
        setOptions((prev) => ({
          ...prev,
          id: prev.id + 1,
          height: `${result.height}`,
          width: `${result.width}`,
          duration: `${result.duration}`,
          extension: "mp4",
          frameRate: "",
        }));
        setOriginData(result);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRemoveResult = () => {
    setProgress(0);
    setResultData(undefined);
  };

  const handleTranscode = () => {
    if (videoFile) {
      handleRemoveResult();
      transcode(videoFile);
    }
  };

  const handleChangeOption = (data: OptionData) => {
    setOptions(data);
  };

  useEffect(() => {
    if (canUseDOM) setEnableMT(window.crossOriginIsolated);
    ffmpegRef.current = new FFmpeg();
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) load();
  }, [init, load]);

  return (
    <div className={styles.outer}>
      <Header />
      <div className={styles.container}>
        {isReady ? (
          <div data-converting={converting || undefined}>
            <div className={styles.row}>
              <VideoContainer title="Origin" videoData={originData}>
                <UploadBtn display={!converting} onChange={handleInputFile} />
              </VideoContainer>

              <ConvertContainer
                converting={converting}
                disabled={!videoFile || converting || Boolean(progress)}
                enableMT={enableMT}
                finished={isFinished}
                finishTime={finishTime}
                onClickConvert={handleTranscode}
              />

              <VideoContainer
                title="Result"
                videoData={resultData}
                onClickRemove={handleRemoveResult}
              >
                {!resultData && (
                  <p>{isError ? "Error" : `${Math.round(progress)}%`}</p>
                )}
                {Boolean(resultData) && (
                  <button
                    type="button"
                    data-control
                    className={`${styles.videoBtn} ${styles.videoRemove}`}
                    onClick={handleRemoveResult}
                  >
                    <FaRegTrashCan
                      size={20}
                      color="white"
                      aria-label="Remove video result"
                    />
                  </button>
                )}
              </VideoContainer>
            </div>
            <div className={styles.bottomRow}>
              <Message messages={messages} />
              <Options
                key={options.id}
                display={Boolean(originData)}
                data={options}
                onChange={handleChangeOption}
              />
            </div>
            <History list={history} />
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ClientVideoConverter;
