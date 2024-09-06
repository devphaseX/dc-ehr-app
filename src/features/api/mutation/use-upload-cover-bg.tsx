import { useBase64Encoder } from "@/hooks/use-base64";
import { useBinaryStrEncoder } from "@/hooks/use-binary-str";
import { useApi } from "@/providers/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUploadCoverBg = () => {
  const api = useApi();

  const client = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["upload-cover-bg"],
    mutationFn: async (data: { file: File }) => {
      const formData = new FormData();
      formData.set("file", data.file);
      const payload = api.put("/User/UploadPicture?pictureType=2", formData);
      return payload;
    },
    onSettled: (data) => {
      if (data?.status === 200) {
        client.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });

  return { mutation };
};
