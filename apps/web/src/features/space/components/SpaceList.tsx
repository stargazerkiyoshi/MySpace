import { Button, Card, Empty, List, Space, Tag, Typography } from "antd";
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
    <List
      grid={{ gutter: 20, xs: 1, sm: 1, md: 2, xl: 3 }}
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable
            role="button"
            tabIndex={0}
            onClick={() => onOpen(item.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpen(item.id);
              }
            }}
          >
            <Space
              direction="vertical"
              size="middle"
              style={{ width: "100%", minHeight: 160, justifyContent: "space-between" }}
            >
              <Space direction="vertical" size="small" style={{ width: "100%", minWidth: 0 }}>
                <Space
                  align="start"
                  style={{ width: "100%", justifyContent: "space-between" }}
                  wrap
                >
                  <Typography.Title
                    level={5}
                    style={{ margin: 0, minWidth: 0 }}
                    ellipsis={{ rows: 1, tooltip: item.name }}
                  >
                    {item.name}
                  </Typography.Title>
                  <Tag color="blue" bordered={false}>
                    {item.slug}
                  </Tag>
                </Space>

                <Typography.Paragraph
                  ellipsis={{ rows: 3, tooltip: item.description || messages.noDescription }}
                  type="secondary"
                  style={{ marginBottom: 0 }}
                >
                  {item.description || messages.noDescription}
                </Typography.Paragraph>
              </Space>

              <Space
                align="center"
                style={{ width: "100%", justifyContent: "space-between" }}
                wrap
              >
                <Typography.Text type="secondary">
                  {messages.createdAt} {formatSpaceDate(item.createdAt)}
                </Typography.Text>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    onOpen(item.id);
                  }}
                >
                  {messages.open}
                </Button>
              </Space>
            </Space>
          </Card>
        </List.Item>
      )}
    />
  );
}
