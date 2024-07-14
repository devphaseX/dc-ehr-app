import React, { useEffect, useState } from "react";
import { Loader2, Trash } from "lucide-react";
import Image from "next/image";

type Props = {
  id: string;
  file: File;
  drop?: (id: string) => void;
  fileUrl?: string;
  setFileUrl: (base64File: string) => void;
};

export const ImageCard = ({ file, id, drop, fileUrl, setFileUrl }: Props) => {
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const [encoding, setEncoding] = useState(false);

  useEffect(() => {
    if (file != activeFile) {
      if (file === null) return;
      (async () => {
        const reader = new FileReader();
        reader.onloadstart = () => {
          setEncoding(true);
          setActiveFile(file);
        };

        reader.readAsDataURL(file);
        reader.onload = () => {
          setTimeout(() => {
            setFileUrl(reader.result as string);
            setEncoding(false);
          }, 1000);
        };
      })();
    }
  }, [file]);

  return (
    <div className="size-16 bg-neutral-100 rounded-[8px] relative">
      <div className="absolute inset-0 z-[10]">
        <div className="group relative h-full w-full flex items-center justify-center">
          {encoding && (
            <Loader2 className="text-primary-500 animate-spin size-7" />
          )}

          {fileUrl && (
            <Image
              src={fileUrl}
              alt="uploaded-image"
              fill
              className="object-fill"
            />
          )}

          <span
            className="group-hover:visible invisible absolute top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2 text-white/60"
            onClick={() => {
              drop?.(id);
            }}
          >
            <Trash className="size-5" />
          </span>
        </div>
      </div>
    </div>
  );
};
