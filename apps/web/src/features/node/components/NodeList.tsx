import { Button, Empty, List, Space, Tag, Typography } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getNodeMessages } from "../i18n";
import type { NodeRecord } from "../types";
import { formatNodeDate, getNodeStatusLabel, getNodeTypeLabel } from "../utils";

type NodeListProps = {
  items: NodeRecord[];
  selectedNodeId: string | null;
  onSelect: (nodeId: string) => void;
};

export function NodeList({
  items,
  selectedNodeId,
  onSelect,
}: NodeListProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getNodeMessages(locale).list;

  if (!items.length) {
    return <Empty description={messages.empty} />;
  }

  return (
    <List
      itemLayout="vertical"
      dataSource={items}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          extra={
            <Button
              type={selectedNodeId === item.id ? "primary" : "default"}
              onClick={() => onSelect(item.id)}
            >
              {messages.open}
            </Button>
          }
        >
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Space wrap>
              <Tag>{getNodeTypeLabel(locale, item.nodeType)}</Tag>
              <Tag
                color={
                  item.status === "done"
                    ? "green"
                    : item.status === "doing"
                      ? "blue"
                      : "default"
                }
              >
                {getNodeStatusLabel(locale, item.status)}
              </Tag>
            </Space>
            <Typography.Title level={5} style={{ margin: 0 }}>
              {item.title}
            </Typography.Title>
            <Typography.Paragraph style={{ marginBottom: 0, color: "#64748b" }}>
              {item.content || messages.noContent}
            </Typography.Paragraph>
            <Typography.Text type="secondary">
              {messages.updatedAt} {formatNodeDate(item.updatedAt)}
            </Typography.Text>
          </Space>
        </List.Item>
      )}
    />
  );
}
