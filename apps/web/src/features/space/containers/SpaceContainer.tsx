import { useState } from "react";
import { Alert, Button, Card, Modal, Skeleton, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
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
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  function handleCreate(values: CreateSpaceInput) {
    createMutation.mutate(values, {
      onSuccess: () => {
        setIsCreateOpen(false);
      },
    });
  }

  return (
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

      <Space>
        <Button type="primary" onClick={() => setIsCreateOpen(true)}>
          {messages.createTitle}
        </Button>
      </Space>

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

      <Modal
        title={messages.createTitle}
        open={isCreateOpen}
        footer={null}
        onCancel={() => setIsCreateOpen(false)}
      >
        <SpaceCreateForm
          isSubmitting={createMutation.isPending}
          onSubmit={handleCreate}
        />
      </Modal>
    </Space>
  );
}
