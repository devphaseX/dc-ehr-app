import { createNewResourceSchema } from "@/app/(pages)/(app)/(routes)/(protected)/create/new/schema";
import { mapRecordToFormData } from "@/lib/utils";
import { useApi } from "@/providers/auth";
import { useMutation } from "@tanstack/react-query";
import { TypeOf } from "zod";

const schema = createNewResourceSchema.transform(
  ({ fileName, category, subject, description, files }) => ({
    ResourceName: fileName,
    CategoryId: category,
    Subject: subject,
    Description: description,
    resourceFile: files.map((file) => file.fileUrl!),
  }),
);

export const useCreateResource = () => {
  const api = useApi();
  return useMutation({
    mutationKey: ["create-resource"],
    mutationFn: async (form: TypeOf<typeof createNewResourceSchema>) => {
      const payload = schema.parse(form);
      const formData = mapRecordToFormData(payload);
      const {} = await api.post("/Resource/CreateResource", formData);
    },
  });
};
