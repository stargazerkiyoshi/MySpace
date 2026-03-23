import { useEffect, useState } from "react";
import { Alert, Button, Drawer, Skeleton, Space } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { NodeCreateForm } from "../components/NodeCreateForm";
import { NodeDetailForm } from "../components/NodeDetailForm";
import { NodeList } from "../components/NodeList";
import {
  useCreateNodeMutation,
  useNodeDetailQuery,
  useSpaceNodesQuery,
  useUpdateNodeMutation,
} from "../hooks";
import { getNodeMessages } from "../i18n";
import type { CreateNodeInput, UpdateNodeInput } from "../types";

type NodeWorkspaceProps = {
  spaceId: string;
};

export function NodeWorkspace({ spaceId }: NodeWorkspaceProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getNodeMessages(locale);
  const listQuery = useSpaceNodesQuery(spaceId);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const detailQuery = useNodeDetailQuery(selectedNodeId);
  const createMutation = useCreateNodeMutation(spaceId);
  const updateMutation = useUpdateNodeMutation(spaceId, selectedNodeId);

  useEffect(() => {
    if (!listQuery.data) {
      return;
    }

    if (!listQuery.data.length) {
      setSelectedNodeId(null);
      return;
    }

    if (
      !selectedNodeId ||
      !listQuery.data.some((item) => item.id === selectedNodeId)
    ) {
      setSelectedNodeId(listQuery.data[0].id);
    }
  }, [listQuery.data, selectedNodeId]);

  function handleCreate(values: CreateNodeInput) {
    createMutation.mutate(values, {
      onSuccess: (created) => {
        setSelectedNodeId(created.id);
        setIsCreateOpen(false);
        setIsDetailOpen(true);
      },
    });
  }

  function handleUpdate(values: UpdateNodeInput) {
    updateMutation.mutate(values, {
      onSuccess: () => {
        setIsDetailOpen(false);
      },
    });
  }

  return (
    <>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
          <Button type="primary" onClick={() => setIsCreateOpen(true)}>
            {messages.workspace.createTitle}
          </Button>
        </Space>

        {createMutation.isError ? (
          <Alert
            type="error"
            showIcon
            message={messages.workspace.createError}
            description={createMutation.error.message}
          />
        ) : null}
        {createMutation.isSuccess ? (
          <Alert
            type="success"
            showIcon
            message={messages.workspace.createSuccess}
          />
        ) : null}
        {listQuery.isLoading ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : listQuery.isError ? (
          <Alert
            type="error"
            showIcon
            message={messages.workspace.listLoadError}
            description={listQuery.error.message}
          />
        ) : (
          <NodeList
            items={listQuery.data ?? []}
            selectedNodeId={selectedNodeId}
            onSelect={(nodeId) => {
              setSelectedNodeId(nodeId);
              setIsDetailOpen(true);
            }}
          />
        )}
      </Space>

      <Drawer
        title={messages.workspace.createTitle}
        width={560}
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      >
        <NodeCreateForm
          isSubmitting={createMutation.isPending}
          onSubmit={handleCreate}
        />
      </Drawer>
      <Drawer
        title={messages.workspace.detailTitle}
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
            message={messages.workspace.detailLoadError}
            description={detailQuery.error.message}
            style={{ marginBottom: 16 }}
          />
        ) : null}
        {updateMutation.isError ? (
          <Alert
            type="error"
            showIcon
            message={messages.workspace.updateError}
            description={updateMutation.error.message}
            style={{ marginBottom: 16 }}
          />
        ) : null}
        {updateMutation.isSuccess ? (
          <Alert
            type="success"
            showIcon
            message={messages.workspace.updateSuccess}
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
