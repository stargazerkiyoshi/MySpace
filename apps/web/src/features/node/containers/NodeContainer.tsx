import { PageSection } from "@/shared/ui/PageSection";
import { NodeOverview } from "../components/NodeOverview";
import { useNodesQuery } from "../hooks";
import { getNodePlaceholderCards } from "../utils";

export function NodeContainer() {
  const query = useNodesQuery();

  return (
    <PageSection
      title="Nodes Placeholder"
      description="节点页保留节点树、关系编辑和内容面板的落位，不在本次实现业务逻辑。"
      badge="Node"
    >
      <NodeOverview
        items={getNodePlaceholderCards()}
        requestState={query.isError ? "error" : query.isSuccess ? "success" : "idle"}
      />
    </PageSection>
  );
}
