import { ArrowRightOutlined } from "@ant-design/icons";
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
      grid={{ gutter: 16, xs: 1, md: 2 }}
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <Card
            title={item.name}
            extra={<Tag color="blue">{item.slug}</Tag>}
            actions={[
              <Button
                type="link"
                icon={<ArrowRightOutlined />}
                onClick={() => onOpen(item.id)}
                key={`open-${item.id}`}
              >
                {messages.open}
              </Button>,
            ]}
          >
            <Space direction="vertical" size="small">
              <Typography.Paragraph style={{ marginBottom: 0, color: "#64748b" }}>
                {item.description || messages.noDescription}
              </Typography.Paragraph>
              <Typography.Text type="secondary">
                {messages.createdAt} {formatSpaceDate(item.createdAt)}
              </Typography.Text>
            </Space>
          </Card>
        </List.Item>
      )}
    />
  );
}
