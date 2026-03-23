import { Alert, Card, Skeleton, Tabs } from "antd";
import { NodeWorkspace } from "@/features/node/containers/NodeWorkspace";
import { SpaceTimelinePanel } from "@/features/timeline/containers/SpaceTimelinePanel";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
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
  const tabMessages =
    locale === "zh-CN"
      ? {
          nodeTab: "节点",
          historyTab: "最近变化",
        }
      : {
          nodeTab: "Nodes",
          historyTab: "Recent History",
        };

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
      />
      <Card
        style={{
          marginTop: 8,
          borderRadius: 16,
          borderColor: "#e2e8f0",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
        }}
        bodyStyle={{ paddingTop: 12 }}
      >
        <Tabs
          defaultActiveKey={initialTimelineEventId ? "history" : "nodes"}
          items={[
            {
              key: "nodes",
              label: tabMessages.nodeTab,
              children: <NodeWorkspace spaceId={query.data.id} />,
            },
            {
              key: "history",
              label: tabMessages.historyTab,
              children: (
                <SpaceTimelinePanel
                  spaceId={query.data.id}
                  initialSelectedEventId={initialTimelineEventId}
                />
              ),
            },
          ]}
        />
      </Card>
    </>
  );
}
