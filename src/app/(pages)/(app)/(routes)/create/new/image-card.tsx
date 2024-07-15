import React, { useEffect, useState } from "react";
import { Loader2, Trash } from "lucide-react";
import Image from "next/image";
import { FileItem } from "./schema";

type Props = FileItem & {
  drop?: (id: string) => void;
  setFileUrl: (p: Promise<string>) => void;
};

export const ImageCard = ({ file, id, drop, fileUrl, setFileUrl }: Props) => {
  const [encoding, setEncoding] = useState(false);

  useEffect(() => {
    (async () => {
      if (file == null) return;

      setFileUrl(
        new Promise<string>((res) => {
          const reader = new FileReader();
          reader.onloadstart = () => {
            setEncoding(true);
          };

          reader.readAsDataURL(file);
          reader.onload = () => {
            setTimeout(() => {
              res(reader.result as string);
              setEncoding(false);
            }, 500);
          };
        }),
      );
    })();
  }, [file]);

  return (
    <div className="size-16 bg-neutral-100 rounded-[8px] relative">
      <div className="absolute inset-0 z-[10]">
        <div className="group relative h-full w-full flex items-center justify-center">
          {encoding && (
            <Loader2 className="text-primary-500 animate-spin size-7" />
          )}

          {typeof fileUrl == "string" && (
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
