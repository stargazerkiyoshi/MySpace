import { Alert, Card, Skeleton, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { PageSection } from "@/shared/ui/PageSection";
import { SpaceCreateForm } from "../components/SpaceCreateForm";
import { SpaceList } from "../components/SpaceList";
import { useCreateSpaceMutation, useSpacesQuery } from "../hooks";
import type { CreateSpaceInput } from "../types";

export function SpaceContainer() {
  const query = useSpacesQuery();
  const createMutation = useCreateSpaceMutation();
  const navigate = useNavigate();

  function handleCreate(values: CreateSpaceInput) {
    createMutation.mutate(values);
  }

  return (
    <PageSection
      title="Spaces"
      description="Space 是系统中的第一性对象。你可以在这里创建、查看并进入具体的协作空间。"
      badge="Space"
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {query.isError ? (
          <Alert
            type="error"
            showIcon
            message="Space 列表加载失败"
            description={query.error.message}
          />
        ) : null}
        {createMutation.isError ? (
          <Alert
            type="error"
            showIcon
            message="Space 创建失败"
            description={createMutation.error.message}
          />
        ) : null}
        {createMutation.isSuccess ? (
          <Alert
            type="success"
            showIcon
            message="Space 创建成功"
            description="列表已刷新，你现在可以直接进入新创建的 Space。"
          />
        ) : null}

        <Card title="Create Space">
          <SpaceCreateForm
            isSubmitting={createMutation.isPending}
            onSubmit={handleCreate}
          />
        </Card>

        {query.isLoading ? (
          <Card>
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        ) : (
          <SpaceList
            items={query.data ?? []}
            onOpen={(spaceId) => navigate(`/spaces/${spaceId}`)}
          />
        )}
      </Space>
    </PageSection>
  );
}
