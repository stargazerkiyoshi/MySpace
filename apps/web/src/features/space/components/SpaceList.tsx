import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Empty, List, Space, Tag, Typography } from "antd";
import type { SpaceRecord } from "../types";
import { formatSpaceDate } from "../utils";

type SpaceListProps = {
  items: SpaceRecord[];
  onOpen: (spaceId: string) => void;
};

export function SpaceList({ items, onOpen }: SpaceListProps) {
  if (items.length === 0) {
    return (
      <Card>
        <Empty description="还没有 Space。先创建一个新的协作空间。" />
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
                Open Space
              </Button>,
            ]}
          >
            <Space direction="vertical" size="small">
              <Typography.Paragraph style={{ marginBottom: 0, color: "#64748b" }}>
                {item.description || "暂无描述。"}
              </Typography.Paragraph>
              <Typography.Text type="secondary">
                创建于 {formatSpaceDate(item.createdAt)}
              </Typography.Text>
            </Space>
          </Card>
        </List.Item>
      )}
    />
  );
}
