import { useState, useContext, useRef } from "react";
import Dropzone from "react-dropzone";

import List from "./List";
import { FileContext } from "../store/FileContext";
import { CloudUpload } from "lucide-react";

const GetFile = () => {
  const [inZone, setInZone] = useState(false);
  const dropzoneRef = useRef<any>();

  const ctx: any = useContext(FileContext);
  const { files, setFiles, formats } = ctx;

  return (
    <>
      {files.length > 0 && <List ref={dropzoneRef} />}
      <div
        className={
          "w-full flex justify-center " +
          (files.length > 0 ? "hidden" : "block")
        }
      >
        <Dropzone
          ref={dropzoneRef}
          onDragEnter={() => setInZone(true)}
          onDragLeave={() => setInZone(false)}
          onDropAccepted={() => setInZone(false)}
          onDropRejected={() => setInZone(false)}
          accept={{
            // "image/*": formats.image,
            "video/*": formats.video,
            "audio/*": formats.audio,
          }}
          onDrop={(acceptedFiles) => {
            const wrappedFiles = acceptedFiles.map((file) => ({
              file, // Original file object
              custom: { isConverted: false }, // Custom property
            }));
            setFiles(wrappedFiles);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="w-3/4">
              <input {...getInputProps()} />
              {!inZone ? (
                <div className=" w-full h-[400px] p-4 flex justify-center items-center rounded-3xl bg-green-500 flex-col text-white">
                  <CloudUpload size={64} />
                  Drag 'n' drop some files here, or click to select files
                </div>
              ) : (
                <div className=" w-full h-[400px] p-4 flex justify-center items-center rounded-3xl outline outline-2 outline-green-400">
                  Yeah! you can let go now!
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </>
  );
};

export default GetFile;
