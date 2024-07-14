import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

type Props = {
  file: File;
};

export const ImageCard = ({ file }: Props) => {
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
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
            setFileBase64(reader.result as string);
            setEncoding(false);
          }, 1000);
        };
      })();
    }
  }, [file]);

  return (
    <div className="size-16 bg-neutral-100 rounded-[8px] relative">
      <div className="absolute inset-0 z-[10]">
        <div className="h-full w-full flex items-center justify-center">
          {encoding && (
            <Loader2 className="text-primary-500 animate-spin size-7" />
          )}

          {fileBase64 && (
            <Image
              src={fileBase64}
              alt="uploaded-image"
              fill
              className="object-fill"
            />
          )}
        </div>
      </div>
    </div>
  );
};
