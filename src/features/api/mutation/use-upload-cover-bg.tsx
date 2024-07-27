import { useBase64Encoder } from "@/hooks/use-base64";
import { useBinaryStrEncoder } from "@/hooks/use-binary-str";
import { useApi } from "@/providers/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUploadCoverBg = () => {
  const api = useApi();

  const mutation = useMutation({
    mutationKey: ["upload-cover-bg"],
    mutationFn: async (data: { file: File }) => {
      const formData = new FormData();
      formData.set("file", data.file);
      formData.set("pictureType", "2");
      const payload = api.put("/User/UploadProfilePicture", formData);
      return payload;
    },
  });

  return { mutation };
};
