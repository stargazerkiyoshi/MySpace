import { useState } from "react";
import { Alert, Button, Card, Drawer, Skeleton, Space } from "antd";
import { NodeGraphWorkspace } from "@/features/node/containers/NodeGraphWorkspace";
import { NodeWorkspace } from "@/features/node/containers/NodeWorkspace";
import { SpaceTimelinePanel } from "@/features/timeline/containers/SpaceTimelinePanel";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getSpaceMessages } from "../i18n";
import { SpaceDetailPanel } from "../components/SpaceDetailPanel";
import { useSpaceDetailQuery, useUpdateSpaceMutation } from "../hooks";
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
  const { locale } = useUiLocaleStore();
  const spaceMessages = getSpaceMessages(locale).detail;
  const [isNodeListOpen, setIsNodeListOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(Boolean(initialTimelineEventId));

  function handleUpdate(values: UpdateSpaceInput) {
    updateMutation.mutate(values);
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
      <SpaceDetailPanel
        space={query.data}
        onUpdate={handleUpdate}
        isUpdating={updateMutation.isPending}
        updateError={updateMutation.isError ? updateMutation.error.message : undefined}
        updateSuccess={updateMutation.isSuccess}
        extraActions={
          <Space wrap>
            <Button onClick={() => setIsNodeListOpen(true)}>{spaceMessages.nodeEntry}</Button>
            <Button onClick={() => setIsHistoryOpen(true)}>{spaceMessages.historyEntry}</Button>
          </Space>
        }
      />
      <Card
        style={{
          marginTop: 8,
          borderRadius: 16,
          borderColor: "#e2e8f0",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
        }}
        bodyStyle={{ paddingTop: 20 }}
      >
        <NodeGraphWorkspace spaceId={query.data.id} />
      </Card>
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
