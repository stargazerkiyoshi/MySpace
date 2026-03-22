import { useEffect, useState } from "react";
import { Alert, Card, Col, Row, Skeleton } from "antd";
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
      },
    });
  }

  function handleUpdate(values: UpdateNodeInput) {
    updateMutation.mutate(values);
  }

  return (
    <Card title={messages.workspace.title}>
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={8}>
          {createMutation.isError ? (
            <Alert
              type="error"
              showIcon
              message={messages.workspace.createError}
              description={createMutation.error.message}
              style={{ marginBottom: 16 }}
            />
          ) : null}
          {createMutation.isSuccess ? (
            <Alert
              type="success"
              showIcon
              message={messages.workspace.createSuccess}
              style={{ marginBottom: 16 }}
            />
          ) : null}
          <Card
            title={messages.workspace.createTitle}
            size="small"
            style={{ marginBottom: 16 }}
          >
            <NodeCreateForm
              isSubmitting={createMutation.isPending}
              onSubmit={handleCreate}
            />
          </Card>
          <Card title={messages.workspace.listTitle} size="small">
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
                onSelect={setSelectedNodeId}
              />
            )}
          </Card>
        </Col>
        <Col xs={24} xl={16}>
          <Card title={messages.workspace.detailTitle} size="small">
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
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
