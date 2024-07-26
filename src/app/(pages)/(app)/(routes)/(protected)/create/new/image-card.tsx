import React, { useEffect, useState } from "react";
import { Loader2, Trash } from "lucide-react";
import Image from "next/image";
import { FileItem } from "./schema";
import { useBase64Encoder } from "@/hooks/use-base64";

type Props = FileItem & {
  drop?: (id: string) => void;
  setFileUrl: (p: { id: string; file: string }) => void;
};

export const ImageCard = ({ file, id, drop, setFileUrl }: Props) => {
  const { base64, encoding, pick } = useBase64Encoder();

  useEffect(() => {
    if (encoding) return;
    if (base64) {
      setFileUrl({ id, file: base64 });
    }
  }, [base64]);

  useEffect(() => {
    if (encoding) return;

    if (file) {
      pick(file);
    }
  }, []);

  return (
    <div className="size-16 bg-neutral-100 rounded-[8px] relative">
      <div className="absolute inset-0 z-[10]">
        <div className="group relative h-full w-full flex items-center justify-center">
          {encoding && (
            <Loader2 className="text-primary-500 animate-spin size-7" />
          )}

          {typeof base64 == "string" && (
            <Image
              src={base64}
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
