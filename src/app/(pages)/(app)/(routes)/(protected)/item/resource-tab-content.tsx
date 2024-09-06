import { parseAsStringEnum, useQueryState } from "nuqs";
import { ResourceFileCard } from "./resource-file-card";

export const ResourceTabContent = () => {
  const [selectedTab, setSelectedTab] = useQueryState(
    "tab",
    parseAsStringEnum(["resources", "descriptions"]).withDefault("resources"),
  );

  return (
    <div>
      <ResourceFileCard
        data={{
          fileName: "The new File",
          fileId: "1737847457585",
          fileImage: "",
        }}
      />
    </div>
  );
};
