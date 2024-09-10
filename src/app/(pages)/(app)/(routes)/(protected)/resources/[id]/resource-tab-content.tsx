import { parseAsStringEnum, useQueryState } from "nuqs";
import { ResourceFileCard } from "./resource-file-card";
import { useGetResourceFiles } from "@/features/api/query/use-resource-files";

export const ResourceTabContent = ({ resourceId }: { resourceId: string }) => {
  const [selectedTab, setSelectedTab] = useQueryState(
    "tab",
    parseAsStringEnum(["resources", "descriptions"]).withDefault("resources"),
  );

  const { data } = useGetResourceFiles(resourceId);

  return (
    <div className="space-y-10">
      {data?.map((item) => <ResourceFileCard key={item.fileId} data={item} />)}
    </div>
  );
};
