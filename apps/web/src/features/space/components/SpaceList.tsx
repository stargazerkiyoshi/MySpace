import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Space, Typography } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getSpaceMessages } from "../i18n";
import type { SpaceRecord } from "../types";
import { formatSpaceDate } from "../utils";

type SpaceListProps = {
  items: SpaceRecord[];
  onOpen: (spaceId: string) => void;
};

export function SpaceList({ items, onOpen }: SpaceListProps) {
  const { locale } = useUiLocaleStore();
  const messages = getSpaceMessages(locale).list;

  if (items.length === 0) {
    return (
      <Card>
        <Empty description={messages.empty} />
      </Card>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 16,
      }}
    >
      {items.map((item) => (
        <div key={item.id} style={{ minWidth: 0 }}>
          <Card
            style={{ borderRadius: 16, height: "100%", width: "100%" }}
            styles={{ body: { height: "100%", padding: 18 } }}
          >
            <Space
              direction="vertical"
              size="small"
              style={{ width: "100%", minHeight: 132, height: "100%", justifyContent: "space-between" }}
            >
              <Space
                align="start"
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <Space direction="vertical" size={4} style={{ minWidth: 0, flex: 1 }}>
                  <Typography.Title
                    level={5}
                    style={{ margin: 0 }}
                    ellipsis={{ rows: 1, tooltip: item.name }}
                  >
                    {item.name}
                  </Typography.Title>
                </Space>
                <Button
                  type="link"
                  icon={<ArrowRightOutlined />}
                  onClick={() => onOpen(item.id)}
                  key={`open-${item.id}`}
                  style={{ paddingInline: 0, paddingBlock: 0, height: "auto" }}
                >
                  {messages.open}
                </Button>
              </Space>
              <Typography.Paragraph
                ellipsis={{ rows: 2, tooltip: item.description || messages.noDescription }}
                style={{ marginBottom: 0, color: "#64748b", lineHeight: 1.5 }}
              >
                {item.description || messages.noDescription}
              </Typography.Paragraph>
              <Space wrap style={{ justifyContent: "space-between" }}>
                <Typography.Text type="secondary">
                  {messages.createdAt} {formatSpaceDate(item.createdAt)}
                </Typography.Text>
              </Space>
            </Space>
          </Card>
        </div>
      ))}
    </div>
  );
}
