import { useState, useEffect, useRef, useCallback } from "react";
import { ulid } from "ulid";

export const useBinaryStrEncoder = () => {
  const [file, setFile] = useState<{ id: string; file: File } | null>(null);
  const fileId = useRef<string | null>(file?.id ?? null);
  const [binaryUrl, setBinaryUrl] = useState<string | null>(null);
  const [encoding, setEncoding] = useState<boolean>(false);
  const resolveRef = useRef<((value: string) => void) | null>(null);

  useEffect(() => {
    if (encoding) return;
    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => {
        setEncoding(true);
      };
      reader.onloadend = () => {
        if (fileId.current && fileId.current === file.id) {
          setEncoding(false);
          const result = reader.result as string;
          setBinaryUrl(result);
          setFile(null);
          fileId.current = null;
          if (resolveRef.current) {
            resolveRef.current(result);
            resolveRef.current = null;
          }
        }
      };
      reader.readAsDataURL(file.file);
    }
  }, [file]);

  const reset = useCallback(() => {
    setBinaryUrl(null);
    setEncoding(false);
    fileId.current = null;
    setFile(null);
    resolveRef.current = null;
  }, []);

  const pick = useCallback((file: File) => {
    return new Promise<string>((resolve) => {
      const id = ulid();
      fileId.current = id;
      setFile({ id, file });
      resolveRef.current = resolve;
    });
  }, []);

  return {
    encoding,
    binaryUrl,
    pick,
    reset,
  };
};
