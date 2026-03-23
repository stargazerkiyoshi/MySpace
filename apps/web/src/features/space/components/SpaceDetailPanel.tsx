import { useEffect, useState } from "react";
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
};

export function SpaceDetailPanel({
  space,
  onUpdate,
  isUpdating,
  updateError,
  updateSuccess,
}: SpaceDetailPanelProps) {
  const navigate = useNavigate();
  const { locale } = useUiLocaleStore();
  const messages = getSpaceMessages(locale).detail;
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const editLabel = locale === "zh-CN" ? "编辑空间" : "Edit Space";
  const saveLabel = locale === "zh-CN" ? "保存修改" : "Save Changes";
  const updateErrorLabel = locale === "zh-CN" ? "空间更新失败" : "Failed to update space";
  const updateSuccessLabel = locale === "zh-CN" ? "空间更新成功" : "Space updated";

  useEffect(() => {
    if (updateSuccess) {
      setIsEditOpen(false);
    }
  }, [updateSuccess]);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card style={{ borderRadius: 16 }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Space
            align="start"
            style={{ width: "100%", justifyContent: "space-between" }}
            wrap
          >
            <Space direction="vertical" size="small" style={{ maxWidth: 720 }}>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {space.name}
              </Typography.Title>
              <Typography.Paragraph style={{ marginBottom: 0, color: "#64748b" }}>
                {space.description || messages.noDescription}
              </Typography.Paragraph>
            </Space>

            <Space wrap>
              <Button onClick={() => navigate("/spaces")}>{messages.back}</Button>
              <Button type="default" onClick={() => setIsDetailOpen(true)}>
                {locale === "zh-CN" ? "查看详情" : "View Details"}
              </Button>
              <Button type="primary" onClick={() => setIsEditOpen(true)}>
                {editLabel}
              </Button>
            </Space>
          </Space>

          <Space wrap size={[12, 12]}>
            <Card size="small" style={{ minWidth: 180, borderRadius: 12 }}>
              <Typography.Text type="secondary">{messages.createdAt}</Typography.Text>
              <Typography.Paragraph style={{ margin: "8px 0 0" }}>
                {formatSpaceDate(space.createdAt)}
              </Typography.Paragraph>
            </Card>
            <Card size="small" style={{ minWidth: 180, borderRadius: 12 }}>
              <Typography.Text type="secondary">{messages.updatedAt}</Typography.Text>
              <Typography.Paragraph style={{ margin: "8px 0 0" }}>
                {formatSpaceDate(space.updatedAt)}
              </Typography.Paragraph>
            </Card>
            <Card size="small" style={{ minWidth: 220, borderRadius: 12 }}>
              <Typography.Text type="secondary">{messages.placeholderTitle}</Typography.Text>
              <Typography.Paragraph style={{ margin: "8px 0 0", color: "#64748b" }}>
                {locale === "zh-CN"
                  ? "当前空间已承载节点与时间线能力，更多能力将继续扩展。"
                  : "This space already carries nodes and history, with more capabilities coming next."}
              </Typography.Paragraph>
            </Card>
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
        title={editLabel}
        open={isEditOpen}
        footer={null}
        onCancel={() => setIsEditOpen(false)}
        destroyOnClose
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {updateError ? (
            <Alert type="error" showIcon message={updateErrorLabel} description={updateError} />
          ) : null}
          {updateSuccess ? (
            <Alert type="success" showIcon message={updateSuccessLabel} />
          ) : null}
          <SpaceCreateForm
            isSubmitting={isUpdating}
            initialValues={{
              name: space.name,
              description: space.description ?? "",
            }}
            submitLabel={saveLabel}
            onSubmit={onUpdate}
          />
        </Space>
      </Modal>
    </Space>
  );
}
