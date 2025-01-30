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

import canUseDOM from "@/utils/canUseDOM";

import Options from "./components/Options";
import Message from "./components/Message";
import VideoContainer from "./components/VideoContainer";
import ConvertContainer from "./components/ConvertContainer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import UploadBtn from "./components/UploadBtn";

import { getURLs, msToSecond } from "./View.helpers";
import styles from "./View.module.css";

const ClientVideoConverter = () => {
  const ffmpegRef = useRef<FFmpeg>(null);

  const [enableMT, setEnableMT] = useState(false);
  const [init, setInit] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [converting, setConverting] = useState(false);
  const [videoFile, setVideoFile] = useState<File>();
  const [videoURL, setVideoURL] = useState("");
  const [videoResult, setVideoResult] = useState("");
  const [finishTime, setFinishTime] = useState(0);

  const isFinished = progress >= 100 && Boolean(videoResult);

  const load = useCallback(async () => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;
    ffmpeg.on("log", ({ message }) => {
      if (message.toLowerCase() !== "aborted()") {
        setMessages((prev) => [...prev, message]);
      }
    });
    ffmpeg.on("progress", ({ progress: p }) => {
      setProgress(p * 100);
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
      let endTime = 0;

      await ffmpeg.writeFile(name, await fetchFile(file));
      await ffmpeg.exec(["-i", name, "output.mp4"]);
      const data = await ffmpeg.readFile("output.mp4");

      if (typeof data !== "string") {
        const buffer = data.buffer as BlobPart;
        const result = URL.createObjectURL(
          new Blob([buffer], { type: "video/mp4" })
        );
        setConverting(false);
        setVideoResult(result);
        setMessages((prev) => [...prev, "----- finished -----"]);

        endTime = performance.now();
      }

      const time = msToSecond(endTime - startTime, 2);
      setFinishTime(time);
    } catch (error) {
      setConverting(false);
      setProgress(0);
      setMessages((prev) => [
        ...prev,
        `something went wrong: ${error}`,
        "----- terminated -----",
      ]);
    }
    console.log();
  };

  const handleInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setProgress(0);
      setVideoResult("");
      setVideoFile(files[0]);

      const reader = new FileReader();
      reader.onload = () => {
        const videoUrl = reader.result;
        if (typeof videoUrl === "string") setVideoURL(videoUrl);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleRemoveResult = () => {
    setProgress(0);
    setVideoResult("");
  };

  const handleTranscode = () => {
    if (videoFile) {
      handleRemoveResult();
      transcode(videoFile);
    }
  };

  useEffect(() => {
    if (canUseDOM) setEnableMT(window.crossOriginIsolated);
    ffmpegRef.current = new FFmpeg();
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) load();
  }, [init, load]);

  // TODO: next detail video

  return (
    <>
      <Header />
      <div className={styles.container}>
        {isReady ? (
          <div data-converting={converting || undefined}>
            <div className={styles.row}>
              <VideoContainer title="Origin" videoURL={videoURL}>
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
                videoURL={videoResult}
                onClickRemove={handleRemoveResult}
              >
                {!videoResult && <p>{Math.round(progress)}%</p>}
                {Boolean(videoResult) && (
                  <button
                    type="button"
                    data-control
                    className={`${styles.videoBtn} ${styles.videoRemove}`}
                    onClick={handleRemoveResult}
                  >
                    <FaRegTrashCan size={20} color="white" />
                  </button>
                )}
              </VideoContainer>
            </div>
            <div className={styles.bottomRow}>
              <Message messages={messages} />
              <Options />
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default ClientVideoConverter;
