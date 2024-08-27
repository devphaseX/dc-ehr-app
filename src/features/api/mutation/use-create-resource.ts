import { createNewResourceSchema } from "@/app/(pages)/(app)/(routes)/(protected)/create/new/schema";
import { createResourceResSchema } from "@/lib/response";
import { mapRecordToFormData } from "@/lib/utils";
import { useApi } from "@/providers/auth";
import { useMutation } from "@tanstack/react-query";
import { TypeOf } from "zod";

const schema = createNewResourceSchema.transform(
  async ({ fileName, category, subject, description, files, tags }) => {
    const resourceFile = (
      files as Array<{
        id: string;
        fileUrl?: string | undefined;
        file?: File;
      }>
    )
      .map(({ file }) => file)
      .pop();

    return {
      ResourceName: fileName,
      CategoryId: category,
      Subject: subject,
      Description: description,
      resourceFile,
      Tags: tags.map(({ tag }) => tag),
    };
  },
);

export const useCreateResource = () => {
  const api = useApi();
  return useMutation({
    mutationKey: ["create-resource"],
    mutationFn: async (form: TypeOf<typeof createNewResourceSchema>) => {
      const payload = await schema.parseAsync(form);
      const formData = mapRecordToFormData(payload);
      const { data } = await api.post("/Resource/CreateResource", formData, {
        validateResponse: (data) => createResourceResSchema.parse(data),
      });

      if (!data) {
        throw new Error("failed to create resource");
      }

      if (data.responseCode !== 200) {
        throw new Error(data.responseMessage);
      }

      return data.responseData!;
    },
  });
};
