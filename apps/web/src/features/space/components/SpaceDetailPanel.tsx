import { Button, Card, Descriptions, Empty, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getSpaceMessages } from "../i18n";
import type { SpaceRecord } from "../types";
import { formatSpaceDate } from "../utils";

type SpaceDetailPanelProps = {
  space: SpaceRecord;
};

export function SpaceDetailPanel({ space }: SpaceDetailPanelProps) {
  const navigate = useNavigate();
  const { locale } = useUiLocaleStore();
  const messages = getSpaceMessages(locale).detail;

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Button onClick={() => navigate("/spaces")}>{messages.back}</Button>
      <Card>
        <Descriptions
          title={space.name}
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
      </Card>
      <Card>
        <Typography.Title level={4}>{messages.placeholderTitle}</Typography.Title>
        <Typography.Paragraph style={{ color: "#64748b", marginBottom: 16 }}>
          {messages.placeholderDescription}
        </Typography.Paragraph>
        <Empty description={messages.placeholderEmpty} />
      </Card>
    </Space>
  );
}
