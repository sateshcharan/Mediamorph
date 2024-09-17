import { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  CircleX,
  FileVideo,
  FileAudio,
  FileImageIcon,
  IterationCcw,
  Download,
} from "lucide-react";
import { Button } from "./ui/button";

import { FileContext } from "../store/FileContext";
import { MoonLoader } from "react-spinners";

type FileType = "video" | "audio" | "image";

const ListItem = ({ file, handleDelete, handleConvert, index }: any) => {
  const fileType: FileType = file.file.type.split("/")[0];
  const { formats, setFiles } = useContext(FileContext);

  return (
    <div className="flex flex-row justify-between items-center outline-2 outline outline-orange-500 w-3/4 rounded-xl p-4 m-4">
      <div className="flex flex-row items-center gap-4">
        {fileType === "video" ? (
          <FileVideo color="orange" />
        ) : fileType === "audio" ? (
          <FileAudio color="orange" />
        ) : (
          <FileImageIcon color="orange" />
        )}
        <h3 className=" text-xl font-semibold tracking-tight text-nowrap ">
          {file.file.name.slice(0, 30) + "..."}
        </h3>
        <h4 className=" text-lg font-semibold tracking-tight text-slate-500">
          {`(${(file.file.size / 1000000).toFixed(2)} MB)`}
        </h4>
      </div>

      <div className="flex flex-row items-center gap-4">
        <h3>Convert to</h3>
        <Select
          disabled={file.custom.isConverted}
          onValueChange={(value) =>
            setFiles((prev) => {
              return prev.map((prevFile) => {
                if (prevFile.file.path === file.file.path) {
                  return {
                    ...prevFile,
                    custom: { ...prevFile.custom, finalFormat: value },
                  };
                }
                return prevFile;
              });
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            {
              /*fileType === "image" ||*/ fileType === "audio" && (
                <SelectGroup>
                  <SelectLabel>{fileType.toUpperCase()}</SelectLabel>
                  {formats[fileType].map((extension: string, index: number) => (
                    <SelectItem key={index} value={extension}>
                      {extension}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )
            }

            {fileType === "video" && (
              <Tabs defaultValue="video" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="video">Video</TabsTrigger>
                  <TabsTrigger value="audio">Audio</TabsTrigger>
                </TabsList>

                <TabsContent value="video">
                  <SelectGroup>
                    <SelectLabel>Video Formats</SelectLabel>
                    {formats["video"].map(
                      (extension: string, index: number) => (
                        <SelectItem key={index} value={extension}>
                          {extension}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </TabsContent>

                <TabsContent value="audio">
                  <SelectGroup>
                    <SelectLabel>Audio Formats</SelectLabel>
                    {formats["audio"].map(
                      (extension: string, index: number) => (
                        <SelectItem key={index} value={extension}>
                          {extension}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </TabsContent>
              </Tabs>
            )}
          </SelectContent>
        </Select>

        <Button
          variant={"outline"}
          onClick={() => handleDelete(index)}
          disabled={file.custom.isConverting}
        >
          <CircleX />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            if (!file.custom.isConverted) {
              handleConvert(index); // Call conversion function
            } else {
              const a = document.createElement("a");
              a.href = file.custom.url; // The Blob URL
              a.download = `${
                file.file.name.split(".")[0] + file.custom.finalFormat
              }`; // Set the download filename with proper extension
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a); // Remove the anchor element after clicking
            }
          }}
          className={
            file.custom.isConverted
              ? "bg-green-600 text-white"
              : file.custom.isConverting
              ? "bg-blue-400"
              : ""
          }
        >
          {file.custom.isConverting ? (
            <MoonLoader size={20} />
          ) : file.custom.isConverted ? (
            <Download />
          ) : (
            <IterationCcw />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ListItem;
