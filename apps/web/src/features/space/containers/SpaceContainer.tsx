import { Alert, Card, Skeleton, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { PageSection } from "@/shared/ui/PageSection";
import { SpaceCreateForm } from "../components/SpaceCreateForm";
import { SpaceList } from "../components/SpaceList";
import { useCreateSpaceMutation, useSpacesQuery } from "../hooks";
import { getSpaceMessages } from "../i18n";
import type { CreateSpaceInput } from "../types";

export function SpaceContainer() {
  const query = useSpacesQuery();
  const createMutation = useCreateSpaceMutation();
  const navigate = useNavigate();
  const { locale } = useUiLocaleStore();
  const messages = getSpaceMessages(locale).listPage;

  function handleCreate(values: CreateSpaceInput) {
    createMutation.mutate(values);
  }

  return (
    <PageSection
      title={messages.title}
      description={messages.description}
      badge="Space"
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {query.isError ? (
          <Alert
            type="error"
            showIcon
            message={messages.listLoadError}
            description={query.error.message}
          />
        ) : null}
        {createMutation.isError ? (
          <Alert
            type="error"
            showIcon
            message={messages.createError}
            description={createMutation.error.message}
          />
        ) : null}
        {createMutation.isSuccess ? (
          <Alert
            type="success"
            showIcon
            message={messages.createSuccess}
            description={messages.createSuccessDescription}
          />
        ) : null}

        <Card title={messages.createTitle}>
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
