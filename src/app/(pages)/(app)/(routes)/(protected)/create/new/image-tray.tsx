"use client";
import { Button } from "@/components/ui/button";
import { LucideBatteryWarning } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { ulid } from "ulid";
import { ImageCard } from "./image-card";
import { FileItem } from "./schema";

type Props = {
  selectedFiles: Array<FileItem>;
  setSelectFiles: Dispatch<SetStateAction<FileItem[]>>;
};

const fileTypes = ["png", "jpg", "jpeg", "gif"];
export const ImageTray = ({ selectedFiles, setSelectFiles }: Props) => {
  const handleChange = (files: FileList) => {
    setSelectFiles((currentFiles) =>
      currentFiles.concat(Array.from(files, (file) => ({ id: ulid(), file }))),
    );
  };

  return (
    <div>
      <p className="text-xl font-semibold text-neutral-800 mb-4">
        Upload Files
      </p>
      <FileUploader
        handleChange={handleChange}
        name="files"
        types={fileTypes}
        hoverTitle=""
        multiple={true}
        dropMessageStyle={{
          backgroundColor: "transparent",
          display: "none",
        }}
      >
        <div className="space-y-4">
          <div className="h-[296px] bg-[#FAFBFB] rounded-[12px]  border-dotted border-[1px] border-neutral-200">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[249px] font-josefin text-center">
                <div className="space-y-2 mb-6">
                  <h5 className="text-neutral-800 text-lg font-medium">
                    Drag & drop file(s) for upload
                  </h5>
                  <p className="text-neutral-500 text-sm">
                    Valid file format “PNG”, “JPG”, “PDF”
                  </p>
                </div>
                <div>
                  <input
                    type="file"
                    id="image-file-picker"
                    style={{ display: "none" }} // Hide the default file input
                  />
                  <label
                    htmlFor="image-file-picker"
                    className="py-[14px] px-6 rounded-[48px] text-white font-semibold w-fit h-fit bg-primary-500 cursor-pointer"
                  >
                    Or browse file
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FileUploader>
      <div className="bg-primary-50 py-[6px] flex items-center justify-center mt-4">
        <div className="inline-flex items-center gap-x-2  text-primary-500">
          <LucideBatteryWarning />
          Your file size must not be more than 25MB
        </div>
      </div>

      {!!selectedFiles?.length && (
        <div className="space-y-4 mt-8">
          <p className="font-medium text-neutral-800 text-base">
            Files Uploaded
          </p>
          <div className="flex items-center gap-[10px]">
            {selectedFiles.map(({ id, file, fileUrl }) => (
              <ImageCard
                key={id}
                file={file}
                id={id}
                fileUrl={fileUrl}
                drop={() => {
                  setSelectFiles((files) =>
                    files.filter((file) => file.id !== id),
                  );
                }}
                setFileUrl={({ id, file }) =>
                  setSelectFiles((files) =>
                    files.map((fileItem) => {
                      if (fileItem.id == id) {
                        return { ...fileItem, fileUrl: file };
                      }
                      return fileItem;
                    }),
                  )
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
