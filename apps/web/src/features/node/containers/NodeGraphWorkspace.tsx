import { useEffect, useMemo, useState } from "react";
import { Alert, Card, Drawer, Skeleton, Space, Typography } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { NodeGraphCanvas } from "../components/NodeGraphCanvas";
import { NodeDetailForm } from "../components/NodeDetailForm";
import { NodeGraphInspector } from "../components/NodeGraphInspector";
import {
  useCreateNodeRelationMutation,
  useNodeDetailQuery,
  useDeleteNodeRelationMutation,
  useSpaceNodeGraphQuery,
  useUpdateNodeMutation,
} from "../hooks";
import { getNodeMessages } from "../i18n";
import { getGraphNeighborIds, getGraphNodeById } from "../utils";
import type { UpdateNodeInput } from "../types";

type NodeGraphWorkspaceProps = {
  spaceId: string;
  compact?: boolean;
};

export function NodeGraphWorkspace({
  spaceId,
  compact = false,
}: NodeGraphWorkspaceProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const nodeMessages = getNodeMessages(locale);
  const messages = nodeMessages.graph;
  const workspaceMessages = nodeMessages.workspace;
  const query = useSpaceNodeGraphQuery(spaceId);
  const createRelationMutation = useCreateNodeRelationMutation(spaceId);
  const deleteRelationMutation = useDeleteNodeRelationMutation(spaceId);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const detailQuery = useNodeDetailQuery(selectedNodeId);
  const updateMutation = useUpdateNodeMutation(spaceId, selectedNodeId);

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

  function handleOpenEdit(nodeId: string) {
    setSelectedNodeId(nodeId);
    setIsDetailOpen(true);
  }

  function handleUpdate(values: UpdateNodeInput) {
    updateMutation.mutate(values, {
      onSuccess: () => {
        setIsDetailOpen(false);
      },
    });
  }

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
    return (
      <Card
        className={
          compact
            ? "node-graph__canvas-card node-graph__canvas-card--compact"
            : "node-graph__canvas-card"
        }
        bordered={false}
      >
        <div className="node-graph__empty-state">
          <div className="node-graph__empty-copy">
            <Typography.Title level={compact ? 4 : 3} style={{ marginBottom: 8 }}>
              {messages.empty}
            </Typography.Title>
            <Typography.Paragraph style={{ marginBottom: 0, color: "#64748b" }}>
              {messages.description}
            </Typography.Paragraph>
          </div>
        </div>
      </Card>
    );
  }

  if (compact) {
    return (
      <>
        <Card
          className="node-graph__canvas-card node-graph__canvas-card--compact"
          bordered={false}
        >
          <NodeGraphCanvas
            nodes={query.data.nodes}
            edges={query.data.edges}
            selectedNodeId={selectedNodeId}
            neighborIds={neighborIds}
            onSelect={setSelectedNodeId}
            onEdit={handleOpenEdit}
            onCreateRelation={(input) => createRelationMutation.mutate(input)}
            onDeleteRelation={(relationId) => deleteRelationMutation.mutate(relationId)}
            isRelationMutating={
              createRelationMutation.isPending || deleteRelationMutation.isPending
            }
          />
        </Card>
        <Drawer
          title={workspaceMessages.detailTitle}
          width={720}
          open={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        >
          {detailQuery.isLoading && selectedNodeId ? (
            <Skeleton active paragraph={{ rows: 8 }} />
          ) : null}
          {detailQuery.isError ? (
            <Alert
              type="error"
              showIcon
              message={workspaceMessages.detailLoadError}
              description={detailQuery.error.message}
              style={{ marginBottom: 16 }}
            />
          ) : null}
          {updateMutation.isError ? (
            <Alert
              type="error"
              showIcon
              message={workspaceMessages.updateError}
              description={updateMutation.error.message}
              style={{ marginBottom: 16 }}
            />
          ) : null}
          {updateMutation.isSuccess ? (
            <Alert
              type="success"
              showIcon
              message={workspaceMessages.updateSuccess}
              style={{ marginBottom: 16 }}
            />
          ) : null}
          <NodeDetailForm
            node={detailQuery.data ?? null}
            isSubmitting={updateMutation.isPending}
            onSubmit={handleUpdate}
          />
        </Drawer>
      </>
    );
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
          onEdit={handleOpenEdit}
          onCreateRelation={(input) => createRelationMutation.mutate(input)}
          onDeleteRelation={(relationId) => deleteRelationMutation.mutate(relationId)}
          isRelationMutating={
              createRelationMutation.isPending || deleteRelationMutation.isPending
            }
          />
        </Card>
        <NodeGraphInspector
          selectedNode={selectedNode}
          neighborCount={neighborIds.length}
          relationSource={query.data.meta.relationSource}
        />
      </div>
      <Drawer
        title={workspaceMessages.detailTitle}
        width={720}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      >
        {detailQuery.isLoading && selectedNodeId ? (
          <Skeleton active paragraph={{ rows: 8 }} />
        ) : null}
        {detailQuery.isError ? (
          <Alert
            type="error"
            showIcon
            message={workspaceMessages.detailLoadError}
            description={detailQuery.error.message}
            style={{ marginBottom: 16 }}
          />
        ) : null}
        {updateMutation.isError ? (
          <Alert
            type="error"
            showIcon
            message={workspaceMessages.updateError}
            description={updateMutation.error.message}
            style={{ marginBottom: 16 }}
          />
        ) : null}
        {updateMutation.isSuccess ? (
          <Alert
            type="success"
            showIcon
            message={workspaceMessages.updateSuccess}
            style={{ marginBottom: 16 }}
          />
        ) : null}
        <NodeDetailForm
          node={detailQuery.data ?? null}
          isSubmitting={updateMutation.isPending}
          onSubmit={handleUpdate}
        />
      </Drawer>
    </Space>
  );
}
