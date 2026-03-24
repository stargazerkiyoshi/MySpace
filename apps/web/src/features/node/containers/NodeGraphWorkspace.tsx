import { useEffect, useMemo, useState } from "react";
import { Alert, Card, Empty, Skeleton, Space, Typography } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { NodeGraphCanvas } from "../components/NodeGraphCanvas";
import { NodeGraphInspector } from "../components/NodeGraphInspector";
import { useSpaceNodeGraphQuery } from "../hooks";
import { getNodeMessages } from "../i18n";
import { getGraphNeighborIds, getGraphNodeById } from "../utils";

type NodeGraphWorkspaceProps = {
  spaceId: string;
};

export function NodeGraphWorkspace({ spaceId }: NodeGraphWorkspaceProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getNodeMessages(locale).graph;
  const query = useSpaceNodeGraphQuery(spaceId);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  useEffect(() => {
    if (!query.data?.nodes.length) {
      setSelectedNodeId(null);
      return;
    }

    setSelectedNodeId((current) =>
      current && query.data.nodes.some((node) => node.id === current)
        ? current
        : query.data.nodes[0].id,
    );
  }, [query.data]);

  const neighborIds = useMemo(
    () =>
      selectedNodeId && query.data
        ? getGraphNeighborIds(selectedNodeId, query.data.edges)
        : [],
    [query.data, selectedNodeId],
  );
  const selectedNode = useMemo(
    () => getGraphNodeById(query.data?.nodes ?? [], selectedNodeId),
    [query.data?.nodes, selectedNodeId],
  );

  if (query.isLoading) {
    return <Skeleton active paragraph={{ rows: 8 }} />;
  }

  if (query.isError) {
    return (
      <Alert
        type="error"
        showIcon
        message={messages.loadError}
        description={query.error.message}
      />
    );
  }

  if (!query.data || !query.data.nodes.length) {
    return <Empty description={messages.empty} />;
  }

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <div>
        <Typography.Title level={4} style={{ marginBottom: 8 }}>
          {messages.title}
        </Typography.Title>
        <Typography.Paragraph style={{ marginBottom: 0, color: "#64748b" }}>
          {messages.description}
        </Typography.Paragraph>
        <Typography.Paragraph style={{ marginBottom: 0, color: "#94a3b8" }}>
          {messages.stats
            .replace("{nodeCount}", String(query.data.nodes.length))
            .replace("{edgeCount}", String(query.data.edges.length))}
        </Typography.Paragraph>
      </div>

      {!query.data.edges.length ? (
        <Alert type="info" showIcon message={messages.emptyRelations} />
      ) : null}

      <div className="node-graph__workspace">
        <Card className="node-graph__canvas-card" bordered={false}>
          <NodeGraphCanvas
            nodes={query.data.nodes}
            edges={query.data.edges}
            selectedNodeId={selectedNodeId}
            neighborIds={neighborIds}
            onSelect={setSelectedNodeId}
          />
        </Card>
        <NodeGraphInspector
          selectedNode={selectedNode}
          neighborCount={neighborIds.length}
          relationSource={query.data.meta.relationSource}
        />
      </div>
    </Space>
  );
}
