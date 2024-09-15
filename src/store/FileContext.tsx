import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";

import { Formats, FileContextType } from "../types/FileContext";
import { useErrorToast } from "../hooks/useErrorToast";

const formats: Formats = {
  // image: [
  //   ".jpg",
  //   ".jpeg",
  //   ".png",
  //   ".gif",
  //   ".bmp",
  //   ".webp",
  //   ".ico",
  //   ".tif",
  //   ".tiff",
  //   ".svg",
  //   ".raw",
  //   ".tga",
  // ],
  video: [
    ".mp4",
    ".m4v",
    ".mp4v",
    ".3gp",
    ".3g2",
    ".avi",
    ".mov",
    ".wmv",
    ".mkv",
    ".flv",
    ".ogv",
    ".webm",
    ".h264",
    ".264",
    ".hevc",
    ".265",
  ],
  audio: [".mp3", ".wav", ".ogg", ".aac", ".wma", ".flac", ".m4a"],
};

const FileContext = createContext<FileContextType>({
  files: [],
  setFiles: () => {},
  ffmpegLoaded: false,
  setFfmpegLoaded: () => {},
  isAllConverted: false,
  setIsAllConverted: () => {},
  formats,
  transcode: async () => {},
});

const FileContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [ffmpegLoaded, setFfmpegLoaded] = useState<boolean>(false);
  const [isAllConverted, setIsAllConverted] = useState<boolean>(false);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const { showErrorToast } = useErrorToast();

  // Load FFmpeg
  useEffect(() => {
    const loadFfmpeg = async () => {
      try {
        const ffmpeg = new FFmpeg();
        ffmpegRef.current = ffmpeg;
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
        // ffmpeg.on("log", ({ message }) => {
        //   console.log(message);
        // });
        // Try loading the FFmpeg core
        await ffmpeg.load({
          coreURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.js`,
            "text/javascript"
          ),
          wasmURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.wasm`,
            "application/wasm"
          ),
        });
        setFfmpegLoaded(true);
      } catch (error) {
        showErrorToast("Error loading FFmpeg. Please try again.");
      }
    };
    loadFfmpeg();
  }, []);

  // check if all files are converted
  useEffect(() => {
    const allFilesConverted = files.every((file) => file.custom.isConverted);
    setIsAllConverted(allFilesConverted);
  }, [files]);

  // Transcode the file
  const transcode = async (index: number) => {
    const inputFile = files[index].file;
    const inputFileExtentsion = files[index].file.path.split(".")[1];
    const outputFileName =
      files[index].file.path.split(".")[0] + files[index].custom.finalFormat;

    if (!ffmpegLoaded) {
      showErrorToast("FFmpeg is not loaded yet.");
      return;
    }

    try {
      if (files[index].custom.finalFormat) {
        //upddate isConverting to true
        setFiles((prev) => {
          return prev.map((prevFile) => {
            if (prevFile.file.path === files[index].file.path) {
              return {
                ...prevFile,
                custom: { ...prevFile.custom, isConverting: true },
              };
            }
            return prevFile;
          });
        });

        const ffmpeg = ffmpegRef.current;

        await ffmpeg?.writeFile(
          inputFileExtentsion,
          await fetchFile(inputFile)
        );
        await ffmpeg?.exec(["-i", inputFileExtentsion, outputFileName]);
        const fileData = await ffmpeg?.readFile(outputFileName);
        const data = new Uint8Array(fileData as ArrayBuffer);
        const outData = URL.createObjectURL(
          new Blob([data.buffer], { type: inputFile.type.split("/")[0] })
        );

        //upddate isConverting, isConverted, url
        setFiles((prev) => {
          return prev.map((prevFile) => {
            if (prevFile.file.path === files[index].file.path) {
              return {
                ...prevFile,
                custom: {
                  ...prevFile.custom,
                  isConverting: false,
                  isConverted: true,
                  url: outData,
                },
              };
            }
            return prevFile;
          });
        });
      } else {
        showErrorToast("No final format selected.");
        return;
      }
      //   Handle the output data (e.g., download or preview)
    } catch (error) {
      showErrorToast("Error during transcoding: " + error);
    }
  };

  return (
    <FileContext.Provider
      value={{
        files,
        setFiles,
        ffmpegLoaded,
        setFfmpegLoaded,
        isAllConverted,
        setIsAllConverted,
        formats,
        transcode,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export { FileContextProvider, FileContext };
