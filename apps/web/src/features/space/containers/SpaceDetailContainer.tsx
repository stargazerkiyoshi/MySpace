import { useState } from "react";
import { ApartmentOutlined, CompassOutlined } from "@ant-design/icons";
import { Alert, Breadcrumb, Button, Card, Drawer, Skeleton, Space } from "antd";
import { Link } from "react-router-dom";
import { NodeCreateForm } from "@/features/node/components/NodeCreateForm";
import { NodeGraphWorkspace } from "@/features/node/containers/NodeGraphWorkspace";
import { NodeWorkspace } from "@/features/node/containers/NodeWorkspace";
import { useCreateNodeMutation } from "@/features/node/hooks";
import { SpaceTimelinePanel } from "@/features/timeline/containers/SpaceTimelinePanel";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { SpaceDetailPanel } from "../components/SpaceDetailPanel";
import { getSpaceMessages } from "../i18n";
import { useSpaceDetailQuery, useUpdateSpaceMutation } from "../hooks";
import type { CreateNodeInput } from "@/features/node/types";
import type { UpdateSpaceInput } from "../types";

type SpaceDetailContainerProps = {
  spaceId: string;
  initialTimelineEventId?: string | null;
};

export function SpaceDetailContainer({
  spaceId,
  initialTimelineEventId,
}: SpaceDetailContainerProps) {
  const query = useSpaceDetailQuery(spaceId);
  const updateMutation = useUpdateSpaceMutation(spaceId);
  const createNodeMutation = useCreateNodeMutation(spaceId);
  const { locale } = useUiLocaleStore();
  const spaceMessages = getSpaceMessages(locale).detail;
  const [isCreateNodeOpen, setIsCreateNodeOpen] = useState(false);
  const [isNodeListOpen, setIsNodeListOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(Boolean(initialTimelineEventId));

  function handleUpdate(values: UpdateSpaceInput) {
    updateMutation.mutate(values);
  }

  function handleCreateNode(values: CreateNodeInput) {
    createNodeMutation.mutate(values, {
      onSuccess: () => {
        setIsCreateNodeOpen(false);
      },
    });
  }

  if (query.isLoading) {
    return (
      <Card>
        <Skeleton active paragraph={{ rows: 5 }} />
      </Card>
    );
  }

  if (query.isError) {
    return (
      <Alert
        type="error"
        showIcon
        message={locale === "zh-CN" ? "空间详情加载失败" : "Failed to load space details"}
        description={query.error.message}
      />
    );
  }

  if (!query.data) {
    return null;
  }

  return (
    <>
      <Breadcrumb
        style={{ marginBottom: 12 }}
        items={[
          {
            title: (
              <Link to="/spaces">
                <Space size={6}>
                  <ApartmentOutlined />
                  <span>{locale === "zh-CN" ? "空间" : "Spaces"}</span>
                </Space>
              </Link>
            ),
          },
          {
            title: (
              <Space size={6}>
                <CompassOutlined />
                <span>{query.data.name}</span>
              </Space>
            ),
          },
        ]}
      />
      <SpaceDetailPanel
        space={query.data}
        onUpdate={handleUpdate}
        isUpdating={updateMutation.isPending}
        updateError={updateMutation.isError ? updateMutation.error.message : undefined}
        updateSuccess={updateMutation.isSuccess}
      />
      <Card size="small" style={{ marginTop: 16, marginBottom: 6 }}>
        <Space wrap size={[12, 12]}>
          <Button type="primary" onClick={() => setIsCreateNodeOpen(true)}>
            {locale === "zh-CN" ? "创建节点" : "Create Node"}
          </Button>
          <Button onClick={() => setIsNodeListOpen(true)}>{spaceMessages.nodeEntry}</Button>
          <Button onClick={() => setIsHistoryOpen(true)}>{spaceMessages.historyEntry}</Button>
        </Space>
      </Card>
      <div>
        <NodeGraphWorkspace spaceId={query.data.id} compact />
      </div>
      <Drawer
        title={locale === "zh-CN" ? "创建节点" : "Create Node"}
        width={560}
        open={isCreateNodeOpen}
        onClose={() => setIsCreateNodeOpen(false)}
        destroyOnClose
      >
        <NodeCreateForm
          isSubmitting={createNodeMutation.isPending}
          onSubmit={handleCreateNode}
        />
      </Drawer>
      <Drawer
        title={spaceMessages.nodeEntry}
        width={720}
        open={isNodeListOpen}
        onClose={() => setIsNodeListOpen(false)}
      >
        <NodeWorkspace spaceId={query.data.id} />
      </Drawer>
      <Drawer
        title={spaceMessages.historyEntry}
        width={720}
        open={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      >
        <SpaceTimelinePanel
          spaceId={query.data.id}
          initialSelectedEventId={initialTimelineEventId}
        />
      </Drawer>
    </>
  );
}
