import { useCallback, useEffect, useRef, useState } from "react";
import { ulid } from "ulid";

export const useBase64Encoder = () => {
  const [file, setFile] = useState<{ id: string; file: File } | null>(null);
  const fileId = useRef<string | null>(file?.id ?? null);
  const [base64, setBase64] = useState<string | null>(null);
  const [encoding, setEncoding] = useState<boolean>(false);

  useEffect(() => {
    if (encoding) return;
    console.log({ file });
    if (file) {
      const reader = new FileReader();

      reader.onloadstart = () => {
        console.log("start encoding");
        setEncoding(true);
      };

      reader.onloadend = () => {
        console.log("end encoding");

        if (fileId.current && fileId.current === file.id) {
          setEncoding(false);
          setBase64(reader.result as string);
          setFile(null);
          fileId.current = null;
        }
      };

      reader.readAsDataURL(file.file);
    }
  }, [file]);

  const reset = useCallback(() => {
    setBase64(null);
    setEncoding(false);
    fileId.current = null;
    setFile(null);
  }, []);

  const pick = useCallback((file: File) => {
    const id = ulid();
    fileId.current = id;
    setFile({ id, file });
  }, []);

  return {
    encoding,
    base64,
    pick,
  };
};
