import { PageSection } from "@/shared/ui/PageSection";
import { SpaceOverview } from "../components/SpaceOverview";
import { useSpacesQuery } from "../hooks";
import { getSpacePlaceholderCards } from "../utils";

export function SpaceContainer() {
  const query = useSpacesQuery();

  return (
    <PageSection
      title="Spaces Placeholder"
      description="空间页仅提供结构占位，为后续空间列表、创建流程和协作成员能力预留入口。"
      badge="Space"
    >
      <SpaceOverview
        items={getSpacePlaceholderCards()}
        requestState={query.isError ? "error" : query.isSuccess ? "success" : "idle"}
      />
    </PageSection>
  );
}
