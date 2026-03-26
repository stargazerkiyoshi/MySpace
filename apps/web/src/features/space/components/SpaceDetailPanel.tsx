import { useEffect, type ReactNode, useState } from "react";
import { Alert, Button, Card, Descriptions, Empty, Modal, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { SpaceCreateForm } from "./SpaceCreateForm";
import { getSpaceMessages } from "../i18n";
import type { SpaceRecord, UpdateSpaceInput } from "../types";
import { formatSpaceDate } from "../utils";

type SpaceDetailPanelProps = {
  space: SpaceRecord;
  onUpdate: (values: UpdateSpaceInput) => void;
  isUpdating: boolean;
  updateError?: string;
  updateSuccess: boolean;
  extraActions?: ReactNode;
};

export function SpaceDetailPanel({
  space,
  onUpdate,
  isUpdating,
  updateError,
  updateSuccess,
  extraActions,
}: SpaceDetailPanelProps) {
  const navigate = useNavigate();
  const { locale } = useUiLocaleStore();
  const messages = getSpaceMessages(locale).detail;
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (updateSuccess) {
      setIsEditOpen(false);
    }
  }, [updateSuccess]);

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Card
        bodyStyle={{ padding: 18 }}
        style={{ borderRadius: 16, borderColor: "#dbeafe", background: "#f8fbff" }}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Space
            align="start"
            style={{ width: "100%", justifyContent: "space-between" }}
            wrap
          >
            <Space direction="vertical" size="small" style={{ maxWidth: 720 }}>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {space.name}
              </Typography.Title>
              <Typography.Paragraph
                ellipsis={{ rows: 1, tooltip: space.description || messages.noDescription }}
                style={{ marginBottom: 0, color: "#64748b" }}
              >
                {space.description || messages.noDescription}
              </Typography.Paragraph>
            </Space>

            <Space wrap>
              <Button onClick={() => navigate("/spaces")}>{messages.back}</Button>
              <Button type="default" onClick={() => setIsDetailOpen(true)}>
                {messages.viewDetails}
              </Button>
              <Button type="primary" onClick={() => setIsEditOpen(true)}>
                {messages.editSpace}
              </Button>
            </Space>
          </Space>

          <Space wrap size={[16, 8]} style={{ justifyContent: "space-between" }}>
            <Space wrap size={[16, 8]}>
              <Typography.Text type="secondary">
                {messages.createdAt} {formatSpaceDate(space.createdAt)}
              </Typography.Text>
              <Typography.Text type="secondary">
                {messages.updatedAt} {formatSpaceDate(space.updatedAt)}
              </Typography.Text>
            </Space>
            {extraActions}
          </Space>
        </Space>
      </Card>

      <Modal
        title={space.name}
        open={isDetailOpen}
        footer={null}
        onCancel={() => setIsDetailOpen(false)}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Descriptions
            column={1}
            items={[
              { key: "slug", label: messages.slug, children: space.slug },
              {
                key: "description",
                label: messages.description,
                children: space.description || messages.noDescription,
              },
              {
                key: "createdAt",
                label: messages.createdAt,
                children: formatSpaceDate(space.createdAt),
              },
              {
                key: "updatedAt",
                label: messages.updatedAt,
                children: formatSpaceDate(space.updatedAt),
              },
            ]}
          />
          <Card size="small">
            <Typography.Title level={5}>{messages.placeholderTitle}</Typography.Title>
            <Typography.Paragraph style={{ color: "#64748b", marginBottom: 16 }}>
              {messages.placeholderDescription}
            </Typography.Paragraph>
            <Empty description={messages.placeholderEmpty} />
          </Card>
        </Space>
      </Modal>

      <Modal
        title={messages.editSpace}
        open={isEditOpen}
        footer={null}
        onCancel={() => setIsEditOpen(false)}
        destroyOnClose
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {updateError ? (
            <Alert type="error" showIcon message={messages.updateError} description={updateError} />
          ) : null}
          {updateSuccess ? (
            <Alert type="success" showIcon message={messages.updateSuccess} />
          ) : null}
          <SpaceCreateForm
            isSubmitting={isUpdating}
            initialValues={{
              name: space.name,
              description: space.description ?? "",
            }}
            submitLabel={messages.saveChanges}
            onSubmit={onUpdate}
          />
        </Space>
      </Modal>
    </Space>
  );
}
