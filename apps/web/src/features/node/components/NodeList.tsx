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
          style={{
            paddingInline: 0,
            paddingBlock: 14,
            minHeight: 148,
            borderBottom: "1px solid #f1f5f9",
          }}
          extra={
            <Button
              type={selectedNodeId === item.id ? "primary" : "default"}
              size="small"
              onClick={() => onSelect(item.id)}
            >
              {selectedNodeId === item.id ? messages.open : messages.focus}
            </Button>
          }
        >
          <Space
            direction="vertical"
            size="small"
            style={{ width: "100%", minHeight: 118, justifyContent: "space-between" }}
          >
            <Space wrap>
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
              <Typography.Text type="secondary">
                {getNodeTypeLabel(locale, item.nodeType)}
              </Typography.Text>
            </Space>
            <Typography.Title
              level={5}
              style={{ margin: 0 }}
              ellipsis={{ rows: 1, tooltip: item.title }}
            >
              {item.title}
            </Typography.Title>
            <Typography.Paragraph
              ellipsis={{ rows: 2, tooltip: item.content || messages.noContent }}
              style={{ marginBottom: 0, color: "#64748b" }}
            >
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
