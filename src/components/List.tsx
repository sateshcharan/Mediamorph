import { useContext, forwardRef } from "react";
import JSZip from "jszip";

import ListItem from "./ListItem";
import { Button } from "./ui/button";

import { FileContext } from "../store/FileContext";

import { useErrorToast } from "../hooks/useErrorToast";

const List = ({}, dropzoneRef: any) => {
  const { files, setFiles, transcode, isAllConverted } =
    useContext(FileContext);

  const { showErrorToast } = useErrorToast();

  const handleDelete = (index?: number) => {
    const updatedFiles = files.filter((_: any, i: number) => i !== index);
    setFiles(updatedFiles);
  };

  const handleDeleteAll = () => {
    setFiles([]);
  };

  const handleConvert = (index: number) => {
    transcode(index);
  };

  const handleConvertAll = () => {
    let allFileFormatsSelected = true;

    files.map((file) => {
      if (!file.custom.finalFormat) {
        showErrorToast("Select Final Format for all files before converting.");
        allFileFormatsSelected = false;
      }
    });
    if (!allFileFormatsSelected) return;

    files.forEach((_, index: number) => {
      transcode(index);
    });
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    let allFilesConverted = true;

    // Check if all files are converted before proceeding
    files.forEach((file: any) => {
      if (!file.custom.url) {
        showErrorToast(`File ${file.file.name} is not converted yet.`);
        allFilesConverted = false;
      }
    });

    if (!allFilesConverted) return;

    // Add the converted files to the ZIP
    await Promise.all(
      files.map(async (file: any) => {
        if (file.custom.url) {
          const fileName =
            file.file.name.split(".")[0] + file.custom.finalFormat;
          try {
            const response = await fetch(file.custom.url);
            const blob = await response.blob();
            zip.file(fileName, blob);
          } catch (err) {
            console.error(`Error fetching file ${fileName}:`, err);
            showErrorToast(`Failed to add ${fileName} to the zip.`);
          }
        }
      })
    );

    // Generate the ZIP and download it
    try {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a");
      const url = URL.createObjectURL(zipBlob);
      a.href = url;
      a.download = "converted-files.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      showErrorToast("Failed to generate zip file.");
    }
  };

  const handleReselect = () => {
    dropzoneRef.current.open();
  };

  return (
    <>
      <div className="flex flex-row justify-end gap-2 w-3/4">
        <Button variant={"outline"} className="" onClick={handleReselect}>
          Reselect
        </Button>
        <Button
          variant={"outline"}
          className="bg-red-600 text-white"
          onClick={handleDeleteAll}
        >
          Delete All
        </Button>

        {isAllConverted ? (
          <Button
            variant={"outline"}
            className="bg-blue-600 text-white"
            onClick={handleDownloadAll}
          >
            Download All
          </Button>
        ) : (
          <Button
            variant={"outline"}
            className="bg-green-600 text-white"
            onClick={handleConvertAll}
          >
            Convert All
          </Button>
        )}
      </div>

      {files.map((file: {}, index: number) => {
        return (
          <ListItem
            file={file}
            handleDelete={handleDelete}
            handleConvert={handleConvert}
            key={index}
            index={index}
          />
        );
      })}
    </>
  );
};

export default forwardRef(List);
