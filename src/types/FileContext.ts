export type Formats = {
  // image: string[];
  video: string[];
  audio: string[];
};

export interface FileContextType {
  files: {
    file: any;
    custom: {
      url: string | null;
      isConverting: boolean;
      isConverted: boolean;
      finalFormat: string | null;
    };
  }[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  formats: Formats;
  ffmpegLoaded: boolean;
  setFfmpegLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  isAllConverted: boolean;
  setIsAllConverted: React.Dispatch<React.SetStateAction<boolean>>;
  transcode: (index: number) => Promise<void>;
}
